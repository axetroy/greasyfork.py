// ==UserScript==
// @name         tieba_auto_redirect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  贴吧自动跳转
// @author       rxliuli
// @match        http://dq.tieba.com/*
// @run-at       document-start
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';
  // 自动替换链接然后跳转
  location.href = location.href.replace('dq.tieba.com', 'tieba.com')
})();