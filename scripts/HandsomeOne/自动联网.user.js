// ==UserScript==
// @name        自动联网
// @namespace   http://handsomeone.com
// @description 自动连接南京大学的网络接入系统
// @include     http://p.nju.edu.cn/portal/index.html*
// @include     http://p/portal/index.html*
// @version     1.1.0
// @grant       none
// ==/UserScript==
(function f() {
  if (document.getElementsByClassName('login_div').length) {
    login_request()
  } else if(!document.getElementsByClassName('messager-window').length) {
    setTimeout(f, 100)
  }
})()