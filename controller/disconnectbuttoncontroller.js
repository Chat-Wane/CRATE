
/*!
 * \brief the controller which handle the button of disconnection from the 
 * network
 * \brief model the model
 * \brief disconnectionBtn the button of disconnection
 * \brief li the ligne that contains the btn
 */
function DisconnectButtonController(model, disconnectionBtn, li){

    model.network._membership.on("statechange", function(state){
        switch (state){
        case "connect":
            li.removeClass("disabled");
            disconnectionBtn.unbind("click").click(function(){
                model.network._membership.disconnect();
            });
            break;
        case "partial":
            li.removeClass("disabled");
            disconnectionBtn.unbind("click").click(function(){
                model.network._membership.disconnect();
            });                                           
            break;
        case "disconnect":
            li.addClass("disabled");
            disconnectionBtn.unbind("click");
            break;
        };
    });
    
};
