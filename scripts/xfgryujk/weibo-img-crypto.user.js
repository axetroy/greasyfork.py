// ==UserScript==
// @name         weibo-img-crypto
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  自动加密解密微博上传的图片。上传图片时自动加密，在图片上点击鼠标右键自动解密。油猴脚本只是方便引入主脚本的，主脚本代码在 GitHub: https://github.com/xfgryujk/weibo-img-crypto
// @author       xfgryujk
// @match        *://weibo.com/*
// @match        *://photo.weibo.com/*
// @grant        none
// ==/UserScript==

(function () {
  fetch(
    'https://raw.githubusercontent.com/xfgryujk/weibo-img-crypto/master/weibo-img-crypto.js'
  ).then(
    res => res.text(),
    e => alert('载入失败：' + e)
  ).then(res => {
    let script = document.createElement('script');
    script.innerHTML = res;
    document.body.appendChild(script)
  })
})();
