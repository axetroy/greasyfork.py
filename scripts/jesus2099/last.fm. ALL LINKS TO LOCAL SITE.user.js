"use strict";
var metadata = function() {
// ==UserScript==
// @name         last.fm. ALL LINKS TO LOCAL SITE
// @version      2019.4.12
// @changelog    https://github.com/jesus2099/konami-command/commits/master/lastfm_ALL-LINKS-TO-LOCAL-SITE.user.js
// @description  Replaces any lastfm link by the desired language, like "www.lastfm.xx" or else
// @homepage     http://userscripts-mirror.org/scripts/show/29156
// @supportURL   https://github.com/jesus2099/konami-command/labels/lastfm_ALL-LINKS-TO-LOCAL-SITE
// @compatible   opera(12.18.1872)+violentmonkey      my setup
// @compatible   vivaldi(1.0.435.46)+violentmonkey    my setup (ho.)
// @compatible   vivaldi(1.13.1008.32)+violentmonkey  my setup (of.)
// @compatible   firefox(47.0)+greasemonkey           tested sometimes
// @compatible   chrome+violentmonkey                 should be same as vivaldi
// @namespace    https://github.com/jesus2099/konami-command
// @author       PATATE12
// @licence      CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/
// @licence      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @since        2008-06-26
// @icon         data:image/gif;base64,R0lGODlhEAAQAKEDAP+/3/9/vwAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh/glqZXN1czIwOTkAIfkEAQACAwAsAAAAABAAEAAAAkCcL5nHlgFiWE3AiMFkNnvBed42CCJgmlsnplhyonIEZ8ElQY8U66X+oZF2ogkIYcFpKI6b4uls3pyKqfGJzRYAACH5BAEIAAMALAgABQAFAAMAAAIFhI8ioAUAIfkEAQgAAwAsCAAGAAUAAgAAAgSEDHgFADs=
// @grant        none
// @match        *://*/*
// @exclude      *://cn.last.fm/*
// @exclude      *://www.last.fm/*
// @exclude      *://www.lastfm.*
// @run-at       document-end
// ==/UserScript==
// ==OpenUserJS==
// @unstableMinify it might break metadata block parser
// ==/OpenUserJS==
};
var preferred_lastfm = "last.fm";
/* In above setting, choose your favourite host :
"last.fm" for minimalistic auto-lang despatch links (often english)
"cn.last.fm" for 简体中文
"www.last.fm" for english
"www.lastfm.com.br" for português
"www.lastfm.com.tr" for türkçe
"www.lastfm.de" → for deutsch
"www.lastfm.es" → for español
"www.lastfm.fr" → for français
"www.lastfm.it" → for italiano
"www.lastfm.jp" → for 日本語
"www.lastfm.pl" → for polski
"www.lastfm.ru" → for руccкий
"www.lastfm.se" → for svenska */
var meta = metadata && metadata.toString && metadata.toString();
meta = meta.match(/@name\s+(.+)/i);
meta = meta ? "” (" + meta[1] + ")" : "”";
var as = document.querySelectorAll("a[href*='.lastfm.'], a[href*='last.fm/']");
for (var i = 0; i < as.length; i++) {
	var newhref, href = as[i].getAttribute("href");
	if (
		href
		&& (newhref = href.trim().replace(/^(?:https?:)?\/\/(?:(?:cn|www)\.)?(?:last\.fm|lastfm\.(?:com\.)?[a-z][a-z])(\/.*)?$/i, "http://" + preferred_lastfm + "$1"))
		&& href != newhref
	) {
		as[i].setAttribute("href", newhref);
		var title = as[i].getAttribute("title");
		as[i].setAttribute("title", (title ? title + "\n" : "") + "was “" + href + meta);
	}
}
