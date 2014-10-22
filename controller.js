var EventEmitter = require('events').EventEmitter;
var util = require('util');
var Peer = require('./model/peer.js');
var LSEQApplication = require('./model/application.js');

util.inherits(EditorController, EventEmitter);

function EditorController(editor, siteId){
    EventEmitter.call(this);
    this._peer = null;
    self = this;
    
    // #2 change the seed of neighbours
    this.on('start', function(localAddress,mask,remoteAddress){
	// #2a disconnect
	seedlist = [];
	seedlist.push({address:remoteAddress.split(":")[0],
		       port:parseInt(remoteAddress.split(":")[1]) });
	
	self._peer = new Peer(localAddress.split(":")[0],
			      parseInt(localAddress.split(":")[1]),
			      mask,
			      seedlist,
			      new LSEQApplication(siteId),
			      siteId);

	self._peer._application.on('remoteINS', function(i,e){
	    if (i>0){
		if (e.indexOf("\n")>0) {e='\n';};
		editor.insertText(i-1, e);
	    };
	});
	
	self._peer._application.on('remoteDEL', function(i){
	    if (i>0){
		editor.deleteText(i-1,i);
	    };
	});
	self._peer.on('connect', function(){
		console.log("connection established");
	});

	self._peer.start();

	editor.editor.enable();
    });
    
    // #3 handle local modifications
    editor.on('text-change', function(delta, source){
	if (source === 'user'){
	    if (delta.startLength < delta.endLength){ // INS
		var couple = {_e:null, _i:null};
		if ("value" in delta.ops[0]){
		    couple._e = delta.ops[0].value
		};
		if ("value" in delta.ops[1]){
		    couple._e = delta.ops[1].value;
		};
		// handle no breaking space \n
//		if (couple._e.indexOf("\n")>=0){ couple._e = "\n";};
		couple._i = editor.getSelection().start-1;
		self._peer._application.emit('INS',couple);
	    };
	    if (delta.startLength > delta.endLength){ // DEL
		self._peer._application.emit('DEL',
					     editor.getSelection().start);
	    };
	};
    });
    
};

module.exports = EditorController;
