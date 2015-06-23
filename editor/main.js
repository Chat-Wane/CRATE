
(function ($){
    $.fn.cratify = function(options){

        var defaults = {
            'headerBackgroundColor': '#242b32',
            'headerColor': '#ececec',
            'editorBackgroundColor': '#ffffff',
            'editorHeight': '400px'
        };
        
        var parameters = $.extend(defaults, options);
        
        return this.each(function(){
            // #1 create the DOM
            // #A create the header
            var header = jQuery('<div>').appendTo(this)
                .css('width', '100%')
                .css('height', '50px')
                .css('box-shadow', '0px 1px 5px #ababab')
                .css('border-top-left-radius', '4px')
                .css('border-top-right-radius', '4px')
                .css('padding-top', '8px')
                .css('color', parameters.headerColor)
                .css('background-color', parameters.headerBackgroundColor);

            var headerContainer = jQuery('<div>').appendTo(header)
                .addClass('container');                
            
            var buttonFile = jQuery('<a>').appendTo(headerContainer)
                .attr('href','#')
                .attr('data-trigger', 'hover').attr('data-toggle', 'popover')
                .attr('data-placement', 'bottom').attr('data-html', 'true')
                .attr('title','Document').attr('data-content', '')
                .css('color', 'black').addClass('crate-icon') ;

            var headerRight = jQuery('<div>').appendTo(headerContainer)
                .addClass('pull-right');

            var signalingState = jQuery('<i>').appendTo(headerRight)
                .addClass('fa fa-circle-o-notch fa-2x')
                .attr('data-trigger', 'hover').attr('data-toggle', 'popover')
                .attr('title', 'Signaling server status')
                .attr('data-html', 'true').attr('data-content', '')
                .attr('data-placement', 'bottom')
                .css('margin-left', '10px');
            
            var networkState = jQuery('<i>').appendTo(headerRight)
                .addClass('fa fa-globe fa-2x')
                .attr('data-trigger', 'hover').attr('data-toggle', 'popover')
                .attr('title', 'Network status')
                .attr('data-html', 'true')
                .attr('data-content', 'Disconnected: you are currently'+
                      'editing <span class="alert-info">on your own</span>.')
                .attr('data-placement', 'bottom')
                .css('margin-left', '10px');
            
            var fileDropdown =  jQuery('<div>').appendTo(headerRight)
                .addClass('btn-group')
                .attr('role', 'group').attr('aria-label', 'menu bar');
            
            jQuery('<button>').appendTo(fileDropdown)
                .addClass('btn btn-default dropdown-toggle')
                .attr('aria-label', 'File text')
                .attr('data-toggle', 'dropdown')
                .append( jQuery('<i>').addClass('fa fa-file-text'))
                .append( ' File ' )
                .append( jQuery('<span>').addClass('caret'));
            
            function createDropdown(id, text){
                return jQuery('<li>').attr('role', 'presentation')
                    .append( jQuery('<a>').attr('id', id)
                             .attr('href', 'javascript:void(0)')
                             .append(text));
            };

            fileDropdown.append( jQuery('<ul>').addClass('dropdown-menu')
                               .attr('role', 'menu')
                               .append(createDropdown('new', 'New'))
                               .append(createDropdown('open', 'Open'))
                               .append(createDropdown('quicksave',
                                                      'Quick save'))
                               .append(createDropdown('saveOnDisk',
                                                      'Save on disk')));

            var shareDropdown = jQuery('<div>').appendTo(headerRight)
                .addClass('btn-group')
                .attr('role', 'group').attr('aria-label', 'menu bar');
                           
            jQuery('<button>').appendTo(shareDropdown)
                .addClass('btn btn-default')
                .append( jQuery('<i>').addClass('fa fa-link'))
                .append( ' Share ' );
            jQuery('<button>').appendTo(shareDropdown)
                .addClass('btn btn-default dropdown-toggle')
                .html('&nbsp')
                .attr('data-toggle', 'dropdown').attr('aria-expanded', 'false')
                .append( jQuery('<span>').addClass('caret') );
            shareDropdown.append( jQuery('<ul>').addClass('dropdown-menu')
                                  .attr('role', 'menu')
                                  .append(createDropdown('launch',
                                                         '<i class="fa fa-long-arrow-right"></i> Get an entrance ticket'))
                                  .append(createDropdown('answer',
                                                         '<i class="fa fa-long-arrow-left"></i> Stamp a ticket'))
                                  .append(createDropdown('handshake',
                                                         '<i class="fa fa-exchange"></i> Confirm our arrival'))
                                  .append(jQuery('<li>').addClass('divider'))
                                  .append(createDropdown('disconnect',
                                                         '<i class="fa fa-sign-out"></i> Disconnect')));

            var settingsDropdown =  jQuery('<div>').appendTo(headerRight)
                .addClass('btn-group')
                .attr('role', 'group').attr('aria-label', 'menu bar');
            
            jQuery('<button>').appendTo(settingsDropdown)
                .addClass('btn btn-default dropdown-toggle')
                .attr('aria-label', 'File text')
                .attr('data-toggle', 'dropdown')
                .append( jQuery('<i>').addClass('fa fa-cogs'))
                .append( ' Settings ' )
                .append( jQuery('<span>').addClass('caret'));
            
            settingsDropdown.append( jQuery('<ul>').addClass('dropdown-menu')
                                     .attr('role', 'menu')
                                     .append(createDropdown('e',
                                                            '<i class="fa fa-book"></i> Editor'))
                                     .append(createDropdown('n',
                                                            '<i class="fa fa-users"></i> Network')))
            
            
            
            // #B create the editor
            var post = jQuery('<div>').appendTo(this)
                .css('box-shadow', '0px 1px 5px #ababab')
                .css('border-bottom-left-radius', '4px')
                .css('border-bottom-right-radius', '4px')
                .css('margin-bottom', '20px')
                .css('padding', '30px 15px')
                .css('background-color', parameters.editorBackgroundColor);
            
            // (TODO) change id to something more meaningful
            var id = Math.random();
            var divEditor = jQuery('<div>').appendTo(post).attr('id','miaou'+id)
                .css('min-height', parameters.editorHeight);
            var editor = ace.edit('miaou'+id);
            
            editor.setTheme("ace/theme/chrome");
            editor.getSession().setUseWrapMode(true); // word wrapping
            editor.setHighlightActiveLine(false); // not highlighting current line
            editor.setShowPrintMargin(false); // no 80 column margin
            editor.renderer.setShowGutter(false); // no line numbers
            editor.resize(); // adapt to the content
        });
    };
}(jQuery));
