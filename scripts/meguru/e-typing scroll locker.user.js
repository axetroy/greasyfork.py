// ==UserScript==
// @name         e-typing scroll locker
// @namespace    e-typing scroll locker
// @version      0.1
// @description  try to take over the world!
// @author       meguru
// @match        https://www.e-typing.ne.jp/*
// @grant        none
// ==/UserScript==

(function() {

    var disableSpaceScroll = function(evt) {
        if (evt.keyCode === 32) {
            evt.preventDefault();
        }
    };
    document.addEventListener("keydown", disableSpaceScroll, false);
})();