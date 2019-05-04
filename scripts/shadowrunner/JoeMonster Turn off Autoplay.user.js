// ==UserScript==
// @name         JoeMonster Turn off Autoplay
// @namespace    http://joemonster.org/
// @version      1.0
// @description  Turns off Autoplay on JoeMonster.org by changing cookie.
// @author       Shadowrunner
// @match        http://joemonster.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.cookie = document.cookie.replace("autoplay_off=false", "autoplay_off=true");
})();