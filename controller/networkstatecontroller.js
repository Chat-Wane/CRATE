
/*!
 * \brief the controller which only notify the view about the connection state
 * changes
 * \brief model the model
 * \brief span the text that will show the connection state
 */
function NetworkStateController(model, view){
    model.core.broadcast.source.on("statechange", function(state){
        switch (state){
        case "connect": view.connected(); break;
        case "partial": view.partiallyConnected(); break;
        case "disconnect": view.disconnected(); break;
        };
    });    
};
