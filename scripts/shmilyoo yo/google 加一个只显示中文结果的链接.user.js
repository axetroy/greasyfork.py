// ==UserScript==
// @name         google 加一个只显示中文结果的链接
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  nothing
// @author       You
// @match        https://www.google.com/search*
// ==/UserScript==

(function() {
    'use strict';
    var url = unsafeWindow.location.href;
    var newUrl = url + '&lr=lang_zh-CN';
    var link = document.createElement('a');
    link.href = newUrl;
    link.innerHTML = '只显示中文';
    var container = document.createElement('div');
    container.style = "position:fixed;left:10px;top:90px;z-index:999;";
    container.appendChild(link);
    document.body.appendChild(container);
    // Your code here...
})();