

function AddDocument(viewAction, viewModal, viewDocuments){
    var self = this;
    this.connectionOptions = null;
    this.viewModal = viewModal;
    this.viewDocuments = viewDocuments;

    // #1 bind the add button to its action
    viewAction.button.unbind('click');
    viewAction.button.attr('data-toggle', 'modal')
        .attr('data-target', '#'+ viewModal.modal.attr('id'));
    // #2 initial state
    viewAction.button.click(function(){
        viewModal.initialState();
    });
    // #3 user chooses to create a new document
    viewModal.newDocument.click(function(){
        viewModal.newDocumentState();
    });
    // #4 user chooses to open a document
    viewModal.openFileButton.change(function(evt){
        var file = evt.target.files[0], // only one file
            reader = new FileReader();

        reader.onloadend = (function(file) {
            return function(e) {
                var object = JSON.parse(e.target.result);
                if (object){
                    // model.document.fromObject(object);
                    self.justDoIt(session);
                };
                viewModal.dismissOpenFileButton[0].click();
            };
        })(file);        
        reader.readAsText(file);
        this.value = null;
    });
    // #5 user chooses to join an editing session
    viewModal.joinEditingSession.click(function(){
        viewModal.joinEditingSessionState();
    });
    
    viewModal.confirmNewDocument.click(function(){
        self.justDoIt(session);
    });

    viewModal.confirmJoining.click(function(){
        var val = viewModal.inputJoining.val();
        session = val.split("?")[1]; // (TODO) change

        self.justDoIt(session);
    });
};

AddDocument.prototype.justDoIt = function(session){
    var cellAndContainer = this.viewDocuments.addDocumentContainer();
    var editorContainer = cellAndContainer.container;
    var cell = cellAndContainer.cell;
    var editor = editorContainer.cratify({},
                                         this.connectionOptions,
                                         session)[0];
    var button = this.viewDocuments.addQuickAccessButton(
        editor.model.metadata.name);

    var self = this;
    // #A quick access button
    button.click(function(){
        $('body').animate({scrollTop:0});
        self.viewDocuments.container.animate({
            scrollLeft: editorContainer.offset().left +
                self.viewDocuments.container.scrollLeft() +
                editorContainer.width()/2 - $('body').width()/2
        }, 500);;
    });
    // #B on removal of the editor, remove the according divisions
    editor.closeButton.click(function(){
        cell.remove();
        button.remove();
    });
    // #C add save button
    var saveDiv = jQuery('<div>')
        .css('display', 'inline-block')
        .css('margin-right', '10px');
    editor.header.prepend(saveDiv);
    var vsb = new RoundButton(saveDiv, '<i class="fa fa-floppy-o"></i>')
};
