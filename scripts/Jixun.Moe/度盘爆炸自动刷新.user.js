// ==UserScript==
// @name         度盘爆炸自动刷新
// @namespace    moe.jixun
// @version      1.0
// @description  度盘爆炸的时候自动刷新其页面。
// @author       Jixun
// @include      https://pan.baidu.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

addEventListener('DOMContentLoaded', () => {
  const msg = document.querySelector('.msg');
  if (msg && msg.textContent.trim().includes('百度网盘正在升级中')) {
    location.reload();
  }
});