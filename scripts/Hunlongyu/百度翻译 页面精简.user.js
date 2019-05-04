// ==UserScript==
// @name 	 	 百度翻译 页面精简
// @namespace    http://fanyi.baidu.com/
// @description  页面精简，只保留主要功能的部分。
// @version      0.0.9
// @match        *://fanyi.baidu.com/*
// @icon		 http://7xo0rb.com1.z0.glb.clouddn.com/public/16-12-5/39527384.jpg
// @require 	 http://cdn.bootcss.com/jquery/2.2.4/jquery.js
// @author       Hunlongyu
// @licence      WTFPL
// @grant        none
// @encoding     utf-8
// @date         5/12/2016
// ==/UserScript==

$(function () {
	$('.header').hide();					//头部隐藏
	$('.footer').hide();					//底部隐藏
	$('.copyright').hide();					//底部版权
	$('#transOtherRight').remove();			//百度翻译APP
	$('.follow-wrapper').remove();			//分享社交
	$('.feedback-btn').remove();			//意见反馈
	$('.manual-trans-btn').hide();			//人工翻译 广告隐藏
	$('.hot-link-middle').hide();
    $('.app-guide').hide();                 // app推荐
});