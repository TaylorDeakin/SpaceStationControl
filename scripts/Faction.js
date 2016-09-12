var method = Faction.prototype;

var name;
var leader;

function Faction(name){
    this.name = name;
}

method.getName = function () {
    return this.name;
};


module.exports = Faction;