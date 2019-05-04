// ==UserScript==
// @name         极客时间专栏 WEB 页面剪贴板功能还原
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  去掉复制极客时间专栏文章时的版权提示和字数限制（注意：仅用于个人笔记用途，请遵守版权协议，如果您认为侵犯了您的权益，请通知我删除）
// @author       alastairruhm
// @license      MIT License
// @match        https://time.geekbang.org/column/article/*
// @grant        unsafeWindow
// @require      https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=19641
// @note         2018.09.30-V1.1 增加 LICENSE
// ==/UserScript==


// 官方事件注册的位置的下一个子元素
var targetSelector = "#app > div > div > div > div > div > div > div"

// need to wait for article content loaded after ajax request
waitForKeyElements (targetSelector, cleanClipboard);

function cleanClipboard() {
    'use strict';

    // 由于在 div[id=article-content] 处监听所有冒泡到此处的 copy 事件，所有可以在下一个子节点拦截。
    // 参考：https://ghoulmind.com/2016/02/remove-zhihu-copyright-on-copy/

    $(targetSelector).on('copy', function(evt) {
        evt.stopPropagation();
    });
}

