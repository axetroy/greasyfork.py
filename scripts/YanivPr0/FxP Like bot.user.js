// ==UserScript==
// @name         FxP Like bot
// @namespace    http://tampermonkey.net/
// @version      3.0.2
// @description  FxP Auto Liker + Auto page mover
// @copyright    2016+, DaCurse0
// @match        https://www.fxp.co.il/showthread.php?*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    var spans = document.getElementsByTagName("span");
    for(var i = 0; i < spans.length; i++) {
        if(spans[i].getAttribute('onclick') == "makelike(this.id);") {
            spans[i].click();
            console.log("Liked");
        }
    }
    document.getElementsByClassName('sp_show showth-next-left')[0].click()
})();