// ==UserScript==
// @name 	 阻止百度跳转HTTPS
// @namespace    www.baidu.com
// @description  阻止百度跳转HTTPS，强制跳转HTTP
// @icon         https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489045369706&di=ec6c17a9cfc7744569b87aa8436ebbcd&imgtype=0&src=http%3A%2F%2Fimgq.duitang.com%2Fuploads%2Fitem%2F201502%2F14%2F20150214151042_2JaYk.jpeg
// @version      1.1.4
// @include      http://www.baidu.com/*
// @include      https://www.baidu.com/*
// @match        https://www.baidu.com/*
// @author       edison2016
// @homepageURL	 https://greasyfork.org/zh-CN/scripts/27973
// @grant        none
// @encoding     utf-8
// @date         09/03/2017
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
