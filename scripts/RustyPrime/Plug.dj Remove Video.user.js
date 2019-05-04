// ==UserScript==
// @name       Plug.dj Remove Video
// @namespace  plug.dj
// @version    0.1
// @description  This script hides the video displayed on plug.dj
// @include    https://plug.dj*
// @grant	   none
// @run-at      document-end
// @copyright  RustyPrime
// ==/UserScript==

function removeVid() {
	setTimeout(function(){ 
		if(typeof(API) === 'undefined' || API.enabled !== true) { 
			removeVid();
		} 
		else {
			document.getElementById("playback-container").style.display = "none";
			document.getElementById("yt-frame").style.display = "none";
		}
	}, 1000);
}
removeVid();
setInterval(removeVid, 1500);