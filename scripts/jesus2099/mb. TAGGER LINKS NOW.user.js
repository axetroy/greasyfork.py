// ==UserScript==
// @name         mb. TAGGER LINKS NOW
// @version      2018.3.12
// @changelog    https://github.com/jesus2099/konami-command/commits/master/mb_TAGGER-LINKS-NOW.user.js
// @description  musicbrainz.org: Quickly show or update "TAGGER" links with desired port
// @homepage     http://userscripts-mirror.org/scripts/show/88065
// @supportURL   https://github.com/jesus2099/konami-command/labels/mb_TAGGER-LINKS-NOW
// @compatible   opera(12.18.1872)+violentmonkey  my setup
// @namespace    https://github.com/jesus2099/konami-command
// @author       PATATE12
// @licence      CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/
// @licence      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @since        2010-10-13
// @icon         data:image/gif;base64,R0lGODlhEAAQAKEDAP+/3/9/vwAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh/glqZXN1czIwOTkAIfkEAQACAwAsAAAAABAAEAAAAkCcL5nHlgFiWE3AiMFkNnvBed42CCJgmlsnplhyonIEZ8ElQY8U66X+oZF2ogkIYcFpKI6b4uls3pyKqfGJzRYAACH5BAEIAAMALAgABQAFAAMAAAIFhI8ioAUAIfkEAQgAAwAsCAAGAAUAAgAAAgSEDHgFADs=
// @grant        none
// @match        *://*.mbsandbox.org/area/*/releases*
// @match        *://*.mbsandbox.org/artist/*/releases*
// @match        *://*.mbsandbox.org/cdtoc/*
// @match        *://*.mbsandbox.org/label/*
// @match        *://*.mbsandbox.org/recording/*
// @match        *://*.mbsandbox.org/release*
// @match        *://*.mbsandbox.org/search*type=release*
// @match        *://*.musicbrainz.org/area/*/releases*
// @match        *://*.musicbrainz.org/artist/*/releases*
// @match        *://*.musicbrainz.org/cdtoc/*
// @match        *://*.musicbrainz.org/label/*
// @match        *://*.musicbrainz.org/recording/*
// @match        *://*.musicbrainz.org/release*
// @match        *://*.musicbrainz.org/search*type=release*
// @exclude      *.org/cdtoc/*/set-durations*
// @exclude      *.org/cdtoc/attach?toc=*medium=*
// @exclude      *.org/cdtoc/search*type=release_group*
// @exclude      *.org/cdtoc/search*type=release-group*
// @exclude      *.org/release*/*/*edits*
// @run-at       document-end
// ==/UserScript==
"use strict";
var userjs = "jesus2099userjs88065";
/* ----- - ----- CONFIG */
var automatic = true; /*will background load tport (only when none) so TAGGER buttons do appear on next page browsing without bother triggering it manually*/
var url = self.location.protocol + "//" + self.location.host + "/search?query=artist%3AAJICO+AND+release%3A%22AJICO+SHOW%22+AND+format%3AVHS&type=release&method=advanced&tport=%tagger-port%";
var txt_notaggerlinks = "%tagger-img% (%tagger-port%)"; /* %tagger-port% variable shows the current port and %tagger-img% the tagger image */
var txt_taggerlinksloaded = "%tagger-img% (%tagger-port%)";
var txt_loading = "⌛ loading…";
var bgcolour = "#6f9";
var taggerImgUrl = "/static/images/icons/mblookup-tagger.png"; /*replaces %tagger-img% in txt and chgtxt*/
/* ----- - END OF CONFIG */
var RE_GUID = "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}";
var portStorage = userjs+"_tport";
var isOK = document.cookie.match(new RegExp(userjs+"_ok=1"));
var shouldhavetaggerlink = self.location.pathname.match(new RegExp("^/(artist/"+RE_GUID+"/releases|label/"+RE_GUID+"|recording/"+RE_GUID+"|release[-_]group/"+RE_GUID+"|release/"+RE_GUID+"(/(relationships|discids|tags|details|((add|edit|remove|reorder)-)?cover-art(/\\d+)?|edit))?)/?$")) && document.querySelector("a[href*='/release/']:not([href*='/release/add'])");
var taggerlink = document.querySelector("a.tagger-icon");
var con, a, menu;
var savedport = localStorage.getItem(portStorage);
var tagger_port = savedport?savedport:"8000";
if (taggerlink) {
	document.cookie = userjs+"_ok=1; path=/";
	isOK = true;
	var tport = taggerlink.getAttribute("href");
	if (tport) {
		tport = tport.match(/^https?:\/\/[^/]+:([0-9]+)\//);
		if (tport) {
			tagger_port = tport[1];
			if (tagger_port != savedport) {
				localStorage.setItem(portStorage, tagger_port);
			}
		}
	}
}
if (menu = document.querySelector("table#mainmenu-table table tr, div#header-menu ul")) {
	a = document.createElement("a");
	var wtxt = (taggerlink?txt_taggerlinksloaded:txt_notaggerlinks).replace(/%tagger-port%/, tagger_port);
	var wfrg = document.createDocumentFragment();
	var warr = wtxt.split("%tagger-img%");
	if (warr.length > 1) {
		wfrg.appendChild(document.createTextNode(warr[0]));
		var img = document.createElement("img");
		img.setAttribute("src", taggerImgUrl);
		img.setAttribute("alt", "tagger");
		img.style.setProperty("vertical-align", "bottom");
		wfrg.appendChild(img);
		wfrg.appendChild(document.createTextNode(warr[1]));
	}
	else {
		wfrg.appendChild(document.createTextNode(wtxt));
	}
	a.appendChild(wfrg);
	a.style.setProperty("cursor", "pointer");
	a.setAttribute("title", (!taggerlink ? "CTRL+" : "") + "CLICK to change port (currently on port " + tagger_port + ")");
	a.addEventListener("click", function(e) {
			if (e.ctrlKey || taggerlink) {
				var tport = prompt("CHANGE TAGGER PORT\n\nCurrent tagger port is " + tagger_port + ".\nEnter new tagger port below:", tagger_port);
				if (!tport || (tport == tagger_port && taggerlink)) {
					return false;
				}
				else {
					tagger_port = tport;
					localStorage.setItem(portStorage, tport);
				}
			}
			loadu(e, false);
		}, false);
	con = document.createElement("li");
	con.appendChild(a);
	if (!taggerlink && shouldhavetaggerlink || !isOK) {
		con.style.setProperty("background-color", bgcolour);
		if (automatic) {
			loadu(null, shouldhavetaggerlink);
		}
	}
	menu.insertBefore(con, menu.firstChild);
}
function loadu(e, reload) {
	con.style.setProperty("opacity", ".5");
	if (reload) {
		removeChildren(a);
		a.appendChild(document.createTextNode(txt_loading));
	}
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(e) {
		if (this.readyState == 4) {
			if (this.status < 400 && this.status > 199 && this.responseText.match(/class="tagger-icon"/)) {
				document.cookie = userjs+"_ok=1; path=/";
				isOK = true;
				if (reload) {
					top.location.reload(true);
				} else {
					con.style.setProperty("opacity", "1");
					con.style.removeProperty("background-color");
					a.setAttribute("title", a.getAttribute("title")+" \n ☞ AUTO-LOAD seems to have WORKED");
				}
			}
			else {
				con.style.setProperty("opacity", "1");
				con.style.setProperty("background-color", "gold");
				if (reload) {
					a.setAttribute("title", a.getAttribute("title")+" \n ☞ AUTO-LOAD seems to have FAILED");
				} else {
					removeChildren(a);
					a.appendChild(document.createTextNode("Error "+this.status+" (retry)"));
				}
			}
		}
	};
	xhr.open("get", url.replace(/%tagger-port%/, tagger_port), true);
	xhr.send(null);
}
function removeChildren(p) {
	while (p && p.hasChildNodes()) { p.removeChild(p.firstChild); }
}
