// ==UserScript==
// @name 	 	 jQuery API 中文文档 网站广告过滤
// @namespace    http://www.css88.com/
// @description  过滤页面内各种广告，精简删除了干扰部分，使文档更清爽。
// @version      0.0.6
// @match        *://www.css88.com/*
// @icon	 http://7xo0rb.com1.z0.glb.clouddn.com/public/16-12-5/39527384.jpg
// @author       Hunlongyu
// @licence      WTFPL
// @grant        none
// @encoding     utf-8
// @date         2/12/2016
// ==/UserScript==

$(function(){
	//页面广告
	$('.jquery-api-top').hide();						//过滤页面中上部位的广告
	$('#jQuery-api-left').hide();						//过滤页面左下角的广告
   	$('#sup-post-a').css('visibility','hidden');		//过滤页面右下角的弹窗广告
    $('.miaov-wrap').hide();                            //过滤页面中部位的推广

   	//精简内容
  	$('.header-nav').hide();							//精简导航部分的不需要的链接
  	$('#weibo-con').hide();								//删除了微博

  	console.log('success ！');							//如果打印了success则表明该脚本运行成功
});