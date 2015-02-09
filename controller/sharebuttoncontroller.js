
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
    shareBtn.click(
        function(){
            // #0 create the proper call to the server
            var socket = model.signaling.startSharing();
            socket.on("connect", function(){
                signalingView.pending();
            });            
            // #1 modify the view            
            if (model.signaling.startedSocket){
                linkView.printLink(model.signaling.address+"index.html?"+
                                   model.signaling.uid);                
            };
        }
    );
};
