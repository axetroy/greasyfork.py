// ==UserScript==
// @name         Apterous round highlighting fix
// @namespace    http://www.mattmorrison.co.uk
// @version      0.1
// @description  Improve highlighting for specific round links on apterous
// @author       Matt Morrison
// @match        https://www.apterous.org/viewgame.php?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var sheet = document.createElement('style');

    sheet.innerHTML = "\
        .highlight td {background-color: #fff !important;}\
        .highlight a:link.silent, .highlight a:visited.silent, .highlight td {color: blue;}\
        ";

    document.body.appendChild(sheet);

})();