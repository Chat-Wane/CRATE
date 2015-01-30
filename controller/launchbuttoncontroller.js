
/*!
 * \brief controller of the button that shares a launcher link to join a 
 * network
 * \param model the model of the application
 * \param container the container of the links
 * \param launchBtn the button that start the process of joining
 * \param alert the alert division containing the output
 * \param action the action button associated with the link
 * \param input the input field where the link appears
 * \param dismiss the button that closes the window
 */
function LaunchButtonController(model, launchBtn, container, alert, action,
                                input,dismiss){
    launchBtn.click(
        function(){
            container.show();
            // #0 call the function to generate an offer, will be output in
            // a 'launch' event
            model.network._membership.launch();
            // #1 modify the view
            alert.removeClass("alert-info").addClass("alert-warning");
            action.html('<span class="octicon octicon-clippy"></span> Copy');
            action.attr("aria-label", "Copy to clipboard");
            input.attr("readonly","readonly");
            input.attr("placeholder",
                       "A link will appear in this field, give it to your "+
                       "friend!");
            input.val("");
            dismiss.unbind("click").click(function(){container.hide();});
            var client = new ZeroClipboard(action);
            client.on("ready", function(event){
                client.on( "copy", function( event ){
                    var clipboard = event.clipboardData;
                    clipboard.setData( "text/plain",
                                       input.val() );
                });
            });
        }
    );

    model.network._membership.on("launch", function(message){
        // (TODO) fix the ugliness into rtc-scamp-mbr to have appropriate cb
        if (model.signaling.startedSocket){ // prorize signaling
            model.signaling.socket.emit("launch",
                                        model.signaling.remoteUid,
                                        message);
        } else {
            input.val(model.address+"acceptticket.html?"+
                      encodeURIComponent(JSON.stringify(message)));
        };
    });
};
