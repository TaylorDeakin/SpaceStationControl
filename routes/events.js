var express = require('express');
var router = express.Router();
var messages = require("../resources/messages.json");
var GameControl = require("../scripts/Main");
var control = new GameControl();


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * A positive event call
 */
router.post('/positive', function (req, res, next) {
    var obj = req.body.occurred;
    var x = [];
    for(var i in obj){
        x.push(parseInt(obj[i]));
    }
    console.log(x);

    var len = (messages["positiveEvent"].length);
    var item = control.getRandomInt(0,len);

    var count = 0;
    while(x.indexOf(item) > -1 && count < len){
        item = control.getRandomInt(0,len);
    }

    if(x.indexOf((item) == -1)){
        res.send(messages["positiveEvent"][item]);
    }
});

router.post('/negative', function (req, res, next) {
    var obj = req.body.occurred;
    var x = [];
    for(var i in obj){
        x.push(parseInt(obj[i]));
    }
    console.log(x);

    var len = (messages["negativeEvent"].length);
    var item = control.getRandomInt(0,len);

    var count = 0;
    while(x.indexOf(item) > -1 && count < len){
        item = control.getRandomInt(0,len);
    }

    if(x.indexOf((item) == -1)){
        res.send(messages["negativeEvent"][item]);
    }
});
router.post('/news', function (req, res, next) {
    var obj = req.body.occurred;
    var x = [];
    for(var i in obj){
        x.push(parseInt(obj[i]));
    }
    console.log(x);

    var len = (messages["newsBulletin"].length);
    var item = control.getRandomInt(0,len);

    var count = 0;
    while(x.indexOf(item) > -1 && count < len){
        item = control.getRandomInt(0,len);
    }

    if(x.indexOf((item) == -1)){
        res.send(messages["newsBulletin"][item]);
    }

});

module.exports = router;
