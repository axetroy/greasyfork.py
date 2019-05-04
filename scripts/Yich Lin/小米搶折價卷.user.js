// ==UserScript==
// @name         小米搶折價卷
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://event.mi.com/tw/sales2018/super-sales-day
// @include      https://event.mi.com/tw/sales2018/*
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    function checkForMoniDisplayChange () {
        $(".J_couponArea").removeAttr("disabled");
}
window.setInterval (checkForMoniDisplayChange, 10);
alert ={}

})();