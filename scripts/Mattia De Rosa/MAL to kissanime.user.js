// ==UserScript==
// @name         MAL to kissanime
// @namespace    https://greasyfork.org/en/users/141256-mattia-de-rosa
// @version      3.9
// @description  Adds kissanime streaming links to MAL
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wQRDic4ysC1kQAAA+lJREFUWMPtlk1sVFUUx3/n3vvmvU6nnXbESkTCR9DYCCQSFqQiMdEY4zeJuiBhwUISAyaIHzHGaDTxKyzEr6ULNboiRonRhQrRCMhGiDFGA+WjhQ4NVKbtzJuP9969Lt4wlGnBxk03vZv3cu495/7u/5x7cmX1xk8dczjUXG4+DzAPMA8AYNoNIunXudnZ2+enrvkvn2kADkhiiwM8o6YEEuLE4pxDK0GakZUIoiCOHXFiW2uNEqyjZdNaIbMB0Ero7gwQ4OJEDa0VSoR6lNDT5eMZRaUa0YgSjFZU6zG1ekK+y6er00eJECWWchiRMYp8VwBAOYyw1l0dQIlQrcfcvKSHT968j+5chg+/OMoHnx9FCdwzsIRdz24gGxhe2v0Le74/htaKFYvzbNm4knWrF3J9IYtSQq0e8+C2r+jwDXvefYjEWja98B2DQyU6fINty8cVCigl9HYHiMCOzWs4/HuR4XNl3n5mPbmsB0DgGyYrDR69ewXvvXgXgW+oNxLOX6ySJJaebp/+ZQWOD5fIZT2cS5WddRGCw9oU5rVtA1SqEfmcTxRZPE8RxZbe7oBXnlpH4BtGx0Ke2PkNt624jte3DzBWqjF4ZhzP6GYBOtw1qtC07Y2I0IgTisUKtyztBaB4voLWQl8hS1iLuL2/j0V9OQC+/fkkx4ZK3L9hGQt6Oyj0BCiR1qZpwV5dgRn7gBLh1Y8OcmpkAoDndv3E6IUQgCRx9BWy6b91bH64n7P7tvL8lrU4l/pOi6dSRZWSaShmJgDPKIbPTfLy+wdYfEMXB46M0JXLNE8ElWoEQK0e8/fJi8SJpa+QZemi7hmiOSphxESlQRRb/IzGKMHNBOCaJwTI53wOHhnBM5pCPqDRSFIHrTh1drzls/2Nffx18h+efGwV7+y8kyi2l+O5VKW1KxeycEEn2Q6PPwfHKE3WMVpwrg1AAK1TkaxzBBlDEGiSxLXsgW84cWacE2fGWX5TnnsHlnB8qEQ2SG+J1qnM0lTLaMVbO+5AJL2ijzy9l7FSDaMV4FIAh0MpoRxGfL1vECRtHiK0Gsj+w8OcHpmkeKFCWIv54dAQWx9fxfo1N/Lxl38wVJzgx1+HCGsx1XoMwN79gy1VfU9zujjB2dFJfE9dLtKpb0JrHeUwzW8u66Gm3N9yGJEkls6sR5I4+pcX2PTArez+7DcmK+lcWIsRgc5mzyhXoivSq5W0+klL9fZH6SWpL9VCy64ERLDW4lyaorAaE2Q0xihE0kqnmfepsaZSJPYanXCmjVt265rnaAKJkM9lsM7hXLPg2nyvFuuaALMdjumn+T9jzh8k8wDzAPMAcw7wLz7iq04ifbsDAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA0LTE3VDE0OjM5OjU2LTA0OjAw6I0f5AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNC0xN1QxNDozOTo1Ni0wNDowMJnQp1gAAAAASUVORK5CYII=
// @author       mattiadr96@gmail.com
// @run-at       document-idle
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match        https://myanimelist.net/animelist/*
// @match        https://myanimelist.net/ownlist/anime/*/edit*
// @match        https://myanimelist.net/editlist.php?type=anime&id=*
// @match        https://myanimelist.net/panel.php?go=add&selected_series_id=*
// @match        http://kissanime.ru/
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        window.close
// ==/UserScript==

const kiss = "http://kissanime.ru/";
const kissanime = kiss + "Anime/";
const kisssearch = kiss + "Search/Anime/";
const server = "&s=alpha";

const epsBlacklist = [
	"Macross/Bunny_Hat-Macross_Special_-4208D135?id=73054",
	"Macross/Bunny_Hat_Raw-30th_Anniversary_Special_-0A1CD40E?id=73055",
	"Macross/Episode-011-original?id=35423"
];

(function($) {
	"use strict";
	if (window.location.href == kiss) {
		page_kiss();
	} else if (window.location.href.indexOf("https://myanimelist.net/animelist/") != -1) {
		page_list();
	} else {
		page_edit();
	}
})(jQuery);

function load_cf_cookies(callback, arg1, arg2) {
	if (!GM_getValue("KAloadcookies", false)) {
		GM_setValue("KAloadcookies", true);
		GM_openInTab(kiss, true);
	}
	if (callback) {
		setTimeout(function() {
			callback(arg1, arg2);
		}, 6000);
	}
}

///////////////
// KISS PAGE //
///////////////
function page_kiss() {
	if (GM_getValue("KAloadcookies", false) && document.title != "Please wait 5 seconds...") {
		GM_setValue("KAloadcookies", false);
		window.close();
	}
}

///////////////
// LIST PAGE //
///////////////
function page_list() {
	// discontinued
	let disc = $("<div>MAL to Kissanime has been discontinued in favor of a newer version that supports multiple streaming websites.<br>Get the newer script from <a href='https://github.com/mattiadr/MALstreaming'>here</a>.</div>");
	disc.css("width", "100%");
	disc.css("background-color", "#ff4d4d");
	disc.css("font-size", "150%");
	disc.css("text-align", "center");
	$("#list-container > div.list-block > div").prepend(disc);

	// own list
	if ($(".header-menu.other").length !== 0) return;
	// watching page
	if ($(".list-unit.watching").length !== 1) return;

	// load cf cookies if needed
	GM_xmlhttpRequest({
		method: "GET",
		url: kiss,
		onload: function(page) {
			if (page.status == 503) {
				load_cf_cookies(function() {
					$(".header-title.stream").trigger("click");
				});
			}
		}
	});

	// force hide more-info
	const sheet = document.createElement("style");
	sheet.innerHTML =`
		.list-table .more-info {
			display: none!important;
		}`;
	document.body.appendChild(sheet);

	// expand more-info
	$(".more > a").each(function(i, v) {
		v.click();
	});

	// wait
	setTimeout(function() {
		// collapse more-info
		$(".more-info").css("display", "none");
		// remove sheet
		document.body.removeChild(sheet);
		// load links
		$(".header-title.stream").trigger("click");
	}, 1000);

	// add col to table
	$("#list-container").find("th.header-title.title").after("<th class='header-title stream'>Watch</th>");
	$(".list-item").each(function(i) {
		$(this).find(".data.title").after("<td class='data stream'></td>");
	});

	// style
	$(".data.stream").css("font-weight", "normal");
	$(".data.stream").css("line-height", "1.5em");
	$(".header-title.stream").css("min-width", "90px");

	// event listeners
	$(".header-title.stream").on("click", function() {
		$(".data.stream").each(function() {
			$(this).trigger("click");
		});
	});

	$(".icon-add-episode").on("click", function() {
		const listitem = $(this).parents(".list-item"); // current row
		const fullURL = add_eplist(listitem);
		if (fullURL) {
			add_nextep(listitem, fullURL, false);
		}
	});
	
	/*
	$(".data.progress").find("span").first().on("DOMSubtreeModified", function() {
		if ($(this).has("a").length() > 0) {
			const listitem = $(this).parents(".list-item"); // current row
			const fullURL = add_eplist(listitem);
			if (fullURL) {
				add_nextep(listitem, fullURL, false);
			}
		}
	});
	*/

	$(".data.stream").on("click", function() {
		const listitem = $(this).parents(".list-item"); // current row
		const fullURL = add_eplist(listitem);
		if (fullURL) {
			add_nextep(listitem, fullURL, true);
		}
	});

	// trigger timer
	setInterval(function() {
		$(".nextep").trigger("update-time");
	}, 1000);
}

function add_eplist(listitem) {
	const url = listitem.find(".td1.borderRBL").html().match(/\S+(?=&nbsp;)/g);
	if (url) {
		const fullURL = kissanime + url[0];
		if (listitem.find(".eplist").length === 0) {
			listitem.find(".data.stream").append("<a class='eplist' target='_blank' href='" + fullURL + "'>Ep. list</a>");
		}
		return fullURL;
	} else {
		if (listitem.find(".eplist").length === 0) {
			listitem.find(".data.stream").append("<div class='eplist'>No Link</div>");
		}
		return false;
	}
}

function add_nextep(listitem, fullURL, force_refresh) {
	if (!force_refresh && listitem.find(".nextep").data("episodeList")) {
		// episodes alredy loaded
		nextep_data(listitem, listitem.find(".nextep"));
	} else {
		// not yet loaded
		GM_xmlhttpRequest({
			method: "GET",
			url: fullURL,
			onload: function(resp) {
				listitem.find(".nextep").remove();
				if (resp.status == 503) {
					// loading CF cookies
					if (listitem.find(".KAloading").length === 0) {
						listitem.find(".data.stream").prepend("<a class='KAloading' target='_blank' href='" + kiss + "' style='color: red'>Loading CF<br>Cookies<br></a>");
					}
					load_cf_cookies(add_nextep, listitem, fullURL, true);
				} else if (resp.status == 200) {
					// OK
					listitem.find(".KAloading").remove();
					nextep_OK(listitem, resp);
				}
			}
		});
	}
}

function isEpBlacklisted(href) {
	return epsBlacklist.indexOf(href.split("/Anime/")[1]) != -1;
}

function nextep_OK(listitem, resp) {
	const page = $(resp.response);
	const regexWhitelist = /episode|movie|special|OVA/i; // regex test must be true to consider episode valid
	const regexBlacklist = /\b_[a-z]+|recap|\.5/i; // regex test must be false to consider episode valid
	const regexCountdown = /\d+(?=\), function)/g; // regex used to get the time in milliseconds before next episode

	let episodes = page.find(".listing").find("tr > td > a"); // list of all available episodes
	let nextep = $("<div class='nextep'></div>");
	nextep.data("kaTitle", page.find("#leftside > div:nth-child(1) > div.barContent > div:nth-child(2) > a").text());

	// filtering episodes based on whitelist and blacklist
	// basically all recaps OPs EDs get removed
	for (var i = 0; i < episodes.length; i++) {
		if (!regexWhitelist.test(episodes[i].text) || regexBlacklist.test(episodes[i].text) || isEpBlacklisted(episodes[i].href)){
			episodes.splice(i--, 1);
		}
	}

	// get the time until next ep
	let timeMillis = parseInt(regexCountdown.exec(resp.responseText));
	nextep.data("timeMillis", timeMillis);
	// event to update timer
	nextep.on("update-time", update_time);
	// add episodes to data
	nextep.data("episodeList", episodes);

	nextep_data(listitem, nextep);
}

function nextep_data(listitem, nextep) {
	nextep.empty();
	// get episodes from data
	let episodes = nextep.data("episodeList");
	let kaTitle = nextep.data("kaTitle");

	let currEp = parseInt(listitem.find(".data.progress").find(".link").text());
	if (isNaN(currEp)) currEp = 0;

	if (episodes.length > currEp) {
		// there are episodes available
		let t = episodes[episodes.length - currEp - 1].text.split(kaTitle)[1].replace(/ 0+(?=\d+)/, " "); // the regex is used to remove leading 0s

		let isAiring = listitem.find("span.content-status:contains('Airing')").length !== 0;
		let a = $("<a></a>");
		a.text(t.length > 13 ? t.substr(0, 12) + "&hellip;" : t);
		if (t.length > 13) a.attr("title", t);
		a.attr("href", kissanime + episodes[episodes.length - currEp - 1].href.split("/Anime/")[1] + server);
		a.attr("target", "_blank");
		a.attr("class", isAiring ? "airing" : "non-airing");
		a.css("color", isAiring ? "#2db039" : "#ff730a");
		nextep.append(a);

		if (episodes.length - currEp > 1) {
			// if there is more than 1 new ep then put the amount in parenthesis
			nextep.append(" (" + (episodes.length - currEp) + ")");
		}
	} else if (currEp > episodes.length) {
		// user has watched too many episodes
		nextep.append($("<div class='.epcount-error'>Ep. count Error</div>").css("color", "red"));
	}

	listitem.find(".data.stream").prepend(nextep);
	nextep.trigger("update-time");
}

function update_time() {
	let timeMillis = $(this).data("timeMillis");
	let time;
	if (isNaN(timeMillis)) {
		time = "Not Yet Aired";
	} else {
		const d = Math.floor(timeMillis / (1000 * 60 * 60 * 24));
		const h = Math.floor((timeMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const m = Math.floor((timeMillis % (1000 * 60 * 60)) / (1000 * 60));
		time = (h < 10 ? "0"+h : h) + "h:" + (m < 10 ? "0" + m : m) + "m";
		if (d > 0) {
			time = d + (d == 1 ? " day " : " days ") + time;
		}
	}
	if ($(this).children().length !== 0) {
		// nextep exists
		if (time != "Not Yet Aired") {
			$(this).next().attr("title", time);
		}
	} else {
		// no nextep
		$(this).html(time);
	}
	$(this).data("timeMillis", timeMillis - 1000);
	if (timeMillis < 1000) {
		$(this).trigger("click");
	}
}

///////////////
// EDIT PAGE //
///////////////
function page_edit() {
	const title = $("#main-form > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(2) > strong > a")[0].text;

	$("#add_anime_comments").after("<div id='kissAnimeLinks' style='width: 420px'><b style='font-size: 110%; line-height: 180%;'>KissAnime Links</b><br><div id='searching'>Searching...</div></div>");

	request_search(title);
}

function request_search(title) {
	GM_xmlhttpRequest({
		method: "POST",
		data: "type=Anime" + "&keyword=" + title.slice(0, -1), // For some reason searching for an exact match sometimes does't work (ex: 'Shokugeki no Souma: San no Sara'). This fixes it
		url: kisssearch,
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		onload: function(resp) {
			if (resp.status == 503) {
				// no CF cookies
				load_cf_cookies(request_search, title);
			} else if (resp.status == 200) {
				// OK
				search_OK(resp, title);
			}
		}
	});
}

function search_OK(resp, title) {
	const results = {};
	// if there is only one result, kissanime redirects to the only result page
	if (resp.finalUrl.indexOf(kisssearch) == -1) {
		// only one result
		results[title] = resp.finalUrl.split("/")[4];
	} else {
		// multiple results
		const list = $(resp.response).find("#leftside > div > div.barContent > div:nth-child(2) > table > tbody > tr").slice(2);
		list.each(function () {
			var a = $(this).find("a")[0];
			results[a.text.replace(/\n\s+/, "")] = a.pathname.split("/")[2]; // regex is used to remove leading whitespace
		});
	}

	$("#searching").remove();

	if (Object.keys(results).length === 0) {
		// no results
		$("#kissAnimeLinks").append("<div>No results. <a target='_blank' href='" + kiss + "'>Manual Search</a></div>");
	}

	for (var key in results) {
		var a = $("<a href='#'>Select</a>"); // anchor with listener to set the url in comments
		a.data("animeLink", results[key]);
		a.on("click", function () {
			var link = $(this).data("animeLink");
			$("#add_anime_comments").val(link);
			// $("#dialog > tbody > tr > td > div.mt8.mb8 > input").trigger("click"); // click on submit
			return false;
		});
		$("#kissAnimeLinks").append("(").append(a).append(") ").append("<a target='_blank' href='" + kissanime + results[key] + "'>" + key + "</a>").append("<br>"); // append "Select" and actual url
	}
}