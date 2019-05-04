// ==UserScript==
// @name         Anilinkz Auto watch-mode & Player loading ad removal
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://anilinkz.to/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function removeElement(id) {
        var elem = document.getElementById(id);
        return elem.parentNode.removeChild(elem);
    }

    document.getElementById('watchmode').click();
    removeElement('jade')

})();