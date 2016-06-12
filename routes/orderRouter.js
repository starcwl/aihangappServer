var Order = require('../models/orders');
var Hotel = require('../models/hotels');
var orderRouter = require('express').Router();
var _ = require('lodash');



orderRouter.post('/:hotelId/:roomId', function(req, res){
  var _hotel = {};
  var _room = {};
  Hotel.findById(req.params.hotelId)
    .then(function(hotel){
      _hotel = hotel;
      _room = _.find(hotel.rooms, function(room){
        return room._id.toString() === req.params.roomId;
      });
      var order = new Order({
        sessionId:req.session.id, 
        hotel:_hotel._id,
        room:_room._id
      });
      return order.save()  ;
    }).then(function(order){
      res.send({success:true, data:order});
    }).catch(function (err) {
      res.send({success:false, msg:err.message});
  });
});

orderRouter.get('/', function(req, res){
    Order.find({sessionId: req.session.id})
        .populate('hotel')
        //.populate('room')
        .exec(function(err, orders){
            if(err) throw err;
            res.send(orders);
        });
});

module.exports = orderRouter;