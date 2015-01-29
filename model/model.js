
/*!
 * \brief the whole model of the application is contained within this object
 */
function Model(){
    this.address = "http://chat-wane.github.io/CRATE/";
    this.uid = Math.floor(Math.random()*133742133742);
    this.network = new Network(this.uid);
    this.signaling = new Signaling();
};
