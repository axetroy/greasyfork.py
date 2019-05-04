// ==UserScript==
// @name        youtube_search_filter2
// @namespace   http://catherine.v0cyc1pp.com/youtube_search_filter2.user.js
// @include     https://www.youtube.com/*
// @author      greg10
// @run-at      document-start
// @license     GPL 3.0
// @version     2.0
// @grant       none
// @description Hide videos including specified words in the Youtube search results.
// ==/UserScript==


//================================
// Configurations
//   - specify texts you don't want to see.
var g_text = "AKB, HikakinTV,HikakinGames,はじめしゃちょー";
//================================




var nglist = g_text.split(",");


function main() {

	//$("div.yt-lockup-content").each(function() {
	document.querySelectorAll("ytd-video-renderer,ytd-channel-renderer,ytd-grid-video-renderer").forEach(function(elem){
		//var str = $(this).text();
		var str = elem.innerText;
		//console.log("str="+str);

		for ( var i = 0; i < nglist.length; ++i) {
			var ngword = nglist[i];
			if ( ngword == "" ) continue;

			ngword = ngword.replace(/^\s+|\s+$/g, "");

			var obj = new RegExp( ngword, "i");
			var index = str.search( obj );
			//var index = str.indexOf( ngword );
			if ( index != -1 ) {
				//$(this).parent("div").parent("div").parent("li").hide();
				elem.style.display = "none";
				console.log("str="+str);
			}
		}
	});
}

var observer = new MutationObserver(function(mutations) {
    observer.disconnect();
    main();
    observer.observe( document, config);
});

//var config = { attributes: true, childList: true, characterData: true, subtree:true }
var config = { childList: true, characterData: true, subtree:true }

observer.observe( document, config);