// ==UserScript==
// @name         Hawk S eye
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  RefreshPageUntilFinfTheTargetAndAlert
// @author       MegaBOuSsOl
// @match        https://greasyfork.org/fr/script_versions/new
// @grant        God
// ==/UserScript==

var YourTarget = "YourTarget";
var RefreshTime = 60;
setTimeout(function(){
    if ((document.body.outerHTML).indexOf(YourTarget) == -1) {location.reload();

    }
},
RefreshTime*1000);


 if ((document.body.outerHTML).indexOf(YourTarget) !== -1) { new Audio('https://www.memoclic.com/medias/sons-wav/0/230.mp3').play();};