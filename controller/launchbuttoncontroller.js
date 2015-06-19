
/*!
 * \brief controller of the button that shares a launcher link to join a 
 * network
 * \param model the model of the application
 * \param launchBtn the button that start the process of joining
 * 
 */
function LaunchButtonController(model, launchBtn, linkView){
    launchBtn.click(
        function(){
            var action = linkView.printLaunchLink("");
            // #0 call the function to generate an offer, will be output in
            // a 'launch' event
            model.rps.launch(
                function(message){
                    setTimeout( function(){
                        linkView.input.val(model.signaling.address+
                                           "acceptticket.html?"+
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
        }
    );
    
};
