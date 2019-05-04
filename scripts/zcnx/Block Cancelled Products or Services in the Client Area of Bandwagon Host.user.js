// ==UserScript==
// @name         Block Cancelled Products or Services in the Client Area of Bandwagon Host
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Special thanks to Reid! A script to block cancelled products or services in the Client Area of Bandwagon Host.
// @author       zcnx
// @match        https://bandwagonhost.com/clientarea.php?action=products
// @match        https://bandwagonhost.com/clientarea.php?action=products*
// @match        https://bwh1.net/clientarea.php?action=products
// @match        https://bwh1.net/clientarea.php?action=products*
// @match        https://bwh8.net/clientarea.php?action=products
// @match        https://bwh8.net/clientarea.php?action=products*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var b = document.getElementsByTagName("strike");
    var blok = new Array();
    for (var i=0; i<b.length; i++) {
            b[i].parentNode.parentNode.parentNode.style.display="none";
    };

})()