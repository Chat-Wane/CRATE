

function AddDocument(viewAction, viewModal, viewDocuments){
    var self = this;
    this.connectionOptions = null;

    viewAction.button.unbind('click');
    viewAction.button.attr('data-toggle', 'modal')
        .attr('data-target', '#'+ viewModal.modal.attr('id'));
    
    viewAction.button.click(function(){
        viewModal.initialState();
    });

    viewModal.newDocument.click(function(){
        viewModal.newDocumentState();
    });

    viewModal.joinEditingSession.click(function(){
        viewModal.joinEditingSessionState();
    });
    
    viewModal.confirmNewDocument.click(function(){
        viewDocuments.addDocumentContainer().cratify({},
                                                     self.connectionOptions,
                                                     session);
    });

    viewModal.confirmJoining.click(function(){
        var val = viewModal.inputJoining.val();
        session = val.split("?")[1]; // (TODO) change
        viewDocuments.addDocumentContainer().cratify({},
                                                     self.connectionOptions,
                                                     session);
    });
};

