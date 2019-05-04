// ==UserScript==
// @name         Michael Larabel face hider
// @namespace    phoronix.com
// @version      0.1
// @description  Hides Michael Larabel's face from every freaking subpage on Phoronix website.
// @author       bicycle
// @match        https://phoronix.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById("about-author").style.display = 'none';
})();