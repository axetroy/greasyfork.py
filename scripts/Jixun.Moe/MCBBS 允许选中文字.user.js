// ==UserScript==
// @name        MCBBS 允许选中文字
// @description 强行允许在 mcbbs 选择文字
// @namespace   org.jixun.mcbbs.text-select
// @include     http://www.mcbbs.net/*
// @include     http://mcbbs.net/*
// @version     1.1
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function (patcher) {
  document.addEventListener('readystatechange', patcher, false);
})(function () {
  document.onselectstart = null;
  document.oncontextmenu = null;
  [].map.call(document.getElementsByTagName('style'), function (style) {
    if (-1 != style.textContent.indexOf('user-select')) {
      style.textContent = style.textContent.replace(/user-select/g, 'disabled-user-select');
    }
  });
});
