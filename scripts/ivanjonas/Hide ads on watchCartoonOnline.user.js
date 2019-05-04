// ==UserScript==
// @name         Hide ads on watchCartoonOnline
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  see title ^
// @author       You
// @match        https://www.watchcartoononline.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    GM_addStyle('\
div[style*="position: absolute"],\
div[style*="position:fixed"],\
div[style*="visibility:visible"],\
iframe:not([allowfullscreen]),\
#h-right,\
.mgbox {\
    visibility: hidden !important;\
}\
')
})();