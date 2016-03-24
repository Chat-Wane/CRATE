
/*!
 * \brief build the layers describing the structure of the distributed editor
 * It comprises four layers: (i) ace (ii) lseq (iii) vvwe (iv) spray.
 * \param container the container of the layers
 */
function Layers(container){
    var skew = -50;
    var vertices = [{x:15, y:10},
                     {x:30, y:90},
                     {x:65, y:15},
                     {x:85, y:95},
                     {x:80, y:0}];

    var edges = [{f: 0, t: 1},
                 {f: 0, t: 2},
                 {f: 1, t: 3},
                 {f: 2, t: 3},
                 {f: 2, t: 4},
                 {f: 3, t: 4}];

    var explanations = [
        {title: 'Editing session',
         explanation: 'An editing session comprising 5 CRATE editors '+
         'connected to each other.'},
        {title: 'GUI layer',
         explanation: 'Users write in their document using the '+
         '<a href="https://ace.c9.io/">ace code editor</a>. Each of their '+
         'changes instantly modifies their view of the document.'},
        {title: 'Distributed sequence layer',
         explanation: 'The structure that stores the document in such manner '+
         'that all replicas converge to identical state when they received '+
         'the same set of operations.'},
        {title: 'Causality tracking layer',
         explanation: ''},
        {title: 'Network layer',
         explanation: ''}
    ];
    
    this.container = container;

    var rowLayers = jQuery('<div>').appendTo(this.container)
        .addClass('col-xs-offset-1 col-xs-10')
        .css('margin-top', '10px')
        .css('border-style', 'solid')
        .css('border', 'initial')
        .css('border-top', 'dashed #ececec');
    
    var layers = [];
    for (var i = 0; i<5; ++i){
        // #A create the layers
        layers[i] =  jQuery('<div>').appendTo(rowLayers)
            .css('position', 'relative')
            .css('top', 10+(i*-10)+'px')
            .css('width','inherit')
            .css('height', '80px')
            .css('margin', 'auto')
            .css('-webkit-transform', 'skew('+skew+'deg)')
            .css('-moz-transform', 'skew('+skew+'deg)')
            .css('-o-transform', 'skew('+skew+'deg)')
            .addClass('post')
            .css('z-index', 5-i);

        layers[i].popover({html: true,
                           content: explanations[i].explanation,
                           title: explanations[i].title,
                           delay: {'hide':1000},
                           container: 'body',
                           trigger: 'hover'})
        // #B position points on each layer
        for (var j = 0; j < vertices.length; ++j){
            switch (i){
            case 0: jQuery('<i>').appendTo(layers[i])
                    .addClass('fa fa-cube')
                    .css('position', 'relative')
                    .css('left', -50+vertices[j].x+'%')
                    .css('top', -100+2*vertices[j].y+'%')
                    .css('-webkit-transform', 'skew('+(-skew)+'deg)')
                    .css('-moz-transform', 'skew('+(-skew)+'deg)')
                    .css('-o-transform', 'skew('+(-skew)+'deg)')
                    .css('z-index', 5-i+0.5);
                break;
            case 1: jQuery('<i>').appendTo(layers[i])
                    .addClass('fa fa-cloud')
                    .css('position', 'relative')
                    .css('left', -50+vertices[j].x+'%')
                    .css('top', -100+2*vertices[j].y+'%')
                    .css('-webkit-transform', 'skew('+(-skew)+'deg)')
                    .css('-moz-transform', 'skew('+(-skew)+'deg)')
                    .css('-o-transform', 'skew('+(-skew)+'deg)')
                    .css('z-index', 4-i+0.5);
                break;
            case 2: jQuery('<i>').appendTo(layers[i])
                    .addClass('fa fa-file-text')
                    .css('position', 'relative')
                    .css('left', -50+vertices[j].x+'%')
                    .css('top', -100+2*vertices[j].y+'%')
                    .css('-webkit-transform', 'skew('+(-skew)+'deg)')
                    .css('-moz-transform', 'skew('+(-skew)+'deg)')
                    .css('-o-transform', 'skew('+(-skew)+'deg)')
                    .css('z-index', 3-i+0.5);
                break;
            case 3: jQuery('<i>').appendTo(layers[i])
                    .addClass('fa fa-bar-chart')
                    .css('position', 'relative')
                    .css('left', -50+vertices[j].x+'%')
                    .css('top', -100+2*vertices[j].y+'%')
                    .css('-webkit-transform', 'skew('+(-skew)+'deg)')
                    .css('-moz-transform', 'skew('+(-skew)+'deg)')
                    .css('-o-transform', 'skew('+(-skew)+'deg)')
                    .css('z-index', 2-i+0.5);
                break;
            case 4: jQuery('<i>').appendTo(layers[i])
                    .addClass('fa fa-rocket')
                    .css('position', 'relative')
                    .css('left', -50+vertices[j].x+'%')
                    .css('top', -100+2*vertices[j].y+'%')
                    .css('-webkit-transform', 'skew('+(-skew)+'deg)')
                    .css('-moz-transform', 'skew('+(-skew)+'deg)')
                    .css('-o-transform', 'skew('+(-skew)+'deg)')
                    .css('z-index', 1-i+0.5);
                break;                
            };
        };
    };
};
