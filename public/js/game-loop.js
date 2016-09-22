// call once to init everything
updateTotals();

var conditionalEvents = {
  OXYGEN_LEAK: 3,
};

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

    /* Special Events */

    // OXYGEN LEAK - occurs when a player has more than 200 workers,
    if(resources.food.workers > 200 && Math.random() > 0.8 && conditionalEvents.OXYGEN_LEAK != -1){
        var event = messages.negative[conditionalEvents.OXYGEN_LEAK];
        eventHandler(event);
        // set flag to -1, so that it won't happen again
        conditionalEvents.OXYGEN_LEAK = -1;
        // delete that amount of workers;
        resources.food.workers -= 150;
        population.currentWorkers -= 150;
    }

    // EXPLORATION PARTY LOST
    if(false){
        //TODO: implement this
    }


}

function cheat() {
    for (var key in resources) {
        if (resources.hasOwnProperty(key)) {
            resources[key].amount = 5000;
        }
    }
}