var express = require('express');
var router = express.Router();
var siteTitle = "Spacestation Control";
var GameControl = require("../scripts/Main");
var Station = require("../scripts/Station");
var messages = require("../resources/messages.json");
var control = new GameControl();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: siteTitle });
});

router.get('/station/:id', function(req,res,next){

    var station = control.makeNewStation();

    res.render('game', {
        title: siteTitle,
        station: station

    })
});

router.get('/event/positive', function(req,res,next){
    var item = (messages["positiveEvent"].length);
    res.send(messages["positiveEvent"][control.getRandomInt(0,item)]);
});
router.get('/event/negative', function(req,res,next){
    var item = messages["negativeEvent"].length;
    res.send(messages["negativeEvent"][item]);
});
router.get('/event/news', function(req,res,next){
   var len = messages["news"].length;
    res.send(messages["negativeEvent"][len]);

});





module.exports = router;
