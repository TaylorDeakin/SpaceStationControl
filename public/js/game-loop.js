// game events
var events = [
    function () {
        positiveEvent();
    },
    function () {
        negativeEvent();
    },
    function () {
        getNews();
    }
];

function randomEvent() {
    randomFrom(events).call();
}
function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/*(function loop() {
    var rand = Math.round(Math.random() * (300 - 50)) + 50;
    if (controllingFaction.influence > 100) {
        station.name = "winner!";
    } else {
        setTimeout(function () {
            randomEvent();
            loop();
        }, rand);
    }
}());*/