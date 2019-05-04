// ==UserScript==
// @name     网页字体替换[苹方]并加阴影
// @version      1.6
// @description  个人向
// @author       iSwfe

// 匹配所有网址
// @match        *://*/*

// @run-at       document-start
// @grant        unsafeWindow
// @license      MIT
// @namespace    https://greasyfork.org/zh-CN/users/208142-iswfe
// ==/UserScript==

(function() {
    function addStyle(rules) {
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
        styleElement.appendChild(document.createTextNode(rules));
    }
    addStyle('* {font-family : "PingFang SC","iconfont","FontAwesome"}');
    addStyle('* {text-shadow : 0.05em 0.05em 0.05em #BBBBBB}');
})();