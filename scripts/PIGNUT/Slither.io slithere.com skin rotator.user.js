// ==UserScript==
// @name         Slither.io slithere.com skin rotator
// @version      1.0
// @description  Skin rotator for slither.io slithere.com
// @author       Slithere.com
// @namespace Slithere.com
// @match        http://slither.io/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var loopTheLoop = true; var nextSkin = 0; var theLoop = setInterval(function() { if (loopTheLoop) { if (nextSkin > 25) nextSkin = 0; if (snake !== null) setSkin(snake, nextSkin); nextSkin++; } else { clearInterval(theLoop); } }, 400);
})();