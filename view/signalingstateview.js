
/*!
 * \brief the view that shows to the user the state of the connection between
 * him and the signaling server
 * \param signaling the signaling part of the model
 * \param span the span
 */
function SignalingStateView(signaling, span){    
    this.red = "#cd2626";
    this.yellow = "#eead0e";
    this.green = "#228b22";
    this.span = span; this.span.hide();
    this.signaling = signaling;
    this.blinkSpeed = 2000;
};

SignalingStateView.prototype.pending = function(){
    var self = this;
    this.span.css("color", this.yellow);
    this.span.attr("data-original-title",
                   "The connection to the signaling server has been "+
                   "established. Pending...");
    function blink(){
        self.span.show();
        self.span.fadeOut(self.blinkSpeed, "linear", function(){
            if (self.signaling.startedSocket){
                blink();
            } else {
                self.success();
            };
        });
    };
    blink();
};

SignalingStateView.prototype.success = function(){
    this.span.show();
    this.span.attr("data-original-title",
                       "The connection to the signaling "+
                       "server has been terminated.");
    this.span.css("color", this.green);
    this.span.fadeOut(6000, "linear");
};
