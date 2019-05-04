// ==UserScript==
// @name         禁用input自动完成功能
// @version      1.00
// @description  禁用所有网站中input输入框的自动完成功能
// @match        *
// @include      *
// @grant        input的autocomplete属性
// @author       太史子义慈
// @namespace    qs93313@sina.cn
// ==/UserScript==

window.onload = function() {
	var all_input = document.querySelectorAll("input");
	var all_input_len = all_input.length;
	var i;
	for(i = 0; i < all_input_len; i++) {
		all_input[i].setAttribute("autocomplete", "off");
	}
};