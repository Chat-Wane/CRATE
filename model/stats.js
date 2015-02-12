
function Stats(){
    this.idSize = {
        labels: [0],
        series: [[0]]
    };

    this.totalSize = {
        labels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
    };

    this.messageType = {
        labels: ["MSubscriptionRequest", "MSubscriptionResponse",
                 "MOfferRequest", "MOfferResponse",
                 "MWeightUpdate",
                 "MInsertOperation", "MRemoveOperation",
                 "MAntiEntropyRequest", "MAntiEntropyResponse"],
        series: [0, 0,  0, 0,  0,  0, 0,  0, 0]
    };

    this.viewSize = {
        labels: [0,0,0,0,0,0,0,0,0,0,0],//["Incoming arcs", "Outgoing arcs"],
        series: [[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0]]
    };

    this.traffic = {
        //["Incoming traffic", "Outgoing traffic"],
        labels: [0,0,0,0,0,0,0,0,0,0,0],        
        series: [[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0]]
    };

};
