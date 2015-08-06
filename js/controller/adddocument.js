

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
        var editorContainer = viewDocuments.addDocumentContainer();
        var editor = editorContainer.cratify({},
                                           self.connectionOptions,
                                           session)[0];
        var button = viewDocuments.addQuickAccessButton(editor.m.metadata.name);
        
        button.click(function(){
            $('body').animate({scrollTop:0});
            viewDocuments.container.animate({
                scrollLeft: editorContainer.offset().left +
                    viewDocuments.container.scrollLeft() +
                    editorContainer.width()/2 - $('body').width()/2
            }, 500);;
        });            
    });

    viewModal.confirmJoining.click(function(){
        var val = viewModal.inputJoining.val();
        session = val.split("?")[1]; // (TODO) change

        var editorContainer = viewDocuments.addDocumentContainer();
        var editor = editorContainer.cratify({},
                                             self.connectionOptions,
                                             session)[0];
        var button = viewDocuments.addQuickAccessButton(editor.m.metadata.name);
        
        button.click(function(){
            $('body').animate({scrollTop:0});
            viewDocuments.container.animate({
                scrollLeft: editorContainer.offset().left +
                    viewDocuments.container.scrollLeft() +
                    editorContainer.width()/2 - $('body').width()/2
            }, 500);;
        });            
        
    });
};

