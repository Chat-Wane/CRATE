
/*!
 * \brief handle the signaling server
 * \param name the identifier used at the signaling server to identify your
 * editing session
 * \param rps the random peer sampling protocol
 */
function Signaling(name, rps){
    this.name = name;
    this.rps = rps;
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
    this.timeout = null; // event id of the termination
    this.joiners = 0;
};

Signaling.prototype.createSocket = function(){
    var self = this;
    if(!this.startedSocket){
        this.socket = io(this.signalingServer, this.socketIOConfig);
        this.startedSocket = true;
        this.socket.on("connect", function(){
            console.log("Connection to the signaling server established");
        });
        this.socket.on("launchResponse", function(destUid, offerTicket){
            self.joiners = self.joiners + 1;
            self.rps.answer(offerTicket, function(stampedTicket){
                console.log("answered");
                self.socket.emit("answer", self.rps.id, destUid, stampedTicket);
            });
        });
        this.socket.on("answerResponse", function(handshakeMessage){
            self.rps.handshake(handshakeMessage);
            self.socket.disconnect();
        });
        this.socket.on("disconnect", function(){
            console.log("Disconnection from the signaling server");
            self.startedSocket = false;
            self.joiners = 0;
            clearTimeout(this.timeout);
        });
    }

    // restart timer before closing the connection
    if (this.timeout!==null){ clearTimeout(this.timeout); }; 
    this.timeout = setTimeout(function(){
        self.stopSharing();
    }, this.socketDuration);
};

Signaling.prototype.startSharing = function(){
    var self = this;
    this.createSocket();
    this.socket.on("connect", function(){
        self.socket.emit("share", self.name);
    });
    return this.socket;
};

Signaling.prototype.stopSharing = function(){
    this.socket.emit("unshare", this.name);
    this.socket.disconnect();
    this.timeout = null;
};

Signaling.prototype.startJoining = function(originName){
    var self = this;
    this.createSocket();
    this.socket.on("connect", function(){
        self.rps.launch(function(launchMessage){
            console.log("launched");
            self.socket.emit("launch", originName, self.rps.id, launchMessage);
        });
    });
    return this.socket;
};


