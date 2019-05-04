// ==UserScript==
// @name         Ban Zhihu
// @name:zh-CN   禁用知乎
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Stop Wasting Time On Zhihu.com!
// @description:zh-cn 访问知乎时自动跳回之前页面
// @author       You
// @match        https://*.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if(window.history.length == 1) {
        window.close()
    } else {
        window.history.back(-1)
    }
})();