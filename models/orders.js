var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Hotels = require('./hotels');

var orderSchema = new Schema({
  sessionId:{type:String},
  hotel:{type:mongoose.Schema.Types.ObjectId, ref:'Hotel'},
  room:{type:mongoose.Schema.Types.ObjectId, ref:'Hotel.rooms'}
});

var Orders = mongoose.model('Order', orderSchema);

module.exports = Orders;