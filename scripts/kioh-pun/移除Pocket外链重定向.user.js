// ==UserScript==
// @namespace   KiohPun
// @name  移除Pocket外链重定向
// @description 点击Pocket列表项的查看原始文档链接时，直接访问网址而不经由Pocket网站的重定向
// @version     1.1
// @match       https://getpocket.com/*
// @grant       none
// ==/UserScript==

const observer = new MutationObserver(() => {
    const urls = document.querySelectorAll('[href^="https://getpocket.com/redirect"]');
    urls.forEach((url) => {
        url.href = decodeURIComponent(url.href.replace(/.+url=(.+)&.+/, '$1'));
    });
});
observer.observe(document.body, {
    childList: true,
  	subtree: true,
});
