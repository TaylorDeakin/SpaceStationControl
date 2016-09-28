// call once to init everything
function init(){
    updateTotals();
}

init();

setInterval(function () {
    gameTick();
}, 1000);

var conditionalEvents = {
    OXYGEN_LEAK: {
        id: 3,
        run: function(){
            var event = messages.negative[this.id];
            eventHandler(event);
            // set flag to -1, so that it won't happen again
            this.id = -1;
            // delete that amount of workers;
            resources.food.workers -= 150;
            population.currentWorkers -= 150;
        }
    },
    ECONOMIC_SURPLUS_1: {
        id: 0,
        run: function(){
            var event = messages.positive[this.id];
            eventHandler(event);
            this.id = -1;
        }
    },
    ECONOMIC_SURPLUS_2: {
        id: 1,
        run: function () {
            var event = messages.positive[this.id];
            eventHandler(event);
            this.id = -1;
        }
    }
};
/**
 * called every second, is responsible for running the game
 */
function gameTick() {
    gatherResources();
    fleet.methods.tickEvent();
    updateTotals();
    testEventConditionals();
}

function testEventConditionals() {
    /* Special Events */

    // OXYGEN LEAK - occurs when a player has more than 200 workers on food
    if (conditionalEvents.OXYGEN_LEAK.id != -1 && resources.food.workers > 200 && Math.random() > 0.8) {
        conditionalEvents.OXYGEN_LEAK.run();
    }

    // EXPLORATION PARTY LOST
    if (false) {
        //TODO: implement this
    }
    // PIRATE INCREASE
    if (false) {
        // TODO: implement pirate increase - probably based on something fun like trader amounts
    }
    // PIRATE LORD ARRIVAL
    if (false) {
        // TODO: implement pirate lord arrival
    }

    // ECONOMIC SURPLUS 1
    if(conditionalEvents.ECONOMIC_SURPLUS_1.id != -1 && population.currentPopulation() > 30){
        conditionalEvents.ECONOMIC_SURPLUS_1.run();
    }
    // ECONOMIC SURPLUS 2
    if(conditionalEvents.ECONOMIC_SURPLUS_2.id != -1 && resources.food.amount > 2000){
        conditionalEvents.ECONOMIC_SURPLUS_2.run();
    }
}

function gatherResources(){
    for (var key in resources) {
        if (resources.hasOwnProperty(key)) {
            var obj = resources[key];
            if (obj.amount <= obj.maxStorage) {
                obj.amount += obj.gatherRate();
            }

            if (obj.amount > obj.maxStorage) {
                obj.amount = obj.maxStorage;
            }

        }
    }
}


/**
 * debug function to give resources
 * @param amount - amount of resources to give
 */
function cheat(amount) {
    if (amount === undefined) amount = 5000;

    for (var key in resources) {
        if (resources.hasOwnProperty(key)) {
            resources[key].amount = amount;
        }
    }
}