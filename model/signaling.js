
/*!
 * \brief handle the signaling server
 */
function Signaling(uid, network, remoteUid){
    this.uid = uid;
    this.network = network;
    this.remoteUid = remoteUid || null;
    //this.address = "file:///Users/chat-wane/Desktop/project/crate/"
    this.address = "http://chat-wane.github.io/CRATE/";
    this.signalingServer = "https://ancient-shelf-9067.herokuapp.com";
    this.socketIOConfig = { "force new connection": true, "reconnect" : false,
                            "connect timeout": 5000 };
    this.startedSocket = false;
    this.socket = null;
};

Signaling.prototype.createSocket = function(){
    var self = this;
    if(!this.startedSocket){
        this.socket = io(this.signalingServer, this.socketIOConfig);        
        this.startedSocket = true;
        this.socket.on("launchResponse", function(message){
            self.network._membership.answer(message);
        });
        this.socket.on("answerResponse", function(message){
            self.network._membership.handshake(message);
            self.startSocket = false;
            self.socket.disconnect();
        });
        this.socket.on("disconnect", function(){
            self.startedSocket = false;
            self.socket = null;
        });
    };
};

Signaling.prototype.startSharing = function(){
    this.createSocket();
    this.socket.emit("launch", this.uid);
    return this.address+"index.html?"+this.uid;
};

Signaling.prototype.startJoining = function(uid){
    this.createSocket();
    this.network._membership.launch();
};
