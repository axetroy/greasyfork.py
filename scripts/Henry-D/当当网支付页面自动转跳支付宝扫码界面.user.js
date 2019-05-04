// ==UserScript==
// @name         当当网支付页面自动转跳支付宝扫码界面
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  快速进入扫码
// @author       Henry
// @match        http://payment.dangdang.com/paycenter2.aspx
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('#go_tab3').click();
    $('.bank_select').last().click();
    __doPostBack('A3','');
})();