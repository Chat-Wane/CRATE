
/*!
 * \brief controller of the button that shares a link to provide the access
 * to a document
 * \param model the model of the application
 * \param shareBtn the button that share the access to a document
 * \param container the container of the links
 * \param alert the alert division containing the output
 * \param action the action button associated with the link
 * \param input the input field where the link appears
 * \param dismiss the button that closes the window
 */
function ShareButtonController(model, shareBtn, container, alert, action,
                               input, dismiss,
                               signalingSpan){
    var red = "#cd2626";
    var yellow = "#eead0e";
    var green = "#228b22";

    signalingSpan.hide();    
    
    shareBtn.click(
        function(){
            // #0 create the proper call to the server
            var socket = model.signaling.startSharing();
            // (TODO) js view 
            function blink(){
                signalingSpan.show();
                signalingSpan.fadeOut(2000,"linear", function(){
                    if (model.signaling.startedSocket){
                        blink();
                    } else {
                        // (TODO) handle error in socket
                        signalingSpan.show();
                        signalingSpan.attr("data-original-title",
                                           "The connection to the signaling "+
                                           "server has been terminated.");
                        signalingSpan.css("color", green);
                        signalingSpan.fadeOut(6000, "linear");
                    }
                });
            };         
            socket.on("connect", function(){
                signalingSpan.css("color", yellow);
                signalingSpan.attr("data-original-title",
                                   "The connection to the signaling server " +
                                   "has been established. Pending...");
                blink();
            });
            
            // #1 modify the view
            function showLink(){
                container.show();
                alert.removeClass("alert-info").addClass("alert-warning");
                action.html('<span class="octicon octicon-clippy"></span>'+
                            'Copy');
                action.attr("aria-label", "Copy to clipboard");
                input.attr("readonly","readonly");
                input.val(model.signaling.address+"index.html?"+
                          model.signaling.uid);
                dismiss.unbind("click").click(function(){container.hide();});
                var client = new ZeroClipboard(action);
                client.on("ready", function(event){
                    client.on( "copy", function( event ){
                        var clipboard = event.clipboardData;
                        clipboard.setData( "text/plain",
                                           input.val() );
                    });
                });
            };
            if (model.signaling.startedSocket){
                showLink();
            };
        }
    );
};
