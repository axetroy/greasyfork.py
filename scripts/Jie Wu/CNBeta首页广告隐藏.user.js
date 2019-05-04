// ==UserScript==
// @name         CNBeta首页广告隐藏
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  通过css隐藏首页滚动时加载的广告
// @author       woodj
// @license      MIT
// @include        *://www.cnbeta.com*
// @icon           https://www.cnbeta.com/images/logo_1.png
// @require     https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.4.js
// ==/UserScript==

(function () {
    'use strict';
    // 创建 <style> 标签
    var style = document.createElement("style");
    // 对WebKit hack :(
    style.appendChild(document.createTextNode(".trc_related_container { display: none; }"));
    // 将 <style> 元素加到页面中
    document.head.appendChild(style);
    setInterval(function() {
        $(".adsbygoogle").css("display", "none");
    }, 500);
})();
