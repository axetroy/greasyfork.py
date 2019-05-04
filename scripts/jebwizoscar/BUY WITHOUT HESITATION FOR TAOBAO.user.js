// ==UserScript==
// @name         BUY WITHOUT HESITATION FOR TAOBAO
// @namespace    http://i0.md
// @version      0.1
// @description  BUY WITHOUT HESITATION
// @author       ieb
// @match        https://h5.m.taobao.com/cart/order.html*
// @grant        none
// ==/UserScript==
function test() {
    var cfa = document.querySelectorAll(".cell.fixed.action");
    if (cfa.length === 0) setTimeout(test, 100);
    cfa[0].click();
}
(function() {
    'use strict';
    test();
    // Your code here...
})();