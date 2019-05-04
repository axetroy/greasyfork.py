// Mr. Script v1.8
//
// --------------------------------------------------------------------
// This is a user script.  To install it, you need Greasemonkey 0.8 or
// later. Get it at https://addons.mozilla.org/en-US/firefox/addon/748
// To uninstall, go to Tools/Manage User Scripts, select "Mr. Script",
// check "Also uninstall associated preferences" and click "Uninstall".
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Mr. Script
// @namespace   http://www.noblesse-oblige.org/lukifer/scripts/
// @description	interface overhauler for KingdomofLoathing.com
// @version		1.8
// @author		Lukifer
// @contributor	Ohayou
// @contributor Hellion
// @contributor	Tard
// @contributor JiK4eva
// @contributor BeingEaten
// @contributor Picklish
// @contributor	CharonTheHand
// @include     http://127.0.0.1:60*/*
// @include		http://*localhost:*/*
// @include     http://*kingdomofloathing.com/*
// @exclude     http://images.kingdomofloathing.com/*
// @exclude     http://forums.kingdomofloathing.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant	GM_log
// @grant	GM_setValue
// @grant	GM_getValue
// @grant	GM_deleteValue
// @grant	GM_xmlhttpRequest
// @unwrap
// ==/UserScript==


var place = location.pathname.replace(/\/|\.(php|html)$/gi, "").toLowerCase();
if(place === "place") {
	var match = location.search.match(/whichplace=([0-9a-zA-Z_\-]*)/);
	if(match.length > 1) place = match[1];
}
//console.time("Mr. Script @ " + place);
//GM_log("at:" + place);

// n.b. version number should always be a 3-digit number.  If you move to 1.9, call it 1.9.0.  Don't go to 1.8.10 or some such.
var VERSION = 180;
var MAXLIMIT = 999;
var ENABLE_QS_REFRESH = 1;
var DISABLE_ITEM_DB = 0;

var thePath = location.pathname;

var global = this; //, mr = unsafeWindow.top.mr = global;

// server variable lets you be logged on to different servers with different characters and keep them straight.
// not nearly so nifty now that there's only www and dev....
var server = location.host + "/";
var serverNo = (server.match(/(.)\./) || {1:"L"})[1]; 	// the "7" in www7.X, or an "L" if no . is in the hostname.

var pwd = GM_getValue('hash.' + server.split('.')[0]);

var prefAutoclear = GetPref('autoclear');
var prefSpoilers = GetPref('zonespoil') == 1;

//really cool hack to capture DomNodeInserts without having to use the deprecated DOMNodeInserted event,
//which is apparently a huge performance drain:
//after the document is loaded, slap an invisible animation onto any "interesting" new elements that arrive.
//bind a handler to the animation-start event which then does whatever needs doing with the new elements.
//in our case, the AJAX 'Results:' boxes are always starting with <center><center> and are in a div named effdiv.

addCss('@-moz-keyframes nodeInserted { from { clip: rect(1px,auto,auto,auto) } to { clip: rect(0px,auto,auto,auto) } }');

//specify what an "interesting" element is... any "Results:" block has this form.

addCss('center > center > table > tbody > tr > td > b { animation-duration: 0.001s; animation-name: nodeInserted }');
//this gets us right down to a <b>Results:</b> header, I hope.

$(document).on('animationstart',ResultHandler);

anywhere(); // stuff we always add where we can

// town_right to cover gourds, and forestvillage for untinkered results...
if (/^(adventure|choice|craft|knoll|shore|town_right|forestvillage|place|multiuse)$/.test(place)) {
	dropped_item();
}
// where are we and what do we thus want to do?
var handler;
if ((handler = global["at_" + place])) {
	handler();
}
if ((handler = prefSpoilers && global["spoil_" + place])) {
	handler();
}

global = null;
handler = null;

// no imperative top-level code below here; the rest is function definitions:

jQuery.prototype.toString = function() {
  return "[jQuery:" + this.length + "]";
};

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

// ANYWHERE: stuff that we want to do on every possible occasion.
function anywhere() {
	if (prefAutoclear) {
		$('input[value=1]').each(function(i) {
			AddAutoClear(this, prefAutoclear);
		});
	}
}

// Dropped_Item: Add stuffy-stuff to dropped items.
function dropped_item() {
	$('img').each(function() {
		var onclick = this.getAttribute("onclick");
		if (/desc/.test(onclick || "")) {
			AddLinks(onclick, this.parentNode.parentNode, null, thePath);
		}
	});
}

function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	if (head === undefined) return;
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}

function ResultHandler(e) {
	if (e.originalEvent.animationName == 'nodeInserted') {
		var target = e.target;
		if ($(target).parents("#effdiv").length === 0) {
			return;
		}
		var mystuff = $(target).parents('#effdiv').children('center:first').html();
		var effdiv = $(target).parents('#effdiv');
// TODO:
// we need to check multiple <b> nodes here, for cases where there is, for example, multi-stage crafting.
		var bnode = effdiv.find('b:eq(1)');
		var btext = bnode.text();
		var goHere = checkForRedirects(mystuff);
		if (goHere != "") {
			mainpane_goto(goHere);
		} else if (mystuff.indexOf("You equip an item:") != -1) {
			process_equip(btext, bnode);
		} else if (mystuff.indexOf("You put on an Outfit:") != -1) {
			process_outfit(btext, bnode);
		} else if (mystuff.indexOf("You acquire an item:") != -1) {
			var theItem = $(bnode).parent().parent().get(0);
			AddLinks(null, theItem, null, thePath);
		} else if (mystuff.indexOf("You acquire an effect:") != -1) {
			process_effect(btext, bnode);
		} else { // some non-equip/acquire event took place, such as a quest item opening a zone.
			btext = $(target).parents('#effdiv').children('center:first').text();
			var insertAt = $(target).parents('#effdiv').find('blockquote:first');
			if (insertAt.length === 0)
				insertAt = $(target).parent('#effdiv').children('center:first').find('tr:last')
			process_results(btext, insertAt);
		}
	}
}

function process_effect(effectname, jnode) {
	switch(effectname) {
		case 'Filthworm Larva Stench':		jnode.after(AppendLink('[drone chamber (1)]',snarfblat(128))); 			break;
		case 'Filthworm Drone Stench':		jnode.after(AppendLink('[guard chamber (1)]',snarfblat(129))); 			break;
		case 'Filthworm Guard Stench':		jnode.after(AppendLink('[Queen! (1)]',snarfblat(130)));				    break;
		case 'Stone-Faced':			        jnode.after(AppendLink('[hidden temple (1)]',snarfblat(280)));			break;
		case 'Down the Rabbit Hole':		jnode.after(AppendLink('[go down]',to_place('rabbithole')))
            								.after(AppendLink('[tea party!]',to_place('rabbithole&action=rabbithole_teaparty')));	break;
		case 'Knob Goblin Perfume':		    jnode.after(AppendLink('[knob]','cobbsknob.php'));				        break;
	}
}


function process_equip(itemname, jnode) {
	switch(itemname) {
		case 'continuum transfunctioner':	jnode.after(AppendLink('[8-bit realm (1)]',snarfblat(73)));		break;
		case 'huge mirror shard':		    jnode.after(AppendLink('[chamber]','lair6.php?place=1'));	    break;
		case 'snorkel':				        jnode.after(AppendLink('[map]',inv_use(26)));					break;
		case 'pool cue':			        jnode.after(AppendLink('[chalk it!]',inv_use(1794)));			break;
		case "Talisman o' Nam":			    jnode.after(AppendLink('[Dome moD]',to_place('palindome')));	break;
		case 'worm-riding hooks':		    jnode.after(AppendLink('[drum!]',inv_use(2328)));				break;
        case 'Mega Gem':                    jnode.after(AppendLink("[Dr. Awkward Office (1)]",to_place('palindome&action=pal_droffice'))); break;
		case 'dingy planks':			    jnode.after(AppendLink('[boat]', inv_use(146)));				break;
		case "makeshift SCUBA gear": 		jnode.after(AppendLink('[odor]', 'lair2.php?action=odor'));		break;
        case 'worthless gew-gaw':
        case 'worthless knick-knack':
        case 'worthless trinket':           jnode.after(AppendLink('[hermit]','hermit.php'));               break;

		case "Lord SpookyRaven's spectacles":
			if (weCameFrom('manor3')) {
				mainpane_goto('/manor3.php');
			}
			break;
		case "swashbuckling pants":
			if (weCameFrom("choice.php")) {
				jnode.after(AppendLink('[visit Caronch (1)]',snarfblat(157)));
			}
			break;
		case "Victor, the Insult Comic Hellhound Puppet":
		case "observational glasses":
		case "hilarious comedy prop":		jnode.after(AppendLink('[visit Mourn]','pandamonium.php?action=mourn')); 	break;
	}
}

function process_outfit(outfitname, jnode) {
	switch(outfitname) {
		case 'Knob Goblin Harem Girl Disguise':
			jnode
				.after(AppendLink('[perfume]',inv_use(307)))
				.after(AppendLink('[knob]','cobbsknob.php'));
			break;
		case 'Knob Goblin Elite Guard Uniform':
			jnode.after(AppendLink('[knob]','cobbsknob.php'));
			break;
		case 'Swashbuckling Getup':
			jnode.after(AppendLink('[island]','island.php'));
			break;
		case 'Filthy Hippy Disguise':
			if (weCameFrom('store.php')) {
				mainpane_goto('/store.php?whichstore=h');
			} else  {
				jnode.after(AppendLink('[buy fruit]','store.php?whichstore=h'));
			}
			break;
		case 'Mining Gear':
			jnode.after(AppendLink('[dwarf mine]','mining.php?mine=1'));
			break;
		case 'Bugbear Costume':
			if (weCameFrom('store.php')) {
				mainpane_goto('/store.php?whichstore=b');
			} else {
				jnode.after(AppendLink('[bakery]','store.php?whichstore=b'));
			}
			break;
		case 'eXtreme Cold-Weather Gear':
			jnode.after(AppendLink('[Trapper]','trapper.php'));
			jnode.after(AppendLink('[hit the slopes (1)]',snarfblat(273)));
			break;
		case 'Cloaca-Cola Uniform':
		case 'Dyspepsi-Cola Uniform':
			jnode.after(AppendLink('[battlefield (1)]',snarfblat(85)));
			break;
		case 'Frat Warrior Fatigues':
		case 'War Hippy Fatigues':
			jnode.after(AppendLink('[island]','island.php'));
			break;
	}
}

// Don't ask why this guy bothered to write wrapper functions. He just did. :-)
function persist(key, value) {
	try {
		GM_setValue(key, value);
	} catch(e) {
		console.error('Error while setting ' + key + ' to ' + value + ': ' + e.message);
	}
}

function integer(n) {
	if (typeof n == 'string') n.replace(/^\D+|,/g, "");
	return parseInt(n, 10);
}

function text(x) {
	switch (typeof x) {
	case "object":
		if ("undefined" != typeof x.textContent)
			return $.trim(x.textContent);
		break;
	case "string":
		return $.trim(x);
		break;
	}
	throw new Error("Failed to textify "+ x);
}

// inv_use: save ourselves some typing.
function inv_use(item) {
	return "inv_use.php?pwd="+pwd+"&which=3&whichitem="+item;
}

// multiuse: ditto
function multiuse(item,qty) {
	return 'multiuse.php?pwd='+pwd+'&action=useitem&quantity='+qty+'&whichitem='+item;
}

// snarfblat: ditto
function snarfblat(locNumber) {
	return "adventure.php?snarfblat="+locNumber;
}

// to_place: ditto
function to_place(locName) {
	return "place.php?whichplace="+locName;
}

// equip: return a link to equip the specified object.
function equip(o) {
	var ie = "inv_equip.php?pwd=" + pwd + "&which=2";
	ie = ie + "&action=" + (o.a || 'equip');
	if (o.oname !== undefined) ie += "&outfitname=" + o.oname;
	if (o.onum	!== undefined) ie += "&whichoutfit=" + o.onum;
	if (o.i		!== undefined) ie += "&whichitem=" + o.i;
	if (o.s		!== undefined) ie += "&slot=" + o.s;
	return ie;
}

function parseItem(tbl) {
	tbl = $(tbl);
	var rel = tbl.attr('rel');
	var data = {};
	if (!rel) return data;
	var parts = rel.split('&');
	for (i in parts) {
		if (!parts.hasOwnProperty(i)) continue;
		var kv = parts[i].split('=');
		tbl.data(kv[0], kv[1]);
		data[kv[0]] = kv[1];
	}
	return data;
}

// Set/GetPref: store/retrieve data that applies to the script as a whole.
function SetPref(which, value) {
	persist("pref." + which, value);
}

function GetPref(which) {
	return GM_getValue("pref." + which);
}

// Set/GetData: store/retrieve data related to a particular session
function SetData(which, value) {
	persist(serverNo + which, value);
}

function GetData(which) {
	return GM_getValue(serverNo + which);
}

// Set/GetCharData: store/retrieve data related to a particular account/ascension
function SetCharData(which, value) {
	var charname = GetData("charname");
	persist(charname + which, value);
}
function GetCharData(which) {
	var charname = GetData("charname");
	return GM_getValue(charname + which);
}
function DelCharData(which) {
	var charname = GetData("charname");
	GM_deleteValue(charname + which);
}

// Password hash functions.  whee.
function SetPwd(hash) {
	persist('hash.' + server.split('.')[0], hash);
}
function FindHash() {
	GM_get(server + 'api.php?what=status&for=MrScript', function(html) {
		var CharInfo = JSON.parse(html);
		var hash = CharInfo["pwd"];
		SetPwd(hash);
        SetData("charname",CharInfo["name"]);
        var moonsign = CharInfo["sign"];
        if ((moonsign == "Mongoose") || (moonsign == "Wallaby") || (moonsign == "Vole")) {
            SetCharData("friendlyknoll",true);
        } else {
            SetCharData("friendlyknoll",false);
        }
	});
}

// FINDMAXQUANTITY: Figure out how many MP restoratives to use
function FindMaxQuantity(item, howMany, deefault, safeLevel) {
	var min, max, avg, result;
	var hp = 0;

	switch(integer(item))
	{
		case 344: min = 8; max = 12; break; 	// Knob Goblin Seltzer
		case 345: min = 25; max = 29; break; 	// Knob Goblin Superseltzer
		case 347: min = 10; max = 14; break;  	// Dyspepsi-Cola
		case 357: min = 6; max = 9; break;  	// Mountain Stream Soda
		case 465: min = 55; max = 79; break;  	// Blue Pixel Potion
		case 466: min = 31; max = 40; break;  	// Green Pixel Potion
		case 518: 				                // Magical Mystery Juice
			min = 4 + (1.5 * GetCharData("level")); max = min + 2; break;
		case 593: min = 46; max = 50 ; break;  	// Phonics Down
		case 592: min = 20; max = 24; break;  	// Tiny House
		case 882: min = 20; max = 25; break;  	// Blatantly Canadian
		case 909:				                // Wint-o-Fresh mint
		case 1003: min = 3; max = 5; break;  	// Soda Water
		case 1334: min = 10; max = 14; break;  	// Cloaca-Cola
		case 1559: min = 30; max = 50; break;  	// Tonic Water
		case 1658: case 1659: case 1660: min = 7; max = 9; break;  // Flavored Cloaca Colas
		case 1788: min = 50; max = 60; break;  	// Unrefined Mountain Stream Syrup
		case 1950: min = 100; max = 100; break;	// Tussin
		case 1965: min = 45 ; max = 64; break;  // Monsieur Bubble
		case 2616: min = 50; max = 60; break;  	// Magi-Wipes
		case 2600: min = 60; max = 70; break;  	// Lily
		case 2576: min = 30; max = 39; break;  	// Locust
		case 2389:				                // Monstar
		case 2367: min = 70; max = 80; break;  	// Soy! Soy!
		case 2639: min = 9; max = 11; break;  	// Black Cherry
		case 2035: min = 30; max = 40; break;  	// Marquis de Poivre Soda
		case 2370: min = 80; max = 120; break;  // fennel Sooooooda
		case 2378: min = 40; max = 100; break;  // banana spritzer
		case 2437: min = 140; max = 160; break; // New Cloke!
		case 2606: min = 35; max = 45; break;  	// palm-frond fan
		case 3357: min = 30; max = 40; break;  	// delicious moth
		case 3450: min = 7; max = 15; break;  	// cotton candy pinch
		case 3451: min = 11; max = 23; break;  	// cotton candy smidgen
		case 3452: min = 15; max = 30; break;  	// cc skoche
		case 3453: min = 19; max = 38; break;  	// cc plug
		case 3454: min = 26; max = 52; break;  	// cc cone
		case 3455: min = 34; max = 68; break;  	// cc pillow
		case 3456: min = 41; max = 82; break;  	// cc bale
		case 3697: min = 150; max = 200; break; // high-pressure seltzer bottle
		case 3727: min = 50; max = 70; break;  	// Nardz
		case 4192: min = 5; max = 10; break;  	// sugar shard

		case 231: min = 3; max = 5; hp = 1; break;  // Doc G's Pungent Unguent
		case 232: min = 8; max = 10; hp = 1; break;  // Doc G's Ailment Ointment
		case 233: min = 13; max = 15; hp = 1; break;  // Doc G's Restorative Balm
		case 234: min = 18; max = 20; hp = 1; break;  // Doc G's Homeopathic Elixir
		case 474: min = 15; max = 20; hp = 1; break;  // Cast
		case 869: min = 5; max = 10; hp = 1; break;  // Forest Tears

		case 1450: case 1451: case 1452: 		// Wads
		case 1453: case 1454: case 1455:
			if (howMany > 15) return 15;
			else return howMany; break;
		case 1154: case 1261: 				// Air, Hatorade
			if (howMany > 3) return 3;
			else return howMany; break;
		case 226: case 2096: 				// Minotaur, Bee Pollen
			if (howMany > 5) return 5;
			else return howMany; break;
		case 5302: return 1; break;			//your own black heart

		case 4255: min = 200; max = 300; break;	//Wolfman Nardz
		case 4819: min = 80; max = 100; break;	//CRIMBCOLA
		case 4879: min = 40; max = 40; break;	//bacon bath ball
		case 6037: min = 35; max = 45; break; 	// creepy ginger ale
		case 4670: min = 15; max = 20; break;	// beer-scented teddy bear
		case 3983: min = 10; max = 20; break;	// dueling turtle
		case 5019: case 5020:  case 5021: 	// natto, tobiko, wasabi marble soda
			min = 5; max = 10; break;
		case 5292:				// d6
			min = 2.5 * GetCharData("level");
			max = min * 1.1;
			min = min * 0.9;
			break;

		default:
			if (deefault == 1)
			{	if (howMany > MAXLIMIT) return MAXLIMIT;
				else return howMany;
			} else return 0;
	}

	switch(safeLevel)
	{	case 0: avg = (min+max)/2.0; break;
		case 1: avg = ((max*2)+min)/3.0; break;
		case 2: avg = max; break;
	}
	if (hp == 1) result = integer(GetCharData("maxHP")-GetCharData("currentHP"));
	else		 result = integer(GetCharData("maxMP")-GetCharData("currentMP"));
	if (result == 0) return 0;
	result = result / avg;
	if (result > howMany) result = howMany;
	if (result > 0)	return integer(result);
	else		return 1;
}

// GM_GET: Stolen gleefully from OneTonTomato. Tee-hee!
function GM_get(dest, callback, errCallback) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://' + dest,
		headers: {"Referer": "http://" + location.host + "/game.php"},
		onerror:function(error) {
			if (typeof(errCallback)=='function' ) {
				errCallback(error);
			} else {
				GM_log("GM_get Error: " + error);
			}
		},
		onload:function(details) {
			if (typeof(callback)=='function' ) {
				callback(details.responseText);
			}
		}
	});
}

// APPENDLINK: Create link and return pointer to span
// will ajax the link unless it's a snarfblat URL or the jaxify flag is FALSE.
function AppendLink(linkString, linkURL,jaxify) {

	if (typeof jaxify == 'undefined') {
		if ((linkURL.indexOf("inv_") != -1) || (linkURL.indexOf("multiuse") != -1)) {
			jaxify = true; // auto-ajax inv_ (equip, eat, use, booze) and multiuse.
		}
		else jaxify = false;
	}

	var font = document.createElement('font');

	$(font)
		.addClass('mrfont')
		.attr('size', 1)
		.html(' ' + linkString);

	var link = document.createElement('a');

	$(link)
		.addClass('mrlink')
		.attr('href', linkURL)
		.attr('target', 'mainpane')
		.append(font);

	if (jaxify) {
		$(link).click(function(e) {
			e.preventDefault();
			ajaxit(linkURL);
			e.stopPropagation();
		});
	}

	var finalSpan = document.createElement('span');
	$(finalSpan)
		.addClass('mrspan')
		.append(' ')
		.append(link);

	return finalSpan;
}

// APPENDBUYBOX: Return HTML for buying an item.
function AppendBuyBox(itemNumber, whichStore, buttonText, noQuantityBox) {
	var eventString = ""; var htmlString = ""; var quantityString;
	if (noQuantityBox == 1) quantityString = "hidden";
	else quantityString = "text";
	if (prefAutoclear == 2) eventString = ' onFocus="this.select();"' +
		'onClick="this.select();" OnDblClick="this.select();"';
	else if (prefAutoclear == 1) eventString =
	' onFocus="javascript:if(this.value==1) this.value=\'\';"' +
	' onClick="javascript:if(this.value==1) this.value=\'\';"' +
	' onBlur="javascript:if(this.value==\'\') this.value=1;" ';

	htmlString =
		'<center><form action="store.php" method="post">' +
		'<input type="hidden" name="whichstore" value="' + whichStore +
		'"><input type="hidden" name="buying" value="Yep.">' +
		'<input type="hidden" name="phash" value="' + pwd +
		'"><input type="' + quantityString + '" class="text" size="2" ' +
		'value="1" name="howmany"' + eventString +
		'> <input type="hidden" name="whichitem" value="' + itemNumber +
		'"><input type="submit" class="button" value="' + buttonText + '"></form></center>';

	return(htmlString);
}

// NUMBERLINK: Fine, you think of a good function name.
// causes clicking on a number to fill that number in to the first "quantity" or "itemquantity" field available.
/*
function NumberLink(b) {
	var num = b.textContent.split(' ')[0];
	while(num.indexOf(',') != -1) num = num.split(',')[0] + num.split(',')[1];
	num = integer(num);
	if (num < 26) {
		var txt = b.textContent.substring(
			b.textContent.indexOf(' '),b.textContent.length);
		var func = "var q = document.getElementsByName(\"quantity\");" +
			"if(q.length==0) q = document.getElementsByName(\"itemquantity\");"+
			"if(q.length) q[0].value=" + num + "; return false;";
		b.innerHTML = "<a href='javascript:void(0);' onclick='" + func + "'>" + num + "</a>" + txt;
	}
}
*/

// APPENDOUTFITSWAP: Aren't unified interfaces just keen?
function AppendOutfitSwap(outfitNumber, text) {
	var span = document.createElement('span');
	var button1 = 0; var hidden;

	hidden = document.createElement('input');
	$(hidden)
		.attr('name','swap')
		.attr('type','hidden')
		.attr('value',outfitNumber);
	button1 = document.createElement('input');
	$(button1)
		.attr('type','submit')
		.attr('class','button')
		.attr('value',text)
	.click(function() {
		this.setAttribute('disabled','disabled');
		var backup = GetPref('backup');
		var which = $('input[name="swap"]').val();
		if (which <= 0 || backup == "") {
			mainpane_goto(equip({a:'outfit', oid:which}));
			//('/inv_equip.php?action=outfit&which=2&whichoutfit=' + which + '&pwd=' + pwd);
		} else {
			GM_get(server +
			equip({a:'customoutfit', oname:backup}),
			//'inv_equip.php?action=customoutfit&which=2&outfitname=' + backup + '&pwd=' + pwd,
			function(response) {
				var which = $('input[name="swap"]').val();
				mainpane_goto('/inv_equip.php?action=outfit&which=2&whichoutfit=' + which + '&pwd=' + pwd);
			});
		}
		return false;
	});
	$(span)
		.append(button1)
		.append(hidden);

	// Revert to backup
	if (outfitNumber == 0) {
		GM_get(server + "account_manageoutfits.php", function(response) {
			var swap = $('input[name="swap"]');
			var val; var index2; var backup = GetPref('backup');
			var index = response.indexOf(' value="' + backup + '"');
			if (index != -1) index = response.indexOf('name=delete',index) + 11;
			if (index != -1) index2 = response.indexOf('>',index);
			if (index != -1 && index2 != -1) {
				val = '-' + response.substring(index,index2);
				swap.attr('value',val);
			} else {
				swap.prev()
					.attr('disabled','disabled')
					.val('Backup Outfit Unavailable');
			}
		});
	}
	return span;
}

// ADDINVCHECK: Extra links for items, independently of where they're displayed.
function AddInvCheck(img) {
	if (img != undefined && img.getAttribute("onclick").indexOf("desc") != -1) {
		if ($(img).parents("table.item").size() > 0) return;	// this image already has an RCM attached; don't override.
																// (thank you, CDMoyer, for this idea!)
		img.addEventListener('contextmenu', InvChecker, true);
	}
}

function InvChecker(event) {
	if (this.getAttribute("done")) return;
	var item = this.parentNode.previousSibling.firstChild.getAttribute("value");
	if (item === null) {
		item = this.parentNode.previousSibling.firstChild.nextSibling.getAttribute("value");
	}
	if (item && item.length > 4) item = item.substring(0,item.length-9); // correct for prices in the mall

	var add = document.createElement('span');
	var br = document.createElement('br');
	var itemname = $(this).parent().next().text();

	$(add).attr('class','tiny').attr('id','span'+item).text("checking: "+itemname+ "...");
	$(this).parent().next().append(br).append(add);

    GM_get(server + 'submitnewchat.php?pwd='+pwd+'&graf=/count '+itemname, function(details) {
        itemqty = details.match(/ou have (\d+)/)[1];
        if (itemqty === undefined) itemqty = 0;
        addText = "(" + itemqty + " in inventory)";
        $('#span'+item).text(addText);
	});
	this.setAttribute("done","done"); event.stopPropagation(); event.preventDefault();
}

//AJAXIT: retrieve some ajax results and stick 'em in at the top of the main pane.
//gleefully stolen straight from KoL itself (with some drastic simplifications).
function ajaxit(dourl) {
	$.ajax({type:'GET',url:dourl+"&ajax=1", cache: false, data: null, global: false,
		success: function(out) {
			if (out.match(/no\|/)) {
				$('#ChatWindow').append('<font color="green">Oops!  Sorry, no can do.</font><br />\n');
				return;
			}
			$(top.mainpane.document).find("#effdiv").remove();
			var $eff = $(top.mainpane.document).find("#effdiv");
			if ($eff.length == 0) {
				var d = top.mainpane.document.createElement('div');
				d.id = 'effdiv';
				var b = top.mainpane.document.body;
				b.insertBefore(d, b.firstChild);
				$eff = $(d);
			}
			$eff.find('a[name="effdivtop"]').remove().end()
				.prepend('<a name="effdivtop"></a><center>'+out+'</center>').css('display','block');
			top.mainpane.document.location = top.mainpane.document.location+"#effdivtop";
		}
	});
}

// ADDTOPLINK: Add a link into the text-based top menu pane.
function AddTopLink(putWhere, target, href, html, space) {
	if (href == "") return;
	var a = document.createElement('a');
	if (target != 0) $(a).attr('target',target);
	$(a).attr('href',href).html(html);
	$(putWhere).append(a);
	if (space) $(putWhere).append(document.createTextNode(" "));
	return a;
}

function mainpane_goto(go_here) {
	top.document.getElementsByName('mainpane')[0].contentDocument.location.pathname = go_here;
}
// ADDLINKS: Extra links, etc. for items, independently of where they are.
function AddLinks(descId, theItem, formWhere, path) {
	var itemNo = $(theItem).parents('.item');
	var itemQty = 0;
	var itemNum = 0;
	var rel = '';
	if (itemNo) {
		rel = parseItem(itemNo);
		itemNum = rel.id;
		itemQty = rel.n;
	}

	if (!itemNum) {
		GM_log("unable to locate item number in AddLinks()");
		return '';
	}
	AddInvCheck(theItem.firstChild.firstChild);

	var doWhat, addWhere = $(theItem).children().eq(1);

	switch (integer(itemNum)) {
		case  518: case  344: case 2639: case 1658: case 1659: case 1660:		// MP restorers.  link to skillcasting.
			doWhat = 'skill'; break;

		case   14: case   15: case   16: case  196: case  340: case  341:		// spleen items.
		case  343: case  687: case  744: case 1261: case 1290: case 1512:
		case 1513: case 1514: case 1515: case 1605: case 2595: case 3368:
			doWhat = 'use'; break;

		case   20: case   21: case   22: case   33: case   59: case   71:		// various gear... RCM should make this obsolete.
		case 1465: case 1466: case 1467: case 1468: case 1469:
		case 1470: case 1471: case 1472: case 1473: case 1474: case 1475:
		case 1476: case 1477: case 1478: case 1479: case 1480: case 1481:
		case 1482: case 1483: case 1484: case 2302: case 6679:
		case 3526: case 3508:
			doWhat = 'equip'; break;

		case  486: case 458: case 1916:											// talisman o' nam, spookyraven's specs.
			doWhat = 'equipacc'; break;

		case   69: case  438: case  440: case  678: case  829:					// various items and campground gear... RCM again?
		case 1274: case 1622: case 1650: case 1794: case 1963: case 2258:
		case 2344: case 2345: case 2346: case 2655: case 2660: case 2950:
		case 2963: case 2964: case 2965: case 3353:
		case 3808:																//mer-kin trailmap
			doWhat = 'oneuse'; break;

		case  146:																// dinghy plans
			SetCharData("insults","0;0;0;0;0;0;0;0");
			doWhat = 'oneuse'; break;

		case   55: case 1445: case 1446: case 1447: case 1448: case 1449:		// pepper and nuggets.
			doWhat = 'cook'; break;

		case 247:																// fermenting powder.
			doWhat = 'cocktail'; break;

		case   74: case   75: case   76:										// spooky temple stuff
			itemNum = 74; doWhat = 'oneuse'; break;

		case  275: case  191: case  313: case 1244: case 1245:	case 675:		// larva, boss bat bandana, KGKing items, dagon skull,
		case 2334: case	2766: case  2829:										// MacGuffin, solid gold bowling ball, really dense meat stack
			addWhere.append(AppendLink('[council]','council.php',false)); break;

		case   32: case   50: case   54: case   57: case   60: case   68: 		// EWs
		case 2556: case 2557: case 2558: case 2559: case 2560: case 2561: 		// LEWs
		case  150: case  151: case  152: case  153: case  154: case  155:		// Epic Hats
		case 4504: case 3291:													// heart of volcano, secret tropical map
			addWhere.append(AppendLink('[take to guild]','guild.php?place=scg')); break;
		case 2550: case 2551: case 2552: case 2553: case 2554: case 2555:		// LEW parts
			addWhere.append(AppendLink('[smith]','craft.php?mode=smith')); break;
		case 454: 																// rusty screwdriver
			addWhere.append(AppendLink('[untinker]',to_place('forestvillage&action=fv_untinker'))); break;

		case 134: 																// bitchin' meatcar
			addWhere.append(AppendLink('[guild]','guild.php?place=paco')); break;

		case  459: case  460: case  461: case  462: case  463:					// pixels
			addWhere.append(AppendLink('[mystic]',to_place('forestvillage&action=fv_mystic'))); break;

		case  535: 																// bridge
			addWhere.append(AppendLink('[chasm]',to_place('orc_chasm&action=bridge0'))); break;

		case  602: 																// Degrassi Knoll shopping list
			if (GetCharData("friendlyknoll") == true) addWhere.append(AppendLink('[gnoll store]', "store.php?whichstore=4"));
			else addWhere.append(AppendLink('[Knoll]', to_place('knoll_hostile')));
			break;

		case  609:                                                              // S.O.C.K
            addWhere.append(AppendLink('[giant Basement (1)]',snarfblat(322))); break;

		case  727:	case 728: 													// Hedge maze puzzle piece/key
			addWhere.append(AppendLink('[maze]', 'hedgepuzzle.php', false)); break;

		case 1766:                                                              // ballroom key
            addWhere.append(AppendLink('[ballroom (1)]',snarfblat(109))); break;

		case 2267: 																// Mega Gem
			addWhere.append(AppendLink('[equip as acc2]', equip({i:2267,s:2})));
			break;

		case 2052: 																// Blackbird
			addWhere.append(AppendLink('[use map]',inv_use(2054))); break;

		case 2050: case 2051:													// bird parts
			addWhere.append(AppendLink('[bird]', 'craft.php?mode=combine' +
								'&action=craft&a=2050&b=2051&pwd=' + pwd +
								'&quantity=1')); break;

		case 2182: case 2183: 													// Harold's hammer parts
			addWhere.append(AppendLink('[make hammer]', 'craft.php?mode=combine' +
								 '&action=craft&a=2182&b=2183&pwd=' + pwd +
								 '&quantity=1')); break;
		case 2184: 																// harold's hammer
			addWhere.append(AppendLink('[give to Harold (1)]', snarfblat(112))); break;

		case 1549: 																// MSG
			addWhere.append(AppendLink('[bam!]', 'guild.php?place=wok')); break;

		case 2441: 																// KG encryption key
			addWhere.append(AppendLink('[use map]',inv_use(2442))); break;

		case 2277: 																// Fernswarthy's key
			if (place == 'adventure') addWhere.append(AppendLink('[visit guild]','guild.php?place=ocg'));
			else addWhere.append(AppendLink('[go to ruins]','fernruin.php'));
			break;

		case 2279: 																// Dusty Old Book
			addWhere.append(AppendLink('[take back to guild]','guild.php?place=ocg')); break;

		case 2326:																// stone rose
			addWhere.append(AppendLink('[Gnasir]',to_place('desertbeach&action=db_gnasir'))); break;

		case 3000: 																// Caronch's dentures
			addWhere.append(AppendLink("[equip swashbuckling pants]", equip({i:402}))); break;

		case 4668: 																// observational glasses
			addWhere.append(AppendLink("[visit Mourn]","pandamonium.php?action=mourn")); break;

		case   23: 																// gum
			if (weCameFrom('hermit') && path == "/store.php") {	// came to the store from the hermit?  use it automatically.
                if (itemQty > 3) itemQty = 3;
                var dourl = inv_use(23)+"&itemquantity="+itemQty+"&quantity="+itemQty+"&ajax=1";
                ajaxit(dourl);
			} else 	{
				addWhere.append(AppendLink('[use]', inv_use(23)+"&itemquantity="+itemQty+"&quantity="+itemQty));
			}
			break;

		case   42: 																// hermit permit
        case   43: case  44: case  45:                                          // worthless thingies
			if (weCameFrom('hermit') && path == "/store.php") {
				mainpane_goto('/hermit.php');
			} else {
				addWhere.append(AppendLink('[hermit]', 'hermit.php'));
			}
			break;

		case 1003: 																// soda water
			addWhere
				.append(AppendLink('[mix]', 'craft.php?mode=cocktail'))
				.append(AppendLink('[still]', 'guild.php?place=still'));
			break;

		case   40: 																// casino pass
			if (weCameFrom('casino') && path == "/store.php") {
				mainpane_goto('/casino.php');
			} else {
				addWhere.append(AppendLink('[casino]', 'casino.php'));
			}
			break;

		case  236: 																// cocktailcrafting kit
			if (weCameFrom('craft') && path == "/store.php") {		// bought via Mr. Script button? auto-use.
				mainpane_goto(inv_use(236) + '&bounce=craft.php?a=1');
			} else {
				doWhat = 'oneuse';
			}
			break;

		case  157: 																// E-Z cook oven
			if (weCameFrom('craft') && path == "/store.php") {		// bought via Mr. Script button?  auto-use.
				mainpane_goto(inv_use(157) + '&bounce=craft.php?a=1');
			} else {
				doWhat = 'oneuse';
			}
			break;

		case  530: 																// spray paint
			addWhere.append(AppendLink('[the wall]', 'town_grafwall.php')); break;

		case   24: 																// Clover
			addWhere.append(AppendLink('[disassemble]', 'multiuse.php?pwd='+ pwd +
							'&action=useitem&quantity=1&whichitem=24'));
			break;

		case  140: 																// dingy Planks
			addWhere.append(AppendLink('[boat]', inv_use(146)));
			break;

		case   47: 																// Roll
			addWhere
			.append(AppendLink('[casino]', 'casino.php'))
			.append(AppendLink('[rock+roll]', 'craft.php?mode=smith&' +
					'action=craft&a=47&b=30&pwd='+ pwd + '&quantity=1'));
			break;

		case   52: 																// banjo Strings
			addWhere.append(AppendLink('[twang]', 'craft.php?mode=smith&' +
							'action=craft&a=52&b=30&pwd='+ pwd +
							'&quantity=1'));
			break;

		case  135: case  136: 													// Rims, Tires
			addWhere.append(AppendLink('[wheels]','craft.php?mode=combine&' +
							'action=craft&a=135&b=136&pwd='+ pwd +
							'&quantity=1'));
			break;

		case 2044: 																// MacGuffin
			addWhere.append(AppendLink('[read]',"diary.php?textversion=1")); break;

		case  485: 																// snakehead charrrm: make talisman
			addWhere.append(AppendLink('[man, o nam]', 'craft.php?mode=combine&' +
							'action=craft&a=485&b=485&pwd='+ pwd +
							'&quantity=1'));
			break;

		case 2338: 																// Black Pudding
			addWhere.append(AppendLink('[eat]','inv_eat.php?pwd='+ pwd +
							'&which=1&whichitem='+itemNum)); break;
		case 2054:                                                              // black market map
			//add link to switch to blackbird or crow
			addWhere.append(AppendLink('[switch to blackbird]','familiar.php?action=newfam&newfam=59'));
				break;

		case 2064: 																// Forged documents
			addWhere.append(AppendLink('[shore]',to_place('desertbeach'))); break;
		case 2266:							                                    // wet stunt nut stew
			addWhere.append(AppendLink('[visit Mr. Alarm]',to_place('palindome&action=pal_mroffice'))); break;
		case 2347:	                                                            //heart of the filthworm queen
			addWhere.append(AppendLink('[turn it in!]','bigisland.php?place=orchard&action=stand&pwd='+pwd)); break;
		case 3471:                                                              // damp old boot
			addWhere.append(AppendLink('[old man, see?]','oldman.php')); break;
		case 4621: 																// Game Grid Token
			addWhere.append(AppendLink('[arcade]','arcade.php')); break;

		case 450: 	case 451: 	case 1258:										// Pretentious artist's stuff
			addWhere.append(AppendLink('[artiste]',to_place('town_wrong&action=townwrong_artist_quest'))); break;

		case 4961:  case 4948: 	case 4949: 	case 4950:							// subject 37 file, GOTO, weremoose spit, abominable blubber
			addWhere.append(AppendLink('[visit 37]','cobbsknob.php?level=3&action=cell37')); break;
		case 5193:	case 5194:													// 11-inch knob sausage, exorcised sandwich
			addWhere.append(AppendLink('[back to the guild]','guild.php?place=challenge')); break;
		case 5221:                                                              // fat loot token
			addWhere.append(AppendLink('[spend it!]','shop.php?whichshop=damachine',false)); break;
		case 1764:												                // spookyraven library key
			addWhere.append(AppendLink('[library (1)]',snarfblat(104))); break;
		case 5570:                                                              // ninja carabiner
			addWhere.append(AppendLink('[Open the Peak!]',to_place('mclargehuge&action=cloudypeak'))); break;
		case 5571:
			addWhere.append(AppendLink('[visit the John]',to_place('mclargehuge&action=trappercabin'))); break;
		case 5690:                                                              // bugbear invasion: goldblum larva
			addWhere.append(AppendLink('[mothership!]',to_place('bugbearship&action=bb_bridge'))); break;
		case 5782:  case 5783:  case 5784:  case 5785:  case 5786:  case 5787:  // smut orc building materials
			addWhere.append(AppendLink('[build!]',to_place('orc_chasm&action=bridge'))); break;
		case 6693:  case 6694:                                                  // McClusky file, page 5, binder clip
			addWhere.append(AppendLink('[bind!]',inv_use(6694))); break;
		case 7179:  case 7182:  case 7184:                                      // First Pizza, Stankara Stone, Shield of Brook
			addWhere.append(AppendLink('[Copperhead Club (1)]',snarfblat(383))); break;
		case 7185: case 7178:                                                   // copperhead charms
			addWhere.append(AppendLink('[man, o nam]', 'craft.php?mode=combine&' +
								'action=craft&a=7185&b=7178&pwd='+ pwd +
								'&qty=1'));
			break;
		case 7262: case 7270:                                                   // I Love Me, 2 Love Me
			doWhat = "oneuse";
			//addWhere.append(AppendLink('[The Dr is In!]',to_place('palindome&action=pal_droffice'))); break;
		case 4029:		                                                        // Hyboria: memory of a grappling hook
			if (GetCharData("Krakrox") == "A") {
				SetCharData("Krakrox","B");
			} else {
				SetCharData("Krakrox","F");
			}
			break;
		case 4032:		// Hyboria: memory of half a stone circle
			SetCharData("Krakrox","D"); break;
		case 4034:		// Hyboria: memory of an iron key
			SetCharData("Krakrox","G"); break;
		case 4030:		// Hyboria: memory of a small stone block
			SetCharData("Krakrox","I"); break;
		case 4031:		// Hyboria: memory of a little stone block
			SetCharData("Krakrox","K"); break;
		case 4033:		// Hyboria: memoryof a stone half-circle
			SetCharData("Krakrox","M"); break;

	}

	switch (doWhat) {
		case "equip":
			addWhere.append(AppendLink('[equip]', equip({i:itemNum})));
			break;

		case "equipacc":
			addWhere.append(AppendLink('[equip]', equip({i:itemNum,s:3})));
			break;

		case "oneuse":
			addWhere.append(AppendLink('[use]',inv_use(itemNum)));
			break;

		case "use":
			if (formWhere != null) {
			//	AppendUseBox(itemNum, 0, 0, formWhere.get(0));	//need to replace this function....
			} else {
				addWhere.append(AppendLink('[use]', 'multiuse.php?pwd=' +
					pwd + '&action=useitem&quantity=1&whichitem='+itemNum));
			}
			break;

		case "skill":
			if (formWhere != null) {
			//	AppendUseBox(itemNum, 1, 1, formWhere.get(0));
			} else {
				addWhere.append(AppendLink('[use]', 'inv_use.php?pwd='+ pwd +
					'&action=useitem&bounce=skills.php?action=useditem&itemquantity=1&whichitem='+
					itemNum));
			}
		break;

		case "malus":
			addWhere.append(AppendLink('[malus]', 'guild.php?place=malus'));
			break;

		default:
			if (doWhat) {
				addWhere.append(AppendLink('['+ doWhat +']', doWhat+'.php'));
			}
	}

	return doWhat;
}

// RIGHTCLICKMP: Fill up with standard restoratives.
function RightClickMP(e) {
	var json = GetCharData("mplist");
	if (json != undefined && json != "") {
		var num = 0;
		var quant = 0;
		var list = $.parseJSON(json);
		if 	(list['518'])  num = "518";	// MMJ
		else if (list['344'])  num = "344";	// KG seltzer
		else if (list['2639']) num = "2639";// BCSoda
		else if (list['1658']) num = "1658";// Cherry Cloaca
		else if (list['1659']) num = "1659";// Diet Cloaca
		else if (list['1660']) num = "1660";// Regular Cloaca
		if (num > 0) {
			quant = FindMaxQuantity(integer(num), list[num], 0, GetPref("safemax"));
			var url = server + 'inv_use.php?pwd='+ pwd +
				'&action=useitem&bounce=skills.php?action=useditem&itemquantity='+quant+'&whichitem='+num;
			GM_get(url, function(result)
				{	document.location.reload(); });
		}
	}
	e.stopPropagation(); e.preventDefault(); return false;
}

// RIGHTCLICKHP: Heal up with spells.
function RightClickHP(e) {
	var json = GetCharData("hplist");
	if (json != undefined && json != "") {
		var num = 0;
		var quant = 0;
		var list = $.parseJSON(json);
		var order;
		var heal = GetCharData("maxHP") - GetCharData("currentHP");

		if (heal == 0) {
			GM_log("no healing needed.");
			return;
		}
		if (heal < 20) order = ['3009','5007','1007','1010','5011','3012'];
		else if (heal < 35) order = ['1010','5011','3012','3009','5007','1007'];
		else if (heal < 45) order = ['5011','1010','3012','3009','5007','1007'];
		else order = ['3012','5011','1010','3009','5007','1007'];

		for(i=0; i<6; i++) if (list[order[i]]) { num = order[i]; break; }
		if (num > 0) {
			var url = server+'skills.php?action=Skillz&whichskill='+num+"&quantity="+1+'&pwd='+pwd;
			GM_get(url, function(result) {
				document.location.reload();
			});
		}
	}
	e.stopPropagation(); e.preventDefault(); return false;
}

// PARSESELECTQUANTITY: Figure out how many of a given restorative are present.
function ParseSelectQuantity(selectItem, endToken) {
	var index = selectItem.selectedIndex;
	var howMany = 1;
	if (selectItem.options[index].textContent.indexOf("(") != -1) {
		howMany = selectItem.options[index].textContent;
		if (howMany.charAt(0) == '(') return 999999;
		howMany = howMany.split("(")[1];
		howMany = howMany.split(endToken)[0];
	}
	return integer(howMany);
}

// MAKEMAXBUTTON: Wrap a "max" button around a text box.
function MakeMaxButton(textField, maxfunction) {
	var img = document.createElement('img');
	var table = document.createElement('table');
	var tr = document.createElement('tr');
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	var stizzyle = 'border: 1px solid black; border-left: 0px; padding: 0px;';

	$(img).attr('src', 'data:image/gif;base64,R0lGODlhCQAQAPAAMf%2F%2F%2FwAAACwA' +
						'AAAACQAQAAACGgSCaGvB7d6KM1HJLHa3nZxg2%2FRwo2RmJFAAADs%3D')

	.click(maxfunction)

	.mousedown(function() {
		$(this).parent().attr('style',
		"background-color:#999999; " + stizzyle);
	})

	.mouseup(function() {
		$(this).parent().attr('style', "background-color:#ffffff; " + stizzyle);
	});

	// I am a horrible, horrible hack. If anyone knows how to make it
	// impossible to drag the max image into the text box, I'm all ears.
	$(textField)
		.attr('style','border: none;')
		.before(table)
		.mouseover(function() {
			if (this.value.length > 5) this.value = "1";
		});

	$(table)
		.attr('style', 'display: inline; vertical-align: bottom; ' +
			'border-spacing: 0px; padding: 0;')
		.append(tr);
	$(tr)
		.append(td1)
		.append(td2);
	$(td1)
		.attr('style', 'border: 1px solid black; padding: 1px;')
		.append(textField);
	$(td2)
		.attr('style', stizzyle)
		.append(img);
}

// SKILLUSELIMIT: Calculate how many times various skills should be cast.
function SkillUseLimit(skillNum) {
	var limit = 999999; var min = 0; var max = 0;
	var safeLevel = GetPref('safemax');
	switch(integer(skillNum)) {
		case 8000: case 8001: case 8002: limit = 3; break;	// 3 Tomes maximum.
		case 3012: limit = 1;  break;						// Cannelloni Cocoon
		case 8200: case 8201: limit = 1; break;				// Grimoires
		case 45:   case 53: limit = 1; break;				// vent rage gland, summon crimbo candy
		case 3006: case 4006: case 5014: limit = 5; break;	// summon noodles, reagents, garnishes
		case 3009: min=10; max=30; break;					// lasagna bandages
		case 1007: min=10; max=20; break;					// tongue of the otter
		case 1010: min=30; max=40; break;					// tongue of the walrus
		case 5011: min=40; max=40; break;					// disco power nap
		case 5007: min=20; max=20; break;					// disco nap
		case 6020: case 6021: case 6022:
		case 6023: case 6024: case 6025: limit = 10; break;	// AT Hobo skills
		case 6026: limit = 50; break;						// AT Sea skill
		case 6028: limit = 5; break;						// AT Trader skill (Inigo's)
	}
	if (max != 0) {
		var hp = GetCharData("maxHP") - GetCharData("currentHP");
		switch(safeLevel) {
			case 0: limit = integer(0.5+hp/((min+max)/2.0)); break;
			case 1: limit = integer(0.5+hp/(((max*2)+min)/3.0)); break;
			case 2: limit = integer(0.5+hp/max); break;
		}
	}
	return limit;
}

// ONFOCUS: Make text input boxes clear on focus
function AddAutoClear(box, setting) {
	if (setting == 2) {
		$(box)
			.attr('onFocus', 'this.select();')
			.attr('onClick', 'this.select();')
			.attr('OnDblClick', 'this.select();');
	} else if (setting == 1) {
		$(box)
			.attr('onFocus', 'if (this.value==1) this.value="";')
			.attr('onClick', 'if (this.value==1) this.value="";')
			.attr('onBlur',  'if (this.value=="") this.value=1;');
	}
}

// DEFAULTS: Pay no attention to the function behind the curtain.
function Defaults(revert) {
	var basePrefs = [["splitinv",1],
			 ["splitquest",1],
			 ["splitmsg",0],
			 ["outfitmenu",1],
			 ["shortlinks",3],
			 ["autoclear",1],
		   	 ['toprow', 1],
		   	 ['safemax', 1],
		   	 ['moveqs', 2],
		   	 ['logout', 1],
		   	 ['zonespoil', 1],
		   	 ['klaw', 1],
		  	 ['quickequip', 0],
		  	 ['nodisable', 0],
		   	 ['docuse', 0],
		   	 ['swordguy', 'skills.php'],
		   	 ['backup', 'Backup'],
		   	 ['telescope', 1],
		  	 ['lairspoil', 1],
		 	 ['moonslink', 1],
			 ['malllink', 1],
			 ['ascension_list','cooked key pies, exploded chef, exploded bartender, discarded karma, bought a skill'],
             ['compressfam', 0],
             ['questbottom', 0],
			 ['inlineitemdesc', 1],
             ['monsterlinks',1],
             ['choicelinks',1]
			];
	var menu1 = ['market;town_market.php','hermit;hermit.php',
		'untinker;place.php?whichplace=forestvillage&action=fv_untinker',
		'mystic;place.php?whichplace=forestvillage&action=fv_mystic',
		'hunter;bhh.php',
		'guildstore',
		'general;store.php?whichstore=m',
		'doc;galaktik.php',
		'lab;cobbsknob.php?action=dispensary',
		'fruit;store.php?whichstore=h'];

	var menu2 = ['buy;mall.php',
		'trade;makeoffer.php',
		'sell;managestore.php',
		'collection;managecollection.php',
		'closet;closet.php',
		'hagnk\'s;storage.php',
		'attack;pvp.php',
		'wiki;http://kol.coldfront.net/thekolwiki/index.php/Main_Page',
		'calendar;http://noblesse-oblige.org/calendar',
		 ';'];
	var i;

	if (revert == 0) {
		for (i = 0; i < basePrefs.length; i++)	{ if (GetPref(basePrefs[i][0]) == undefined) SetPref(basePrefs[i][0], basePrefs[i][1]) }
		for (i = 0; i < menu1.length; i++) 	{ if (GetPref("menu1link"+i) == undefined) SetPref("menu1link"+i,menu1[i]) }
		for (i = 0; i < menu2.length; i++) 	{ if (GetPref("menu2link"+i) == undefined) SetPref("menu2link"+i,menu2[i]) }
	}
	else if (revert == 1) { for (i = 0; i < menu1.length; i++) { SetPref("menu1link"+i,menu1[i]) } }
	else if (revert == 2) { for (i = 0; i < menu2.length; i++) { SetPref("menu2link"+i,menu2[i]) } }
}

// ADDTOPOPTION: Add a menu option in compact mode.
function AddTopOption(name, url, select, putBefore) {
	var option = document.createElement('option');
	option.innerHTML = name; option.value = url;
	if (putBefore == 0) select.appendChild(option);
	else select.insertBefore(option, putBefore);
}

// MAKEOPTION: Does what it says. Yup.
// text == label for the option.  (human-readable description)
// num = number of options to make.  Negative -> create a text input box instead of listbox.
//		-1: create straight up input box.
//		-2: create 2 input boxes, first one as label, second as value.
// pref = name of GM flag that this option is setting.
// opt1, opt2 = labels of first 2 options to create.  (options beyond 2 must be created manually after calling this routine.)
function MakeOption(text, num, pref, opt1, opt2) {
	var table = document.createElement('table');
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	var prefVal = GetPref(pref);
	var select;

	var selectid = "_mrscript_opt_"+pref.replace(" ", "_");

	if (num == -2) td.innerHTML = "<input style='font-size:11px;width:70px;' name=" + pref +
	"tag maxlength=16 type=text class=text value=" + text + ">";
	else td.innerHTML = "<span style='font-size:12px;padding-right:3px;'>" +
						"<label style=\"display:inline;\" for=\""+selectid+"\">" + text + "</label></span>";
	if (num == -1) td.setAttribute('width','50%');
	else if (num == -2) td.setAttribute('width','30%');
	else td.setAttribute('width','65%');
	td.setAttribute('align','right');
	tr.appendChild(td);

	td = document.createElement('td');
	if (num < 0) {
		select = document.createElement('input');
		select.setAttribute("id", selectid);
		select.setAttribute('type','text');
		select.setAttribute('class','text');
		select.setAttribute('maxlength','256');
		if (num == -2) {
			var preflink = prefVal.split(';')[1];
			if (preflink != undefined) select.setAttribute('value', preflink);
			else select.setAttribute('value', '');
		}
		else select.setAttribute('value', prefVal);
	} else {
		select = document.createElement('select');
		select.setAttribute("id", selectid);
		for (var i=0; i<num; i++) {
			var option = document.createElement('option');
			if (i == prefVal) option.setAttribute('selected',1);
			option.value = i; select.appendChild(option);
			if (i == 0 && opt1 != 0) option.innerHTML = opt1;
			if (i == 1 && opt2 != 0) option.innerHTML = opt2;
		}
	}
	select.setAttribute('style','width:95%;font-size:11px;');
	select.setAttribute('name',pref);
	if (num > -2) select.addEventListener('change', function(event)
	{
		if (this.selectedIndex != undefined) SetPref(this.name, this.selectedIndex);
		else SetPref(this.name, this.value);
		switch(this.name)	// changing a setting affecting topmenu?  reload it now.
		{
			case 'shortlinks':
			case 'splitinv':
			case 'moveqs':
			case 'swordguy':
			case 'logout':
			case 'splitquest':
			case 'splitmsg':
				top.frames[0].location.reload(); break;
		}
	}, true);
	td.appendChild(select);
	tr.appendChild(td);
	table.setAttribute('width','280');
	table.setAttribute('align','center');
	table.appendChild(tr);

	return table;
}

// ADDTOTOPOFMAIN: insert an element at the top of the main frame, but under the combat bar if present.
// function yoinked from JHunz's island management thingy
function AddToTopOfMain(newElement,refDocument) {
	var fightElement = refDocument.evaluate('//b[contains(.,"Combat") and contains(.,"!")]/ancestor::tr[1]',refDocument,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (fightElement) {
		fightElement.parentNode.insertBefore(newElement,fightElement);
	} else {
		var element = refDocument.getElementsByTagName("tr")[0];
		if (element && element.parentNode) {
			element.parentNode.insertBefore(newElement,element);
		}
	}
}

// INLINEITEMDESCRIPTIONS: Because window.open makes baby Jesus cry
function InlineItemDescriptions() {

	if(GetPref("inlineitemdesc") == 0) return;

	$("img[width=30][onclick*='descitem(']").addClass("hand");

	document.addEventListener("click", function(e) {

		if(e.target.tagName === "IMG") {

			if(e.shiftKey || e.altKey || e.metaKey || e.button === 2) return true;

			var $img = $(e.target);
			window.$img = $img;
			var onclick = $img.attr("onclick");
			var regex = false;
			var which = false;
			if(onclick) {
				if(onclick.indexOf("descitem(") !== -1) {
					which = 'item';
					regex = /descitem\(\"?([a-z0-9\-_]*)/;
				}
				else if(onclick.indexOf("eff(") !== -1) {
					which = 'effect';
					regex = /eff\(\"?([a-z0-9\-_]*)/;
				}
			}

			if(regex) {

				var item = onclick.match(regex)[1];
				if(!item) return true;

				var $body = $("body");
				var pos = $img.position();
				var x = pos.left - - 15 - 150;
				var y = pos.top  - - 15;

				if(!window.$overlay) {
					window.$overlay = $('<div id="_descitem_overlay"></div>')
						.css({
							"background": "transparent",
							"position": "fixed",
							"top": 0,
							"bottom": 0,
							"left": 0,
							"right": 0,
							"zIndex": "100"
						});

					window.$overlay.on("click", function(e) {
						window.$overlay.hide();
						var $desc = $("._descitem");
						$desc.css({"transform": "scale(0.1)"});
						setTimeout(function(){ $desc.remove(); }, 120);
					});

					$(document).on("keyup.descitem", function(e) {
						if(e.keyCode == 27) window.$overlay.triggerHandler("click");
						$(document).off("keyup.descitem");
					});

					$body
						.append('<style type="text/css">'
							+'img.hand {position:relative; top:0; left:0; z-index: 200;}'
							+'#pop_ircm {z-index: 300;}</style>')
						.append(window.$overlay[0]);
				}

				window.$overlay.triggerHandler("click");

				var $desc = $('<div class="_descitem"></div>')
					.css({
						"background": "white",
						"border": "1px solid black",
						"paddingTop": 10,
						"boxShadow": "0 0 3px gray",
						"display": "none",
						"position": "absolute",
						"overflow": "auto",
						"maxHeight": 450,
						"width": 300,
						"zIndex": "300",
						"transform": "scale(0.1)",
						"transition": "transform linear 120ms"
					});
				$body.append($desc[0]);

				var url = '/desc_'+which+'.php?which'+which+'='+item;
				GM_get(server+url, function(html) {

					if(which == "item") {
						var start = html.indexOf('<center>');
						var end	= html.lastIndexOf('</blockquote>');

						$desc
							.html(html.slice(start, end - - 13))
							.css({"top": y, "left": parseInt(x), "display": "block" });
						$desc
							.children("blockquote")
							.css("margin", "15px");
					}

					else if(which == "effect") {
						var start = html.indexOf('<font');
						var end	= html.lastIndexOf('</font>');

						$desc
							.html(html.slice(start, end - - 7))
							.css({"top": y, "left": parseInt(x), "display": "block" });

						$desc
							.find("center:eq(1)")
							.css("marginBottom", "15px");
					}

					$desc.css({
						"top": y - ($desc.height() / 2),
						"opacity": 1,
						"transform": "scale(1)"
					})

					var $b = $desc.find("b:first");
					$b.wrap('<a href="http://kol.coldfront.net/thekolwiki/index.php/Special:'+
						'Search?search='+ $b.text().replace(/\s/g, '+').replace('"', '')+
						'&go=Go" target="_blank"></a>');

					$desc.find("a").each(function(n, el) {
						var $a = $(this);
						var url = $a.attr("href");

						if(url.indexOf("desc_effect") !== -1) {
							$a.attr("href", "javascript:void(0);");
							$a.on("click", function(e) {
								GM_get(server+url, function(html) {
									var start = html.indexOf('<font');
									var end	= html.lastIndexOf('</font>');
									$desc.html(html.slice(start, end - - 7));
									$desc.find("center:eq(1)").css("marginBottom", "15px");
								});
							});
						}

						else $a.attr("target", "_blank");
					});

					window.$overlay.show();

				}, function(err){  alert(err); });

				e.preventDefault();
				e.stopPropagation();

				return false;
			}
		}

		return true;

	}, true);
}


// MAIN.HTML: Resize top pane a bit and store password hash.
// was main_c
function at_main() {
	FindHash();
	setTimeout("if (top.frames[0].location == 'about:blank')" +
		 " top.frames[0].location = 'topmenu.php'", 1500);	// fix for top menu not always loading properly

	// n.b. the :eq(1) below is important because of the nested-table layout.  only select the inner TR.
	$('tr:contains("Noob."):eq(1)').append(AppendLink('[Toot]','tutorial.php?action=toot'));	// fresh from valhalla?  get things rolling.
	$('tr:contains("responded to a trade offer"):eq(1)').append(AppendLink('[trade]', 'makeoffer.php'));
	$('tr:contains("new announcement"):eq(1)').append(AppendLink('[go read it]', 'clan_hall.php'));

	var update = GetData("Update");
	if (update != '') {
		$('table:first').before(update);
		SetData("Update",'');
	}
// may also want to add a check for Funkslinging here.
}

// GAME: look for updates and post link if needed.
// n.b. game.php is the outermost, non-frame window that contains all the frames.
// 	as such, the script only sees it exactly once, when you're logging in.
function at_game() {
	var lastUpdated = integer(GM_getValue('MrScriptLastUpdate', 0));
	var currentHours = integer(new Date().getTime()/3600000);

	// reload topmenu exactly once after charpane has finished processing:
	setTimeout('top.frames[0].location.reload();',2000);

	// If over X hours, check for updates
	if ((currentHours - lastUpdated) > 6)
	{
	GM_get("noblesse-oblige.org/hellion/scripts/MrScript.version.json",
		function(txt)
		{	txt = txt.replace(/\n/,'');		// strip carriage returns so that eval() doesn't blow up
			var json = $.parseJSON(txt);
			if (!json.version) return;
			var vnum = json.version.replace(/\./g, "");	// strip points: 1.4.3 => 143.
			if (!vnum) return;
			if (integer(vnum) <= VERSION)		// number returned via lookup is not newer than what this script says it is...
			{	persist('MrScriptLastUpdate',
					integer(new Date().getTime()/3600000)); return;
			}
			// If we're still here, then we need an update link.
			var html =
				'<div style="font-size:14px;text-decoration:none;text-align:center;">' +
				'Mr. Script v' + json.version + ' is available!<br /><br />' +
				'<a href="' + json.url1 + '" target="_blank">';
			if (json.url2 && json.url2.length > 0) {
				html +=
				'Uncompressed</a>&nbsp;&nbsp;&nbsp;&nbsp;<b>OR</b>' +
				'&nbsp;&nbsp;&nbsp;&nbsp;<a href="' + json.url2 +
				'" target="_blank">Minified</a>&nbsp;&nbsp;<span style="font-size:10px;"></span><br />';
			} else {
				html += 'Update</a><br />';
			}
			html += (json.desc ?
			'<p style="margin:0 auto; text-align:left; font-size:10px;">'+
			json.desc+'</p>' : '<br />') + '</div>';
			SetData("Update",html);
		});
	}
}

function at_bedazzle() {
	dropped_item();
}

function setItem(sel, itemName) {
	for (var i=1; i < sel.options.length; i++) {
		if (sel.options[i].text.indexOf(itemName) != -1) {
			sel.options.selectedIndex = i;
			break;
		}
	}
}

// FIGHT: special processing for certain critters
function at_fight() {

	InlineItemDescriptions();

// code for NS Lair spoilers borrowed shamelessly from Tard's NS Trainer v0.8
	// monster name:[preferred combat item, funkslinging item, is this lair-spoilery, special treatment flag]
	// special treatment: 0=nothing; 1=any gremlin; 2=non-tool gremlin; 3=hidden city; 4=pirate insults.
	var MonsterArray = {
	"a Beer Batter":            ["baseball","",1,0],
	"a best-selling novelist":  ["plot hole","",1,0],
	"a Big Meat Golem":         ["meat vortex","",1,0],
	"a Bowling Cricket":        ["sonar-in-a-biscuit","",1,0],
	"a Bronze Chef":            ["leftovers of indeterminate origin","",1,0],
	"a collapsed mineshaft golem":["stick of dynamite","",1,0],
	"a concert pianist":        ["Knob Goblin firecracker","",1,0],
	"the darkness":             ["inkwell","",1,0],
	" El Diablo":               ["mariachi G-string","",1,0],		// note: leading space is very important.  do not remove it.
	"an Electron Submarine":    ["photoprotoneutron torpedo","",1,0],
	"an endangered inflatable white tiger":["pygmy blowgun","",1,0],
	"an Enraged Cow":           ["barbed-wire fence","",1,0],
	"a fancy bath slug":        ["fancy bath salts","",1,0],
	"the Fickle Finger of F8":  ["razor-sharp can lid","",1,0],
	"a Flaming Samurai":        ["frigid ninja stars","",1,0],
	"a giant bee":              ["tropical orchid","",1,0],
	"a giant fried egg":        ["black pepper","",1,0],
	"a Giant Desktop Globe":    ["NG (","",1,0],
	"an Ice Cube":              ["hair spray","",1,0],
	"a malevolent crop circle": ["bronzed locust","",1,0],
	"a possessed pipe-organ":   ["powdered organs","",1,0],
	"a Pretty Fly":             ["spider web","",1,0],
	"a Tyrannosaurus Tex":      ["chaos butterfly","",1,0],
	"a Vicious Easel":          ["disease","",1,0],
	"The Guy Made Of Bees":     ["antique hand mirror","",0,0],
	"an erudite gremlin":       ["band flyers","molybdenum magnet",0,1],
	"a vegetable gremlin":      ["band flyers","molybdenum magnet",0,1],
	"an A.M.C. gremlin":        ["band flyers","",0,1],
	"a spider gremlin":         ["band flyers","molybdenum magnet",0,1],
	"a batwinged gremlin":      ["band flyers","molybdenum magnet",0,1],
	" Ed the Undying":          ["band flyers","",0,0],
	"a clingy pirate":          ["cocktail napkin","",0,0],
	"a sassy pirate":           ["The Big Book of Pirate Insults","",0,4],
	"a shady pirate":           ["The Big Book of Pirate Insults","",0,4],
	"a shifty pirate":          ["The Big Book of Pirate Insults","",0,4],
	"a smarmy pirate":          ["The Big Book of Pirate Insults","",0,4],
	"a swarthy pirate":         ["The Big Book of Pirate Insults","",0,4],
	"a tetchy pirate":          ["The Big Book of Pirate Insults","",0,4],
	"a toothy pirate":          ["The Big Book of Pirate Insults","",0,4],
	"a tipsy pirate":           ["The Big Book of Pirate Insults","",0,4]
	};

	var $monster = $("#monname");
	var monsterName = $monster.text();
	var monsterNameShort = monsterName.replace(/^an?\s/, '');
	var infight = GetCharData("infight");

    if (GetPref("monsterlinks") == 1) {
    	$monster.html(' <a href="http://kol.coldfront.net/thekolwiki/index.php/'+
	    	'Special:Search?search='+ monsterNameShort.replace(/\s/g, '+').replace('"', '')+
    		'&go=Go" target="_blank">'+monsterName+'</a>');
    }
	// fix the ugly new Hell Ion image...
	if (monsterName == "a Hellion") {
		$('#monpic')
			.attr("src","http://images.kingdomofloathing.com/otherimages/customavatars/250730.gif")
			.attr("width",60).attr("height",100);
	} else if (monsterName == "The Guy Made Of Bees") {
		SetCharData("saidbeeguy",0);
	}


	// always process the pirate insult book if it's in the combat item list:
	$('option[value="2947"]').each(function(){
		var insultsList = GetCharData("insults"); if (insultsList == undefined) insultsList = "0;0;0;0;0;0;0;0";
		var insultsArray = insultsList.split(";");
		var numInsults = 0;
		for (var i = 0; i < insultsArray.length; i++) {
			numInsults += integer(insultsArray[i]);
		}
		var bookname = $(this).text();
		bookname = bookname.replace("Insults","Insults["+numInsults+"/8]");
		$(this).text(bookname);
	});

// PART 1: FIRST-ROUND STUFF
	if (infight != "Y") {	// first time through this particular fight?
		SetCharData("infight","Y");
		SetCharData("special",0);	// defensive clearing in case it got left set somehow.
		var monsterItem = MonsterArray[monsterName];
		if (monsterItem != undefined && GetPref('lairspoil') != 1 && monsterItem[2] == 1) return;	// found something, spoilers are off, and this is a spoilery monster?
		if (monsterItem != undefined) {	// let's do something specific with this critter.
			var dropdown = document.getElementsByName('whichitem');
			if (dropdown.length) setItem(dropdown[0], monsterItem[0]);
			if (monsterItem[1] != "") {	// is there a funkslinging preference given?
				dropdown = document.getElementsByName('whichitem2');
				if (dropdown.length) setItem(dropdown[0], monsterItem[1]);
			}
			// n.b. we set this in a separate long-term variable so that we can tweak it mid-fight if needed.
			SetCharData("special",monsterItem[3]);
		}
	}
// PART 2: SPECIAL-PROCESS STUFF
	if (GetCharData("special") != 0) {	// in a fight with something special?
		switch (GetCharData("special"))
		{
			case 1:	// gremlins
				ProcessGremlinCombat(monsterName);
			break;

			case 2: // gremlins that we know don't have the tool:
				var tr = document.createElement('tr');
				tr.innerHTML = '<tr><td><div style="color: red;font-size: 100%;width: 100%;text-align:center">' +
								'<b>SMACK THE LITTLE BUGGER DOWN!</b></div></td></tr>';
				AddToTopOfMain(tr, document);
			break;
			//case 3 used to be for the hidden city when we needed to figure out what sphere was for what altar.

			case 4: // insulting pirates:
				ProcessPirateInsults();
				break;
			default:
			break;
		}
	}

// PART 3: LAST-ROUND STUFF
	// post-win processing:
	if (/WINWINW/.test(document.body.innerHTML)) {
		SetCharData("infight","N");
		SetCharData("special",0);
		var square=GetCharData("square");
		SetCharData("square",false);
		//special: friar check:
		if (GetCharData("hasflorist") === true) {
			if ($('img[src*=friarplant]').length == 0) {
				$('#monpic').parent().parent()
					.append('<td><a href="'+to_place('forestvillage&action=fv_friar')+'">Flower Power!</a></td>');
			}
		}
		// Location-specific stuff:
		if (square) {
			CheckLocation(square);
		}
		// Monster-specific stuff:
		switch (monsterName) {
		case "a skeletal sommelier":
		case "a possessed wine rack":
			ProcessWineCellarDrops();
			break;
		case " Dr. Awkward":
			$("p:contains('Adventure')").html('<a href="inventory.php?which=2"><font size="4">CLICK HERE TO CHANGE YOUR GEAR</font></a>');
			$("p:contains('Go back to')").html('');
			break;
		case "Groar":
			$("<center><p><a href='place.php?whichplace=mclargehuge&action=trappercabin'>Back to the Trapper</a></p></center><br />").prependTo($("p:contains['McLargeHuge']"));
			break;
		case "a dirty thieving brigand":
			ProcessNunMeatDrops();
			break;
		case "a giant bird-creature":
			SetCharData("Krakrox","C");
			break;
		case "a giant octopus":
			SetCharData("Krakrox","E");
			break;
		case "a giant spider":
			SetCharData("Krakrox","H");
			break;
		case "a giant jungle python":
			SetCharData("Krakrox","J");
			break;
		case "a wild seahorse":
			$('<center><a href="seafloor.php?action=currents">Go to Mer-Kin DeepCity</a></center><br><br>')
				.prependTo($("p:contains('Adventure')"));
			break;
		}
		showYoinks(true);
		dropped_item();
	}
	// post-loss processing:
	else if (	/>Go back to/.test(document.body.innerHTML) ||
				/You lose.  You slink away,/.test(document.body.innerHTML) ||
				/You run away, like a sissy/.test(document.body.innerHTML)
				) {
		SetCharData("infight","N");
		SetCharData("special",0);
		SetCharData("square",false);
		showYoinks(false);
	}
// PART 4: ANY-ROUND STUFF
	// yoinked-item processing
	else if (document.body.innerHTML.indexOf(">You acquire an item: <") != -1) {
		var imgs = document.body.getElementsByTagName("img");
		for (var i = 0; i < imgs.length; i++)
		{
			var img = imgs[i];
			if (img.getAttribute("class") != "hand")
				continue;
			// nobody cares about toast, dammit
			if (img.getAttribute("onClick") == "descitem(931984879)")
				continue;
			// don't try to "yoink" things that aren't actually items.
			if (img.getAttribute("onClick").indexOf("descitem") == -1)
				continue;

			var text = img.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
			text = text.replace(/ acquire /, " yoinked ");

			var yoinked = GetCharData("yoink");
			if (yoinked == undefined) yoinked = "";
			SetCharData("yoink", yoinked + text);
			break;
		}
	}
}

function CheckLocation (square) {
	if (square.indexOf("cellar.php") != -1) {	// add "explore L/R/U/D" links
		link_cellar(square);
	} else {	// handling adventure.php?snarfblat=X options.
		var location = integer(square.match(/(\d+)/)[1]);	// the 185 in "adventure.php?snarfblat=185"
		switch (location)	{
			case 182:
			case 183:
			case 184:
			case 185:	// Junkyard: add onclick to "adventure again" link to tell ourselves where we are.
				$('a:contains("dventure")').click(function() {
					var a = $(this);
					SetCharData("square",a.attr('href'));
				});
			break;
		}
	}
}

function ProcessGremlinCombat(monsterName) {
	//	array = 		monster name:		  zone	has-item						doesnt-have-item
	var gremlininfo	= {	"a batwinged gremlin":[182, "whips out a hammer", 			"a bombing run over"],
						"a spider gremlin"	 :[183, "whips out a pair of pliers", 	"fibula with its mandibles"],
						"an erudite gremlin" :[184, "whips out a crescent wrench", 	"automatic eyeball-peeler"],
						"a vegetable gremlin":[185, "whips out a screwdriver", 		"off of itself and"],
						"an A.M.C. gremlin"  :[186, "blah blah hruugh", 			"an A.M.C. gremlin"]
					  };

	var zonetext = GetCharData("square");	// should have something like "adventure.php?snarfblat=182"
	var zone = zonetext ? integer(zonetext.match(/(\d+)/)[1]) : 0;

	// if the monster doesn't drop the item in this zone, or we see the "i-don't-have-it" message...
	if ((zone && (gremlininfo[monsterName][0] != zone)) ||
		(document.body.innerHTML.indexOf(gremlininfo[monsterName][2]) != -1)) { // gremlin showed the no-tool message?
		var tr = document.createElement('tr');
		tr.innerHTML = '<tr><td><div style="color: red;font-size: 100%;width: 100%;text-align:center">' +
						'<b>SMACK THE LITTLE BUGGER DOWN!</b></div></td></tr>';
		AddToTopOfMain(tr, document);
		SetCharData("special",2);	// mark them as non-tool gremlins.
	} else {								// the monster might drop the item.
		if (document.body.innerHTML.indexOf(gremlininfo[monsterName][1]) != -1) {	// and there it is!
			var tr = document.createElement('tr');
			tr.innerHTML = '<tr><td><div style="color: green;font-size: 100%;width: 100%;text-align:center">' +
							'<b>MAGNET IT NOW!</b></div></td></tr>';
			AddToTopOfMain(tr, document);

			var itemSelect = document.getElementsByName('whichitem');
			var funkSelect = document.getElementsByName('whichitem2');

			if (funkSelect.length) {	// default funk action: flyers + magnet
				setItem(itemSelect[0], "band flyer");
				setItem(funkSelect[0], "molybdenum magnet");
				if (itemSelect[0].options[itemSelect[0].selectedIndex].text.indexOf("band flyers") == -1) { // no flyers? just magnet.
					setItem(itemSelect[0], "molybdenum magnet");
					funkSelect[0].selectedIndex = 0;
				}
			} else {
				setItem(itemSelect[0], "molybdenum magnet");
			}
		} else {
			var tr = document.createElement('tr');
			tr.innerHTML = '<tr><td><div style="color: blue;font-size: 80%;width: 100%;text-align:center">' +
							'<b>Wait for it....</b></div></td></tr>';
			AddToTopOfMain(tr, document);
		}
	}
}

function ProcessNunMeatDrops() {
	//TODO: figure out how to find the right meatline between hobo monkey (shows up before nun meat)
	//      and Sneaky Pete's bike (shows up after nun meat).
	//      use 'first' below in an SP run, 'last' otherwise.
	var meatline = $("img[src*='meat.gif']:first").parent().next().text();	// should be "You gain X meat"
	var meat = integer(meatline.match(/You gain (\d+) Meat/)[1]);
	var meatSoFar = integer(GetCharData("nunmoney"));

	if ((meatSoFar == undefined) || isNaN(meatSoFar)) meatSoFar = 0;
	meatSoFar += meat;
	$("img[src*='meat.gif']:last").parent().next()
		.append("<font color='blue'>&nbsp;("+meatSoFar+" collected total).</font>");
	if (meatSoFar > 100000) meatSoFar = 0;
	SetCharData("nunmoney",meatSoFar);
}

function ProcessWineCellarDrops() {
	var winebits = {"Merlot":1,"Marsala":2,"Muscat":4,"Pinot Noir":8,"Port":16,"Zinfandel":32};
	var imgs = document.getElementsByTagName('img');
	if (imgs.length > 1) {		// image 0 is the monster pic.  anything else might be a drop.
		var dropcode = 0;
		for (var i=1; i<imgs.length;i++) {
			var itemname = imgs[i].getAttribute('alt');
			if (itemname && itemname.indexOf("dusty bottle of") != -1) {
				itemname = itemname.slice(16);
				dropcode |= winebits[itemname];
			}
		}
		// save info about what wines dropped for the wine location solver.
		if (dropcode != 0) {
			var cref = $('a[href*="snarfblat"]').attr("href");
			var corner = "corner" + cref.match(/snarfblat=(\d+)/)[1];
			var winesfound = GetCharData(corner);
			winesfound |= dropcode;
			SetCharData(corner, winesfound);
		}
	}
}

function ProcessPirateInsults() {
	var insultsList = GetCharData("insults"); if (insultsList == undefined) insultsList = "0;0;0;0;0;0;0;0";
	var insultsArray = insultsList.split(";");
	var numInsults = 0;
	var s = $('body').text();
	var insultText = [
		"neither your tongue nor your wit is sharp enough",
		"be any worse than the smell of your breath",
		"tell your wife and sister I had a lovely time",
		"yellow would be more your color",
		"comfortable being compared to your girlfriend",
		"honor to learn from such an expert in the field",
		"do you manage to shave without using a mirror",
		"only seems that way because you have"];
	for (var i = 0; i < 8; i++) {
		if (s.match(insultText[i])) {
			insultsArray[i] = 1;
			break;
		}
	}
	for (var i=0;i<insultsArray.length;i++) {
		numInsults += integer(insultsArray[i]);
	}
	insultsList = insultsArray.join(";");
	SetCharData("insults",insultsList);
	$('p:contains("Dang, man.")')
		.html("Dang, man.  That hurts.  <font color='blue'>("+numInsults+"/8 insults gathered.)</font>");
}

function link_cellar(square) {
	var thissq = square.match(/(\d+)/)[1]; // get number from "cellar.php?action=explore&whichspot=19"
	thissq = integer(thissq);
	var myhrefbase = "cellar.php?action=explore&whichspot=";
	var myhref = "";
	var UP = 8;
	var DOWN = 4;
	var LEFT = 2;
	var RIGHT = 1;
	var dtable=$('<table id="dirlinks"><tr>'+
					'<td id=ul>&nbsp;</td>'+
					'<td id=up><a>&nbsp;</a></td>'+
					'<td id=ur>&nbsp;</td></tr>'+
					'<tr><td id=left><a>&nbsp;</a></td>'+
					'<td id=c>&nbsp;</td>'+
					'<td id=right><a>&nbsp;</a></td></tr>'+
					'<tr><td id=bl>&nbsp;</td>'+
					'<td id=down><a>&nbsp;</a></td>'+
					'<td id=br>&nbsp;</td></tr></table>');

	// grid: 1 hex digit per square for each of the 25 squares.
	// 		8 = show UP link
	//		4 =      DOWN
	// 		2 =      LEFT
	//      1 = 	 RIGHT
	// plus a 0 at the front because Jick uses 1-based indexing for the tavern, the bastard.
	var grid = [0,5,7,7,6,0,13,15,15,15,6,13,15,15,15,14,13,15,15,15,14,9,11,11,11,10];
	var beenTo = GetCharData("squarelist") + ";" ;

	//get the square you land on if you move in direction D from square S.
	function move(s,d) {
		if (d == UP) s = s-5;
		if (d == DOWN) s = s+5;
		if (d == LEFT) s = s-1;
		if (d == RIGHT) s = s+1;
		return s;
	}

	//if we need to show a link for direction D from square S, return true.
	function check(s,d) {
		if (grid[s] & d) {	//if possible to move in that direction from here
			s = move(s,d);
			if (beenTo.indexOf(s + ";") == -1) { //and we haven't already visited that destination
				return true;
			} else {
				return false;
			}
		}
		else return false;
	}

	function cLink(s,d,t) {
		s = move(s, d);
		return "<a class=cellarlinker href='cellar.php?action=explore&whichspot="+s+"'>"+t+"</a>";
	}

	dtable.prependTo($('center:last')).hide();
	if (check(thissq,UP))  $('#up > a').replaceWith(cLink(thissq,UP,"Up"));
	if (check(thissq,DOWN)) $('#down > a').replaceWith(cLink(thissq,DOWN,"Down"));
	if (check(thissq,LEFT)) $('#left > a').replaceWith(cLink(thissq,LEFT,"Left"));
	if (check(thissq,RIGHT)) $('#right > a').replaceWith(cLink(thissq,RIGHT,"Right"));
	$('.cellarlinker').click(cellar_linker);
	dtable.show();
}

// SHOWYOINKS:  display pickpocketed items.
// Todo: figure out how to specify the correct placement via jquery....
function showYoinks(wonCombat) {
	var yoink = GetCharData("yoink");
	if (yoink == undefined) yoink = "";
	yoink = HTMLDecode(yoink);
	if (yoink != "") {
		SetCharData("yoink", "");
		var yoinkNode = document.createElement("table");
		yoinkNode.innerHTML = yoink;
		var rel = yoink.match(/rel="([^">]*)">/)[1];
		$(yoinkNode).attr('class','item').attr('style','float: none').attr('rel',rel);
		if (wonCombat) {
			var centers = document.body.getElementsByTagName("center");
			for (var i = 0; i < centers.length; i++) {
				if (centers[i].innerHTML.indexOf("You win the fight") == 0) {
					centers[i].insertBefore(yoinkNode, centers[i].childNodes[3]);
					break;
				}
			}
		} else {
			$('a:contains("Adventure Again")').parent().prepend(yoinkNode);
		}
	}
}

function HTMLDecode(html) {
	return String(html)
			.replace(/&amp;/g, '&')
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'")
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>');
}

// LOGGEDOUT: Clear things that should only be checked once per session.
function at_loggedout() {
	SetPwd(0);
	SetCharData("NSDoorCode",'');
}

// LOGIN: clear password hash, just to be safe.
function at_login() {
	at_loggedout();
}

// AFTERLIFE: what they're calling Valhalla after the revamp.
function at_afterlife() {
	at_valhalla();
}
// VALHALLA: clear things that may change when you ascend.
function at_valhalla() {
	// door code resets
	SetCharData("NSDoorCode",'');
	// might not go muscle sign this time
//	SetCharData("plungeraccess",'');
	// wipe the cellar wine info
	SetCharData("corner178",0);
	SetCharData("corner179",0);
	SetCharData("corner180",0);
	SetCharData("corner181",0);
	SetCharData("winelist",'');
	SetCharData("wineHTML",'');
	SetCharData("winesNeeded",'');
	// clear the hidden city stone settings
	SetCharData("altar1",'');
	SetCharData("altar2",'');
	SetCharData("altar3",'');
	SetCharData("altar4",'');
	// reset pirate insult knowledge
	SetCharData("insults",'0;0;0;0;0;0;0;0');
	// clear last-rat info
	SetCharData("lastrat",0);
	// reset nun counter, just in case
	SetCharData("nunmoney",0);
	// reset pandamonium arena solution marker
	SetCharData("pandabandsolved",false);
	// reset list of explored squares in the cellar
	SetCharData("squarelist","");
	// reset tracking of what items were where while mining
	clearwhiches();
	// reset count of beeguy summonses
	SetCharData("saidbeeguy",0);
	// reset Hyboria quest status
	SetCharData("Krakrox","A");
}

// COVE: display pirate insult information
function at_cove() {
	var insultsList=GetCharData("insults");
	if (insultsList == undefined) { insultsList = "0;0;0;0;0;0;0;0"; SetCharData("insults",insultsList); }
	var insultsArray = insultsList.split(";");
	var numInsults = 0;
	for (var i=0;i<insultsArray.length;i++) {
		numInsults += integer(insultsArray[i]);
	}
	var iColor={0:"red",1:"red",2:"red",3:"red",4:"red",5:"maroon",6:"blue",7:"green",8:"green"};

	//Create the page element
	var InsultDisplay = document.createElement('tr');
	InsultDisplay.innerHTML = '<tr><td><div style="color: '+iColor[numInsults]+';font-size: 80%;width: 40%;text-align:left;">' + 'Insult tracking: ' + numInsults + '\/8</div></td></tr>';
	var resetLink = document.createElement('tr');
	resetLink.innerHTML = '<font size=1><a id=H_insultreset href=#>[reset insult tracking]</a></font>';
	//Insert it at the top of the page
	var element = document.getElementsByTagName("tr")[0];
	element.parentNode.insertBefore(InsultDisplay,element);
	element.parentNode.insertBefore(resetLink,InsultDisplay);
	$('#H_insultreset').click(function(){SetCharData("insults","0;0;0;0;0;0;0;0");window.location = "cove.php";});
}

// Cellar_Linker: remember what square we clicked on.
function cellar_linker() {
	var a = $(this);
	SetCharData("square", a.attr('href'));
	var squarenum = a.attr('href').match(/(\d+)/)[0];
	var sqlist = GetCharData("squarelist");
	sqlist = sqlist + ";" + squarenum;
	SetCharData("squarelist",sqlist);
}

// CELLAR: track what square we clicked on in order to provide exploration links later.
function at_cellar() {
	$('a').click(cellar_linker);
}

// COBBS KNOB: Spoilers for Prisoner 37
function at_cobbsknob() {
	$('p').each(function() {
		var txt = $(this).text();
		if ((txt.indexOf("I'll give it a shot") != -1) ||
			(txt.indexOf("I'll get right on it") != -1))  { $(this).append(AppendLink('[lab (1)]',snarfblat(50))); }
		if ((txt.indexOf("them on Menagerie level 1") != -1) ||
			(txt.indexOf("First, I'm going to need") != -1)) { $(this).append(AppendLink('[menagerie-1 (1)]',snarfblat(51))); }
		else if ((txt.indexOf("Okay, the next thing") != -1) ||
			(txt.indexOf("flartble") != -1)) { $(this).append(AppendLink('[menagerie-2 (1)]',snarfblat(52))); }
		else if ((txt.indexOf("This is the last thing I need") != -1) ||
			(txt.indexOf("be right back") != -1)) { $(this).append(AppendLink('[menagerie-3 (1)]',snarfblat(53))); }
	});
	// stupid not-<p>-tagged option...
	$("td:contains('How embarrassing.'):last").append(AppendLink('[menagerie-2 (1)]',snarfblat(52)));
}

// ADVENTURE: provide "Explore next square" link when we hit a non-combat in the Hidden City.
// Also provide extra functionality for certain other noncombats.
function at_adventure() {
	//fix for kolproxy futzing with the URL on the first round of combat.
	if (document.location.search.indexOf("snarfblat") !== -1) {
		if ($('input').length > 0) {
			at_fight();
			return;
		}
	}
	var square=GetCharData("square");
	SetCharData("square",false);
	if (square) {
		if (square.indexOf("hiddencity") != -1) link_hiddencity(square);
//		if (square.indexOf("cellar.php") != -1) link_cellar(square);
	}
	var $NCTitle = $('b:eq(1)');
	var NCText = $NCTitle.text();
//	console.log("NCTtext=["+$NCTitle.text()+"]");
	switch (NCText) {
	case "Rotting Matilda":
		var cardlink = document.createElement('table');
		cardlink.innerHTML = '<table class="item" style="float: none" rel="id=1963&s=55&q=0&d=1&g=0&t=1&n=1&m=0&u=u"><tr><td><img src="http://images.kingdomofloathing.com/itemimages/guildapp.gif" alt="dance card" title="dance card" class=hand onClick="descitem(223939661)"></td></tr></table>';
		$NCTitle.append(cardlink);
		$(cardlink).attr('rel','id=1963&s=55&q=0&d=1&g=0&t=1&n=1&m=0&p=0&u=u').addClass('item');
		break;
	case "It's Always Swordfish":
		$('<center><br /><a href="adventure.php?snarfblat=160">Adventure Belowdecks</a></center><br />').prependTo($('a:last').parent());
		break;
	case "Mr. Alarm":
		$('<center><a href="adventure.php?snarfblat=100">Adventure in WHITEY\'S GROVE</a></center><br />').prependTo($('a:last').parent());
		break;
	case "It's A Sign!":
		$('<center><a href="adventure.php?snarfblat=100">Adventure Again (Whitey\'s Grove)</a></center><br />').prependTo($('a:last').parent());
		$('<center><a href="adventure.php?snarfblat=99">Adventure on the Road to White Citadel</a></center><br />').prependTo($('a:last').parent());
		break;
//	case "F-F-Fantastic!":
//		$('<center><a href="adventure.php?snarfblat=82">Adventure in the Castle in the Clouds in the Sky</a></center><br />').prependTo($('a:last').parent());
//		break;
	case "We'll All Be Flat":
		$('<center><a href="manor3.php">Head to the Wine Cellar</a></center><br />').prependTo($('a:last').parent());
		SetCharData("corner178",0);
		SetCharData("corner179",0);
		SetCharData("corner180",0);
		SetCharData("corner181",0);
		SetCharData("winelist",'');
		SetCharData("wineHTML",'');
		SetCharData("winesNeeded",'');
		SetCharData("altar1",'');
		SetCharData("altar2",'');
		SetCharData("altar3",'');
		SetCharData("altar4",'');
		break;
	case "Whee!":
		$('<center><a href="adventure.php?snarfblat=125">Adventure in the Middle Chamber</a></center><br />').prependTo($('a:last').parent());
		break;
	case "Polo Tombstone":
		$('a[href="adventure.php?snarfblat=103"]').remove();		// don't need to adventure again once we have the key.
		$('<center><a href="adventure.php?snarfblat=106">Adventure in the Haunted Gallery</a></center><br />').prependTo($('a:last').parent());
		break;
	case "Entour Rage":
	case "A Pertinent Imp":
	case "Primo Donno":
	case "Your Bassist Impulses":
	case "Suckubus? You Hardly Know Us!":
	case "A Dicey Situation":
		$('<center><a href="pandamonium.php?action=sven">Check with Sven</a></center><br />').prependTo($('a:last').parent());
		break;
	case "The Manor in Which You're Accustomed":
		$('<center><a href="manor.php">Go on inside</a></center><br />').prependTo($('a:last').parent());
		break;
	case "3 eXXXtreme 4ever 6pack":
		$('<center><a href="'+to_place('mclargehuge&action=cloudypeak') + '">Open the Peak!</a></center><br />').appendTo($('p:last').parent());
		break;
	case "The Journey Continues":
		var p1 = $('p:contains("Having finally fought")').text;
		nextZoneName = p1.match(/This must be (\w+),/)[1];
		$('a:contains("Adventure Again")').replaceWith('<a href="adventure.php?snarfblat=320">Adventure in '+nextZoneName+'</a>');
		break;
	case "Sphinx for the Memories":
		$('a:contains("Adventure Again")').replaceWith('<a href="adventure.php?snarfblat=320">Adventure in the next zone</a>');
		break;
	case "Top of the Castle, Ma":
		$('<center><a href="'+snarfblat(324)+'">Adventure on the TOP FLOOR</a></center><br />').prependTo($('a:last').parent());
		break;
	case "Plucked":
		$('<center><a href="cobbsknob.php?action=throneroom">Take out the KING</a></center><br />').prependTo($('a:last').parent());
		break;
	case "This Adventure Bites":
		$('<br /><center><p><font color="blue">You need:<br/>frilly skirt equipped, and 3 hot wings OR<br/>orcish frat boy outfit equipped OR<br/>mullet wig equipped, and a briefcase<br/>before using those blueprints</font></center>').appendTo($('a:last').parent());
		break;
	case "A Sietch in Time": // put stuff here
		break;
	case "Not So Much With The Humanity":
		$('<center><a href="'+snarfblat(385)+'">Adventure in the Red Zeppelin</a></center><br />').prependTo($('a:last').parent());
		break;
	case "":	// got a "You shouldn't be here" or other reject message... (or an untitled Limerick Dungeon adventure, sigh)
		if (document.location.search=="?snarfblat=100") {	// we were trying for Whitey's Grove; go get the quest from the guild.
			mainpane_goto("guild.php?place=paco");
		} else if (document.location.search=="?snarfblat=141") { // we were at the Pond (frozen dooks)
			$('<center><a href="adventure.php?snarfblat=142">Adventure in the Back 40</a></center><br />')
				.prependTo($('a:last').parent());
		} else if (document.location.search=="?snarfblat=142") { // we were at the Back 40 (hot dooks)
			$('<center><a href="adventure.php?snarfblat=143">Adventure in the Other Back 40</a></center><br />')
				.prependTo($('a:last').parent());
		} else if (document.location.search=="?snarfblat=143") { // we were at the Other Back 40 (spooky dooks)
			$('<center><a href="bigisland.php?place=farm&action=farmer&pwd='+pwd+'">See the Farmer</a></center><br />')
				.prependTo($('a:last').parent());
		} else if (document.location.search=="?snarfblat=324") { // no access to top floor of castle
			$('<center><a href="'+snarfblat(323)+'">Work the Ground Floor Some More</a></center><br />')
				.prependTo($('a:last').parent());
		}
		break;
	}
}

// GUILD: links for what your guild folks ask you to do
function at_guild() {
	$('img').each(function()
	{
		var onclick = this.getAttribute('onclick');
		if (onclick != undefined && onclick.indexOf("desc") != -1) {
			AddLinks(onclick, this.parentNode.parentNode, null, thePath);
		}
	});
	var subloc = document.location.search;
	var td = $('center table tr td center table tr td:first');
	var tdtext = $(td).text();
	switch (subloc) {
		case "?place=paco":
			if (tdtext.indexOf("White Citadel") != -1) {
				td.append(AppendLink('[Whitey\'s Grove (1)]', snarfblat(100)));
				td.append(AppendLink('[Road to WC (1)]', snarfblat(99)));
			}
			else if ((tdtext.indexOf("with the meatcar?") != -1) || (tdtext.indexOf("meatcar parts") != -1)) {
				if (GetCharData("friendlyknoll") == true) {
					td.append(AppendLink('[gnoll store]', "store.php?whichstore=5"));
				} else {
					 td.append(AppendLink('[Knoll]', to_place('knoll_hostile')));
				}
			}
		break;
		case "?place=ocg":
			if (tdtext.indexOf("Misspelled Cemetary") != -1) {	// common opening phrase to find F's key.
				$('p:last').append(AppendLink('[Misspelled Cemetary (1)]',snarfblat(21)));
			} else if  ((tdtext.indexOf("brought me Fernswarthy's key") != -1) || 	// mus inter for finding F's key
				 (tdtext.indexOf("brought the key to") != -1) ||					// mys inter
				 (tdtext.indexOf("haven't got Fern") != -1))						// mox inter
			{
				td.append(AppendLink('[Misspelled Cemetary (1)]',snarfblat(21)));
			} else if ((tdtext.indexOf("searching the ruins") != -1) ||		// mus post-key/pre-dusty book
				 (tdtext.indexOf("a very busy man") != -1) ||				// mys
				 (tdtext.indexOf("searching the tower") != -1))				// mox
			{
				td.append(AppendLink('[Tower Ruins (1)]',snarfblat(22)));
			}
		break;
		case "?place=scg":
			if (tdtext.indexOf("the two oldest and wisest") != -1) 		// common opening phrase, yay.
			{
				$('p:last').append(AppendLink('[hermit]','hermit.php')).append(AppendLink('[casino]','casino.php'));
			} else if ((tdtext.indexOf("not completed your Epic") != -1) ||		// Mus interstitial
					   (tdtext.indexOf("not yet completed your Epic") != -1) || // Mys interstitial
					   (tdtext.indexOf("delay on that epic") != -1))			// Mox interstitial
			{
				td.append(AppendLink('[hermit]','hermit.php')).append(AppendLink('[casino]','casino.php'));
			} else if (tdtext.indexOf("Beelzebozo") != -1) 						// EW->LEW assignment, all classes.
			{
				$('p:last').append(AppendLink('[Fun House (1)]',snarfblat(20)));
			} else if ((tdtext.indexOf("restore the Legendary") != -1) || 			// mus inter
					   (tdtext.indexOf("acquire the Legendary") != -1) || 			// mys inter
					   (tdtext.indexOf("with that Legendary") != -1))				// mox inter
			{
				td.append(AppendLink('[Fun House (1)]',snarfblat(20)));
			} else if (tdtext.indexOf("on your map") != -1) 				// Cave assignment, all classes
			{
				if ($('p').length) $('p:last').append(AppendLink('[nemesis cave]','cave.php'));
				else td.append(AppendLink('[nemesis cave]','cave.php'));
			} else if ((tdtext.indexOf("defeated your Nemesis yet") != -1) ||		// Mus inter
				(tdtext.indexOf("need you to defeat") != -1) ||						// Mys inter
				(tdtext.indexOf("beat your Nemesis yet, eh?") != -1))				// Mox inter
			{
				td.append(AppendLink('[nemesis cave]','cave.php'));
			} else if (tdtext.indexOf("volcano lair or something") != -1) {	// all classes: start of assassin encounters
				td.append('<p><font color="blue">(Come back after you get the Secret Tropical Volcano Lair map from a nemesis assassin.)</font>');
			} else if (tdtext.indexOf("I was hoping you could lend me one") != -1) { // all classes: island openable
				$('p:last').append(AppendLink('[equip fledges]',equip({i:3033,s:3})))
						   .append(AppendLink('[Poop Deck (1)]',snarfblat(159)));
			}
		break;
		case "?place=challenge":
			//add links here for going to haunted pantry, sleazy back alley, or Cobb's Knob.
			if ((tdtext.indexOf("So you wanna join the Department of Shadowy") != -1) ||    // moxie quest opener
				(tdtext.indexOf("manage to steal your own pants") != -1)) {                 // moxie not-done-yet
				$('p:last').append(AppendLink('[back alley (1)]',snarfblat(112)));
			} else if ((tdtext.indexOf("particularly the big ones") != -1) ||               // muscle opener
					   (tdtext.indexOf("it has to be a really big one") != -1)) {           // muscle not-done-yet
				$('p:last').append(AppendLink('[knob outskirts (1)]',snarfblat(114)));
			} else if ((tdtext.indexOf("particular poltersandwich") != -1) ||               // myst opener
                        (tdtext.indexOf("cinnabonshee") != -1)) {                           // myst not-done-yet
                $('p:last').append(AppendLink('[haunted pantry (1)]',snarfblat(113)));
            }
		break;
	}
}


// ARCADE: display # of tokens and tickets on the main arcade screen.
function at_arcade() {
	GM_get(server+'api.php?what=inventory&for=MrScript',function(response) {
		var invcache = $.parseJSON(response);
		var tokens = ((invcache[4621] === undefined) ? "no" : invcache[4621]) + " token" + ((invcache[4621] == 1) ? " " : "s ");
		var tickets = ((invcache[4622] === undefined) ? "no" : invcache[4622]) + " ticket" + ((invcache[4622] == 1) ? ". " : "s. ");
		var arcadeInfo = document.createElement('div');
		arcadeInfo.innerHTML = "<center><p>You have "+tokens+" and "+tickets+"</center>";
		document.body.appendChild(arcadeInfo);
	});
}

// CHOICE: special functions for choice adventure text.
function at_choice() {

	InlineItemDescriptions();

	var square = GetCharData("square");
	SetCharData("square",false);
	var $NCTitle = $('b:eq(0)');
	var NCText = $NCTitle.text();

	if((NCText !== "Results:") && (GetPref("choicelinks") == 1)) {
    	$NCTitle.wrap('<a style="color:white;" href="http://kol.coldfront.net/thekolwiki/index.php/'+
			'Special:Search?search='+ NCText.replace(/\s/g, '+').replace('"', '') +'&go=Go" '+
			'target="_blank"></a>');
    }
	if (square) {
		if (square.indexOf("hiddencity") != -1) link_hiddencity(square);
		if (square.indexOf("cellar.php") != -1) {
			if (NCText != "Results:") {
				SetCharData("square",square);	// not "Results:" means it's the choosing half of the choice, where you don't need links.
												// but it will be "Results:" after we choose something, so pass our Square data onward.
			} else {
				link_cellar(square);			// "Results:" means it's the result of the choice, where you need the links.
			}
		}
	}
	var cNum = 0;

	var inputs = $('input[name="whichchoice"]');
	if (inputs && inputs[0]) { cNum = inputs[0].value; }
	if (cNum >= 366 && cNum <= 386) {
		spoil_Krakrox(cNum);
	}
	if (cNum == 872) {  //new palindome shelves
		var sels = $('select');
		if (sels.length) {
			sels.val(function(index, value) {
				return [2259,7264,7263,7265][index];
			});
		}
		return;
	}

	var choicetext = $('body').text(); // for finding stuff that's not in a <p> tag.  sigh.
	$('div[style*="green"] > p').addClass("greenP");
	var p = $("p").not(".greenP");
//	var p=document.getElementsByTagName('p');
	if (p.length) {
		var p0 = p.get(0); //p[0];
		var p0text = p0.textContent;
		if (p0text.indexOf("actually a book.") != -1) {	// The Oracle
			p0.appendChild(AppendLink('[go ahead, read it already]',inv_use(818)));
		} else if (p0text.indexOf("a new pledge") != -1) {	// Orcish Frat House Blueprints adventure
			$('a [href="adventure.php?snarfblat=27"]')
				.attr('href',snarfblat(157))
				.text("Adventure in BARRRNEY'S BARRR");
		} else if (p0text.indexOf("go tell Bart") != -1) {  // the Tavern Faucet
			p0.appendChild(AppendLink('[go on already]','tavern.php?place=barkeep'));
		} else if (choicetext.indexOf("Goth Giant's turn to take out") != -1) { // finished new castle wheel
			$('a:last').parent()
				.prepend('<center><a href=' + snarfblat(324) +
				'>Adventure Again (The Castle in the Clouds in the Sky (Top Floor))</a></center><br/>');
		} else if (p0text.indexOf("You step up behind the man") != -1) {	// found Mr. Alarm
			$('<center><a href="adventure.php?snarfblat=100">Adventure in WHITEY\'S GROVE</a></center><br />')
				.prependTo($('a:last').parent());
			// add a link to cooking here.
		} else if (p0text.indexOf("clutching your pants triumphantly") != -1) { // AT guild-opening quest
			p0.appendChild(AppendLink('[back to the guild]','guild.php?place=challenge'));
		} else if (p0text == "Blech.") {
			$('a:contains("Adventure Again (McMillicancuddy")')
				.prepend('<center><a href=adventure.php?snarfblat=141>Go to the Pond</a></center><br />');
		} else if (p0text.indexOf('children Stephen and Elizabeth') != -1) {
			$('<center><a href="adventure.php?snarfblat=103">Adventure in The Conservatory</a></center><br />')
				.prependTo($('a:last').parent());
		} else if (p0text.indexOf("you find yourself face to face with... yourself") != -1) {
			var saidgmob = GetCharData("saidbeeguy");
			if (saidgmob == undefined) saidgmob = 0;
			$('p:last')
				.append("<br /><font color='blue'>You have said 'Guy made of bees' "
					+ saidgmob + " times.</font><br />");
		} else if (choicetext.indexOf("Guy made of bees.") != -1) {
			var gmob = GetCharData("saidbeeguy");
			if ((gmob == undefined) || (gmob == 0)) gmob = 1;
			else gmob = gmob + 1;
			SetCharData("saidbeeguy",gmob);
		} else if (p0text.indexOf("metal staircase descending from") != -1) {
			p0.appendChild(AppendLink('[go upstairs]','manor2.php'));
		} else if (p0text.indexOf("weird pink-headed guys") != -1) { // big brother sea monkey
			$('<center><a href="monkeycastle.php?who=1">See Little Brother</a></center><br />')
				.prependTo($('a:contains("Adventure Again")').parent());
		} else if ((choicetext.indexOf("You glimpse a giant chore wheel on the wall") != -1) ||
				(choicetext.indexOf("You see a chore wheel hanging high on the wall") != -1))
		{
			$('<center><a href="'+snarfblat(323)+'">Adventure on the GROUND FLOOR</a></center><br />')
				.prependTo($('a:contains("Adventure Again")').parent());
		} else if (p0text.indexOf("The ground floor is lit much better") != -1) {
			$('<center><a href="'+snarfblat(324)+'">Adventure on the TOP FLOOR</a></center><br />')
				.prependTo($('a:contains("Go back to")').parent());
		} else if (choicetext.indexOf("You give the wheel a mighty turn") != -1) {
			mainpane_goto('pyramid.php');
		} else if (p0text.indexOf("You make your way up into") != -1) {
			$('<center><a href="'+to_place('hiddencity')+'">Visit Beautiful Downtown Hidden City</a></center><br />')
				.prependTo($('a:contains("Go back to")').parent());
			//	p0.appendChild(AppendLink('[hidden city]',to_place('hiddencity')));
		} else if (choicetext.indexOf("hacienda. You do find an") != -1) {
			var clueText = /You do find an (\.*?),/.match(choicetext)[1];
			clueText = "<br /><font color='blue'>You found <b>" + clueText + "</b></font><br/>";
			$(clueText).appendTo($(p).find(':last'));
		} else if (choicetext.indexOf('Having finally fought your way') != -1) {
			var p1 = $('p:contains("Having finally fought")').text;
			nextZoneName = p1.match(/This must be (\w+),/)[1];
			$('a:contains("Adventure Again")')
				.replaceWith('<a href="adventure.php?snarfblat=320">Adventure in '+nextZoneName+'</a>');
		} else if (p0text.indexOf("Then good luck to you on your travels") != -1) {
			//probably got something from Gnasir!
			p0.appendChild(AppendLink('[use pamphlet]',inv_use(6854)));
		} else {
			var kText = [["The lever slides down and stops","L"],
					["some sort of intervention was called","N"],
					["You give the iron gate a mighty kick","O"],
					["You fit the two halves of the stone","P"]
				];
			for (var i=0; i<kText.length; i++) {
				if (p0text.indexOf(kText[i][0]) != -1) SetCharData("Krakrox",kText[i][1]);
			}
		}
	}
}

// Forest Village: Untinker linker.
function at_forestvillage() {
	var plunger = GetCharData("friendlyknoll");
	var linkloc = plunger ? to_place("knoll_friendly&action=dk_innabox") : to_place('knoll_hostile');
	var linkname = plunger ? "[get it from Innabox]" : "[head to degrassi knoll]";
	$('td:contains("just lost without my"):last').append(AppendLink(linkname,linkloc));
	$('td:contains("luck finding my screw"):last').append(AppendLink(linkname,linkloc));
	if (plunger) $('b:contains("Untinker")').append(AppendLink('[innabox]',linkloc));
}

function at_town_wrong() {
	if (document.location.search.indexOf("artist") != -1) {
		$('p').each(function()	{
			var p = $(this);
			var txt = p.text();
			if (txt.indexOf('Knob Goblin') != -1) 		p.append(AppendLink('[Knob outskirts (1)]',snarfblat(114)));
			if (txt.indexOf('Haunted Pantry') != -1) 	p.append(AppendLink('[Pantry (1)]',snarfblat(113)));
			if (txt.indexOf('Back Alley') != -1) 		p.append(AppendLink('[Alley (1)]',snarfblat(112)));
		});
	}
}

// BHH: provide some convenience links here too.
function at_bounty() {

	InlineItemDescriptions();

	var bountyloc = [
		//item name, link display, adventure location ID
		["bean-shaped rocks",               "[chamber (1)]",         "33"],
		["bloodstained briquettes",         "[outskirts (1)]",       "114"],
		["broken petri dishes",             "[lab (1)]",             "50"],
		["broken plunger handles",          "[restroom (1)]",        "351"],
		["bundles of receipts",             "[treasury (1)]",        "260"],
		["callused fingerbones",            "[border (1)]",          "45"],
		["crumpled pink slips",             "[brawl (1)]",           "233"],
		["drops of filthy ichor",           "[alley (1)]",           "112"],
		["empty greasepaint tubes",         "[funhouse (1)]",        "20"],
		["half-empty bottles of eyedrops",  "[gym (1)]",             "353"],
		["handfuls of meatberries",         "[conservatory (1)]",    "103"],
		["important bat files",             "[junction (1)]",        "31"],
		["pink bat eyes",                   "[entry (1)]",           "30"],
		["pieces of triffid bark",          "[forest (1)]",          "15"],
		["shredded can labels",             "[pantry (1)]",          "113"],
		["suspicious moles",                "[menagerie (1)]",       "53"],

		["absences of moss",                "[oasis (1)]",           "122"],
		["bits of wilted lettuce",          "[palindome (1)]",       "119"],
		["burned-out arcanodiodes",         "[airship (1)]",         "81"],
		["coal buttons",                    "[snowmen (1)]",         "272"],
		["discarded pacifiers",             "[castle:top (1)]",      "324"],
		["dusty wings",                     "[desert (1)]",          "364"],
		["disintegrating corks",            "[cellar (1)]",          "178"],
		["lengths of bent pipe",            "[camp (1)]",            "12354"],
		["non-Euclidean hooves",            "[gallery (1)]",         "106"],
		["bits of sticky stardust",         "[hole (1)]",            "83"],
		["beard crumbs",                    "[castle:basement (1)]", "322"],
		["rusty tap handles",               "[bathroom (1)]",        "107"],
		["spare abacus beads",              "[hidden city (1)]",     "343"],
		["spent handwarmers",               "[slope (1)]",           "273"],
		["warrrrrts",                       "[poop deck (1)]",       "159"],
		["worthless pieces of yellow glass","[dungeons of doom (1)]","39"],

		/*
		["chunks of hobo gristle",          "[Back Alley (1)]",     "112"],
		["oily rags",                       "[Knoll (1)]",          "18"],
		["empty aftershave bottles",        "[frat house (1)]",     "27"],
		["greasy dreadlocks",               "[hippy camp (1)]",     "26"],
		["vials of pirate sweat",           "[pirate's cove (1)]",  "66"],
		["balls of white lint",             "[Whitey's Grove (1)]", "100"],
		["worthless pieces of yellow glass","[Dungeons of Doom (1)]","39"],
		["billy idols",                     "[Goatlet (1)]",        "271"],
		["burned-out arcanodiodes",         "[Airship (1)]",        "81"],
		["coal buttons",                    "[Ninja Snowmen (1)]",  "272"],
		["discarded pacifiers",             "[Castle:Top (1)]",     "324"],
		["disintegrating corks",            "[Wine Cellar (1)]",    "178"],
		["non-Euclidean hooves",            "[Louvre (1)]",         "106"],
		["sammich crusts",                  "[Roflmfao (1)]",       "80"],
		*/
	];
	// going back to see the BHH gives the relevant text in the first <p>.

	$('img[width=30][class!=hand]').each(function(n, el) {
		var $img = $(this); if($img.attr("title") === "filthy lucre") return true;
		var $td = $img.parent().parent().children("td:eq(1)");

		var txt = $td.text();
		if(txt) for (var i=0; i<bountyloc.length; i++) {
			if (txt.indexOf(bountyloc[i][0]) !== -1) {
				$td.append(AppendLink(bountyloc[i][1], snarfblat(bountyloc[i][2])));
				break;
			}
		}
	});



/*
	$('p:first').each(function() {
		var p = $(this);
		var txt = p.text();
		for (var i=0; i<bountyloc.length; i++) {
			if (txt.indexOf(bountyloc[i][0]) !== -1) {
				p.append(AppendLink(bountyloc[i][1],snarfblat(bountyloc[i][2])));
				break;
			}
		}
	});
*/

	// visiting the BHH for the first time gives the text in the first <td> of the second <table>.
	// going back to see the BHH subsequently also gives the text in the first <td>, but that <td> also encompasses the rest of the form.

/*
	$('table:eq(1) td:first').each(function() {
		var p = $(this);
		var txt = p.text();
		if (txt.indexOf("Manual of Transcendent Olfaction") != -1) return;	// we'll be modifying the <p> above instead.
		for (var i=0; i<bountyloc.length; i++) {
			if (txt.indexOf(bountyloc[i][0]) != -1) {
				p.append(AppendLink(bountyloc[i][1],snarfblat(bountyloc[i][2])));
				break;
			}
		}
	});
*/

}

function at_mall() {
	$('center table tr td center table:first').prepend('<tr><td><center><a href=managestore.php>Manage your Store</a><br /><br /></center></td></tr>');
}

function at_managestore() {
	$('a[href="storelog.php"]').parent().append('<br /><br /><a href=mall.php>Search the Mall</a><br />');
}

// MALLSTORE: add fun links to (some of) the things you buy!
function at_mallstore() {
	var img = document.images[0];
	if (img == undefined) return;
	var onclick = img.getAttribute("onclick");
	if (onclick != undefined && onclick.indexOf("desc") != -1) {
		AddLinks(onclick, img.parentNode.parentNode, img.parentNode.parentNode.parentNode.parentNode.parentNode, thePath);
	}
	for (var i=1,len=document.images.length; i<len; i++) {
		img = document.images[i];
		onclick = img.getAttribute("onclick");
		if (onclick != undefined && onclick.indexOf("desc") != -1) AddInvCheck(img);
	}
}

// BEERPONG: Auto-choose pirate insults.
function at_beerpong() {
	var val = 0, html = $('img[src*="beerpong"]').parent().parent().html();
	if (html) {
		if (html.indexOf('ll flay') != -1) val = 1;
		else if (html.indexOf('craven') != -1) val = 2;
		else if (html.indexOf('pestilent') != -1) val = 3;
		else if (html.indexOf('run red') != -1) val = 4;
		else if (html.indexOf('ned goat') != -1) val = 5;
		else if (html.indexOf('tle girl') != -1) val = 6;
		else if (html.indexOf('some worm') != -1) val = 7;
		else if (html.indexOf('ngle man') != -1) val = 8;

		var sel = $('select[name="response"]');
		sel.children().each(function() {
			if ($(this).val() > 8) $(this).attr('disabled','disabled');
		});
		if (val > 0) {
			var opt = sel.find('option[value="'+val+'"]');
			if (opt.length > 0) opt.attr('selected','selected');
			else val = 0;
		}
		if (val == 0) {
			sel.prepend($(document.createElement('option'))
				.attr('selected','selected').attr('value','0')
				.html(' '));
			$('table:last').append("<br /><center><font color='blue'>'"+
								"You don't have the right response for that insult.</font></center>");
		}
	}
	if ($('p:first').text().indexOf("You laugh as Ricket") != -1) {		// insert only upon beerpong success.
		$('a[href="cove.php"]').parent().prepend("<center><a href='"+snarfblat(158)+"'>Adventure in the F'c'le</a></center><br />");
	}
}

function at_showplayer() {
	InlineItemDescriptions();
}

// INVENTORY: Add shortcuts when equipping outfits
function at_inventory() {

	InlineItemDescriptions();

	var firstTable = document.getElementsByTagName('table')[0];

	var gearpage = 0; // Man, this is annoying.
	var searchString = document.location.search;
	if (searchString.indexOf("which=2") != -1) gearpage = 1;

	// Miscellaneous messages that always route you back to inventory:
	else if (searchString.indexOf("action=message") != -1) {
		var fimg = $('img:first');
		var src = fimg.attr('src');
		if (src.indexOf('blackbird1') != -1) {									// blackbird
			fimg.append(AppendLink('[use map]',inv_use(2054)));
		}
		else if (src.indexOf('scroll1.gif') != -1) {							// 31337 scroll
			var clov = $('b:lt(5):contains(clover)');
			if (clov.length > 0) {
				var quant = clov.text().match(/^[0-9]*/);
				if (!quant) quant = 1;
				clov.append(AppendLink('[disassemble]','multiuse.php?pwd='+
				pwd+'&action=useitem&quantity='+quant+'&whichitem=24'));
			}
		}
	}

	// Real-time filtration (not ready for prime-time)
//	if(GetPref("inlineitemfilter"))
	$("#filter input").on("keyup", function(e) {
		var $input = $(this);
		var filterVal = $input.val().toLowerCase();
		if(!filterVal) { $(".item").show(); return true; }

		if(!window.currentItems) {
			window.currentItems = {};
			$(".item").each(function() {
				var $item = $(this);
				window.currentItems[$item.find("b").text().toLowerCase()] = $item;
			});
		}

		$.each(window.currentItems, function(k, $item) {
			$item.toggle(k.indexOf(filterVal) !== -1);
		});
	});


	// Equipment page only
	if (gearpage == 1) {
		var backup = GetPref('backup');
		var quickequip = GetPref("quickequip");
		var lnks = document.links;
		var unlink, famLock;
		var didQElink = false;
		var selecty = document.getElementsByTagName('select')[0];

		if (backup != '') {
			for (var i=0, len=lnks.length; i<len; i++) {
				var lnk = lnks[i];

				if (/familiar\.php/.test(lnk.href)) {
					famLock = lnk; continue;
				}

				if (lnk.text == "[unequip all]"
				 || lnk.text == "Manage your Custom Outfits")
				{
					var processingUnequipAll = 1;
					if (lnk.text != "Manage your Custom Outfits")
						unlink = lnk;
					else {
						processingUnequipAll = 0;
						unlink = selecty.parentNode.previousSibling;
						if (unlink != null) {
							unlink.firstChild.appendChild(
								document.createElement('tr'));
							unlink.firstChild.lastChild.appendChild(
								document.createElement('td'));
							unlink = unlink.firstChild.lastChild.lastChild;
							unlink.setAttribute('align','center');
							unlink.setAttribute('colspan','3');
							unlink.appendChild(document.createElement('font'));
							unlink = unlink.firstChild;
							unlink.setAttribute('size','1');
							unlink.appendChild(document.createTextNode(' '));
							unlink = unlink.lastChild;
						}
					}
					if (processingUnequipAll == 1) {
						var newlink = document.createElement('a');
						newlink.innerHTML = "[backup]";
						newlink.href = "#";
						//newlink.addEventListener('contextmenu',function(event)
						//{	alert('pow!');}, false);
						newlink.addEventListener('click',function(event) {
							this.innerHTML = "[backing up...]";
							GM_get(server + equip({a:'customoutfit',oname:GetPref('backup')}),
//							'/inv_equip.php?action=customoutfit&which=2&outfitname=' + GetPref('backup'),
							function(response) {
								for (var i=0, len=document.links.length; i<len; i++) {
									if (document.links[i].text.indexOf("...") != -1) {
										if (response.indexOf("custom outfits") == -1)
											document.links[i].innerHTML = "[done]";
										else document.links[i].innerHTML = "[too many outfits]";
										break;
									}
								}
							}); event.stopPropagation(); event.preventDefault();
						}, false);
						unlink.parentNode.insertBefore(newlink,unlink);
						unlink.parentNode.insertBefore(document.createTextNode(" - "),unlink);
					}

					// Save contents of outfit menu
					var nunewlink; var opty;
					for (i=1, len=selecty.options.length; i<len; i++) {
						opty = selecty.options[i];
						if (opty.text == backup) {
							nunewlink = document.createElement('a');
							nunewlink.innerHTML = "[revert to " + backup.toLowerCase() + "]";
							nunewlink.href = equip({a:'outfit',oid:opty.value});
							//"inv_equip.php?action=outfit&which=2&whichoutfit=" + opty.value;
						}
					}

					if (nunewlink)
						unlink.parentNode.insertBefore(nunewlink,unlink);
					if (processingUnequipAll == 1) unlink.parentNode.insertBefore(
						document.createTextNode(" - "),unlink);
					break;
				}
			}
		}
	} // equippage
// this is where we go back to a useful location if we've done/used something elsewhere that caused the inventory page to load.
	if (GetPref('shortlinks') > 1 && firstTable.rows[0].textContent == "Results:") {
		var resultsText = firstTable.rows[1].textContent;
		var jb = $('b:eq(1)');
		var bText = jb.text();
		var goHere = checkForRedirects(resultsText);
		if (goHere != "") {
			mainpane_goto(goHere);
		}
// and this is where we add all the nifty little links after equipping something.
		else if (resultsText.indexOf("You equip an item") != -1) {
			process_equip(bText, jb);
		}
		else if (resultsText.indexOf("Outfit:") != -1) {
			process_outfit(bText, jb);
		}
		else if (resultsText.indexOf('You acquire an item') != -1) {
			var theItem = jb.parent().parent().get(0);
			AddLinks(null, theItem, null, thePath);
		}
		else if (resultsText.indexOf('acquire an effect') != -1) {
			process_effect(bText, jb);
		}
		else {
			process_results(resultsText, $(firstTable.rows[1]).children(':last'));
		}
	}
}

function process_results(rText, insLoc) {
	if (rText.indexOf("You can easily climb the branches") != -1) {
		insLoc.append(AppendLink('[temple (1)]',snarfblat(280)));
	} else if (rText.indexOf("You should go to A-Boo Peak") != -1) {
		if (insLoc.parent().find('p').length === 0) {
			insLoc.append(AppendLink('[A-Boo! (1)]',snarfblat(296)));
		} else {
			insLoc.parent().find('p').append(AppendLink('[A-Boo! (1)]',snarfblat(296)));
		}
	} else if (rText.indexOf("You give the wheel a mighty turn") != -1) {
		mainpane_goto('pyramid.php');
	} else if (rText.indexOf("it just seemed like a cool spy thing") != -1) {
		insLoc.append(AppendLink('[venture into the Knob]','cobbsknob.php'));
	} else if (rText.indexOf("At least now you know where the pyramid is") != -1) {
		insLoc.append(AppendLink('[$64,000 pyramid, baby]',to_place('desertbeach&action=db_pyramid1')));
	} else if (rText.indexOf("named Mr. Alarm that Dr. Awkward") != -1) {
		insLoc.append(AppendLink('[knob lab (1)',snarfblat(50)));
	} else if (rText.indexOf("insane, egotistical ramblings") != -1) {
		insLoc.append(AppendLink('[Go to Dr, do tog]',to_place('palindome&action=pal_droffice')));
	} else if (rText.indexOf('second volume is more of the same') != -1) {
		insLoc.append(AppendLink('[Go see Mr Alarm, ee! sog.]', to_place('palindome&action=pal_mroffice')));
	}
}



function checkForRedirects(resultsText) {
	var cl = [
		// "found this","came from here","send to here."
		["ladder into the Bat Hole","bathole",'/place.php?whichplace=bathole'],
		["cheap ratchet","pyramid","/pyramid.php"],
		["All items unequipped","lair6","/lair6.php"],
		["All items unequipped","lair1","/lair1.php"],
		["You discard your Instant Karma","lair6","/lair6.php"],
		["a tiny black hut with a sign","","/shop.php?whichshop=blackmarket"]
	];
	var i;
	var arrl = cl.length;
	for (i=0; i < arrl; i++) {
		if (resultsText.indexOf(cl[i][0]) != -1 && weCameFrom(cl[i][1])) {
			return cl[i][2];
		}
	}
	return "";
}

function at_palindome() {
	if ($('body').text().indexOf("accessible to you") != -1) {
		$('td:contains("That place"):last')
			.append(AppendLink('[equip Talisman, o Nam, silat! pi uqe?]',equip({i:486,s:3})));
	}
}

function weCameFrom(somepage) {
	if (document.referrer.indexOf(somepage) != -1) return true;
	else if (somepage == "") return true;
	else return false;
}

//helper function for kolproxy
function at_inv_use() {
	at_inventory();
}
function at_inv_equip() {
	at_inventory();
}

// GALAKTIK: Add use boxes when buying
function at_galaktik() {

	InlineItemDescriptions();

	var row = $('table:first tr:eq(1):contains("You acquire")'), txt;
	if (row.length == 1) {
		var num = 1;
		txt = row.text();
		if (txt.indexOf("an item:") == -1)
			num = $('b:eq(1)').text().split(" ")[0];
		var docG = integer($('table.item').attr('rel').match(/id=(\d+)/)[1]);
		if (GetPref('docuse') == 1 && docG < 233) {	// 231=unguent, 232=ointment.  we can auto-use those.
			var sanitycheck = FindMaxQuantity(docG, num, 0, 0) + 1;
			if (num > sanitycheck) num = sanitycheck;
			ajaxit('/multiuse.php?action=useitem&quantity=' + num +
				'&pwd=' + pwd + '&whichitem=' + docG
			);
		} else {
	//		AppendUseBox(docG, 0, 1, row.find('td center').get(0));
	//		if (num > 1) NumberLink($('b:eq(1)').get(0));
		}
	}
	var howMany = $('input[name="howmany"]');
	var check = $(document.createElement('input'))
		.attr("type","checkbox")
		.attr("name","usecheckbox")
		.attr("style","height:12px;width:12px;");
	if (GetPref('docuse') == 1) check.attr("checked",true);
	check.change(function() {
		var box = $('input[name="usecheckbox"]');
		if (box.attr('checked')) SetPref('docuse',1);
		else SetPref('docuse',0);
	});
	var checkSpan = $(document.createElement('span'))
		.attr("class","small")
		.append(document.createElement('br'))
		.append(document.createElement('br'))
		.append(check)
		.append(document.createTextNode("Auto-Use Unguents And Ointments"));
	howMany.after(checkSpan);
	$("img[src*='otherimages']:first")
	.attr('title','right-click to equip Travoltan Trousers')
	.attr('id','proprietor')
	.bind('contextmenu',pants);
}

// BIGISLAND: add inventory check, max buttons to Frat/Hippy Trade-In stores.
function at_bigisland() {
	$('img').each(function()
	{	var onclick = this.getAttribute('onclick');
		if (onclick != undefined && onclick.indexOf("desc") != -1)
			AddInvCheck(this);
	});
	// if we're showing the junkyard, add onclick events to track which junkyard zone we go into.
	if ((document.location.search == "?place=junkyard") || (document.location.search.indexOf("action=junkman") != -1)) {
		$('a:lt(4)').click(function() {
		var a = $(this);
		SetCharData("square",a.attr('href'));
		});
	}
	// add MAX buttons to the trade-in boxes
	var select = document.getElementsByTagName("select");
	if (select && select.length > 0) {	// Items to trade in at the store?
//		select[0].options.selectedIndex = 1;
		var qty = document.getElementsByName("quantity")[0];
		MakeMaxButton(qty, function(event) {
			var selectItem = document.getElementsByName('whichitem')[0];
			var box = document.getElementsByName('quantity')[0];
			var quant = ParseSelectQuantity(selectItem, ")");
			box.value = quant;
		});
	}
}

function pants(evt) {
	GM_get('http://'+server+equip({i:1792}), //inv_equip.php?pwd='+pwd+'&which=2&action=equip&whichitem=1792'
	function(txt) {
		var pimg = document.getElementById('proprietor');
		pimg.removeAttribute('id');
		pimg.parentNode.nextSibling.innerHTML +=
		'<br /><div class="tiny">' +
		(txt.indexOf('You equip') != -1 ?
		'Travoltan Trousers Equipped' :
		'Travoltan Trousers Could Not Be Equipped') + '</span>';
	});
	evt.stopPropagation();
	evt.preventDefault();
}

function at_mrstore() {
	InlineItemDescriptions();
}

// STORE: Add use boxes and links as appropriate
function at_store() {

	InlineItemDescriptions();

	var firstTable = $('table:first tbody');		// we're interested in this when it's the "Results:" box from buying something.
	var whichstore; var noform = 1;

	var insput = $('input[name="whichstore"]');
	if (insput.length > 0) {
		whichstore = insput.attr('value'); noform = 0;
	} else whichstore = document.location.search.match(/whichstore\=([a-z0-9])/)[1];

	// Refresh hash
	var inphash = $('input[name="phash"]');
	if (inphash.length>0) SetPwd(inphash.val());

	// Quantity checking
	$('img').each(function()
	{	var onclick = this.getAttribute('onclick');
		if (onclick != undefined && onclick.indexOf("desc") != -1)
			AddInvCheck(this);
	});

	// You can thank Mr. Mag for this one...
	// right-click on the image of the shopkeeper to put on your travoltan trousers without leaving the store.

	$("img[src*='otherimages']:first")
		.attr('title','right-click to equip Travoltan Trousers')
		.attr('id','proprietor')
		.bind('contextmenu',pants);

	if (GetPref('shortlinks') > 1 && firstTable != undefined &&
		firstTable.children('tr:first').text() == "Market Results:" &&
		firstTable.children('tr:eq(1)').text().indexOf("You acquire") != -1)
	{
		var descId = $('img:first').get(0).getAttribute('onclick');
		var acquireString = firstTable.children('tr:eq(1)').text();
		var acquireText = firstTable.find('tr:eq(1) td:first *:first');
		var bText = $('b:eq(1)').attr('valign','baseline');
		switch(whichstore) {
			case 'b':		// everything from the bugbear bakery is cookable.
				bText.parent().append(AppendLink('[cook]', '/craft.php?mode=cook')); break;
			case 'j':		// everything from the jeweler is pliable
				bText.parent().append(AppendLink('[ply]', 'craft.php?mode=jewelry'));
				break;
			case 's':		// everything from the meatsmith is smithable.
				if (weCameFrom('craft'))    //did we just buy a hammer?  go smithing.
					mainpane_goto('/craft.php?mode=smith');
				bText.parent().append(AppendLink('[smith]', 'craft.php?mode=smith'));
				break;
			case 'h':		// everything from the hippy is cook/mix/stillable.
				bText.parent()
					.append(AppendLink('[cook]', 'craft.php?mode=cook'))
					.append(AppendLink('[mix]', 'craft.php?mode=cocktail'))
					.append(AppendLink('[still]', 'guild.php?place=still'));
				break;
			case 'r':		// pirate store: untinker the dictionary.
				if (acquireString.indexOf('dictionary') != -1)
					bText.parent().append(AppendLink('[untinker]', to_place('forestvillage&action=fv_untinker')));
				break;
		}

		if (descId != undefined) {
			var whut = AddLinks(descId, bText.parent().parent().get(0), acquireText, thePath);
			//if ((whut == 'skill' || whut == 'use') && firstTable.children('tr:eq(1)').text().indexOf("an item:") == -1)
				//NumberLink(bText.get(0));
		}
	}

	var swap;
	if (GetPref('shortlinks') > 1) {
		if (whichstore == 'h') {
			if (noform == 1) swap = AppendOutfitSwap(2, "Like, Get Groovy, Man", 0);
			else swap = AppendOutfitSwap(0, "Whoa, Clear Your Head, Man", 0);
			$('p:first').append(swap);
		} else if (whichstore == 'b') {
			if (noform == 1) swap = AppendOutfitSwap(1,"Wave Your Hand And Say \"But I Am A Bugbear.\"", 0);
			else swap = AppendOutfitSwap(0,"Sneak Away Before The Bugbear Catches On", 0);
			$('p:first').append(swap);
		}
	}
}

function at_monkeycastle() {
	$('img:first').each(function()
	{
		var onclick = this.getAttribute('onclick');
		if (onclick != undefined && onclick.indexOf("desc") != -1)
			AddLinks(onclick, this.parentNode.parentNode, null, thePath);
	});
	//addWhere.append(AppendLink('[old man, see?]','oldman.php')); break;
}


// CASINO: Add link for buying pass.
function at_casino() {
	if (GetPref('shortlinks') > 1) {
		if ($('table:first tr:eq(1)').text().indexOf("Casino Pass") != -1)
			$('p:first').html(AppendBuyBox(40, 'm', 'Buy Casino Pass', 1));
	}
}

// CRAFT: Buttons for buying ovens, etc.
function at_craft() {
	var mode, mlink, store;
	var itemNeeded = 0, desc = "";
	mode = $('input[name="mode"]').val();
	var dtext = [	["combine","meat pastables"],["cook","foods"],["smith","arms + armor"],
			["cocktail","booze"],["jewelry","jewelry"],["multi","miscellaneous"]];
	var dlinks = "<tr><td><center><font size=2>Discoveries:&nbsp;";
	for (var i = 0; i < dtext.length; i++) {
		dlinks = dlinks + "[<a href=craft.php?mode=discoveries&what=" + dtext[i][0] + ">" + dtext[i][1] + "</a>]&nbsp;";
	}
	dlinks = dlinks + "</font></center></td></tr>";
	$("table:first tr:eq(2)").after(dlinks);
	mlink = $('b:contains("Results:")');
	ilink = $('a[href*="inv_use"]');	// link to install an already-owned campground item.  If it exists, we won't put up our buy button.
	var tbltext = mlink.parents('table:first').text();
	if (tbltext.indexOf("more advanced cooking appliance") != -1)   { itemNeeded = 157; desc = "Buy & Install a Dramatic Range"; 	store = 'm';}
	else if (tbltext.indexOf("cocktail set is not advanced") != -1) { itemNeeded = 236; desc = "Buy & Install a Queue du Coq kit"; 	store = 'm';}
	else if (tbltext.indexOf("haven't got a hammer") != -1)         { itemNeeded = 338; desc = "Buy a tenderizing hammer"; 		store = 's';}
	// buy from the Bad Moon store if it's available, since the stuff is half-price there.
	if (GetPref('shortlinks') > 1 && mlink.length > 0 && ilink.length == 0 && itemNeeded > 0) {
		mlink.parent().parent().parent().find('center:first').after('<span i