// ==UserScript==
// @name         修改react-weui文档源码高度
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  修改react-weui文档源码高度，使其自适应
// @author       Dongyi An
// @match        https://weui.github.io/react-weui/docs/
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  var tabItem = document.getElementById('root').querySelector('.weui-tab__bd-item[tabindex="1"]');
  var article = tabItem.querySelector('.weui-article');
  var codeMirror = article.querySelector('.CodeMirror');
  tabItem.style.height = '100%';
  article.style.boxSizing = 'border-box';
  article.style.height = '100%';
  codeMirror.style.height = '100%'
})();