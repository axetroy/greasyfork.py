// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://weibo.com/u/1860563805?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
     setTimeout(function () {
        window.location.reload();
     } ,5000);
})();