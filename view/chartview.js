
function ChartView(data, containerDiv, divChart, title, description){
    this.idCanvas = divChart.attr('id')+"Canvas";
    this.tooltip = $("#"+divChart.attr('id')+"Tooltip");
    this.containerDiv = containerDiv;
    this.data = data;
    this.options = this.getLineChartOptions();
    this.chart = null;
   
    divChart.html('<div class="col-md-6"> <div class="post text-justify">'+
                  '<div id="'+this.idCanvas+
                  '" class="ct-chart ct-perfect-fourth"></div>'+
                  '<p><span class="chart-title">'+title+'</span></p>'+
                  '<p><span class="chart-description">'+
                  description+'</span></p>'+
                  '</div></div>');
};


ChartView.prototype.update = function(start){
    if (this.containerDiv.is(":visible")){
        if (this.chart === null){
            this.chart = new Chartist.Line("#"+this.idCanvas,
                                           this.data,
                                           this.options);
            var $chart = $('#'+this.idCanvas);
            var $toolTip = $chart
                .append('<div class="tooltip tooltip-chart"></div>')
                .find('.tooltip')
                .hide();
            $toolTip.tooltip({   content: function () {
                return $(this).html();
            }});
            
            $chart.on('mouseenter', '.ct-point', function() {
                var $point = $(this),
                    value = $point.attr('ct:value'),
                    seriesName = $point.parent().attr('ct:series-name');
                $toolTip.html(seriesName + '<br/>' + value).show();
            });
            
            $chart.on('mouseleave', '.ct-point', function() {
                $toolTip.hide();
            });
            
            $chart.on('mousemove', function(event) {
                $toolTip.css({
                    left: (event.offsetX || event.originalEvent.layerX) -
                        $toolTip.width() / 2 - 10,
                    top: (event.offsetY || event.originalEvent.layerY) -
                        $toolTip.height() - 40
                });
            });
            
        };
        this.chart.update(this.data);
    };
};


ChartView.prototype.getLineChartOptions = function(){
    return {
        low: 0,
        showArea: true,
        axisY: {
            labelInterpolationFnc: function (value) {
                if (value%1===0){ return value; } else { return ; };
            }
        },
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        })
    };
};
