// ==UserScript==
// @name         電子鍋
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to heat the world!
// @author       You
// @match        https://event.mi.com/tw/sales2018/super-sales-day
// @include      https://event.mi.com/tw/sales2018/*
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==


(function() {
    'use strict';
    function checkForMoniDisplayChange () {$(".buy-now J_flashBuyBtn").removeAttr("disabled");
}
window.setInterval (checkForMoniDisplayChange, 10);
alert ={}

})();