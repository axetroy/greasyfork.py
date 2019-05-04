// ==UserScript==
// @name         豆瓣隐私
// @namespace    https://greasyfork.org/users/2646
// @version      0.1
// @description  默认将添加的收藏都设置为私有状态，并禁止发布广播！
// @author       CLE
// @match        http://*.douban.com/*
// @match        https://*.douban.com/*
// @grant        none
// @contributionURL http://clso.tk/donate/
// @contributionAmount 6.66
// ==/UserScript==

(function() {
    'use strict';

	$("body").bind("DOMNodeInserted", function(e) {
		$(e.target).find("#dlg-opt-share").attr("value","0").prop("checked", false);
		$(e.target).find("#inp-private").attr("value","0").prop("checked", true);
	});
})();