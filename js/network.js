var address = "http://chat-wane.github.io/CRATE/";
var membership = network._membership;
var socketIOConfig = {
    'force new connection': true,
    "reconnect" : false,
    "connect timeout" : 5000
};
var signalingAddresses = "https://ancient-shelf-9067.herokuapp.com";
var startSocket = false;

function createSocket(uid, initialize){
    socket = io(signalingAddresses, socketIOConfig);
    startSocket = true;
    if (initialize){
        socket.emit("launch", UID);
    } else {
        membership.launch(
            function(message){
                setTimeout(function(){
                    socket.emit("launch",uid, message);
                }, 1500);
            }
        );
    };
    socket.on("launchResponse", function(message){
        membership.answer(message);
    });
    membership.on("answer", function(message){
        if (startSocket){
            $("#alertGenerateOffer").hide() // (TODO) fix the uglyness
        };
        socket.emit("answer", UID, message);
        startSocket = false;
        socket.disconnect();
    });
    socket.on("answerResponse", function(message){
        membership.handshake(message);
        startSocket = false;
        socket.disconnect();
    });    
};

if ((document.URL.split("?")).length>1){
    createSocket(document.URL.split("?")[1], false);
};

$("#share").click( function(){
    $("#dropdownNetwork").toggle();
    $("#fieldGenerateOffer").val("");
    $("#alertGenerateOffer").show();
    $("#alertAcceptOffer").hide();
    $("#alertConfirmHandshake").hide();            
    $("#fieldGenerateOffer").val(address+"index.html?"+UID);
    createSocket(UID, true);
});

// #0 manual part of the membership && state of membership management
membership.on("launch", function(message){
    var data = encodeURIComponent(JSON.stringify(message));
    $("#fieldGenerateOffer").val(address+"acceptticket.html?"+data);
});
membership.on("answer", function(message){
    var data = encodeURIComponent(JSON.stringify(message));
    $("#fieldGenerateOffer").val(address+"confirmarrival.html?"+data);
});
membership.on("statechange", function(state){
    if (state === "connect"){
        $("#networkState").css("color", "#228b22"); // green
    }
    if (state === "partial"){
        $("#networkState").css("color", "#eead0e"); // yellow
    }
    if (state === "disconnect"){
        $("#networkState").css("color", "#cd2626"); // red
    }

});

// #1 generate the webrtc offer and copy it into the clipboard
// (TODO) print the waiting time to the user
// (TODO) inform it has been copied into the clipboard
$("#generateOffer").click( function() {
    membership.launch();
    $("#dropdownNetwork").toggle();
    $("#fieldGenerateOffer").val("");
    $("#alertGenerateOffer").show();
    $("#alertAcceptOffer").hide();
    $("#alertConfirmHandshake").hide();
});
$("#dismissGenerateOffer").click( function(){
    $("#alertGenerateOffer").hide();
});

ZeroClipboard.config(
    {swfPath:"./bower_components/zeroclipboard/dist/ZeroClipboard.swf"});
var client = new ZeroClipboard( $("#actionGenerateOffer") );

client.on("ready", function(event){
    client.on( "copy", function( event ){
        var clipboard = event.clipboardData;
        clipboard.setData( "text/plain", $("#fieldGenerateOffer").val() );
    });
});

// #2 accept the offer from a new peer
$("#acceptOffer").click( function() {
    $("#fieldAcceptOffer").val("");
    $("#alertAcceptOffer").show();
    $("#alertGenerateOffer").hide();
    $("#alertConfirmHandshake").hide();
});
$("#dismissAcceptOffer").click( function(){
    $("#alertAcceptOffer").hide();
});
$("#actionAcceptOffer").click( function() {
    $("#alertAcceptOffer").hide();
    $("#fieldGenerateOffer").val("");
    $("#alertGenerateOffer").show();

    var data = decodeURIComponent($("#fieldAcceptOffer").val().split("?")[1]);
    var message = JSON.parse(data);
    membership.answer(message);
});

// #3 confirm the arrival in the network
$("#confirmHandshake").click( function() {
    $("#fieldConfirmHandshake").val("");
    $("#alertConfirmHandshake").show();
    $("#alertGenerateOffer").hide();
    $("#alertAcceptOffer").hide();
});
$("#dismissConfirmHandshake").click( function(){
    $("#alertConfirmHandshake").hide();
});
$("#actionConfirmHandshake").click( function() {
    $("#alertConfirmHandshake").hide();
    var data = decodeURIComponent($("#fieldConfirmHandshake")
                                  .val().split("?")[1]);
    var message = JSON.parse(data);
    membership.handshake(message);
});

