// ==UserScript==
// @name         百度●简
// @version      1.0
// @description  去掉百度首页多余的东西
// @author       MyFaith
// @match        http://*.baidu.com/*
// @match        https://*.baidu.com/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @run-at       document-end
// @namespace https://greasyfork.org/users/8899
// ==/UserScript==

var $ = $ || window.$;
window.jQuery = $;

$('#s_top_wrap').remove();
$('#s_upfunc_menus').remove();
$('#u_sp').remove();
$('#bottom_container').remove();
