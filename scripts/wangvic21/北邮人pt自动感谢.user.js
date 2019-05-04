// ==UserScript==
// @name            北邮人pt自动感谢
// @namespace       bt.byr.Auto.Thanks
// @description     浏览 bt.byr.cn 资源详情页面时使用 AJAX 方式在后台自动感谢发布者。
// @match           https://bt.byr.cn/details.php*
// @match           http://bt.byr.cn/details.php*
// @version        1.0
// ==/UserScript==

(function() {
	var btn;
	(btn=document.getElementById('saythanks'))&&(btn.click());
})();