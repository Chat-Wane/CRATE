
function LinkView(container, alert, action, input, dismiss){
    this.container = container;
    this.alert = alert;
    this.action = action;
    this.input = input;
    dismiss.unbind("click").click(function(){container.hide();});
};

LinkView.prototype.printLink = function(link){
    this.container.show();
    this.alert.removeClass("alert-info").addClass("alert-warning");
    this.action.html('<span class="octicon octicon-clippy"></span>Copy');
    this.action.attr("aria-label", "Copy to clipboard");
    this.input.attr("readonly","readonly");
    this.input.val(link);
    var client = new ZeroClipboard(this.action);
    var self = this;
    client.on("ready", function(event){
        client.on( "copy", function( event ){
            var clipboard = event.clipboardData;
            clipboard.setData( "text/plain",
                               self.input.val() );
        });
    });
};
