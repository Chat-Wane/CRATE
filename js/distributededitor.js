
function DistributedEditor(id, editingSession){
    this.id = id;
    this.editor = ace.edit(id);
    this.initEditorStyle();
    
    this.network = editingSession.network;
    this.sequence = editingSession.document.sequence;
    this.causality = editingSession.document.causality;
    this.fromRemote = false;
    this.initEditorBehaviour();

    this.buffer = [];
    this.initNetworkBehaviour();
};

DistributedEditor.prototype.initEditorStyle = function(){
    this.editor.setTheme("ace/theme/chrome");
    this.editor.getSession().setUseWrapMode(true); // word wrapping
    this.editor.setHighlightActiveLine(false); // not highlighting current line
    this.editor.setShowPrintMargin(false); // no 80 column margin
    this.editor.renderer.setShowGutter(false); // no line numbers
    this.editor.resize(); // adapt to the content
    this.editor.setOptions({
        fontFamily: "tahoma",
        fontSize: "10pt"
    });
};

DistributedEditor.prototype.initEditorBehaviour = function(){
    var self = this, position, index, id, pair;
    this.editor.getSession().on('change', function(e) {
        $("#"+self.id).height(
            self.editor.getSession().getDocument().getLength() *
		self.editor.renderer.lineHeight);
        self.editor.resize();
        // #1 the local operation is an insertion
        if ((e.data.action === 'insertText'||e.data.action === 'removeText')&&
            !self.fromRemote){
            position = self.editor.selection.getCursor();
            index = self.editor.getSession().getDocument().positionToIndex(
                position);
            if (e.data.action === 'insertText'){
                ei = self.sequence.insert(e.data.text, index);
                self.causality.incrementFrom({_e:ei._i._s[ei._i._s.length-1],
                                              _c:ei._i._c[ei._i._c.length-1]});
                self.network.broadcast(ei);
            };
            if (e.data.action === 'removeText'){
                id = self.sequence.remove(index);
                self.network.broadcast(id);
            };
        };
    });
};

DistributedEditor.prototype.initNetworkBehaviour = function(){
    var self = this, pair, i;
    this.network.on("receive", function(message) {
        if (message._e !== null && message._e !== undefined){
            pair = {_e: message._i._s[message._i._s.length-1],
                    _c: message._i._c[message._i._c.length-1] };
            self.causality.incrementFrom(pair);
            self.applyInsert(message);
        } else if (message._d !== null && message._d !== undefined){           
            self.buffer.push(message);
        };
        i = 0;
        while (i<self.buffer.length){
            pair = {_e: self.buffer[i]._s[self.buffer[i]._s.length-1],
                    _c: self.buffer[i]._c[self.buffer[i]._c.length-1] };
            if (self.causality.isRdy(pair)){
                self.applyRemove(self.buffer[i]);
                self.buffer.splice(i,1);
            } else {
                ++i;
            };
        };
    });
};


/*!
 * \brief function that applies an insert from a remote site into the ace 
 * document.
 * \param message the message to deliver containing an insert
 */
DistributedEditor.prototype.applyInsert = function(message){
    var document = this.editor.getSession().getDocument(),
        index = this.sequence.applyInsert(message._e,message._i),
        delta = {action: 'insertText',
                 range: { start: document.indexToPosition(index-1),
                          end:   document.indexToPosition(index)},
                 text: message._e},
        tempFromRemote = this.fromRemote;
    
    this.fromRemote = true;
    document.applyDeltas([delta]);
    this.fromRemote = tempFromRemote;
};

/*!
 * \brief function that applies a remove from a remote site into the ace 
 * document.
 * \param message the message from a remote site containing the remove
 */
DistributedEditor.prototype.applyRemove = function(message){
    var document = this.editor.getSession().getDocument(),
        index = this.sequence.applyRemove(message),
        delta,
        tempFromRemote;
    
    if (index !== -1){
        delta = {action: 'removeText',
                 range: { start: document.indexToPosition(index - 1),
                          end:   document.indexToPosition(index)},
                 text: null};
        tempFromRemote = this.fromRemote;
        this.fromRemote = true;
        document.applyDeltas([delta]);
        this.fromRemote = tempFromRemote;
    };
};


function applyAntiEntropy (elements){
    var self = distributedEditor; // (TODO) fix uglyness again
    var document = self.editor.getSession().getDocument(),
        LSEQNodePrototype = Object.getPrototypeOf(self.sequence.get(0)),
        TriplePrototype = Object.getPrototypeOf(self.sequence.get(0).t),
        tempNode, pair, index, result, delta, tempFromRemote;

    for (var i = 0; i<elements.length;++i){
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
        if (!self.causality.isLower(pair)){
            self.causality.incrementFrom(pair); 
            result = self.sequence.root.add(elements[i]);
            index = -1;
            if (result !== -1){
                self.sequence.length += 1;
                index = self.sequence.root.indexOf(elements[i]);
            };
            if (index !== -1){
                delta = {action: 'insertText',
                         range: { start:document.indexToPosition(index-1),
                                  end  :document.indexToPosition(index)},
                             text: tempNode.e};
                tempFromRemote = self.fromRemote;
                self.fromRemote = true;
                document.applyDeltas([delta]);
                self.fromRemote = tempFromRemote;
            };
        };
    };
};
