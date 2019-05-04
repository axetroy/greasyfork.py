// ==UserScript==
// @name         网页字体强制使用微软雅黑（解决方框问题口）
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  修改网页字体为微软雅黑 Light
// @author       You
// @include         *://*/*
// @grant        unsafeWindow
// ==/UserScript==
(function() {
    function addStyle(rules) {
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
        styleElement.appendChild(document.createTextNode(rules));
    }
	console.log('font');
    addStyle('* {font-family : "微软雅黑 Light";}');
})();