// ==UserScript==
// @name         批量删除京东优惠券
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  批量删除京东优惠券（全部删除）
// @author       wuzhizhemu569@gmail.com
// @match        https://quan.jd.com/user_quan.action*
// @grant        none
// @run-at      document-end
// @require      http://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==

var url = 'https://quan.jd.com/user_quan.action?couponType=-1&sort=3&page=1';

(function() {
    'use strict';
setTimeout(function() {

var length = $('.coupon-item .c-range').length;
if (length === 0) return;
location.href = url;
for (var i = 0 ; i < length ;i++) {
var para = {
        couponId:  $('.coupon-item .c-range:eq('+i+') .range-item:eq(2) span.txt').text(),
        pin: document.cookie.replace(/(?:(?:^|.*;\s*)pin\s*\=\s*([^;]*).*$)|^.*$/, "$1")
}
    jQuery.ajax({
        type: "POST",
        url: "/lock_coupon.action?r=" + Math.random(),
        data: para,
        dataType: "json",
        cache: false,
        success: function (result) {}
    });
}
    setTimeout(function() {
        location.href = url
    }, 1000)
}, 2000)

})();