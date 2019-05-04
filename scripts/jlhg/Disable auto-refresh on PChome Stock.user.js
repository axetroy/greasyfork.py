// ==UserScript==
// @name         Disable auto-refresh on PChome Stock
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  讓 PChome 股市的網頁停止自動更新
// @author       Jian-Long Huang (huang@jianlong.org)
// @match        http://pchome.megatime.com.tw/stock/*
// @match        http://stock.pchome.com.tw/stock/*
// @grant        none
// ==/UserScript==

window.addEventListener('load', function() {
  console.log('Disable auto-refresh on PChome Stock');
  window.myrefresh = function() {};
}, false);

