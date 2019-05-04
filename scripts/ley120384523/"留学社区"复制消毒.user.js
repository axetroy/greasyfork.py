// ==UserScript==
// @name        "留学社区"复制消毒
// @namespace   120384523@qq.com
// @version     0.0.2
// @description 去除复制限制信息。
// @author      leyclark <120384523@qq.com>
// @match       *://*.liuxue86.com/*
// @grant       none
// ==/UserScript==


(function () {
  'use strict';

  // 去除原网址 复制事件
  $("#article-content").off("copy");

  function setClipboardData(e) {
    e.preventDefault();
    var copytext = window.getSelection();
    var clipdata = e.clipboardData || window.clipboardData;
    if (clipdata) {
      clipdata.setData('Text', copytext);
    }
  }

  document.addEventListener('copy', setClipboardData);
})();