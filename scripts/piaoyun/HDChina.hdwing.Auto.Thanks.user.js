// ==UserScript==
// @name            HDChina.hdwing.Auto.Thanks
// @namespace       HDChina.hdwing.Auto.Thanks
// @description     浏览 HDChina.org 资源详情页面时使用 AJAX 方式在后台自动感谢发布者。如果您觉得这不足以表达谢意，请使用奖励积分功能。
// @match           https://hdchina.club/details.php*
// @match           http://hdchina.club/details.php*
// @version 0.0.1.20161121012813
// ==/UserScript==

(function() {
	var btn;
	(btn=document.getElementById('saythanks'))&&(btn.click());
})();