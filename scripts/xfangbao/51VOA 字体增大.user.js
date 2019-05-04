// ==UserScript==
// @name         51VOA 字体增大
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.51voa.com/*
// @grant        none
// @run-at       document-end


// ==/UserScript==

(function() {
    'use strict';

document.getElementById("content").style.fontSize="20px";
document.getElementById("content").style.fontFamily="arial";



    // Your code here...
})();