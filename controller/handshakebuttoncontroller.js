
/*!
 * \brief controller of the button that confirm the arrival of this peer into
 * the network. 
 * \param model the model of the application
 * \param handshakeBtn the button that confirm the arrival in the network
 * \param container the container of the links
 * \param alert the alert division containing the output
 * \param action the action button associated with the link
 * \param input the input field where the link appears
 * \param dismiss the button that closes the window
 */
function HandshakeButtonController(model, handshakeBtn, container, alert,
                                   action, input, dismiss){
    handshakeBtn.click(
        function(){
            // #1 modify the view
            container.show();
            alert.removeClass("alert-warning").addClass("alert-info");
            action.html('Go!');
            action.attr("aria-label", "Confirm our arrival");
            input.removeAttr("readonly");
            input.attr("placeholder", "Copy the stamped ticket to confirm "+
                       "your arrival in the network");
            input.val("");
            dismiss.unbind("click").click(function(){container.hide();});
            action.unbind("click").click(function(){
                var data = decodeURIComponent(input.val().split("?")[1]);
                var message = JSON.parse(data);
                model.network._membership.handshake(message);
                action.unbind("click");
                container.hide();
            });
        }
    );
};
