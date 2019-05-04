// ==UserScript==
// @namespace   VA_i
// @version     2.0.0.20170211
// @grant       none
// @include     https://www.reddit.com/r/*
// @include     https://www.reddit.com/domain/*
// @run-at      document-idle
// @name        Reddit: No Outbound URL Redirect
// @name:zh-CN  Reddit：禁止外链重定向
// @name:zh-TW  Reddit：禁止外鏈重定向
// @description Forbid redirect for outbound urls on Reddit forums.
// @description:zh-CN 使得在 Reddit 页面中点击外部网站链接时能够直接访问。
// @description:zh-TW 使得在 Reddit 頁面中點擊外站網站鏈接時能夠直接訪問。
// ==/UserScript==

var set = function (a, attr, val) { a.setAttribute(attr, val) };
var get = function (a, attr) { return a.getAttribute(attr) || '' };

[].slice.call(document.querySelectorAll('a[data-outbound-url]')).forEach(function (a) {
  // fake the outbound url and expiration date
  set(a, 'data-outbound-url', get(a, 'data-href-url'));
  set(a, 'data-outbound-expiration', parseInt(get(a, 'data-outbound-expiration'), 10) + 7*24*60*60*1000);
  // remove referrer tracking by the way :)
  set(a, 'rel', 'noreferrer');
  set(a, 'referrerpolicy', 'no-referrer');
});