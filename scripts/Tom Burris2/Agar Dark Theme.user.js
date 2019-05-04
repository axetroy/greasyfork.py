// ==UserScript==
// @name          Agar Dark Theme
// @description   Improves the aesthetic and layout of agar.io
// @include       *agar.io/*
// @grant         none
// @run-at        document-end
// @version       1.9
// @author        Tom Burris
// @namespace     https://greasyfork.org/en/users/46159
// @icon          http://bit.ly/2oT4wRk
// @compatible    chrome
// ==/UserScript==

"use strict";

const byId = id => document.getElementById(id);
const byClass = (clss, prnt) => (prnt || document).getElementsByClassName(clss);
const observe = (target, options, callback) => {
	(new MutationObserver(callback)).observe(target, options);
};

let css = "";

const mainPanel = byId("mainPanel");
const playContainer = byClass("play-container")[0];
const playElm = byId("mainui-play");
const settingsBtn = byId("settingsButton");
let settingsElm = null;

// ** Darken Stuff
css += `
	#mainui-ads, #mainui-features, #mainui-modes, #mainui-offers,
		#mainui-party, #mainui-play, #mainui-promo, #mainui-user,
		#mainui-settings > .dialog, .tosBox, .party-token
	{
		background: #000 !important;
		color: #ddd !important;
		outline: 1.5px solid #ddd;
		border-radius: 0;
	}
	.options, #region, #nick {
		background: #000 !important;
		color: #ddd !important;
	}
	#mainui-grid > div {
		overflow: visible;
	}
	.label, .progress-bar-text {
		color: #fff !important;
		font-weight: 400;
	}
	.potion-slot-container {
		background: #333;
		background-color: #333 !important;
		color: #ddd;
	}
	.potion-slot-container > .cover-up {
		background: #333 !important;
	}
	.potion-slot-lower-text {
		color: #7d7d7d;
	}
	@import url('https://fonts.googleapis.com/css?family=Ubuntu');
	body {
		font-family: 'Ubuntu', sans-serif !important;
	}
	#title {
		margin-top: 0 !important;
	}
	#playnick {
		margin-bottom: 60px !important;
	}
	#instructions {
		position: static !important;
		border-top: 1px solid grey;
		border-bottom: 1px solid grey;
		padding: 5px 10px;
	}
	#mainui-play {
		height: auto !important;
	}
	.play-blocker {
		display: none;
	}
	#stats span {
		color: rgba(255, 255, 255, 0.8) !important;
	}
`;
const lb = byId("statsTimeLeaderboardContainer");
lb.lastElementChild.innerText = "Leaderboard";

// ** Hide Static Ads
css += `
	#mainui-ads, #mainui-promo, #adsBottom, #socialButtons {
		display: none;
	}
`;

// ** Move Settings Back To Center Column
settingsBtn.click();
settingsBtn.parentElement.removeChild(settingsBtn);
observe(mainPanel, {childList: true}, (mutationList, me) => {
	settingsElm = byId("mainui-settings");
	if (!settingsElm) return;
	me.disconnect();

	for (const elm of [byClass("actions")[0], byId("region"),
		byId("quality"), byClass("options")[0], byId("instructions"),
		byClass("versions")[0]])
	{
		mainPanel.appendChild(elm);
	}
	settingsElm.parentElement.removeChild(settingsElm);
});
css += `
	#mainui-settings > .dialog {
		position: static;
		left: 0;
		top: 0;
		transform: translate(0, 0);
		width: 295px;
	}
	.options {
		padding: 0 !important;
	}
	.options label {
		width: auto !important;
	}
	.actions > button {
		width: 130px !important;
	}
	.actions {
		margin-bottom: 15px;
	}
`;

// ** Append CSS To DOM
const style = document.createElement("style");
style.id = "agarExtras";
style.innerHTML = css;
document.head.appendChild(style);
