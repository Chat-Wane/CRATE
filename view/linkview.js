
function LinkView(container, alert,
                  qrcode, qrcodeCanvas,
                  action, input, dismiss){
    this.container = container;
    this.alert = alert;
    this.qrcode = qrcode;
    this.qrcodeCanvas = qrcodeCanvas;
    this.action = action;
    this.input = input;
    dismiss.unbind("click").click(function(){container.hide();});
};

LinkView.prototype.printLink = function(link){
    this.container.show();
    this.alert.removeClass("alert-info").addClass("alert-warning");
    this.action.html('<i class="fa fa-clipboard"></i> Copy');
    this.action.attr("aria-label", "Copy to clipboard");
    this.input.attr("readonly","readonly");
    this.input.val(link);
    this.qrcode.show();
};

LinkView.prototype.printLaunchLink = function(link){
    this.printLink(link);
    this.input.attr("placeholder",
                    "A link will appear in this field, give it to your "+
                    "friend!");
    this.action.unbind("click");
    this.qrcode.hide();
    return this.action;
};

LinkView.prototype.printAnswerLink = function(link){
    this.printLink(link);
    this.input.attr("placeholder",
                    "A link will appear in this field. Please give it "+
                    "back to your friend.");
    this.qrcode.hide();
    return this.action;
};

LinkView.prototype.askLink = function(){
    this.container.show();
    this.alert.removeClass("alert-warning").addClass("alert-info");
    this.action.html('Go!');
    this.action.attr("aria-label", "Stamp the ticket");
    this.input.removeAttr("readonly");
    this.input.val("");
    this.action.unbind("click");
    this.qrcode.hide();
};

LinkView.prototype.askLaunchLink = function(){
    this.askLink();
    this.input.attr("placeholder",
                    "Please, copy the ticket of your friend here to stamp "+
                    "it!");
    this.qrcode.hide();
    return this.action;
};

LinkView.prototype.askAnswerLink = function(){
    this.askLink();
    this.input.attr("placeholder", "Copy the stamped ticket to confirm "+
                    "your arrival in the network");
    this.qrcode.hide();
    return this.action;
};

LinkView.prototype.hide = function(){
    this.container.hide();
};
