var express = require('express');
var router = express.Router();
var messages = require("../resources/messages.json");
var GameControl = require("../scripts/Main");
var control = new GameControl();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * A positive event call
 */
router.get('/positive', function(req,res,next){
  var item = (messages["positiveEvent"].length);
  res.send(messages["positiveEvent"][control.getRandomInt(0,item)]);
});

router.get('/negative', function(req,res,next){
  var item = messages["negativeEvent"].length;
  res.send(messages["negativeEvent"][control.getRandomInt(0,item)]);
});
router.get('/news', function(req,res,next){
  var item = messages["news"].length;
  res.send(messages["negativeEvent"][control.getRandomInt(0,item)]);

});

module.exports = router;
