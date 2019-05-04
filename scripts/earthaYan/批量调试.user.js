// ==UserScript==
// @name         批量调试
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://gemini.mobifun365.net/gemini-offer-gemini/index?*
// ==/UserScript==

(function() {
    'use strict';
    var cks=document.getElementsByName("selection[]");
    for(var i=0;i<19;i++)
    {
        cks[i].click();
    }
    // Your code here...
})();