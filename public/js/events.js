//region Events Objects
var messages = {
    positive: [
        {
            "title": "10th Anniversary Celebrations",
            "text": "Today the citizens of {0} celebrated 10 years of prosperity under the watch of the {1}.",
            "influenceChange": 10,
            "placeholders": [
                "station",
                "faction"
            ],
            "id": 0
        },
        {
            "title": "Overfulfillment of the Ninth Three-Year Plan",
            "text": "Surplus production of {0} has resulted in the overfulfilment of {1}'s Ninth Three-Year Plan, resulting increased prosperity and happiness for all of {2}'s citizens",
            "influenceChange": 3,
            "placeholders": [
                "commodity",
                "faction",
                "station"
            ],
            "id": 1
        },
        {
            "title": "Notorious Pirate Brought to Justice",
            "text": "The notorious Space Pirate {0} was today brought to justice by {1} authorities. ",
            "influenceChange": 3,
            "placeholders": [
                "person",
                "faction"
            ],
            "id": 2
        },
        {
            "title": "{0} Expects to post economic surplus this year",
            "text": "A spokesperson for the {0} announced today that they expect an economic surplus for {1} this year.",
            "influenceChange": 3,
            "placeholders": [
                "faction",
                "station"
            ],
            "id": 3
        },
        {
            "title": "",
            "text": "",
            "influenceChange": 1,
            "placeholders": [""],
            "id": 4
        }
    ],
    negative: [
        {
            "title": "Biowaste Spill Creates Havoc",
            "text": "",
            "influenceChange": -3,
            "placeholders": [""],
            "id": 5
        },
        {
            "title": "Exploration Party Lost",
            "text": "Reports have surfaced suggesting that a {0} financed exploration party sent to the galactic core disappeared more than a month ago.",
            "influenceChange": -4,
            "placeholders": [
                "faction"
            ],
            "id": 6
        },
        {
            "title": "Discontentment Grows as Station-wide Shortage Continues",
            "text": "For weeks, citizens of {0} have been without {1}. As the shortage continues, the population becomes more discontent with the current rule.",
            "influenceChange": -6,
            "placeholders": [
                "station",
                "commodity"
            ],
            "id": 7
        },
        {
            "title": "Two Hundred Dead After Catastrophic Oxygen Leak; Citizens Want an Investigation",
            "text": "Two Hundred Workers were killed Tuesday, when a catastrophic oxygen leak saw parts of the Industrial District without air for more than 10 minutes. Residents of {0} have called for an investigation by the {1}, who control the station.",
            "influenceChange": -8,
            "placeholders": [
                "station",
                "faction"
            ],
            "id": 8

        },
        {
            "title": "Increasing Numbers of Space Pirates in {0}",
            "text": "According to a report released yesterday, the number of space pirates in {0} appears to be increasing. The report cited multiple traders who claimed to have been attacked while transporting goods. While the exact number of pirates is unknown, all pilots are advised to fly safely, and to contact {1} officials immediately if they suspect anyone is a pirate.",
            "influenceChange": -2,
            "placeholders": ["system", "faction"],
            "id": 9
        },
        {
            "title": "Space Pirate Leader Sighted",
            "text": "Notorious Space Pirate {0} has been sighted in {1}. {0} is notorious for their excessive cruelty, and their ship {2}, is said to be painted red with the blood of all who have been murdered.",
            "influenceChange": -1,
            "placeholders": ["person", "system", "pirateShip"],
            "id": 10
        }
    ],
    news: [
        {}
    ]
};
//endregion

var occuredEvents = [];
var occuredEventsCount = 0;

function changePowerDynamic(scale) {
    // generate a random amount of change
    var changeAmount = Math.floor(Math.random() * scale) + 1;

    // get current influence
    var controllingFactionCurrentInfluence = controllingFaction["inPower"].influence;
    // figure out new influence
    var controllingFactionChangedInfluence = controllingFactionCurrentInfluence + changeAmount;
    // get number of factions
    var numFactions = factions["factions"].length;
    if (numFactions == 0) {
        controllingFaction["inPower"].influence = 100;
        station.name = "winner!";
        return
    }

    // if change would put the station over 100%
    if (controllingFaction["inPower"].influence + changeAmount > 100) {

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
/**
 * generates a positive event
 */
function positiveEvent() {
    eventHandler(messages.positive[0])
}
/**
 * effectively the same as the positive event, but bad
 */
function negativeEvent() {

    eventHandler(messages.negative[0]);
}
function eventHandler(data) {
    occuredEvents[occuredEventsCount] = data["id"];
    occuredEventsCount++;
    var placeholders = data["placeholders"];

    // for each of the placeholders, we want to replace it
    // with the relevant data
    for (var i = 0; i < placeholders.length; i++) {
        switch (placeholders[i]) {
            case "station":
                placeholders[i] = station.name;
                break;
            case "faction":
                placeholders[i] = controllingFaction.inPower.name;
                break;
            case "commodity":
                placeholders[i] = getRandomCommodity();
                break;
            case "person":
                placeholders[i] = getRandomPerson();
                break;
            case "system":
                placeholders[i] = station.system;
                break;
            case "pirateShip":
                placeholders[i] = getRandomPirateShip();
                break;
        }
    }
    // replace the placeholder braces with actual text
    var title = data["title"].format(placeholders);
    var bodyText = data["text"].format(placeholders);
    // change power dynamics based on the event
    changePowerDynamic(data["influenceChange"]);

    var item = {"title": title, "body": bodyText};
    news["items"].unshift(item);

}