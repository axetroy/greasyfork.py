// ==UserScript==
// @name         百度百科添加维基镜像
// @version      1.05
// @description  在百度百科中添加跳转到维基百科镜像和互动百科的按钮。
// @match        *://baike.baidu.com/*
// @grant        none
// @author       sunforbeeing
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @namespace    https://greasyfork.org/users/20689
// ==/UserScript==

(function() {
	//搜索栏调整
	$('.header .layout').css('width', '95%');
	$('.wgt-searchbar-main').css('width', '100%');
	$('.search .form input').css('width', '400px');
	$('.search .form .help').remove();
	$('.wgt-userbar').css({'position':'static','float':'right'});
	//页面清理
	$('.new-side-share').remove();//分享
	$('.lemmaWgt-promotion-vbaike').remove(); //V百科
	$('.wgt-footer-main .content').remove();//页面底部
	$('.after-content').remove();//页面底部
	//添加互动百科词条
	$('#searchForm #search').after('<button class="hudong" type="button" >互动词条</button>');
	$('.hudong').click(function() {
			window.open("http://www.baike.com/wiki/" + $('#query').val());
		});
	//添加维基镜像词条
	$('#searchForm #search').after('<button class="wiki" type="button" >维基词条</button>');
	$('.wiki').click(function() {
			window.open("https://wc.yooooo.us/wiki/" + $('#query').val());
		});
})();