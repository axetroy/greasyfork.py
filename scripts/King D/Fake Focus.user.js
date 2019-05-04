// ==UserScript==
// @name        Fake Focus
// @description Patch some detection methods to detect focus.
// @namespace   http://dking.online/
// @include     http://*
// @include     https://*
// @run-at      document-start
// @version     0.1
// @grant       none
// ==/UserScript==


setInterval(function()
{
    document.hasFocus = function () {return true;};
    window.onfocus = null;
    window.onblur =null;
    document.onvisibilitychange = null;
    Object.defineProperty(document, "hidden", { value : false});
    Object.defineProperty(document, "visibilityState", { value : "visible"});
    Object.defineProperty(document, "webkitVisibilityState", { value : "visible"});
}, 1000);