// ==UserScript==
// @name         移除淘宝小秘悬浮
// @version      0.1
// @icon         http://img.alicdn.com/favicon.ico
// @description  已购买
// @author       n0tyet
// @grant        unsafeWindow
// @include      *://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @run-at       document-end
// @namespace    http://www.n0tyet.com/
// ==/UserScript==

(function() {
	'use strict';
    window.setTimeout(function(){
        $('#J_xiaomi_dialog').remove();
    }, 500);
}());
