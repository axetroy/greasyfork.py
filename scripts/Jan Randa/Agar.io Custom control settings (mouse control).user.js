// ==UserScript==
// @name         Agar.io Custom control settings (mouse control)
// @namespace    AgarUltiMouse
// @version      4.4
// @description  Setup your custom keyboard / mouse control with special function.
// @author       randajan
// @match        http://abs0rb.me/*
// @match        http://agar.io/*
// @match        http://agarabi.com/*
// @match        http://agarly.com/*
// @match        http://en.agar.bio/*
// @match        http://agar.pro/*
// @match        http://agar.biz/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

var i = "http://qrb.cz/stock/agar/auc/";
function tg(tag, atr) {var d = document, x = d.createElement(tag); for (var a in atr) {x[a] = atr[a];}; (d.head || d.documentElement).appendChild(x);}

tg("link", {rel:"stylesheet", type:"text/css", href:i+"auc.css"});
tg("script", {type:"text/javascript", src:i+"auc.js"});