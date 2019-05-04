// ==UserScript==
// @name        weixin_read
// @description 使微信页阅读原文可以直接点击打开网页
// @namespace   http://userscripts.org/scripts/show/176807
// @include     http://mp.weixin.qq.com/*
// @author 酷企鹅Link
// @version 1.0.0.2
// @run-at document-end
// ==/UserScript==
document.getElementById('js_view_source').href=window.msg_source_url;
document.getElementById('js_view_source').target='_blank';