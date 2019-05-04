// ==UserScript==
// @name        instagram_allow_saveimage2
// @namespace   http://catherine.v0cyc1pp.com/instagram_allow_saveimage.user2.js
// @include     https://www.instagram.com/*
// @version     2.0
// @grant       none
// @run-at      document-end
// @description Allow "Save image as..." on context menu of Instagram.
// @description KNOWN ISSUE: can't save videos.
// ==/UserScript==

//console.log("instagram_allow_saveimage2 start");


function main() {
	//$("img").each(function() {
	document.querySelectorAll("img").forEach(function(elem){
		//$(this).removeAttr("srcset");
		elem.removeAttribute("srcset");
		//$(this).removeAttr("sizes");
		elem.removeAttribute("sizes");



		//var $parent = $(this).parent("div");
		var parent = elem.parentNode;
		//console.log("$parent="+$parent);
		//if ( $parent === null || $parent === undefined ) {
		if ( parent == null || parent == undefined ) {
			return;
		}
		//var $next = $parent.next("div");
		var next = parent.nextElementSibling;
		//console.log("$next="+$next);
		//if ( $next === null || $next === undefined ) {
		if ( next == null || next == undefined ) {
			return;
		}

		//var $next2 = $next.next("div");
		var next2 = next.nextElementSibling;
		//console.log("$next2="+$next2);
		//if ( $next2 !== null || $next2 !== undefined ) {
		if ( next2 != null || next2 != undefined ) {
			//var next2_classname = $next2.attr("class");
			var next2_classname = next2.className;
			if ( next2_classname != undefined ) {
				//console.log("next2_classname="+next2_classname);
				return;
			}
		}


		//var classname = $next.attr("class");
		var classname = next.className;
		//console.log("classname="+classname);

		
		
		//var kids = $next.children();
		var kids = next.children;
		//console.log("len="+kids.length);
		if ( kids.length == 0 ) {
			//console.log("hide: classname="+classname);
			//$next.hide();
			next.style.display = "none";
		} else {
			//console.log("show: classname="+classname);
			//$next.show();
			next.style.display = "block";
		}
	});

}


var observer = new MutationObserver(function(mutations) {
    observer.disconnect();
    main();
    observer.observe( document, config);
});

var config = { attributes: true, childList: true, characterData: false, subtree:true };

observer.observe( document, config);
