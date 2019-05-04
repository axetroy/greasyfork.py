// ==UserScript==
// @name          SearchReddit Stylization
// @namespace     http://userstyles.org
// @description	  SearchReddit.com Styleize
// @author        ceberous
// @homepage      https://creatitees.info
// @include       http://www.searchreddit.com/*
// @require		  http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @run-at        document-start
// @version       1.0
// ==/UserScript==

(function() {

	// MutationObserver = window.MutationObserver || window.WebkitMutationObserver;

	var css = [
	
		"",
	
	].join("\n");

	if ( typeof unsafeWindow.jQuery == 'undefined' ) {

		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement;
		var GM_JQ = document.createElement('script');

		GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore( GM_JQ , GM_Head.firstChild );

	}


	console.log( "JQuery Verion = " + $().jquery);


	$(document).ready( function() {

		var observer = new MutationObserver( function( mutations ) {

			mutations.forEach( function(mutation) {
				console.log(mutation.type);
			});

			$('.gs-snippet').hide();
			$('.gs-title').hide();


		});

		var config = {
			attributes: true,
			childList: true,
			characterData: true
		};

		var target = document.querySelector('body');
		observer.observe( target , config );

	});



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
			document.documentElement.appendChild(node);
		}

	}

})();




