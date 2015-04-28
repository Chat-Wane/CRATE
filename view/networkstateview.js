
/*!
 * \brief the span that inform the user about the connection state
 * \brief span the text that will show the connection state
 */
function NetworkStateView(span){
    this.red = "#cd2626";
    this.yellow = "#eead0e";
    this.green = "#228b22";
    this.blue = "#00BFFF";
    this.span = span;
};

NetworkStateView.prototype.connected = function(){    
    var connectedString = "<span class='alert-success'>Congratulations</span>"+
        "! You are connected to people, and people are "+
        "connected to you. <span class='alert-info'>You can start editing "+
        "together</span>.";
    this.span.css("color", this.green);
    this.span.attr("data-content", connectedString);
};

NetworkStateView.prototype.partiallyConnected = function(){
    var partiallyConnectedString = "<span class='alert-warning'>Partially"+
        " connected</span>: "+
        "either you are connected to people, or people are connected to you. "+
        "<i>This is an undesired intermediary state. If it persists, "+
        "please consider rejoining the network.</i>";
    this.span.css("color", this.yellow);
    this.span.attr("data-content", partiallyConnectedString);    
};

NetworkStateView.prototype.disconnected = function(){
    var disconnectedString = "<span class='alert-danger'>Disconnected</span>:"+
        " you are currently editing <span class='alert-info'>on"+
        " your own</span>.";
    this.span.css("color", this.red);
    this.span.attr("data-content",disconnectedString);
};
