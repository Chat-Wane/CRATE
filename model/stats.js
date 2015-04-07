
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
        labels: [0,0,0,0,0,0,0,0,0,0,0],
        series: [ {name: 'incoming connections',
                   data: [0,0,0,0,0,0,0,0,0,0,0]},
                  {name: 'outgoing connections',
                   data: [0,0,0,0,0,0,0,0,0,0,0]}]
    };

    this.traffic = {
        labels: [0,0,0,0,0,0,0,0,0,0,0],        
        series: [ {name: 'incoming traffic',
                   data: [0,0,0,0,0,0,0,0,0,0,0]},
                  {name: 'outgoing traffic',
                   data: [0,0,0,0,0,0,0,0,0,0,0]} ]
    };

};
