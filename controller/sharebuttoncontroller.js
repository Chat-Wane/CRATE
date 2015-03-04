
/*!
 * \brief controller of the button that shares a link to provide the access
 * to a document
 * \param model the model of the application
 * \param shareBtn the button that share the access to a document
 * \param signalingView the view corresponding to the signaling awareness
 * \param linkView the view displaying the link generated
 */
function ShareButtonController(model, shareBtn,
                               signalingView, linkView){
    shareBtn.unbind("click").click(
        function(){
            var socket, action, client, self;
            if (model.signaling.startedSocket){ return ; };
            // #0 create the proper call to the server
            socket = model.signaling.startSharing();            
            signalingView.setState("waitSignaling");
            socket.on("connect", function(){
                signalingView.setState("waitJoiners");
            });
            // #1 modify the view            
            if (model.signaling.startedSocket){
                action = linkView.printLink(model.signaling.address+
                                            "index.html?"+
                                            model.signaling.name);
                client = new ZeroClipboard(action);
                client.on("ready", function(event){
                    client.on( "copy", function( event ){
                        var clipboard = event.clipboardData;
                        clipboard.setData( "text/plain",
                                           linkView.input.val() );
                    });
                });
            };
        }
    );
};
