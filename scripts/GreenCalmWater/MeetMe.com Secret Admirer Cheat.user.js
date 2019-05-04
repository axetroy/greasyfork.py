// ==UserScript==
// @name           MeetMe.com Secret Admirer Cheat
// @namespace      http://www.idolpx.com/greasemonkey
// @description    Highlights your secret admirer so you don't have to guess.
// @include        http://*match.meetme.com/board*
// @version        1.0
// ==/UserScript==
//
// Date: 	2008.06.07
// Author:	jaime
// Email:	jaime(at)idolpx.com
//
// Date: 	2011.09.15
// URL updated by Lee Terry. Thanks Lee!  :)
//
// Date: 	2012.06.04
// URL updated to match new domain
// 
// Date: 	2014.09.08
// Uploaded by GreenCalmWater to greasyfork.org sense no one else either has it or added it and Userscripts.org is down/gone.
// Also removed (Formerly MyYearBook.com) from header sense its been some time sense it was MyYearbook.

var bActive = false;

window.addEventListener("load", findMatch, false);
window.addEventListener("DOMNodeInserted", findMatch, false);
try {
	window.addEventListener("DOMSubtreeModified", findMatch, false);
} catch(e) {}

function findMatch(e) {
	if (bActive) return;

	bActive = true;
	var mm = document.getElementById("matchBoard");
	if(mm) {
		matchBoard = mm.getAttribute("class");
		images = document.getElementsByTagName("img");
		for (i = 0; i < images.length; i++) {
			try {
				matchImg = images[i].getAttribute("id");
				if(matchImg.indexOf("matchId")>=0) {
					bg = images[i].parentNode.parentNode;
					if(isMatch(matchBoard, matchImg)) {
						bg.style.backgroundColor = "#E1FEEA";
						bg.style.border="1px solid #009966";
					}			  	
				}
			} catch(e) {}
		}
	}
	bActive = false;
}

function isMatch(matchBoard, matchImg) {
	var id=parseInt(matchImg.substr(8));
	var comb=id^parseInt(matchBoard.substr(8));
	var flag=true,i;
	for(i=0; i<4; i++) {
		if((comb&(0xf<<i))>>i!=15) {
			flag=false;
			break
		}
	}
	flag=flag&&((0x0f00|15|0xf000|comb|0x00f0)==((1<<16)-1));
	return flag;
}