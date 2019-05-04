// ==UserScript==
// @name        cnBeta anti-anti-Adblocker
// @version     0.1.0.1
// @icon        https://www.cnbeta.com/favicon.ico
// @description 移除 cnBeta 对 adBlockplus 及类似插件要求白名单的红色横幅
// @author      You!
// @grant       GM_addStyle
// @include     *://*.cnbeta.com/*
// @run-at      document-start
// @namespace   https://greasyfork.org/zh-CN/scripts/368747-cnbeta-anti-anti-adblocker
// ==/UserScript==

(function() {
	GM_addStyle(
		'[style*="z-index:99999"]{height:0!important;}'
	);
}());
