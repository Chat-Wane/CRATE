
/*!
 * \brief get the actions in the editor and impacts the model accordingly
 * \param model the model
 * \param editorElement the ace editor division
 */
function EditorController(model, editorElement){
    var self = this,
        editor = ace.edit(editorElement.attr("id")),
        antiEntropyInterval = 10000;
     
    this.fromRemote = false;
    
    // #A initialize the ace editor
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setUseWrapMode(true); // word wrapping
    editor.setHighlightActiveLine(false); // not highlighting current line
    editor.setShowPrintMargin(false); // no 80 column margin
    editor.renderer.setShowGutter(false); // no line numbers
    editor.resize(); // adapt to the content

    // #B initialize the string within the editor
    function getStringChildNode(childNode){
        var result = "";
        if (childNode.e !== null){ result = childNode.e; };
        for (var i=0; i<childNode.children.length; ++i){
            result += getStringChildNode(childNode.children[i]);
        };
        return result;
    };
    editor.setValue(getStringChildNode(model.document.sequence.root),1);

    // #C handle the local changes
    editor.getSession().on('change', function(e) {
        var begin, end, text, j=0;
        editorElement.css("height",
                          editor.getSession().getDocument().getLength() *
                          editor.renderer.lineHeight);
        editor.resize();
        if (!self.fromRemote){
            // #1 process the boundaries from range to index and text
            begin = editor.getSession().getDocument().positionToIndex(
                e.data.range.start);
            
            switch (e.data.action){
            case 'removeLines':
                end = begin;
                for (var i=0; i<e.data.lines.length;++i){
                    end += e.data.lines[i].length+1; // +1 because of \n
                };
                break;
            case 'removeText':
                if (e.data.text.length === 1){
                    end = begin+1;
                } else {
                    end = editor.getSession().getDocument().positionToIndex(
                        e.data.range.end);
                };
                break;
            case 'insertLines':
                text = "";
                for (var i=0; i<e.data.lines.length;++i){
                    text = text + (e.data.lines[i]) + "\n";
                };
                end = begin + text.length;
                break;
            case 'insertText':
                text = e.data.text;
                end = editor.getSession().getDocument().positionToIndex(
                    e.data.range.end);
                break;
            };
            // #2 update the underlying CRDT model and broadcast the results
            for (var i=begin; i<end; ++i){
                switch (e.data.action){
                case "insertText":
                    model.network.broadcast(
                        model.document.localInsert(text[j], i));
                    break;
                case "insertLines":
                    model.network.broadcast(
                        model.document.localInsert(text[j], i));
                    break;
                case "removeText":
                    model.network.broadcast(
                        model.document.localRemove(begin)); break;
                case "removeLines":
                    model.network.broadcast(
                        model.document.localRemove(begin)); break;
                };            
                ++j
            };
        };
    });
    
    model.network.on("receive", function(message) {
        if (message._e !== null && message._e !== undefined){
            self.receivedInsert(message);
        };
        if (message._d !== null && message._d !== undefined){
            self.receivedRemove(message);
        };
    });
    
    this.receivedInsert = function(message){
        var aceDocument = editor.getSession().getDocument(),
            index = model.document.remoteInsert(message._e,message._i),
            delta,
            tempFromRemote;

        if (index !== -1){
            delta = {action: 'insertText',
                     range: { start: aceDocument.indexToPosition(index-1),
                              end:   aceDocument.indexToPosition(index)},
                     text: message._e},
            tempFromRemote = self.fromRemote;
            self.fromRemote = true;
            aceDocument.applyDeltas([delta]);
            self.fromRemote = tempFromRemote;
        };
    };
    
    this.receivedRemove = function(message){
        var aceDocument = editor.getSession().getDocument(),
            index = model.document.remoteRemove(message),
            delta,
            tempFromRemote;

        if (index !== -1){
            delta = {action: 'removeText',
                     range: { start: aceDocument.indexToPosition(index - 1),
                              end:   aceDocument.indexToPosition(index)},
                     text: null};
            tempFromRemote = self.fromRemote;
            self.fromRemote = true;
            aceDocument.applyDeltas([delta]);
            self.fromRemote = tempFromRemote;
        };
    };

    // #1 antientropy
    this.antiEntropy = function(){
        var peers = model.network._membership.getPeers(1);
        if (peers.length >=1){
            console.log("start anti-entropy ");
            peers[0].send(
                new MAntiEntropyRequest(model.document.causality.local.e,
                                        model.document.id,
                                        model.document.causality));
        };
    };
    setInterval(this.antiEntropy, antiEntropyInterval);

    // #2 receive anti entropy request
    model.network._membership.on("churn", function(origin, message){
        if (message.type === "MAntiEntropyRequest"){
            console.log("received "+ message.type);
            var docCausal = model.document.causality,
                j = 0, k, l,
                toSearch = [],
                found;
            // #1 perform the difference between the two causality structures
            // (TODO) move it into the causaltrack module
            for (var i=0; i<message.causality.vector.length; ++i){
                found = false;
                while( j<docCausal.vector.length && !found){
                    // #A the entry in our vector does not exist un message
                    if (message.causality.vector[i].e > docCausal.vector[j].e){
                        for (var k=1; k<=docCausal.vector[j].v; ++k){
                            if (docCausal.vector[j].x.indexOf(k) < 0){
                                toSearch.push({_e:docCausal.vector[j].e,_c:k});
                            };
                        };
                        ++j;
                    } else {
                        // #B exist in both vectors
                        if (message.causality.vector[i].e ===
                            docCausal.vector[j].e){
                            for (var k = message.causality.vector[i].v + 1 ;
                                 k <= docCausal.vector[j].v; ++k){
                                if (docCausal.vector[j].x.indexOf(k) < 0){
                                    toSearch.push({_e: docCausal.vector[j].e,
                                                   _c: k})
                                };
                            };
                            l = 0, k = 0;
                            while ( l < docCausal.vector[j].v &&
                                    k < message.causality.vector[i].x.length ){
                                l = message.causality.vector[i].x[k];
                                if (l<docCausal.vector[j].v &&
                                    docCausal.vector[j].x.indexOf(l) < 0) {
                                    toSearch.push({_e: docCausal.vector[j].e,
                                                   _c: l})
                                };
                                ++k;
                            };
                            ++j;
                            found = true;
                        } else {
                            if (message.causality.vector[i].e<
                                docCausal.vector[j].e){
                                found = true;
                            };
                        };
                    };
                };
            };
            while(j<docCausal.vector.length){
                // #A the entry in our vector does not exist in message
                for (var k=1; k<=docCausal.vector[j].v; ++k){
                    if (docCausal.vector[j].x.indexOf(k) < 0){
                        toSearch.push({_e: docCausal.vector[j].e,
                                       _c: k});
                    };
                };
                ++j;
            };
            // #2 get the elements within the difference
            // (TODO) build a tree to send and create merge function in
            // LSEQTree
            var toSend = model.document.getElements(toSearch);
            // #3 send the elements
            origin.send(new MAntiEntropyResponse(message.idDocument,
                                                 toSend));
        };
    });
    
    model.network._membership.on("churn", function(peer, message){
        if (message.type === "MAntiEntropyResponse"){
            console.log("received "+ message.type + "; #"+
                        message.elements.length);
            self.receivedAntiEntropy(message.elements);
        };
    });

    // #4 integrates the elements from the anti-entropy
    this.receivedAntiEntropy = function(elements){
        var aceDocument = editor.getSession().getDocument(),
            sequence = model.document.sequence,
            LSEQNodePrototype = Object.getPrototypeOf(sequence.get(0)),
            TriplePrototype = Object.getPrototypeOf(sequence.get(0).t),
            tempNode, pair, index, delta, tempFromRemote;
        // (TODO) fix ugliness of prototyping like that
        for (var i = 0; i<elements.length; ++i){
            tempNode = elements[i];
            while (tempNode.children.length > 0){
                Object.setPrototypeOf(tempNode.t, TriplePrototype);
                Object.setPrototypeOf(tempNode, LSEQNodePrototype);
                tempNode = tempNode.children[0];
            };
            Object.setPrototypeOf(tempNode.t, TriplePrototype);
            Object.setPrototypeOf(tempNode, LSEQNodePrototype);
            // #2 integrate the element if it has not been received before
            pair = {_e : tempNode.t.s, _c: tempNode.t.c};
            index = model.document.antiEntropyInsert(elements[i], pair);
            if (index !== -1){
                delta = {action: 'insertText',
                         range: { start:aceDocument.indexToPosition(index-1),
                                  end  :aceDocument.indexToPosition(index)},
                         text: tempNode.e};
                tempFromRemote = self.fromRemote;
                self.fromRemote = true;
                aceDocument.applyDeltas([delta]);
                self.fromRemote = tempFromRemote;
            };
        };
    };
};
