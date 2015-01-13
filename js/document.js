/*!
 * \brief A document contains the metadata necessary to retrieve the string
 * composing the document and to keep track of remote modifications as well.
 * \param uid the unique site identifier of the local site
 * \param id the unique identifier of the document
 * \param sequence the distributed data structure that represents a sequence
 * \param causality the causality tracking structure of this document
 * \param authors the authors that contributed to the authoring of the document
 * \param data the date when the document was created
 */
function Document(uid, id, sequence, causality, authors, endDate, startDate){
    this.id = id;
    this.sequence = sequence;
    this.causality = causality;
    this.authors = authors || [];
    this.startDate = startDate || new Date(Date.now());
    this.endDate = endDate || new Date(Date.now() + (132*60000));
    
    // #1 gets the elements from the toSearch array
    var self = this;
    this.getElements = function(toSearch){
	var result = [];
	var i = 0;
	while (toSearch.length > 0 && i<self.sequence.length){
	    var node = self.sequence.get(i+1);
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
};
