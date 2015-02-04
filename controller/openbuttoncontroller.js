
/*!
 * \brief controller of the file opener button
 * \param model the model
 * \param openBtn the button that trigger the open event
 * \param openInput the input that opens the window of local files
 * \param cEditor the controller of the ace editor (TODO remove it from here)
 */
function OpenButtonController(model, openBtn, openInput, cEditor){
    openBtn.unbind("click").click(function(){
        openInput[0].click(); // use the browser "click" function
    });
    
    openInput.change(function(evt){
        var file = evt.target.files[0], // only one file
            reader = new FileReader();
        
        // #1 disconnect the network
        model.network._membership.disconnect();
        // #2 load the file
        reader.onloadend = (function(file) {
            return function(e) {
                var object = JSON.parse(e.target.result);
                if (object){
                    model.document.fromObject(object);
                };
                model.network = new Network(model.uid);                
                model.signaling = new Signaling(model.uid, model.network);
                // (TODO) fix this by making a view in javascript
                cEditor.editor.destroy();
                new EditorController(model, cEditor.editorElement);
            };
        })(file);
        
        reader.readAsText(file);
        this.value = null;
    });
};
