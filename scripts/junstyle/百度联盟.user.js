// ==UserScript==
// @name         百度联盟
// @namespace    http://junstyle.net/
// @version      0.1
// @description  百度联盟样式修正
// @author       junstyle
// @match        http://union.baidu.com/customerLogin.html*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //修复登陆首页错位
    document.querySelector('#index .indexBody').style.clear='both';
})();