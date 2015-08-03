
function ModalAddDocument(container){
    this.modal = jQuery('<div>').appendTo(container)
        .addClass('modal fade')
        .attr('id', 'modalAddDocument')
        .attr('aria-labelledby', 'modalAddDocumentLabel')
        .attr('aria-hidden', 'true')
        .attr('tabindex', '-1');
    var dialog = jQuery('<div>').appendTo(this.modal)
        .addClass('modal-dialog');
    var content = jQuery('<div>').appendTo(dialog)
        .addClass('modal-content');
//    var header = jQuery('<div>').appendTo(content)
//        .addClass('modal-header');
//    jQuery('<button>').appendTo(header)
//        .attr('type', 'button')
//        .attr('data-dismiss', 'modal')
//        .attr('aria-label', 'Close')
//        .addClass('close')
//        .html('<span aria-hidden="true">&times;</span>');
//    jQuery('<h3>').appendTo(header)
//        .addClass('modal-title')
//        .html('Create a document');
    var body = jQuery('<div>').appendTo(content)
        .addClass('modal-body');
    this.row = jQuery('<div>').appendTo(body)
        .addClass('row');
    this.newDocument = jQuery('<div>').appendTo(this.row)
        .addClass('text-center col-sm-6')
        .css('padding-top','20px')
        .css('padding-bottom', '20px')
        .css('border-radius', '8px')
        .css('border-width', '1px')
        .css('border-style', 'solid')
        .css('border-color', 'white')
        .append(jQuery('<h4>').html('Create a new document!'))
        .append(jQuery('<i>').addClass('fa fa-file-text-o fa-4x'))
        .hover( function(){ $(this).css('background-color','#ececec');
                            $(this).css('border-color','#37424c'); },
                function(){ $(this).css('background-color','white');
                            $(this).css('border-color', 'white'); });    
    this.joinEditingSession = jQuery('<div>').appendTo(this.row)
        .css('padding-top','20px')
        .css('padding-bottom', '20px')
        .css('border-radius', '8px')
        .css('border-width', '1px')
        .css('border-style', 'solid')
        .css('border-color', 'white')
        .addClass('text-center col-sm-6')
        .append(jQuery('<h4>').html('Join an editing session!'))
        .append(jQuery('<i>').addClass('fa fa-users fa-4x'))
        .hover( function(){ $(this).css('background-color','#ececec');
                            $(this).css('border-color','#37424c'); },
                function(){ $(this).css('background-color','white');
                            $(this).css('border-color', 'white'); });    
    //    var footer = jQuery('<div>').appendTo(content)
    //        .addClass('modal-footer');
    // form of the new document
    this.rowNewDocumentState = jQuery('<div>').appendTo(body)
        .addClass('row');
    var formNewDocument = jQuery('<form>').appendTo(this.rowNewDocumentState)
        .addClass('form-horizontal');        
    this.inputName = jQuery('<input>')
        .attr('type', 'text')
        .attr('placeholder', 'default.txt')
        .addClass('form-control');
    jQuery('<div>').appendTo(formNewDocument)
        .addClass('form-group')
        .append(jQuery('<label>')
               .attr('for', 'inputName')
               .addClass('col-sm-3 control-label')
               .html('File name'))
        .append(jQuery('<div>')
                .addClass('col-sm-8')
                .append(this.inputName));
    this.inputSharing = jQuery('<input>')
        .attr('type', 'text')
        .attr('placeholder', 'https://ancient-shelf-9067.herokuapp.com')
        .addClass('form-control');
    jQuery('<div>').appendTo(formNewDocument)
        .addClass('form-group')
        .append(jQuery('<label>')
                .attr('for', 'inputSharingService')
                .addClass('col-sm-3 control-label')
                .html('Sharing service'))
        .append(jQuery('<div>')
                .addClass('col-sm-8')
                .append(this.inputSharing));
    this.confirmNewDocument = jQuery('<button>')
        .attr('type', 'button')
        .attr('data-dismiss', 'modal')
        .addClass('btn btn-default')
        .html('Create');
    jQuery('<div>').appendTo(formNewDocument)
        .addClass('form-group')
        .append(jQuery('<div>')
                .addClass('col-sm-offset-3 col-sm-8')
                .append(this.confirmNewDocument));

    // form of the joining
    this.rowJoinEditingSessionState = jQuery('<div>').appendTo(body)
        .addClass('row');
    var formJoining = jQuery('<form>').appendTo(this.rowJoinEditingSessionState)
        .addClass('form-horizontal');
    this.inputJoining = jQuery('<input>')
        .attr('type', 'text')
        .attr('placeholder',
              '/Users/chat-wane/Desktop/project/crate/index.html?sharing')
        .addClass('form-control');
    jQuery('<div>').appendTo(formJoining)
        .addClass('form-group')
        .append(jQuery('<label>')
                .attr('for', 'inputSharingService')
                .addClass('col-sm-3 control-label')
                .html('Joining address'))
        .append(jQuery('<div>')
                .addClass('col-sm-8')
                .append(this.inputJoining));
    this.confirmJoining = jQuery('<button>')
        .attr('type', 'button')
        .attr('data-dismiss', 'modal')
        .addClass('btn btn-default')
        .html('Join');
    jQuery('<div>').appendTo(formJoining)
        .addClass('form-group')
        .append(jQuery('<div>')
                .addClass('col-sm-offset-3 col-sm-8')
                .append(this.confirmJoining));
    
    this.initialState();
};

ModalAddDocument.prototype.initialState = function(){
    this.row.show();
    this.rowNewDocumentState.hide();
    this.rowJoinEditingSessionState.hide();
};

ModalAddDocument.prototype.newDocumentState = function(){
    this.row.hide();
    this.rowJoinEditingSessionState.hide();
    this.rowNewDocumentState.show();

};

ModalAddDocument.prototype.joinEditingSessionState = function(){
    this.row.hide();
    this.rowNewDocumentState.hide();
    this.rowJoinEditingSessionState.show();
};
