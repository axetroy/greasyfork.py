// ==UserScript==
// @name         YouTube aspect ratio switcher
// @namespace    https://greasyfork.org/en/users/27283-mutationobserver
// @version      2019.01.07v3
// @description  Adds an aspect ratio switcher to the player, for videos that have the wrong aspect ratio.
// @author       MutationObserver
// @match        https://*.youtube.com/watch*v=*
// @match        https://*.youtube.com/embed/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

var currentRatio = null;
var buttonhtml = `<button id="aspectratioSwitcher" class="ytp-button" title="Aspect ratio">↔</button>`;
var csshtml = `
	<style>
	#aspectratioSwitcher {
		top: -13px;
		position: relative;
		text-align: center;
		font-size: 19px;
	}
	.ytp-big-mode #aspectratioSwitcher {
		font-size: 182%;
		top: -19px;
	}
	
	.aspectRatio16_9 #aspectratioSwitcher,
	.aspectRatio4_3 #aspectratioSwitcher {
		font-size: unset;
	}
	
	.html5-main-video { transition: .2s; }
	
	.aspectRatio16_9 .html5-main-video { transform: scale(1.335,1)!important; }
	.aspectRatio4_3 .html5-main-video { transform: scale(.75,1)!important; }
	</style>
`;
		
	
if (!document.querySelector(".ytp-subtitles-button.ytp-button")) var anchorElem = document.querySelector(".ytp-button.ytp-settings-button");
else var anchorElem = document.querySelector(".ytp-subtitles-button.ytp-button");

anchorElem.insertAdjacentHTML("beforebegin", buttonhtml + csshtml);

var buttonElem = document.querySelector("#aspectratioSwitcher");

buttonElem.addEventListener("click", aspectRatioSwitch);

function aspectRatioSwitch() {
	var videoElem = document.querySelector("#movie_player");
	
	if (!currentRatio) {
		videoElem.classList.add("aspectRatio16_9");
		currentRatio = "16:9";
		buttonElem.innerHTML = currentRatio;
		return;
	}
	if (currentRatio == "16:9") {
		videoElem.classList.remove("aspectRatio16_9");
		videoElem.classList.add("aspectRatio4_3");
		currentRatio = "4:3";
		buttonElem.innerHTML = currentRatio;
		return;
	}
	if (currentRatio == "4:3") {
		videoElem.classList.remove("aspectRatio4_3");
		currentRatio = null;
		buttonElem.innerHTML = "↔";
		return;
	}
}

})();