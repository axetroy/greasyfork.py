// ==UserScript==
// @name           MyAnimeList(MAL) - Recommendations direct link
// @version        1.0.5
// @description    When you click on a recommendation picture in a anime/manga page, you go directly to the anime/manga and not the recommendation page.
// @author         Cpt_mathix
// @include        /^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+\/?/
// @include        *://myanimelist.net/(anime|manga).php?id=*
// @exclude        /^https?:\/\/myanimelist\.net\/(anime|manga)\/[^0-9]+/
// @exclude        /^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+\/.+\/.+/
// @grant          none
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

var href = document.location.href;
var type = 'anime';
if (/^https?:\/\/myanimelist\.net\/manga*/.test(href))
	type = 'manga';

var allElements;
allElements = document.evaluate(
    '//*[@id="' + type + '_recommendation"]/div[3]/ul/li[*]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allElements.snapshotLength; i++) {
    var linkEl = allElements.snapshotItem(i).firstChild;
    var href = linkEl.href;
    var id = href.match(/\d+/g);
    var self = document.location.href.match(/\d+/g)[0];
    linkEl.href = href.replace(self,'').replace('-','').replace('\/recommendations','');
}