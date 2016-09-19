// the number of clicks on the screen
var clickCount = 0;

/*
 * resources object - keeps track of all the resources
 */
var resources = {
    hydrogen: {
        name: "Hydrogen",
        amount: 150,
        increment: function () {
            this.amount += 5;
        },
        gatherRate: function () {
            return this.workers
        },
        workers: 5
    },
    food: {
        name: "Food",
        amount: 200,
        increment: function () {
            this.amount++;
        },
        gatherRate: function () {
            return this.workers - population.currentFoodCost()
        },
        workers: 10
    },
    metal: {
        name: "metal",
        amount: 50,
        increment: function () {
            this.amount++;
        },
        gatherRate: function () {
            return this.workers / 2;
        },
        workers: 5
    }
};
/**
 * Population object, tracks the population of the station
 */
var population = {
    currentWorkers: 20,
    currentUnemployed: 0,
    currentPopulationCap: 30,
    currentFoodCost: function () {
        return Math.ceil(this.currentWorkers / 4)
    }
};
/*
 * Buildings object - tracks the buildings in the space station
 */
var buildings = {
    housing: {
        apartment: {
            metalCost: 50,
            popAdd: 2,
            count: 0,
            purchase: function(){
                this.count++;
                this.metalCost += 5;
                population.currentPopulationCap +=this.popAdd;
                document.getElementById("apartment-cost").innerHTML = this.metalCost;
            }
        }
    },
    factories: {

    }
};
/*
 * Fleet object - keeps track of the ships in the fleet
 */
var fleet = {
    miners: {
        miner1: {
            miningRate: function () {
                return this.count * 25;
            },
            metalCost: 500,
            hydrogenUsage: function () {
                return this.count * 5
            },
            count: 0

        },
        miner2: {
            miningRate: function () {
                return this.count * 50;
            },
            metalCost: 1500,
            hydrogenUsage: function () {
                return this.count * 10
            },
            count: 0

        },
        miner3: {
            miningRate: function () {
                return this.count * 100;
            },
            metalCost: 5000,
            hydrogenUsage: function () {
                return this.count * 25
            },
            count: 0
        }
    },
    traders: {
        trader1: {
            tradeProfit: function () {
                return getRandomInt(500, 1000)
            },
            metalCost: 500,
            hydrogenUsage: function () {
                return this.count * 10
            },
            count: 0
        },
        trader2: {
            tradeProfit: function () {
                return getRandomInt(1500, 5000)
            },
            metalCost: 500,
            hydrogenUsage: function () {
                return this.count * 20
            },
            count: 0
        },
        trader3: {
            tradeProfit: function () {
                return getRandomInt(5000, 50000)
            },
            metalCost: 500,
            hydrogenUsage: function () {
                return this.count * 50
            },
            count: 0
        }
    }
};
/**
 * adds the specified resource to the counter
 * @param name - the name of the resource
 */
function addResource(name) {
    clickCount++;
    switch (name) {
        case "hydrogen":
            resources.hydrogen.increment();
            break;
        case "food":
            resources.food.increment();
            break;
        case "metal":
            resources.metal.increment();
            break;

        // continues on - will be updated when needed
    }
    // this is called here
    // TODO: see if it needs to be called here
    updateTotals();

}
/**
 * UpdateTotals: will update all the totals presented to the user
 */
function updateTotals() {
    var workers = document.getElementsByClassName("worker-count");
    var totals = document.getElementsByClassName("resource-output");
    var gatherRates = document.getElementsByClassName("resource-gather-rate");

    var i = 0;
    for (var key in resources) {
        if (resources.hasOwnProperty(key)) {

            var obj = resources[key];
            totals.item(i).innerHTML = prettyPrint(obj.name, obj.amount);
            gatherRates.item(i).innerHTML = obj.gatherRate();
            workers.item(i).innerHTML = obj.workers;
            i++;
        }
    }
    // set worker count
    document.getElementById("worker-count").innerHTML = population.currentWorkers;
    document.getElementById("unemployed-count").innerHTML = population.currentUnemployed;
    document.getElementById("food-cost").innerHTML = population.currentFoodCost();
    document.getElementById("max-population").innerHTML = population.currentPopulationCap;
}
/**
 * pretty printing for resources
 * @param name - the name of the resources
 * @param amount - the current amount
 * @returns {string} - a nicely formatted string
 */
function prettyPrint(name, amount) {
    return name + ': <span class="resource-amount">' + amount + '</span>';
}

/**
 * hireworker - hires a worker
 */
function hireWorker() {
    // need to check that we can manage all this
    if (resources.food.amount < 20 && ((population.currentWorkers + population.currentUnemployed) >= population.currentPopulationCap)) {
        return;
    }

    resources.food.amount -= 20;
    population.currentWorkers++;
    population.currentUnemployed++;

    updateTotals();

}

function assignWorker(task) {
    if (population.currentUnemployed < 1) {
        return;
    }
    population.currentUnemployed--;
    switch (task) {
        case "hydrogen":
            //resources.hydrogen.gatherRate += 1;
            resources.hydrogen.workers++;
            document.getElementById("worker-count-hydrogen").innerHTML = resources.hydrogen.workers;
            break;
        case "food":
            //resources.food.gatherRate += 0.5;
            resources.food.workers++;
            document.getElementById("worker-count-food").innerHTML = resources.food.workers;
            break;
        case "metal":
            //resources.metal.gatherRate += 0.5;
            resources.metal.workers++;
            document.getElementById("worker-count-metal").innerHTML = resources.metal.workers;
            break;
    }
    updateTotals();
}
function unassignWorker(task) {

    if (resources.hydrogen.workers > 0 && task === "hydrogen") {
        //resources.hydrogen.gatherRate -= 1;
        resources.hydrogen.workers--;
        document.getElementById("worker-count-hydrogen").innerHTML = resources.hydrogen.workers;
    } else if (resources.food.workers > 0 && task === "food") {
        //resources.food.gatherRate -= 0.5;
        resources.food.workers--;
        document.getElementById("worker-count-food").innerHTML = resources.food.workers;
    } else if (resources.metal.workers > 0 && task === "metal") {
        //resources.metal.gatherRate -= 0.5;
        resources.metal.workers--;
        document.getElementById("worker-count-metal").innerHTML = resources.metal.workers;
    }

    population.currentUnemployed++;
}
