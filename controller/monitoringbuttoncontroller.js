

function MonitoringButtonController(model, btn,
                                    editorStatsDiv, networkStatsDiv,
                                    idSizeChartView,
                                    idTotalSizeChartView,
                                    viewSizeChartView,
                                    trafficChartView){
    editorStatsDiv.toggle();
    networkStatsDiv.toggle();
        
    btn.unbind("click").click(function(){
        editorStatsDiv.toggle();
        networkStatsDiv.toggle();

        if (editorStatsDiv.is(":visible")){
            window.scrollTo(0,editorStatsDiv.offset().top-65);
        };
        
        idSizeChartView.update();
        idTotalSizeChartView.update();
        viewSizeChartView.update();
        trafficChartView.update();
    });
};
