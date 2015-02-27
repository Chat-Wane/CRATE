
/*!
 * \brief the whole model of the application is contained within this object
 */
function Model(config, connect, object){
    this.uid = Math.floor(Math.random()*133742133742);
    this.document = new Document("default",
                                 new LSEQTree(this.uid),
                                 new VVwE(this.uid));
    if (object && !connect){
        this.document.fromObject(object);
    };
    this.network = new Network(this.uid, {webRTCConf:config});
    this.signaling = new Signaling(this.uid, this.network);
    
    this.stats = new Stats();
};
