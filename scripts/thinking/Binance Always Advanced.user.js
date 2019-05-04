// ==UserScript==
// @name         Binance Always Advanced
// @version      0.2.1
// @description  Redirect Binance basic trade to advanced trade
// @author       thinking
// @match        *://*.binance.com/*
// @match        *://binance.com/*
// @run-at       document-start
// @grant        none
// @namespace http://tampermonkey.net/
// ==/UserScript==

var pathname = window.location.pathname;

if (pathname ==="/trade.html") {
    url = window.location.href;
    url = url.replace("/trade.html", "/tradeDetail.html");
    window.location.replace(url);
}