// ==UserScript==
// @name        MCBBS 允许选中文字和右键菜单
// @description 强行允许在 mcbbs 选择文字，以及弹出右键菜单
// @namespace   org.mcbbs.text-select-contextmenu
// @include     http://www.mcbbs.net/*
// @include     http://mcbbs.net/*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function (patcher) {
  document.addEventListener('readystatechange', patcher, false);
})(function () {
  document.onselectstart = null;
  document.oncontextmenu = null;
  [].map.call(document.getElementsByTagName('style'), function (style) {
    if (~ style.textContent.indexOf('user-select')) {
      style.textContent = '/* Text-selection patch by Jixun */';
    }
  });
});
