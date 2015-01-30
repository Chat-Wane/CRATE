
/*!
 * \brief get the actions in the editor and impacts the model accordingly
 * \param model the model
 * \param editorElement the ace editor division
 */
function EditorController(model, editorElement){
    var self = this,
        editor = ace.edit(editorElement.attr("id"));

    this.fromRemote = false;
    
    // #A intialize the ace editor
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setUseWrapMode(true); // word wrapping
    editor.setHighlightActiveLine(false); // not highlighting current line
    editor.setShowPrintMargin(false); // no 80 column margin
    editor.renderer.setShowGutter(false); // no line numbers
    editor.resize(); // adapt to the content
    
    // #B handle the local changes
    editor.getSession().on('change', function(e) {
        var position, index;
        editorElement.css("height",
                          editor.getSession().getDocument().getLength() *
                          editor.renderer.lineHeight);
        editor.resize();
        // #1 the local operation is an insertion
        if ((e.data.action==='insertText' || e.data.action==='removeText') &&
            !self.fromRemote){
            position = editor.selection.getCursor();
            index=editor.getSession().getDocument().positionToIndex(position);
            switch (e.data.action){
            case "insertText":
                model.network.broadcast(
                    model.document.localInsert(e.data.text, index)); break;
            case "removeText":
                model.network.broadcast(
                    model.document.localRemove(index)); break;
            };
        };
    });
    
    model.network.on("receive", function(message) {
        if (message._e !== null && message._e !== undefined){
            self.receivedInsert(message);
        };
        if (message._d !== null && message._d !== undefined){
            self.receivedRemove(message);
        };
    });
    
    this.receivedInsert = function(message){
        var aceDocument = editor.getSession().getDocument(),
            index = model.document.remoteInsert(message._e,message._i),
            delta,
            tempFromRemote;

        if (index !== -1){
            delta = {action: 'insertText',
                     range: { start: aceDocument.indexToPosition(index-1),
                              end:   aceDocument.indexToPosition(index)},
                     text: message._e},
            tempFromRemote = self.fromRemote;
            self.fromRemote = true;
            aceDocument.applyDeltas([delta]);
            self.fromRemote = tempFromRemote;
        };
    };
    
    this.receivedRemove = function(message){
        var aceDocument = editor.getSession().getDocument(),
            index = model.document.remoteRemove(message),
            delta,
            tempFromRemote;

        if (index !== -1){
            delta = {action: 'removeText',
                     range: { start: aceDocument.indexToPosition(index - 1),
                              end:   aceDocument.indexToPosition(index)},
                     text: null};
            tempFromRemote = self.fromRemote;
            self.fromRemote = true;
            aceDocument.applyDeltas([delta]);
            self.fromRemote = tempFromRemote;
        };
    };
    
};
