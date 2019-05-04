// ==UserScript==
// @name         El Nation "Play" anywhere
// @namespace    http://www.dieterholvoet.com
// @version      1.0
// @description  Enables the pro feature "Play anywhere" for free!
// @author       Dieter Holvoet
// @match        el-nation.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var urls = document.querySelectorAll("#playTrack").forEach(function(e) {
        console.log(e);
        e.classList.add('noModalEvent');
    });
})();