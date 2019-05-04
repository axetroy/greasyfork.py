// ==UserScript==
// @name 新标签页打开Ubuntu中文论坛链接
// @version 0.0.1
// @namespace lihuiyuan.summerhost.info
// @description 目前Ubuntu中文论坛在当前页面打开链接，这个脚本的作用是：在新标签页打开Ubuntu中文论坛的链接！
// @include https://forum.ubuntu.org.cn/*
// @include http://forum.ubuntu.org.cn/*
// @author RayJing
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