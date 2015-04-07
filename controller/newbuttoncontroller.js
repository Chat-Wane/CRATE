
function NewButtonController(model, newBtn, cEditor){
    newBtn.unbind("click").click(function(){
        model.network._membership.disconnect();
        model.document = new Document("default",
                                      new LSEQTree(model.uid),
                                      new VVwE(model.uid));        
//        model.network = new Network(model.uid);
//        model.signaling = new Signaling(model.signaling.name, model.network);
        cEditor.editor.destroy();
        new EditorController(model, cEditor.editorElement);
    });    
};
