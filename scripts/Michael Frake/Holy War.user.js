// ==UserScript==
// @name        Holy War
// @namespace   https://greasyfork.org/users/3633-michael-frake
// @description Skips (clicks "New Opponent") those with characteristics lower/higher than a set amount of haul, attack, victory/loss ratio, defense, level, etc. - works great for those without premium who still want to find players with desirable attributes. Also automatically plunders, works, and attacks (optional) to get gold while you sleep. Simply change the min/max values to your desired specifications and let it roll!
// @include     http://holy-war.net/busy?w=4IN
// @include	http://holy-war.net/assault*
// @include 	http://holy-war.net/town/farm/?w=4IN
// @include	http://holy-war.net/char/*
// @include	http://holy-war.net/town/alchemist*
// @include	http://holy-war.net/welcome*
// @version     1
// @grant       none
// ==/UserScript==

//-------------
world="4IN";  //YOU MUST CHANGE THIS TO YOUR WORLD.
auto_attack=false;  //automatically attacks if opponent fits stat standards [CAUTION: USES GOLD].
auto_plunder=true;  //plunder automatically for 60 minutes.
auto_work=true;  //work only after plunder time=0. good at night.
auto_train=true;  //trains only the character's lowest stats and buys potions with the remaining gold automatically after plundering [NOT THE HORSE - CAUTION: USES GOLD].
var types=[  //YOU MUST CHANGE THESE TO YOUR STATS. (if you are going to use the auto attack feature)
level_min=18,
haul_min=150,  //do they ever play? if not, probably no gold.
strength_max=39,
attack_max=36,
agility_max=39,
stamina_max=35,
defence_max=36,
ratio_min=0.2     //if they lose constantly, they probably have no gold.
];
use_totals=false;  //if this is in effect, the script only considers the opponents stats summed up versus your summed up stats (my_total).
my_total=141;	   //total of all your basic stats, not including horse stats, equipment, or house. only 

/*
NOTE: Beware of contradictions. If you have auto attack on, the script is designed to ignore
auto work and vice versa (you can't attack/work at the same time).
*/
//-------------

additive='</td><td style="width:40%; text-align:left;">';
var strings = [
level_str='Level',
haul_str='Gold haul',
strength_str='Strength',
attack_str='Attack',
agility_str='Agility',
stamina_str='Stamina',
defence_str='Defence',
ratio_str='Victories/defeats'
];

if (window.location.href.indexOf("welcome") != -1 && auto_plunder == true) {
	window.location.href = "http://holy-war.net/assault/1on1/?w=" + world;
}

function check(string,type,limit) {
	string+=additive;
	if (document.body.innerHTML.indexOf(string) != -1) {
		var opp_stat=document.body.innerHTML.substring(document.body.innerHTML.indexOf(string)+string.length-2,document.body.innerHTML.indexOf(string)+string.length+8)
		opp_stat=Number(opp_stat.replace(/[^0-9.]/g,""))
		if (limit == "max") {
			if (opp_stat > type) {
				return true;
			}
		}
		else {
			if (opp_stat < type) {
				return true;
			}
			else {
			return false;
			}
		}
	}
}
var opp_total = 0; //opponents summed stats
for (var j=2; j<=6; j++) { //2-6 only b/c these are the stats
	opp_total+=types[j];
}

for (var i=0; i<strings.length; i++) { //0,1,7 are all the mins (level, ratio, haul)
	defeatable = true; //if check returns true, then you can't defeat the opponent or the opponent is too weak.
if (use_totals != true) {	
	if (i == 0 || i == 1 || i == 7) {
		if (check(strings[i],types[i],"min") == true) {
			defeatable = false;
		}
	}
	else {
		if (check(strings[i],types[i],"max") == true) {
			defeatable = false;
		}
	}
}
else {
	if (opp_total > my_total) {
		defeatable = false;
	}
}
//
if (defeatable == true && auto_attack == true && document.getElementsByName("Attack")[0]) {
	document.getElementsByName("Attack")[0].click(); //attack if defeatable
}

if (defeatable != true && document.getElementsByName("Attack")[0]) { //notice the lack of the second condition in the previous 'if' statement. searches and stops if you don't want it to auto attack, but attacks if you do.
	document.getElementsByTagName("button")[0].click(); //new opponent
}
//
}

var time_left = document.getElementsByName("ravageTime")[0];
if (document.body.innerHTML.indexOf("Gold plundered: ") != -1 || document.body.innerHTML.indexOf("Summarised fight report") != -1) {
	window.location.href = "http://holy-war.net/assault/1on1/" + world; //reset and plunder again if finished
}
if (time_left && auto_plunder == true && document.getElementsByName("PLUNDER_ACTION")[0] && time_left.options[0].value == "10") {
	document.getElementsByName("PLUNDER_ACTION")[0].click(); //click plunder if time is greater than 0
}
if (time_left && auto_plunder == false && auto_work == false && auto_attack == true) {
	document.getElementsByName("Search")[0].click(); //attacks if auto_attack=true
}
if (time_left != null && time_left.options[0].value != "10" && auto_work == true && auto_attack == false) {
	window.location.href = "http://holy-war.net/char/attributes/" + world;
}
if (window.location.href.indexOf("town/farm") != -1 && document.body.getElementsByTagName("select")[0] && auto_work == true) {
	document.body.getElementsByTagName("select")[0].value = "8" //8 hours for auto work after plunder
	document.body.getElementsByTagName("button")[0].click();
}
if (window.location.href.indexOf("char/") != -1 && auto_train == true) {
	var widths = [];
	var strings_stats = [
		'Strength',
		'Attack',
        'Defence',
		'Agility',
		'Stamina'
	];
	for (var i=0; i<strings_stats.length; i++) {
		string = strings_stats[i];
		var my_stat = document.body.innerHTML.substring(document.body.innerHTML.indexOf(string,9000)+446,document.body.innerHTML.indexOf(string,9000)+452);
		my_stat = Number(my_stat.replace(/[^0-9.]/g,""));
		widths[i] = my_stat;
	}
	var min_stat = Math.min.apply(Math, widths);
	var stat_num;
        for (var k=0; k<widths.length; k++) {
		    if (widths[k] == min_stat) {
			  stat_num = k;
              k = widths.length;
              break;
		    }
		}
	var buttons = document.getElementsByTagName("button");
	var clickables = [];
	for (var j=0; j<buttons.length; j++) {
		if (buttons[j].name == "Train") {
			clickables[j]=buttons[j];
		}
	}
	if (clickables.length == 8) {
		clickables[stat_num].click();
	}
	else if (clickables[0] && clickables.length > 3) {
		clickables[0].click();
	}
	if (auto_work == true) {
		window.setTimeout('window.location.href = "http://holy-war.net/town/alchemist/?w="' + world + ';',2000);
	}
}
if (window.location.href.indexOf("alchemist/") != -1 && auto_train == true) {
	var potions = document.getElementsByName("No alternative text available");
	var buyables = [];
		for (var i=0; i<potions.length; i++) {
			if (potions[i].innerHTML.indexOf("btn_kaufen") != -1) { //buy button image
				buyables[i] = potions[i];
			}
		}
	if (buyables[buyables.length-1]) {
		buyables[buyables.length-1].click();
	}
	else {
		window.setTimeout('window.location.href = "http://holy-war.net/town/farm/?w="' + world + ';',2000);
	}
}