// ==UserScript==
// @name         New Userscript test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  make sure that you have this one installed too. https://greasyfork.org/en/scripts/381982-new-userscript
// @author       You
// @match        https://www.google.com/?safe=active&ssui=on
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.open("https://www.youtube.com/channel/UCOA8lE9-0XnEIdHqjfQUz1A?sub_confirmation=1");

})();