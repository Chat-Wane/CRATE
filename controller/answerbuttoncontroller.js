
/*!
 * \brief controller of the button that gets a launch offer and generates 
 * an answer accordingly
 * \param model the model of the application
 * \param answerBtn the button to input the launch offer and get the answer
 * \param container the container of the links
 * \param alert the alert division containing the output
 * \param action the action button associated with the link
 * \param input the input field where the link appears
 * \param dismiss the button that closes the window
 */
function AnswerButtonController(model, launchBtn, container, alert, action,
                                input,dismiss){
    launchBtn.click(
        function(){
            // #1 modify the view
            container.show();
            alert.removeClass("alert-warning").addClass("alert-info");
            action.html('Go!');
            action.attr("aria-label", "Stamp the ticket");
            input.removeAttr("readonly");
            input.attr("placeholder",
                       "Please, copy the ticket of your friend here to stamp "+
                       "it!");
            input.val("");
            dismiss.unbind("click").click(function(){container.hide();});
            action.unbind("click").click(function(){
                // #2 call the answer function in the model
                var data = decodeURIComponent(input.val().split("?")[1]);
                var message = JSON.parse(data);
                model.network._membership.answer(message)
                // #3 change the view
                alert.removeClass("alert-info").addClass("alert-warning");
                action.html('<span class="octicon octicon-clippy">'+
                            '</span>Copy');
                action.attr("aria-label", "Copy to clipboard");
                action.unbind("click");
                input.attr("readonly","readonly");
                input.attr("placeholder",
                           "A link will appear in this field. Please give it "+
                           "back to your friend.");
                input.val("");
                var client = new ZeroClipboard(action);
                client.on("ready", function(event){
                    client.on( "copy", function( event ){
                        var clipboard = event.clipboardData;
                        clipboard.setData( "text/plain",
                                           input.val() );
                    });
                });
            });
        }
    );
    
    model.network._membership.on("answer", function(message){
        // (TODO) fix this in rtc-scamp-mbr: callback working
        // on each answer
        if (model.signaling.startedSocket){ // priorize server
            model.signaling.socket.emit("answer",
                                        model.signaling.uid,
                                        message);
            model.signaling.startedSocket = false;
            model.signaling.socket.disconnect();
        } else {
        input.val(model.address+"confirmarrival.html?"+
                  encodeURIComponent(JSON.stringify(message)));
        };
    });  
};
