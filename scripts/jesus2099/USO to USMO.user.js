// ==UserScript==
// @name         USO to USMO
// @version      2019.4.12
// @changelog    https://github.com/jesus2099/konami-command/commits/master/USO-to-USMO.user.js
// @description  and userscripts.org links lead to userscripts-mirror.org — all kinds: http/https, www/no-www, short/long — bypass this script by holding CTRL+ALT+SHIFT
// @inspiration  http://userscripts-mirror.org/scripts/show/487275
// @supportURL   https://github.com/jesus2099/konami-command/labels/USO-to-USMO
// @compatible   opera(12.18.1872)+violentmonkey      my setup
// @compatible   vivaldi(1.0.435.46)+violentmonkey    my setup (ho.)
// @compatible   vivaldi(1.13.1008.32)+violentmonkey  my setup (of.)
// @compatible   firefox(47.0)+greasemonkey           tested sometimes
// @compatible   chrome+violentmonkey                 should be same as vivaldi
// @namespace    https://github.com/jesus2099/konami-command
// @author       PATATE12
// @licence      CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/
// @licence      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @since        2015-07-30
// @icon         data:image/gif;base64,R0lGODlhEAAQAMIDAAAAAIAAAP8AAP///////////////////yH5BAEKAAQALAAAAAAQABAAAAMuSLrc/jA+QBUFM2iqA2ZAMAiCNpafFZAs64Fr66aqjGbtC4WkHoU+SUVCLBohCQA7
// @require      https://greasyfork.org/scripts/10888-super/code/SUPER.js?version=263111&v=2018.3.14
// @grant        none
// @match        *://*/*
// @exclude      *://userscripts-mirror.org/*
// @run-at       document-start
// ==/UserScript==
"use strict";
document.addEventListener("mousedown", function(event) {
	if (!event.altKey || !event.ctrlKey || !event.shiftKey) {
		var element = event.target || event.srcElement;
		if (element && element.nodeType == Node.ELEMENT_NODE) {
			if (element.tagName != "A") {
				element = getParent(element, "a");
			}
			if (element && element.tagName == "A" && !element.classList.contains("jesus2099-bypass-USO-to-USMO")) { // not linked yet
				var HREF = element.getAttribute("href");
				var hrefMatch = HREF && HREF.trim().match(/^(https?:)?(\/\/)?(www\.)?(userscripts\.org)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/);
				var newHref = HREF;
				if (hrefMatch) {
					/* an USO link was (left/middle/right) mouse clicked */
					/* expand short path (uso/123456 → uso/scripts/show/123456) */
					var shortPath = hrefMatch[6];
					if (shortPath && (shortPath = shortPath.match(/^\/(\d+)\/?$/))) {
						newHref = newHref.replace(shortPath[0], "/scripts/show/" + shortPath[1]);
					}
					/* USO to USMO */
					newHref = newHref.replace((hrefMatch[1] ? hrefMatch[1] : "") + (hrefMatch[2] ? hrefMatch[2] : "") + (hrefMatch[3] ? hrefMatch[3] : "") + hrefMatch[4], "http://userscripts-mirror.org");
					element.setAttribute("href", newHref);
					element.style.setProperty("background-color", "#cfc");
					element.style.setProperty("color", "#606");
					element.style.setProperty("text-decoration", "line-through");
					var tooltip = element.getAttribute("title") || "";
					if (tooltip) {
						tooltip += "\r\n";
					}
					element.setAttribute("title", tooltip + "old: " + HREF + "\r\nnew: " + newHref);
				}
			}
		}
	}
});
