// ==UserScript==
// @name          Youtube toggle comments
// @description	  Makes to Youtube comments click to view rather than always showing them or hiding them
// @author        Lewis Aron Milne
// @include       http://www.youtube.com/watch*
// @include       https://www.youtube.com/watch*
// @include       http://youtube.com/watch*
// @include       https://youtube.com/watch*
// @run-at        document-end
// @grant none
// @version 0.0.1.20150228222421
// @namespace https://greasyfork.org/users/7439
// ==/UserScript==

(function () {
	var comments = document.getElementById("watch-discussion");
	var toggleLoc = document.getElementById("watch8-secondary-actions");
	var toggleDiv = document.createElement("div");

	toggleDiv.style.textAlign = "center";
	toggleDiv.innerHTML = "<button id='toggleBtn' class='yt-uix-button yt-uix-button-default'> Show Comments </button>";

	comments.parentNode.insertBefore(toggleDiv, comments);
	comments.style.display = "none";

	var toggleBtn = document.getElementById("toggleBtn");
	toggleBtn.onclick = function() {
		if (comments.style.display !== "none") {
			comments.style.display = "none";
			toggleBtn.innerHTML = "Show  Comments";
		}
		else {
			comments.style.display = "";
			toggleBtn.innerHTML = "Hide Comments";
		} 
	}
}) ();