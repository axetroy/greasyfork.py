// ==UserScript==
// @name        Nexusmods skyrim&fallout japan database
// @namespace   mikanNsjd
// @version     4.1
// @description Nexusmodsのスカイリム、フォールアウト4ページに、日本MODデータベースへのリンクを追加します
// @author      mikan-megane
// @grant       none
// @include     https://*.nexusmods.com/skyrim/mods/*
// @include     https://*.nexusmods.com/skyrimspecialedition/mods/*
// @include     https://*.nexusmods.com/fallout4/mods/*
// ==/UserScript==
(function () {
	var url = document.URL.match(/https?:\/\/(www)?\.nexusmods\.com\/(skyrim(?:specialedition)?|fallout4)\/mods\/(\d+)(?:$|\/.+|\?.+)/);
	if (url !== null) {
		document.querySelector(".modactions > li:first-child").insertAdjacentHTML('beforebegin', '<li id="action-jp"><a class="btn inline-flex" href="http://' + url[2] + '.2game.info/detail.php?id=' + url[3] + '"><span class="flag flag-Japanese" style="padding: 0.5em;padding-right: 15px;"></span> <span class="flex-label">日本語</span></a></li>');
	}
}());