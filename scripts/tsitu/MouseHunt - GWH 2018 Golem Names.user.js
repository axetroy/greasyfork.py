// ==UserScript==
// @name         MouseHunt - GWH 2018 Golem Names
// @author       Tran Situ (tsitu)
// @namespace    https://greasyfork.org/en/users/232363-tsitu
// @version      1.2
// @description  Adds fun and quirky names to your Snow Golems
// @match        http://www.mousehuntgame.com/*
// @match        https://www.mousehuntgame.com/*
// ==/UserScript==

(function() {
  const adj = [
    "N/A",
    "Accountant",
    "Admired",
    "Aggressive",
    "Agreeable",
    "Amiable",
    "Angelic",
    "Aroused",
    "Athletic",
    "Awesome",
    "Balding",
    "Basic",
    "Beautiful",
    "Boastful",
    "Brazen",
    "Buff",
    "Carefree",
    "Casual",
    "Cheeky",
    "Chivalrous",
    "Clumsy",
    "Confident",
    "Crazy",
    "Dashing",
    "Dazzling",
    "Detective",
    "Downbeat",
    "Emotional",
    "Envious",
    "Excited",
    "Extraordinary",
    "Faithful",
    "Famous",
    "Fancy",
    "Fierce",
    "Filthy",
    "Flabby",
    "Flexible",
    "Foolish",
    "Frugal",
    "Funny",
    "Gentle",
    "Glorious",
    "Greedy",
    "Hacker",
    "Handsome",
    "Healthy",
    "Homesick",
    "Horrible",
    "Humble",
    "Impulsive",
    "Insane",
    "Interesting",
    "Intuitive",
    "Irritable",
    "Jealous",
    "Jolly",
    "Joyful",
    "Laughing",
    "Lazy",
    "Loud",
    "Lovely",
    "Loyal",
    "Lusty",
    "Luxurious",
    "Maniac",
    "Master",
    "Mighty",
    "Misguided",
    "Morbid",
    "Muscular",
    "Mysterious",
    "Mystic",
    "Natural",
    "One-Eyed",
    "Outlaw",
    "Patriot",
    "Pensive",
    "Perceptive",
    "Perky",
    "Philosophical",
    "Plumber",
    "Plump",
    "Presidential",
    "Primal",
    "Professional",
    "Raunchy",
    "Regal",
    "Reliable",
    "Remarkable",
    "Respectful",
    "Ridiculous",
    "Risque",
    "Skeptical",
    "Scheming",
    "Scoundrel",
    "Scruffy",
    "Secretary",
    "Sentient",
    "Shameless",
    "Shiny",
    "Simple",
    "Singing",
    "Skinny",
    "Sleepy",
    "Slender",
    "Smelly",
    "Speedy",
    "Spineless",
    "Stinky",
    "Stubborn",
    "Suave",
    "Succesful",
    "Sweaty",
    "Thick",
    "Timid",
    "Tough",
    "Traditional",
    "Traveler",
    "Trusty",
    "Uncomfortable",
    "Unpleasant",
    "Valiant",
    "Veritable",
    "Voluptuous",
    "Vulgar",
    "Warlord",
    "Weak",
    "Whirlwind",
    "Wild",
    "Wistful",
    "Witty",
    "Worldly"
  ];

  const name = [
    "N/A",
    "Aaron",
    "Abigail",
    "Adam",
    "Alan",
    "Alex",
    "Alexa",
    "Allison",
    "Amanda",
    "Amber",
    "Amelia",
    "Amy",
    "Anna",
    "Andy",
    "Ashley",
    "Ben",
    "Brandon",
    "Brian",
    "Brittany",
    "Brooke",
    "Caitlin",
    "Caleb",
    "Carlos",
    "Caroline",
    "Cassandra",
    "Catherine",
    "Charles",
    "Charlotte",
    "Chloe",
    "Chris",
    "Claire",
    "Cody",
    "Daisy",
    "Daniel",
    "David",
    "Derek",
    "Diana",
    "Diego",
    "Dylan",
    "Edgar",
    "Edward",
    "Elizabeth",
    "Emily",
    "Emma",
    "Eric",
    "Evan",
    "Evelyn",
    "George",
    "Greg",
    "Hannah",
    "Henry",
    "Ian",
    "Isaac",
    "Isabel",
    "Jack",
    "Jacob",
    "James",
    "Jared",
    "Jasmine",
    "Jason",
    "Jeffrey",
    "Jenny",
    "Jesse",
    "Jessica",
    "Jesus",
    "Jill",
    "John",
    "Jordan",
    "Joe",
    "Julia",
    "Justin",
    "Karen",
    "Kate",
    "Kelly",
    "Kevin",
    "Kim",
    "Kyle",
    "Laura",
    "Lauren",
    "Leah",
    "Leslie",
    "Levi",
    "Lily",
    "Lindsey",
    "Logan",
    "Lucas",
    "Lucy",
    "Madeline",
    "Marcus",
    "Margaret",
    "Maria",
    "Mark",
    "Martin",
    "Mary",
    "Megan",
    "Mia",
    "Michael",
    "Michelle",
    "Molly",
    "Natalie",
    "Nathan",
    "Nick",
    "Nicole",
    "Oliver",
    "Olivia",
    "Patrick",
    "Paul",
    "Peter",
    "Rachel",
    "Raymond",
    "Rebecca",
    "Richard",
    "Robert",
    "Sabrina",
    "Samantha",
    "Sarah",
    "Sean",
    "Shelby",
    "Sophie",
    "Spencer",
    "Stephanie",
    "Steven",
    "Sydney",
    "Thomas",
    "Tiffany",
    "Tim",
    "Travis",
    "Tyler",
    "Veronica",
    "Victoria",
    "William"
  ];

  // console.log(`adj: ${adj.length - 1}`); // 132 total (old strat missed 74)
  // console.log(`name: ${name.length - 1}`); // 130 total (old strat missed 64)

  const golemContainer = document.getElementsByClassName(
    "winterHunt2017HUD-golemContainer"
  )[0];
  if (golemContainer) {
    golemContainer.addEventListener("click", function() {
      const golemClass = document.getElementsByClassName(
        "winterHunt2017HUD-popup-golem"
      );
      if (golemClass.length > 0) {
        for (let i = 0; i < 3; i++) {
          if (golemClass[i].classList.contains("visible")) {
            golemClass[i]
              .querySelector(
                ".winterHunt2017HUD-popup-golemDoll-scrambleButton"
              )
              .addEventListener("click", function() {
                generateText(golemClass[i]);
              });

            const partButtons = golemClass[i].querySelectorAll(
              ".winterHunt2017HUD-popup-golemDoll-control"
            );
            for (let partButton of partButtons) {
              partButton.addEventListener("click", function() {
                generateText(golemClass[i]);
              });
            }

            generateText(golemClass[i]);

            function generateText(golemClass) {
              // Reset if exists
              const existingSpan = document.getElementById("golem-name-span");
              if (existingSpan) existingSpan.remove();

              const golemArr = golemClass.querySelector(
                ".winterHunt2017HUD-customGolem"
              ).children;

              const headID = parseInt(golemArr[0].className.split("piece_")[1]);
              const armsID = parseInt(golemArr[1].className.split("piece_")[1]);
              const legsID = parseInt(golemArr[2].className.split("piece_")[1]);
              const torsoID = parseInt(
                golemArr[3].className.split("piece_")[1]
              );

              // Normalize array indices
              let adjIndex = (armsID - 1) * 12 + legsID;
              if (adjIndex < 0) adjIndex = 0;
              let nameIndex = (torsoID - 1) * 13 + headID;
              if (nameIndex < 0) nameIndex = 0;
              const adjName = `${adj[adjIndex]} ${name[nameIndex]}`;

              // Derive font size
              let fontSize = 32;
              while (getTextWidth(adjName, `bold ${fontSize}px arial`) > 230) {
                fontSize--;
              }
              fontSize -= 3; // Prevent text overflow

              const textSpan = document.createElement("span");
              textSpan.id = "golem-name-span";
              textSpan.textContent = adjName;
              textSpan.setAttribute(
                "style",
                `z-index: 100; position: absolute; color: white; font-size: ${fontSize}px; font-weight: bold; left: 5px; top: 10px; text-align: center; text-shadow: 1px 1px 2px black; width: 240px;`
              );
              golemClass.appendChild(textSpan);
            }
            break;
          }
        }
      }
    });
  }

  /**
   * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
   *
   * @param {String} text The text to be rendered.
   * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
   *
   * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
   */
  function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas =
      getTextWidth.canvas ||
      (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
  }
})();
