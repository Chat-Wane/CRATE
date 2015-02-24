
function ChartView(data, containerDiv, divChart, title, description){
    this.idCanvas = divChart.attr('id')+"Canvas";
    this.containerDiv = containerDiv;
    this.data = data;
    this.options = this.getLineChartOptions();
    this.chart = null;
   
    divChart.html('<div class="col-md-6"> <div class="post text-center">'+
                  '<div id="'+this.idCanvas+
                  '" class="ct-chart ct-perfect-fourth"></div>'+
                  '<p><span class="chart-title">'+title+'</span></p>'+
                  '<p><span class="chart-description">'+
                  description+'</span></p>'+
                  '</div></div>');    
};


ChartView.prototype.update = function(){
    if (this.containerDiv.is(":visible")){
        if (this.chart === null){
            this.chart = new Chartist.Line("#"+this.idCanvas,
                                           this.data,
                                           this.options);
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
