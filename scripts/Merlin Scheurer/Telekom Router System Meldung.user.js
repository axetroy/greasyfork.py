// ==UserScript==
// @name         Telekom Router System Meldung
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Telekom System Meldungen direkt anzeigen
// @author       Merlin Scheurer
// @match        http://192.168.2.1/html/content/config/system_info.html*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('.radio-parent').show();
    // Your code here...
})();