// ==UserScript==
// @name 	 阻止百度网盘跳转HTTPS
// @namespace    pan.baidu.com
// @description  阻止百度网盘跳转HTTPS，强制跳转HTTP
// @icon         https://i.imgur.com/3xIP8gC.png
// @version      1.0.5
// @match        *://pan.baidu.com/*
// @match        *://yun.baidu.com/*
// @author       BRO.BIRD
// @homepageURL	 https://greasyfork.org/zh-CN/scripts/22208
// @licence      WTFPL
// @grant        none
// @encoding     utf-8
// @date         22/09/2016
// ==/UserScript==

function setsecucookie()
{
	document.cookie="secu=0; path=/";
    var targetProtocol = "http:";
    if (window.location.protocol != targetProtocol)
        window.location.href = targetProtocol +
        window.location.href.substring(window.location.protocol.length);
}
window.onload=setsecucookie;
