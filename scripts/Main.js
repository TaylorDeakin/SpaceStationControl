var fs = require('fs');
var Faction = require('../scripts/Faction');
var Station = require('../scripts/Station');
var systenNames, factionColours, factionSuffixes, stationNames, stationTypes;

function Main() {
    var jsonData = require('../resources/strings.json');

    this.stationNames = jsonData["stationNames"];
    this.stationTypes = jsonData["stationTypes"];
    this.systenNames = jsonData["systemNames"];
    this.factionColours = jsonData["factionColours"];
    this.factionSuffixes = jsonData["factionSuffixes"];
}

Main.prototype.makeNewStation = function () {
    var system = this.systenNames[getRandomInt(0, this.systenNames.length)];
    var stationName = this.stationNames[getRandomInt(0, this.stationNames.length)] + " " + this.stationTypes[getRandomInt(0, this.stationTypes.length)];
    var controllingFaction = this.makeNewFaction(system);
    var numFactions = getRandomInt(1, 5);
    var factions = {};
    for (var i = 0; i < numFactions; i++) {
        factions[i] = (this.makeNewFaction(system));
    }

    var station = new Station(stationName, controllingFaction, factions,system);

    console.log(station);


};

Main.prototype.makeNewFaction = function (system) {
    var name = system
        + " " + this.factionColours[getRandomInt(0, this.factionColours.length)]
        + " " + this.factionSuffixes[getRandomInt(0, this.factionSuffixes.length)];

    return new Faction(name);
};

// via http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Main.prototype.test = function () {
    return "test";
};

module.exports = Main;