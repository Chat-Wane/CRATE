
function ModalAddDocument(container){
    var self = this;
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
    var body = jQuery('<div>').appendTo(content)
        .addClass('modal-body');
    this.row = jQuery('<div>').appendTo(body)
        .addClass('row');
    this.newDocument = jQuery('<div>').appendTo(this.row)
        .addClass('text-center col-sm-4')
        .css('padding-top','20px')
        .css('padding-bottom', '20px')
        .css('border-radius', '8px')
        .css('border-width', '1px')
        .css('border-style', 'solid')
        .css('border-color', 'white')
        .append(jQuery('<h4>').html('Create a new document!'))
        .append(jQuery('<i>').addClass('fa fa-file-text fa-4x'))
        .hover( function(){ $(this).css('background-color','#ececec');
                            $(this).css('border-color','#37424c'); },
                function(){ $(this).css('background-color','white');
                            $(this).css('border-color', 'white'); });
    this.openFileButton = jQuery('<input>')
        .attr('type', 'file')
        .css('position', 'absolute')
        .css('clip', 'rect(0px 0px 0px 0px)')
        .css('text-decoration', 'none')
        .css('cursor', 'pointer')
        .css('border', 'none')
        .css('background', 'transparent');
    this.dismissOpenFileButton = jQuery('<button>')
        .appendTo(this.row)
        .attr('data-dismiss', 'modal')
        .hide();                                                         
        //.attr('data-dismiss', 'modal');
    this.openDocument = jQuery('<div>').appendTo(this.row)
        .addClass('text-center col-sm-4')
        .css('padding-top','20px')
        .css('padding-bottom', '20px')
        .css('border-radius', '8px')
        .css('border-width', '1px')
        .css('border-style', 'solid')
        .css('border-color', 'white')
        .append(this.openFileButton)
        .append(jQuery('<h4>').html('Open an existing document!'))
        .append(jQuery('<i>').addClass('fa fa-folder-open fa-4x'))
        .hover( function(){ $(this).css('background-color','#ececec');
                            $(this).css('border-color','#37424c'); },
                function(){ $(this).css('background-color','white');
                            $(this).css('border-color', 'white'); })
        .click( function(){ self.openFileButton[0].click(); });    
    this.joinEditingSession = jQuery('<div>').appendTo(this.row)
        .css('padding-top','20px')
        .css('padding-bottom', '20px')
        .css('border-radius', '8px')
        .css('border-width', '1px')
        .css('border-style', 'solid')
        .css('border-color', 'white')
        .addClass('text-center col-sm-4')
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
        .attr('readonly', 'readonly')
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
              window.location.href +'?session_id')
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
