// ==UserScript==
// @name         coolapk clear link
// @namespace    coolapk.com
// @version      0.7
// @description  convert coolapk's short link to real link
// @description:zh-CN 将coolapk.com的短链接转换为真实链接
// @license      MIT
// @match        *://coolapk.com/*
// @match        *://*.coolapk.com/*
// @run-at       document-end
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(function (root) {
  'use strict';

  var listeners = [];
  var doc = window.document;
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var observer;

  function ready(selector, fn) {
    // 储存选择器和回调函数
    listeners.push({
      selector: selector,
      fn: fn
    });
    if (!observer) {
      // 监听document变化
      observer = new MutationObserver(check);
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true
      });
    }
    // 检查该元素是否已经在DOM中
    check();
  }

  function check() {
    // 检查DOM元素是否匹配已储存的元素
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      // 检查指定元素是否有匹配
      var elements = document.querySelectorAll(listener.selector);
      for (var j = 0; j < elements.length; j++) {
        var element = elements[j];
        // 确保回调函数只会对该元素调用一次
        if (!element.ready) {
          element.ready = true;
          // 对该元素调用回调函数
          listener.fn.call(element, element);
        }
      }
    }
  }

  // 对外暴露ready
  root.ready = ready;

})(window);
function clearTcn(element){
    if (!(element && element.href && element.href.match('t.cn'))) return;
    GM_xmlhttpRequest({
        method: 'head',
        url: element.href,
        anonymous: true,
        onload: function (resp){element.href = element.innerText = resp.finalUrl;}
    });
}
function clear(element) {
  if (!(element.href.match('coolapk.com/r/') || element.href.match('t.cn') || element.innerText == '查看链接»') || !(element.title && element.title.match(/https?|ftp|ed2k|magnet|thunder/))) return false;
  return (element.innerText = element.href = element.title);
}
(function () {
  'use strict';
  if (!NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype.forEach;
  if (!HTMLCollection.prototype.forEach) HTMLCollection.prototype.forEach = Array.prototype.forEach;
  document.getElementsByClassName('feed-link-url').forEach(clear);
  document.querySelectorAll('a[href*="t.cn"].feed-link-url').forEach(clearTcn);
  ready('a.feed-link-url', clear);
  ready('a[href*="t.cn"].feed-link-url', clearTcn);
})();