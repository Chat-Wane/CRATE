
/*!
 * \brief The cadaver is the object that contains the content of the webpage.
 * \param uid the unique site identifier of the local site
 * \param id the unique identifier of the cadaver
 */
function Cadavre(uid, id){
    this.uid = uid;
    this.id = id;

    this.network = new Network(uid);
    
    this.documents = [];

    // #1a generate a new document, the older goes read-only
    var self = this;
    this.createDocument = function(){
	var ivv = new IVV(uid);
	var sequence = new LSEQTree(uid);
	var document = new Document(uid, self.documents.length,
				    sequence, ivv);
	self.documents.push(document);
	return document;
    };
    // #1b after a while, the read/write document becomes read-only locally
    // setTimeout( function() {
    // self.createDocument();
    //	console.log("new document created");
    //	// (TODO) impact on user interface
    //}, 300000); // 5 minutes (TODO) conf
    
    
    // #2a antiEntropy on a document
    this.antiEntropy = function (document){
	console.log("start anti-entropy on document ", document.id);
	// #A get a random peer from the local neighbourhood
	var peers = membership.getPeers(1);
	if (peers.length >=1){
	    // #B send the anti entropy request
	    peers[0].send(new MAntiEntropyRequest(uid,
						  document.id,
						  document.causality));
	};
    };
    // #2b antientropy after a while
    setInterval( function(){
	self.antiEntropy(self.documents[self.documents.length-1]);
    }, 10000); // (TODO) config
    
    this.network._membership.on("churn", function(origin, message){
	if (message.type === "MAntiEntropyRequest"){
	    console.log("received: "+ message.type);
	    // #1 retrieve the proper document
	    var document = self.documents[message.idDocument];
	    var causality = document.causality;
	    // #2 perform the difference between the two causality structures
	    var j = 0;
	    var toSearch = [];
	    for (var i=0; i<=message.causality.vector.length; ++i){
		var found = false;
		while(j < causality.vector.length && !found){
		    // #2a the entry exists in both vectors, process the
		    // difference
		    if (i<message.causality.vector.length &&
			message.causality.vector[i].e ===
			causality.vector[j].e ){
			found = true;
			for (var k = message.causality.vector[i].v + 1 ;
			     k <= causality.vector[j].v; ++k){
			    toSearch.push({_e: causality.vector[j].e,
					   _c: k})
			};
		    } else {
			//#2b the entry does not exist, must send all elements
			for (var k=1; k<=causality.vector[j].v; ++k){
			    toSearch.push({_e: causality.vector[j].e,
					   _c: k});
			};
		    };
		    ++j;
		};
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

