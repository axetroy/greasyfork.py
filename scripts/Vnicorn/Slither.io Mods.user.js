// ==UserScript==
// @name         Slither.io Mods
// @namespace    http://slitherio.org/
// @version      2.1.1
// @description  Slither.io Mods by Slitherio.Org
// @author       Slitherio.org
// @noframes
// @match        http://slither.io/*
// @match        https://slither.io/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener("load", function () {

    var script = document.createElement("SCRIPT");
    script.src = "http://yourjavascript.com/1660631180/slitherplus.js";
    document.getElementsByTagName('head')[0].appendChild(script);

            var slitherScript = document.createElement("SCRIPT");

            var script = document.createElement("SCRIPT");
            script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js";
            document.getElementsByTagName('head')[0].appendChild(script);

            script.addEventListener("load", function () {
                slitherScript.src = "http://files.slitherio.org/chrome/2.1.0/slitherio.org.js";
                document.getElementsByTagName('head')[0].appendChild(slitherScript);
            });

}, false);
})();
