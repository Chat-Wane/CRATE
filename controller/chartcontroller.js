
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
        model.stats.viewSize.series[0].push(
            model.network._membership.inView.length() );
        model.stats.viewSize.series[0].shift();
        model.stats.viewSize.series[1].push(
            model.network._membership.partialView.length() );
        model.stats.viewSize.series[1].shift();
        viewSizeChartView.update(); // model.stats.viewSize
    }, updateViewSize);

    setInterval(function(){
        trafficChartView.update(); // model.stats.traffic
        model.stats.traffic.labels.push(
            model.stats.traffic.labels[model.stats.viewSize.labels.length-1]+
                updateTraffic/1000);
        model.stats.traffic.labels.shift();
        model.stats.traffic.series[0].push(0);
        model.stats.traffic.series[0].shift();
        model.stats.traffic.series[1].push(0);
        model.stats.traffic.series[1].shift();
    }, updateTraffic);

    model.network._membership.on("churn", function(peer, message){
        model.stats.traffic.series[0][model.stats.traffic.series[0].length-1]
            += 1;
    });

    model.network.on("remote", function(message, index){
        if (message._e !== null && message._e !== undefined){
            //model.stats.idSize.labels.push(model.stats.idSize.labels.length);
            // model.stats.idSize.series[0].splice( index, 0,
            //                                    message._i._c.length);

            model.stats.totalSize.labels.push(
                model.stats.totalSize.labels[
                    model.stats.totalSize.labels.length-1] + 1);
            model.stats.totalSize.series[0].push(
                model.stats.totalSize.series[0][
                    model.stats.totalSize.series[0].length-1]+
                    message._i._c.length);
            model.stats.totalSize.labels.shift();
            model.stats.totalSize.series[0].shift();
            idTotalSizeChartView.update(); // model.stats.totalSize
        } else {
            //model.stats.idSize.labels.pop();
            //model.stats.idSize.series[0].splice(index, 1);
            // idSizeChartView.chart.update();
            model.stats.totalSize.labels.push(
                model.stats.totalSize.labels[
                    model.stats.totalSize.labels.length-1] + 1);
            model.stats.totalSize.series[0].push(
                model.stats.totalSize.series[0][
                    model.stats.totalSize.series[0].length-1] -
                    message._c.length);
            
            model.stats.totalSize.labels.shift();
            model.stats.totalSize.series[0].shift();
            idTotalSizeChartView.update(); //model.stats.totalSize
        };
    });
    
    model.network.on("local", function(message, index){
        model.stats.traffic.series[1][model.stats.traffic.series[1].length-1]
            += 1;
        switch (message.type){
        case "MInsertOperation":
//            model.stats.idSize.labels.push(model.stats.idSize.labels.length);
//            model.stats.idSize.series[0].splice( index, 0,
//                                                message.insert._i._c.length);
            // idSizeChartView.chart.update(model.stats.idSize);
            
            model.stats.totalSize.labels.push(
                model.stats.totalSize.labels[
                    model.stats.totalSize.labels.length-1] + 1);
            model.stats.totalSize.series[0].push(
                model.stats.totalSize.series[0][
                    model.stats.totalSize.series[0].length-1]+
                    message.insert._i._c.length);
            model.stats.totalSize.labels.shift();
            model.stats.totalSize.series[0].shift();
            idTotalSizeChartView.update(); // model.stats.totalSize
            break;
        case "MRemoveOperation":
            //model.stats.idSize.labels.pop();
            //model.stats.idSize.series[0].splice(index, 1);
            //            idSizeChartView.chart.update();
            
            model.stats.totalSize.labels.push(
                model.stats.totalSize.labels[
                    model.stats.totalSize.labels.length-1] + 1);
            model.stats.totalSize.series[0].push(
                model.stats.totalSize.series[0][
                    model.stats.totalSize.series[0].length-1] -
                    message.remove._c.length);
            model.stats.totalSize.labels.shift();
            model.stats.totalSize.series[0].shift();
            idTotalSizeChartView.update(); // model.stats.totalSize
            break;
        };
    });

    model.network._membership.on("receive", function(source,message){
        switch (message.type){
        case "MSubscriptionRequest":
            model.stats.messageType.series[0] += 1; break;
        case "MSubscriptionResponse":
            model.stats.messageType.series[1] += 1; break;
        case "MOfferRequest":
            model.stats.messageType.series[2] += 1; break;
        case "MOfferResponse":
            model.stats.messageType.series[3] += 1; break;
        case "MWeightUpdate":
            model.stats.messageType.series[4] += 1; break;
        };
        console.log(message);
//        messageTypeChartView.chart.update(model.stats.messageType);
    });

    model.network.on("receive", function(message){
        switch (message.type){
        case "MInsertOperation":
            model.stats.messageType.series[5] += 1; break;
        case "MRemoveOperation":
            model.stats.messageType.series[6] += 1; break;
        };
//        messageTypeChartView.chart.update(model.stats.messageType);
    });
    
    model.network._membership.on("churn" , function(message){
        switch (message.type){
        case "MAntiEntropyRequest":
            model.stats.messageType.series[7] += 1; break;
        case "MAntiEntropyResponse":
            model.stats.messageType.series[8] += 1; break;            
        };
//        messageTypeChartView.chart.update(model.stats.messageType);
    });
        
};

