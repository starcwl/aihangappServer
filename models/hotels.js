var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
  name:{type:String},
  amount:{type:Number},
  price:{type:Number},
});

var commentSchema = new Schema({
  comment:{type:String, min:1, max:5},
  rating:{type:String},
  author:{type:String}
});

var facilitySchema = new Schema({
  name:{type:String},
})

var hotelSchema = new Schema({
  name:{type:String},
  image:{type:String},
  phone:{type:String},
  location:{type:String},
  longitude:{type:String},
  latitude:{type:String},
  price:{type:String},
  picture:{type:String},
  comments:[commentSchema],
  rooms:[roomSchema],
  facilities:[facilitySchema],
});

var Hotels = mongoose.model('Hotel', hotelSchema);

module.exports = Hotels;