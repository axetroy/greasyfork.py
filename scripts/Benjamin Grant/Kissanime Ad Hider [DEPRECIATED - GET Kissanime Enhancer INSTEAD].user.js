// ==UserScript==
// @name     Kissanime Ad Hider [DEPRECIATED - GET Kissanime Enhancer INSTEAD]
// @include  http://kissanime.com/Anime/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @description Hides ads on Kissanime [DEPRECIATED - GET Kissanime Enhancer INSTEAD]
// @grant    none
// @version 0.0.1.20150823100113
// @namespace https://greasyfork.org/users/4072
// ==/UserScript==

//Usually 5 ads on each page with anime
setTimeout (clickLinkWithText, 333, "Hide");
setTimeout (clickLinkWithText, 444, "Hide");
setTimeout (clickLinkWithText, 555, "Hide");
setTimeout (clickLinkWithText, 666, "Hide");
setTimeout (clickLinkWithText, 777, "Hide");

function clickLinkWithText (linkText) {
    var targetLink = $("a:contains('" + linkText + "')");
    if (targetLink.length) {
        triggerMouseEvent (targetLink[0], "click");
    }
}

function triggerMouseEvent (node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent (eventType, true, true);
    node.dispatchEvent (clickEvent);
}