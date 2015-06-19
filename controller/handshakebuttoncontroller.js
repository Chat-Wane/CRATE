
/*!
 * \brief controller of the button that confirm the arrival of this peer into
 * the network. 
 * \param model the model of the application
 * \param handshakeBtn the button that confirm the arrival in the network
 */
function HandshakeButtonController(model, handshakeBtn, linkView){
    handshakeBtn.click(
        function(){
            var action = linkView.askAnswerLink();
            action.click(function(){
                var message = JSON.parse(decodeURIComponent(
                    linkView.input.val().split("?")[1]));
                model.rps.handshake(message);
                linkView.hide();
            });
        }
    );
};
