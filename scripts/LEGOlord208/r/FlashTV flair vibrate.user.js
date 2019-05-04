// ==UserScript==
// @name         /r/FlashTV flair vibrate
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Make all /r/FlashTV flairs vibrate
// @author       You
// @match        https://www.reddit.com/r/FlashTV/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(".flair:hover { animation: vibrate 50ms infinite }");
})();