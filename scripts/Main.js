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

/**
 * Makes a new station, with a controlling faction and a number of other factions
 */
Main.prototype.makeNewStation = function () {
    var influenceMax = 100;

    var system = this.systenNames[getRandomInt(0, this.systenNames.length)];
    var stationName = this.stationNames[getRandomInt(0, this.stationNames.length)]
        + " " + this.stationTypes[getRandomInt(0, this.stationTypes.length)];
    var controllingInfluence = getRandomInt(50,influenceMax);
    var controllingFaction = this.makeNewFaction(system, controllingInfluence);
    influenceMax -= controllingInfluence;

    var numFactions = getRandomInt(1, 5);
    var factions = {"factions": []};
    for (var i = 0; i < numFactions; i++) {
        var influence;
        if(i == (numFactions -1)){
             influence = influenceMax;
        } else {
            influence = getRandomInt(1,influenceMax);
            influenceMax -= influence;
        }

        console.log(influence);
        if (i >= 2) {
            system = this.systenNames[getRandomInt(0, this.systenNames.length)];
        }

        factions['factions'][i] = (this.makeNewFaction(system, influence));
    }

    return new Station(stationName, controllingFaction, factions, system);
};
/**
 * Make a new faction
 * @param system - the system the parameter is in
 * @param influence
 * @returns {Faction} - a faction object
 */
Main.prototype.makeNewFaction = function (system, influence) {

    var colour = " ";
    if(Math.random() > 0.5){
        colour =  " " + this.factionColours[getRandomInt(0, this.factionColours.length)] + " ";
    }

    var name = system
        + colour + this.factionSuffixes[getRandomInt(0, this.factionSuffixes.length)];

    return new Faction(name, influence);
};

// via http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


module.exports = Main;