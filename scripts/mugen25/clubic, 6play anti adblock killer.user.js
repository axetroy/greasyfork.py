// ==UserScript==
// @name       clubic, 6play anti adblock killer
// @namespace  clubic anti adblock killer
// @version    1.55
// @description    Remove anti adblock banners without killing videos.
// @description:fr Supprime les bannieres anti adblocks tout en laissant intactes les videos. 
// @include      *www.clubic.com*
// @include      *www.6play.fr*
// @require     https://code.jquery.com/jquery-2.1.3.min.js
// @license     GPL
// @run-at document-end
// @grant unsafeWindow
// ==/UserScript==

function RemoveIframes() {

	$('iframe').filter('[webkitallowfullscreen]').remove();
	
}

$(document).ready(function() {

/*
for (i = 40;; i+=30) { 
	
	setTimeout(RemoveIframes, i);
	
}	
*/

var myTimer=self.setInterval(function(){

	
		if ($('iframe').filter('[webkitallowfullscreen]')[0]) {
			
			RemoveIframes();
			
			clearInterval(myTimer);

		}


},100);	


});
