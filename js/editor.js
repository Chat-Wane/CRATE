var causality = currentDocument.causality;
var sequence = currentDocument.sequence;
var buffer = [];

// #1 initialize the editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/chrome");
editor.getSession().setUseWrapMode(true); // word wrapping
editor.setHighlightActiveLine(false); // not highlighting current line
editor.setShowPrintMargin(false); // no 80 column margin
editor.renderer.setShowGutter(false); // no line numbers
editor.resize(); // adapt to the content

// #2 each change resize the editor, otherwise, it uses an scrollbar
// and does not adapt to the content
var fromRemote = false;
editor.getSession().on('change', function(e) {
    $('#editor').height(editor.getSession().getDocument().getLength() *
			editor.renderer.lineHeight);
    editor.resize();
    // #2a the local operation is an insertion
    if (e.data.action === 'insertText' && !fromRemote){
	var pos = editor.selection.getCursor();
	var index = editor.getSession().getDocument().positionToIndex(pos);
	causality.increment();
	var pair = sequence.insert(e.data.text, index);
	network.broadcast(pair);
    };
    // #2b the local operation is a remove
    if (e.data.action === 'removeText' && !fromRemote){
	var pos = editor.selection.getCursor();
	var index = editor.getSession().getDocument().positionToIndex(pos);
	var id = sequence.remove(index);
	network.broadcast(id);
    };
});

// #3 handle received messages
network.on("receive", function(message) {
    if (message._e !== null && message._e !== undefined){
	// #3a if the operation is a remote insertion
	var pair = {_e: message._i._s[message._i._s.length-1],
		    _c: message._i._c[message._i._c.length-1] };
	causality.incrementFrom(pair);
	applyInsert(message);
    } else if (message._d !== null && message._d !== undefined){
	// #3b if the operation is a remote remove, put it in buffered remove
	buffer.push(message);
    };
    // #3c check all the remove messages. If they are ready, apply them
    var i = 0;
    while (i<buffer.length){
	// #A get the unique site identifier and counter of the operation
	var pair = {_e: buffer[i]._s[buffer[i]._s.length-1],
		    _c: buffer[i]._c[buffer[i]._c.length-1] };
	// #B is the operation ready ?
	if (causality.isRdy(pair)){
	    applyRemove(buffer[i]);
	    buffer.splice(i,1);
	} else {
	    ++i;
	};
    };
});


/*!
 * \brief function that applies an insert from a remote site into the ace 
 * document.
 * \param message the message to deliver containing an insert
 */
function applyInsert(message){
    var document = editor.getSession().getDocument();
    var index = sequence.applyInsert(message._e,message._i);
    var delta = {action: 'insertText',
		 range: { start: document.indexToPosition(index-1),
			  end: document.indexToPosition(index)},
		 text: message._e}
    var tempFromRemote = fromRemote;
    fromRemote = true;
    document.applyDeltas([delta]);
    fromRemote = tempFromRemote;
};

/*!
 * \brief function that applies a remove from a remote site into the ace 
 * document.
 * \param message the message from a remote site containing the remove
 */ 
function applyRemove(message){
    var document = editor.getSession().getDocument();
    var index = sequence.applyRemove(message);
    // #1 if the index is found
    if (index !== -1){
	// #2 create the delta
	var delta ={action: 'removeText',
		    range: { start: document.indexToPosition(index - 1),
			     end: document.indexToPosition(index)},
		    text: null};
	var tempFromRemote = fromRemote;
	fromRemote = true;
	// #3 apply the delta locally
	document.applyDeltas([delta]);
	fromRemote = tempFromRemote;
    };
};


function applyAntiEntropy(elements){
    console.log("A");
    var LSEQNodePrototype = Object.getPrototypeOf(sequence.get(0));
    var TriplePrototype = Object.getPrototypeOf(sequence.get(0).t);

    var document = editor.getSession().getDocument();
    console.log("B");
    for (var i = 0; i<elements.length;++i){
        console.log("C");
	// #1 convert the json object to an lseqnode
	// (TODO) stop ugly things
        var tempNode = elements[i];
	while (tempNode.children.length > 0){
	    Object.setPrototypeOf(tempNode.t, TriplePrototype);
	    Object.setPrototypeOf(tempNode, LSEQNodePrototype);
	    tempNode = tempNode.children[0];
	};
	Object.setPrototypeOf(tempNode.t, TriplePrototype);
	Object.setPrototypeOf(tempNode, LSEQNodePrototype);
	// #2 integrate the element if it has not been received before
	var pair = {_e : tempNode.t.s, _c: tempNode.t.c};
	var index = -1;
        console.log("D");
	if (!causality.isLower(pair)){
            console.log("E");
	    causality.incrementFrom(pair);	
	    var result = sequence.root.add(elements[i]);
	    if (result !== -1){
		sequence.length += 1;
		index = sequence.root.indexOf(elements[i]);
	    };
	    if (index !== -1){
		var delta = {action: 'insertText',
	                     range: { start: document.indexToPosition(index-1),
                                      end: document.indexToPosition(index)},
                             text: tempNode.e};
                var tempFromRemote = fromRemote;
                fromRemote = true;
                document.applyDeltas([delta]);
                fromRemote = tempFromRemote;
            };
        };
    };
};
