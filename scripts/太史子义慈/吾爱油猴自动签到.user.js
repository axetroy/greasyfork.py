// ==UserScript==
// @name         吾爱油猴自动签到
// @version      0.01
// @description  每日首次浏览吾爱油猴网站即自动签到
// @match        *://52youhou.com/*
// @grant        吾爱油猴
// @author       太史子义慈
// @namespace    qs93313@sina.cn
// ==/UserScript==

window.onload = function() {
	var find_jsuisn = (document.querySelector(".jinsom-sidebar-user-info-sign-btn") !== null && document.querySelector(".had") === null);
	if(find_jsuisn) {
		jinsom_sign();
	}
};