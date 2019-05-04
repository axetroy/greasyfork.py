// ==UserScript==
// @name        VRV Visible Control Bar
// @namespace   DoomTay
// @description Forces the control bar to become visible when video is buffering
// @include     https://static.vrv.co/vilos/player.html
// @version     1.0.0
// @grant       none
// ==/UserScript==

var newStyleSheet = document.createElement("style");
newStyleSheet.rel = "stylesheet";
newStyleSheet.innerHTML = `.client.loading .vjs-control-bar
{
	display: flex !important;
	opacity: 1 !important;
	visibility: visible !important;
}

.vilos-spinner-overlay
{
	pointer-events: none;
}`;
document.body.appendChild(newStyleSheet);