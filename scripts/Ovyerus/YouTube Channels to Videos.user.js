// ==UserScript==
// @name         YouTube Channels to Videos
// @namespace    https://www.youtube.com*
// @version      0.1
// @description  Replaces direct channel links to go to the videos page.
// @author       Ovyerus
// @match        www.youtube.com
// @grant        none
// @locale       en
// ==/UserScript==

(function() {
    'use strict';

    Array.from(document.querySelectorAll('a')).filter(function(a) {
        return /(?:https:\/\/)?(?:www\.)?youtube\.com\/(?:c(?:hannel)?|user)\/[A-z0-9-_]+(?!\/?.+)/i.test(a.href);
    }).forEach(function(a) {a.href += '/videos';});
})();