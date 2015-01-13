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
 * \brief search a set of elements in our sequence and return them
 * \param toSearch the array of elements {_e, _c} to search
 * \returns an array of nodes
 */
Document.prototype.getElements = function(toSearch){
    var result = [];
    var i = 0;
    while (toSearch.length > 0 && i<this.sequence.length){
	var node = this.sequence.get(i+1);
	var tempNode = node;
	while( tempNode.children.length > 0){
	    tempNode = tempNode.children[0];
	};
	var j = 0;
	var found = false;
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
