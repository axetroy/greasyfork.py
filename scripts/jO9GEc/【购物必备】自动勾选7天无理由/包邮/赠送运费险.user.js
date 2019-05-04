// ==UserScript==
// @name         【购物必备】自动勾选7天无理由/包邮/赠送运费险
// @description  在搜索和列表界面自动勾选这2个,节省操作.
// @version      1.2
// @author      jO9GEc
// @match        https://s.taobao.com/*
// @grant        none
// @run-at       document-body
// @namespace https://greasyfork.org/users/14035
// ==/UserScript==

if (location.href.match('s.taobao.com')){
// if(!/&auction_tag%5B%5D=385/.test(window.location.href)) window.location.href = window.location.href + '&auction_tag%5B%5D=385';
// if(!/&baoyou=1/.test(window.location.href)) window.location.href = window.location.href + '&baoyou=1';
// if(!/delivery=1/.test(window.location.href)) window.location.href = window.location.href + '&delivery=1';
if(!/&auction_tag%5B%5D=4806/.test(window.location.href)) window.location.href = window.location.href + '&auction_tag%5B%5D=4806';
}