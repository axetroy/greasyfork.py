

// ==UserScript==
// @name         小米搶折價卷 test
// @namespace    http://tampermonkey.net/
// @version      1
// @description  try to take over the world!
// @author       You
// @match        https://event.mi.com/tw/sales2018/super-sales-day
// @include      https://event.mi.com/tw/sales2018/*
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==



(function() {
    'use strict';
    function _do () {
        $('.J_couponArea[data-coupon-id="898"]').removeAttr("disabled");
        $('.J_couponArea[data-coupon-id="898"]').click();

        $('.J_couponArea[data-coupon-id="897"]').removeAttr("disabled");
        $('.J_couponArea[data-coupon-id="897"]').click();

        $('.J_couponArea[data-coupon-id="896"]').removeAttr("disabled");
        $('.J_couponArea[data-coupon-id="896"]').click();
    }
    window.setInterval (_do, 200);
    alert = {}

})();