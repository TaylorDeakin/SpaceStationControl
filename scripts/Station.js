var method = Station.prototype;

var name, controllingFaction, factionList, system;

function Station(name, controllingFaction, system) {
    this.name = name;
    this.controllingFaction = controllingFaction;
    this.system = system;
}

method.getName = function(){
    return this.name;
};

