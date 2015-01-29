
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
                               input, dismiss){
    shareBtn.click(
        function(){
            // #0 create the proper call to the server
            var address = model.signaling.startSharing();
            // #1 modify the view
            container.show();
            alert.removeClass("alert-info").addClass("alert-warning");
            action.html('<span class="octicon octicon-clippy"></span> Copy');
            action.attr("aria-label", "Copy to clipboard");
            input.attr("readonly","readonly");
            input.val(address);
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
};
