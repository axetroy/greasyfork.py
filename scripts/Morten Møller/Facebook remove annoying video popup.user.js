// ==UserScript==
// @name            Facebook remove annoying video popup
// @namespace       Morten
// @description     Removes the video popup which is fucking annoying
// @include         *.facebook.com*
// @version         1.0
// ==/UserScript==

setInterval(function() {
    var elem = document.getElementsByClassName("_360g")[0];
    elem.parentElement.removeChild(elem);
}, 1000);

