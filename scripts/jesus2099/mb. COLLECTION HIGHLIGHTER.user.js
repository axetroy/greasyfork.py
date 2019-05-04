"use strict";
var meta = {raw: function() {
// ==UserScript==
// @name         mb. COLLECTION HIGHLIGHTER
// @version      2018.4.4
// @changelog    https://github.com/jesus2099/konami-command/commits/master/mb_COLLECTION-HIGHLIGHTER.user.js
// @description  musicbrainz.org: Highlights releases, release-groups, etc. that you have in your collections (anyone’s collection can be loaded) everywhere
// @homepage     http://userscripts-mirror.org/scripts/show/126380
// @supportURL   https://github.com/jesus2099/konami-command/labels/mb_COLLECTION-HIGHLIGHTER
// @compatible   opera(12.18.1872)+violentmonkey      my setup
// @compatible   vivaldi(1.0.435.46)+violentmonkey    my setup (ho.)
// @compatible   vivaldi(1.13.1008.32)+violentmonkey  my setup (of.)
// @compatible   firefox(47.0)+greasemonkey           tested sometimes
// @compatible   chrome+violentmonkey                 should be same as vivaldi
// @namespace    https://github.com/jesus2099/konami-command
// @author       PATATE12
// @licence      CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/
// @licence      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @since        2012-02-21
// @icon         data:image/gif;base64,R0lGODlhEAAQAMIDAAAAAIAAAP8AAP///////////////////yH5BAEKAAQALAAAAAAQABAAAAMuSLrc/jA+QBUFM2iqA2ZAMAiCNpafFZAs64Fr66aqjGbtC4WkHoU+SUVCLBohCQA7
// @require      https://greasyfork.org/scripts/10888-super/code/SUPER.js?version=263111&v=2018.3.14
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_setValue
// @match        *://*.mbsandbox.org/*edits*
// @match        *://*.mbsandbox.org/*votes*
// @match        *://*.mbsandbox.org/area/*
// @match        *://*.mbsandbox.org/artist/*
// @match        *://*.mbsandbox.org/cdtoc/*
// @match        *://*.mbsandbox.org/collection/*
// @match        *://*.mbsandbox.org/edit/*
// @match        *://*.mbsandbox.org/event/*
// @match        *://*.mbsandbox.org/isrc/*
// @match        *://*.mbsandbox.org/label/*
// @match        *://*.mbsandbox.org/place/*
// @match        *://*.mbsandbox.org/puid/*
// @match        *://*.mbsandbox.org/recording/*
// @match        *://*.mbsandbox.org/release/*
// @match        *://*.mbsandbox.org/release_group/*
// @match        *://*.mbsandbox.org/release-group/*
// @match        *://*.mbsandbox.org/report/*
// @match        *://*.mbsandbox.org/search*
// @match        *://*.mbsandbox.org/series/*
// @match        *://*.mbsandbox.org/tag/*
// @match        *://*.mbsandbox.org/tracklist/*
// @match        *://*.mbsandbox.org/url/*
// @match        *://*.mbsandbox.org/user/*/collections
// @match        *://*.mbsandbox.org/user/*/ratings*
// @match        *://*.mbsandbox.org/user/*/subscriptions/artist*
// @match        *://*.mbsandbox.org/user/*/subscriptions/collection*
// @match        *://*.mbsandbox.org/user/*/subscriptions/label*
// @match        *://*.mbsandbox.org/user/*/tag/*
// @match        *://*.mbsandbox.org/work/*
// @match        *://*.musicbrainz.org/*edits*
// @match        *://*.musicbrainz.org/*votes*
// @match        *://*.musicbrainz.org/area/*
// @match        *://*.musicbrainz.org/artist/*
// @match        *://*.musicbrainz.org/cdtoc/*
// @match        *://*.musicbrainz.org/collection/*
// @match        *://*.musicbrainz.org/edit/*
// @match        *://*.musicbrainz.org/event/*
// @match        *://*.musicbrainz.org/isrc/*
// @match        *://*.musicbrainz.org/label/*
// @match        *://*.musicbrainz.org/place/*
// @match        *://*.musicbrainz.org/puid/*
// @match        *://*.musicbrainz.org/recording/*
// @match        *://*.musicbrainz.org/release/*
// @match        *://*.musicbrainz.org/release_group/*
// @match        *://*.musicbrainz.org/release-group/*
// @match        *://*.musicbrainz.org/report/*
// @match        *://*.musicbrainz.org/search*
// @match        *://*.musicbrainz.org/series/*
// @match        *://*.musicbrainz.org/tag/*
// @match        *://*.musicbrainz.org/tracklist/*
// @match        *://*.musicbrainz.org/url/*
// @match        *://*.musicbrainz.org/user/*/collections
// @match        *://*.musicbrainz.org/user/*/ratings*
// @match        *://*.musicbrainz.org/user/*/subscriptions/artist*
// @match        *://*.musicbrainz.org/user/*/subscriptions/collection*
// @match        *://*.musicbrainz.org/user/*/subscriptions/label*
// @match        *://*.musicbrainz.org/user/*/tag/*
// @match        *://*.musicbrainz.org/work/*
// @match        https://acoustid.org/track/*
// @exclude      *.org/collection/*/own_collection/*
// @run-at       document-end
// ==/UserScript==
// ==OpenUserJS==
// @unstableMinify it might break metadata block parser
// ==/OpenUserJS==
}};
if (meta.raw && meta.raw.toString && (meta.raw = meta.raw.toString())) {
	var item, row = /\/\/\s+@(\S+)\s+(.+)/g;
	while ((item = row.exec(meta.raw)) !== null) {
		if (meta[item[1]]) {
			if (typeof meta[item[1]] == "string") {
				meta[item[1]] = [meta[item[1]]];
			}
			meta[item[1]].push(item[2]);
		} else {
			meta[item[1]] = item[2];
		}
	}
}
meta.name = meta.name.substr("4") + " " + meta.version;
// ############################################################################
// #                                                                          #
// #                           LEGACY CLEANUP                                 #
// # to be deleted…                                                           #
// ############################################################################
var oldPrefix = "jesus2099userjs126380";
// cleanup for previous master version (localStorage.setItem to GM_setValue)
for (var i = 0; i < localStorage.length; i++) {
	if(localStorage.key(i).indexOf(oldPrefix) == 0 && localStorage.key(i).length > oldPrefix.length) {
		GM_setValue(localStorage.key(i).substr(oldPrefix.length), localStorage.getItem(localStorage.key(i)));
		localStorage.removeItem(localStorage.key(i));
	}
}
// cleanup for previous branch version (GM_setValue(oldPrefix + key) to GM_setValue(key))
var keys = GM_listValues();
for (var j = 0; j < keys.length; j++) {
	if(keys[j].indexOf(oldPrefix) == 0 && keys[j].length > oldPrefix.length) {
		GM_setValue(keys[j].substr(oldPrefix.length), GM_getValue(keys[j]));
		GM_deleteValue(keys[j]);
	}
}
// ############################################################################
// #                                                                          #
// #                           MAIN RUN                                       #
// #                                                                          #
// ############################################################################
var MBS = self.location.protocol + "//" + self.location.host;
var cat = self.location.pathname.match(/(area(?!.+(artists|labels|releases|places|aliases|edits))|artist(?!.+(releases|recordings|works|relationships|aliases|edits))|artists|event|labels|releases|recordings|report|series|track|works|aliases|cdtoc|collection(?!s|.+edits)|collections|edit(?!s|\/subscribed)|edits|votes|edit\/subscribed|isrc|label(?!.+edits)|place(?!.+(aliases|edits))|puid|ratings|recording(?!s|.+edits)|relationships|release[-_]group(?!.+edits)|release(?!s|-group|.+edits)|search(?!\/edits)|tracklist|tag|url|work(?!s))/);
if (cat) {
	/* -------- CONFIGURATION START (don’t edit above) -------- */
	var highlightColour = "purple";
	var highlightInEditNotes = false;
	var skipArtists = "89ad4ac3-39f7-470e-963a-56509c546377"; /*put artist GUID separated by space that you want to skip, example here it’s VA*/
	var MBWSRate = 1000;
	/* -------- CONFIGURATION  END  (don’t edit below) -------- */
	var prefix = "collectionHighlighter";
	var DEBUG = false;
	var dialogprefix = "..:: " + meta.name.replace(/ /g, " :: ") + " ::..\r\n\r\n";
	var maxRetry = 20;
	var retryPause = 5000;
	var slowDownStepAfterRetry = 0;
	var css_nextPage = "ul.pagination > li:last-of-type > a";
	var retry = 0;
	var debugBuffer = "";
	var j2ss = document.createElement("style");
	j2ss.setAttribute("type", "text/css");
	document.head.appendChild(j2ss);
	j2ss = j2ss.sheet;
	var brdr = " border-left: 4px solid " + highlightColour + "; ";
	j2ss.insertRule("." + prefix + "Box {" + brdr.replace(/-left/, "") + "}", 0);
	j2ss.insertRule("." + prefix + "Row {" + brdr + "}", 0);
	j2ss.insertRule("li." + prefix + "Row { padding-left: 4px; }", 0);
	j2ss.insertRule("." + prefix + "Item { text-shadow: 0 0 8px " + highlightColour + "!important; }", 0);
	j2ss.insertRule("." + prefix + "Row ." + prefix + "Item { border: 0; padding: 0; }", 0);
	var collectionsID = GM_getValue("collections") || "";
	var releaseID;
	var stuff, collectedStuff = ["collection", "release", "release-group", "recording", "artist", "work", "label"];
	var strType = "release-group|recording|label|artist|work";
	var strMBID = "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}";
	cat = cat[1].replace(/edit\/subscribed|votes/, "edits").replace(/_/, "-");
	debug("CAT: " + cat);
// ############################################################################
// #                                       DISPLAY RELEASE PAGE SIDEBAR TOOLS #
// ############################################################################
	if (cat == "release" && (releaseID = self.location.pathname.match(new RegExp(strMBID)))) {
		releaseID = releaseID[0];
		var mainReleasePage = self.location.pathname.match(new RegExp("^/release/" + strMBID + "$"));
		var colls = document.querySelectorAll("div#sidebar a[href*='/own_collection/add?release='], div#sidebar a[href*='/own_collection/remove?release=']");
		for (var coll = 0; coll < colls.length; coll++) {
			if (collectionsID.indexOf(colls[coll].getAttribute("href").match(new RegExp(strMBID))) > -1) {
				if (mainReleasePage) {
					collectionUpdater(colls[coll], colls[coll].getAttribute("href").match(/add|remove/).toString());
				} else {
					addAfter(createTag("div", {s: {textShadow: "0 0 8px " + highlightColour}}, ["(please go to ", createTag("a", {a: {href: "/release/" + releaseID}}, "main release page"), " for this button to auto‐update your collection highlighter)"]), colls[coll])
				}
			}
		}
		if (mainReleasePage) {
			var lili = document.querySelector("div#sidebar > h2.collections + ul.links");
			if (lili) {
				var buttxt = " this release to your local collection highlighter,\r\nwithout changing its status among you MB collection(s)";
				lili = lili.insertBefore(document.createElement("li"), lili.firstChild);
				lili.appendChild(document.createTextNode("Force highlight "));
				collectionUpdater(lili.appendChild(createA("ON", self.location.href, "Add" + buttxt, true)), "add");
				lili.appendChild(document.createTextNode(" / "));
				collectionUpdater(lili.appendChild(createA("OFF", self.location.href, "Remove" + buttxt.replace(" to ", " from "), true)), "remove");
			}
		}
	}
	if (cat == "collections") {
// ############################################################################
// #                                     DISPLAY COLLECTION PAGE LOADER TOOLS #
// ############################################################################
		var xp1 = document.evaluate("//xhtml:table[contains(@class, 'tbl')]/xhtml:thead//xhtml:th/text()[contains(., 'Veröffentlichungen') or contains(., 'Väljalasked') or contains(., 'Releases') or contains(., 'Publicaciones') or contains(., 'Parutions') or contains(., 'Pubblicazioni') or contains(., 'Uitgaves') or contains(., 'Julkaisut') or contains(., 'Κυκλοφορίες') or contains(., 'リリース')]", document, nsr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var tbl_idx = 0; tbl_idx < xp1.snapshotLength > 0; tbl_idx++) {
			xp1.snapshotItem(tbl_idx).parentNode.parentNode.appendChild(createTag("th", {a: {colspan: "2"}}, meta.name));
			var tbl = getParent(xp1.snapshotItem(tbl_idx).parentNode, "table");
			xp = document.evaluate("./xhtml:tbody/xhtml:tr", tbl, nsr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < xp.snapshotLength; i++) {
				var coll = xp.snapshotItem(i).getElementsByTagName("a")[0];
				var collid = coll.getAttribute("href").match(new RegExp(strMBID));
				var loadButtons = [];
				var loadButtonText = "Load";
				if (collectionsID.indexOf(collid) > -1) {
					decorate(coll);
					loadButtonText = "Reload";
				}
				loadButtons.push(createA(
					"Append",
					function(event) {
						var opts = document.querySelectorAll("td." + prefix + " input[type='checkbox']:checked");
						stuff = {};
						for (var opt = 0; opt < opts.length; opt++) {
							stuff[opts[opt].getAttribute("name")] = {};
						}
						var pageCrawlMode = cantUseWS(this);
						loadCollection(this.getAttribute("title").match(new RegExp(strMBID)), !pageCrawlMode, pageCrawlMode ? 1 : 0);
					},
					"Add this collection’s content to highlighter (" + collid + ")"
				));
				loadButtons.push(" | ");
				loadButtons.push(createA(
					loadButtonText,
					function(event) {
						var cmsg = "This will REPLACE your current loaded stuff.";
						if (confirm(dialogprefix + cmsg)) {
							// erase local stuff
							for (var stu = 0; stu < collectedStuff.length; stu++) {
								GM_deleteValue(collectedStuff[stu] + "s");
							}
							// then append (previous button)
							this.previousSibling.previousSibling.click();
						}
					},
					"Replace current highlighted content with this collection’s content (" + collid + ")"
				));
				xp.snapshotItem(i).appendChild(document.createElement("td")).appendChild(concat(loadButtons));
				if (i == 0) {
					/* settings */
					var settings = [];
					for (var stu = 0; stu < collectedStuff.length; stu++) if (collectedStuff[stu] != "collection") {
						var cstuff = collectedStuff[stu];
						var lab = document.createElement("label");
						lab.style.setProperty("white-space", "nowrap");
						lab.appendChild(concat([createTag("input", {a: {type: "checkbox", name: cstuff}, e: {change: function(event) { GM_setValue("cfg" + this.getAttribute("name"), this.checked ? "1" : "0"); }}}), cstuff + "s "]));
						var cfgcb = lab.querySelector("input[type='checkbox'][name='" + cstuff + "']");
						if (cstuff.match(/artist|recording|release(-group)?/)) {/*defaults*/
							cfgcb.setAttribute("checked", "checked");
						}
						if (cstuff.match(/release(-group)?/)) {/*forced*/
							lab.style.setProperty("opacity", ".5");
							cfgcb.setAttribute("disabled", "disabled");
						} else {/* read previous settings */
							var cfgstu = GM_getValue("cfg" + cstuff);
							if (cfgstu == "1") {
								cfgcb.setAttribute("checked", "checked");
							} else if (cfgstu == "0") {
								cfgcb.removeAttribute("checked");
							}
						}
						if (cstuff.match(/artist|work/)) {/*artist and work tracking requires recording tracking*/
							cfgcb.addEventListener("change", function(event) {
								if (this.checked) {
									var recording = this.parentNode.parentNode.querySelector("input[name='recording']");
									recording.checked = true;
									sendEvent(recording, "change");
								}
							}, false);
						} else if (cstuff.match(/recording/)) {
							cfgcb.addEventListener("change", function(event) {
								if (!this.checked) {
									var artistwork = this.parentNode.parentNode.querySelectorAll("input[name='artist'], input[name='work']");
									for (var aw = 0; aw < artistwork.length; aw++) {
										artistwork[aw].checked = false;
										sendEvent(artistwork[aw], "change");
									}
								}
							}, false);
						}
						settings.push(lab);
						settings.push(" ");
					}
					xp.snapshotItem(i).appendChild(createTag("td", {a: {class: prefix, rowspan: xp.snapshotLength}}, concat(settings)));
				}
			}
		}
	} else {
// ############################################################################
// #                                    COLLECT LINKS TO HIGHLIGHT / DECORATE #
// ############################################################################
		stuff = {};
		for (var stu = 0; stu < collectedStuff.length; stu++) {
			var cstuff = collectedStuff[stu];
			stuff[cstuff] = {};
			var uphill = "";
			var downhill = cat == "release" && cstuff == "label" ? "" : "[count(ancestor::xhtml:div[contains(@id, 'sidebar')])=0]";
			if (!highlightInEditNotes && (cat == "edit" || cat == "edits")) {
				downhill += "[count(ancestor::xhtml:div[contains(@class, 'edit-notes')])=0]";
			}
			var root = cat == "track" /* acoustid.org */ ? "//musicbrainz.org/" : "/";
			var path = uphill + "//xhtml:a[starts-with(@href, '" + root + cstuff + "/')]" + downhill;
			var xp = document.evaluate(path, document, nsr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < xp.snapshotLength; i++) {
				var mbid = xp.snapshotItem(i).getAttribute("href").match(new RegExp("/" + cstuff + "/(" + strMBID + ")$"));
				if (mbid) {
					mbid = mbid[1];
					if (!stuff[cstuff].loaded) {
						stuff[cstuff].rawids = GM_getValue(cstuff + "s");
						if (stuff[cstuff].rawids) {
							stuff[cstuff].ids = stuff[cstuff].rawids.split(" ");
							debug(" \r\n" + stuff[cstuff].ids.length + " " + cstuff.toUpperCase() + (stuff[cstuff].ids.length == 1 ? "" : "S") + " loaded (" + cstuff + "s)\r\nMatching: " + path, true);
						} else { debug(" \r\nNo " + cstuff.toUpperCase() + "S in highlighter (" + cstuff + "s)", true); }
						stuff[cstuff].loaded = true;
					}
					if (stuff[cstuff].ids && stuff[cstuff].ids.indexOf(mbid) > -1) {
						debug(mbid + " ● “" + xp.snapshotItem(i).textContent + "”", true);
						decorate(xp.snapshotItem(i));
					}
				}
			}
		}
		debug("");
	}
}
// ############################################################################
// #                                                                          #
// #                           MAIN FUNCTIONS                                 #
// #                                                                          #
// ############################################################################
// ############################################################################
// #                                              HIGHLIGHT / DECORATE A LINK #
// ############################################################################
function decorate(entityLink) {
	if (!getParent(entityLink, "div", "tabs")) {
		// Does not highlight tabs.
		entityLink.classList.add(prefix + "Item");
		var page = document.getElementById("page");
		if (getParent(entityLink, "h1")) {
			// Entity page is boxed.
			page.classList.add(prefix + "Box");
		} else {
			var entityType = entityLink.getAttribute("href").match(new RegExp("/(.+?)/" + strMBID, "i")) || "";
			if (entityType) {
				entityType = entityType[1];
			}
			if (cat == "edit") {
				// entity edit page is boxed
				var editDetails = getParent(entityLink, "table", "details");
				if (editDetails && entityLink == editDetails.querySelector("a")) {
					page.classList.add(prefix + "Box");
				}
			} else if (cat == "edits") {
				// in edit lists: Release or release group edits are boxed; other entity edits are left bordered
				var edit = getParent(entityLink, "div", "edit-list");
				if (edit) {
					edit.classList.add(prefix + (entityLink == edit.querySelector("div.edit-details a") ? "Box" : "Row"));
				}
			} else {
				// in other pages: Associated tracks are Leftmost entity table rows are left bordered. Not in owned release tracklists
				var row = !getParent(entityLink, "ul") && !getParent(entityLink, "dl") && getParent(entityLink, "tr");
				if (row) {
					if (entityLink == row.querySelector("a:not([href*='coverartarchive.org']):not([href*='/track/'])") && !(cat == "release" && page.classList.contains(prefix + "Box") && entityType == "recording")) {
						row.classList.add(prefix + "Row");
					}
					// decorate tracks without holding them
					if (cat == "release" && entityType == "recording" || cat == "recording" && entityType == "release") {
						var track = row.querySelector("a[href*='/track']");
						if (track) {
							track.classList.add(prefix + "Item");
						}
					}
				}
			}
		}
	}
}
// ############################################################################
// #                                   COLLECT RELEASES FROM COLLECTION PAGES #
// ############################################################################
function loadCollection(collectionMBID, WSMode, pageOrOffset) {
	var limit = 100;
	var offset = pageOrOffset;
	var page = !WSMode ? pageOrOffset : offset / limit + 1;
	setTitle(true);
	var url = WSMode ? "/ws/2/collection/" + collectionMBID + "/releases?limit=" + limit + "&offset=" + offset : "/collection/" + collectionMBID + "?page=" + page;
	if (page == 1) {
		// Add collection MBID to list of highlighted
		collectionsID = GM_getValue("collections") || "";
		if (collectionsID.indexOf(collectionMBID) < 0) {
			collectionsID += collectionMBID + " ";
		}
		GM_setValue("collections", collectionsID);
		modal(true, "Loading collection " + collectionMBID + "…", 1);
		modal(true, concat(["WTF? If you want to stop this monster crap, just ", createA("reload", function(event) { self.location.reload(); }), " or close this page."]), 2);
		modal(true, concat(["<hr>", "Fetching releases…"]), 2);
		stuff["release-tmp"] = {ids: []};
		for (var stu in stuff) if (collectedStuff.indexOf(stu) >= 0) {
			stuff[stu].rawids = GM_getValue(stu + "s") || "";
			stuff[stu].ids = stuff[stu].rawids.length > 0 ? stuff[stu].rawids.split(" ") : [];
		}
	}
	modal(true, "Reading page " + page + "… ");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 401) {
				modal(true, concat(["NG.", "<br>", "Private collection problem, switching to slower mode…"]), 1);
				loadCollection(collectionMBID, false, 1);
			} else if (this.status == 200) {
				var re = WSMode ? '<release id="(' + strMBID + ')">' : '<td>(?:<span class="mp">)?<a href="/release/(' + strMBID + ')">(.+)</a>';
				var rels = this.responseText.match(new RegExp(re, "g"));
				if (rels) {
					for (var rel = 0; rel < rels.length; rel++) {
						var release = rels[rel].match(new RegExp(re))[1];
						if (stuff["release"].ids.indexOf(release) < 0) {
							stuff["release"].ids.push(release);
							stuff["release"].rawids += release + " ";
							stuff["release-tmp"].ids.push(release);
						}
					}
					modal(true, rels.length + " release" + (rels.length == 1 ? "" : "s") + " fetched.", 1);
				}
				var ps, lastPage, nextPage;
				if (WSMode && (lastPage = this.responseText.match(/<release-list count="(\d+)">/))) {
					lastPage = Math.ceil(parseInt(lastPage[1], 10) / limit);
				} else if (!WSMode) {
					var responseDOM = document.createElement("html"); responseDOM.innerHTML = this.responseText;
					nextPage = responseDOM.querySelector(css_nextPage);
				}
				if (lastPage && page < lastPage || nextPage) {
					if (lastPage && page == 1) { modal(true, "(total " + lastPage + " pages)", 1); }
					retry = 0;
					setTimeout(function() { loadCollection(collectionMBID, WSMode, WSMode ? offset + limit : page + 1); }, chrono(MBWSRate));
				} else if (lastPage && lastPage == page || !nextPage) {
					modal(true, " ", 1);
					if (stuff["release-tmp"].ids.length > 0) {
						GM_setValue("releases", stuff["release"].rawids);
						modal(true, concat([createTag("b", {}, stuff["release"].ids.length + " release" + (stuff["release"].ids.length == 1 ? "" : "s")), " saved… "]));
						modal(true, "OK.", 2);
						retry = 0;
						setTimeout(function() { fetchReleasesStuff(); }, chrono(MBWSRate));
					} else {
						modal(true, "No new releases.", 2);
						end(true);
					}
					stuff["release"].rawids = "";
				} else {
					end(false, "Error while loading page " + page + (lastPage ? "/" + lastPage : "") + ".");
				}
			} else {
				if (retry++ < maxRetry) {
					MBWSRate += slowDownStepAfterRetry;
					modal(true, "Error " + this.status + " “" + this.statusText + "” (" + retry + "/" + maxRetry + ")", 1);
					debugRetry(this.status);
					setTimeout(function() { loadCollection(collectionMBID, WSMode, WSMode ? offset : page); }, chrono(retryPause));
				} else {
					end(false, "Too many (" + maxRetry + ") errors (last " + this.status + " “" + this.statusText + "” while loading collection).");
				}
			}
		}
	};
	debug(MBS + url, true);
	chrono();
	xhr.open("GET", MBS + url, true);
	xhr.send(null);
}
// ############################################################################
// #                                  COLLECT ALL DATA FROM A SET OF RELEASES #
// ############################################################################
function fetchReleasesStuff(pi) {
	var i = pi ? pi : 0;
	var mbid = stuff["release-tmp"].ids[i];
	if (mbid && mbid.match(new RegExp(strMBID))) {
		if (i == 0) {
			modal(true, concat(["<hr>", "Fetching release related stuffs…"]), 2);
		}
		var url = "/ws/2/release/" + stuff["release-tmp"].ids[i] + "?inc=release-groups+recordings+artists+artist-credits+labels+recording-level-rels+work-rels";
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(event) {
			if (this.readyState == 4) {
				if (this.status == 200) {
					var res = this.responseXML;
					var xp = res.evaluate("//mb:release[1]", res, nsr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var relName = xp.snapshotItem(0).getElementsByTagName("title")[0].textContent;
					var relid = xp.snapshotItem(0).getAttribute("id");
					var relComm = res.evaluate("./mb:disambiguation/text()", xp.snapshotItem(0), nsr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					relComm = relComm.snapshotLength > 0 ? " (" + relComm.snapshotItem(0).textContent + ")" : "";
					var frg = document.createDocumentFragment();
					var cou = xp.snapshotItem(0).getElementsByTagName("country");
					if (cou.length > 0) {
						cou = cou[0].textContent;
					}
					if (typeof cou == "string" && cou.length == 2 && (cou.charAt(0) != "X" || cou == "XE")) {
						frg.appendChild(createTag("img", {a: {alt: cou, src: "//raw.githubusercontent.com/markjames/famfamfam-flag-icons/master/icons/png/" + (cou == "XE" ? "europeanunion" : cou.toLowerCase()) + ".png"}}));
						frg.appendChild(document.createTextNode(" "));
					}
					modal(true, concat([
						frg,
						createA(relName, "/release/" + relid),
						relComm,
						"<br>",
					]), 0, [i + 1, stuff["release-tmp"].ids.length]);
					var sep = "";
					var totalAddedStuff = 0
					for (var stu in stuff) if (stu != "release" && stuff.hasOwnProperty(stu)) {
						var addedStuff = 0;
						xp = res.evaluate("//mb:release[1]//mb:" + stu, res, nsr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
						for (var ixp = 0; ixp < xp.snapshotLength; ixp++) {
							var rgid = xp.snapshotItem(ixp).getAttribute("id");
							if (stu != "artist" || skipArtists.indexOf(rgid) < 0) {
								var stupos = stuff[stu].ids.indexOf(rgid);
								if (stupos < 0) {
									stuff[stu].ids.push(rgid);
									stuff[stu].rawids += rgid + " ";
									addedStuff++; totalAddedStuff++;
								}
							}
						}
						if (addedStuff > 0) {
							modal(true, sep + addedStuff + " " + stu + (addedStuff == 1 ? "" : "s"));
							sep = ", ";
						}
					}
					if (totalAddedStuff > 0) { modal(true, ".", 1); }
					if (++i < stuff["release-tmp"].ids.length) {
						retry = 0;
						setTimeout(function() { fetchReleasesStuff(i); }, chrono(MBWSRate));
					} else {
						modal(true, " ", 1);
						delete(stuff["release-tmp"]);
						for (var stu in stuff) if (stu != "release" && stuff.hasOwnProperty(stu)) {
							GM_setValue(stu + "s", stuff[stu].rawids);
							stuff[stu].rawids = "";
							modal(true, concat([createTag("b", {}, stuff[stu].ids.length + " " + stu + (stuff[stu].ids.length == 1 ? "" : "s")), " saved… "]));
							modal(true, "OK.", 1);
						}
						end(true);
					}
				} else {
					if (retry++ < maxRetry) {
						MBWSRate += slowDownStepAfterRetry;
						modal(true, "Error " + this.status + " “" + this.statusText + "” (" + retry + "/" + maxRetry + ")", 1);
						debugRetry(this.status);
						setTimeout(function() { fetchReleasesStuff(i); }, chrono(retryPause));
					} else {
						end(false, "Too many (" + maxRetry + ") errors (last " + this.status + " “" + this.statusText + "” while loading releases’ stuff).");
					}
				}
			}
		};
		debug(MBS + url, true);
		chrono();
		xhr.open("GET", MBS + url, true);
		xhr.send(null);
	}
}
// ############################################################################
// #                         DYNAMIC COLLECTION UPDATER (FOR CURRENT RELEASE) #
// ############################################################################
var altered = false;
function collectionUpdater(link, action) {
	if (link && action) {
		link.addEventListener("click", function(event) {
			altered = this.getAttribute("href") != self.location.href;
			modal(true, "Refreshing memory…", 1);
			collectionsID = GM_getValue("collections") || "";
			for (var stu in stuff) if (collectedStuff.indexOf(stu) >= 0) {
				stuff[stu].rawids = GM_getValue(stu + "s");
				stuff[stu].ids = stuff[stu].rawids != null ? (stuff[stu].rawids.length > 0 ? stuff[stu].rawids.split(" ") : []) : null;
			}
			if (stuff["release"].ids && releaseID) {
				setTitle(true);
				var checks = getStuffs();
				switch (action) {
					case "add":
						if (stuff["release"].rawids.indexOf(releaseID) == -1) {
							modal(true, concat([createTag("b", {}, "Adding this release"), " to loaded collection…"]), 1);
							stuff["release"].rawids += releaseID + " ";
							GM_setValue("releases", stuff["release"].rawids);
							altered = true;
						}
						for (var c = 0; c < checks.length; c++) {
							var match = checks[c].getAttribute("href").match(new RegExp("/(" + strType + ")/(" + strMBID + ")$", "i"));
							if (match) {
								var type = match[1], mbid = match[2];
								if (stuff[type].ids && stuff[type].rawids.indexOf(mbid) < 0 && (type != "artist" || skipArtists.indexOf(mbid) < 0)) {
									modal(true, concat([createTag("b", {}, ["Adding " + type, " ", createA(type != "release-group" ? checks[c].textContent : mbid, checks[c].getAttribute("href"), type)]), "…"]), 1);
									stuff[type].rawids += mbid + " ";
									GM_setValue(type + "s", stuff[type].rawids);
									altered = true;
								}
							}
						}
						setTitle(false);
						break;
					case "remove":
						if (stuff["release"].rawids.indexOf(releaseID) > -1) {
							modal(true, concat([createTag("b", {}, "Removing this release"), " from loaded collection…"]), 1);
							stuff["release"].rawids = stuff["release"].rawids.replace(new RegExp(releaseID + "( |$)"), "");
							GM_setValue("releases", stuff["release"].rawids);
							altered = true;
						}
						if (checks.length > 0) {
							lastLink(this.getAttribute("href"));
							stuffRemover(checks);
							return stop(event);
						}
						break;
				}
			}
			if (!altered) {
				modal(true, "Nothing has changed.", 1);
				setTimeout(function() { modal(false); }, 1000);
				return stop(event);
			} else {
				modal(true, "Re‐loading page…", 1);
			}
		}, false);
		decorate(link);
	}
}
// ############################################################################
// #                                    COLLECT ALL DATA FROM CURRENT RELEASE #
// ############################################################################
function getStuffs(what, pwhere) {
	var cont = pwhere ? pwhere : document;
	var selector = {
		"release": "div#content table.tbl > tbody > tr > td a[href^='/release/']", /*pwhere(lab,rec,rgr)*/
		"release-group": "div.releaseheader a[href^='/release-group/']", /*rel*/
		"recording": (pwhere ? "div#content [href^='/recording/']" : "table.medium > tbody > tr > td:not(.pos):not(.video) > a[href^='/recording/'], table.medium > tbody > tr > td:not(.pos):not(.video) > :not(div):not(.ars) a[href^='/recording/']"), /*pwhere(art,wrk)/rel*/
		"artist": "div.releaseheader a[href^='/artist/'], div#content table.tbl > tbody > tr > td > a[href^='/artist/'], div#content table.tbl > tbody > tr > td > span > a[href^='/artist/'], div#content table.tbl > tbody > tr > td > span > span > a[href^='/artist/']", /*rel*/
		"work": "div#content div.ars > dl.ars > dd > a[href^='/work/'], div#content div.ars > dl.ars > dd > span.mp > a[href^='/work/']", /*rel*/
		"label": "div#sidebar > ul.links > li a[href^='/label/']", /*rel*/
	};
	if (what) {
		return cont.querySelectorAll(selector[what]);
	} else {
		var allrelsel = selector["release-group"];
		if (stuff["recording"].ids) { allrelsel += ", " + selector["recording"]; }
		if (stuff["label"].ids) { allrelsel += ", " + selector["label"]; }
		var all = basicOnly(cont.querySelectorAll(allrelsel));
		var allrecsel = "", sep = "";
		if (stuff["artist"].ids) { allrecsel += sep + selector["artist"]; sep = ", "; }
		if (stuff["work"].ids) { allrecsel += sep + selector["work"]; }
		if (allrecsel != "") {
			all = basicOnly(cont.querySelectorAll(allrecsel), all);
		}
		return all;
	}
	function pathname(href) {
		return href.match(new RegExp("/[^/]+/" + strMBID)) + "";
	}
	function basicOnly(nodes, parr) {
		var arr = parr ? parr : [];
		var hrefs = [];
		for (var a = 0; a < arr.length; a++) {
			hrefs.push(pathname(arr[a].getAttribute("href")));
		}
		for (var n = 0; n < nodes.length; n++) {
			if (nodes[n].getAttribute) {
				var href = pathname(nodes[n].getAttribute("href"));
				if (href && href.match(new RegExp(strMBID + "$")) && hrefs.indexOf(href) == -1) {
					hrefs.push(href);
					arr.push(nodes[n]);
				}
			}
		}
		return arr;
	}
}
// ############################################################################
// #                                             CHECK IF STUFF IS STILL USED #
// ############################################################################
function stuffRemover(checks, pp) {
	var check = checks[0];
	if (check) {
		var p = pp ? pp : 1;
		var checkMatch = check.getAttribute("href").match(new RegExp("/(" + strType + ")/(" + strMBID + ")$", "i"));
		if (checkMatch) {
			var checkType = checkMatch[1];
			var checkID = checkMatch[2]
			var checkAgainst;
			switch (checkType) {
				case "label":
				case "recording":
				case "release-group":
					checkAgainst = "release";
					break;
				case "artist":
				case "work":
					checkAgainst = "recording";
					break;
			}
			if (stuff[checkAgainst].rawids && stuff[checkType].rawids.indexOf(checkID) > -1) {
				var url = "/" + checkType + "/" + checkID;
				if (checkType == "artist") { url += "/recordings"; }
				url += "?page=" + p;
				modal(true, concat(["Checking " + checkType + " ", createA(checkType != "release-group" ? check.textContent : checkID, check.getAttribute("href"), checkType), " against all its ", createA(checkAgainst + "s" + (p > 1 ? " (page " + p + ")" : ""), url), "…"]), 1);
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function(event) {
					if (this.readyState == 4) {
						if (this.status == 200) {
							var res = document.createElement("html"); res.innerHTML = this.responseText;
							var nextPage = res.querySelector(css_nextPage);
							var mates = getStuffs(checkAgainst, res);
							for (var m = 0; m < mates.length; m++) {
								if (stuff[checkAgainst].rawids.indexOf(mates[m].getAttribute("href").match(new RegExp(strMBID))) > -1) {
									modal(true, createTag("span", {s: {color: "grey"}}, ["still used by ", createA(mates[m].textContent, mates[m].getAttribute("href"), checkAgainst), ": keeping."]), 1);
									retry = 0;
									setTimeout(function() { stuffRemover(checks.slice(1)); }, chrono(MBWSRate));
									return;
								}
							}
							if (nextPage) {
								if (p == 1) { modal(true, createTag("span", {s: {color: "grey"}}, "(several pages but this check will stop as soon as it finds something)"), 1); }
								retry = 0;
								setTimeout(function() { stuffRemover(checks, p + 1); }, chrono(MBWSRate));
							} else {
								modal(true, concat([createTag("span", {s: {color: "grey"}}, "not used any more: "), createTag("b", {}, "removing"), "…"]), 1);
								stuff[checkType].rawids = stuff[checkType].rawids.replace(new RegExp(checkID + "( |$)"), "");
								GM_setValue(checkType + "s", stuff[checkType].rawids);
								altered = true;
								retry = 0;
								setTimeout(function() { stuffRemover(checks.slice(1)); }, chrono(MBWSRate));
							}
						} else {
							if (retry++ < maxRetry) {
								MBWSRate += slowDownStepAfterRetry;
								debugRetry(this.status);
								setTimeout(function() { stuffRemover(checks, p); }, chrono(retryPause));
							} else {
								end(false, "Too many (" + maxRetry + ") errors (last " + this.status + " while checking stuff to remove).");
							}
						}
					}/*4*/
				};
				debug(MBS + url);
				chrono();
				xhr.open("GET", MBS + url, true);
				xhr.send(null);
			} else {
				if (!stuff[checkAgainst].rawids) {/* Protection for some edge cases of new script using old script data */
					modal(true, concat([createTag("span", {s: {color: "grey"}}, ["no ", checkAgainst, "s at all (", createA("//github.com/jesus2099/konami-command/issues/87", "#87"), "): "]), "removing…"]), 1);
					stuff[checkType].rawids = stuff[checkType].rawids.replace(new RegExp(checkID + "( |$)"), "");
					GM_setValue(checkType + "s", stuff[checkType].rawids);
					altered = true;
				}
				retry = 0;
				setTimeout(function() { stuffRemover(checks.slice(1)); }, chrono(MBWSRate));
			}
		}
	} else {
		setTitle(false);
		if (altered) { lastLink(); } else { modal(false); }
	}
}
// ############################################################################
// #                                                                          #
// #                           ACCESSORY DISPLAY FUNCTIONS                    #
// #                                                                          #
// ############################################################################
function setTitle(ldng, pc) {
	var old = document.title.match(/ :: (.+)$/);
	old = old ? old[1] : document.title;
	if (ldng) {
		document.title = (pc ? pc + "%" : "⌛") + " Altering highlighter content… :: " + old;
	} else {
		document.title = old;
	}
}
function end(ok, msg) {
	setTitle(false);
	if (debugBuffer != "") { debug(""); }
	if (ok) {
		modal(true, concat(["<br>", "<hr>", "Collection succesfully loaded in highlighter.", "<br>", "You may now enjoy this stuff highlighted in various appropriate places. YAY(^o^;)Y", "<br>"]), 1);
	} else {
		modal(true, msg, 1).style.setProperty("background-color", "pink");
		alert(dialogprefix + msg);
		modal(true, concat(["You may ", createA("have a look at known issues and/or create a new bug report", meta.supportURL), " or just ", createA("reload this page", function(event) { self.location.reload(); }), "."]), 1);
	}
	closeButt();
}
function closeButt() {
	modal(true, concat(["☞ You can now review these cute logs, or ", createA("close", function(event) { modal(false); }, "this will close this cute little window"), " them. ஜ۩۞۩ஜ"]), 1);
	document.getElementById(prefix + "Modal").previousSibling.addEventListener("click", function(event) {
		if (gaugeto) { clearTimeout(gaugeto); gaugeto = null; }
		this.parentNode.removeChild(this.nextSibling);
		this.parentNode.removeChild(this);
	}, false);
}
var gaugeto;
function modal(show, txt, brs, gauge) {
	var obj = document.getElementById(prefix + "Modal");
	if (show && !obj) {
		coolstuff("div", "50", "100%", "100%", "black", ".6");
		obj = coolstuff("div", "55", "600px", "50%", "white");
		obj.setAttribute("id", prefix + "Modal");
		obj.style.setProperty("padding", "4px");
		obj.style.setProperty("overflow", "auto");
		obj.style.setProperty("white-space", "nowrap");
		obj.style.setProperty("border", "4px solid black");
		obj.addEventListener("mouseover", function(event) { this.style.setProperty("border-color", "silver"); }, false);
		obj.addEventListener("mouseout", function(event) { this.style.setProperty("border-color", "black"); }, false);
		var gaug = obj.appendChild(document.createElement("div"));
		gaug.style.setProperty("position", "fixed");
		gaug.style.setProperty("left", 0);
		gaug.style.setProperty("bottom", 0);
		gaug.style.setProperty("width", 0);
		gaug.style.setProperty("background", "black");
		gaug.appendChild(document.createTextNode("\u00a0"));
		gaug = gaug.appendChild(document.createElement("div"));
		gaug.style.setProperty("position", "fixed");
		gaug.style.setProperty("left", 0);
		gaug.style.setProperty("bottom", 0);
		gaug.style.setProperty("width", "100%");
		gaug.style.setProperty("text-align", "center");
		gaug.style.setProperty("color", "white");
		gaug.style.setProperty("text-shadow", "1px 2px 2px black");
		gaug.appendChild(document.createTextNode("\u00a0"));
	}
	if (show && obj && txt) {
		if (gauge) {
			var pc = Math.floor(100 * gauge[0] / gauge[1]);
			if (pc) {
				var gau = obj.firstChild;
				if (gaugeto || gau.style.getPropertyValue("display") == "none") {
					clearTimeout(gaugeto);
					gaugeto = null;
					gau.style.setProperty("display", "block");
				}
				gau.style.setProperty("width", Math.ceil(self.innerWidth * gauge[0] / gauge[1]) + "px");
				gau.lastChild.replaceChild(document.createTextNode(gauge[0] + "/" + gauge[1] + " (" + pc + "%) approx. remaining " + sInt2msStr(Math.ceil((gauge[1] - gauge[0]) * MBWSRate / 1000))), gau.lastChild.firstChild);
				setTitle(true, pc);
				if (gauge[0] >= gauge[1]) {
					gaugeto = setTimeout(function() {
						if (obj = document.getElementById(prefix + "Modal")) {
							obj.firstChild.style.setProperty("display", "none");
						}
					}, 4000);
				}
			}
		}
		var br = 0;
		if (brs && brs > 0) { br = brs; }
		obj.appendChild(typeof txt == "string" ? document.createTextNode(txt) : txt);
		for (var ibr = 0; ibr < br; ibr++) {
			obj.appendChild(document.createElement("br"));
		}
		if (obj.style.getPropertyValue("border-color") == "black") {
			obj.scrollTop = obj.scrollHeight;
		}
	}
	if (!show && obj) {
		obj.parentNode.removeChild(obj.previousSibling);
		obj.parentNode.removeChild(obj);
	}
	return obj;
	function coolstuff(t, z, x, y, b, o, a) {
		var truc = document.body.appendChild(document.createElement(t));
		truc.style.setProperty("position", "fixed");
		truc.style.setProperty("z-index", z);
		truc.style.setProperty("width", x);
		var xx = x.match(/^([0-9]+)(px|%)$/);
		if (xx) {
			truc.style.setProperty("left", ((xx[2] == "%" ? 100 : self.innerWidth) - xx[1]) / 2 + xx[2]);
		}
		truc.style.setProperty("height", y);
		var yy = y.match(/^([0-9]+)(px|%)$/);
		if (yy) {
			truc.style.setProperty("top", ((yy[2] == "%" ? 100 : self.innerHeight) - yy[1]) / 2 + yy[2]);
		}
		if (b) { truc.style.setProperty("background", b); }
		if (o) { truc.style.setProperty("opacity", o); }
		return truc;
	}
}
// ############################################################################
// #                                                                          #
// #                           ACCESSORY TECHNICAL FUNCTIONS                  #
// #                                                                          #
// ############################################################################
function cantUseWS(button) {
	var privacy;
	if (typeof opera != "undefined" && (privacy = getParent(button, "tr")) && privacy.textContent.match(/\n\s*Private\s*\n/)) {
		return true;
	} else {
		return false;
	}
}
function lastLink(href) {
	if (href) {
		GM_setValue("lastlink", href);
	} else {
		var ll = GM_getValue("lastlink");
		if (ll) {
			GM_deleteValue("lastlink");
			modal(true, "Re‐loading page…", 1);
			setTimeout(function() { self.location.href = ll; }, chrono(MBWSRate));
		} else {
			modal(true, " ", 1);
			end(false, "Sorry, I’m lost. I don’t know what was the link you last clicked.");
		}
	}
}
function setTitle(ldng, pc) {
	var old = document.title.match(/ :: (.+)$/);
	old = old ? old[1] : document.title;
	if (ldng) {
		document.title = (pc ? pc + "%" : "⌛") + " Altering highlighter content… :: " + old;
	} else {
		document.title = old;
	}
}
function createA(text, link, title, stay) {
	var a = document.createElement("a");
	a.appendChild(document.createTextNode(text));
	if (link && typeof link == "string") {
		a.setAttribute("href", link);
		if (!stay) {
			a.setAttribute("target", "_blank");
		}
	} else {
		if (link && typeof link == "function") {
			a.addEventListener("click", link, false);
		}
		a.style.setProperty("cursor", "pointer");
	}
	if (title){ a.setAttribute("title", title); }
	return a;
}
function concat(tstuff) {
	var concats = document.createDocumentFragment();
	var stuff = tstuff;
	if (typeof stuff != "object" || !stuff.length) {
		stuff = [stuff];
	}
	for (var thisStuff = 0; thisStuff < stuff.length; thisStuff++) {
		var ccat = stuff[thisStuff];
		if (typeof ccat == "string") {
			var ccatr = ccat.match(/^<(.+)>$/);
			if (ccatr) { ccat = document.createElement(ccatr[1]); }
			else { ccat = document.createTextNode(ccat); }
		}
		concats.appendChild(ccat);
	}
	return concats;
}
var lastchrono;
function chrono(delay) {
	if (delay) {
		var del = delay + lastchrono - new Date().getTime();
		del = del > 0 ? del : 0;
		return del;
	} else {
		lastchrono = new Date().getTime();
		return lastchrono;
	}
}
function sInt2msStr(seconds) {
	var s = seconds;
	var div = s % (60 * 60);
	var h = Math.floor(s / (60 * 60));
	var m = Math.floor(div / 60);
	    s = Math.ceil(div % 60);
	return ( (h > 0 ? h + ":" : "") + (m > 9 ? m : "0" + m) + ":" + (s > 9 ? s : "0" + s) );
}
function debug(txt, buffer) {
	if (DEBUG) {
		if (buffer) {
			debugBuffer += txt + "\r\n";
		} else {
			console.log(prefix + "\r\n" + debugBuffer + txt);
			debugBuffer = "";
		}
	}
}
function debugRetry(status) {
	debug("Error " + status + "\r\nRetrying (" + retry + "/" + maxRetry + ") in " + retryPause + " ms\r\nSlowing down, new rate: " + (MBWSRate - slowDownStepAfterRetry) + "+" + slowDownStepAfterRetry + " = " + MBWSRate + " ms");
}
function nsr(prefix) {
	var ns = {
		xhtml: "http://www.w3.org/1999/xhtml",
		mb: "http://musicbrainz.org/ns/mmd-2.0#",
	};
	return ns[prefix] || null;
}
