var express = require('express');
var hotelRouter = express.Router();

var Hotels = require('../models/hotels');

hotelRouter.post('/', function(req, res) {
  Hotels.create(req.body, function(err, hotel) {
    if (err) throw err;
    console.log('Hotel created!');
    res.send({ success: true });
  }).catch(function(err) {
    res.send({ success: false, msg: err.message });
  });;

});

hotelRouter.get('/search', function(req, res) {
  Hotels.find()
    .exec(function(err, hotels) {
      if (err) throw err;
      res.send(hotels);
    }).catch(function(err) {
      res.send({ success: false, msg: err.message });
    });
});

hotelRouter.get('/random', function(req, res) {
  Hotels.find()
    .exec(function(err, hotels) {
      var length = hotels.length;
      var rand = Math.round(Math.random()*length)
      res.send(hotels[rand]);
    });
});

hotelRouter.get('/:id', function(req, res) {
  Hotels.findById(req.params.id)
    .exec(function(err, hotel) {
      if (err) throw err;
      res.send(hotel);
    }).catch(function(err) {
      res.send({ success: false, msg: err.message });
    });
})



hotelRouter.post('/:id/comments', function(req, res) {
  Hotels.findById(req.params.id)
    .exec(function(err, hotel) {
      if (err) throw err;
      hotel.comments.push(req.body);
      hotel.save(function(err, h) {
        res.send(h);
      })
    }).catch(function(err){
      res.send({ success: false, msg: err.message });
    })
});

hotelRouter.post('/:id/rooms', function(req, res) {
  Hotels.findById(req.params.id)
    .exec(function(err, hotel) {
      if (err) throw err;
      hotel.rooms.push(req.body);
      hotel.save(function(err, h) {
        res.send(h);
      })
    }).catch(function(err){
      res.send({ success: false, msg: err.message });
    })
});

hotelRouter.post('/:id/facilities', function(req, res) {
  Hotels.findById(req.params.id)
    .exec(function(err, hotel) {
      if (err) throw err;
      hotel.facilities.push(req.body);
      hotel.save(function(err, h) {
        res.send(h);
      })
    }).catch(function(err){
      res.send({ success: false, msg: err.message });
    })
});

module.exports = hotelRouter;
