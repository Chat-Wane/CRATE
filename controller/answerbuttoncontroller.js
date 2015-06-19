
/*!
 * \brief controller of the button that gets a launch offer and generates 
 * an answer accordingly
 * \param model the model of the application
 * \param answerBtn the button to input the launch offer and get the answer
 */
function AnswerButtonController(model, answerBtn, linkView){
    answerBtn.click(
        function(){
            // #1 modify the view
            var action = linkView.askLaunchLink();
            action.unbind("click").click(function(){
                // #2 call the answer function in the model
                var message = JSON.parse(
                    decodeURIComponent( linkView.input.val().split("?")[1]));
                action = linkView.printLink("");
                model.rps.answer(message, function(message){
                    setTimeout(function(){
                        linkView.input.val(model.signaling.address+
                                           "confirmarrival.html?"+
                                           encodeURIComponent(
                                               JSON.stringify(message)));
                    }, 1500);
                });
                var client = new ZeroClipboard(action);
                client.on("ready", function(event){
                    client.on( "copy", function( event ){
                        var clipboard = event.clipboardData;
                        clipboard.setData( "text/plain",
                                           linkView.input.val() );
                    });
                });
            });
        }
    );
    
};
