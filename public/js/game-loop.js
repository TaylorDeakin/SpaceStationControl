// call once to init everything
updateTotals();


// game events
var events = [
    function () {
        positiveEvent();
    },
    function () {
        negativeEvent();
    }
];

function randomEvent() {
    if (occuredEventsCount == MAX_NEWS) {
        return
    }

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

setInterval(function () {
    gameTick();
}, 1000);

function gameTick() {

    for (var key in resources) {
        if (resources.hasOwnProperty(key)) {
            var obj = resources[key];
            if (obj.amount < obj.maxStorage) {
                obj.amount += obj.gatherRate();
            }

            if(obj.amount > obj.maxStorage){
                obj.amount = obj.maxStorage;
            }

        }
    }

    updateTotals();

}

function cheat() {
    for (var key in resources) {
        if (resources.hasOwnProperty(key)) {
            resources[key].amount = 5000;
        }
    }
}