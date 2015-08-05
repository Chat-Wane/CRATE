
function RoundButton(container, text, size){
    var s = 30;
    var p = 6;
    switch (size){
    case "large": s = 60; p = 12; break;
    case "small": s = 12; p = 3;  break;
    };
    
    this.button = jQuery('<a>').appendTo(container)
        .addClass('btn btn-default')
        .css('width',s + 'px')
        .css('height', s + 'px')
        .css('border-radius', s/2 +'px')
        .css('background', 'inherit')
        .css('padding', p+'px 0')
        .css('color', '#ececec')
        .css('vertical-align', 'middle')
        .html(text)
        .prop('disable', true)
        .hover(function(){
            $(this).css('background-color', '#ececec');
            $(this).css('color', 'black');
        },     function(){
            $(this).css('background-color', 'inherit');
            $(this).css('color', '#ececec');
        });
};
