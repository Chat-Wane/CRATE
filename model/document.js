/*!
 * \brief document containing the shared sequence and causality metadata
 * \param id the identifier of the document
 * \param sequence the shared sequence
 * \param causality the causality metadata
 */
function Document(id, sequence, causality){
    this.id = id;
    this.sequence = sequence;
    this.causality = causality;    
};

/*!
 * \brief parse an object into a document
 * \param object the JSON object
 */
Document.prototype.fromObject = function(object){
    var causality = object.causality,
        sequence = object.sequence,
        id = object.id;
    // #0 (TODO) make it not ugly
    var protoLSEQTree = Object.getPrototypeOf(this.sequence);
    var protoLSEQNode = Object.getPrototypeOf(this.sequence.root);
    var protoTriple = Object.getPrototypeOf(this.sequence.root.children[0].t);
    var protoVVwE = Object.getPrototypeOf(this.causality);
    var protoVVwEEntry = Object.getPrototypeOf(this.causality.local);
    // #1A cast the causality vector to the proper prototype
    Object.setPrototypeOf(causality, protoVVwE);
    Object.setPrototypeOf(causality.local, protoVVwEEntry);
    for (var i=0; i<causality.vector.length; ++i){
        Object.setPrototypeOf(causality.vector[i], protoVVwEEntry);
    };
    // #1B cast the sequence to the proper prototype
    sequence._hash = this.sequence._hash; // (TODO) fix the ugliest thing ever
    Object.setPrototypeOf(sequence, protoLSEQTree);
    Object.setPrototypeOf(sequence.root, protoLSEQNode);
    function castChildNode(childNode){
        Object.setPrototypeOf(childNode, protoLSEQNode);
        Object.setPrototypeOf(childNode.t, protoTriple);
        if (childNode.children.length === 0){return;}
        for (var i = 0; i<childNode.children.length; ++i){
            castChildNode(childNode[i]);
        };
    };
    for (var i=0; i<sequence.root.children.length; ++i){
        castChildNode(sequence.root.children[i]);
    };
    
    this.sequence = sequence;
    this.sequence._s = this.causality.local.e;
    this.sequence._c = this.causality.local.v;

    this.causality.vector = causality.vector;
    this.causality.incrementFrom({_e:this.causality.local.e,
                                  _c:this.causality.local.v});
    this.id = id;
};

Document.prototype.localInsert = function(element, index){
    var ei = this.sequence.insert(element, index);
    this.causality.incrementFrom({ _e:ei._i._s[ei._i._s.length-1],
                                   _c:ei._i._c[ei._i._c.length-1]} );
    return ei;
};

Document.prototype.localRemove = function(index){
    return this.sequence.remove(index);
};

Document.prototype.remoteInsert = function(element, identifier){
    var index = -1,
        pair = {_e: identifier._s[identifier._s.length-1],
                _c: identifier._c[identifier._c.length-1]};
    if (!this.causality.isLower(pair)){
        this.causality.incrementFrom(pair);
        index = this.sequence.applyInsert(element, identifier);
    };
    return index;
};

Document.prototype.remoteRemove = function(identifier){
    var index = -1,
        pair = {_e: identifier._s[identifier._s.length-1],
                _c: identifier._c[identifier._c.length-1]};
    if (this.causality.isRdy(pair)){
        index = this.sequence.applyRemove(identifier);
    } else {
        this.causality.incrementFrom(pair);
    };
    return index;
};

Document.prototype.antiEntropyInsert = function(node, pair){
    // (TODO) add it into LSEQTree module
    var result = -1, index = -1;
    if (!this.causality.isLower(pair)){
        this.causality.incrementFrom(pair);
        result = this.sequence.root.add(node);
        if (result !== -1){
            this.sequence.length += 1;
            index = this.sequence.root.indexOf(node);
        };        
    };
    return index;
};


/*!
 * \brief search a set of elements in our sequence and return them
 * \param toSearch the array of elements {_e, _c} to search
 * \returns an array of nodes
 */
Document.prototype.getElements = function(toSearch){
    var result = [], found, node, tempNode, i=0, j=0;
    // (TODO) improve research by exploiting the fact that if a node is
    // missing, all its children are missing too.
    // (TODO) improve the returned representation: either a tree to factorize
    // common parts of the structure or identifiers to get the polylog size
    // (TODO) improve the search by using the fact that toSearch is a sorted
    // array, possibly restructure this argument to be even more efficient
    while (toSearch.length > 0 && i<this.sequence.length){
	node = this.sequence.get(i+1);
	tempNode = node;
	while( tempNode.children.length > 0){
	    tempNode = tempNode.children[0];
	};
	j = 0;
	found = false;
	while (j < toSearch.length && !found){
	    if (tempNode.t.s === toSearch[j]._e &&
		tempNode.t.c === toSearch[j]._c){
	        found = true;
                toSearch.splice(j,1);
                result.push(node);
            } else {
                ++j;
            };
        };
        ++i;
    };
    return result;
};
