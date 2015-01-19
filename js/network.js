var address = "http://chat-wane.github.io/CRATE/";
var membership = network._membership;

// socket io signaling, connect part
if ((document.URL.split("?")).length>1){
    var uid = document.URL.split("?")[1];
    var socket = io("https://ancient-shelf-9067.herokuapp.com",
                    {'force new connection': true});
    membership.launch(
        function(message){
            setTimeout(function(){
                socket.emit("launch",uid, message);
            }, 1500);
        }
    );

    socket.on("answerResponse", function(message){
        membership.handshake(message);
        socket.disconnect();
    });
};

// socket io for signaling, share PART
$("#share").click( function(){
    socket
    var socket = io("https://ancient-shelf-9067.herokuapp.com",{'force new connection': true});
    socket.emit("launch", UID);
    $("#dropdownNetwork").toggle();
    $("#fieldGenerateOffer").val("");
    $("#alertGenerateOffer").show();
    $("#alertAcceptOffer").hide();
    $("#alertConfirmHandshake").hide();            
    $("#fieldGenerateOffer").val("http://localhost:8081?"+UID);
    socket.on("launchResponse", function(message){
        membership.answer(message);
    });
    membership.on("answer", function(message){
        socket.emit("answer", UID, message);
        socket.disconnect();
    });
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

