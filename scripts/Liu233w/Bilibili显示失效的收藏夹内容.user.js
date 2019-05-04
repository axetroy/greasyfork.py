// ==UserScript==
// @name         Bilibili显示失效的收藏夹内容
// @namespace    https://liu233w.github.io
// @version      0.1
// @description  RT，将标题中的“视频已失效”替换成实际的视频名称。 ---- 由于B站取消了获取失效视频内容的接口，现在这个脚本已经失效了 ----
// @author       Liu233w
// @license      BSD 3-Clause License
// @match        https://space.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  setInterval(function() {
    document.querySelectorAll('li.small-item.disabled').forEach(item => {
      const title = item.querySelector('img').getAttribute('alt')
      item.querySelector('a.title').innerHTML = title
    })
  }, 1000)
})();
