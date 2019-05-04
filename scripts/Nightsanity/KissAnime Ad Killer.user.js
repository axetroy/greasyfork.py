// ==UserScript==
// @name          KissAnime Ad Killer
// @namespace     http://userstyles.org
// @description	  Hides Ads from kissanime.com layout
// @author        Nightsanity
// @homepage      https://userstyles.org/styles/118205
// @run-at        document-start
// @version       0.20151112141707
// ==/UserScript==
(function() {var css = "";
if (false || (new RegExp("^http:\\/\\/kissanime\\.(com|to)\\/[Aa][Nn][Ii][Mm][Ee]\\/[_\\-a-zA-Z0-9]+\\/[_\\-a-zA-Z0-9]+(\\?id=[0-9]+)?$")).test(document.location.href))
	css += [
		"iframe[id^=\"adsIfrme\"], #divFloatRight, .divCloseBut, div[class^=\"clear\"] {",
		"    height: 0px !important;",
		"    position: relative !important;",
		"    overflow: hidden !important;",
		"}",
		"div#adsIfrme > div.barContent > div:nth-child(1) > div[style^=\"border-color: #4e4e4e\"] { display: none !important; }",
		"body > div#containerRoot div[id^=\"adp_position_AD_\"]{ height:0px !important; }",
		"body > div#containerRoot img[id^=\"adCheck\"]{ height:0px !important; position: absolute !important; } ",
		"#selectPlayer {",
		"    width: 76px !important;",
		"}",
		"#selectEpisode {",
		"    width: 104px !important;",
		"}",
		"div#adsIfrme.bigBarContainer > div.barContent > div > div[style^=\"font\"] > div#switch {",
		"    float: initial !important;",
		"    width: initial !important;",
		"    text-align: initial !important;",
		"    cursor: initial !important;",
		"    display: inline-block !important;",
		"    font-size: 0px !important;",
		"    position: relative !important;",
		"    margin: -19px 0px 3px 115px !important;",
		"}",
		"div#adsIfrme.bigBarContainer > div.barContent > div > div[style^=\"font\"] > div:nth-child(1) {",
		"    position: relative !important;",
		"    float: initial !important;",
		"    width: 400px !important;",
		"    text-align: initial !important;",
		"    margin: 0px 0px 0px 0px !important;",
		"}",
		"div#adsIfrme.bigBarContainer > div.barContent > div > div:nth-child(1) {",
		"    padding: 0px !important;",
		"    margin: 23px 75px 0px 56px !important;",
		"    position: absolute;",
		"    float: right !important;",
		"    display: inline-block !important;",
		"    width: 400px !important;",
		"}"
	].join("\n");
if (false || (location.href.replace(location.hash,'') == "http://kissanime.to/") || (location.href.replace(location.hash,'') == "http://kissanime.to/AnimeList") || (location.href.replace(location.hash,'') == "http://kissanime.to/AnimeList/LatestUpdate") || (location.href.replace(location.hash,'') == "http://kissanime.to/AnimeList/Newest") || (location.href.replace(location.hash,'') == "http://kissanime.to/UpcomingAnime/") || (location.href.replace(location.hash,'') == "http://kissanime.to/AnimeList/MostPopular") || (location.href.replace(location.hash,'') == "http://kissanime.to/Status/Ongoing") || (location.href.replace(location.hash,'') == "http://kissanime.to/Status/Completed") || (document.location.href.indexOf("http://kissanime.to/AnimeList?c=") == 0) || (document.location.href.indexOf("http://kissanime.to/Genre/") == 0) || (document.location.href.indexOf("http://kissanime.to/Search/") == 0) || (new RegExp("^http:\\/\\/kissanime\\.(com|to)\\/[Aa][Nn][Ii][Mm][Ee]\\/[_\\-a-zA-Z0-9]+$")).test(document.location.href))
	css += [
		"#divFloatLeft, #divFloatRight, #divAds, #divAds2, #adnemo_gs, iframe[id^=\"adsIfrme\"] {",
		"	display: none !important;",
		"}",
		".GoogleActiveViewClass, .imageholder.a, .divCloseBut, .mgbox {",
		"	display: none !important;",
		"}"
	].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
