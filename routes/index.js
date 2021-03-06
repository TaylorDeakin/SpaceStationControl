var express = require('express');
var router = express.Router();
var siteTitle = "Spacestation Control";
var GameControl = require("../scripts/Main");
var Station = require("../scripts/Station");
var control = new GameControl();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: siteTitle});
});
/* GET Testing Page */
router.get('/tests', function (req, res, next) {
    var station = control.makeNewStation();

    res.render('tests', {title: "Space Station Control Tests", station: station})
});

router.get('/station/:id', function (req, res, next) {

    var station = control.makeNewStation();
    res.render('game', {
        title: siteTitle,
        station: station

    })
});


module.exports = router;
