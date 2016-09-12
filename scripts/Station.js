var method = Station.prototype;

var name, controllingFaction, factionList, system;

function Station(name, controllingFaction, factionList, system) {
    this.name = name;
    this.controllingFaction = controllingFaction;
    this.system = system;
    this.factionList = factionList;
}

method.getName = function(){
    return this.name;
};


module.exports = Station;
