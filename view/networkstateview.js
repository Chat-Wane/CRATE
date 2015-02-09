
/*!
 * \brief the span that inform the user about the connection state
 * \brief span the text that will show the connection state
 */
function NetworkStateView(span){
    this.red = "#cd2626";
    this.yellow = "#eead0e";
    this.green = "#228b22";
    this.span = span;
};

NetworkStateView.prototype.connected = function(){
    this.span.css("color", this.green);
    this.span.attr("data-original-title","Connected");
};

NetworkStateView.prototype.partiallyConnected = function(){
    this.span.css("color", this.yellow);
    this.span.attr("data-original-title","Partially connected");    
};

NetworkStateView.prototype.disconnected = function(){
    this.span.css("color", this.red);
    this.span.attr("data-original-title","Disconnected");
};
