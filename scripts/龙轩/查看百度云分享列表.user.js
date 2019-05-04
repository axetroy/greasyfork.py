// ==UserScript==
// @name         查看百度云分享列表
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  访问百度网盘pc端分享页时，会跳转到盘多多的分享页面列表（百度云官方已停分享列表）
// @author       ilxdh.com
// @match        *://pan.baidu.com/share/home*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var curHref = window.location.href;
    var curHref0 = curHref.split('home?uk=')[1].split('&suk')[0].split('#category/type=0')[0];
    var newHref = 'http://www.panduoduo.net/u/bd-' + curHref0;
    window.location.href = newHref;
})();