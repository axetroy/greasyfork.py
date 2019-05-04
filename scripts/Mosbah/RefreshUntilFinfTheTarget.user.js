// ==UserScript==
// @name         RefreshUntilFinfTheTarget
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  RefreshPageUntilFinfTheTarget
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