var MAX_NEWS =10;
// so that I can pass arrays with ease
jQuery.ajaxSettings.traditional = true;
// List of commodities for various method calls
var goods = ["Corn", "Oats", "Gold", "Iron", "Medicine", "Farm Machinery", "Wheat", "Coffee", "Sugar", "Ethanol", "Hydrogen", "Copper", "Palladium", "Cobalt", "Molybdenum", "Construction Material", "Uranium", "Livestock", "Vehicles", "Consumer Goods", "Luxury Goods", "Computers", "Air Processors", "Narcotics", "Robots", "Biowaste", "Water"];
var people = ["Walter Leonard", "Gawain Gnaeus Montgomery", "Celso Phokas Krupin", "Jinan Léo", "Makari Bronislav", "Martin Faysal", "Silvio Ciríaco", "Torquil Placido", "Dae-Hyun See", "Adrienne Maritza Greene", "Gracie Dean", "Elsie Patton", "Hershel Cyrus Everett" ];
var pirateShips = ["The Annihilation", "The Hateful", "Demonic Florence", "Jennifer's Sanity", "Lone Maiden", "Wanderer", "Destroyer of Worlds", "The Rage of the West","Dark Skull "];

/*
 * String Format Function
 * based on an answer from http://stackoverflow.com/questions/18405736/is-there-a-c-sharp-string-format-equivalent-in-javascript
 */
String.prototype.format = function (placeholders) {
    var s = this,
        i = placeholders.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), placeholders[i]);
    }
    return s;
};

function getRandomCommodity() {

    return goods[getRandomInt(0,goods.length)]
}

function getRandomPerson(){
    return people[getRandomInt(0,people.length)]
}
function getRandomPirateShip(){
    return pirateShips[getRandomInt(0,pirateShips.length)];
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
