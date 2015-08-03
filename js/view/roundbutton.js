
function RoundButton(container, text){
    this.button = jQuery('<a>').appendTo(container)
        .addClass('btn btn-default')
        .css('width','30px')
        .css('height', '30px')
        .css('border-radius', '15px')
        .css('background', 'inherit')
        .css('padding', '6px 0')
        .css('color', 'white')
        .css('vertical-align', 'middle')
        .html(text)
        .prop('disable', true);
};
