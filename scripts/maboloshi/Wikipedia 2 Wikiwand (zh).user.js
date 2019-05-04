// ==UserScript==
// @name                Wikipedia 2 Wikiwand (zh)
// @description         Redirect Wikipedia to Wikiwand for a modern browsing experience.
// @description:zh-CN   重定向 Wikipedia 页面到 Wikiwand 以获得现代的浏览体验
// @description:zh-TW   重定向 Wikipedia 页面到 Wikiwand 以获得现代的瀏览体验
// @version             1.0.1
// @namespace           https://github.com/maboloshi/UserScripts
// @icon                https://www.wikiwand.com/favicon.ico
// @include             http*://*.wikipedia.org/*/*
// @run-at              document-start
// ==/UserScript==
window.location.replace(document.location.href.replace(/https?:\/\/([\w-]+)\.wikipedia\.org\/[\w-]+/, 'https://www.wikiwand.com/zh'));
