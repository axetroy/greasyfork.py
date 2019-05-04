// ==UserScript==
// @name         殁漂遥自动填写暗号
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.0.1
// @description  自动填写暗号
// @author       pana
// @include      http*://www.laomoit.com/*
// ==/UserScript==

(function() {
	'use strict';
	const verifycode = ['laomoit', 'mianfei'];
	$('input#verifycode').attr('value', verifycode[1])
})();