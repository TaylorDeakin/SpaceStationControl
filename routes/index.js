var express = require('express');
var router = express.Router();
var siteTitle = "Spacestation Control";
var SpaceshipControl = require("../scripts/Main");
var Station = require("../scripts/Station");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: siteTitle });
});

router.get('/station/:id', function(req,res,next){
    var test = new SpaceshipControl();

    console.log(test.makeNewStation());


    
    res.render('game', {
        title: siteTitle,
        stationName: name
    })
});




module.exports = router;
