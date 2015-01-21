
/*!
 * \brief The editing session is the object that contains the document and 
 * handle the network part.
 * \param uid the unique site identifier of the local site
 */
function EditingSession(uid){
    this.network = null;
    this.document = null;
    
    var self = this;
    setInterval(function(){
        if (self.document!==null && self.network!==null){
            self.antiEntropy();
        };
    }, 10000);  
};

/*!
 * \brief close the current document and disconnect from the network
 */
EditingSession.prototype.closeDocument = function(){
    // #1 (TODO) close the network properly
    this.network = null;
    this.document = null;
};

/*!
 * \brief create a new document to edit
 * \param name the name of the new document
 * \param uid the unique site identifier of the local peer
 */
EditingSession.prototype.newDocument = function(name, uid){
    // #1 (TODO) close the current document
    // #2 initialize the network and create a new document
    this.network = new Network(uid);
    this.document = new Document(name, new LSEQTree(uid), new VVwE(uid));
    
    /*!
     * \brief Overload the receiving part of membership since the message is 
     * not sent and receive as a broadcast
     */
    var self = this;
    this.network._membership.on("churn", function(origin, message){
        if (message.type === "MAntiEntropyRequest"){
            console.log("received: "+ message.type);
            // #1 retrieve the proper document
            var document = self.document; // (TODO) search id
            var causality = document.causality;
            // #2 perform the difference between the two causality structures
            var j = 0;
            var toSearch = [];
            for (var i=0; i<message.causality.vector.length; ++i){
                var found = false;
                while(j<causality.vector.length && !found){
                    // #A the entry in our vector does not exist un message
                    if (message.causality.vector[i].e>causality.vector[j].e){
                        for (var k=1; k<=causality.vector[j].v; ++k){
                            if (causality.vector[j].x.indexOf(k) < 0){
                                toSearch.push({_e: causality.vector[j].e,
                                               _c: k});
                            };
                        };
                        ++j;
                    } else {
                        // #B exist in both vectors
                        if (message.causality.vector[i].e===
                            causality.vector[j].e){
                            for (var k = message.causality.vector[i].v + 1 ;
                                 k <= causality.vector[j].v; ++k){
                                if (causality.vector[j].x.indexOf(k) < 0){
                                    toSearch.push({_e: causality.vector[j].e,
                                                   _c: k})
                                };
                            };
                            var l = 0, k = 0;
                            while ( l < causality.vector[j].v &&
                                    k < message.causality.vector[i].x.length ){
                                l = message.causality.vector[i].x[k];
                                if (l<causality.vector[j].v &&
                                    causality.vector[j].x.indexOf(l) < 0) {
                                    toSearch.push({_e: causality.vector[j].e,
                                                   _c: l})
                                };
                                ++k;
                            };                            
                            ++j;
                            found = true;
                        } else {
                            if (message.causality.vector[i].e<
                                causality.vector[j].e){
                                found = true;
                            };
                        };
                    };
                };
            };
            while(j<causality.vector.length){
                // #A the entry in our vector does not exist un message
                for (var k=1; k<=causality.vector[j].v; ++k){
                    if (causality.vector[j].x.indexOf(k) < 0){
                        toSearch.push({_e: causality.vector[j].e,
                                       _c: k});
                    };
                };
                ++j;
            };
            // #3 get the elements within the difference
            // # (TODO) build a tree to send and create merge function in
            // LSEQTree
            var toSend = document.getElements(toSearch);
            // #4 send the elements
            origin.send(new MAntiEntropyResponse(message.idDocument,
                                                 toSend));
        };
    });
    
    this.network._membership.on("churn", function(peer, message){
        if (message.type === "MAntiEntropyResponse"){
            console.log("received: "+ message.type + "; #"+
                        message.elements.length);
            applyAntiEntropy(message.elements);
        };
    });
};


/*!
 * \brief load a document from the localstorage
 * \param name the name of the document
 * \returns true if the document exists, false otherwise
 */
EditingSession.prototype.loadDocument = function(name){
    console.log("o= ",JSON.parse(localStorage.getItem(name)));
    // #0 (TODO) close the current network
    // #1 get the proper document from the local storage
    var object = localStorage.getItem(name);
    if (object === null){ return false;};
    // #2 (TODO) cast everyting to the good prototype
    this.document = new Document(name, object.sequence, object.causality);
    // #3 (TODO) create the network
    this.network = new Network(UID);
    return true;
};

/*!
 * \brief save the current document into the localstorage
 */
EditingSession.prototype.saveDocument = function(){
    localStorage.setItem(this.document.id, JSON.stringify(this.document));
}

// #2a antiEntropy on the current document
EditingSession.prototype.antiEntropy = function (){
    console.log("start anti-entropy ");
    // #A get a random peer from the local neighbourhood
    var peers = this.network._membership.getPeers(1);
    if (peers.length >=1){
        // #B send the anti entropy request
        peers[0].send(new MAntiEntropyRequest(this.document.causality.local.e,
                                              this.document.id,
                                              this.document.causality));
    };
};
