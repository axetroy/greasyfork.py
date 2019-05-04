// ==UserScript==
// @name         MB. artist credit entity links
// @version      2018.4.4
// @changelog    https://github.com/jesus2099/konami-command/commits/master/MB.%20artist%20credit%20entity%20links.user.js
// @description  Adds links to filtered and searched release groups, releases and recordings  for each artist credit in artist aliases page’s artist credits section. Additionally spots duplicate aliases.
// @homepage     http://userscripts-mirror.org/scripts/show/131649
// @supportURL   https://github.com/jesus2099/konami-command/labels/mb_ARTIST-CREDIT-ENTITY-LINKS
// @compatible   opera(12.18.1872)+violentmonkey      my setup
// @compatible   vivaldi(1.0.435.46)+violentmonkey    my setup (ho.)
// @compatible   vivaldi(1.13.1008.32)+violentmonkey  my setup (of.)
// @compatible   firefox(47.0)+greasemonkey           tested sometimes
// @compatible   chrome+violentmonkey                 should be same as vivaldi
// @namespace    http://userscripts.org/scripts/show/131649
// @author       PATATE12
// @licence      CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/
// @licence      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @since        2012-04-23
// @require      https://greasyfork.org/scripts/10888-super/code/SUPER.js?version=263111&v=2018.3.14
// @grant        none
// @match        *://*.mbsandbox.org/artist/*/aliases
// @match        *://*.musicbrainz.org/artist/*/aliases
// @run-at       document-end
// ==/UserScript==
"use strict";
var artistCreditMachine = {
	defaults: {
		filter: "/artist/%artistID%/%entityType%s?filter.artist_credit_id=%artistCreditID%",
		search: "/search?query=arid%3A%artistID%+AND+artist%3A%22%artistCreditName%%22&type=%entityType%&limit=100&method=advanced"
	},
	overrides: {
		release_group: {
			filter: "/artist/%artistID%?filter.artist_credit_id=%artistCreditID%"
		},
		release: {},
		recording: {}
	},
	values: {
		artistName: document.querySelector("body > div#page > div#content > div.artistheader > h1 a").textContent,
		artistID: location.href.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/),
		artistCreditName: null,
		artistCreditID: null
	}
};
var tables = document.querySelectorAll("body > div#page > div#content > table.tbl");
for (var tab = 0; tab < tables.length; tab++) {
	var h2 = getSibling(tables[tab], "h2", null, true);
	var type = h2.textContent.match(/artist credits/i) ? "artistCredit" : "artistAlias";
	if (type == "artistCredit") {
		tables[tab].querySelector("tr").insertBefore(createTag("th", {s: {textShadow: "0 0 2px yellow"}}, "Associated entities"), tables[tab].querySelector("tr > th:nth-last-of-type(1)"));
	}
	for (var trs = tables[tab].querySelectorAll("tr"), i = 1; i < trs.length; i++) {
		artistCreditMachine.values.artistCreditName = trs[i].querySelector("td").textContent.match(/^\s*(.+)\s*$/)[1];
		if (type == "artistCredit") {
			artistCreditMachine.values.artistCreditID = trs[i].querySelector("td:nth-last-of-type(1) > a").getAttribute("href").match(/credit\/([0-9]+)\/edit$/)[1];
			var entd = trs[i].insertBefore(document.createElement("td"), trs[i].querySelector("td:nth-last-of-type(1)"));
			var list = document.createElement("ul");
			for (var entity in artistCreditMachine.overrides) if (artistCreditMachine.overrides.hasOwnProperty(entity)) {
				var item = list.appendChild(document.createElement("li"));
				item.appendChild(createTag("b", {}, entity.replace(/_/, "\u00a0")));
				item.appendChild(document.createTextNode(":\u00a0"));
				item.appendChild(createTag("a", {a: {title: entity.replace(/_/, "\u00a0"), href: expandTokens(artistCreditMachine.overrides[entity].filter ? artistCreditMachine.overrides[entity].filter : artistCreditMachine.defaults.filter.replace(/%entityType%/, entity))}}, "filter"));
				item.appendChild(document.createTextNode("\u00a0/\u00a0"));
				item.appendChild(createTag("a", {a: {title: entity.replace(/_/, "\u00a0"), href: expandTokens(artistCreditMachine.overrides[entity].search ? artistCreditMachine.overrides[entity].search : artistCreditMachine.defaults.search.replace(/%entityType%/, entity))}}, "search"));
			}
			entd.appendChild(list);
		}
		if (artistCreditMachine.values.artistCreditName == artistCreditMachine.values.artistName) {
			trs[i].querySelector("td").appendChild(createTag("span", {}, " (main)"));
			trs[i].classList.remove("even");
			trs[i].style.setProperty("background-color", "#cfc");
		}
	}
}
function expandTokens(url) {
	var expandedUrl = url;
	for (var value in artistCreditMachine.values) if (artistCreditMachine.values.hasOwnProperty(value)) {
		expandedUrl = expandedUrl.replace(new RegExp("%" + value + "%", "g"), encodeURIComponent(artistCreditMachine.values[value]));
	}
	return expandedUrl;
}
