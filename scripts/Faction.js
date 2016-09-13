var method = Faction.prototype;

var name;
var leader;
var influence;

var json;

function Faction(name, influence){
    this.name = name;
    this.influence = influence;

    this.json = JSON.stringify(this);
}

method.getName = function () {
    return this.name;
};

module.exports = Faction;