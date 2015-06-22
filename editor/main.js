
(function ($){

    $.fn.cratify = function(options){
        
        return this.each(function(){
            // #1 create the DOM
            var post = jQuery('<div>').appendTo(this).addClass('post');
            //(TODO) change id to something more meaningful
            var divEditor = jQuery('<div>').appendTo(post).attr('id','miaou');
            var editor = ace.edit('miaou');
            
            editor.setTheme("ace/theme/chrome");
            editor.getSession().setUseWrapMode(true); // word wrapping
            editor.setHighlightActiveLine(false); // not highlighting current line
            editor.setShowPrintMargin(false); // no 80 column margin
            editor.renderer.setShowGutter(false); // no line numbers
            editor.resize(); // adapt to the content
        });
    };
    
}(jQuery));
