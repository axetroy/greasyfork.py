// ==UserScript==
// @name         优酷默认使用旧版flash播放器
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  不知道为什么 优酷默认使用新版H5播放器 没办法看弹幕 而且我还是比较喜欢用旧版flash播放器 每次都要手动切换 所以写了个脚本。
// @author       小可怜
// @match        http://v.youku.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var Cts = window.location.href;//获取浏览器URL地址
if(Cts.indexOf('&debug=') <= 0 ){//判断URL地址是否包含“&debug=”
window.location.href = Cts + '&debug=flv';//在URL地址后面添加“&debug=flv”并自动跳转
}
    // Your code here...
})();