// ==UserScript==
// @name         QQ音乐 MV下载 高清~
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  QQ音乐 MV下载
// @author       You
// @match        https://y.qq.com/n/yqq/mv/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	window.addEventListener('load', function() {
		document.querySelector('.video_player__source').addEventListener('loadeddata', function() {
			let video_download_url = document.querySelector('.video_player__source').src;
			let btn = `
			<li class="top_subnav__item">
		    <a href="${video_download_url}" class="top_subnav__link" style="color:red;" download="${document.title}">下载MV</a>
		</li>
		`;
			var nav = document.getElementsByClassName('mod_top_subnav')[0];
			nav.innerHTML += btn;
		});
	});

})();