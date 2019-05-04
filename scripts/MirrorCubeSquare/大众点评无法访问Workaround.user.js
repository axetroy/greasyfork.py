// ==UserScript==
// @name         大众点评无法访问Workaround
// @namespace    https://github.com/MirrorCubeSquare
// @version      0.1a
// @description  A Current workaround for 403 pages in Dianping
// @author       MirrorCubeSquare
// @match        *://www.dianping.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	navigator.__defineGetter__('userAgent', function() {
		return 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko';
	});
	//匹配的字段是 "WangPai" , 以上来自所提供的 2345加速浏览器v8.4 的 UA
	
})();