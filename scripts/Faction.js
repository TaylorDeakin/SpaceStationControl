var method = Faction.prototype;

var name;
var leader;
var influence;

function Faction(name, influence){
    this.name = name;
    this.influence = influence;
}

method.getName = function () {
    return this.name;
};


module.exports = Faction;