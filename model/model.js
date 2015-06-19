
/*!
 * \brief the whole model of the application is contained within this object
 */
function Model(config, connect, object){
    // #1 initalize
    this.uid = Math.floor(Math.random()*133742133742);
    this.core = new Core(this.uid, {config:config});
    this.signaling = new Signaling(Lorem.getWord(), this.core.broadcast.source);
//    if (object && !connect){ this.core.init(object); };
    
    // #2 fast access
    this.broadcast = this.core.broadcast;
    this.rps = this.core.broadcast.source;
    this.sequence = this.core.sequence;    
};
