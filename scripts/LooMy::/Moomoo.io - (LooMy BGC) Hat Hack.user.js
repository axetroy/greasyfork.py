// ==UserScript== 
// @name Moomoo.io - (LooMy BGC) Hat Hack 
// @version 0.6
// @description Give yourself an advantage over the other players 
// @author IceHacks 
// @match *://moomoo.io/* 
// @match *://sandbox.moomoo.io/* 
// @grant none 
// @ 
// @namespace https://greasyfork.org/ru/scripts/371415
// ==/UserScript==  

(function() { 
'use strict'; 
// Replace the values with your hats, or leave them be. 
var _hats = { 
"96": undefined, // Numpad 0; Hat 0/Nothing 
"97": 7, // Numpad 1; Hat 7/Bull 
"98": 6, // Numpad 2; Hat 6/Soldier 
"99": 20, // Numpad 3; Hat 20/Samurai 
"100": 31, // Numpad 4; Hat 31/Fish 
"101": 40, // Numpad 5; Hat 40/Tank 
"102": 52, // Numpad 6; Hat 52/Thief 
"103": 22, // Numpad 7; Hat 22/Emp 
"104": 12, // Numpad 8; Hat 12/Speed 
"105": 9 // Numpad 9; Hat 9/Miner 
}; 
var hats = Object.keys(_hats); 

document.onkeydown = function (e) { 
// Does storeEquip exist? 
if (typeof storeEquip === "function") { 
// Yes, it does. 
var len = hats.length; 
var k = e.keyCode; 
// Check to see if that Key turns on a Hat 
if (_hats[k]) { 
// That key is a Hat Key! 
storeBuy(_hats[k]); // Buy the hat 
storeEquip(_hats[k]); // Equip the hat 
} 
} 
} 
})();