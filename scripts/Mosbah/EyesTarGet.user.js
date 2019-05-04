// ==UserScript==
// @name         EyesTarGet
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  AlertIfFindTheTarget
// @author       MegaBOuSsOl
// @match        *
// @grant        God
// ==/UserScript==


var YourTarget = "YourTarget";
var Alarm=setInterval(function(){
    if ((document.body.outerHTML).indexOf(YourTarget) !== -1) { new Audio('https://www.memoclic.com/medias/sons-wav/0/230.mp3').play();clearInterval(Alarm);}
},
1000);