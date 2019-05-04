// ==UserScript==
// @name         Youku 1080
// @namespace    http://v.youku.com/
// @version      0.3.3
// @description  解开 VIP 1080p
// @author       游客
// @match        http*://v.youku.com/*
// @grant        none
// ==/UserScript==
// 优酷更新代码 div层有变动
// <解开1080> 提示移到设置分辨率选项的底部
// 优酷终于把水印从视频中去掉啦 嘿嘿 2018.04.24
// 域名变化 http -> https 2018.07.25
(function() {
    'use strict';
    $('#playerBox').append('<div style=\"position:relative;left:254px;top:-62px;Z-INDEX: 9999; text-align:center;\"><a href=javascript:voide(); onclick=\" $(\'.settings-item.disable\').remove();  if($(\'#my1080p\').length <= 0) $(\'.quality-dashboard.larger\').append(\'<div data-val=1080p class=settings-item data-eventlog=xsl id=my1080p>1080p</div>\'); $(\'.youku-layer-logo\').hide();\"><font color=#20BCFF><b>解开1080</b></font></a></div>');

})();