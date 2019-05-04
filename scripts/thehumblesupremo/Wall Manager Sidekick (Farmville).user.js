// ==UserScript==
// @name           Wall Manager Sidekick (Farmville)
// @namespace      160764
// @description    Assists Wall Manager with Farmville posts
// @include        /(^http(s)?:\/\/(apps\.facebook\.com\/onthefarm\/|(.*)\.farmville\.com))/
// @include        http*://www.facebook.com/plugins/serverfbml.php
// @include        https://www.facebook.com/pages/FB-Wall-Manager/*
// @include        /https?:\/\/www\.facebook\.com\/dialog\/apprequests\?(.*)(app_id=102452128776)(.*)/
// @include        http*://www.facebook.com/lists/*
// @exclude        /(suggestionhub|neighbors)(\.php)?/
// @exclude        http*farmville.com/flash.php?*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        12
// @copyright      Charlie Ewing & Donald Mapes & Stephanie Mcilwain
// ==/UserScript==    

(function() { 
	var version = "12 for wm4";
	var thisApp = "102452128776";
	
	var defaultTO=null;

	function $(ID,root) {return (root||document).getElementById(ID);}

	//pass a single value to each child iframe
	//append that value to the location.hash of the located iframes
	function hashToIframes(v,doc) {
		doc=doc||document;
		var iframes = document.getElementsByTagName('iframe');
		var f=0,iframe = iframes[f];
		while (iframe){
			var doc = iframe.contentWindow.document	
			if (doc) {
				try{doc.location.hash+=v;}catch(e){}
				//hashToIframes(v,doc);
			}
			iframe=iframes[(f+=1)];
		}
	}
	
	String.prototype.startsWith = function(s) {return (this.match("^"+s)==s)};

	String.prototype.endsWith = function(s) {return (this.match(s+"$")==s)};

	String.prototype.find = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.contains = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.noSpaces = function(s) {return (this.replace(/\s+/g,''));};

	String.prototype.upperWords = function(s) {return (this+'').replace(/^(.)|\s(.)/g, function($1){return $1.toUpperCase();});};

	Array.prototype.swap = function (x,y) {var b = this[x];this[x] = this[y];this[y] = b;return this;};

	Array.prototype.pickRandom = function () {var i=Math.floor(Math.random()*this.length); return this[i];};

	Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};

	String.prototype.getUrlParam = function(s) {
		try{return this.split(s+"=")[1].split("&")[0];} catch(e){return "";}
	};

	//sorts an array in such a way as to prevent
	//finding pea before peanut, or pea before english pea, and then effectively swapping their order
	//now also finds ash in cashew and places ash after cashew
	Array.prototype.fixOrder = function(){
		var compareFunc = function(a,b){
			var s1=a.toLowerCase(), s2=b.toLowerCase();
			if (s1.contains(s2)) return -1; //when a contains b, a must come first
			else if (s2.contains(s1)) return 1 //when b contains a, b must come first
			else return 0; //no order change is required
		};
		this.sort(compareFunc);
		return this;
	};
	//reconstruct an array, turning it into definitions using a prefix
	Array.prototype.toDefinitions = function(prefix){
		var mapFunc = function(o,i,p){
			return prefix+o.noSpaces().toLowerCase();
		};
		return this.map(mapFunc);
	};


	var suggestedVote=window.location.href.getUrlParam("suggestedVote");
	if ((window.top==window.self) && (suggestedVote!=null)) {
		hashToIframes("&suggestedVote="+suggestedVote);
	};

	//prevent reading data from top page because it does not contain useful information and can trick the sidekick
	if ((window.top==window.self) && !( window.location.href.match( /(^https:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ ) ||
		window.location.href.match( /(^https:\/\/www\.facebook\.com\/lists\/)/ )
	)) {
	
		//add listener which will hot potato details back to WM if in https top document
		if (location==top.location) try {
			//alert("top document");
			if (location.href.startsWith("https:")) {
				//alert("https:");
				var hotPotatoTicker;
				hotPotatoTicker=setInterval(function(){try{
					var status="";
					if ((status=location.hash.getUrlParam("status"))!="") {
						clearInterval(hotPotatoTicker);
						location.href="https://apps.facebook.com/?#status="+status;
					}
				}catch(e){
					//alert("cannot pass details to alternate url");
				}},1000);
			}
		} catch (e){
			//alert("cannot interact with top document, assume this document is not the top document");
		}
		
		return;
	}

	//returns the merge of any number of JSON objects
	//pass JSON objects as comma separated parameters
	//var newJSON = mergeJSON(a,b,c...n)
	//note: overwrites preexisting entries from earlier passed objects
	function mergeJSON () {
		var ret = {};
		for (var a=0,l=arguments.length;a<l;a++) {
			var o=arguments[a];
			for (var v in o) {
				ret[v] = o[v];
			}
		}
      	return ret;
	};
	//short form for evaluate
	//returns a snapshot object
	function selectNodes(xPath,params){
		params=(params||{});
		return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
	};

	//short form for evaluate with single node return
	//returns the actual node, not the snapshot
	function selectSingleNode(xPath,params){
		params=params||{}; params['type']=9;
		return selectNodes(xPath,params).singleNodeValue;
	};

	//clicks an object using the mouse
	//does not run default actions like opening links
	function click(e) {
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) return;
		var evObj = e.ownerDocument.createEvent('MouseEvents');
		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
		e.className += " noHammer";
	};

	// Created by avg, modified by JoeSimmons. shortcut to create an element
	function createElement(a,b,c) {
		if(a=="text") {return document.createTextNode(b);}
		var ret=document.createElement(a.toLowerCase());
		if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		if(c) c.forEach(function(e) { ret.appendChild(e); });
		return ret;
	};

	//sidekick ability to pass information via hash parameter
	function sendMessage(s,hwnd){
		hwnd = (hwnd || window.top);
		//alert(s);
		try {
			hwnd.location.hash = s;
		} catch (e) {
			hwnd.location.href = "https://www.facebook.com/reqs.php?#"+s;	
		}
	};

	//use this array to replace texts for purposely screwed up test texts below
	//this allows to search correctly yet not display stuff wrong in recognition
	//or in the options menu when using quick arrays and the createMenuFromArray function below
	//keep all the text here in lowercase
	var screwyTexts = {"purple popp":"purple poppy","orange dais":"orange daisy","electric lil":"electric lily","daylil":"daylily",
		"golden popp":"golden poppy","chrome dais":"chrome daisy","sun popp":"sun poppy","lucky penn":"lucky penny",
		"school supp":"school supply","gold piece":"gold","real ca milk":"Real CA Milk","cornucalfpia":"CornuCalfpia",
		"sugar pega":"sugar pegafoal","fall pega":"fall pegafoal","in hoodie":"calf in hoodie","in sweater":"calf in sweater",
		"silver pega":"silver pegacalf","cheerful scroogi":"cheerful scroogifoal","i heart ny pear":"I <3 NY Pear",
		"host pega":"host pegafoal","life of the party pega":"life of the party pegafoal","pegarudolphi":"pegarudolphifoal",
		"nypd":"NYPD","winter fun pega":"winter fun pegafoal","stay at home pega":"stay at home pegafoal",
		"traveling pega":"traveling pegafoal","valentine pega":"valentine pegafoal","giant decorated hallo":"decorated halloween",
		"giant pumpkin light t":"pumpkin light","giant spring grass tre":"giant spring grass tree","giant sprinkled egg tr":"giant sprinkled egg tree",
		"giant sea urchin cactu":"giant sea urchin cactus","giant april showers tr":"giant april showers tree"};

	//set your properties for each NewItem array here
	//WM can make use of backgroundColor, foregroundColor, newitem:[true, 1, 2, or 3] and a css classname
	//current predefined css names include: newOpt, newOpt[1-3], underline, overline, unreleased, hidden, ghost, ended, green, red, blue
	//orange, yellow, silver, gray, white, black, box, and highlight
	//** I left this open so that if an item appears in more than one newItems array, then it will attempt to take on all the visual properties given for each group
	var newItemColors={
		unreleased:{backgroundColor:"#FF6600"}, //or css:"unreleased"
		items1:{backgroundColor:"green"}, //or css:"newOpt1"
		items2:{backgroundColor:"pink"}, //or css:"newOpt2"
		items3:{backgroundColor:"yellow"}, 
		items4:{backgroundColor:"violet"},
		items5:{backgroundColor:"royalBlue"}, //or css:"newOpt3"

	};
	
	//mark all these as new while building the menus
	//this collection of arrays is accessed directly by createmenufromarray so you dont need to pass it each time.
	var newItems={
		unreleased:[

			
			
			],
		items1:[
"bushel_applepotion",
"bushel_balletberries",
"bushel_blackazteccorn",
"bushel_blackbatflower",
"bushel_bunnypop",
"bushel_cannaflowers",
"bushel_cherryblossombonsai",
"bushel_chiefcrop",
"bushel_clownbroccoli",
"bushel_coconutladooflowers",
"bushel_dnalicorice",
"bushel_dragonberry",
"bushel_watermelonearth",
"bushel_earthytonecorn",
"bushel_lavendertwirl",
"bushel_paperflower",
"bushel_goldenpopcorncarnation",
"bushel_hipsterglow",
"bushel_horseshoeberries",
"bushel_jellygrape",
"bushel_lillypilly",
"bushel_maracapopsicle",
"bushel_mitsuba",
"bushel_moonlitapple",
"bushel_parisianlavender",
"bushel_passioncherry",
"bushel_peacebrooch",
"bushel_peachybow",
"bushel_pearlmillet",
"bushel_penguinpopsicle",
"bushel_rubysaltbush",
"bushel_saturnmelons",
"bushel_seabeet",
"bushel_seafingers",
"bushel_seashellberries",
"bushel_sourblueraspberry",
"bushel_sparklyrainbowflower",
"bushel_springhyacinth",
"bushel_strawberrykites",
"bushel_strawberryrose",
"bushel_summersavory",
"bushel_sunnyflower",
"bushel_sweetredcorn",
"bushel_vikingtreats",
"bushel_vineblooms",
"bushel_botanica",
"bushel_buccaneerpumpkin",
"bushel_etherealflower",
"bushel_exoticstarfruit",
"bushel_floralblush",
"bushel_fringedtulips",
"bushel_glowcoral",
"bushel_grapeswirls",
"bushel_hookedflora",
"bushel_hornedmelon",
"bushel_hydrabloom",
"bushel_krakenbloom",
"bushel_larvalanemone",
"bushel_layeredorchid",
"bushel_mysticmushrooms",
"bushel_oysterpearl",
"bushel_peacockmorea",
"bushel_pinkastilbe",
"bushel_pirate'sprism",
"bushel_rainbowlotus",
"bushel_searambutan",
"bushel_seacoralblast",
"bushel_seashellmangosteen",
"bushel_seashellweed",
"bushel_seasprout",
"bushel_seawaveorange",
"bushel_seaweedsunshine",
"bushel_skullpoppy",
"bushel_sparklebubble",
"bushel_starfishcoral",
"bushel_teardroplily",
"bushel_tiarelli",
"bushel_toxicapple",
"bushel_transparentflower",
"bushel_tropicalblooms",
"bushel_whirlpoolflower",
"bushel_xeronemalily",
"bushel_barrelcactus",
"bushel_bloomingsneezeweed",
"bushel_ranchblueagave",
"bushel_cactusflower",
"bushel_canarycreeper",
"bushel_canolafloweroil",
"bushel_chickpeabloom",
"bushel_daisybush",
"bushel_desertfloweret",
"bushel_evergreenfrangipani",
"bushel_exoticpineapple",
"bushel_exoticsorghum",
"bushel_flamingchilli",
"bushel_ranchflintcorn",
"bushel_lacecactus",
"bushel_mistflower",
"bushel_pinkbuckeye",
"bushel_radiantsunflower",
"bushel_slicertomato",
"bushel_sunglowmustard",
"bushel_sungold",
"bushel_sunshinerye",
"bushel_terrainblossom",
"bushel_victoriamealysage",
"bushel_wildflorescence",
"bushel_wildpoppy",
"bushel_wildredcabbage",
"seed_cherryblossombonsai",
"seed_festsetpumpkin",
"seed_saturnmelons",
"tree_giantartawards",
"tree_giantbarreldungaree",
"tree_giantbird",
"tree_giantblingitup",
"tree_giantbollywoodposter",
"tree_giantbunny's",
"tree_giantcandyapple",
"tree_giantcandytreat",
"tree_giantcottoncandy",
"tree_giantdivinestatue",
"tree_gianteggwreath",
"tree_giantfame",
"tree_giantfloweringgum",
"tree_giantfrenchvilla",
"tree_giantfurryfluff",
"tree_giantgoldensilver",
"tree_gianthaircurler",
"tree_gianthangingeggs",
"tree_gianthappy6thbday",
"tree_giantheartkite",
"tree_giantheavenlyfrostree",
"tree_giantjackinabox",
"tree_giantjaspergem",
"tree_giantloco",
"tree_giantmanicured",
"tree_giantmarshmallowbonsai",
"tree_giantmerryfestal",
"tree_giantmusicawards",
"tree_giantoysterpearl",
"tree_giantparakeet",
"tree_giantparisianchandelier",
"tree_giantpendulumclock",
"tree_giantpoochdryer",
"tree_giantprettythings",
"tree_giantqueensoak",
"tree_giantscarfy",
"tree_giantschooloffish",
"tree_giantsecretstash",
"tree_giantsemaphore",
"tree_giantcardsharp",
"tree_giantsmiley",
"tree_giantsmithin'",
"tree_giantsmoothround",
"tree_giantsongbird",
"tree_giantgiantsonprison",
"tree_giantsquirrelsaloon",
"tree_gianttidechandelier",
"tree_gianttrophies",
"tree_gianttubeworm",
"tree_giantwemakeearth",
"tree_giantwishingwell",
"tree_giantwrangler",
"tree_giantangelstrumpet",
"tree_giantbalefire",
"tree_giantboathammock",
"tree_giantcalmpalm",
"tree_giantconiferouscoral",
"tree_giantcrystalline",
"tree_giantexoticbanana",
"tree_giantexoticcoral",
"tree_giantfireworkcoral",
"tree_giantfirstmate",
"tree_giantglowingcoral",
"tree_giantglowingjellyfish",
"tree_giantgoldcoin",
"tree_giantkrakersuckers",
"tree_giantlateensail",
"tree_giantlightbeam",
"tree_giantmessageinabottle",
"tree_giantnightsparkle",
"tree_giantofmystries",
"tree_giantovergrownpalm",
"tree_giantpearlsandshells",
"tree_giantpiratebooty",
"tree_giantpirateplank",
"tree_giantpiratewillow",
"tree_giantpurpletunicates",
"tree_giantroseyeyepatch",
"tree_giantrustycannons",
"tree_giantsappirecoral",
"tree_giantseacoral",
"tree_giantseafancoral",
"tree_giantseaslug",
"tree_giantstarburstcoral",
"tree_giantstarcoral",
"tree_giantstarfishpalm",
"tree_gianttopiary",
"tree_gianttreasuregold",
"tree_gianttropicalflower",
"tree_giantwaterfall",
"tree_giantwebbedshelter",
"tree_giantweepingwillow",
"tree_giantagave",
"tree_giantammobelt",
"tree_giantbarrelcactus",
"tree_giantcacti",
"tree_giantcactuspatch",
"tree_giantcolourfuljuniper",
"tree_giantdesertflower",
"tree_giantdesertmirage",
"tree_giantdesertnight",
"tree_giantdesertsunrise",
"tree_gianteagledusk",
"tree_giantfeatherelm",
"tree_giantfierydogwood",
"tree_giantfringedwisteria",
"tree_giantgoldenjoshua",
"tree_gianthangman",
"tree_gianthorseshoeoak",
"tree_giantpinonpine",
"tree_giantsavannasunset",
"tree_giantsheriffcactus",
"tree_giantsnakeentwined",
"tree_gianttargetpractise",
"tree_gianttotemsequoia",
"tree_gianttouchmenot",
"tree_gianttwistedfrontier",
"tree_giantwantedposter",
"tree_giantwatchtower",
"tree_giantwheelsandbarrels",
"tree_giantwildbloom",
"tree_giantwildcactus",
"tree_giantwilddreamcatcher",
"tree_giantwildwestcactus",
"tree_giantwildwestredwood",
"tree_giantwildwind",
"tree_giantyucca",
"tree_afro",
"tree_artawards",
"tree_artistree",
"tree_atom",
"tree_barreldungaree",
"tree_beardedstraw",
"tree_bird",
"tree_blingitup",
"tree_partyblower",
"tree_bollywoodposter",
"tree_braidedwisteria",
"tree_bullseye",
"tree_bunnyears",
"tree_printedspring",
"tree_candlecenterpiece",
"tree_candyapple",
"tree_candytreat",
"tree_canna",
"tree_cassette",
"tree_cd",
"tree_chillipinata",
"tree_chocolatechicklets",
"tree_cincodemayo",
"tree_clown",
"tree_cogwheel",
"tree_coloredanemone",
"tree_colourshade",
"tree_redcoral",
"tree_cottoncandy",
"tree_creeper",
"tree_disco",
"tree_divinestatue",
"tree_dna",
"tree_backstreetpug",
"tree_eggbasket",
"tree_eggshell",
"tree_eggwreath",
"tree_ornateegg",
"tree_espalierfence",
"tree_fame",
"tree_bird",
"tree_hangingeggs",
"tree_happy6thbday",
"tree_heavenlyfrostree",
"tree_parakeet",
"tree_festive",
"tree_floweringgum",
"tree_fountainpalm",
"tree_frenchvilla",
"tree_freshsummer",
"tree_funkyhillhouse",
"tree_furryfluff",
"tree_gerberadaisy",
"tree_glasschandelier",
"tree_glass",
"tree_streetgnome",
"tree_streetfoodvendorgnome",
"tree_treelovergnomes",
"tree_goldensilver",
"tree_greenworld",
"tree_gypsyflower",
"tree_gypsypattern",
"tree_haircurler",
"tree_hangingeggs",
"tree_happy6thbday",
"tree_haystraw",
"tree_headresscowboy",
"tree_heavenlyfrostree",
"tree_helmettop",
"tree_hennatattoo",
"tree_hip",
"tree_illusion",
"tree_jackinabox",
"tree_jaspergem",
"tree_kickstand",
"tree_king'sbonsai",
"tree_laurelwreath",
"tree_lightbranch",
"tree_loco",
"tree_lollyflower",
"tree_magicsteampunkbonsai",
"tree_magictreasurechestbonsai",
"tree_magnificentcoral",
"tree_manicured",
"tree_marshmallowbonsai",
"tree_merryfestal",
"tree_moonlitcanopy",
"tree_moonlitcloud",
"tree_multiglamo",
"tree_mushroomwaterfall",
"tree_musicawards",
"tree_mysticspirit",
"tree_neoneasteregg",
"tree_nesty",
"tree_nightmist",
"tree_nordicwaterfall",
"tree_oysterpearl",
"tree_paintsplash",
"tree_parakeet",
"tree_parisianchandelier",
"tree_pendulumclock",
"tree_peppermintcandy",
"tree_persianjewlery",
"tree_petunia",
"tree_bunyapine",
"tree_pinkwisteriaswing",
"tree_poochdryer",
"tree_prettythings",
"tree_psychedelic",
"tree_punk",
"tree_queensoak",
"tree_racingleathers",
"tree_reusedbottles",
"tree_romanhelm",
"tree_saddleswing",
"tree_scarfy",
"tree_schooloffish",
"tree_secretstash",
"tree_semaphore",
"tree_cardsharp",
"tree_shelling",
"tree_sisalflower",
"tree_smiley",
"tree_smithin'",
"tree_smoothround",
"tree_solar",
"tree_songbird",
"tree_treesonprison",
"tree_sportyleather",
"tree_springtime",
"tree_squirrelsaloon",
"tree_stary",
"tree_steamed",
"tree_steampunktree",
"tree_steelstudded",
"tree_stilt",
"tree_stoneageoak",
"tree_summerscolor",
"tree_sweetgumball",
"tree_swing",
"tree_taco",
"tree_teeny",
"tree_teepeehouse",
"tree_tidechandelier",
"tree_trailmarker",
"tree_trophies",
"tree_tubeworm",
"tree_vikingbraid",
"tree_v-twin",
"tree_wantedposter",
"tree_warpaint",
"tree_weddingconfetti",
"tree_wemakeearth",
"tree_wishingwell",
"tree_wrangler",
"tree_angelstrumpet",
"tree_balefire",
"tree_boathammock",
"tree_calmpalm",
"tree_coniferouscoral",
"tree_crystalline",
"tree_exoticbanana",
"tree_exoticcoral",
"tree_explorerhouse",
"tree_fireworkcoral",
"tree_firstmate",
"tree_glowingcoral",
"tree_glowingjellyfish",
"tree_goldcoin",
"tree_krakersuckers",
"tree_lateensail",
"tree_lightbeam",
"tree_mangroveglade",
"tree_messageinabottle",
"tree_nightsparkle",
"tree_treeofmystries",
"tree_overgrownpalm",
"tree_pearlsandshells",
"tree_piratebooty",
"tree_pirateplank",
"tree_piratewillow",
"tree_purpletunicates",
"tree_rockyhouse",
"tree_roseyeyepatch",
"tree_rustycannons",
"tree_sappirecoral",
"tree_seacoral",
"tree_seafancoral",
"tree_seafarerhouse",
"tree_seaslug",
"tree_starburstcoral",
"tree_starcoral",
"tree_starfishpalm",
"tree_steampunkbonsai",
"tree_topiary",
"tree_treasurechestbonsai",
"tree_treasuregold",
"tree_tropicalflower",
"tree_waterfall",
"tree_webbedshelter",
"tree_weepingwillow",
"tree_agave",
"tree_ammobelt",
"tree_barrelcactus",
"tree_cacti",
"tree_cactuspatch",
"tree_colourfuljuniper",
"tree_desertflower",
"tree_desertmirage",
"tree_desertnight",
"tree_desertsunrise",
"tree_eagledusk",
"tree_featherelm",
"tree_fierydogwood",
"tree_fringedwisteria",
"tree_goldenjoshua",
"tree_hangman",
"tree_horseshoeoak",
"tree_pinonpine",
"tree_savannasunset",
"tree_sheriffcactus",
"tree_snakeentwined",
"tree_targetpractise",
"tree_totemsequoia",
"tree_touchmenot",
"tree_twistedfrontier",
"tree_wantedposter",
"tree_watchtower",
"tree_wheelsandbarrels",
"tree_wildbloom",
"tree_wildcactus",
"tree_wilddreamcatcher",
"tree_wildwestcactus",
"tree_wildwestredwood",
"tree_wildwind",
"tree_yucca",
"arenahelmet",
"arenaticket",
"barbedwire",
"barnlock",
"barrelofscrews",
"birdcouple",
"birdfeed",
"blossomsaplings",
"cakefrosting",
"cheerplacard",
"cherryumbrella",
"coal",
"fishingnets",
"floralcake",
"forgedcoin",
"frostedcupcake",
"gatheringbasket",
"hammerandanvil",
"honeyjar",
"maracas",
"mayohats",
"telescope",
"metalsupportedbarrels",
"miniradar",
"organicfruits",
"waterpail",
"pinkbasket",
"ranchhaybale",
"refinedmetalbars",
"shipwheel",
"singlebirdhouse",
"solarmodel",
"specialcincocake",
"steelropes",
"timberfencewood",
"timberwoodstacks",
"twomansaw",
"anchor",
"anchorband",
"doubloon",
"mosswoodshaving",
"shipbuildingrod",
"gluelaminate",
"paintbucket",
"woodclad",
"mat_brookblossomhouse",
"mat_cakehouse",
"mat_chirpytreehouse",
"mat_farmer'smarket",
"mat_medievalobservatory",
"mat_paradefloathouse",
"mat_sportscolosseum",
"mat_mermaidstatue",
"mat_stonewaterfairy",
"mat_pirateloot",
"mat_abandonedloot",
"mat_sailormancannon",
"mat_shiphull",
"mat_seawreckage",
"mat_abandonedshack",
"mat_abandonedwagon",
"mat_fallenlog",
"mat_winchhouse",
"adopt_calfbassistbull",
"adopt_calfmechanicbull",
"adopt_calfbullrider",
"adopt_calfsteamyaggrobull",
"adopt_calfboatswainbull",
"adopt_calfwildwilliecow",
"adopt_calfexotickudubull",
"adopt_calfrodeobull",
"adopt_calfboyband",
"adopt_calfbubblegum",
"adopt_calfcactus",
"adopt_calfcruiser",
"adopt_calfdragonmoo",
"adopt_calfflyingmoo",
"adopt_calfgardener",
"adopt_calflookalike",
"adopt_calfmademoiselle",
"adopt_calfmayflower",
"adopt_calfmoowish",
"adopt_calfphotographer",
"adopt_calfranchrodeo",
"adopt_calfsteamy",
"adopt_calfcabofrio",
"adopt_calfcaptain",
"adopt_calfcody",
"adopt_calfking",
"adopt_calfsailor",
"adopt_calfsailorjimmy",
"adopt_calfbargirl",
"adopt_calfgunslinger",
"adopt_calflonghorn",
"adopt_calfoutlaw",
"adopt_calfranchlonghorn",
"adopt_calfsouthern",
"adopt_calfwildhighland",
"adopt_calfmuskox",
"adopt_foalbdaybowdonkey",
"adopt_foalcleanupdonkey",
"adopt_foalmuleminer49er",
"adopt_foalarthurian",
"adopt_foalavalonjoust",
"adopt_foalbanditqueenmare",
"adopt_foalcincodepink",
"adopt_foalcontinentalscout",
"adopt_foalcountryridemare",
"adopt_foaldragonwear",
"adopt_foaldreamtimeaussie",
"adopt_foalexotic",
"adopt_foalfantasy",
"adopt_foalfeatheredwar",
"adopt_foalferal",
"adopt_foalfiancee",
"adopt_foalflower",
"adopt_foalflowerfairy",
"adopt_foalfriendfromarctic",
"adopt_foalgallopingroyal",
"adopt_foalgarland",
"adopt_foalgirlbopper",
"adopt_foalglam",
"adopt_foalgoldspotted",
"adopt_foalgrunge",
"adopt_foalhairsteamer",
"adopt_foalhighroller",
"adopt_foalhuckleberry",
"adopt_foaljagersteed",
"adopt_foaljaguarpaw",
"adopt_foaljimmy",
"adopt_foalmage",
"adopt_foalmayoral",
"adopt_foalmohawk",
"adopt_foalmoonlit",
"adopt_foalfoaloftheocean",
"adopt_foalpaintpattern",
"adopt_foalrecycledsteel",
"adopt_foalrockday",
"adopt_foalroyal",
"adopt_foalroyalroman",
"adopt_foalsaloonsally",
"adopt_foalsalwarstyled",
"adopt_foalshiningarmor",
"adopt_foalspringcolors",
"adopt_foalstallionranger",
"adopt_foalstylishsteam",
"adopt_foalbartender",
"adopt_foaltouringmare",
"adopt_foaltraindriver",
"adopt_foalwildnative",
"adopt_foalaqua",
"adopt_foalfirstmate",
"adopt_foalgolddigger",
"adopt_foalharbourwench",
"adopt_foalmarauder",
"adopt_foalmossywood",
"adopt_foalpearlmaid",
"adopt_foalpirateoftheorient",
"adopt_foalraider",
"adopt_foalredsea",
"adopt_foalsea",
"adopt_foalseawave",
"adopt_foalswashbuckling",
"adopt_foalwavy",
"adopt_foalbandit",
"adopt_foalbrave",
"adopt_foalcowboy",
"adopt_foalcowboybronco",
"adopt_foaldesertshine",
"adopt_foalgunmanponcho",
"adopt_foalgunslinger",
"adopt_foalpalominomare",
"adopt_foalranch",
"adopt_foalrodeomare",
"adopt_foalrodeoshow",
"adopt_foalsheriffmare",
"adopt_foalsteppe",
"adopt_foalsunset",
"adopt_foalartistpegacorn",
"adopt_foalbdaypegacorn",
"adopt_foalbreezingpegacorn",
"adopt_foalcircuspegacorn",
"adopt_foalcomicalheropegacorn",
"adopt_foalcommonheropegacorn",
"adopt_foaleggpickerpegacorn",
"adopt_foalenchantedswirlpegacorn",
"adopt_foalfabulouspegacorn",
"adopt_foalgardenqueenpegacorn",
"adopt_foalgoldeneggpegacorn",
"adopt_foalmusicianpegacorn",
"adopt_foalnoblepegacorn",
"adopt_foalparisianchicpegacorn",
"adopt_foalpartyrockingpegacorn",
"adopt_foalpecockicorn",
"adopt_foalpunkprincesspegacorn",
"adopt_foalqueenspegacorn",
"adopt_foalsuparecyclepegacorn",
"adopt_foalrockonpegacorn",
"adopt_foalshellerpegacorn",
"adopt_foalsherwanipegacorn",
"adopt_foalsparkypegacorn",
"adopt_foalstainedglasspegacorn",
"adopt_foalsteameduppegacorn",
"adopt_foalwildnativepegacorn",
"adopt_foalfestivemasqueradepegacorn",
"adopt_foalislanderpegacorn",
"adopt_foallionfishpegacorn",
"adopt_foalseashellpegacron",
"adopt_foalseasoulpegacorn",
"adopt_foalcowboypegacorn",
"adopt_foalsaloongirlpegacorn",
"adopt_foalblackswanpegasus",
"adopt_foalblueypegasus",
"adopt_foalbronzecastpegasus",
"adopt_foalcaramelcrunchpegasus",
"adopt_foalchieftainpegasus",
"adopt_foalcottontwirlpegasus",
"adopt_foaldancingpegasus",
"adopt_foalfiestapegasus",
"adopt_foalfrillyfolkloricpegasus",
"adopt_foalgalacticpegasus",
"adopt_foalgiftbasketpegasus",
"adopt_foalglowymeadowpegasus",
"adopt_foalgraciousspringpegasus",
"adopt_foalgreaserpegasus",
"adopt_foalgypsyspegasus",
"adopt_foalinkedpegasus",
"adopt_foalinventorpegasus",
"adopt_foalkiteloverpegasus",
"adopt_foallongearedpegasus",
"adopt_foalmaledancerpegasus",
"adopt_foalnativesheriffpegasus",
"adopt_foalnightskypegasus",
"adopt_foalquetzalpegasus",
"adopt_foalstoneagepegasus",
"adopt_foalstrawwingspegasus",
"adopt_foalswiftpegasus",
"adopt_foaltonedpegasus",
"adopt_foaltoucanpegasus",
"adopt_foaltraditionalthaipegasus",
"adopt_foalvikingqueenpegasus",
"adopt_foalwarriorprincesspegasus",
"adopt_foalbettawingedpeagasus",
"adopt_foalcaribbeanpegasus",
"adopt_foalislandprotectorpegasus",
"adopt_foallanternpegasus",
"adopt_foalpegasusofseas",
"adopt_foalseafarerpegasus",
"adopt_foalshellcrownpegasus",
"adopt_foaldesertnightpegasus",
"adopt_foalfreespiritpegasus",
"adopt_foalladycolumbiapegasus",
"adopt_foalsouthernbellepegasus",
"adopt_foalblingsuitpony",
"adopt_foalcarouselpony",
"adopt_foaldragonpony",
"adopt_foalegghuntponisus",
"adopt_foalfestiveponycorn",
"adopt_foalfrenchcountrypony",
"adopt_foaliseulttheredeemerpony",
"adopt_foaljanicepony",
"adopt_foalladypony",
"adopt_foalmotoprincesspony",
"adopt_foalorientalprincesspony",
"adopt_foalpeacocksparklepony",
"adopt_foalpoppypony",
"adopt_foalrockerpony",
"adopt_foalrodeopony",
"adopt_foalscenepony",
"adopt_foalsittingbullpony",
"adopt_foalstarypony",
"adopt_foalvalkyriepony",
"adopt_foalcabinboypony",
"adopt_foaldecksweeppony",
"adopt_foalhoraceponycorn",
"adopt_foallizzieponycorn",
"adopt_foalnavigatorpony",
"adopt_foalperiwinklepony",
"adopt_foalseapony",
"adopt_foalcowgirlpony",
"adopt_foalfarmgirlpony",
"adopt_foalfringedpony",
"adopt_foaloldwestpony",
"adopt_foaloutlawpony",
"adopt_foalranchpony",
"adopt_foalshaggypony",
"adopt_foalsheriffpony",
"adopt_foalarticprincessunicorn",
"adopt_foalauroraborealisunicorn",
"adopt_foalaviatorunicorn",
"adopt_foalcandiliciousunicorn",
"adopt_foalcandycaneunicorn",
"adopt_foalcardhustlin'unicorn",
"adopt_foalelegantenglishuniorn",
"adopt_foalfarmhandunicorn",
"adopt_foalfemaledancerunicorn",
"adopt_foalfloralunicorn",
"adopt_foalflufflycloudyunicorn",
"adopt_foalglassprincessunicorn",
"adopt_foalinterstellarunicorn",
"adopt_foalknitunicorn",
"adopt_foalnightfireunicorn",
"adopt_foalnightprincessunicorn",
"adopt_foalperkyunicorn",
"adopt_foalpictureperfectunicorn",
"adopt_foalpinkblanketunicorn",
"adopt_foalpinkdivaunicorn",
"adopt_foalprideparadeunicorn",
"adopt_foalprimadonaunicorn",
"adopt_foalwarriorprincessunicorn",
"adopt_foaladmiralunicorn",
"adopt_foalcloakedunicorn",
"adopt_foalsparkleseaunicorn",
"adopt_foalbarmaidunicorn",
"adopt_foaldappledunicorn",
"adopt_foalsteamengineunicorn",
"adopt_foaltownsmanunicorn",
"egg_biker",
"egg_bobbysoxer",
"egg_breakfast",
"egg_butterchurn",
"egg_cape",
"egg_cheatin'poker",
"egg_checkedshirt",
"egg_chickywonka",
"egg_chincurtain",
"egg_chirpymum",
"egg_easter",
"egg_springflower",
"egg_flyaway",
"egg_gemstudded",
"egg_lbd",
"egg_partycap",
"egg_penguin",
"egg_preppy",
"egg_spacevillain",
"egg_springchicklet",
"egg_springmother",
"egg_stationmaster",
"egg_trendy",
"egg_weddingguest",
"egg_audra",
"egg_shell",
"egg_gunspinner",
"egg_lasso",
"egg_poker",
"adopt_fawnaussie",
"adopt_fawncola",
"adopt_fawnrancherdoe",
"adopt_fawndressedup",
"adopt_fawnearthmy",
"adopt_fawnegggarland",
"adopt_fawneggster",
"adopt_fawngreenknight",
"adopt_fawnlasso",
"adopt_fawnmoonlightmist",
"adopt_fawnnatureking",
"adopt_fawnparanoid",
"adopt_fawnpeacelover",
"adopt_fawnpinata",
"adopt_fawnpopcorn",
"adopt_fawnpsychelic",
"adopt_fawnrelaxed",
"adopt_fawnstarfish",
"adopt_fawnsteamy",
"adopt_fawntopaz",
"adopt_fawnvintagetouringdoe",
"adopt_fawncloaked",
"adopt_fawncoral",
"adopt_fawndarkstriped",
"adopt_fawnislandriches",
"adopt_fawntropic",
"adopt_fawnsunset",
"adopt_fawnwildcowboy",


],


		items2:[



		],
		items3:[


		],
		items4:[,
		],
	};

	//build a menu list based on an array of text
	//add a prefix to the return word using prefix
	//automatically sorts alphabetically, set sort=false to disable
	//automatically capitalizes first letter of every word
	//point markAsNew to your collection of new items or leave blank
	//point markWithColors to your color collection or leave blank
	function createMenuFromArray(arr,prefix,sort,markAsNew,markWithColors){
		markAsNew=markAsNew||newItems;
		markWithColors=markWithColors||newItemColors;
		sort=(sort==null)?true:sort;
		var ret={}, arr2;
		if (arr) {
			//clone the array before sorting
			arr2=arr.slice(0);
			if (sort) arr2=arr2.sort();
			for (var i=0,len=arr2.length;i<len;i++){
				var o=arr2[i];
				//build the real keyname
				var keyName = (prefix||'')+o.noSpaces().toLowerCase();
				//fix its label if needed
				var fixedLabel=screwyTexts[o.toLowerCase()];
				//create the element constructing code
				ret[keyName]={type:'checkbox',label:(fixedLabel || o).upperWords()};
				
				//mark new and stylize
				for (var colorGroup in markAsNew) {
					var toMark = markAsNew[colorGroup];
					if (toMark.inArray(keyName)) {
						//item found listed under colorGroup
						var useColors = markWithColors[colorGroup];					
						for (var newProp in useColors) {
							//push properties to this element
							ret[keyName][newProp]=useColors[newProp];
						}					
					}
				}
			}
			arr2=null; //not needed
		}
		return ret;
	};
	//build Accept Text object from an array
	//add a prefix to the return key using keyPrefix, ie "cow_"
	//add a suffix to the return value using textSuffix, id " Cow"	
	function createAccTextFromArray(arr,keyPrefix,textSuffix){
		var ret={};
		if (arr) {
			for (var i=0,len=arr.length;i<len;i++){
				o=arr[i];
				ret[(keyPrefix||'')+o.noSpaces().toLowerCase()]=o.upperWords()+(textSuffix||'');
			}
		}
		return ret;
	};


	//try to dock with WM 1.5 main script
	function dock(){
		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			//cannot find dock
			window.setTimeout(dock, 1000);
			return;
		} 

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app'+thisApp);
		if (doorMark) return; //already posted to door


		//define types here
		//provide text as it appears in the post body/link, even if spelled wrong (ie. cirtus = citrus for FV collection items)
		//search texts do not need to be in proper case as the search engine in WM 1.5 sets everything to lowercase anyway
		//you cannot search for specific case text via a WM sidekick
		//texts are case corrected later when they are added to the options menu
		//add text entires in any order and use .fixOrder() to make sure order does not cause issues during searching


		//bushel types are grouped as they were in FVWM	
		//types are defined in separate arrays for easier use in options menu	

		var fruitTypes=["jack o lilys","bubble bean","high roller","lucky marshmallow","bat berry","ghost pumpkin","nymph morels","ramps","bell pepper","blackberry","blueberry",
		        "fire pepper","chardonnay","chinese eggplant","goji berry",
				"ghost chili","grape","jalapeno","leek","sichuan pepper","hilo pineapple","purple tomato","raspberry",
				"square melon","straspberry","strawberry","tomato","watermelon","white grape","yellow melon","zinfandel",
				"darrow blackberry","chandler blueberry","cove cranberry","red iceberry","frozen grapes","love strawberry",
				"sangiovese","cabernet sauvignon","syrah","pinot noir","riesling","moscato","sauvignon blanc","pineapple",
				"lilikoi","royal cantaloupe","cantaloupe","pepper","forbidden eggplant","african eggplant","red currant",
				"eggplant","elderberry","cranberry","flame pepper","mini holiday trees",
				"acorn squash","royal artichoke","asparagus","broccoli","red cabbage","cara potato","carnival squash",
				"baby carrot","chickpea","cucumber","english pea","field bean","heirloom carrot","long onion","green onion",
				"pea","potato","black pumpkin","purple asparagus","purple pod pea","radish","red spinach","rhubarb","spinach",
				"soybean","squash","squmpkin","turnip","zucchini","rappi","swiss chard","kennebec potato","pattypan",
				"butter & sugar corn","cauliflower","candied yam","carrotcicle","iceberg lettuce","kelp","royal taro",
				"taro","nagaimo","edamame","chinese daikon","bok choy","azuki","water chestnut","yam","forbidden onion",
				"artichoke","forbidden daikon","daikon","forbidden chestnut","swiss chard","onion","baby corn","parsnip",
				"garlic","pink okra","snap pea","carrot","lettuce","celery","brussel sprout","green bean","bean sprout",
				"forbidden sprouts","forbidden carrot","lentil","kidney bean","kale","dumpling squash","pumpkin","cabbage",
				"okra","amaranth","barley","corn","double grain","hops","oat","posole corn","red wheat","royal hops",
				"rye","wheat","whisky peat","triticale","iced rice","sticky rice","imperial rice","millet","forbidden barley",
				"pearl barley","brown rice","jasmine rice","rice","buckwheat","sorghum",
				"aloe vera","jade bamboo","basil","black tea","kona coffee","chinese cotton","lowland ginger",
				"green tea","lemon balm","peppermint","golden sugar cane","hay","dill","tarragon","holly","forbidden tea",
				"gummi bear","mint candy","hawaiian ginger","wasabi","saba","ramen","lemongrass","gingerbread","imperial tea",
				"white cloud tea","jade peanut","royal mustard","red nori","sugar cane","mustard","ginger","cotton","coffee",
				"peanut","bamboo","sesame","horseradish","water cress","nori","forbidden ginseng","ginseng","forbidden udon",
				"udon","lollipop","bugleweed","vuvuzela","trumpet creeper","viola","lyre leaved sage","chervil",
				"amber grain","amethyst grape","cilantro","crimini mushroom","deep dish crust","diamond corn","durum wheat",
				"emerald melon","flat crust","french tarragon","genovese basil","green pepper","marinara sauce","marjoram",
				"moonstone onion","mushroom sauce","oregano","parsley","pasta","pearl pumpkin","peridot pea","pesto sauce",
				"quartz carrot","red pepper","roma tomato","rosemary","ruby rose","sapphire berry","shiso","shallot","sorrel",
				"sundried tomato","thai basil","thyme","white wheat","yellow onion","snowman","snow woman","christmas tree",
				"rainbow snowflake","holiday bell","holiday cookie","holiday wreath","fireworks","bubbly","fairy wand",
				"ballet queen flower","stone crab","tea cups","white hibiscus","broken hearts","crystal hearts","red corn",
				"black carnation","leprechaun gnome","scarlet sunflower","birthday cake","crystal","cupid corn","snow cone","white pumpkin","candy cane","balloon","gnome",
				"red toadstool","purple toadstool","jack o lantern","green peppermint","snow carnation","king cake","rainbow",
				"candy corn","cereses carrot","capri-corn","moon flower","mercury melon","aquarius arugala","aries azalea",
				"venus fly trap","jupiter juniperus","apollo aster","celestial camellia","orange cauliflower","floating flower",
				"red tulip","purple popp","morning glory","pink rose","white rose","orange dais","electric lil",
				"pink carnation","fire & ice rose","flamingo flower","yellow rose","pink hibiscus","green hellebore","alpine rose",
				"green rose","golden popp","red clover","black rose","white poinsettia","pink aster","electric rose","star flower",
				"chrome dais","sun popp","english rose","forget me not","spring squill","lilac daffy","lady slipper","black tulip",
				"snow tulip","glacial rose","red rose","landini lilies","bells of ireland","double pikake","yellow hibiscus",
				"hawaiian orchid","lava flower","purple orchid","grass widow","night cereus","royal forget-me-not","sundew plant",
				"walking iris","pitcher plant","dragon flower","royal mum","water lily","forbidden lily","yellow marigold",
				"orange marigold","licorice plant","cherry blossom","peace flower","evening flower",
				"edelweiss","lotus","hollyhock","columbine","cornflower","gardenia","foxglove","peony","lokelani","dandelion",
				"spiral flower","lotus","flamingo","cherokee rose","bluebell","poinsettia","gladiolus","sunflower","lilac",
				"daffodil","iris","saffron","lavender","clover","daylil","lily","alfalfa","flax","agave","begonia","ivy",
				"forbidden calamari","forbidden rock cod","clam","lobster","seafood","shrimp","oyster","mussel",
				"yellowfin tuna","rock crab","ono","hamachi","grouper","squid","rock cod","prawns","scallop","forbidden unagi","unagi",
				"wolfsbane","jack o'lantern","tombstone","zombie","sage","green toadstool","ghoul garlic","spectre berries",
				"franken fruit","wormwood","phantom frond","candied corn",
				"choco mint","cider apple","flint corn","frost holly","holiday cactus",
				"holiday poinsettia","hollowberry","honey ginger","jingleberry","light orchid","potatornament","rudolph radish",
				"wax beans","white cranberry","winter grain","winter squash","ambrosia tulip","boggart bulb","butterfly rose","dark dahlia","dream cotton","elfin tea","fairy foxglove",
				"goblin vine","gossamer ivy","honey melon","nectarkin","pixieberry",
				"aquamarine rose","brooch","bubble beans","carrot gold","chamomile","coral","cuddly bear","deep sea cabbage","genie lamp",
				"glass butterfly","lava lotus","manta mushrooms","mesaqueen","mushroom fairy","octa-pumpkin","pink toadstool","pirate potato",
				"plankton","pot of gold","rainbow candy floss","rose hearts","sea sponge","shellfish","urchinberry","ambrosia","jellyfruit",
				"salty squash","sea cucumber","sea onions","sea watermelon","seaweed","triton turnip","currant tomato","paint brush",
				"organic red corn","organic ballet queen","organic blueberry","organic broccoli",
				"trowel bucket","organic carrots","trowel chest","organic cotton","trowel crate",
				"organic eggplant","organic gift","organic grape","organic onions","gold ore","organic pea",
				"organic pepper","organic pinkbow","organic pumpkin","ballet queen","organic rainbow",
				"organic raspberry","organic soybean","organic spinach","organic strawberry","organic tomato","muntires",
				"mini-earth","tumeric","australian sugar cane","yellow myrtle flower","finger lime plant","roo xing sign","australian barley","fava beans",
				"wombat berry","sweet corn","australian cotton","jungle feathers","semillon grape","shiraz grape","yellow lupin","happy marchmellows","kangaroo paws","field peas",
				"cape peppercorn","australian pineapple","australian seed","red sorghum","shooting stars","kutjera tomato","australian wheat","canola","fennel","koala","lillipilli",
				"australian purple sugar cane","late harvest semilion grape","late harvest shiraz grape","australian purple pepper","australian albino pineapple",
				"australian red pepper","australian sugar cane","green australian barley","green kutjera tomato","pink myrtle flower","purple lilli pili","purple sweet corn",
				"red australian cotton","red australian wheat","yellow field peas","yellow kangaroo paws","australian pineapple","australian barley","australian wheat",
				"blue lupin","green muntries","australian cotton","purple canola","red sorghum","white sorghum","yellow lupin","yellow myrtle","corsage",
				"caraway","chicory","garter","rainbow iris","sunshine","dazzlers","flava corn","milky strawberries","moon mischief","myne melon","ooval tomato","pod peas",
				"ruzberries","shard skin onions","solar flare bean","space dust sugar cane","star puff cotton","sun dipped pepper","sun fade barley","sun fingers",
				"thuck wheat","turni carrot","violet vein spinach","white dwarf sunflower","birthday cake","dragon sparklers","lawn flamingo","moon melons","stargazer lilies",
				"star speckles","supernova strawberries","tiara","glowing bouquet","barcelona daisy","paper flower","princess hat","flowering nettle",
				"red pineapple","straw ruby","meteorite shards","green strawberries","appleberry","cumin","forbs","gooseberry","honeyberry","kudzu","lovage",
				"teaberry","yerbamate","candied cherries","candy jasmine","canning peach","cookie petals","crafty flower","drop lemons","gumball poppy",
				"gumdrop daisy","gummy bud","jellyanthemum","licorice vine","lollipop twist","long stem cupcake","lotus mint","marsh melon","peppermint poppies",
				"snapjelly","sprinkle strawberry","sugarbell","sugar rose","sweet tea cups","whoopie thistle","butterscotch blossom","blue buttercup","coral geranium",
				"dynamite pepper","elephant peanut","english chip","goldenrod flower","highbush blueberry","lavender lily","pink kiss","popcorn","porcelain shrub",
				"red orchid","sunburst orchid","white posies","wild alfalfa","yellow lily","spice wheel","white nectarine","muntries",
				"manta mushroom","sweet tea cups","parasol",
				"dragon vine","dusk turnip","fairy blossom","fantasy fireflowers","firelight mushroom","flaxen strawberry","gilded flower","goldenseal","harmony rose",
				"kalanchoe","mystical jasmine","obal pumpkin","pericarp potato","sapphire aster","shimmer corn","twilight cups","violet allium","wan raspberry",
				"whytea leaves","yellow dock","zaffre oats","amber carrot","aslant carrot","blakk root","bright stalk","brusen berry","burdock","white garlic","rainbow star",
				"lemon","red radish","apothecary flowerbed","blue bean","corn flower","georgia jet sweet potatoes","gooseberries","jack o lily",
				"lace pumpkin","magic dandelion","oca","parasol","purple potato","spider webs","purple tulip","whispy tombstones","white carnation","yellow daffodil",
				"yellow freesia","pink bows","peruvian lily","ersatz garlic","jack o lantern lights","maple syrup leaves","spa daisy","startichoke","storybooks",
				"bold beets","cinnamon sticks","pumpkin wreaths","red chrysanthemum","storybooks","auroral corn","auroral rosemary","blazing peppers",
				"borealis blueberries","borealis rose","boughs of holly","candle light cranberries","cinnabursts","dazzle apple","fa la la la-lavender",
				"frosted poinsettia","glass candle","glass candycane","glass icicle","glass pinwheel","golden ivy","holiday stained glass","hollybright berries",
				"hollybright poinsettia","hollybright snow peas","kindle onions","luminous ginger","moonlit mistletoe","radiant radish","roasting chestnuts",
				"roman candle cauliflower","santaberries","seasonal spirits","shiny sprouts","silvery squash","sleigh guider cherries","spark wheat","sugar n' sprites",
				"winter turnip","yule logs","country guitars","cumulus puffs","mangosteen","milk thistle","nutmeg","ottomelon","sundae cup","toy flowers",
				"rutabaga","snowflake flowers","hot chocolate mugs","ice lily","night before candies","purple poinsettia","corn flower","frost poppy","purple anthurium","rainbarb",
				"allspice pepper","avocado squash","banana blossom","beryl rain flower","blue agave","blue paradise","bromeliad","butterfly orchid","cassava","chaya spinach","chayote",
				"cocoa coffee","eclipse sunflower","emerald pineapple","golden emeralds","golden wheat","heliconia","jicama","jungle blackberry","jungle puffs","maize","passion flower",
				"pointed pinks","prickly pear","super avocado squash","super banana blossom","super bromeliad","super butterfly orchid","super cassava","super chaya spinach",
				"super chayote","super cocoa coffee","super eclipse sunflower","super emerald pineapple","super golden wheat","super heliconia","super jicama","super jungle blackberry",
				"super maize","super prickly pear","super tomatillo","super turquoise puya","super vanilla vine","super volcano chili pepper","super wild pinto bean","tomatillo",
				"turquoise puya","vanilla vine","volcano chili pepper","wild pinto bean","ballerina tiara","brass bell flowers","chocolate hearts","cowboy lassos","cupid's bow",
				"frost and flame flower","hawaiian lei","lovebird lilies","cupid's arrow","madder root","plum blossom","queen anne's lace","royal crown","sheriff snapdragons",
				"truffle sprout","azure corn","balloon melons","bitty blue tomatoes","bubble glass","coil lily","crystal cranberries","emerald city lollipop","emerald rye",
				"glass strawberries","jade spiralis","mini eggplant","munchkin flower","pink square watermelons","purple dahlias","rainbow starburst","red poppy","ribbon daisy",
				"silver shoes","squash blossom","swirling blue fern","unfolding plumeria","whirling buds","yellow brick beets","yellow rhubarb","dewdrop flowers","pots of gold",
				"venician masks","cloud snapdragons","gloaming gourd","pacifiers","lavender flowers","lily of the valley","milkmaid","muffin hats","pink anthurium","squirting sunflower",
				"aphrodite hearts","bubbles","clock spire stalks","espresso cups","firefly grapes","honeysuckle","orange calendula","pink easter lily","rainbow cloud","spring roses",
				"aqua cantaloupe","blue glass rose","brush olive","bugloss","cardoon","chioggia beets","daphne","flamenco anemone","freckled white grape","fuchsia bougainvillea",
				"golden oregano","lima bean","lowland pistachios","mediterranean buttercup","orange bell pepper","pinot noir grape","rosemary","saffron crocus","san marzano tomato",
				"seaglass wheat","sea holly","sea lavender","sol chickpeas","strawberry carrots","yellow trillium","blue dragon fruit","bottle","pacifier","champagne mushroom",
				"cherry tomato","festive marracas","dragon eggplant","flower melons","maracas flowers","narcissus geranium","neon lemons","oatmeal","peas 'n' carrots","pinkberry",
				"rose berry","sapodilla","spiral sunflowers","sunset lychees","treble clef","yellow flag","beach sunflower","blue daisy","blue rose","boniato","candied grape",
				"reel weed","arabian onion","blue egyptian water lily","bok choy","cherimoya","chicory lettuce","crafted melon","dragonwort","egyptian luffa","egyptian rye",
				"elephant grass","pink flax","goatsbeard","lavender alfalfa","wild leek","narcissus flower","nile grass","nopales","pink camellia","plume thistle","popped sorghum",
				"rhode grass","royal guar","saluyot","samphire","sorghum","southern lilly","tiger nut","twisted cowpea","violet","wild hibiscus","yucca","cattail","chocolate jewel",
				"dragon bonsai","dream catcher","glow flower","jamaican coffee","juicy berries","kitsch fruit","lisianthus","magic hat flowers","reds blues whites",
				"roaring 20s peacock feather","royal strawberry","string flowers","wild dandelion","bleeding heart","blue pineapples","blue tulips","campion","crystalline wheat",
				"eastern plumeria","eggplant white","fairy rhubarbs","magic oats","mystical cantaloupe","pink cotton","pixie mushrooms","purple broccoli","purple dianthus",
				"queen sheba orchid","rainbow carrots","red glass rose","red jade vine","red rye","sandersonia flowers","sky radish","tomato blues","white chrysanthemums",
				"white dianthus","white indian pepper","white lotus","white saffron","white squills","wholesome cabbage","yellow toadstool","abroma flower","ball flower plant",
				"broad beans","crayon blossom","flaming pumpkin","gellyisa","groovy sunflower","honey pot","jamaican choco pepper","komatsuna","labor day","pancake stack","paperilla",
				"rattle weed","retro rose","salvia","spanish tomato","strawberry aperitif","strawberry pretzel","tibouchina","tricolor berry","yellow bell flower","witch apple",
				"autumn cabbage","crystal ball rose","cycads","echo shellica","falling cowpea","fat bulb onion","ghost cream","glowing mushroom","grave stonia","green camellia",
				"nightly stick seed","orange hymella","palm plant","pira pira","prickly potato","protea","pumpkin orange","purple geniola","rafflesia","red maize","red pitcher",
				"titan arum","wild justle","yellow jasmine","candy apple plant","caramel popcorn","2xs","deadened skull pops","ghost pear","halloween balloon","mummy orange",
				"poison apple","rainbow candy apple","roasted marshmellow sticks","spooky pepper","butterfly clutter","scary melon","shriveled rose","candycorn apple","candy dust",
				"jack-o-tomato","pirate loot","queen of hearts flower","school wall flower","walnut blooms","aztec corn","ghost cake pops","chrysanthemum","apple in a box","berry teether",
				"candy alphabet","clay pepper","clay poinsettia","crazy crayon","durian ball","felt rose","flower stack bee","gear daisy","gumball bloom","gummy bear","jigsaw bloom",
				"knitted grape","melon balloon","pompom dandelion","smiley orange","spinning top onion","strawberry bear","sunflower rattle","toy carrot","toy duckie","toy tulip",
				"wind spinner flower","yellow ribbon blossoms","angel raspberry","building block orange","dewberry","eggnog bottles","gingerbread bloom","gingerbread smilies",
				"holiday cherry","holy pumpkin","honeyroast chestnut","matryoshka pear","milk and cookie","pecan pinecone","pumpkin spice cake","red garlic","reindeer cups",
				"snow face onion","soup cans","tayberry","white anthuriums","bling apple","icy cake pop","cadycane blooms","cozy pumpkin","fiery jalapenos","crystal frostberry",
				"glitter pinecone","glow stick carrot","golden-green crops","heather gems","icy bloom","kasa melon","magnifying lollies","on the dot","party cracker","pinwheel daisy",
				"primrose sequin","psych rose","radiant cabbage","snowed daffodil","snowflake flower","black velvet petunia","blood root","borage","calabash","english lavender",
				"fair maid","fleur de lis","french fingerling potato","french petite plum","golden beet","good king henry","ilex berry","laurel berry","loquat","love lies bleeding",
				"ornamental cabbage","purple passion","purple queen bean","red charm peony","royal mandrake","scarlet pimpernal","tansy","velvet queen sunflower","wilderlands rosemary",
				"wild leek","wild tudor rose","baroque pumpkin","cherry canape","chinese wonton","clover and gold","dragon egg","fiery poppy","gala pinkberry","clover hats",
				"horseshoe charm","lantern meadow","love fortune cookies","lucky clover","paddy's pudding","paparazzi apple","pink pansy","rainbow shamrock","raspberry swirl","retro t.v",
				"sparkle gummy raspberries","spiked cactus","strawberry hearts","thorny rose crop","tulip bloom","amethyst eggplant","avalon wildflower","yellow pansy",
				"butterfly carnation","emerald pea","fiery berries","fiery dragon fruit","forbidden rose","frilly cabbage","gem crusted pineapple","golden king melon","hive ginger",
				"jade vine","magical bonnet","mystical lotus","peacock orchid","pearlcurrant","royal banana","royal buttercup","royal candle","royal cauliflower","ruby paprika",
				"sorcerer's lily","stained glass pansy","stardust apple","storm tomato","apple potion","ballet berries","black aztec corn","black bat flower","bunny pop","canna flowers",
				"cherry blossom bonsai","chief crop","clown broccoli","coconut ladoo flowers","dna licorice","dragon berry","watermelon earth","earthy tone corn","lavender twirl",
				"paper flower","golden popcorn carnation","hipster glow","horseshoe berries","jelly grape","lilly pilly","maraca popsicle","mitsuba","moonlit apple","parisian lavender",
				"passion cherry","peace brooch","peachy bow","pearl millet","penguin popsicle","ruby saltbush","saturn melons","sea beet","sea fingers","seashell berries",
				"sour blue raspberry","sparkly rainbow flower","spring hyacinth","strawberry kites","strawberry rose","summer savory","sunny flower","sweet red corn","viking treats",
				"vine blooms","botanica","buccaneer pumpkin","ethereal flower","exotic starfruit","floral blush","fringed tulips","glow coral","grape swirls","hooked flora","horned melon",
				"hydra bloom","kraken bloom","larval anemone","layered orchid","mystic mushrooms","oyster pearl","peacock morea","pink astilbe","pirate's prism","rainbow lotus",
				"sea rambutan","sea coral blast","sea shell mangosteen","seashell weed","sea sprout","seawave orange","seaweed sunshine","skull poppy","sparkle bubble","starfish coral",
				"teardrop lily","tiarelli","toxic apple","transparent flower","tropical blooms","whirlpool flower","xeronema lily","barrel cactus","blooming sneezeweed","ranch blue agave",
				"cactus flower","canary creeper","canola flower oil","chickpea bloom","daisy bush","desert floweret","evergreen frangipani","exotic pineapple","exotic sorghum",
				"flaming chilli","ranch flint corn","lace cactus","mist flower","pink buckeye","radiant sunflower","slicer tomato","sunglow mustard","sungold","sunshine rye",
				"terrain blossom","victoria mealy sage","wild florescence","wild poppy","wild red cabbage",


				].fixOrder();
		var basketTypes=["apple wood","walnut","orange","lemon","milk jug","wool bundle","cherry","maple syrup","manure bag","poplar wood",
			].fixOrder();
			
		var flowerTypes=[
				
				
			].fixOrder();
				
				
		//list of bushels needed per crafting cottage

		var bakeryBushels=["alfalfa","amaranth","asparagus","basil","blackberry","blueberry","broccoli","brussel sprout","butter & sugar corn","carrot","carrotcicle","cauliflower",
		"chardonnay","chickpea","coffee","cranberry","cucumber","eggplant","ghost chili","ginger","gingerbread","grape","green bean","kidney bean","licorice plant","mustard","oat",
		"okra","onion","pattypan","peanut","peas","pepper","pink rose","posole corn","potatoes","pumpkin","purple poppy","raspberry","red corn","red tulip","red wheat","rice","rye",
		"saffron","shrimp","soybean","spinach","strawberry","sugar cane","taro","tomato","wheat","white grape","zucchini"].toDefinitions("bushel_");
				
		var pubBushels=["barley","black tea","bluebell","cara potato","chardonnay","cornflower","darrow blackberry","english chip","english pea","english rose","field bean","foxglove",
		"hops","kennebec potatoes","pink aster","radish","red currant","royal hops","spring squill","turnip"].toDefinitions("bushel_");
				
		var wineryBushels=["acorn squash","artichoke","basil","blackberry","blueberry","buckwheat","carrot","celery","chardonnay","cove cranberry","cranberry","cucumber","daffodil",
		"dandelion","elderberry","frozen grapes","ghost chili","ginger","gladiolus","grape","green tea","hawaiian ginger","jalapeno","kale","kidney bean","lavender","licorice plant",
		"lilac","morning glory","oyster","pepper","peppermint","pink rose","potatoes","pumpkin","raspberry","red goji berry","red iceberry","rhubarb","rice","rye","saffron","squash",
		"strawberry","sugar cane","sunflower","tarragon","tomato","watermelon","wheat","white garlic","white grape","white rose","yellow melon","zinfandel"].toDefinitions("bushel_");
				
		var craftshopBushels=["bok choy","acorn squash","alfalfa","aloe vera","amaranth","amber grain","apple wood","apple wood basket","applewood","aqua cantaloupe","arabian onion",
		"artichokes","asparagus","auroral rosemary","avocado squash","azure corn","balloon melons","bamboo","basil","bell pepper","beryl rain flower","blackberry","blazing peppers",
		"blue glass rose","blue paradise","blueberry","bold beets","borealis blueberries","borealis rose","broccoli","brussel sprouts","buckwheat","bugloss","butterfly orchid","cabbage",
		"candy jasmine","cardoon","carrot","carrots","cassava","celery","cereses carrot","chamomile","chayote","cherry basket","cherry baskets","chickpea","chickpeas","chioggia beets",
		"clover","cocoa coffee","coffee","coil lily","coral","corn flower","cotton","cranberries","cranberry","crystal cranberries","cucumber","dandelion","daphne","dazzle apple",
		"dragonwort","eggplant","egyptian luffa","egyptian rye","elephant grass","emerald pineapple","emerald rye","fava bean","forbs","frosted poinsettia","fuchsia bougainvillea",
		"ghost chili","ginger","glass candle","glass candycane","glass icicle","glass pinwheel","golden emeralds","golden oregano","golden poppies","golden poppy","goldenrod flower",
		"gooseberries","grape","green bean","green beans","green tea","heliconia","highbush blueberry","holiday stained glass","hollybright berries","honeyberry","jade spiralis",
		"jalapeno","jicama","jungle puffs","kale","kidney bean","kindle onion","kudzu","lavender","lavender alfalfa","leek","lemon basket","lemon baskets","lemons","lentil",
		"licorice plant","lilac","lily","lima bean","lucky marshmallow","luminous ginger","maize","manure bag","manure bags","maple syrup basket","maple syrup baskets","marsh melon",
		"milk jug","milk jugs","mini eggplant","moon flower","moonlit misletoe","morning glory","munchkin flower","mustard","narcissus flower","nile grass","nutmeg","nymph morel","oat",
		"oats","orange basket","orange baskets","orange bell pepper","parsnip","pattypan","pattypan squash","peanut","peanuts","pepper","peruvian lily","pineapple","pink camellia",
		"pink flax","pink rose","pinot noir grape","pointed pinks","popcorn","popped sorghum","pumpkin","purple anthurium","purple asparagus","purple dahlias","purple orchid",
		"purple potato","purple tulip","rainbow stars","raspberry","red currant","red poppy","red radish","red tulip","rhode grass","rhubarb","ribbon daisy","rice","roasting chestnuts",
		"roman candle cauliflower","royal guar","rye","saffron","saffron crocus","saluyot","santaberries","sea lavender","sea sponge","seaglass wheat","seasonal spirits","semillon grape",
		"shellfish","shiny sprouts","shiraz grape","shooting star","silvery squash","sol chickpeas","sorghum","southern lilly","soybean","space dust sugarcane","spark wheat","spinach",
		"squash","squash blossom","star puff cotton","strawberry","sugar cane","sugar n sprites","sugarcane","sun fade barley","sunflower","swirling blue fern","tomato","twisted cowpea",
		"viola","violet","violet vein spinach","walking iris","walnut basket","walnut baskets","wheat","whirling buds","white carnation","white garlic","white nectarine","wild alfalfa",
		"wild leek","winter turnip","wool bundles","yellow brick beets","yellow daffodil","yellow freesia","autumn cabbage","cycads","fat bulb onion","glowing mushroom",
		"nightly stick seed","palm plant","pira pira","prickly potato","protea","purple geniola","wild justle","yellow jasmine"].toDefinitions("bushel_");
			
		var craftshopleBushels=["amethyst grape","blackberry","blue dragon fruit","cranberry","diamond corn","forget me not","mushroom fairy","nutmeg","pumpkin","purple anthurium",
		"red tulip","rose berry","sunset lychees","tomato"].toDefinitions("bushel_");
			
		var spaBushels=["aloe vera","ballet queen flower","basil","begonia","blackberry","blueberry","coffee","columbine","cotton","cranberry","cucumber","daffodil","daylily","dill",
		"double pikake","flax","ghost chili","gilded flower","ginger","gingerbread","gladiolus","green tea","iris","kelp","lavender","lemon balm","lentil","lilac","lily","mint candy",
		"morning glory","orange marigold","pepper","peppermint","pink bow","pink rose","pumpkin","purple poppy","rainbow","raspberry","red tulip","strawberry","sunflower",
		"yellow marigold","zinfandel"].toDefinitions("bushel_");
				
		var restrauntBushels=["basil","black tea","butter & sugar corn","cape peppercorn","cauliflower","chandler blueberry","clam","cove cranberry","darrow blackberry","daylily",
		"dill","field bean","green tea","hay","hops","kennebec potatoes","lady slipper","leek","lobster","pepper","peppermint","pineapple","pumpkin","raspberry","red clover","red currant",
		"rhubarb","rye","seafood","strawberry","tarragon","tomato","watermelon","wheat","white grape"].toDefinitions("bushel_");
				
		var sweetshoppeBushels=["blackberry","blueberry","candied yam","cantaloupe","carrotcicle","chickpea","coffee","cranberry","frozen grapes","gingerbread","glacial rose","gummi bear",
		"holly","iceberg lettuce","iced rice","leek","mint candy","pattypan","peanut","pumpkin","red iceberry","rye","snow tulip","sugar cane","sunflower","watermelon","wheat"].toDefinitions("bushel_");
				
		var tikibarBushels=["bell pepper","blueberry","carrot","chickpea","coffee","cranberry","double pikake","golden sugar cane","hawaiian ginger","hawaiian orchid","hilo pineapple",
		"jalapeno","kelp","kona coffee","leek","lemon balm","lilikoi","mussel","onion","ono","oyster","pepper","red pineapple","rice","rock crab","shrimp","soybean","spinach","strawberry",
		"sugar cane","taro","tomato","wheat","white grape","yam","yellow hibiscus","yellowfin tuna"].toDefinitions("bushel_");
				
		var teagardenBushels=["azuki","baby carrot","baby corn","basil","bok choy","cabbage","chinese cotton","chinese daikon","coffee","dragon sparklers","edamame","eggplant","ginger",
		"green onion","green tea","grouper","hamachi","imperial tea","jade bamboo","jade peanut","jalapeno","lemongrass","lotus","lowland ginger","millet","nori","pepper","prawns","rice",
		"rye","saba","scallop","sesame","sichuan pepper","soybean","squid","sticky rice","sugar cane","unagi","wasabi","wheat","white cloud tea"].toDefinitions("bushel_");
				
		var potionshopBushels=["aloe vera","bell pepper","blackberry","blueberry","candied corn","coffee","franken fruit","ghoul garlic","grape","green toadstool","jack o'lantern",
		"jalapeno","lavender","phantom frond","raspberry","red tulip","rye","sage","spectre berries","sugar cane","sunflower","tomato","tombstone","wheat","wormwood","zombie"].toDefinitions("bushel_");
				
		var patisserieBushels=["bell pepper","blackberry","blueberry","choco mint","cider apple","coffee","cranberry","flint corn","frost holly","holiday cactus","holiday poinsettia",
		"hollowberry","honey ginger","jalapeno","jingleberry","lavender","light orchid","peanut","peppermint","potatornament","red tulip","rudolf radish","rye","sugar cane","sunflower",
		"tomato","wax beans","white cranberry","winter grain","winter squash"].toDefinitions("bushel_");
			
		var fairykitchenBushels=["amber grain","ambrosia tulip","boggart bulb","butterfly rose","coffee","dark dahlia","dream cotton","elfin tea","fairy foxglove","fairyscotch",
		"goblin vine","golden poppy","gossamer ivy","grape","honey melon","lilac","nectarkin","nymph morel","onion","pixieberry","purple poppy","raspberry","red tulip","rhubarb","rice",
		"rye","sugar cane","sunflower","wheat","white grape"].toDefinitions("bushel_");
				
		var coralcafeBushels=["ambrosia","aquamarine rose","blackberry","blueberry","bubble bean","carrot","carrot gold","coffee","coral","golden poppy","grape","jellyfruit","lava lotus",
		"lilac","manta mushroom","mint candy","onion","pepper","pineapple","pirate potato","plankton","red tulip","rhubarb","rice","rye","salty squash","sea cucumber","sea sponge",
		"seawatermelon","seaweed","shellfish","strawberry","sugarcane","sunflower","triton turnip","urchinberrry","wheat","white grape"].toDefinitions("bushel_");
		
		var aussiewineryBushels=["australian barley bushel","red sorghum bushel","wheat bushel","australian wheat bushel","blackberry bushel","kutjera tomato",
		"ghost chili","field peas","sweet corn","pumpkin","canola","kangaroo paws","soybean","yellow lupin","cucumber","australian cotton","shiraz grape","cotton",
		"okra","muntires","semillon grape","pattypan","grape","white grape","sunflower","fava beans","lettuce","pepper","lillipilli","rice","aussie purple pepper",
		"carrot","australian pineapple","raspberry","australian sugar cane","strawberry","yellow myrtle flower","peppermint"].toDefinitions("bushel_");

		var crystalcottageBushels=["dazzlers","flava corn","milky strawberries","moon mischief","myne melon","ooval tomato","pod peas","ruzberries","shard skin onions",
		"solar flare bean","space dust sugar cane","star puff cotton","sun dipped pepper","sun fade barley","sun fingers","thuck wheat","turni carrot","violet vein spinach",
		"white dwarf sunflower"].toDefinitions("bushel_");
		
		var sugarshackBushels=["lotus mint","sugar rose","sprinkle strawberry","whoopie thistle","gummy bud","sugarbell","marsh melon","cookie petals",
		"candy jasmine","drop lemons","gumball poppy","gumdrop daisy","buterscotch blossom","licorice vine","snapjelly","pineapple","sunflower","jellyanthemum",
		"golden poppy","grape","strawberry","sweet tea cups","lollipop twist","white grape","coffee","red tulip","blueberry","rhubarb","blackberry","lilac","rye",
		"wheat","sugarbell","long stem cupcake","rice","carrot","sugar cane",].toDefinitions("bushel_");
		
		var alchemistshopBushels=["aslant carrot","blakk root","bright stalk","brusen berry","burdock","dragon vine","dusk turnip","fairy blossom","firelight mushroom",
		"flaxen strawberry","goldenseal","kalanchoe","obal pumpkin","pericarp potato","twilight cups","violet allium","wan raspberry","whytea leaves","yellow dock",
		"zaffre oats"].toDefinitions("bushel_");
		
		var sparklecafeBushels=["auroral corn","auroral rosemary","blackberry","blazing peppers","blueberry","borealis blueberries","candle light cranberries","carrot",
		"cinnabursts","coffee","golden poppy","grape","hollybright poinsettia","hollybright snow peas","kindle onions","lilac","luminous ginger","peppermint","pineapple",
		"pineapple","radiant radish","red tulip","rhubarb","rice","roasting chestnuts","roman candle cauliflower","rye","santaberries","seasonal spirits","shiny sprouts",
		"sleigh guider cherries","strawberry","strawberry","sugar cane","sugar n' sprites","sunflower","wheat","white grape"].toDefinitions("bushel_");
		
		var herbalhutBushels=["avocado squash","bromeliad","emerald pineapple","butterfly orchid","cassava","chaya spinach","chayote","cocoa coffee","eclipse sunflower","golden wheat",
		"heliconia","jicama","jungle blackberry","maize","prickly pear","tomatillo","turquoise puya","vanilla vine","volcano chili pepper","wild pinto bean"].toDefinitions("bushel_");
		
		var porcelainshopBushels=["azure corn","balloon melons","bitty blue tomatoes","bubble glass","coil lily","crystal cranberries","emerald rye","glass strawberries","jade spiralis",
		"mini eggplant","munchkin flower","purple dahlias","red poppy","ribbon daisy","squash blossom","swirling blue fern","unfolding plumeria","whirling buds","yellow brick beets",
		"yellow rhubarb"].toDefinitions("bushel_");
		
		var blueseacafeBushels=["aqua cantaloupe","blue glass rose","brush olive","bugloss","cardoon","chioggia beets","daphne","flamenco anemone","freckled white grape","fuchsia bougainvillea",
		"golden oregano","lima bean","lowland pistachios","orange bell pepper","pinot noir grape","saffron crocus","san marzano tomato","sea lavender","seaglass wheat","sol chickpeas"].toDefinitions("bushel_");
		
		var cairoboutiqueBushels=["arabian onion","bok choy","chicory lettuce","dragonwort","egyptian luffa","egyptian rye","elephant grass","lavender alfalfa","narcissus flower",
		"nile grass","pink camellia","pink flax","popped sorghum","rhode grass","royal guar","saluyot","southern lilly","twisted cowpea","violet","wild leek"].toDefinitions("bushel_");
		
		var fairyforumBushels=["bleeding heart","blue pineapples","campion","eastern plumeria","eggplant white","fairy rhubarbs","magic oats","mystical cantaloupe","pixie mushrooms",
		"purple dianthus","queen sheba orchid","rainbow carrots","red jade vine","sandersonia flowers","sky radish","tomato blues","white dianthus","white saffron","white squills",
		"yellow toadstool"].toDefinitions("bushel_");
		
		var witcherhutBushels=["autumn cabbage","cycads","echo shellica","falling cowpea","fat bulb onion","ghost cream","glowing mushroom","green camellia","nightly stick seed",
		"orange hymella","palm plant","pira pira","prickly potato","protea","pumpkin orange","purple geniola","red maize","red pitcher","titan arum","wild justle",
		"yellow jasmine"].toDefinitions("bushel_");
		
		var foodvanBushels=["apple in a box","berry teether","candy alphabet","clay pepper","clay poinsettia","crazy crayon","durian ball","felt rose","flower stack bee","gear daisy",
		"gumball bloom","gummy bear","jigsaw bloom","knitted grape","smiley orange","strawberry bear","toy carrot","toy duckie","toy tulip","wind spinner flower"].toDefinitions("bushel_");
		
		var glassblowerBushels=["black velvet petunia","blood root","borage","english lavender","fair maid","fluer de lis","french fingerling potato","french petite plum","golden beet",
		"good king henry","ilex berry","laurel berry","loquat","love lies bleeding","ornamental cabbage","purple passion","purple queen bean","royal mandrake","scarlet pimpernal","tansy",
		"wild leek"].toDefinitions("bushel_");
		
		var potionsworkshopBushels=["amethyst eggplant","avalon wildflower","butterfly carnation","emerald pea","fiery dragon fruit","frilly cabbage","gem crusted pineapple",
		"golden king melon","jade vine","magical bonnet","mystical lotus","peacock orchid","pearlcurrant","royal banana","royal buttercup","royal candle","royal cauliflower",
		"sorcerer's lily","stained glass pansy","stardust apple","storm tomato"].toDefinitions("bushel_");





		//this array used to clear highlights
		var allCraftBushels=[].concat(bakeryBushels,pubBushels,wineryBushels,craftshopBushels,craftshopleBushels,spaBushels,restrauntBushels,sweetshoppeBushels,tikibarBushels,
		teagardenBushels,potionshopBushels,patisserieBushels,fairykitchenBushels,coralcafeBushels,aussiewineryBushels,crystalcottageBushels,sugarshackBushels,alchemistshopBushels,
		sparklecafeBushels,herbalhutBushels,porcelainshopBushels,blueseacafeBushels,cairoboutiqueBushels,fairyforumBushels,witcherhutBushels,foodvanBushels,potionsworkshopBushels,glassblowerBushels);
		
		//Crafting cottage items
		//define separately for easy options menu
		var craftPub=["barley crumpet","blackberry juice","chardonnay preserves","fish and chips","floral scone","foxes ale","health drink","lionhead energy drink","oliviaberry juice",
		"potato soup","red currant trifle","rosehip tea","turnip stew"];
		
		var craftWinery=["artichoke spirit","blackberry wine","blueberry wine","chardonnay wine","cranberry cooler","cucumber wine","daffodil spirits","daiquiri","dry sake","fruit wine",
		"garlic vinegar","goji berry wine","herbal elixir","ice wine","island ginger beer","melon juice","oyster shot","pumpkin vinegar","raspberry wine","red table wine","root beer",
		"rosepetal water","saffron brandy","spicy tomato juice","strawberry-cranberry juice","sweet and spicy liqueur","sweet sake","tarragon vinegar","vita drink","white sangria",
		"zinfandel grape juice"];

		var craftSpa=["aged spice cologne","begonia sachet","calming bodywash","daffodil lotion","daylily perfume","devotion perfume","dill candle","dreamy scented oil",
		"energizing lotion","farmer's frenzy","floral perfume","flower lei","fresh sachet","gilded bouquet","gingerbread candle","herbal lotion","iris soap","lily bath bomb",
		"lily of the valley soap","marigold lotion","marigold soap","meditation candle","mint lotion","organic gift basket","organic plush pillow","petal sachet","pick me up sachet",
		"rejuvenating mask","relaxation oil","restoring candle","seaweed soap","transcendent candle","zinfandel sachet"];		

		var craftBakery=["baked cucumber","berry burst pie","black licorice","carrot cake","cauliflower gratin","chardonnay frosted cake","chili muffin","cornbread","egg bread",
		"ginger pumpkin pie","ginger snap","gingerbread cake","hot oat muffin","ice cream carrot cake","mocha blackberry cake","oatmeal cookie","organic bruschetta",
		"organic eggplant curry","organic mixed veggie salad","organic pea pudding","organic quiche","organic stem latkes","organic very berry gelatin","patty pan tart",
		"peanut butter cook","pizza bread","potato onion bread","pumpkin bread","rascal cookie","raspberry blondie","rose macaroon","saffron falafel","shrimp toast","spicy muffin",
		"strawberry licorice cupcake","strawberry shortcake","triple berry pie","vegetable tart","verdant tart","zucchini muffin"];
				
		var craftRestraunt=["baked beans","black raspberry wine","blackberry ice cream","boiled dinner","cheddar cheese","clam chowder","cove cooler","cove fries",
		"cranberry-pineapple relish","cream pie","creamed corn","dill potato skin","fruit cider","jonny cake","lobster roll","new england lager","rollieberry pie","wild blueberry pie"];

		var craftSweetShoppe=["candied apple","candied yam pie","ginger s'more","elf surprise","holly wreath","peanut brittle","peppermint fudge","rock candy","candy cane","lollipop",
		"frozen fruit tart","fruit cake","healthy donut","gingerbread house","ice cream sundae","orange taffy","sorbet"];
				
		var craftTikiBar=["inamona","poi","seaweed soup","pineapple sunrise","red pineapple","shave ice","steamed crab","sweet and sour shrimp","coffee & cream","grilled ono",
		"mussel poke","plantation iced tea","hilo gumbo","island fried rice","island punch","luau cooler","pineapple hash","taro croquette","hawaiian kabob","pineapple daiquiri",
		"shrimp salad","yam fries"];
				
		var	craftTeaGarden=["bao","bibimbap","chow mein","congee","egg roll","egg tart","firework flambe","fried rice","hamachi maki","hot and sour eggplant","ikura nigiri","kimchi",
		"kimchi pancake","milk tea","moon cake","onigiri","oolong tea","pho soup","portuguese rice","takoyaki","thai tea","tom yum soup","vietnamese iced coffee"];
				
		var craftPotionShop=["nightshade sherbet","pumpkin pie","witch''s brew","cauldron stew","crystal cocktail","invisibility potion","fire brew","lucky charm","stink bomb",
		"vampire venom","viscous vitality","werewolf bane","bottled spirit","candied corncob","sleeping smoothie"];
				
		var craftMistletoeLane=["apple cider","holiday pudding","benne cake","holiday fudge","hot mint chocolate","holiday cookies","holiday stew","potato latke","hollow berry pie",
		"winter casserole","holiday nog","blackberry champagne","gingerbread house","snickerdoodle","corn relish","jingleberry ice cream","cranberry turtle bar"];
				
		var craftFairyKitchen=["ambrosia","bog stew","boggart bread","dahlia drops","dream cookie","elfin chocolate","fairy wedding cake","foxglove turnover","goblin wine","gossamer pie",
		"honey cream","midsummer tea","nectar licorice","pixieberry crumpet","pixieberry scones","queens delight","rose cake"];
		
		var craftCoralCafe=["shellfish surprise","sea biscuit","salt water taffy","sea melon sorbet","coral cake","lava nachos",
		"plankton smoothie","jellyfish jam","seaweed souffle","urchinberry pie","sea spongecake","7 leagues bean dip","sea rock candy",
		"sea cucumber salad","triton turnover","oxy juice","treasure tots","iceberg salad","lava tart","seasickles"];
		
		var craftSugarShack=["amazing mocha shake","angel's halos","buttercream bliss","cherry chocolates","chocolate chip pancakes","delicate ambrosia",
		"frosted jelly doodles","funfetti cake","gummy bear pudding","impossible vanilla fudge","licorice mocha cream","lollidrop cake","mini baked alaska",
		"smores","sprinkle splosions","stunning english trifle","taffylicious pie","toasted cream magic","whoopie pie"];
		
		var craftAlchemistShop=["balm of the fairy","basilisk oil","brouha brew","brownie bait","daze of mushroom","dragon","dragon's brawn","element elixir",
		"golem stone","lucky tonic","philosopher","philosopher's stone","phoenix feather charm","pixie pipes","plentiful potion","roc remedy","root powder",
		"saving salve","siren song","sun stone","tanuki thistle","wyrm water"];
		
		var craftHerbalHut=["atole","chocolatle","cleansing cream","corn tortillas","cure-all","energy elixir","exotic perfume","fiery salsa","floral incense","jungle tonic",
		"pico guacamole","pozole","rejuvenation lotion","scented balm","soothing gel","spiced fruit cubes","sunflower oil","tejate","vanilla candle"];
		
		var craftPorcelainShop=["assorted macaroons","berry tart","emerald tea set","flower box","flower pot tea","frosted scones","fruit cake slice","petal tea cup","pink tea cakes",
		"poppy cupcake","red bubble tea","rhubarb pink lemonade","roasted veggie salad","sleeping sachet","square slices","strawberry crumpets","strawberry munchkin cake",
		"triangle sandwiches","wild flower bouquet","wonderful berry jam"];
		
		var craftBlueSeaCafe=["baklava tarts","burgundy wine","chickpea risotto","chocolate drizzle cannoli","espresso","frosted zeppoles","greek yogurt cantaloupe","leche frita",
		"lemon ricotta cookies","lentil soup","loukoumades","olive bread","pasta salad","pistachio gelato","roasted pepper hummus","spanish sherry","strawberry carrot pop",
		"stuffed peppers","tiramisu slice","turron","zesty biscotti"];
		
		var craftCairoBoutique=["adorned table","arabian lantern","arabian ruby slippers","assorted candles","beaded basket","beaded wristlet","carved dividers","curvy chair",
		"egyptian mask","egyptian throne","elaborate parchment","embellished mirror","enamel choker","enchanting tea set","flying carpet","genie bottle","jewel chest","peacock crown",
		"silk pillows","silk settee"];
		
		var craftFairyForum=["broomster - x2","cream horns","eastern treasure chest","fairy hat","flower wings","forest throne","garden tiara","herbal salve","kaliedoscope",
		"lucky bracelet","magic canteen","maidens wig","mystical thread spool","pixie necklace","potion of fervor","respite cola","skates of swiftness","summer scarf","tiny gloves",
		"tome of treasures"];
		
		var craftWitcherHut=["bat wings","bats tiara","bravery salve","dust of courage","ghost costume","halloween chest","halloween gloves","halloween necklace","jewelled spyglass",
		"lost book of tales","pumpkin cookies","red jack-o-lantern","scare potion","scary wig","skeletal chair","spider cake","spooky bracelet","trick or treat hat","winter broth",
		"winter corset"];
		
		var craftFoodVan=["banana waffle","breakfast donuts","carrot cupcake","cherry cheesecake","cinnamon pumpkin pie","clay taco","duckie cookie","fresh farm pizza","fresh fruit tart",
		"frilly cupcakes","garden sandwich","ice cream sugar cone","ice cream sundae","ice-lollies","princess cake","pumpkin pancake","strawberry jelly roll","tea party cookies",
		"whipped cream fruit roll","yum cheese burger"];
		
		var craftGlassBlower=["bejeweled glass tankard","blue blossom goblet","cone beaker","cruet set","dragon glass pendant","emerald ewer","fruit bowl","gilded hour glass",
		"gilded pitcher","glass and gold vase","glass bead earring","glass bead necklace","glass butterfly","glass hair pin","hallway lantern","iridescent ornament","ornate decanter",
		"palm cup","perfume bottle","wedding flute set"];
		
		var craftPotionsWorkshop=["antidote of mishap","back to life magic potion","energy potion","essence of dreams potion","fairy magic potion","healing potion","hovering potion",
		"knighthood potion","mega dragon potion","moon dust potion","morphosis potion","nightmare potion","past life spell potion","potion of love","potion of memories","potion of riddle",
		"sleep spell potion","sun dust potion","truth serum","wishful thinking potion"];




		//I dont know if the craftshop does or will ever actually share an item, but if it does, add them here.
		var craftShop=["2 fuel can","anchors basket","anchors chest","anchors crate","animal feed","ankhs bucket","ankhs bucket ","ankhs chest","ankhs crate","apple red harvester",
		"apple red seeder","arborists","asian pavillion","aussie wine barrel","backyard cottage","bamboo mat","basket of anchors  ","bedrock","big red button","bird toy","bottle",
		"brick","bright yellow tractor","bubble potion","canned food","carved gold","chalk menu","chest of anchors  ","chocolate cup","clock hands","coffee thermos","coiled rope",
		"cooking salt","copper tube","coral shears","crate","crate of anchors  ","cupcake dog treat","cut bamboo","dainty fence","delicate cottage","diamond nail","dog treat","drill bit",
		"drill tool","dry food","duckula coffin","emerald glue","emerald log","enchanted mist","engraved stone","evergreen cedar beam","fairy combine","fairy magic","fall garden shed",
		"farmhands","fawn feed","fence posts","fertile soil","fertilize all","fishing lure","fishing pole","flower drink","flowerpress book","flowery archway","forest campsite","freezer",
		"fuel can","fuel pipe","garden sketches","gargoyle","gate","geode","glow nail","gold bar","grape food","grape vines","grass bed","greco vases","hair dryer","holly light fence",
		"holly trough","horse blankets ","horse hurdle","horse jumps","hyper speed thruster","ice horse sculpture","ice pig sculpture","iron ornate fence","ladder","lamp post",
		"large crowbar","large fishing net ","leaf awning","leaf blower","level gauger","library","lily pad","love potion","lucky penny","magic dust","magic mushrooms","magma",
		"marble vase","mineral infusion","mini glass house","mithril ore","mortar knife","munchkin hats bucket","munchkin hats chest","munchkin hats crate","mystery game dart",
		"nail","nature guide","net hammock","outdoor cafe","pickaxe","pig chow","pipe","poolhouse plans","portal window","pot","purple canvas","rainbow stardust","rake","ranch fence",
		"red brick","rope","rose trellis","salt licks","shovel set","shrub","silver sugar shovel","small crowbar","small fishing net","sparkle lights bucket ","sparkle lights chest ",
		"sparkle lights crate ","sparkle seed","sparkle spackle","special delivery box","sporty dog treat","star chart","star dust","star rock","stardust","stardust gate","steam",
		"steel sheet","stone benches","stone cottage","storage crates","straw beds","sturdy dog treat","summer sun","sunburst clouds","sunrise seeds","sunshine dog treat","swimmies",
		"swiss manor","telescope","tent poles","torch","treat","trough","twinkle mortar","vehicle part","vial of sunlight","vine rope","warp stone","water pail","watering can","window",
		"wine barrel","wish","wood beam","wooden board","yellow brick"].fixOrder();

		var craftUnidentified=["feather fence","frog prince cow","headdress pony","magic feather tree","rainbow butterfly pegacorn"];

		//merge craft types for searching
		var craftTypes=[].concat(craftBakery,craftSpa,craftWinery,craftPub,craftShop,craftRestraunt,craftSweetShoppe,craftTikiBar,craftTeaGarden,craftPotionShop,craftMistletoeLane,craftFairyKitchen,craftUnidentified,
		craftCoralCafe,craftSugarShack,craftAlchemistShop,craftHerbalHut,craftPorcelainShop,craftBlueSeaCafe,craftCairoBoutique,craftFairyForum,craftWitcherHut,craftFoodVan,
		craftPotionsWorkshop,craftGlassBlower);	
		
		//only those crops that can provide crossbred seeds
		var seedTypes=["amber carrot","bat berry","black rose","blue bean","bluebonnet","champagne mushroom","cherry blossom","chocolate jewel","cilantro","clock spire stalks",
		"double grain","dragon flower","espresso cup","fire pepper","flame pepper","floating flower","french tarragon","ghost pumpkin","ginger peanuts","grass widow","honey suckle",
		"iris rainbow","ivy","lilac daffy","long onion","lovebird lilies","marjoram","meteorite shard","night cereus","oregano","ottomelon","parsley","peace flower","pitcher plant",
		"poinsettia","purple orchid","purple tomato","red spinach","rosemary","sakura tea","scarlet sunflower","sorrel","spa daisy","spiral flower","spring roses","squmpkin","straspberry",
		"sun poppy","sundae cup","sundew plant","sunshine","thai basil","thyme","walking iris","whisky peat","pancake stack","strawberry pretzel","nightly stick seed","poison apple",
		"pirate loot","eggnog bottles","pumpkin spice cake","soup cans","cadycane blooms","party cracker","cherry canape","clover hats","cherry blossom bonsai","festset pumpkin",
		"saturn melons",
].fixOrder();

		//only those crops that can be of the supercrop status
		var superCrops=["aloe","avocado","banana blossom","blackberries","blueberry","bromeliad","butterfly orchid","cabbage","candied yams","cassava","chandler blueberry","chaya spinach",
		"chayote","cocoa coffee","cotton","cranberry","daylily","eclipse sunflower","emerald pineapple","gingerbread","golden wheat","grape","green tea","gummi bear","haypackage",
		"heliconia","hops","jicama","jungle blackberry","kennebec potatoes","lady slipper","lilac","maize","morning glory","pattypan squash","peanuts","peas","pepper","pineapple",
		"pink aster","pink rose","potatoes","prickly pear","pumpkin","raspberry","rice","snow tulip","strawberry","sunflower","tomatillo","tomato","turquoise puya","vanilla vine",
		"volcano chili pepper","watermelon","wheat","white grape","wild pinto bean","yellow melon"].fixOrder();

		//merge all crop types for actual searches
		//do not merge with seedTypes and superCrops as they are searched for differently
		var bushelTypes=[].concat(fruitTypes,basketTypes).fixOrder();

		//trees
		var treeTypes=["frosted butterfly","rainbow cupcake","beds on a pea","baroque pattern","antique lamp","bibliotree","casino burst","goose","woodpecker","accordian","acorn","african tulip","alma fig","amherstia","amur maple","anchor","ancient twist","angel","angel red pomegranate","anti love heart",
		"apothecary jars","arabic gold coin","argile print","armillary sundial","arrow","art deco radio","ash","austrian hat","autumn ginkgo","award","awarra","baby's breath",
		"bahri date","balcony","ball drop","ballet cake","ballet tiara","balloon animals","banyan","baobab","bass clef","bat wing","bat wing coral","bay laurel","beehive","beet",
		"beignets","bird cherry","bitternut hickory","black elderberry","black leather heart","black locust","black pumpkin","blackforest","blackthorn","blood orange","blue bell",
		"blue cloud","blue rose","bombshell","boogie board","bradford pear","breadnut","breakfast in bed","broom","broomstick","bubble bath","bubble flower","bubble gum","buried treasure",
		"bursted bubble","cake pop","calaveritas","california redbud","candelabra","candle nut","candy charms","card trick","carob","cat topiary","ceiba","celtic","celtic wings",
		"chain ribbon","chainfruit cholla","chamomile cluster","chanee durian","chaste","chemistry lab","chickasaw plum","chicle","chinese lantern","chinese strawberry","chinese tamarisk",
		"choco macadamia","chocoberries","chocolate factory","christmas list","chrome cherry","cinnamon roll","cistena plum","citrus wreath","city parrots","clockwork heart","clove spice",
		"colorful teacup","comet","conch shell","corinthian peach","cork oak","crab apple","crack willow","cran jelly","crazy pattern","crimson cloud hawthorn","crown jewel",
		"crystal banana","crystaline toadstool","cuban banana","cube","cubist","curtain call","dahurian birch","daisy","dark dogwood","date palm","dawn eucalyptus","deco sunburst",
		"deep yellow wood","dewdrop flower","dewdrops web","diner sign","disco ball","donut","donuts","downy birch","dragon's blood","drive in","dusk","dwarf almond","dwarf orchid",
		"earth pattern","easter apples","easter basket","edelweiss","elberta peach","embroidery","empress","english oak","european aspen","european beech","european pear",
		"fairy bell flower","fairy lantern","fairy plum","fall flowers","falling leaves","falling streamers","fancy egg shell","fang","feast","fire & ice","fire & ice rose",
		"fire green apple","flaming heart","flippers","floral print","flower heart","fluorescent light bulb","foggy skyline","foxtail palm","french press","frosty bell","galaxy",
		"gargoyle","garlic","gerber","ghostly banana","glacier buttercup","gladiolus","glass buttefly","glass slipper","glitter microphone","glitter plum","glowing tulip","glowy",
		"goat","gold & silver pear","gold medal","gold thread","gold tinsel","golden apricot","golden bell","golden malayan coconut","golden plum","golden starfruit","goldenchain",
		"goldenrain","gordonia","gramaphone","granny smith apple","grayscale","green chili","hair comb","halloween","halloween glass","hand dyed","handmade card","hardy kiwi",
		"hass avocado","hat box","hawaiian cherry","hazelnut","headdress","heart candle","heart candy","heart shape","heart shaped mom","hearts & clouds","hearts & stars",
		"holiday cupcake","holiday teddy","hollywood premier","farmville sign","honeyberry","hot cross buns","humpty dumpty","i heart ny pear","i love you","ice crystal",
		"ice skating dress","iceberg","iced tea & cocoa","igloo","indian laurel","irish top hat","jaca","jacks","jade bamboo","japanese angelica",
		"japanese maple","japanese persimmon","japanese privet","japanese snowbell","japanese teapot","jester","juke box","kalamata olive","key lime","keyboard",
		"kilimarnock willow","kite ribbon","kwanzan cherry","la rosa","leo zodiac","liberty torch","lightning bug","local veggies","lombardy poplar","longan","love bird","love sundae",
		"lovestruck","macrame","magic beanstalk","magic carpet","magic feather","magic lamp","magic wand","magical sugar maple","manila mango","marbles","mardi gras queen","mars",
		"marula","match stick","melaleuca","merchant scales","midland hawthorn","mimosa silk","mint candy","mint gumball","miss muffet","mission olive","mixed nut","mobile",
		"mom's gift basket","mom's makeover","monkey tea","monster puff","monterey cypress","montmorency cherry","moon","moonlit bridge","moth orchid","mother earth","mountain ebony",
		"mountain silverbell","mummy","music box","musical ballet","mylar unicorn balloon","mystic water","mystic wave","nautical star","needle & thread","neon palm","noisemaker",
		"northern catalpa","nosey nose","nutcake","oak","octopus","ohia","ohia ai","oklahoma redbud","old vine","oleander","open simsim","organic berries","ornament","ornament ii",
		"oyama magnolia","pacific madrone","pagoda dogwood","paint brush","panda toy","paper bag","paper flower","paperbark maple","parisian sunset","pastel egg","patchouli","paw print",
		"peach palm","peacock feathers","pecan pie","perfume","perfume bottle","persian pattern","picholine olive","pie","pie face","pin oak","pink camellia","pink dogwood",
		"pink magnolia","pink plum","pink rose","pink smoke","pink trumpet","pinwheel bow","pistachio","pixie","pizza pie","pocket watch","poison apple","pom pom","pom poms",
		"ponderosa lemon","pop art","pumpkin cake","pumpkin carriage","purple glitter palm","purple hanging flower","purple holiday","purple ivy","purple magnolia","purple tulip",
		"quaking aspen","quill pen & parchment","radiant sun","radio city","rainbow butterfly ii","rainbow harp","rainbow ribbon","rainbow snowflake","rainier cherry","recycle",
		"red alder","red horse chestnut","red light","red mulga","red pine","red rocket crape","retro shamrock","ribbon","riberry","rock candy","rope light","roses & hearts",
		"royal cape","royal crystal","royal poinciana","rubber","ruby guava","russian egg","rusted chrome heart","samovar","sandbox","sandstorm","sartre guava","saucer magnolia",
		"saxophone","scarlet buckeye","scepter","school supplies","schreink's spruce","scorpio zodiac","secret garden","shagbark hickory","shinko pear","shipwreck","shopping spree",
		"silent film","silk diamond","silver & jewels","silver bangles","silver maple","silver orange","singapore jackfruit","snow lights","snowball & fireball","snowman","soda jerk",
		"southwestern chitalpa","sparkling ruby ring","sparkling snowball","speckled alder","spiral rainbow","spirit","spring bonnet","spring cleaning","spring moss","spring wildflowers",
		"squash","st basil's cathedral","stacking rings","stage lights","staircase","star","star balloon","star ruby grapefruit","starlite","stone pine","stormy cloud","sugar apple",
		"sun","sunflower","sunrise","swans","sweet gum","sweet tooth","swirl heart","swirl mint","swiss chocolate","tachibana","tea & crumpet","tempskya","thorned heart","throne",
		"times sq.","tonto crape","topiary","toy doh","toy nut","tped","treasure chest","treasure map","tres leches","triangle print","tulip","tung oil","tv dinner","twinkle twinkle",
		"umbrella bamboo","umbrella pine","venetian chandelier","vera wood","vintage patchwork","vintage skate","vinyl 45s","vitex","voodoo doll","walk of fame","water balloon",
		"water crystal","water droplet","weeping birch","western red cedar","white cedar","white pine","white plumeria","white walnut","white weeping cherry","white wisteria",
		"whoopie cushion","wild cashew","wild service","willamsonia","winter spruce","winter squash","wych elm","x-ray","yellow hibiscus","yellow magnolia","yellow passion fruit",
		"yellow plumeria","yellow rowan","yellow watermelon","zebra","twisted lavender redbud","sabal palm","desert bloodwood","wine cask","roller coaster","bradford pear",
		"bubble blowing","buttons n beads","cap and gown","chowder bowl","cologne bottle","dad's desk","electric bubble","fishing gear","gardening tools","harvest heart","hydra","locker",
		"pink magnolia","mosaic","pruning shears","radioactive","redwood majestic","sparkling twilight","spring dress pattern","spring wedding cake","sunset skyline","surrealist","threes",
		"trim topiary","unrippened fruit","venus flytrap","wedding parasol","white lace promises","sommelier","chinese rain","hot air balloon","paper mache","iced mint mocha","cali bridge",
		"slice of cake","cherry cheese danish","birthday cake stand","sugar cubes","party favors","pinata fun","party hats","bearhug","carrot monster","percolator",
		"pinata","scales","spotted","streamers","george washington cherry","buckets of paint","mom's apple pie","rainbow cupcake tiered","magic dutch tulip",
		"whispy rainbow willow","coming attraction","glowing banana","rainbow burst","mayan calendar","jar candy","rainbow fairy","rainbow flag","gelly fruit",
		"colliding galaxy","firefly jar","handmade jewelry","paper lantern","rainbow lights","funfetti marshmallow","double moon","neon paint","block party",
		"patriotic pinwheel","carnival ride","rainbow ring","rainbow rose","libra scales","meteor shower","meteror shower","sweet stripes","summer sunset",
		"rainbow wing","cancer zodiac","sagittarius zodiac","taurus zodiac","birthchart","firecrackers","gradient","liberty","needlepoint","novastar","pulsar",
		"quasar","sherbet","cosmic dust","all day sucker","asian porcelain","blown glass","blue bliss blossom","blue cotton candy","cake pop","cake slice",
		"candy cash","candy coated popcorn","candy jar","candy jar","chocolate cherry","colorful vines","confection","cross pattern",
		"cupcake pyramid","decoupage","egg cream","egyptian ankh","egyptian jewelry","egyptian wings","evergum","fiery red sucker","frosted sprinkle",
		"frosted sugar cookie","gelatin","german porcelain","gold porcelain splash","green dream sucker","gumball","hard candy licorice","honeycomb",
		"jawbreaker","jelly bean juniper","lemon meringue","licorice willow","lollipop st lamp","magic porcelain hibiscus flower","orange bliss blossom",
		"painted flower","parfait","pastry","pinata pine","pink bliss blossom","pipe cleaners flower","porcelain bouquet",
		"porcelain hibiscus flower","pretty embroidery","purple passion sucker","rainbow cake","red velvet cake","ribbon pop","russian rose porcelain",
		"soft serve","strawberry mouse","strawberry whip","sunny sucker","sweet st","taffy pull","toffee peanut","wonderful wafflecone","wrapper candy","acorn sparkle",
		"autumn glow willow","autumn heart","beading","blue sky","candy crayon","candy necklace","coat of arms","egyptian lotus","egyptian tree of life","farmer hat",
		"fiery hoops","fire porcelain","flashbulb","floating slime","freezing thermometer","gardener bonnet","glitter mushroom","golden weeping willow",
		"japanese orange maple","leafy greens","long scarf","magic trying","maple shade","maple","marshmallow stars","metal wind chime","old glory","old love","pan rack",
		"pink and gold heart","pink glitter","pink poplar","pink potion bottle","pink sequin","pink tiara","police bobby","pool noodle palm",
		"porcelain butterfly","porcelain gold leaf","porcelain lily","royal headdress","savannah acacia","scarab","shades of pink","spirit of liberty","splash fun",
		"summer to fall","sunburst orchid","sun orb","sun panel","sweet music","taffeta tutu","trying","vintage flag","watering can","waterwhirl","wheelbarrow",
		"wildflower bouquet","worchester royal porcelain","alchemy stone","calliope","candy gem","carousel lights","dragon eggs","embellished sari","enchanted orb",
		"ensorcelled apple","magic feather","gem date palm","golden sugar","green bliss blossom","gryphon feather","hip scarf","huge pie","incense","kir royale",
		"magic antidote","deadly nightshade","orange cream","port wine pears","rattatouille","saffron flower","silk flower pattern","silk ribbon","silk willow","spell book",
		"starlight","tailor's","teacher's","witch brew","wizardhouse","wolfsbane herb","aerial silk","big top","cotton tuft","cumulus fuzz","curtain","fluffy yarn",
		"fuzzy leaf","greybeard","penny arcade","pink southern magnolia","pink puff","purple wool batting","rosa menthley plum","ruffle skirt","ruffle","savannah",
		"sugar sprinkler","super sugar","duck","french silks","bbq","cucumber sandwich","cumulus fuzz","curtain","earth present","falcon",
		"fancy jubilee","flamingo","fluffy yarn","greybeard","hawk","needle point","parrot","pelican","pink cucumber","raven","stylish hat",
		"swan","town hall","white lace","alexandrite rose","amethyst iris","ancient hollow","ancient sorcery","aquamarine daffodil","aspen gladiola",
		"blackthorn calendula","blue bat","blue flame","bright fluff","bright magic","chimera","colored sakura","dark sparkles","dark sphere","de-gloom apple",
		"diamond daisy","dragon nest","dragon scale","dutch birdhouse","emerald lily","enchanted blossoms","fire wisp","floating ivory","tree spirit foal","frosty mug",
		"garnet carnation","geyser spirit","glowing aura oak","glowing cobweb","glowing mushroom","glowing portal","gnarled ash","green flame","green seaweed",
		"haunted candles","tree spirit horse","jeweled solstice","larkspur ruby","magic pine","misty-eyed","moon sloth","mystical thorn","owl watch","pine narcissus",
		"potion bottle","rustic lantern","sapphire ivy","sleeping willow","sorcerer lights","spellbound willow","spiral dust pine","spooky bog","spooky mummy",
		"summer family","summer friendship","swirling ghosts","sylvan","tear-sparkle","topaz elder","ultraviolet lights","vine-stalk","vino","wilwhisp","wizard lights",
		"yum plumtree","aerial silk","another world","arcane static","barn","bat lantern","big top","black tartarian cherry","blue bean","bolts and lightning",
		"bride of frankenstein","bug juice","candle lights","cat condo","cauldron-grown","classic pear","conjurer","cotton tuft","creepy scales","cresthaven peach",
		"cumulus fuzz","curtain","dark dragon","day glow calendar","dreamy butterfly","ethereal mist","eyeball","glowing eyes","fire cauldrons","flight of bats",
		"flowering magic","fluffy yarn","fuzzy leaf","gala apple","ghostly","glowing green rose","glowing nightshade","grand jack o'lantern","greybeard","hamster tube",
		"haunted raven","hypnotic","jack-o-lantern balloons","kooky branches","labyrinth","lantern face lights","fairy lantern","light and shadow",
		"lightbulb jack-o-lantern","lights out","lit up candies","lit up candy corns","lit up poison ivy","lit up pumpkins","lit up purple bats","lit up spiders",
		"lit up spider webs","love spell pine","magic cauldron-grown","magic mirror","marigold candle","milk  bottle","monster fur","moon and stars","muertos kite",
		"nesting jack o lantern","pan de muertos bread","pattern umbrella","penny arcade","pet tag","pink southern magnolia","pink puff","pumpkin vine",
		"purple wool batting","rosa menthley plum","rubber band ball","ruffle","ruffle skirt","savannah","sinister pipe organ","skeleton","spiraling candles",
		"spooky forest","spooky masks","square","stormy butterfly","striped lights","sugar flower bloom","sugar sprinkler","super sugar","tricks treats",
		"twinkling twilight","warped","were-thing","white carnation","3 little pigs","aztec feather","beaded pattern","beanstalk","black heart","blueberry frosted","grooved coral",
		"classic apple","classic lemon","classic orange","classic peach","crow","dream sand","enchanted rose","ever after","sea fan","crow stamp","gnarled stamp","haunted owl stamp",
		"wispy stamp","fluffy bon bon","fluffy pattern","fruit bouquet","gnarled","golden harp","hallowdream","haunted owl","holiday fairy","jack's lantern","light castle",
		"mayfire nectarine","mini sugar skulls","moonglow pear","never after","packing peanuts","paper lanterns","princess pea pillows","puffy pink","purple puff","romantic holiday",
		"sacred","six swans","rainbow snowflake","soft puff","starlight starbright","pecan roll","straw and gold","sunlight sparkle","the juniper","violet dryad","winter plum","wispy",
		"witchfire peach","bubble wrap","aquatic","autumn nights","autumnshade","grandma cookie","crystal snowflake","holiday fun","glistening white willow","hot holiday palm","icey whispers snowflake",
		"light beam","light mosaic","neon poinsetta","tin ornament","aluminum party","shimmering fairy bellflower","shimmering icicles","ultraviolet butterfly","united lights","very merry holiday",
		"winter spirits","arch lights","autumn nights","autumnshade","hollybright","borealis bloom","candy lights","grandma cookie","crystal snowflake","dazzling dragonfruit",
		"fall fairy lantern","fall magic","fire mcintosh","glass aquatic foal","glass lava foal","glass ocean foal","frosted pearl peach","holiday fun","glistening lights pine",
		"glistening white willow","glittery winter blutterflies","granny smith","glass aquatic horse","glass lava horse","glass ocean horse","hot holiday palm","icey whispers snowflake",
		"light beam","light bursts","light mosaic","mutant multi-berry","neon poinsetta","nestled lights oak","ombre eggplant","tin ornament","aluminum party","purple snowflake meadow",
		"rainbow stars","shimmering crystalline","shimmering fairy bellflower","shimmering icicles","shining aurora willow","snowy lights","spotted chili","ultraviolet butterfly",
		"united lights","very merry holiday","winter lights cherry blossom","winter spirits","aurora twist","bauble bright","bubble light","candy cane light","crystal evergreen",
		"doily cookie","elf hat","everbright","fuzzy bell","gilded pine cone","giving bear","giving spirit","hollybright ribbon","hollybright","ice light","light spheres","light string",
		"paper wing","snow covered","snow man","starbright","star stack","stocking ","strawberry christmas","twinkle","wizard treehouse","atomic chime","awesome heirloom tomato",
		"billowing mist","braided green bean","chilled berry","cinnamon snowfall","colorbright dewdrop","colorful daisy","colormix tornado","color record","crystal dandelion",
		"golden ring stamp","holiday spirit stamp","partridge stamp","ultimate holiday stamp","festive foilage","fire sparkle ice","flashy","flocked","frozen enchantment","fruitcake",
		"funcake","geo farm","glass apples","glass ombre willow","glass rose blooms","golden glow glass","golden ring","holiday bouquet","holiday cloud","holiday palm","holiday spirit",
		"holiday wish","holly berry crystals","hollybright cane","horse apple","ice lighting","ice mushroom","ice rainbow cumulous","ice","icy iris","icy phoenix fire",
		"irridescent orchid","lava lamp","lighted wreath","lights fantastic","light-up ball","light-up jacks","light-up keyboard","light-up marbles","light-up plastic palm",
		"light-up plastic pine","light-up toy block","light-up toy coil","mystic rainshower","tree of joy","ornament","ornament","partridge","powder","prismatic sunset","prism mist cloud",
		"purple cabbage","purple peace","purple poinsettia","rainblow thunder","rainbow glass swirls","rainbow ring cloud","rainbow storm cloud","rainbow xylophone","red bopple",
		"rings of fire","shimmering sunflakes","sky and diamonds","sparkling frost candle","sparkling ice jewels","sparkling sleigh bells","spectrum light","swirling firefrost",
		"tinsel trim","toy cherry blossom","traditional","trippy butterfly","twinkling spiderweb","ultimate holiday","vintage light string","vintage seasonal wreath","warm winter night",
		"winter chestnut","winter citrus","12 drum","assorted ornaments","black tie party","bubbly fountain","calendar","confetti burst","crystal coal","crystal rainbath",
		"crystal teardrop","diamond corsage","elf party","eminent crystal orb","everlasting fruit","festive new year's","flower portrait","fractal","freeze blast","frosted forgetmenot",
		"frosted gingerbread","frosty cherub wing","frozen music box","fun frayed","fun winter swirl","gift box","gift","gilded holiday","halo","hanging flower","hanging snowlights",
		"hippy sunflower","holiday lace","holiday lace","holiday magic","holiday mood lighting","horn","ice candelabra","ice diamonds","icicle dream","icy bubbly flute","icy twinklebrite",
		"magic elf","magic snowball","mystic dry ice","naughty","new year's light","new year's sparkle","nice","noiseblast","nye ball drop","party sparklers","polka dot cotton ball",
		"rainbow ice crystal","red cup party","royal frost crown","royal ice jewels","royal snowflake","santa","shimmering scepter","snow rattle","snowflake chandelier","soft snowflakes",
		"sparkleglow frost","struck midnight","tiered wine glass","turkish delight","vinyl records","winter carousel","winter confetti","winter daffodil","winter feathers","winter spell",
		"baby bedding","birds of paradise","black hole","blue macaw","bollywood color scarves","butterfly trunk","butterfly twist","cha cha maracas","cyclamen","dazzling disco",
		"emerald elegance","cyclamen stamp","queen ann's lace stamp","tiger lily stamp","red frog","frosted fantasy pine","golden coconut","hawaiian umbrella","ice color blocks",
		"icy sugar maple","jungle cat","mammee apple","mini holidays","mini holidays","monkey family","orchid hala","plentiful papaya","plump avocado","queen ann's lace",
		"sensational samba","shattered moon","snowflake mobile","snow owl","snow play","tiger lily","tiki torch","tropical cycad","turquoise treasure","warm milk and cookies",
		"winter booties","winter hut","achiote","black sapote","blooming tamarind","cacao","cherimoya","crowing flowers","exotic butterflies","exotic colors","fanning leaves",
		"gilded jungle","golden breadnut","gold vine","hanging fire","jungle colors","jungle ruins","leaf patterned palm","legendary feather","maripa palm","pink jackfruit","pink lapacho",
		"sculpted gold","shards of gold","turquoise crown","yellow soursop","aloha orchid fan","animal perch","anti cupid's","apple hearts","apple watermelon","aquarium",
		"aster & lace hearts","ballerina bead","banner","barbed wire heart","billowing burnt orchid","black roses","blooming love candelabra","bowed grevillea","breaking hearts",
		"bromeliad bloom","butterfly crown","buttery butternut squash","candy swirl","caprese mix","cascading toule","cat house in a tree","chained hearts","cheese and fruit tasting",
		"cherimoya","cherry mango","chocolate & rose petals","cloud forest","crystal heart wing","dark diamond","dark flowers bouquet","dazzling lasso","diaphanous dahlia","dorado sunset",
		"faberge heart","fan flower","fanning hugh","farm pomegranate","feathered jungle","feather heart","love balloon","valentine bouquet","fern flower","fine wine bouquet",
		"flirty flirtini","floating tea candle","flowering ceiba","flower jewel","forest mango","forest starfruit","fresh citrus mint","frosted calla lily","frosted delphimium willow",
		"frosted gerbera","frosty lights ice","frozen waterfall","fun can-can","gem pops","stained glass","glitter rose","golden cacao","golden heart burst","gold thread embroidery",
		"gummy ball","hanging black hearts","hanging crystal hearts","hanging horseshoe","heart dew drops","heart monster","hibiscus palm","tree house","ice sparkles and sequin",
		"i heart hollyhocks","jeweled heart crown","jingle bobs","jungle butterflies","ke aloha","key and jeweled heart","ku'uipo lei","lace flowers","lace lillies and pearls",
		"lace love rose","layered cyrstal heart","leilani","lightning trunk","linguini & olive oil","looking glass","love balloon","love bouquet","lovely lupine","loves me loves me not",
		"loving azalea","lumberlove","magic moss","mayan pattern","mixed jewel heart","monacle & gold chain","native beads","native feathers","navajo jewels","nesting","orange raspberry",
		"peanut butter cups","petite fours","pink perfume","pisces fishbowl","plumeria palm","qantuta","quilted lemon","rainforest orchid","red envelope","red lantern",
		"refreshing sangria","romantic chandelier","satin lace snowdrop","shattering hearts","sheriff's stars","sheriff star","shimmering chiffon lace","siren","snow stream","soda pop",
		"spicy flamenco","spiky hearts","spring droplet","stormy hearts","stylish saloon","succulent fig","sunburst bromeliad","swirling ribbons","tea time","thawing colors",
		"thorny bouquet","thorny heart rose","tiger striped bromeliad","twirling fans","valentine bouquet","valentines willow","veiled periwinkle","vinyl","violets and roses",
		"western bouquet","western romance","wild rainbow","wild wild west","zodiac snake","bourbon street dragon","bubble flower","carnival","crackle blue","crystal heart","crystal wand",
		"curled","curled glass pine","curled maple","emerald bubble","emerald crystals","emerald heart","emerald mulga","emerald spire","emerald swirl","emerald wand","ever blue and gold",
		"everblue and gold","fleur de","flower bubble","flower key","flowerdrop","folded ribbons","gear flower","glass red ribbon","gold feather palm","golden coin","good spell",
		"grab apple","grinding gears","hay tassle","heart medallion","heart print","ivydrop","love dream catcher","magic oak twirl","magic water bucket","peace flowers","peace heart",
		"peaceful dove","peaceful lantern","poppy flowers","poppy shrub","porcelain teapot","rainbow","rainbow clouds","rainbow flame","rainbow lily","rainbow spirals","rainbow twister",
		"rainbow willow","scarecrow hat","silver shoes","silver wings","spiral trunk","spiral works","swirling ribbon","tin top","tinker trunk","tuft bow","twirled leaves",
		"twister bubble","verdigris spiral","wicked spell","winkie tin","winkling peace charms","yellow brick","beaded pine","emerald mulga","emerald swirl","glass poppy","glass sparkle",
		"hay flower","hay tassle","heart medallion","magic oak twirl","metal heart","party mardi","party mardi","porcelain leaf","rainbow cloud","rainbow flame","rainbow tin",
		"rainbow twister","rainbow willow","spiral trunk","tuft bow","bagpipe","bayou firefly","book jacket","bows and rings","white brugmansia","castle story","celtic blossoms",
		"celtic butterfly","celtic fairy dust","celtic fairy","celtic fantasy","celtic heart","celtic knot and emeralds","celtic plaid","celtic swirl","cherrybark","dainty daisies",
		"dayglo okra","diamonds and lace","dogwood flower","fancy fleur","fried green tomato","glitter rainbow hearts","gold and rainbow bell flower","gold and rainbow sakura",
		"gold coins and rainbows","gold shimmer trail","gold shooting stars","jeweled oleander","live oak","lovely lilac","lucky crystal charms","lemon meringue","nutall","tree of runes",
		"ornamental cabbage","ornamental pear","paper blossom","paper","pleasant poppy","rainbow butterfly","rainbow fan","rainbow golden coconut","rainbow magic",
		"rainbows and gold butterflies","rainbow rose","celtic shamrock","shumard","sparkling celtic knot","spring bouquet","spring butterflies and rainbow","spring dew drops",
		"spring garden","spring harvest","spring persimmon","spring tulips","tin whistle","wedding bouquet","weeping cherry blossom","blue bottle","bubble bloom","bubble magic",
		"bubbles inside bubbles","bubble swirl","cake bite","cherry pie","cheshire stripe","dream world","dreamy caterpillar","elfin portal","emerald ribbon","fall spring","irish clover",
		"irish harp","irish of life","greenbeard","irish clover","irish harp","irish of life","lavender jewel","lavender lace toule","lavender love","painted rose","tea party",
		"pink  burst","pink candle pearls","pink fantasy","pretty baby flower","purple potpourri","purple splash rose","purple wave petal","queen of heart's","rainbow bubbles",
		"red bottle","rose bouquet","rose pearls and feathers","shining bubbles","singing flowers","sleepy poppy","smoke puff","spring fairy bubbles","spring fairy flower",
		"spring fairy swing","spring fairy tiara","spring fairy wand","spring maypole","spring mushroom","sticky notes","through the lookingglass","tin heart","witch of the east",
		"arcadia","austrian gentian","bell flower lights","black olive","blooming almond","blue flamenco flower","bold bordeaux","bulgarian rose","bunny","bursting butterfly",
		"cactus pear","caffe latte","carnival mask","carved column","chianti sunset","climbing rose","colorful fanned quilt","delightful daffodil","downy serviceberry",
		"dual bougainvillea","dwarf","easter cookie","easter ribbon","eastern redbud","emerald apple","enchanted of life","fairy music","flamenco flower","flamenco ruffle",
		"flower anchor","french lily","gold sea tile","golden emerald","grecian mosaic","grecian stair","greek laurel","hawthorn","heather flower","hedge maze","iced mocha",
		"indian pipe","juicy pomegranate","lake","lavender olive","light trail","lightening bolt","lively lily","lucky star","lush lavender","magic potted lemon","marrakech lamp",
		"moroccan lantern","mystical waterfall","opulent egg fantasy","ornate plates","pastel almonds","pastel rose","peaceful primrose","pistachio shell","pixie hideout",
		"polka dot pastel","potted lemon","purple cypress","rainbow umbrella","red buckeye","redbrick","riviera blooms","riviera citrus","riviera hanging flowers","riviera lights",
		"roman helm","ruby swirl","santorini beach","santorini sunshine","sea tile","soft scilla","spanish fans","spanish rose","spring fair award","spring fairy house",
		"spring fairy lights","spring fairy ribbons","spring whispers","spring willow","teeming tulip","whimsical wisps","wild plum","will o' wisp","wind mosaic","wishing moon",
		"pink flowering dogwood","coliseum wall cypress","sunset bougainvillea","50s vinyl","acai palm","african safari","amethyst wisternia","bandana","berry basket",
		"bubbles and ribbons","bubble sunset","bursting bubble","butterflies & blooms","butterflies in bubbles","butterfly blues","cake stack","celebrations","wind chime",
		"chocolate chip","cool blooms","cool milkshake","creamery","crocheted","croissant","diamonds and roses","emerald willow","entertainment","eucalyptus blossom","feather wreath",
		"eucalyptus blossom","kids craft","mother's bouquet","mother's jar","festive pinata","festive ribbons","fiery pepper","fiesta fireworks","flaming topaz","flores de papel",
		"freedom blooms","freezing bubble","fruit basket","golden cypress","golden ipe","green riviera citrus","green woods","haystacked","hearts in bubbles","hot flames","indulgence",
		"kids craft","magic mother's jar","margarita","melon pops","mexican lantern","mixed fruit","mother's bouquet","mothers day cake pops","mothers day party","mother's jar",
		"music love","mystical aquamarine","neon soda pop","november bloom","tree of balance","tree of faith","tree of fame","tree of good luck","orange arcadia","panettone","paper plane",
		"pbj cookie","picnic bench","pink lemonade","pink peonies","pinup curls","pit stop","pretty in pearls","pretty polka","pretty ruffles","purple madness","rave","rockabilly love",
		"rose cake","ruby rose","sapphire butterflies","sassafras","serenity","shaving brush","sombrero blooms","studded rose","sweet treats","tea bag","tea cuptree","techno twist",
		"traquil light","tropical spirit","vegas crazy slots","vintage music","zircon blooms","autumn lemon","beach bag","blood red bloom","blue lotus","cartouche","comet cloud",
		"crescent moon","dazzling dahlia","turkish treats","desert aloe","desert blooms","desert smoke","doum palm","egyptian jewel","fairy floss","firefly abode","golden date palm",
		"golden dates","great galaxy","great horns","henna","jeweled scarab","lily of nile","mesmerizing attar","mirror mirage","moon beam","moroccan rose","moroccan spirit",
		"mystical lotus","nile mulberry","oasis cassia","oasis of life","oasis tower","tree of mead","orbit","painted daisies","papyrus","peacock","petrified wood","picnic swing",
		"potted olive","pretty dandelion","pretzel butterfly","printed","rainbow galaxy","rainbow note","red gentian","red","riviera glass","shooting stars","solid color",
		"spectacular star","spiral key","stardust","starry violin","sand storm","sunny sunflower","sunny pomegranate","super cymbal","sweet incense","talisman","tamarin","tree pots",
		"tuning tuba","bulgarian rose","white dwarf","wild cat","wispy supernova","ankh relic","caduceus","chandelier","crystal beaded","egyptian bottle","egyptian lantern",
		"gold doum palm","hookah","life sand","magic dragon's blood","magic hourglass","papyrus ii","pharaoh fan","ra","scarab wings","mystical palm","ziggurat",
		"5 tier cupcake","anniversary pops","bejeweled","big bonsai","bird cage","carousel","crazy coaster","crazy spinner","cupcake tower","desert rose","desert rugs","ferris wheel",
		"filigree","funnel cake","gazebo","lace corsage","mosaic stairs","nature's umbrella","oasis afterglow","pretty pansies","queen anne's lace","roses and memories","shaved ice",
		"sweet macaroon","teapot","tube slide","twin headed palm","victorian clock","victorian gazebo","victorian hat","victorian house","vintage romance","5th birthday party",
		"a pixie pine","african daisy","african pinkball","african plates","apple juice","auspicious wheels","baobab tribal","beach party","beach umbrella","beaded orange","bird condo",
		"boho blooms","boho embroidery","boho feather","bonsai","boom box","butterflies mystree","candied apples","cardboard","carnival oak","cat house","cinderella clock mystree",
		"colorful charms","cool","coral","crystal ball","daisy love","disco ball","disco hat","disco lights","dragon firefly","dream of a disco","dreamcatcher","drumstick allium",
		"enchanting","etheral castle","fairy berry","fairy dust","fairy fruit","fairy hideout mystree","fairy lights","fairy maple","fairy wings","fairyland hideout","fairylandhouse",
		"fairypuff mystree","fantasy fairy","fiberoptic palm","firangipani","fire light","firefly burrow mystree","floating lanterns","fluorescent street antler",
		"fluorescent street antler fawn","frozen crown","fun circus","glass bead","golden locks","good times","granny house","green cotton candy","hamock","haven doorway",
		"high roller wave","hollow laser","holographic","jack's mystree nursery","kennel","kitsch pompom","kitsch tea party","light bug","lilypad","lost shoe","love flower",
		"love potion","magic acorn","magic beanstalk","magic carpet","magic mushrooms","magic practice","magic shroom","magic wand","magical of light","magical poppies mystree",
		"mixtape","moonflower","morning glory","mushroom house","musical","mystree sapling","neon nights","night mushroom","orange pore","palm pahala","paper rose","park balloon",
		"park treats","party lights","party shell","party starfish","party this way","perched dragon","pina colada","pine gnome","plumeria banyan","poison apple mystree","pom-pom",
		"pretty flamingo","puff pastry","pumpkin house mystree","rainbow tulle","red riding","ring toss","royal","sky rocket","sleepy time","soda float","soda pop","sparkling",
		"spike palm","spiral aloe","spiral house","stary night","stone pine","storybook","stutered sky","sun moon","sweet memory","tassel","thumbelina","tiled disco","time traveling",
		"titania bed","toborochi","tree of friendship","tree of pearls","tree of shelters","tropical beach","tropical drink","tropical fern","tropical palm","twilight",
		"twisted blossom mystree","warm","wedding","white owl","wild rose","wishing star mystree","wizard hat","magic acorn","aquarius peace","autumn crown","barrel","bavarian hydrangea",
		"bavarian maple","bedazzled flora","blueberry balloon","book stall","bread loaf","bumblebee wreath","bumble flower","cake tray","candy bumble","carved tomatoes",
		"cascading blossom","circular candies","classroom","cocoon","cuckoo clock","dagger","dazzling swing","dragon fire","fairy godmother","fairy kei","fairy lodge",
		"fairy nest","fairy house","fall apple","fall romance","fall wreath","fancy gingerbread","feather dancer","fiery wisteria","floating balloon","flowerbud","flower mushroom",
		"german bubbly","german iris","glass trunk pine","glimmer butterfly","glittering shade","glowy ribbon","glowy sylvan","golden hat","golden spiral","groovy tunes","hane willow",
		"harujuku blue","headbanders","heirloom","honey jar","tree illuminous","imagine","indian summer","jelly","kaleidoscope eyes","kawaii","launcher","layered honeycomb","library",
		"loli","lotus","lucky bamboo","mad scientist","mini air balloons","music of love","neonlit of fame","neon","noodle","fall oak","orange flame","oriental air balloon",
		"oriental maple","peace graffitree","pearly pink","pencillate","pencil shavings","pink peonies","pinecone feeding","pine rose","pixie dust","playswing","pot of honey",
		"pretty pearls","princess","radiant maple","radium wing","reef knot","retro record","retro sweet","retro wreath","salad","samurai magnolia","slidehouse","sparkle n shine",
		"special rose","starry knot","storyteller","sun dried tomato","symmetree","takenokozoku","tangy air balloon","tomatina","treblesome","tree trunk tower","trichrome star",
		"tricolour lit","turkish air balloon","twirling light","uber fringed","vanity","vintage glamour","vintage vase","vivid fan","autumn ribbon","batwing pumpkin","blooming evil",
		"creophagous","fall blossom","fall fan","lost memories","spookyhouse","tree-o-lantern","freaky pine","giftgiver","glowing ghost","horseman hollow street lamp","ice sandwich",
		"japanese lantern","spooky lantern","lost memories","misty skull","nightmarish moon","tree-o-lantern","tea pot","prosperity","pumpkin wreath","puzzled","raptorial flower",
		"sakura tea","skeleton vine","spooky cauldron","spookyhouse","teahouse","a-maze","autumn breeze","bat","black soil","dark sorceress","fall leaves","glow jar","horseman's hollow",
		"leaning of pumpkins","moon charmer","moonlight capturing","owls habitat","pumpkin keeper","pumpkin","raven","red blossom","round table cake","secretly grinning","sleeping owls",
		"sleepy stairs","spooky carousel","spooky cave","spooky eyeball","spooky gathering","spooky party","spooky wine glass","swirly autumn","tealight","trick","twisted treats",
		"windmill","witch sticks","timids","ball gown","barrel of wine","basket of grapes","bat cowl","bat pumpkin","bat webbed","calavera","candycorn pine","charged",
		"colours of afterlife","creepy floating","crochet decor","crypt","dangly wool","dark carousel","day of dead","electro magnetic","experiment flora","rose candle",
		"flowers and skulls","frilly pine","frilly","autumn tamarind","baba yaga","banshee lair","barbed wire yin yang","barren arch","birth of autumn","breezy steampunk",
		"candy cane streetlight","candylicious","rock candy","chest of jewels","chocolate gold coin","choconut","clunky","colorful night","cotton sprinkle","pretty dandelion",
		"dawn to dusk","everycolor daisy","evil eye","feather vines","firefly","tree unicorn foal","frills on metal","frosty pop","gear dial","ghostly lights","glassy magic","gloaming",
		"gold coin","grape climber","grapevine willow","grape vineyard","gummi","hades","halloween apple","halloween balloon","halloween candy","halloween ghost","hanging bats","happy",
		"hatted rabbit","haunted spirits","heart at stake","hiding","hollow nest","horror","incantation","jellybean bonsai","jelly burst","jewel palm","knitted flora","lace and roses",
		"lace umbrella","lifeless lantern","lightning rainbow","lost & found","love knit","mad hatter","magical heart","magical spells","map of gold","masquerade mask","moonlight",
		"mystic hover","navigator","neon willow","tree of life","tree of masks","tree of omega","tree of the drakul","tree of warding","pendant memories","pirate hat","tree pot",
		"pumpkin orb","pumpkin webbed","purple autumn","purple glow","queen of hearts","quietus fairy","radioactive experiment","reaper","romantic bouquet","rose candle","rosy coffin",
		"science experiment","seed of life","skull vine","smoky gravestone","sour candy belt","sour punch","spectral rose","spiderling","spooky glow","spooky maple","spooky spider",
		"spooky tent","sprinkly star","sun to skull","swirly chocolate","tempest","trapeze bat","twisted hollow","twisted pine","urn","vivid illusioned","wearied heart","spider web",
		"white feather","wild blooms","wireless bulbs","witchy","woundup knit","yellow feather palm","alphablock","ball and chain","barrel monkeys","cherryblossom brick","cookie plushie",
		"cute ghost","skulls and stars stamp","spiked stamp","tree of heartbreak stamp","fourplay","hearty popsicle plushie","hidden ninjas plushie","jack in the box","neon hula hoops",
		"tree of heartbreak","peg solitaire","plushie cupcake stand","pogo stick kooshy","pointy teeth","puzzle block","skipping rope","skulls and stars","snakes and ladders","spiked",
		"starry eye","beach ball","blocky cedar","blocky pine","bulb","clay coin","clay make","clay pine","colourful slot","cowboy cactus","cutout fruit","fruitful","funky band",
		"happy times","kiddie eraser","multicolor clay","multi slinky","patchwork oak","pinata pine","pyramid block","rainbow circle","rainbow toy","stacking","supple flower","toy apple",
		"toy birdhouse","toy fan","toy mushroom house","toy lollipop","toy monad","toy palm","toy house","toy willow","woodpecker","yo-yo","alluring laced","star anise","art deco bloom",
		"art deco palm","aurora willow","aztec sky","barbecue grill","barbecue  vegetable","bavarian snowflake","blob top","blue swirl","crystal lights","holiday berry","bone china",
		"borealis mist","bountiful harvest","bright light","bubbly tower","cactus","cake 'n' cookies","canadian blue spruce","candied fir","celtic rose","celtic yew","ceramic flowers",
		"chandelier willow","charm magnified","christmas cow bell","cinnamon frosty","clay vase","clootie","confetti & balloon","cornet icing","cornucopia","crockery","crystal mist",
		"crystal pine","crystal rose","cutwork china","doll house","ball drop","earthenware","eerie icy pine","elven","fall basswood","gleaming gala","lustrous banyan","newlight",
		"tropical celebration","flapper willow","saffron flower","flowers and rake","flute and pearls","frozen dew","frozen icicle","gingerbread fairy","gingerbread holly",
		"glacier willow","gleaming gala","glittering pine","glitter maple","tree costume gnome","golden bubbly","golden palm firework","golden snowflake","grilled cabbage",
		"grilled corn cob","guignol","hanging wreaths","harp","hessian snow","highland thistle","holiday bonsai","holiday gift","holiday wonderland","icicle berry","icy snowflake",
		"icy willow","jade mosaic","kremlin","light drooping","light wave","lustrous banyan","magic holiday bonsai","marshmallow crown","midnight glory","midnight toasting",
		"mushroom carousel","newlight","new year lights","obsidian","tree of blocks","tree of lights","ornamental","oven grill","owl cuckoo","pet rock","pink equalizer","plank stacking",
		"plasma globe","pointe shoe","pop up","porcelain pot","precious stone","prism snowflake","pumpkin and flowers","pumpkin carousel","rainbow dyed snowball","rainbow pinwheel",
		"rainbow springy","red oak","russian doll","russian snowman","santa claus","scottish rowan","shadow puppet","shimmering lights","shiny lights","side street grill","sleepy kitty",
		"snow avalanche","snow chocolate","snow jar","sparkle and shine street lamp","sparkle and shine","sparkler jar","sparkly willow","star magic","sugar dust pinetree","sugar maple",
		"sugar spun","sugary candycane","surgar clove","sweet decadence","swingy aspen","swirls holiday","tree top star","theatre","tlaloc","totem","toy lemon","trampoline swing",
		"tropical celebration","whipped cream","white winter","winter birch","winter holiday","winter market","woodland toy","xochiphilli","ale mug","ancient wizard","barbed wire",
		"billboard","candy bar","cards n dice","clock tower","cloud burst magic","cork christmas","countdown","crime scene","cuffed","treecup tea time","curly paper","daisy bloom",
		"dawn dreamer","dizzy partree","backstreet pug","dream memory","enchanted freedom","engulfed crystal","entwined","farmville celebration","queen of hearts","tum tum",
		"glass dome bloom","glowing fairy","glowing snowman jar","golden stair","golden wattle","gold yarn","habitable oak","heart leaf","heart shaped box","hidden manor","hideout",
		"ice cherry willow","kabuki noh","kabuki spring","like a sir","lit up cherry blosson","love locked","magical swirly","midnight blossom","money honey","money jar",
		"mossy sword willow","musical toy","neon light palm","new years ball","tree of fans","tree of houses","tree of parasols","queen of hearts","tree of vialtality","peace wreath",
		"poker chip","flower power","pretty lights","pyramid base","pyramid gift box","rainbow wool","red crystal","resolution","romantic street lamp","runestone","santa hot chocolate",
		"snow cherry","sparkle rose","stache monocle","star staircase","stringed heart","the world","ticking time","tilted roulette","top hat","tower","toyhouse","train track",
		"twisted autumn","valentines pine","vibrant rose","wheel of fortune","wicked bling","woodcutter","anvil and hammer","bird song","bonflower","celtic oak","chainmail",
		"door willow","elemental","elm fairy","flora crown","glade watcher","golden oak","magical willow","medieval orange","medievalhouse","metamorphosis","mystical illuminated",
		"mystical pine","tree of connections","tree of fairy flowers","tree of lanterns","peridexion","pink pomegranate","pitchfork","quadrubranch","secret door","stained glass",
		"tapestree","thatched house","yellow maple","ancient scroll","aquamarine gem","aventurine","banner flag","baroque holiday","baroque willow","battlechess","beach palm","bearded",
		"big buttercup","bird cage","bird house","birds in pairs","blooming bluebell","blooming butterfly","bloomy blossom","blossomed","blue fireflies","bountiful hearts","broken heart",
		"bud","budding bluebell","butterfly bubble","butterfly bush","cactus knight","carnival head piece","cauldron child","cedar castle","celtic clover","chinese coin","chinese lantern",
		"chocolate swirls","citrine gem","classic hat","clover willow","clover wreath","coin money","cosmic butterfly","crazy shopping","crystal mixture","cupid cloud","cymbal",
		"dark heart","dark romance","dragon egg","dragon spiral","dried up love","dyrad","elemental orb","equalizer","escort card","fairy bath","fairy mist","festive blossom",
		"festive lantern","film","firefly willow","flaming dandelion","flower twirl","fountain","gem chip","glowing tulip","golden rainbow","heart shaped","heart withering",
		"heartception","hearty blossom","hidden castle","holy","horseshoe swing","ice throne","its time","jeweled goblet","kaleidoscopic","kings crown","lance","lantern camphor",
		"love struck","lovers","lucky leaf","magical sunshine","mannequin","mountain spring","mystic web","old lantern","old red","paparazzi flash","particoloured","peace of lotus palm",
		"pearl pinned rose","piccolo","pine outpost","pink shade","prismatic","prop","purple empress","pyschedelic","rainbow clover","ranger","red cabbage","red carpet","red clover",
		"reel star","riches","rio carnival","rising dragon","rose day","rose pinned heart","royal brooch","royal glass pine","royal hourglass","royal jewels","royal oak","royal orchid",
		"royal","royalhouse","royal yellow","sakura fan","sakura lantern","sakura parasol","sale sale","secret archway","shamrock blooms","shielded","spring fairy","st. patrick's",
		"stage smoke","stained glass bloom","starlight dewdrop","street shopper pony","sunset palm","swirly celtic","tasmanian rocket oak","teddy","theater","tiny floral",
		"together forever","tranquil","tree hugging panda","tree of balance","tree of dreams","tree of hearts","tree of helms","tree of love","tree of potions","tree of the middle ages",
		"very cherry","victorian style","victory flag","watchtower","willow outpost","wisp willow","witch in the wood","witch wood","withered shamrock","yellow beach flowers",
		"yellow mist","afro","art awards","artistree","atom","barrel dungaree","bearded straw","bird","bling it up","party blower","bollywood poster","braided wisteria","bullseye",
		"bunny ears","printed spring","candle centerpiece","candy apple","candy treat","canna","cassette","cd","chilli pinata","chocolate chicklets","cinco de mayo","clown","cogwheel",
		"colored anemone","colour shade","red coral","cotton candy","creeper","disco","divine statue","dna","backstreet pug","egg basket","egg shell","egg wreath","ornate egg",
		"espalier fence","fame","bird","hanging eggs","happy 6th bday","heavenly frostree","parakeet","festive","flowering gum","fountain palm","french villa","fresh summer",
		"funky hill house","furry fluff","gerbera daisy","glass chandelier","glass","street gnome","street food vendor gnome","tree lover gnomes","golden silver","green world",
		"gypsy flower","gypsy pattern","hair curler","hanging eggs","happy 6th bday","haystraw","headress cowboy","heavenly frostree","helmet top","henna tattoo","hip","illusion",
		"jack in a box","jasper gem","kickstand","king's bonsai","laurel wreath","light branch","loco","lolly flower","magic steampunk bonsai","magic treasure chest bonsai",
		"magnificent coral","manicured","marshmallow bonsai","merry festal","moonlit canopy","moonlit cloud","multi glamo","mushroom waterfall","music awards","mystic spirit",
		"neon easter egg","nesty","night mist","nordic waterfall","oyster pearl","paint splash","parakeet","parisian chandelier","pendulum clock","peppermint candy","persian jewlery",
		"petunia","bunya pine","pink wisteria swing","pooch dryer","pretty things","psychedelic","punk","queens oak","racing leathers","reused bottles","roman helm","saddle swing",
		"scarfy","school of fish","secret stash","semaphore","card sharp","shelling","sisal flower","smiley","smithin'","smooth round","solar","songbird","treeson prison",
		"sporty leather","spring time","squirrel saloon","stary","steamed","steam punktree","steel studded","stilt","stone age oak","summers color","sweet gumball","swing","taco",
		"teeny","teepeehouse","tide chandelier","trail marker","trophies","tube worm","viking braid","v-twin","wanted poster","war paint","wedding confetti","we make earth",
		"wishing well","wrangler","angels trumpet","balefire","boat hammock","calm palm","coniferous coral","crystalline","exotic banana","exotic coral","explorer house","firework coral",
		"first mate","glowing coral","glowing jellyfish","gold coin","kraker suckers","lateen sail","lightbeam","mangrove glade","message in a bottle","night sparkle","tree of mystries",
		"overgrown palm","pearls and shells","pirate booty","pirate plank","pirate willow","purple tunicates","rockyhouse","rosey eyepatch","rusty cannons","sappire coral","sea coral",
		"seafan coral","seafarerhouse","sea slug","starburst coral","star coral","starfish palm","steampunk bonsai","topiary","treasure chest bonsai","treasure gold","tropical flower",
		"waterfall","webbed shelter","weeping willow","agave","ammo belt","barrel cactus","cacti","cactus patch","colourful juniper","desert flower","desert mirage","desert night",
		"desert sunrise","eagle dusk","feather elm","fiery dogwood","fringed wisteria","golden joshua","hangman","horseshoe oak","pinon pine","savanna sunset","sheriff cactus",
		"snake entwined","target practise","totem sequoia","touch me not","twisted frontier","wanted poster","watch tower","wheels and barrels","wild bloom","wild cactus",
		"wild dreamcatcher","wild west cactus","wild west redwood","wild wind","yucca",


].fixOrder();

		
		//giant trees
		//do not provide the words big or giant in front of these as that is done programatically later
		var treeTypes2=["chilly seasons","african pear","albino redwood","alexandrite","allium","alstonia","amaryllis","american basswood","american larch","american linden",
		"american sycamore","amethyst gem","anemone","angel reef","angel trumpet","animal balloon","animal cloud","animal","anti-valentine","apollo","chocolate apple","frozen apple",
		"honeycrisp apple","sour apple","spring apple","april showers","aquarius","araguaney","arctic cookie star","aries","armillary sundial","aromita","art deco lamp","art deco radio",
		"art deco","arts and crafts","asian white birch","atlantean sea shell","australian boab","australian fan palm","australian grass","autumn umbrella","baby bird","baby bundle",
		"baby carriage","balloon","ballroom","banana peel","banapple","blue ribbon baobab","bare christmas","bare crystal","bark","basket","bassinet","beach ball","beach plum",
		"beach umbrella","beads","belladonna","bell flower","bell pepper","bell","bear","bird of paradise","birthday candles","birthday hat","birthstone","biscotti","bjuvia","black apple",
		"blackboard","black cherry","black dragon","black oak","black wattle","blossoming","bluebird of paradise","blue jackolantern","blue mystic cloud","skull & bones","book","broom",
		"boombox","borealis","bouquet","bowtie","bow","box of chocolates","chocolates","bracelet honey myrtle","brazil nut","breakfast","breakfast scone","goldenrain","bristlecone pine",
		"brooklyn bridge","bubblegum","purple bubble gum","bubble","bumble bee","bunya pine","bushy kelp","butterfly","butterfly heart","cake pop","camphor","candlelight","candle",
		"candy apple","candy cane","candy corn","bright candy corn","heart candy","candy heart","candy pumpkin","capricorn","caramel apple","caribbean trumpet","caricature","carins",
		"sequin","carved lantern","carved","cats eye","cauldron","cedar carriage driver","celery","celestial","celtic knot","central park pigeon","ceres","champak","chandelier","cheese",
		"chemistry lab","cherry blossom","chrome cherry","chinese fringe","chinese hackberry","chinese mulberry","chinese rain","chinese tallow","potato chips","chiton tee",
		"chocolate box","chocolate factory","chocolate heart","chocolate pickle","chocoberries","chrome tubing","chromodoris nudibranch","cider cypress","city parrots","climbing",
		"clog","clover","clownfish","coal","cocoa","coconut punch","coin","common laburnum","witch hat","constellation","cornucopia","corsages","coupon","cow leaf","cowry","queen's crape",
		"spring egg","cream treat","crown flower","crown","crystal ball","crystal cave","crystal heart","wedding","purple crystal","cupcake","cupid arrow","cupid","cypress","dandelion",
		"dark apple","dark bramble","dark butterfly","dark candle","dark christmas","dark heart","dark jewel","dark peach","dark rose","dark willow","davidson plum","deadly nightshade",
		"decorated halloween","deco sunburst","denim","basic derby","bass derby","derby boot","salmon derby","trout derby","dew","diamond ring","luxe gem","diamond ii","didgeridoo",
		"dinosaur eggs","dinosaur fossil","disco ball","disguise kit","dog treat","donuts","dove","dracaena draco","dragon boat","dragon fruit","dragon","dreamtime","dream trumpet",
		"dreidel","drumstick","dryad","dumpling","dwarf blue spruce","earth","easter egg","eastern cottonwood","eastern cottonwood 2","eccentric elm","egg nog","elephant ear","emerald",
		"encapsulated","enchanted iris","enchanted yew","engagement ring","fan palm","silver fir","evergreen pear","exploding eucalyptus","fairy","fairy bubble","fairy butterfly",
		"fairy dust satchel","fairy gold","fairy lantern","fairy light","fairy ring","fairy shoe","fairy snowflake","fairy wing","fall bouquet","fall candle","fall cupcake","cornucopia",
		"fall feather","fall oak","fall ribbon flower","father","feather palm","holiday hot chocolate","fiesty gem","fire apple","fire cherry","large fire gem","fire orange","firework",
		"fizzy popsicle","flapper dress","flapper headdress","flats","flip flop","fluorescent willow","flower box","flower burst","flower power","flower","fleur de lis","foggy skyline",
		"forbidden gem","fortune cookies","fraiser fir","french bread","french fry","french press","frosted autumn","frosted fairy","frosted mapple","frost fire maple","frost holly",
		"frozen fire","frozen gem fruit","frozen snowfall","frozen yogurt","fruit","full moon","farmville games","gadget","garden tool","gelato","gem fruit","pink gem","red gem",
		"gemstone","gem","geode","gerbera","gharqad","ghost","ghost","ghost willow","red rose","gift card","gingerbread","ginkgo maple","glass slippers","glitter butterfly",
		"glitter holiday","globe","glowing jellyfish","glowing lantern","gnarled","goblet","goblin","gold chain","white golden apple","golden coral","golden egg","golden fairy",
		"golden holiday","golden koala","golden larch","gold holly","gold lace","gold pot","gold sitka spruce","gramaphone","grand berry","grand citrus","grand lemato","grand plumapple",
		"grand stonefruit","green anemone","green boogie board","green man","green tinsel","green weeping lilly pilly","green yarn","grenada pomegranate","grocery","guardian","gum drop",
		"gummy bear","hair down","hair up","hala","halloween candle","halloween candy","halloween cookie","halloween lantern","hallow willow","hand fan","handmade card","hanger",
		"hanging snowflake","hard candy","harmony bonsai","fall harvest","haunted","haybale","headdress","heart balloon","heart cotton candy","heart locket","heart shaped mom",
		"heartflake","heart","hedge","hidden garden","himalayan yew","holiday candle","holiday corn","holiday card","holiday chocolate","holiday cookie","holiday feather",
		"holiday lantern","holiday light","hollow lantern","hologram","horseshoe","hot air balloon","hot chocolate","hot cocoa","hot pink","hot sauce","hypselodoris nudibranch",
		"ice cream","ice cream mango","ice cream sundae","ice diamond","iced mint mocha","ice laburnum","ice sculpture","icicle","icy flame","impressionist","impressionist ii",
		"industrial gears","instrument","irish of life","jack o lantern","jade fan","jade fireworks","fujian birch","japanese fern","japanese stewartia","japanese wisteria",
		"jelly bean","jelly blob","jetset","jewel","jingle bell","juicy apple","juicy pear","jujube","july balloon","july confetti","july cupcake","july firework","july ice cream",
		"jungle feather","snake","jupiter","kakadu plum","kaki persimmon","kaleidoscope","kelp forest","king cake","kite-eating","korean white beam","kumquat","kwanzan cherry",
		"label","labyrinth","lacebark elm","lace","lacey parasol","ladybug","lantern pad","large tulip","lava banyan","lava flower","lava lamp","lava stone","lei","lemon aspen",
		"leopard","lettermen","liberty bell","licuala palm","lightwire","lollipop","loud noisemaker","lucky charm","luminous jelly","lunar conifer","mac&cheese","magic mushroom",
		"magic orange","magic peach","magic","magnifying glass","mahogany","majestic redwood","mama koala","manchineel","mardi gras","martian","mask","may ribbon","may streamer",
		"mechanical","melting snow","mercury","metallic fir","metallic crab apple","metasequoia","mexican hand","milkshake","mini cupcake","mint candy conifer","modern art",
		"mother's cookies","mom's bouquet","mom's gift basket","kid crafts","mom's makeover","monkey pod","moonlit holiday","moonlit mulberry","lunar","moreton bay fig","mossy",
		"mother's day cards","mom's flowers","mustache","muffin hat","mulled wine","mushroom","muskogee crape","mystical fire","mystic stone","natchez crape","navel orange",
		"new arrival","new year lantern","fire peach","noir","non sequitur","north pole","note","nutclock","nutcracker","nutty ice cream cone","old growth berry","old growth citrus",
		"old growth lemato","old growth plum apple","old growth stonefruit","on sale","orange australian flame","orange sea pen","origami","ornate sea","outback","over-fertilized",
		"overgrown berry","overgrown citrus","overgrown lemato","overgrown plum apple","overgrown stonefruit","pacifier","paisley","pansy","paper fire","paper flower","paper umbrella",
		"parasol","parasol","parrot","party favor","party hat","pawpaw","peace","icy peach","peacock feathers","pencil cedar","pencil","persian parrotia","peumo","phantom oak",
		"phoenix fire","pignut hickory","pink bouquet","pink coral","pink diamond","candy bouquet","pink lemon","pink pearl","pink skull","pinwheel hat","pinwheel","pirate sail",
		"pixie maple","pixie","platform shoe","pohutakawa","poinsettia lantern","poinsettia","pole berry","pole citrus","pole lemato","pole plum apple","pole stonefruit","pom pom",
		"possumhaw holly","pot of gold","present","prism coral","prism pine","prism","pumpkin light","pumps","purple angel trumpet","purple empress","purple gum","purple japanese",
		"snowflake ii","purple star","purple thistle","purse","puzzle","queensland bottle","rainbow","rainbow cotton candy","rainbow fir","rainbow glitter","rainbow jelly","rainbow leaf",
		"rainbow magnolia","rainbow neon hearts","rainbow prism","glass prism","rainbow shower","raincoat","raindrop","rapier","rat house","rattle","ray","recycled bottle","recycled can",
		"recycled cardboard","red anemone","red cassia","red coral","red dogwood","red magnolia","red panda","red umbrella","red willow","red yarn","reef","reindeer","ribbon candy",
		"ribbon flower","ribbon wand","ring pop","river red gum","robot","rocky candy","rock elm","roo","rose star","rotten apple","round ribbon","sachet","saddle shoe","tree of sadness",
		"safari hat","sail","sand dollar","sangria","santa hat","sapling apple","sapling berry","sapling citrus","sapling lemon","sapling stonefruit","sapphire","satellite dish",
		"scarecrow","haunted","school dance","school supplies","scratch-n-sniff","sculpted","sea fan","sea shell","seasons","sea star","sea urchin cactus","seaweed","secret key",
		"seedling apple","seedling berry","seedling citrus","seedling lemon","seedling stonefruit","shade","lucky cookie","shamrock","shave ice","shooting star","spree","shuriken",
		"sigillaria","stringed","silver aluminum","silver bark","mountain silverbell","silver jingle","silver shell","skinny palm","skyline","slime star","smooth sumac","smore",
		"snowball","snowcone","snowflake","snowflake meadow","snowglobe","snow glow","snowshoe","snowy gumdrop","so bright","solar eclipse","solar power","sombrero","sound wave",
		"sparkle","sparkling palm","speaker","spice","spider","spiderweb","spilling coffee","spiral crystal","spirobranch","spooky crystal","spooky lantern","spooky moss","spooky",
		"spring basket","spring blossoms","spring cookies","spring dye","spring grass","sprinkled egg","spruce birdhouse","sprung","squat hedge","stained glass","standup stage",
		"star anise","star fish","star flower","starry willow","steel","steelwood","stillsplash","stocking","stone willow","stout","st. patrick's","strawberry cake","strawnango",
		"sugar cookie","sugar plum fairy","sugar skull","sugar","summer cherry","summer greens","sun beam","gaint sunglasses","sunshine","sweater","sword","sycamore maple",
		"tahitian pearl","tangled","tarot card","tasmanian oak","tea crab apple","teak","tea party","teddy bear","tesla coil","thorny seastar","thorny","three flower","tide pool",
		"tie dye","tiger eye","tiki","tinsel maple","toadstool","miracle-gro","torch","tornado","toy brick","toy train","toy","tp","travelers palm","travel","treasure map","treasure",
		"treble clef","christmas past","of life","of light","of love","tribal mask","trick or treat","trident maple","tritonia nudibranch","trophy","tropical bird","mystical tropical",
		"cocoa truffle","turquoise","turquoise","tutti frutti","gaint tv camera","twilight willow","twisted","twisting vine","umbrella","ume","broken heart","valentine cookies",
		"valentine's","vampire","vegespread sandwich","salad","venetian mask","venus","victorian hats","volleyball","warm seasons","water slide","wattle","wavy willow","wedding candle",
		"wedding invitation","weeping berry","western australian christmas","western black cedar","whispy","white cloud","white cypress","white enkianthus","white mulberry","white pearl",
		"white speckled alder","white trumpet","white weeping lilly pilly","whittled","wicker basket","wild desert lime","wilted","wind chime","wine bottle","wine cork","wine grape",
		"wing","winter flowering gum","winter gharcod","winter magic","winter spirit","winter sports","wishing","wisp willow","witch hat","witch pumpkin","witch vine","wizard","full moon",
		"wolfsbane","wooden button","wutong","magic yarn bonsai","yellow rose","yellow sea pen","yellow shower","amber maple","yellow weeping lilly pilly","yggdrasill","young sequoia",
		"zigzag","zipper","chocolate strawberries","mom's delicious bouquet","4th birthday cotton candy","fresh coat of paint","buttons n beads","in a bubble","spring wedding cake",
		"4th birthday cakepop","4th birthday candle","rainbow snow cone","cap and gown","4th birthday party","spring dress pattern","wheel barrow planter","wedding willow tree",
		"sparkling twilight willow","shopping bags","yarn ball","desert bloodwood","lavender bloom","bubble blowing","cologne bottle","chowder bowl","cali bridge","rainbow brush",
		"electric bubble","glass bubble","iridescent bubble","monarch butterflies","wine cask","lemon chiffon","roller coaster","dad's desk","venus flytrap","unrippened fruit",
		"fishing gear","harvest heart","shave kit","still life","paper mache","redwood majestic","sabal palm","wedding parasol","bradford pear","pencil pens","magnolia pink","bubble pipe",
		"whitelace promise","prom queen","cucumber sandwich","pruning shears","spring showers","sommelier","rainbow splattered","gardening tools","wedding tophat","trim topiary",
		"baton twirling","wedding veils","bubble wrap","backpack","bbq","crochet","flannel","groovy","horned","hydra","locker","melting","monster","mosaic","palette","preserves",
		"radioactive","seedling","spool","surrealist","tentacle","threes","maj. redwood","peach fuzz apple","space encased orange","olympic asian pear","ping pong sponge",
		"ring around","story book","birthday cake","space cloud","flower cluster","crystal crown","blue fhuz","starlight fiber","fickle flower","fantasy four","cherry gem",
		"inner glow","globe ii","astro juice","curly knot","sun lemon","carrot monster","fragmented moon","loyal oak","space passage","space pine","plasma plum",
		"gem pocket","pokey points","star portal","pink puff","space rock","asian rosewood","floating slime","tuft top","wooden windchime","cap","diploma","elyk","fiyah",
		"foliage","frizzy","furball","grapevine","honeyglass","nebula","pillis","slime","tassle","townhall","treasurer","tribute","urban","xarol","zork",
		"pearl cherry blossoms","peach ice cream","sweet flower heart","gold lace juniper","pink cucumber magnolia","mixed green salad","coming attraction",
		"utility belt","lace bow","opal brooch","crystal butterfly","frosted butterfly","romance candle","english daisy","rainbow eucalyptus","trail gear",
		"red giant","sunset hala","sunset hibiscus","union jack","loquat jam","rose jewel","topaz jewel","veggie kabob","traffic light","happy little",
		"mixed media","mini meteor","spanish mosaic","crape myrtle2","belgian poppy","freeze ray","saturn rings","lime slices","purple smoke","brussel sprout",
		"blue spruce","moorish tile","lemon twist","pineapple upsidedown","mixed veggie","glowing willow","asparagus","biblio","campfire","canoe","clicker",
		"dodo","duck","eagle","easychair","falcon","farmville","fascinator","flamingo","gameday","garden","goose","hawk","illuminating","jubilee","observatory",
		"owls","parrot","pelican","playground","pomelo","pretzel","rambutan","raven","ride","slide","sloog","sparkler","swan","telescope","top","turkey",
		"vulture","woodpecker","all day sucker","blue bliss blossom","blue cotton candy","cake pop","cake slice","candy cash","candy coated popcorn",
		"cherry meringue","chocolate cherry","colorful vines","confection","cross pattern","cupcake pyramid","decoupage","double popsicle","egg cream",
		"egyptian ankh","evergum","fiery red sucker","frosted sprinkle","frosted sugar cookie","gelatin","german porcelain","green dream sucker","gumball",
		"hard candy licorice","honeycomb","ice cream bar","jawbreaker","jelly bean evergreen","jelly bean juniper","lemon meringue","licorice willow",
		"orange bliss blossom","parfait","pink bliss blossom","purple passion sucker","rainbow cake","red velvet cake","ribbon pop","soft serve",
		"strawberry mouse","strawberry whip","sugaryroll","sunny sucker","taffy pull","toffee peanut","wonderful wafflecone","wrapper candy","acorn sparkle","beading",
		"blown glass","blue sky","candy crayon","candy necklace","coat of arms","farmer hat","fiery hoops","flashbulb","floating slime","freezing thermometer",
		"gardener bonnet","gelly fruit","glitter mushroom","leafy greens","lollipop cookies","long scarf","maple shade","metal wind chime","pan rack",
		"big pink & gold heart","police bobby","pool noodle palm","porcelain lily","savannah acacia","shades of pink","splash fun","sunburst orchid","sun orb",
		"sun panel","sweet music","watering can","waterwhirl","wheelbarrow","wildflower bouquet","4 & 20 blackbirds","calliope","candy gem","carousel lights","magic feather",
		"golden sugar","green bliss blossom","huge pie","orange cream","rattatouille","tailor's","teacher's","aerial silk","big top","egyptian jewelry","egyptian wings","penny arcade","pink puff","rosa menthley plum","ruffle skirt","sugar sprinkler",
		"super sugar","ancient hollow","ancient sorcery","blue bat","blue flame","bright fluff","chimera","colored sakura","dark sphere","de-gloom apple",
		"dragon nest","dragon scale","dutch birdhouse","fire wisp","floating ivory","frosty mug","glowing mushroom","glowing portal","gnarled ash","green flame",
		"green seaweed","jeweled solstice","light sphere","magic pine","misty-eyed","moon sloth","owl watch","potion bottle","rustic lantern","sleeping willow",
		"sorcerer lights","spellbound willow","spiral dust pine","summer family","summer friendship","sylvan","tear-sparkle","vine-stalk","vino","wilwhisp",
		"wizard lights","yum plumtree","aerial silk","big top","blue bean","cat condo","egyptian jewelry","egyptian wings","ethereal mist","eyeball","flight of bats",
		"flowering magic","hamster tube","fairy lantern","love spell pine","nesting jack o lantern","penny arcade","pet tag","pink puff","pumpkin vine",
		"rosa menthley plum","rubber band ball","ruffle skirt","square","sugar sprinkler","super sugar","warped","white carnation","black heart",
		"blueberry frosted","grooved coral","crow","sea fan","gnarled","hallowdream","haunted owl","jack's lantern","light castle","pecan roll",
		"sunlight sparkle","violet dryad","wispy","witchfire peach","autumn nights","autumn shade","united lights","autumn nights","autumn shade","candy lights",
		"fall fairy lantern","fall magic","fire mcintosh","glistening lights pine","granny smith","united lights","aurora twist","bauble bright","bubble light",
		"candy cane light","crystal evergreen","doily cookie","elf hat","everbright","fuzzy bell","gilded pine cone","giving bear","giving spirit",
		"hollybright ribbon","hollybright","ice light","light spheres","light string","paper wing","snow covered","snow man","starbright","star stack",
		"stocking ","strawberry christmas","twinkle","chilled berry","color record","festive foilage","flashy","flocked","fruitcake","golden ring","holiday bouquet","holiday cloud",
		"holiday palm","holiday spirit","hollybright cane","horse apple","ice","lighted wreath","lights fantastic","tree of joy","ornament","partridge","powder","red bopple","traditional",
		"ultimate holiday","crystal coal","gift box","gift","gilded holiday","halo","horn","rainbow ice crystal","santa","assorted ornaments","frosted gingerbread","holiday lace",
		"holiday magic","magic elf","12 drum","icicle dream","magic snowball","black hole","blue macaw","butterfly trunk","cyclamen","frosted fantasy pine","icy sugar maple","jungle cat",
		"mammee apple","monkey family","plentiful papaya","plump avocado","queen ann's lace","shattered moon","snow owl","tiger lily","turquoise treasure","winter hut","achiote",
		"black sapote","blooming tamarind","cacao","cherimoya","crowing flowers","exotic butterflies","exotic colors","fanning leaves","gilded jungle","golden breadnut","gold vine",
		"hanging fire","jungle colors","jungle ruins","leaf patterned palm","legendary feather","maripa palm","pink jackfruit","pink lapacho","sculpted gold","shards of gold",
		"turquoise crown","yellow soursop","animal perch","anti cupid's","apple hearts","apple watermelon","aquarium","banner","candy swirl","cat house in a","cherry mango","christmas",
		"dark diamond","dorado sunset","fanning hugh","farm pomegranate","feathered jungle","feather heart","flowering ceiba","gem pops","gummy ball","house","lightning trunk",
		"love balloon","love bouquet","lumberlove","native beads","nesting","orange raspberry","peanut butter cups","pisces fishbowl","quilted lemon","red envelope","red lantern",
		"sheriff star","siren","snow stream","soda pop","spring droplet","tea time","thawing colors","thorny bouquet","valentine bouquet","valentines willow","vinyl","zodiac snake",
		"bubble flower","crackle blue","crystal wand","curled glass pine","curled maple","curled","emerald bubble","emerald heart","emerald spire","emerald wand","everblue and gold",
		"flower key","folded ribbons","gear flower","golden coin","grab apple","grinding gears","heart print","magic water bucket","poppy flowers","poppy shrub","rainbow clouds",
		"rainbow lily","rainbow spirals","rainbow","silver shoes","spiral works","tin top","tinker trunk","twirled leaves","twister bubble","verdigris spiral","yellow brick",
		"emerald mulga","emerald swirl","hay tassle","heart medallion","magic oak twirl","party mardi","rainbow cloud","rainbow flame","rainbow twister","rainbow willow","spiral trunk",
		"tuft bow","beaded pine","doubloon palm","bagpipe","book jacket","bows and rings","castle story","diamonds and lace","lemon meringue","tree of runes","paper blossom","paper",
		"tin whistle","wedding bouquet","baby bonnet","cherry pie","elfin portal","emerald ribbon","fall spring","greenbeard","irish clover","irish harp","irish of life",
		"sleepy poppy","spring maypole","sticky notes","tin heart","witch of the east","arcadia","black olive","blooming almond","blue flamenco flower","bunny","bursting butterfly",
		"cactus pear","caffe latte","carnival mask","carved column","climbing rose","colorful fanned quilt","dual bougainvillea","dwarf","emerald apple","enchanted of life",
		"flamenco flower","flamenco ruffle","flower anchor","gold sea tile","golden emerald","grecian mosaic","grecian stair","hedge maze","iced mocha","indian pipe","juicy pomegranate",
		"lake","light trail","lightening bolt","lucky star","marrakech lamp","moroccan lantern","mystical waterfall","ornate plates","pistachio shell","pixie hideout","purple cypress",
		"rainbow umbrella","redbrick","riviera citrus","roman helm","ruby swirl","santorini beach","sea tile","spanish fans","spanish rose","spring fair award","spring willow",
		"whimsical wisps","will o' wisp","wind mosaic","wishing moon","pastel cherry blosom","sunset bougainvillea","coliseum wall cypress","acai palm","african safari",
		"amethyst wisternia","butterflies & blooms","cake stack","celebrations","chocolate chip","creamery","crocheted","croissant","emerald willow","eucalyptus blossom",
		"feather wreath","festive pinata","festive ribbons","fiery pepper","fiesta fireworks","flores de papel","freedom blooms","fruit basket","golden coconut","golden cypress",
		"golden ipe","green riviera citrus","green woods","haystacked","indulgence","kids craft","margarita","mexican lantern","mixed fruit","mother's bouquet","mothers day cake pops",
		"mothers day party","mystical aquamarine","of fame","orange arcadia","panettone","paper plane","pink peonies","pretty in pearls","pretty ruffles","rainbow golden coconut",
		"rose cake","ruby rose","sapphire butterflies","sassafras","serenity","shaving brush","sombrero blooms","sweet treats","tea bag","tea cuptree","traquil light","tropical spirit",
		"vegas crazy slots","zircon blooms","autumn lemon","beach bag","blood red bloom","blue lotus","cartouche","doum palm","egyptian jewel","firefly abode","golden date palm","henna",
		"jeweled scarab","nile mulberry","oasis of life","of mead","papyrus","petrified wood","potted olive","printed","red gentian","riviera glass","solid color","sunny pomegranate",
		"tamarin","bulgarian rose","wild cat","ankh relic","caduceus","chandelier","crystal beaded","egyptian bottle","egyptian lantern","gold doum palm","hookah","life sand",
		"magic dragon's blood","magic hourglass","papyrus ii","pharaoh fan","ra","scarab wings","mystical palm","ziggurat","5 tier cupcake","anniversary pops","big bonsai",
		"cupcake tower","nature's umbrella","tube slide","twin headed palm","5th birthday party","apple juice","butterflies mystree","cardboard","cat house","cinderella clock mystree",
		"cool","fairy hideout mystree","fairypuff mystree","firefly burrow mystree","fire light","ginormous nest","kennel","love flower","magical poppies mystree","moonflower",
		"morning glory","musical","ginormous nest","stone pine","poison apple mystree","puff pastry","pumpkin house mystree","royal","sky rocket","sparkling","spike palm","titania bed",
		"twisted blossom mystree","warm","wishing star mystree","a pixie pine","bird condo","carnival oak","colorful charms","enchanting","fairy berry","fairy fruit","fairyland hideout",
		"fairy lights","fairy maple","fairy wings","fantasy fairy","green cotton candy","lost shoe","magic carpet","magic mushrooms","magic wand","night mushroom","tree of pearls",
		"tree of shelters","pom-pom","stary night","storybook","sweet memory","time traveling","twilight","wizard hat","blueberry balloon","book stall","bread loaf","cake tray","dagger",
		"fairy godmother","fancy gingerbread","floating balloon","glittering shade","jelly","mini air balloons","neon","noodle","orange flame","oriental air balloon","pencil shavings",
		"princess","reef knot","special rose","storyteller","symmetree","tangy air balloon","turkish air balloon","autumn ribbon","giftgiver","ice sandwich","lost memories",
		"giant-o-lantern","tea pot","puzzled","a-maze","autumn breeze","bat","black soil","dark sorceress","fall leaves","glow jar","horseman's hollow","leaning of pumpkins",
		"moon charmer","moonlight capturing","owls habitat","pumpkin keeper","pumpkin","raven","red blossom","round table cake","secretly grinning","sleeping owls","sleepy stairs",
		"spooky carousel","spooky cave","spooky eyeball","spooky gathering","spooky party","spooky wine glass","swirly autumn","tealight","trick","twisted treats","windmill",
		"witch sticks","autumn tamarind","bat cowl","birth of autumn","candylicious","charged","day of dead","electro magnetic","experiment flora","feather vines","halloween apple",
		"halloween ghost","happy","hiding","horror","lost & found","of masks","of omega","purple autumn","queen of hearts","radioactive experiment","rose candle","science experiment",
		"seed of life","spooky maple","white feather","wild blooms","wireless bulbs","yellow feather palm","ball and chain","of heartbreak","pointy teeth","skulls and stars","spiked",
		"beach ball","blocky cedar","blocky pine","bulb","clay coin","clay make","clay pine","colourful slot","cowboy cactus","cutout fruit","fruitful","funky band","happy times",
		"kiddie eraser","multicolor clay","multi slinky","patchwork oak","pinata pine","pyramid block","rainbow circle","rainbow toy","stacking","supple flower","toy apple",
		"toy birdhouse","toy fan","toy lollipop","toy monad","toy palm","toy willow","woodpecker","barbecue grill","barbecue  vegetable","blob top","blue swirl","crystal lights",
		"holiday berry","bone china","charm magnified","gingerbread fairy","gleaming gala","grilled cabbage","grilled corn cob","harp","hessian snow","lustrous banyan","midnight glory",
		"midnight toasting","newlight","of blocks","oven grill","owl cuckoo","pet rock","plank stacking","pointe shoe","prism snowflake","russian doll","shimmering lights","sleepy kitty",
		"swirls holiday","toy lemon","tropical celebration","whipped cream","winter holiday","woodland toy","curly paper","entwined","golden wattle","ice cherry willow",
		"mossy sword willow","musical toy","tree of houses","queen of hearts","flower power","pyramid base","rainbow wool","resolution","snow cherry","train track","tum tum",
		"twisted autumn","vibrant rose","anvil and hammer","bird song","bonflower","celtic oak","chainmail","door willow","elemental","elm fairy","flora crown","glade watcher",
		"golden oak","magical willow","medieval orange","metamorphosis","mystical illuminated","mystical pine","tree of connections","tree of fairy flowers","tree of lanterns",
		"peridexion","pink pomegranate","pitchfork","quadrubranch","secret door","stained glass","tapestree","thatched house","yellow maple","bearded","bountiful hearts","butterfly bush",
		"bird cage","celtic clover","chinese coin","chocolate swirls","clover wreath","coin money","cosmic butterfly","crazy shopping","escort card","festive blossom","festive lantern",
		"film","flaming dandelion","flowering irish cherry","fountain","gala lantern","heart withering","horseshoe swing","its time","monterey cypress","mystic web","tree of hearts",
		"tree of love","tree of the middle ages","old red","pine outpost","pink shade","prop","rainbow clover","red clover","rose day","sakura fan","sakura lantern","sakura parasol",
		"sale sale","shamrock blooms","stained glass bloom","summer blossom","swirly celtic","teddy","theater","tiny floral","together forever","wedding gown","witch wood",
		"withered shamrock","amethyst bonsai","ancient scroll","aquamarine gem","aventurine","cactus knight","cedar castle","citrine gem","crystal mixture","elemental orb","fairy bath",
		"firefly willow","gem chip","hidden castle","jeweled goblet","kings crown","mountain spring","of balance","of potions","old lantern","purple empress","ranger","red cabbage",
		"riches","royal brooch","royal glass pine","royal oak","royal orchid","royal","secret archway","shielded","victory flag","willow outpost","wisp willow","yellow mist","art awards",
		"barrel dungaree","bird","bling it up","bollywood poster","bunny's","candy apple","candy treat","cotton candy","divine statue","egg wreath","fame","flowering gum","french villa",
		"furry fluff","golden silver","hair curler","hanging eggs","happy 6th bday","heart kite","heavenly frostree","jack in a box","jasper gem","loco","manicured","marshmallow bonsai",
		"merry festal","music awards","oyster pearl","parakeet","parisian chandelier","pendulum clock","pooch dryer","pretty things","queens oak","scarfy","school of fish","secret stash",
		"semaphore","card sharp","smiley","smithin'","smooth round","songbird","giantson prison","squirrel saloon","tide chandelier","trophies","tube worm","we make earth","wishing well",
		"wrangler","angels trumpet","balefire","boat hammock","calm palm","coniferous coral","crystalline","exotic banana","exotic coral","firework coral","first mate","glowing coral",
		"glowing jellyfish","gold coin","kraker suckers","lateen sail","lightbeam","message in a bottle","night sparkle","of mystries","overgrown palm","pearls and shells","pirate booty",
		"pirate plank","pirate willow","purple tunicates","rosey eyepatch","rusty cannons","sappire coral","sea coral","seafan coral","sea slug","starburst coral","star coral",
		"starfish palm","topiary","treasure gold","tropical flower","waterfall","webbed shelter","weeping willow","agave","ammo belt","barrel cactus","cacti","cactus patch",
		"colourful juniper","desert flower","desert mirage","desert night","desert sunrise","eagle dusk","feather elm","fiery dogwood","fringed wisteria","golden joshua","hangman",
		"horseshoe oak","pinon pine","savanna sunset","sheriff cactus","snake entwined","target practise","totem sequoia","touch me not","twisted frontier","wanted poster","watch tower",
		"wheels and barrels","wild bloom","wild cactus","wild dreamcatcher","wild west cactus","wild west redwood","wild wind","yucca",



		].fixOrder();
			
		//bonsai trees
		var treeTypes3=["habanero","andromeda","azalea","flowery","camellia","cherry","crabapple","magic crown of thorn","pomergrante","magic gem","hibiscus","maple","magnolia","orange",
		"pink almond","magic pink azalea","wisteria","magic rainbow prism","magic gum","tulip","weeping willow","white wisteria","aquatic","barberry","adenium","amethyst","bamboo","beech",
		"bobbing apple","brazilian rain","candycorn","chinese perfume","christmas","chrysanthemum","crape myrtle","delphinium","dogwood","dwarf plum","forsythia","fringe","fuchsia",
		"magic gardenia","ginkgo","grape","honeysuckle","key lime","lantana","lavender star","lilac","magic maple","neea","plum","powder puff","rhododendron","quince","rainbow chili",
		"red ribbon","star","white jasmine","white pine","desert rose","fir bonsai II","magic rainbow gem","red rose","magic pink harmony","magic porcelain ginkgo","pink harmony",
		"porcelain ginkgo","barberry ii","magic pink perfume","magic red poppy","red poppy","amethyst ii","bonsai blossom"].fixOrder();
			
		
				
		//building type catcher for random materials
		var buildings=["animal spa","fairy flower","palm paradise","beehive","garage","pig pen","haunted house","dream nursery","craftshop expansion","rainbow pond","summer poolhouse",
				"orchard","funhouse","duck pond","combine","greenhouse","sheep pen","spring garden","craftshop",
				"water wheel","crafting silo","horse stable","wildlife habitat",
				"cove","winter wonderland train station",
				"snow treasure","winter water wheel","feed mill","ice palace",
				"crop mastery billboard","animal mastery billboard","tree mastery billboard","baby playpen",
				"baby bunny hutch","recipe mastery billboard","volcano reef","aquarium","market stall","hawaiian treasure",
				"grove","beach resort","fishing hole","gas pump","hot spring","mountain palace",
				"jade habitat","jade aquarium","dino lab","bloom garden",
				"gnome garden","floating waterfall","imperial shipyard",
				"swimming pond","unicorn island","master lu's study","harmony garden","sunshine doghouse","cupcake doghouse","dream house",
				"baby nursery","sturdy doghouse","sporty doghouse","floating castle","turtle pen","arborist center","farmhand center",
				"dragon lair","tomb treasure","animal workshop","haunted mansion","monster lab","seedling nursery",
				"witchin' cauldron","tree of life","ferris wheel","bumper cars","big windmill","sally's seed shop",
				"bloom mastery billboard","atlantis garden",
				"wishing fountain","bonsai garden","holiday square","holiday treasure","big barnyard","cheery house","extinct animal zoo","herb garden","penguin skate park",
				"crystal garden","enchantment shop","home mushroom","rivermist fortress","troll treasure","garden amphitheater",
				"tree of love","gnome vineyard","mystery crate","fountain geyser","hot air balloon","spring garden","orchard upgrade",
				"horse paddock","livestock pen","aviary","zoo","pet run","cow pasture","atlantis crafting workshop",
				"atlantis palace","atlantis treasure","horse hall","australian treasure","australian crafting workshop",
				"daydream island","australian vineyard","botanical treasure","pegasus pen","astral observatory",
				"sunny float field","space ship","space guardian","slime pile",
				"candy shop","candy factory","eversweet tree",
				"rock candy boulder","candy pile","marshmallow mound","gifting tree","astral observatory","dream deer woods","carnival fun house",
				"destiny bridge","enchanted rose bush","summer hillside","mystical storage cellar","duckula's dark tower","duckula's cryptic castle","irrigation well",
				"hollybright storage cellar","hollybright tree","hollybright park","gift","giant tree house","ice cream parlor","magic biodome","artifact","hidden palace","lovebird roost",
				"barn door","windmill piece","broken silo","fallen house","emerald city","munchkin country","pantheon isle","grotto harbor","small broken vase","medium column ruin",
				"large broken vase","extra large column ruin","zezura oasis","extra large genie samovar","small genie ring","medium genie bottle","large genie lamp","enchanted waterfall",
				"bonbon boutique","hill castle","boot house","large garden door","medium fairyland signpost","small old storybook","extra large garden bridge","fairytale treasure",
				"rose garden","all american diner","pretzel factory","town hollow","mausoleum on the hill","small tombstone","medium tombstone","large tombstone","extra large tombstone",
				"horesman hollow treasure","pirate ship wreck","spooky mansion","tower of pranks","toy mansion","small deck of cards","medium lemonade stand","large kiddie play tent",
				"extra large horse swing","toy town treasure","eggnog stand","pumpkin kitchen","soup kitchen","opera house","house of the mystics","santa's workshop","village granary",
				"large enchanted gargoyle","medium broken boulders","small fighting sword","extra large ale ruins","dimsum cart","clover tower","valentine's cruise ship","royal granary",
				"house of the royals","small locked treasure chest","medium enchanted well","large engraved runes","extra large abandoned cart","brook blossom house","cake house",
				"chirpy treehouse","farmer's market","medieval observatory","parade float house","sports colosseum","mermaid statue","stone water fairy","pirate loot","abandoned loot",
				"sailorman cannon","ship hull","sea wreckage","abandoned shack","abandoned wagon","fallen log","winch house",



				
			].fixOrder();

		//material types
		//defined separately for easy options menu
		var standardMaterials=["clay brick","wooden board","harness","horseshoe","blue baby blanket","bottle","floral bracket",
				"bamboo rail","reed thatch","smoker","beeswax","shovel", 
				"gear","axle","rope","hammer","twine","concrete","hinge","screwdriver","tin sheet","vehicle part","pink baby blanket",
				"honeybee","wrench","clamps","pipe","shrub","grazing grass","fence post","painted wood","water pump","log","stone lantern",
				"steel beam","wire","hay bundle","saddle","bridle","red beam","screw","aluminum siding",
				"candy cane beam","conifer dust","ice post","rail spike","rail tie","coal","pickaxe","hair dryer","snow axle","snow chain","snow gear","sack",
				"scoop ","belt ","snow brick","snowflake","ice nail","snow globe","ice board","frozen beam","blue roller","white paste",
				"white paper","white overalls","black light","light plywood","green paper","green light","orange overalls","red paste","red roller","dark plywood",
				"wood stain","masking tape","scaffolding","brush","blanket","salt lick","sod piece","grass seed","water pail",
				"raw wood","feed bucket","wooden peg","baby carrot bunch","bunny bed","branch ball","hutch wire","bunny tunnel",
				"wood block","wood glue","clamp","sand paper","baby fish","ocean rock","stony coral","volcano monitor","buoy",
				"filter","small fishing net","large fishing net","small crowbar","large crowbar","awning","basket","price card",
				"garden fence","daffodil","potting soil","twig","tiny window","toadstool","mulch soil","turf roll","mini boulder",
				"swim suit","beach sandal","tropical cup","lure","lily pad","fishing pole","fuel pipe","level gauger","steel sheet",
				"bed rock","mineral infusion","steam","stone pillar","terra cotta","hanging incense","small axe","boat hook","wheelbarrow",
				"cement","fill dirt","metal post","flower tie","garden edging","trellis","floating rock","sparkle seed","baby mobile",
				"magic water","rigging","sail","wood plank","leaf net","water bucket","skimmer","parchment","dowel","book","yellow bamboo",
				"zen sand","stone pick","rainbow clover","heart of gold","enchanted blossom","chew toy","dog bed","tennis ball","trough",
				"queen bee","pacifier","drift wood","java fern","scientific scale","research paper","tree incubator","cloning solution",
				"massage stone","buffet tray","cloud brick","enchanted bamboo","hovering charm","dragon spell","chisel","talisman",
				"magic boulder","gold dust","stamp","ball of wool","mallet","stone","nail","cut bamboo","brick","cobweb","old fence",
				"deadwood","rusty gear","rusty post","thunder cloud","fertilizer stake","mulch","seedling tray","ladle","enchanted iron",
				"gummy tentacle","life essence","magic bubble","puffy cloud","gondola","carnival light","bearings","steering wheel",
				"wooden shaft","wooden cog","barnyard shingle","purple roller","windmill blade","wooden giraffe","wooden tiger","bumper",
				"wooden zebra","drying rack","flower apron","green tape","yellow paper","seatbelt","pepper packet","steering wheel",
				"drill bit","copper tube","bamboo","bonsai pedestal","bonsai pot","grafting tool","everything nice","grain of spice",
				"grain of sugar","lamp post","cobblestone","bench","lumberjack saw","power saw","mystery horse","mystery tree","mystery bloom",
				"meteorite","broken thermometer","food chain","clay pot","special soil","peat pellet","corporate sponsor","icicle ramp",
				"snow machine","water","crystal seed","crystal","mithril ore","star rock","warpstone","sun light rope","moon gem",
				"armillary sphere","fairy dust","magic maple","rain drop","vial of sunlight","magic mushroom","rain drops","garden bricks",
				"garden vines","garden steps","cupid's arrow","heart leaf","teddy bear","bronze horse shoe","gold moon","silver clover",
				"grape vine","stone bench","wine barrels","slop bucket","scissor","blue flower","geode","gold bar","green flower","leaf blower",
				"magma","pot","purple flower","rake","snips","stardust","sunburst cloud","sunrise seed","coral chisel","coral hammer",
				"ultramarine crystal","horeshoe crabshell shovel","bucket of gold paint","coral nugget","marble vase",
				"garden sketches","coral shears","coral crowbar","coral key","fancy hay","hi-tec salt","pretty saddle","mining pickaxe","mining key",
				"white sand","volcanic rock","blue sea water","wine barrel","fertile soil","grape food",
				"coffee thermos","star chart","telescope","golden wand","moon ray","phoenix feather","metal wire","oven rack","copper pipe",
				"enchanted mist","fairy magic","swimmies","night cap","polkadot pajamas","pool house plans","rainbow stardust",
				"summer sun","warm milk","gold paint","snip","crystal cradle","fizzy field","goo away","slime sucker","sunshine orb",
				"big red button","hyper speed thruster","portal window","celestial crystals","astro saplings","floaty spore","candy blaster","candy scoop","cream of bliss",
				"diamond candy pick","essence of frosting","marsh mortar","silver sugar shovel","sugar hammer","sweet aroma","balloons","tent canvas","warped glass","magic moss","radiant rays",
				"sparkling stream","crystal soil","seed bulbs","sprouting orb","comet tail","flip flops","kite tail","pig tale","sea water","ship in a bottle",
				"anvil of courage","bright metal","stone of sorcery","charmed clippers","anti-thorn charm","grass patch","nesting hay","rabbit burrow","black bat","duckula coffin",
				"fang","gargoyle","ghost guard","red brick","rope","spider web","water pail","heat stones","salt water","spa towel","evergreen cedar beam","glow nail",
				"holly crowbar","hollybright scissors","holly light fence","holly trough","sparkle lights","sparkle spackle","stardust gate","clay tile","freezer","milkshake cup",
				"scoop","stepping stone","window","bubble potion","butterfly","crystal acorn","mini mattock","hand brush","gilded pedestal","gleaming glyphs","gold stone",
				"bird toy","lovebird feeder","lovebird nest","emerald wood","munchkin hat","silver bell trowel","silver shoe","stardust cement","woodman axe",
				"anchor","ancient urn","bistro set","blustery bellows","building stones","cabin log","chalk menu","clock gears","clock hands","coiled rope","cooking salt",
				"floral watering can","flowerpress book","flower table setting","greco vases","millstone","nature guide","potted roses","purple canvas","red clay bricks",
				"rose trellis","sea glass glue","shimmering tape","stained glass","statue pedestal","storage crates","tent pole","pearl of wisdom","golden rope","genie polish",
				"genie incense","emerald spades","ankh","drill tool","engraved stones","magic dust","refilling pail","caramel ganache","chocochip bowl","chocolate cup","coral stones",
				"enchanted wings","feather pen","garden pitchfork","key","fairy beans","magic shovel","magic wand","pixie dust","revolving sprinklers","soil of wisdom",
				"baking hat","diner chair","diner jukebox","pretzel dough","strawberry coulis jar","vintage poster","bucket","candy apples","carton","hay stack","jack-o-lantern",
				"misfortune cookie","mini fork","pumpkin fall wreath","spooky candle stand","spooky magnifying glass","wagon","grape wine barrel","creepy coffin","ghostly portrait",
				"pirate eye patch","pirate sail","pirate secret message","spooky lantern","key oil","paints and brushes","toy bucket","toy crane","toy hinge","toy ramp","toy rope",
				"wheel spokes","wind up key","colored glass","colored sparkles","toy glue","pecan pine cone","soup bowl","soup cauldron","ladle","maple syrup","barley malt syrup",
				"chocolate curls","cinnamon stick","cream swirl","cheery flutes","crystal light","elven rope","fay hinge","handspun silk","lime mortar","magical wand","medallion",
				"medieval brick","medieval timber","moon stones","neon shades","presents list","santas letterbox","snowflakes","war hammer","woodland timber","party bottle",
				"bow anchor","chopsticks","dimsum bowl","dimsum dip","gold hay","kings chalice","lifebuoy","medieval flask","leprechaun","mystic aero","pile of stained glass",
				"pot of gold","roof tiles","rose seal","royal amulet","building stones","clover shake","wheel of the ship","etching glass","mortar bucket","stone brick","arena helmet",
				"arena ticket","barbed wire","barn lock","barrel of screws","bird couple","bird feed","blossom saplings","cake frosting","cheer placard","cherry umbrella","coal",
				"fishing nets","floral cake","forgedcoin","frosted cupcake","gathering basket","hammer and anvil","honey jar","maracas","mayo hats","telescope","metal supported barrels",
				"mini radar","organic fruits","water pail","pink basket","ranch hay bale","refined metal bars","ship wheel","single bird house","solar model","special cinco cake",
				"steel ropes","timber fence wood","timberwood stacks","two man saw","anchor","anchor band","doubloon","moss wood shaving","ship building rod","glue laminate",
				"paint bucket","wood clad",



				].fixOrder();
			
		var	aviaryMaterials=["clamp","hinge","screwdriver",].fixOrder();
		var enchantedMaterials=["mithrilore","warpstone","starrock","vialofsunlight","magicmaple","raindrop","fairydust","sunlightrope","moongem","armillarysphere","magicmushroom",].fixOrder();				
		var animalbillboardMaterials=["darkplywood","greenlight","orangeoveralls","greenpaper","redroller","redpaste",].fixOrder();
		var animalspaMaterials=["spatowel","saltwater","heatstones",].fixOrder();
		var mistletoelaneMaterials=["lumberjacksaw","powersaw","grainofsugar","grainofspice","everythingnice",].fixOrder();
		var aquariumMaterials=["buoy","filter","oceanrock",].fixOrder();
		var arboristMaterials=["researchpaper","treeincubator","cloningsolution",].fixOrder();
		var craftshopMaterials=["wrench","pipe","clamp","metalwire","ovenrack","copperpipe",].fixOrder();
		var atlantisMaterials=["coralchisel","coralhammer","ultramarinecrystal","horseshoecrabshellshovel","bucketofgoldpaint","coralnugget","marblevase","gardensketches","coralshears","coralcrowbar","coralkey","coralchisel","bronzehammer","ultramarinecrystal",].fixOrder();
		var hollybrightMaterials=["evergreencedarbeam","glownail","hollycrowbar","hollybrightscissors","hollylightfence","hollytrough","sparklelights","sparklespackle","stardustgate",].fixOrder();
		var gnomegardenMaterials=["tinywindow","toadstool","gardenfence",].fixOrder();
		var livestockpenMaterials=["waterpump","steelbeam","wire",].fixOrder();
		var orchardMaterials=["brick","nail","woodenboard","leafblower","pot","rake",].fixOrder();
		var horsepaddockMaterials=["log","saddle","bridle",].fixOrder();
		var cowpastureMaterials=["haybundle","stone","tinsheet",].fixOrder();
		var petrunMaterials=["paintedwood","waterpump","fencepost",].fixOrder();
		var wildlifepenMaterials=["fencepost","shrub","grazinggrass",].fixOrder();
		var zooMaterials=["wrench","shrub","pipe",].fixOrder();
		var australianMaterials=["miningpickaxe","miningkey","whitesand","volcanicrock","blueseawater","winebarrel","fertilesoil","grapefood","stonebench","winebarrel","grapevine",].fixOrder();
		var bunnyhutchMaterials=["babycarrotbunch","bunnybed","branchball","hutchwire","bunnytunnel",].fixOrder();
		var babynurseryMaterials=["pacifier","babyblanket","babymobile",].fixOrder();
		var babyplaypenMaterials=["bluebabyblanket","saltlick","brush",].fixOrder();
		var beachresortMaterials=["tropicalcup","beachsandal","swimsuit",].fixOrder();
		var beehiveMaterials=["smoker","beeswax","woodenboard","queenbee","honeybee","nail","brick",].fixOrder();
		var bigbarnyardMaterials=["trough","barnyardshingle","slopbucket",].fixOrder();
		var bigwindmillMaterials=["windmillblade","woodencog","woodenshaft",].fixOrder();
		var bloomgardenMaterials=["flowertie","gardenedging","trellis",].fixOrder();
		var bloombillboardMaterials=["greentape","yellowpaper","purpleroller",].fixOrder();
		var bonsaigardenMaterials=["graftingtool","bonsaipot","bonsaipedestal",].fixOrder();
		var bumpercarMaterials=["steeringwheel","bumper","seatbelt",].fixOrder();
		var sweetacreMaterials=["candyblaster","candyscoop","creamofbliss","diamondcandypick","essenceoffrosting","marshmortar","silversugarshovel","sugarhammer","sweetaroma",].fixOrder();
		var carnivalfunhouseMaterials=["warpedglass","tentcanvas","balloons",].fixOrder();
		var craftingsiloMaterials=["tinsheet","hinge","screwdriver","screw","redbeam","aluminumsiding",].fixOrder();
		var cropbillboardMaterials=["lightplywood","whiteoveralls","blacklight","whitepaper","blueroller","whitepaste",].fixOrder();
		var crytalgardenMaterials=["crystal","crystalseed","water",].fixOrder();
		var doghouseMaterials=["chewtoy","dogbed","tennisball",].fixOrder();
		var seasonalMaterials=["creepycoffin","ghostlyportrait","pirateeyepatch","piratesail","piratesecretmessage","spookylantern","birdtoy","lovebirdfeeder","lovebirdnest",
		"rabbitburrow","nestinghay","grasspatch","lovelypurpleflower","beautifulblueflower","gorgeousgreenflower","pileofsnow","snowmanscarf","snowmanbutton","magichat","gps","silverbell",
		"holidaylights","milkandcookies","holidaycheer","reindeertreat","love","flowertrim","carriagelamp","horsetreat","fancychocolate","cozyblanket","corporatesponsor","snowmachine","icicleramp","bronzehorseshoe","goldmoon","silverclover","snowbrick","nowflake","icenail","snowglobe","iceboard","frozenbeam","bowlofpunch","bucketofpaint","bowlofsnacks","hauntedbrick","goo","creepycandle","knockers","love","flowertrim","fancychocolate",].fixOrder();
		var mysticalMaterials=["anvilofcourage","brightmetal","stoneofsorcery","charmedclippers","anti-thorncharm",].fixOrder();
		var dinolabMaterials=["metalpost","filldirt","cement",].fixOrder();
		var dragonMaterials=["talisman","chisel","magicboulder",].fixOrder();
		var dreamdeerMaterials=["sparklingstream","magicmoss","radiantrays",].fixOrder();
		var dreamnurseryMaterials=["polkadotpajamas","warmmilk","nightcap",].fixOrder();
		var duckpondMaterials=["wateringcan","shovel",].fixOrder();
		var duckulacrypticMaterials=["ghostguard","gargoyle","spiderweb",].fixOrder();
		var duckuladarkMaterials=["blackbat","duckulacoffin","fang",].fixOrder();
		var extinctanimalMaterials=["meteorite","brokenthermometer","foodchain",].fixOrder();
		var jadefallsMaterials=["stonepillar","terracotta","hangingincense","book","dowel","parchment","bamboorail","reedthatch","claybrick","sail","rigging","woodplank","smallaxe","wheelbarrow","boathook","hoveringcharm","cloudbrick","enchantedbamboo",].fixOrder();
		var hawaiiMaterials=["babyfish","stonycoralpiece","volcanomonitor","seawater","flipflops","shipinabottle","largecrowbar","smallcrowbar","smallfishingnet","largefishingnet",].fixOrder();
		var spaceMaterials=["crystalcradle","fizzyfield","gooaway","slimesucker","sunshineorb","bigredbutton","hyperspeedthruster","portalwindow","celestialcrystals","astrosaplings","floatyspore",].fixOrder();
		var winterMaterials=["icepost","coniferdust","candycanebeam","railspike","railtie","lumpofcoal","pickaxe","hairdryer",].fixOrder();
		var ogMaterials=["pearlofwisdom","goldenrope","geniepolish","genieincense","emeraldspades","ankh",].fixOrder();
		var hauntedMaterials=["ladle","enchantediron","gummytentacle","thundercloud","rustypost","rustygear","mallet","stonepick","cobweb","deadwood","oldfence",].fixOrder();
		var fairyflower=["pigtale","kitetail","comettail",].fixOrder();
		var farmhandMaterials=["scientificscale","massagestone","buffettray",].fixOrder();
		var feedmillMaterials=["scoop","sack","belt",].fixOrder();
		var ferriswheelMaterials=["gondola","bearings","carnivallight",].fixOrder();
		var fishingholeMaterials=["lure","fishingpole","lilypad",].fixOrder();
		var floatingwaterfallMaterials=["floatingrock","magicwater","sparkleseed",].fixOrder();
		var fountaingeyserMaterials=["magma","goldbar","geode",].fixOrder();
		var gardenamphMaterials=["gardenbrick","gardenvines","gardenstep",].fixOrder();
		var gaspumpMaterials=["levelgauger","steelsheet","fuelpipe",].fixOrder();
		var giftingtreeMaterials=["crystalsoil","seedbulbs","sproutingorb",].fixOrder();
		var groveMaterials=["miniboulder","mulchsoil","turfsoil",].fixOrder();
		var harmonygardenMaterials=["zensand","yellowbamboo","stonelantern",].fixOrder();
		var horsegallMaterials=["prettysaddle","hi-tecsalt","fancyhay",].fixOrder();
		var hotspringMaterials=["bedrock","mineralinfusion","steam",].fixOrder();
		var irisrainbowMaterials=["fairymagic","stardust","enchantedmist",].fixOrder();
		var waterwheelMaterials=["gear","axle","rope",].fixOrder();
		var lighthouseMaterials=["stone","log","steelbeam",].fixOrder();
		var pegasuspenMaterials=["goldenwand","moonray","phoenixfeather",].fixOrder();
		var garageMaterials=["woodenboard","nail","brick",].fixOrder();
		var recipebillboardMaterials=["sandpaper","woodglue","clamps",].fixOrder();
		var sallyseedMaterials=["flowerapron","dryingrack","pepperpacket",].fixOrder();
		var seedlingnurseryMaterials=["fertilizerstake","seedlingtray","mulch",].fixOrder();
		var astralMaterials=["starchart","telescope","coffeethermos",].fixOrder();
		var summerpoolsideMaterials=["summersun","swimmies","poolhouseplans",].fixOrder();
		var sunriseforestMaterials=["stardust","sunriseseed","sunburstcloud",].fixOrder();
		var swimmingpondMaterials=["skimmer","leafnet","waterbucket",].fixOrder();
		var treebillboardMaterials=["scaffolding","maskingtape","woodstain",].fixOrder();
		var treeoflifeMaterials=["lifeessence","magicbubble","puffycloud",].fixOrder();
		var treeofloveMaterials=["teddybear","heartleaf","cupid'sarrow",].fixOrder();
		var turtlepenMaterials=["javafern","driftwood","pottingsoil",].fixOrder();
		var unicornislandMaterials=["enchantedblossom","rainbowclover","heartofgold",].fixOrder();
		var wishingfountainMaterials=["drillbit","coppertube","cutbamboo",].fixOrder();
		var gianttreehouseMaterials=["claytile","steppingstone","window",].fixOrder();
		var icecreamparlorMaterials=["freezer","milkshakecup","scoop",].fixOrder();
		var magicbiodomeMaterials=["bubblepotion","butterfly","crystalacorn",].fixOrder();
		var rainforestMaterials=["minimattock","handbrush","gildedpedestal","gleamingglyphs","goldstone",].fixOrder();
		var emeraldvalleyMaterials=["emeraldwood","munchkinhat","silverbelltrowel","silvershoe","stardustcement","woodmanaxe",].fixOrder();
		var rivieraMaterials=["ancienturn","anchor","stainedglass","statuepedestal","shimmeringtape","seaglassglue",].fixOrder();
		var countryclockMaterials=["clockgears","clockhands","redclaybricks",].fixOrder();
		var wildlifelodgeMaterials=["buildingstones","cabinlog","natureguide",].fixOrder();
		var fairytalefieldsMaterials=["refillingpail","coralstones","enchantedwings","featherpen","gardenpitchfork","key","fairybeans","magicshovel","magicwand","pixiedust",
		"revolvingsprinklers","soilofwisdom",].fixOrder();
		var horsemanhollowMaterials=["bucket","candyapples","carton","haystack","jack-o-lantern","misfortunecookie","minifork","pumpkinfallwreath","spookycandlestand",
		"spookymagnifyingglass","wagon","grapewinebarrel",].fixOrder();
		var kingdomMaterials=["roseseals","etchingglass","stonebrick","mortarbucket","buildingstones","goldhay","kingschalice","medievalflask","mysticaero","pileofstainedglass",
		"rooftiles","royalamulet",].fixOrder();
		var avalonMaterials=["limemortar","medallions","warhammer","magicalwand","medievaltimber","medievalbricks",].fixOrder();
		var toytownMaterials=["keyoil","paintsandbrushes","toybucket","toycrane","toyhinge","toyramp","toyrope","wheelspokes","windupkey","coloredglass","coloredsparkles","toyglue",].fixOrder();


		var fixTitles={/*no longer works*/};

		var otherConsumables=["watering can","puppy kibble","arborist","farmhand","white truffle","flower food",
				"black truffle","gold truffle","brown truffle","animal feed","fertilize all","sunshine dog treat",
				"cupcake dog treat","sturdy dog treat","sporty dog treat","mystery seedling","love potion","instagrow",
				"fuel","mystery gift","special delivery","unwither","capital one gift","turbo charger","double avatar",
				"gardener","mystery bulb","dog treat","coins","currency bundle","mystery game dart","pig chow","coconuts",
				"gopher treat","canned food","dry food","treats","unicorn wishes","bingo balls","time tonic","flower smoothies","bird seed","flower coins",
				//don't know if this will work but we'll see
				" xp "," zp "," sp "," cp "," fp ",
			].fixOrder();
		
		var specialMaterials=["gem",].fixOrder();
				
		var	specialEvents=[].fixOrder();

		var craftingMaterials=[].fixOrder();
				
		//removed all quest items and linked them to sendhelp
		var questItems=[];

		//merge materials for searching
		var materials=[].concat(standardMaterials,otherConsumables,craftingMaterials,specialMaterials,specialEvents,animalspaMaterials,animalbillboardMaterials,
		aquariumMaterials,arboristMaterials,astralMaterials,atlantisMaterials,australianMaterials,babynurseryMaterials,babyplaypenMaterials,beachresortMaterials,
		beehiveMaterials,bigbarnyardMaterials,bigwindmillMaterials,bloombillboardMaterials,bloomgardenMaterials,bonsaigardenMaterials,bumpercarMaterials,
		bunnyhutchMaterials,carnivalfunhouseMaterials,cowpastureMaterials,craftingsiloMaterials,craftshopMaterials,cropbillboardMaterials,crytalgardenMaterials,
		dinolabMaterials,doghouseMaterials,dragonMaterials,dreamdeerMaterials,dreamnurseryMaterials,duckpondMaterials,duckulacrypticMaterials,duckuladarkMaterials,
		extinctanimalMaterials,fairyflower,farmhandMaterials,feedmillMaterials,ferriswheelMaterials,fishingholeMaterials,floatingwaterfallMaterials,
		fountaingeyserMaterials,garageMaterials,gardenamphMaterials,gaspumpMaterials,giftingtreeMaterials,gnomegardenMaterials,groveMaterials,harmonygardenMaterials,
		hauntedMaterials,hawaiiMaterials,hollybrightMaterials,horsegallMaterials,horsepaddockMaterials,hotspringMaterials,irisrainbowMaterials,jadefallsMaterials,
		lighthouseMaterials,livestockpenMaterials,mistletoelaneMaterials,mysticalMaterials,orchardMaterials,pegasuspenMaterials,petrunMaterials,recipebillboardMaterials,
		sallyseedMaterials,seasonalMaterials,seedlingnurseryMaterials,spaceMaterials,summerpoolsideMaterials,sunriseforestMaterials,sweetacreMaterials,
		swimmingpondMaterials,treebillboardMaterials,treeoflifeMaterials,treeofloveMaterials,turtlepenMaterials,unicornislandMaterials,waterwheelMaterials,
		wildlifepenMaterials,winterMaterials,ogMaterials,wishingfountainMaterials,zooMaterials,enchantedMaterials,emeraldvalleyMaterials,rainforestMaterials,rivieraMaterials,
		fairytalefieldsMaterials,horsemanhollowMaterials,wildlifelodgeMaterials,toytownMaterials,kingdomMaterials,avalonMaterials,countryclockMaterials).fixOrder();
		
		//collectibles for menu
		var colBerries=["fruit bar","sorbet","preserves","dried berry","berry basket"];
		var colCitrus=["bubble gum","juicer","sherbet","fruit wedge","cirtus peel"];
		var colCows=["cow bell","milking bucket","milking stool","milk bottle","more cowbell"];
		var colFlowers=["corsage","hummingbird","dried petals","butterfly","pollen"];
		var colGrains=["grindstone","scythe","bran","chaff","flour"];
		var colSquash=["pumpkin seeds","stuffed pasta","decorative gourds","yerba mate","sitar"];

		//merge collectibles for searching
		var colTypes=[].concat(colBerries,colCitrus,colCows,colFlowers,colGrains,colSquash).fixOrder();

		//collectible set names for collecting random items
		var colGroups=["Berries","Citrus","Cows","Flowers","Grains","Squash"];

		//getting back to animals
		var calfTypes=[
				"winter's glow calf","mistletoe lane","mystical grove","candy cane","green patch","holiday wreath","lunar new year","pink patch","purple valentine","red brown",
				"western longhorn","yellow patch","mini longhorn","black shorthorn","milking shorthorn","gray jersey",
				"yellow referee","irish moiled","brown swiss","black angus","frankenstein bride","belgian blue","new year 2",
				"holiday lights","holiday top hat","snow blading","sport fan","lion dance","frosty fairy","cherry blossom",
				"fall fairy","welsh black","red heart","maple wreath","red poll","tea party","messy picnic","diving bell",
				"kelly green","new year","blue patch","cream pie","galician blond","ankole watusie","birthday white park",
				"white park","art deco","calfstruction worker","frog prince","southern belle","milky way","milking zebu",
				"milky way","ankole longhorn","bovine belle","real ca milk","texas longhorn","apple juice","red horned",
				"horse costume","bat hat","madam morgan","green apple","new wave","black holstein","in hoodie","in sweater",
				"rag doll","holiday dwarf","silver pega","christmas present","vintage deco","holiday light","pine cone",
				"snow battle","spotted holiday","hungry hungry","ugly sweater","balloon 2","jack frost","more 2 love",
				"crystals fairy","go lightly","green sweater","my fair lady","atlantean","spa cow calf","med riviera",
				"giant bow","lace heart","mardi gras queen","moon mask","neon hearts","freezer pega","sour grapes","silver gold",
				"spurned fancy","sun mask","dark cloud","magic carpet","talk show","french mime",
				"autumn","belted","chocolate","chrome","devon","dexter","disco","english","fan","flower","kerry",
				"gelbvieh","groovy","hereford","highland","cornucopia","criollo","snowflake","santa","telemark","caroling",
				"robot","simmental","tuscan","valentine","green","vineyard","fall","pineywoods","blue","canadienne","sailor",
				"shorthorn","b0v1n3-11","jersey","holstein","referee","guernsey","ayrshire","milky","brown","red","randall",
				"nightmare","skeleton","pumpkin","tourist","fairy","dragonfly","charolais","plush","flannel","pilgrim",
				"holiday","mohawk","neapolitan","panda","pink","purple","rainbow","icicle","sweater","frozen","judge","baby",
				"american","crystal","romance","romeo","vosges","cocoa","smitten","rose","carnival","headdress","aloha","luau",
				"lowline","caddy","cupcake","shark","leprechaun","hibiscus","orchid","lava","longhorn","winged","spring",
				"cracker","couture","mother","aurochs","natural","bovonia","jester","african","lavender","cloud","carabao",
				"cotton","bride","flapper","beach","dairy","mongolian","yakow","dragon","yanbian","kimono","balloon","cool",
				"firefly","ghengis","mayan","cheese","jade","astronaut","spanish","swiss","gaur","aubrac","captain","casanova",
				"earth","daisy","adventure","javelin","perennial","delicate","aromatic","flowering","budding","hologram","bulb",
				"fire","scholar","venus","chili","moon","constellation","vechur","pirate","frightened","chrysanths","foal",
				"glow-in-the-dark","wizard","beefalo","cornucalfpia","golfcourse","hustlin'","dzo","werewolf","disappear",
				"dracalfla","monster","rhinestone","vampire","bulltrina","woodland","treat","gourd","sugar","aquarium",
				"colonial","quilted","camilla","holly","spooky","abomidable","coco","costume","truffle","cider","glass",
				"kitchen","angel","elf","cleopatra","fur","toy","fireworks","caroler","meow","dewdrop","bouquet","bubble","diamond","lineback",
				"glam","je'taime","sad","anti-valentine","cleaning","corsetted","storage","caravan","impostacow",
				"deepsea","gold coins","irish coffee","nanny","poseidon","sea","sponge","tea leaf reader","atlantis",
				"creamer","cubist","lucus","raingear","slime","waitress","meadows","gem","quartz","spring basket","milk maid","cow bunny",
				"designer suit","beehive","gem","global","picasso","pop","tiedye","slimed","stringed","boardshorts",
				"drought master heifer","australian freisian sahiwal","black milking shorthorn","fruit hat","gray pineywoods",
				"poofy skirt","adaptaur","boardshorts","boran","breakfast","deheiferized","evening","greyman","illawarra","milkmaid","raingear","safari",
				"aussie","flaming heart ice","rabbit ears","faulait cow","pinwheel","4th birthday","chameleon","crystal pega","cyclist","hiker",
				"maid of honor","rainbow spotted","secretary","sticker","street performer","droughtmaster","cow-fe au lait","loving",
				"cap n gown","space alien","coffee cake","cake hat","light stripe","behem","clerk","fwuzzy","kanga","mossy","woc",
				"string of lights","flag waving longhorn","over the moon","coffee berry","pink fwuzzy",
				"strawberry milk","koi scaled","cobble up","chinese zodiac","aurora","candied","canoe","confetti","cowfetti","dogwood",
				"galaxy","knitted","purplecorn","sneaker","colorful","space","board shorts","blueberry cream","blue frosted","candy striped",
				"chef","fruit punch candy","jelly bean bovine","lemon lime","polka desserty","soda jerk","sweet","high fashion","lavender lily","meteorologist",
				"pink cotton","prussian porcelain","raincoat and wellies","summer flower","yoga","rickety","ladybug hippo","acorn moose","bewitched","chinese silk",
				"pink frosted","seashell","skinny","glen","purple corn","furry purple","dragicalf","dwarf","orange chrysanthemum","ridge horn","water spirit",
				"furry purple","flickering lights","shadow furred","classic black angus","jack-o-lantern","sacred heart",
				"classic jersey","french milk","frilled nudibranch","garlic","marigold","silver","extra longhorn","leafy","winter's glow","arctic",
				"borealis bovine","frost light","holiday spirit","tie dye","beast prince","australian braford","combed","fluffy","holly berry",
				"rainbow ring bovine","snow angel","swirly glass","hl calf","hollybright plush","juke box","snow fairy","ugly sweater holiday",
				"frosted jeweled","red carpet","archangel","devil","strawberry baby","toasty","frost light cracker","mumu moo","stego","tiki mask","feathery headdress ","long eared",
				"pink plume","antipid","blue lace buttercup bovine","jaguar patterned","peach rings","calfpid","spring thaw","strawberry milk","el dorado","glass blown","green horn",
				"mardi gras","munchkin","poppy","shaggy","spring flowers","spring highland","emerald valley","champagne","lemon","paper","pretty holstein","rainbow swirl","emerald glass",
				"moonicorn","queen of hearts","rainbow bubble","reverse belted","rose pattern bovine","floral","fuchsia fairy","linum","multicolored","rainbow glass",
				"santoni sunset","scarecow","white riviera toy","festive","greco","spanish mosaic","boomerang buffalo","cookie dough","creamed bun","gemerald",
				"hallowed-bell","picnic basket","sequin","snacker","sunshine","wild","genie ii","genie","cleopatra","treble","photographer","shopaholic","night sky",
				"globetrotter","egyptian","oaisis garden var","hungry yak","abstract","bedouin","topsy turvy birthday","crochet","emerald flake","olive green","parade fairy","red hot",
				"silvery","strawberry cream","topiary","day dreamer","fairyland","fairytale","fairy vine","lost","ft fields","fluffy divine","hunky dory","mooving","oktoberfest",
				"teacher","wafer","hot spa","relaxed","steady yalk","bumble bee","clown","creepy halloween","detective","fall parade","tiara","witch","horseman's hollow undefined",
				"colorful moo","decorated carnival","frankie","magic wand","rom-com","scarecrow","strawberry fields","tiki","trick or treat","punk","polka dot","mime","patchy","quilt",
				"toy ii","wheel","autumn colours","ballerina","black forest","creamy","decorated swiss","fizzy","harvest","naira","turkey tail moo","english patch","glitter ice patch",
				"heart patched","hippie","archer highland","jeweled longhorn","medieval robed","patchy longhorn","spinster","broken heart","cleric","clover","four leaf clover",
				"love arrow","lucky clover","medieval wandering","popcorn loving","porta-banderia","secret friendship","sword play","sir","boy band","bubblegum","cactus","cruiser",
				"dragon moo","flying moo","gardener","look alike","mademoiselle","may flower","moo wish","photographer","ranch rodeo","steamy","cabo frio","captain","cody","king",
				"sailor","sailor jimmy","bargirl","gunslinger","long horn","outlaw","ranch longhorn","southern","wild highland",




			].fixOrder();
		
		var oxenTypes=["black ox","blue ox","grey oxen","red devon ox","baby ox","zodiac ox","canoe pattern ox","egyptian ox","golem ox","musk ox",].fixOrder();
		
		var bullTypes=["pink patch bull","holstein bull","randall bull","irish moiled bull","flower bull","wagyu bull",
				"groom bull","black rose bull","holiday bull","peppery bull","wall street bull","dragon bull",
				"bull","elizabethan bull","atlantean bull","milk man bull","blown glass bull","bradford bull","bestman bull","rider bull",
				"bashel bull","blue mane bull","five horn","weightlifter bull","banner bull","luna bull","glowing horns bull","hollybright bull","holiday spirit bull",
				"red masked bull","diamond ring bull","taurus bull","dragonfly bull","gilded bull","poppy bull","grand bazaar bull","blue gold bull","blue porcelain bull","cretan bull",
				"matador bull","spanish bull","spanish fighter bull","unmasked rose bull","taurian bull","breaker bull","matador bull","buttercream bull","babe blue bull","prize red bull",
				"tomatina bull","fiery bronze bull","heart breaking bull","mystic bull","bassist bull calf","mechanic bull calf","bull rider calf","steamy aggro bull calf",
				"boat swain bull calf","wild willie cow calf","exotic kudu bull calf","rodeo bull calf",


			].fixOrder();
		
		//combines all calves to one array for easy searching
		var allCalves=[].concat(calfTypes,bullTypes,oxenTypes).fixOrder();
				
		var yakTypes=["gray baby","black baby","baby",].fixOrder();

		var foalTypes=["ft fields","el dorado","emerald valley","show jump horse","circus act horse","pageant horse","samba unicorn","ballet horse","ladybug","mistletoe lane","mystical grove","4 leaf clover pegacorn","50s mom unicorn","a winter rug","abaco barb horse","akhal-teke","alexandrite","alien unicorn","aloha","aloha mini","aloha pony",
		"aloha unicorn","american","american indian","american mini","american quarter","american unicorn","amethyst","amethyst unicorn","amethyst pegacorn","andalusian","andalusian pegacorn",
		"andravida","angel","angel pegacorn","anti-valentine","apollo","appaloosa","apple","arabian stallion","armored","armored mini","armored unicorn","aromatic","art deco",
		"ash","asian war","asian wild","aspiring","athena pegasus","atlantean","aurora pegacorn","aurora unicorn","australian brumby","australian draught","aussie",
		"australian stock","autumn","autumn ii","autumn stallion","auxois","azteca","baby mule","baby zebra","baby's breath unicorn","babysitter unicorn","ballerina unicorn","atlantean",
		"ballet instructor","balloon","art deco unicorn","balloon pony","balloon pegacorn","banana pegacorn","banker","banshee pegasus","barista horse","bashkir curly","bat","batter","batwing",
		"bay andalusian","beaded","beaded pony","bedazzled","bedazzled pegacorn","bedazzled unicorn","bettie pony","bewitched black","bird","black steed","black","black arabian",
		"black australian stock","black belgian","black cherry","black cherry mini","black cherry pegacorn","black cherry pony","black dartmoor","black gypsy","black light colt","spooky",
		"joyful","black mini","black mini unicorn","black n white","black paint","black pegacorn","black percheron","black pony","black ponytail","black quarter pony","black rose mini",
		"black rose unicorn","black shire","black snow fantasy","black stallion","black swan pegacorn","black tennessee","black unicorn","blackberry","blinking heart pegasus","blooming",
		"blue candy pegacorn","blue mane gypsy","blue moon colt","blue pony","blue ponytail","blue quarter","blue samurai","boer pony","boho chic unicorn","bombshell pegacorn","boot",
		"borealis","boss","bouquet unicorn","breton","bride","bride unicorn","broken hearted unicorn","brown","brown gypsy","brown pinto mini","brumby","brumby butler","brunhilde",
		"bubble gum","bubble helmet horse","bubble mini","bubble pony","bubble wings pegacorn","buckingham","buckskin","buckskin mini","buckskin stallion mini","budding","bulb","bumblebee",
		"bunny","buster keaton horse","buttefly mask unicorn","butterfly","butterfly pegacorn","butterfly pony","butterfly unicorn","butterflycorn","cabaret pegacorn","calf","camargue",
		"camargue colt","camarillo","camellia","camellia unicorn","campion pegacorn","can can pegacorn","canadian","candy cane","candy corn","candy corn pony","candy corn pegasus",
		"candy corn stallion","candy corn unicorn","candy pegacorn","candy pony","candycane unicorn","candycane zebra","candycorn unicorn","career mom","carnation","carnation mini",
		"carnation unicon","carnival","carnival mini","carnival pegasus","carnival unicorn","caroling","caveman","celestial","celestial gypsy","celtic","celtic unicorn","champion",
		"charro","chateau","checkered","cheer ewe up","cheerful scroogifoal","chef","cherry","cherry pegacorn","cherry unicorn","chestnut mini stallion","chevron pegacorn","chincoteague",
		"chocolate","chocolate bon bons pony","christmas morning","chrome","chrome pegasus","chrysanths","cider","cider unicorn","cinderella pegacorn","cinderella unicorn","circus",
		"clara pony","cleveland bay","cloud","cloud mini","cloud pegacorn","cloud unicorn","clown","clown unicorn","clydesdale","clydesdale stallion","cocoa","comtois","confetti",
		"connemara pony","coral","coral mini","coral pegasus","coral unicorn","corn pegacorn","cosmopolitan unicorn","cotton candy","cotton candycorn","cowardly lion unicorn","crayon",
		"cream draft","cream mini","cream stallion","cremello","crystal","crystal ball","crystal pegacorn","crystal unicorn","cupicorn","daffodil pony","dahlia unicorn","dairy",
		"dales pony","dandelion pegacorn","dapple gypsy","dapplegray","dark","dark cherrasus","dark cherrycorn","dark cloud unicorn","dark hearts pegasus","dartmoor pony","deepsea",
		"delicate","desert","dew","dew pegacorn","dewdrops pony","diamond heart pegacorn","diamond unicorn","director","disco","disco pony","diva pony","dole","dorothy unicorn","dosanko",
		"double rainbow","dracula pegacorn","dracula unicorn","draft","dragon","dragonfly","dragonfly pegacorn","dragonfly pony","dragonfly unicorn","dream","dream unicorn",
		"dreamgirl unicorn","dutch draft","dutch warmblood","earth","earth day horse","earth day pegacorn","earth hero unicorn","earth pattern","earth print zebra","edwardian",
		"egyptian pegacorn","elegant pegacorn","elizabeth pegacorn","emerald gem unicorn","emerald pegacorn","emerald star unicorn","enchanted armor pegasus","enchanting pegasus",
		"endurance","eriskay pony","eugene","evil fairy unicorn","exmoor pony","expedition","express","fairy","fairy mini","fairy pegacorn","fairy pink","fairy pony",
		"fairy unicorn","fairy zebra","fake pegacorn","falabella","fall fairy mini","fall lantern","fall pegafoal","fancy","fancy candle unicorn","fancy pants unicorn","farm u-corn",
		"farmer","fashion designer","festive elf","festive pegacorn","figurine","fire","fire pegasus","fire skeleton","fire wizard","firefly","firefly pegacorn","firefly pony","firefly mini",
		"firefly unicorn","firework unicorn","fireworks stallion colt","first mate pony","first wise","fishing","fjord","flaming hearts pegacorn","flaming ice pegacorn","flannel",
		"flapper mare","floral print pegacorn","florida cracker","flower","flower child pegacorn","flower dryad","flowercorn","flowered","flowering","flowery unicorn","pegasus aviator",
		"football","forest","forest ii","franken bride","franken stallion","frankenfoal","french mini","french percheron","french unicorn","frenchman unicorn","friendship","friendship pegasus",
		"friesian","friesian stallion","frog prince","frosted fairy mini","frosted fairy unicorn","frosty","frosty clydesdale","frosty fairy","frosty mini-foal","frostycorn",
		"frozen berry","frozen pegasus","galiceno","galloway pony","garden","gardener unicorn","gem","gem maiden pegacorn","gem pegacorn","gem unicorn","gemstone unicorn",
		"genie pegacorn","ghastly mini","ghost mini","ghost pegacorn","ghost pegasus","gift","gingerbread","giving","glacier","glamorous pegacorn","glass pegacorn","glass unicorn",
		"glitter","glittering","glitter pegacorn","glitter pegasus","glitter unicorn","glittercorn","glow skeleton","glow stick","goblicorn","goblin unicorn","gold angel horse",
		"gold rose unicorn","gold unicorn","golden bell pony","golden mane colt","golden merpegasus","golden mini","golden stallion mini","golden pegacorn","golden pegasus","golden pony",
		"golden stallion","golden unicorn","golden winged pony","goldilocks unicorn","goth","gothic unicorn","graffitti","grape unicorn","grass pony","grasslands pony",
		"gray australian pony","greaser","greaser pegacorn","green","green caroling","green dryad","green fairy mini","green saddle mini","grey","greyfell","groom","gypsy",
		"gypsy daisy","gypsy rainbow","gypsy stallion","hackney","hackney palomino pony","haflinger","hairband pegacorn","half n half","hanoverian","harrietta","harvest unicorn","harvest pony",
		"harvest","harvest mini","harvest pegacorn","haunted","hawaiian","hawaiian shirt","headdress","headdress pegacorn","headdress pegasus","headdress pony",
		"heart pattern mini","heart wings pegacorn","heartswirl unicorn","heidi","hematite","hibiscus","hibiscus mini horse","hibiscus unicorn","high fashion","high kick","hippie",
		"hipster unicorn","hokkaido","holiday","holiday clydesdale","holiday drum","holiday express","holiday parade","holiday pony","holiday tinsel unicorn","holiday wreath pony",
		"hollow fairy","holly mini","horn blower horse","host pegafoal","hot cocoa","ice","ice capades mini","ice capades unicorn","ice cream","ice diamond","ice pixie",
		"ice princess pegacorn","icelandic","icy","icy blue pegacorn","icy blue pegasus","icy blue pony","icy blue unicorn","icy fire pegacorn","icy pink","icy pink unicorn",
		"icy wizard pony","inner tube","inspector","international","irish cob","irish hunter","irish sport","irish step dance pegasus","ivy unicorn","jack unicorn","jade","jade mini",
		"jade war","java pony","jester unicorn","jet set","jewel encrusted horse","jingle bells","juliet pegacorn","jungle colt","jungle fowl pegacorn","jupiter","kabardin","kelpie pony",
		"kerry bog pony","kiang","kimono","king","king tut","knight","kulan","lace heart unicorn","lace pegacorn","lady gaga unicorn","lady macbeth","lantern","lapis pegacorn","lava",
		"lava pegacorn","lava pegasus","lava unicorn","lavender","lavender pegasus","leaf","leaf pattern pegacorn","leafy","leg warmers pony","leopard","leopard unicorn","leprechaun",
		"life of the party pegafoal","light mist pegacorn","light pegacorn","lightning","lightning pegacorn","lilac fairy","little wing pegasus","lokai","lorikeet unicorn","lotus",
		"lovely pearls unicorn","lovestruck pegacorn","loving pegacorn","lucky","lucky pony","lunar new year","luxe gem unicorn","macbeth","magical pegacorn","magician unicorn",
		"magician's assistant","magnolia","maple leaf","maple mini","maple pegacorn","maple pegasus","marble unicorn","mardi gras mini","maremmano","marigold pegasus","masquerade",
		"masquerade pegacorn","may fair","may flower mare","may forest pegacorn","mayan","mc escher pattern","merabian stallion","merens pony","mericorn","merunicorn","metal hair",
		"metropolitan pegacorn","mexican unicorn","milky way unicorn","mini andalusian","mini apaloosa","mini appaloosa","mini bat","mini blue gypsy","mini candy corn","mini candycane",
		"mini gold bell","mini party","mini pegacorn","mini pegasus","mini pirate","mini rose","mini zebra pegasus","miniature","minibow mini","mirage pegacorn","mixed gem unicorn",
		"modern","mohawk unicorn","mom's bouquet unicorn","mom's day pegacorn","monchino monarch","mongolian","mongolian pony","moon","moon pegasus","moon steed","moon unicorn","more 2 love unicorn",
		"morgan","morgan stallion","moss unicorn","mother unicorn","mother's day","movie star pegacorn","moyle","mummy pony","murgese","music","mustache","mustang","mysterious pegasus",
		"mystical","mystical hippocamp","natural","natural mini","neon","neon unicorn","new england pinto","new forest pony","new year","night","nightcap","nightmare mini",
		"nightmare mini pegasus","nightmare pegacorn","nightmare pegasus","nightmare pony","nightmare unicorn","nix pegafoal","nokota","noma pony","nomadic","noriker","nouveau unicorn",
		"nutcracker","nutcracker pegacorn","nutcracker unicorn","nypd","ocean pegacorn","ocean unicorn","office","open road","orange butterflycorn","orange juice","orchid mini",
		"orchid stallion stud","orchid unicorn","orlov trotter","orlov trotter ii","ornament","outback","outback unicorn","oz unicorn","packhorse","paint","paisley pegasus",
		"pajama pegacorn","palomino quarter","palouse","party","party game","party pegacorn","party tarpan","partycorn","pastel pegacorn","peace","pearl","pearl unicorn",
		"pegacorn of hearts","peganarwhal","pegarudolphifoal","pegasus","pegasus pink","pep squad pony","percheron","perennial","perky pegacorn","peruvian","phar lap","phoenix pegacorn",
		"phoenix unicorn","picado","picasso blue unicorn","pinata","pinata pony","pink aloha stallion stud","pink balloon pony","pink carnation pony","pink fairy stallion colt",
		"pink fairy unicorn","pink gypsy","pink lemonade unicorn","pink pegacorn","pink pony","pink ponytail","pink saddled","pink skeleton","pink stallion","pink unicorn",
		"pinocchio-corn","pinstripe pony","pinto","pinto mini","pinto pony","pirate","pirate pegacorn","pirate unicorn","plaid","plains pony","plum blossom","plush","poinsettia",
		"poinsettia unicorn","polka dot unicorn","pony","pony tail pony","poodle skirt pegacorn","poseidon pony","poseidon unicorn","postier brenton","pot o gold pegasus","pottok pony",
		"prankster","precious metals pegacorn","prehistoric fairy","prehistorical","princess","princess mini","princess pegacorn","princess pony","princess unicorn","prism",
		"prom queen pegacorn","przewalski mini horse","przwalski","pseudocorn","pumpkin","pumpkin mini","pumpkin pegacorn","pumpkin unicorn","punk love pegacorn","punk pegacorn",
		"pure heart","purple batwing","purple bedazzled","purple camellia","purple fairy","purple fairy mini","purple ghost","purple icicle pegasus","purple maiden pegacorn",
		"purple mini","purple mini pegacorn","purple mini unicorn","purple nightcorn","purple nightmare","purple pegacorn","purple pony","purple ponytail","purple stallion",
		"purple star unicorn","purple unicorn","quagga","quarter","queen pony","queen stepmother unicorn","rabbit ears unicorn","racer","racing stripes unicorn","racking","rainbow",
		"rainbow body","rainbow mask pegacorn","rainbow mini","rainbow pegacorn","rainbow pegapony","rainbow pegasus","rainbow pony","rainbow prism","rainbow stallion","rainbow unicorn",
		"rainbow wing pegacorn","raindrop","rainforest","raingear","rapunzel pony","rapunzel unicorn","red","red carnation pegasus","red hot valentine","red pinto",
		"red riding hood unicorn","red rose","red sun colt","red wine pegacorn","reef unicorn","reindeer","reitpony","ribbon mane pegasus","ribboncorn","river","robot",
		"robot pegacorn","robot unicorn","rocking","rocky mountain","roman","romance","romance mini","romance unicorn","romeo unicorn","rope light","rose","rose crystal unicorn",
		"rose pegacorn","rose pegasus","rose pony","rose quartz heart unicorn","rose unicorn","rose wreath unicorn","roxey pegacorn","royal","royal beauty","royal egg pegacorn",
		"royal pegacorn","royal pony","royal steed","rubber pony","ruby","ruby blaze unicorn","rudolph","rudolphicorn","saddle","saddlebred","safari","samurai","samurai warrior",
		"sancai ii","santa","santa unicorn","sapphire","sapphire hippocamp","sapphire sparkle unicorn","sapphire unicorn","sapphire zebra","savannah pony","sea colt","sea hippocamp",
		"sea pegasus","sea shell unicorn","sea star","sea star pony","seahorse stallion","seashell","seaweed","second wise","settling","shamrock","shamrock mini","shamrock pegacorn",
		"shamrock pegasus","shamrock pony","shamrock unicorn","shetland pony","shimmering","shire","shopping unicorn","silver","silver batacorn","silver bell","silver unicorn",
		"single unicorn","skeleton","skeleton mini","skeleton unicorn","sky","skyline unicorn","sleeping bag unicorn","sleigh ride","small irish cob","smitten","smitten pony","sneaker",
		"snorkel mini","snorkeling pony","snow koala unifoal","snow pegacorn","snow pony","snow stallion","snow white","snowflake","snowflake mini","snowflake pegacorn",
		"snowflake pegasus","snowflake pony","snowflake unicorn","snowy sunset pegafoal","sock hop mare","solacorn","sour grapes pegacorn","space","spanish mustang","sparkle",
		"sparkling bubbly","sparkly stars unicorn","spectator","spectral","spectral pegasus","spider","spotted","spotted appaloosa","spotted draft","spotted saddle","spring","spring bonnet",
		"spring bouquet pegacorn","spring egg","spring mini","spring mist pegacorn","spring pegacorn","spring pegasus","spring unicorn","springtime mare","stallion mini","standardbred",
		"star","star pony","star unicorn","star anise","star pegasus","stargazer","starlet unicorn","starlight, unicorn bright","starry night unicorn","starry pegasus","stay at home pegafoal","steam unicorn",
		"steam","steam pegacorn","stone","stone spirit unicorn","storm pegasus","stormy pegacorn","storybook unicorn","straw man unicorn","stringed","stud","studded leather",
		"student","suffolk","sugar","sugar pegafoal","sugar plum fairy","summer stallion","summer","summer night","sun","sun pegasus","sun unicorn","sundae","sunflower","super mom pegacorn",
		"supermom pegacorn","swan lake pegacorn","swashbuckler unicorn","sweater pegacorn","swiss warmblood","syrah pegacorn","t.p. pegacorn","tapestry","tea leaf pegacorn","tea unicorn",
		"teddy pegacorn","tee pee","teen angel pegacorn","tennessee","terracotta","the king pegacorn","third wise","thoroughbred","tiara unicorn","tie dye","tie dye unicorn",
		"tiger stripe mini","tin","tinman unicorn","tinsel","tinsel mini","tinsel pony","toadstool unicorn","topiary","toy","trakehner","traveling pegafoal","tropical","trotter stallion",
		"turkey","tuxedo ball","ugly sweater","ugly sweater brumby","ugly sweater pegafoal","unicornucopia","unigon","usher","valentine","valentine pony","valentine card","valentine mini",
		"valentine pegafoal","valentine unicorn","vamp","vampire","vanner","vaudeville","v-hoody pegasus","victorian","villain unicorn","vineyard steed","vineyard mini","vintage",
		"vintner unicorn","violets mini","waler","walkaloosa","walking pony","water","water ii","web","web unicorn","wedding pegasus","weeping mini","weeping unicorn","welsh","wereicorn",
		"white","white andalusian","white arabian","white australian pony","white belgian","white lily","white mini unicorn","white mustang","white pegasus","white rose wreath unicorn",
		"white shire","white snow fantasy","white thoroughbred","white unicorn","wild","wild burro","wild west","wind pegacorn","wind up","winged unicorn","winter","winter elf",
		"winter fairycorn","winter fun pegafoal","winter hollow","winter magic","winter pegacorn","wisteria unicorn","wizard","wizard pegasus","wolf grandma unicorn","wrapped","wreath",
		"yakut pony","yellow butterfly","yellow rose","yellow unicorn","yerba mate","yonaguni","zebra costume","zebra pegacorn","zebra unicorn","zebroid","zephyr","zesty","zeus pegacorn",
		"zig zag zebra","zombie","zorse","dole yellow","wicked witch unicorn","zebra with earth print","mom's favorite","4th birthday bedazzled","4th birthday mare","4th birthday party",
		"bridesmaid mare","bubblegum","buttons n beads","monterey mare","mosaic","oklahoma","painter splatter","rainbow gem","spring braids","troop leader","water bubbles",
		"4th birthday pegacorn","4th birthday unicorn","bee keeper pegacorn","calla lily pegacorn","cheerleading pegacorn","flowerchild pegacorn","crochet pegacorn","detective pegacorn","nota pegacorn",
		"rainbow fairy pegacorn","scaley pegacorn","soap suds pegacorn","spring dress pegacorn","spring meadow pegacorn","suit & necktie pegacorn","white were pegacorn","racing pegasus",
		"glee club pony","shag","prom king stallion","stylish stallion","4th birthday unicorn","blue crystal unicorn","mummycorn","racing unicorn","rainbow ribbon unicorn",
		"safaricorn","scarbooking unicorn","spring fashion unicorn","spring groom unicorn","rainbow striped zebra","oz unicorn teen","pegasus pen",
		"cap n gown unicorn","mint mocha mare","chinese dragon pegacorn","daddy's mini pegacorn","milky wave pegacorn","curled horn pegasus","galatic gallop unicorn",
		"frille gem unicorn","tricorn 3000","space alien","half moon","air one","mare force one","bacchus pegacorn","biscotti pegacorn","confetti pegacorn",
		"flannel pegacorn","furry pegacorn","giftwrap pegacorn","starstead pegacorn","birthday pegasus","positronic pegasus","starglass pegasus","mezzo pony",
		"wooly space","star sparkle","star trail","candlewick unicorn","fondant unicorn","friendship unicorn","goht unicorn","invisible unicorn","rocket unicorn",
		"zorme zorse","americorn","blackhole","firework","hooves","mantle","novaluck","oz","splatter paint","tissue paper flower pegacorn",
		"milky way mare","sweet bouquet pegacorn","rainbow butterfly pegacorn","rainbow chrome pegacorn","rose jewel pegacorn","scout leader pegacorn",
		"cassiopeia queen pegacorn","stars stripes pegacorn","rainbow swirl pegacorn","spanish tile pegacorn","sugar violet pegacorn","strawberry swirl pegapony",
		"gently glide pegasus","aerial repeater pegasus","pegacorn of plenty","sugar pattern pony","shooting star stallion","rainbow body unicorn",
		"cheshire cat unicorn","lucky cherry unicorn","glowing flower unicorn","leisure girl unicorn","sporty girl unicorn","march hare unicorn",
		"summer harvest unicorn","star rider unicorn","gold ruby unicorn","lollipop swirl","solar system unicorn","carved candle","super costume",
		"majorette mare","scottish","bioluminescent pegacorn","flower stead pegacorn","glowing pegacorn","patriot pegacorn","patriotic pegacorn",
		"peacock pegacorn","perseus pegacorn","quasar pegacorn","spanish pegacorn","dreamer pegasus","krabby pegasus","moonberry pegasus","rainbow pegasus",
		"seashell pegasus","sparkler pegasus","thinker pegasus","wildind pegasus","precious pony","wfp stallion","cookie thief","alice unicorn","bookseller unicorn",
		"caterpillar unicorn","fireworks unicorn","guardian unicorn","handy unicorn","luau unicorn","pulsar unicorn","serve unicorn","sparkler unicorn","sparklers unicorn",
		"wonderland unicorn","wonderland unicorn","rainbow zebra","watermelon zebra","chinese zodiac","astronomist","aurora","backpacker","playground",
		"plumicorn","ribbon","saturn","sheep","yodelcorn","blondie","cinnamon sunburst","eclaire mare","frosted filly","gumball","heartshape","lemon chiffon",
		"rocky road mustang","peppermint pony","quilted pattern","red velvet mare","red velvet","snazzberry","watermelon candy","whipped cream",
		"blue frosted pegacorn","chocolatier pegacorn","creamsicle pegacorn","egyptian goddess pegacorn","needlepoint pegacorn","pink frosted pegacorn",
		"pixie stick pegacorn","popsicle pegacorn","porcelain pegacorn","soda jerk pegacorn","sugar pegasus","sweet pegasus","tutti frutti flyer",
		"watermelon candy pegasus","pink porcelain pony","rocky candy pony","canningcorn","chocolate strawberry unicorn","dancing egyptian unicorn",
		"jellycorn","pastry chef unicorn","rainbow licorice unicorn","sugarhorn","sweet","tiger lily mule","blue bell","buttercup","carrot basket","glamorous",
		"flower girl pony","nerdy","pink blanket","playground ii","porcelain flower","sea wave","western saddle","white paradise pegacorn","bobby pegacorn",
		"cool mint pegacorn","egyptian pegafoal","farmer pegacorn","gardener pegacorn","honeysuckle pegacorn","mother fairy pegacorn","pink porcelain pegacorn",
		"pink sparkle pegacorn","rainbow candy pegacorn","rocking pegacorn","sun mane","thunder mane","water fun pegacorn","wisteria pegacorn","patissier pegasus",
		"pink petalwing pegasus","mini carnival","egypt chariot pony","poprock pony","strongman stallion","carousel unicorn","diamond studded unicorn",
		"fall leaf patterns unicorn","fall wreath unicorn","super costume unicorn ii","sweet dreams unicorn","totally radicorn","arabian princess","caro-rose","cinderella",
		"marie mini-mare","nightshade mini-horse","silk flower pattern","vacationing","alchemy pegacorn","candyheart pegacorn","peacock pegafoal","henna pegacorn",
		"pure imagination pegacorn","sand pegacorn","wizard pegacorn","cavalier unicorn","fairy dust unicorn","hard candicorn","eastern flower unicorn","puppet unicorn",
		"sari silk unicorn","caro-mini pegacorn","fluffy pegacorn","fuzzy pegacorn","romantic pegacorn","southern magnolia pegacorn",
		"mint julep unicorn","spotted unicorn","dwarf donkey","aquamarine mare","descending dusk","flaxen hair","daisy mini horse","mystical gold","night glow",
		"night mare","picnic","summer fiesta","violet wave","amber bright pegacorn","arcane light pegacorn","aura pegacorn","black buttefly pegacorn",
		"dark moth pegacorn","dark scroll pegacorn","evening pegacorn","fairy wisp pegacorn","jekyll n hyde pegacorn","light scroll pegacorn","mystic pegacorn",
		"narcissus pegasus","obsidian pegacorn","red ruby pegacorn","sunrise pegacorn","twilight pegacorn","violet armored pegacorn","phantom pegasus",
		"red smoke colt","skeleton colt","spirit colt","ultraviolet colt","blazing unicorn","cursed unicorn","dark unicorn","dark brio unicorn","elder unicorn",
		"enchanted shadow unicorn","fairy headdress unicorn","gilded unicorn","golden sparks unicorn","light brio unicorn","moon-light unicorn",
		"purple blaze unicorn","sun-spot unicorn","white-gold unicorn","underworld zebra","caro-mini pegacorn","fluffy pegacorn","fuzzy pegacorn","romantic pegacorn",
		"southern magnolia pegacorn","mint julep unicorn","spotted unicorn","blueberry","blue fire mustang","whitewater","magic speckled pegacorn","night raven pegacorn",
		"peacock pegacorn","sandman pegacorn","shadow dragon pegacorn","starry night pegacorn","eternal glow unicorn","hang glider unicorn","nightmare unicorn",
		"witchcraft unicorn","dod mariachi burro","appaloosa","classic andalusian","english jumping","scarey marey","black crow pegacorn","bursting bats battacorn",
		"dod monarch pegacorn","fairy pumpkin pegacorn","glowing ghoul pegacorn","glowing purple battacorn","glowing skeleton pegacorn","magical black beauty pegacorn",
		"blue scene pegasus","fairyfly pegasus","pet paw pegasus","miniature shetland","beadacorn unicorn","dark bats unicorn","dark & stormy unicorn",
		"ghost gnome unicorn","pennsylvania mini horse unicorn","swirling gold unicorn","glowing zebra","gifting donkey","classic clydesdale","dwarf mini","chocolate","full moon",
		"lionfish sea","little mer-mare","starlight","tennessee walking","blue fairy pegacorn","catrina pegacorn","count pegacorn","flufficorn","fluffy dream pegacorn",
		"gilded armor pegacorn","glass princess pegacorn","lime pop pegacorn","light fantasy pegacorn","treasure peganarwhal","winter romance pegacorn","witchfire pegacorn",
		"bare bones pegasus","magic tailed pegasus","were pegasus","classic pony","vampony","werepony","chess unicorn","fetching unicorn","golden hair unicorn","lemon cake unicorn",
		"shimmering winter","autumn night pegacorn","mystic twilight pegacorn","shimmering aurora pegacorn","sugarplum fairycorn","winter's light pony","bright rad unicorn","snowflake burst unicorn",
		"fall appaloosa","glass autumn","glass blizzard","glass cloud","glass forest","glass solar system","shimmering winter","arctic","bells","holiday carousel",
		"holiday cheer","hollybright","hollybright clydesdale","holly carriage","winter spot","autumn night pegacorn","bright lights pegacorn","butterburst pegacorn",
		"colorburst pegacorn","flame wing pegacorn","frosted snowflake pegacorn","heart light pegacorn","leafy pegacorn","purple peak","mystic twilight pegacorn",
		"shimmering aurora pegacorn","skyline pegacorn","sugarplum fairycorn","arctic wind pegacorn","aurora pegacorn","blue aurora pegacorn","bright twist pegacorn",
		"brightwing pegacorn","cardinal wing pegacorn","celebration pegacorn","flame bright pegacorn","frostlight pegacorn","golden feather pegacorn",
		"holiday lights pegacorn","hollybright fairycorn","prismatic pegacorn","sparklehoof pegacorn","swirling pegacorn","winter comfort pegacorn","aurora pegasus",
		"dance club pony","hoedown pony","winter's light pony","hollybright pony","holiday colt","northern lights colt","blacklight buttercorn","bright rad unicorn",
		"frost star unicorn","northern lights unicorn","orchard unicorn","sleigh bells unicorn","snowflake burst unicorn","arctic unicorn","borealis unicorn",
		"brightmane unicorn","lighthorn unicorn","shire wreath unicorn","spearmint lights unicorn","starbright unicorn","autumn pegacorn","fall fantasy pegacorn","golden leaf pegacorn","autumn sun unicorn",
		"classy clydesdale","dun australian stock","fairyfrost mist mare","feelin fancy","harvest clydesdale","harvest market","ombre stallion","pop palomino","snowy","spectrum light",
		"sunset glass","apple dapple pegacorn","autumn pegacorn","fall fantasy pegacorn","autumn festival pegacorn","golden leaf pegacorn","blown glass pegacorn","butterfairy pegacorn",
		"candycane pony pegacorn","carol pegacorn","cheery pegacorn","light doll pegacorn","market square pegacorn","naughty or nice pegacorn","parade helper pegacorn",
		"philippines pegacorn","princess doll pegacorn","rainbow mystic pegacorn","season spirit pegacorn","sugar plum pegacorn","symphony pegacorn","vintage bells pegacorn",
		"winters night pegacorn","gingerbread pegasus","elegance pegasus","holiday fun pegasus","toy pegasus","ribbon pony","tinsel maned pony","icelightning colt","autumn sun unicorn",
		"country star unicorn","heirloom unicorn","holiday frost unicorn","magestic toy unicorn","mood ring unicorn","rainbow sparkle unicorn","storytime unicorn","apple unicorn",
		"chinese dragicorn","fairy fawnmother pegacorn","holiday rocking","daisy pattern pegacorn","hearth's glow pegacorn","holiday party pegacorn",
		"mystic elven pegacorn","pegallamicorn","sequin butterfly pegacorn","winter wreath pegacorn","fairy tresses unicorn","festive holiday unicorn",
		"holly harness unicorn","holiday party","royal snow guard","party time pegacorn","pretty party pegacorn","santa pegasus","snow queen pegacorn",
		"sleet and snow unicorn","coal","ice sparkle","present","sparkler stallion","coal pegacorn","fancy nye pegacorn","magestic royal ice pegacorn",
		"nightflight pegacorn","north pole pegacorn","present pegacorn","santa's pegacorn","seasons greetings pegacorn","snow cherub pegacorn",
		"naughty pegasus","nice pegasus","luminous white unicorn","winter onesie unicorn","bromeliad","feathered saddle","helleborus","jaguar","snowflake mini horse","red velvet",
		"carved wooden","feather mane","long feathered","mangalarga marchador","purple treasure","zubo","aloha american cream pegacorn","chilly breeze pegacorn","holiday flower pegacorn",
		"jungle paradise pegacorn","parrot wings pegacorn","pegasaurus rex","pineapple pegacorn","pure gold pegacorn","snow fun pegacorn","white swan pegacorn","winter white pegacorn",
		"gilded flight pegacorn","gleaming mask pegacorn","jaguar paint pegacorn","painted markings pegacorn","penacho pegacorn","ruby wings pegacorn","exotic wing pegasus",
		"butterfly pegasus","gold armor pegasus","jewel wings pegasus","petal wings pegasus","totemic pony","blue hawaiian colt","jade stencil colt","saddled jade colt","warrior stallion",
		"red comet unicorn","wild pansy unicorn","wooly unicorn","heart saddle unicorn","love rose unicorn","painted sun unicorn","lavender flower unicorn","warrior stripes unicorn",
		"1950s play","anthurium black friesian mare","aquarius","beryl flower","black forest chestnut","broken heart","clear skies","clydesdale flower saddle","happy heart","jadefire",
		"village mini horse","moonlit romance","rosie the","victorian flower","western hero","zodiac","anti pegacorn","beaded azalea pegacorn","black lace periwinkle pegacorn",
		"black panther pegacorn","black rose pegacorn","champagne pegacorn","dark chocolate port pegacorn","dark cupid pegacorn","dream pet pegacorn","everlasting love pegacorn",
		"flower quilt pegacorn","glowing hooves pegacorn","gold wing macaw pegacorn","hug & kiss pegacorn","jeweled aztec king pegacorn","jeweled faberge pegacorn","love warrior pegacorn",
		"lunar year pegacorn","majestic spring pegacorn","palomicorn","pinotcorn","pistachio divinity pegacorn","purple lightning pegacorn","quetzalcorn","red rose pegacorn",
		"shattering hearts pegacorn","sheriff pegacorn","star skating pegacorn","tennesee pegacorn","western colors  pegacorn","western pattern pegacorn","bad romance pegasus",
		"daisy the pegasus","funnel cake pegasus","rainforest moth pegasus","romantic pegasus","sheriff pegasus","sunset beach pegasus","peanut brittle pony","pet helper pony",
		"polka dot pony","broken hearted colt","love stud colt","red colt","royal romeo colt","akhal teke unicorn","bengal unicorn","black cat unicorn","breath-taking ballerina unicorn",
		"bromeliad unicorn","disco fever unicorn","glittery black hearts unicorn","heart harness unicorn","irridescent rainforest unicorn","love zebracorn","lumberjack unicorn",
		"royal juliet unicorn","teddy bear unicorn","blooming peace pegacorn","blue glass pegacorn","blue munchkin pegasus","chateau colt","curled ribbon pony","dorothy pegacorn",
		"emerald bridle camarillo","emerald glass","emerald lace pegacorn","emerald saddle","flower celebration pegacorn","garden helper","glacier's grace pegacorn",
		"gold and silver pegacorn","gold brick colt","golden emerald pegacorn","good luck pegacorn","good witch pegacorn","jester pegasus","king cake pony","lioness unicorn",
		"munchkin blue pegasus","mystick mist pegacorn","natural spring pegacorn","peaceful dove pegacorn","poppy pegacorn","porcelain pegasus","porcelain trim",
		"rainbow butterfly pegasus","rainbow magic pegacorn","rainbow mist unicorn","rainbow sky pegacorn","ribbon pegacorn","royal emerald pegacorn","scarecrow pony",
		"shamrock shine pegacorn","silver works","spiral locks pegacorn","sun magic pegacorn","tic tok","tin woodsman pony","twelfth night","twister pegacorn","wicked witch pegacorn",
		"winkie pegacorn","winkie unicorn","wonderful wizard pegacorn","fairy rex","parade queen pegacorn","rainbow mist pegacorn","pink masque pegasus","munchkin parade unicorn",
		"lavender veil mini-horse","spanish moss mini mare","mushroom","paper","pretty pinto","arabian stallion pegacorn","autumn leaf pegacorn","carnisparkle pegacorn",
		"celtic butterfly pegacorn","celtic fairy pegacorn","celtic knight pegacorn","highland pegacorn","ice water pegacorn","lemon pegacorn","oracle pegacorn","primrose pegacorn",
		"sequins pegacorn","springtime pegacorn","twinkling firefly pegacorn","wedding pegacorn","winter blue pegacorn","autumn leaf pegasus","ice water pegasus","lemon pegasus",
		"rainbow and gold fantasy pegasus","runic pegasus","springtime pegasus","winter blue pegasus","aetherial unicorn","autumn leaf unicorn","digitalis unicorn","ice water unicorn",
		"rainbow and gold swirl unicorn","rainbow glitter unicorn","springtime unicorn","voodoo unicorn","winter blue unicorn","celtic stallion","mad hatter","minty fresh",
		"bread and butterfoal","celtic pegacorn","lavendar pegacorn","moon magic pegacorn","peacorn","petite pony pegacorn","preening pegacorn","pretty pink pegacorn",
		"rainbow bubble pegafoal","spring princess pegacorn","stagicorn","teacup pegacorn","true blue pegacorn","witch of the east pegacorn","yellowbrick pegacorn","prize shetland pony",
		"purple potpourri","chilly unicorn","mooonicorn","sparkling rose unicorn","wondercorn","mini riviera","easter flowers filly","gift wrapped","pastel","pink pansies","gold tile",
		"menorquin","olympian","roman helm","seaglass","spanish dancer","bunny pegacorn","carefree pegacorn","colour wave pegacorn","daisy flower pegacorn","easter dye pegacorn",
		"floral pegacorn","humming bird pegafoal","lamp light pegacorn","mermaid pegacorn","mustang pegacorn","reflections  pegafoal","purple dahlia pegacorn","robin pegacorn",
		"tudor rose pegafoal","brimming heart pegacorn","emperor pegacorn","flamenco pegacorn","flying pegasus","gladiator pegacorn","gold mask pegacorn","greek goddess peagcorn",
		"masquerade pegacorn","mother's love pegacorn","sea foam pegacorn","spanish fan pegacorn","statue pegacorn","terra cotta pegacorn","venetian pegacorn","dark rose pegasus",
		"masked red pegasus","red butterfly pegasus","ruby red pegasus","spring fairy pegasus","tik tok pegasus","bougainvillea pegasus","mythic white pegasus","olympus pegasus",
		"seaglass wing pegasus","unmasked butterfly pegacorn","yellow petal pegasus","fiesta pony","pegasus pony","red rose colt","spanish colt","dandling unicorn","emerald mane unicorn",
		"flower basket unicorn","geeky unicorn","springtime farm unicorn","venetian red unicorn","andalusian unicorn","carnivale unicorn","carnival jester unicorn","sea dragicorn",
		"siren unicorn","venetian gold unicorn","venetian green unicorn","white wine unicorn","med riviera","alyssum","assorted roses","cancerian","dainty","inked unicorn","pet",
		"spanish stallion","super samurai","wild galloper","aurora sky pegacorn","blooming pegacorn","heart wings pegacorn","cinco de mayo pegacorn","cotton candy pegacorn",
		"cupcake pegacorn","doted-on pegacorn","fire dragon pegacorn","foolhardy peagcorn","gold dust pegacorn","mini lilac pegacorn","ornate pegacorn","pleione pegacorn",
		"rainbow mom pegacorn","rustic pegacorn","spanish rose pegacorn","tranquil pegacorn","venetian pegacorn","very berry pegacorn","feather pegasus","flaming topaz pegasus",
		"mariachi pegasus","starry mini pegasus","mythic black pegasus","quiffed pegasus","rocker chic pegasus","venetian pegasus","frilly pony","graceful pony","italian colt",
		"arabian unicorn","andalusian unicorn","flower mother unicorn","mini sunshine unicorn","rave unicorn","sinuatus unicorn","southern rose unicorn","very berry unicorn",
		"oasis okapi","musician zebra","rough diamond unicorn","charmed unicorn","belly dancer unicorn","bejeweled unicorn","bedouin unicorn","arabian prince unicorn","sunshine unicorn",
		"moroccan beauty unicorn","galactic unicorn","friendlycorn","familycorn","desert rose unicorn","dahlia unicorn","chariot unicorn","andalusian unicorn","terrier colt","sultan colt",
		"egyptian colt","arabian knight colt","moroccan rose pony","oasis guard pegasus","egyptian scroll pegasus","arabian nights pegasus","arabian black beauty","alborak pegasus",
		"statue pegasus","cleopatra pegasus","black flying pegasus","arabian pegasus","veiled pegacorn","onyx egyptian pegacorn","nile princess pegacorn","jeweled pegacorn","ebony pegacorn",
		"desert wind","desert spirit pegacorn","blooming lotus pegacorn","tudor rose pegacorn","sunshine pegacorn","sphinx pegacorn","silver sand pegacorn","sarco pegacorn",
		"rainbow note pegacorn","poser pegacorn","pharaoh's pegacorn","oasis beauty pegacorn","patriotic hero pegacorn","king tut pegacorn","comet pegacorn","white stallion colt",
		"white mane stallion colt","vizier","veiled","traditional white stallion colt","traditional brown stallion colt","traditional black stallion colt","speckled grey stallion colt",
		"magic carpet","genie","egyptian","dark brown stallion colt","chariot","brown stallion colt","black stallion colt","black arabian beauty","summer solstice","arabian princess",
		"oasis knight","homesick","caravan","oasis garden var","blissful pony","butterfly wings pegacorn","carousel craze unicorn","carousel","carousel pegacorn","cotton candy zebra",
		"dazzling birthday pegacorn","isis pegacorn","party crasher unicorn","party unicorn","peacock","rainbow zebracon","simurgh pegacorn","victorian belle pegasus","vintage feather",
		"vintage rose unicorn","big bow mare","blue smoke","boho painted","butterfly mane mare","elegant","embroidered","free spirit","hawaiin","hermia","iced tea","majorca stallion colt",
		"oasis","pixie mane","prince's","robinhood","sleepy","fairy carriage","fairy rider","shimmering","soothe","5th anniversary pegacorn","5th birthday pegacorn","american pegacorn",
		"arabian pegacorn","arabian colors pegacorn","bonsai begonia pegacorn","cobalt pegacorn","dawning pegacorn","evil queen pegacorn","fiery pegacorn","floral kitsch pegacorn",
		"italian pegacorn","kingfisher pegacorn","kings arrival pegacorn","lantern pegacorn","matte rainbow pegacorn","orange pegacorn","swift pegacorn","tribal pegacorn",
		"wand horn pegacorn","broken wings pegacorn","grey colt","snow white pegacorn","fairytale pegacorn","lavender pegacorn","magic dust pegacorn","mystical unicorn","perlie pegacorn",
		"pink fairy pegacorn","silver pegacron","twinkling pegacorn","bioluminiscent pegasus","emerald flower pegasus","fairyland pegasus","lysander pegasus","music freak pegasus",
		"ringmaster pegasus","sunset pegasus","tricolor pegacorn","emerald feathered pegasus","fairytale pegasus","paisley pegasus","precious pegasus","sunshine fairy pegasus",
		"tamed fairy pegasus","pony's dayout","pony's nightout","blessed pony","dotted pony","knotty pony","silk feather pony","spellbound pony","tickle pink pony","daylight colt",
		"african braided unicorn","african wild unicorn","boho spirit unicorn","dreadlock unicorn","fortune teller unicorn","mother and baby unicorn","plumeria unicorn",
		"roller disco unicorn","bedazzled unicorn","crystal fairy unicorn","flaming unicorn","hypnotized unicorn","runic unicorn","aztec zebra","aqua","autumn glitter mare","bowie",
		"bubblegum fairy","california","cart","cosplay","fireman","geisha","majestic","ninja","oktoberfest","top hat","watercolor","balloon mane pegacorn","circuit pegacorn",
		"fairy pinion pegacorn","fall queen pegacorn","freestyle pegacorn","honeyswirl pegacorn","jello pegacorn","kirei pegacorn","little wing pegacorn","lucky dragicorn",
		"prom queen pegacorn","samurai pegacorn","starfall pegacorn","spanish tile pegacorn","zebra striped pegacorn","autumn fairy pegasus","autumnskin pegasus","beady eyed pegasus",
		"conehorn pony pegasus","fall ready pegasus","flapping pegasus","green smoke pegasus","horizon pegasus","pink chocolate pegasus","queen bee pony","beauty pageant",
		"beauty queen unicorn","bubbly unicorn","fairy rider unicorn","flower power unicorn","majestic unicorn","medieval unicorn","oriental beauty unicorn","sleeping beauty unicorn",
		"style icon unicorn","techno unicorn","tomatina unicorn","va voom unicorn","bonfire helper mule","cape drape","chagu chagu","sleepy hollow","autumn fall","escaped wagon",
		"huffy hatted","horseman","netherworld","spooky eyed","spooky lantern","sweet shirely","trick or treat","wizard","baffling pegacorn","crimson joy pegacorn",
		"horseman's hollow pegacorn","magician's pegacorn","magma pegacorn","maple winged pegacorn","pumpkin fury pegacorn","tweed pegacorn","ultimate nemesis pegacorn",
		"vlad the pegacorn","fanciful fall pegasus","skull mouth pegasus","web winged pegasus","deety pegasus","insomnium pegasus","onlooker pegasus","red winged pegasus",
		"spooky scarlet pegasus","woodsy fall pegasus","autumn fairy pony","black hawk pony","magic pony","mystical fall pony","count colt","brownwood colt","feather spirit colt",
		"everready horse","fire catcher unicorn","ice catcher unicorn","matsuri unicorn","rainbow riding unicorn","enchanted unicorn","fallfly unicorn","guardian unicorn",
		"incipient unicorn","messenger unicorn","spooky bride unicorn","wedding pastor unicorn","horseman's hollow undefined","autumn caroling","aztec","dark apocalypse","floral",
		"ghost costume","ghost rider","golden sunset","headless horseman","nevermore","painted","picaroon","poetic","prized","rainbow mane","ribbon illusion","shallow water",
		"transylvania","wavering","white chocolate","autumn fairy pegacorn","baphomet pegacorn","break free pegacorn","butterfly mane pegacorn","candy pegacorn","carnivale pegacorn",
		"crescent moon pegacorn","dragonwings pegacorn","dreamy pegacorn","emerald shine pegacorn","frankenstein pegacorn","invisible pegacorn","lace wing pegacorn","lollipop pegacorn",
		"magnificent pegacorn","marooner pegacorn","masquerading pegacorn","nyx pegacorn","orchid pegacorn","sea shell pegacorn","sour pop pegacorn","spooky painted pegacorn",
		"storm galaxy pegacorn","autumn paint pegasus","cotton candy pegasus","pegasus in disguise","mummy pegasus","pet detective pegasus","spirit pegasus","starling pegasus",
		"trick or treat pegasus","volatile pegasus","wine queen pegasus","draculaura pony","flaming pony","painted pony","serene pony","silent comic pony","pony-stein","wild country pony",
		"paint mask colt","autumn model unicorn","courageous unicorn","dawn to dusk unicorn","evil headed unicorn","fairy lights unicorn","forest kirin","grim carousel unicorn",
		"mystical unicorn","peacock-unicorn","school teacher unicorn","zombie-corn","color magic zebra","felt sunshine","smart plush","brown plasticine","building block","candy stripe",
		"dymkovo","geometric","old carousel","patchwork","plushie rocking","printed rocky","pull-along","red plushie","soft plushie","stubby blockish","tuscan clay","vintage metal",
		"vintage wheeled","wooden toy","crayon winged pegacorn","manebow plush pegacorn","rocking clay pegacorn","serenity pegacorn","shade pegacorn","action figure pegacorn",
		"magical crystal pegacorn","wind up pegacorn","proud pegasus","tony robot pegasus","bright sun pegasus","miniature pegasus","periwinkle pegasus","pretty in pink pegasus",
		"princess toy pegasus","robotic pegasus","shiny toy pegasus","steampunk pegasus","toy princess pegasus","white ceramic pegasus","candy ponycorn","cowgirl pony","plushie pony",
		"pretty pink pony","spring carousel horse","wooden pony","wind-up colt","punk unicorn","bubble gun unicorn","doll ride unicorn","figurine princess unicorn",
		"friendly riding unicorn","plush unicorn","quilt unicorn","rainbow plush unicorn","wind up unicorn","adohi","reindeer","brauerei","chinaware","dark spotted","ice rink","jumping",
		"kith kin","miniature","nutcracker","picnic buddy","pilgrim","red plush","resolution","rose prism","sparkle glam","torpid","tourer","20s glam pegacorn","bavarian winter pegacorn",
		"earthenware pegacorn","freshwaters pegacorn","gingerbread pegacorn","golden shimmer pegacorn","holiday colors pegacorn","itzpapalotl pegacorn","lazer pegacorn",
		"magical holiday pegacorn","my pet pegacorn","orange tulip pegacorn","pink cheese pegacorn","princely pegacorn","snowdrop pegacorn","sparkler pegacorn","string puppet pegacorn",
		"water light pegacorn","anemone pegasus","baby pegaspice","celebration pegasus","dazzling pegasus","elf pegasus","first fall pegasus","grande parade pegasus","layabout pegasus",
		"pumpkin fairy pegasus","scout pegasus","sparkling pegasus","winter pegasus","holiday lights pony","cabaret pony","lazybones pony","native pony","nice pony","powderpuff pony",
		"sightseer pony","summer harvest pony","bagpiper unicorn","poinsettia unicorn","christmas unicorn","frost king unicorn","harvest sparkle unicorn","kaleidoscope garden unicorn",
		"knitted unicorn","puff unicorn","snow scrapper unicorn","tsiyone unicorn","wavy teal mane unicorn","glam punk zebra","grilled zucchini zebra","dale","dragon wing","engraved",
		"frost berries","hearty emo","helper","miss drew mare","neon show","pan","puzzle piece","santa's elf","shimmer ice","snow cape mare","stache and tatt","the emperor",
		"the empress mare","valentine's day","village sorceress","decorated shire","great shire","gypsy","kelpie","light pack","ornamented","retro knight","saddled","silken gray",
		"young love","alice pegacorn","dryad pegacorn","neon wings pegacorn","papercraft pegacorn","party animal pegacorn","pure emo pegacorn","winter moon pegacorn",
		"woodland magic pegacorn","flame of the forest pegacorn","healing pegacorn","white ribbon pegacorn","angelic pegasus","bundle of lights pegasus","druid pegasus",
		"fairy godmother","flutterfly pegasus","ice queen pegacorn","kumadori pegasus","mad hatter pegasus","miss audacious pegasus","queen pegasus","silver bells pegasus",
		"smoky wing pegasus","the sun pegasus","desert bird pegasus","galea mane pegasus","medieval princess pegasus","medieval sea pegasus","parchment pegasus","rural colors pegasus",
		"tapered crown pegasus","wilderlands pegasus","masked butterfly pegacorn","camorra pony","chef pony","countryside dales pony","farmer pony","guest pony","laid back pony",
		"social bash pony","ornamented shire pony","patchy pony","festive colt","avalon fighter unicorn","button rose unicorn","celebration unicorn","chestnut gypsy unicorn",
		"clay unicorn","foxglove unicorn","frost ornament unicorn","gifter unicorn","heart stitched unicorn","hipster inked unicorn","icicle unicorn","morphing unicorn",
		"snow queen unicorn","starry night unicorn","alchemycorn","feathered teal unicorn","medieval flag unicorn","moneylender unicorn","prince of thieves unicorn","purple heart unicorn",
		"royal runner unicorn","smithy unicorn","turquoise beauty unicorn","yakuza unicorn","action","clover fairy mare","elvis presteed","feather mane","fighter elhorn","globetrotter",
		"gnome romeo","king momo","lucky charm","lucky leprechaun","moondust","night club","no lovey","paddy's","patchy cob","posh","queen of romance","romantic","romanticist",
		"royal glitters","suit up","wooden knight rider","armoured","bejeweled","dynasty","gold dust","guardian","mythical jouster","paladin","princess mare","royal armored",
		"royal cloak","runestone","sapphire","shiny striped","3d glasses pegacorn","carnival queen pegacorn","cool shades pegacorn","deckhand pegacorn","emotional pegacorn",
		"green braids pegacorn","inked pegacorn","joust pegacorn","little irish pegacorn","royal avalon pegacorn","master of secrets pegacorn","new year's pegacorn","nightsky pegacorn",
		"prideful pegacorn","radiant pecocorn","black rose pegacorn","shining knight pegacorn","snazzy pegacorn","sparkled love pegacorn","spring bubble pegacorn","steel wing pegacorn",
		"think pink pegacorn","wilted rose wing pegacorn","element master pegacorn","regal fighter pegacorn","fire power pegacorn","guardian pegacorn","pink princess pegacorn",
		"baby wings pegasus","chichi pegasus","cloaked pegasus","cupid love pegasus","cupids pet pegasus","earthen pegasus","envy pegasus","floral pegasus","gilded pegasus",
		"golded red pegasus","goth rock pegasus","juliet pegasus","lantern pegasus","lovers pegasus","moonlight pegasus","movie star pegasus","pegasus of love","priestess pegasus",
		"psychedelic pegasus","queenly pegasus","rose wing pegasus","star wired pegasus","sundowner party pegasus","sunkissed pegasus","wedding vows pegasus","celtic cutout pegasus",
		"gold talisman pegasus","luminous pegasus","royal warrior pegasus","whirlwind pegasus","arabian prince pony","arabian princess pony","braided pony","bridesmaid pony",
		"cinderella pony","empress pony","flower princess pony","fluffy hair pony","frog prince ponisus","hoity toity pony","juliet pony","knight in armour ponisus","prince charming pony",
		"rainbow mane ponisus","rapunzel ponicorn","romeo pony","star dust pony","street shopper pony","assassin pony","braveheart pony","clover mane unicorn","frizzy mane unicorn",
		"galactic magic unicorn","haughty unicorn","koi kirin","midnight dragicon","oriental dragicon","pot o' gold unicorn","trendy unicorn","wizard magic unicorn",
		"feathered red unicorn","midnight kirin","unicorn queen","star knight unicorn","whirlpool unicorn","arthurian","avalon joust","bandit queen mare","cinco de pink",
		"continental scout","country ride mare","dragonwear","dreamtime aussie","exotic","fantasy","feathered war","feral","fiancee","flower","flower fairy","friend from arctic",
		"galloping royal","garland","girl bopper","glam","gold spotted","grunge","hair steamer","high roller","huckleberry","jager steed","jaguar paw","jimmy","mage","mayoral","mohawk",
		"moonlit","foal of the ocean","paint pattern","recycled steel","rockday","royal","royal roman","saloon sally","salwar styled","shining armor","spring colors","stallion ranger",
		"stylish steam","bar tender","touring mare","train driver","wild native","aqua","first mate","gold digger","harbour wench","marauder","mossy wood","pearlmaid",
		"pirate of the orient","raider","red sea","sea","sea wave","swashbuckling","wavy","bandit","brave","cowboy","cowboy bronco","desert shine","gunman poncho","gun slinger",
		"palomino mare","ranch","rodeo mare","rodeo show","sheriff mare","steppe","sunset","artist pegacorn","bday pegacorn","breezing pegacorn","circus pegacorn","comical hero pegacorn",
		"common hero pegacorn","egg picker pegacorn","enchanted swirl pegacorn","fabulous pegacorn","garden queen pegacorn","golden egg pegacorn","musician pegacorn","noble pegacorn",
		"parisian chic pegacorn","partyrocking pegacorn","pecockicorn","punk princess pegacorn","queens pegacorn","supa recycle pegacorn","rockon pegacorn","sheller pegacorn",
		"sherwani pegacorn","sparky pegacorn","stained glass pegacorn","steamed up pegacorn","wild native pegacorn","festive masquerade pegacorn","islander pegacorn","lion fish pegacorn",
		"sea shell pegacron","seasoul pegacorn","cowboy pegacorn","saloon girl pegacorn","black swan pegasus","bluey pegasus","bronze cast pegasus","caramel crunch pegasus",
		"chieftain pegasus","cotton twirl pegasus","dancing pegasus","fiesta pegasus","frilly folkloric pegasus","galactic pegasus","gift basket pegasus","glowy meadow pegasus",
		"gracious spring pegasus","greaser pegasus","gypsys pegasus","inked pegasus","inventor pegasus","kite lover pegasus","long eared pegasus","male dancer pegasus",
		"native sheriff pegasus","night sky pegasus","quetzal pegasus","stone age pegasus","straw wings pegasus","swift pegasus","toned pegasus","toucan pegasus",
		"traditional thai pegasus","viking queen pegasus","warrior princess pegasus","betta winged peagasus","caribbean pegasus","island protector pegasus","lantern pegasus",
		"pegasus of seas","seafarer pegasus","shell crown pegasus","desert night pegasus","freespirit pegasus","lady columbia pegasus","southern belle pegasus","bling suit pony",
		"carousel pony","dragon pony","egg hunt ponisus","festive ponycorn","french country pony","iseult the redeemer pony","janice pony","lady pony","moto princess pony",
		"oriental princess pony","peacock sparkle pony","poppy pony","rocker pony","rodeo pony","scene pony","sitting bull pony","stary pony","valkyrie pony","cabin boy pony",
		"deck sweep pony","horace ponycorn","lizzie ponycorn","navigator pony","periwinkle pony","sea pony","cowgirl pony","farm girl pony","fringed pony","oldwest pony","outlaw pony",
		"ranch pony","shaggy pony","sheriff pony","artic princess unicorn","aurora borealis unicorn","aviator unicorn","candilicious unicorn","candy cane unicorn","card hustlin' unicorn",
		"elegant english uniorn","farmhand unicorn","female dancer unicorn","floral unicorn","fluffly cloudy unicorn","glass princess unicorn","interstellar unicorn","knit unicorn",
		"night fire unicorn","night princess unicorn","perky unicorn","picture perfect unicorn","pink blanket unicorn","pink diva unicorn","pride parade unicorn","primadona unicorn",
		"warrior princess unicorn","admiral unicorn","cloaked unicorn","sparkle sea unicorn","barmaid unicorn","dappled unicorn","steam engine unicorn","towns man unicorn",



].fixOrder();
		
		var assTypes=["mini donkey","toy soldier donkey","african donkey","single donkey","spring donkey","mistle toe donkey","peasant donkey",
				"trick or treat donkey","mule","summer donkey","vampire donkey","fairy donkey","donkey","fake cupid donkey","farmer's market donkey","pink zonkey","denim donkey",
				"black miniature donkey","mini seaglass donkey","mumma donkey","nick donkey","bday bow donkey","clean up donkey","mule miner 49er",
			].fixOrder();
		
		//combines all foals to one array for easy searching
		var allFoals=[].concat(foalTypes,assTypes).fixOrder();

		var horseTypes=["light packed","black","brown","gray","grey","flowered","cream draft","red pinto","red ","sea pegasus","mysterious pegasus","enchanting pegasus",
		"glamorous pegacorn","elegant pegacorn","victorian","goth","australian draught","stylish stallion","denim donkey","safaricorn","mummycorn","space alien",
		"frosted filly","atlantean","tree spirit","holiday carousel","light blue pony","carved wooden","menorquin","chariot","guardian","fairy carriage","autumn fall","wind up stallion",


			].fixOrder();
			
		var bearTypes=["safari bear","spa bear","ugly sweater bear","winter polar bear","big bow bear","prom bear","beach koala","grizzlyjack","eurasian bear","storyland bear","fluffy polar bear",].fixOrder();
		
		var catTypes=["american bobtail","domestic shorthair","shopper tiger","snow leopard","snow leopard","ghost puma","snow leopard","trolap lyga",
		"coco kitty","jungle emerald striped jaguar","emerald striped jaguar","masked tiger","black and grey ocelot","caracal","aurora","black","himalayan",
		"persian","tabby persian","white","festive","atlantean","mountain climber","tropical","snowflake","tawny pampas","aegean","black jaguar","fall fur lion","tiger action figure",].fixOrder();
		
		var dinoTypes=["brachiosaurus","carnotaurus","gallimimus","coelophysis","painter rex","ballerina rex",].fixOrder();
		
		var dogTypes=["australian cattle dog","white wolverine","beanie fox terrier","holiday st. bernard","black australian cattle dog","fedora fox terrier",
		"merle corgi","river float pug","dog pilot","bently beagle","tribute terrier","mod doberman","sock hop poodle","space alien wolf","egyptian wolf",
		"winter fox","charmed dog","quilt dachshund",].fixOrder();
		
		var duckTypes=["armored","belted","party","ugly","red-billed","red","brown","yellow","australian wood","maitre d'","suitor","blue-winged teal","atlantean","country singer",].fixOrder();

		var ducklingTypes=["ugly","red","brown","yellow","blue"].fixOrder();
		
		var elephantTypes=["floaty elephant","blue dot elephant","elephant","halloween tutu hippo","atlantean elephant","elephant","circus peanut elephant",
		"aurora elephant",].fixOrder();
		
		var goatTypes=["boer","caroling","red","red toggenburg","moufloun","big horned","australian miniature","australian mini goat","lightening",].fixOrder();
		
		var pigTypes=["bubbly","white","snowflake","space alien","neopolitan","atlantean","giving","gleaming tusks boar","cinta sinese","evil smile boar",].fixOrder();
		
		var rabbitTypes=["black","dutch","spelled ears","red grape","arctic hare","english spot hare","spotted lop hare","white daisy bunny","space alien bunny","sly","white","black","pharoah",].fixOrder();

		var hoovedTypes=["white holiday reindeer","clumsy reindeer","reindeer","ringtail","white-tailed buck","llama","poncho llama","white llama","red giraffe","zebra giraffe","semiformal giraffe","tuxedo giraffe",].fixOrder();

		var sheepTypes=["medieval","miner","shoppin' sheep","dwarf blue","elf","luv ewe","sunny ewe","bazaar","pixie dust","spiral candy","patchwork",].fixOrder();
		
		var turtleTypes=["turtle","messenger bag turtle","navy fuschia spotted turtle","tiki mask turtle","wfh turtle",].fixOrder();
		
		var wateranimalTypes=["big blue tang fish","crown of thorns starfish","harbor seal","use it seal","walleye",].fixOrder();

		var cowTypes=["adaptaur","evening","cow with poofy skirt","rider bull","cyclist","hiker","irish moiled","brown","chocolate","dexter","disco","fan","groovy",
		"longhorn","pink patch","pink","purple valentine","purple","yellow patch","green patch","milking shorthorn","pumpkin",
				"flannel","caroling","smitten","red","mini longhorn","ghengis","real ca milk","golfcourse","treat","cleopatra",
				"trick","caroling","jack frost","cleaning","storage","red","telemark","space alien","candy striped","water spirit","borealis bovine","long eared","spanish bull",
				"fairyland","spotted holiday","witch","quilt","medieval robed","sir",
			].fixOrder();
				
		var eggTypes=["white","brown","black","cornish","golden","rhode island red","scots grey","rainbow","candycane",
				"english","party","marans","faverolles","araucana","buttercup","candycorn","apple","fall fairy","new year",
				"tourist","snowflake","crystal","cupid","love","carnival","headress","cochin","aloha","green silkie","spa",
				"hawaiian","shamrock","ali-h3n-12","lava","sabertooth","strawberry fairy","bonnet","japanese bantam","wizard",
				"golden polish","mother","bresse","mystery cluck rogers","junglefowl","mandolin","jazz","hiking","zen","beach",
				"rocket","chabo","present","fortune cookie","american","orange","fairy tale","barnevelder","groundskeeper",
				"cluck rogers","gymnastics","jet pack","captain","masquerade","paradise","meditating","flowering","budding",
				"bulb","aromatic","delicate","perennial","adventure","sumo","environmentalist","student","chili","ceres",
				"chicken turkey","haunted","dragon","giant prairie","chicken chicken","dark","chickenpire","hammer","skeleton",
				"werechicken","mad hatter","fire","ice","tambourine","coruroy","farmer","giant jersey","egg in jeans","winter",
				"strawberry","chili light","prom chick","spectator","red sweater","floating","long john","partying",
				"checkerboard","invisible","jester","lovestruck","dark cloud","a l'orange","aphrodite","deepsea","tea pouch",
				"bunny hoodie","rabbit ears","rubber chicken","spring","with a giant backpack",
				"marionette","marshmallow","rubber suit","stooge","umbrella","australian game","high fashion","mother hen",
				"charleston","picnic","4th birthday","gym class","radioactive","scribe","lorb","4th birthday","space alien","cosmic","crusader","super",
				"slimed","sugar cookie","rainbow fantasy","coconut puff","horus","porcelain","denim overalls","fire breather","handbag",
				"kitchen warrior","pink fluffy","sugar rose","summer sunset","aerialist","chef","gobstopper","petite","pilot","turkish",
				"tourist","charming","gummy","autumn magic","berry","black belly","blue wizard","bright swirl","chic tail","flash bright","golden feather",
				"hearth and home","midnight","pale moon","phoenix","prince charming","sky blue","sorceress","charming","franken-egg","grim reaper","gummy","jack o",
				"light shades","mummy","nightgown and cap","taranchicken","watermelon","atlantean","count cluckula chicken","ghost",
				"paper lantern","pink nightmare","pumpkin chicken","werechick chicken","autumn","frost feather","arctic glow","frostlight","hollybright","holly light",
				"ornament","autumn","frost feather","arctic glow","frostlight","hollybright","holly light","ornament",
				"holiday starlight hen","light bulb","nutcracker","nutcracker ii","singing chicken","sour apple chicken","sparklefairy","stained glass","sunset fire fowl",
				"toy","wild harvest","sledding","ice maiden","ice touched","wired","ice maiden","coal","gift","mystery coal","mystery gift","acashia","cha-cha-egg","hula","egg trooper",
				"ancient chicken","brown bellied araucana","javan junglefowl","legendary","anti","banded feather","bay breeze","bubblegum","champagne","chocolates","cuddly","dandelion",
				"emo emu","fiery feather araucana","glitter pink heart","gold nugget","heart pecking","legendary fire wings","legendary lovebird","legendary song","legendary thunder bird",
				"legendary white eagle","legendary white eagle","lunar feather","mystery cuddly","mystery legendary fire wings","mystery lunar feather","mystery rainbow candy chicken",
				"prima ballerina","purple crystal","quetzal","rainbow candy","red flare","rustic garden","sagittarius","sheriff","solid gold","stawberries and champagne","stormy",
				"white australorp","wild wild","zodiac rooster","bal masque","chakra","emerald glass","emerald soldier","legendary rainbow flight","munchkin","poppy silkie",
				"rainbow feather","rainbow glass","rainbow silkie","rainbow wing","sunrise rooster","sunset hen","rain check","argenta","celtic","fog and rain","gold and rainbow",
				"egg in the clouds","jerk","lemon","rainfeather","spring hen","springtime","usher coat","dragon","foolish","lavender light","sparkle spring","celtic phoenix",
				"a barcelona glass","carnival","easter bunny","golden jewel","greek","hermes","masked rose","persian","portofino","rainbowskies","shutterbug","spring flower","tango",
				"teapot","tulip","wordsmith","zinnia","zinnias silky","aster","baker mother hen","coin","fiesta","grill master","homesteader","hottie","lavender fields","margarita",
				"morning glory","motherly hen","mystery","not-tie iced","rapper","renaissance","rockadandy","romanhelm","rustic","shiny bubble","snake charmer","hookah","hemhem",
				"suntanned","stardust","saturn","peacock","osiris","oasis thief","lotus","fishing","disco dancing","beach volley","bubble gum birthday","bubble gum","confetti","smokey",
				"victorian bride","bat chicken","boho","celestial","chiming","cotton candy","daisy","disguised","dwarf","eggshell","glowstick","haunted fairy","macaw","prized","smitten",
				"sunup chicken","techno","tribal","tutu","warped","chocolate","leaf swirls","pretty in pink chick","pirate chicken","sushi chef","pumpkin belly","moon carrier",
				"buccaneer","butterflies","caped","duckula's bride","fancy","forest fairy","halloween mummy","joker","lab assistant","oldlantern","painted","rainbowsky","pumpkin head",
				"punk","baseball","dymkovo","wheeler","baby q","ballerina","cosy","dewdrop","eggnog chicken","eggnog","feather and boa","foodie","harvester",
				"holiday gift","nutcracker","quilt","scrooge","sugar plum","sugar rush","three wise hens","toy mumma","toymaker","turk","tyrolean","wind up soldier","bard",
				"country princess","crowing rooster","cuckoomaran","detective","faerie blossom","gangster","glitter and ice","golden laced","hip skater","ice skater","kidnapped",
				"medieval pattern","new look","noble","ski rider","snoozy rooster","sotally tober","vegas show","bishop","chirpy","choco love","courtesan","dragon","eggy chicklets","fan",
				"fierysorceress","glitter tutu","golden girl","jimi henrix","love potion","master of laws","moon dance","old world","performance star","rare","secret admirer","spoiler",
				"stewardess","vanity","wedding singer","white shamrock","biker","bobby soxer","break fast","butterchurn","cape","cheatin' poker","checked shirt","chicky wonka",
				"chin curtain","chirpy mum","easter","spring flower","fly away","gem studded","lbd","party cap","penguin","preppy","space villain","spring chicklet","spring mother",
				"station master","trendy","wedding guest","audra","shell","gunspinner","lasso","poker",


			].fixOrder();
				
		var eggTypes2=["white bunny","yellow bunny","pink bunny","purple bunny","blue bunny","gold bunny"];
				
		//two word or common animal catch all texts
		var chickenTypes=["high fashion","picnic","snow","space alien","coconut puff","midnight","frostlight","italian rooster","smitten","red riding","pumpkin belly",].fixOrder();
		
		var birdTypes=["seagull","fancy goose","farm goose","elf penguin","mistletoe penguin","bulk order ostrich","large parrot","lesser flamingo",
		"peacoat penguin","penguin","puffy jacket puffin","single order ostrich","skinny jeans ostrich","treasure seagull","turkey","white goose",
		"white turkey","sea gull with camera","bootcut ostrich","lesser flamingo","horus hawk","javan jungle fowl","glass rooster","stained peacock",].fixOrder();
		
		var dragonTypes=["arajir","danomire","etterius","furilich","ice cream","lemon","rose","sugar","tselius",
		"droopy","peppy",].fixOrder();

		var otherAnimals=["bandicoot","chinchilla","raccoon","striped opossum","pixie stick porcupine","holiday light porcupine","porcupine","mage fox","medieval moose",].fixOrder();
				
		//baby animals that aren't calves or foals
		var babyAnimals=["baby goat","baby groundhog","red wolf","baby bourbon turkey","coyote pup","wolf cub","brown kitten","baby alpaca","white wolf",
				"baby penguin","baby elephant","white kodiak cub","baby turkey","baby zebra","andean bear cub","baby valentine giraffe","black bear cub",
				"clever cub","lil pink peacock","romeo cub","trick or treat bear","jaguar cub","baby tiger","siberian tiger cub",
				"nutcracker ballerina cub","panther cub","white lion cub","baby bobcat","baby monkey","flower mane cub","baby seal",
				"spring puppy","bear cub","brown baby elephant","baby elephant","brown kitten","red fox kit","gray fox kit",
				"lion cub","baby dragon","kodiak cub","baby white penguin","baby winter seal","baby llama","baby carnival elephant",
				"baby giraffe","candy kid","white kitten","sterling rose cub","heart print leopard cub","tangled ribbon kitten",
				"tangled beads kitty","baby porcupine","cuddling kittens","rainy lion cub","snowy lion cub","cuddling puppies","atlantean panther cub",
				"baby koala","badger cub","corgi puppy","flowery puppy","flying fox","gryphon hatchling","hedgehoglet","puma cub","lynx cub","mallard duckling","otter pup",
				"springly puppy","potbelly piglet","irish fox cub","baby sea turtle","english lop kit","dragon whelp","mitten kitten","kitten with mittens","fennec kit",
				"blue bell platypus","foozbal","wokwok","moonbear cub","frosting baby monkey","gummy octi","ice cream eater","lollipop elephant",
				"marshmallow bunny","pink cotton piglet","pouch packed joey","rock candy turtle","sweet tea pomeranian","cookie jar cub",
				"orchid baby alpaca","dandy lion cub","monarch kitten","porcelain kitten","labrador puppy","lavender retriever puppy",
				"baby summer dragon","baby pink elephant","baby nile crocodile","aspiring hedgehoglet","baby african penguin","petalwing piglet",
				"baby pygmy goat","pet tiger","werepup","dark griffon fledgling","dark-mane dragon whelp","light griffon fledgling","light-mane dragon whelp",
				"luna pup","yellow lab pup","bright puppy","lunar bear","baby ember","holiday baby dragon","snowbaby","new years baby alpaca",
				"north pole baby dragon","snow baby dragon","baby ice peacock","purple baby king penguin","blue andean cub","baby bald uakari","bundled up kitten","clouded leopard cub",
				"flower frolic oncilla","playful panther","baby tapir","fledgling legendary egret","fledgling legendary rhea","gold banded armadillo pup","saddle llama cria",
				"tribal catamount cub","yacare hatchling","tin bear cub","emerald cub","emerald tail dragon","playful poppy dragon","tik tok whelp","bubble bear cub",
				"cowardly cub","flying baby monkey","flying bubble kitten","spring leaf lamb","red glass whelp","baby harbor phoenix","blue baby octi","blue glass whelp",
				"carnation cub","water squirt whelp","baby sunflower bunny","balloon seal pup","blue bow kitten","blue bubble tiger cub","kite cub","lily kit","orange glass whelp",
				"painted hippo calf","pansies puppy","rainbow griffin hatchling","rose peachick","surprise gift puppy","yellow monarch whelp","baby nile crocodile","arabian baby camel",
				"cutesy pup","baby girl calf","balloon cub","fluffy pegasus","chainmail cub","old cloak puppy",

].fixOrder();
				
		var fawnTypes=["affectionate dream","fallow dream","holiday dream","ice queen dream","purple nightdeer","rudolph dream","deer","dusk","fire","firefly","king","moon","nature",
		"princess","queen","rain","shell","snowflake","sunrise","water","aurora","cloud","amber dream","astral magic","daisy chain magic","dark ridge","light ridge","moon speckled",
		"peacock","saddled","shadow dance","bat horn dream","bean scene","dainty dream","light horns magic","phantasmic magic","pumpkin fairy","dainty dream","sinister candle dream",
		"spooky lights dream","sugar skull dream","white rider stag","fall","light-cicle dream","winter elk magic","light-cicle dream","winter elk magic","wreath wrapped",
		"aurora","candy cane","holiday cheer","snowsparkle","maple princess deer","color wave dream","frostglimmer fairy","light-up toy dream","maple princess deer","merry sparkle",
		"orchid bloom dream","poinsettia","polka dot dream","thunderfire dream","winters dawn","winter's wish dream","diamond chandelier","psychedelic dream",
		"silent night fairy","diamond corsage dream","ice scupture dream","elf magic","holiday","ice maiden dream","naughty magic","nice magic","constellation dream","downy snow dream",
		"maui sunset dream","phlox dream","pristine beach","winter fest","chieftain","decorated feather","amazon spirit dream","black roses dream","blooming love","blooming love dream",
		"coffee bean dream","dark hearts dream","darkthorn dream","decadent lace dream","falling sky dream","gold valentine dream","ice gliding dream","lace collar rose dream",
		"love dream","navajo dream","pink rose dream","poprocks dream","pudu dream","rainforest wings dream","red wine dream","satin & gold dream","soft and cozy","springtime dream",
		"apple horn","doubloon dream","dream catcher dream","flying spotted","poppy antler","rainbow feather","royal emerald","sleeping","wild flower","carnival","celtic fantasy dream",
		"gravity dream","rainbow and gold dream","rainbow flowers and gold dream","celtic stag dream","purple shimmer","sol stag","spring","starlight","blooming fairy dream",
		"cheerful dream","chipper eyeing","heather dream","holiday light dream","jelly bean dream","port sunset dream","prickly pear","spring fallow dream","tune in","twinkling dream",
		"athena","festive flame","fuchsia swirl","golden hind dream","italian porcelain","matafawn","renaissance dream","roman dream","spanish rose dream","jewel-tailed","bubble cream",
		"coral dream","daffodils dream","gemini dream","green tea","lacy dream","moon mist","mother's cradle","naive pet","native wild","serene dream","symphony dream","jeweled oasis",
		"inner fire","whoopee","organ dream","lightning dream","filigree dream","droopy","desert spirit","dark star dream","bejeweled dream","victorian dream","bird cage","disco dream",
		"dreamy","emerald spire","hibiscus dream","jade antelope","kitsch queen","springbok antelope","tassel dream","backwoods","happy fairy","jadefire gazelle","moon horn",
		"runic gazelle","sunshine fairy","wispy","buzzybee","dr. doctor","garlic","glowy fairy","hipster dream","misty magic","mystic pixie","pearly blue","wisp","majestic antlers",
		"spooky skeletal","starveling spectre","purple candle","spooky lights","candles and light","doozie splash","night lights","ring master","spooky fall","spotless mystical",
		"transpicuous","will o wisp","patchwork","shiny gold","candy horn","christmas eve reindeer","cuddlekin","dandy dream","fairy light reindeer","fruity skewer","happy holiday",
		"icy sparkle","ineffable stag","jolting antler","mischievous","snowed in","bunnies with fawn","christmas night","crystal antler","flower horned","kabuki","rudolph the reindeer",
		"shimmer","the star","crimson","medieval stag","angel of love","carnival dancer","clover antler","colour starburst","court dancer","dark sorceress","dissipating","elder spirit",
		"entranced","love minded","medieval peryton","rainbow shimmer","rosey antler","ruby dream","ruby rose","spring flower","storm dream","wane peryton","armored","evergreen stag",
		"royal soldier","warlock","masked festive flame","aussie","cola","rancher doe","dressed up","earth my","egg garland","eggster","green knight","lasso","moonlight mist",
		"nature king","paranoid","peace lover","pinata","popcorn","psychelic","relaxed","starfish","steamy","topaz","vintage touring doe","cloaked","coral","dark striped","island riches",
		"tropic","sunset","wild cowboy",



		
].fixOrder();
				
		var avatar=["spontaneous adventurer","casual traveler","pampered princess","practical lounger","sensible sunbather",
				"outdoor explorer","wild spirit","teddy bear","koala","cat","hamster","dog","monkey","lion","tiger"].fixOrder();
				
		var dnaTypes=["red","blue","green","orange","yellow","purple"];
		var gemTypes=["purple amethyst","white diamond","green emerald","red ruby","blue sapphire"];
		var scaleTypes=["blue","green","orange","purple","red","yellow"];
		var serumTypes=["blue","green","orange","pink","purple","yellow"];
		var cuttingTypes=["green","red","pink","purple","yellow"];
		var spiritTypes=["blue","green","pink","purple","yellow"];
		var fossilTypes=["amber","black","gray","red","wood"];
		var pixieTypes=["blue","green","orange","white","yellow"];
		var fishscaleTypes=["red","yellow","orange","purple","green"];
		var horseshoeTypes=["silver","black","blue","red","gold"];
		var cloudTypes=["wispy","sunset","moon","stormy","rainbow"];
		var wildflowerTypes=["pink","blue","yellow","purple","orange"];
	
		var bulbTypes=["anemone","damask rose","fire sunflower","fire weed","orange tulip","pink boat orchid","purple carnation",
				"purple petunia","soho oriental poppy","tiger lily","white daisy","white lily","yellow pansy","pink hollyhock",
				"flame azalea","fairy flower","golden rose","pyramidial orchid","kerry lily","groundsel","pink gladiolas",
				"purple aster","cardinal flower","hydrangea","purple primrose","desert rose","royal bluebell","golden wattle",
				"pink daisies","yellow gerbera","red rose","orange zinnia","yellow buttercup","pink tulip","bird of paradise",
				"sprite flower","wild indigo","lavender","pink carnation","lady slipper","impala lily","leopard orchid",
				"african daisies","red clover","golden lotus","magical flower","bluets","evening primrose","mountain laurel",
				"rose quartz bloom","chinese bellflower","helenium","fall corcus","piranha bloom","black orchid","mandrake",
				"pumpkin flower","spider flower","witchhazel","wolfsbane","black hollyhock bloom","hemlock bloom","black rose",
				"orange chrysanths","bat face cuphea","marigold","pata de leon","skull cap","candy corn","cosmos","baby's breath",
				"blackberry lily","forget me not","sweet pea","narcissus","orange mums","purple-ranunculus","silver poinsettia bloom",
				"amaryllis","anemone ii","aster","black-eyed susan vine","casa blanca lily","poinsettia","cow tulip","waratah",
			].fixOrder();
				
		//contains the main list of "other" things you can collect
		//decorations by event
		var decorApples=[];
		
		var decorHalloween=[];
		
		var decorThanksgiving=[];
		
		var decorChristmas=[].fixOrder();
		
		var decorHolidayHearth=[];
		
		var decorMagicSnowman=[];
		
		var decorWinterWonderland=[];
		
		var decorValentines=[].fixOrder();
				
		var decorStPatty=[];
				
		var decorEaster=[];
				
		var decorShovels=[];
		
		var decorSchoolSupplies=[];
		
		var decorTuscanWedding=[];
		
		var decorWishingWell=[];
		
		var decorFlowers=[];
		
		var decorSandCastle=[];
		
		var decorFV2Birthday=[];
		
		var decorGnomes=[].fixOrder();
		
		
		var decorOther=["nightingale","leprechaun gnome","irish cottage","double-deck tractor","white willow","chef gnome","mole","crystal rock","cave gnome","antique tractor","candy cane decoration","single candle","ice cube","lighted fence","holiday planter",
				"giant snowflake 1","reindeer balloon","snowy track i","snowy track ii","snowy track iii","snowy track iv",
				"snowy track v","snowy forest","winter cafe","santa's sleigh","gift mountain","winter cottage","ice castle",
				"toy factory",].fixOrder();
		
				
		// merge decorations for searching
		var decorTypes=[].concat(decorHalloween,decorThanksgiving,decorChristmas,decorValentines,decorStPatty,
				decorEaster,decorWinterWonderland,decorShovels,decorSchoolSupplies,decorTuscanWedding,
				decorWishingWell,decorFlowers,decorSandCastle,decorFV2Birthday,decorApples,decorOther,
				decorHolidayHearth,decorMagicSnowman,decorGnomes).fixOrder();

		//this animal catchall is for words that already appear earlier, and so must be searched AFTER horses, foals, materials or decorations
		var animalCatchalls=["chicken","turkey","llama","cow","horse","sheep","pig",
				"rabbit","boar","duckling","duck","foal","calf","ram","raccoon","porcupine","goat"].fixOrder();

		//catchall for other items not listed as materials
		var otherWords=["lucky penn","raffle ticket"];

		//dynamically build accept texts from the arrays above
		var t1 = createAccTextFromArray([].concat(otherWords,decorTypes,materials),"","");
		var t2 = createAccTextFromArray(allCalves,"adopt_calf"," Calf");
		var t3 = createAccTextFromArray(allFoals,"adopt_foal"," Foal");
		var t31 = createAccTextFromArray(yakTypes,"adopt_yak"," Yak");
		var t4 = createAccTextFromArray(horseTypes,"adopt_horse"," Horse");
		var t5 = createAccTextFromArray(bushelTypes,"bushel_"," Bushel");
		var t6 = createAccTextFromArray(flowerTypes,"perfect_"," Bunch");
		var t7 = createAccTextFromArray(treeTypes,"tree_"," Tree");
		var t8 = createAccTextFromArray(treeTypes2,"tree_giant"," Tree (Giant)");
		var t34 = createAccTextFromArray(treeTypes3,"tree_bonsai"," Tree (Bonsai)");
	//	var t47 = createAccTextFromArray(treeTypes4,"tree_"," Tree (Level 1)");
		var	t9 = createAccTextFromArray(craftShop,"join"," Team");
	//	var t9 = createAccTextFromArray(craftTypes,"sample_"," Sample");
		var t10 = createAccTextFromArray(colTypes,"col_"," Collectible");
		var t11 = createAccTextFromArray(colGroups,"colX_"," Collectible");
		var t12 = createAccTextFromArray(duckTypes,"adopt_duck"," Duck");
		var t13 = createAccTextFromArray(ducklingTypes,"adopt_duckling"," Duckling");
		var t14 = createAccTextFromArray(pigTypes,"adopt_pig"," Pig");
		var t15 = createAccTextFromArray(sheepTypes,"adopt_sheep"," Sheep");
		var t30 = createAccTextFromArray(sheepTypes,"adopt_ewe"," Ewe");
		var t16 = createAccTextFromArray(cowTypes,"adopt_cow"," Cow");
		var t17 = createAccTextFromArray(eggTypes,"egg_"," Mystery Egg");
		var t18 = createAccTextFromArray([].concat(otherAnimals,babyAnimals,animalCatchalls,bearTypes,dinoTypes,dogTypes,elephantTypes,hoovedTypes,turtleTypes,wateranimalTypes),"adopt_","");
		var t19 = createAccTextFromArray(buildings,"mat_"," Parts");
		var t20 = createAccTextFromArray(questItems,"send","");
		var t32 = createAccTextFromArray(eggTypes2,"egg_"," Egg");
		var t44 = createAccTextFromArray(chickenTypes,"adopt_chicken"," Chicken");
		var t45 = createAccTextFromArray(dragonTypes,"adopt_dragon"," Dragon");
		var t33 = createAccTextFromArray(avatar, "costume_"," Costume");
		var t35 = createAccTextFromArray(dnaTypes,"dna_"," DNA Strand");
		var t37 = createAccTextFromArray(gemTypes,"gem_"," Gem");
		var t36 = createAccTextFromArray(bulbTypes,"bulb_"," Bulb");
		var t38 = createAccTextFromArray(scaleTypes,"scale_"," Dragon Scale");
		var t39 = createAccTextFromArray(serumTypes,"serum_"," Monster Serum");
		var t40 = createAccTextFromArray(cuttingTypes,"cutting_"," Bonsai Cutting");
		var t41 = createAccTextFromArray(spiritTypes,"spirit_"," Animal Spirit");
		var t42 = createAccTextFromArray(fossilTypes,"fossil_"," Fossil");
		var t43 = createAccTextFromArray(pixieTypes,"pixie_"," Pixie Dust");
		var t46 = createAccTextFromArray(fishscaleTypes,"fishscale_"," Fish Scales");
		var t48	= createAccTextFromArray(horseshoeTypes,"horseshoe_"," Horseshoes");
		var t49	= createAccTextFromArray(cloudTypes,"cloud_"," Cloud");
		var t50	= createAccTextFromArray(wildflowerTypes,"wildflower_"," Wildflower");
		var t51 = createAccTextFromArray(fawnTypes,"adopt_fawn"," Fawn");
		var t52 = createAccTextFromArray(goatTypes,"adopt_goat"," Goat");
		var t53 = createAccTextFromArray(catTypes,"adopt_cat"," Cat");
		var t54 = createAccTextFromArray(rabbitTypes,"adopt_rabbit"," Rabbit");
		//use t21 below to create your own accTexts for non-arrayed items or for other special needs
		var t21 = {
			sendmat:"Material",sendbushel:"Bushel",order:"Unknown Bushel Order",sendhelp:"Help",bushel_random:"Random Bushel",
			grabbag:"Grab Bag","100xp":"XP",adopt_lambewe:"Lamb (Ewe)",adopt_lambram:"Lamb (Ram)",tree_ornament2:"Ornament Tree II",
			wanderingstallion:"Wandering Stallion",adopt_lamb:"Lamb (Unknown Sex)",adopt_piglet:"Piglet", tree:"Unknown Tree",
			luckypenn:"Lucky Penny",bushel:"Unknown Bushel",perfectbunch:"Perfect Bunch",pollinated:"Unknown Seeds",sendbasket:"Basket",
			adopt_ramfloweredgreen:"Flowered Green Ram",sample:"Unknown Level Sample",sample1:"Sample Level 1-20",sample2:"Sample Level 21-40",
			sample3:"Sample Level 41-80",sample4:"Sample Level 81-100",sample5:"Sample Level 100+", schoolsupp:"School Supply",
			wildlife_rare:"Wildlife Baby (Rare)",wildlife_common:"Wildlife Baby (Common)",petrun_common:"Mystery Baby (Common)",
			petrun_rare:"Mystery Baby (Rare)",zoo_common:"Zoo Baby (Common)",zoo_rare:"Zoo Baby (Rare)",aviary_rare:"Egg (Rare)",
			aviary_common:"Egg (Common)",livestock_common:"Mystery Baby (Common)",livestock_rare:"Mystery Baby (Rare)",
			sendwishlist:"Wishlist",sendfeed:"Animal Feed",sendbottle:"Bottle",arctic_common:"Winter Baby (Common)",
			arctic_rare:"Winter Baby (Rare)",unknown_baby:"Unknown Baby",adopt_holidaystbernard:"Holiday St. Bernard",
			sea_common:"Water Baby (Common)",sea_rare:"Water Baby (Rare)",jade_common:"Jade Baby (Common)",jade_rare:"Jade Baby (Rare)",
			ocean_common:"Jade Water Baby (Common)",ocean_rare:"Jade Water Baby (Rare)",join:"Unknown Crafting Team",tarot_past:"Tarot Card (Past)",
			tarot_present:"Tarot Card (Present)",tarot_future:"Tarot Card (Future)",tarotcard:"Tarot Card",bulb_unknown:"Unknown Bloom",
		};

		var t22 = createAccTextFromArray(seedTypes,"seeds_"," Seeds"," seed package");
		var t23 = createAccTextFromArray(bushelTypes,"polseeds_"," Pollinated Seeds");
		var t29 = createAccTextFromArray(bushelTypes,"order_"," Bushel Orders");

		//use t27 to repair accTexts for screwy test texts before converting to accept texts
		var t27 = {"polseeds_purplepopp":"Purple Poppy Pollinated Seeds",
			"polseeds_orangedais":"Orange Daisy Pollinated Seeds",
			"polseeds_electriclil":"Electric Lily Pollinated Seeds",
			"polseeds_daylil":"Daylily Pollinated Seeds",
			"polseeds_goldenpopp":"Golden Poppy Pollinated Seeds",
			"polseeds_chromedais":"Chrome Daisy Pollinated Seeds",
			"polseeds_sunpopp":"Sun Poppy Pollinated Seeds",
			"bushel_purplepopp":"Purple Poppy Bushel",
			"bushel_orangedais":"Orange Daisy Bushel",
			"bushel_electriclil":"Electric Lily Bushel",
			"bushel_daylil":"Daylily Bushel",
			"bushel_goldenpopp":"Golden Poppy Bushel",
			"bushel_chromedais":"Chrome Daisy Bushel",
			"bushel_sunpopp":"Sun Poppy Bushel",
			"polseeds_purplepopp":"Purple Poppy Perfect Bunch",
			"polseeds_orangedais":"Orange Daisy Perfect Bunch",
			"polseeds_electriclil":"Electric Lily Perfect Bunch",
			"polseeds_daylil":"Daylily Perfect Bunch",
			"polseeds_goldenpopp":"Golden Poppy Perfect Bunch",
			"polseeds_chromedais":"Chrome Daisy Perfect Bunch",
			"polseeds_sunpopp":"Sun Poppy Perfect Bunch",
			"order_purplepopp":"Purple Poppy Bushel Order",
			"order_orangedais":"Orange Daisy Bushel Order",
			"order_electriclil":"Electric Lily Bushel Order",
			"order_daylil":"Daylily Bushel Order",
			"order_goldenpopp":"Golden Poppy Bushel Order",
			"order_chromedais":"Chrome Daisy Bushel Order",
			"order_sunpopp":"Sun Poppy Bushel Order",
		};

		//create the actual attachment
		var attachment={
			appID:thisApp,
			alias:'FV',
			hrefKey:'key',
			name:'FarmVille',
			thumbsSource:'farmville.zgncdn.com',
			flags:{httpsTrouble:true,requiresTwo:false,skipResponse:false,alterLink:true},
		/*	icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc1/v43/144/102452128776/app_2_102452128776_416.gif", //corncob
			icon:"http://fbcdn-photos-a.akamaihd.net/photos-ak-snc1/v85005/144/102452128776/app_2_102452128776_343.gif", //duckhead
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc1/v85005/144/102452128776/app_2_102452128776_3994.gif", //strawberry
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc1/v85005/144/102452128776/app_2_102452128776_3606.gif", //chicken
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc1/v85005/144/102452128776/app_2_102452128776_162286141.gif", //coconut
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc1/v85005/144/102452128776/app_2_102452128776_479416909.gif", //piggy
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_514042832.gif", //sheep
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_188884871.gif", //goat
			icon:"http://fbcdn-photos-a.akamaihd.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_658246637.gif", //orchid
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_1802400414.gif", //watermelon
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_810647710.gif", //tractor
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_1575157638.gif", //barn
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_724451824.gif", //panda
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_1903979455.gif", //flower
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_981457788.gif", //flower2
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_732411100.gif", // xp
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc1/v85005/144/102452128776/app_2_102452128776_4389.gif", //fv
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_302226724.gif", //barn2
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_1935537816.gif", //fv2
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_1452563179.gif", //cow
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_81659645.gif", //tractor2
		*/	icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_1457410780.gif", //fv3
		desc:"FarmVille Sidekick",
			
			//code for altering link destinations before processing (unique to FV at this time)
			alterLink:[{
				//find in href
				find:'next=gifts.php%3FgiftRecipient',
				
				//replace with, (note the {%1} in the replacement)
				replace:'next=gifts.php%3FselectedGift%3D{%1}%26giftRecipient',
				
				//words in the post body text
				words:["nail","wooden board","brick","honeybee","vehicle part","smoker","beeswax","blanket","bottle",
					"horseshoe","harness","training their puppy","kibble","watering can","shovels","concrete","hammer",
					"twine","tin sheet","hinge","screwdriver","wrench","pipe","clamps","stone","log","steel beam","wire",
					"water pump","painted wood","shrub","grazing grass","hay bundle","fence post","special delivery",
					"animal feed","saddle","bridle","punch","snacks","paint","red beam","screw","aluminum siding",
					"candy cane beam","conifer dust","ice post","rail spike","rail tie","coal","pickaxe","hair dryer",
					"milk and cookies","gps","silver bell","holiday lights","reindeer treat","holiday cheer","snow brick",
					"snowflake","ice nail","snow globe","ice board","frozen beam","white paste","white overalls",
					"light plywood","black light","blue roller","white paper","teaching their dog","wood stain",
					"scaffolding","masking tape","brush","baby blanket","salt lick","sod piece","wooden peg","feed bucket",
					"water pail","grass seed","raw wood","baby carrot bunch","bunny bed","bunny tunnel","branch ball",
					"wood block","hutch wire","clamp","wood glue","sand paper","awning","basket","price card","twig",
					"potting soil","daffodil","tiny window","toadstool","garden fence","chocolate brick","gumdrop accent",
					"gingerbread siding","lollipop lamp","marshmallow mortar","cotton candy insulation","mini boulder",
					"turf roll","mulch soil","tropical cup","swim suit","beach sandal","lily pad","fishing pole","lure",
					"fuel pipe","level gauger","steel sheet","small axe","boat hook","wheelbarrow","mineral infusion",
					"steam","bed rock","stone pillar","terra cotta","hanging incense","reed thatch","clay brick",
					"bamboo rail","fill dirt","cement","metal post","mystery bulb","floating rock","sparkle seed",
					"magic water","wood plank","sail","rigging","skimmer","water bucket","leaf net","steering wheel",	
					"dog bed","tennis ball","pacifier","baby mobile","cloud brick","enchanted bamboo","hovering charm",
					"scientific scale","massage stone","buffet tray","drift wood","research paper","barnyard shingle",
					"tree incubator","cloning solution","chisel","magic boulder","talisman","ball of wool","java fern",
					"gold dust","mallet","stone pick","cobweb","old fence","deadwood","rusty gear","rusty post","chew toy",
					"thunder cloud","fertilizer stake","mulch","seedling tray","ladle","enchanted iron","gummy tentacle",
					"puffy cloud","magic bubble","life essence","purple roller","wooden cog","wooden shaft","stamp",
					"bearings","carnival light","gondola","windmill blade","wooden giraffe","wooden tiger","wooden zebra",
					"bumper","drying rack","flower apron","green tape","yellow paper","seatbelt","pepper packet","trough",
					"copper tube","drill bit","cut bamboo","bonsai pedestal","bonsai pot","grafting tool","grain of sugar",
					"grain of spice","everything nice","lamp post","bench","cobblestone","lumberjack saw","power saw",
					"mystery horse","mystery tree","mystery bloom","broken thermometer","meteorite","food chain",
					"special soil","clay pot","peat pellet","corporate sponsor","icicle ramp","crystal seed","crystal",
					"water","snow machine",	"mithril ore","star rock","warpstone","sun light rope","moon gem",
					"armillary sphere","fairy dust","magic maple","rain drop","vial of sunlight","magic mushroom",
					"garden bricks","garden vines","garden steps","cupid's arrow","heart leaf","teddy bear","bronze horse shoe","gold moon","silver clover",
				"grape vine","stone bench","wine barrels","slop bucket","scissor","blue flower","geode","gold bar","green flower","leaf blower","magma",
				"pot","purple flower","rake","snips","stardust","sunburst cloud","sunrise seed","coral chisel","coral hammer","ultramarine crystal",
				"horseshoe crabshell shovel","bucket of gold paint","coral nugget","marble vase","garden sketches","coral shears","coral crowbar",
				"coral key","crystal soil","seed bulbs","sprouting orb","fancy hay","pretty saddle","hi-tec salt","white sand","volcanic rock","blue sea water","wine barrel","fertile soil","grape food",
				"coffee thermos","star chart","telescope","golden wand","moon ray","phoenix feather","crystal cradle","fizzy field","goo away","slime sucker","sunshine orb",
				"candy blaster","candy scoop","cream of bliss","balloons","tent canvas","warped glass","magic moss","radiant rays","sparkling stream","diamond candy pick",
				"essence of frosting","marsh mortar","silver sugar shovel","sugar hammer","sweet aroma","crystal soil","seed bulbs","sprouting orb",
				"comet tail","flip flops","kite tail","pig tale","sea water","ship in a bottle","anvil of courage","bright metal","stone of sorcery","charmed clippers",
				"anti-thorn charm","grass patch","nesting hay","rabbit burrow","black bat","duckula coffin","fang","gargoyle","ghost guard","red brick","rope",
				"spider web","water pail","evergreen cedar beam","glow nail","holly crowbar","hollybright scissors","holly light fence","holly trough","sparkle lights",
				"sparkle spackle","stardust gate","clay tile","freezer","milkshake cup","scoop","stepping stone","window","bubble potion","butterfly","crystal acorn","mini mattock","hand brush",
				"gilded pedestal","gleaming glyphs","gold stone","bird toy","lovebird feeder","lovebird nest","emerald wood","munchkin hat","silver bell trowel","silver shoe",
				"stardust cement","woodman axe","anchor","ancient urn","bistro set","blustery bellows","building stones","cabin log","chalk menu","clock gears","clock hands",
				"coiled rope","cooking salt","floral watering can","flowerpress book","flower table setting","greco vases","millstone","nature guide","potted roses","purple canvas",
				"red clay bricks","rose trellis","sea glass glue","shimmering tape","stained glass","statue pedestal","storage crates","tent pole","pearl of wisdom","golden rope",
				"genie polish","genie incense","emerald spades","ankh","drill tool","engraved stones","magic dust","refilling pail","caramel ganache","chocochip bowl","chocolate cup",
				"coral stones","enchanted wings","feather pen","garden pitchfork","key","fairy beans","magic shovel","magic wand","pixie dust","revolving sprinklers","soil of wisdom",
				"baking hat","diner chair","diner jukebox","pretzel dough","strawberry coulis jar","vintage poster","bucket","candy apples",
				"carton","hay stack","jack-o-lantern","misfortune cookie","mini fork","pumpkin fall wreath","spooky candle stand","spooky magnifying glass","wagon","grape wine barrel",
				"creepy coffin","ghostly portrait","pirate eye patch","pirate sail","pirate secret message","spooky lantern","key oil","paints and brushes","toy bucket","toy crane",
				"toy hinge","toy ramp","toy rope","wheel spokes","wind up key","colored glass","colored sparkles","toy glue","pecan pine cone","soup bowl","soup cauldron","ladle",
				"maple syrup","barley malt syrup","chocolate curls","cinnamon stick","cream swirl","lime mortar","medallions","war hammer","magical wand","medieval brick",
				"medieval timber","snowflakes","neon shades","santas letter box","party bottles","presents list","cheery flutes","dimsum dip","leprechaun","life buoy","rose seals",
				"stone brick","etching glass","dimsum bowl","clover shake","bow anchor","mortar bucket","chopsticks","pot of gold","wheel of the ship","building stones","gold hay",
				"kings chalice","medieval flask","mystic aero","pile of stained glass","roof tiles","royal amulet","arena helmet","arena ticket","barbed wire","barn lock",
				"barrel of screws","bird couple","bird feed","blossom saplings","cake frosting","cheer placard","cherry umbrella","coal","fishing nets","floral cake","forgedcoin",
				"frosted cupcake","gathering basket","hammer and anvil","honey jar","maracas","mayo hats","telescope","metal supported barrels","mini radar","organic fruits",
				"water pail","pink basket","ranch hay bale","refined metal bars","ship wheel","single bird house","solar model","special cinco cake","steel ropes","timber fence wood",
				"timberwood stacks","two man saw","anchor","anchor band","doubloon","moss wood shaving","ship building rod","glue laminate","paint bucket","wood clad",







				
				"nursery barn","horse paddock","cow pasture","livestock pen","wildlife habitat","aviary","pet run",
					"zoo","winter animal pen","crafting silo","sheep pen","pig pen","orchard","animal spa","garage","duck pond",
					"horse stable","beehive","lighthouse cove","winter wonderland train station","santa's sleigh","combine",
					"count duckula's castle","harvest hoedown","winter water wheel","winter pasture","winter paddock",
					"ice palace","crop mastery billboard","winter livestock pen","winter aviary","romantic carriage",
					"winter pet run","winter zoo","animal mastery billboard","tree mastery billboard","baby playpen",
					"baby bunny hutch","recipe mastery billboard","market stall","gnome garden","candy castle",
					"aquarium","grove","beach resort","fishing hole","gas pump","hot spring","mountain palace",
					"jade habitat","jade aviary","jade paddock","jade pasture","jade playpen","jade aquarium",
					"dino lab","jade wildlife pen","jade pet run","jade gnome garden","jade zoo","turtle pen",
					"imperial shipyard","swimming pond","sunshine doghouse","floating castle","floating waterfall",
					"farmhand center","arborist center","dragon lair","haunted house","animal workshop","monster lab",
					"seedling nursery","witchin' cauldron","tree of life","duckula's castle","sally's seed shop",
					"nightmare zoo","horrendous pet run","bumper cars","big windmill","ferris wheel","big barnyard",
					"deadly livestock pen","haunted pasture","bloom mastery billboard","wishing fountain","bonsai garden",
					"holiday square","joyful horse paddock","magic wildlife cave","holiday aviary","extinct animal zoo",
					"herb garden","penguin skate park","crystal garden","rivermist fortress","home mushroom","enchantment shop",
					"gnome vineyard","mystery crate","tree of love","fountain geyser","hot air balloon","spring garden",
					"orchard upgrade","marine observatory","atlantis garden","atlantis garage","atlantis crafting workshop",
					"atlantis gnome garden","atlantis orchard","atlantis palace","atlantis treasure","gifting tree","horse hall",
					"australian treasure","daydream island","australian vineyard","pegasus pen","astral observatory","dream nursery","craftshop expansion","gifting tree","rainbow pond",
					"summer poolhouse","space aviary","space pasture","space paddock","space livestock","space pet run","space wildlife","space zoo","sunny float field",
					"space ship","space guardian","slime pile","candy aviary","candy pasture","candy paddock","candy livestock","candy pet run","candy wildlife","candy zoo","candy shop","candy factory","eversweet tree",
				"rock candy boulder","candy pile","marshmallow mound","gifting tree","astral observatory","dream deer woods","carnival fun house","fairy flower",
				"palm paradise","destiny bridge","enchanted rose bush","summer hillside","mystical aviary","mystical garage","mystical livestock","mystical orchard",
				"mystical paddock","mystical pasture","mystical petrun","mystical storage cellar","mystical wildlife","mystical zoo","duckula's cryptic castle","duckula's dark tower","irrigation well",
				"hollybright aviary","hollybright garage","hollybright livestock","hollybright orchard","giant tree house","ice cream parlor",
				"hollybright paddock","hollybright pasture","hollybright petrun","hollybright storage cellar","hollybright wildlife","hollybright zoo","hollybright tree","hollybirght park","gift",
				"magic biodome","artifact","hidden palace","lovebird roost","munchkin aviary","emerald pasture","emerald paddock","munchkin livestock","emerald pet run","emerald wildlife",
				"munchkin zoo","emerald gnome garden","emerald storage cellar","emerald orchard","emerald garage","barn door","windmill piece","broken silo","fallen house","emerald city",
				"munchkin country","small broken vase","medium column ruin","large broken vase","extra large column ruin","riviera aviary","riviera paddock","riviera livestock",
				"riviera pasture","riviera pet run","riviera wildlife","riviera zoo","pantheon isle","grotto harbor","zezura oasis","extra large genie samovar","small genie ring",
				"medium genie bottle","large genie lamp","enchanted waterfall","bonbon boutique","hill castle","boot house","large garden door","medium fairyland signpost",
				"small old storybook","extra large garden bridge","fairy tale aviary","ft horse paddock","fairytale livestock pen","fairytale pasture","fairytale pet run",
				"ft wildlife pen","fairytale zoo pen","fairytale treasure","rose garden","pretzel factory","all american diner","town hollow","mausoleum on the hill","small tombstone",
				"medium tombstone","large tombstone","extra large tombstone","horesman hollow treasure","pirate ship wreck","spooky mansion","tower of pranks","toy mansion",
				"small deck of cards","medium lemonade stand","large kiddie play tent","extra large horse swing","toy town treasure","eggnog stand","pumpkin kitchen","soup kitchen",
				"house of the mystics","village granary","large enchanted gargoyle","medium broken boulders","small fighting sword","extra large ale ruins","santa's workshop",
				"opera house","dimsum cart","clover tower","valentine's cruise ship","royal granary","house of the royals","small locked treasure chest","medium enchanted well",
				"large engraved runes","extra large abandoned cart","brook blossom house","cake house","chirpy treehouse","farmer's market","medieval observatory","parade float house",
				"sports colosseum","mermaid statue","stone water fairy","pirate loot","abandoned loot","sailorman cannon","ship hull","sea wreckage","abandoned shack","abandoned wagon",
				"fallen log","winch house",


					
				].fixOrder(),
				
				//change {%1} above to the value below based on found "word" above
				//the values below should be the "code" for the gift item to send
				conversionChart:{
					nail:"nail",woodenboard:"woodenboard",honeybee:"beehive_bee",vehiclepart:"vehiclepart",
					brick:"brick",smoker:"smoker",beeswax:"beeswax",blanket:"blanket",bottle:"bottle",horseshoe:"horseshoe",
					harness:"harness",trainingtheirpuppy:"consume_treat",kibble:"consume_kibble",wateringcan:"wateringcan",
					shovel:"shovel_item_01",concrete:"concrete",hammer:"hammer",twine:"crafting_twine",tinsheet:"tinsheet",
					hinge:"hinge",screwdriver:"screwdriver",wrench:"wrench",pipe:"pipe",clamp:"clamp",stone:"stonepart",
					log:"logpart",steelbeam:"steelbeampart",wire:"component_wire",waterpump:"component_waterpump",
					paintedwood:"component_paintedwood",fencepost:"component_fencepost",grazinggrass:"component_grazinggrass",
					haybundle:"component_haybundle",shrub:"component_shrub",animalfeed:"animalfeedtrough_feed",
					specialdelivery:"socialplumbingmysterygift",saddle:"component_saddle",bridle:"component_bridle",
					punch:"part_punch",snacks:"part_snacks",paint:"part_paint",redbeam:"redbeam",screw:"screws",
					aluminumsiding:"aluminumsiding",candycanebeam:"candy_cane_beam",coniferdust:"ww_fairy_dust",
					icepost:"ww_ice_post",railspike:"railspikepart",railtie:"railtiepart",coal:"coalpart",pickaxe:"pickaxepart",
					hairdryer:"hairdryerpart",milkandcookies:"task_milkandcookies",gps:"task_gps",silverbell:"task_jinglebells",
					holidaylights:"task_holidaylights",reindeertreat:"task_reindeertreat",holidaycheer:"task_holidaycheer",
					goo:"goo",hauntedbrick:"haunted_brick",knockers:"door_knockers",belt:"feedbelt",sack:"feedsack",scoop:"feedscoop",
					snowbrick:"parts_snowbrick",snowflake:"parts_magicsnowflake",icenail:"parts_icenail",snowglobe:"parts_snowglobe",
					iceboard:"parts_iceboard",frozenbeam:"parts_frozenbeam",whiteoveralls:"part_painters_overalls",
					lightplywood:"part_sheet_of_plywood",blacklight:"part_floodlight",whitepaper:"part_roll_of_paper",
					blueroller:"part_paint_roller",whitepaste:"part_bucket_of_paste",love:"parts_love",flowertrim:"parts_flowertrim",
					carriagelamp:"parts_carriagelamps",horsetreat:"parts_horsetreats",fancychocolate:"parts_fancychocolates",
					cozyblanket:"parts_cozyblanket",darkplywood:"task_sheet_of_plywood_recolor",greenlight:"task_floodlight_recolor",
					greenpaper:"task_roll_of_paper_recolor",orangeoveralls:"task_painters_overalls_recolor",
					redroller:"task_paint_roller_recolor",redpaste:"task_bucket_of_paste_recolor",teachingtheirdog:"consume_treat",
					woodstain:"task_woodstain",maskingtape:"task_maskingtape",scaffolding:"task_scaffolding",
					brush:"part_brush",saltlick:"part_saltlick",babyblanket:"part_babyblanket",sodpiece:"part_sod",
					rawwood:"part_raw_wood",feedbucket:"part_feed_bucket",waterpail:"part_water_pail",woodenpeg:"part_wood_peg",
					grassseed:"part_grass_seed",babycarrotbunch:"part_babycarrotbunch",bunnybed:"part_bunnybed",
					branchball:"part_branchball",woodblock:"part_woodblock",hutchwire:"part_hutchwire",bunnytunnel:"part_bunnytunnel",
					clamps:"part_clamps",woodglue:"part_wood_glue",sandpaper:"part_sandpaper",babyfish:"part_babyfish",
					oceanrock:"part_coral",filter:"part_filters",buoy:"part_buoys",smallcrowbar:"feedsmallcrowbar",
					largecrowbar:"feedcrowbar",smallfishingnet:"feedsmallnet",largefishingnet:"feedfishingnet",
					volcanomonitor:"part_volcanicmonitor",stonycoralpiece:"part_stonycoral",awning:"stall_awning",
					basket:"stall_basket",pricecard:"stall_pricecard",toadstool:"part_toadstool",gardenfence:"part_gardenfence",
					daffodil:"part_daffodils",twig:"part_twigs",tinywindow:"part_tinywindow",pottingsoil:"part_pinkpot",
					chocolatebrick:"part_chocolate_bricks",gingerbreadsiding:"part_gingerbread_siding",
					gumdropaccent:"part_gumdrop_accents",lollipoplamp:"part_lollipop_lamps",miniboulder:"part_mini_boulder",
					mulchsoil:"part_mulch_soil",turfroll:"part_turf_roll",marshmallowmortar:"part_marshmallow_mortar",
					cottoncandyinsulation:"part_cotton_candy_insulation",tropicalcup:"feed_r4r_tropical_cups",lilypad:"part_lily_pad",
					beachsandal:"feed_r4r_beachsandals",swimsuit:"feed_r4r_swimmingsuits",lure:"part_lure",fishingpole:"part_fishing_pole",
					fuelpipe:"part_steampipe",levelgauger:"part_levelgauger",steelsheet:"part_steelsheet",smallaxe:"part_smallaxe",
					boathook:"part_boathook",wheelbarrow:"part_wheelbarrow",bedrock:"part_bedrock",steam:"part_steam",
					mineralinfusion:"part_mineralinfusion",terracotta:"part_terracottastatue",hangingincense:"part_hangingincense",
					stonepillar:"part_stonepillar",bamboorail:"part_bamboorail",claybrick:"part_claybrick",reedthatch:"part_reedthatch",
					cement:"part_cement",filldirt:"part_filldirt",metalpost:"part_metalpost",mysterybulb:"part_flowerfood",
					floatingrock:"part_floatingrocks",magicwater:"part_magicwater",sparkleseed:"part_sparkleseeds",
					rigging:"part_rigging",sail:"part_sail",woodplank:"part_woodboard",skimmer:"part_skimmer",leafnet:"part_leafnet",
					waterbucket:"part_waterbucket",tennisball:"part_dogball",dogbed:"part_dogbed",chewtoy:"part_dogtoy",
					babyblanket:"part_babyblanket2",babymobile:"part_mobiles",pacifier:"part_pacifier",cloudbrick:"part_cloudbrick",
					enchantedbamboo:"part_enchantedbamboo",hoveringcharm:"part_hoveringcharm",scientificscale:"part_scale",
					massagestone:"part_massagestones",buffettray:"part_buffettray",driftwood:"part_driftwood",pottingsoil:"part_pottingsoil",
					javafern:"part_javafern",researchpaper:"part_researchpaper",treeincubator:"part_treeincubator",
					cloningsolution:"part_cloningsolution",talisman:"part_talisman",chisel:"part_chisel",magicboulder:"part_magicboulder",
					stamp:"part_stamps",ballofwool:"part_ballofwool",golddust:"part_golddust",stonepick:"part_pickaxe2",mallet:"part_mallet",
					cobweb:"part_cobweb",deadwood:"part_deadwood",oldfence:"part_ironfence",thundercloud:"part_lightning",
					rustypost:"part_rustyPost",rustygear:"part_rustyGear",fertilizerstake:"part_fertilizerstakes",mulch:"part_mulch",
					seedlingtray:"part_seedlingtrays",ladle:"part_ladle",enchantediron:"part_enchantediron",
					gummytentacle:"part_gummytentacles",lifeessence:"part_lifeessence",magicbubble:"part_magicbubbles",
					puffycloud:"part_puffyclouds",purpleroller:"task_paint_roller_recolor_purple",woodencog:"part_woodencogs",
					woodenshaft:"part_woodenshafts",barnyardshingle:"part_barnyardshingles",bearings:"part_bearings",gondola:"part_gondola",
					carnivallight:"part_carnivallights",trough:"part_trough",windmillblade:"part_windmillblades",woodengiraffe:"part_woodengiraffe",
					woodentiger:"part_woodentiger",woodenzebra:"part_woodenzebra",bumper:"part_bumper",dryingrack:"part_dryingrack",
					flowerapron:"part_flowerapron",greentape:"part_masking_tape_green",yellowpaper:"part_roll_of_paper_yellow",
					seatbelt:"part_seatbelt",pepperpacket:"part_seedpackets",steeringwheel:"part_steeringwheel",slopbucket:"part_slopbucket",
					cutbamboo:"wishingfountain_bamboo",drillbit:"wishingfountain_drill",coppertube:"wishingfountain_tube",
					bonsaipedestal:"part_bonsaipedestal",bonsaipot:"part_bonsaipot",graftingtool:"part_graftingtool",lamppost:"part_lamppost",
					cobblestone:"part_cobblestone",bench:"part_bench",everythingnice:"part_everythingnice",grainofsugar:"part_sugar",
					grainofspice:"part_spice",lumberjacksaw:"part_lumberjacksaw",powersaw:"part_powersaw",mysterybloom:"part_mysterybloomicon",
					mysteryhorse:"part_mysteryhorseicon",mysterytree:"part_mysterytreeicon",claypot:"part_claypot",specialsoil:"part_specialsoil",
					peatpellet:"part_peatpellet",meteorite:"part_meteorite",brokenthermometer:"part_broken_thermometer",foodchain:"part_food_chain",
					corporatesponsor:"part_corporatesponsor",icicleramp:"part_icicleramp",snowmachine:"part_snowmachine",crystalseed:"part_crystalseeds",
					crystal:"part_crystals",water:"part_water",mithrilore:"part_mithrilore",starrock:"part_starrock",warpstone:"part_warpstone",
					fairydust:"part_fairydust",magicmaple:"part_magicmaple",raindrop:"part_raindrops",armillarysphere:"part_armillarysphere",
					moongem:"part_moongems",sunlightrope:"part_sunlightrope",magicmushroom:"part_magicmushrooms",vialofsunlight:"part_vialofsunlight",
					stardust:"part_stardust",sunburstcloud:"part_sunburstcloud",sunriseseed:"part_sunriseseed",coralchisel:"part_coralchisel",
					coralhammer:"part_coralhammer",ultramarinecrystal:"part_ultramarinecrystal",fancyhay:"part_fancyhay",prettysaddle:"part_prettysaddle",
					"hi-tecsalt":"part_hightechsaltlick",crystalcradle:"part_crystalcradle",fizzyfield:"part_fizzyfield",
					gooaway:"part_gooaway",slimeaway:"part_slimesucker",sunshineorb:"part_sunshine orb",heatstones:"part_heatstones",saltwater:"part_saltwater",
					spatowel:"part_spatowel",minimattock:"part_minimattock",handbrush:"part_handbrush",gildedpedestal:"part_gildedpedestal",gleaningglyphs:"part_gleaming glyphs",
					goldstone:"part_gold stone",emeraldwood:"part_emeraldwood",munchkinhat:"part_munchkinhat",silverbelltrowel:"part_silverbelltrowel",
					silvershoe:"part_silvershoe",stardustcement:"part_stardustcement",woodmanaxe:"part_woodmanaxe",pearlofwisdom:"part_pearlsofwisdom",goldenrope:"part_goldenrope",
					geniepolish:"part_geniepolish",genieincense:"part_genieincense",emeraldspades:"part_emeraldspades",ankh:"part_ankh",drilltool:"part_drilltool",
					engravedstones:"part_engravedstones",magicdust:"part_magicdust",refillingpail:"part_refillingpail",caramelganache:"part_caramelganache",
					chocochipbowl:"part_chocochipbowl",chocolatecup:"part_chocolatecup",coralstones:"part_coralstones",enchantedwings:"part_enchantedwings",
					featherpen:"part_featherpen",gardenpitchfork:"part_gardenpitchfork",key:"part_key",fairybeans:"part_fairybeans",magicshovel:"part_magicshovel",
					magicwand:"part_magicwand",pixiedust:"part_pixiedust",revolvingsprinklers:"part_revolvingsprinklers",soilofwisdom:"part_soilofwisdom",
					rosetrellis:"part_rosetrellis",pottedroses:"part_pottedroses",floralwateringcan:"part_floralwateringcan",dinerchair:"part_dinerchair",pretzeldough:"part_pretzeldough",
					dinerjukebox:"part_dinerjukebox",bakinghat:"part_bakinghat",vintageposter:"part_vintageposter",strawberrycoulisjar:"part_strawberrycoulisjar",
					bucket:"part_bucket",candyapples:"part_candyapples",carton:"part_carton",haystack:"part_haystack",misfortunecookie:"part_misfortunecookie",minifork:"part_minifork",
					pumpkinfallwreath:"part_pumpkinfallwreath",spookycandlestand:"part_spookycandlestand",'jack-o-lantern':"part_jack-o-lantern",
					spookymagnifyingglass:"part_spookymagnifyingglass",wagon:"part_wagon",grapewinebarrel:"part_grapewinebarrel",creepycoffin:"part_creepycoffin",
					ghostlyportrait:"part_ghostlyportrait",pirateeyepatch:"part_pirateeyepatch",piratesail:"part_piratesail",piratesecretmessage:"part_piratesecretmessage",
					spookylantern:"part_spookylantern",keyoil:"part_keyoil",paintsandbrushes:"part_paintsandbrushes",toybucket:"part_toybucket",toycrane:"part_toycrane",
					toyhinge:"part_toyhinge",toyramp:"part_toyramp",toyrope:"part_toyrope",wheelspokes:"part_wheelspokes",windupkey:"part_windupkey",coloredglass:"part_coloredglass",
					coloredsparkles:"part_coloredsparkles",toyglue:"part_toyglue",pecanpinecone:"part_pecanpinecone",soupbowl:"part_soupbowl",soupcauldron:"part_soupcauldron",
					ladle:"part_ladle",maplesyrup:"part_maplesyrup",barleymaltsyrup:"part_barleymaltsyrup",chocolatecurls:"part_chocolatecurls",cinnamonstick:"part_cinnamonstick",
					creamswirl:"part_creamswirl",cheeryflutes:"part_cheeryflutes",crystallight:"part_crystallight",elvenrope:"part_elvenrope",fayhinge:"part_fayhinge",
					handspunsilk:"part_handspunsilk",limemortar:"part_limemortar",magicalwand:"part_magicalwand",medallion:"part_medallion",medievalbrick:"part_medievalbrick",
					medievaltimber:"part_medievaltimber",moonstones:"part_moonstones",neonshades:"part_neonshades",presentslist:"part_presentslist",santasletterbox:"part_santasletterbox",
					snowflakes:"part_snowflakes",warhammer:"part_warhammer",woodlandtimber:"part_woodlandtimber",partybottle:"part_ybottle",bowanchor:"part_bowanchor",
					chopsticks:"part_chopsticks",dimsumbowl:"part_dimsumbowl",dimsumdip:"part_dimsumdip",goldhay:"part_goldhay",kingschalice:"part_kingschalice",lifebuoy:"part_lifebuoy",
					medievalflask:"part_medievalflask",leprechaun:"part_leprechaun",mysticaero:"part_mysticaero",pileofstainedglass:"part_pileofstainedglass",potofgold:"part_potofgold",
					rooftiles:"part_rooftiles",roseseal:"part_roseseal",royalamulet:"part_royalamulet",buildingstones:"part_buildingstones",clovershake:"part_clovershake",
					wheeloftheship:"part_wheeloftheship",etchingglass:"part_etchingglass",mortarbucket:"part_mortarbucket",stonebrick:"part_stonebrick",
					buildingstones:"part_buildingstones",goldhay:"part_goldhay",kingschalice:"part_kingschalice",medievalflask:"part_medievalflask",mysticaero:"part_mysticaero",
					pileofstainedglass:"part_pileofstainedglass",rooftiles:"part_rooftiles",royalamulet:"part_royalamulet",




					nurserybarn:"woodenboard,nail,brick,blanket,bottle",craftingsilo:"tinsheet,hinge,screwdriver",
					beehive:"woodenboard,nail,brick,beeswax,smoker",horsestable:"woodenboard,brick,nail,horseshoe,harness",
					cove:"logpart,stonepart,steelbeampart",winterwonderlandtrainstation:"coalpart,railtiepart,railspikepart",
					"santa'ssleigh":"task_holidaylights,task_jinglebells,task_gps,task_holidaycheer,task_reindeertreat,task_milkandcookies",
					orchard:"woodenboard,brick,nail",sheeppen:"woodenboard,brick,nail",zoo:"component_shrub,wrench,pipe",
					winteranimalpen:"ww_ice_post,ww_fairy_dust,candy_cane_beam",pigpen:"woodenboard,brick,nail",
					horsepaddock:"logpart,component_bridle,component_saddle",cowpasture:"component_haybundle,tinsheet,stonepart",
					petrun:"component_paintedwood,component_waterpump,compoent_fencepost",duckpond:"shovel_item_01,wateringcan",
					wildlifehabitat:"component_fencepost,component_shrub,component_grazinggrass",aviary:"clamp,hinge,screwdriver",
					livestockpen:"component_waterpump,component_wire,steelbeampart",combine:"vehiclepart",garage:"woodenboard,brick,nail",
					harvesthoedown:"part_punch,part_snacks,part_paint","duckula'scastle":"goo,haunted_brick,door_knockers",
					winterwaterwheel:"task_snowgear,task_snowchains,task_snowaxle",winterpaddock:"logpart,component_bridle,component_saddle",
					winterpasture:"component_haybundle,tinsheet,stonepart",animalfeedmill:"feedsack,feedscoop,feedbelt",
					icepalace:"parts_snowbrick,parts_magicsnowflake,parts_icenail,parts_snowglobe,parts_iceboard,parts_frozenbeam",
					cropmasterybillboard:"part_painters_overalls,part_sheet_of_plywood,part_floodlight,part_roll_of_paper,part_paint_roller,part_bucket_of_paste",
					romanticcarriage:"parts_love,parts_flowertrim,parts_carriagelamps,parts_horsetreats,parts_fancychocolates,parts_cozyblanket",
					winterlivestockpen:"component_waterpump,component_wire,steelbeampart",winteraviary:"clamp,hinge,screwdriver",
					winterpetrun:"component_paintedwood,component_waterpump,compoent_fencepost",winterzoo:"component_shrub,wrench,pipe",
					animalmasterybillboard:"task_sheet_of_plywood_recolor,task_floodlight_recolor,task_roll_of_paper_recolor,task_painters_overalls_recolor,task_paint_roller_recolor,task_bucket_of_paste_recolor",
					treemasterybillboard:"task_woodstain,task_scaffolding,task_maskingtape",babyplaypen:"part_brush,part_saltlick,part_babyblanket",
					babybunnyhutch:"part_babycarrotbunch,part_bunnytunnel,part_branchball,part_hutchwire,part_woodblock,part_bunnybed",
					recipemasterybillboard:"part_clamps,part_wood_glue,part_sandpaper",volcanoreef:"part_babyfish,part_volcanicmonitor,part_stonycoral",
					aquarium:"part_buoys,part_filters,part_coral",marketstall:"stall_awning,stall_basket,stall_pricecard",
					islandpaddock:"logpart,component_bridle,component_saddle",islandpasture:"component_haybundle,tinsheet,stonepart",
					islandlivestock:"component_waterpump,component_wire,steelbeampart",islandzoo:"component_shrub,wrench,pipe",
					islandpetrun:"component_paintedwood,component_waterpump,compoent_fencepost",islandaviary:"clamp,hinge,screwdriver",
					islandhabitat:"component_fencepost,component_shrub,component_grazinggrass",fishinghole:"part_lure,part_lily_pad,part_fishing_pole",
					gnomegarden:"part_toadstool,part_gardenfence,part_tinywindow",grove:"part_mini_boulder,part_mulch_soil,part_turf_roll",
					candycastle:"part_chocolate_bricks,part_gingerbread_siding,part_gumdrop_accents,part_lollipop_lamps,part_marshmallow_mortar,part_cotton_candy_insulation",
					beachresort:"feed_r4r_tropical_cups,feed_r4r_beachsandals,feed_r4r_swimmingsuits",gaspump:"part_steampipe,part_levelgauger,part_steelsheet",
					hotspring:"part_bedrock,part_steam,part_mineralinfusion",mountainpalace:"part_stonepillar,part_hangingincense,part_terracottastatue",
					jadehabitat:"part_reedthatch,part_bamboorail,part_claybrick",jadepasture:"component_haybundle,tinsheet,stonepart",
					jadeplaypen:"part_brush,part_saltlick,part_babyblanket",jadeaviary:"clamp,hinge,screwdriver",
					jadeaquarium:"part_buoys,part_filters,part_coral",jadepaddock:"logpart,component_bridle,component_saddle",
					dinolab:"part_cement,part_filldirt,part_metalpost",jadepetrun:"component_paintedwood,component_waterpump,compoent_fencepost",
					jadewildlifepen:"component_fencepost,component_shrub,component_grazinggrass",jadezoo:"component_shrub,wrench,pipe",
					jadegnomegarden:"part_toadstool,part_gardenfence,part_tinywindow",floatingwaterfall:"part_floatingrocks,part_magicwater,part_sparkleseeds",
					imperialshipyard:"part_rigging,part_sail,part_woodboard",swimmingpond:"part_skimmer,part_waterbucket,part_leafnet",
					sunshinedoghouse:"part_dogball,part_dogbed,part_dogtoy",babynursery:"part_babyblanket2,part_mobiles,part_pacifier",
					floatingcastle:"part_cloudbrick,part_enchantedbamboo,part_hoveringcharm",turtlepen:"part_driftwood,part_pottingsoil,part_javafern",
					farmhandcenter:"part_scale,part_massagestones,part_buffettray",arboristcenter:"part_researchpaper,part_treeincubator,part_cloningsolution",
					dragonlair:"part_talisman,part_chisel,part_magicboulder",hauntedmansion:"part_cobweb,part_deadwood,part_ironfence",
					monsterlab:"part_lightning,part_rustyPost,part_rustyGear",seedlingnursery:"part_fertilizerstakes,part_mulch,part_seedlingtrays",
					"witchin'cauldron":"part_ladle,part_enchantediron,part_gummytentacles",treeoflife:"part_lifeessence,part_magicbubbles,part_puffyclouds",
					"sally'sseedshop":"part_dryingrack,part_flowerapron,part_seedpackets",nightmarezoo:"component_shrub,wrench,pipe",
					horrendouspetrun:"component_paintedwood,component_waterpump,compoent_fencepost",hauntedpasture:"component_haybundle,tinsheet,stonepart",
					deadlylivestockpen:"component_waterpump,component_wire,steelbeampart",bumpercars:"part_seatbelt,part_bumper,part_steeringwheel",
					bigwindmill:"part_windmillblades,part_woodencogs,part_woodenshafts",ferriswheel:"part_gondola,part_bearings,part_carnivallights",
					bigbarnyard:"part_trough,part_slopbucket,part_barnyardshingles",bloommasterybillboard:"part_masking_tape_green,part_roll_of_paper_yellow,task_paint_roller_recolor_purple",
					wishingfountain:"wishingfountain_bamboo,wishingfountain_drill,wishingfountain_tube",bonsaigarden:"part_bonsaipedestal,part_bonsaipot,part_graftingtool",
					holidaysquare:"part_cobblestone,part_bench,part_lamppost",animalworkshop:"part_sugar,part_spice,part_everythingnice",
					joyfulhorsepaddock:"logpart,component_bridle,component_saddle",magicwildlifepen:"component_fencepost,component_shrub,component_grazinggrass",
					holidayaviary:"clamp,hinge,screwdriver",herbgarden:"part_claypot,part_specialsoil,part_peatpellet",extinctanimalzoo:"part_food_chain,part_meteorite,part_broken_thermometer",
					penguinskatepark:"part_corporatesponsor,part_icicleramp,part_snowmachine",crystalgarden:"part_crystals,part_crystalseeds,part_water",
					enchantmentshop:"part_armillarysphere,part_moongems,part_sunlightrope",homemushroom:"part_fairydust,part_magicmaple,part_raindrops",
					rivermistfortress:"part_mithrilore,part_starrock,part_warpstone",treeoflove:"part_cupid'sarrow,part_teddybear,part_heartleaf",
					"leprechaun'scottage":"part_bronzehorseshoe,part_goldmoon,part_silverclover",gnomevineyard:"part_grapevines,part_grapevine,part_stonebench,part_winebarrels",
					mysterycrate:"part_scissor",fountaingeyser:"part_magma,part_goldbar,part_geode",orchardupgrade:"part_rake,part_leafblower,part_pot",springgarden:"part_blueflower,part_greenflower,part_purpleflower",
					sunriseforest:"part_stardust,part_sunburstcloud,part_sunriseseed",marineobservatory:"part_coralchisel,part_coralhammer,part_ultramarinecrystal",
					atlantiscowpasture:"component_haybundle,tinsheet,stonepart",atlantisaviary:"clamp,hinge,screwdriver",atlantispaddock:"logpart,component_bridle,component_saddle",
					atlantispetrun:"component_paintedwood,component_waterpump,compoent_fencepost",
					atlantiswildlifecave:"component_fencepost,component_shrub,component_grazinggrass",atlantiszoo:"component_shrub,wrench,pipe",
					glencowpasture:"component_haybundle,tinsheet,stonepart",glenplaypen:"part_brush,part_saltlick,part_babyblanket",glenaviary:"clamp,hinge,screwdriver",
					glenpaddock:"logpart,component_bridle,component_saddle",glenpetrun:"component_paintedwood,component_waterpump,compoent_fencepost",
					glenwildlifepen:"component_fencepost,component_shrub,component_grazinggrass",glenzoo:"component_shrub,wrench,pipe",
					atlantiscraftingworkshop:"concrete,twine,hammer",atlantistreaure:"part_coralcrowbar,part_coralkey",
					atlantisgarden:"part_marblevase,part_gardensketches,part_coralshears",atlantispalace:"part_horseshoecrabshellshovel,part_bucketofgoldpaint,part_coralnugget",
					giftingtree:"part_crystalsoil,part_seedbulbs,part_sproutingorb",horsehall:"part_fancyhay,part_prettysaddle,part_hightechsaltlick",
					australiantreasure:"part_miningkey,part_miningpickaxe",australiancowpasture:"component_haybundle,tinsheet,stonepart",australianaviary:"clamp,hinge,screwdriver",australianpaddock:"logpart,component_bridle,component_saddle",
					australianpetrun:"component_paintedwood,component_waterpump,compoent_fencepost",
					australianwildlifecave:"component_fencepost,component_shrub,component_grazinggrass",australianzoo:"component_shrub,wrench,pipe",
					daydreamisland:"part_whitesand,part_volcanicrock,part_blueseawater",australianvineyard:"part_winebarrel,part_fertilesoil,part_grapefood",
					pegasuspen:"part_goldenwand,part_moonray,part_phoenixfeather",astralobservatory:"part_coffeethermos,part_starchart,part_telescope",
					dreamnursery:"part_nightcap,part_polkadotpajamas,part_warmmilk",craftshopexpansion:"part_metalwire,part_ovenrack,copperpipe",
					rainbowpond:"part_enchantedmist,part_fairymagic,part_rainbowstardust",summerpoolhouse:"part_poolhouseplans,part_summersun,part_swimmies",
					spaceaviary:"clamp,hinge,screwdriver",spacepasture:"component_haybundle,stonepart,tinsheet",spacepaddock:"logpart,component_saddle,component_bridle",
					spacelivestock:"component_waterpump,component_wire,steelbeampart",spacepetrun:"component_paintedwood,component_waterpump,component_fencepost",
					spacewildlife:"component_fencepost,component_shrub,component_grazinggrass",spacezoo:"wrench,component_shrub,pipe",sunnyfloatfield:"part_crystalcradle,part_fizzyfield,part_sunshineorb",
					spaceship:"part_hyperspeedthruster,part_portalwindow,part_bigredbutton",spaceguardian:"part_celestialcrystals,part_astrosaplings,part_floatyspore",
					slimepile:"slimesucker,gooaway",candyaviary:"clamp,hinge,screwdriver",candypasture:"component_haybundle,stonepart,tinsheet",candypaddock:"logpart,component_saddle,component_bridle",
					candylivestock:"component_waterpump,component_wire,steelbeampart",candypetrun:"component_paintedwood,component_waterpump,component_fencepost",
					candywildlife:"component_fencepost,component_shrub,component_grazinggrass",candyzoo:"wrench,component_shrub,pipe",candyfactory:"part_candyblaster,part_marshmortar,part_sugarhammer",
					eversweettree:"part_creamofbliss,part_essenceoffrosting,part_sweetaromas",candypile:"part_diamondcandypick",marshmallowmound:"part_candyscoop",
					rockcandyboulder:"part_silversugarshovel",dreamdeerwoods:"part_magicmoss,part_radiantrays,part_sparklingstream",carnivalfunhouse:"part_balloons,part_tentcanvas,part_warpedglass",
					fairyflower:"part_comettales,part_kitetales,part_pigtales",palmparadise:"part_flipflops,part_seawater,part_shipinabottle",mysticalaviary:"clamp,hinge,screwdriver",mysticalpasture:"component_haybundle,stonepart,tinsheet",mysticalpaddock:"logpart,component_saddle,component_bridle",
					mysticallivestock:"component_waterpump,component_wire,steelbeampart",mysticalpetrun:"component_paintedwood,component_waterpump,component_fencepost",
					mysticalwildlife:"component_fencepost,component_shrub,component_grazinggrass",mysticalzoo:"wrench,component_shrub,pipe",destinybridge:"part_anvilofcourage,part_brightmetal,part_stoneofsorcery",
					summerhillside:"part_grasspatch,part_nestinghay,part_rabbitburrow",enchatedrosebush:"part_charmedclippers,part_antithorncharm",mysticalgarage:"woodenboard,brick,nail",mysticalstoragecellar:"shovel_item_01",mysticalgnomegarden:"part_toadstool,part_gardenfence,part_tinywindow",
					irrigationwell:"part_redbricks,part_rope,part_waterpail","duckula'sdarktower":"part_blackbats,part_duckulacoffin,part_fangs","duckula'scrypticcastle":"part_gargoyle,part_ghostguards,part_spiderwebs",
					hollybrightaviary:"clamp,hinge,screwdriver",hollybrightpasture:"component_haybundle,stonepart,tinsheet",hollybrightpaddock:"logpart,component_saddle,component_bridle",
					hollybrightlivestock:"component_waterpump,component_wire,steelbeampart",hollybrightpetrun:"component_paintedwood,component_waterpump,component_fencepost",
					hollybrightwildlife:"component_fencepost,component_shrub,component_grazinggrass",hollybrightzoo:"wrench,component_shrub,pipe",gift:"part_hollycrowbar,part_hollybright scissors",
					animalspa:"part_heatstones,part_saltwater,part_spatowel",hollybrightgarage:"woodenboard,brick,nail",hollybrightstoragecellar:"shovel_item_01",hollybrightgnomegarden:"part_toadstool,part_gardenfence,part_tinywindow",
					hollybrightorchard:"woodenboard,brick,nail",spaceorchard:"woodenboard,brick,nail",mysticalorchard:"woodenboard,brick,nail",australianorchard:"woodenboard,brick,nail",
					hollybrightpark:"part_evergreencedarbeam,part_glownails,part_hollylightfence,part_hollytrough,part_sparklespackle,part_stardustgate",hollybrighttree:"part_sparklelight",
					gianttreehouse:"part_claytile,part_steppingstone,part_window",icecreamparlor:"part_freezer,part_milkshakecup,part_scoop",magicbiodome:"part_bubblepotion,part_butterfly,part_crystalacorn",
					artifact:"part_minimattock,part_handbrush",jungleaviary:"clamp,hinge,screwdriver",junglepasture:"component_haybundle,stonepart,tinsheet",junglepaddock:"logpart,component_saddle,component_bridle",
					junglelivestock:"component_waterpump,component_wire,steelbeampart",junglepetrun:"component_paintedwood,component_waterpump,component_fencepost",junglewildlife:"component_fencepost,component_shrub,component_grazinggrass",
					junglezoo:"wrench,component_shrub,pipe",junglegarage:"woodenboard,brick,nail",junglestoragecellar:"shovel_item_01",junglegnomegarden:"part_toadstool,part_gardenfence,part_tinywindow",
					jungleorchard:"woodenboard,brick,nail",junglestoragecellar:"shovel",hiddenpalace:"part_gleamingglyphs,part_gildedpedestal,part_goldstone",
					lovebirdroost:"part_birdtoy,part_lovebirdfeeder,part_lovebird nest",munchkinaviary:"clamp,hinge,screwdriver",emeraldpasture:"component_haybundle,stonepart,tinsheet",emeraldpaddock:"logpart,component_saddle,component_bridle",
					munchkinlivestock:"component_waterpump,component_wire,steelbeampart",emeraldpetrun:"component_paintedwood,component_waterpump,component_fencepost",emeraldwildlife:"component_fencepost,component_shrub,component_grazinggrass",
					munchkinzoo:"wrench,component_shrub,pipe",emeraldgarage:"woodenboard,brick,nail",emeraldstoragecellar:"shovel_item_01",emeraldgnomegarden:"part_toadstool,part_gardenfence,part_tinywindow",
					emeraldorchard:"woodenboard,brick,nail",emeraldstoragecellar:"shovel",barndoor:"part_silvershoes",windmillpiece:"part_silvershoes",
					brokensilo:"part_woodmanaxe",fallenhouse:"part_woodmanaxe",emeraldcity:"part_emeraldwood,part_silverbelltrowel,part_stardustcement",countryclocktower:"clockgears,clockhands,redclaybricks",
					munchkincountry:"part_munchkinhat",pantheonisle:"part_stainedglass,part_statuepedestal,part_ancienturn",wildlifelodge:"part_buildingstones,part_cabinlog,part_natureguide",
					extralargecolumnruin:"part_seaglassglue",largebrokenvase:"part_seaglassglue",grottoharbor:"part_anchor",mediumcolumnruin:"part_shimmeringtape",smallbrokenvase:"part_shimmeringtape",
					zezuraoasis:"part_ankh",extralargegeniesamovar:"part_genieincense",smallgeniering:"part_genieincense",mediumgeniebottle:"part_geniepolish",largegenielamp:"part_geniepolish",oasistreasure:"part_geniepolish,part_genieincense",
					unknownbuilding:"part_emeraldspades,part_goldenrope,part_pearlsofwisdom",enchantedwaterfall:"part_drilltool,part_engravedstones,part_magicdust",
					bonbonboutique:"part_caramelganache,part_chocochipbowl,part_chocolatecup",hillcastle:"part_magicwand,part_pixiedust,part_enchantedwings",boothouse:"part_key",
					largegardendoor:"part_featherpen",mediumfairylandsignpost:"part_gardenpitchfork",smalloldstorybook:"part_gardenpitchfork",extralargegardenbridge:"part_featherpen",
					fairytaletreasure:"part_gardenpitchfork,part_featherpen",rosegarden:"part_rosetrellis,part_pottedroses,part_floralwateringcan",
					pretzelfactory:"part_pretzeldough,part_bakinghat,part_strawberrycoulisjar",allamericandiner:"part_dinerchair,part_dinerjukebox,part_vintageposter",
					mausoleumonthehill:"part_jack-o-lantern",townhollow:"part_candyapple,part_misfortunecookie,part_pumpkinfallwreath",smalltombstone:"part_spookymagnifyingglass",
					mediumtombstone:"part_spookymagnifyingglass",largetombstone:"part_spookycandlestand",horsemanhollowtreasure:"part_spookymagnifyingglass,part_spookycandlestand",
					pirateshipwreck:"part_pirateeyepatch,part_piratesail,part_piratesecretmessage",spookymansion:"part_spookylantern,part_creepycoffin,part_ghostlyportrait",
					towerofpranks:"part_windupkey",toymansion:"part_toyglue,part_coloredglass,part_coloredsparkles",smalldeckofcards:"part_paintsandbrushes",
					mediumlemonadestand:"part_paintsandbrushes",largekiddieplaytent:"part_toycrane",extralargehorseswing:"part_toycrane",
					toytowntreasure:"part_toycrane,part_paintsandbrushes",eggnogstand:"part_chocolatecurls,part_barleymaltsyrup,part_creamswirl",
					pumpkinkitchen:"part_cinnamonstick,part_maplesyrup,part_pecanpinecone",soupkitchen:"part_soupbowl,part_soupcauldron,part_ladle",
					houseofthemystics:"part_limemortar,part_medievaltimber,part_medievalbrick",villagegranary:"part_medallion",largeenchantedgargoyle:"part_warhammer",
					mediumbrokenboulders:"part_magicalwand",smallfightingsword:"part_magicalwand",extralargealeruins:"part_warhammer",
					santasworkshop:"part_presentslist,part_santasletterbox,part_snowflakes",operahouse:"part_cheeryflutes,part_ybottle,part_neonshades",
					dimsumcart:"part_dimsumdip,part_dimsumbowl,part_chopsticks",clovertower:"part_leprechaun,part_clovershake,part_potofgold",
					"valentine'scruiseship":"part_lifebuoy,part_bowanchor,part_wheeloftheship",houseoftheroyals:"part_stonebrick,part_etchingglass,part_mortarbucket",
					smalllockedtreasurechest:"part_royalamulet",mediumenchantedwell:"part_royalamulet",largeengravedrunes:"part_kingschalice",
					extralargeabandonedcart:"part_kingschalice",
					
				}
			},
			{
				dataSource:'msg',
				find:'%26frType%3DFriendVotingFriendReward',
				replace:'%26suggestedVote%3D{%1}%26frType%3DFriendVotingFriendReward',
				words:['right','left'],
				conversionChart:{right:"1",left:"0"}
			}],

			//merge accept texts from dynamically created lists above
			accText: mergeJSON(t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,t16,t17,t18,t19,t20,t21,t22,t23,t29,t27,t30,t31,t32,t33,t34,t35,t36,t37,t38,t39,t40,t41,t42,t43),

			//tests for bonuses
			//see http://fbwm.wikia.com/wiki/Sidekick_Tutorial for in depth how-to instructions
			//changing the order of some of these tests will break this script
			tests: [
				//link excludes
				{ret:"exclude", link:[
					"Play FarmVille now","View full size!","feed their chickens","fertilize their crops",
					"start trading!","visit trading","Join them now","Accept as Neighbor",
					"visit","Join their Co-op","Help with the job","donate","Get the Ambrosia Tulip","Play Farmville","Solve Puzzles","Claim Fruitcake",
				]},
				
				//just say no to scam posts
				{ret:"exclude",url:[
					"www.facebook.com/pages/","Farmville.Nation","Farmville.Universe","Farmville.INC","Fv.Help","bit.ly",
					"FarmPrizes","Fv.Avg.Plane","FvWorld","zFarmvilleHelper","bit.ly","FarmvilleLatestHelpers",
					"FarmVille.Fans","FVstuffs","Zynga.Farmville.World","Farmville.Genious","Yes.I.Love.You.XD","FVBonus",
					"Farmville.Breeders","ZyngaFarmVilleFans","FarmvilleDailyNews","{*reward_link*}","&next=index.php",
					"FarmVilleAwesomePrizes","farmville-feed-blog.blogspot.com","FarmvilleJadeFallss"
				]},

				//body excludes
				{ret:"exclude", search:["title",],find:[
					"just planted their mystery tree seedling and could use help watering them",
					"found some extra bags of fertilizer","just Unwithered your crops!","posted a new comment on your farm",
					"wants to help you farm faster","just posted a note on your farm","gave up city livin' to become a farmer",
					"opened a Mystery Box and found","wants you to be their neighbor","has created a fantastic farm",
					"could use some gifts","is having a great time playing","is playing FarmVille on the iPhone",
					"is playing FarmVille on the iPad","has a new look!","found a lost pig with your name on her collar",
					"needs help harvesting a Bumper Crop","send them parts to help construct their mystery bulb",
					"needs your help to support Children's HeartLink","giving you a special Friends & Neighbors FarmVille Offer!","is attending Farmville Cyber Monday",
				]},
								
				{link:"Get TWO",ret:"none",kids:[
					
					{search:["link","title",],find:"soho oriental poppy",ret:"bulb_sohoorientalpoppy"},
					{search:["link","title",],find:"red riding chicken",ret:"adopt_chickenredriding"},
					
				]},
				
				{link:["claim it","claim prize","share prize","share it"],ret:"none",kids:[
				//	{search:["title",],find:"{%1}",subTests:specialMaterials,ret:"none",kids:[
						{search:["title",],find:"{%1} horse",subTests:horseTypes,ret:"adopt_horse{%1}"},
						{search:["title",],find:"{%1} cow",subTests:cowTypes,ret:"adopt_cow{%1}"},
						{search:["title",],find:"{%1} sheep",subTests:sheepTypes,ret:"adopt_sheep{%1}"},
						{search:["title",],find:"{%1} ewe",subTests:sheepTypes,ret:"adopt_ewe{%1}"},
						{search:["title",],find:"giant {%1}",subTests:treeTypes2,ret:"tree_giant{%1}"},
						{search:["title",],find:"big {%1}",subTests:treeTypes2,ret:"tree_giant{%1}"},
						{search:["title",],find:"{%1} bonsai ii",subTests:treeTypes3,ret:"tree_bonsai{%1}"},
						{search:["title",],find:"{%1} bonsai tree ii",subTests:treeTypes3,ret:"tree_bonsai{%1}"},
						{search:["title",],find:"{%1} tree",subTests:treeTypes,ret:"tree_{%1}"},
						{search:["title",],find:"{%1} bulb",subTests:bulbTypes,ret:"bulb_{%1}"},
						{search:["title",],find:"{%1}",subTests:otherAnimals,ret:"adopt_{%1}"},
						{search:["title",],find:"{%1}",subTests:decorTypes,ret:"{%1}"},
						{search:["title",],find:"{%1}",subTests:otherConsumables,ret:"{%1}"},
						{search:["title",],find:"{%1}",subTests:specialEvents,ret:"{%1}"},
						{search:["title",],find:"{%1}",subTests:specialMaterials,ret:"{%1}"},
				//	]},
				]},
				
				//voting events
				{link:"claim prize",ret:"none",kids:[
				
					//Romantic Vs Wildchild
					{img:"2b64e5344dcf64ad371496699b4e4ca3",ret:"adopt_huggerbear"},
					
					]},
				
				//mystery bulbs
				{link:"get flower",ret:"bulb_unknown",kids:[
					{link:"flower food",ret:"flowerfood"},
					{search:["title",],find:"have a fully grown {%1}",subTests:bulbTypes,ret:"bulb_{%1}"},
					{search:["title",],find:"now has a {%1} on their farm",subTests:bulbTypes,ret:"bulb_{%1}"},
					{search:["title",],find:"has all the {%1} they need",subTests:"materials",ret:"{%1}"},
				]},
				
				//tests to distinguish between two types of baby blankets
				{img:"f265afa84c6a43bc616b151417058203",ret:"pinkbabyblanket"},
				{img:"9ec1a380594fa2c619e1ad18f28a048a",ret:"bluebabyblanket"},
				{search:["title",],find:"baby blanket",ret:"none",kids:[
					{search:["title",],find:"baby playpen",ret:"bluebabyblanket"},
					{search:["title",],find:"baby nursery",ret:"pinkbabyblanket"},
				]},
				//test for snowflake icon
				{img:"2F9db7655eecae6e77d0c531a788b87c52",ret:"none",kids:[
					{search:["title",],find:"is now level",ret:"specialdelivery"},
					{search:["title",],find:["is joyous this festive season","close to beating Holiday Lights!"],ret:"lp"},
					]},
				//test for rainbow icon
				{img:["9259495d5c5599220c9178655019e1fd","9a64b6b9e32d50f5d72cef045aa1e6b7"],ret:"none",kids:[
					{search:["title",],find:"is now level",ret:"handbrush"},
					{search:["title",],find:"close to beating Emerald Valley!",ret:"rbp"},
					{link:"Collect 50 Rainbow Points",ret:"rp"},
					]},
				//test for riviera icon
				{img:"233cc68267ca09d174cfdeff9562664a",ret:"none",kids:[
					{search:["title",],find:"is now level",ret:"seaglassglue"},
					{search:["title",],find:"close to beating Mediterranean Riviera!",ret:"rvp"},
					]},
				//test for el dorado icon
				{img:"28a3472f16b741f36ed37120e531f297",ret:"none",kids:[
					{search:["title",],find:"is now level",ret:"handbrush"},
					{search:["title",],find:"close to beating",ret:"rp"},
					]},
				//test for oasis garden icon
				{img:"09734cecd793c330d8e2c42517cfacb0",ret:"none",kids:[
					{search:["title",],find:"is now level",ret:"specialdelivery"},
					{search:["title",],find:"close to beating",ret:"op"},
					]},
				//test for fairytale icon
				{img:["f5c4ea2be1ece568afc009f0c075f6cb","101a9d259b1712e561eb6219ca270ee5"],ret:"none",kids:[
					{search:["title",],find:"is now level",ret:"specialdelivery"},
					{search:["title",],find:"close to beating",ret:"sbp"},
					{search:["title",,"link"],find:"50 Storybook Points",ret:"sbp"},
					]},
				//test for horesman hollow icon
				{img:"8e32873f37d6a073cbec35e15eca5009",ret:"none",kids:[
					{search:["title",],find:"is now level",ret:"specialdelivery"},
					{search:["title",],find:"close to beating",ret:"hhp"},
					{search:["title",,"link"],find:"50 Sleepy Hollow Points",ret:"hhp"},
					]},
				//test for toy town icon
				{img:"c59a5ed4ebe6d17b59d09e286daa50da",ret:"none",kids:[
					{search:["title",],find:"is now level",ret:"specialdelivery"},
					{search:["title",],find:"close to beating",ret:"ttp"},
					{search:["title",,"link"],find:"50 Toy Town Points",ret:"ttp"},
					]},
				//test for avalon icon
				{img:"2F320bf37d7f906e8aad98e705fb008db4",ret:"none",kids:[
					{search:["title",],find:"is now level",ret:"specialdelivery"},
					{search:["title",],find:"close to beating",ret:"avp"},
					{search:["title",,"link"],find:"50 Avalon Points",ret:"avp"},
					]},
				//test for avalon kingdom icon
				{img:"d419e238558a8be1d0623c7d11c6b91a",ret:"none",kids:[
					{search:["title",],find:"is now level",ret:"specialdelivery"},
					{search:["title",],find:"close to beating",ret:"akp"},
					{search:["title",,"link"],find:"50 Avalon Points",ret:"akp"},
					]},
				//test for hidden prizes
				{search:["title",],find:"uncovered",ret:"none",kids:[
					{search:["title",],find:"trapped in ice",ret:"mat_snowtreasure"},
					{search:["title",],find:"trapped in a treasure",ret:"mat_hawaiiantreasure"},
					{search:["title",],find:"hidden in a tomb",ret:"mat_tombtreasure"},
					{search:["title",],find:"hidden in a treestump",ret:"mat_holidaytreasure"},
					{search:["title",],find:"hidden in a treasure",ret:"mat_atlantistreasure"},
					{search:["title",],find:"hidden in a ancient artifact",ret:"mat_fairytaletreasure"},
					{search:["title",],find:"hidden in a tombstone",ret:"mat_horsemanhollowtreasure"},
					{search:["title",],find:"hidden in a swingset",ret:"mat_toytowntreasure"},
					{search:["title",],find:"hidden in a lemonade stand",ret:"mat_toytowntreasure"},
					
					]},
				//specific text/url tests
				
				{link:"Adopt the Brown Stallion Colt",ret:"adopt_foalbrownstallioncolt"},
				{link:"Help",ret:"sendhelp"},
				{link:"Get Pot Of Gold!",ret:"potofgold"},
				{search:["title",],find:["Extra Large Artifact","Large Artifact"],ret:"handbrush"},
				{search:["title",],find:["Small Artifact","Medium Artifact"],ret:"minimattock"},
				{search:["title",],find:["Small Tombstone","Medium Tombstone"],ret:"spookymagnifyingglass"},
				{search:["title",],find:["Large Tombstone","Extra Large Tombstone"],ret:"spookycandlestand"},
				{link:["Help Now","Get a Baby Block!"],ret:"sendhelp"},
				{link:"Adopt Pet Helper Pony Foal!",ret:"adopt_foalpethelperpony"},
				{link:"Get a Spotted Holiday Cow!",ret:"adopt_cowspottedholiday"},
				{link:"Collect 50 Light Points",ret:"lp"},
				{link:"Collect 50 Riviera Points",ret:"rvp"},
				{link:"Collect 50 Oasis Points",ret:"op"},
				{link:"Send Woodman Axe!",ret:"woodmanaxe"},
				{img:"2Ff21d25f3fe86fb6b854f38a2fde2f191",ret:"magicalwand"},
				{img:"2F33ed520d83fba2c8881a084a7b966559",ret:"warhammer"},
				{img:"c771e7d1733870e5968e784197ccb87f",ret:"instagrow"},
				{img:"6c5ab0da7a6c8968a967178244122827",ret:"adopt_calfboomerangbull"},
				{img:"24603647e950fd418e16d282c3dc81f4",ret:"specialdelivery"},
				{img:"88a977e626d220ef8734f4c6a73d26d5",ret:"hollycrowbar"},
				{img:"2e9134587bb5dfa79678c8777738f373",ret:"stardustcement"},
				{img:"835a85420c3934ad30e99388669822e5",ret:"gooaway"},
				{img:"b0318a24288a01c02ac819488e644ecc",ret:"emeraldwood"},
				{img:"bbceb78236fcd5d94fc98eb167dafd43",ret:"silverbelltrowel"},
				{img:"abc0b3e2aa0d65bb4ab2f64600e6a739",ret:"geniepolish"},
				{img:"b93d9f87bf9e7278830cf3b268f8a2de",ret:"genieincense"},
				{img:"d2e256b9472e7337c064066e33087d56",ret:"seed_bluebonnetflower"},
				{img:"2af8e8b628004e173d9a5a46c961bf30",ret:"egg_munchkin"},
				{img:"2F28a3472f16b741f36ed37120e531f297",ret:"handbrush"},
				{img:"4d417d4cdadb3a427cae42162a93ba57",ret:"bushel_nymphmorel"},
				{img:"08fd942d07ddf58220048140e8264dca",ret:"bushel_whitecarnation"},
				{img:"62eef56cd1a4570b40eb6b99c2da8bae",ret:"sendhelp"},
				{img:"Fe89b21ab455eb9f71e17e30f3dcc3e38",ret:"seed_ottomelon"},
				{img:"43ae5978ebec61ff1916c2b52016b51d",ret:"adopt_foalchateaucolt"},
				{search:["title",],find:"needs a few Flower Drinks to help their Social Sheep",ret:"flowersmoothie"},
				{search:["title",],find:"able to get 100 XP to help them",ret:"100xp"},
				{search:["title",],find:"found some Jawbreaker Eggs",ret:"egg_jawbreaker"},
				{search:["title",],find:"while harvesting the Paddock",ret:"adopt_foalhollybright"},
				{search:["title",],find:["while harvesting the Pasture","Calf while harvseting the Baby Playpen","while harvesting the Holiday Cow Pasture"],ret:"adopt_calfhollybright"},
				{search:["title",],find:"Destiny Bridge in Mystical Groves",ret:"mat_destinybridge"},
				{search:["title",],find:"sharing Small Can of Fuel",ret:"fuel"},
				{search:["title",],find:["needs your help to uncover a Medium Slime Pile","needs your help to uncover a Small Slime Pile"],ret:"slimesucker"},
				{search:["title",],find:"needs your help to uncover a Extra Large Gift",ret:"hollycrowbar"},
				{search:["title",],find:"needs your help to uncover a Medium Gift",ret:"hollybrightscissors"},
				{search:["title",],find:"needs your help to uncover a Enchanted Rose Bush",ret:"mat_enchantedrosebush"},
				{search:["title",],find:"help to uncover a Extra Large Rock Candy Boulder",ret:"silversugarshovel"},
				{search:["title",],find:"needs your help to uncover a Candy Pile",ret:"diamondcandypick"},
				{search:["title",],find:"that was hidden in a Gift",ret:"mat_gift"},
				{search:["title",],find:"sharing the Light Blue Pony in FarmVille",ret:"adopt_horselightbluepony"},
				{search:["title",],find:["giving away free Nutmegs","share some nutmegs"],ret:"bushel_nutmeg"},
				{link:"Get Fertilize All",ret:"fertilizeall"},
				{link:"Get Wool Bundle",ret:"bushel_woolbundle"},
				{link:"Get Manure Bag",ret:"bushel_manurebag"},
				{link:"Get Milk Jug",ret:"bushel_milkjug"},
				{search:["title",],find:"found an adorable 4th Birthday Pegacorn",ret:"adopt_foal4thbirthdaypegacorn"},
				{link:"Adopt Pastry Chef Unicorn",ret:"adopt_foalpastrychefunicorn"},
				{link:"Adopt 4th Birthday Bedazzl",ret:"adopt_foal4thbirthdaybedazzled"},
				{search:["title",],find:"found an adorable Foal Bacchus Pegacorn",ret:"adopt_foalbacchuspegacorn"},
				{link:"Get Owls Tree",ret:"tree_owls"},
				{search:["title",],find:" tending their cows when an adorable Lonely Animal caught their eye",ret:"adopt_calfmistletoelane"},
				{link:"Adopt Chocolatier Pegacorn",ret:"adopt_foalchocolatierpegacorn"},
				{link:"Adopt 4th Birthday Unicorn",ret:"adopt_foal4thbirthdayunicorn"},
				{search:["title",],find:"to share some Nymph Morels",ret:"bushel_nymphmorels"},
				{search:["title",],find:"giving away free Yerba Mates",ret:"bushel_yerbamates"},
				{search:["title",],find:["share some Sweet Tea Cupss","giving away free Sweet Tea Cupss","sent this Sweet Tea Cups from Sweet Acres!"],ret:"bushel_sweetteacups"},
				{img:"2F39503e23e030c43dbb3e880fb5ec2020",ret:"anti-thorncharm"},
				{link:"Claim Blue-winged Teal",ret:"adopt_duckblue-wingedteal"},
				{link:"Share Harvest Backpack",ret:"sendhelp"},
				{link:"Get pink wildflower",ret:"wildflower_pink"},
				{link:"Get blue wildflower",ret:"wildflower_blue"},
				{link:"Get yellow wildflower",ret:"wildflower_yellow"},
				{link:"Get orange wildflower",ret:"wildflower_orange"},
				{link:"Get purple wildflower",ret:"wildflower_purple"},
				{link:"Get Magic Crown of Thorn B",ret:"tree_bonsaimagiccrownofthorn"},
				{link:"Get Maj. Redwood",ret:"tree_majesticredwood"},
				{img:"F5de4c3dcdc84e28f869a56d688c61f2b",ret:"stardust"},
				{img:["2F890e543735401b5e5325d214805aa029","890e543735401b5e5325d214805aa029"],ret:"arborist"},
				{img:["2F4b8cc80501cc6d433b47b19bf3512337","4b8cc80501cc6d433b47b19bf3512337"],ret:"farmhand"},
				{link:"Get a Flower Coin",ret:"flowercoins"},
				{img:"2Fb7f907f6d8b6022e3622750a2060f2a8",ret:"mat_marshmallowmound"},
				{img:["2F95382e420cd8cd49409c1e1cac74d741","2F21e29d7cde18baf2c08774736f2b754b"],ret:"candyscoop"},
				{img:"2F9bdc623855d2845b843bfa22a84f3737",ret:"silversugarshovel"},
				{img:"2Ffce94abbe46d5a8a51c020db3d1cd5c6",ret:"diamondcandypick"},
				{img:["2F1bc0633ec38b487b06ca3b10a46cbdec","F835a85420c3934ad30e99388669822e5"],ret:"gooaway"},
				{link:"Send Silver Sugar Shovel",ret:"silversugarshovel"},
				{link:"Vote Now",ret:"votenow"},
				{link:"Claim Prize",ret:"claimprize"},
				{link:["Get the Marshmortar","Get Marshmortar","Claim Marshmortar","Get a Marshmortar"],ret:"marshmortar"},
				{search:["title",],find:"Summer Pool House",ret:"mat_summerpoolhouse"},
				{search:["title",],find:"carving a spectacular Factory made out of Candy",ret:"mat_candyfactory"},
				{search:["title",],find:"harvesting the Candy Paddock",ret:"adopt_foalsweet"},
				{search:["title",],find:"harvesting the Candy Pasture",ret:"adopt_calfsweet"},
				{search:["title",],find:"harvesting the Hollow Horse Paddock",ret:"adopt_foalhoresmanhollowundefined"},
				{search:["title",],find:"harvesting the Hollow Pasture",ret:"adopt_calfhoresmanhollowundefined"},
				{search:["title",],find:"harvesting the Jungle Paddock",ret:"adopt_foaleldorado"},
				{search:["title",],find:"harvesting the Jungle Pasture",ret:"adopt_calfeldorado"},
				{search:["title",],find:"harvesting the Mystical Paddock",ret:"adopt_foalmysticalgrove"},
				{search:["title",],find:"harvesting the Mystical Pasture",ret:"adopt_calfmysticalgrove"},
				{search:["title",],find:"harvesting the oasis horse Paddock",ret:"adopt_foaloasisgardenvar"},
				{search:["title",],find:["harvesting the Oasis cow Pasture","harvesting the Oasis Pasture"],ret:"adopt_calfoasisgardenvar"},
				{search:["title",],find:["needs a few Flower Drinks to help their Social Sheep!","sharing a few Flower Drinks","wants you to have a Flower Drink","Use this Flower Drink","wants you to feed your shared sheep"],ret:"fruitsmoothies"},
				{search:["title",],find:"harvesting the Space Pasture",ret:"adopt_calfspace"},
				{search:["title",],find:"harvesting the Space Paddock",ret:"adopt_foalspace"},
				{search:["title",],find:["found Sprouting Orb to share with you while visiting their Gifting tree","is making progress on their Gifting Tree and wants you to claim their spare parts","Gifting Tree"],ret:"mat_giftingtree"},
				{search:["title",],find:"found a 4th Birthday Pegacorn and wants to share one with you",ret:"adopt_foal4thbirthdaypegacorn"},
				{search:["title",],find:"found a 4th Birthday Mare and wants to share one with you",ret:"adopt_foal4thbirthdaymare"},
				{search:["title",],find:"found a 4th Birthday Unicorn and wants to share one with you",ret:"adopt_foal4thbirthdayunicorn"},
				{search:["title",],find:"Oz Unicorn Baby and wants to share one with you",ret:"adopt_foaloz"},
				{search:["title",],find:"would prefer to vacation with 'Family'",ret:"mysterygamedart"},
				{search:["title",],find:"would prefer to vacation with 'Friends'",ret:"turbocharger"},
				{link:"Join Jockey Scales",ret:"sendhelp"},
				{search:["title",],find:["found some Iris Rainbow to share with you","found iris rainbow to share"],ret:"seed_irisrainbow"},
				{search:["title",],find:"found some Bat Berry Seed Package",ret:"seed_batberry"},
				{search:["title",],find:"found some Espresso Cup Seed Package",ret:"seed_espressocup"},
				{search:["title",],find:"found some Ghost Pumpkin Seed Package",ret:"seed_ghostpumpkin"},
				{link:"Join Search Party",ret:"sendhelp"},
				{link:"Get Water Dish",ret:"sendhelp"},
				{link:"Get Stormy Cloud Tree",ret:"tree_stormycloud"},
				{link:"Get a snip",ret:"snip"},
				{search:["title",],find:"just found a Pink Zonkey",ret:"adopt_foalpinkzonkey"},
				{search:["title",],find:"sharing Volcanic Rock",ret:"volcanicrock"},
				{search:["title",],find:"is sharing White Sand",ret:"whitesand"},
				{link:["Get Blue Seawater","Get Seawater"],ret:"blueseawater"},
				{link:"Send Mining Pickaxe",ret:"miningpickaxe"},
				{link:"Send Mining Key",ret:"miningkey"},
				{search:["title",],find:"harvesting the Pegasus Pen",ret:"adopt_foalpegasuspen"},
				{link:"Get Stormy Cloud",ret:"cloud_stormy"},
				{link:"Get Sunset Cloud",ret:"cloud_sunset"},
				{link:"Get Moon Cloud",ret:"cloud_moon"},
				{link:"Get Rainbow Cloud",ret:"cloud_rainbow"},
				{link:"Get Wispy Cloud",ret:"cloud_wispy"},
				{link:"Get Wipsy Cloud",ret:"cloud_wispy"},
				{search:["title",],find:"Prehistoric Foal Fairy",ret:"adopt_foalprehistoricfairy"},
				{link:"Adopt Jungle Colt",ret:"adopt_foaljunglecolt"},
				{search:["title",],find:"found a Sea Pegasus and wants to share one with you",ret:"adopt_horseseapegasus"},
				{search:["title",],find:" making progress on their Jade Treasure",ret:"trowel"},
				{search:["title",],find:["hidden in a Mine","making progress on their diamond mine","is making progress on their iron mine","is making progress on their gold mine"],ret:"mat_australiantreasure"},
				{link:"Get Items:twistedlavenderr",ret:"tree_twistedlavenderredbud"},
				{link:"Join Clean Up Crew",ret:"sendhelp"},
				{search:["title",],find:"is making progress on their Botanical Treasure",ret:"mat_botanicaltreasure"},
				{search:["title",],find:"found a Sea Hippocamp and wants to share one with you!",ret:"adopt_foalseahippocamp"},
				{search:["title",],find:"found a Sea Colt and wants to share one with you!",ret:"adopt_foalseacolt"},
				{link:"get giant sprinkled egg tr",ret:"tree_giantsprinkledegg"},
				{link:"get giant april showers tr",ret:"tree_giantaprilshowers"},
				{link:"get spring wildflowers tre",ret:"tree_springwildflowers"},
				{link:"get giant st. patrick's tr",ret:"tree_giantst.patrick's"},
				{link:"get a wish",ret:"unicornwishes"},
				{search:["title",],find:"needs a few wishes to help their Dream Unicorn",ret:"unicornwishes"},
				{search:["title",],find:"just found a Red Sun Colt",ret:"adopt_foalredsuncolt"},
				{link:"Notifications:xalquests-05",ret:"sendhelp"},
				{link:"Help ",ret:"sendhelp"},
				{link:"Get a Orchid Stallion!",ret:"adopt_horseorchidstallion"},
				{link:"Send Coral Key",ret:"coralkey"},
				{link:"Send Coral Crowbar",ret:"coralcrowbar"},
				{search:["title",],find:"is giving away extra Coral Crowbars to celebrate",ret:"coralcrowbar"},
				{search:["title",],find:"parts to help upgrade their orchard",ret:"mat_orchardupgrade"},
				{link:"Get Items:giantnewyearhat",ret:"tree_giantnewyearhat"},
				{link:"Get Items:wishingfountain",ret:"drillbit"},
				{link:"Get a Honeybee",ret:"honeybee"},
				{link:"get a sample",ret:"sample"},
				{link:"get help on your farm",ret:"farmhand"},
				{link:"send mallet",ret:"mallet"},
				{url:"mystery_seeds_halfway",ret:"wateringcan"},
				{url:"mysterybaby_fullygrown",ret:"animalfeed"},
				{link:"gopher treat",ret:"gophertreat"},
				{link:"bird feed",ret:"birdfeed"},
				{link:"love potion",ret:"lovepotion"},
				{link:"pile on",ret:"sendhelp"},
				{link:"Notifications:weddingescap",ret:"sendhelp"},
				{search:["title",],find:["Help out!","has just completed a Farmville Atlantis challenge","is helping Sasha become a Country Star","is helping Juicy Joe plant apple seeds"],ret:"sendhelp"},
				{search:["title",],find:"has just completed Imber's latest Enchanted Pond Challenge",ret:"sendhelp"},
				{link:"get baby fairy frogs",ret:"sendhelp"},
				{search:["title",],find:"needs some Chow to grow",ret:"pigchow"},
				{search:["title",],find:"large troll",ret:"mat_magicmushroom"},
				{search:["title",],find:["medium troll","small troll"],ret:"mat_vialofsunlight"},
				{search:["title",],find:"expanding their market stalls",ret:"mat_marketstall"},
				{search:["title",],find:["has rescued","troll's evil enchantment","leftover magical powers"],ret:"mat_trolltreasure"},
				{search:["title",],find:"rainbow butterfly ii",ret:"tree_bonsairainbowbutterfly"},
				{link:"get material",ret:"none",kids:[{search:["title",],find:"spooky home",ret:"sendhelp"},]},
				{link:"get some chow",ret:"pigchow"},
				{link:"get treat",ret:"felinetreat"},
				{search:["title",],find:"found some dry food",ret:"dryfood"},
				{search:["title",],find:["found some canned food"],ret:"cannedfood"},
				{img:"eadf257ee6373da8de7f71de6c7a4e1c",ret:"cannedfood"},

				{link:["decorate","let them know"],ret:"sendhelp"},
				{link:"collect 50 zp",ret:"zp"},
				{link:"collect 50 sp",ret:"sp"},
				{link:"collect 50 cp",ret:"cp"},
				{link:"collect 50 fp",ret:"fp"},
				{link:"collect 50 ap",ret:"ap"},
				{link:["collect 50 gp","collect 50 gp!"],ret:"gp"},
				{link:"collect 50 candy points",ret:"cndp"},
				{link:"collect 50 mp",ret:"mp"},
				{link:["collect 50 rainforest points","collect 50 rp"],ret:"rp"},
				{link:"collect 100 coconuts",ret:"coconuts"},
				{link:"give and get",ret:"none",kids:[
					{search:["title",],find:"{%1}",subTests:materials,ret:"{%1}"},
					{search:["title",],find:"{%1}",subTests:buildings,ret:"mat_{%1}"},
				]},
				{link:"accept and send",ret:"none",kids:[
					{search:["title",],find:"{%1}",subTests:materials,ret:"{%1}"},
					{search:["title",],find:"Pink Boat Orchid",ret:"bulb_pinkboatorchid"},
				]},
				{search:["title",],find:["is asking their friends for","needs a few","looking for","is helping","send some","to help","they're sharing","needs"],ret:"none",kids:[
					{link:["send","give","help"],ret:"sendhelp"},
					{link:"get",ret:"none",kids:[{search:["title",],find:["asking their friends","sharing","needs a few","looking for","helping","needs"],ret:"sendhelp"},]},
					{link:"adopt",ret:"none"},
				]},
				{search:["title",],find:["is sharing extra","is sharing"],ret:"none",kids:[
					{link:["send materials","send building parts","send parts"],ret:"sendmat"},
					{search:["title",],find:"is sharing a free {%1}",subTests:materials,ret:"{%1}"},
					{link:["send","help"],ret:"sendhelp"},
					{link:"get {%1}",subTests:materials,ret:"{%1}"},
					{title:"{%1}",subTests:materials,ret:"{%1}"},
				]},
				{link:"adopt turtle",ret:"adopt_turtle",kids:[
					{search:["title",],find:"bred a new baby turtle in their Turtle Pen",ret:"adopt_babyturtle"},
				]},
				{link:"get vial",ret:"sendsnoozepollen"},
				{link:"send mallet",ret:"mallet"},
				{link:"send wheelbarrow",ret:"wheelbarrow"},
				{link:"treasure pick",ret:"sendtreasurepick"},
				{link:"get outfit",ret:"sendmascotoutfit"},
				{url:"animal_mastery",ret:"animalfeed"},
				{url:"crop_mastery",ret:"coins"},
				{both:"turbo",ret:"turbocharge"},
				{both:"mystery dart",ret:"mysterygamedart"},
				{search:["title",],find:"whisperer",ret:"animalfeed"},
				{link:["get a bonus from them","Get a Job reward!"],ret:"coins"},
				{link:"get rewards",ret:"none",kids:[{search:["title",],find:"leaderboard",ret:"coins"},]},
				{url:["AchievementFriendReward","MasteryFriendReward","FertilizeThankFriendReward"], ret:"coins"},
				{search:["title",],find:"Refree Calf",ret:"adopt_calfreferee"},
				{search:["title",],find:"needs your help in the Craftshop!",ret:"bushel_random"},
				{search:["title",],find:"is hosting a barn raising", ret:"sendhelp"},
				{search:["title",],find:"needs more Turkeys for their Turkey Roost", ret:"sendturkey"},
				{search:["title",],find:"ram up for adopt", ret:"adopt_lambram"},
				{search:["title",],find:"ewe up for adopt", ret:"adopt_lambewe"},
				{link:"adopt {%1}", subTests:["piglet","lamb"], ret:"adopt_{%1}"},
				{search:["title",],find:"wandering stallion", ret:"wanderingstallion"},
				{search:["title",],find:["helped find a lost rabbit","is helping the bunnies"], ret:"adopt_rabbit"},
				{search:["title",],find:"yellow cattle", ret:"adopt_calfgelbvieh"},
				{search:["title",],find:"has finished work on their Turtle Pen",ret:"adopt_navyfuschiaspottedturtle"},
				{search:["title",],find:"finished building their Zoo", ret:"adopt_babyelephant"},
				{search:["title",],find:"finished building their mystical aviary", ret:"adopt_chickenmidnight"},
				{search:["title",],find:"share this Black Tabby Cat", ret:"adopt_blackkitten"},
				{search:["title",],find:"has a free Himalayan Cat", ret:"adopt_himalayankitty"},
				{search:["title",],find:"has a free Dwarf Blue Sheep",ret:"adopt_sheepdwarfblue"},
				//{search:["title",],find:"finished building their Wildlife Habitat", ret:"adopt_porcupine"},
				{search:["title",],find:"just finished building their Sheep Pen", ret:"adopt_ram"},
				{search:["title",],find:"just finished building their Aviary", ret:"adopt_farmgoose"},
				{search:["title",],find:"finished work on their Winter Livestock Pen",ret:"adopt_pigsnowflake"},
				{search:["title",],find:"has a free Red Goat that they want to share", ret:"adopt_redgoat"},
				{search:["title",],find:"finished building their Cow Pasture",ret:"adopt_cowirishmoiled"},
				{search:["title",],find:"finished building their Horse Paddock",ret:"adopt_horsecreamdraft"},
				{search:["title",],find:"just finished building their Baby Playpen",ret:"adopt_foalclydesdale"},
				{search:["title",],find:["just finished building their Winter Pet Run","Holiday St. Bernard"],ret:"adopt_holidaystbernard"},
				{search:["title",],find:"has a free Big Blue Tang Fish",ret:"adopt_bigbluetangfish"},
				{search:["title",],find:"has a free Treasure Seagull",ret:"adopt_treasureseagull"},
				{search:["title",],find:"has a free Striped Possum",ret:"adopt_stripedpossum"},
				{search:["title",],find:"has a free Lesser Flamingo",ret:"adopt_lesserflamingo"},
				{search:["title",],find:"has a free Black Horse",ret:"adopt_horseblack"},
				{search:["title",],find:"has a free White Pig",ret:"adopt_pigwhite"},
				{search:["title",],find:"has a free Red Cow",ret:"adopt_cowred"},
				{search:["title",],find:["has finished work on their Winter Zoo","Snow Leopard"],ret:"adopt_snowleopard"},
				{search:["title",],find:"finished building their Baby Bunny Hutch",ret:"adopt_whitedaisybunny"},
				{search:["title",],find:"just completed this week's raffle and has extra tickets for you!",ret:"raffleticket"},
				{search:["title",],find:"was able to get {%1}", subTests:["arborist","farmhand","100 xp"], ret:"{%1}"},
				{search:["title",],find:"of the following items: {%1}", subTests:[].concat(decorTypes,materials,otherWords).fixOrder(), ret:"{%1}"},
				{link:"claim",ret:"none",kids:[{search:["title",],find:"of the following items: {%1}",subTests:["moon","shamrock","horseshoe"],ret:"luckycharms"},]},
				{search:["title",],find:"is farming with fewer clicks", ret:"vehiclepart"},
				{search:["title",],find:["special Greenhouse crops and just surpassed","is sharing special delivery box!","giving away extra Special Deliveries"],ret:"specialdelivery"},
				{caption:"your crops are no longer withered", ret:"fuel"},
				{search:["title",],find:"celebration by claiming Animal Feed",ret:"animalfeed"},
				{search:["title",],find:"decorating their farm with a wonderful",ret:"none",kids:[
					{search:["title",],find:"{%1} of their own creation",subTests:["shack","house","cottage","villa","mansion"],ret:"mat_dreamhouse"},
				]},
				{search:["title",],find:"started working on their {%1}",subTests:buildings,ret:"mat_{%1}"},
				{link:"claim pink gladiolas",ret:"bulb_pinkgladiolas"},
				{link:"help out",ret:"sendhelp"},
				{link:"reward",ret:"coins"},
				{link:"apple barrel",ret:"applebarrel"},
				{link:"apple wood basket",ret:"applewoodbasket"},
				{link:"get apple core",ret:"sendapplecore"},
				{link:"get apple",ret:"apple"},
				{link:["get a trick"],ret:"tricks"},
				{link:["get rope","claim rope"],ret:"rope"},
				{link:"send lemon",ret:"sendlemon"},
				{link:"get lemon basket",ret:"lemonbasket"},
				{search:["title",],find:"lemon bushel",ret:"lemonbasket"},
				{link:"raffle ticket",ret:"raffleticket"},
				{link:["send tarot card","get tarot card"],ret:"tarotcard",kids:[
					{img:"2b57851ff624d149c87d1d6fb253d664",ret:"tarot_past"},
					{img:"cc090175c5492de0bee2b63dc929903c",ret:"tarot_present"},
					{img:"cefe00adfdac7973a6a515193f466b68",ret:"tarot_future"},
				]},
				{link:["get saddle","claim saddle"],ret:"saddle"},
				{search:["title",],find:"is done collecting all the Saddle",ret:"saddle"},
				{search:["title",],find:["Sweet Shop","Butter Mastery","Cream Mastery","Cottage Cheese Mastery","Yogurt Mastery","Kefir Mastery","Swiss Mastery","Brie Mastery",
				"Cheddar Mastery","Mozzarella Mastery","Banana Milkshake Mastery","Strawberry Milkshake Mastery","Chocolate Milkshake Mastery",
				"Vanilla Milkshake Mastery","Banana Yogurt Mastery","Strawberry Cottage Cheese Mastery","Chocolate Kefir Mastery","Vanilla Kefir Mastery",
				"Chocolate Gelato Mastery","Vanilla Gelato Mastery","Chocolate Ice Cream Mastery","Strawberry Ice Cream Mastery","Yarn Barn","leveled up their dairy farm",
				"Alpaca Yarn Mastery","Angora Scarf Mastery","Angora Yarn Mastery","Bedazzled Beret Mastery","Beret Mastery","Cotton Thread Mastery",
				"Cotton Yarn Mastery","Crochet Blanket Mastery","Cuddly Sweater Mastery","Dress to Impress Mastery","Friendship Bracelet Mastery",
				"Friendship Bracelet Mastery","FV Sparkle Sweater Mastery","Gloves Mastery","Rainbow Scarf Mastery","Red Sweater Mastery","yarn barn orders","dairy farm orders",
				"Sew Glove-ly Mastery","Sock Puppet Mastery","Sweater Dress Mastery","Wool Rug Mastery","Wool Thread Mastery","Wool Yarn Mastery","Wooly Socks Mastery","leveled up their yarn barn","while playing bingo",
				"magic gumball cookies","pixie pie crust","double frosted cupcakes","snap jelly fizz","mint meringue surprise","snazz berryshake","bubble brittle",
				"sugar buttons","angel cake","crushed candy","candy concoction","cream delight","pastry dough","star drops","unicorn fizz","fuzzy float","fantastic frosting",
				"marshmallow mousse","rainbow potion","peppy punch","confectioner's sugar","raw sugar","taffy tango","pega tarts","dressing toppings","apple carrot crate mastery","bit mastery","boots mastery",
				"braids mastery","bridle mastery","chaps mastery","cowboy hat mastery","curry comb mastery","dandy brush mastery","deep bow mastery","dressings mastery",
				"endurance mastery","fabric mastery","face masks mastery","feed tub mastery","gaits mastery","grade-a fodder mastery","grooming kit mastery",
				"hair ribbons mastery","halter mastery","hay bundle mastery","hoof boot mastery","hoof pick mastery","hoof polish mastery","horseshoe mastery",
				"lasso mastery","leg wraps mastery","lessons mastery","meal mastery","metal mastery","pleather mastery","rank mastery","saddle mastery",
				"saddle blanket mastery","splint boots mastery","spurs mastery","stirrups mastery","wash cloth mastery","water pail mastery","water trough mastery",
				"water tub mastery","bliss serum mastery","blue bubble brew mastery","bottled tonic mastery","chalice mastery","charmed mastery","charmed chalice mastery",
				"cloudy concoction mastery","cup of cordial mastery","dash of fortune mastery","daughter of flora mastery","dream draft mastery","elixir philter mastery",
				"enchanted elixir mastery","enchanted recipe mastery","fire breath drink mastery","golden balsam mastery","herb bundle mastery","itching powder mastery",
				"light in a bottle mastery","magical mushroom mastery","melody mix mastery","night glow mastery","peppy potion mastery","pixie potpourri mastery",
				"pixie powder mastery","red remedy mastery","soothing salve mastery","sweet syrup solution mastery","tickled pink mastery","tingled tonic mastery","unlocked a horse in Elite Horses",
				"leveled up their Apothecary","Sparkle Water Bucket mastery","Holiday Light mastery","Giving Basket mastery","Winter Magic Wand mastery","Gold Stars mastery","Enrichment Toys mastery",
				"Holdiay Feed mastery","Aurora Enclosure mastery","Bright Shine Metal mastery","Charity Chest mastery","Donation Drive mastery","Enrichment Enclosure mastery","Feeding Enclosure mastery",
				"Giving Candle mastery","Giving Enclosure mastery","Giving Tree Stump mastery","Harness Straps mastery","Holiday Feed bag mastery","Holiday Reins mastery","Holiday Rubber Ball mastery",
				"Holiday Sparklecicle mastery","Holiday Sparklesicle mastery","Hollybright Cookie Treat mastery","hollybright Fillament mastery","hollybright Frost mastery","hollybright Harnesses mastery","hollybright Salt Lick mastery",
				"hollybright Tokens mastery","hollybright Whistle mastery","Icicle Spike mastery","Icy Rope mastery","Lead Line mastery","Light Floats mastery","Lighting Enclosure mastery","Lucky Horseshoes mastery",
				"Peppermint Tug Toy mastery","Slush Cone mastery","Snow Scarves mastery","Snowflake Spell mastery","Sparkle Water Bottle mastery","Sparkle Water Trough mastery","Sparkle Water Tub mastery","Squeaker Fish mastery",
				"Stuffed Bone Toy mastery","Target Pole mastery","Training Clicker mastery","Training Enclosure mastery","Tungsten Stone mastery","unlocked an animal in Elite Horses",
				"Armband Mastery","Body Paint Mastery","Dwelling Feed Crate Mastery","Embellished Necklace Mastery","Exotic Feather Mastery","Exotic Waist Band Mastery",
				"Feather Charm Mastery","Feather Earrings Mastery","Gilded Drum Mastery","Gold Dust Mastery","Mixed Berry Cup Mastery","Mystery Treat Mastery","Oasis Water Trough Mastery",
				"Paint Bowl Mastery","Paint Brush Mastery","Painted Pebbles Mastery","Tall Vase Mastery","Traditional Cloth Mastery","Treasured Pendant Mastery","Water Bowl Mastery",
				"Weaved Blanket Mastery","Wild Feather Mask Mastery","Wild Fruit Mastery","Wild Fruit Smoothie Mastery","Hidden Jewels Mastery","Water Leaf Mastery",
				"Ancient Statue Mastery","Ballgame Goal Mastery","Beaded Necklace Mastery","Ceramic Bowl Mastery","Colorful Horn Hat Mastery","Crowning Headpiece Mastery",
				"Decorative Rug Mastery","Detailed Stool Mastery","Dwelling Water Tub Mastery","Elaborate Shawl Mastery","Exotic Headdress Mastery","Gilt Belt Mastery",
				"Patterned Leg Wraps Mastery","Shimmering Cuff Mastery","Studded Gold Ring Mastery",
				"unlocked an animal in Jungle Hideaway","Jungle Hideaway","unlocked an animal in Tin Man Fountain","tin man fountain",
				"adoption papers","candling candle","decorative paint","emerald city lollipop","emerald collar","emerald documents","emerald martingale","emerald night cap",
				"emerald saddle","enchanted eggs","enchanted water","fire spell","growing potion","heart medallion","ice spell","large drinking bowl","lightning spell","magic feed",
				"magic spells","magical fountain base","munchkin candies","munchkin treats","nesting boxes","nesting hay","riding halter","rookery","shrinking potion",
				"small drinking bowl","station name","stone spell","stuffed cog pillow","stuffed heart pillow","warming lamp","winkie blanket","winkie brush","winkie curry comb",
				"winkie grain","winkie harness","winkie lead line","winkie license","winkie named food dish","winkie reins","winkie saddle blanket","azure emporium",
				"bazaar treats mastery","cobalt chain mastery","diamond barette mastery","driving gloves mastery","emerald earring mastery","feeding enclosure mastery",
				"feeding trough mastery","fountain enclosure mastery","green spice mastery","jewelery box mastery","jewelery enclosure mastery","large fountain base mastery",
				"large fountain spout mastery","loom enclosure mastery","marble sphere mastery","masonry block mastery","masonry chisel mastery","masonry enclosure mastery",
				"masonry hammer mastery","medium feed bag mastery","metal weave ring mastery","orange spice mastery","pocket watch mastery","polished statue mastery",
				"precious stones mastery","red chalk mastery","red spice mastery","road atlas mastery","seashell necklace mastery","silk jacket mastery","silk scarves mastery",
				"silk shirt mastery","silk stockings mastery","silver compass mastery","small fountain cup mastery","small grain feed mastery","spice enclosure mastery",
				"spice rack mastery","spicy bazaar dumplings mastery","statue base mastery","travel brochures mastery","water fountain mastery","wayfarer center mastery",
				"wayfarer enclosure mastery","wooden loom mastery","wool poncho mastery","wool socks mastery","yellow spice mastery","adorned table mastery","amethyst anklet mastery",
				"bowl of spring water mastery","carpenter’s hut mastery","carpenter’s lathe mastery","carpenter’s nails mastery","colorful saree mastery","cotton dress mastery",
				"cotton jumper mastery","cotton mill mastery","cotton pants mastery","cotton scarves mastery","cotton shirt mastery","cotton socks mastery","crystal water jug mastery",
				"desert flowers mastery","diamond earrings mastery","dye shop mastery","emerald green  dye mastery","emerald necklace mastery","fresh cut grass mastery",
				"giant carrots mastery","giant sapphire mastery","gold spring trough mastery","golden garden mastery","granny smith apples mastery","grazing pasture mastery",
				"jewel chest mastery","jeweler’s shop mastery","jeweller’s shop mastery","medium natural feed bag mastery","mineral spring mastery","mini aque duct mastery",
				"mini aqueduct mastery","natural feed bag mastery","navy blue dye mastery","oasis grove mastery","oat cakes mastery","pasture mastery","rock formation mastery",
				"ruby ring mastery","salt lick mastery","smart shirt mastery","spinning wheel mastery","tie dye shirt mastery","treat stall mastery","wooden trellis mastery",
				"arabian stallions","alchemist hat mastery","alchemist powder mastery","arcade machine mastery","boots of swiftness mastery","bottle of charmed water mastery",
				"bubble bracelet mastery","charmed water mastery","cheat sheet mastery","coral earrings mastery","coral essence mastery","coral works mastery","crystal extract mastery",
				"fairy mines mastery","flower essence mastery","flower wand mastery","giggle gas mastery","gnomish time keeper mastery","god mode pass mastery",
				"gold dust feathers mastery","gold start dust mastery","golden anvil mastery","golden dust gloves mastery","golden girdle mastery","golden wind chime mastery",
				"growth grog mastery","hanging fountain mastery","high score card mastery","infinity bird bath mastery","itchy concoction mastery","kaliedoscope glasses mastery",
				"laughter dust mastery","light ray assimilator mastery","liquid fire mastery","magic corals mastery","magic elixir mastery","magic jerky mastery","magic purifier mastery",
				"magic scrolls mastery","magic tokens mastery","marine anklets mastery","mince of might mastery","nature's ring mastery","necklace of the sea mastery",
				"potion of mirth mastery","potions cabinet mastery","rainbow gold pot mastery","spell chest mastery","storybook wishing well mastery","sunshine fruit mastery",
				"the rabbit hole mastery","warmth of gold mastery","wishing quarter mastery","witch's brew mastery","youth potion mastery","magic garden","autumn leaf mastery",
				"barn fruit mastery","barn fruit tree mastery","bridle hook mastery","carded cotton mastery","carriage wheel mastery","coin collector mastery","colored handbag mastery",
				"cube hay mastery","cup seeds mastery","curry comb mastery","farrier's friend mastery","fountain coins mastery","gear rig mastery","girth mastery",
				"hallow water flask mastery","hallowed fountain mastery","hay maker mastery","head stall mastery","horse shoe mastery","leaf basket mastery","luxury braid bag mastery",
				"marble pole mastery","metal chest mastery","mischief pump mastery","nail spike mastery","ore brick mastery","ore den mastery","ore stone mastery","packed flour mastery",
				"pine needle basket mastery","pitch fork mastery","pulp wheel mastery","reed basket mastery","refined powder mastery","rolled hay mastery","seed capsule mastery",
				"seeded egg shell mastery","sewing machine mastery","silver water flask mastery","spin manure mastery","sponges mastery","sprout seed mastery","straw house mastery",
				"vintage bottle mastery","water dish mastery","water pot mastery","water powered mill mastery","weaved belt mastery","weaved clothes mastery","weaver mastery",
				"wheel wagon mastery","wood cart mastery","wooden branch mastery","wrist band mastery","stockroom mastery","mini fork mastery","hay stack mastery","wagon mastery",
				"grape wine barrel mastery","carton mastery","silo mastery","bucket mastery","all hallow tortoise mastery","autumn fairy pony mastery","black hawk pony mastery",
				"cerberus the great mastery","chariot panda mastery","dire wolf mastery","ghostly stray pup mastery","hedgemonk monkey mastery","hollow dice dragon mastery",
				"insomnium pegasus mastery","magician's pegacorn mastery","persian vampire cat mastery","tainted blood dragon mastery","trick or treat horse mastery",
				"witch doctor's owl mastery","blackjack barn","assorted colored thread mastery","brush holder mastery","carpenter's lathe mastery","durable goggles mastery",
				"embossed paper mastery","embossing nib mastery","embossing pens mastery","embossing stencil mastery","foreman's hat mastery","furniture polish mastery",
				"hand plane mastery","hobby knife mastery","lubricant spray mastery","makeup brush mastery","microfiber cloth mastery","oil pastels mastery","paint palette mastery",
				"painter's easel mastery","plastic hammer mastery","pull-along rope mastery","seam ripper mastery","sewing machine pedal mastery","sewing needles mastery",
				"small mirror mastery","spare wood wheels mastery","spool of thread mastery","tape measure mastery","thimbles mastery","toy knife mastery","toy pliers mastery",
				"toy saw mastery","toy screwdriver mastery","toy screws mastery","toy shears mastery","toy wrench mastery","tweezers mastery","twisty key mastery",
				"walnut paintbrush mastery","water colors mastery","wood chips mastery","wood glue mastery","toy shoppe","alchemist's machine mastery","apothecary mastery",
				"aqua regia mastery","arcane spell mastery","astral lantern mastery","bard's staff mastery","blue mountain mastery","bluebell scarf mastery","bottled joy mastery",
				"bottled starlight mastery","brew of love mastery","cask of riches mastery","celtic lute mastery","crystal valley mastery","daisy hedgehog mastery","dale horse mastery",
				"draper's weave mastery","druid pegasus mastery","druid's dolmen mastery","dryad masque mastery","dryad pegacorn mastery","edelweiss mastery","elixir of life mastery",
				"faery crown mastery","fool's gold mastery","foraging herbs mastery","foxglove unicorn mastery","friar badger mastery","gaelic badger mastery","glade fox mastery",
				"glass flower mastery","glassblower's kiln mastery","glowing phlox mastery","gold coins mastery","golden daisy mastery","golden daisy chain mastery","golden harp mastery",
				"golden lute mastery","golden shield mastery","golden strings mastery","hanging rock mastery","healing salve mastery","herne stag mastery","jar of dreams mastery",
				"lampmaker's table mastery","magic blossom mastery","minstrel's gallery mastery","minstrel's hat mastery","music blower mastery","northern lights mastery",
				"pan horse mastery","pan's helm mastery","philosopher's stone mastery","phoenix pheasant mastery","rainbow fields mastery","rainbow fleece mastery","rainbow silk mastery",
				"rune bear mastery","rune stones mastery","runehenge mastery","sheaf of stars mastery","shining flute mastery","snowdrop mastery","snowdrop stars mastery",
				"starlight orb mastery","starlit lake mastery","sylvan wolf mastery","tree of life mastery","winged boar mastery","wood imp mastery","avalon pewter mastery",
				"baluster jug mastery","chalice of power mastery","crown of dreams mastery","dragon gargoyle mastery","dragon tapers mastery","element of fantasy mastery",
				"elixir of fight mastery","engraved armour epaulett mastery","engraved glass goblet mastery","engraving tools mastery","exotic bizenware mastery",
				"fire opal pendant mastery","giant orb mastery","gold bricks mastery","golden bucket mastery","guardian axe mastery","heart of life locket mastery",
				"hidden dagger mastery","knitted gauntlet mastery","leather pouch mastery","magic dust mastery","magic dust barrel mastery","magical yarn mastery",
				"marvellous fountain mastery","mistified flowers mastery","mystic fire mastery","mystical engraving table mastery","natural paints mastery","painted linen mastery",
				"pattern book mastery","potion of mystery mastery","ring of runes mastery","royal snood mastery","sceptor mastery","spinning wheel mastery","stained glass tile mastery",
				"tallow lamp mastery","tapestry of life mastery","walking shoes mastery","welding hammer mastery","welding table mastery","wielding hammer mastery",





],ret:"specialdelivery"},
				{link:"adopt saddle foal",ret:"adopt_foalsaddle"},
				{search:["title",],find:"found an adorable Saddle foal",ret:"adopt_foalsaddle"},
				{search:["title",],find:"found a Firefly Horse while harvseting the Baby Playpen",ret:"adopt_horsefirefly"},
				{search:["title",],find:"just found a  Baby while harvesting the Spooky Paddock",ret:"adopt_foalspooky"},
				{search:["title",],find:"just found a  Baby while harvesting the Haunted Pasture",ret:"adopt_calfspooky"},
				{search:["title",],find:"just found a  Baby while harvesting the Joyful Horse Paddock",ret:"adopt_foaljoyful"},
				{search:["title",],find:"just found a  Baby while harvesting the Glen Paddock",ret:"adopt_foalglen"},
				{search:["title",],find:"just found a  Baby while harvesting the Glen Cow Pasture",ret:"adopt_calfglen"},
				{search:["title",],find:"just found a  Baby while harvesting the Atlantis Paddock",ret:"adopt_foalatlantis"},
				{search:["title",],find:"just found a  Baby while harvesting the Atlantis Pasture",ret:"adopt_calfatlantis"},
				{search:["title",],find:"just found a  Baby while harvesting the Australian Paddock",ret:"adopt_foalaussie"},
				{search:["title",],find:"just found a  Baby while harvesting the Australian Pasture",ret:"adopt_calfaussie"},
				{search:["title",],find:"just found a  Baby while harvesting the Holiday Paddock",ret:"adopt_foalmistletoelane"},
				{search:["title",],find:"just found a  Baby while harvesting the Holiday Pasture",ret:"adopt_calfmistletoelane"},
				{search:["title",],find:"just found a  Baby while harvesting the Emerald Paddock",ret:"adopt_foalemeraldvalley"},
				{search:["title",],find:"just found a  Baby while harvesting the Emerald Pasture",ret:"adopt_calfemeraldvalley"},
				{search:["title",],find:"just found a  Baby while harvesting the Riviera Paddock",ret:"adopt_foalmedriviera"},
				{search:["title",],find:"just found a  Baby while harvesting the Riviera Pasture",ret:"adopt_calfmedriviera"},
				{search:["title",],find:"just found a  Baby while harvesting the FT Paddock",ret:"adopt_foalftfields"},
				{search:["title",],find:"just found a  Baby while harvesting the FT Horse Paddock",ret:"adopt_foalftfields"},
				{search:["title",],find:"just found a  Baby while harvesting the Fairytale Pasture",ret:"adopt_calfftfields"},
				{search:["title",],find:["Bamboo Fortune"],ret:"smallaxe"},
				{search:["title",],find:["Stone Fortune"],ret:"wheelbarrow"},
				{search:["title",],find:["Water Fortune"],ret:"boathook"},
				{url:"BambooTreasure",ret:"smallaxe"},
				{url:"RockTreasure",ret:"wheelbarrow"},
				{url:"WaterBottleTreasure",ret:"boathook"},
				{url:"WaterTreasure",ret:"smallfishingnet"},
				{search:["title",],find:"help grow their feline",ret:"cannedfood"},
				{search:["title",],find:["Extra Large Buried Treasure","Large Buried Treasure"],ret:"largecrowbar"},
				{search:["title",],find:["Medium Buried Treasure","Small Buried Treasure"],ret:"smallcrowbar"},
				{search:["title",],find:["Extra Large Sea Treasure","Large Sea Treasure"],ret:"largefishingnet"},
				{search:["title",],find:["Medium Sea Treasure","Small Sea Treasure"],ret:"smallfishingnet"},
				{search:["title",],find:["Extra Large Snow Treasure","Large Snow Treasure"],ret:"pickaxe"},
				{search:["title",],find:["Medium Snow Treasure","Small Snow Treasure"],ret:"hairdryer"},
				{search:["title",],find:["Medium Tomb","Small Tomb"],ret:"stonepick"},
				{search:["title",],find:["Extra Large Tomb","Large Tomb"],ret:"mallet"},
				{search:["title",],find:["Extra Large Treestump","Medium Treestump"],ret:"powersaw"},
				{search:["title",],find:["Large Treestump","Small Treestump"],ret:"lumberjacksaw"},
				{search:["title",],find:["Extra Large Troll","Large Troll"],ret:"magicmushroom"},
				{search:["title",],find:["Medium Troll","Small Troll"],ret:"vialofsunlight"},
				{search:["title",],find:"has finished building an Grove",ret:"mat_grove"},
				{search:["title",],find:["Medium Treasure Chest","Small Treasure Chest"],ret:"coralkey"},
				{search:["title",],find:["Large Clamshell","Extra Large Clamshell"],ret:"coralcrowbar"},
				{link:["get materials","get extra materials"],ret:"none",kids:[{search:["title",],find:"{%1}",subTests:buildings,ret:"mat_{%1}"},]},
				//{link:"get {%1}",subTests:otherConsumables,ret:"{%1}"},
				{link:"screwdriver",ret:"screwdriver"},
				{search:["title",],find:"is done collecting all the Screwdriver",ret:"screwdriver"},
				{search:["title",],find:"grew up into a Cow in their Nursery Barn",ret:"adopt_calfbaby"},
				{search:["title",],find:["supplies and just surpassed","is stocking their Harvest Bonfire with supplies","to help stock their friends' Harvest Bonfires!"], ret:"bonfiresupplies"},
				{link:["get log","claim log"],ret:"log"},
				{link:"send fire log",ret:"sendfirelog"},
				{search:["title",],find:"pink patch calf bull",ret:"adopt_calfpinkpatchbull"},
				{link:"holiday gift",ret:"holidaygifts"},
				{img:"58fc1d30b0a983020037300f97eb8a51",ret:"adopt_calfbull"},
				{img:["779616a6e230fcdb2c19c8bcd21154a4","2F779616a6e230fcdb2c19c8bcd21154a4"],ret:"boathook"},
				{img:"7ac2abf70fe1f3792247d4a4bf22f966",ret:"raindrop"},
				{img:"0a17cd7cd76a9dd884a9d6d56899be2d",ret:"magicmaple"},
				{img:"839a51f8d3cb6b047d886bea14502ae4",ret:"fairydust"},				
				{search:["title",],find:["found an adorable calf","found a Calf"],ret:"adopt_calfbaby"},
				{search:["title",],find:"filled their Holiday Tree to earn a special gift",ret:"holidaygifts"},
				{link:"north-polarized goggles",ret:"sendpolarizedgoggles"},
				{link:"get one",ret:"none",kids:[
					{search:["title",],find:"Magic Snowman",ret:"snowmanparts"},
					{search:["title",],find:"sharing a few presents to fill up your Holiday Tree",ret:"holidaygifts"},
				]},
				{link:"vote now",ret:"none",kids:[
					//{search:["title",],find:"naughty or nice",ret:"stockingstuffer"},
					//{search:["title",],find:"ideal vacation",ret:"dreamvacation"},
					//{search:["title",],find:"perfect pet",ret:"perfectpet"},
					//{search:["title",],find:"charming vineyard",ret:"charmingvineyard"},
					//{search:["title",],find:"statue",ret:"statue"},
					//{search:["title",],find:"perfect job",ret:"perfectjob"},

					
				]},
				{img:"39e49b2e0b1035f67ae8cca0ae1b72c2",ret:"egg_egginjeans"},
				{img:"e3593e5c7c796def3e734cdc82e3b854",ret:"sendwarmthermos"},
				{img:"252a7c266ba8f9274db69e6b77d610a1",ret:"sendwinterchili"},
				{link:"claim {%1}",subTests:["goo","sack","scoop","belt"],ret:"{%1}"},
				{link:"become a judge",ret:"sendjudge"},
				{search:["title",],find:"Romatic Carriage",ret:"mat_romanticcarriage"},
				{link:"get",ret:"none",kids:[{search:["title",],find:"{%1}",subTests:craftingMaterials,ret:"{%1}"},]},
				{link:"adopt grass pony",ret:"adopt_foalgrasspony"},
				{link:"get trinket",ret:"sendbabydolltrinket"},
				{link:"diamond ewe",ret:"adopt_diamondewe"},
				{link:"bring on the lava",ret:"mat_volcanoreef"},
				{link:"pick axe",ret:"pickaxe"},
				{link:["shamrock","moon","horseshoe"],ret:"none",kids:[{search:["title",],find:"Lucky Rainbow",ret:"luckycharms"},]},
				{search:["title",],find:"thrilled with the Lighted Tiki Torch",ret:"lightedtikitorch"},
				{link:"build a volcano",ret:"mat_volcanoreef"},
				{link:"get feed",ret:"animalfeed"},
				{search:["link","title",],find:["double avatar","2x avatar"],ret:"doubleavatar"},
				{search:["title",],find:"care package",ret:"carepackage"},
				{img:["f0b0589808ceddd836deef88f4235402","c4e6e4f5633662470d91c75a8e682feb","80bb93b0b14050bc2db9e47877a0a274","addc3659c1e10368ae062c0a8358b281"],ret:"mat_hawaiiantreasure"},
				{url:"petrun_baby_common",ret:"petrun_common"},
				{url:"petrun_baby_rare",ret:"petrun_rare"},
				{url:"wildlife_baby_common",ret:"wildlife_common"},
				{url:"wildlife_baby_rare",ret:"wildlife_rare"},
				{url:"livestock_baby_common",ret:"livestock_common"},
				{url:"livestock_baby_rare",ret:"livestock_rare"},
				{url:"zoo_baby_common",ret:"zoo_common"},
				{url:"zoo_baby_rare",ret:"zoo_rare"},
				{url:"aviary_baby_common",ret:"aviary_common"},
				{url:"aviary_baby_rare",ret:"aviary_rare"},
				{url:"arctic_baby_common",ret:"arctic_common"},
				{url:"arctic_baby_rare",ret:"arctic_rare"},
				{url:["xhibabybasketcommonfloaty","swimhole_baby_common"],ret:"sea_common"},
				{url:["xhibabybasketrarefloaty","swimhole_baby_rare"],ret:"sea_rare"},
				{url:"xas_babybasketcommonfloaty",ret:"jade_common"},
				{url:"xas_babybasketrarefloaty",ret:"jade_rare"},
				{search:["title",],find:"is sharing a free Hopper from DISH and wants you to have one",ret:"adopt_hopperfromdish"},
				{url:"xhi_reef_expansionComplete",ret:"mat_volcanoreef"},
				{img:"b5ef8d15cd6eb476b86ddc660476c04a",ret:"mat_snowtreasure"},
				{search:["title",],find:"wooden plank",ret:"woodplank"},
				//{url:"fuel",ret:"fuel"},
				{desc:"coins",ret:"{%1}"},
				//{link:"get {%1}",subTests:materials,ret:"{%1}"},
				{link:["help and get","get"],ret:"none",kids:[
					{search:["title",],find:["April Showers","Mother's Day"],ret:"sendhelp"},
				]},
				{title:"finished building an {%1}",subTests:buildings,ret:"mat_{%1}"},
				{title:"is working hard on an {%1}",subTests:buildings,ret:"mat_{%1}"},
				{title:"is working hard on a {%1}",subTests:buildings,ret:"mat_{%1}"},
				{search:["title",],find:"building",ret:"none",kids:[
					{search:["title",],find:"gigantic {%1}",subTests:buildings,ret:"mat_{%1}"},
					{search:["title",],find:"{%1}",subTests:buildings,ret:"mat_{%1}"},
				]},
				{search:["title",],find:"has extra parts",ret:"none",kids:[{search:["title",],find:"{%1}",subTests:materials,ret:"{%1}"},]},
				{search:["title",],find:"is giving away extra {%1}",subTests:materials,ret:"{%1}"},
				{title:"has an extra {%1}",subTests:materials,ret:"{%1}"},
				{link:["get one","some","bonus","get gift"],ret:"none",kids:[
					{search:["title",],find:"coins",ret:"coins"},
					{search:["title",],find:"flame pepper seeds",ret:"seeds_flamepepper"},
					{search:["title",],find:"goos",ret:"goo"},
					{search:["title",],find:"found some {%1} ",subTests:standardMaterials,ret:"{%1}"},
					{search:["title",],find:"{%1}",subTests:specialEvents,ret:"{%1}"},
					{search:["title",],find:"{%1}",subTests:otherConsumables,ret:"{%1}"},
					{search:["title",],find:"{%1}",subTests:standardMaterials,ret:"{%1}"},
					{search:["title",],find:"{%1}",subTests:specialMaterials,ret:"{%1}"},
					{search:["title",],find:["big picnic","picnic basket"],ret:"picnicbasket"},
					{search:["title",],find:["ice cream","giant sundae"],ret:"icecream"},
					{search:["title",],find:"magic snowflake",ret:"snowmanparts"},
					{search:["title",],find:"holiday gift",ret:"holidaygifts"},
					{search:["title",],find:"stocking stuffer",ret:"stockingstuffer"},
					{search:["title",],find:["cupid bow","pair of wings","love arrow"],ret:"tokenofaffection"},
					{search:["title",],find:["shamrock","moon","horseshoe"],ret:"luckycharms"},
					{search:["title",],find:"shovels",ret:"shovel"},
					
				]},
				{title:"has built their {%1}",subTests:buildings,ret:"mat_{%1}"},
				{title:"just found a",ret:"none",kids:[
					{search:["title",],find:"{%1} foal",subTests:allFoals,ret:"adopt_foal{%1}"},
					{search:["title",],find:"{%1} calf",subTests:allCalves,ret:"adopt_calf{%1}"},
					{search:["title",],find:"{%1} yak",subTests:yakTypes,ret:"adopt_yak{%1}"},
					{search:["title",],find:"{%1}",subTests:babyAnimals,ret:"adopt_{%1}"},
				]},
				{link:"help and get one",ret:"sendhelp"},
				{link:"Get the Tiki Torch",ret:"lightedtikitorch"},
				{search:["title",],find:"Big Candy Pumpkin",ret:"tree_giantcandypumpkin"},
				
				{search:["title",],find:"avatar costume",ret:"costume",kids:[
						//static-0.farmville.zgncdn.com/assets/hashed/
						{img:"2613b0e7b51fa559642d5327264ae88b",ret:"costume_pamperedprincess"},
						{img:"6d5a278f8928c05128e09249dbfe4067",ret:"costume_sensiblesunbather"},
						{img:"6253bd20890c5c174a0df5f17d10086c",ret:"costume_casualtraveler"},
						{img:"de8a7457788f439dc31e8d74e51de514",ret:"costume_practicallounger"},
						{img:"2e108b39b850a1af884c6109edd56cd0",ret:"costume_outdoorexplorer"},
						{img:"096da69403ca8a64c202f38611968c76",ret:"costume_spontaneousadventurer"},
						{img:"cfe6812589f5c77091865ecfb30b84f0",ret:"costume_wildspirit"},
						{img:"eb4b576243d01a47d47478515b739ca9",ret:"costume_teddybear"},
						{img:"d89b62ce659649a17a200be6c9ca7289",ret:"costume_koala"},
						{img:"bb6ccdfef16d514c5adecf18a8f6075f",ret:"costume_cat"},
						{img:"27de181336b60fc59a8363e97a902441",ret:"costume_hamster"},
						{img:"0e9c8baa8aaa9ef595814d1c036d0b70",ret:"costume_dog"},
						{img:"dd2e0af021c9030c80f398a584fbf157",ret:"costume_monkey"},
						{img:"8dba7c7b5286c06a71961d6f35a3a8e7",ret:"costume_lion"},
						{img:"d398f39aa59eb5633480844fffdf9db6",ret:"costume_tiger"},
						{search:["title",],find:"{%1}",subTests:avatar,ret:"{%1}"},
				]},
				
				{link:"claim it",ret:"none",kids:[
					{img:"2057bb48e6218f7872275a5f598f3dbe",ret:"tree_giantpoinsettia"},
					{img:"1daac2a32f3cff1e9d1e6be36d1ccb00",ret:"snowdrift"},
					{img:"f0bb0874eebe3f8b82f2cfa08fbaf7d2",ret:"horsesnowglobe"},
					{img:"a1fba272cce026483331d5a3b51da743",ret:"lightedhedge"},
					{img:"9ef18f3747eaedc97e8b12ded42ff7b9",ret:"carolingsnowman"},
					{img:"2d0fb731d3219e543b031dbd6ed17062",ret:"teddybearsnowglobe"},
					{img:"386facd490ae76cf31876845a0893ab7",ret:"adopt_carolinggoat"},
					{img:"afa8195c0a7a49514464a45faa1b6132",ret:"luminaryfence"},
					{img:"c27998b5e780e9363db27db71a10c73d",ret:"coal"},
					{img:"b42c0a157197ceb896afe22ec4c0e48f",ret:"animalfeed"},
					{img:"417d2412991bdc6c5941e876b617071f",ret:"railspike"},
					{img:"77bc73ef224bd9b0bd70e53a51c11d47",ret:"railtie"},
					{img:"18bb508499a8369017208586170d3cf0",ret:"wateringcan"},
					{img:"890e543735401b5e5325d214805aa029",ret:"arborist"},
					{img:"4b8cc80501cc6d433b47b19bf3512337",ret:"farmhand"},
					{img:"83162ebbc9e06677ef8121ef01906efe",ret:"fertilizeall"},
					{img:"eba8a91b33b34f0f6505aad21a367990",ret:"frozenfountain"},
					{img:"0e79859e7349415c5592bbc9bd9b1d58",ret:"log"},
					{img:"b2144f972c0354950e7633b4bc3bc20a",ret:"stone"},
					{img:"669e1eb90c73dfcc6342375aa2db67a1",ret:"steelbeam"},
					{img:"3744842e1fd51242cc9b7c0da72f212e",ret:"hairdryer"},
					{img:"aad46346769a3e818e5b3d233dc1443c",ret:"pickaxe"},
					{img:"faf5bc0d1a4fef592f4b47b25ccc5196",ret:"stringlights"},
					{img:"9db417e17c47331f0175b7abc0116838",ret:"hollyfence"},
					{img:"cc77d40e3812adc785bfcdd2b2ff007d",ret:"giantcandy"},
					{search:["title",],find:"Giant Cupid Tree",ret:"tree_giantcupid"},
					{search:["title",],find:"Nomadic Horse",ret:"adopt_horsenomadic"},
				]},
					
				{search:["title",],find:"making good progress",ret:"none",kids:[
					{img:"f77442b5256ee2bf9374ea0572441f0a",ret:"holidaylights"},
					{img:"31a21629cef1a7ee9d048fbdcdd2300d",ret:"silverbell"},
					{img:"27a8b5c7730f0aff50da3aeca3e21a56",ret:"gps"},
					{img:"69f5031238453052f285d00d1538a9ca",ret:"snowflake"},
					{img:"2b2e8ba2c576a3a672d5d440e9e58cde",ret:"snowbrick"},
					{img:"cae16ae007e478c63228b8a3198bf1a2",ret:"icenail"},
					{img:"e2938eba8c6400466b0f5fd1d51ee504",ret:"snowglobe"},
					{img:"f360c4422127142e7d441b7c01a3495b",ret:"frozenbeam"},
					{img:"88e8dfabdd00d14cf62fbeae6a8f24e8",ret:"iceboard"},
				]},
				//SAME BUILDING PARTS
				{link:"get parts",ret:"none",kids:[
					{search:["title",],find:"zoo",ret:"mat_zoo"},
					{search:["title",],find:"paddock",ret:"mat_horsepaddock"},
					{search:["title",],find:"livestock",ret:"mat_livestockpen"},
					{search:["title",],find:"wildlife",ret:"mat_wildlifehabitat"},
					{search:["title",],find:"pasture",ret:"mat_cowpasture"},
					{search:["title",],find:"pet run",ret:"mat_petrun"},
					{search:["title",],find:"aviary",ret:"mat_aviary"},
					{search:["title",],find:"gnome garden",ret:"mat_gnomegarden"},
					{search:["title",],find:"garage",ret:"mat_garage"},
				]},
				{link:"get animal!",ret:"none",kids:[
					{search:["title",],find:["glen zoo","holiday zoo","nightmare zoo","finished building a zoo"],ret:"adopt_elephant"},
					{search:["title",],find:"atlantis zoo",ret:"adopt_atlanteanelephant"},
					{search:["title",],find:"candy zoo",ret:"adopt_circuspeanutelephant"},
					{search:["title",],find:"australian zoo",ret:"adopt_floatyelephant"},
					{search:["title",],find:"mystical zoo",ret:"adopt_ghostpuma"},
					{search:["title",],find:["island zoo","jade zoo",],ret:"adopt_lesserflamingo"},
					{search:["title",],find:"winter zoo",ret:"adopt_snowleopard"},
					{search:["title",],find:"space zoo",ret:"adopt_trolaplyga"},
					{search:["title",],find:"australian pasture",ret:"adopt_cowadaptaur"},
					{search:["title",],find:"atlantis pasture",ret:"adopt_cowatlanteanbull"},
					{search:["title",],find:"atlantis pet run",ret:"adopt_atlanteancat"},
					{search:["title",],find:"atlantis aviary",ret:"adopt_duckatlantean"},
					{search:["title",],find:"atlantis paddock",ret:"adopt_atlanteanhorse"},
					{search:["title",],find:"atlantis wildlife",ret:"adopt_atlanteanpanthercub"},
					{search:["title",],find:"atlantis livestock",ret:"adopt_pigatlantean"},
					{search:["title",],find:"australian paddock",ret:"adopt_horseaustraliandraught"},
					{search:["title",],find:"australian livestock",ret:"adopt_australianminiaturegoat"},
					{search:["title",],find:"australian aviary",ret:"adopt_duckaustralianwood"},
					{search:["title",],find:"australian wildlife",ret:"adopt_bandicoot"},
					{search:["title",],find:"australian pet run",ret:"adopt_blackaustraliancattledog"},
					{search:["title",],find:"island paddock",ret:"adopt_horseblack"},
					{search:["title",],find:"jade paddock",ret:"adopt_horseblack"},
					{search:["title",],find:"haunted paddock",ret:"adopt_horseblack"},
					{search:["title",],find:"aquarium",ret:"adopt_bigbluetangfish"},
					{search:["title",],find:"mystical pet run",ret:"adopt_brightpuppy"},
					{search:["title",],find:"candy pasture",ret:"adopt_cowcandystriped"},
					{search:["title",],find:"playpen",ret:"adopt_foalclydesdale"},
					{search:["title",],find:"candy pet run",ret:"adopt_cocokitty"},
					{search:["title",],find:"candy aviary",ret:"adopt_coconutpuff"},
					{search:["title",],find:"glen paddock",ret:"adopt_horsecream"},
					{search:["title",],find:"holiday paddock",ret:"adopt_horsecream"},
					{search:["title",],find:"horse paddock",ret:"adopt_horsecream"},
					{search:["title",],find:"joyful horse paddock",ret:"adopt_horsecream"},
					{search:["title",],find:"paddock",ret:"adopt_horsecream"},
					{search:["title",],find:"winter paddock",ret:"adopt_horsecream"},
					{search:["title",],find:"holiday livestock",ret:"adopt_sheepelf"},
					{search:["title",],find:"holiday pet run",ret:"adopt_festivecat"},
					{search:["title",],find:"candy paddock",ret:"adopt_horsefrostedfilly"},
					{search:["title",],find:"glen pet run",ret:"adopt_himalayancat"},
					{search:["title",],find:"horrendous pet run",ret:"adopt_himalayancat"},
					{search:["title",],find:"pet run",ret:"adopt_himalayancat"},
					{search:["title",],find:"winter pet run",ret:"adopt_holidayst.bernard"},
					{search:["title",],find:"cow pasture",ret:"adopt_cowirishmoiled"},
					{search:["title",],find:"winter pasture",ret:"adopt_cowirishmoiled"},
					{search:["title",],find:"mystical livestock",ret:"adopt_lightninggoat"},
					{search:["title",],find:"mystical wildlife",ret:"adopt_lunarbear"},
					{search:["title",],find:"mystical aviary",ret:"adopt_midnight"},
					{search:["title",],find:"candy livestock",ret:"adopt_pigneopolitan"},
					{search:["title",],find:"candy wildlife",ret:"adopt_pixiestickporcupine"},
					{search:["title",],find:"glen wildlife",ret:"adopt_porcupine"},
					{search:["title",],find:"magical wildlife cave",ret:"adopt_porcupine"},
					//{search:["title",],find:"wildlife",ret:"adopt_porcupine"},
					{search:["title",],find:"glen pasture",ret:"adopt_cowred"},
					{search:["title",],find:"haunted pasture",ret:"adopt_cowred"},
					{search:["title",],find:"island pasture",ret:"adopt_cowred"},
					{search:["title",],find:"jade pasture",ret:"adopt_cowred"},
					//{search:["title",],find:"pasture",ret:"adopt_cowred"},
					{search:["title",],find:"deadly livestock",ret:"adopt_redgoat"},
					{search:["title",],find:"glen livestock",ret:"adopt_redgoat"},
					{search:["title",],find:"jade livestock",ret:"adopt_redgoat"},
					//{search:["title",],find:"livestock",ret:"adopt_redgoat"},
					//{search:["title",],find:"aviary",ret:"adopt_seagull"},
					{search:["title",],find:"glen aviary",ret:"adopt_seagull"},
					{search:["title",],find:"island aviary",ret:"adopt_seagull"},
					{search:["title",],find:"jade aviary",ret:"adopt_seagull"},
					{search:["title",],find:"scary aviary",ret:"adopt_seagull"},
					{search:["title",],find:"holiday aviary",ret:"adopt_snowchicken"},
					{search:["title",],find:"winter aviary",ret:"adopt_snowchicken"},
					{search:["title",],find:"winter livestock",ret:"adopt_pigsnowflake"},
					{search:["title",],find:"space aviary",ret:"adopt_chickenspacealien"},
					{search:["title",],find:"space livestock",ret:"adopt_pigspacealien"},
					{search:["title",],find:"space paddock",ret:"adopt_horsespacealien"},
					{search:["title",],find:"space pasture",ret:"adopt_cowspacealien"},
					{search:["title",],find:"space pet run",ret:"adopt_spacealienbunny"},
					{search:["title",],find:"space wildlife",ret:"adopt_spacealienwolf"},
					{search:["title",],find:"island wildlife",ret:"adopt_stripedopossum"},
					{search:["title",],find:"jade wildlife",ret:"adopt_stripedopossum"},
					{search:["title",],find:"holiday pasture",ret:"adopt_telemarkcow"},
					{search:["title",],find:"mystical paddock",ret:"adopt_treespirit"},
					{search:["title",],find:"island pet run",ret:"adopt_turtle"},
					{search:["title",],find:"jade pet run",ret:"adopt_turtle"},
					{search:["title",],find:"mystical pasture",ret:"adopt_waterspirit"},
					{search:["title",],find:"winter wildlife",ret:"adopt_whiteholidayreindeer"},
					{search:["title",],find:"island livestock",ret:"adopt_pigwhite"},
					{search:["title",],find:"holiday wildlife",ret:"adopt_whitewolverine"},
					{search:["title",],find:"hollybright aviary",ret:"adopt_chickenfrostlight"},
					{search:["title",],find:"hollybright cow pasture",ret:"adopt_cowborealisbovine"},
					{search:["title",],find:"hollybright horse paddock",ret:"adopt_horseholidaycarousel"},
					{search:["title",],find:"hollybright livestock",ret:"adopt_piggiving"},
					{search:["title",],find:"hollybright pet run",ret:"adopt_snowflakecat"},
					{search:["title",],find:"hollybright wildlife",ret:"adopt_holidaylightporcupine"},
					{search:["title",],find:"hollybright zoo",ret:"adopt_auroraelephant"},
					{search:["title",],find:"jungle wildlife",ret:"adopt_emeraldstripedjaguar"},
					{search:["title",],find:"jungle aviary",ret:"adopt_javanjunglefowl"},
					{search:["title",],find:"jungle cow pasture",ret:"adopt_cowlongeared"},
					{search:["title",],find:"jungle horse paddock",ret:"adopt_horsecarvedwooden"},
					{search:["title",],find:"jungle livestock",ret:"adopt_piggleamingtusksboar"},
					{search:["title",],find:"jungle pet run",ret:"adopt_tawnypampascat"},
					{search:["title",],find:"jungle wildlife",ret:"adopt_jungleemeraldstripedjaguar"},
					{search:["title",],find:"jungle zoo",ret:"adopt_caracal"},
					{search:["title",],find:"riviera aviary",ret:"adopt_italianrooster"},
					{search:["title",],find:"riviera paddock",ret:"adopt_horsemenorquin"},
					{search:["title",],find:"riviera livestock",ret:"adopt_pigcintasinese"},
					{search:["title",],find:"riviera pasture",ret:"adopt_cowspanishbull"},
					{search:["title",],find:"riviera pet run",ret:"adopt_aegeancat"},
					{search:["title",],find:"riviera wildlife",ret:"adopt_eurasianbear"},
					{search:["title",],find:"riviera zoo",ret:"adopt_maskedtiger"},
					{search:["title",],find:"oasis aviary",ret:"adopt_horushawk"},
					{search:["title",],find:"oasis horse paddock",ret:"adopt_horsechariot"},
					{search:["title",],find:"oasis livestock pen",ret:"adopt_sheepbazaar"},
					{search:["title",],find:"oasis pasture",ret:"adopt_cowcleopatra"},
					{search:["title",],find:"oasis pet run",ret:"adopt_pharoahrabbit"},
					{search:["title",],find:"oasis wildlife pen",ret:"adopt_babynilecrocodile"},
					{search:["title",],find:"oasis zoo pen",ret:"adopt_egyptianwolf"},
					{search:["title",],find:"fairy tale aviary",ret:"adopt_chickensmitten"},
					{search:["title",],find:"ft horse paddock",ret:"adopt_horsefairycarriage"},
					{search:["title",],find:"fairytale livestock pen",ret:"adopt_sheeppixiedust"},
					{search:["title",],find:"fairytale pasture",ret:"adopt_cowfairyland"},
					{search:["title",],find:"fairytale pet run",ret:"adopt_charmeddog"},
					{search:["title",],find:"ft wildlife pen",ret:"adopt_storylandbear"},
					{search:["title",],find:"fairytale zoo pen",ret:"adopt_blackjaguar"},
					{search:["title",],find:"hollow aviary",ret:"adopt_chickenpumpkinbelly"},
					{search:["title",],find:"hollow horse paddock",ret:"adopt_horseautumnfall"},
					{search:["title",],find:"hollow livestock pen",ret:"adopt_sheepspiralcandy"},
					{search:["title",],find:"hollow pasture",ret:"adopt_cowwitch"},
					{search:["title",],find:"hollow pet run",ret:"adopt_cutesypup"},
					{search:["title",],find:"hollow wildlife pen",ret:"adopt_pigevilsmileboar"},
					{search:["title",],find:"hollow zoo pen",ret:"adopt_catfallfurlion"},
					{search:["title",],find:"fairytale zoo pen",ret:"adopt_blackjaguar"},
					{search:["title",],find:"toy aviary",ret:"adopt_duckcountrysinger"},
					{search:["title",],find:"toy cow pasture",ret:"adopt_cowquilt"},
					{search:["title",],find:"toy horse paddock",ret:"adopt_horsewindupstallion"},
					{search:["title",],find:"toy livestock",ret:"adopt_sheeppatchwork"},
					{search:["title",],find:"toy petrun",ret:"adopt_dogquiltdachshund"},
					{search:["title",],find:"toy wildlife habitat",ret:"adopt_fluffypolarbear"},
					{search:["title",],find:"toy zoo",ret:"adopt_cattigeractionfigure"},
					{search:["title"],find:"Avalon Aviary",ret:"adopt_duckarmored"},
					{search:["title"],find:"Avalon Horse Paddock",ret:"adopt_horselightpacked"},
					{search:["title"],find:"Avalon Livestock Pen",ret:"adopt_sheepmedieval"},
					{search:["title"],find:"Avalon Pasture",ret:"adopt_cowmedievalrobed"},
					{search:["title"],find:"Avalon Pet Run",ret:"adopt_oldcloakpuppy"},
					{search:["title"],find:"Avalon Wildlife Pen",ret:"adopt_magefox"},
					{search:["title"],find:"Avalon Zoo Pen",ret:"adopt_chainmailcub"},
					{search:["title"],find:"Avalon Baby Pen",ret:"adopt_fawnmedievalstag"},
					{search:["title","caption"],find:"Kingdom Aviary",ret:"adopt_glassrooster"},
					{search:["title","caption"],find:"Kingdom Baby Pen",ret:"adopt_foalsapphire"},
					{search:["title","caption"],find:"Kingdom Horse Paddock",ret:"adopt_horseguardian"},
					{search:["title","caption"],find:"Kingdom Livestock Pen",ret:"adopt_goatbighorned"},
					{search:["title","caption"],find:"Kingdom Pasture",ret:"adopt_cowsir"},
					{search:["title","caption"],find:"Kingdom Pet Run",ret:"adopt_spelledearsrabbit"},
					{search:["title","caption"],find:"Kingdom Wildlife Pen",ret:"adopt_medievalmoose"},
					{search:["title","caption"],find:"Kingdom Zoo Pen",ret:"adopt_stainedpeacock"},



			]},

				//search icon images to distinguish trees with same body texts
				{link:["get","tree"],ret:"none",kids:[
					{img:"91d2b7a356d56c78d400b765f4539aed",ret:"tree_giantgemii"},
					{img:"30fd8ad645f0641a5352aa65c8974ee9",ret:"tree_giantgem"},
					{img:"4686c180d0bfcd5a9811f6e00d61a562",ret:"tree_bonsairainbowbutterfly"},
					{img:"52a011bb200079418a508678bf954803",ret:"tree_giantparasolii"},
					{img:"0558bead5ff6659411d47c8cc74361be",ret:"tree_giantparasol"},
					{img:"4673dcf1e7bf433be7149340e3ff117c",ret:"tree_sapphirepixie"},
					{img:"9eb0b2f7e365ddac6a9c7df1e3fdd841",ret:"tree_giantwitchhatii"},
					{img:"cea508d772d218778bebcb5cc335b43c",ret:"tree_giantwitchhat"},
					{img:"a01eb4aeba3a645d7df54f6d98e10714",ret:"tree_giantscaryhaunted"},
					{img:"6ad113935990c49d7c4845513c49bd57",ret:"tree_gianthaunted"},
					{img:"a9e6c12bce81cf05c2360215060123e4",ret:"tree_giantwolffullmoon"},
					{img:"170671be865a3a0f5f53445a81d1bc29",ret:"tree_giantfullmoon"},
					{img:"4ffa3631dfb504f01c5413f1f6be5b53",ret:"tree_giantghost"},
					{img:"09ff0203bd4cee8a7d8fe7e0e405e7ab",ret:"tree_giantghostdecoration"},
					{img:"9f5094140636fbc3af0635f40a214850",ret:"tree_giantcornucopiaii"},
					{img:"e6514e9633ad82c128ede4bff7209258",ret:"tree_giantcornucopia"},
					{img:"29de986ef348f56e6796e87ffc12e2d0",ret:"tree_twistedlavenderredbud"},
					{link:"Get Barberry Bonsai Tree I",ret:"tree_bonsaibarberryii"},
				]},
				
				//search icon images to distinguish blooms with same body texts
				{link:["get","flower"],ret:"none",kids:[
					{img:"3f3014f5556c728d99d99d087cebd5b1",ret:"bulb_anemoneii"},
				]},
				
				//search icon & stork images to distinguish animals with same body texts
				{link:"adopt",ret:"none",kids:[
				//http://zynga1-a.akamaihd.net/farmville/assets/hashed/
				//{img:["",""],ret:"adopt_"},
					{img:["15e38b30179a04917ff3bab15901b3be","0e2c3c77854ea229b4b571d9e02532e8"],ret:"adopt_calfdragonbull"},
					{img:["a3069e38a97de8d1b84bb053b7156ff3","f47b12167e061b28ee915ca3b7815040"],ret:"adopt_calfdragon"},
					{img:["8f2e3a7c0d14621e01bdfd6bc6c35477","b0435de353e751307db7040b47610c56"],ret:"adopt_foalsteamunicorn"},
					{img:["3d83a5e5791aa3a56126f1acf4123799","a2fc3e466ba8ace4bac48bae0544ed98"],ret:"adopt_foalsteam"},
					{img:"69a9745107f3aaca304d8dc2ab7e97fe",ret:"adopt_foalwaterpegacorn"},
					{img:["d5b29e3eaca146793f85fb7c9c1a83ee","52bd7e1d599384324d88bc61f9c91e35"],ret:"adopt_foalwater"},
					{img:["0df95c3121881eef77a6ef72ab9b12f0","28869ee77ed804c626bee8d5ad36fa23"],ret:"adopt_calfballoon2"},
					{img:["94c1c6072e0449e0002df45089a5680b","e7cc6cc5d5d6bed749394a7c459b134f"],ret:"adopt_calfballoon"},
					{img:["696aee3053c286a166044171f1ca0851","cefe112c1d857bd03c661460ccf7b6be"],ret:"adopt_calfnewyear2"},
					{img:["d827308bf768abf82ecca05cea922a35","12a44e1531e58624d2f3cc868281beed"],ret:"adopt_foalpinatapony"},
					{img:["17ade87a37528d0bb78a9df7f02de2b1","0ba372abc9c3e54c34f451d2c2d7fde5"],ret:"adopt_foalpinata"},
					{img:["a6aa68a317bc02b4983891c7b147e84b","10ff4042630f82410b4e7189ae4f8d21"],ret:"adopt_foalcheerfullscroogi"},
					{img:["d8bf04f415763b9219f8662e9bc87807","d51cebfa246e166e9fde96027de54717"],ret:"adopt_foalorlovtrotter2"},
					{img:["0be9d257d59774cb54eed7abcb383483","c09097904ab62f3ba1c8ae3d4d7bfc39"],ret:"adopt_foalorlovtrotter"},
					{img:["47d95aeb6e7802e4f5b8581dec832b02","8523f9c36c5648a622bf3d6f35a63373"],ret:"adopt_foalnutcrackerpegacorn"},
					{img:["0a6f0d74e144c672e77c29244acb5bdc","ed32a274894869de2303208628500860"],ret:"adopt_foalnutcracker"},
					{img:["6be6f1d4bda076040a48d2cb9007e2ee","f3f2e0853dae91c9b53a4f323f010304"],ret:"adopt_calfinsweater"},
					{img:["29aec17c19666e487d31501ae34190c6","eb6dc2ad5e6cb118fbd882de4c389995"],ret:"adopt_calfinhoodie"},
					{img:"77850262c7056b8f3792cae77716223d",ret:"adopt_calftreat"},
					{img:["bfac37d6f74f7c99749601754794527e","e5bb8c4cb6b64dd84027309977dc8bb6"],ret:"adopt_foalspectralpegasus"},
					{img:["ee910c3a0f08870c342002f8f4b6b110","7365034c23b759afb98fed19611acfd1"],ret:"adopt_foalspectral"},
					{img:["6ccf995298e4220a18256569a4a80cf3","1d733b6b2fb5df3c11de3410c48288dc"],ret:"adopt_foalvampiredonkey"},
					{img:["ea3d7e72d71415e98334887281990975","81af946796c59ee5cb7c67de2864aebc"],ret:"adopt_foalsunflower"},
					{img:["8f9cf0f826541af183d8f59a30012330","657627d4f0160a39d5bd0959c2e53d87"],ret:"adopt_foaldoleyellow"},
					{img:["063f52aba61132730477047744c4c943","36d07749a7582a6310132417816b8a69"],ret:"adopt_foalfairy"},
					{img:["66ab06e2df4cfe9de4ba60de581f71a8","6b71661bf0867e5f061823357b47c782"],ret:"adopt_foalfairydonkey"},
					{img:["2a9238c253062bcee86dab7e1c911161","7e45caef2699d79effa6fd2389393643"],ret:"adopt_foalbutterfly"},
					{img:["79a43fee89ceac21c9a008cd123499ea","bd4a686ccc21af6eea1d882805e2bd8a"],ret:"adopt_foalbutterflypegacorn"},
					{img:["7f4aaa8e9e9e4b01ae1f59b0cb767007","09ab00b0063cb11def16b5c32abbdc2b"],ret:"adopt_foalmoonpegasus"},
					{img:["33162f3ee9b0011dbe69308aaf4d5d1a","0e597e22492b1e076b0c2f3b48b63b63"],ret:"adopt_foalsunpegasus"},
					{img:["127c6e61858a37de8e2ab4a3832ebcc8","dd86618ece1bf5557220439a2b622591"],ret:"adopt_foalsun"},
					{img:["fbfca9db6773876ef57ddfd466ff66a6","8828d0f991d4d8cacfa3a2e26d4f7030"],ret:"adopt_calfdracalfla"},
					{img:["58602ac3eeca799e8567f77244681576","949c85344e3e9b7fa0129266daa26e26"],ret:"adopt_calfcornucalfpia"},
					{img:["a8f2f8d3804da17d64bbf6dc31422350","d431a9854e28dd1ceef6b23598983889"],ret:"adopt_foalharvestunicorn"},
					{img:["cdb04021f7e0e6e0bf0eb30c0e1ca9e4","d9eafec7506bcbec9f5c96aa760a2cab"],ret:"adopt_foalharvestpony"},
					{img:["d7bb6b64fc1213dcd878dcb3a95750d6","c6cbea42e5b38798c7440f3b00778c42"],ret:"adopt_foalharvest"},
					{img:["411a43b84bd40d977d8bea671d00b0d3","d4af71ac7d9b0a0bbb04509731f97a5d"],ret:"adopt_foalthanks"},
					{img:["299431eb6cbca041989ea28c082e0a69","b80ad39bc2b850c35ad03bf612576c51"],ret:"adopt_calffoal"},
					{img:["52dfb5b55c576a52e941633b63d47136","4adead082d97cafaf6efa334d1be151d"],ret:"adopt_foalfranken"},
					{img:["825e1a986e07f18da5eb43c55787f2e0","4d67bb5061a42c1abd912e5df7b716b5"],ret:"adopt_foalblacksteed"},
					{img:"9ee5049ff3099dda4e804b50040b6be7",ret:"adopt_foalblack"},
					{img:["4904ae11f0716fdddd790a388aac8a42","1be73edba1b06a04a9be489ec1a31291"],ret:"adopt_foalsapphireunicorn"},
					{img:["3557da7e314c350bfc910c5e3814f1c0","66a212abb18125402fd82a8071c813af"],ret:"adopt_foalsapphire"},
					{img:["422a3ef58b40432f6faf2445f1ba7d82","b4667059e622c0ad3dce6e306619acab"],ret:"adopt_foalamethystunicorn"},
					{img:["9f4db4cad33bc58ae73d7dcacd103e80","79a243b24ca67ff27a4ec5fdac1c7635"],ret:"adopt_foalamethyst"},
					{img:["1d3980e4a5780f6cfe63ee4e187290c2","484c39d894fd448e0cc5da19883d2eab"],ret:"adopt_foalmoonsteed"},
					{img:["03d8e5a6250c82aa763b5e0fd17d8bee","8574a8a55004d39b044b3dff36e83a42"],ret:"adopt_foalmoon"},
					{img:["4101550aa6e8542d168d7dcbf5bb1d15","e2935e5d35f7f01a810fb004bb89b3aa"],ret:"adopt_foalcherrypegacorn"},
					{img:["c72dbdd7c1afd0cfcd8437c0599ba09d","c25a050880fa0a90c3234a4b1edfb96c"],ret:"adopt_foalfriendshippegasus"},
					{img:["1ad6ebfe43e67016bfd9bf8ee488bf5d","0303a994fbb2ed7c9a0a9c17729e5d89"],ret:"adopt_foalfriendship"},
					{img:"824290b5bdcd1e702bbdb19e7f3b1a33",ret:"adopt_foalballoonpony"},
					{img:["eec01f8a608e6fde02a908e5f031ffcd","319a871bd4cee80caa1000ba7844293f"],ret:"adopt_foalballoon"},
					{img:["a3296aaf1c2f6ab5235f41038646aa0b","52531c423fa31d46978c5a5404966efa"],ret:"adopt_foalcandycorn"},
					{img:["6c4f8f10802946b4d1c51755548809d9","c0601163daac553e141923dcdc48e0b6"],ret:"adopt_foalcandycornpony"},
					{img:"6f82eb77932eff007e6a955467355681",ret:"adopt_foalnightmaremini"},
					{img:["3809a8b10346e4b290ecfec94ad8da8e","ee48ca0cabfd337abddb077dddd9209d"],ret:"adopt_foalnightmare"},
					{img:["1d9268fc937dda3b4bcd5ab1954ba01b","cb46a3934da7a5f9fd7e6c6c9faa320b"],ret:"adopt_calfholidaybull"},
					{img:["a7a3d17cfd8add6e4cb5bd6198f694b3","a6fd6ad586ac5fb37bd5aba83524f279"],ret:"adopt_calfholidaywreath"},
					{img:["ee174fe3388734c7a21cecee560cd30d","d8d444ea83aa160162e4fa59acc19835"],ret:"adopt_calfholiday"},
					{img:["8829e58a2c7e39fc8e5012d0c8c2f679","7ea063c8cac4c65354366f00ddf58d50"],ret:"adopt_foalwhitepegasus"},
					{img:["fd885b15f91752e200c0ebf0b58d6c5d","7e01d7f3c6e6940d4b98cc74321be3e3"],ret:"adopt_foalgypsystallion"},
					{link:"Items:foal_gypsy_st",ret:"adopt_foalgypsystallion"},
					{img:["57408b56ed20ae7f71e15f1036489160","c4daef35af7f7256226a7c7680dd9692"],ret:"adopt_foaldiscopony"},
					{img:["9155daa26714cf89f5abeaf706bb6d4c","869cff415e74ac29dfd61c61d7f351a3"],ret:"adopt_foaldisco"},
					{img:["727a79da46ba46d34e6d120d70eeb062","e43bf2f2e70ac9289290020d2e40fbeb"],ret:"adopt_calfnewyear"},
					{img:["5dad5998d9f543dbb4675ef0ac44076c","4f478aa8e1a7c489795a25c5bcec0fac"],ret:"adopt_calfliondance"},
					{img:["a30736e7038302d01883890e0aa45d8e","e54ac8b6e104e93ebd6c318bbb26c7de"],ret:"adopt_foalvalentinepony"},
					{img:["0aabfc003d4d13fcdac155aa09f32544","0955750886dcf3a43f231b593393b622"],ret:"adopt_foalvalentine"},
					{img:["8a84039faad7fbc1a1fac5c79cd0e0c4","37aa58ee438aab5b3a0af6f994c4664d"],ret:"adopt_foalromance"},
					{img:["50926cd51434156b8f4d1b1f9cfde619","8cf02fbcc6c1d9045c5c8951392700c0"],ret:"adopt_foalromancemini"},
					{img:["2cfba1572a2036e92ab170e782935918","7f88a0996956641994848c0b79e04926"],ret:"adopt_calfbullflower"},
					{img:"d98f08f1e8bb5bb788ffd72e76422fbb",ret:"adopt_foalfireflypegacorn"},
					{img:"1c4a03ceaa3cc411f7c4d71b3f1d4d18",ret:"adopt_foalfireflypony"},
					{img:"1cc446cc8415ee741c1b382a842fabc7",ret:"adopt_foalfirefly"},
					{img:"b24865d67e5eb688fdf7f104cb745c59",ret:"adopt_calfcalfstructionworker"},
					{img:["60d3a70aeb3353530de9d0fd3eea65d7","4f4c0b033cd2fdd271a4454340fe65d0"],ret:"adopt_foalgoldenmini"},
					{img:["4a10ac5cfef4bbb50ecfb9d9faed8e43","ea1b2a0f4d074d28a6aed83bcb6928a2"],ret:"adopt_foalgoldenstallionmini"},
					{img:["9a3c74da8488a0bd61ee43849b4a1d95","89263f674488821212132ebc401b9993"],ret:"adopt_foalstarunicorn"},
					{img:["d926a74a59c981d1c307399a3fa3e4e8","5acc468f763190bbfdfc993c908625ac"],ret:"adopt_foalstar"},
					{img:["55af1affde7028ba9f3f4be1161a3fd9","e46fd82d6490a35b456b605a23bccc32"],ret:"adopt_foalcamarguestallion"},
					{img:["e999952b2652f3dc53799119f58506b5","a69891e58e60af069acc6f8864b42748"],ret:"adopt_foalcamargue"},
					{img:["62e722cfe219da98e065cbb1e3390956","5862781a30a49fdae2c2b50ffe66d09b"],ret:"adopt_foalglittering"},
					{img:["2fdbbd27bc3c3d6ff5dea411e67ee601","fc8699e7c62ef4043990b29ed507613d"],ret:"adopt_foalglitter"},
					{img:"c7b32d9c9a4785d9c491bd704fff0215",ret:"adopt_foalsugarpegafoal"},
					{img:"4f94aa9d96e541991ccc47d2f472adbe",ret:"adopt_foalartdecounicorn"},
					{img:"74304370af8d2c265f2ec45f63d347ad",ret:"adopt_foalstrawmanunicorn"},
					{img:"48fcd3b68463263b4f59c264fc86db1f",ret:"adopt_calfspacow"},
					{img:"600fc9d5667791fb57a7b8994668467e",ret:"adopt_foalstayathomepegafoal"},
					{img:"f79cf593f8485a2f95a552627bffc168",ret:"adopt_foaltravelingpegafoal"},
					{img:"e7672d1252beb4ae68ae442ef5e677bb",ret:"adopt_foalpinkalohastallionstud"},
					{img:"47d14db4fc9a882aeba7941881ff7a9a",ret:"adopt_foalwinterfunpegafoal"},

					
					
				]},
				
				//dino dna
				{search:["title",],find:"{%1} DNA Strand",subTests:dnaTypes,ret:"dna_{%1}"},
				//gems
				{search:["title",],find:"{%1}",subTests:gemTypes,ret:"gem_{%1}"},
				//dragon scales
				{search:["title",],find:"{%1} dragon scale",subTests:scaleTypes,ret:"scale_{%1}"},
				//monster serum
				{search:["title",],find:"{%1} monster serum",subTests:serumTypes,ret:"serum_{%1}"},
				//bonsai cutting
				{search:["title",],find:"{%1} bonsai cutting",subTests:cuttingTypes,ret:"cutting_{%1}"},
				//animal spirit
				{search:["title",],find:"{%1} animal spirit",subTests:spiritTypes,ret:"spirit_{%1}"},
				//fossils
				{search:["title",],find:"{%1} fossil",subTests:fossilTypes,ret:"fossil_{%1}"},
				//pixie dust
				{search:["title",],find:"{%1} pixie dust",subTests:pixieTypes,ret:"pixie_{%1}"},
				//fish scales
				{search:["title",],find:"{%1} fish scale",subTests:fishscaleTypes,ret:"fishscale_{%1}"},
				//horse shoes
				{search:["title",],find:"{%1} horseshoes",subTests:horseshoeTypes,ret:"horseshoe_{%1}"},
				//clouds
				{search:["title",],find:"{%1} cloud",subTests:cloudTypes,ret:"cloud_{%1}"},
				//wildflowers
				{search:["title",],find:"{%1} wildflower",subTests:wildflowerTypes,ret:"wildflower_{%1}"},
				
				
				
				//search calves/foals by link text before materials
				{link:"{%1} baby",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1} stud",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1} colt",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1} pegafoal",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1} foal",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1}foal",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1}calf",subTests:allCalves,ret:"adopt_calf{%1}"},
				{search:["title",],find:"{%1}-foal",subTests:allFoals,ret:"adopt_foal{%1}"},
				{search:["title",],find:"{%1}-pegafoal",subTests:allFoals,ret:"adopt_foal{%1}"},
				{search:["title",],find:"while harvseting the Baby Playpen",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1}calf",subTests:allCalves,ret:"adopt_calf{%1}"},
				{link:"{%1} calf",subTests:allCalves,ret:"adopt_calf{%1}"},
				{link:"adopt the calf",ret:"none",kids:[
					{search:["title",],find:"found a {%1} calf",subTests:allCalves,ret:"adopt_calf{%1}"},
					{search:["title",],find:"Baby Ox",ret:"adopt_calfbabyox"},
				]},
				
				//send
				{link:["give","send","lend"],ret:"none",kids:[
					{link:"and get",ret:"none",kids:[
						{search:["link","title",],find:"animal feed",ret:"animalfeed"},
						{search:["title",],find:"needs another {%1}",subTests:materials,ret:"{%1}"}, //sogo
					]},
					{link:"item to",ret:"sendwishlist"}, //send wishlists
					{link:"{%1}",subTests:["feed","bushel","help","bottle","flower coins"],ret:"send{%1}"}, //specific sends
					{link:"{%1}",subTests:craftingMaterials,ret:"sendbasket"},
					{link:["materials","building parts","parts"],ret:"sendmat"},
					{search:["title",],find:"{%1}",subTests:buildings,ret:"sendmat"},
					{search:["title",],find:"{%1}",subTests:[].concat(materials,otherWords),ret:"sendmat"},
				]},
				
				//building materials by building
				{link:["materials","part"],ret:"none",kids:[
					{link:"{%1}",subTests:materials,ret:"{%1}"}, //<---- added this to avoid marking vehicle parts as goo
					{search:["title",],find:"{%1}",subTests:materials,ret:"{%1}"},
					{search:["title",],find:"{%1}", ret:"none",
						subTests:["upgrading","good progress","addition of a station","half-way","halfway","finished","expanding","completion of","upgrade of","progress on","built a","adding stations","adding a station",
								  "is making progress on their","wants you to claim their spare parts","has so much stuff that they couldn't carry this","working hard to improve","get extra materials"],
						kids:[{search:["title",],find:"{%1}",ret:"mat_{%1}",subTests:buildings}]
					},
					{search:["title",],find:"{%1}",subTests:buildings,ret:"mat_{%1}"},
					{img:"50ae3ca24932a8f905a81a78ea17a6a2",ret:"mat_beehive"},
				]},
				
				//catchall for bushels. here we use body text because link text is sometimes wrong or truncated.
				{search:["title",],find:"bushel", ret:"bushel", kids:[
					{search:["title",],find:"giving away free {%1} bushels",subTests:bushelTypes,ret:"bushel_{%1}"},
					{search:["title",],find:"{%1} bushel",subTests:bushelTypes,ret:"bushel_{%1}"},
					{search:["title",],find:"{%1}",subTests:bushelTypes,ret:"bushel_{%1}"},
				]},
				
				//hatch specific eggs
				{search:["title",],find:"found some treasured {%1} mystery eggs",subTests:eggTypes,ret:"egg_{%1}"},
				{search:["title",],find:"basket full of {%1} eggs",subTests:eggTypes2,ret:"egg_{%1}"},
				{link:["hatch","grab an egg"],ret:"none",kids:[
					{search:["title",],find:"{%1}",subTests:eggTypes2,ret:"egg_{%1}"},
					{search:["title",],find:"{%1}",subTests:eggTypes,ret:"egg_{%1}"},
				]},
				
				//trees
				{search:["title",],find:"{%1}",subTests:["tree","seedling grew up "],ret:"none",kids:[
					{search:["title",],find:"ornament tree II",ret:"tree_ornament2"},
					{search:["title",],find:"{%1}",subTests:["giant","gaint","big","large"],ret:"none",kids:[
						{search:["title",],find:"{%1}",subTests:treeTypes2,ret:"tree_giant{%1}"},
					]},
					{search:["title",],find:"bonsai {%1} ii",subTests:treeTypes3,ret:"tree_bonsai{%1}"},
					{search:["title",],find:"{%1} bonsai ii",subTests:treeTypes3,ret:"tree_bonsai{%1}"},
					{search:["title",],find:"magic {%1} bonasi",subTests:treeTypes3,ret:"tree_bonsai{%1}"},
					{search:["title",],find:"magic {%1}",subTests:treeTypes3,ret:"tree_bonsai{%1}"},
					{search:["title",],find:"{%1}",subTests:treeTypes,ret:"tree_{%1}"},
				]},
				
				//crafted samples
				{search:["title",],find:"{%1}", subTests:["improved their","learned some new tricks","offering some free sample","now a master","bought some"], ret:"none",kids:[
					//this entry may seem redundant but it actually prevents misidentification mistakes
					{search:["title",],find:"{%1}", subTests:craftTypes, ret:"sample",kids:[
						{search:["title",],find:"level {%1} ", subNumRange:"1,20", ret:"sample1"},
						{search:["title",],find:"level {%1} ", subNumRange:"21,40", ret:"sample2"},
						{search:["title",],find:"level {%1} ", subNumRange:"41,80", ret:"sample3"},
						{search:["title",],find:"level {%1} ", subNumRange:"81,100", ret:"sample4"},
						{search:["title",],find:"level {%1} ", subNumRange:"100,140", ret:"sample5"},						
					]},
					{link:"grab a good",ret:"sample2"},
				]},
				{link:"sample",ret:"sample"}, // prevents "goods" being mistaken for "goo" after other samples have been identified
				{link:"Get a sample",ret:"sample"},
				
				//simply by link texts
				//here we create an array on the fly for special words, then we add other predefined arrays, then we fix the order before searching
				{link:"{%1}", subTests:[].concat(decorTypes,materials,otherWords).fixOrder(), ret:"{%1}"},
				
				//order specific crops
				{link:"place order", ret:"order",kids:[
					{search:["title",],find:"{%1}", subTests:bushelTypes, ret:"order_{%1}"},
				]},			
				
				//mystery babies
				{link:["adopt a mystery baby","adopt an egg","adopt a winter baby","adopt a cute baby","adopt a jade baby"],ret:"unknown_baby",kids:[
					//img search
					{img:"ef81171be39fcdcc9f6bb8825fb2e450",ret:"petrun_common"},
					{img:"f87608154a4061f044e4ab92f55f3cfd",ret:"petrun_rare"},
					{img:"f4619e66d335c667128c8dfa92f069ee",ret:"wildlife_common"},
					{img:"0b27e2c1185116002e0475d50dde98b7",ret:"wildlife_rare"},
					{img:"116fd9ef14a14c94aea71f959f99db93",ret:"livestock_common"},
					{img:"1cfd92964ae41c740dfab9b7023271f1",ret:"livestock_rare"},
					{img:"182233e7ca189ea69462039a0b303706",ret:"zoo_common"},
					{img:"6d5347c8dae181c5afb15b03390b69e6",ret:"zoo_rare"},
					{img:"3c1015497c7d352157196c823f6cad63",ret:"aviary_common"},
					{img:"a94a8ddc8286fbc92d51a666ab23da55",ret:"aviary_rare"},
					{img:"183e4a3ba7be02fca7f550989b3a80e1",ret:"arctic_common"},
					{img:"7bf258c9ffdb411fa992b58e9994afc7",ret:"arctic_rare"},
					{img:"57ca62ee6fb4b67333c3bbb4a07f839b",ret:"sea_common"},
					{img:"241413129ffa5dc7e97af3edf0460781",ret:"sea_rare"},
					{img:"c8b7382788c77ff3b61434c4336a44c9",ret:"jade_common"},
					{img:"88bbb027d137cfeb4f8f91f475a15bda",ret:"jade_rare"},
					{img:"db7cf610f60857e9ba3bbec9a11de4ae",ret:"ocean_common"},
					{img:"8aa0550a5911cade1b597d4d7292d4bf",ret:"ocean_rare"},
					
					//body search
					{search:["title",],find:"rare",ret:"none",kids:[
						{search:["title",],find:"{%1}",subTests:["arctic","aviary","livestock","sea","pet run","petrun","wildlife","zoo"],ret:"{%1}_rare"},

					]}, //end rare
					{search:["title",],find:"{%1}",subTests:["arctic","aviary","livestock","sea","pet run","petrun","wildlife","zoo"],ret:"{%1}_common"},
				]}, //end adopt

				
				//new cow pasture/horse paddock catches
				{link:["adopt a baby","adopt the baby"],ret:"none",kids:[
					{search:["title",],find:["found an adorable ","found a "],ret:"none",kids:[
						{search:["title",],find:"foal",ret:"adopt_foal",kids:[
							{search:["title",],find:"{%1} foal",subTests:allFoals,ret:"adopt_foal{%1}"},
							{search:["title",],find:"{%1}-foal",subTests:allFoals,ret:"adopt_foal{%1}"},
							{search:["title",],find:"{%1}foal",subTests:allFoals,ret:"adopt_foal{%1}"},
						]},
						{search:["title",],find:"calf",ret:"adopt_calf",kids:[
							{search:["title",],find:"{%1} calf",subTests:allCalves,ret:"adopt_calf{%1}"},
							{search:["title",],find:"{%1}calf",subTests:allCalves,ret:"adopt_calf{%1}"},
						]},
						{search:["title",],find:"{%1} yak",subTests:yakTypes,ret:"adopt_yak{%1}"},
						{search:["title",],find:"{%1}",subTests:babyAnimals,ret:"adopt_{%1}"},
					]},
					{search:["title",],find:"Baby Mule",ret:"adopt_foalmule"},
					{search:["title",],find:"Mistletoe Donkey Baby",ret:"adopt_foalmistletoedonkey"},
					{search:["title",],find:"Trick Or Treat Donkey Baby",ret:"adopt_foaltrickortreatdonkey"},
					{search:["title",],find:"found an adorable Grass Pony and",ret:"adopt_foalgrasspony"},
					{search:["title",],find:"Pink Aloha Stallion Stud",ret:"adopt_foalpinkalohastallionstud"},
					{search:["title",],find:"Orchid Stallion Stud",ret:"adopt_foalorchidstallion"},
					{search:["title",],find:"Camargue Colt",ret:"adopt_foalcamarguestallion"},
					{search:["title",],find:"Pink Fairy Stallion Colt",ret:"adopt_foalpinkfairystallion"},
					{search:["title",],find:["Welsh Black Calf","Welsh Calf"],ret:"adopt_calfwelshblack"},
					{search:["title",],find:"Foal Pegasus Aviator",ret:"adopt_foalaviatorpegasus"},
					{search:["title",],find:"Frankenfoal",ret:"adopt_foalfranken"},
					{search:["title",],find:"Baby Ox",ret:"adopt_calfbabyox"},
					{search:["title",],find:"Calf Foal",ret:"adopt_calffoal"},
					{search:["title",],find:"CornuCalfpia",ret:"adopt_calfcornucalfpia"},
					{search:["title",],find:"Dracalfla",ret:"adopt_calfdracalfla"},
				]},
					
				//catchall for materials by link
				{link:"{%1}",subTests:materials,ret:"{%1}"},
				
				//join crafting teams
				{link:"join team",ret:"join",kids:[
					{img:"690d86ce9c4143329ab5f872584e1169",ret:"joinicehorsesculpture"},
					{img:"3699f5d32d503228bb5e0cd3afa75544",ret:"joinicepigsculpture"},
					{img:"c5e70c211e82a0bcc1abda64949630fa",ret:"joinmagicsnowflake"},
					{img:"fe063f1f8f1845c626dc868856dad075",ret:"joinbrightyellowtractor"},
					{img:"26b4f3ae87b43f8734d4988bd2805d19",ret:"joinmechanicscarecrow"},
					{img:"a10220ef5dc0a674dbc3ca263793328d",ret:"joinsheeptopiary"},
					{img:"69811776a063c0855c1733f68a33dcb3",ret:"joinappleredseeder"},
					{img:"6c01a99ead4203d971116324aca0e554",ret:"joinbonsai"},
					{img:"e51a6ceffb36d2bec6216200aa95e2b7",ret:"jointreehouse"},
					{img:"7839ea1528ff204e277e1fb47309abf3",ret:"joinappleredharvester"},
					{img:"a860f784f9347030c3d199a191b26a78",ret:"joinpostoffice"},
					{img:"b0f78411f7b6084cb32a9436e24a5658",ret:"joinevergreentrain"},
					{img:"4b8cc80501cc6d433b47b19bf3512337",ret:"joinfarmhand"},
					{img:"c38928055fddef53032e92de43d33342",ret:"joinyellowracertractor"},
					{img:"0a7f6ed48f63a0b6e277e5421c4624ef",ret:"joinstonewall"},
					{img:"83162ebbc9e06677ef8121ef01906efe",ret:"joinfertilizeall"},
					{img:"068f8f2e0112c398403588b7f264b6da",ret:"joindaintyfence"},
					{img:"b29c1f15b645f0d4e382a68a6fd3ff84",ret:"joinshovel"},
					{img:"18bb508499a8369017208586170d3cf0",ret:"joinwateringcan"},
					{img:"ee5dacb99882370f7b8662d862b4dda9",ret:"joinironfence"},
					{img:"890e543735401b5e5325d214805aa029",ret:"joinarborist"},
					{img:"d0ae91c4d9b02323ef3ae1133644e42c",ret:"joinlamppost"},					
					{img:"b42c0a157197ceb896afe22ec4c0e48f",ret:"joinanimalfeed"},
					{img:"78dff32c0ab8d3223d59278aba31166e",ret:"joinvehiclepart"},
					{img:"338ab39ec2b0e49cc93a406802d109ba",ret:"joinswisscabin"},
					{img:"738a3d1a5152e428317a25b39361e8d2",ret:"joinstonearchway"},
					{img:"0da8d0cfb50ed7f3e311cf5e6aa73d81",ret:"joinmilkingstool"},
					{img:"1f9040fc0b4f751852b851a4fdb644e0",ret:"joinscythe"},
					{img:"c065c449db07f585caee3e5facdd5c54",ret:"joinhorsesculpture"},
					{img:"53efef0cd100001a37cc1399a7f02cc5",ret:"joinbrick"},
					{img:"4d64954699fe7f1f8a19a4827dee2134",ret:"joinnail"},
					{img:"0efae744cf2befb26bc630b39cedaf81",ret:"joinwoodenboard"},
					{img:"6817c5c650fd418149601cbc1c83e3e9",ret:"joinluckypenny"},
					{img:"1a40c5d2f4f929a226b934e79c8f0602",ret:"joinfuel"},
					{img:"72016f512ae1b34e43eb21816a8692ab",ret:"joinbottle"},
					{img:"a8888075274db08167ebd4fafc4a7f91",ret:"joinlovepotion"},
					{img:"689dfc368b7d4061e2646699970b1123",ret:"joinpinefencei"},
					{img:"88a9d64c3a5f39e86dfc12575e76a950",ret:"joinpinefenceii"},
					{img:"dd1f0f1981e691f51f0d45ac6b2d8f1c",ret:"joinmoderntable"},
					{img:"6b19071a41140dc4944942be43d6def9",ret:"joinpuppykibble"},
					{img:"3bb35cd13ddc95f5c077dee905cc5190",ret:"joindogtreat"},
					{img:"b6dd31c53721c77db007b8a312b9f06b",ret:"joinmoati"},
					{img:"152ccad7da5edd2257af934c82996c77",ret:"joinmoatii"},
					{img:"5340407ec4d9395f55814d4da2260050",ret:"joinmoatiii"},
					{img:"a793a74c34ea640b1c818aa67a42f9ec",ret:"joinmoativ"},
					{img:"89ac1a38bcdc7ffbb18602b2e9bc1a00",ret:"joinmoatcorneri"},
					{img:"88a738c8310aef87329e3a75103117df",ret:"joinmoatcornerii"},
					{img:"3271cdc09b6cade975b9e96b3f977361",ret:"joinmoatcorneriii"},
					{img:"656278391986c724bb150b45f806701f",ret:"joinmoatcorneriv"},
					{img:"77d09f9046c790237bcfdf264cd80efc",ret:"joincastlebridge"},
					{img:"0ef896833905a2abcb1bb2939bb2bd37",ret:"joinenglandpostcard"},					
					{img:"a8d9fe654cb1a593046646c322ed8e5e",ret:"joinbeachball"},
				]},
				{url:["CraftingRandomLootFriendReward","CraftingRandomLootCrewFriendReward"],ret:"join",kids:[
					{search:["title",],find:"{%1}",subTests:craftShop,ret:"join{%1}"},
				]},
				
				//collectibles and collection tradeins
				{search:["title",,"desc"],find:"{%1}", subTests:["noticed you could use a","has completed the","collect"], ret:"none",kids:[
					{search:["title",,"desc"],find:"{%1}", subTests:colTypes, ret:"col_{%1}"},
					{search:["title",,"desc"],find:"{%1}", subTests:colGroups, ret:"colX_{%1}"},
				]},

				//perfect bunches
//				{search:["title",],find:"perfect bunch", ret:"perfectbunch", kids:[
//					{search:["title",],find:"{%1}", subTests:flowerTypes, ret:"perfect_{%1}"},
//				]},

				//seeds
				{search:["title",],find:"seed",ret:"none",kids:[
					{link:"honeybee", ret:"honeybee"},
					{search:["title",],find:"pollinated", ret:"pollinated",kids:[
						{search:["title",],find:"{%1}", subTests:bushelTypes, ret:"polseeds_{%1}"},
					]},
					{search:["title",],find:"{%1}", subTests:seedTypes, ret:"seeds_{%1}"},
				]},

				//dynamic adoptions when foal/calf/duckling is in the link
				{link:"foal", ret:"adopt_foal",kids:[
					{search:["link","title",],find:" {%1}", subTests:allFoals, ret:"adopt_foal{%1}"},
				]},
				{link:"calf", ret:"adopt_calf",kids:[
					{search:["link","title",],find:" {%1}", subTests:allCalves, ret:"adopt_calf{%1}"},
				]},
				{link:"duckling", ret:"adopt_duckling",kids:[
					{search:["title",],find:"duckling grew up to become a", ret:"adopt_duckling"},
					{search:["link","title",],find:" {%1}", subTests:ducklingTypes, ret:"adopt_duckling{%1}"},
				]},
				
				//catchalls for missed foal/calf/ducklings by link
				{search:["title",],find:"{%1} foal", subTests:allFoals, ret:"adopt_foal{%1}"},
				{search:["title",],find:"{%1} calf", subTests:allCalves, ret:"adopt_calf{%1}"},
				{search:["title",],find:"{%1} duckling", subTests:ducklingTypes, ret:"adopt_duckling{%1}"},
				{search:["title",],find:"{%1} fawn", subTests:fawnTypes, ret:"adopt_fawn{%1}"},

				//catchalls for other known animals sets
				{search:["title",],find:"{%1} duck", subTests:duckTypes, ret:"adopt_duck{%1}"},
				{search:["title",],find:"{%1} pig", subTests:pigTypes, ret:"adopt_pig{%1}"},
				{search:["title",],find:"{%1} sheep", subTests:sheepTypes, ret:"adopt_sheep{%1}"},
				{search:["title",],find:"{%1} ewe", subTests:sheepTypes, ret:"adopt_ewe{%1}"},
				{search:["title",],find:"{%1} cow", subTests:cowTypes, ret:"adopt_cow{%1}"},
				{search:["title",],find:"{%1} horse", subTests:horseTypes, ret:"adopt_horse{%1}"},
				{search:["title",],find:"{%1} chicken", subTests:chickenTypes, ret:"adopt_chicken{%1}"},
				{search:["title",],find:"{%1} dragon", subTests:dragonTypes, ret:"adopt_dragon{%1}"},
				{search:["title",],find:"{%1} goat", subTests:goatTypes, ret:"adopt_goat{%1}"},
				{search:["title",],find:"{%1} cat", subTests:catTypes, ret:"adopt_cat{%1}"},
				{search:["title",],find:"{%1} rabbit", subTests:rabbitTypes, ret:"adopt_rabbit{%1}"},
				
				
				
				
				//catchall for known animal adoption
				{search:["title",],find:"{%1}", subTests:[].concat(otherAnimals,babyAnimals,bearTypes,dinoTypes,dogTypes,elephantTypes,hoovedTypes,turtleTypes,wateranimalTypes).fixOrder(), ret:"adopt_{%1}"},

				//simply by link texts
				//here we create an array on the fly for special words, then we add other predefined arrays, then we fix the order before searching
				{link:"{%1}", subTests:["coins","bushel","perfect bunch","tree"].concat(decorTypes,materials,otherWords).fixOrder(), ret:"{%1}"},
				
				//simply by body text
				{search:["title",],find:"{%1}", subTests:["coins","bushel","perfect bunch","tree"].concat(decorTypes,materials,otherWords).fixOrder(), ret:"{%1}"},

				//animal catchalls
				//these need to run after ALL other tests because they have text that may be misidentified earlier
				{search:["title",],find:"{%1}", subTests:animalCatchalls, ret:"adopt_{%1}"},
				
				//created for 'user has shared a link' posts
				{title:"{%1}", ret:"none",
					subTests:["upgrading","good progress","addition of a station","half-way","halfway","finished","expanding","completion of","upgrade of","progress on","built a","adding stations","adding a station"],
					kids:[{title:"{%1}",ret:"mat_{%1}",subTests:buildings}]
				},
				{title:"looking for lava in all the wrong places",ret:"mat_volcanoreef"},
				{search:["desc"],find:"{%1}",subTests:materials,ret:"{%1}"},
				{search:["desc"],find:"{%1}",subTests:otherAnimals,ret:"adopt_(%1}"},
				{search:["desc"],find:"is building their {%1}",subTests:buildings,ret:"mat_{%1}"},
				{search:["desc"],find:["ranked 3 in the Rainbow Harvest Fest","100 xp"],ret:"100xp"},
				{search:["desc"],find:"is raising a sweet Baby Sea Animal",ret:"none",kids:[
					{img:"241413129ffa5dc7e97af3edf0460781",ret:"sea_rare"},
					{img:"57ca62ee6fb4b67333c3bbb4a07f839b",ret:"sea_common"},
				]},
				{search:["desc"],find:"{%1}",subTests:decorTypes,ret:"{%1}"},
				{caption:"{%1}",subTests:decorTypes,ret:"{%1}"},
			],

			//build the menu just as you would for FVWM except omit default values
			//if this script moves, be sure to change the userscripts source id for the link below
			//it should be the same number as in the @require line on top of this script

			menu: {
				section_main:{type:'section',label:'FarmVille ('+version+')',kids:{

				publishwarning:{type:"message",title:"SCRIPT IS NOW HOSTED ON GREASYFORK",textContent:""},
				publishwarning2:{type:"message",title:"ROUGH UPDATE - FINE TUNED TO COME",textContent:"6/9/2015",newitem:true},
				updateSidekick:{type:'link',label:'Update Sidekick',href:'https://greasyfork.org/scripts/405-wall-manager-sidekick-farmville/code/Wall%20Manager%20Sidekick%20(Farmville).user.js'},
				donatefbwm:{type:"link",label:"Help Charlie with FBWM: Donate via Paypal",href:"https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=merricksdad%40gmail%2ecom&lc=US&item_name=Charlie%20Ewing&item_number=FVSK&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted"},
				facebook:{type:'link',label:'Find me on Facebook',href:'http://www.facebook.com/thehumblesupremo'},
				
				basicsep:{type:'separator',label:'Basics',kids:{
				settingstab:{type:'tab',label:"Settings",kids:{
					doUnknown:{type:'checkbox',label:"Process Unrecognized Posts"},
					dontsteal:{type:'checkbox',label:"Don't Process W2W Posts"},
				}},
				basictab:{type:'tab',label:'Currency & XP',kids:{
					currencyblock:{type:'optionblock',label:"Currency:",kids:{
						coins:{type:'checkbox',label:"Bonuses (Coins)"},
						coconuts:{type:'checkbox',label:"Coconuts"},
						currencybundle:{type:'checkbox',label:"Currency Bundle"},
						trowel:{type:'checkbox',label:"Hanging Gardens Trowels"},
					}},
					experienceblock:{type:'optionblock',label:"Experience:",kids:{
						"100xp":{type:'checkbox',label:"XP"},
						aup:{type:'checkbox',label:"Aussie Points"},
						avp:{type:'checkbox',label:"Avalon Points"},
						akp:{type:'checkbox',label:"Avalon Kingdom"},
						cndp:{type:'checkbox',label:"Candy Points"},
						cp:{type:'checkbox',label:"Cheer Points"},
						fp:{type:'checkbox',label:"Fairy Points"},
						gp:{type:'checkbox',label:"Galaxy Points"},
						hhp:{type:'checkbox',label:"Horseman's Hollow Points"},						
						lp:{type:'checkbox',label:"Light Points"},
						mp:{type:'checkbox',label:"Mystical Points"},
						op:{type:'checkbox',label:"Oasis Points"},
						rp:{type:'checkbox',label:"Rainforest Points"},
						rbp:{type:'checkbox',label:"Rainbow Points"},
						rvp:{type:'checkbox',label:"Riviera Points"},
						shp:{type:'checkbox',label:"Shell Points"},
						sp:{type:'checkbox',label:"Spook Points"},
						sbp:{type:'checkbox',label:"Storybook Points"},
						ttp:{type:'checkbox',label:"Toy Town Points"},
						zp:{type:'checkbox',label:"Zen Points"},
					}}
				}},
				
				animalfeedsep:{type:'tab',label:"Animal Feed",kids:{
					feedblock:{type:'optionblock',label:"Feed Types:",kids:{
						animalfeed:{type:'checkbox',label:"Animal Feed"},
						dogtreat:{type:'checkbox',label:"Dog Treat"},
						gophertreat:{type:'checkbox',label:"Gopher Treat"},
						pigchow:{type:'checkbox',label:"Pig Chow"},
						puppykibble:{type:'checkbox',label:"Puppy Kibble"},
						unicornwishes:{type:'checkbox',label:"Unicorn Wishes"},
						flowersmoothie:{type:'checkbox',label:"Flower Smoothies"},
						birdfeed:{type:'checkbox',label:"Bird Feed"},
					}},
					dogtreatblock:{type:'optionblock',label:"Dog Treats:",kids:{
						cupcakedogtreat:{type:'checkbox',label:"Cupcake"},
						sportydogtreat:{type:'checkbox',label:"Sporty"},
						sturdydogtreat:{type:'checkbox',label:"Sturdy"},
						sunshinedogtreat:{type:'checkbox',label:"Sunshine"},
					}},
					felineevolutionblock:{type:'optionblock',label:"Feline Evolution",kids:{
						dryfood:{type:'checkbox',label:"Dry Food"},
						cannedfood:{type:'checkbox',label:"Canned Food"},
						felinetreat:{type:'checkbox',label:"Feline Treat"},
					}}
				}},

				boostssep:{type:'tab',label:"Consumables",kids:{
					boostblock:{type:'optionblock',label:"Consumables:",kids:{
						arborist:{type:'checkbox',label:"Arborist"},
						bingoballs:{type:'checkbox',label:"Bingo Balls"},
						capitalonegift:{type:'checkbox',label:"Capital One Gift"},
						carepackage:{type:'checkbox',label:"Care Package"},
						doubleavatar:{type:'checkbox',label:"Double Avatar"},
						farmhand:{type:'checkbox',label:"Farmhand"},
						fertilizeall:{type:'checkbox',label:"Fertilize All"},
						flowercoins:{type:'checkbox',label:"Flower Coins"},
						fuel:{type:'checkbox',label:"Fuel"},
						instagrow:{type:'checkbox',label:"Instagrow"},
						lovepotion:{type:'checkbox',label:"Love Potion"},
						luckypenn:{type:'checkbox',label:"Lucky Penny"},
						mysterygamedart:{type:'checkbox',label:"Mystery Game Dart"},
						mysterygift:{type:'checkbox',label:"Mystery Gift"},
						raffleticket:{type:'checkbox',label:"Raffle Ticket"},
						specialdelivery:{type:'checkbox',label:"Special Delivery"},
						timetonic:{type:'checkbox',label:"Time Tonic"},
						turbocharger:{type:'checkbox',label:"Turbo Charger"},
						unwither:{type:'checkbox',label:"Unwither"},
						
					}},

					sampleblock:{type:'optionblock',label:"Crafting Samples (for fuel) By Level:", kids:{
						sample1:{type:'checkbox',label:"1-20"},
						sample2:{type:'checkbox',label:"21-40"},
						sample3:{type:'checkbox',label:"41-80"},
						sample4:{type:'checkbox',label:"80-100"},
						sample5:{type:'checkbox',label:"100+"},
						sample:{type:'checkbox',label:"??"},
					}},					
		
					mysteryblock:{type:'optionblock',label:"Tarot Cards:",kids:{
						tarot_past:{type:'checkbox',label:"Past"},
						tarot_present:{type:'checkbox',label:"Present"},
						tarot_future:{type:'checkbox',label:"Future"},
						tarotcard:{type:'checkbox',label:"Random"},
					}}
				}},

				trufflesep:{type:'tab',label:"Truffles",kids:{
					truffleblock:{type:'optionblock',label:"Truffles",kids:{
						browntruffle:{type:'checkbox',label:"Brown"},
						blacktruffle:{type:'checkbox',label:"Black"},
						whitetruffle:{type:'checkbox',label:"White"},
						goldtruffle:{type:'checkbox',label:"Gold"},
					}}
				}},

				//here we make use of the new function createMenuFromArray
				//we can make whole menu blocks from a single array
				//that function sorts the array by alphabetical order for you
				//and also capitalizes words for better display with the menu

				/*craftsep:{type:'tab',label:"Craft Samples",kids:{
					craftbakeryblock:{type:'optionblock',label:"Bakery:",kids:createMenuFromArray(craftBakery,'sample_')},
					craftspablock:{type:'optionblock',label:"Spa:",kids:createMenuFromArray(craftSpa,'sample_')},
					craftwineryblock:{type:'optionblock',label:"Winery:",kids:createMenuFromArray(craftWinery,'sample_')},
					craftpubblock:{type:'optionblock',label:"Pub:",kids:createMenuFromArray(craftPub,'sample_')},
					craftrestrauntblock:{type:'optionblock',label:"Restraunt",kids:createMenuFromArray(craftRestraunt,'sample_')},
				}},*/
		
				helpsep:{type:'tab',label:"Tasks",kids:{
					helpblock:{type:'optionblock',label:"Participate in:",kids:{
						sendhelp:{type:'checkbox',label:"Barn Raisings & Send Help (SOGO/Quest Items)"},
						bushel_random:{type:'checkbox',label:"Crafting Workshops (random bushel)"},
					}},
					sendall:{type:'checkbox',label:"Send All Requested Items or Select From Below (also does barn raisings)"},
					sendblock:{type:'optionblock',label:"Send Neighbors:",kids:{
						sendmat:{type:'checkbox',label:"Consumables/Materials"},
						sendwishlist:{type:'checkbox',label:"Wishlists"},
						sendfeed:{type:'checkbox',label:"Animal Feed"},
						sendbottle:{type:'checkbox',label:"Bottles"},
						sendbushel:{type:'checkbox',label:"Bushels"},
						sendbasket:{type:'checkbox',label:"Baskets"},
						sendturkey:{type:'checkbox',label:"Turkeys"},
					}},
				}},
				
				avatartab:{type:'tab',label:'Avatars',kids:{
					costumetab:{type:'optionblock',label:"Avatar Costumes:",kids:createMenuFromArray(avatar,"costume_")},
					costume:{type:'checkbox',label:"Unknown Costumes"},
				}},

				}}, //end basics section
				eggsep:{type:'separator',label:"Chicken & Bunny Eggs",kids:{
					eggblock:{type:'optionblock',label:"Mystery Chicken Eggs:",kids:createMenuFromArray(eggTypes,'egg_')},
					eggblock2:{type:'optionblock',label:"Bunny Eggs:",kids:createMenuFromArray(eggTypes2,'egg_')},
				}},
				matsep:{type:'separator',label:"Materials",kids:{
					matbuildtab:{type:'tab',label:"Buildings",kids:{
						matbybuilding:{type:'optionblock',label:'Random Materials by Building: (does not automatically include items in other tab)',kids:createMenuFromArray(buildings,'mat_')},
						}},
					matbuild2tab:{type:'tab',label:"Individual Parts",kids:{
						hlpartblock:{type:'optionblock',label:"Highlight Parts by Farm",hideSelectAll:true,kids:{
						btnhlnone:{type:'button_highlight',label:"CLEAR HIGHLIGHTS",clearfirst:materials},
						btnatlantis:{type:'button_highlight',label:"Atlantis",options:atlantisMaterials},
						btnaustralian:{type:'button_highlight',label:"Australia",options:australianMaterials},
						btnavalon:{type:'button_highlight',label:"Avalon Wilderlife",options:avalonMaterials},
						btnavalonk:{type:'button_highlight',label:"Avalon Kingdom",options:kingdomMaterials},
						btnspace:{type:'button_highlight',label:"Celestial Pastures",options:spaceMaterials},
						btnemeraldvalley:{type:'button_highlight',label:"Emerald Valley",options:emeraldvalleyMaterials},
						btnenchanted:{type:'button_highlight',label:"Enchanted Glen",options:enchantedMaterials},
						btnfairytale:{type:'button_highlight',label:"Fairytale Fields",options:fairytalefieldsMaterials},
						btnrainforest:{type:'button_highlight',label:"Fields of El Dorado",options:rainforestMaterials},
						btnhaunted:{type:'button_highlight',label:"Haunted Hollow",options:hauntedMaterials},
						btnhawaii:{type:'button_highlight',label:"Hawaii",options:hawaiiMaterials},
						btnhollybright:{type:'button_highlight',label:"Holiday Lights",options:hollybrightMaterials},
						btnhorsemanhollow:{type:'button_highlight',label:"Horseman's Hollow",options:horsemanhollowMaterials},
						btnjadefalls:{type:'button_highlight',label:"Jade Falls",options:jadefallsMaterials},
						btnlighthouse:{type:'button_highlight',label:"Lighthouse Cove",options:lighthouseMaterials},
						btnriviera:{type:'button_highlight',label:"Mediterranean Riviera",options:rivieraMaterials},
						btnmistletoelane:{type:'button_highlight',label:"Misteltoe Lane",options:mistletoelaneMaterials},
						btnmystical:{type:'button_highlight',label:"Mystical Groves",options:mysticalMaterials},
						btnoasisgarden:{type:'button_highlight',label:"Oasis Gardens",options:ogMaterials},
						btnsweetacre:{type:'button_highlight',label:"Sweet Acres",options:sweetacreMaterials},
						btnwinter:{type:'button_highlight',label:"Toy Town",options:toytownMaterials},
						btnwinterwon:{type:'button_highlight',label:"Winter Wonderland",options:winterMaterials},
						}},
					hlpartblock2:{type:'optionblock',label:"Highlight Parts by Building",hideSelectAll:true,kids:{	
						btnaviary:{type:'button_highlight',label:"Aviary",options:aviaryMaterials},
						btnanimalspa:{type:'button_highlight',label:"Animal Spa",options:animalspaMaterials},
						btnanimalbillboard:{type:'button_highlight',label:"Animal Billboard",options:animalbillboardMaterials},
						btnaquarium:{type:'button_highlight',label:"Aquarium",options:aquariumMaterials},
						btnarborist:{type:'button_highlight',label:"Arborist Center",options:arboristMaterials},
						btnastral:{type:'button_highlight',label:"Astral Observatory",options:astralMaterials},
						btnbabynursery:{type:'button_highlight',label:"Baby Nursery",options:babynurseryMaterials},
						btnbabyplaypen:{type:'button_highlight',label:"Baby Playpen",options:babyplaypenMaterials},
						btnbeachresort:{type:'button_highlight',label:"Beach Resort",options:beachresortMaterials},
						btnbeehive:{type:'button_highlight',label:"Beehive",options:beehiveMaterials},
						btnbigbarnyard:{type:'button_highlight',label:"Big Barnyard",options:bigbarnyardMaterials},
						btnbigwindmill:{type:'button_highlight',label:"Big Windmill",options:bigwindmillMaterials},
						btnbloombillboard:{type:'button_highlight',label:"Bloom Billboard",options:bloombillboardMaterials},
						btnbloomgarden:{type:'button_highlight',label:"Bloom Garden",options:bloomgardenMaterials},
						btnbonsaigarden:{type:'button_highlight',label:"Bonsai Garden",options:bonsaigardenMaterials},
						btnbumpercar:{type:'button_highlight',label:"Bumper Car",options:bumpercarMaterials},
						btnbunnyhutch:{type:'button_highlight',label:"Bunny Hutch",options:bunnyhutchMaterials},
						btncarnivalfunhouse:{type:'button_highlight',label:"Carnival Funhouse",options:carnivalfunhouseMaterials},
						btnccountryclock:{type:'button_highlight',label:"Country Clock",options:countryclockMaterials},
						btncowpasture:{type:'button_highlight',label:"Cow Pasture",options:cowpastureMaterials},
						btncraftingsilo:{type:'button_highlight',label:"Crafting Silo",options:craftingsiloMaterials},
						btncraftshop:{type:'button_highlight',label:"Craftshop",options:craftshopMaterials},
						btncropbillboard:{type:'button_highlight',label:"Crop Billboard",options:cropbillboardMaterials},
						btncrytalgarden:{type:'button_highlight',label:"Crystal Garden",options:crytalgardenMaterials},
						btndinolab:{type:'button_highlight',label:"Dino Lab",options:dinolabMaterials},
						btndoghouse:{type:'button_highlight',label:"Doghouses",options:doghouseMaterials},
						btndragon:{type:'button_highlight',label:"Dragon Lair",options:dragonMaterials},
						btndreamdeer:{type:'button_highlight',label:"Dream Deer Woods",options:dreamdeerMaterials},
						btndreamnursery:{type:'button_highlight',label:"Dream Nursery",options:dreamnurseryMaterials},
						btnduckpond:{type:'button_highlight',label:"Duck Pond",options:duckpondMaterials},
						btnduckulacryptic:{type:'button_highlight',label:"Duckula's Cryptic Castle",options:duckulacrypticMaterials},
						btnduckuladark:{type:'button_highlight',label:"Duckula's Dark Tower",options:duckuladarkMaterials},
						btnextinctanimal:{type:'button_highlight',label:"Extinct Animal Zoo",options:extinctanimalMaterials},
						btnfairyflower:{type:'button_highlight',label:"Fairy Flower",options:fairyflower},
						btnfarmhand:{type:'button_highlight',label:"Farmhand Center",options:farmhandMaterials},
						btnfeedmill:{type:'button_highlight',label:"Feed Mill",options:feedmillMaterials},
						btnferriswheel:{type:'button_highlight',label:"Ferris Wheel",options:ferriswheelMaterials},
						btnfishinghole:{type:'button_highlight',label:"Fishing Hole",options:fishingholeMaterials},
						btnfloatingwaterfall:{type:'button_highlight',label:"Floating Waterfall",options:floatingwaterfallMaterials},
						btnfountaingeyser:{type:'button_highlight',label:"Fountain Geyser",options:fountaingeyserMaterials},
						btngarage:{type:'button_highlight',label:"Garage",options:garageMaterials},
						btngardenamph:{type:'button_highlight',label:"Garden Amphitheater",options:gardenamphMaterials},
						btngaspump:{type:'button_highlight',label:"Gas Pump",options:gaspumpMaterials},
						btngianttreehouse:{type:'button_highlight',label:"Giant Tree House",options:gianttreehouseMaterials},
						btngiftingtree:{type:'button_highlight',label:"Gifting Tree",options:giftingtreeMaterials},
						btngnomegarden:{type:'button_highlight',label:"Gnome Garden",options:gnomegardenMaterials},
						btngrove:{type:'button_highlight',label:"Grove",options:groveMaterials},
						btnharmonygarden:{type:'button_highlight',label:"Harmony Garden",options:harmonygardenMaterials},
						btnhorsegall:{type:'button_highlight',label:"Horse Hall",options:horsegallMaterials},
						btnhorsepaddock:{type:'button_highlight',label:"Horse Paddock",options:horsepaddockMaterials},
						btnhotspring:{type:'button_highlight',label:"Hot Spring",options:hotspringMaterials},
						btnicecreamparlor:{type:'button_highlight',label:"Ice Cream Parlor",options:icecreamparlorMaterials},
						btnirisrainbow:{type:'button_highlight',label:"Iris Rainbow Pond",options:irisrainbowMaterials},
						btnlivestockpen:{type:'button_highlight',label:"Livestock Pen",options:livestockpenMaterials},
						btnmagicbiodome:{type:'button_highlight',label:"Magic Biodome",options:magicbiodomeMaterials},
						btnorchard:{type:'button_highlight',label:"Orchards",options:orchardMaterials},
						btnpegasuspen:{type:'button_highlight',label:"Pegasus Pen",options:pegasuspenMaterials},
						btnpetrun:{type:'button_highlight',label:"Pet Run",options:petrunMaterials},
						btnrecipebillboard:{type:'button_highlight',label:"Recipe Billboard",options:recipebillboardMaterials},
						btnsallyseed:{type:'button_highlight',label:"Sally's Seed Shop",options:sallyseedMaterials},
						btnseasonal:{type:'button_highlight',label:"Seasonal Items",options:seasonalMaterials},
						btnseedlingnursery:{type:'button_highlight',label:"Seedling Nursery",options:seedlingnurseryMaterials},
						btnsummerpoolside:{type:'button_highlight',label:"Summer Pool House",options:summerpoolsideMaterials},
						btnsunriseforest:{type:'button_highlight',label:"Sunrise Forest",options:sunriseforestMaterials},
						btnswimmingpond:{type:'button_highlight',label:"Swimming Pond",options:swimmingpondMaterials},
						btntreebillboard:{type:'button_highlight',label:"Tree Billboard",options:treebillboardMaterials},
						btntreeoflife:{type:'button_highlight',label:"Tree of Life",options:treeoflifeMaterials},
						btntreeoflove:{type:'button_highlight',label:"Tree of Love",options:treeofloveMaterials},
						btnturtlepen:{type:'button_highlight',label:"Turtle Pen",options:turtlepenMaterials},
						btnunicornisland:{type:'button_highlight',label:"Unicorn Island",options:unicornislandMaterials},
						btnwaterwheel:{type:'button_highlight',label:"Water Wheel",options:waterwheelMaterials},
						btnwildlifelodge:{type:'button_highlight',label:"Wildlife Lodge",options:wildlifelodgeMaterials},
						btnwildlifepen:{type:'button_highlight',label:"Wildlife Pen",options:wildlifepenMaterials},
						btnwishingfountain:{type:'button_highlight',label:"Wishing Fountain",options:wishingfountainMaterials},
						btnzoo:{type:'button_highlight',label:"Zoo",options:zooMaterials},
					}},
						
						matBlock:{type:'optionblock',label:"Standard:",kids:createMenuFromArray(standardMaterials,"")},
						}},
		
				}}, //end materials section
				

				orchardsep:{type:'separator',label:"Trees",kids:{
					mysteryseedling:{type:'checkbox',label:"Mystery Seedlings"},
					wateringcan:{type:'checkbox',label:"Watering Cans"},
					tree:{type:'checkbox',label:"Unknown Trees"},
					treestab1:{type:'tab',label:"Standard Trees",kids:{
						trees:{type:'optionblock',label:"Normal:",kids:createMenuFromArray(treeTypes,'tree_')},
					}},
					treestab2:{type:'tab',label:"Giant Trees",kids:{
						treeslg:{type:'optionblock',label:"Giant:",kids:createMenuFromArray(treeTypes2,'tree_giant')},
					}},
					treestab3:{type:'tab',label:"Bonsai Trees",kids:{
						treesbnsi:{type:'optionblock',label:"Bonsai:",kids:createMenuFromArray(treeTypes3,'tree_bonsai')},
						tree_bonsai:{type:'checkbox',label:"Unknown Bonsais"},
					}},
		//			treestab4:{type:'tab',label:"Level 1 Trees",kids:{
		//				treeslv:{type:'optionblock',label:"Level 1:",kids:createMenuFromArray(treeTypes4,'tree_')},
		//			}},
					
				}},
				votingsep:{type:'separator',label:"VOTING EVENTS - Just the two options for now",kids:{
					votenow:{type:'checkbox',label:"Vote Now"},
					claimprize:{type:'checkbox',label:"Claim Prize"},


				}},
				bloomsep:{type:'separator',label:"Bloom Garden",kids:{
					mysterybulb:{type:'checkbox',label:"Mystery Bulbs"},
					flowerfood:{type:'checkbox',label:"Flower Food"},
					bloomtab1:{type:'tab',label:"Blooms:",kids:{
						blooms:{type:'optionblock',label:"Flowers:",kids:createMenuFromArray(bulbTypes,'bulb_')},
						bulb_unknown:{type:'checkbox',label:"Unknown Bloom"},
					}},
				}},
				
				colsep:{type:'separator',label:"Collectibles",kids:{
					colBlock1:{type:'optionblock',label:"Berries:",kids:createMenuFromArray(colBerries,"col_")},
					colBlock2:{type:'optionblock',label:"Citrus:",kids:createMenuFromArray(colCitrus,"col_")},
					colBlock3:{type:'optionblock',label:"Cows:",kids:createMenuFromArray(colCows,"col_")},
					colBlock4:{type:'optionblock',label:"Flowers:",kids:createMenuFromArray(colFlowers,"col_")},				
					colBlock5:{type:'optionblock',label:"Grains:",kids:createMenuFromArray(colGrains,"col_")},				
					colBlock6:{type:'optionblock',label:"Squash:",kids:createMenuFromArray(colSquash,"col_")},				
					colBlockX:{type:'optionblock',label:"Unknown Collectibles by Collection:",kids:createMenuFromArray(colGroups,"colX_")},
				}},
				
				decorationssep:{type:'separator',label:"Decorations",kids:{
					decorationBlock1:{type:'optionblock',label:"Other:",kids:createMenuFromArray(decorOther,"")},
					}},

				adoptsep:{type:'separator',label:"Animals",kids:{
				bovinetab:{type:'tab',label:"Cows & Calves",kids:{
					cowBlock:{type:'optionblock',label:"Cows:",kids:createMenuFromArray(cowTypes,"adopt_cow")},
					adopt_cow:{type:'checkbox',label:"Unknown Cows"},
					bullblock:{type:'optionblock',label:"Bulls:",kids:{
					adopt_flowerbull:{type:'checkbox',label:"Flower Bull"},
					adopt_atlanteanbull:{type:'checkbox',label:"Atlantean Bull"},
					adopt_bull:{type:'checkbox',label:"Unknown Bulls"},
					}},
					calfBlock:{type:'optionblock',label:"Calves:",kids:createMenuFromArray(calfTypes,"adopt_calf")},
					bullBlock:{type:'optionblock',label:"Bull Calves:",kids:createMenuFromArray(bullTypes,"adopt_calf")},
					oxenBlock:{type:'optionblock',label:"Baby Oxen:",kids:createMenuFromArray(oxenTypes,"adopt_calf")},
					adopt_calf:{type:'checkbox',label:"Unknown Calves"},
					}},
				horsetab:{type:'tab',label:"Horses & Foals",kids:{
					horseBlock:{type:'optionblock',label:"Horses, Unicorns, Etc.:",kids:createMenuFromArray(horseTypes,"adopt_horse")},
					adopt_horse:{type:'checkbox',label:"Unknown Horses"},
					foalBlock:{type:'optionblock',label:"Foals:",kids:createMenuFromArray(foalTypes,"adopt_foal")},
					assBlock:{type:'optionblock',label:"Donkey Foals:",kids:createMenuFromArray(assTypes,"adopt_foal")},
					adopt_foal:{type:'checkbox',label:"Unknown Foals"},
					}},
				fawntab:{type:'tab',label:"Fawns",kids:{
					fawnBlock:{type:'optionblock',label:"Fawns:",kids:createMenuFromArray(fawnTypes,"adopt_fawn")},
					adopt_fawn:{type:'checkbox',label:"Unknown Fawn"},
					}},
				playpentab:{type:'tab',label:"Baby Playpen Animals",kids:{
					babyBlock:{type:'optionblock',label:"Babies:",kids:createMenuFromArray(babyAnimals,"adopt_")},
					}},
				chickentab:{type:'tab',label:"Birds of a Feather",kids:{
					chickenBlock:{type:'optionblock',label:"Chickens",kids:createMenuFromArray(chickenTypes,"adopt_chicken")},
					adopt_chicken:{type:'checkbox',label:"Unkown Chickens"},
					duckblock:{type:'optionblock',label:"Ducks",kids:createMenuFromArray(duckTypes,"adopt_duck")},
					adopt_duck:{type:'checkbox',label:"Unknown Ducks"},
					ducklingblock:{type:'optionblock',label:"Ducklings",kids:createMenuFromArray(ducklingTypes,"adopt_duckling")},
					adopt_duckling:{type:'checkbox',label:"Unknown Ducklings"},
					birdblock:{type:'optionblock',label:"Other Birds",kids:createMenuFromArray(birdTypes)},
					}},
				breedingtab:{type:'tab',label:"Breeding Sheep/Pig Pen",kids:{
					adopt_piglet:{type:'checkbox',label:"Pig Pen Baby - Indeterminate Sex"},
					adopt_lamb:{type:'checkbox',label:"Sheep Pen Lamb - Indeterminate Sex"},
					adopt_lambram:{type:'checkbox',label:"Sheep Pen Lamb - Known Male"},
					adopt_lambewe:{type:'checkbox',label:"Sheep Pen Lamb - Known Female"},
					adopt_babyturtle:{type:'checkbox',label:"Turtle Pen Baby"},
					}},
				mysterybabytab:{type:'tab',label:"Mystery Babies",kids:{
					wildlifeblock:{type:'optionblock',label:"Wildlife Habitat:",kids:{
						wildlife_common:{type:'checkbox',label:"Common"},
						wildlife_rare:{type:'checkbox',label:"Rare"},
					}},
					petrunblock:{type:'optionblock',label:"Pet Run:",kids:{
						petrun_common:{type:'checkbox',label:"Common"},
						petrun_rare:{type:'checkbox',label:"Rare"},
					}},
					zooblock:{type:'optionblock',label:"Zoo:",kids:{
						zoo_common:{type:'checkbox',label:"Common"},
						zoo_rare:{type:'checkbox',label:"Rare"},
					}},
					aviaryblock:{type:'optionblock',label:"Aviary:",kids:{
						aviary_common:{type:'checkbox',label:"Common"},
						aviary_rare:{type:'checkbox',label:"Rare"},
					}},
					livestockblock:{type:'optionblock',label:"Livestock Pen:",kids:{
						livestock_common:{type:'checkbox',label:"Common"},
						livestock_rare:{type:'checkbox',label:"Rare"},
					}},
					winterpenblock:{type:'optionblock',label:"Winter Animal Pen:",kids:{
						arctic_common:{type:'checkbox',label:"Common"},
						arctic_rare:{type:'checkbox',label:"Rare"},
					}},
					aquariumblock:{type:'optionblock',label:"Aquarium:",kids:{
						sea_common:{type:'checkbox',label:"Common"},
						sea_rare:{type:'checkbox',label:"Rare"},
					}},
					jadeblock:{type:'optionblock',label:"Jade Habitat:",kids:{
						jade_common:{type:'checkbox',label:"Common"},
						jade_rare:{type:'checkbox',label:"Rare"},
					}},
					jade1block:{type:'optionblock',label:"Jade Aquarium:",kids:{
						ocean_common:{type:'checkbox',label:"Common"},
						ocean_rare:{type:'checkbox',label:"Rare"},
					}},
					
					unknown_baby:{type:'checkbox',label:"Unknown Babies"},
				}},
				animalstab:{type:'tab',label:"Animals",kids:{
					bearBlock:{type:'optionblock',label:"Bears:",kids:createMenuFromArray(bearTypes)},
					
					bunny2Block:{type:'optionblock',label:"Bunnies:",kids:{
						adopt_bluelilybunny:{type:'checkbox',label:"Blue Lily"},
						adopt_goldfloppybunny:{type:'checkbox',label:"Gold Floppy"},
						adopt_pinkloppybunny:{type:'checkbox',label:"Pink Loppy"},
						adopt_purplepuffybunny:{type:'checkbox',label:"Purple Puffy"},
						adopt_whitedaisybunny:{type:'checkbox',label:"White Daisy"},
						adopt_yellowchubbybunny:{type:'checkbox',label:"Yellow Chubby"},
					}},
					
					catBlock:{type:'optionblock',label:"Cats:",kids:createMenuFromArray(catTypes,"adopt_cat")},
					adopt_cat:{type:'checkbox',label:"Unknown Cat"},
					
					dinoBlock:{type:'optionblock',label:"Dinos:",kids:createMenuFromArray(catTypes,"adopt_dino")},
					adopt_dino:{type:'checkbox',label:"Unknown Dinos"},
					
					dogBlock:{type:'optionblock',label:"Canines:",kids:createMenuFromArray(dogTypes)},
					
					dragonBlock:{type:'optionblock',label:"Dragons:",kids:createMenuFromArray(dragonTypes,"adopt_dragon")},
					adopt_dragon:{type:'checkbox',label:"Unknown Dragon"},
					
					elephantBlock:{type:'optionblock',label:"Elephants/Thick Skinned:",kids:createMenuFromArray(elephantTypes)},
					
					goatBlock:{type:'optionblock',label:"Goats:",kids:createMenuFromArray(goatTypes,"adopt_goat")},
					adopt_goat:{type:'checkbox',label:"Unknown Goats"},
					
					hoovedBlock:{type:'optionblock',label:"Hooved Animals:",kids:createMenuFromArray(hoovedTypes)},
					
					pigBlock:{type:'optionblock',label:"Pigs",kids:createMenuFromArray(pigTypes,"adopt_pig")},
					adopt_pig:{type:'checkbox',label:"Unknown Pigs"},
					
					rabbitBlock:{type:'optionblock',label:"Rabbits:",kids:createMenuFromArray(rabbitTypes,"adopt_rabbit")},
					adopt_rabbit:{type:'checkbox',label:"Unknown Rabbit"},
					
					sheepBlock:{type:'optionblock',label:"Sheep",kids:createMenuFromArray(sheepTypes,"adopt_sheep")},
					adopt_sheep:{type:'checkbox',label:"Unknown Sheep"},
					
					turtleBlock:{type:'optionblock',label:"Turtles:",kids:createMenuFromArray(turtleTypes)},
					
					wateranimalBlock:{type:'optionblock',label:"Water Animals:",kids:createMenuFromArray(wateranimalTypes)},
					
					miscanimalblock:{type:'optionblock',label:"Misc Animals:",kids:createMenuFromArray(otherAnimals,"adopt_")},
					}},
					}},
					
				
				othersep:{type:'separator',label:"Scales, DNA, etc.",kids:{
					dinoblock:{type:'optionblock',label:"Dino DNA Strand:",kids:createMenuFromArray(dnaTypes,"dna_")},
					gemblock:{type:'optionblock',label:"Gems:",kids:createMenuFromArray(gemTypes,"gem_")},
					scaleblock:{type:'optionblock',label:"Dragon Scales:",kids:createMenuFromArray(scaleTypes,"scale_")},
					serumblock:{type:'optionblock',label:"Monster Serum:",kids:createMenuFromArray(serumTypes,"serum_")},
					cuttingblock:{type:'optionblock',label:"Bonsai Cuttings:",kids:createMenuFromArray(cuttingTypes,"cutting_")},
					spiritblock:{type:'optionblock',label:"Animal Spirit:",kids:createMenuFromArray(spiritTypes,"spirit_")},
					fossilblock:{type:'optionblock',label:"Fossils:",kids:createMenuFromArray(fossilTypes,"fossil_")},
					pixieblock:{type:'optionblock',label:"Pixie Dust:",kids:createMenuFromArray(pixieTypes,"pixie_")},
					fishscaleblock:{type:'optionblock',label:"Fish Scales:",kids:createMenuFromArray(fishscaleTypes,"fishscale_")},
					horseshoeblock:{type:'optionblock',label:"Horseshoes:",kids:createMenuFromArray(horseshoeTypes,"horseshoe_")},
					cloudblock:{type:'optionblock',label:"Clouds:",kids:createMenuFromArray(cloudTypes,"cloud_")},
					wildflowerblock:{type:'optionblock',label:"Wildflowers:",kids:createMenuFromArray(wildflowerTypes,"wildflower_")},
				
				}}, //end adoption section

				
				farmcropssep:{type:'separator',label:"Seeds, Bushels & Crafting",kids:{
				seedsep:{type:'tab',label:"Seeds",kids:{
					pollinated:{type:'checkbox',label:"Unknown Seeds"},
					seedblock2:{type:'optionblock',label:"Seed Packages:",kids:createMenuFromArray(seedTypes,"seeds_")},
					seedblock1:{type:'optionblock',label:"Pollinated Seeds:",kids:createMenuFromArray(fruitTypes,"polseeds_")},
					
					
				}},

				bushelsep:{type:'tab',label:"Bushels",kids:{
				
					hlbushelblock:{type:'optionblock',label:"Highlight Bushels By Crafting Cottage",hideSelectAll:true,kids:{
						btnhlnone:{type:'button_highlight',label:"CLEAR HIGHLIGHTS",clearfirst:allCraftBushels},
						btnbakery:{type:'button_highlight',label:"Bakery",options:bakeryBushels},
						btnwinery:{type:'button_highlight',label:"Winery",options:wineryBushels},
						btnspa:{type:'button_highlight',label:"Spa",options:spaBushels},
						btnpub:{type:'button_highlight',label:"Pub",options:pubBushels},
						btnrestraunt:{type:'button_highlight',label:"Restraunt",options:restrauntBushels},
						btncraftshop:{type:'button_highlight',label:"Craftshop",options:craftshopBushels},
						btncraftshop2:{type:'button_highlight',label:"Craftshop - LIMTED EDITION RECIPES",options:craftshopleBushels},
						btnsweetshoppe:{type:'button_highlight',label:"Sweet Shoppe",options:sweetshoppeBushels},
						btntikibar:{type:'button_highlight',label:"Tiki Bar",options:tikibarBushels},
						btnteagarden:{type:'button_highlight',label:"Tea Garden",options:teagardenBushels},
						btnpotionshop:{type:'button_highlight',label:"Potion Shop",options:potionshopBushels},
						btnpatisserie:{type:'button_highlight',label:"Patisserie",options:patisserieBushels},
						btncoralcafe:{type:'button_highlight',label:"Coral Cafe",options:coralcafeBushels},
						btnaussiewinery:{type:'button_highlight',label:"Aussie Winery",options:aussiewineryBushels},
						btncrystalcottage:{type:'button_highlight',label:"Crystal Cottage",options:crystalcottageBushels},
						btncrystalcottage:{type:'button_highlight',label:"Sugar Shack",options:sugarshackBushels},
						btnalchemistshop:{type:'button_highlight',label:"Alchemist Shop",options:alchemistshopBushels},
						btnsparklecafe:{type:'button_highlight',label:"Sparkle Cafe",options:sparklecafeBushels},
						btnherbalhut:{type:'button_highlight',label:"Herbal Hut",options:herbalhutBushels},
						btnporcelainshop:{type:'button_highlight',label:"Porcelain Shop",options:porcelainshopBushels},
						btnblueseacafe:{type:'button_highlight',label:"Blue Sea Cafe",options:blueseacafeBushels},
						btncairoboutique:{type:'button_highlight',label:"Cairo Botique",options:cairoboutiqueBushels},
						btnfairyforum:{type:'button_highlight',label:"Fairy Forum",options:fairyforumBushels},
						btnwitcherhut:{type:'button_highlight',label:"Witcher Hut",options:witcherhutBushels},
						btnfoodvan:{type:'button_highlight',label:"Food Van",options:foodvanBushels},
						btnglassblower:{type:'button_highlight',label:"Glass Blower",options:glassblowerBushels},
						btnpotionsworkshop:{type:'button_highlight',label:"Potions Workshop - NEW FARM",options:potionsworkshopBushels},
					}},
					bushel:{type:'checkbox',label:"Unknown Bushels"},
					bushelblock1:{type:'optionblock',label:"All Bushels:",kids:createMenuFromArray(fruitTypes,"bushel_")},
					
					}},
					bushel2sep:{type:'tab',label:"Craftshop Baskets",kids:{
					bushelblock2:{type:'optionblock',label:"Craftshop Baskets:",kids:createMenuFromArray(basketTypes,"bushel_")},
					
				}},

				preordersep:{type:'tab',label:"Order Crops", kids:{
					preorderblock1:{type:'optionblock',label:"All Crops:",kids:createMenuFromArray(fruitTypes,"order_")},
					order:{type:'checkbox',label:"Order Unknown Crops"},
				}},
				
				jointeamsep:{type:'tab',label:"Join Teams",kids:{
					jointeamblock:{type:'optionblock',label:"Join Teams:",kids:createMenuFromArray(craftShop,"join")},
					join:{type:'checkbox',label:"Unknown Crafting Teams"},
				}},
				
				}} //end farms separator

				}} //end farmville section
			} //end menu
		};

		//this converts the menu above to a text string
		//it erases all functions, preventing sidekicks from making destructive changes to the WM script
		//it also provides an early error checking stage before the menu is attached to the WM script
		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app'+thisApp,'data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);

		//cleanup
		doorMark=null;calfTypes=null;foalTypes=null;horseTypes=null;bushelTypes=null;flowerTypes=null;
		treeTypes=null;craftPub=null;craftWinery=null;craftSpa=null;craftBakery=null;craftTypes=null;
		standardMaterials=null;otherConsumables=null;specialMaterials=null;seafoodTypes=null;
		craftingMaterials=null;materials=null;colBerries=null;colCitrus=null;colCows=null;colFlowers=null;
		colGrains=null;colSquash=null;colTypes=null;colGroups=null;questItems=null;duckTypes=null;
		pigTypes=null;sheepTypes=null;cowTypes=null;decorTypes=null;eggTypes=null;otherAnimals=null;
		otherWords=null;buildings=null;attachment=null;attString=null;seedTypes=null;animalCatchalls=null;
		craftRestraunt=null;craftSweetShoppe=null;eggTypes2=null;babyAnimals=null;allCalves=null;
		assTypes=null;allFoals=null;specialEvents=null;
		
		t1=null;t2=null;t3=null;t4=null;t5=null;t6=null;t7=null;t8=null;t10=null;t11=null;
		t12=null;t13=null;t14=null;t15=null;t16=null;t17=null;t18=null;t19=null;t20=null;t21=null;
		t22=null;t23=null;t27=null;t29=null;t30=null;t31=null;t32=null;t33=null;t34=null;t35=null;
		t36=null;t37=null;t38=null;t39=null;t40=null;t41=null;t42=null;t43=null;
	};

	//a function similar to Facebook Auto Publisher for some FV reward pages autopub does not see
	var waitedForVote=false;
	function sendWishGift(){
		//console.log("sendWishGift");
		//color the panel so we know where the script is right now
		//document.body.style.backgroundColor=["blue","red","white","green","pink","lime","orange"].pickRandom();

		var node = selectSingleNode(".//input[(@name='sendit') and not(contains(@class,'noHammer'))]");
		
		
		//new stuff for suggestion-based voting
		var vote=-1;
		//alert("waited for vote: "+waitedForVote);
		try{
			var suggestedVote=window.location.hash.getUrlParam("suggestedVote");
			if (suggestedVote==null) suggestedVote=window.location.href.getUrlParam("suggestedVote");

			//alert("suggested vote "+suggestedVote);
			
			vote=(suggestedVote=="1")?1:
			(suggestedVote=="0")?0:-1;
			
			//alert(vote);
			
			if (vote<0 && waitedForVote==false) {
				//alert("wait");
				//waiting for iframe scripts to work, this function will refire soon...
				waitedForVote=true;
				window.setTimeout(sendWishGift,1000);
				return;
			}
			//alert("suggestedVote: "+vote);
		} catch (e){
			//cannot read own window for some reason
			//alert(e);
		}
		if (vote<0) vote=Math.floor(Math.random()*2);
		//end new voting stuff

		var html = document.documentElement.innerHTML;
		var isSendBushel = html.find("AskForBushels");

		//check for image button gift page
		if (!node) {
			var itemID = location.search.getUrlParam("selectedGift");
			//alert(itemID);
			if (itemID) {
				//check that selectedGift is not a comma delimited list. If it is, separate and choose one
				if (itemID.find(",")) itemID = itemID.split(",").pickRandom();
				else if (itemID.find("%2C")) itemID = itemID.split("%2C").pickRandom();
				//alert(itemID);
			}
			node = $("add_"+itemID);
		}

		//check for radio button gift page
		if (!node) {
			//check for gift page buttons
			var nodes=selectNodes(".//*[contains(@class,'giftLi')]//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'request_form_submit')]");
			if (nodes.snapshotLength) {
				//pick one randomly
				node = nodes.snapshotItem( Math.floor(Math.random()*nodes.snapshotLength) );
				node.style.backgroundColor="green";
			}
		}

		//check for single send buttons for pages like send bushel
		if (!node) node=selectSingleNode(".//input[contains(@class,'request_form_submit') and not(contains(@class,'noHammer'))]");
		if (!node) node=selectSingleNode(".//div[contains(@class,'gift_form_buttons')]/a[contains(@class,'giftformsubmit') and not(contains(@class,'noHammer'))]");
		if (!node) node=selectSingleNode(".//div[@class='rfloat']/input[(@name='try_again_button') and not(contains(@class,'noHammer'))]");
		if (!node) node=selectSingleNode(".//input[(@name='acceptReward') and not(contains(@class,'noHammer'))]");
		if (!node) node=selectSingleNode(".//input[(@class='input"+vote+"submit') and not(contains(@class,'noHammer'))]");
		if (!node) node=selectSingleNode(".//input[(@class='inputyessubmit') and not(contains(@class,'noHammer'))]");
		if (!node) node=selectSingleNode(".//div[(@id='vote"+vote+"') and not(contains(@class,'noHammer'))]");

		//if we found a useful button or element to click, click it. 
		//THEN if we expect another button or element to appear on the same window, wait and click that too.
		if (node) {setTimeout(function(){
			if (isSendBushel) {
				var hwnd = window.top;
				hwnd.setTimeout(function(){sendMessage('status=1',hwnd);},2000);
			}
			click(node);
		},500); } else {
			//check for stuff that denotes being done
			node=selectSingleNode(".//input[@class='playButton' and @name='playFarm']");
			if (node) {
				sendMessage('status=1');
			}
		}
		window.setTimeout(sendWishGift,1000); //keep looking
		
	};
	
	//main script function
	function run(){
		//alert("run");
		//console.log("run");
		var href=window.location.href;
		var text = document.documentElement.textContent;
		var thisLoc; (thisLoc=(location.protocol+"//"+location.host+location.pathname).split("/")).pop(); thisLoc=thisLoc.join("/");
		
		//check for apprequest popup
		if (href.contains('apprequests')) {
			var node = selectSingleNode(".//input[@name='ok_clicked']");
			if (node) click (node);
			return;
		}
		
		//check for preconstructed facebook request items
		else if (href.contains("/plugins/serverfbml.php")) {
			//validate correct app id
			var html = document.documentElement.innerHTML;
			var isSendBushel = html.find("AskForBushels");
			if (html.contains("app_id=102452128776") || html.contains("app_content_102452128776")){
				if (text.find("Sorry, you can't give this user any more gifts") || text.find("Sorry, you can't send this gift")) {sendMessage('status=-1');return;}
				var node = selectSingleNode(".//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'request_form_submit')]");
				if (node) {
					//make sure this node is not on the neighbors.php form
					var avoidForm = selectSingleNode(".//ancestor::form[contains(@action,'neighbors.php') or contains(@action,'gifts.php?ref=neighbors')]",{node:node});
					if (!avoidForm) {
						click (node);
						window.setTimeout(sendWishGift,1000); //there is another button named sendit here
					}
				}
			}
			return;
		}

		//check for need to dock to WM Host
		//alert(href);
		if (href.startsWith('https://www.facebook.com/') && !(href.contains("/plugins/serverfbml.php")) ) {
			//alert("trying to dock");
			dock();
			return;
		}

		//if not on a dockable page, start searching for reward page types

		else if (text.find("Error while loading page from")) {
			sendMessage('status=-5');
			//window.location.reload();
			return;
		}
		
		else if (href.startsWith(thisLoc+'/wishlist_give.php') ){
			//send wish list item
			if (text.find("Sorry, you can't give this user any more gifts") || text.find("Sorry, you can't send this gift")) {sendMessage('status=-1');return;}
			if (selectSingleNode(".//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'request_form_submit')]")) window.setTimeout(sendWishGift,1000); //buttons no longer here
			return;
		}

		else if (href.startsWith(thisLoc+'/gifts_send.php')){
			//comes after sending wish gift
			//alert(href);
			window.setTimeout(function(){sendMessage('status=1');},5000);
			return;
		}

		else if (href.startsWith(thisLoc+'/reward_gift_send.php') ){
			//try to send a gift with button
			window.setTimeout(sendWishGift,1000);
			//sendMessage('status=1'); <---dont want to do that here
			return;
		}
		
		else if (href.startsWith(thisLoc+'/index.php') || href.startsWith(thisLoc+'/?' )){
			//alert(href);
			sendMessage('status=1');
			return;
		}

		else if ( href.startsWith(thisLoc+'/gifts.php') && href.contains('giftRecipient=') ){
			//taken to specific gift sending page
			var node; 
			
			//color the panel so we know where the script is right now
			//document.body.style.backgroundColor=["blue","red","white","green","pink","lime","orange"].pickRandom();

			//check for limits
			if (text.find("you can't give this user any more gifts")) {sendMessage('status=-1');}

			//check for normal send buttons
			else if (node=selectSingleNode(".//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'request_form_submit')]")) window.setTimeout(sendWishGift,1000);

			//check for radio button gift page
			else if (node=selectSingleNode(".//li[contains(@class,'giftLi')]")) window.setTimeout(sendWishGift,1000);

			//check for image button gift page
			else if (node=selectSingleNode(".//iframe[contains(@src,'farmville.com/gifts.php')]")){
				//break it out of iframes and add the gift names to the url
				var itemID = location.search.getUrlParam('selectedGift'); //copy the gift names
				location.href = node.src+"&selectedGift="+itemID; //redirect and append the gift names
			}

			//default fail
			//else {sendMessage('status=-1');} 
			//dont return from here due to new iframes
			//instead just let the thing open iframes and if it dont work just let it time out

			return;
		}
		
		else if (href.contains('redirecting_zy_session_expired')){
			//alert(href);
			sendMessage('status=1'); 
			return;
		}
		
		else if (href.startsWith(thisLoc+'/gifts.php') ){
			//taken to generic gift sending page with no useful recipient or gift names
			sendMessage('status=-1');
			//OR write in code to select some random gift
			return;
		}

		else if (href.startsWith(thisLoc+'/trading_post_order_place.php') ){
			//taken to place order page
			if (text.find("Congratulations! You've placed a")) sendMessage('status=1');
			else if (text.find("You've reached your limit for ordering from this user")) sendMessage('status=-1');
			else if (text.find("Sorry Farmer! You don't have an order pending with this friend")) sendMessage('status=-1');
			return;
		}

		else if (href.startsWith(thisLoc+'/reward.php') 
			&& (text.find("Would you like a ") || text.find("in your Dino Lab") || text.find("Would you like an ") || text.find("got yourself a Flower Coin!")) 
			&& (text.find("Bushel") || text.find("Basket") || text.find("DNA") || text.find("Flower Coin"))){
			//bushel acceptance stage 1
			//or dino dnd stage 1
			//or flower coin stage 1
			//alert('path set');
			window.setTimeout(sendWishGift,1000);
			return;
		}
		
		/*else if ((href.startsWith(thisLoc+'/performfriendvote.php')||href.startsWith(thisLoc+'//performfriendvote.php')) && (text.match(
				/(naughty or nice|night owl|early( bird)?|plans rigorously|lives spontaneously|lounging|exploring|fashion diva|functional dresser|casually late|stays in|ventures out)/gi
			))){
			window.setTimeout(sendWishGift,1000);
			return;
		}*/

	//	else if ((href.startsWith(thisLoc+'/performfriendvote.php')||href.startsWith(thisLoc+'//performfriendvote.php')) && ($("vote1")||$("vote0"))){
		else if (href.contains('performfriendvote.php') || href.contains('photo_vote')){ //&& ($("vote1")||$("vote0"))
			window.setTimeout(sendWishGift,1000);
			return;
		}
		//else if (href.find('reward.php') ){
		else if (href.startsWith(thisLoc+'/reward.php') || href.contains('reward.php')){
			//document.body.style.backgroundColor=["red","green","blue"].pickRandom();
		
		//*************************************************************************************
		//***** this section must be tailored to fit your specific needs                  *****
		//***** below is a list of searches for text pertaining to various messages       *****
		//***** the list below is not generic and targets Empires and Allies specifically *****
		//***** you will need to find the specific texts for the game you selected        *****
		//*************************************************************************************
		//***** The WM script can recieve and act on the following statusCode values:     *****
		/*
			  1: Acceptance, no stipulations
			  0: Unknown return, use this only if your script encounters unplanned results and can still communicate a result
			 -1: Failure, generic
			 -2: Failure, none left
			 -3: Over Gift Limit failure
			 -4: Over Gift Limit, still allows sending gift, marked as accepted
			 -5: Identified server error
			 -6: Already got, failure marked as accepted
			 -7: Identified server down for repairs
			 -8: Problem finding a required action link
			 -9: reserved for WM functions
			-10: reserved for WM functions
			-11: Identified as expired
			-12: Post source is not a neighbor and neighbor status is required. Future WM version will auto-add neighbor if possible.

			//additional codes may now exist, please check the wiki support site for information
		*/
		//*************************************************************************************
		
			//all out
			if (text.match(
				/(enough (votes|help)|there aren't any more items|been (claimed|picked up)|given out all the free samples they had|are('nt)? (no|any) more|has already received|fresh out of|someone already|isn't yours|got here too late|folks have already|already has enough|already has all the)/gi
			)) sendMessage('status=-2');

			//over limit
			else if (text.match(
				/(you've already got|already have a stallion)/gi
			)) sendMessage('status=-4');
			
			//expired
			else if (text.match(
				/((event|promotion) has (expired|ended)|no longer needs|missed your oppor|expired)/gi
			)) sendMessage('status=-11');

			//requirements not met
			else if (text.match(
				/(You must be level|switch farms and try|need to finish building|don't have a trough|before you can|not open to everyone|you can't send)/gi
			)) sendMessage('status=-13');

			//not a neighbor
			else if (text.match(
				/(only neighbors|only friends can|have to be a neigh|just for your friends)/gi
			)) sendMessage('status=-12');
			
			//gift box full
			else if (text.match(
				/(already got all the (treats|builder)|you need to use|(gift box|storage) is full|at max cap|doesn't need another|is too full|any(place| room) to store)/gi
			)) sendMessage('status=-3');

			//already accepted
			else if (text.match(
				/(voters agree with you|whoa there|slow down there partner|can only help your friend once|already (clicked|claimed|collected|received|hatched|taken part|helping|voted)|you('ve| have)? already (helped|tried|accepted|clicked|voted|gave)|claim one (reward|item)|already on another job)/gi
			)) sendMessage('status=-6');

			//generic fail
			else if (text.match(
				/(is for your friend|not for you|(reward for|can't claim) your own|only your friends|can't claim the animal|out of luck|you can't (help|accept)|try again next time|sorry( (par(t|d)ner|farmer))?)/gi
			)) sendMessage('status=-1');

			//accepted
			else if (what=text.match(
				/(your vote|has been registered|congrat(ulations|s)|yee-haw|hooray|lucky you|you (accepted|helped|claimed|collected)|agreed to join|(you )?just (sent|unlocked|collected|gave you)|(thanks|thank you) for (helping|taking part|your interest|voting)|wants you to have|can find it in your|play farmville|can be found in your gift box)/gi
			)) {sendMessage('status=1'); /*alert(what);*/};
		}

		else if (!defaultTO) defaultTO=window.setTimeout(function(){
			var html=document.documentElement.innerHTML;
			if (html.find("app102452128776_giftsTab")) sendMessage('status=-15');
		},5000);
	};

	//start the script
	window.setTimeout(run,500);

})(); // anonymous function wrapper end