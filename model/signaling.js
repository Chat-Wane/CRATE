
/*!
 * \brief handle the signaling server
 * \param uid the local unique site identifier
 * \param network the network part of the model
 */
function Signaling(uid, network){
    this.uid = uid;
    this.network = network;
    this.address = "file:///Users/chat-wane/Desktop/project/crate/"
    // this.address = "http://chat-wane.github.io/CRATE/";
    // this.signalingServer = "https://ancient-shelf-9067.herokuapp.com";
    // this.signalingServer = "http://adrouet.net:5000";
    this.signalingServer = "http://127.0.0.1:5000";
    this.socketIOConfig = { "force new connection": true,
                            "reconnection": false };
    this.startedSocket = false;
    this.socket = null;
    this.socketDuration = 5 * 60 * 1000;
    this.timeout = null;
};

Signaling.prototype.createSocket = function(){
    var self = this;
    if(!this.startedSocket){
        this.socket = io(this.signalingServer, this.socketIOConfig);
        this.startedSocket = true;
        this.socket.on("connect", function(){
            console.log("Connection to the signaling server established");
        });
        this.socket.on("launchResponse", function(message){
            self.network._membership.answer(message, function(answerMessage){
                setTimeout(function(){
                    console.log("answered");
                    self.socket.emit("answer", self.uid, answerMessage);
                }, 1500);
            });
        });
        this.socket.on("answerResponse", function(handshakeMessage){
            self.network._membership.handshake(handshakeMessage);
            self.startedSocket = false;
            self.socket.disconnect();
        });
        this.socket.on("disconnect", function(){
            console.log("Disconnection from the signaling server");
            self.startedSocket = false;
        });
    }

    // restart timer before closing the connection
    if (this.timeout!==null){ clearTimeout(this.timeout); }; 
    this.timeout = setTimeout(function(){
        self.socket.emit("unshare");
        self.timeout = null;
    }, this.socketDuration);
};

Signaling.prototype.startSharing = function(){
    var self = this;
    this.createSocket();
    this.socket.on("connect", function(){
        self.socket.emit("share", self.uid);
    });
    return this.socket;
};

Signaling.prototype.startJoining = function(originUid){
    var self = this;
    this.createSocket();
    this.socket.on("connect", function(){
        self.network._membership.launch(
            function(launchMessage){
                setTimeout(function(){
                    console.log("launched");
                    self.socket.emit("launch",
                                     originUid, self.network._membership.uid,
                                     launchMessage);
                }, 1500);
            });
    });
    return this.socket;
};
