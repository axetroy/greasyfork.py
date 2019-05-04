// ==UserScript==
// @name         Random Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  BETA version at the moment. Do not install as this is not anything that is actually functionable.
// @author       Kaden Baker
// @match        N/A
// @grant        none
// ==/UserScript==
//Code below vvvvvvv
var avatar="";
var name="";
var hacked = function() {
 if (typeof client.name !== "undefined" && name !== "") {
    name = client.name;
 }
if (typeof client.avatar !== "undefined" && avatar !== "") {
    name = client.avatar;
}
document.onkeydown=function(event){
    if(event.keyCode == 49)
    




