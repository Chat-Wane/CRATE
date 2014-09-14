var util = require('util');
require('lseqarray/lib/base.js').getInstance(8);
var LSEQ = require('lseqarray');
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

Application.prototype.getOperation = function(couple){
    var found = false;
    var i = this._lseq.length;
    var result = null;
    while (!found && i>0){
	if ((this._lseq._array[i]._i._s[this._lseq._array[i]._i._s.length-1]==
	     couple._e) && 
	    (this._lseq._array[i]._i._c[this._lseq._array[i]._i._c.length-1]== 
	     couple._c)){
	    found = true;
	    result = this._lseq._array[i];
	};
	--i;
    };
    return result;
};

module.exports = Application;
