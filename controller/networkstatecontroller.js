
/*!
 * \brief the controller which only notify the view about the connection state
 * changes
 * \brief model the model
 * \brief span the text that will show the connection state
 */
function NetworkStateController(model,span,abbr){
    var red = "#cd2626";
    var yellow = "#eead0e";
    var green = "#228b22";

    model.network._membership.on("statechange", function(state){
        switch (state){
        case "connect":
            span.css("color", green);
            abbr.attr("title", "connected");
            break;
        case "partial":
            span.css("color", yellow);
            abbr.attr("title", "partially connected");
            break;
        case "disconnect":
            span.css("color", red);
            abbr.attr("title", "disconnected");
            break;
        }
    });
    
};
