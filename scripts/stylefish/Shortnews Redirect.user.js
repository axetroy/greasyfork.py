// ==UserScript==
// @name         Shortnews Redirect
// @namespace    stylefish
// @version      0.1
// @description  redirect to real article on shortnews instead of the mini reader with the big logo on top
// @author       stylefish
// @match        http://www.shortnews.de/beamto/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';   
    document.location = document.getElementById("source-iframe").src;
})();