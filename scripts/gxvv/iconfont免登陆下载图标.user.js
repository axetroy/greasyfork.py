// ==UserScript==
// @name         iconfont免登陆下载图标
// @namespace    https://greasyfork.org/en/users/87569-gxvv
// @version      0.1.1
// @description  iconfont 免登陆下载图标
// @author       gxvv
// @match        http://iconfont.cn/*
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function(seajs, define) {
	'use strict';
	define('app/login', ['magix', 'jquery', 'app/exts/helper'], function(require) {
		var magix = require('magix'),
			$ = require('jquery'),
			helper = require('app/exts/helper');
		$('body').on('click', '[data-login]:not([mx-click^=downloadIcon])', function() {
			if(!magix.config().isLogin){
				helper.showLogin();
				return false;
			}
		});
	});
})(unsafeWindow.seajs, unsafeWindow.define);