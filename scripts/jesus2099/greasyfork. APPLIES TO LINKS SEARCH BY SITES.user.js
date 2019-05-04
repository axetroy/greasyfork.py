// ==UserScript==
// @name         greasyfork. APPLIES TO LINKS SEARCH BY SITES
// @version      2016.6.15
// @changelog    https://github.com/jesus2099/konami-command/commits/master/greasyfork_APPLIES-TO-LINKS-SEARCH-BY-SITES.user.js
// @description  greasyfork.org. makes applies to “All site” link to the “*” by site search (JasonBarnabe/greasyfork#146)
// @supportURL   https://github.com/jesus2099/konami-command/labels/greasyfork_APPLIES-TO-LINKS-SEARCH-BY-SITES
// @compatible   opera(12.18.1872)+violentmonkey  my setup
// @namespace    https://github.com/jesus2099/konami-command
// @author       PATATE12
// @licence      CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/
// @licence      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @since        2014-06-06
// @icon         data:image/gif;base64,R0lGODlhEAAQAKEDAP+/3/9/vwAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh/glqZXN1czIwOTkAIfkEAQACAwAsAAAAABAAEAAAAkCcL5nHlgFiWE3AiMFkNnvBed42CCJgmlsnplhyonIEZ8ElQY8U66X+oZF2ogkIYcFpKI6b4uls3pyKqfGJzRYAACH5BAEIAAMALAgABQAFAAMAAAIFhI8ioAUAIfkEAQgAAwAsCAAGAAUAAgAAAgSEDHgFADs=
// @grant        none
// @match        *://greasyfork.org/*/scripts/*
// @match        *://greasyfork.org/scripts/*
// @exclude      *://greasyfork.org/*/scripts/*/*
// @exclude      *://greasyfork.org/*/scripts/?
// @exclude      *://greasyfork.org/*/scripts/by*
// @exclude      *://greasyfork.org/scripts/*/*
// @exclude      *://greasyfork.org/scripts/?
// @exclude      *://greasyfork.org/scripts/by*
// @run-at       document-end
// ==/UserScript==
"use strict";
var appliesto = document.querySelector("div#script-meta dd.script-show-applies-to");
if (appliesto) {
	var text = appliesto.textContent.trim();
	if (text.match(/^(all sites|alle seiten|todos los sitios|tous les sites|semua situs|すべてのサイト|alle websites|wszystkie strony|todos sites|все сайты|所有站点|所有網站)$/i)) {
		appliesto.replaceChild(appliestoLink(text, "*"), appliesto.firstChild);
	}
}
function appliestoLink(text, site) {
	var a = document.createElement("a");
	a.setAttribute("href", "/scripts/by-site/" + (site ? site : text));
	a.appendChild(document.createTextNode(text));
	return a;
}
