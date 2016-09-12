var express = require('express');
var router = express.Router();
var siteTitle = "Spacestation Control";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: siteTitle });
});

router.get('/station/:name', function(req,res,next){



    res.render('game', {
        title: siteTitle,
        stationName: name
    })
});

module.exports = router;
