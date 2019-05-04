// ==UserScript==
// @name         copyright
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  去除所有网站小尾巴数据,csdn未登陆自动阅读更多
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  [].slice.call(document.getElementsByTagName('*')).forEach((ele) => {
    ele.addEventListener("copy", function (t) {
      t.clipboardData.setData("text", getMySelection())
      t.preventDefault()
    })
  })

  function getMySelection() {
    let e = window.getSelection().getRangeAt(0).cloneContents().textContent
    return e
  }
  // M.copyright.config = {}
  // csdn.copyright.init($("article")[0], '', '');
  let host = window.location.host
  if (host === 'blog.csdn.net') {
    document.getElementById('btn-readmore').click()
  }
})();