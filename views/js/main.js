/*
Welcome to the 60fps project! Your goal is to make Cam's Pizzeria website run
jank-free at 60 frames per second.

There are two major issues in this code that lead to sub-60fps performance. Can
you spot and fix both?


Built into the code, you'll find a few instances of the User Timing API
(window.performance), which will be console.log()ing frame rate data into the
browser console. To learn more about User Timing API, check out:
http://www.html5rocks.com/en/tutorials/webperformance/usertiming/

Creator:
Cameron Pittman, Udacity Course Developer
cameron *at* udacity *dot* com
*/

// As you may have realized, this website randomly generates pizzas.
// Here are arrays of all possible pizza ingredients.
var pizzaIngredients = {};
pizzaIngredients.meats = [
  "Pepperoni",
  "Sausage",
  "Fennel Sausage",
  "Spicy Sausage",
  "Chicken",
  "BBQ Chicken",
  "Chorizo",
  "Chicken Andouille",
  "Salami",
  "Tofu",
  "Bacon",
  "Canadian Bacon",
  "Proscuitto",
  "Italian Sausage",
  "Ground Beef",
  "Anchovies",
  "Turkey",
  "Ham",
  "Venison",
  "Lamb",
  "Duck",
  "Soylent Green",
  "Carne Asada",
  "Soppressata Picante",
  "Coppa",
  "Pancetta",
  "Bresola",
  "Lox",
  "Guanciale",
  "Chili",
  "Beef Jerky",
  "Pastrami",
  "Kielbasa",
  "Scallops",
  "Filet Mignon"
];
pizzaIngredients.nonMeats = [
  "White Onions",
  "Red Onions",
  "Sauteed Onions",
  "Green Peppers",
  "Red Peppers",
  "Banana Peppers",
  "Ghost Peppers",
  "Habanero Peppers",
  "Jalapeno Peppers",
  "Stuffed Peppers",
  "Spinach",
  "Tomatoes",
  "Pineapple",
  "Pear Slices",
  "Apple Slices",
  "Mushrooms",
  "Arugula",
  "Basil",
  "Fennel",
  "Rosemary",
  "Cilantro",
  "Avocado",
  "Guacamole",
  "Salsa",
  "Swiss Chard",
  "Kale",
  "Sun Dried Tomatoes",
  "Walnuts",
  "Artichoke",
  "Asparagus",
  "Caramelized Onions",
  "Mango",
  "Garlic",
  "Olives",
  "Cauliflower",
  "Polenta",
  "Fried Egg",
  "Zucchini",
  "Hummus"
];
pizzaIngredients.cheeses = [
  "American Cheese",
  "Swiss Cheese",
  "Goat Cheese",
  "Mozzarella Cheese",
  "Parmesean Cheese",
  "Velveeta Cheese",
  "Gouda Cheese",
  "Muenster Cheese",
  "Applewood Cheese",
  "Asiago Cheese",
  "Bleu Cheese",
  "Boursin Cheese",
  "Brie Cheese",
  "Cheddar Cheese",
  "Chevre Cheese",
  "Havarti Cheese",
  "Jack Cheese",
  "Pepper Jack Cheese",
  "Gruyere Cheese",
  "Limberger Cheese",
  "Manchego Cheese",
  "Marscapone Cheese",
  "Pecorino Cheese",
  "Provolone Cheese",
  "Queso Cheese",
  "Roquefort Cheese",
  "Romano Cheese",
  "Ricotta Cheese",
  "Smoked Gouda"
];
pizzaIngredients.sauces = [
  "Red Sauce",
  "Marinara",
  "BBQ Sauce",
  "No Sauce",
  "Hot Sauce"
];
pizzaIngredients.crusts = [
  "White Crust",
  "Whole Wheat Crust",
  "Flatbread Crust",
  "Stuffed Crust"
];

// Name generator pulled from http://saturdaykid.com/usernames/generator.html
// Capitalizes first letter of each word
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Pulls adjective out of array using random number sent from generator
function getAdj(x){
  switch(x) {
    case "dark":
      var dark = ["dark","morbid", "scary", "spooky", "gothic", "deviant", "creepy", "sadistic", "black", "dangerous", "dejected", "haunted",
      "morose", "tragic", "shattered", "broken", "sad", "melancholy", "somber", "dark", "gloomy", "homicidal", "murderous", "shady", "misty",
      "dusky", "ghostly", "shadowy", "demented", "cursed", "insane", "possessed", "grotesque", "obsessed"];
      return dark;
    case "color":
      var colors = ["blue", "green", "purple", "grey", "scarlet", "NeonGreen", "NeonBlue", "NeonPink", "HotPink", "pink", "black", "red",
      "maroon", "silver", "golden", "yellow", "orange", "mustard", "plum", "violet", "cerulean", "brown", "lavender", "violet", "magenta",
      "chestnut", "rosy", "copper", "crimson", "teal", "indigo", "navy", "azure", "periwinkle", "brassy", "verdigris", "veridian", "tan",
      "raspberry", "beige", "sandy", "ElectricBlue", "white", "champagne", "coral", "cyan"];
      return colors;
    case "whimsical":
      var whimsy = ["whimsical", "silly", "drunken", "goofy", "funny", "weird", "strange", "odd", "playful", "clever", "boastful", "breakdancing",
      "hilarious", "conceited", "happy", "comical", "curious", "peculiar", "quaint", "quirky", "fancy", "wayward", "fickle", "yawning", "sleepy",
      "cockeyed", "dizzy", "dancing", "absurd", "laughing", "hairy", "smiling", "perplexed", "baffled", "cockamamie", "vulgar", "hoodwinked",
      "brainwashed"];
      return whimsy;
    case "shiny":
      var shiny = ["sapphire", "opal", "silver", "gold", "platinum", "ruby", "emerald", "topaz", "diamond", "amethyst", "turquoise",
      "starlit", "moonlit", "bronze", "metal", "jade", "amber", "garnet", "obsidian", "onyx", "pearl", "copper", "sunlit", "brass", "brassy",
      "metallic"];
      return shiny;
    case "noisy":
      var noisy = ["untuned", "loud", "soft", "shrieking", "melodious", "musical", "operatic", "symphonic", "dancing", "lyrical", "harmonic",
      "orchestral", "noisy", "dissonant", "rhythmic", "hissing", "singing", "crooning", "shouting", "screaming", "wailing", "crying", "howling",
      "yelling", "hollering", "caterwauling", "bawling", "bellowing", "roaring", "squealing", "beeping", "knocking", "tapping", "rapping",
      "humming", "scatting", "whispered", "whispering", "rasping", "buzzing", "whirring", "whistling", "whistled"];
      return noisy;
    case "apocalyptic":
      var apocalyptic = ["nuclear", "apocalyptic", "desolate", "atomic", "zombie", "collapsed", "grim", "fallen", "collapsed", "cannibalistic",
      "radioactive", "toxic", "poisonous", "venomous", "disastrous", "grimy", "dirty", "undead", "bloodshot", "rusty", "glowing", "decaying",
      "rotten", "deadly", "plagued", "decimated", "rotting", "putrid", "decayed", "deserted", "acidic"];
      return apocalyptic;
    case "insulting":
      var insulting = ["stupid", "idiotic", "fat", "ugly", "hideous", "grotesque", "dull", "dumb", "lazy", "sluggish", "brainless", "slow",
      "gullible", "obtuse", "dense", "dim", "dazed", "ridiculous", "witless", "daft", "crazy", "vapid", "inane", "mundane", "hollow", "vacuous",
      "boring", "insipid", "tedious", "monotonous", "weird", "bizarre", "backward", "moronic", "ignorant", "scatterbrained", "forgetful", "careless",
      "lethargic", "insolent", "indolent", "loitering", "gross", "disgusting", "bland", "horrid", "unseemly", "revolting", "homely", "deformed",
      "disfigured", "offensive", "cowardly", "weak", "villainous", "fearful", "monstrous", "unattractive", "unpleasant", "nasty", "beastly", "snide",
      "horrible", "syncophantic", "unhelpful", "bootlicking"];
      return insulting;
    case "praise":
      var praise = ["beautiful", "intelligent", "smart", "genius", "ingenious", "gorgeous", "pretty", "witty", "angelic", "handsome", "graceful",
      "talented", "exquisite", "enchanting", "fascinating", "interesting", "divine", "alluring", "ravishing", "wonderful", "magnificient", "marvelous",
      "dazzling", "cute", "charming", "attractive", "nifty", "delightful", "superior", "amiable", "gentle", "heroic", "courageous", "valiant", "brave",
      "noble", "daring", "fearless", "gallant", "adventurous", "cool", "enthusiastic", "fierce", "awesome", "radical", "tubular", "fearsome",
      "majestic", "grand", "stunning"];
      return praise;
    case "scientific":
      var scientific = ["scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological",
      "innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar",
      "extinct", "galactic"]
      return scientific;
    default:
      var scientific = ["scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological",
      "innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar",
      "extinct", "galactic"]
      return scientific;
  };
};

// Pulls noun out of array using random number sent from generator
function getNoun(y) {
  switch(y) {
    case "animals":
      var animals = ["flamingo", "hedgehog", "owl", "elephant", "pussycat", "alligator", "dachsund", "poodle", "beagle", "crocodile", "kangaroo",
      "wallaby", "woodpecker", "eagle", "falcon", "canary", "parrot", "parakeet", "hamster", "gerbil", "squirrel", "rat", "dove", "toucan",
      "raccoon", "vulture", "peacock", "goldfish", "rook", "koala", "skunk", "goat", "rooster", "fox", "porcupine", "llama", "grasshopper",
      "gorilla", "monkey", "seahorse", "wombat", "wolf", "giraffe", "badger", "lion", "mouse", "beetle", "cricket", "nightingale",
      "hawk", "trout", "squid", "octopus", "sloth", "snail", "locust", "baboon", "lemur", "meerkat", "oyster", "frog", "toad", "jellyfish",
      "butterfly", "caterpillar", "tiger", "hyena", "zebra", "snail", "pig", "weasel", "donkey", "penguin", "crane", "buzzard", "vulture",
      "rhino", "hippopotamus", "dolphin", "sparrow", "beaver", "moose", "minnow", "otter", "bat", "mongoose", "swan", "firefly", "platypus"];
      return animals;
    case "profession":
      var professions = ["doctor", "lawyer", "ninja", "writer", "samurai", "surgeon", "clerk", "artist", "actor", "engineer", "mechanic",
      "comedian", "fireman", "nurse", "RockStar", "musician", "carpenter", "plumber", "cashier", "electrician", "waiter", "president", "governor",
      "senator", "scientist", "programmer", "singer", "dancer", "director", "mayor", "merchant", "detective", "investigator", "navigator", "pilot",
      "priest", "cowboy", "stagehand", "soldier", "ambassador", "pirate", "miner", "police"];
      return professions;
    case "fantasy":
      var fantasy = ["centaur", "wizard", "gnome", "orc", "troll", "sword", "fairy", "pegasus", "halfling", "elf", "changeling", "ghost",
      "knight", "squire", "magician", "witch", "warlock", "unicorn", "dragon", "wyvern", "princess", "prince", "king", "queen", "jester",
      "tower", "castle", "kraken", "seamonster", "mermaid", "psychic", "seer", "oracle"];
      return fantasy;
    case "music":
      var music = ["violin", "flute", "bagpipe", "guitar", "symphony", "orchestra", "piano", "trombone", "tuba", "opera", "drums",
      "harpsichord", "harp", "harmonica", "accordion", "tenor", "soprano", "baritone", "cello", "viola", "piccolo", "ukelele", "woodwind", "saxophone",
      "bugle", "trumpet", "sousaphone", "cornet", "stradivarius", "marimbas", "bells", "timpani", "bongos", "clarinet", "recorder", "oboe", "conductor",
      "singer"];
      return music;
    case "horror":
      var horror = ["murderer", "chainsaw", "knife", "sword", "murder", "devil", "killer", "psycho", "ghost", "monster", "godzilla", "werewolf",
      "vampire", "demon", "graveyard", "zombie", "mummy", "curse", "death", "grave", "tomb", "beast", "nightmare", "frankenstein", "specter",
      "poltergeist", "wraith", "corpse", "scream", "massacre", "cannibal", "skull", "bones", "undertaker", "zombie", "creature", "mask", "psychopath",
      "fiend", "satanist", "moon", "fullMoon"];
      return horror;
    case "gross":
      var gross = ["slime", "bug", "roach", "fluid", "pus", "booger", "spit", "boil", "blister", "orifice", "secretion", "mucus", "phlegm",
      "centipede", "beetle", "fart", "snot", "crevice", "flatulence", "juice", "mold", "mildew", "germs", "discharge", "toilet", "udder", "odor", "substance",
      "fluid", "moisture", "garbage", "trash", "bug"];
      return gross;
    case "everyday":
      var everyday = ["mirror", "knife", "fork", "spork", "spoon", "tupperware", "minivan", "suburb", "lamp", "desk", "stereo", "television", "TV",
      "book", "car", "truck", "soda", "door", "video", "game", "computer", "calender", "tree", "plant", "flower", "chimney", "attic", "kitchen",
      "garden", "school", "wallet", "bottle"];
      return everyday;
    case "jewelry":
      var jewelry = ["earrings", "ring", "necklace", "pendant", "choker", "brooch", "bracelet", "cameo", "charm", "bauble", "trinket", "jewelry",
      "anklet", "bangle", "locket", "finery", "crown", "tiara", "blingBling", "chain", "rosary", "jewel", "gemstone", "beads", "armband", "pin",
      "costume", "ornament", "treasure"];
      return jewelry;
    case "places":
      var places = ["swamp", "graveyard", "cemetery", "park", "building", "house", "river", "ocean", "sea", "field", "forest", "woods", "neighborhood",
      "city", "town", "suburb", "country", "meadow", "cliffs", "lake", "stream", "creek", "school", "college", "university", "library", "bakery",
      "shop", "store", "theater", "garden", "canyon", "highway", "restaurant", "cafe", "diner", "street", "road", "freeway", "alley"];
      return places;
    case "scifi":
      var scifi = ["robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy",
      "computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars",
      "quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus",
      "universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"];
      return scifi;
    default:
      var scifi = ["robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy",
      "computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars",
      "quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus",
      "universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"];
      return scifi;
  };
};

var adjectives = ["dark", "color", "whimsical", "shiny", "noise", "apocalyptic", "insulting", "praise", "scientific"];  // types of adjectives for pizza titles
var nouns = ["animals", "everyday", "fantasy", "gross", "horror", "jewelry", "places", "scifi"];                        // types of nouns for pizza titles

// Generates random numbers for getAdj and getNoun functions and returns a new pizza name
function generator(adj, noun) {
  var adjectives = getAdj(adj);
  var nouns = getNoun(noun);
  var randomAdjective = parseInt(Math.random() * adjectives.length);
  var randomNoun = parseInt(Math.random() * nouns.length);
  var name = "The " + adjectives[randomAdjective].capitalize() + " " + nouns[randomNoun].capitalize();
  return name;
};

// Chooses random adjective and random noun
function randomName() {
  var randomNumberAdj = parseInt(Math.random() * adjectives.length);
  var randomNumberNoun = parseInt(Math.random() * nouns.length);
  return generator(adjectives[randomNumberAdj], nouns[randomNumberNoun]);
};

// These functions return a string of a random ingredient from each respective category of ingredients.
var selectRandomMeat = function() {
  var randomMeat = pizzaIngredients.meats[Math.floor((Math.random() * pizzaIngredients.meats.length))];
  return randomMeat;
}

var selectRandomNonMeat = function() {
  var randomNonMeat = pizzaIngredients.nonMeats[Math.floor((Math.random() * pizzaIngredients.nonMeats.length))];
  return randomNonMeat;
}

var selectRandomCheese = function() {
  var randomCheese = pizzaIngredients.cheeses[Math.floor((Math.random() * pizzaIngredients.cheeses.length))];
  return randomCheese;
}

var selectRandomSauce = function() {
  var randomSauce = pizzaIngredients.sauces[Math.floor((Math.random() * pizzaIngredients.sauces.length))];
  return randomSauce;
}

var selectRandomCrust = function() {
  var randomCrust = pizzaIngredients.crusts[Math.floor((Math.random() * pizzaIngredients.crusts.length))];
  return randomCrust;
}

var ingredientItemizer = function(string) {
  return "<li>" + string + "</li>";
}

// Returns a string with random pizza ingredients nested inside <li> tags
var makeRandomPizza = function() {
  var pizza = "";

  var numberOfMeats = Math.floor((Math.random() * 4));
  var numberOfNonMeats = Math.floor((Math.random() * 3));
  var numberOfCheeses = Math.floor((Math.random() * 2));

  for (var i = 0; i < numberOfMeats; i++) {
    pizza = pizza + ingredientItemizer(selectRandomMeat());
  }

  for (var i = 0; i < numberOfNonMeats; i++) {
    pizza = pizza + ingredientItemizer(selectRandomNonMeat());
  }

  for (var i = 0; i < numberOfCheeses; i++) {
    pizza = pizza + ingredientItemizer(selectRandomCheese());
  }

  pizza = pizza + ingredientItemizer(selectRandomSauce());
  pizza = pizza + ingredientItemizer(selectRandomCrust());

  return pizza;
}

// returns a DOM element for each pizza
var pizzaElementGenerator = function(i) {
  var pizzaContainer,             // contains pizza title, image and list of ingredients
      pizzaImageContainer,        // contains the pizza image
      pizzaImage,                 // the pizza image itself
      pizzaDescriptionContainer,  // contains the pizza title and list of ingredients
      pizzaName,                  // the pizza name itself
      ul;                         // the list of ingredients

  pizzaContainer  = document.createElement("div");
  pizzaImageContainer = document.createElement("div");
  pizzaImage = document.createElement("img");
  pizzaDescriptionContainer = document.createElement("div");

  pizzaContainer.classList.add("randomPizzaContainer");
  pizzaContainer.style.width = "33.33%";
  pizzaContainer.style.height = "325px";
  pizzaContainer.id = "pizza" + i;                // gives each pizza element a unique id
  pizzaImageContainer.classList.add("col-md-6");

  pizzaImage.src = "data:image/png;base64,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";
  pizzaImage.classList.add("img-responsive");
  pizzaImageContainer.appendChild(pizzaImage);
  pizzaContainer.appendChild(pizzaImageContainer);


  pizzaDescriptionContainer.classList.add("col-md-6");

  pizzaName = document.createElement("h4");
  pizzaName.innerHTML = randomName();
  pizzaDescriptionContainer.appendChild(pizzaName);

  ul = document.createElement("ul");
  ul.innerHTML = makeRandomPizza();
  pizzaDescriptionContainer.appendChild(ul);
  pizzaContainer.appendChild(pizzaDescriptionContainer);

  return pizzaContainer;
}

// resizePizzas(size) is called when the slider in the "Our Pizzas" section of the website moves.
var resizePizzas = function(size) {
  window.performance.mark("mark_start_resize");   // User Timing API function

  // Changes the value for the size of the pizza above the slider
  function changeSliderLabel(size) {
    switch(size) {
      case "1":
        document.querySelector("#pizzaSize").innerHTML = "Small";
        return;
      case "2":
        document.querySelector("#pizzaSize").innerHTML = "Medium";
        return;
      case "3":
        document.querySelector("#pizzaSize").innerHTML = "Large";
        return;
      default:
        console.log("bug in changeSliderLabel");
    }
  }

  changeSliderLabel(size);

  // Returns the size difference to change a pizza element from one size to another. Called by changePizzaSlices(size).
  function determineDx (elem, size) {
    var oldwidth = elem.offsetWidth;
    var windowwidth = document.querySelector("#randomPizzas").offsetWidth;
    var oldsize = oldwidth / windowwidth;

    // TODO: change to 3 sizes? no more xl?
    // Changes the slider value to a percent width
    function sizeSwitcher (size) {
      switch(size) {
        case "1":
          return 0.25;
        case "2":
          return 0.3333;
        case "3":
          return 0.5;
        default:
          console.log("bug in sizeSwitcher");
      }
    }

    var newsize = sizeSwitcher(size);
    var dx = (newsize - oldsize) * windowwidth;

    return dx;
  }

  // Iterates through pizza elements on the page and changes their widths
  function changePizzaSizes(size) {
    for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
      var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
      var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
      document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
    }
  }

  changePizzaSizes(size);

  // User Timing API is awesome
  window.performance.mark("mark_end_resize");
  window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
  var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
  console.log("Time to resize pizzas: " + timeToResize[0].duration + "ms");
}

window.performance.mark("mark_start_generating"); // collect timing data

// This for-loop actually creates and appends all of the pizzas when the page loads
//
// Not anymore it doesn't!
// Append all that stuff to a fragment instead and append that when finished!
// No constant DomHammering required in the loop
var pizzaDivFragment = document.createDocumentFragment();
for (var i = 2; i < 100; i++) {
  pizzaDivFragment.appendChild(pizzaElementGenerator(i));
}
document.getElementById("randomPizzas").appendChild(pizzaDivFragment);

// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration + "ms");

// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) {   // times is the array of User Timing measurements from updatePositions()
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average time to generate last 10 frames: " + sum / 10 + "ms");
}

// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

// Moves the sliding background pizzas based on scroll position
function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");

  //store our scroll value outside of the loop
  //we want the CURRENT/LAST value and not a recalculation
  //everytime a scroll literally happens
  // this is what's been causing the massive Script overhead
  //
  // I guess we could do some 'debouncing' or 'requestanimationframe' magic
  // if we would want to squeeze out a bit more performance, but this should do it
  var scroll = document.body.scrollTop;

  var items = document.querySelectorAll('.mover');
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin(( scroll / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }

  // User Timing API to the rescue again. Seriously, it's worth learning.
  // Super easy to create custom metrics.
  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
}

// runs updatePositions on scroll
window.addEventListener('scroll', updatePositions);

// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function() {
  var cols = 8;
  var s = 256;
  //Document Fragments are cool shit man!
  //http://ejohn.org/blog/dom-documentfragments/
  var movingPizzasFragment = document.createDocumentFragment();
  for (var i = 0; i < 200; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "data:image/png;base64,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";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    movingPizzasFragment.appendChild(elem);
  }
  document.querySelector("#movingPizzas1").appendChild(movingPizzasFragment);
  updatePositions();
});
