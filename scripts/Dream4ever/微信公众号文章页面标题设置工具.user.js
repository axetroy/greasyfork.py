// ==UserScript==
// @name         微信公众号文章页面标题设置工具
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  网页标题以 “文章标题 | 公众号名称”的格式显示
// @author       https://github.com/Dream4ever
// @match        https://mp.weixin.qq.com/s*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 如果设置1秒的延时，则在更改页面标题之后
    // 微信自身的 JS 会把标题再改回来
    setTimeout(setTitle, 2000);
})();

function setTitle() {
    if (!!document.querySelector('h2#activity-name.rich_media_title')) {
        var title = document.querySelector('h2#activity-name.rich_media_title');
        var titleText = title.innerText;
        document.title = titleText + '　|　' + document.title;
    }
}