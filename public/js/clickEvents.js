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
    currentPopulationCap: 30,
    currentFoodCost: function () {
        return Math.ceil(this.currentWorkers / 4)
    },
    hireWorker: function () {
        if (resources.food.amount < 20 && ((this.currentWorkers + this.currentUnemployed) >= this.currentPopulationCap)) {
            return;
        }

        resources.food.amount -= 20;
        this.currentWorkers++;
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
            if (resources.metal.amount > this.metalCost) {
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
                            document.getElementById("food-storage-total").innerHTML = resources.hydrogen.maxStorage;
                            break;
                        case "metal-storage-cost":
                            resources.hydrogen.maxStorage += this.storageAdd;
                            document.getElementById("metal-storage-total").innerHTML = resources.hydrogen.maxStorage;
                            break;
                    }
                }
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
            }
            ,
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
            ,
            shipyard: {
                docks: {
                    small: {
                        current: 0,
                        max: 3
                    }
                    ,
                    medium: {
                        current: 0,
                        max: 3
                    }
                    ,
                    large: {
                        current: 0,
                        max: 3
                    }
                }
                ,
                facilites: {
                    repair: {}
                }
            }
        }
    }
    ;
/*
 * Fleet object - keeps track of the ships in the fleet
 */
var fleet = {
    methods: {
        hydrogenUsage: function (rate) {
            return this.count * rate;
        },
        purchase: function (size) {
            switch (size) {
                case 1:
                    if (resources.metal.amount > this.metalCost && buildings.shipyard.docks.small.current != buildings.shipyard.docks.small.max) {
                        resources.metal.amount -= this.metalCost;
                        buildings.shipyard.small.current++;
                    }

                    break;
                case 2:
                    if (resources.metal.amount > this.metalCost && buildings.shipyard.docks.medium.current != buildings.shipyard.docks.medium.max) {
                        resources.metal.amount -= this.metalCost;
                        buildings.shipyard.medium.current++;
                    }
                    break;

                case 3:
                    if (resources.metal.amount > this.metalCost && buildings.shipyard.docks.large.current != buildings.shipyard.docks.large.max) {
                        resources.metal.amount -= this.metalCost;
                        buildings.shipyard.large.current++;
                    }
                    break;
            }

        }
    },
    miners: {
        miner1: {
            miningRate: function () {
                return this.count * 25;
            },
            metalCost: 500,
            hydrogenUsage: function () {
                this.methods.hydrogenUsage().call(this, 5);
            },
            delay: 5,
            count: 0,

        },
        miner2: {
            miningRate: function () {
                return this.count * 50;
            },
            metalCost: 1500,
            hydrogenUsage: function () {
                this.methods.hydrogenUsage().call(this, 15);
            },
            delay: 10,
            count: 0,

        },
        miner3: {
            miningRate: function () {
                return this.count * 100;
            },
            metalCost: 5000,
            delay: 10,
            hydrogenUsage: function () {
                this.methods.hydrogenUsage().call(this, 25);
            },
            count: 0,

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
