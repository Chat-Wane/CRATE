var smoke = require('smokesignal');
var Node = require('smokesignal/lib/node.js');
var os = require('os');
var Netmask = require('netmask').Netmask;
var util = require('util');

var SimpleStream = require('./simplestream.js');
var c = require('./config.js');
var VVwE = require('causaltrack').VVwE;

util.inherits(Peer, Node);

/*!
 * \class Peer
 * \brief Provide a reliable and scalable communication assuming a 50+
 * percentage of travelling coverage by the operations
 */
function Peer(address, port, mask, seedlist, application, siteId){
    
    var opts = {
	port: port,
	address: this.localIP(address, mask),
	seeds: seedlist,
	minPeerNo: c.NEIGHBOURS,
	maxPeerNo: c.NEIGHBOURS
    };
    Node.call(this,opts);
    // #1 init the peer
    // #1a the application layer
    this._application = application;
    this._application.setCommunication(this);

    // #1a consistency guarentees
    this._vvwe = new VVwE(siteId);

    // #1b communication
    this._simpleStream = new SimpleStream(this);
    this._simpleStream.pipe(this.broadcast).pipe(this._simpleStream);
    
    var self=this;    
    
    // #2 local update event
    this.on("local", function(operation){
	if (operation._type == "INS"){
	    self._vvwe.increment();
	};
	var msg = new Buffer(JSON.stringify({_operation: operation}));
	self._broadcast(msg);
    });
    
    // #3 receive update event
    this.on('message', function(msg){
	var realMsg = JSON.parse(msg);
	if ("_operation" in realMsg){
	    self.receive(realMsg._operation);
	} else if ("_response" in realMsg){
	    for (var i=0; i<realMsg._response.length; ++i){
		self.receive({_type:'INS',
			      _i:realMsg._response[i]._i,
			      _e:realMsg._response[i]._e});
	    };
	};
    });
    
    // #4 membership add
    this.peers.on('add', function(peer) {
	// #4a remote peer requested some operations
	peer.socket.data(['peer', 'operationRequest'], function(msg){
	    var realMsg = JSON.parse(msg);
	    self.emit("operationRequest",
		      realMsg._request,
		      peer);
	});
	// #4b local peer request operations
	peer.socket.data(['peer', 'operationResponse'], function(delta){
	    self.emit("message", delta);
	});
    });

    this.on("operationRequest", function(delta, peer){
	var result = [];
	for (var i = 0; i<delta.length; ++i){
	    for (var j = 0; j<delta[i]._c.length; ++j){
		var couple = {_e:delta[i]._e, _c:delta[i]._c[j]};
		if (self._vvwe.isLower(couple)){//operation exists
		    var op = self._application.getOperation(couple);
		    if (op !== null){
			result.push(op);
		    };
		};
	    };
	};
	var msg = JSON.stringify({_response:result});
	peer.socket.send(['peer','operationResponse'], msg);
    });
    
    // #5 anti-entropy mechanism
    setInterval(function(){
	var n = self.peers.list;
	var keys = Object.keys(self._vvwe._v); // (Object.keys doesnt scale)
	var result = [];
	for (var i = 0; i < keys.length; ++i){
	    var entry = keys[i];
	    if((entry in self._vvwe._x) &&
	       self._vvwe._x[entry].length > 0){
		var couple = {_e:keys[i], _c:(self._vvwe._x[entry]) };
		result.push(couple);
	    };
	};
	if (result.length > 0){
	    msg = JSON.stringify({_request:result});
	    for (var k=0; k < self.peers.list.length ;++k){
		self.peers.list[k].socket.send(['peer','operationRequest'],
					       msg);
	    };
	};
    }, c.ANTIENTROPY); // End anti-entropy

};

Peer.prototype.receive = function(operation){
    var couple = {_e: operation._i._s[operation._i._s.length - 1],
		  _c: operation._i._c[operation._i._c.length - 1]};
    if (((operation._type=='INS')&&(!this._vvwe.isLower(couple))) ||
	((operation._type=='DEL')&&(this._vvwe.isRdy(couple)))) { 
	this._vvwe.incrementFrom(couple);
	this._application.emit("deliver", operation);
    };
};

Peer.prototype._broadcast = function(msg){
    this._simpleStream.push(msg);
};


Peer.prototype.localIP = function(subnet,mask) {
    //Determine my IP
    var interfaces = os.networkInterfaces()
    , block = new Netmask(subnet+"/"+mask)
    , ip
    for(var name in interfaces) {
	for(var i=0 ; i < interfaces[name].length; ++i) {
	        if(interfaces[name][i].family == 'IPv6') continue
	        if(!block.contains(interfaces[name][i].address))
		        { continue;}
	        return interfaces[name][i].address
	    }
    }
    throw new Error('Couldn\'t determine IP address')
};



module.exports = Peer;
