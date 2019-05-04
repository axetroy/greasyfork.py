// ==UserScript==
// @name         强制新版迅雷远程
// @namespace    https://about.me/huxim
// @version      0.1
// @description  强制使用新版迅雷远程
// @include      http://yuancheng.xunlei.com/
// @author       huxim

// ==/UserScript==

(function() {
    'use strict';

    window.location.href = window.location.href.replace('http://yuancheng.xunlei.com', 'http://yuancheng.xunlei.com/3');
})();