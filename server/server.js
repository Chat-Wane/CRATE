var http = require("http");
var IP = "0.0.0.0";
var PORT = 8081;


var offers = new Object();

http.createServer( function (req, res){
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*' // implementation of CORS
    });
    
    req.on('data', function (chunk) {
        // #1 parse the newly received offer
        var object = JSON.parse(chunk);
        if (object.type==="launch"){
            // #2 register the offer and the requester            
            offers[object.id] = {socket =  }
        };
        if (object.type==="answer"){
            // #3 get the proper offer, get 
        };
    });
    
    res.end('callback(\'{\"msg\": \"OK\"}\')');

}).listen(8081, '0.0.0.0');

console.log("Signaling server is running on: "+IP+":"+PORT);
console.log("CTRL-c to stop the server");

