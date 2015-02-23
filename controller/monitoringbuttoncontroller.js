

function MonitoringButtonController(model, btn,
                                    editorStatsDiv, networkStatsDiv,
                                    idSizeChartView,
                                    idTotalSizeChartView,
                                    viewSizeChartView,
                                    trafficChartView){
//    editorStatsDiv.toggle();
//    networkStatsDiv.toggle();
        
    btn.unbind("click").click(function(){
        editorStatsDiv.toggle();
        networkStatsDiv.toggle();
        
        idSizeChartView.update();
        idTotalSizeChartView.update();
        viewSizeChartView.update();
        trafficChartView.update();
    });
};
