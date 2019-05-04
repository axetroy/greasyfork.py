// ==UserScript==
// @name         AutoSwitchCNENInBing
// @namespace    com.github.shjanken
// @version      0.1
// @description  Auto switch en cn with bing
// @author       janken.wang@hotmail.com
// @match        https://*.bing.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function() {
        var tip = document.getElementById('tipTitle');
	if(tip) {
            var tipText = tip.innerText;
            if(tipText &&
               (tipText.includes('国内版') ||  tipText.includes('国际版'))) {
                tip.click();
            }
        }
    }, 2000);
})();
