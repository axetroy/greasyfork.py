// ==UserScript==
// @name         Hide click-through bullshit on videtreaming.io (gogoanime.io)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://vidstreaming.io/streaming.php*
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    var styles = '\
iframe[src^="//mt.rtmark.net"] + div {\
    display: none !important;\
    pointer-events: none !important;\
    z-index: -1 !important;\
    width: 0 !important;\
    position: static !important;\
}\
'
    GM_addStyle(styles)

    console.log($.fn.jquery);

    document.onmousedown = function(e) {
        e.preventDefault();
        console.log(e.target)
        return false;
    }, true);
    document.onmouseup = function(e) {
        e.preventDefault();
        console.log(e.target)
        return false;
    }, true);
})();