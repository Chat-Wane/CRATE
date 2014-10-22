var util = require('util');
require('lseqtree/lib/base.js').getInstance(8);
var LSEQ = require('lseqtree');
var ID = require('lseqtree/lib/identifier.js');
var EventEmitter = require('events').EventEmitter;
util.inherits(Application, EventEmitter);

function Application(site){
    EventEmitter.call(this);

    this._lseq = new LSEQ(site);
    this._communication = null;
    var self = this;
    
    this.on('deliver', function(operation){
	if (operation._type=='INS'){
	    var index = self._lseq.applyInsert(operation._e, operation._i);
	    self.emit("remoteINS", index, operation._e);
	};
	if (operation._type=='DEL'){
	    var index = self._lseq.applyRemove(operation._i);
	    self.emit("remoteDEL", index);
	};
    });

    this.on('INS', function(couple){
	var ei = self._lseq.insert(couple._e, couple._i);
	var operation = {_type:'INS', _e:ei._e, _i:ei._i};
	self._communication.emit("local", operation);
    });
    
    this.on('DEL', function(index){
	var i = self._lseq.remove(index);
	var operation = {_type:'DEL', _i:i};
	self._communication.emit("local", operation);
    });

};

Application.prototype.setCommunication = function(communication){
    this._communication = communication;
};


// (TODO) fix for application using
// (TODO) optimize using pack of pairs
Application.prototype.getOperation = function(couple){
    var found = false;
    var i = this._lseq.length;
    var result = null;
    while (!found && i>0){
	var node = this._lseq.get(i);
	var tempNode = node;
	while (tempNode.children.length > 0){
	    tempNode = tempNode.children[0];
	};
	if ((node.t.s==couple._e) && (node.t.c==couple._c)){
	    found = true;
	    var i = new ID(null, [], []);
	    i.fromNode(node);
	    result = {_i:i, _e:tempNode.e };
	};
	--i;
    };
    return result;
};

module.exports = Application;
