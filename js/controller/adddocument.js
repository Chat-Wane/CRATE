

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
        var editor = viewDocuments.addDocumentContainer();
        editor.cratify({},
                       self.connectionOptions,
                       session);
        
        var x = editor.position().left + viewDocuments.container.scrollLeft();
        var viewButton = new RoundButton(viewDocuments.quickAccessContainer,
                                         '',
                                         'small');
        viewButton.button.css('margin-left','2px')
            .css('margin-top','20px');
        viewButton.button.click(function(){
            $('body').animate({scrollTop:0});
            viewDocuments.container.animate({
                scrollLeft: editor.offset().left +
                    viewDocuments.container.scrollLeft() +
                    editor.width()/2 - $('body').width()/2
            }, 500);;
        });            
    });

    viewModal.confirmJoining.click(function(){
        var val = viewModal.inputJoining.val();
        session = val.split("?")[1]; // (TODO) change
        viewDocuments.addDocumentContainer().cratify({},
                                                     self.connectionOptions,
                                                     session);
    });
};

