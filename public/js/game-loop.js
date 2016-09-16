// game events
var events = [
    function () {
        changePowerDynamic(5);
    },
    function () {
        changePowerDynamic(10);
    },
    function () {
        changePowerDynamic(8);
    },
    function () {
        changePowerDynamic(15);
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