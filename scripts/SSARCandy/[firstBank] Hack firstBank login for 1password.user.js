// ==UserScript==
// @name         [firstBank] Hack firstBank login for 1password
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  allow right click and set id for loginCustId
// @author       You
// @match        https://ibank.firstbank.com.tw/NetBank/index103.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('.id-num')[0].id='loginCustId';
    document.oncontextmenu = null;

    // Your code here...
})();