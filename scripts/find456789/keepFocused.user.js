// ==UserScript==
// @name         keepFocused
// @namespace    http://tampermonkey.net/
// @version      0.12
// @description  临时屏蔽指定url，给自己一个清净
// @author       https://github.com/find456789/
// @match        www.zhihu.com
// @match        www.V2ex.com
// @match        www.bilibili.com
// @match        www.youtube.com
// @grant        none
// @license MIT
// @copyright 2019, https://greasyfork.org/zh-CN/scripts/377325-keepfocused
// ==/UserScript==


// 这里是黑名单， 如果网址是域名，则必须在后面多个一个斜杠， 如 "https://www.V2ex.com/", "https://www.V2ex.com" (错误，最后少了/)
var block_lists = [
    "https://www.zhihu.com/hot",
    "https://www.V2ex.com/",
    "https://www.zhihu.com/",
    "https://www.bilibili.com/",
    "https://www.youtube.com/"
];

var msg = "懵逼树上懵逼果，懵逼树下你和我"; // 拦截网址后的提示文字

var copyright = "来自 keepFocused on Tampermonkey的问候"; // 友情提示


(function() {
    'use strict';

    // Your code here...

    block_lists = block_lists.map(t => t.toLowerCase().replace(/(^\w+:|^)\/\//, '')); // 防止失误域名用了大写

    var url = window.location.href; // 当前打开的网址

    url = url.replace(/(^\w+:|^)\/\//, ''); //处理url,便于和block_lists比对

    if(block_lists.indexOf(url) >= 0){ // 如果当前网址在黑名单
        console.log("当前网址在黑名单 < from keepFocused on Tampermonkey");

        document.body.innerHTML= "<div style=\"display: flex;justify-content: center;align-items: center;\"><h1 style=\"margin-top: 40px;font-size: 50px\">" + msg + "</h1></div><span style=\" font-size: small; color: #e0dbdb; \">" + copyright + "<span>";

    }
})();



