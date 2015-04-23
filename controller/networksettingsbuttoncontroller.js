
/*!
 * set the behaviour of the button for configuring the network
 * \param model the model of the application
 * \param openButton the network settings button
 * \param addressField the field containing the address of sharing
 * \param nameField the field containing the parameter in the shared address
 * \param saveButton the button saving the network config
 */
function NetworkSettingsButtonController(model, openButton,
                                         addressField, nameField,
                                         durationField,
                                         saveButton){
    durationField.slider({
        formatter: function(value) {
            var min = Math.floor(value / 60000),
                sec = Math.floor((value % 60000) / 1000),
                result = "";
            if (min > 0) { result = result + min + "m"; };
            if (sec > 0) { result = result + " " + sec + "s"; };
            return 'Share access during: ' + result;
        }
    });
    
    openButton.click(function(){
        addressField.html(model.signaling.address)
        nameField.attr("placeholder", model.signaling.name);
        nameField.val("");
        nameField.removeClass("alert-success").removeClass("alert-danger");
        durationField.slider("setValue", model.signaling.socketDuration);
    });

    var addressRegexp = /^[a-zA-Z0-9]+$/;
    var emptyRegexp = /^$/;
    saveButton.click(function(){
        if(addressRegexp.test(nameField.val())){
            model.signaling.name = nameField.val();
            nameField.attr("placeholder", model.signaling.name);
            nameField.removeClass("alert-danger").addClass("alert-success");
        } else if (!emptyRegexp.test(nameField.val())){
            nameField.removeClass("alert-success").addClass("alert-danger");
        } else {
            nameField.removeClass("alert-success").removeClass("alert-danger");
        };
        console.log("C");
        model.signaling.socketDuration = durationField.slider("getValue");
    });
};
