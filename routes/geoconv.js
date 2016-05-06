var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {
  unirest.post('http://api.map.baidu.com/geoconv/v1/')
  .send({
    coords: req.query.coords,
    ak:'CUt58D05llWgEN7gcUiDhIOjdWE7rGhp',
  })
  .end(function(response){
    res.send(response.body)
  });
});


module.exports = router;
