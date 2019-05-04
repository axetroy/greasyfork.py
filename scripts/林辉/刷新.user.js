// ==UserScript==
// @name         刷新
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *
// @match        *
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
setInterval(()=>{
    location.reload();
},1000)
    // Your code here...
})();