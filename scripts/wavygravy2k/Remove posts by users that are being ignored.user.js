// ==UserScript==

// @name        Remove posts by users that are being ignored
// @namespace   baseballsimulator.com
// @include     http://forum.onlinegames.strat-o-matic.com*
// @version     1
// @description Completely removes posts made by users that are on your 'foes' list.
// @grant       GM_log
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var foe;
var foes = document.evaluate("//div[@class='post-wrapper bg1']|//div[@class='post-wrapper bg2']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < foes.snapshotLength; i++) {

	foe = foes.snapshotItem(i);

	if(foe.innerHTML.indexOf('class="error"') != -1){

		foe.parentNode.removeChild(foe);

	}

