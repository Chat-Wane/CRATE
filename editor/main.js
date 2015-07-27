
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
            // #A create the header
            var header = jQuery('<div>').appendTo(this)
                .css('width', '100%')
                .css('box-shadow', '0px 1px 5px #ababab')
                .css('border-top-left-radius', '4px')
                .css('border-top-right-radius', '4px')
                .css('color', parameters.headerColor)
                .css('background-color', parameters.headerBackgroundColor);

            var headerContainer = jQuery('<div>').appendTo(header)
                .addClass('container');                

            // Divide the header in three part with different purpose
            var headerLeft = jQuery('<div>').appendTo(headerContainer)
                .addClass('pull-left')
                .css('padding-top','10px')
                .css('padding-bottom','10px');
            
            var headerRightRight = jQuery('<div>').appendTo(headerContainer)
                .addClass('pull-right')
                .css('padding-top','10px')
                .css('padding-bottom','10px')
                .css('height','34px');

            var headerRightLeft = jQuery('<div>').appendTo(headerContainer)
                .addClass('pull-right')
                .css('padding-top','10px')
                .css('padding-bottom','10px')
                .css('height','34px');

            // Contains data about the document
            var buttonFile = jQuery('<a>').appendTo(headerLeft)
                .attr('href','#')
                .attr('data-trigger', 'hover').attr('data-toggle', 'popover')
                .attr('data-placement', 'bottom').attr('data-html', 'true')
                .attr('title','Document').attr('data-content', '')
                .css('color', 'black').addClass('crate-icon')
                .css('height','34px');

            // Contains awareness information such as network state
            var signalingState = jQuery('<i>').appendTo(headerRightLeft)
                .addClass('fa fa-circle-o-notch fa-2x')
                .attr('data-trigger', 'hover').attr('data-toggle', 'popover')
                .attr('title', 'Signaling server status')
                .attr('data-html', 'true').attr('data-content', '')
                .attr('data-placement', 'bottom')
                .css('margin-right', '10px')
                .css('height','34px')
                .css('width','34px');
            
            var networkState = jQuery('<i>').appendTo(headerRightLeft)
                .addClass('fa fa-globe fa-2x')
                .attr('data-trigger', 'hover').attr('data-toggle', 'popover')
                .attr('title', 'Network status')
                .attr('data-html', 'true')
                .attr('data-content', 'Disconnected: you are currently'+
                      'editing <span class="alert-info">on your own</span>.')
                .attr('data-placement', 'bottom')
                .css('margin-right', '10px')
                .css('height','34px').css('width','34px');

            // Rightmost header part containing the dropdown menu
            function createDropdown(parent, texts){
                var dropdownElements = [], item, element;
                var ul = jQuery('<ul>').appendTo(parent)
                    .addClass('dropdown-menu')
                    .attr('role', 'menu');
                
                for (var i = 0; i < texts.length; ++i){
                    if (texts[i]==='divider'){
                        jQuery('<li>').appendTo(ul).addClass('divider');
                    } else {
                        item = jQuery('<li>').appendTo(ul)
                            .attr('role','presentation');
                        element = jQuery('<a>').appendTo(item)
                            .attr('href', 'javascript:void(0)')
                            .append(texts[i]);
                        dropdownElements.push(element);
                    };
                };
                
                return dropdownElements;
            };
            
            var fileDropdown =  jQuery('<div>').appendTo(headerRightRight)
                .addClass('btn-group')
                .attr('role', 'group').attr('aria-label', 'menu bar')
                .css('margin-right','4px');
            
            jQuery('<button>').appendTo(fileDropdown)
                .addClass('btn btn-default dropdown-toggle')
                .attr('aria-label', 'File text')
                .attr('data-toggle', 'dropdown')
                .append( jQuery('<i>').addClass('fa fa-file-text'))
                .append( ' File ' )
                .append( jQuery('<span>').addClass('caret'));
            
            var fileButtons = createDropdown(fileDropdown, [
                'New',
                'Open',
                'Quick save',
                'Save on Disk' ]);

            var shareDropdown = jQuery('<div>').appendTo(headerRightRight)
                .addClass('btn-group')
                .attr('role', 'group').attr('aria-label', 'menu bar')
                .css('margin-right','4px');
                           
            jQuery('<button>').appendTo(shareDropdown)
                .addClass('btn btn-default')
                .append( jQuery('<i>').addClass('fa fa-link'))
                .append( ' Share ' );
            jQuery('<button>').appendTo(shareDropdown)
                .addClass('btn btn-default dropdown-toggle')
                .html('&nbsp')
                .attr('data-toggle', 'dropdown').attr('aria-expanded', 'false')
                .append( jQuery('<span>').addClass('caret') );

            var shareButtons = createDropdown(shareDropdown,[
                '<i class="fa fa-long-arrow-right"></i> Get an entrance ticket',
                '<i class="fa fa-long-arrow-left"></i> Stamp a ticket',
                '<i class="fa fa-exchange"></i> Confirm our arrival',
                'divider',
                '<i class="fa fa-sign-out"></i> Disconnect' ]);
            
            
            var settingsDropdown =  jQuery('<div>').appendTo(headerRightRight)
                .addClass('btn-group')
                .attr('role', 'group').attr('aria-label', 'menu bar')
                .css('margin-right', '4px');
            
            jQuery('<button>').appendTo(settingsDropdown)
                .addClass('btn btn-default dropdown-toggle')
                .attr('aria-label', 'File text')
                .attr('data-toggle', 'dropdown')
                .append( jQuery('<i>').addClass('fa fa-cogs'))
                .append( ' Settings ' )
                .append( jQuery('<span>').addClass('caret'));

            var settingsButton = createDropdown( settingsDropdown, [
                '<i class="fa fa-book"></i> Editor',
                '<i class="fa fa-users"></i> Network' ]);
                                   
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
        });
    };
}(jQuery));
