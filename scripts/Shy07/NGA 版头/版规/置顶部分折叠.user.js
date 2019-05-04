// ==UserScript==
// @name         NGA 版头/版规/置顶部分折叠
// @namespace    https://greasyfork.org/zh-CN/users/164691-shy07
// @version      0.6
// @description  自动折叠 NGA 版头/版规/置顶部分，需要的时候可以点击版头按钮显示（替换跳转功能）
// @author       Shy07
// @match        *://nga.178.com/*
// @match        *://bbs.ngacn.cc/*
// @match        *://bbs.nga.cn/*
// @grant        none
// jshint esversion:6
// ==/UserScript==

(function() {
  'use strict';

  // Your code here...

  const toppedTopic = document.querySelector('#toppedtopic');
  toppedTopic.style.display = 'none';

  const toggle = () => (toppedTopic.style.display = toppedTopic.style.display === 'none' ? 'block': 'none');

  const container = document.querySelector('#toptopics a[class="block_txt block_txt_c0"]');
  container.href = 'javascript:;';
  container.addEventListener('click', toggle);
})();