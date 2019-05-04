// ==UserScript==
// @name 新标签页打开谷歌学术搜索结果链接
// @version 0.2.0
// @created        2015-7-24
// @lastUpdated    2016-3-28
// @namespace https://greasyfork.org/zh-CN/users/35510-rayjing
// @homepage  https://greasyfork.org/zh-CN/users/35510-rayjing
// @description 目前谷歌学术在当前页面打开链接，这个脚本的作用是：在新标签页打开谷歌学术搜索结果的链接！
// @include http://scholar.google.com/*
// @include https://scholar.google.com/*
// @include http://scholar.google.com.hk/*
// @include https://scholar.google.com.hk/*
// @include http://scholar.google.cn/*
// @include https://scholar.google.cn/*
// @author RayJing & 感谢另一个类似脚本作者
// @grant none
// ==/UserScript==

"use strict";

function getAnchor(element) {
while (element && element.nodeName != "A") {
element = element.parentNode;
}
return element;
}

document.addEventListener("click", function(e){
var anchor = getAnchor(e.target);
if (!anchor || anchor.target || anchor.protocol == "javascript:" || e.isTrusted === false || !anchor.offsetParent || (e.isTrusted == null && !e.detail)) {
return;
}
if (anchor.hostname != location.hostname) {
anchor.target = "_blank";
}
});