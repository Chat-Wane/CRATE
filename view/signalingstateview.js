
/*!
 * \brief the view that shows to the user the state of the connection between
 * him and the signaling server
 * \param signaling the signaling part of the model
 * \param span the span of the icon showing the state of the connection
 * \param badge the badge showing the number of joiners
 */
function SignalingStateView(signaling, span, badge){    
    this.red = "#cd2626";
    this.yellow = "#eead0e";
    this.green = "#228b22";
    this.blue = "#00BFFF";
    this.span = span; this.span.hide();
    this.badge = badge;
    this.signaling = signaling;
    this.blinkSpeed = 1000;
};

/*!
 * \brief the view is blinking
 */
SignalingStateView.prototype.blink = function(){
    var self = this;
    this.span.show();
    this.badge.html(this.signaling.joiners);
    setTimeout( function(){
        if (self.signaling.startedSocket){
            self.blink();
        } else {
            self.setState("done");
        };
    }, this.blinkSpeed);
};

/*!
 * \brief change of state of the connection between this peer and the signaling
 * server
 * \param state the state of the connection. Either "waitSignaling",
 * "waitPeer", "done".
 */
SignalingStateView.prototype.setState = function(state){
    switch (state){
    case "waitSignaling":
        this.badge.css("visibility", "hidden");
        this.span.show();
        this.span.removeClass("fa-spin");
        this.span.css("color", this.yellow);
        this.span.attr("data-original-title",
                       "Trying to establish a connection with the signaling "+
                       "server...");
        this.blink();
        break;
    case "waitSharer":
        this.badge.css("visibility", "hidden");
        this.span.show();
        this.span.addClass("fa-spin");
        this.span.css("color", this.blue);
        this.span.attr("data-original-title",
                       "The connection to the signaling server has been "+
                       "established. Waiting for the sharer...");
        this.blink();
        break;
    case "waitJoiners":
        this.badge.css("visibility", "visible");
        this.span.css("color", this.blue);
        this.span.addClass("fa-spin");
        this.span.attr("data-original-title",
                       "The connection to the signaling server has been "+
                       "established. Waiting for the joiners...");
        this.blink();
        break;
    case "done":
        this.badge.css("visibility", "hidden");
        this.span.show();
        this.span.removeClass("fa-spin");
        this.span.attr("data-original-title",
                       "The connection to the signaling "+
                       "server has been terminated.");
        this.span.css("color", this.green);
        this.span.fadeOut(6000, "linear");        
        break;
    };
};
