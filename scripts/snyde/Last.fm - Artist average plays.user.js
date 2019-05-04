// ==UserScript==
// @name Last.fm - Artist average plays
// @namespace
// @description Determines the average plays per listener. Suggested by meninc
// @include http://www.last.fm/music/*
// @version 0.0.1.20140511223508
// @namespace https://greasyfork.org/users/835
// ==/UserScript==

(function () {
var editBlock = xpath('//div[contains(@class,"artist-listening-trend")]/div[contains(@class,"catalogue-scrobble-graph")]');
if (editBlock.snapshotLength < 1){
	editBlock = xpath('//section[contains(@class,"album-listening-trend")]/div[contains(@class,"catalogue-scrobble-graph")]');
	if (editBlock.snapshotLength < 1){ return; }
}
var theNodes = editBlock.snapshotItem(0).childNodes;
var plays = 0; var listeners = 0; var avePlays = 0; var addHere = -1;
for (var i=0; i<theNodes.length; i++) {
	if (theNodes[i].nodeName.match(/DIV/i)) {
		if (theNodes[i].innerHTML.match(/scrobble[s]* all time/i)) {
			plays = theNodes[i].innerHTML.match(/<strong>([\,0-9]*)<\/strong>/)[1];
			plays = plays.replace(/,/g,'');
			addHere = i;
		}
		if (theNodes[i].innerHTML.match(/listener[s]* all time/i)) {
			listeners = theNodes[i].innerHTML.match(/<strong>([\,0-9]*)<\/strong>/)[1];
			listeners = listeners.replace(/,/g,'');
		}
	}
}

if (listeners != 0) {
	avePlays = plays/listeners; avePlays = commatize(avePlays.toFixed(2));
}
if (addHere != -1) {
	var aveDIV = document.createElement("DIV");
	aveDIV.setAttribute("class","catalogue-scrobble-graph-top-data");
	aveDIV.innerHTML =  '<strong>'+avePlays+'</strong><span class="lite">average</span>';
        editBlock.snapshotItem(0).insertBefore(aveDIV, theNodes[addHere].nextSibling);
} else {
	var newLine = '>scrobbles all time</span></div><div class="catalogue-scrobble-graph-top-data"><strong>'+avePlays+'</strong><span class="lite">average<';
	editBlock.snapshotItem(0).innerHTML = editBlock.snapshotItem(0).innerHTML.replace(/>scrobbles all time</,newLine);
}
}) ();
function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function commatize(number) {
	var numdp = number.split(".");
	if (numdp.length == 2) {
		var decimal = numdp[1];
	}
	var integer = numdp[0];
	if (integer.length < 4) {
		return(number);
	}
	var stubFrnt = integer.length % 3;
	if (stubFrnt == 0) {stubFrnt = 3;}
	var newnumber = integer.substr(0,stubFrnt);
	var oldPos = stubFrnt;
	while(oldPos < integer.length ) {
		newnumber = newnumber + "," + integer.substr(oldPos, 3);
		oldPos = oldPos + 3;
	}
	if (numdp.length == 2) {
		newnumber = newnumber + "." + decimal;
	}
	return(newnumber);
}