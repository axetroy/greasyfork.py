// ==UserScript==
// @name         W3CPlus恢复默认复制
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to restore default copy event
// @author       You
// @match        https://www.w3cplus.com/**/**
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 获取全局的jQuery对象
    var $ = window.jQuery;
    // DOM加载完成后
    $(document).ready(function(){
        // 取消body监听的复制事件
        $('body').off('copy');
    });
})();