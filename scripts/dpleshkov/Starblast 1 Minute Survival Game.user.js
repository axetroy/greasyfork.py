// ==UserScript==
// @name         Starblast 1 Minute Survival Game
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Allows you to make 1 minute-long survival mode games. (Instead of the usual 10 min limit)
// @author       Dmitry Pleshkov
// @match        https://starblast.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function allowOneMinute() {
        var input = document.getElementById("survival_time");
        if (input != null) {
            if (input.min == "10") {
                input.min = "1";
            }
        }
    }
    setInterval(allowOneMinute, 100);
})();