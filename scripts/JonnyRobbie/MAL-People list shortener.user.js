// ==UserScript==
// @name           MAL-People list shortener
// @version        1.0
// @namespace      https://greasyfork.org/users/98-jonnyrobbie
// @author         JonnyRobbie
// @description    Shortens the 'Anime Staff Positions' list on MAL people pages
// @include        http://myanimelist.net/people/*
// @run-at         document-end
// ==/UserScript==

function main() {
	console.log("MAL shortener");
	var tempElem = document.getElementById("content").getElementsByClassName("normal_header");
	var aspTable;
	var aName = "";
	console.log("normal_header count: " + tempElem.length);
	console.log(tempElem[1].textContent);
	for (var i=0; i<tempElem.length; i++) {
		if (tempElem[i].textContent == "Add PositionAnime Staff Positions") {
			aspTable = tempElem[i].nextSibling.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
		}
	}
	var aspLength = aspTable.length;
	for (var i=0; i<aspLength; i++) {
		if (aspTable[i].getElementsByClassName("borderClass")[1].getElementsByTagName("a")[0].textContent == aName) {
			//aspTable[i].getElementsByClassName("spaceit_pad")[0].getElementsByTagName("small")[0].innerHTML = ", " aspTable[i].getElementsByClassName("spaceit_pad")[0].getElementsByTagName("small")[0].innerHTML;
			var aspSmall = aspTable[i].getElementsByClassName("spaceit_pad")[0].getElementsByTagName("small")[0];
			aspSmall.innerHTML = ", " + aspSmall.innerHTML;
			aspTable[i-1].getElementsByClassName("spaceit_pad")[0].appendChild(aspSmall);
			aspTable[i].parentNode.removeChild(aspTable[i]);
			aspLength--;
			i--;
			
		} else {
			aName = aspTable[i].getElementsByClassName("borderClass")[1].getElementsByTagName("a")[0].textContent
		}
	}
	sheet.insertRule(".spaceit_pad small {margin-right: 4px !important;}", sheet.cssRules.length);
}

main();