
/*!
 * \brief handle the signaling server
 * \param uid the local unique site identifier
 * \param network the network part of the model
 */
function Signaling(uid, network){
    this.uid = uid;
    this.network = network;
    this.address = "file:///Users/chat-wane/Desktop/project/crate/"
    //    this.address = "http://chat-wane.github.io/CRATE/";
    this.signalingServer = "https://ancient-shelf-9067.herokuapp.com";
    // this.signalingServer = "http://www.adrouet.net:80";
    this.socketIOConfig = { "force new connection": true,
                            "reconnection": false };
    this.startedSocket = false;
    this.socket = null;
    this.socketDuration = 60 * 1000;
};

Signaling.prototype.createSocket = function(){
    var self = this;
    if(!this.startedSocket){
        this.socket = io(this.signalingServer, this.socketIOConfig);
        setTimeout(function(){
            if (self.startedSocket){
                self.socket.disconnect();
                self.startedSocket = false;
            };
        },this.socketDuration);
        this.startedSocket = true;
        this.socket.on("connect", function(){
            console.log("Connection to the signaling server established");
        });
        this.socket.on("launchResponse", function(message){
            self.network._membership.answer(message, function(answerMessage){
                setTimeout(function(){
                    self.socket.emit("answer", self.uid, answerMessage);
                    setTimeout(function(){self.socket.disconnect();},2000);
                },1500);
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
            self.socket = null;
        });
    };
};

Signaling.prototype.startSharing = function(){
    var self = this;
    this.createSocket();
    this.socket.on("connect", function(){
        self.socket.emit("launch", self.uid);
    });
    return this.socket;
};

Signaling.prototype.startJoining = function(uid){
    var self = this;
    this.createSocket();
    this.socket.on("connect", function(){
        self.network._membership.launch(
            function(launchMessage){
                setTimeout(function(){
                    self.socket.emit("launch", uid, launchMessage);
                }, 1500 );
            });
    });
    return this.socket;
};
