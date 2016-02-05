
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
    
    this.container = container;

    var rowLayers = jQuery('<div>').appendTo(this.container)
        .addClass('col-xs-offset-1 col-xs-10')
        .css('margin-top', '10px')
        .css('border-style', 'solid')
        .css('border', 'initial')
        .css('border-top', 'dashed #ececec');
    
    var layers = [];
    for (var i = 0; i<1; ++i){
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
        // #B position points on each layer
        for (var j = 0; j < vertices.length; ++j){
            switch (i){                
            case 0: jQuery('<img>').appendTo(layers[i])
                    .attr('src', './img/crateicon.png')
                    .css('position', 'relative')
                    .css('left', -50+vertices[j].x+'%')
                    .css('top', -100+2*vertices[j].y+'%')
                    .css('-webkit-transform', 'skew('+(-skew)+'deg)')
                    .css('-moz-transform', 'skew('+(-skew)+'deg)')
                    .css('-o-transform', 'skew('+(-skew)+'deg)')
                    .css('width','20px')
                    .css('height', '20px')
                    .css('z-index', 5-i+0.5);
                break;
            };
        };
    };
};

