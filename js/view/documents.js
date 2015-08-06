
function Documents(container, quickAccessContainer){
    this.container = container;
    this.container.css('padding-top', '30px')
        .css('overflow-x', 'scroll');        
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

Documents.prototype.addQuickAccessButton = function(name){
    var viewButton = new RoundButton(this.quickAccessContainer,
                                     '',
                                     'small');
    viewButton.button.css('margin-left','2px')
        .css('margin-top','20px');
    viewButton.button.tooltip({title: name,
                               trigger: 'hover',
                               placement: 'bottom'});
    return viewButton.button;
};
