// ==UserScript==
// @name         Facebook Livemap Zoom+
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Facebook Livemap Increase zoom level
// @author       mcbyte
// @match        https://www.facebook.com/livemap
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function(){
        L.Map.prototype.getMaxZoom=function(){return 15;};
    }, 3000);
})();