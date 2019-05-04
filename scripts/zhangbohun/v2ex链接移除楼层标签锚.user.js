// ==UserScript==
// @name         v2ex链接移除楼层标签锚
// @namespace    http://zhangbohun.github.io/
// @version      0.1
// @description  v2ex链接移除楼层标签锚（防止干扰判断是否已经添加到收藏夹）
// @author       You
// @match        *://*.v2ex.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('a').each(function(){if(this.href.indexOf('v2ex.com/t/')!=-1){this.href=this.href.split('#')[0]}});
})();