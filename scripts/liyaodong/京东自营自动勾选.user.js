// ==UserScript==
// @name         京东自营自动勾选
// @description  在京东搜索商品时自动勾选京东自营
// @version      0.10
// @author       Vanilla
// @license      MIT
// @match        http://search.jd.com/*
// @grant        none
// @run-at       document-body
// @namespace https://greasyfork.org/users/14035
// ==/UserScript==

if(!/wtype=1/.test(window.location.href)) window.location.href = window.location.href + '&wtype=1';