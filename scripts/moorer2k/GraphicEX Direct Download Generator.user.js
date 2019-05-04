// ==UserScript==
// @name         GraphicEX Direct Download Generator
// @version      0.1
// @description  http://graphicex.com is a great place to get free full graphics, icons, and much more! This will simply fix all the forwarders so you can copy the direct links to the supplied downloads.
// @author       MooreR
// @grant        none
// @include      http://graphicex.com/*
// @namespace https://greasyfork.org/users/46853
// ==/UserScript==

(function() {
    'use strict';

    var allLinks = $('a');
    var i = 0;
    for (i = 0; i < allLinks.length; i++) {
        if(allLinks[i].href.includes('http://ouo.io/s/')){
            allLinks[i].setAttribute('href', decodeURIComponent(allLinks[i].href.split('?s=')[1]));
        }
    }
})();