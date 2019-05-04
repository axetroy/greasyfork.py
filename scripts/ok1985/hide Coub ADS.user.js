// ==UserScript==
// @name hide Coub ADS
// @description hide Coub  ADS
// @version 0.0.1
// @grant none
// @noframes
// @include https://coub.com/*
// @include https://www.coub.com/*
// @icon https://www.coub.com/favicon.ico
// @namespace   https://greasyfork.org/zh-CN/scripts/372765-hide-coub-ads
// @copyright  反馈和建议(feedback)E-mail: nolazyload@foxmail.com
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = "\
 div.coub.timeline-banner,\
div.sinner_under_footer{display: none !important;}\
";
document.documentElement.appendChild(styleEl);

