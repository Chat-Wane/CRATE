
/*!
 * \brief build the layers describing the structure of the distributed editor
 * It comprises four layers: (i) ace (ii) lseq (iii) vvwe (iv) spray.
 * \param container the container of the layers
 */
function Layers(container){
    var skew = -50;
    var positions = [{x:15, y:10},
                     {x:30, y:90},
                     {x:65, y:15},
                     {x:85, y:95},
                     {x:80, y:0}];

    
    this.container = container;
    var row = jQuery('<div>').appendTo(this.container)
        .addClass('col-xs-offset-2 col-xs-8 post col-sm-offset-3 col-sm-6')
        .addClass('text-center');

    var layers = [];
    for (var i = 0; i<5; ++i){
        // #A create the layers
        layers[i] =  jQuery('<div>').appendTo(row)
            .css('position', 'relative')
            .css('top', (i*-10)+'px')
            .css('width','inherit')
            .css('height', '80px')
            .css('margin', 'auto')
            .css('-webkit-transform', 'skew('+skew+'deg)')
            .css('-moz-transform', 'skew('+skew+'deg)')
            .css('-o-transform', 'skew('+skew+'deg)')
            .addClass('post')
            .css('z-index', 5-i);
        // #B position points on each layer
        for (var j = 0; j < positions.length; ++j){
            switch (i){                
            case 0: jQuery('<img>').appendTo(layers[i])
                    .attr('src', './img/crateicon.png')
                    .css('-webkit-transform', 'skew('+(-skew)+'deg)')
                    .css('-moz-transform', 'skew('+(-skew)+'deg)')
                    .css('-o-transform', 'skew('+(-skew)+'deg)')
                    .css('position', 'relative')
                    .css('left', -50+positions[j].x+'%')
                    .css('top', -100+2*positions[j].y+'%')
                    .css('width','20px')
                    .css('height', '20px')
                    .css('z-index', 5-i+0.5);
                break;
            };
        };
    };
};

