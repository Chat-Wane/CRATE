

function Layers(container){

    this.container = container;
    var row = jQuery('<div>').appendTo(this.container)
        .addClass('col-xs-offset-2 col-xs-8 post col-sm-offset-3 col-sm-6')
        .addClass('text-center');
    
    var layer = jQuery('<div>').appendTo(row)
        .css('width','inherit')
        .css('height', '100')
        .css('-webkit-transform','skew(-20deg)')
        .css('-moz-transform', 'skew(-20deg)')
        .css('-o-transform', 'skew(-20deg)')
        .css('background', 'red');    
};
