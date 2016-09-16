function incrementFaction() {
    controllingFaction.influence++;
}
function decrementFaction() {
    controllingFaction.influence--;
}
function changePowerDynamic(scale) {
    // generate a random amount of change
    var changeAmount = Math.floor(Math.random() * scale) + 1;

    // get current influence
    var controllingFactionCurrentInfluence = controllingFaction["inPower"].influence;
    // figure out new influence
    var controllingFactionChangedInfluence = controllingFactionCurrentInfluence - changeAmount;
    // get number of factions
    var numFactions = factions["factions"].length;
    if (numFactions == 0) {
        controllingFaction["inPower"].influence = 100;
        station.name = "winner!";
        return
    }


    // if change would put the station over 100%
    if (controllingFaction["inPower"].influence - changeAmount > 100) {

    } else if (controllingFaction["inPower"].influence < factions["factions"][0].influence) {
        // 'controlling' is defined as having a majority of power


        var currentFaction = controllingFaction["inPower"];
        // it's sorted already
        var newFaction = factions["factions"][0];
        factions["factions"][0] = currentFaction;

        controllingFaction.$set("inPower", newFaction);


    } else {
        // everything is normal
        // change controlling faction
        controllingFaction["inPower"].influence = controllingFactionChangedInfluence;
        // dole out the change equally to everyone else
        var influenceLeft = 100 - controllingFactionChangedInfluence;
        for (var i = 0; i < numFactions; i++) {
            var change = Math.floor(influenceLeft / (numFactions - i) - Math.floor(Math.random() * scale / 2));
            influenceLeft -= change;
            factions["factions"][i].influence = change;


            if (factions["factions"][i].influence < 0) {
                factions["factions"].splice(i, 1);
                numFactions--;
            }


        }


    }

    factions["factions"] = factions["factions"].sort(function (a, b) {
        return b.influence - a.influence;
    });


}

function positiveEvent() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;

            response = JSON.parse(response);
            var bodyText = response["text"].format(station.name, controllingFaction.inPower.name);

            changePowerDynamic(response["influenceChange"]);
            alert(bodyText);
        }
    };
    xhttp.open("GET", "../event/positive", true);
    xhttp.send();
}
