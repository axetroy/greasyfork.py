// ==UserScript==
// @name         逛丢自动跳转电脑版
// @namespace    http://kirin.moe/
// @version      0.1
// @description  自动从逛丢移动版切换到电脑版
// @author       You
// @match        *guangdiu.com/m/mdetail.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var itemid = window.location.href.match('[0-9]{1,}')[0];
    window.location.href='../detail.php?id='.concat(itemid,'&kf=m');
    // Your code here...
})();