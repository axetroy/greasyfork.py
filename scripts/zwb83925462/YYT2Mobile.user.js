// ==UserScript==
// @name			YYT2Mobile
// @namespace		YYT2Mobile.yinyuetai.com
// @author			ZWB
// @description		音悦台自动跳转手机版播放,此版与跳转HTML5的脚本30854不可共存
// @include			http://v.yinyuetai.com/*
// @version			17.12.08
// @encoding		utf-8
// @icon			http://www.yinyuetai.com/favicon.ico
// @run-at			document-start
// ==/UserScript==
location.href = location.pathname.indexOf("h5") > 0 ? "http://m.yinyuetai.com" + location.pathname.replace("/h5/","/") : "http://m.yinyuetai.com" + location.pathname;