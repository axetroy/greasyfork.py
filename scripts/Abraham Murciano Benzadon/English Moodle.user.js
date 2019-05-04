// ==UserScript==
// @name         English Moodle
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Always redirect moodle to the english site
// @author       Abraham Murciano
// @match        https://moodle.jct.ac.il
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var url = window.location.href;
    if(url.indexOf('?lang=en') < 0 && url.indexOf('&lang=en') < 0){
        var prefix = (url.indexOf('?') < 0 ? '?' : '&');
        window.location.href += prefix + 'lang=en';
    }
})();