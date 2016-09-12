var method = Station.prototype;

var name, controllingFaction, factionList, system;
var jsonString;

function Station(name, controllingFaction, factionList, system) {
    this.name = name;
    this.controllingFaction = controllingFaction;
    this.system = system;
    this.factionList = factionList;

    this.jsonString = JSON.stringify(this);

}

method.getName = function(){
    return this.name;
};


module.exports = Station;
