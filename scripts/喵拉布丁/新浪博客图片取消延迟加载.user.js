// ==UserScript==
// @name         新浪博客图片取消延迟加载
// @namespace    https://greasyfork.org/users/4514
// @author       喵拉布丁
// @homepage     https://greasyfork.org/scripts/8007
// @description  用于取消新浪博客图片的延迟加载
// @include      http*://blog.sina.com.cn/s/blog_*.html*
// @version      1.1
// @grant        none
// @run-at       document-end
// ==/UserScript==
for(var i in document.images) {
    var realSrc = document.images[i].getAttribute('real_src');
    if (realSrc) {
        document.images[i].src = realSrc;
    }
}