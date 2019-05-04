// ==UserScript==
// @name         nosql_nopt
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http://nosql.ru/forum/forums.php
// @grant        none
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
setTimeout(function() {
    var s = document.createElement('style');
    s.type = 'text/css';
    s.textContent = '.forum_table>tbody>tr:nth-child(3){display:none;}';
    document.querySelector('head').appendChild(s);
}, 10);
})();