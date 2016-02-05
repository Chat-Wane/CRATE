
function Features(features, container){

    this.container = container;
    this.features = [];
    for (var i = 0; i < features.length; ++i){
        var row = jQuery('<div>').appendTo(this.container)
            .addClass('col-xs-offset-2 col-xs-8 post col-sm-offset-3 col-sm-6')
            .addClass('text-center');
        var left = jQuery('<div>').appendTo(row).css('height','inherit');
        var right = jQuery('<div>').appendTo(row).css('height','inherit');

        if ((i%2)===0){
            left.addClass('col-xs-4');
            left.append(jQuery('<i>')
                        .addClass('fa fa-5x')
                        .addClass(features[i].icon));
            right.addClass('col-xs-8');
            switchTitleDescription(i, right, row);
        } else {
            left.addClass('col-xs-8');
            switchTitleDescription(i, left, row);
            right.addClass('col-xs-4');
            right.append(jQuery('<i>')
                         .addClass('fa fa-5x')
                         .addClass(features[i].icon));
        };
        this.features.push(row);
    };

    function switchTitleDescription(i, container, row){
        var title = jQuery('<h4>').html(features[i].feature);
        var description = jQuery('<h6>').html(features[i].description).hide();
        container.append(title).append(description);
        row.mouseenter(function(){
            if (title.is(':visible')){
                title.hide();
                description.show()
            };
        });
        row.mouseleave(function(){
            if (description.is(':visible')){
                title.show();
                description.hide();
            };
        });
    };

};
