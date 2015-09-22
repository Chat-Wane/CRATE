
function RoundButton(container, text, tooltip, size){
    var s = 30;
    var p = 6;
    var b = 2;
    var m = 10;
    
    switch (size){
    case "large": s = 60; p = 11; m = 20; break;
    case "small": s = 12; p = 2; b = 1; m = 1;  break;
    };
    
    this.button = jQuery('<a>').appendTo(container)
        .addClass('btn btn-default')
        .css('width',s + 'px')
        .css('height', s + 'px')
        .css('border-radius', '50%')
        .css('border-width', b + 'px')
        .css('background', 'inherit')
        .css('padding', p+'px 0')
        .css('margin-left', m+'px')
        .css('color', '#ececec')
        .css('vertical-align', 'middle')
        .attr('data-toggle', 'tooltip')
        .attr('data-placement', 'bottom')
        .attr('title', tooltip)
        .html(text)
        .prop('disable', true)
        .hover(function(){
            $(this).css('background-color', '#ececec');
            $(this).css('color', 'black');
        },     function(){
            $(this).css('background-color', 'inherit');
            $(this).css('color', '#ececec');
        })
        .tooltip();
};
