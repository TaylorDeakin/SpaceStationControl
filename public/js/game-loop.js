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

(function loop() {
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    setTimeout(function () {
        randomEvent();
        loop();
    }, rand);
}());