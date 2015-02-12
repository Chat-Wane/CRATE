
function ChartView(data, type, divChart, description){
    var idCanvas = divChart.attr('id')+"Canvas";
    
    divChart.html('<div class="col-md-6"> <div class="post text-center">'+
                  '<div id="'+idCanvas+'" class="ct-chart ct-perfect-fourth"></div>'+
                  '<p>'+description+'</p>'+
                  '</div></div>');
    switch(type){
    case "lineChart":
        this.options = this.getLineChartOptions();
        this.chart = new Chartist.Line("#"+idCanvas,data, this.options);
        break;
    case "pieChart":
        this.options = this.getPieChartOptions();
        this.chart = new Chartist.Pie("#"+idCanvas,{labels:["nothing"],
                                                    series:[1]},
                                      this.options,{});
    };
};


ChartView.prototype.getLineChartOptions = function(){
    return {
        low: 0,
        showArea: true
    };
};

ChartView.prototype.getPieChartOptions = function(){
    return {

    };
};
