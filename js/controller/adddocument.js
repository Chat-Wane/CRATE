

function AddDocument(viewAction, viewDocuments){
    this.connectionOptions = null;

    var self = this;
    viewAction.button.unbind('click').click(function(){
        viewDocuments.addDocumentContainer().cratify({},
                                                     self.connectionOptions,
                                                     session);
    });
};
