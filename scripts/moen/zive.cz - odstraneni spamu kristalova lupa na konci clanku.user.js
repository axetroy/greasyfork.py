// ==UserScript==
// @name        zive.cz - odstraneni spamu kristalova lupa na konci clanku
// @namespace   monnef.tk
// @include     http://www.zive.cz/*
// @version     3
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author      moen
// @description:cs odstraneni spamu kristalova lupa na konci clanku
// @description odstraneni spamu kristalova lupa na konci clanku
// ==/UserScript==

var lupaSpamDebug = false;
var lupaBeingRemoved = false;

function removeLupaSpam(){
	if(!lupaBeingRemoved){
		lupaBeingRemoved = true;
		if(lupaSpamDebug) console.log("[LupaSpamRemover] Purging.");
		$("p i a").filter(function(){ return $(this).attr("href") == "http://prejdi.cz/hlasprozive" }).each(function(){ $(this).parent().hide(); });
		lupaBeingRemoved = false;
	}
}

// DOMSubtreeModified DOMNodeInserted
$("#main-article").bind("DOMSubtreeModified", function(){
	removeLupaSpam();
});

$(document).ready(function() {
	removeLupaSpam();
});
