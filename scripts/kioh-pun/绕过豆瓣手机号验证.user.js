// ==UserScript==
// @namespace   KiohPun
// @name  绕过豆瓣手机号验证
// @description 解除豆瓣发布内容时需要绑定手机号的限制
// @version     1.1
// @match       https://www.douban.com/*
// @grant       none
// ==/UserScript==

document.querySelectorAll('[data-is-verified]')
  .forEach((el) => {
    if (window.location.pathname.startsWith('/people/')) {
      el.remove();
    } else {
      el.dataset.isVerified = 'True';
    }
  });
