var http = require("http").createServer(httpHandler);
var io = require("socket.io")(http);
var LRU = require('lru-cache');
var url = require('url');
var fs  = require("fs");

var PORT = 8080;

http.listen(PORT);

/*!
 * \brief the files are served
 */
function httpHandler(req, res) {
    var page = url.parse(req.url).pathname;
    if (page==="/"){ page = "../index.html"; } else { page = "../"+page;};
    fs.readFile(page, function (err, data) {
        if (err){
            res.writeHead(500);
            return res.end("ERROR: "+ page + "NOT FOUND.");
        };
        res.writeHead(200);
        res.end(data);
    });
};

/*!
 * \brief a peer is connected to the server. The protocol will allow to 
 * retrieve the offer and create a network. Important notice: this server
 * does not hold the data forever, it must delete over time 
 */
//var signalStore = LRU(500);
var signalStore;
io.on('connection', function(socket){
    console.log("A peer is connected");
    socket.on("disconnect", function(){
        console.log("A peer disconnected");
    });

    socket.on("launch", function(uid, message){
        if (message===undefined || message===null){
            var key = JSON.stringify(uid);
            console.log("UIIDUDUDUDI = "  + key);
            signalStore = socket;
        } else {
            var key = JSON.stringify(uid);
            var targetSocket = signalStore;
            targetSocket.emit("launchResponse", message);
            signalStore = socket;
        };
    });
    
    socket.on("answer", function(uid, message){
        var targetSocket = signalStore;
        targetSocket.emit("answerResponse", message);
    });

});

console.log("Signaling server is running on port: "+PORT);
console.log("CTRL-c to stop the server");

