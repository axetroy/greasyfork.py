// ==UserScript==
// @name         跳过QQ邮箱跳转确认
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       xrr
// @include        *mail.qq.com*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if(window.location.href.indexOf('false')!==-1){
        setTimeout("goUrl(1)",1000);
    }
    // Your code here...
})();