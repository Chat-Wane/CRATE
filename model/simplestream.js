var Duplex = require('stream').Duplex;
var util = require('util');
util.inherits(SimpleStream, Duplex);

/*!
 * \class SimpleStream
 * \brief Input Output of the dissemination protocol
 * \param option the additionnal argument for the duplex class
 */
function SimpleStream(parent, options){
    Duplex.call(this, options);
    this._parent = parent;
};

SimpleStream.prototype._read = function(n){
    // Nothing
};

/*!
 * \brief Output
 * \param chunk the data received from the network
 * \param encoding the encoding of the chunk
 * \param callback the callback function that ends the function
 */
SimpleStream.prototype._write = function(chunk, encoding, callback) {
    this._parent.emit("message", chunk);
    callback();
};

module.exports = SimpleStream;
