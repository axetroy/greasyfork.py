// ==UserScript==
// @name         空中网特贵商城增强-启用点券结算
// @namespace     http://TouHou.DieMoe.net/
// @version      0.2
// @description  修正特贵商城如果点券余额不足结算前的原价，无法使用点券进行交易的问题。
// @author       DieMoe
// @run-at       document-end
// @match       *://mall.kongzhong.com/cart/toSettle*
// @grant          unsafeWindow
// @compatible firefox
// @compatible chrome
// @compatible edge
// ==/UserScript==

(function() {
    'use strict';
    pay_0.removeAttribute("disabled");
})();