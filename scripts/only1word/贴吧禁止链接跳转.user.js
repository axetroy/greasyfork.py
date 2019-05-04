// ==UserScript==
// @name         贴吧禁止链接跳转
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  百度贴吧禁止链接跳转。
// @author       only1word
// @include     /http(?:s|)://(?:tieba\.baidu\.com|.+\.tieba\.com)//
// @run-at      document-idle
// @grant        none
// ==/UserScript==

//var urls = document.querySelectorAll('.p_content a[href*=".bdimg.com/safecheck"]');
var element_list =document.querySelectorAll('.p_content a[href*=".bdimg.com/safecheck"]:not(.ps_cb)');
for (var i = element_list.length - 1; i >= 0; i--) {
  var element = element_list[i], text = element.innerText,
  url = /^http.*/.test(text) ? text: 'http://' + text;
  element.setAttribute('href', url);
}