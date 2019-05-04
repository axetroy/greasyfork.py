// ==UserScript==
// @name         WaniKani Enable Spellcheck
// @namespace    http://tampermonkey.net/
// @version      0.01
// @description  Enables spellcheck
// @author       cometzero
// @include      https://www.wanikani.com/review/session
// @include      http://www.wanikani.com/review/session
// @include      https://www.wanikani.com/lesson/session
// @include      http://www.wanikani.com/lesson/session
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    document.getElementById("user-response").setAttribute("spellcheck", "true");

})();
