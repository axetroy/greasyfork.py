// ==UserScript==
// @name         WebsiteBlocker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Blocking websites has never beem easier! Just add an website in the Match line, and it will be blocked!
// @author       Firel
// @match        https://*.net
// @match        http://example.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    alert("This page has been blocked and is no longer veiwable.");
    window.setTimeout(function(){ window.location = "about:home"; },30);

})();