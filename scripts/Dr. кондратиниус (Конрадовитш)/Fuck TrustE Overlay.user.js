// ==UserScript==
// @name        Fuck TrustE Overlay
// @namespace   Konrad
// @description Removes this "Accept Cookies" so they dont have permissions to store cookies because you never accepted it. FUCK OFF TRUST E OVERLAYS [derauto.de]
// @version     1
// @grant       none
// ==/UserScript==
var framses = document.getElementsByClassName("truste_overlay"); // FUCK OF THIS PIECE OF SHITWARE
for(var i = 0;i < framses.length;i++){
  framses[i].remove();
}
var framses = document.getElementsByClassName("truste_box_overlay"); // FUCK OF THIS PIECE OF SHITWARE // FUCK OF THIS PIECE OF SHITWARE
for(var i = 0;i < framses.length;i++){
  framses[i].remove();
}
var framses = document.getElementsByClassName("truste_box_overlay_inner"); // FUCK OF THIS PIECE OF SHITWARE
for(var i = 0;i < framses.length;i++){
  framses[i].remove();
}