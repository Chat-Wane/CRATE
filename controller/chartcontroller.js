
function ChartController(model,
                         idSizeChartView,
                         idTotalSizeChartView,
                         viewSizeChartView,
                         trafficChartView){
    
    var updateViewSize = 10000,
        updateTraffic = 10000;
    
    setInterval(function(){
        model.stats.viewSize.labels.push(
            model.stats.viewSize.labels[model.stats.viewSize.labels.length-1]+
                updateViewSize/1000);
        model.stats.viewSize.labels.shift();
        model.stats.viewSize.series[0].data.push(
            model.network._membership.inView.length() );
        model.stats.viewSize.series[0].data.shift();
        model.stats.viewSize.series[1].data.push(
            model.network._membership.partialView.length() );
        model.stats.viewSize.series[1].data.shift();
        viewSizeChartView.update(); // model.stats.viewSize
    }, updateViewSize);

    setInterval(function(){
        trafficChartView.update(); // model.stats.traffic
        model.stats.traffic.labels.push(
            model.stats.traffic.labels[model.stats.viewSize.labels.length-1]+
                updateTraffic/1000);
        model.stats.traffic.labels.shift();
        model.stats.traffic.series[0].data.push(0);
        model.stats.traffic.series[0].data.shift();
        model.stats.traffic.series[1].data.push(0);
        model.stats.traffic.series[1].data.shift();
    }, updateTraffic);

    model.network._membership.on("churn", function(peer, message){
        model.stats.traffic.series[0].data[
            model.stats.traffic.series[0].data.length-1] += 1;
    });
        
    model.network.on("local", function(message, index){
        model.stats.traffic.series[1].data[
            model.stats.traffic.series[1].data.length-1] += 1;
    });
    
};

