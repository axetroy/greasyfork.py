// ==UserScript==
// @name         PVT V.3+
// @version      0.1
// @description  Tools
// @author       Created by Laravel
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @match        *.pokemon-vortex.com/*
// @grant        none
// @namespace https://greasyfork.org/users/165788
// ==/UserScript==
 
/*********Information*************/
// To use this script you need to install TamperMonkey/GreaseMonkey ( EXTENSIONS ) on your web browser (e.g. Chrome/Firefox)
// Select add script and paste all of this script and enable it
// For this one i already set up a Legendary Catcher only so you can just go to any map and wait until a notification pops up saying 'Found Something' and you just got yourself a legendary. Have fun !
/**********LOGIN SETTING**********/
var autoLogin = false; //auto-login when logged out
 
var username = "";
var password = "";
 
/**********ON/OFF SETTINGS**********/
var doBattle        =  false; //enable battles same battle over and over again
var forceBattle     =  false; //enable being sent to the battle url when at dashboard
var findPokemon     = true; //enable finding pokemon alerts
var findLevels      = false; //enable find specific pokemon levels
var findLevelsAndUp =  true; //enable finding pokemon levels and up
var autoWalkFind    =  true; //enable walking+finding without you doing work
 
/**********FINDING SETTINGS**********/
var pokemonToFind = [
    // Custom
    'Mystic Sableye',
    'Mystic Spiritomb',
    'Shiny Bulbasaur',
    'Shiny Charmander',
    'Shiny Squirtle',
    'Shiny Caterpie',
    'Shiny Weedle',
    'Shiny Pidgey',
    'Shiny Rattata',
    'Shiny Ekans',
    'Shiny Spearow',
    'Shiny Pichu',
    'Shiny Sandshrew',
    'Shiny Nidoran (F)',
    'Shiny Nidoran (M)',
    'Shiny Vulpix',
    'Shiny Cleffa',
    'Shiny Igglybuff',
    'Shiny Zubat',
    'Shiny Oddish',
    'Shiny Paras',
    'Shiny Venonat',
    'Shiny Diglett',
    'Shiny Meowth',
    'Shiny Psyduck',
    'Shiny Mankey',
    'Shiny Growlithe',
    'Shiny Poliwag',
    'Shiny Abra',
    'Shiny Machop',
    'Shiny Bellsprout',
    'Shiny Tentacool',
    'Shiny Geodude',
    'Shiny Ponyta',
    'Shiny Slowpoke',
    'Shiny Magnemite',
    'Shiny Duduo',
    'Shiny Seel',
    'Shiny Grimer',
    'Shiny Shellder',
    'Shiny Gastly',
    'Shiny Onix',
    'Shiny Drowzee',
    'Shiny Krabby',
    'Shiny Voltorb',
    'Shiny Exeggcute',
    'Shiny Cubone',
    'Shiny Tyrogue',
    'Shiny Lickitung',
    'Shiny Koffing',
    'Shiny Rhyhorn',
    'Shiny Happiny',
    'Shiny Tangela',
    'Shiny Horsea',
    'Shiny Goldeen',
    'Shiny Staryu',
    'Shiny Mime Jr.',
    'Shiny Scyther',
    'Shiny Smoochum',
    'Shiny Elekid',
    'Shiny Magby',
    'Shiny Magikarp',
    'Shiny Eevee',
    'Shiny Porygon',
    'Shiny Omante',
    'Shiny Kabuto',
    'Shiny Munchlax',
    'Shiny Dratini',
    'Shiny Chikorita',
    'Shiny Cyndaquil',
    'Shiny Totodile',
    'Shiny Sentret',
    'Shiny Hoothoot',
    'Shiny Ledyba',
    'Shiny Chinchou',
    'Shiny Togepi',
    'Shiny Natu',
    'Shiny Mareep',
    'Shiny Azurill',
    'Shiny Bonsly',
    'Shiny Hoppip',
    'Shiny Aipom',
    'Shiny Sunkern',
    'Shiny Yanma',
    'Shiny Wooper',
    'Shiny Murkrow',
    'Shiny Misdreavus',
    'Shiny Pineco',
    'Shiny Gligar',
    'Shiny Snubull',
    'Shiny Sneasel',
    'Shiny Teddiursa',
    'Shiny Slugma',
    'Shiny Swinub',
    'Shiny Remoraid',
    'Shiny Mantyke',
    'Shiny Houndour',
    'Shiny Phanpy',
    'Shiny Larvitar',
    'Shiny Treecko',
    'Shiny Torchic',
    'Shiny Mudkip',
    'Shiny Poochyena',
    'Shiny Zigzagoon',
    'Shiny Wurmple',
    'Shiny Lotad',
    'Shiny Seedot',
    'Shiny Taillow',
    'Shiny Wingull',
    'Shiny Ralts',
    'Shiny Surskit',
    'Shiny Shroomsih',
    'Shiny Slakoth',
    'Shiny Nincada',
    'Shiny Whismur',
    'Shiny Makuhita',
    'Shiny Nosepass',
    'Shiny Skitty',
    'Shiny Aron',
    'Shiny Meditite',
    'Shiny Electrike',
    'Shiny Budew',
    'Shiny Gulpin',
    'Shiny Carvanha',
    'Shiny Wailmer',
    'Shiny Numel',
    'Shiny Spoink',
    'Shiny Trapinch',
    'Shiny Cacnea',
    'Shiny Swablu',
    'Shiny Barboach',
    'Shiny Corphish',
    'Shiny Baltoy',
    'Shiny Lileep',
    'Shiny Anorith',
    'Shiny Febbas',
    'Shiny Shuppet',
    'Shiny Duskull',
    'Shiny Chingling',
    'Shiny Snorunt',
    'Shiny Spheal',
    'Shiny Clamperl',
    'Shiny Bagon',
    'Shiny Beldum',
    'Shiny Turtwig',
    'Shiny Chimchar',
    'Shiny Piplup',
    'Shiny Starly',
    'Shiny Bidoof',
    'Shiny Kricketot',
    'Shiny Shinx',
    'Shiny Cranidos',
    'Shiny Shieldon',
    'Shiny Burmy (Plant)',
    'Shiny Burmy (Steel)',
    'Shiny Burmy (Sand)',
    'Shiny Combee',
    'Shiny Buizel',
    'Shiny Cherubi',
    'Shiny Shellos (East)',
    'Shiny Shellos (West)',
    'Shiny Drifloon',
    'Shiny Buneary',
    'Shiny Glameow',
    'Shiny Stunky',
    'Shiny Bronzor',
    'Shiny Gible',
    'Shiny Riolu',
    'Shiny Hippopotas',
    'Shiny Skorupi',
    'Shiny Croagunk',
    'Shiny Finneon',
    'Shiny Snover',
    'Shiny Snivy',
    'Shiny Tepig',
    'Shiny Oshawott',
    'Shiny Lillipup',
    'Shiny Purrloin',
    'Shiny Pansage',
    'Shiny Pansear',
    'Shiny Panpour',
    'Shiny Munna',
    'Shiny Pidove',
    'Shiny Blitzle',
    'Shiny Roggenrola',
    'Shiny Wobbat',
    'Shiny Drilbur',
    'Shiny Timburr',
    'Shiny Tympole',
    'Shiny Sewaddle',
    'Shiny Venipede',
    'Shiny Cottonee',
    'Shiny Petilil',
    'Shiny Sandile',
    'Shiny Darumaka',
    'Shiny Dwebble',
    'Shiny Scraggy',
    'Shiny Yamask',
    'Shiny Tirtouga',
    'Shiny Archen',
    'Shiny Trubbish',
    'Shiny Zorua',
    'Shiny Minccino',
    'Shiny Golitha',
    'Shiny Solosis',
    'Shiny Ducklett',
    'Shiny Vanillite',
    'Shiny Deerling (Autumn)',
    'Shiny Deerling (Spring)',
    'Shiny Derrling (Summer)',
    'Shiny Deerling (Winter)',
    'Shiny Karrablast',
    'Shiny Foongus',
    'Shiny Frillish',
    'Shiny Joltik',
    'Shiny Ferroseed',
    'Shiny Klink',
    'Shiny Tynamo',
    'Shiny Elgyem',
    'Shiny Litwick',
    'Shiny Axew',
    'Shiny Cubchoo',
    'Shiny Shelmet',
    'Shiny Mienfoo',
    'Shiny Golett',
    'Shiny Pawniard',
    'Shiny Rufflet',
    'Shiny Vullaby',
    'Shiny Larvesta',
    'Shiny Chespin',
    'Shiny Fennekin',
    'Shiny Froakie',
    'Shiny Bunnelby',
    'Shiny Fletchling',
    'Shiny Scatterbug',
    'Shiny Litleo',
    'Shiny Flabebe (Blue)',
    'Shiny Flabebe (Orange)',
    'Shiny Flabebe (Red)',
    'Shiny Flabebe (White)',
    'Shiny Flabebe (Yellow)',
    'Shiny Skiddo',
    'Shiny Pancham',
    'Shiny Espurr',
    'Shiny Honedge',
    'Shiny Spiritzee',
    'Shiny Swirlix',
    'Shiny Inkay',
    'Shiny Binacle',
    'Shiny Skrelp',
    'Shiny Clauncher',
    'Shiny Helioptile',
    'Shiny Tyrunt',
    'Shiny Amuara',
    'Shiny Goomy',
    'Shiny Phantump',
    'Shiny Pumpkaboo (Average)',
    'Shiny Pumpkaboo (Large)',
    'Shiny Pumpkaboo (Small)',
    'Shiny Bergmite',
    'Shiny Noibat',
    'Shiny Farfetchd',
    'Shiny Kangashkhan',
    'Shiny Pinsir',
    'Shiny Tauros',
    'Shiny Lapras',
    'Shiny Ditto',
    'Shiny Areodactyl',
    'Shiny Girafarig',
    'Shiny Dunsparce',
    'Shiny Qwilfish',
    'Shiny Shuckle',
    'Shiny Heracross',
    'Shiny Corsola',
    'Shiny Delibird',
    'Shiny Skarmory',
    'Shiny Stantler',
    'Shiny Smeargle',
    'Shiny Miltank',
    'Shiny Sableye',
    'Shiny Mawile',
    'Shiny Plusle',
    'Shiny Minun',
    'Shiny Volbeat',
    'Shiny Illumise',
    'Shiny Torkoal',
    'Shiny Spinda',
    'Shiny Zangoose',
    'Shiny Seviper',
    'Shiny Lunatone',
    'Shiny Solrock',
    'Shiny Castform',
    'Shiny Kecleon',
    'Shiny Tropius',
    'Shiny Absol',
    'Shiny Relicanth',
    'Shiny Luvdisc',
    'Shiny Pachirisu',
    'Shiny Chatot',
    'Shiny Spiritomb',
    'Shiny Carnivine',
    'Shiny Audino',
    'Shiny Throh',
    'Shiny Sawk',
    'Shiny Basculin (Blue Stripe)',
    'Shiny Basculin (Red Stripe)',
    'Shiny Maractus',
    'Shiny Sigilyph',
    'Shiny Emolga',
    'Shiny Alomomola',
    'Shiny Cryogonal',
    'Shiny Stunfisk',
    'Shiny Druddigon',
    'Shiny Bouffalant',
    'Shiny Heatmor',
    'Shiny Durant',
    'Shiny Furfrou',
    'Shiny Hawlucha',
    'Shiny Dedenne',
    'Shiny Carbink',
    'Shiny Klefki',
    
    
    
    
    //Gen 6 Legends
     'Xerneas','Shiny Xerneas','Dark Xerneas','Shadow Xernias','Metallic Xerneas','Mystic Xerneas',
     'Yveltal','Shiny Yveltal','Dark Yveltal','Shadow Yveltal','Metallic Yveltal','Mystic Yveltal',
     'Zygarde',
 
    // Grass
    'Shaymin (Sky)',
    'Celebi',
    'Latios',
    'Latias',
    'Rayquaza',
    'Shaymin',
    'Mew',
    'Cresselia',
    'Azelf',
    'Uxie',
    'Mesprit',
    'Virizion',
    'Genesect',
    'Mystic Shaymin (Sky)',
    'Mystic Celebi',
    'Mystic Latios',
    'Mystic Latias',
    'Mystic Rayquaza',
    'Mystic Shaymin',
    'Mystic Mew',
    'Mystic Cresselia',
    'Mystic Azelf',
    'Mystic Uxie',
    'Mystic Mesprit',
    'Mystic Virizion',
    'Mystic Genesect',
    'Shiny Shaymin (Sky)',
    'Shiny Celebi',
    'Shiny Latios',
    'Shiny Latias',
    'Shiny Rayquaza',
    'Shiny Shaymin',
    'Shiny Mew',
    'Shiny Cresselia',
    'Shiny Azelf',
    'Shiny Uxie',
    'Shiny Mesprit',
    'Shiny Virizion',
    'Shiny Genesect',
    'Dark Shaymin (Sky)',
    'Dark Celebi',
    'Dark Latios',
    'Dark Latias',
    'Dark Rayquaza',
    'Dark Shaymin',
    'Dark Mew',
    'Dark Cresselia',
    'Dark Azelf',
    'Dark Uxie',
    'Dark Mesprit',
    'Dark Virizion',
    'Dark Genesect',
    'Ancient Shaymin (Sky)',
    'Ancient Celebi',
    'Ancient Latios',
    'Ancient Latias',
    'Ancient Rayquaza',
    'Ancient Shaymin',
    'Ancient Mew',
    'Ancient Cresselia',
    'Ancient Azelf',
    'Ancient Uxie',
    'Ancient Mesprit',
    'Ancient Virizion',
    'Ancient Genesect',
 
 
 
    // Grass (water)
    'Manaphy',
    'Phione',
    'Suicune',
    'Keldeo',
 
    // Ice
    'Articuno',
    'Suicune',
    'Lugia',
    'Regice',
    'Kyurem',
    'Mystic Articuno',
    'Mystic Suicune',
    'Mystic Lugia',
    'Mystic Regice',
    'Mystic Kyurem',
    'Shiny Articuno',
    'Shiny Suicune',
    'Shiny Lugia',
    'Shiny Regice',
    'Shiny Kyurem',
    'Dark Articuno',
    'Dark Suicune',
    'Dark Lugia',
    'Dark Regice',
    'Dark Kyurem',
    'Ancient Articuno',
    'Ancient Suicune',
    'Ancient Lugia',
    'Ancient Regice',
    'Ancient Kyurem',
 
 
 
 
 
 
    // Cave (land)
    'Groudon',
    'Arceus',
    'Regigigas',
    'Palkia',
    'Dialga',
    'Deoxys',
    'Jirachi',
    'Registeel',
    'Regirock',
    'Mewtwo',
    'Cobalion',
    'Terrakion',
    'Virizion',
    'Reshiram',
    'Zekrom',
    'Kyurem',
    'Genesect',
    'Tornadus',
    'Landorus',
    'Mystic Groudon',
    'Mystic Arceus',
    'Mystic Regigigas',
    'Mystic Palkia',
    'Mystic Dialga',
    'Mystic Deoxys',
    'Mystic Jirachi',
    'Mystic Registeel',
    'Mystic Regirock',
    'Mystic Mewtwo',
    'Mystic Cobalion',
    'Mystic Terrakion',
    'Mystic Virizion',
    'Mystic Reshiram',
    'Mystic Zekrom',
    'Mystic Kyurem',
    'Mystic Genesect',
    'Mystic Tornadus',
    'Mystic Landorus',
    'Shiny Groudon',
    'Shiny Arceus',
    'Shiny Regigigas',
    'Shiny Palkia',
    'Shiny Dialga',
    'Shiny Deoxys',
    'Shiny Jirachi',
    'Shiny Registeel',
    'Shiny Regirock',
    'Shiny Mewtwo',
    'Shiny Cobalion',
    'Shiny Terrakion',
    'Shiny Virizion',
    'Shiny Reshiram',
    'Shiny Zekrom',
    'Shiny Kyurem',
    'Shiny Genesect',
    'Shiny Tornadus',
    'Shiny Landorus',
    'Dark Groudon',
    'Dark Arceus',
    'Dark Regigigas',
    'Dark Palkia',
    'Dark Dialga',
    'Dark Deoxys',
    'Dark Jirachi',
    'Dark Registeel',
    'Dark Regirock',
    'Dark Mewtwo',
    'Dark Cobalion',
    'Dark Terrakion',
    'Dark Virizion',
    'Dark Reshiram',
    'Dark Zekrom',
    'Dark Kyurem',
    'Dark Genesect',
    'Dark Tornadus',
    'Dark Landorus',
 
 
    // Cave (water)
    'Kyogre',
    'Lugia',
    'Keldeo',
 
    // Ghost
    'Mew',
    'Giratina',
    'Rotom',
    'Mesprit',
    'Azelf',
    'Uxie',
    'Celebi',
    'Darkrown',
    'Darkrai',
    'Shiny Mew',
    'Shiny Giratina',
    'Shiny Rotom',
    'Shiny Mesprit',
    'Shiny Azelf',
    'Shiny Uxie',
    'Shiny Celebi',
    'Shiny Darkrown',
    'Shiny Darkrai',
    'Dark Mew',
    'Dark Giratina',
    'Dark Rotom',
    'Dark Mesprit',
    'Dark Azelf',
    'Dark Uxie',
    'Dark Celebi',
    'Dark Darkrown',
    'Dark Darkrai',
    'Mystic Mew',
    'Mystic Giratina',
    'Mystic Rotom',
    'Mystic Mesprit',
    'Mystic Azelf',
    'Mystic Uxie',
    'Mystic Celebi',
    'Mystic Darkrown',
    'Mystic Darkrai',
    'Ancient Mew',
    'Ancient Giratina',
    'Ancient Rotom',
    'Ancient Mesprit',
    'Ancient Azelf',
    'Ancient Uxie',
    'Ancient Celebi',
    'Ancient Darkrown',
    'Ancient Darkrai',
 
    // Electric
    'Zapdos',
    'Raikou',
    'Jirachi',
    'Darkrai',
    'Darkrown',
    'Thundurus',
    'Zekrom',
    'Genesect',
 
    // Fire
    'Heatran',
    'Shiny Heatran','Dark Heatran','Shadow Heatran','Metallic Heatran','Mystic Heatran',
    'Ho-oh','Shiny Ho-oh','Dark Ho-oh','Shadow Ho-oh','Metallic Ho-oh','Mystic Ho-oh',
    'Moltres','Shiny Moltres','Dark Moltres','Shadow Moltres','Metallic Moltres','Mystic Moltres',
    'Entei','Shiny Entei','Dark Entei','Shadow Entei','Metallic Entei','Mystic Entei',
    'Reshiram','Shiny Reshiram',
    'Victini','Shiny Victini','Dark Victini','Shadow Victini','Metallic Victini','Mystic Vitctini',
];
//the pokemon you want to be alerted of
//make sure you get the right spelling
//TIP: You can also use the above setting as
//a general keyword searcher in the pokemon you see
//e.g. "shiny", "dark"
 
var levelsToFind = ["9"]; //The specific levels you want to be alerted for
//keep this a string array
 
var levelsAndUpToFind = 50; //level and up to alert about pokemon
//dont make this a string or array
 
var scanFreq = 75; //time to wait between every time the script checks if you saw what you wanted (in milliseconds)
 
var isDoneLoadingFreq = 350; //time to wait between checking if looking for pokemon has finished loading (in milli)
//dont make this too low (keep it how it is, it works fine) unless you have very super speedy internet
//THE LOWER THIS IS THE HIGHER CHANCE YOU HAVE OF LOSING A LEGEND
 
/**********FIGHTING SETTINGS**********/
var battle = "/wildbattle.php";
//change this to your battle url, but make sure you remove everything up to the /battle.php?jglasd=dfjklgdfj
//Even though it does automatically :P
 
var firstPokemonPrefAtt = 0; // 0 = don't pick
var seconPokemonPrefAtt = 0; // 0 = don't pick
var thirdPokemonPrefAtt = 0; // 0 = don't pick
var fourtPokemonPrefAtt = 0; // 0 = don't pick
var fifthPokemonPrefAtt = 0; // 0 = don't pick
var sixthPokemonPrefAtt = 0; // 0 = don't pick
 
var firstPokemonName = ""; // These names just need to be unique
var seconPokemonName = ""; // Capitalization is ignored
var thirdPokemonName = ""; // if empty it will be skipped
var fourtPokemonName = ""; // if not found it will be skipped
var fifthPokemonName = ""; // Make sure you spell right :p
var sixthPokemonName = ""; //
var attackFreq = 500; //time to wait between every click while fighting (in milliseconds)
 
/**********IGNORE EVERYTHING PAST THIS**********/
var pokeNames = [firstPokemonName, seconPokemonName, thirdPokemonName, fourtPokemonName, fifthPokemonName, sixthPokemonName];
var pokeAtts  = [firstPokemonPrefAtt, seconPokemonPrefAtt, thirdPokemonPrefAtt, fourtPokemonPrefAtt, fifthPokemonPrefAtt, sixthPokemonPrefAtt];
var battleUrl    = ".pokemon-vortex.com/wildbattle.php";
var findUrl      = ".pokemon-vortex.com/map.php";
var loginUrl     = "www.pokemon-vortex.com/login.php";
var dashboardUrl = ".pokemon-vortex.com/dashboard.php";
var attTimes = 0;
var moveTimes = 0;
 
if(battle.indexOf(".com")>-1){
    battle = battle.split(".com")[1];
}
 
if (doBattle && window.location.href.indexOf(battleUrl) > -1) {
    function startBattle() {
        for(var d = 0; d < 6; d++)
            if(pokeAtts[d] !== 0 && $("h3:contains('Your')").text().toLowerCase().indexOf(pokeNames[d].toLowerCase()) > -1 && pokeNames[d] !== "")
                $("input#attack"+pokeAtts[d]).click();
 
        if($("input[value*='Continue']").length)
            $("input[value*='Continue']").submit();
        if($("input[value*='Attack']").length)
            $("input[value*='Attack']").submit();
        if($("a:contains('Rebattle Opponent')").length)
            $("a:contains('Rebattle Opponent')").click();
    }
    if (window.location.href.indexOf(battle) >-1) {
        setInterval(function () {
            if($("#loading").css("visibility") == "hidden"){
                startBattle();
                attTimes = 0;
            }else{
                attTimes++;
            }
            if(times >= 100)
                location.reload(true);
 
        }, attackFreq);
    } else {
        window.location.href = battle;
    }
}else if ((findPokemon || findLevels || findLevelsAndUp) && window.location.href.indexOf(findUrl) > -1) {
    var a;
    var b;
    var finderOn = true;
    var whichMove = 1;
 
    function fireKey(el, key) {
        //Set key to corresponding code. This one is set to the left arrow key.
        //37 = left, 38 = up, 39 = right, 40 = down;
        if (document.createEventObject) {
            var eventObj = document.createEventObject();
            eventObj.keyCode = key;
            el.fireEvent("onkeydown", eventObj);
        } else if (document.createEvent) {
            var eventObj = document.createEvent("Events");
            eventObj.initEvent("keydown", true, true);
            eventObj.which = key;
            el.body.dispatchEvent(eventObj);
        }
    }
 
 
    function found(thing){
        if($('#pkmnappear').first().html().toLowerCase().indexOf(thing.toLowerCase()) > -1){
            alert("Found Something");
            finderOn = true;
            clearInterval(a);
            if(autoWalkFind){
                clearInterval(b);
            }
            return true;
        }else{
            return false;
        }
    }
 
    function setFinder(){
        finderOn = true;
 
        if(autoWalkFind){
            b = setInterval(function(){
                var isLoading = $("#pkmnappear").text().indexOf("Please wait") > -1;
                if(!isLoading){
                    switch(whichMove){
                        case 1:
                            fireKey(document,37);
                            whichMove = 2;
                            break;
                        case 2:
                            fireKey(document,38);
                            whichMove = 3;
                            break;
                        case 3:
                            fireKey(document,39);
                            whichMove = 4;
                            break;
                        case 4:
                            fireKey(document,40);
                            whichMove = 1;
                            break;
                    }
                    moveTimes=0;
                }else{
                    moveTimes++;
                }
                if(moveTimes >= 100)
                    location.reload(true);
            },isDoneLoadingFreq);
        }
 
        a = setInterval(function () {
            if(findPokemon)
                for (var i = 0; i < pokemonToFind.length; i++)
                    found(pokemonToFind[i]);
 
            if(findLevels)
                for (var i = 0; i < levelsToFind.length; i++)
                    found("Level: " + levelsToFind[i] + " ");
 
            if(findLevelsAndUp)
                for(var l = levelsAndUpToFind; l<101;l++)
                    if (found("Level: " + l + " "))
                        break;
 
        }, scanFreq);
    }
 
    setFinder();
    $(document).keydown(function(event) {
        switch (event.keyCode) {
            case 37: case 38: case 39: case 40: case 87: case 65: case 83: case 68: if(!finderOn)setFinder();
                break;
        }
    });
 
}else if(autoLogin && window.location.href.indexOf(loginUrl) > -1){
    $("#myusername").val(username);
    $("#mypassword").val(password);
    $("input[value*='Log in']").click();
    $("input[value*='Log in']").submit();
}else if(forceBattle && window.location.href.indexOf(dashboardUrl) > -1){
    window.location.href = battle;
}
