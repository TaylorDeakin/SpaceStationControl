// the number of clicks on the screen
var clickCount = 0;

// need a better solution than declaring everything in global scope
// but I don't really want to be constantly traversing the DOM
var shipsMining = document.getElementsByClassName("ship-mining");
var shipsExploring = document.getElementsByClassName("ship-exploring");
var shipsTrading = document.getElementsByClassName("ship-trading");
var unallocatedShips = document.getElementsByClassName("ship-unallocated");
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
        workers: 5,
        maxStorage: 2000
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
        workers: 10,
        maxStorage: 2000
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
        shipGatherRate: 0,
        workers: 5,
        maxStorage: 2000

    }
};
/**
 * Population object, tracks the population of the station
 */
var population = {
    currentWorkers: 20,
    currentUnemployed: 0,
    currentPopulation: function(){
        return this.currentWorkers + this.currentUnemployed;
    },
    currentPopulationCap: 30,
    currentFoodCost: function () {
        return Math.ceil(this.currentWorkers / 4)
    },
    hireWorker: function () {
        if (resources.food.amount < 20 || ((this.currentWorkers + this.currentUnemployed) >= this.currentPopulationCap)) {
            return;
        }

        resources.food.amount -= 20;
        this.currentUnemployed++;

        updateTotals();
    }
};
/*
 * Buildings object - tracks the buildings in the space station
 * purchase function abstracted away
 */
var buildings = {
    purchase: function () {
        // if we can afford the bulding
        if (resources.metal.amount >= this.metalCost) {
            // increase the count & metal cost
            this.count++;
            resources.metal.amount -= this.metalCost;
            this.metalCost += this.metalIncrease;
            // set the text of the relevant element
            document.getElementById(this.element).innerHTML = this.metalCost;
            // if it's a population building add population
            if (this.hasOwnProperty("popAdd")) population.currentPopulationCap += this.popAdd;
            // if it's a storage building, add storage
            if (this.hasOwnProperty("storageAdd")) {
                switch (this.element) {
                    case "hydrogen-storage-cost":
                        resources.hydrogen.maxStorage += this.storageAdd;
                        document.getElementById("hydrogen-storage-total").innerHTML = resources.hydrogen.maxStorage;
                        break;
                    case "food-storage-cost":
                        resources.food.maxStorage += this.storageAdd;
                        document.getElementById("food-storage-total").innerHTML = resources.food.maxStorage;
                        break;
                    case "metal-storage-cost":
                        resources.metal.maxStorage += this.storageAdd;
                        document.getElementById("metal-storage-total").innerHTML = resources.metal.maxStorage;
                        break;
                }
            }
            if (this.hasOwnProperty("hangerAdd")) this.max += this.hangarAdd;
        }
    },
    housing: {
        apartment: {
            metalCost: 50,
            metalIncrease: 5,
            popAdd: 2,
            element: "apartment-cost",
            count: 0,
            purchase: function () {
                buildings.purchase.call(this);
            }

        }
    },
    factories: {},
    storage: {
        hydrogen: {
            name: "Hydrogen Tank",
            metalCost: 100,
            metalIncrease: 10,
            storageAdd: 500,
            element: "hydrogen-storage-cost",
            count: 0,
            purchase: function () {
                buildings.purchase.call(this);

            }
        },
        metal: {
            name: "Metal Stockpile",
            metalCost: 100,
            metalIncrease: 10,
            storageAdd: 500,
            element: "metal-storage-cost",
            count: 0,
            purchase: function () {
                buildings.purchase.call(this);
            }
        },
        food: {
            name: "Food Stockpile",
            metalCost: 100,
            metalIncrease: 10,
            storageAdd: 500,
            element: "food-storage-cost",
            count: 0,
            purchase: function () {
                buildings.purchase.call(this);
            }
        }
    },
    shipyard: {
        docks: {
            small: {
                element: "small-hangar-cost",
                metalIncrease: 50,
                metalCost: 250,
                current: 0,
                unassigned: 0,
                max: 3,
                hangarAdd: 1,
                purchase: function () {
                    buildings.purchase.call(this)
                }
            },
            medium: {
                element: "medium-hangar-cost",
                metalIncrease: 250,
                metalCost: 750,
                current: 0,
                unassigned: 0,
                max: 3,
                hangarAdd: 1,
                purchase: function () {
                    buildings.purchase.call(this)
                }
            },
            large: {
                metalIncrease: 1250,
                metalCost: 2500,
                element: "large-hangar-cost",
                current: 0,
                unassigned: 0,
                max: 3,
                hangarAdd: 1,
                purchase: function () {
                    buildings.purchase.call(this)
                }
            }
        },
        facilites: {
            repair: {}
        }
    }
};
/*
 * Fleet object - keeps track of the ships in the fleet
 */
var fleet = {
    methods: {
        tickEvent: function () {
            resources.metal.amount += (fleet.miners.miner1.miningRateCalc() + fleet.miners.miner2.miningRateCalc() + fleet.miners.miner3.miningRateCalc());
        },
        hydrogenUsage: function (rate) {
            return this.count * rate;
        },
        purchase: function (size) {
            switch (size) {
                case 1:
                    if (resources.metal.amount >= 500 && buildings.shipyard.docks.small.current != buildings.shipyard.docks.small.max) {
                        resources.metal.amount -= 500;
                        buildings.shipyard.docks.small.current++;
                        buildings.shipyard.docks.small.unassigned++;
                    }

                    break;
                case 2:
                    if (resources.metal.amount >= 1500 && buildings.shipyard.docks.medium.current != buildings.shipyard.docks.medium.max) {
                        resources.metal.amount -= 1500;
                        buildings.shipyard.docks.medium.current++;
                        buildings.shipyard.docks.medium.unassigned++;
                    }
                    break;

                case 3:
                    if (resources.metal.amount >= 5000 && buildings.shipyard.docks.large.current != buildings.shipyard.docks.large.max) {
                        resources.metal.amount -= 5000;
                        buildings.shipyard.docks.large.current++;
                        buildings.shipyard.docks.large.unassigned++;
                    }
                    break;
            }

        },
        assignShip: function (size, task) {
            var shipNum;

            switch (size) {
                case "small":
                    shipNum = 1;
                    break;
                case "medium":
                    shipNum = 2;
                    break;
                case "large":
                    shipNum = 3;
            }

            console.log(buildings.shipyard.docks[size]);
            if (buildings.shipyard.docks[size].unassigned > 0) {
                switch (task) {
                    case "trading":
                        fleet.traders["trader" + shipNum].count++;
                        buildings.shipyard.docks[size].unassigned--;
                        break;
                    case "exploring":
                        fleet.explorers["explorer" + shipNum].count++;
                        buildings.shipyard.docks[size].unassigned--;
                        break;
                    case "mining":
                        fleet.miners["miner" + shipNum].count++;
                        resources.metal.shipGatherRate += fleet.miners["miner" + shipNum].miningRateAmount;
                        buildings.shipyard.docks[size].unassigned--;
                        break;

                }
            }
        },
        unassignShip: function (size, task) {
            var shipNum;

            switch (size) {
                case "small":
                    shipNum = 1;
                    break;
                case "medium":
                    shipNum = 2;
                    break;
                case "large":
                    shipNum = 3;
            }
            console.log(buildings.shipyard.docks[size]);
            if (buildings.shipyard.docks[size].unassigned > 0) {
                switch (task) {
                    case "trading":
                        fleet.traders["trader" + shipNum].count--;
                        buildings.shipyard.docks[size].unassigned++;
                        break;
                    case "exploring":
                        fleet.explorers["explorer" + shipNum].count--;
                        buildings.shipyard.docks[size].unassigned++;
                        break;
                    case "mining":
                        fleet.miners["miner" + shipNum].count--;
                        buildings.shipyard.docks[size].unassigned++;
                        break;

                }
            }
        }
    },
    miners: {
        miner1: {
            miningRateCalc: function () {
                return this.count * 25;
            },
            miningRateAmount: 25,
            metalCost: 500,
            hydrogenUsage: function () {
                this.methods.hydrogenUsage().call(this, 5);
            },
            delay: 5,
            count: 0,

        },
        miner2: {
            miningRateCalc: function () {
                return this.count * 50;
            },
            miningRateAmount: 50,
            metalCost: 1500,
            hydrogenUsage: function () {
                this.methods.hydrogenUsage().call(this, 15);
            },
            delay: 10,
            count: 0,

        },
        miner3: {
            miningRateCalc: function () {
                return this.count * 100;
            },
            miningRateAmount: 100,
            metalCost: 5000,
            delay: 10,
            hydrogenUsage: function () {
                this.methods.hydrogenUsage().call(this, 25);
            },
            count: 0,

        },
    },
    traders: {
        trader1: {
            tradeProfit: function () {
                return getRandomInt(500, 1000)
            },
            metalCost: 500,
            hydrogenUsage: function () {
                this.methods.hydrogenUsage().call(this, 10);
            },
            count: 0
        },
        trader2: {
            tradeProfit: function () {
                return getRandomInt(1500, 5000)
            },
            metalCost: 1500,
            hydrogenUsage: function () {
                this.methods.hydrogenUsage().call(this, 20);
            },
            count: 0
        },
        trader3: {
            tradeProfit: function () {
                return getRandomInt(5000, 50000)
            },
            metalCost: 5000,
            hydrogenUsage: function () {
                this.methods.hydrogenUsage().call(this, 50);
            },
            count: 0
        }
    },
    explorers: {
        explorer1: {
            explore: function () {
                return 0; //TODO: implement exploration feature
            },
            metalCost: 500,
            hydrogenUsage(){
                this.methods.hydrogenUsage().call(this, 35);
            },
            count: 0
        },
        explorer2: {
            explore: function () {
                return 0; //TODO: implement exploration feature
            },
            metalCost: 500,
            hydrogenUsage(){
                this.methods.hydrogenUsage().call(this, 55);
            },
            count: 0
        },
        explorer3: {
            explore: function () {
                return 0; //TODO: implement exploration feature
            },
            metalCost: 500,
            hydrogenUsage(){
                this.methods.hydrogenUsage().call(this, 75);
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

function updateFleetTotals() {

    // mining ships
    shipsMining[0].innerHTML = fleet.miners.miner1.count;
    shipsMining[1].innerHTML = fleet.miners.miner2.count;
    shipsMining[2].innerHTML = fleet.miners.miner3.count;
    // explorers
    shipsExploring[0].innerHTML = fleet.explorers.explorer1.count;
    shipsExploring[1].innerHTML = fleet.explorers.explorer2.count;
    shipsExploring[2].innerHTML = fleet.explorers.explorer3.count;
    // trading ships
    shipsTrading[0].innerHTML = fleet.traders.trader1.count;
    shipsTrading[1].innerHTML = fleet.traders.trader2.count;
    shipsTrading[2].innerHTML = fleet.traders.trader3.count;
    // unallocated ships
    unallocatedShips[0].innerHTML = buildings.shipyard.docks.small.unassigned;
    unallocatedShips[1].innerHTML = buildings.shipyard.docks.medium.unassigned;
    unallocatedShips[2].innerHTML = buildings.shipyard.docks.large.unassigned;


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
            if (!obj.hasOwnProperty("shipGatherRate")) {
                gatherRates.item(i).innerHTML = obj.gatherRate();
            } else {
                gatherRates.item(i).innerHTML = obj.gatherRate() + obj.shipGatherRate;
            }


            workers.item(i).innerHTML = obj.workers;
            i++;
        }
    }
    // set worker count
    document.getElementById("worker-count").innerHTML = population.currentWorkers;
    document.getElementById("unemployed-count").innerHTML = population.currentUnemployed;
    document.getElementById("food-cost").innerHTML = population.currentFoodCost();
    document.getElementById("max-population").innerHTML = population.currentPopulationCap;

    // update fleet totals
    updateFleetTotals();
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
