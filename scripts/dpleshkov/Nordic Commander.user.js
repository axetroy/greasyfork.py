// ==UserScript==
// @name         Nordic Commander
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  THANKS
// @author       Dmitry Pleshkov
// @match        https://starblast.io
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    // Based on http://stackoverflow.com/a/10520017/1307721 and http://stackoverflow.com/a/16022728/1307721
    // Thanks to https://gist.github.com/ejoubaud/7d7c57cda1c10a4fae8c
    // Podium code is not mine.
    var Podium = {};

    Podium.keydown = function (k, evt) {
        var oEvent = document.createEvent('KeyboardEvent');

        // Chromium Hack
        Object.defineProperty(oEvent, 'keyCode', {
            get: function () {
                return this.keyCodeVal;
            }
        });
        Object.defineProperty(oEvent, 'which', {
            get: function () {
                return this.keyCodeVal;
            }
        });

        if (oEvent.initKeyboardEvent) {
            oEvent.initKeyboardEvent(evt, true, true, document.defaultView, k, k, "", "", false, "");
        } else {
            oEvent.initKeyEvent(evt, true, true, document.defaultView, false, false, false, false, k, 0);
        }

        oEvent.keyCodeVal = k;

        if (oEvent.keyCode !== k) {
            alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
        }

        document.body.dispatchEvent(oEvent);
    };

    function thanksSpam() {
        Podium.keydown("X".charCodeAt(0), "keydown");
        Podium.keydown("X".charCodeAt(0), "keyup");


    }

    setInterval(thanksSpam, 10);

})();