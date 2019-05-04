// ==UserScript==
// @name         Mudkip Item Checker
// @namespace     Mudkip Item Checker
// @version      1
// @description  lets u check your items
// @author       SwaggyMudkip69#5935
// @match        http://moomoo.io/*
// @match        https://moomoo.io/*
// @match        http://45.77.0.81/*
// @match        https://45.77.0.81/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @connect      moomoo.io
// ==/UserScript==
(function() {
	'use strict';

var ID_Apple = 0;
var ID_Cookie = 1;
var ID_WoodWall = 2;
var ID_StoneWall = 3;
var ID_CastleWall = 4;
var ID_Spikes = 5;
var ID_GreaterSpikes = 6;
var ID_PoisonSpikes = 7;
var ID_SpinningSpikes = 8;
var ID_Windmill = 9;
var ID_FasterWindmill = 10;
var ID_Mine = 11;
var ID_PitTrap = 12;
var ID_BoostPad = 13;

var SID_Apple = 11;
var SID_Cookie = 12;
var SID_WoodWall = 13;
var SID_StoneWall = 14;
var SID_CastleWall = 15;
var SID_Spikes = 16;
var SID_GreaterSpikes = 17;
var SID_PoisonSpikes = 18;
var SID_SpinningSpikes = 19;
var SID_Windmill = 20;
var SID_FasterWindmill = 21;
var SID_Mine = 22;
var SID_PitTrap = 23;
var SID_BoostPad = 24;
var SID_Turret = 25;
var SID_Platform = 26;
var SID_HealingPad = 27;
var SID_SpawnPad = 28;

var playerSpikes = ID_Spikes;
var playerWindmill = ID_Windmill;
var playerWall = ID_WoodWall;
var playerSubItem = ID_PitTrap;
var playerFood = ID_Apple;

	document.addEventListener('keydown', function(e) {
     playerItems();
	});

function checkItems(){
//sub Item
if (document.getElementById("actionBarItem" + SID_PitTrap).style.display === 'none'){playerSubItem = ID_BoostPad;}else{playerSubItem = ID_PitTrap;}
//spikes
if (document.getElementById("actionBarItem" + SID_Spikes).style.display === 'none'){if (document.getElementById("actionBarItem" + SID_GreaterSpikes).style.display === 'none'){if (document.getElementById("actionBarItem" + SID_PoisonSpikes).style.display === 'none'){playerSpikes = ID_SpinningSpikes;}else{playerSpikes = ID_PoisonSpikes;}}else{playerSpikes = ID_GreaterSpikes;}}else{playerSpikes = ID_Spikes;}
//windmill
if (document.getElementById("actionBarItem" + SID_Windmill).style.display === 'none'){playerWindmill = ID_FasterWindmill;}else{playerWindmill = ID_Windmill;}
//wall
if (document.getElementById("actionBarItem" + SID_WoodWall).style.display === 'none'){if (document.getElementById("actionBarItem" + SID_StoneWall).style.display === 'none'){playerWall = ID_CastleWall;}else{playerWall = ID_StoneWall;}}else{playerWall = ID_WoodWall;}
//Food
if (document.getElementById("actionBarItem" + SID_Apple).style.display === 'none'){playerFood = ID_Cookie;}else{playerFood = ID_Apple;}
}
})();