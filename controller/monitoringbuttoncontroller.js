

function MonitoringButtonController(model, btn,
                                    editorStatsDiv, networkStatsDiv,
                                    idSizeChartView,
                                    idTotalSizeChartView,
                                    viewSizeChartView,
                                    trafficChartView){
    editorStatsDiv.hide();
    networkStatsDiv.hide();


    btn.unbind("click").click(function(){
//        editorStatsDiv.toggle();
        networkStatsDiv.toggle();

        if (networkStatsDiv.is(":visible")){
            window.scrollTo(0,networkStatsDiv.offset().top-65);
        };
        
//        if (editorStatsDiv.is(":visible")){
//            window.scrollTo(0,editorStatsDiv.offset().top-65);
//        };
        
        idSizeChartView.update();
        idTotalSizeChartView.update();
        viewSizeChartView.update();
        trafficChartView.update();
    });
};
