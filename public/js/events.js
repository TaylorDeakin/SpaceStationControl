function incrementFaction() {
    controllingFaction.influence++;
}
function decrementFaction() {
    controllingFaction.influence--;
}
function changePowerDynamic(scale) {
    // generate a random amount of change
    var changeAmount = Math.floor(Math.random() * scale) + 1;
    // change can be good too! (50% of the time for now)
    if (Math.random() > 0.5) {
        changeAmount *= -1;
    }

    // get current influence
    var controllingFactionCurrentInfluence = controllingFaction.influence;
    // figure out new influence
    var controllingFactionChangedInfluence = controllingFactionCurrentInfluence - changeAmount;

    // get number of factions
    var numFactions = factions["factions"].length;
    if (numFactions == 0) {
        controllingFaction.influence = 100;
        return
    }


    // if change would put the station over 100%
    if (controllingFaction.influence - changeAmount > 100) {
        // figure something else out

    } else if (controllingFaction.influence - changeAmount < 50) {
        // 'controlling' is defined as having 50% or more of 'influence'
        // make a new faction the controlling one!

    } else {
        // everything is normal
        // change controlling faction
        controllingFaction.influence = controllingFactionChangedInfluence;
        // dole out the change equally to everyone else
        var influenceLeft = 100 - controllingFactionChangedInfluence;
        for (var i = 0; i < numFactions; i++) {
            var change = influenceLeft / (numFactions - i) - Math.floor(Math.random() * scale / 2);
            influenceLeft -= change;
            factions["factions"][i].influence = change;


            if (factions["factions"][i].influence < 0) {
                factions["factions"].splice(i, 1);
                numFactions--;
            }


        }


    }


}

