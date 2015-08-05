
function Documents(container, quickAccessContainer){
    this.horizontalContainer = jQuery('<div>').appendTo(container)
        .addClass('center-block')
        .css('display', 'table')
        .css('table-layout', 'fixed')
        .css('width', 'inherit');
    this.quickAccessContainer = quickAccessContainer;
};

Documents.prototype.addDocumentContainer = function(){
    var cell = jQuery('<div>').appendTo(this.horizontalContainer)
        .css('display', 'table-cell')
        .css('width', '600px');
    var container = jQuery('<div>').appendTo(cell)
        .addClass('container')
        .css('width', 'inherit')
        .css('margin-left', '10px')
        .css('margin-right', '10px');
    return jQuery('<div>').appendTo(container);
};
