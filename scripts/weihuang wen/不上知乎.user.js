// ==UserScript==
// @name         NoZhihu
// @name:zh-CN   不上知乎
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Jump to Quora when visit Zhihu.
// @description:zh-cn   在访问知乎的时候跳到 Quora。
// @author       Lambda Wan
// @match        https://*.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.location = "https://www.quora.com/";
})();