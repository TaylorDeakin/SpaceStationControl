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

router.get('/negative', function (req, res, next) {
    console.log(req.body);
    var item = messages["negativeEvent"].length;
    res.send(messages["negativeEvent"][control.getRandomInt(0, item)]);
});
router.get('/news', function (req, res, next) {
    console.log(req.body);
    var item = messages["news"].length;
    res.send(messages["negativeEvent"][control.getRandomInt(0, item)]);

});

module.exports = router;
