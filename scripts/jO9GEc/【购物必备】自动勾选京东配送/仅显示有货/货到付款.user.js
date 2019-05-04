// ==UserScript==
// @name         【购物必备】自动勾选京东配送/仅显示有货/货到付款
// @description  在搜索和列表界面自动勾选这3个,节省操作.
// @version      1.01
// @author      jO9GEc
// @match        https://search.jd.com/*
// @match        https://list.jd.com/*
// @match        http://search.jd.com/*
// @match        http://list.jd.com/*
// @grant        none
// @run-at       document-body
// @namespace https://greasyfork.org/users/14035
// ==/UserScript==

if (location.href.match('list.jd.com')){
if(!/delivery_daofu=3/.test(window.location.href)) window.location.href = window.location.href + '&delivery_daofu=3';
if(!/stock=1/.test(window.location.href)) window.location.href = window.location.href + '&stock=1';
if(!/delivery=1/.test(window.location.href)) window.location.href = window.location.href + '&delivery=1';
}else{
if(!/wtype=1/.test(window.location.href)) window.location.href = window.location.href + '&wtype=1';
if(!/stock=1/.test(window.location.href)) window.location.href = window.location.href + '&stock=1';
if(!/cod=1/.test(window.location.href)) window.location.href = window.location.href + '&cod=1';
}