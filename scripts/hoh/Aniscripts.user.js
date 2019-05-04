// ==UserScript==
// @name         Aniscripts
// @namespace    http://tampermonkey.net/
// @version      4.19
// @description  Change stuff on Anilist.co
// @author       hoh
// @match        https://anilist.co/*
// @grant        none
// @license      GPLv3
// ==/UserScript==

(function(){
"use strict";
const scriptInfo = {
	"version" : "4.19",
	"link" : "https://greasyfork.org/en/scripts/370473-aniscripts",
	"author" : "hoh",
	"authorLink" : "https://anilist.co/user/hoh/",
	"license" : "GPLv3"
};
/*
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	<https://www.gnu.org/licenses/>.
*/
/*
Aniscripts, sometimes just "the userscript", is modular and contains of several independet functions
The URL matching controller can be found near the bottom of this file.

Anilist runs on a framework of its own, which mostly avoids reloading the page. (instead it modifies popstate etc.)
Therefore, this script does the following:
1. Runs a clock checking if the URL has changed
2. Runs the modules relevant to that URL.
Some care must be taken checking if an instance of a module is already running, or if the page content has loaded yet.
An ambitious person could try changing those into mutationObserver or something, but it works fine as is.

"useScripts" contains the defauls for the various modules. This is stored in the user's localStorage.
*/

//a shared style node for all the modules. All classes are prefixed by "hoh" to avoid collisions with native Anilist classes
var style = document.createElement("style");
style.type = "text/css";

//The default colour is rgb(var(--color-blue)) provided by Anilist, but rgb(var(--color-green)) is preferred for things related to manga
style.textContent = `
.hohTime{
	position: static;
	float: right;
	margin-right: 20px;
	margin-top: 10px;
	margin-left: auto;
	font-size: 1.1rem;
}
.hohUnread{
	border-right: 8px;
	border-color: rgba(var(--color-blue));
	border-right-style: solid;
}
.hohNotification{
	margin-bottom: 10px;
	background: rgb(var(--color-foreground));
	border-radius: 4px;
	justify-content: space-between;
	line-height: 0;
	min-height: 72px;
}
.hohNotification *{
	line-height: 1.15;
}
.hohUserImageSmall{
	display: inline-block;
	background-position: 50%;
	background-repeat: no-repeat;
	background-size: cover;
	position: absolute;
}
.hohUserImage{
	height: 72px;
	width: 72px;
	display: inline-block;
	background-position: 50%;
	background-repeat: no-repeat;
	background-size: cover;
	position: absolute;
}
.hohMediaImage{
	height: 70px;
	margin-right: 5px;
}
.hohMessageText{
	position: absolute;
	margin-top: 30px;
	margin-left: 80px;
	max-width: 330px;
}
.hohMediaImageContainer{
	vertical-align: bottom;
	margin-left: 400px;
	display: inline;
	position: relative;
	display: inline-block;
	min-height: 70px;
}
.hohMediaImageContainer > a{
	height: 70px;
	line-height: 0!important;
}
span.hohMediaImageContainer{
	line-height: 0!important;
}
.hohCommentsContainer{
	margin-top: 5px;
}
.hohCommentsArea{
	margin: 10px;
	display: none;
	padding-bottom: 2px;
	margin-top: 5px;
	width: 95%;
}
.hohComments{
	float: right;
	display: none;
	margin-top: -30px;
	margin-right: 15px;
	cursor: pointer;
	margin-left: 600px;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.hohCombined .hohComments{
	display: none!important;
}
.hohQuickCom{
	padding: 5px;
	background-color: rgb(var(--color-background));
	margin-bottom: 5px;
	position: relative;
}
.hohQuickComName{
	margin-right: 15px;
	color: rgb(var(--color-blue));
}
.hohThisIsMe{
	color: rgb(var(--color-green));
}
.hohILikeThis{
	color: rgb(var(--color-red));
}
.hohQuickComName::after{
	content: ":";
}
.hohQuickComContent{
	margin-right: 40px;
	display: block;
}
.hohQuickComContent > p{
	margin: 1px;
}
.hohQuickComLikes{
	position: absolute;
	right: 5px;
	bottom: 5px;
	display: inline-block;
}
.hohQuickComContent img {
	max-width: 100%;
}
.hohSpoiler::before{
	color: rgb(var(--color-blue));
	cursor: pointer;
	background: rgb(var(--color-background));
	border-radius: 3px;
	content: "Spoiler, click to view";
	font-size: 1.3rem;
	padding: 0 5px;
}
.hohSpoiler.hohClicked::before{
	display: none;
}
.hohSpoiler > span{
	display: none;
}
.hohMessageText > span > div.time{
	display: none;
}
.hohUnhandledSpecial > div{
	margin-top: -20px;
}
.hohMonospace{
	font-family: monospace;
}
.hohSocialTabActivityCompressedContainer{
	min-width: 480px;
}
.hohSocialTabActivityCompressedStatus{
	vertical-align: middle;
	padding-bottom: 7px;
}
.hohSocialTabActivityCompressedName{
	vertical-align: middle;
	margin-left: 3px;
}
.hohForumHider{
	margin-right: 3px;
	cursor: pointer;
	font-family: monospace;
}
.hohForumHider:hover{
	color: rgb(var(--color-blue));
}
.hohBackgroundCover{
	height: 70px;
	width: 50px;
	display: inline-block;
	background-repeat: no-repeat;
	background-size: cover;
	margin-top: 1px;
	line-height: 0;
	margin-bottom: 1px;
}
#hohDescription{
	width: 280px;
	height: 150px;
	float: left;
	color: rgb(var(--color-blue));
}
.hohStatsTrigger{
	cursor: pointer;
	border-radius: 3px;
	color: rgb(var(--color-text-lighter));
	display: block;
	font-size: 1.4rem;
	margin-bottom: 8px;
	padding: 5px 10px;
}
.hohActive{
	background: rgba(var(--color-foreground),.8);
	color: rgb(var(--color-text));
	font-weight: 500;
}
#hohFavCount{
	position: absolute;
	right: 30px;
	color: rgba(var(--color-red));
	top: 10px;
	font-weight: 400;
}
.hohShamelessLink{
	display: block;
	margin-bottom: 5px;
}
.hohSlidePlayer{
	display: block;
	position: relative;
	width: 500px;
}
.hohSlide{
	position: absolute;
	top: 0px;
	font-size: 500%;
	height: 100%;
	display: flex;
	align-items: center;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	opacity:0.5;
}
.hohSlide:hover{
	background-color: rgb(0,0,0,0.4);
	cursor: pointer;
	opacity:1;
}
.hohRightSlide{
	right: 0px;
	padding-left: 10px;
	padding-right: 20px;
}
.hohLeftSlide{
	left: 0px;
	padding-left: 20px;
	padding-right: 10px;
}
.hohShare{
	position: absolute;
	right: 12px;
	top: 30px;
	cursor: pointer;
	color: rgb(var(--color-blue-dim));
}
.activity-entry{
	position: relative;
}
.hohEmbed{
	border-style: solid;
	border-color: rgb(var(--color-text));
	border-width: 1px;
	padding: 15px;
	position: relative;
}
.hohEmbed .avatar{
	border-radius: 3px;
	height: 40px;
	width: 40px;
	background-position: 50%;
	background-repeat: no-repeat;
	background-size: cover;
	display: inline-block;
}
.hohEmbed .name{
	display: inline-block;
	height: 40px;
	line-height: 40px;
	vertical-align: top;
	color: rgb(var(--color-blue));
	font-size: 1.4rem;
	margin-left: 12px !important;
}
.hohEmbed .time{
	color: rgb(var(--color-text-lighter));
	font-size: 1.1rem;
	position: absolute;
	right: 12px;
	top: 12px;
}
.hohRecsLabel{
	color: rgb(var(--color-blue)) !important;
}
.hohRecsItem{
	margin-top: 5px;
	margin-bottom: 10px;
}
.hohTaglessLinkException{
	display: block;
}
.hohTaglessLinkException::after{
	content: ""!important;
}
.hohStatValue{
	color: rgb(var(--color-blue));
}
.markdown-editor > [title="Image"],
.markdown-editor > [title="Youtube Video"],
.markdown-editor > [title="WebM Video"]{
  color: rgba(var(--color-red));
}
.hohBackgroundUserCover{
	height: 70px;
	width: 70px;
	display: inline-block;
	background-position: 50%;
	background-repeat: no-repeat;
	background-size: cover;
	margin-top: 1px;
	margin-bottom: 1px;
}
.history-day.lv-9{
	z-index:1!important
}
.hohRegularTag{
	border-style: solid;
	border-width: 1px;
	border-radius: 3px;
	padding: 2px;
	margin-right: 3px;
}
.hohTableHider{
	cursor: pointer;
	margin: 4px;
	color: rgb(var(--color-blue));
}
.hohCross{
	cursor: pointer;
	margin-left: 2px;
	color: red;
}
.hohFavCountBrowse{
	color: white;
	position: absolute;
	right: 2px;
	font-size: 60%;
	opacity: 0.7;
}
.hohColourPicker{
	position: absolute;
	right: 60px;
	margin-top: -110px;
}
.hohColourPicker h2{
	color: #3db4f2;
	font-size: 1.6rem;
	font-weight: 400;
	padding-bottom: 12px;
}
.hohSecondaryRow{
	background-color: rgb(var(--color-background));
}
.hohSecondaryRow:hover{
	background-color: rgb(var(--color-foreground));
}
.media-preview-card meter{
	width: 150px;
	margin-bottom: 5px;
}
.sidebar .tags .tag{
	min-height: 35px;
	margin-bottom: 5px !important;

}
.custom-lists .el-checkbox__label{
	display: inline !important;
	white-space: pre-wrap;
	white-space: -webkit-pre-wrap;
	white-space: normal;
	word-wrap: anywhere;
	word-break: break-all;
}
.hohStatusDot{
	position: absolute;
	width: 10px;
	height: 10px;
	border-radius: 50px;
}
.studio .container.header{
	position: relative;
}
.studio .favourite{
	position: absolute;
	top: 10px;
	right: 30px;
}
.filter .view-all{
	background-color: rgb(var(--color-foreground));
	height: 32px;
	border-radius: 3px;
	text-align: center;
	padding-top: 8px;
}
.title > a{
	line-height: 1.15!important;
}
.embed .title{
	line-height: 18px!important;
}
#dubNotice{
	font-size: 12px;
	font-weight: 500;
	text-align: center;
	text-transform: capitalize;
	background: rgb(var(--color-foreground));
	margin-top: 0em;
	margin-bottom: 16px;
	border-radius: 3px;
	padding: 8px 12px;
}
#hohDraw3x3{
	margin-top: 5px;
	cursor: pointer;
}
.hohDisplayBox{
	position: fixed;
	top: 80px;
	left: 200px;
	z-index: 999;
	padding: 20px;
	background-color: rgb(var(--color-foreground));
}
.hohDisplayBoxClose{
	position: absolute;
	right: 20px;
	top: 20px;
	cursor: pointer;
	background-color: red;
}
.hohFeedFilter{
	position: absolute;
	top: 2px;
	font-size: 1.4rem;
	font-weight: 500;
}
.hohFeedFilter input{
	width: 55px;
}
div.page-content > div > div.header-wrap > div.nav-wrap > div > a:nth-child(5):after{
	content: "/Script";
}
.actions .list .add{
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.list-wrap .section-name,
.quick-search input[placeholder="Search AniList"]{
	text-transform: none;
}
.list-wrap{
	counter-reset: animeCounter;
}
.medialist.table.compact .entry .title::before{
	counter-increment: animeCounter;
	content: counter(animeCounter);
	display: inline-block;
	margin-right: 4px;
	margin-left: -17px;
	opacity: 0.2;
	text-align: right;
	width: 25px;
	min-width: 25px;
	font-size: 70%;
}
.hohEnumerateStaff{
	position: absolute;
	margin-left: -12px;
	margin-top: 10px;
}
`;
let documentHead = document.querySelector("head");
if(documentHead){
	documentHead.appendChild(style);
}
else{
	return;//xml documents or something. At least it's not a place where the script can run
}

var localStorageAvailable;//localStorage is great for not having to fetch the api data every time
var test = "test";
try{
	localStorage.setItem(test,test);
	localStorage.removeItem(test);
	localStorageAvailable = true;
}
catch(e){
	localStorageAvailable = false;
}

if(localStorageAvailable){
	var aniscriptsUsed = localStorage.getItem("aniscriptsUsed");
	if(aniscriptsUsed === null){
		aniscriptsUsed = {
			keys : []
		};
	}
	else{
		aniscriptsUsed = JSON.parse(aniscriptsUsed);
	}
	localStorage.setItem("aniscriptsUsed",JSON.stringify(aniscriptsUsed));
}

var useScripts = {//most modules are turned on by default
	notifications : true,
	socialTab : true,
	forumComments : true,
	staffPages : true,
	tagDescriptions : true,
	completedScore : true,
	droppedScore : false,
	moreStats : true,
	characterFavouriteCount : true,
	studioFavouriteCount : true,
	CSSfavs : true,
	CSScompactBrowse : true,
	CSSmangaGreen: false,
	CSSfollowCounter: true,
	CSSsubmissionCounter: false,
	CSSprofileClutter: false,
	CSSdecimalPoint: false,
	CSSverticalNav: false,
	hideLikes: false,
	dubMarker: false,
	CSSstudioStats: true,
	CSSsmileyScore: true,
	CSSexpandFeedFilters: false,
	feedCommentFilter: false,
	feedCommentComments: 0,
	feedCommentLikes: 0,
	colourPicker: true,
	colourSettings: [],
	mangaBrowse: false,
	progressBar: false,
	noRewatches: false,
	hideCustomTags: false,
	shortRomaji: false,
	replaceNativeTags: true,
	draw3x3: true,
	limitProgress8: false,
	limitProgress10: false,
	tagIndex: true,
	ALbuttonReload: true,
	expandRight: false,
	timeToCompleteColumn: false,
	mangaGuess: true,
	replaceStaffRoles: true,
	settingsTip: true,
	enumerateSubmissionStaff: true,
	staffRoleOrder: "alphabetical",
	titleLanguage: "Romaji",
	dubMarkerLanguage: "English",
	accessToken: "",
};

var forceRebuildFlag = false;

if(localStorageAvailable){
	const useScriptsSettings = JSON.parse(localStorage.getItem("hohSettings"));
	if(useScriptsSettings){
		var keys = Object.keys(useScriptsSettings);
		keys.forEach(function(key){//this is to keep the default settings if the version in local storage is outdated
			useScripts[key] = useScriptsSettings[key];
		});
	}
	localStorage.setItem("hohSettings",JSON.stringify(useScripts));
}

var whoAmI = "";

//replace with query selector?
try{//use later for some scripts
	whoAmI = document.getElementById("nav").children[1].children[1].children[1].href.match(/[\w\-]*\/$/)[0].slice(0,-1);//looks at the nav
}
catch(err){
	console.log("could not get username");
}

const svgAssets = {
	envelope : "✉",
	cross : "✕",
	frown : `
<svg data-v-ca4e7a3a="" aria-hidden="true" data-prefix="far" data-icon="frown" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg-inline--fa fa-frown fa-w-16 fa-lg">
  <path data-v-ca4e7a3a="" fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.5 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c4.8 5.7 11.6 8.6 18.5 8.6 5.4 0 10.9-1.8 15.4-5.6 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z" class="">
  </path>
</svg>
	`,
	meh : `
<svg data-v-ca4e7a3a="" aria-hidden="true" data-prefix="far" data-icon="meh" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg-inline--fa fa-meh fa-w-16 fa-lg">
  <path data-v-ca4e7a3a="" fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm8 144H160c-13.2 0-24 10.8-24 24s10.8 24 24 24h176c13.2 0 24-10.8 24-24s-10.8-24-24-24z" class="">
  </path>
</svg>
	`,
	smile : `
<svg data-v-ca4e7a3a="" aria-hidden="true" data-prefix="far" data-icon="smile" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg-inline--fa fa-smile fa-w-16 fa-lg">
  <path data-v-ca4e7a3a="" fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm84-143.4c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.6-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.2-8.4-25.3-7.1-33.8 3.1zM168 240c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z" class="">
  </path>
</svg>
	`,
	star : `
<svg data-v-ca4e7a3a="" aria-hidden="true" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="icon svg-inline--fa fa-star fa-w-18">
  <path data-v-ca4e7a3a="" fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class="">
  </path>
</svg>
	`,
	//the column sorting arrow
	angleDown : `
<svg data-v-e2beaf26="" aria-hidden="true" data-prefix="fas" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-down fa-w-10">
  <path data-v-e2beaf26="" fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" class="">
  </path>
</svg>
	`,
	view : `
<svg data-v-0dc978d0="" aria-hidden="true" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-eye fa-w-18 fa-sm">
  <path data-v-0dc978d0="" fill="currentColor" d="M569.354 231.631C512.969 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-75.162 0-136-60.827-136-136 0-75.162 60.826-136 136-136 75.162 0 136 60.826 136 136 0 75.162-60.826 136-136 136zm104-136c0 57.438-46.562 104-104 104s-104-46.562-104-104c0-17.708 4.431-34.379 12.236-48.973l-.001.032c0 23.651 19.173 42.823 42.824 42.823s42.824-19.173 42.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621 156.431 270.292 152 288 152c57.438 0 104 46.562 104 104z" class="">
  </path>
</svg>
	`,
	reply : `
<svg data-v-0dc978d0="" aria-hidden="true" data-prefix="fas" data-icon="comments" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-comments fa-w-18 fa-sm">
  <path data-v-0dc978d0="" fill="currentColor" d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z" class="">
  </path>
</svg>
	`,
	repeat : `
<svg aria-hidden="true" data-prefix="fas" data-icon="redo-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-redo-alt fa-w-16">
  <path fill="currentColor" d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z" class="">
  </path>
</svg>
	`,
	external : `
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12">
  <path fill="#fff" stroke="#36c" d="M1.5 4.518h5.982V10.5H1.5z"/>
  <path fill="#36c" d="M5.765 1H11v5.39L9.427 7.937l-1.31-1.31L5.393 9.35l-2.69-2.688 2.81-2.808L4.2 2.544z"/>
  <path fill="#fff" d="M9.995 2.004l.022 4.885L8.2 5.07 5.32 7.95 4.09 6.723l2.882-2.88-1.85-1.852z"/>
</svg>
	`
};

const distributionColours = {
	"COMPLETED" : "rgb(104, 214,  57)",
	"CURRENT"   : "rgb(  2, 169, 255)",
	"PAUSED"    : "rgb(247, 121, 164)",
	"DROPPED"   : "rgb(232,  93, 117)",
	"PLANNING"  : "rgb(247, 154,  99)",
	"REPEATING" : "violet"
};

if(useScripts.mangaBrowse){
	const navLinks = document.querySelector(".links");
	for(var i=0;i<navLinks.children.length;i++){
		if(navLinks.children[i].href === "https://anilist.co/search/anime"){
			navLinks.children[i].href = "/search/manga";
			/*must remove the existing evenlistener for clicks.
			the reason for this is that it fires before the link, making the href useless
			this unfortunately turns it into a regular lin, which reloads the page, so it's slower than the default behaviour.
			but since user interactions is even slower, this still saves time for those who only are interested in manga
			*/
			var mangaBrowseLink = navLinks.children[i].cloneNode(true);
			navLinks.replaceChild(mangaBrowseLink,navLinks.children[i]);
			break;
		};
	};
};

if(useScripts.colourPicker && localStorageAvailable){
	let colourStyle = document.createElement("style");
	colourStyle.type = "text/css";
	documentHead.appendChild(colourStyle);
	const basicStyles = `
.footer .links{
	margin-left: calc(-100px + 1%);
	transform: translate(0px,10px);
}
`;
	let applyColourStyles = function(){
		colourStyle.innerHTML = basicStyles;//eh, fix later.
		useScripts.colourSettings.forEach(function(colour){
			let hexToRgb = function(hex){
				let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
				return result ? {
					r: parseInt(result[1],16),
					g: parseInt(result[2],16),
					b: parseInt(result[3],16)
				} : null;
			}
			if(colour.initial){
				var rgbSet = hexToRgb(colour.initial);
				colourStyle.innerHTML += ":root{" + colour.colour + ":" + rgbSet.r + "," + rgbSet.g + "," + rgbSet.b + ";}";
			};
			if(colour.dark){
				var rgbSet = hexToRgb(colour.dark);
				colourStyle.innerHTML += ".site-theme-dark{" + colour.colour + ":" + rgbSet.r + "," + rgbSet.g + "," + rgbSet.b + ";}";
			};
			if(colour.contrast){
				var rgbSet = hexToRgb(colour.contrast);
				colourStyle.innerHTML += ".site-theme-contrast{" + colour.colour + ":" + rgbSet.r + "," + rgbSet.g + "," + rgbSet.b + ";}";
			};
		});
	};applyColourStyles();
	let colourPickerLocation = document.querySelector("#app > .wrap > .footer > .container");
	if(colourPickerLocation){
		const supportedColours = [
			"--color-background",
			"--color-foreground",
			"--color-foreground-grey",
			"--color-foreground-grey-dark",
			"--color-foreground-blue",
			"--color-foreground-blue-dark",
			"--color-background-blue-dark",
			"--color-overlay",
			"--color-shadow",
			"--color-shadow-dark",
			"--color-text",
			"--color-text-light",
			"--color-text-lighter",
			"--color-text-bright",
			"--color-blue",
			"--color-blue-dim",
			"--color-white",
			"--color-black",
			"--color-red",
			"--color-peach",
			"--color-orange",
			"--color-yellow",
			"--color-green"
		];
		var colourChanger = function(){
			for(var i=0;i<useScripts.colourSettings.length;i++){
				if(useScripts.colourSettings[i].colour == cpSelector.value){
					if(cpInitialBox.checked){
						useScripts.colourSettings[i].initial = cpInput.value;
					}
					else{
						useScripts.colourSettings[i].initial = false;
					};
					if(cpDarkBox.checked){
						useScripts.colourSettings[i].dark = cpInput.value;
					}
					else{
						useScripts.colourSettings[i].dark = false;
					};
					if(cpContrastBox.checked){
						useScripts.colourSettings[i].contrast = cpInput.value;
					}
					else{
						useScripts.colourSettings[i].contrast = false;
					};
					applyColourStyles();
					localStorage.setItem("hohSettings",JSON.stringify(useScripts));
					return;
				};
			};
			useScripts.colourSettings.push(
				{
					"colour" : cpSelector.value,
					"initial" : (cpInitialBox.checked ? cpInput.value : false),
					"dark" : (cpDarkBox.checked ? cpInput.value : false),
					"contrast" : (cpContrastBox.checked ? cpInput.value : false)
				}
			);
			applyColourStyles();
			localStorage.setItem("hohSettings",JSON.stringify(useScripts));
		};
		var cpContainer = document.createElement("div");
		cpContainer.classList.add("hohColourPicker");
		var cpTitle = document.createElement("h2");
		cpTitle.innerText = "Adjust Colours";
		cpContainer.appendChild(cpTitle);
		var cpSelector = document.createElement("select");
		supportedColours.forEach(function(colour){
			var option = document.createElement("option");
			option.innerText = colour;
			option.value = colour;
			cpSelector.appendChild(option);
		});
		var cpInput = document.createElement("input");
		cpInput.type = "color";
		var cpDomain = document.createElement("p");
		var cpInitialBox = document.createElement("input");
		cpInitialBox.type = "checkbox";
		var cpDarkBox = document.createElement("input");
		cpDarkBox.type = "checkbox";
		var cpContrastBox = document.createElement("input");
		cpContrastBox.type = "checkbox";
		var cpInitial = document.createElement("span");
		cpInitial.innerText = "default";
		var cpDark = document.createElement("span");
		cpDark.innerText = "dark";
		var cpContrast = document.createElement("span");
		cpContrast.innerText = "contrast";

		var cpSelectorChanger = function(){
			for(var i=0;i<useScripts.colourSettings.length;i++){
				if(useScripts.colourSettings[i].colour == cpSelector.value){
					cpInitialBox.checked = !!useScripts.colourSettings[i].initial;
					cpDarkBox.checked = !!useScripts.colourSettings[i].dark;
					cpContrastBox.checked = !!useScripts.colourSettings[i].contrast;
					cpInput.value = useScripts.colourSettings[i].initial;
					return;
				};
			};
			cpInitialBox.checked = false;
			cpDarkBox.checked = false;
			cpContrastBox.checked = false;
		};

		cpSelector.onchange = cpSelectorChanger;
		cpInput.onchange = colourChanger;
		cpInitialBox.onchange = colourChanger;
		cpDarkBox.onchange = colourChanger;
		cpContrastBox.onchange = colourChanger;

		cpContainer.appendChild(cpInput);
		cpContainer.appendChild(cpSelector);

		cpDomain.appendChild(cpInitialBox);
		cpDomain.appendChild(cpInitial);
		cpDomain.appendChild(cpDarkBox);
		cpDomain.appendChild(cpDark);
		cpDomain.appendChild(cpContrastBox);
		cpDomain.appendChild(cpContrast);
		cpContainer.appendChild(cpDomain);

		colourPickerLocation.appendChild(cpContainer);
		cpSelectorChanger();
	};
}

var moreStyle = document.createElement("style");
moreStyle.type = "text/css";

var createAlias = function(alias){
	if(alias[0] === "css/"){
		moreStyle.textContent += alias[1];
	}
	else{
		const dataSelect = `[href^="${alias[0]}"]`;
		const targetName = alias[1].substring(0,Math.min(100,alias[1].length));
		moreStyle.textContent +=  `
.title > a${dataSelect}
,a.title${dataSelect}
,.overlay > a.title${dataSelect}
,.media-preview-card a.title${dataSelect}
,.quick-search-results .el-select-dropdown__item a${dataSelect}> span
,.media-embed${dataSelect} .title
,.status > a.title${dataSelect}
,.role-card a.content${dataSelect} > .name{
	visibility: hidden;
	font-size: 2%;
	line-height: 0px;
}

a.title${dataSelect}::before
,.quick-search-results .el-select-dropdown__item a${dataSelect} > span::before
,.role-card a.content${dataSelect} > .name::before
,.title > a${dataSelect}::before
,.home .status > a.title${dataSelect}::before
,.media-embed${dataSelect} .title::before
,.overlay > a.title${dataSelect}::before
,.media-preview-card a.title${dataSelect}::before{
	content:"${targetName}"
}`;
	}
}

const shortRomaji = [
["/anime/30/","Evangelion"],
["/anime/32/","End of Evangelion"],
["/anime/5114/","FMA:B"],
["/anime/10620/","Mirai Nikki"],
["/anime/1575/","Code Geass"],
["/anime/2904/","Code Geass R2"],
["/anime/21355/","Re:Zero"],
["/anime/2001/","Gurren Lagann"],
["/anime/21202/","Konosuba!"],
["/anime/21699/","Konosuba! 2"],
["/anime/21574/","Konosuba!: Kono Subarashii Choker ni Shufuku wo!"],
["/anime/9756/","Madoka★Magica"],
["/anime/9989/","AnoHana"],
["/anime/20623/","Kiseijuu"],
["/anime/14741/","Chuunibyou!"],
["/anime/18671/","Chuunibyou! 2"],
["/anime/14813/","OreGairu"],
["/anime/20920/","Danmachi"],
["/anime/8074/","HIGHSCHOOL OF THE DEAD"],
["/anime/849/","Haruhi"],
["/anime/4382/","Haruhi (2009)"],
["/anime/19603/","Unlimited Blade Works"],
["/anime/20792/","Unlimited Blade Works 2"],
["/anime/8769/","OreImo"],
["/anime/10020/","OreImo Specials"],
["/anime/13659/","OreImo 2"],
["/anime/18857/","OreImo 2 Specials"],
["/anime/2025/","Darker than BLACK"],
["/anime/20698/","OreGairu 2"],
["/anime/16592/","Danganronpa"],
["/anime/16742/","WataMote"],
["/anime/101291/","Bunny Girl-senpai"],
["/anime/104157/","Bunny Girl-senpai Movie"],
["/anime/19221/","NouKome"],
["/anime/45/","Rurouni Kenshin"],
["/anime/8795/","Panty & Stocking"],
["/anime/21860/","Sukasuka"],
["/anime/33/","Berserk"],
["/anime/97938/","Boruto"],
["/anime/97907/","Death March"],
["/anime/100183/","Gun Gale Online"],
["/anime/20474/","JoJo: Stardust Crusaders"],
["/anime/20799/","JoJo: Stardust Crusaders - Egypt-hen"],
["/anime/21450/","JoJo: Diamond wa Kudakenai"],
["/anime/102883/","JoJo: Ougon no Kaze"],
["/anime/101921/","Kaguya-sama wa Kokuraseta"],
["/anime/101166/","Danmachi: Orion no Ya"],
["/anime/20791/","Heaven’s Feel I. presage flower"],
["/anime/21718/","Heaven’s Feel II. lost butterfly"],
["/anime/21719/","Heaven’s Feel III. spring song"],
["/anime/1089/","Macross: Ai Oboete Imasu ka"],
["/anime/572/","Nausicaa"],
["/anime/513/","Laputa"],
["/anime/44/","Rurouni Kenshin: Tsuioku-hen"],
["/anime/528/","Mewtwo no Gyakushuu"],
["/anime/530/","Sailor Moon"],
["/anime/740/","Sailor Moon R"],
["/anime/532/","Sailor Moon S"],
["/anime/1239/","Sailor Moon SuperS"],
["/anime/996/","Sailor Moon Sailor Stars"],
["/anime/949/","Gunbuster!"],
["/anime/18677/","Yuushibu"],
["/manga/86635/","Kaguya-sama wa Kokurasetai"],
["/anime/17074/","Monogatari Second Season"],
["/anime/20910/","Shimoseka"]
];

let aliasFlag = false;

if(useScripts.shortRomaji){
	shortRomaji.forEach(createAlias);
	aliasFlag = true;
}

if(localStorageAvailable){
	const titleAliases = JSON.parse(localStorage.getItem("titleAliases"));
	if(titleAliases){
		aliasFlag = true;
		titleAliases.forEach(createAlias);
	}
}

if(aliasFlag){
	moreStyle.textContent += `
a.title::before
,.quick-search-results .el-select-dropdown__item a > span::before{
	visibility: visible;
	font-size: 5000%;
	line-height: 1.15;
	margin-right: 2px;
}
.medialist.table .title > a::before{
	visibility: visible;
	font-size: 1.5rem;
	margin-right: 2px;
}
.medialist.compact .title > a::before
,.medialist.cards .title > a::before
,.home .status > a.title::before
,.media-embed .title::before{
	visibility: visible;
	font-size: 1.3rem;
	margin-right: 2px;
}
.role-card a.content > .name::before{
	visibility: visible;
	font-size: 1.2rem;
}
.overlay > a.title::before
,.media-preview-card a.title::before{
	visibility: visible;
	font-size: 1.4rem;
	line-height: 1.15;
}
.role-card a.content > .name{
	line-height: 1.3!important;
}`;
}

if(useScripts.CSSfavs || useScripts.CSSstudioStats){
/*adds a logo to most favourite studio entries. Add more if needed */
	const favStudios = [
[1,   "Studio-Pierrot",		"https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Studio_Pierrot.jpg/220px-Studio_Pierrot.jpg","studio"],
[2,   "Kyoto-Animation",	"https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Kyoto_Animation_logo.svg/250px-Kyoto_Animation_logo.svg.png","studio"],
[3,   "GONZO",			"https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Gonzo_company.png/220px-Gonzo_company.png","studio"],
[4,   "BONES",			"https://i.stack.imgur.com/7pRQn.png","studio"],
[5,   "Bee-Train",		"https://upload.wikimedia.org/wikipedia/commons/4/45/Bee_Train.svg","studio"],
[6,   "Gainax",			"https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Gainax_logo.svg/220px-Gainax_logo.svg.png","studio"],
[7,   "JC-Staff",		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/J.C.Staff_Logo.svg/220px-J.C.Staff_Logo.svg.png","studio"],
[8,   "Artland",		"https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Artland_logo.gif/200px-Artland_logo.gif","studio"],
[10,  "Production-IG",		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Production_I.G_Logo.svg/250px-Production_I.G_Logo.svg.png","studio"],
[11,  "MADHOUSE",		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Madhouse_studio_logo.svg/300px-Madhouse_studio_logo.svg.png","studio"],
[13,  "Studio-4C",		"https://upload.wikimedia.org/wikipedia/en/e/ec/Studio_4C_logo.png","studio"],
[14,  "Sunrise",		"https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Sunrise_company_logo.svg/220px-Sunrise_company_logo.svg.png","studio"],
[17,  "Aniplex",		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Aniplex_logo.svg/220px-Aniplex_logo.svg.png",""],
[18,  "Toei-Animation",		"https://i.stack.imgur.com/AjzVI.png","studio",76,30],
[21,  "Studio-Ghibli",		"https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/220px-Studio_Ghibli_logo.svg.png","studio",76,30],
[22,  "Nippon-Animation",	"https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Nippon.png/200px-Nippon.png","studio"],
[25,  "Milky-Animation-Label",	"https://img.fireden.net/a/image/1467/16/1467164781976.png","studio"],
[27,  "Xebec",			"https://upload.wikimedia.org/wikipedia/fr/b/bd/Logo_Xebec.svg","studio"],
[28,  "Oriental-Light-and-Magic","https://i.stack.imgur.com/Sbllv.png","studio"],
[32,  "Manglobe",		"https://i.imgur.com/W8U74wO.png","studio"],
[34,  "Hal-Film-Maker",		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Hal_film_maker_logo.gif/220px-Hal_film_maker_logo.gif","studio"],
[35,  "Seven-Arcs",		"https://upload.wikimedia.org/wikipedia/en/a/ac/Seven_Arcs_logo.png","studio",76,25],
[36,  "Studio-Gallop",		"https://upload.wikimedia.org/wikipedia/commons/3/37/Studio_Gallop.png","studio"],
[37,  "Studio-DEEN",		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Studio_Deen_logo.svg/220px-Studio_Deen_logo.svg.png","studio"],
[38,  "Arms",			"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Arms_Corporation.png/200px-Arms_Corporation.png","studio"],
[41,  "Satelight",		"https://i.stack.imgur.com/qZVQg.png","studio",76,30],
[43,  "ufotable",		"https://upload.wikimedia.org/wikipedia/en/5/56/Ufotable-Logo.png","studio",76,30],
[44,  "Shaft",			"https://i.stack.imgur.com/tuqhK.png","studio"],
[45,  "Pink-Pineapple",		"https://i.stack.imgur.com/2NMQ0.png","studio"],
[47,  "Studio-Khara",		"https://i.stack.imgur.com/2d1TT.png","studio",76,30],
[48,  "AIC",			"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/AIC_logo.png/220px-AIC_logo.png","studio"],
[51,  "diomeda",		"https://i.stack.imgur.com/ZHt3T.jpg","studio"],
[53,  "Dentsu",			"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Dentsu_logo.svg/200px-Dentsu_logo.svg.png",""],
[58,  "Square-Enix",		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Square_Enix_logo.svg/230px-Square_Enix_logo.svg.png",""],
[65,  "Tokyo-Movie-Shinsha",	"https://upload.wikimedia.org/wikipedia/en/2/22/Tokyo_Movie_Shinsha.png","studio"],
[66,  "Key",			"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Key_Visual_Arts_Logo.svg/167px-Key_Visual_Arts_Logo.svg.png","",76,25],
[68,  "Mushi-Productions",	"https://i.stack.imgur.com/HmYdT.jpg","studio"],
[73,  "TMS-Entertainment",	"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TMS_Entertainment_logo.svg/220px-TMS_Entertainment_logo.svg.png","studio"],
[79,  "Genco",			"https://www.thefilmcatalogue.com/assets/company-logos/5644/logo_en.png",""],
[86,  "Group-TAC",		"https://upload.wikimedia.org/wikipedia/commons/b/b7/Group_TAC.png","studio"],
[91,  "feel",			"https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Feel_%28company%29_logo.png/220px-Feel_%28company%29_logo.png","studio",76,25],
[95,  "Doga-Kobo",		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Doga_Kobo_Logo.svg/220px-Doga_Kobo_Logo.svg.png","studio"],
[97,  "ADV-Films",		"https://upload.wikimedia.org/wikipedia/en/4/45/A.D._Vision_%28logo%29.png","licensor"],
[102, "FUNimation-Entertainment","https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Funimation_2016.svg/320px-Funimation_2016.svg.png","licensor"],
[103, "Tatsunoko-Production",	"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Tatsunoko_2016_logo.png/300px-Tatsunoko_2016_logo.png","studio"],
[104, "Lantis",			"https://upload.wikimedia.org/wikipedia/commons/3/39/Lantis_logo.png",""],
[108, "Media-Factory",		"https://i.stack.imgur.com/rR7yU.png","",76,25],
[112, "Brains-Base",		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Brain%27s_Base_logo.png/200px-Brain%27s_Base_logo.png","studio"],
[113, "Kadokawa-Shoten",	"https://i.stack.imgur.com/ZsUDR.gif",""],
[119, "Viz-Media",		"https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Viz_Media_logo.png/220px-Viz_Media_logo.png","licensor"],
[132, "PA-Works",		"https://i.stack.imgur.com/7kjSn.png","studio"],
[143, "Mainichi-Broadcasting",	"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Mainichi_Broadcasting_System_logo.svg/200px-Mainichi_Broadcasting_System_logo.svg.png",""],
[144, "Pony-Canyon",		"https://i.stack.imgur.com/9kkew.png",""],
[145, "TBS",			"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/TBS_logo.svg/200px-TBS_logo.svg.png",""],
[150, "Sanrio",			"https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Sanrio_logo.svg/220px-Sanrio_logo.svg.png",""],
[159, "Kodansha",		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Kodansha.png/200px-Kodansha.png",""],
[166, "Movic",			"https://upload.wikimedia.org/wikipedia/commons/f/f3/Movic_logo.png",""],
[167, "Sega",			"https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Sega_logo.svg/200px-Sega_logo.svg.png",""],
[169, "Fuji-TV",		"https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Fuji_TV_logo.svg/225px-Fuji_TV_logo.svg.png","",76,30],
[193, "Idea-Factory",		"https://upload.wikimedia.org/wikipedia/en/e/eb/Idea_factory.gif",""],
[196, "Production-Reed",	"https://upload.wikimedia.org/wikipedia/fr/7/7d/Production_Reed_Logo.png","studio"],
[199, "Studio-Nue",		"https://i.stack.imgur.com/azzKH.png","studio"],
[200, "Tezuka-Productions",	"https://upload.wikimedia.org/wikipedia/fr/f/fe/Tezuka_Productions_Logo.png","studio"],
[217, "The-Right-Stuf-International","","licensor"],
[238, "ATX",			"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/AT-X_logo.svg/150px-AT-X_logo.svg.png","",76,30],
[247, "ShinEi-Animation",	"https://i.stack.imgur.com/b2lcL.png","studio"],
[250, "Media-Blasters",		"","licensor"],
[262, "Kadokawa-Pictures-USA",	"https://i.stack.imgur.com/ZsUDR.gif",""],
[284, "Central-Park-Media",	"","licensor"],
[287, "David-Production",	"https://upload.wikimedia.org/wikipedia/en/thumb/7/75/David_production.jpg/220px-David_production.jpg","studio",76,30],
[290, "Kinema-Citrus",		"https://upload.wikimedia.org/wikipedia/commons/c/c0/Kinema_Citrus_logo.png","studio",76,25],
[291, "CoMix-Wave",		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Cwflogo.png/150px-Cwflogo.png","studio"],
[292, "AIC-Plus",		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/AIC_logo.png/220px-AIC_logo.png","studio"],
[300, "SILVER-LINK",		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Silver_Link_Logo.svg/220px-Silver_Link_Logo.svg.png","studio"],
[309, "GoHands",		"https://i.stack.imgur.com/pScIZ.jpg","studio"],
[314, "White-Fox",		"https://i.stack.imgur.com/lwG1T.png","studio",76,30],
[333, "TYO-Animations",		"https://i.stack.imgur.com/KRqAp.jpg","studio",76,25],
[334, "Ordet",			"https://i.stack.imgur.com/evr12.png","studio",76,30],
[346, "Hoods-Entertainment",	"https://i.stack.imgur.com/p7S0I.png","studio"],
[352, "Kadokawa-Pictures-Japan","https://i.stack.imgur.com/ZsUDR.gif",""],
[365, "PoRO",			"https://i.stack.imgur.com/3rlAh.png","studio"],
[372, "NIS-America-Inc",	"https://upload.wikimedia.org/wikipedia/en/e/e7/Nis.png","licensor"],
[376, "Sentai-Filmworks",	"https://i.stack.imgur.com/JV8R6.png","licensor",74,30],
[397, "Bridge",			"https://i.imgur.com/4Qn4EmK.png","studio"],
[415, "Warner-Bros",		"","licensor"],
[417, "Walt-Disney-Studios",	"","licensor"],
[418, "Studio-Gokumi",		"https://i.stack.imgur.com/w1y22.png","studio"],
[436, "AIC-Build",		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/AIC_logo.png/220px-AIC_logo.png","studio"],
[437, "Kamikaze-Douga",		"https://img7.anidb.net/pics/anime/178777.jpg",""],
[456, "Lerche",			"https://i.stack.imgur.com/gRQPc.png","studio"],
[459, "Nitroplus",		"https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Nitroplus_logo.png/220px-Nitroplus_logo.png",""],
[467, "Discotek",		"","licensor"],
[493, "Aniplex-of-America",	"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Aniplex_logo.svg/220px-Aniplex_logo.svg.png","licensor"],
[499, "The-Pokemon-Company-International","","licensor"],
[503, "Nintendo-Co-Ltd",	"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Nintendo.svg/220px-Nintendo.svg.png",""],
[537, "SANZIGEN",		"https://i.stack.imgur.com/CkuqH.png","",76,30],
[541, "Seven",			"","studio"],
[555, "Studio-Chizu",		"https://i.stack.imgur.com/h2RuH.gif","studio"],
[561, "A1-Pictures",		"https://i.stack.imgur.com/nBUYo.png","studio",76,30],
[569, "MAPPA",			"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/MAPPA_Logo.svg/220px-MAPPA_Logo.svg.png","studio"],
[681, "ASCII-Media-Works",	"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/ASCII_Media_Works_logo.svg/220px-ASCII_Media_Works_logo.svg.png",""],
[803, "Trigger",		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Trigger_Logo.svg/220px-Trigger_Logo.svg.png","studio"],
[783, "GKids",			"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/GKIDS_logo.svg/150px-GKIDS_logo.svg.png","licensor"],
[829, "Studio-Jack",		"","studio"],
[839, "LIDENFILMS",		"https://upload.wikimedia.org/wikipedia/en/6/6e/LidenFilms.png","studio",76,30],
[858, "Wit-Studio",		"https://i.stack.imgur.com/o3Rro.png","studio",76,30],
[911, "Passione",		"https://i.stack.imgur.com/YyEGg.jpg","studio"],
[2524,"4Kids-Entertainment",	"","licensor"],
[4418,"8bit",			"https://upload.wikimedia.org/wikipedia/en/e/ea/8-Bit_Animation_Studio.png","studio"],
[6069,"Studio-3Hz",		"https://i.stack.imgur.com/eD0oe.jpg","studio"],
[6071,"Studio-Shuka",		"https://upload.wikimedia.org/wikipedia/commons/f/fa/Shuka_studio.jpg","studio"],
[6077,"Orange",			"https://i.stack.imgur.com/ve9mm.gif","studio"],
[6142,"Geno-Studio",		"https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Genostudio.jpg/220px-Genostudio.jpg","",76,25],
[6145,"Science-SARU",		"https://i.stack.imgur.com/zo9Fx.png","studio"],
[6222,"CloverWorks",		"https://i.stack.imgur.com/9Fvr7.jpg","studio"],
[6225,"TriF-studio",		"https://i.stack.imgur.com/lL85s.png","studio",60,50],
[6235,"SEK-Studio",		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Flag_of_North_Korea.svg/125px-Flag_of_North_Korea.svg.png","studio",74,25]
	];
	let favStudioString = "";
	if(useScripts.CSSfavs){
		favStudioString += `
.favourites > div > .wrap > div,
.favourites > div > .wrap > a{
/*make the spaces in the grid even*/
	margin-bottom: 0px!important;
	margin-right: 0px!important;
	column-gap: 10px!important;
}
.user .overview{
	grid-template-columns: 460px auto!important;
}
.favourites > div > .wrap{
	padding: 0px!important;
	display: grid;
	grid-gap: 10px;
	column-gap: 10px!important;
	grid-template-columns: repeat(auto-fill,85px);
	grid-template-rows: repeat(auto-fill,115px);
	background: rgb(0,0,0,0) !important;
	width: 470px;
}
.favourite.studio{
	cursor: pointer;
	min-height: 115px;
	font-size: 15px;
	display: grid;
	grid-gap: 10px;
	padding: 2px!important;
	padding-top: 8px!important;
	background-color: rgba(var(--color-foreground))!important;
	text-align: center;
	align-content: center;
}
.site-theme-dark .favourite.studio{
	background-color: rgb(49,56,68)!important;
}
.favourite.studio::after{
	display: inline-block;
	background-repeat: no-repeat;
	content:"";
	margin-left:5px;
	background-size: 76px 19px;
	width: 76px;
	height: 19px;
}`;
		favStudios.forEach(function(studio){
			if(studio[2] !== ""){
				favStudioString += `.favourite.studio[href="/studio/${studio[0]}/${studio[1]}"]::after{background-image: url("${studio[2]}");`;
				if(studio.length === 6){
					favStudioString += `background-size: ${studio[4]}px ${studio[5]}px;width: ${studio[4]}px;height: ${studio[5]}px;`;
				}
				favStudioString += "}";
			}
		});
	}
	if(useScripts.CSSstudioStats){
		favStudios.forEach(function(studio){
			if(studio[3] === "studio"){
				favStudioString += `.stats-wrap .row a[href="/studio/${studio[0]}/${studio[1]}"],`;
			}
		});
		favStudioString = favStudioString.replace(/,$/,"");
		favStudioString += "{color:rgb(var(--color-blue))}";
		favStudios.forEach(function(studio){
			if(studio[3] === "licensor"){
				favStudioString += `.stats-wrap .row a[href="/studio/${studio[0]}/${studio[1]}"],`;
			}
		});
		favStudioString = favStudioString.replace(/,$/,"");
		favStudioString += "{color:rgb(var(--color-green))}";
	}
	moreStyle.textContent += favStudioString;
}

if(useScripts.CSScompactBrowse){
	moreStyle.textContent += `
.search-page-unscoped.container{
	padding-left: 10px;
	padding-right: 0px;
}
.search-page-unscoped .description{
	display:none;
}
body,.search-page-unscoped .preview-section{
	counter-reset: ranking;
}
.search-page-unscoped .data::before {
	left:2px;
	opacity:0.4;
	font-size:70%;
	position:absolute;
	counter-increment: ranking;
	content: counter(ranking);
}
.search-page-unscoped .media-card{
	min-width:150px!important;
	grid-template-columns: 150px auto!important;
	height: 297px!important;
	width: 150px !important;
}
.search-page-unscoped .cover .overlay{
	padding-left:8px!important;
	padding-right:8px!important;
	padding-top:4px!important;
	padding-bottom:14px!important;
}
.search-page-unscoped .grid-wrap > .media-card{
	margin-left:30px;
}
.search-page-unscoped .media-card .cover{
	width:150px;
	height:215px;
	margin-top:53px;
	z-index: 100;
}
.search-page-unscoped .data{
	margin-left: -150px;
}
.search-page-unscoped .genres{
	min-height:29px;
	z-index: 101;
	padding: 8px 5px!important;
	padding-bottom: 2px !important;
	font-size: 1rem!important;
	line-height: 1.15;
}
.search-page-unscoped .list-edit{
	z-index: 101;
}
.search-page-unscoped .airing-countdown{
	padding: 5px!important;
}
.search-page-unscoped .grid-wrap{
	grid-template-columns: repeat(auto-fill, 150px) !important;
}
.search-page-unscoped .media{
	grid-template-columns: repeat(auto-fill, 150px) !important;
	width:100%;
}
.search-page-unscoped .overlay .studio{
	margin-top: 2px!important;
	margin-bottom: -8px!important;
}
.search-page-unscoped .list-status{
	width: 20px!important;
	height: 20px!important;
}
.search-page-unscoped .media-card:nth-child(5){
	display: inline-grid!important;
}
	`;
}
if(useScripts.CSSsubmissionCounter){
	moreStyle.textContent += `
.submissions-wrap{
	counter-reset: acceptedCount partialCount pendingCount rejectedCount;
}
.submissions-wrap .submission .status.accepted{
	counter-increment: acceptedCount;
}
.submissions-wrap .submission .status.accepted::after{
	content: counter(acceptedCount);
}
.submissions-wrap .submission .status.pending{
	counter-increment: pendingCount;
}
.submissions-wrap .submission .status.pending::after{
	content: counter(pendingCount);
}
.submissions-wrap .submission .status.partially_accepted{
	counter-increment: partialCount;
}
.submissions-wrap .submission .status.partially_accepted::after{
	content: counter(partialCount);
}
.submissions-wrap .submission .status.rejected{
	counter-increment: rejectedCount;
}
.submissions-wrap .submission .status.rejected::after{
	content: counter(rejectedCount);
}
.submissions-wrap::after{
	content: "pending: " counter(pendingCount) ", accepted: " counter(acceptedCount) ", partially accepted: " counter(partialCount) ", rejected: " counter(rejectedCount);
}
	`;
}
if(useScripts.CSSprofileClutter){
	moreStyle.textContent += `
.overview .list-stats > .footer{
	display: none;
}
.overview > .section > .desktop:nth-child(2){
	display: none;
}
.overview > .section > .desktop:nth-child(3){
	display: none;
}
.overview > .section > .desktop.favourites{
	display: inherit;
}
	`;
}
if(useScripts.CSSfollowCounter){
	moreStyle.textContent += `
.user-social .user-follow > div.wrap{
	grid-template-columns: repeat(auto-fill,75px)!important;
	grid-template-rows: repeat(auto-fill,75px)!important;
}
body{
	counter-reset: followCount;
}
.user-social .user-follow .user{
	counter-increment: followCount;
}
.user-social .user-follow .user:nth-child(10n),
.user-social .user-follow .user:last-child{
	overflow: visible!important;
}
.user-social .user-follow .user:last-child::after{
	content: "Total: " counter(followCount);
	position: relative;
	left: 85px;
	top: -48px;
	opacity: 0.5;
}
	`;
}
if(useScripts.CSSgreenManga){
	moreStyle.textContent += `
.activity-manga_list > div > div > div > div > .title{
	color: rgba(var(--color-green))!important;
}
.media .relations .cover[href^="/manga/"] + div div{
	color: rgba(var(--color-green));
}
.media .relations .cover[href^="/anime/"] + div div{
	color: rgba(var(--color-blue));
}
.media .relations .cover[href^="/manga/"]{
	border-bottom-style: solid;
	border-bottom-color: rgba(var(--color-green));
	border-bottom-width: 2px;
}
.media .relations.small .cover[href^="/manga/"]::after{
	position:absolute;
	left:1px;
	bottom:3px;
	content:"";
	border-style: solid;
	border-color: rgba(var(--color-green));
	border-width: 2px;
}
.media .relations .cover[href^="/anime/"]{
	border-bottom-style: solid;
	border-bottom-color: rgba(var(--color-blue));
	border-bottom-width: 2px;
}
.media .relations .cover div.image-text{
	margin-bottom: 2px!important;
	border-radius: 0px!important;
	padding-bottom: 8px!important;
	padding-top: 8px!important;
	font-weight: 500!important;
}
	`;
}
if(useScripts.CSSexpandFeedFilters){
	moreStyle.textContent += `
.home .activity-feed-wrap .section-header .el-dropdown-menu {
    background: none;
    position: static;
    display: inline !important;
    margin-right: 15px;
    box-shadow: none !important;
}
.home .activity-feed-wrap .section-header .el-dropdown-menu__item {
    font-weight: normal;
    color: rgb(var(--color-text-lighter));
    margin-left: -2px !important;
    display: inline;
    font-size: 1.2rem;
    padding: 4px 15px 5px 15px;
    border-radius: 3px;
    transition: .2s;
}
.home .activity-feed-wrap .section-header .el-dropdown-menu__item.active{
    background: none!important;
    color: rgb(var(--color-blue));
}
.home .activity-feed-wrap .section-header .el-dropdown-menu__item:hover{
    background: none!important;
    color: rgb(var(--color-blue));
}
.home .feed-select .feed-filter{
    display: none;
}
	`;
}
if(useScripts.CSSverticalNav){
	moreStyle.textContent += `
.logo{
	margin-left: -60px!important;
/*the compact layout uses more of the space to the side, so we line up the logo to the left*/
}
.footer{
	margin-top: 0px !important;
/*less space wasted over the footer*/
}
.container{
	padding-left: 10px;
	padding-right: 0px;
}
.hide{
	top: 0px!important;
/*stop that top bar from jumping all over the place*/
}
.notification{
	margin-bottom: 10px!important;
}
/*Dropdown menus are site theme based*/
.quick-search .el-select .el-input .el-input__inner,
.quick-search .el-select .el-input.is-focus .el-input__inner,
.el-select-dropdown,
.el-dropdown-menu,
.el-dropdown-menu__item--divided::before{
	background: rgba(var(--color-foreground));
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover{
	background: rgba(159, 173, 189, .2);
}
.el-dropdown-menu__item--divided{
	border-color: rgba(var(--color-background));
}
.el-select-group__wrap:not(:last-of-type)::after{
	background: rgba(var(--color-foreground));
}
.el-popper[x-placement^="bottom"] .popper__arrow,
.el-popper[x-placement^="bottom"] .popper__arrow::after{
	border-bottom-color: rgba(var(--color-foreground));
}
.el-popper[x-placement^="top"] .popper__arrow,
.el-popper[x-placement^="top"] .popper__arrow::after{
	border-top-color: rgba(var(--color-foreground));
}
/*Additions to dark theme dropdown*/
.site-theme-dark .quick-search.el-select .el-input.el-input__inner,
.site-theme-dark .quick-search .el-select .el-input.is-focus .el-input__inner,
.site-theme-dark .el-select-dropdown,
.site-theme-dark .el-dropdown-menu,
.site-theme-dark .el-dropdown-menu__item--divided::before{
	background: rgba(17, 22, 29);
}
.site-theme-dark .el-select-group__wrap:not(:last-of-type)::after{
	background: rgba(17, 22, 29);
}
.site-theme-dark .el-popper[x-placement^="bottom"] .popper__arrow,
.site-theme-dark .el-popper[x-placement^="bottom"] .popper__arrow::after{
	border-bottom-color: rgba(17, 22, 29);
	opacity: 1;
}
.site-theme-dark .el-popper[x-placement^="top"] .popper__arrow,
.site-theme-dark .el-popper[x-placement^="top"] .popper__arrow::after{
	border-top-color: rgba(17, 22, 29);
	opacity: 1;
}

/*--------------VERTICAL-NAV----------------*/
/*code by Kuwabara: https://userstyles.org/styles/161017/my-little-anilist-theme-can-not-be-this-cute*/

div#nav{
	width: 65px;
	height: 100%;
	position: fixed!important;
	top: 0!important;
	left: 0!important;
	transition: none!important;
}
div#nav.transparent{
	background: rgba(var(--color-nav))!important;
}
.nav .wrap .links{
	font-size: 1rem;
	height: 355px;
	margin-left: 0px;
	padding-left: 0px;
	width: 65px;
	flex-direction: column;
}
.nav .wrap .links .link{
	width: 65px;
	padding: 5px 0px;
	margin-bottom: 10px;
	text-align: center;
	/*color: rgba(var(--color-blue),0.6);*/
	transition: 0.3s;
}
.nav .wrap .links .link:hover{
	background: rgba(var(--color-blue),0.1);
}
.nav .wrap .links .link::before{
	display: block;
	content: "";
	height: 24px;
	width: 65px;
	background-size: 24px;
	margin-left: 0;
	margin-bottom: 3px;
	background-repeat: no-repeat;
	background-position: center;
}
.nav .link[href="/home"]::before{
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAPFBMVEX////Nzc3MzMzMzMzMzMzMzMzNzc3Ozs7MzMzOzs7Nzc3Pz8/Nzc3Ozs7MzMzMzMzMzMzMzMz////MzMxhQh83AAAAFHRSTlMAkAWq/wrBFc8f4DDqP/VV+mkBjLrki9AAAADdSURBVHgB7dPVYcQAEMTQvfOa2e6/1jBnwgrPa0Bfil/IzOxwCIxwLDKLYwiMssozVRkEoW7yQlPHp2i7vNK1Ebx+yBtDH7hxyjumMWDzkvcsc6DWfGQNzransJN7ScWR20urSm4vram5vbSu5fbShp7bS5tGbi9tmcG9tBXcS9vRvfRy5F56OXIvvRy5l16O3EsvR+6llyP30suBe2kruJe2o3vp5ci99HLkXno5ci+9HLmXXo7cSy9H7qWXQ/d6+3L5TqE54MCfCcQDDjjggAMOOOCAA38wYGZmdgrh0DDL6hLpfgAAAABJRU5ErkJggg==);
}
.nav .link[href*="/user/"]::before{
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACeUlEQVR4Ae3bM7gcYRTG8Ylt22YT9XHSxnbS31vHtq0qdhPbOe/g7sS2bZ704XybnZ0zT87zry9+y48WxzwFKEABClCAAhQQZgpIVEImDtIL4jT3AgeRmaj0TwC/IG3BN+Lowjfa4hdMEnA5Dzzi6IN3OU9SACwhlhGWJAFATXwVA/iKmsYAmkgsqInGALiSAPCMAfReEoDemgNYVgpQQMwAT2mZ05Hq+gUvFPLqoDMtw7P4AG7awynXT+Oq3PZwuh0HwNbreX/3O6/nxSbpgNls/TnMFAzADs72NwBnwzahANyh/EHmUJQfd0QC7L5sBcvuKxCA65w9KICz0zV5gJlsBQ+z5AHamQCorTiAW9sE4NYWB7hc2ARwubA4gF/QBOAX1JdQqgHU1gTgtBEHwAwTAGbIA1w3AQj8IiNG78CPf++4D+buSh1Obws0nN4R7wnNrFhPKWlrLCb1NIJy/bzbQCPodoyWVbAcnanuhULyl1VCSAEKUIACFPAAx3GQdmEeRtEYWo1j9CAOgNvYiKnoapf69SjUbWB3xyK6IBCAS1hEbYOuzfllMRQnpABe0hyvDlvmeXVoDj2JFIAPmHe+BFvJdzmPPRA3ogF8wrhA/3wABEbRp3QDLrgN2EpdbgNy0gnIMn/sAzwPa9MEwI1EGbZSH+XC3jQA8M1pylY4JcrQi/ABy9kKL5oUOsBuFSbAbR46IKtYmICsYqED2Ao3IQAFKECnlApQwCtRgFf/39FjTBYFmGwMsKtIOn5PlZO5ALFYDGBJsldQ3FhfQWHLL4jNUV8CwmazS0A/RZUpI5prWHSAMqiyXoQTkALEpgAFKEABClDAd65sWJtplkTeAAAAAElFTkSuQmCC);
}
.nav .link[href*="/animelist"]::before{
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAQMAAADYVuV7AAAABlBMVEX////MzMw46qqDAAAAAXRSTlMAQObYZgAAAB1JREFUeAFjAIFR8P8//38Q+DAcOBAwGgajYTAKAIVtfpATE/21AAAAAElFTkSuQmCC);
}
.nav .link[href*="/mangalist"]::before{
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAQMAAADYVuV7AAAABlBMVEX////MzMw46qqDAAAAAXRSTlMAQObYZgAAAB1JREFUeAFjAIFR8P8//38Q+DAcOBAwGgajYTAKAIVtfpATE/21AAAAAElFTkSuQmCC);
}
.nav .link[href="/search/manga"]::before,
.nav .link[href="/search/anime"]::before{
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAQMAAADYVuV7AAAABlBMVEX////MzMw46qqDAAAAAXRSTlMAQObYZgAAACRJREFUeAFjAIFR8P//h/8g8IFUzigHEoCkcSCIeM4ohzwwCgAUe7MQS689CwAAAABJRU5ErkJggg==);
}
.nav .link[href*="/forum"]::before{
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAANlBMVEX////U1NTNzc3MzMzMzMzS0tLMzMzOzs7MzMzNzc3MzMzNzc3MzMzMzMzNzc3MzMzNzc3R0dEFv6PyAAAAEnRSTlMAGLPs/xHmFaCi6+Wh7bIZgBYCtFDnAAAAw0lEQVR4Ae3VhW0EQRTAUN8t80//xYZxRaOJHPxu4IlNlmXvulybtqLmeqGorm8r6wdKGtvqJkqa64GZktpP9JOABBJIIIHTIwTg9AgRaCcbmG2g/XIggQQSSCCBBBJYbGCVgb5TgW0/qAGC8mqAwAUCFwhcIHCBwAUCFwhcIHiuragACFwgcIHABQIXCFwgcIFABs4tNjDawE0vAxz7JgD1xRmwBWwBW8AWsAVsAVvAFrAFbAFbwBawBWwBueC1LMvuACDgQjDhWhbNAAAAAElFTkSuQmCC);
}
div#nav.transparent{
	background: #1f2631!important;
}
#app{
	margin-top: 0;
	padding-left: 65px;
}
.nav .user{
	position: fixed;
	top: 0;
	display: grid;
	grid-gap: 40px;
	width: 65px;
	grid-template-rows: 50px 20px;
}
.search .dropdown.el-dropdown{
	font-size: 10px;
}
.search .el-dropdown-link svg{
	width: 65px;
	height: 23px;
	padding: 5px 0;
	background: rgba(0, 0, 0, 0.2);
}
.nav .search{
	width: 65px;
	margin: 0;
	text-align: center;
	position: fixed;
	top: 56px;
}
.quick-search-results{
	z-index: 999!important;
	top: 136px!important;
}
.user .avatar:hover+.chevron{
	opacity: 0!important;
}
.hide{
	top:0px!important;
}

/*-------------------*/
::selection{
	background: rgba(var(--color-blue),0.4);
}
::-webkit-selection{
	background: rgba(var(--color-blue),0.4);
}
::-moz-selection{
	background: rgba(var(--color-blue),0.4);
}
::-webkit-scrollbar{
	width: 7px;
	height: 7px;
}
::-webkit-scrollbar-thumb{
	background: #4e4e4e!important;
}
#app{
	overflow:unset;
}
.user .header-wrap{
	position: sticky;
	top: -332px;
	z-index: 100;
}
.list-stats{
	margin-bottom:0px!important;
}
.activity-feed-wrap{
	margin-top:25px;
}
.logo{
	position: absolute;
	margin-bottom: -500px;
	display:none!important;
	margin-left: 0px !important;
}
/*home stuff*/

.reply .header a.name[href="/user/Abyss/"]::after{
	content: "Prima Undine";
	margin-left:10px;
	padding:3px;
	border-radius:2px;
	animation-duration: 20s;
	animation-iteration-count: infinite;
	animation-name: rainbow;
	animation-timing-function: ease-in-out;
	color: rgba(var(--color-white));
}
.reply .header a.name[href="/user/Taluun/"]::after{
	content: "Best Friend";
	margin-left:10px;
	padding:3px;
	border-radius:2px;
	animation-duration: 20s;
	animation-iteration-count: infinite;
	animation-name: rainbow;
	animation-timing-function: ease-in-out;
	color: rgba(var(--color-white));
}
.details > .donator-badge{
	left:105px!important;
	padding:2px!important;
	top: 100%!important;
	-ms-transform: translate(0px, -34px);
	-webkit-transform: translate(0px, -34px);
	transform: translate(0px, -34px);
}
.activity-text > div > div > div > .donator-badge{
	position:relative!important;
	display:inline-block!important;
	left:0px!important;
	top:-10px!important;
	-ms-transform: translate(0px, 0px);
	-webkit-transform: translate(0px, 0px);
	transform: translate(0px, 0px);
}
.activity-replies{
	margin-top:5px!important;
	margin-left:30px!important;
	margin-right:0px!important;
}
.activity-entry{
	margin-bottom: 10px!important;
}
.list-preview{
	grid-gap: 10px!important;
	padding:0px!important;
	background: rgb(0,0,0,0)!important;
}
.home{
	grid-column-gap: 30px!important;
	margin-top: 20px!important;
	grid-template-columns: auto 470px!important;
}
.activity-feed .reply{
	padding:8px!important;
	margin-bottom: 5px!important;
}
.list .details{
	padding-left:10px!important;
	padding-top:5px!important;
	padding: 10px 16px!important;
	padding-bottom: 7px !important;
}
.search{
	margin-top:0px!important;
}
.emoji-spinner{
	display:none!important;
}
.wrap{
	border-radius: 2px!important;
}
.name{
	margin-left: 0px!important;
}
.activity-text > div > div > div > .name{
	margin-left: 12px!important;
}
.button{
	margin-right: 5px!important;
}
.actions{
	margin-bottom: 5px!important;
	bottom: 0px!important;
}
.status{
	display: inline-block!important;
}
.avatar{
	display: block!important;
}

/*https://anilist.co/activity/29333544*/
.activity-entry .header a:nth-child(1){
	display: inline-block!important;
}
.wrap > .list{
	min-height: 80px!important;
	grid-template-columns: 60px auto!important;
}
.popper__arrow{
	display: none!important;
}
.media-preview{
	grid-gap: 10px!important;
	padding: 0px!important;
	background: rgb(0,0,0,0)!important;
}
.media-preview-card{
	display: inline-grid!important;
}
.replies > .count{
	color: rgba(var(--color-blue));
}
.action.likes{
	color: unset;
}
.like-wrap > .button:hover{
	color: rgba(var(--color-red));
}
.replies > *:nth-child(2){
	color: rgba(var(--color-blue));
}
.actions{
	cursor: default;
}
.activity-manga_list > div > div > div > div > .title{
	color: rgba(var(--color-green))!important;
}
.markdown-editor > [title="Image"],
.markdown-editor > [title="Youtube Video"],
.markdown-editor > [title="WebM Video"]{
	color: rgba(var(--color-red));
}
.markdown-editor > div > svg{
	min-width: 1em!important;
}
.feed-select .toggle > div.active[data-v-f37b0a84]{
	color: rgba(var(--color-blue))!important;
}
.home .details .status:first-letter,
.social .details .status:first-letter {
	text-transform:lowercase;
}
.activity-edit .markdown-editor,
.activity-edit .input{
	margin-bottom: 10px!important;
}
.activity-edit .actions{
	margin-bottom: 25px!important;
}
.like-wrap .users{
	overflow-y: scroll!important;
}
.page-content .container .home.full-width{
	grid-template-columns: unset !important;
}
.activity-text .text {
	border-left: solid 5px rgba(var(--color-blue));
}
.section-header{
	padding-left:0px!important;
}
.cover[href="/anime/440/Shoujo-Kakumei-Utena/"] + .details{
	border-color: #eb609e;
	border-width: 4px;
	border-style: solid;
	border-left-width: 0px;
}
.sticky .avatar, .sticky .body-preview,
.sticky .categories, .sticky .name{
	display: none!important;
}
.search > .filter,
.search > .preview{
	margin-top: 20px;
}
	`;
}
if(useScripts.CSSdecimalPoint){
	moreStyle.textContent += `
.medialist.POINT_10_DECIMAL .score[score="10"]::after,
.medialist.POINT_10_DECIMAL .score[score="9"]::after,
.medialist.POINT_10_DECIMAL .score[score="8"]::after,
.medialist.POINT_10_DECIMAL .score[score="7"]::after,
.medialist.POINT_10_DECIMAL .score[score="6"]::after,
.medialist.POINT_10_DECIMAL .score[score="5"]::after,
.medialist.POINT_10_DECIMAL .score[score="4"]::after,
.medialist.POINT_10_DECIMAL .score[score="3"]::after,
.medialist.POINT_10_DECIMAL .score[score="2"]::after,
.medialist.POINT_10_DECIMAL .score[score="1"]::after{
	margin-left:-4px;
	content: ".0";
}
	`;
}
if(useScripts.CSSsmileyScore){
	moreStyle.textContent += `
.fa-frown{
	color: red;
}

.fa-smile{
	color: green;
}
	`;
}
if(useScripts.limitProgress8){
	moreStyle.textContent += `
.home:not(.full-width) .media-preview-card:nth-child(n+9){
    display:none!important;
}
	`;
}
else if(useScripts.limitProgress10){
	moreStyle.textContent += `
.home:not(.full-width) .media-preview-card:nth-child(n+11){
    display:none!important;
}
	`;
}

documentHead.appendChild(moreStyle);

const queryMediaList = `
query ($name: String!, $listType: MediaType) {
  MediaListCollection (userName: $name, type: $listType) {
    lists {
      name
      isCustomList
      entries {
	... mediaListEntry
      }
    }
  }
}

fragment mediaListEntry on MediaList {
  mediaId
  status
  progress
  progressVolumes
  repeat
  notes
  startedAt {
    year
    month
    day
  }
  media {
    episodes
    chapters
    volumes
    duration
    nextAiringEpisode {
      episode
    }
    format
    title {
      romaji
    }
    tags {
      name
    }
    genres
  }
  scoreRaw: score (format: POINT_100)
}
`;

const queryMediaListNotes = `
query ($name: String!, $listType: MediaType) {
  MediaListCollection (userName: $name, type: $listType) {
    lists {
      entries {
	... mediaListEntry
      }
    }
  }
}

fragment mediaListEntry on MediaList {
  mediaId
  notes
}
`;

const queryActivity = `
query ($id: Int!) {
  Activity(id: $id) {
    ... on TextActivity {
      id
      userId
      type
      text
      user {
	id
	name
	avatar {
	  large
	}
      }
      likes {
	id
      }
      replies {
	text(asHtml: true)
	user {
	  name
	}
	likes {
	  name
	}
      }
    }
    ... on ListActivity {
      id
      userId
      type
      status
      progress
      user {
	id
	name
	avatar {
	  large
	}
      }
      media {
	coverImage {
	  large
	}
      }
      likes {
	id
      }
      replies {
	text(asHtml: true)
	user {
	  name
	}
	likes {
	  name
	}
      }
    }
    ... on MessageActivity {
      id
      type
      likes {
	id
      }
      replies {
	text(asHtml: true)
	user {
	  name
	}
	likes {
	  name
	}
      }
    }
  }
}
`;

const queryAuthNotifications = `
query ($page: Int,$name: String) {
  User (name: $name){
    unreadNotificationCount
  }
  Page (page: $page){
    notifications {
      ... on AiringNotification {
        type
      }
      ... on FollowingNotification {
        type
      }
      ... on ActivityMessageNotification {
        type
      }
      ... on ActivityMentionNotification {
        type
      }
      ... on ActivityReplyNotification {
        type
      }
      ... on ActivityLikeNotification {
        type
      }
      ... on ActivityReplyNotification {
        type
      }
      ... on ActivityReplyLikeNotification {
        type
      }
      ... on ThreadCommentMentionNotification {
        type
      }
      ... on ThreadCommentReplyNotification {
        type
      }
      ... on ThreadCommentSubscribedNotification {
        type
      }
      ... on ThreadCommentLikeNotification {
        type
      }
      ... on ThreadLikeNotification {
        type
      }
    }
  }
}
`;

let APIlimit = 90;
let APIcallsUsed = 0;//this is NOT a reliable way to figure out how many more calls we can use, just a way to set some limit
var pending = {};
var APIcounter = setTimeout(function(){
	APIcallsUsed = 0;
},60*1000);//reset counter every minute

var activityCache = {};//reduce API calls even if localStorage is not available.

var handleResponse = function(response){
	APIlimit = response.headers.get("x-ratelimit-limit");
	APIcallsUsed = APIlimit - response.headers.get("x-ratelimit-remaining");
	return response.json().then(function(json){
		return (response.ok ? json : Promise.reject(json));
	});
};
const url = "https://graphql.anilist.co";//Current Anilist API location
const authUrl = "https://anilist.co/api/v2/oauth/authorize?client_id=1933&response_type=token";

function safeURL(URL){
	return URL.replace(/\s|\//g,"-");
}

Number.prototype.roundPlaces = function(places){
	return +(
		Math.round(
			this * Math.pow(10,places)
		) / Math.pow(10,places)
	);
}

function listActivityCall(query,variables,callback,vars,cache){
/*
query, graphql request
vars, just, values to pass on to the callback function
cache::true, use cached data if available
cache::false, allways fetch new data
*/
	let handleData = function(data){
		pending[variables.id] = false;
		if(localStorageAvailable){
			localStorage.setItem(variables.id + "",JSON.stringify(data));
			aniscriptsUsed.keys.push(variables.id);
			if(aniscriptsUsed.keys.length > 1000){//don't hog too much of localStorage
				localStorage.removeItem(aniscriptsUsed.keys[0]);
				aniscriptsUsed.keys.shift();
			}
			localStorage.setItem("aniscriptsUsed",JSON.stringify(aniscriptsUsed));
		}
		else{
			activityCache[variables.id] = data;//still useful even if we don't have localstorage
		}
		callback(data,vars);
	};
	let options = {//generic headers provided by API examples
		"method" : "POST",
		"headers" : {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		"body" : JSON.stringify({
			"query": query,
			"variables": variables
		})
	};
	if(localStorageAvailable && cache){
		let localStorageItem = localStorage.getItem(variables.id + "");
		if(!(localStorageItem === null)){
			callback(JSON.parse(localStorageItem),vars);
			return;
		}
	}
	else if(activityCache.hasOwnProperty(variables.id) && cache){
		callback(activityCache[variables.id],vars);
		return;
	}
	var handleError = function(error){
		console.error(error,query,variables);
	};
	fetch(url,options).then(handleResponse).then(handleData).catch(handleError);
	APIcallsUsed++;
};

function generalAPIcall(query,variables,callback){//has no cache stuff to worry about, use this for all other calls to the API
	let handleData = function(data){
		callback(data,variables);
	};
	let options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({
			"query": query,
			"variables": variables
		})
	};
	var handleError = function(error){
		console.error(error,query,variables);
	};
	fetch(url,options).then(handleResponse).then(handleData).catch(handleError);
	APIcallsUsed++;
}

function authAPIcall(query,variables,callback){//only use for auth
	let handleData = function(data){
		callback(data,variables);
	};
	let options = {
		method: "POST",
		headers: {
			"Authorization": "Bearer " + useScripts.accessToken,
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({
			"query": query,
			"variables": variables
		})
	};
	var handleError = function(error){
		console.error(error);
		error.errors.forEach(function(thing){
			if(thing.message === "Invalid token"){
				useScripts.accessToken = "";
				localStorage.setItem("hohSettings",JSON.stringify(useScripts));
				console.log("access token retracted");
			};
		});
	};
	fetch(url,options).then(handleResponse).then(handleData).catch(handleError);
	APIcallsUsed++;
}

function enhanceSocialTab(){
	if(!document.URL.match(/^https:\/\/anilist\.co\/(anime|manga)\/\d*\/[\w\-]*\/social/)){
		return;
	}
	var listOfActs = Array.from(document.getElementsByClassName("activity-entry"));
	listOfActs.forEach(function(act){//compress activities without comments, they are all the same media entry anyway
		if(
			!act.hasOwnProperty("marked") &&
			!(act.children[0].children[2].children[0].children.length > 1)
		){
			act.marked = true;
			act.children[0].children[0].removeChild(act.children[0].children[0].children[0]);//remove cover image
			var elements = act.children[0].children[0].children[0].children;
			elements[2].parentNode.insertBefore(elements[2],elements[0]);//move profile picture to the beginning of the line
			elements[0].parentNode.parentNode.style.minHeight = "70px";
			elements[0].parentNode.classList.add("hohSocialTabActivityCompressedContainer");
			elements[0].style.verticalAlign = "bottom";
			elements[0].style.marginTop = "0px";
			elements[1].classList.add("hohSocialTabActivityCompressedName");
			elements[2].classList.add("hohSocialTabActivityCompressedStatus");
			act.style.marginBottom = "10px";
		}
	});
/*add average score to social tab*/
	var listOfFollowers = Array.from(document.getElementsByClassName("follow"));
	let averageScore = 0;
	let averageCount = 0;
	listOfFollowers.forEach(function(follower){
		if(
			follower.children.length === 4
		){
			if(follower.children[3].nodeName != "svg"){
				const followScore = follower.children[3].innerText.match(/\d+\.?\d*/g);
				if(followScore && followScore.length === 2){
					averageScore += 100*followScore[0]/followScore[1];
					averageCount++;
				}
				else if(followScore && followScore.length === 1){//star rating
					averageScore += (followScore[0]*20 - 10);
					averageCount++;
				}
			}
			else{//do count smiley scores, but with lower confidence
				const smileyScore = follower.children[3].dataset.icon;
				if(smileyScore === "frown"){
					averageScore += (45)*0.5;
					averageCount += 0.5;
				}
				else if(smileyScore === "meh"){
					averageScore += (60)*0.5;
					averageCount += 0.5;
				}
				else if(smileyScore === "smile"){
					averageScore += (85)*0.5;
					averageCount += 0.5;
				}
			}
		}
	});
	if(averageCount){
		averageScore = averageScore/averageCount;
		var locationForIt = document.getElementById("averageScore");
		if(!locationForIt){
			locationForIt = document.createElement("span");
			locationForIt.id = "averageScore";
			document.getElementsByClassName("following")[0].insertBefore(
				locationForIt,
				document.getElementsByClassName("following")[0].children[0]
			);
		}
		locationForIt.innerHTML = "average: " + averageScore.roundPlaces(1) + "/100";//fix rounding later
	}
/*end average score*/
	setTimeout(function(){
		if(document.URL.match(/^https:\/\/anilist\.co\/(anime|manga)\/\d*\/[\w\-]*\/social/)){
			enhanceSocialTab();
		}
	},100);
}

function enhanceForum(){//purpose: reddit-style comment three collapse button
	if(!document.URL.match(/^https:\/\/anilist\.co\/forum\/thread\/.*/)){
		return;
	}
	var comments = Array.from(document.getElementsByClassName("comment-wrap"));
	comments.forEach(function(comment){
		if(!comment.hasOwnProperty("hohVisited")){
			comment.hohVisited = true;
			let hider = document.createElement("span");
			hider.innerText = "[-]";
			hider.classList.add("hohForumHider");
			hider.onclick = function(){
				let parentComment = this.parentNode.parentNode;
				if(this.innerHTML === "[-]"){
					this.innerText = "[+]";
					parentComment.children[1].style.display = "none";
					if(parentComment.parentNode.children.length > 1){
						parentComment.parentNode.children[1].style.display = "none";
					}
				}
				else{
					this.innerText = "[-]";
					parentComment.children[1].style.display = "block";
					if(parentComment.parentNode.children.length > 1){
						parentComment.parentNode.children[1].style.display = "block";
					}
				}
			};
			comment.children[0].children[0].insertBefore(
				hider,
				comment.children[0].children[0].children[0]
			);
		}
	});
	setTimeout(function(){
		if(document.URL.match(/^https:\/\/anilist\.co\/forum\/thread\/.*/)){
			enhanceForum();
		}
	},100);
}

function dubMarker(){
	if(!document.URL.match(/^https:\/\/anilist\.co\/anime\/.*/)){
		return;
	}
	if(document.getElementById("dubNotice")){
		return;
	}
	const variables = {
		id: document.URL.match(/\/anime\/(\d+)\//)[1],
		page: 1,
		language: useScripts.dubMarkerLanguage.toUpperCase()
	};
	const query = `
query ($id: Int!, $type: MediaType, $page: Int = 1, $language: StaffLanguage) {
  Media(id: $id, type: $type) {
    characters(page: $page, sort: [ROLE], role: MAIN) {
      edges {
	node {
	  id
	}
	voiceActors (language: $language) {
	  language
	}
      }
    }
  }
}
	`;
	let dubCallback = function(data){
		if(!document.URL.match(/^https:\/\/anilist\.co\/anime\/.*/)){
			return;
		};
		let dubNoticeLocation = document.getElementsByClassName("sidebar");
		if(!dubNoticeLocation.length){
			setTimeout(function(){
				dubCallback(data);
			},200);
			return;
		}
		if(data.data.Media.characters.edges.reduce(
			(actors,a) => actors + a.voiceActors.length,0
		)){//any voice actors for this language?
			if(document.getElementById("dubNotice")){
				return;
			}
			let dubNotice = document.createElement("p");
			dubNotice.id = "dubNotice";
			dubNotice.innerText = useScripts.dubMarkerLanguage + " dub available";
			dubNoticeLocation[0].insertBefore(dubNotice,dubNoticeLocation[0].firstChild);
		}
	};
	generalAPIcall(query,variables,dubCallback);
}

function enhanceStaff(){//currently only adds a favourite count
	if(!document.URL.match(/^https:\/\/anilist\.co\/staff\/.*/)){
		return;
	}
	let filterGroup = document.getElementsByClassName("content");
	if(!filterGroup.length){
		setTimeout(function(){
			enhanceStaff();
		},200);//may take some time to load
		return;
	}
	filterGroup = filterGroup[0];
	let favCount = document.createElement("span");
	favCount.id = "hohFavCount";
	favCount.innerText;
	filterGroup.appendChild(favCount);
	const variables = {id: document.URL.match(/\/staff\/(\d+)\//)[1]};
	const query = "query($id: Int!){Staff(id: $id){favourites}}";
	let favCallback = function(data){
		let favButton = document.getElementsByClassName("favourite");
		if(data.data.Staff.favourites === 0 && favButton[0].classList.contains("isFavourite")){//safe to assume
			document.getElementById("hohFavCount").innerText = data.data.Staff.favourites+1;
		}
		else{
			document.getElementById("hohFavCount").innerText = data.data.Staff.favourites;
		}
		if(favButton.length){
			favButton[0].onclick = function(){
				if(this.classList.contains("isFavourite")){
					favCount.innerText = Math.max(parseInt(favCount.innerText)-1,0);//0 or above, just to avoid looking silly
				}
				else{
					favCount.innerText = parseInt(favCount.innerText)+1;
				}
			};
		}
	};
	generalAPIcall(query,variables,favCallback);
}

function replaceStaffRoles(){
	let URLstuff = document.URL.match(/^https:\/\/anilist\.co\/staff\/(\d+)\/.*/);
	if(!URLstuff){
		return;
	};
	if(document.getElementById("hoh-media-roles")){
		return;
	};
	let insertParent = document.querySelector(".media-roles");
	if(!insertParent){
		setTimeout(replaceStaffRoles,200);
		return;
	};
	let hohMediaRoles = document.createElement("div");
	hohMediaRoles.id = "hoh-media-roles";
	let hohMediaRolesAnimeHeader = document.createElement("h4");
	hohMediaRolesAnimeHeader.innerText = "Anime";
	hohMediaRolesAnimeHeader.style.display = "none";
	let hohMediaRolesAnime = document.createElement("div");
	hohMediaRolesAnime.setAttribute("data-v-09607311","");
	hohMediaRolesAnime.classList.add("grid-wrap");
	hohMediaRolesAnime.style.margin = "10px";
	let hohMediaRolesMangaHeader = document.createElement("h4");
	hohMediaRolesMangaHeader.innerText = "Manga";
	hohMediaRolesMangaHeader.style.display = "none";
	let hohMediaRolesManga = document.createElement("div");
	hohMediaRolesManga.setAttribute("data-v-09607311","");
	hohMediaRolesManga.classList.add("grid-wrap");
	hohMediaRolesManga.style.margin = "10px";
	hohMediaRoles.appendChild(hohMediaRolesAnimeHeader);
	hohMediaRoles.appendChild(hohMediaRolesAnime);
	hohMediaRoles.appendChild(hohMediaRolesMangaHeader);
	hohMediaRoles.appendChild(hohMediaRolesManga);

	let hohMediaSort = document.createElement("div");
	let sortText = document.createElement("span");
	sortText.innerText = "Sort ";
	let filterText = document.createElement("span");
	filterText.innerText = " Filter ";
	let sortSelect = document.createElement("select");
	let filterSelect = document.createElement("select");
	hohMediaSort.appendChild(sortText);
	let sortOptionAlpha = document.createElement("option");
	sortOptionAlpha.innerText = "Alphabetical";
	sortOptionAlpha.value = "alphabetical";
	let sortOptionChrono = document.createElement("option");
	sortOptionChrono.innerText = "Chronological";
	sortOptionChrono.value = "chronological";
	let sortOptionPopularity = document.createElement("option");
	sortOptionPopularity.innerText = "Popularity";
	sortOptionPopularity.value = "popularity";
	let sortOptionLength = document.createElement("option");
	sortOptionLength.innerText = "Length";
	sortOptionLength.value = "length";
	sortSelect.appendChild(sortOptionAlpha);
	sortSelect.appendChild(sortOptionChrono);
	sortSelect.appendChild(sortOptionPopularity);
	sortSelect.appendChild(sortOptionLength);
	hohMediaSort.appendChild(sortSelect);
	hohMediaSort.appendChild(filterText);
	const filters = ["All","Director","Script","Storyboard","Animation Director","Episode Director","Art Director","Key Animation","Music","Original Creator","Character Design","Mechanical Design","Background Art","Story & Art","Story","Art"];
	filters.forEach(function(filter){
		let filterOption = document.createElement("option");
		filterOption.innerText = filter;
		filterOption.value = filter;
		filterSelect.appendChild(filterOption);
	});
	hohMediaSort.appendChild(filterSelect);
	sortSelect.value = useScripts.staffRoleOrder;
	hohMediaSort.style.marginBottom = "10px";
	let initPerformed = false;
	let UIinit = function(){
		initPerformed = true;
		insertParent.insertBefore(hohMediaRoles,insertParent.children[0]);
		insertParent.insertBefore(hohMediaSort,insertParent.children[0]);
		for(var i=2;i<insertParent.children.length;i++){
			insertParent.children[i].style.display = "none";
		};
	};
	let animeRolesList = [];
	let mangaRolesList = [];
	let animeAliasesToLookFor = [];
	let mangaAliasesToLookFor = [];
	if(useScripts.shortRomaji){
		shortRomaji.forEach(function(alias){
			let matches = alias[0].match(/\/(anime|manga)\/(\d+)\//);
			if(matches[1] === "anime"){
				animeAliasesToLookFor.push([parseInt(matches[2]),alias[1]]);
			}
			else{
				mangaAliasesToLookFor.push([parseInt(matches[2]),alias[1]]);
			};
		});
	};
	if(localStorageAvailable){
		const titleAliases = JSON.parse(localStorage.getItem("titleAliases"));
		if(titleAliases){
			titleAliases.forEach(function(alias){
				let matches = alias[0].match(/\/(anime|manga)\/(\d+)\//);
				if(matches){
					if(matches[1] === "anime"){
						animeAliasesToLookFor.push([parseInt(matches[2]),alias[1]]);
					}
					else{
						mangaAliasesToLookFor.push([parseInt(matches[2]),alias[1]]);
					};
				};
			});
		}
	};
	let listRenderer = function(){
		if(animeRolesList.length + mangaRolesList.length < 2){
			return;
		};
		if(!initPerformed){
			UIinit();
		};
		useScripts.staffRoleOrder = sortSelect.value;
		localStorage.setItem("hohSettings",JSON.stringify(useScripts));
		if(sortSelect.value === "alphabetical"){
			animeRolesList.sort(function(a,b){return a.title.localeCompare(b.title)});
			mangaRolesList.sort(function(a,b){return a.title.localeCompare(b.title)});
		}
		else if(sortSelect.value === "chronological"){
			animeRolesList.sort(function(a,b){
				if(a.startDate.year === b.startDate.year){
					if(a.startDate.month === b.startDate.month){
						if(a.startDate.day === b.startDate.day){
							return 1;
						}
						else{
							return a.startDate.day - b.startDate.day;
						};
					}
					else{
						return a.startDate.month - b.startDate.month;
					};
				}
				else{
					return a.startDate.year - b.startDate.year;
				};
			});
			mangaRolesList.sort(function(a,b){
				if(a.startDate.year === b.startDate.year){
					if(a.startDate.month === b.startDate.month){
						if(a.startDate.day === b.startDate.day){
							return 1;
						}
						else{
							return a.startDate.day - b.startDate.day;
						};
					}
					else{
						return a.startDate.month - b.startDate.month;
					};
				}
				else{
					return a.startDate.year - b.startDate.year;
				};
			});
		}
		else if(sortSelect.value === "popularity"){
			animeRolesList.sort(function(b,a){return a.popularity - b.popularity});
			mangaRolesList.sort(function(b,a){return a.popularity - b.popularity});
		}
		else if(sortSelect.value === "length"){
			animeRolesList.sort(function(b,a){
				if(a.episodes === b.episodes){
					return a.duration - b.duration
				}
				else{
					return a.episodes - b.episodes
				};
			});
			mangaRolesList.sort(function(b,a){return a.chapters - b.chapters});
		};
		const randomData = "data-v-2bb4b515";
		if(animeRolesList.length){
			hohMediaRolesAnimeHeader.style.display = "inline";
		}
		else{
			hohMediaRolesAnimeHeader.style.display = "none";
		}
		if(mangaRolesList.length){
			hohMediaRolesMangaHeader.style.display = "inline";
		}
		else{
			hohMediaRolesMangaHeader.style.display = "none";
		}
		while(hohMediaRolesAnime.childElementCount){
			hohMediaRolesAnime.removeChild(hohMediaRolesAnime.lastChild);
		};
		animeRolesList.forEach(function(anime){
			let foundRole = false;
			if(filterSelect.value === "All"){
				foundRole = true;
			}
			else{
				for(var i=0;i<anime.role.length;i++){
					if(anime.role[i].match(filterSelect.value) && !anime.role[i].match(" " + filterSelect.value)){
						foundRole = true;
						break;
					};
				};
			};
			if(foundRole){
				let roleCard = document.createElement("div");
				roleCard.classList.add("role-card");
				roleCard.classList.add("view-media");
				roleCard.setAttribute(randomData,"");
				let media = document.createElement("div");
				media.classList.add("media");
				media.setAttribute(randomData,"");
				let cover = document.createElement("a")
				cover.classList.add("cover");
				cover.href = "/anime/" + anime.id + "/" + safeURL(anime.title);
				cover.style.backgroundImage = "url(" + anime.image + ")";
				cover.setAttribute(randomData,"");
				let content = document.createElement("a");
				content.classList.add("content");
				content.href = "/anime/" + anime.id + "/" + safeURL(anime.title);
				content.setAttribute(randomData,"");
				let name = document.createElement("div");
				name.classList.add("name");
				name.innerText = anime.title;
				name.setAttribute(randomData,"");
				let role = document.createElement("div");
				role.classList.add("role");
				role.innerText = anime.role[0];
				for(var i=1;i<anime.role.length;i++){
					role.innerText += ", " + anime.role[i];
				};
				role.setAttribute(randomData,"");
				content.appendChild(name);
				content.appendChild(role);
				media.appendChild(cover);
				media.appendChild(content);
				roleCard.appendChild(media);
				hohMediaRolesAnime.appendChild(roleCard);
			};
		});
		while(hohMediaRolesManga.childElementCount){
			hohMediaRolesManga.removeChild(hohMediaRolesManga.lastChild);
		};
		mangaRolesList.forEach(function(manga){
			let foundRole = false;
			if(filterSelect.value === "All"){
				foundRole = true;
			}
			else{
				for(var i=0;i<manga.role.length;i++){
					if(manga.role[i].match(filterSelect.value)){
						foundRole = true;
						break;
					};
				};
			};
			if(foundRole){
				let roleCard = document.createElement("div");
				roleCard.classList.add("role-card");
				roleCard.classList.add("view-media");
				roleCard.setAttribute(randomData,"");
				let media = document.createElement("div");
				media.classList.add("media");
				media.setAttribute(randomData,"");
				let cover = document.createElement("a")
				cover.classList.add("cover");
				cover.href = "/manga/" + manga.id + "/" + safeURL(manga.title);
				cover.style.backgroundImage = "url(" + manga.image + ")";
				cover.setAttribute(randomData,"");
				let content = document.createElement("a");
				content.classList.add("content");
				content.href = "/manga/" + manga.id + "/" + safeURL(manga.title);
				content.setAttribute(randomData,"");
				let name = document.createElement("div");
				name.classList.add("name");
				name.innerText = manga.title;
				name.setAttribute(randomData,"");
				let role = document.createElement("div");
				role.classList.add("role");
				role.innerText = manga.role[0];
				for(var i=1;i<manga.role.length;i++){
					role.innerText += ", " + manga.role[i];
				};
				role.setAttribute(randomData,"");
				content.appendChild(name);
				content.appendChild(role);
				media.appendChild(cover);
				media.appendChild(content);
				roleCard.appendChild(media);
				hohMediaRolesManga.appendChild(roleCard);
			};
		});
	};
	sortSelect.oninput = listRenderer;
	filterSelect.oninput = listRenderer;
	let animeHandler = function(data){
		if(data.data.Staff.staffMedia.pageInfo.currentPage === 1){
			for(var i=2;i<=data.data.Staff.staffMedia.pageInfo.lastPage;i++){
				let variables = {
					page: i+0,
					type: "ANIME",
					id: URLstuff[1]
				};
				generalAPIcall(staffQuery,variables,animeHandler);
			};
		};
		data.data.Staff.staffMedia.edges.forEach(function(edge){
			let anime = {
				role: [edge.staffRole],
				title: edge.node.title.romaji,
	                        image: edge.node.coverImage.large,
	                        startDate: edge.node.startDate,
	                        id: edge.node.id,
	                        episodes: edge.node.episodes,
	                        popularity: edge.node.popularity,
				duration: edge.node.duration
			};
			if(useScripts.titleLanguage === "Native" && edge.node.title.native){
				anime.title = edge.node.title.native;
			}
			else if(useScripts.titleLanguage === "English" && edge.node.title.english){
				anime.title = edge.node.title.english;
			};
			animeAliasesToLookFor.forEach(function(alias){
				if(alias[0] === anime.id){
					anime.title = alias[1];
				};
			});
			animeRolesList.push(anime);
		});
		animeRolesList.sort(function(a,b){return a.id - b.id});
		for(var i=1;i<animeRolesList.length;i++){//remove duplicates
			if(animeRolesList[i].id === animeRolesList[i-1].id){
				animeRolesList[i-1].role = animeRolesList[i-1].role.concat(animeRolesList[i].role);//join roles
				animeRolesList.splice(i,1);
				i--;
			};
		};
		listRenderer();
	};
	let mangaHandler = function(data){
		if(data.data.Staff.staffMedia.pageInfo.currentPage === 1){
			for(var i=2;i<=data.data.Staff.staffMedia.pageInfo.lastPage;i++){
				let variables = {
					page: i+0,
					type: "MANGA",
					id: URLstuff[1]
				};
				generalAPIcall(staffQuery,variables,mangaHandler);
			};
		};
		data.data.Staff.staffMedia.edges.forEach(function(edge){
			let manga = {
				role: [edge.staffRole],
				title: edge.node.title.romaji,
				titleEnglish: edge.node.title.english,
				titleNative: edge.node.title.native,
	                        image: edge.node.coverImage.large,
	                        startDate: edge.node.startDate,
	                        id: edge.node.id,
	                        chapters: edge.node.chapters,
	                        popularity: edge.node.popularity
			};
			if(useScripts.titleLanguage === "Native" && edge.node.title.native){
				manga.title = edge.node.title.native;
			}
			else if(useScripts.titleLanguage === "English" && edge.node.title.english){
				manga.title = edge.node.title.english;
			};
			mangaAliasesToLookFor.forEach(function(alias){
				if(alias[0] === manga.id){
					manga.title = alias[1];
				};
			});
			mangaRolesList.push(manga);
		});
		mangaRolesList.sort(function(a,b){return a.id - b.id});
		for(var i=1;i<mangaRolesList.length;i++){//remove duplicates
			if(mangaRolesList[i].id === mangaRolesList[i-1].id){
				mangaRolesList[i-1].role = mangaRolesList[i-1].role.concat(mangaRolesList[i].role);//join roles
				mangaRolesList.splice(i,1);
				i--;
			};
		};
		listRenderer();
	};
	const staffQuery = `
query (
    $id: Int,
    $page: Int,
    $type: MediaType
  ) {
  Staff (
      id: $id
  ) {
    staffMedia (
      sort: POPULARITY_DESC,
      type: $type,
      page: $page
    ) {
      edges {
	staffRole
	node {
	  id
	  episodes
	  chapters
	  popularity
          duration
	  coverImage {
	    large
	  }
	  startDate {
	    year
	    month
	    day
	  }
	  title {
	    romaji
            native
            english
	  }
	}
      }
      pageInfo {
	currentPage
	lastPage
      }
    }
  }
}
`;
	var variables = {
		page: 1,
		type: "ANIME",
		id: URLstuff[1]
	};
	generalAPIcall(staffQuery,variables,animeHandler);
	variables.type = "MANGA";
	generalAPIcall(staffQuery,variables,mangaHandler);
}

function addCompletedScores(){
	if(!document.URL.match(/^https:\/\/anilist\.co\/(home|user|activity)\/?([\w\-]+)?\/?$/)){
		return;
	}
	setTimeout(function(){
		if(document.URL.match(/^https:\/\/anilist\.co\/(home|user|activity)\/?([\w\-]+)?\/?$/)){
			addCompletedScores();
		}
	},1000);
	var status = document.getElementsByClassName("status");
	for(var i=0;i<status.length;i++){
		if(
			(useScripts.completedScore && status[i].innerText.match(/^(c|C)ompleted/))
			|| (useScripts.droppedScore && status[i].innerText.match(/^(d|D)ropped/))
			|| document.URL.match(/^https:\/\/anilist\.co\/activity/)
		){
			if(!status[i].hasOwnProperty("hohScoreMatched")){
				status[i].hohScoreMatched = true;
				let scoreInfo = document.createElement("span");
				const userName = status[i].parentNode.children[0].innerText;
				let mediaId = /\/(\d+)\//.exec(status[i].children[0].href);
				if(!mediaId || !mediaId.length){
					continue;
				};
				mediaId = mediaId[1];
				scoreInfo.classList.add("hohCS" + userName + mediaId);
				scoreInfo.style.display = "none";
				status[i].appendChild(scoreInfo);
				let callback = function(data){
					let statusFind = document.getElementsByClassName("hohCS" + data.data.MediaList.user.name + data.data.MediaList.mediaId);
					let suffix = "";
					if(data.data.MediaList.user.name === "shuurei"){
						const shuureiSystem = ["",">:(","Ew","Ugh","Hm","Ok","Nice","Ooh","Wow","Fave",":D"];
						suffix = " " + shuureiSystem[data.data.MediaList.score];
					}
					else if(data.data.MediaList.user.mediaListOptions.scoreFormat === "POINT_100"){
						suffix = " " + data.data.MediaList.score + "/100";
					}
					else if(
						data.data.MediaList.user.mediaListOptions.scoreFormat === "POINT_10_DECIMAL" ||
						data.data.MediaList.user.mediaListOptions.scoreFormat === "POINT_10"
					){
						suffix = " " + data.data.MediaList.score + "/10";
					}
					else if(data.data.MediaList.user.mediaListOptions.scoreFormat === "POINT_3"){
						if(data.data.MediaList.score === 3){
							suffix = svgAssets.smile;
						}
						else if(data.data.MediaList.score === 2){
							suffix = svgAssets.meh;
						}
						else if(data.data.MediaList.score === 1){
							suffix = svgAssets.frown;
						};

					}
					else if(
						data.data.MediaList.user.mediaListOptions.scoreFormat === "POINT_5"
					){
						suffix = " " + data.data.MediaList.score + svgAssets.star;
					}
					if(data.data.MediaList.notes){
						var commandMatches = data.data.MediaList.notes.match(/\$({.*})\$/);
						if(commandMatches){
							try{
								var noteContent = JSON.parse(commandMatches[1]);
								if(noteContent.hasOwnProperty("message")){
									suffix += " " + noteContent.message;
								};
							}
							catch(e){
								console.log("Unable to parse JSON in list note");
							};
						};
					};
					let rewatchSuffix = "";
					if(data.data.MediaList.repeat > 0){
						if(data.data.MediaList.media.type === "ANIME"){
							rewatchSuffix = " [rewatch";
						}
						else{
							rewatchSuffix = " [reread";
						}
						if(data.data.MediaList.repeat === 1){
							rewatchSuffix += "]";
						}
						else{
							rewatchSuffix += " " + data.data.MediaList.repeat + "]";
						}
					};
					for(var j=0;j<statusFind.length;j++){
						if(data.data.MediaList.score != 0){
							if(statusFind[j].parentNode.innerText.match(/^(c|C)ompleted/)){
								statusFind[j].innerHTML = suffix + rewatchSuffix;
							}
							else{
								statusFind[j].innerHTML = suffix;
							};
							statusFind[j].style.display = "inline";
						};
					};
				};
				const variables = {
					userName: userName,
					mediaId: mediaId
				};
				const query = `
query (
  $userName: String,
  $mediaId: Int
) {
  MediaList (
    userName: $userName,
    mediaId: $mediaId
  ) {
    score
    mediaId
    notes
    repeat
    media {
      type
    }
    user {
      name
      mediaListOptions {
        scoreFormat
      }
    }
  }
}
`;
				generalAPIcall(query,variables,callback)
			};
		}
		else if(status[i].children.length === 2 && !status[i].classList.contains("form")){
			status[i].removeChild(status[i].children[1]);
		};
	};
};

function enhanceTags(){//show tag definition in drop down menu when adding tags
	if(!document.URL.match(/^https:\/\/anilist\.co\/(anime|manga)\/.*/)){
		return;
	};
	setTimeout(function(){
		if(document.URL.match(/^https:\/\/anilist\.co\/(anime|manga)\/.*/)){
			enhanceTags()
		}
	},400);
	var possibleTagContainers = document.getElementsByClassName("el-select-dropdown__list");
	var bestGuess = false;
	for(var i=0;i<possibleTagContainers.length;i++){
		if(possibleTagContainers[i].children.length > 205){//horrible test, but we have not markup to go from. Assumes the tag dropdown is the only one with more than that number of children
			bestGuess = i;
		};
	};
	if(bestGuess === false){
		return;
	};
	if(possibleTagContainers[bestGuess].hasOwnProperty("hohMarked")){
		return;
	}
	else{
		possibleTagContainers[bestGuess].hohMarked = true;
	};
	var superBody = document.getElementsByClassName("el-dialog__body")[0];
	var descriptionTarget = document.createElement("span");
	descriptionTarget.id = "hohDescription";
	superBody.insertBefore(descriptionTarget,superBody.children[2]);

	for(var i=0;i<possibleTagContainers[bestGuess].children.length;i++){
		possibleTagContainers[bestGuess].children[i].onmouseover = function(){
			if(tagDescriptions[this.children[0].innerText]){
				document.getElementById("hohDescription").innerText = tagDescriptions[this.children[0].innerText];
			}
			else{
				document.getElementById("hohDescription").innerText = "Message hoh to get this description added";
			};
		};
		possibleTagContainers[bestGuess].children[i].onmouseout = function(){
			document.getElementById("hohDescription").innerText = "";
		};
	};
};

let prevLength = 0;
let displayMode = "hoh";

function enhanceNotifications(){
	//method: the real notifications are parsed, then hidden and a new list of notifications are created using a mix of parsed data and API calls.
	//alternative method: auth
	setTimeout(function(){
		if(document.URL === "https://anilist.co/notifications" && !(useScripts.accessToken && false)){
			enhanceNotifications();
		}
		else{
			prevLength = 0;
			displayMode = "hoh";
		}
	},300);
	if(displayMode === "native"){
		return;
	};
	var possibleButton = document.querySelector(".reset-btn");
	if(possibleButton){
		if(!possibleButton.flag){
			possibleButton.flag = true;
			possibleButton.onclick = function(){
				var notf = document.getElementById("hohNotifications");
				for(var i=0;i<notf.children.length;i++){
					notf.children[i].classList.remove("hohUnread");
				};
			};
			let setting = document.createElement("p");
			let checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.checked = useScripts["hideLikes"];
			checkbox.targetSetting = "hideLikes";
			checkbox.onchange = function(){
				useScripts[this.targetSetting] = this.checked;
				localStorage.setItem("hohSettings",JSON.stringify(useScripts));
				forceRebuildFlag = true;
				if(useScripts.accessToken && false){
					enhanceNotifications();
				};
			};
			let description = document.createElement("span");
			description.innerText = "Hide like notifications";
			description.style.marginLeft = "2px";
			setting.style.fontSize = "small";
			setting.appendChild(checkbox);
			setting.appendChild(description);
			if(useScripts.settingsTip){
				var settingsTip = document.createElement("p");
				settingsTip.innerText = `
You can turn parts of the script on and off:
[your profile page] > the tab "Stats/Script" > "Script & More stats".

You can also turn off this notice there.
`;
				setting.appendChild(settingsTip);
			};
			let regularNotifications = document.createElement("span");
			regularNotifications.style.cursor = "pointer";
			regularNotifications.style.fontSize = "small";
			regularNotifications.innerText = svgAssets.envelope + " Show default notifications";
			regularNotifications.onclick = function(){
				if(displayMode === "hoh"){
					displayMode = "native";
					hohNotsToToggle = document.getElementById("hohNotifications");
					if(hohNotsToToggle){
						hohNotsToToggle.style.display = "none";
					};
					var regNotsToToggle = document.getElementsByClassName("notification");
					for(var i=0;i<regNotsToToggle.length;i++){
						regNotsToToggle[i].style.display = "grid";
					};
					regularNotifications.innerText = svgAssets.envelope + " Show hoh notifications";
					setting.style.display = "none";
				}
				else{
					displayMode = "hoh";
					var hohNotsToToggle = document.getElementById("hohNotifications");
					if(hohNotsToToggle){
						hohNotsToToggle.style.display = "block";
					};
					var regNotsToToggle = document.getElementsByClassName("notification");
					for(var i=0;i<regNotsToToggle.length;i++){
						regNotsToToggle[i].style.display = "none";
					};
					regularNotifications.innerText = svgAssets.envelope + " Show default notifications";
					setting.style.display = "";
				};
			};
			possibleButton.parentNode.appendChild(regularNotifications);
			possibleButton.parentNode.appendChild(setting);
		};
	};
	let commentCallback = function(data){
		var listOfComments = Array.from(document.getElementsByClassName("b" + data.data.Activity.id));
		listOfComments.forEach(function(comment){
			while(comment.children[1].childElementCount){
				comment.children[1].removeChild(comment.children[1].lastChild);
			};
			comment.children[0].style.display = "block";
			data.data.Activity.replies.forEach(function(reply){
				var quickCom = document.createElement("div");
				quickCom.classList.add("hohQuickCom");
				var quickComName = document.createElement("span");
				quickComName.classList.add("hohQuickComName");
				quickComName.innerHTML = reply.user.name;
				if(reply.user.name === whoAmI){
					quickComName.classList.add("hohThisIsMe");
				};
				var quickComContent = document.createElement("span");
				quickComContent.classList.add("hohQuickComContent");
				quickComContent.innerHTML = reply.text;
				var quickComLikes = document.createElement("span");
				quickComLikes.classList.add("hohQuickComLikes");
				if(reply.likes.length > 1){
					quickComLikes.innerText = reply.likes.length + "♥";
				}
				else if(reply.likes.length === 1){
					quickComLikes.innerText = "♥";
				};
				reply.likes.forEach(function(like){
					if(like.name === whoAmI){
						quickComLikes.classList.add("hohILikeThis");
					};
				});
				quickCom.appendChild(quickComName);
				quickCom.appendChild(quickComContent);
				quickCom.appendChild(quickComLikes);
				comment.children[1].appendChild(quickCom);
			});
		});
	};
	let notificationDrawer = function(activities){
		let newContainer = document.getElementById("hohNotifications")
		if(newContainer){
			newContainer.parentNode.removeChild(newContainer);
		};
		newContainer = document.createElement("div");
		newContainer.id = "hohNotifications";
		var notificationsContainer = document.querySelector(".notifications");
		if(!notificationsContainer){
			return;
		}
		notificationsContainer.insertBefore(newContainer,notificationsContainer.firstChild);
		for(var i=0;i<activities.length;i++){
			if(useScripts.hideLikes && (activities[i].type === "likeReply" || activities[i].type === "like")){
				continue;
			};
			var newNotification = document.createElement("div");
			newNotification.onclick = function(){
				this.classList.remove("hohUnread");
				var notiCount = document.getElementsByClassName("notification-dot");
				if(notiCount.length){
					const actualCount = parseInt(notiCount[0].innerHTML);
					if(actualCount < 2){
						if(possibleButton){
							possibleButton.click();
						};
					}
					else{
						notiCount[0].innerText = (actualCount - 1);
					};
				};
			};
			if(activities[i].unread){
				newNotification.classList.add("hohUnread");
			};
			newNotification.classList.add("hohNotification");

			var notImage = document.createElement("a"); //container for profile images
			notImage.href = activities[i].href;
			notImage.classList.add("hohUserImage");
			notImage.style.backgroundImage = activities[i].image;

			var notNotImageContainer = document.createElement("span"); //container for series images
			notNotImageContainer.classList.add("hohMediaImageContainer");

			var text = document.createElement("a");
			text.classList.add("hohMessageText");

			let textName = document.createElement("span");
			let textSpan = document.createElement("span");
			textName.style.color = "rgb(var(--color-blue))";

			var timeHideFlag = false;
			var counter = 1;
			if(activities[i].type === "like"){
				for(
					counter = 0;
					i + counter < activities.length
					&& activities[i + counter].type === "like"
					&& activities[i + counter].href === activities[i].href;
					counter++
				){//one person likes several of your media activities
					var fakeNotNotImage = document.createElement("img");
					var notNotImage = document.createElement("a");
					notNotImage.href = activities[i + counter].directLink;
					fakeNotNotImage.classList.add("hohMediaImage");
					fakeNotNotImage.classList.add(activities[i + counter].link);
					notNotImage.appendChild(fakeNotNotImage);
					notNotImageContainer.appendChild(notNotImage);
				};
				if(counter > 5){
					timeHideFlag = true;
				}
				else if(document.getElementById("hohNotifications").offsetWidth < 800 && counter > 2){
					timeHideFlag = true;
				};
				text.href = activities[i].directLink;
				textSpan.innerText = activities[i].textSpan;
				if(counter > 1){
					textSpan.innerText = " liked your activities.";
				};
				if(counter === 1){
					while(
						i + counter < activities.length
						&& activities[i + counter].type === "like"
						&& activities[i + counter].link === activities[i].link
					){//several people likes one of your activities
						var miniImageWidth = 40;
						var miniImage = document.createElement("a");
						miniImage.classList.add("hohUserImageSmall");
						miniImage.href = activities[i + counter].href;
						miniImage.title = activities[i + counter].textName;
						miniImage.style.backgroundImage = activities[i + counter].image;
						miniImage.style.height = miniImageWidth + "px";
						miniImage.style.width = miniImageWidth + "px";
						miniImage.style.marginLeft = (72 + (counter-1)*miniImageWidth) + "px";
						newNotification.appendChild(miniImage);
						counter++;
					};
					if(counter > 1){
						text.style.marginTop = "45px";
						activities[i].textName += " +";
					};
				}
				else{
					newNotification.classList.add("hohCombined");
				};
				textName.innerText = activities[i].textName;
				text.appendChild(textName);
				text.appendChild(textSpan);
				i += counter -1;
			}
			else if(activities[i].type === "reply" ){
				var fakeNotNotImage = document.createElement("img");
				var notNotImage = document.createElement("a");
				notNotImage.href = activities[i].directLink;
				fakeNotNotImage.classList.add("hohMediaImage");
				fakeNotNotImage.classList.add(activities[i].link);
				notNotImage.appendChild(fakeNotNotImage);
				notNotImageContainer.appendChild(notNotImage);
				while(
					i + counter < activities.length
					&& activities[i + counter].type === "reply"
					&& activities[i + counter].link === activities[i].link
				){
					var miniImageWidth = 40;
					var miniImage = document.createElement("a");
					miniImage.classList.add("hohUserImageSmall");
					miniImage.href = activities[i + counter].href;
					miniImage.style.backgroundImage = activities[i + counter].image;
					miniImage.style.height = miniImageWidth + "px";
					miniImage.style.width = miniImageWidth + "px";
					miniImage.style.marginLeft = (72 + (counter-1)*miniImageWidth) + "px";
					newNotification.appendChild(miniImage);
					counter++;
				};
				if(counter > 1){
					text.style.marginTop = "45px";
					activities[i].textName += " +";
				};

				text.href = activities[i].directLink;
				textName.innerText = activities[i].textName;
				textSpan.innerText = activities[i].textSpan;
				text.appendChild(textName);
				text.appendChild(textSpan);
				i += counter -1;
			}
			else if(activities[i].type === "replyReply" ){
				var fakeNotNotImage = document.createElement("img");
				var notNotImage = document.createElement("a");
				notNotImage.href = activities[i].directLink;
				fakeNotNotImage.classList.add("hohMediaImage");
				fakeNotNotImage.classList.add(activities[i].link);
				notNotImage.appendChild(fakeNotNotImage);
				notNotImageContainer.appendChild(notNotImage);
				while(
					i + counter < activities.length
					&& activities[i + counter].type === "replyReply"
					&& activities[i + counter].link === activities[i].link
				){
					var miniImageWidth = 40;
					var miniImage = document.createElement("a");
					miniImage.classList.add("hohUserImageSmall");
					miniImage.href = activities[i + counter].href;
					miniImage.style.backgroundImage = activities[i + counter].image;
					miniImage.style.height = miniImageWidth + "px";
					miniImage.style.width = miniImageWidth + "px";
					miniImage.style.marginLeft = (72 + (counter-1)*miniImageWidth) + "px";
					newNotification.appendChild(miniImage);
					counter++;
				};
				if(counter > 1){
					text.style.marginTop = "45px";
					activities[i].textName += " +";
				};

				text.href = activities[i].directLink;
				textName.innerText = activities[i].textName;
				textSpan.innerText = " replied to the same activity as you.";
				text.appendChild(textName);
				text.appendChild(textSpan);
				i += counter -1;
			}
			else if(
				activities[i].type === "message"
				|| activities[i].type === "likeReply"
				|| activities[i].type === "mention"
			){
				var fakeNotNotImage = document.createElement("img");
				var notNotImage = document.createElement("a");
				notNotImage.href = activities[i].directLink;
				fakeNotNotImage.classList.add("hohMediaImage");
				fakeNotNotImage.classList.add(activities[i].link);
				notNotImage.appendChild(fakeNotNotImage);
				notNotImageContainer.appendChild(notNotImage);
				text.href = activities[i].directLink;
				textName.innerText = activities[i].textName;
				textSpan.innerText = activities[i].textSpan;
				text.appendChild(textName);
				text.appendChild(textSpan);
			}
			else if(activities[i].type === "airing"){
				textSpan.innerHTML = activities[i].text;
				text.appendChild(textSpan);
			}
			else if(activities[i].type === "follow"){
				text.href = activities[i].directLink;
				textName.innerText = activities[i].textName;
				textSpan.innerText = activities[i].textSpan;
				text.appendChild(textName);
				text.appendChild(textSpan);
			}
			else if(
				activities[i].type === "forumCommentLike"
				|| activities[i].type === "forumSubscribedComment"
				|| activities[i].type === "forumCommentReply"
				|| activities[i].type === "forumLike"
				|| activities[i].type === "forumMention"
			){
				text.href = activities[i].directLink;
				textName.innerText = activities[i].textName;
				textSpan.innerText = activities[i].textSpan;
				text.appendChild(textName);
				text.appendChild(textSpan);
				let textSpan2 = document.createElement("span");
				textSpan2.style.color = "rgb(var(--color-blue))";
				textSpan2.innerText = activities[i].text;
				text.appendChild(textSpan2);
				text.style.maxWidth = "none";
				text.style.marginTop = "17px";
			}
			else{//display as-is
				textSpan.classList.add("hohUnhandledSpecial");
				textSpan.innerHTML = activities[i].text;
				text.appendChild(textSpan);
			};

			var time = document.createElement("div");
			time.classList.add("hohTime");
			time.innerHTML = activities[i - counter + 1].time;

			var commentsContainer = document.createElement("div");
			commentsContainer.classList.add("hohCommentsContainer");
			commentsContainer.classList.add("b" + activities[i].link);//possible replies

			var comments = document.createElement("a");
			comments.classList.add("hohComments");
			comments.innerText = "comments"
			let quickCommentsExpander = document.createElement("span");
			quickCommentsExpander.innerText = "+";
			quickCommentsExpander.classList.add("hohMonospace");
			comments.appendChild(quickCommentsExpander);
			comments.onclick = function(){
				if(this.children[0].innerText === "+"){
					this.children[0].innerText = "-";
					this.parentNode.children[1].style.display = "inline-block";
					var query = queryActivity;
					var variables = {
						id: +this.parentNode.classList[1].substring(1)
					};
					var vars = {};
					listActivityCall(query,variables,commentCallback,vars,false);
				}
				else{
					this.children[0].innerText = "+";
					this.parentNode.children[1].style.display = "none";
				};
			};
			comments.classList.add("link");

			var commentsArea = document.createElement("div");
			commentsArea.classList.add("hohCommentsArea");

			commentsContainer.appendChild(comments);
			commentsContainer.appendChild(commentsArea);

			newNotification.appendChild(notImage);
			newNotification.appendChild(text);
			newNotification.appendChild(notNotImageContainer);
			if(!timeHideFlag){
				newNotification.appendChild(time);
			};
			newNotification.appendChild(commentsContainer);
			newContainer.appendChild(newNotification);
		};
	};
	if(useScripts.accessToken && false){
		let callback = function(data){
			let activities = [];
			data.data.Page.notifications.forEach(function(notification){
			});
			notificationDrawer(activities);
		};
	}
	else{
		let activities = [];
		let notifications = document.getElementsByClassName("notification");//collect the "real" notifications
		if(notifications.length === prevLength && forceRebuildFlag === false){
			return;
		}
		else{
			prevLength = notifications.length;
			forceRebuildFlag = false;
		};
		const activityTypes = {
			" liked your activity." :                           "like",
			" replied to your activity." :                      "reply",
			" sent you a message." :                            "message",
			" liked your activity reply." :                     "likeReply",
			" mentioned you in their activity." :               "mention",
			" replied to activity you previously replied to." : "replyReply",
			" liked your comment, in the forum thread " :       "forumCommentLike",
			" commented in your subscribed forum thread " :     "forumSubscribedComment",
			" replied to your comment, in the forum thread " :  "forumCommentReply",
			" liked your forum thread, " :                      "forumLike",
			" mentioned you, in the forum thread " :            "forumMention"
		};
		Array.from(notifications).forEach(function(notification){//parse real notifications
			notification.already = true;
			notification.style.display = "none";
			var active = {};
			if(
				notification.classList.length > 1
				&& notification.classList[1] != "hasMedia"
			){//"notification unread" classlist
				active.unread = true;
			}
			else{
				active.unread = false;
			};
			active.type = "special";
			active.link = "aaa";//fixme. Edit 2019: I have no idea
			if(//check if we can query that
				notification.children.length >= 2
				&& notification.children[1].children.length
				&& notification.children[1].children[0].children.length
				&& notification.children[1].children[0].children[0].children.length
			){
				const info = notification.children[1].children[0].children[0];
				active.directLink = info.href
				active.text =       info.innerHTML;
				active.textName =   info.childNodes[0].textContent.trim();
				active.textSpan =   info.childNodes[1].textContent;
				let linkMatch =     info.href.match(/activity\/(\d+)/);
				if(linkMatch){
					active.link = linkMatch[1];
				};
				var testType = info.children[0].textContent;
				active.type = activityTypes[testType];
				if(!active.type){
					active.type = "special"; //by default every activity is some weird thing we are displaying as-is
				}
				else if(
					active.type === "forumCommentLike"
					|| active.type === "forumSubscribedComment"
					|| active.type === "forumCommentReply"
					|| active.type === "forumLike"
					|| active.type === "forumMention"
				){
					active.text = info.children[1].textContent;
				}
			};
			if(active.type === "special"){
				active.text = notification.children[1].innerHTML;//default
				if(notification.children[1].children.length){
					const info = notification.children[1].children[0];
					if(
						info.children.length >= 2
						&& info.children[1].textContent === " started following you."
					){
						active.type = "follow";
						active.directLink = info.children[0].href;
						active.text =       info.children[0].innerHTML;
						active.textName =   info.children[0].textContent.trim();
						active.textSpan =   info.children[1].textContent;
					}
					else if(
						info.children.length >= 4
						&& info.children[3].textContent === " aired."
					){
						active.type = "airing";
						active.directLink = info.children[0].href;
						active.text =       info.innerHTML;
					};
				};
			};
			if(
				notification.children.length > 1
				&& notification.children[1].children.length > 1
			){
				active.time = notification.children[1].children[1].innerHTML;
			}
			else{
				active.time = document.createElement("span");
			};
			active.image = notification.children[0].style.backgroundImage;
			active.href = notification.children[0].href;
			activities.push(active);
		});
		notificationDrawer(activities);
		for(var i=0;APIcallsUsed < (APIlimit - 5);i++){//heavy
			if(!activities.length || i >= activities.length){//loading is difficult to predict. There may be nothing there when this runs
				break;
			};
			var imageCallBack = function(data){
				var type = data.data.Activity.type;
				for(var j=0;j<notifications.length;j++){
					if(notifications[j].hasOwnProperty("already")){
						break;
					};
				};
				if(type === "ANIME_LIST" || type === "MANGA_LIST"){
					var listOfStuff = document.getElementsByClassName(data.data.Activity.id);
					for(var k=0;k<listOfStuff.length;k++){
						listOfStuff[k].style.backgroundImage = "url(" + data.data.Activity.media.coverImage.large + ")";
						listOfStuff[k].classList.add("hohBackgroundCover");
					};
				}
				else if(type === "TEXT"){
					var listOfStuff = document.getElementsByClassName(data.data.Activity.id);
					for(var k=0;k<listOfStuff.length;k++){
						listOfStuff[k].style.backgroundImage = "url(" + data.data.Activity.user.avatar.large + ")";
						listOfStuff[k].classList.add("hohBackgroundUserCover");
					};
				};
				if(data.data.Activity.replies.length){
					commentCallback(data);
				};
			};
			var vars = {
				find: i
			};
			var query = queryActivity;
			if(activities[i].link[0] != "a"){//activities with post link
				if(activities.length){
					var variables = {
						id: +activities[i].link
					};
					if(localStorageAvailable){
						var localStorageItem = localStorage.getItem(variables.id + "");
						if(
							!(localStorageItem === null)
							|| !pending.hasOwnProperty(activities[i].link)
						){
							listActivityCall(query,variables,imageCallBack,vars,true);
							pending[activities[i].link] = true;
						};
					}
					else if(
						activityCache.hasOwnProperty(activities[i].link)
						|| !pending.hasOwnProperty(activities[i].link)
					){
						listActivityCall(query,variables,imageCallBack,vars,true);
						pending[activities[i].link] = true;
					};
				};
			};
		};
	};
};//end enhanceNotifications

function enhanceCharacterBrowse(){//provides a favourite count for the top results of the character browse page
	if(!document.URL.match(/^https:\/\/anilist\.co\/search\/characters\/?$/)){
		return;
	};
	const variables = {page:1};
	const query = `
query ($page: Int!) {
  Page(page: $page){
    characters(sort: [FAVOURITES_DESC]) {
      id
      favourites
    }
  }
}
`;
	let favCallback = function(data){
		var resultsToTag = document.querySelector("div.results.characters");
		if(!resultsToTag || resultsToTag.children.length < 2){//there's a scroller
			setTimeout(function(){
				if(!document.URL.match(/^https:\/\/anilist\.co\/search\/characters\/?$/)){
					return;
				};
				favCallback(data);
			},200);//may take some time to load
			return;
		};
		for(var i=0;i<resultsToTag.children.length-1 && i<data.data.Page.characters.length;i++){
			var favCount = document.createElement("span");
			favCount.classList.add("hohFavCountBrowse");
			favCount.innerText = data.data.Page.characters[i].favourites;
			resultsToTag.children[i].children[0].appendChild(favCount);
		};
	};
	generalAPIcall(query,variables,favCallback);
};

function enhanceStaffBrowse(){//provides a favourite count for the top results of the staff browse page
	if(!document.URL.match(/^https:\/\/anilist\.co\/search\/staff\/?$/)){
		return;
	};
	const variables = {page:1};
	const query = `
query ($page: Int!) {
  Page(page: $page){
    staff(sort: [FAVOURITES_DESC]) {
      id
      favourites
    }
  }
}
`;
	let favCallback = function(data){
		var resultsToTag = document.querySelector("div.results.staff");
		if(!resultsToTag || resultsToTag.children.length < 2){//there's a scroller
			setTimeout(function(){
				if(!document.URL.match(/^https:\/\/anilist\.co\/search\/staff\/?$/)){
					return;
				};
				favCallback(data);
			},200);//may take some time to load
			return;
		};
		for(var i=0;i<resultsToTag.children.length-1 && i<data.data.Page.staff.length;i++){
			var favCount = document.createElement("span");
			favCount.classList.add("hohFavCountBrowse");
			favCount.innerText = data.data.Page.staff[i].favourites;
			resultsToTag.children[i].children[0].appendChild(favCount);
		};
	};
	generalAPIcall(query,variables,favCallback);
};

function addProgressBar(){
	if(document.URL != "https://anilist.co/home"){
		return;
	};
	let mediaCards = document.querySelectorAll(".media-preview-card .content .info > div");
	if(!mediaCards.length){
		setTimeout(function(){
			addProgressBar();
		},200);//may take some time to load
		return;
	};
	mediaCards.forEach(function(card){
		const progressInformation = card.innerText.match(/Progress:\ (\d+)\/(\d+)/);
		if(progressInformation){
			var pBar = document.createElement("meter");
			pBar.value = progressInformation[1];
			pBar.min = 0;
			pBar.max = progressInformation[2];
			card.parentNode.insertBefore(pBar,card);
			card.parentNode.parentNode.parentNode.querySelector(".plus-progress").onclick = function(){
				pBar.value++;
			}
		};
	});
	document.querySelector(".size-toggle").onclick = function(){
		setTimeout(function(){
			addProgressBar();
		},200);
	};
}

function enhanceCharacter(){//adds a favourite count on every character page
	if(!document.URL.match(/^https:\/\/anilist\.co\/character(\/.*)?/)){
		return;
	};
	var filterGroup = document.getElementsByClassName("content");
	if(!filterGroup.length){
		setTimeout(function(){
			enhanceCharacter();
		},200);//may take some time to load
		return;
	};
	const variables = {id: document.URL.match(/\/character\/(\d+)\/?/)[1]};
	const query = `
query($id: Int!){
  Character(id: $id){
    favourites
  }
}
`;
	let favCallback = function(data){
		var favButton = document.getElementsByClassName("favourite");
		if(!favButton){
			setTimeout(function(){
				if(document.URL.match(/^https:\/\/anilist\.co\/character(\/.*)?/)){
					favCallback(data);
				};
			},100);
			return;
		};
		filterGroup = filterGroup[0];
		var favCount = document.createElement("span");
		favCount.id = "hohFavCount";
		favCount.innerText;
		filterGroup.appendChild(favCount);
		if(data.data.Character.favourites === 0 && favButton[0].classList.contains("isFavourite")){//safe to assume
			document.getElementById("hohFavCount").innerText = data.data.Character.favourites+1;
		}
		else{
			document.getElementById("hohFavCount").innerText = data.data.Character.favourites;
		};
		if(favButton.length){
			favButton[0].onclick = function(){
				var favCount = document.getElementById("hohFavCount");
				if(this.classList.contains("isFavourite")){
					favCount.innerText = Math.max(parseInt(favCount.innerText)-1,0);//0 or above, just to avoid looking silly
				}
				else{
					favCount.innerText = parseInt(favCount.innerText)+1;
				};
			};
		};
		let names = document.querySelector(".content .names");
		if(names){
			names.innerText = names.innerText.replace(/,$/,"");
		};
	};
	generalAPIcall(query,variables,favCallback);
	let names = document.querySelector(".content .names");
	if(names){
		names.innerText = names.innerText.replace(/,$/,"");
	};
};

function enhanceStudio(){//adds a favourite count to every studio page
	if(!document.URL.match(/^https:\/\/anilist\.co\/studio(\/.*)?/)){
		return;
	};
	var filterGroup = document.querySelector(".container.header");
	if(!filterGroup){
		setTimeout(function(){
			enhanceStudio();
		},200);//may take some time to load
		return;
	};
	const variables = {id: document.URL.match(/\/studio\/(\d+)\/?/)[1]};
	const query = `
query($id: Int!){
  Studio(id: $id){
    favourites
  }
}
`;
	let favCallback = function(data){
		var favButton = document.getElementsByClassName("favourite");
		if(!favButton){
			setTimeout(function(){
				if(document.URL.match(/^https:\/\/anilist\.co\/studio(\/.*)?/)){
					favCallback(data);
				};
			},100);
			return;
		};
		var favCount = document.createElement("span");
		favCount.id = "hohFavCount";
		favCount.innerText;
		favCount.style.top = "-10px";
		filterGroup.appendChild(favCount);
		if(data.data.Studio.favourites === 0 && favButton[0].classList.contains("isFavourite")){//safe to assume
			document.getElementById("hohFavCount").innerText = data.data.Studio.favourites+1;
		}
		else{
			document.getElementById("hohFavCount").innerText = data.data.Studio.favourites;
		};
		if(favButton.length){
			favButton[0].onclick = function(){
				var favCount = document.getElementById("hohFavCount");
				if(this.classList.contains("isFavourite")){
					favCount.innerText = Math.max(parseInt(favCount.innerText)-1,0);//0 or above, just to avoid looking silly
				}
				else{
					favCount.innerText = parseInt(favCount.innerText)+1;
				};
			};
		};
	};
	generalAPIcall(query,variables,favCallback);
};

function returnList(list,skipProcessing){
	let retl = [];
	for(var i=0;i<list.data.MediaListCollection.lists.length;i++){
		for(var j=0;j<list.data.MediaListCollection.lists[i].entries.length;j++){
			let retlObj = list.data.MediaListCollection.lists[i].entries[j];
			if(!skipProcessing){
				retlObj.isCustomList = list.data.MediaListCollection.lists[i].isCustomList;
				if(retlObj.isCustomList){
					retlObj.listLocations = [list.data.MediaListCollection.lists[i].name];
				}
				else{
					retlObj.listLocations = [];
				};
				if(retlObj.scoreRaw > 100){
					retlObj.scoreRaw = 100;
				}
				if(!retlObj.media.episodes && retlObj.media.nextAiringEpisode){
					retlObj.media.episodes = retlObj.media.nextAiringEpisode.episode - 1;
				}
			};
			retl.push(retlObj);
		};
	};
	retl.sort((a,b) => a.mediaId - b.mediaId);
	for(var i=1;i<retl.length;i++){//remove duplicates
		if(retl[i].mediaId === retl[i-1].mediaId){
			if(!skipProcessing){
				retl[i].listLocations = retl[i].listLocations.concat(retl[i-1].listLocations);//preserve the custom list locations by keeping them all
				retl[i].isCustomList = retl[i].isCustomList || retl[i-1].isCustomList;
			};
			retl.splice(i-1,1);
			i--;
		};
	};
	return retl;
};

function compatCheck(list,name,target){
	const query = queryMediaList;
	const variables = {
		name: name,
		listType: "ANIME"
	};
	var targetLocation = document.getElementById(target);
	if(!targetLocation){
		return;
	};
	targetLocation.innerText = "loading...";
	targetLocation.style.marginTop = "5px";
	let secondCallback = function(data){
		var targetLocation = document.getElementById(target);
		if(!targetLocation){
			return;
		};
		var list2 = returnList(data);
		var list3 = [];
		var indeks2 = 0;
		for(var i=0;i<list.length && indeks2 < list2.length;i++){
			while(list2[indeks2].mediaId < list[i].mediaId && indeks2 < (list2.length-1)){
				indeks2++;
			};
			if(list2[indeks2].mediaId < list[i].mediaId){
				continue;
			};
			if(list[i].mediaId === list2[indeks2].mediaId ){
				var otb = {};
				otb.mediaId = list[i].mediaId;
				otb.score1 = list[i].scoreRaw;
				otb.score2 = list2[indeks2].scoreRaw;
				list3.push(otb);
			};
		};
	//remove duplicates
		for(var i=1;i<list3.length;i++){
			if(list3[i-1].mediaId === list3[i].mediaId){
				list3.splice(i-1,1);
				i--;
			};
		};
	//remove those with score 0
		for(var i=0;i<list3.length;i++){
			if(list3[i].score1 === 0 || list3[i].score2 === 0){
				list3.splice(i,1);
				i--;
			};
		};
		var average1 = 0;
		var average2 = 0;
		list3.forEach(function(item){
			average1 += item.score1;
			average2 += item.score2;
			//simple diff, while we are at it.
			item.sdiff = item.score1 - item.score2;
		});
		average1 = average1/list3.length;
		average2 = average2/list3.length;
		var standev1 = 0;
		var standev2 = 0;
		list3.forEach(function(item){
			standev1 += Math.pow(item.score1 - average1,2);
			standev2 += Math.pow(item.score2 - average2,2);
		});
		standev1 = Math.sqrt(standev1/(list3.length-1));
		standev2 = Math.sqrt(standev2/(list3.length-1));
		var difference = 0;
		list3.forEach(function(item){
			difference += Math.abs(
				(item.score1 - average1)/standev1
				- (item.score2 - average2)/standev2
			);
		});
		difference = difference/list3.length;
		let differenceSpan = document.createElement("span");
		differenceSpan.innerText = difference.roundPlaces(3);
		if(difference < 0.9){
			differenceSpan.style.color = "green";
		}
		else if(difference > 1.1){
			differenceSpan.style.color = "red";
		};
		targetLocation.innerText = "";
		targetLocation.appendChild(differenceSpan);
		let countSpan = document.createElement("span");
		countSpan.innerText = " based on " + list3.length + " shared entries. Lower is better. 0.8 - 1.1 is common";
		targetLocation.appendChild(countSpan);
	};
	generalAPIcall(query,variables,secondCallback);
};

//used by the stats module, and to safeguard the manga chapter guesses
const commonUnfinishedManga = {
	"53390":{//aot
		chapters:116,
		volumes:26
	},
	"30002":{//berserk
		chapters:357,
		volumes:40
	},
	"30013":{//one piece
		chapters:940,
		volumes:90
	},
	"85486":{//mha
		chapters:202,
		volumes:20
	},
	"74347":{//opm
		chapters:154,
		volumes:17
	},
	"30026":{//HxH
		chapters:390,
		volumes:36
	},
	"30656":{//vagabond
		chapters:327,
		volumes:37
	},
	"30104":{//yotsuba&
		chapters:103,
		volumes:14
	}
};
const listCreatedTime = new Date(2019,2,26);
const currentTime = new Date();
if(currentTime - listCreatedTime > 365*24*60*60*1000){
	console.log("remind hoh to update the commonUnfinishedManga list");
};

function addMoreStats(){
	if(!document.URL.match(/\/stats\/?$/)){
		return;
	};
	let filterGroup = document.querySelector(".filter-group");
	if(!filterGroup){
		setTimeout(function(){
			addMoreStats();
		},200);//takes some time to load
		return;
	};
	var hohStatsTrigger = document.createElement("span");
	hohStatsTrigger.classList.add("hohStatsTrigger");
	hohStatsTrigger.innerText = "Script & More stats";
	hohStatsTrigger.onclick = function(){
		hohStatsTrigger.classList.add("hohActive");
		var otherActive = document.getElementsByClassName("active");
		for(var j=0;j<otherActive.length;j++){
			otherActive[j].classList.remove("active");
		};
		var statsWrap = document.getElementsByClassName("stats-wrap")[0];
		for(var j=0;j<statsWrap.children.length;j++){
			statsWrap.children[j].style.display = "none";
		};
		var hohStats = document.getElementById("hohStats");
		hohStats.style.display = "initial";
	};
	let generateStatPage = function(){
		var databaseStatsHead = document.createElement("h1");
		databaseStatsHead.innerText = "Anilist database stats";
		var databaseStats = document.createElement("div");

		["Anime","Manga","Users","Staff","Characters","Reviews"].forEach(function(needed){
			let totalStatsNode = document.createElement("p");
			totalStatsNode.innerText = needed + ": ";
			let dataTarget = document.createElement("span");
			dataTarget.classList.add("hohStatValue");
			dataTarget.id = "hohTotal" + needed + "Target";
			totalStatsNode.appendChild(dataTarget);
			if(needed === "Reviews"){
				let dataMore = document.createElement("a");
				dataMore.innerHTML = " More review stats" + svgAssets.external;
				dataMore.href = "http://www.brendberg.no/anilist/review.html";
				dataMore.setAttribute("target","_blank");
				totalStatsNode.appendChild(dataMore);
			};
			databaseStats.appendChild(totalStatsNode);
		});

		var scriptStatsHead = document.createElement("h1");
		scriptStatsHead.innerText = "Script";
		var scriptStats = document.createElement("div");
		var sVersion = document.createElement("p");
		sVersion.innerHTML = "Version: <span class=\"hohStatValue\">" + scriptInfo.version + "</span>";
		scriptStats.appendChild(sVersion);
		var sHome = document.createElement("p");
		var sHomeLink = document.createElement("a");
		sHome.innerText = "Homepage: ";
		sHomeLink.innerText = scriptInfo.link;
		sHomeLink.href = scriptInfo.link;
		sHome.appendChild(sHomeLink);
		scriptStats.appendChild(sHome);
		var sInstructions = document.createElement("p");
		sInstructions.innerText = "Some changes requires reloading the page.";
		scriptStats.appendChild(sInstructions);
		var scriptSettings = document.createElement("div");
		if(localStorageAvailable){
			for(var j=0;j<useScriptsDefinitions.length;j++){
				var setting = document.createElement("p");
				if(useScriptsDefinitions[j].visible === false){
					setting.style.display = "none";
				};
				if(useScriptsDefinitions[j].hasOwnProperty("type")){//other kinds of input
					if(useScriptsDefinitions[j].type === "select"){
						var input = document.createElement("select");
						for(var k=0;k<useScriptsDefinitions[j].values.length;k++){
							var option = document.createElement("option");
							option.value = useScriptsDefinitions[j].values[k];
							option.innerText = useScriptsDefinitions[j].values[k];
							input.appendChild(option);
						};
					}
					else if(useScriptsDefinitions[j].type === "heading"){
						var input = document.createElement("h3");
						input.innerText = useScriptsDefinitions[j].heading;
					}
					if(useScriptsDefinitions[j].type != "heading"){
						input.targetSetting = useScriptsDefinitions[j].id;
						input.value = useScripts[useScriptsDefinitions[j].id];
						input.onchange = function(){
							useScripts[this.targetSetting] = this.value;
							localStorage.setItem("hohSettings",JSON.stringify(useScripts));
						};
					}
				}
				else{//default: a checkbox
					var input = document.createElement("input");
					input.type = "checkbox";
					input.targetSetting = useScriptsDefinitions[j].id;
					input.checked = useScripts[useScriptsDefinitions[j].id];
					input.onchange = function(){
						useScripts[this.targetSetting] = this.checked;
						localStorage.setItem("hohSettings",JSON.stringify(useScripts));
					};
				};
				var description = document.createElement("span");
				description.innerText = useScriptsDefinitions[j].description;
				setting.appendChild(input);
				setting.appendChild(description);
				scriptSettings.appendChild(setting);
			};
		}
		else{
			var setting = document.createElement("p");
			setting.innerHTML = "Script settings are not available without localstorage";
			scriptSettings.appendChild(setting);
		};

		var personalStats = document.createElement("div");
		personalStats.id = "personalStats";
		personalStats.innerText = "loading anime list..."
		var personalStatsManga = document.createElement("div");
		personalStatsManga.id = "personalStatsManga";
		personalStatsManga.innerText = "loading manga list..."


		hohStats.appendChild(databaseStatsHead);
		hohStats.appendChild(databaseStats);
		hohStats.appendChild(personalStats);
		hohStats.appendChild(personalStatsManga);
		hohStats.appendChild(document.createElement("hr"));
		hohStats.appendChild(scriptStatsHead);
		hohStats.appendChild(scriptStats);
		hohStats.appendChild(scriptSettings);
		if(localStorageAvailable){
			var localStorageItem = localStorage.getItem("titleAliases");
			var titleAliasSettings = document.createElement("div");
			var titleAliasInstructions = document.createElement("p");
			titleAliasInstructions.innerText = `
Add title aliases. Use the format /type/id/alias , one per line. Examples:

/anime/5114/Fullmetal Alchemist
/manga/30651/Nausicaä

Changes take effect on reload.`;
			var titleAliasInput = document.createElement("textarea");
			if(localStorageItem != null && localStorageItem != ""){
				var titleAliases = JSON.parse(localStorageItem);
				for(var i=0;i<titleAliases.length;i++){
					titleAliasInput.value += titleAliases[i][0] + titleAliases[i][1] + "\n";
				};
			};
			titleAliasInput.id = "titleAliasInput";
			titleAliasInput.rows = "6";
			titleAliasInput.cols = "50";
			var titleAliasChange = document.createElement("button");
			titleAliasChange.innerText = "submit";
			titleAliasChange.onclick = function(){
				var newAliases = [];
				var aliasContent = document.getElementById("titleAliasInput").value.split("\n");
				var aliasRegex = /^(\/(anime|manga)\/\d+\/)(.*)/;
				var cssAlias = /^(css\/)(.*)/
				for(var i=0;i<aliasContent.length;i++){
					var matches = aliasContent[i].match(aliasRegex);
					if(!matches){
						var cssMatches = aliasContent[i].match(cssAlias);
						if(cssMatches){
							newAliases.push([cssMatches[1],cssMatches[2]]);
						};
						continue;
					};
					newAliases.push([matches[1],matches[3]]);
				};
				localStorage.setItem("titleAliases",JSON.stringify(newAliases));
			};
			titleAliasSettings.appendChild(titleAliasInstructions);
			titleAliasSettings.appendChild(titleAliasInput);
			titleAliasSettings.appendChild(document.createElement("br"));
			titleAliasSettings.appendChild(titleAliasChange);
			hohStats.appendChild(titleAliasSettings);
		};
//gather some stats
		let query = "query($page:Int,$type:MediaType){Page(page:$page){pageInfo{total}media(type:$type){id}}}";
		generalAPIcall(
			query,
			{page:0,type:"ANIME"},
			function(data){
				let animeTarget = document.getElementById("hohTotalAnimeTarget");
				animeTarget.innerText = data.data.Page.pageInfo.total;
				animeTarget.style.cursor = "pointer";
				animeTarget.title = "go to a random anime";
				animeTarget.onclick = function(){
					const selectedAnime = Math.floor(Math.random()*data.data.Page.pageInfo.total);
					generalAPIcall(
						"query($page:Int,$type:MediaType){Page(page:$page){pageInfo{total}media(type:$type){id}}}",
						{page:Math.ceil(selectedAnime/50),type:"ANIME"},
						function(data){
							window.location.href = "https://anilist.co/anime/" + data.data.Page.media[selectedAnime % 50].id + "/";
						}
					)
				};
			}
		);
		generalAPIcall(
			query,
			{page:0,type:"MANGA"},
			function(data){
				let mangaTarget = document.getElementById("hohTotalMangaTarget");
				mangaTarget.innerText = data.data.Page.pageInfo.total;
				mangaTarget.style.cursor = "pointer";
				mangaTarget.title = "go to a random manga";
				mangaTarget.onclick = function(){
					const selectedAnime = Math.floor(Math.random()*data.data.Page.pageInfo.total);
					generalAPIcall(
						"query($page:Int,$type:MediaType){Page(page:$page){pageInfo{total}media(type:$type){id}}}",
						{page:Math.ceil(selectedAnime/50),type:"MANGA"},
						function(data){
							window.location.href = "https://anilist.co/manga/" + data.data.Page.media[selectedAnime % 50].id + "/";
						}
					)
				};
			}
		);
		let generalStatCall = function(type,path){
			generalAPIcall(
				"query($page:Int){Page(page:$page){pageInfo{total}" + type + "{id}}}",
				{page:0},
				function(data){
					let target = document.getElementById("hohTotal" + type.charAt(0).toUpperCase() + type.slice(1) + "Target");
					target.innerText = data.data.Page.pageInfo.total;
					target.style.cursor = "pointer";
					target.title = "go to a random " + path;
					target.onclick = function(){
						const selected = Math.floor(Math.random()*data.data.Page.pageInfo.total);
						generalAPIcall(
							"query($page:Int){Page(page:$page){pageInfo{total}" + type + "{id}}}",
							{page:Math.ceil(selected/50)},
							function(data){
								window.location.href = "https://anilist.co/" + path + "/" + data.data.Page[type][selected % 50].id + "/";
							}
						)
					};
				}
			);
		};
		generalStatCall("users","user");
		generalStatCall("staff","staff");//nasty plurals in the API
		generalStatCall("characters","character");
		generalStatCall("reviews","review");

		var customTagsCollection = function(list,title,fields){
			let customTags = [];
			let regularTags = [];
			let customLists = [];
			if(localStorageAvailable){
				const localStorageItem = JSON.parse(localStorage.getItem("regularTags" + title));
				if(localStorageItem){
					localStorageItem.forEach(function(tag){
						regularTags.push({
							name : tag,
							list : []
						});
					});
				};
			};
			list.forEach(function(media){
				let item = {};
				fields.forEach(function(field){
					item[field.key] = field.method(media);
				});
				if(media.notes){
					var tagMatches = media.notes.match(/(#\S+)/g);
					if(tagMatches){
						for(var j=0;j<tagMatches.length;j++){
							if(tagMatches[j].match(/#039/)){//common character encoding error that isn't worth including
								continue;
							};
							var foundFlag = false;
							for(var k=0;k<customTags.length;k++){
								if(customTags[k].name === tagMatches[j]){
									customTags[k].list.push(item);
									foundFlag = true;
									break;
								};
							};
							if(!foundFlag){
								customTags.push({
									name : tagMatches[j],
									list : [item],
								});
							};
						};
					};
				};
				for(var j=0;j<media.media.tags.length;j++){
					for(var k=0;k<regularTags.length;k++){
						if(regularTags[k].name === media.media.tags[j].name){
							regularTags[k].list.push(item);
							break;
						};
					};
				};
				if(media.isCustomList){
					for(var j=0;j<media.listLocations.length;j++){
						var foundFlag = false;
						for(var k=0;k<customLists.length;k++){
							if(customLists[k].name === media.listLocations[j]){
								customLists[k].list.push(item);
								foundFlag = true;
								break;
							};
						};
						if(!foundFlag){
							customLists.push({
								name : media.listLocations[j],
								list : [item]
							});
						};
					};
				};
			});
			customTags = customTags.concat(regularTags).concat(customLists);
			customTags.forEach(function(tag){
				let amountCount = 0;
				let average = 0;
				fields.forEach(function(field){
					if(field.sumable){
						tag[field.key] = 0;
					}
				});
				tag.list.forEach(function(item){
					if(item.score != 0){
						amountCount++;
						average += item.score;
					};
					fields.forEach(function(field){
						if(field.sumable){
							tag[field.key] += item[field.key];
						}
					});
				});
				if(average != 0){
					average = average/amountCount;
				};
				tag.average = average;
			});
			return customTags.sort((b,a) => a.list.length - b.list.length);
		};
		var regularTagsCollection = function(list,fields){
			let tags = [];
			list.forEach(function(media){
				let item = {};
				fields.forEach(function(field){
					item[field.key] = field.method(media);
				});
				media.media.tags.forEach(function(tag){
					var foundFlag = false;
					for(var i=0;i<tags.length;i++){
						if(tags[i].name === tag.name){
							tags[i].list.push(item);
							foundFlag = true;
							break;
						};
					};
					if(!foundFlag){
						tags.push({
							name : tag.name,
							list : [item]
						});
					};
				});
			});
			tags.forEach(function(tag){
				let amountCount = 0;
				let average = 0;
				fields.forEach(function(field){
					if(field.sumable){
						tag[field.key] = 0;
					}
				});
				tag.list.forEach(function(item){
					if(item.score != 0){
						amountCount++;
						average += item.score;
					};
					fields.forEach(function(field){
						if(field.sumable){
							tag[field.key] += item[field.key];
						}
					});
				});
				if(average != 0){
					average = average/amountCount;
				};
				tag.average = average;
			});
			return tags.sort((b,a) => a.average - b.average);
		};
		var drawTable = function(data,formatter,tableLocation){
			while(tableLocation.childElementCount){
				tableLocation.removeChild(tableLocation.lastChild);
			};
			const randomData = "data-v-e2beaf26";//I have no idea, but some css selectors want this
			let header = document.createElement("p");
			header.innerText = formatter.title;
			let tableContent = document.createElement("div");
			tableContent.classList.add("table");
			tableContent.setAttribute(randomData,"");
			let headerRow = document.createElement("div");
			headerRow.classList.add("header");
			headerRow.classList.add("row");
			headerRow.setAttribute(randomData,"");
			let indexAccumulator = 0;
			formatter.headings.forEach(function(heading){
				let columnTitle = document.createElement("div");
				columnTitle.innerText = heading;
				if(formatter.focus === indexAccumulator){
					columnTitle.innerHTML += " " + svgAssets.angleDown;
				};
				columnTitle.setAttribute(randomData,"");
				columnTitle.index = +indexAccumulator;
				columnTitle.addEventListener("click",function(){
					formatter.focus = this.index;
					data.sort(formatter.sorting[this.index]);
					drawTable(data,formatter,tableLocation);
				});
				headerRow.appendChild(columnTitle);
				indexAccumulator++;
			});
			tableContent.appendChild(headerRow);
			for(var i=0;i<data.length;i++){
				let row = document.createElement("div");
				row.setAttribute(randomData,"");
				row.classList.add("row");
				formatter.celData.forEach(function(celData){
					let cel = document.createElement("div");
					cel.setAttribute(randomData,"");
					celData(cel,data,i,true);
					row.appendChild(cel);
				});
				row.onclick = function(){
					if(this.nextSibling.style.display === "none"){
						this.nextSibling.style.display = "block";
					}
					else{
						this.nextSibling.style.display = "none";
					}
				};
				tableContent.appendChild(row);
				let showList = document.createElement("div");
				if(formatter.focus === 1){//sorting by count is meaningless, sort alphabetically instead
					data[i].list.sort(formatter.sorting[0]);
				}
				else if(formatter.focus === 2){//average != score
					data[i].list.sort((b,a) => a.score - b.score);
				}
				else{
					data[i].list.sort(formatter.sorting[formatter.focus]);
				}
				for(var j=0;j<data[i].list.length;j++){
					let secondaryRow = document.createElement("div");
					secondaryRow.setAttribute(randomData,"");
					secondaryRow.classList.add("row");
					secondaryRow.classList.add("hohSecondaryRow");
					formatter.celData.forEach(function(celData){
						let cel = document.createElement("div");
						cel.setAttribute(randomData,"");
						celData(cel,data[i].list,j,false);
						secondaryRow.appendChild(cel);
					});
					showList.appendChild(secondaryRow);
				};
				showList.style.display = "none";
				tableContent.insertBefore(showList,row.nextSibling);
			};
			if(formatter.title != ""){
				var tableHider = document.createElement("span");
				tableHider.classList.add("hohMonospace");
				tableHider.classList.add("hohTableHider");
				tableHider.onclick = function(){
					if(this.innerText === "[-]"){
						tableHider.innerText = "[+]";
						tableContent.style.display = "none";
						formatter.display = false;
					}
					else{
						tableHider.innerText = "[-]";
						tableContent.style.display = "block";
						formatter.display = true;
					};
				};
				if(formatter.display){
					tableHider.innerText = "[-]";
				}
				else{
					tableHider.innerText = "[+]";
					tableContent.style.display = "none";
				};
				header.appendChild(tableHider);
				tableLocation.appendChild(header);
			};
			tableLocation.appendChild(tableContent);
			if(localStorageAvailable && formatter.title != ""){
				let regularTagsSetting = document.createElement("p");
				let regularTagsSettingLabel = document.createElement("span");
				regularTagsSettingLabel.innerText = " Regular tags included (applied on reload): ";
				let regularTagsSettingContent = document.createElement("span");
				let regularTagsSettingNew = document.createElement("input");
				let regularTagsSettingAdd = document.createElement("button");
				regularTagsSettingAdd.innerText = "+";

				const localStorageItem = JSON.parse(localStorage.getItem("regularTags" + formatter.title));
				let regularTags = [];
				if(localStorageItem){
					regularTags = localStorageItem;
					for(var i=0;i<regularTags.length;i++){
						let tag = document.createElement("span");
						let tagContent = document.createElement("span");
						let tagCross = document.createElement("span");
						tagContent.innerText = regularTags[i];
						tagCross.innerText = svgAssets.cross;
						tag.classList.add("hohRegularTag");
						tagCross.classList.add("hohCross");
						tagCross.regularTag = regularTags[i] + "";
						tagCross.addEventListener("click",function(){
							for(var j=0;j<regularTags.length;j++){
								if(regularTags[j] === this.regularTag){
									regularTags.splice(j,1);
									localStorage.setItem("regularTags" + formatter.title,JSON.stringify(regularTags));
									break;
								};
							};
							this.parentNode.parentNode.removeChild(this.parentNode);
						});
						tag.appendChild(tagContent);
						tag.appendChild(tagCross);
						regularTagsSettingContent.appendChild(tag);
					};
				};
				regularTagsSettingAdd.addEventListener("click",function(){
					let newTagName = this.previousSibling.value;
					newTagName = newTagName.charAt(0).toUpperCase() + newTagName.slice(1);
					regularTags.push(newTagName);
					let tag = document.createElement("span");
					let tagContent = document.createElement("span");
					let tagCross = document.createElement("span");
					tagContent.innerText = newTagName;
					tagCross.innerText = svgAssets.cross;
					tag.classList.add("hohRegularTag");
					tagCross.classList.add("hohCross");
					tagCross.regularTag = newTagName + "";
					tagCross.addEventListener("click",function(){
						for(var j=0;j<regularTags.length;j++){
							if(regularTags[j] === this.regularTag){
								regularTags.splice(j,1);
								localStorage.setItem("regularTags" + formatter.title,JSON.stringify(regularTags));
								break;
							};
						};
						this.parentNode.parentNode.removeChild(this.parentNode);
					});
					tag.appendChild(tagContent);
					tag.appendChild(tagCross);
					this.previousSibling.previousSibling.appendChild(tag);
					localStorage.setItem("regularTags" + formatter.title,JSON.stringify(regularTags));
				});

				regularTagsSetting.appendChild(regularTagsSettingLabel);
				regularTagsSetting.appendChild(regularTagsSettingContent);
				regularTagsSetting.appendChild(regularTagsSettingNew);
				regularTagsSetting.appendChild(regularTagsSettingAdd);
				tableLocation.appendChild(regularTagsSetting);
			};
		};
		var semaPhoreAnime = false;//I have no idea what "semaphore" means in software
		var semaPhoreManga = false;//but it sounds cool so this is a semaphore
//
		var nativeTagsReplacer = function(){
			if(useScripts.replaceNativeTags === false || semaPhoreAnime === false || semaPhoreManga === false || semaPhoreManga.length === 0){
				return;
			};
			const mixedFields = [
				{
					key : "name",
					sumable : false,
					method : function(media){
						return media.media.title.romaji;
					}
				},
				{
					key : "repeat",
					sumable : false,
					method : function(media){
						return media.repeat;
					}
				},
				{
					key : "status",
					sumable : false,
					method : function(media){
						return media.status;
					}
				},
				{
					key : "type",
					sumable : false,
					method : function(media){
						if(media.progressVolumes === null){
							return "ANIME";
						}
						else{
							return "MANGA";
						}
					}
				},
				{
					key : "mediaId",
					sumable : false,
					method : function(media){
						return media.mediaId;
					}
				},
				{
					key : "score",
					sumable : false,
					method : function(media){
						return media.scoreRaw;
					}
				},
				{
					key : "duration",
					sumable : true,
					method : function(media){
						return media.watchedDuration|0;
					}
				},
				{
					key : "chaptersRead",
					sumable : true,
					method : function(media){
						return media.chaptersRead|0;
					}
				}
			];
			let mixedFormatter = {
				title : "",
				display : true,
				headings : ["Tag","Count","Mean Score","Time Watched","Chapters Read"],
				focus : 2,
				celData : [
					function(cel,data,index,isPrimary){
						if(isPrimary){
							var nameCellCount = document.createElement("div");
							nameCellCount.innerText = (index+1);
							nameCellCount.classList.add("count");
							nameCellCount.setAttribute("data-v-e2beaf26","");
							cel.appendChild(nameCellCount);
							var nameCellTag = document.createElement("a");
							nameCellTag.setAttribute("data-v-2f71893a","");
							nameCellTag.innerText = data[index].name;
							nameCellTag.href = "https://anilist.co/search/anime?includedTags=" + data[index].name + "&onList=true";
							nameCellTag.style.cursor = "pointer";
							cel.appendChild(nameCellTag);
						}
						else{
							var nameCellTag = document.createElement("a");
							nameCellTag.setAttribute("data-v-2f71893a","");
							nameCellTag.innerText = data[index].name;
							if(data[index].type === "ANIME"){
								nameCellTag.href = "/anime/" + data[index].mediaId + "/";
								nameCellTag.style.color = "rgb(var(--color-blue))";
							}
							else{
								nameCellTag.href = "/manga/" + data[index].mediaId + "/";
								nameCellTag.style.color = "rgb(var(--color-green))";
							};
							nameCellTag.classList.add("title");
							nameCellTag.style.marginLeft = "50px";
							nameCellTag.style.display = "block";
							cel.appendChild(nameCellTag);
						}
					},
					function(cel,data,index,isPrimary){
						if(isPrimary){
							cel.innerText = data[index].list.length;
						}
						else{
							let statusDot = document.createElement("div");
							statusDot.classList.add("hohStatusDot");
							statusDot.style.backgroundColor = distributionColours[data[index].status];
							statusDot.title = data[index].status.toLowerCase();
							if(data[index].status === "COMPLETED"){
								statusDot.style.backgroundColor = "transparent";//default case
							}
							cel.appendChild(statusDot);
							if(data[index].repeat === 1){
								cel.innerHTML = svgAssets.repeat;
							}
							else if(data[index].repeat > 1){
								cel.innerHTML = svgAssets.repeat + data[index].repeat;
							}
						}
					},
					function(cel,data,index,isPrimary){
						if(isPrimary){
							if(data[index].average === 0){
								cel.innerText = "-";
							}
							else{
								cel.innerText = Math.round(data[index].average);
							}
						}
						else{
							if(data[index].score === 0){
								cel.innerText = "-";
							}
							else{
								cel.innerText = Math.round(data[index].score);
							}
						}
					},
					function(cel,data,index,isPrimary){
						if(!isPrimary && data[index].type === "MANGA"){
							cel.innerText = "-";
						}
						else if(data[index].duration === 0){
							cel.innerText = "-";
						}
						else if(data[index].duration < 60){
							cel.innerText = Math.round(data[index].duration) + "min";
						}
						else{
							cel.innerText = Math.round(data[index].duration/60) + "h";
						};
					},
					function(cel,data,index,isPrimary){
						if(isPrimary || data[index].type === "MANGA"){
							cel.innerText = data[index].chaptersRead;
						}
						else{
							cel.innerText = "-";
						}
					}
				],
				sorting : [
					(a,b) => ("" + a.name).localeCompare(b.name),
					(b,a) => a.list.length - b.list.length,
					(b,a) => a.average - b.average,
					(b,a) => a.duration - b.duration,
					(b,a) => a.chaptersRead - b.chaptersRead
				]
			};
			let collectedMedia = semaPhoreAnime.concat(semaPhoreManga);
			let listOfTags = regularTagsCollection(collectedMedia,mixedFields);
			for(var i=0;i<listOfTags.length;i++){
				if(listOfTags[i].list.length < 3){
					listOfTags.splice(i--,1);
				};
			};
			let checkNativeTable = function(){
				if(!document.URL.match(/\/stats$/)){
					return;
				};
				let possibleNativeLocation = document.querySelectorAll(".stats-wrap > div > h2");
				if(possibleNativeLocation && possibleNativeLocation.length > 1 && possibleNativeLocation[1].innerText === "Tags"){
					if(possibleNativeLocation[1].nextSibling.id != "regularTagsTable"){
						let regularTagsTable = document.createElement("div");
						regularTagsTable.id = "regularTagsTable";
						possibleNativeLocation[1].parentNode.insertBefore(regularTagsTable,possibleNativeLocation[1].nextSibling);
						drawTable(listOfTags,mixedFormatter,regularTagsTable);
						possibleNativeLocation[1].parentNode.lastChild.style.display = "none";
					};
				}
				setTimeout(checkNativeTable,200);
			};
			checkNativeTable();
			//recycle most of the formatter for genres
			mixedFormatter.headings[0] = "Genre";
			mixedFormatter.celData[0] = function(cel,data,index,isPrimary){
				if(isPrimary){
					var nameCellCount = document.createElement("div");
					nameCellCount.innerText = (index+1);
					nameCellCount.classList.add("count");
					nameCellCount.setAttribute("data-v-e2beaf26","");
					cel.appendChild(nameCellCount);
					var nameCellTag = document.createElement("a");
					nameCellTag.setAttribute("data-v-2f71893a","");
					nameCellTag.innerText = data[index].name;
					nameCellTag.href = "https://anilist.co/search/anime?includedGenres=" + data[index].name + "&onList=true";
					nameCellTag.style.cursor = "pointer";
					cel.appendChild(nameCellTag);
				}
				else{
					var nameCellTag = document.createElement("a");
					nameCellTag.setAttribute("data-v-2f71893a","");
					nameCellTag.innerText = data[index].name;
					if(data[index].type === "ANIME"){
						nameCellTag.href = "/anime/" + data[index].mediaId + "/";
						nameCellTag.style.color = "rgb(var(--color-blue))";
					}
					else{
						nameCellTag.href = "/manga/" + data[index].mediaId + "/";
						nameCellTag.style.color = "rgb(var(--color-green))";
					};
					nameCellTag.classList.add("title");
					nameCellTag.style.marginLeft = "50px";
					nameCellTag.style.display = "block";
					cel.appendChild(nameCellTag);
				}
			};
			collectedMedia.forEach(function(entry){//swap out the tags for genres so we can reuse the code
				entry.media.tags = [];
				entry.media.genres.forEach(function(genre){
					entry.media.tags.push({name:genre});
				});
			});
			let listOfGenres = regularTagsCollection(collectedMedia,mixedFields);
			let checkNativeTable2 = function(){
				if(!document.URL.match(/\/stats$/)){
					return;
				};
				let possibleNativeLocation = document.querySelectorAll(".stats-wrap > div > h2");
				if(possibleNativeLocation && possibleNativeLocation.length && possibleNativeLocation[0].innerText === "Genres"){
					if(possibleNativeLocation[0].nextSibling.id != "regularGenresTable"){
						let regularGenresTable = document.createElement("div");
						regularGenresTable.id = "regularGenresTable";
						possibleNativeLocation[0].parentNode.insertBefore(regularGenresTable,possibleNativeLocation[0].nextSibling);
						drawTable(listOfGenres,mixedFormatter,regularGenresTable);
						possibleNativeLocation[0].parentNode.lastChild.style.display = "none";
					};
				}
				setTimeout(checkNativeTable2,200);
			};
			checkNativeTable2();
		};

//get anime list
		var variables = {
			name: document.URL.match(/\/([\w\-]+)\/stats\/?$/)[1],
			listType: "ANIME"
		};
		var personalStatsCallback = function(data){
			let personalStats = document.getElementById("personalStats");
			personalStats.innerText = "";
			let personalStatsHead = document.createElement("h1");
			const thisName = document.URL.match(/\/([\w\-]+)\/stats/)[1];
			personalStatsHead.innerText = "Anime stats for " + thisName;
			personalStats.appendChild(document.createElement("hr"));
			personalStats.appendChild(personalStatsHead);
			let list = returnList(data);
			if(whoAmI != thisName){
				let compatabilityButton = document.createElement("button");
				compatabilityButton.innerText = "Compatibility";
				compatabilityButton.onclick = function(){compatCheck(list,whoAmI,"hohCheckCompat")};
				personalStats.appendChild(compatabilityButton);
				let hohCheckCompat = document.createElement("div");
				hohCheckCompat.id = "hohCheckCompat";
				personalStats.appendChild(hohCheckCompat);
			};
			let addStat = function(text,value,comment){//value,value,html
				let newStat = document.createElement("p");
				newStat.classList.add("hohStat");
				let newStatText = document.createElement("span");
				newStatText.innerText = text;
				let newStatValue = document.createElement("span");
				newStatValue.innerText = value;
				newStatValue.classList.add("hohStatValue");
				newStat.appendChild(newStatText);
				newStat.appendChild(newStatValue);
				if(comment){
					let newStatComment = document.createElement("span");
					newStatComment.innerHTML = comment;
					newStat.appendChild(newStatComment);
				};
				personalStats.appendChild(newStat);
			};
//first activity
			let oldestYear = 2100;//fix this before 2100
			let oldestMonth = 0;
			let oldestDay = 0;
			list.forEach(function(item){
				if(item.startedAt.year){
					if(item.startedAt.year < oldestYear){
						oldestYear = item.startedAt.year;
						oldestMonth = item.startedAt.month;
						oldestDay = item.startedAt.day;
					}
					else if(
						item.startedAt.year === oldestYear
						&& item.startedAt.month < oldestMonth
					){
						oldestYear = item.startedAt.year;
						oldestMonth = item.startedAt.month;
						oldestDay = item.startedAt.day;
					}
					else if(
						item.startedAt.year === oldestYear
						&& item.startedAt.month === oldestMonth
						&& item.startedAt.day < oldestDay
					){
						oldestYear = item.startedAt.year;
						oldestMonth = item.startedAt.month;
						oldestDay = item.startedAt.day;
					};
				};
			});
//scoring stats
			let previouScore = 0;
			let maxRunLength = 0;
			let maxRunLengthScore = 0;
			let runLength = 0;
			let sumEntries = 0;
			let amount = 0;
			let sumWeight = 0;
			let sumEntriesWeight = 0;
			let average = 0;
			let median = 0;
			let sumDuration = 0;
			let standardDeviation = 0;
			let longestDuration = {
				time: 0,
				name: "",
				status: "",
				rewatch: 0,
				id: 0
			};

			list.sort((a,b) => a.scoreRaw - b.scoreRaw);
			for(var i=0;i<list.length;i++){
				var entryDuration = (list[i].media.duration|0)*(list[i].progress|0);//curent round
				list[i].episodes = (list[i].progress|0);
				if(useScripts.noRewatches && (list[i].repeat|0)){
					entryDuration    = Math.max(1,(list[i].media.episodes|0),(list[i].progress|0))*(list[i].media.duration|0);//first round
					list[i].episodes = Math.max(1,(list[i].media.episodes|0),(list[i].progress|0));
				}
				else{
					entryDuration    += (list[i].repeat|0)*Math.max(1,(list[i].media.episodes|0),(list[i].progress|0))*(list[i].media.duration|0);//repeats
					list[i].episodes += (list[i].repeat|0)*Math.max(1,(list[i].media.episodes|0),(list[i].progress|0));
				}

				list[i].watchedDuration = entryDuration;
				sumDuration += entryDuration;
				if(entryDuration > longestDuration.time){
					longestDuration.time = entryDuration;
					longestDuration.name = list[i].media.title.romaji;
					longestDuration.status = list[i].status;
					longestDuration.rewatch = list[i].repeat;
					longestDuration.id = list[i].mediaId;
				};
				if(list[i].scoreRaw === 0){//don't use unrated shows for scoring stats
					continue;
				};
				if(median === 0){//the list is sorted, so when we are done ignoring the 0-ratings, we can safely find the median
					median = list[i + Math.floor((list.length - i)/2)].scoreRaw;
				};
				amount++;//number of entries rated
				sumEntries += list[i].scoreRaw;
				if(list[i].scoreRaw === previouScore){
					runLength++;
					if(runLength > maxRunLength){
						maxRunLength = runLength;
						maxRunLengthScore = list[i].scoreRaw;
					};
				}
				else{
					runLength = 1;
					previouScore = list[i].scoreRaw;
				};
				sumWeight += (list[i].media.duration|0)*(list[i].media.episodes|0);
				sumEntriesWeight += list[i].scoreRaw*(list[i].media.duration|0)*(list[i].media.episodes|0);
			};
			if(amount){
				average = sumEntries/amount;
			}
			for(var i=0;i<list.length;i++){
				if(list[i].scoreRaw !== 0){
					standardDeviation += (average - list[i].scoreRaw) * (average - list[i].scoreRaw);
				};
			};
			standardDeviation = Math.sqrt(standardDeviation/amount);
			list.sort((a,b) => a.mediaId - b.mediaId);
//display scoring stats
			addStat("Anime on list: ",list.length);
			addStat("Anime rated: ",amount);
			if(amount != 0){//no scores
				if(amount === 1){
					addStat("Only one score given: ",maxRunLengthScore);
				}
				else{
					addStat(
						"Average score: ",
						average.roundPlaces(2)
					);
					addStat(
						"Average score: ",
						(sumEntriesWeight/sumWeight).roundPlaces(2),
						" (weighted by duration)"
					);
					addStat("Median score: ",median);
					addStat(
						"Standard deviation: ",
						standardDeviation.roundPlaces(2)
					);
					if(maxRunLength > 1){
						addStat("Most common score: ",maxRunLengthScore, " (" + maxRunLength + " instances)");
					}
					else{
						addStat("Most common score: ","","no two scores alike");
					};
				};
//longest activity
				var singleText = (100*longestDuration.time/sumDuration).roundPlaces(2) + "% is ";
				singleText += "<a href='https://anilist.co/anime/" + longestDuration.id + "'>" + longestDuration.name + "</a>";
				if(longestDuration.rewatch === 0){
					if(longestDuration.status === "CURRENT"){
						singleText += ". Currently watching."
					}
					else if(longestDuration.status === "PAUSED"){
						singleText += ". On hold."
					}
					else if(longestDuration.status === "DROPPED"){
						singleText += ". Dropped."
					};
				}
				else{
					if(longestDuration.status === "COMPLETED"){
						if(longestDuration.rewatch === 1){
							singleText += ". Rewatched once.";
						}
						else if(longestDuration.rewatch === 2){
							singleText += ". Rewatched twice.";
						}
						else{
							singleText += ". Rewatched " + longestDuration.rewatch + " times.";
						};
					}
					else if(longestDuration.status === "CURRENT" || status === "REPEATING"){
						if(longestDuration.rewatch === 1){
							singleText += ". First rewatch in progress.";
						}
						else if(longestDuration.rewatch === 2){
							singleText += ". Second rewatch in progress.";
						}
						else{
							singleText += ". Rewatch number " + longestDuration.rewatch + " in progress.";
						};
					}
					else if(longestDuration.status === "PAUSED"){
						if(longestDuration.rewatch === 1){
							singleText += ". First rewatch on hold.";
						}
						else if(longestDuration.rewatch === 2){
							singleText += ". Second rewatch on hold.";
						}
						else{
							singleText += ". Rewatch number " + longestDuration.rewatch + " on hold.";
						};
					}
					else if(longestDuration.status === "DROPPED"){
						if(longestDuration.rewatch === 1){
							singleText += ". Dropped on first rewatch.";
						}
						else if(longestDuration.rewatch === 2){
							singleText += ". Dropped on second rewatch.";
						}
						else{
							singleText += ". Dropped on rewatch number " + longestDuration.rewatch + ".";
						};
					};
				};
				addStat(
					"Time watched: ",
					(sumDuration/(60*24)).roundPlaces(2),
					" days (" + singleText + ")"
				);
			};

			let TVepisodes = 0;
			let TVepisodesLeft = 0;
			list.forEach(function(show){
				if(show.media.format === "TV"){
					TVepisodes += show.progress;
					TVepisodes += show.repeat * Math.max(1,(show.media.episodes|0),show.progress);
					if(show.status === "CURRENT"){
						TVepisodesLeft += Math.max((show.media.episodes|0) - show.progress,0);
					};
				};
			});
			addStat("TV episodes watched: ",TVepisodes);
			addStat("TV episodes remaining for current shows: ",TVepisodesLeft);

			var tagless = [];
			for(var i=0;i<list.length;i++){
				if(list[i].media.tags.length === 0 && list[i].status != "PLANNING"){
					tagless.push({id:list[i].mediaId,name:list[i].media.title.romaji});
				};
			};
			if(tagless.length){
				var taglessHead = document.createElement("p");
				taglessHead.innerText = "Some shows on your list have no tags. Would you like to help with that?";
				personalStats.appendChild(taglessHead);
				for(var i=0;i<tagless.length && i<10;i++){
					var taglessLink = document.createElement("a");
					taglessLink.innerText = tagless[i].name;
					taglessLink.href = "https://anilist.co/anime/" + tagless[i].id;
					taglessLink.classList.add("hohTaglessLinkException");
					personalStats.appendChild(taglessLink);
				};
			};
//distribution diagram
			var distribution = {
				"TV" : {},
				"MOVIE" : {},
				"TV_SHORT" : {},
				"MUSIC" : {},
				"OVA" : {},
				"ONA" : {},
				"SPECIAL" : {}
			};
			list.forEach(function(item){
				try{//reason: some people have manga entries in their anime list. Nasty.
					distribution[item.media.format][item.status] = (distribution[item.media.format][item.status]|0) + 1;
				}
				catch(e){
					console.log("Manga in anime list: " + item.media.title.romaji + " (or just missing a release format)");
				};
			});
			var formatDistribution = document.createElement("canvas");
			const margins = {
				height: 200,
				width: 800,
				left: 10,
				right: 10,
				top: 15,
				bottom: 10,
				chartTextBottom: 50,
				barWidth: 10
			};
			formatDistribution.width = margins.width;
			formatDistribution.height = margins.height;
			formatDistribution.style.background = "rgb(var(--color-foreground))";
			var formatDistributionHead = document.createElement("p");
			formatDistributionHead.innerText = "Format distribution";
			personalStats.appendChild(formatDistributionHead);
			personalStats.appendChild(formatDistribution);
			var ctx = formatDistribution.getContext("2d");
			let largestValue = 0;
			for(var format in distribution){//fix this piece of shit some day
				if(distribution.hasOwnProperty(format)){
					for(var statusi in distribution[format]){
						if(distribution[format].hasOwnProperty(statusi)){
							if(distribution[format][statusi] > largestValue){
								largestValue = distribution[format][statusi];
							};
						};
					};
				};
			};
			var yAxisLimit = Math.ceil(
				largestValue/Math.pow(10,(largestValue+"").length-1)
			)*Math.pow(10,(largestValue+"").length-1);//cast to string and check the length is floor(log10(x))

			var diagramFill = function(statusHeaders,formatHeaders,statusArray,formatArray){
				const chartHeight = margins.height - margins.chartTextBottom - margins.bottom  - margins.top;
				ctx.fillStyle =   "rgb(133,150,165)";
				ctx.strokeStyle = "rgb(133,150,165)";
				ctx.textAlign = "end";
				ctx.fillText(yAxisLimit,margins.left + 20,margins.top);
				ctx.fillText(0,margins.left + 20,margins.top + chartHeight);
				ctx.fillText(yAxisLimit/2,margins.left + 20,margins.top + chartHeight/2);
				const chartCellWidth = 100;
				ctx.textAlign = "center";
				for(var i=0;i<formatHeaders.length;i++){
					ctx.fillText(formatHeaders[i],margins.left + 20 + chartCellWidth/2 + i*chartCellWidth,margins.top + chartHeight + 20);
				};
				ctx.beginPath();
				ctx.lineWidth = 0.5;
				ctx.moveTo(margins.left + 25,            Math.round(margins.top - 5));
				ctx.lineTo(margins.width - margins.right,Math.round(margins.top - 5));
				ctx.moveTo(margins.left + 25,            Math.round(margins.top - 5 + chartHeight));
				ctx.lineTo(margins.width - margins.right,Math.round(margins.top - 5 + chartHeight));
				ctx.moveTo(margins.left + 25,            Math.round(margins.top - 5 + chartHeight/2));
				ctx.lineTo(margins.width - margins.right,Math.round(margins.top - 5 + chartHeight/2));
				ctx.stroke();

				ctx.textAlign = "start";
				for(var i=0;i<statusHeaders.length;i++){
					ctx.fillText(statusHeaders[i],margins.left + 65 + i*chartCellWidth,margins.top + chartHeight + 50);
				};
				for(var sIndex = 0;sIndex<statusArray.length;sIndex++){
					ctx.fillStyle = distributionColours[statusArray[sIndex]];
					ctx.fillRect(
						margins.left + 50 + chartCellWidth*sIndex,
						margins.top + chartHeight + 40,
						margins.barWidth,margins.barWidth
					);
					for(var fIndex = 0;fIndex<formatArray.length;fIndex++){
						ctx.fillRect(
							Math.round(
								margins.left + chartCellWidth/2 + fIndex*chartCellWidth + margins.barWidth*sIndex
							),
							Math.round(margins.top + chartHeight - 5),
							margins.barWidth,
							(
								-chartHeight/yAxisLimit
							)*(
								distribution[formatArray[fIndex]][statusArray[sIndex]]|0
							)
						);
					};
				};
			};

			diagramFill(
				["Completed","Current","Paused","Dropped","Planning"],
				["TV","Movie","OVA","ONA","TV-Short","Special","Music"],
				["COMPLETED","CURRENT","PAUSED","DROPPED","PLANNING"],
				["TV","MOVIE","OVA","ONA","TV_SHORT","SPECIAL","MUSIC"]
			);

			if(oldestYear < 2100){
				var joinedAnilist = document.createElement("p");
				joinedAnilist.innerText = "First logged anime: " + oldestYear + "-" + oldestMonth + "-" + oldestDay + ". (users can change start dates)";
				personalStats.appendChild(joinedAnilist);
			};
			var animeFormatter = {
				title : "Custom Anime Tags",
				display : !useScripts.hideCustomTags,
				headings : ["Tag","Count","Mean Score","Time Watched","Episodes","Eps remaining"],
				focus : 1,
				celData : [
					function(cel,data,index,isPrimary){
						if(isPrimary){
							var nameCellCount = document.createElement("div");
							nameCellCount.innerText = (index+1);
							nameCellCount.classList.add("count");
							nameCellCount.setAttribute("data-v-e2beaf26","");
							cel.appendChild(nameCellCount);
							var nameCellTag = document.createElement("a");
							nameCellTag.setAttribute("data-v-2f71893a","");
							nameCellTag.innerText = data[index].name;
							nameCellTag.style.cursor = "pointer";
							cel.appendChild(nameCellTag);
						}
						else{
							var nameCellTag = document.createElement("a");
							nameCellTag.setAttribute("data-v-2f71893a","");
							nameCellTag.innerText = data[index].name;
							nameCellTag.href = "/anime/" + data[index].mediaId + "/";
							nameCellTag.classList.add("title");
							nameCellTag.style.marginLeft = "50px";
							nameCellTag.style.display = "block";
							cel.appendChild(nameCellTag);
						}
					},
					function(cel,data,index,isPrimary){
						if(isPrimary){
							cel.innerText = data[index].list.length;
						}
						else{
							let statusDot = document.createElement("div");
							statusDot.classList.add("hohStatusDot");
							statusDot.style.backgroundColor = distributionColours[data[index].status];
							statusDot.title = data[index].status.toLowerCase();
							if(data[index].status === "COMPLETED"){
								statusDot.style.backgroundColor = "transparent";//default case
							}
							cel.appendChild(statusDot);
							if(data[index].repeat === 1){
								cel.innerHTML += svgAssets.repeat;
							}
							else if(data[index].repeat > 1){
								cel.innerHTML += svgAssets.repeat + data[index].repeat;
							}
						}
					},
					function(cel,data,index,isPrimary){
						if(isPrimary){
							if(data[index].average === 0){
								cel.innerText = "-";
							}
							else{
								cel.innerText = Math.round(data[index].average);
							}
						}
						else{
							if(data[index].score === 0){
								cel.innerText = "-";
							}
							else{
								cel.innerText = Math.round(data[index].score);
							}
						}
					},
					function(cel,data,index){
						if(data[index].duration === 0){
							cel.innerText = "-";
						}
						else if(data[index].duration < 60){
							cel.innerText = Math.round(data[index].duration) + "min";
						}
						else{
							cel.innerText = Math.round(data[index].duration/60) + "h";
						};
					},
					function(cel,data,index){
						cel.innerText = data[index].episodes;
					},
					function(cel,data,index){
						if(data[index].episodes === 0 && data[index].remaining === 0){
							cel.innerText = "-";
						}
						else if(data[index].remaining === 0){
							cel.innerText = "completed";
						}
						else{
							if(useScripts.timeToCompleteColumn){
								if(data[index].remainingTime < 60){
									cel.innerText = data[index].remaining + " (" + data[index].remainingTime + "min)";
								}
								else{
									cel.innerText = data[index].remaining + " (" + Math.round(data[index].remainingTime/60) + "h)";
								};
							}
							else{
								cel.innerText = data[index].remaining;
							}
						}
					}
				],
				sorting : [
					(a,b) => ("" + a.name).localeCompare(b.name),
					(b,a) => a.list.length - b.list.length,
					(b,a) => a.average - b.average,
					(b,a) => a.duration - b.duration,
					(b,a) => a.episodes - b.episodes,
					(b,a) => a.remaining - b.remaining
				]
			};
			const animeFields = [
				{
					key : "name",
					sumable : false,
					method : function(media){
						return media.media.title.romaji;
					}
				},
				{
					key : "mediaId",
					sumable : false,
					method : function(media){
						return media.mediaId;
					}
				},
				{
					key : "score",
					sumable : false,
					method : function(media){
						return media.scoreRaw;
					}
				},
				{
					key : "repeat",
					sumable : false,
					method : function(media){
						return media.repeat;
					}
				},
				{
					key : "status",
					sumable : false,
					method : function(media){
						return media.status;
					}
				},
				{
					key : "duration",
					sumable : true,
					method : function(media){
						return media.watchedDuration;
					}
				},
				{
					key : "episodes",
					sumable : true,
					method : function(media){
						return media.episodes;
					}
				},
				{
					key : "remaining",
					sumable : true,
					method : function(media){
						return Math.max((media.media.episodes|0) - media.progress,0);
					}
				},
				{
					key : "remainingTime",
					sumable : true,
					method : function(media){
						return Math.max(((media.media.episodes|0) - media.progress) * (media.media.duration|0),0);
					}
				}
			];
			let customTags = customTagsCollection(list,animeFormatter.title,animeFields);
			if(customTags.length){
				var customTagsAnimeTable = document.createElement("div");
				customTagsAnimeTable.id = "customTagsAnimeTable";
				personalStats.appendChild(customTagsAnimeTable);
				drawTable(customTags,animeFormatter,customTagsAnimeTable);
			};
			semaPhoreAnime = list;
			nativeTagsReplacer();
		};
		generalAPIcall(queryMediaList,variables,personalStatsCallback);
//manga stats
		var variables = {
			name: document.URL.match(/\/([\w\-]+)\/stats/)[1],
			listType: "MANGA"
		};
		var personalStatsMangaCallback = function(data){
			var thisName = document.URL.match(/\/([\w\-]+)\/stats/)[1];
			var personalStatsManga = document.getElementById("personalStatsManga");
			personalStatsManga.innerText = "";
			var personalStatsMangaHead = document.createElement("h1");
			personalStatsMangaHead.innerText = "Manga stats for " + thisName;
			personalStatsManga.appendChild(document.createElement("hr"));
			personalStatsManga.appendChild(personalStatsMangaHead);
			var list = returnList(data);
			var personalStatsMangaContainer = document.createElement("div");
			personalStatsManga.appendChild(personalStatsMangaContainer);
			var addStat = function(text,value,comment){//value,value,html
				var newStat = document.createElement("p");
				newStat.classList.add("hohStat");
				var newStatText = document.createElement("span");
				newStatText.innerText = text;
				var newStatValue = document.createElement("span");
				newStatValue.innerText = value;
				newStatValue.classList.add("hohStatValue");
				newStat.appendChild(newStatText);
				newStat.appendChild(newStatValue);
				if(comment){
					var newStatComment = document.createElement("span");
					newStatComment.innerHTML = comment;
					newStat.appendChild(newStatComment);
				};
				personalStatsManga.appendChild(newStat);
			};
			var chapters = 0;
			var volumes = 0;
			/*
			For most airing anime, Anilist provides "media.nextAiringEpisode.episode"
			Unfortunately, the same is not the case for releasing manga.
			THIS DOESN'T MATTER the first time a user is reading something, as we are then just using the current progress.
			But on a re-read, we need the total length to count all the chapters read.
			I can (and do) get a lower bound for this by using the current progress (this is what Anilist does),
			but this is not quite accurate, especially early in a re-read.
			The list below is to catch some of those exceptions
			*/
			var unfinishedLookup = function(mediaId,mode,mediaStatus,mediaProgress){
				if(mediaStatus === "FINISHED"){
					return 0;//it may have finished since the list was updated
				};
				if(commonUnfinishedManga.hasOwnProperty(mediaId)){
					if(mode === "chapters"){
						return commonUnfinishedManga[mediaId].chapters;
					}
					else if(mode === "volumes"){
						return commonUnfinishedManga[mediaId].volumes;
					}
					else if(mode === "volumesNow"){
						if(commonUnfinishedManga[mediaId].chapters <= mediaProgress){
							return commonUnfinishedManga[mediaId].volumes;
						}
						else{
							return 0;//conservative
						};
					};
					return 0;//fallback
				}
				else{
					return 0;//not in our list
				};
			};
			list.forEach(function(item){
				var chaptersRead = 0;
				var volumesRead = 0;
				if(item.status === "COMPLETED"){//if it's completed, we can make some safe assumptions
					chaptersRead += Math.max(//chapter progress on the current read
						item.media.chapters,//in most cases, it has a chapter count
						item.media.volumes,//if not, there's at least 1 chapter per volume
						item.progress,//if it doesn't have a volume count either, the current progress is probably not out of date
						item.progressVolumes,//if it doesn't have a chapter progress, count at least 1 chapter per volume
						1//finally, an entry has at least 1 chapter
					);
					volumesRead += Math.max(
						item.progressVolumes,
						item.media.volumes,
						unfinishedLookup(item.mediaId+"","volumesNow",item.media.status,item.progress)//if people have forgotten to update their volume count and have caught up.
					);
				}
				else{//we may only assume what's on the user's list.
					chaptersRead += Math.max(
						item.progress,
						item.progressVolumes
					);
					volumesRead += Math.max(
						item.progressVolumes,
						unfinishedLookup(item.mediaId+"","volumesNow",item.media.status,item.progress)
					);
				};
				if(useScripts.noRewatches && (item.repeat|0)){//if they have a reread, they have at least completed it
					chaptersRead = Math.max(//first round
						item.media.chapters,
						item.media.volumes,
						item.progress,
						item.progressVolumes,
						unfinishedLookup(item.mediaId+"","chapters",item.media.status),//use our lookup table
						1
					);
					volumesRead = Math.max(
						item.media.volumes,
						item.progressVolumes,
						unfinishedLookup(item.mediaId+"","volumes",item.media.status)
					);
				}
				else{
					chaptersRead += item.repeat * Math.max(//chapters from rereads
						item.media.chapters,
						item.media.volumes,
						item.progress,
						item.progressVolumes,
						unfinishedLookup(item.mediaId+"","chapters",item.media.status),//use our lookup table
						1
					);
					volumesRead += item.repeat * Math.max(//many manga have no volumes, so we can't make all of the same assumptions
						item.media.volumes,
						item.progressVolumes,//better than nothing if a volume count is missing
						unfinishedLookup(item.mediaId+"","volumes",item.media.status)
					);
				};
				chapters += chaptersRead;
				volumes += volumesRead;
				item.volumesRead = volumesRead;
				item.chaptersRead = chaptersRead;
			});
//
			var previouScore = 0;
			var maxRunLength = 0;
			var maxRunLengthScore = 0;
			var runLength = 0;
			var sumEntries = 0;
			var average = 0;
			var standardDeviation = 0;
			var amount = 0;
			var median = 0;

			list.sort((a,b) => a.scoreRaw - b.scoreRaw);
			for(var i=0;i<list.length;i++){
				if(list[i].scoreRaw === 0){
					continue;
				};
				if(median === 0){
					median = list[i + Math.floor((list.length - i)/2)].scoreRaw;
				};
				amount++;
				sumEntries += list[i].scoreRaw;
				if(list[i].scoreRaw === previouScore){
					runLength++;
					if(runLength > maxRunLength){
						maxRunLength = runLength;
						maxRunLengthScore = list[i].scoreRaw;
					};
				}
				else{
					runLength = 1;
					previouScore = list[i].scoreRaw;
				};
			};
			addStat("Manga on list: ",list.length);
			addStat("Manga rated: ",amount);
			addStat("Total chapters: ",chapters);
			addStat("Total volumes: ",volumes);
			if(amount){
				average = sumEntries/amount;
			}
			for(var i=0;i<list.length;i++){
				if(list[i].scoreRaw !== 0){
					standardDeviation += (average - list[i].scoreRaw) * (average - list[i].scoreRaw);
				};
			};
			standardDeviation = Math.sqrt(standardDeviation/amount);
			list.sort((a,b) => a.mediaId - b.mediaId);

			if(amount != 0){//no scores
				if(amount === 1){
					addStat(
						"Only one score given: ",
						maxRunLengthScore
					);
				}
				else{
					addStat(
						"Average score: ",
						average.roundPlaces(2)
					);
					addStat("Median score: ",median);
					addStat(
						"Standard deviation: ",
						standardDeviation.roundPlaces(2)
					);
					if(maxRunLength > 1){
						addStat("Most common score: ",maxRunLengthScore, " (" + maxRunLength + " instances)");
					}
					else{
						addStat("Most common score: ","","no two scores alike");
					};
				};
			};
//
			var mangaFormatter = {
				title : "Custom Manga Tags",
				display : !useScripts.hideCustomTags,
				headings : ["Tag","Count","Mean Score","Chapters","Volumes"],
				focus : 1,
				celData : [
					function(cel,data,index,isPrimary){
						if(isPrimary){
							var nameCellCount = document.createElement("div");
							nameCellCount.innerText = (index+1);
							nameCellCount.classList.add("count");
							nameCellCount.setAttribute("data-v-e2beaf26","");
							cel.appendChild(nameCellCount);
							var nameCellTag = document.createElement("a");
							nameCellTag.setAttribute("data-v-2f71893a","");
							nameCellTag.innerText = data[index].name;
							nameCellTag.style.cursor = "pointer";
							cel.appendChild(nameCellTag);
						}
						else{
							var nameCellTag = document.createElement("a");
							nameCellTag.setAttribute("data-v-2f71893a","");
							nameCellTag.innerText = data[index].name;
							nameCellTag.href = "/manga/" + data[index].mediaId + "/";
							nameCellTag.classList.add("title");
							nameCellTag.style.marginLeft = "50px";
							nameCellTag.style.display = "block";
							cel.appendChild(nameCellTag);
						}
					},
					function(cel,data,index,isPrimary){
						if(isPrimary){
							cel.innerText = data[index].list.length;
						}
						else{
							let statusDot = document.createElement("div");
							statusDot.classList.add("hohStatusDot");
							statusDot.style.backgroundColor = distributionColours[data[index].status];
							statusDot.title = data[index].status.toLowerCase();
							if(data[index].status === "COMPLETED"){
								statusDot.style.backgroundColor = "transparent";//default case
							}
							cel.appendChild(statusDot);
							if(data[index].repeat === 1){
								cel.innerHTML = svgAssets.repeat;
							}
							else if(data[index].repeat > 1){
								cel.innerHTML = svgAssets.repeat + data[index].repeat;
							}
						}
					},
					function(cel,data,index,isPrimary){
						if(isPrimary){
							if(data[index].average === 0){
								cel.innerText = "-";
							}
							else{
								cel.innerText = Math.round(data[index].average);
							}
						}
						else{
							if(data[index].score === 0){
								cel.innerText = "-";
							}
							else{
								cel.innerText = Math.round(data[index].score);
							}
						}
					},
					function(cel,data,index){
						cel.innerText = data[index].chaptersRead;
					},
					function(cel,data,index){
						cel.innerText = data[index].volumesRead;
					}
				],
				sorting : [
					(a,b) => ("" + a.name).localeCompare(b.name),
					(b,a) => a.list.length - b.list.length,
					(b,a) => a.average - b.average,
					(b,a) => a.chaptersRead - b.chaptersRead,
					(b,a) => a.volumesRead - b.volumesRead
				]
			};
			const mangaFields = [
				{
					key : "name",
					sumable : false,
					method : function(media){
						return media.media.title.romaji;
					}
				},
				{
					key : "repeat",
					sumable : false,
					method : function(media){
						return media.repeat;
					}
				},
				{
					key : "status",
					sumable : false,
					method : function(media){
						return media.status;
					}
				},
				{
					key : "mediaId",
					sumable : false,
					method : function(media){
						return media.mediaId;
					}
				},
				{
					key : "score",
					sumable : false,
					method : function(media){
						return media.scoreRaw;
					}
				},
				{
					key : "chaptersRead",
					sumable : true,
					method : function(media){
						return media.chaptersRead;
					}
				},
				{
					key : "volumesRead",
					sumable : true,
					method : function(media){
						return media.volumesRead;
					}
				}
			];
			let customTags = customTagsCollection(list,mangaFormatter.title,mangaFields);
			if(customTags.length){
				let customTagsMangaTable = document.createElement("div");
				customTagsMangaTable.id = "customTagsMangaTable";
				personalStatsManga.appendChild(customTagsMangaTable);
				drawTable(customTags,mangaFormatter,customTagsMangaTable);
			};
			semaPhoreManga = list;
			nativeTagsReplacer();
		};
		generalAPIcall(queryMediaList,variables,personalStatsMangaCallback);
	};
	for(var i=1;i<filterGroup.children.length;i++){
		filterGroup.children[i].onclick = function(){
			let statsWrap = document.querySelector(".stats-wrap");
			for(var j=0;j<statsWrap.children.length;j++){
				statsWrap.children[j].style.display = "initial";
			};
			let hohActive = document.getElementsByClassName("hohActive");
			for(var j=0;j<hohActive.length;j++){
				hohActive[j].classList.remove("hohActive");
			};
			document.getElementById("hohStats").style.display = "none";
			if(this.innerText === "Genres & Tags"){
				let possibleRegular = document.getElementById("regularGenresTable");
				if(possibleRegular){
					possibleRegular.style.display = "inline";
					possibleRegular.nextElementSibling.style.display = "none";
				};
				setTimeout(function(){
					let possibleRegularTags = document.getElementById("regularTagsTable");
					if(possibleRegularTags){
						if(possibleRegularTags.nextElementSibling.id === "regularGenresTable"){
							possibleRegularTags.parentNode.removeChild(possibleRegularTags.nextElementSibling);
						};
					};
				},200);
			}
			else{
				let possibleRegular = document.getElementById("regularGenresTable");
				if(possibleRegular){
					possibleRegular.style.display = "none";
					possibleRegular.nextElementSibling.style.display = "inline";
				};
			};
		};
	};
	filterGroup.appendChild(hohStatsTrigger);
	var statsWrap = document.querySelector(".stats-wrap");
	if(statsWrap){
		let hohStats = document.createElement("div");
		hohStats.id = "hohStats";
		hohStats.style.display = "none";
		hohStats.calculated = false;
		statsWrap.appendChild(hohStats);
		generateStatPage();
	};
};

function draw3x3(){
	const URLstuff = document.URL.match(/^https:\/\/anilist\.co\/user\/(.+)\/(animelist|mangalist)/);
	if(!URLstuff){
		return;
	};
	if(document.querySelector(".hohExtraFilters")){
		return;
	};
	let filters = document.querySelector(".filters-wrap");
	if(!filters){
		setTimeout(function(){
			if(document.URL.match(/^https:\/\/anilist\.co\/.+\/(anime|manga)list/)){
				draw3x3();
			};
		},100);
		return;
	};
	let extraFilters = document.createElement("div");
	extraFilters.style.marginTop = "15px";
	extraFilters.classList.add("hohExtraFilters");
	let buttonDraw3x3 = document.createElement("span");
	buttonDraw3x3.innerText = "3x3";
	buttonDraw3x3.id = "hohDraw3x3";
	buttonDraw3x3.title = "Create a 3x3 from 9 selected entries";
	buttonDraw3x3.onclick = function(){
		this.style.color = "rgb(var(--color-blue))";
		let counter = 0;
		let linkList = [];
		let cardList = document.querySelectorAll(".entry-card.row,.entry.row");
		cardList.forEach(function(card){
			card.onclick = function(){
				if(this.draw3x3selected){
					counter--;
					linkList[this.draw3x3selected-1] = "";
					this.draw3x3selected = false;
					this.style.borderStyle = "none";
				}
				else{
					counter++;
					linkList.push(this.querySelector(".cover .image").style.backgroundImage.replace("url(","").replace(")","").replace('"',"").replace('"',""));
					this.draw3x3selected = +linkList.length;
					this.style.borderStyle = "solid";
					if(counter === 9){
						for(var i=0;i<linkList.length;i++){
							if(linkList[i] === ""){
								linkList.splice(i,1);
							};
						};
						let displayBox = document.createElement("div");
						displayBox.classList.add("hohDisplayBox");
						document.querySelector("#app").appendChild(displayBox);
						let displayBoxInstructions = document.createElement("p");
						displayBoxInstructions.innerText = "Save the image below:";
						displayBox.appendChild(displayBoxInstructions);
						let displayBoxClose = document.createElement("span");
						displayBoxClose.innerText = svgAssets.cross;
						displayBoxClose.onclick = function(){
							displayBox.parentNode.removeChild(displayBox);
							cardList.forEach(function(card){
								card.draw3x3selected = false;
								card.style.borderStyle = "none";
							});
							counter = 0;
							linkList = [];
						};
						displayBoxClose.classList.add("hohDisplayBoxClose");
						displayBox.appendChild(displayBoxClose);
						let formattingSettings = document.createElement("div");
						displayBox.appendChild(formattingSettings);
						let finalCanvas = document.createElement("canvas");
						displayBox.appendChild(finalCanvas);
						finalCanvas.width = 230*3;
						finalCanvas.height = 345*3;
						let ctx = finalCanvas.getContext("2d");
						let drawStuff = function(image,x,y,width,height){
							let img = new Image();
							img.onload = function(){
								ctx.drawImage(img,x,y,width,height);
							}
							img.src = image;
						};
						for(var i=0;i<3;i++){
							for(var j=0;j<3;j++){
								drawStuff(linkList[i*3+j],j*230,i*345,230,345);
							};
						};
					}
				}
			};
		});
	}
	extraFilters.appendChild(buttonDraw3x3);
	if(useScripts.tagIndex){
		let tagIndex = document.createElement("div");
		extraFilters.appendChild(tagIndex);
		var collectNotes = function(data){
			let customTags = [];
			let listData = returnList(data,true);
			listData.forEach(function(entry){
				if(entry.notes){
					var tagMatches = entry.notes.match(/(#\S+)/g);
					if(tagMatches){
						for(var j=0;j<tagMatches.length;j++){
							if(tagMatches[j].match(/#039/)){//common character encoding error that isn't worth including
								continue;
							};
							var foundFlag = false;
							for(var k=0;k<customTags.length;k++){
								if(customTags[k].name === tagMatches[j]){
									customTags[k].count++;
									foundFlag = true;
									break;
								};
							};
							if(!foundFlag){
								customTags.push({
									name: tagMatches[j],
									count: 1
								});
							};
						};
					};
					var commandMatches = entry.notes.match(/\$({.*})\$/);
					if(commandMatches){
						try{
							var noteContent = JSON.parse(commandMatches[1]);
							if(noteContent.hasOwnProperty("lists")){
								noteContent.lists.forEach(function(list){
									if(list.hasOwnProperty("name") && list.hasOwnProperty("info")){
										var titles = document.querySelectorAll("h3.section-name");
										for(var i=0;i<titles.length;i++){
											if(titles[i].innerText === list.name){
												var descriptionNode = document.createElement("p");
												descriptionNode.innerText = list.info;
												titles[i].parentNode.insertBefore(descriptionNode,titles[i].nextSibling);
												break;
											};
										};
									};
								});
							};
						}
						catch(e){
							console.log("Unable to parse JSON in list note");
						};
					};
				};
			});
			customTags.sort((b,a)=>a.count - b.count);
			while(tagIndex.childElementCount){
				tagIndex.removeChild(tagIndex.lastChild);
			};
			customTags.forEach(function(tag){
				let tagElement = document.createElement("p");
				tagElement.innerText = tag.name;
				tagElement.style.cursor = "pointer";
				tagElement.onclick = function(){
					let filterBox = document.querySelector(".entry-filter input");
					filterBox.value = tag.name;
					let event = new Event("input");
					filterBox.dispatchEvent(event);
				};
				tagIndex.appendChild(tagElement);
			});
		};
		let variables = {
			name: URLstuff[1],
			listType: "ANIME"
		};
		if(URLstuff[2] === "mangalist"){
			variables.listType = "MANGA";
		};
		generalAPIcall(queryMediaListNotes,variables,collectNotes);
	}
	filters.appendChild(extraFilters);
};

function addFeedFilters(){
	if(!document.URL.match(/^https:\/\/anilist\.co\/home\/?$/)){
		return;
	};
	let filterBox = document.querySelector(".hohFeedFilter");
	if(filterBox){
		return;
	};
	let activityFeedWrap = document.querySelector(".activity-feed-wrap");
	if(!activityFeedWrap){
		setTimeout(addFeedFilters,100);
		return;
	};
	filterBox = document.createElement("div");
	filterBox.innerText = "At least ";
	filterBox.classList.add("hohFeedFilter");
	activityFeedWrap.appendChild(filterBox);
	activityFeedWrap.style.position = "relative";
	activityFeedWrap.children[0].childNodes[0].nodeValue = "";
	let commentFilterBoxInput = document.createElement("input");
	let likeFilterBoxInput = document.createElement("input");
	commentFilterBoxInput.type = "number";
	likeFilterBoxInput.type = "number";
	if(localStorageAvailable){
		commentFilterBoxInput.value = useScripts.feedCommentComments;
		likeFilterBoxInput.value = useScripts.feedCommentLikes;
		commentFilterBoxInput.onchange = function(){
			useScripts.feedCommentComments = commentFilterBoxInput.value;
			localStorage.setItem("hohSettings",JSON.stringify(useScripts));
		};
		likeFilterBoxInput.onchange = function(){
			useScripts.feedCommentLikes = likeFilterBoxInput.value;
			localStorage.setItem("hohSettings",JSON.stringify(useScripts));
		};
	}
	else{
		commentFilterBoxInput.value = 0;
		likeFilterBoxInput.value = 0;
	};
	let commentFilterBoxLabel = document.createElement("span");
	let likeFilterBoxLabel = document.createElement("span");
	commentFilterBoxLabel.innerText = " comments ";
	likeFilterBoxLabel.innerText = " likes. ";
	let allFilterBox = document.createElement("button");
	allFilterBox.innerText = "Reset";
	allFilterBox.style.padding = "0px";
	allFilterBox.onclick = function(){
		commentFilterBoxInput.value = 0;
		likeFilterBoxInput.value = 0;
		if(localStorageAvailable){
			useScripts.feedCommentComments = 0;
			useScripts.feedCommentLikes = 0;
			localStorage.setItem("hohSettings",JSON.stringify(useScripts));
		}
	};
	filterBox.appendChild(commentFilterBoxInput);
	filterBox.appendChild(commentFilterBoxLabel);
	filterBox.appendChild(likeFilterBoxInput);
	filterBox.appendChild(likeFilterBoxLabel);
	filterBox.appendChild(allFilterBox);
	let postRemover = function(){
		if(!document.URL.match(/^https:\/\/anilist\.co\/home\/?$/)){
			return;
		};
		let activityFeed = activityFeedWrap.querySelector(".activity-feed");
		if(activityFeed){
			let duplicates = [];
			for(var i=0;i<activityFeed.children.length;i++){
				if(activityFeed.children[i].querySelector(".el-dialog__wrapper")){
					continue;
				};
				let actionLikes = activityFeed.children[i].querySelector(".action.likes .button .count");
				if(actionLikes){
					actionLikes = parseInt(actionLikes.innerText);
				}
				else{
					actionLikes = 0;
				};
				let actionReplies = activityFeed.children[i].querySelector(".action.replies .count");
				if(actionReplies){
					actionReplies = parseInt(actionReplies.innerText);
				}
				else{
					actionReplies = 0;
				};
				let actionHref = activityFeed.children[i].querySelector(".time > a.action").href;
				if(
					actionLikes >= likeFilterBoxInput.value
					&& (likeFilterBoxInput.value >= 0 || actionLikes < -likeFilterBoxInput.value)
					&& actionReplies >= commentFilterBoxInput.value
					&& (commentFilterBoxInput.value >= 0 || actionReplies < -commentFilterBoxInput.value)
					&& (duplicates.indexOf(actionHref) === -1)
				){
					activityFeed.children[i].style.display = "";
				}
				else{
					activityFeed.children[i].style.display = "none";
				};
				duplicates.push(actionHref);
			};
		};
		setTimeout(function(){
			postRemover();
		},200);
	};
	postRemover();
};

function expandRight(){
	if(!document.URL.match(/^https:\/\/anilist\.co\/home\/?$/)){
		return;
	};
	let possibleFullWidth = document.querySelector(".home.full-width");
	if(possibleFullWidth){
		let homeContainer = possibleFullWidth.parentNode;
		let sideBar = document.querySelector(".activity-feed-wrap")
		if(!sideBar){
			setTimeout(expandRight,100);
			return;
		};
		sideBar = sideBar.nextElementSibling;
		sideBar.insertBefore(possibleFullWidth,sideBar.firstChild);
		let setSemantics = function(){
			let toggle = document.querySelector(".size-toggle.fa-compress");
			if(toggle){
				toggle.onclick = function(){
					homeContainer.insertBefore(possibleFullWidth,homeContainer.firstChild);
				};
			}
			else{
				setTimeout(setSemantics,200);
			};
		};setSemantics();
	}
}

let globalMatchingID = 0;

function mangaGuess(){
	let URLstuff = document.URL.match(/^https:\/\/anilist\.co\/manga\/(\d+)\/?(.*)?/);
	if(!URLstuff){
		return;
	};
	let possibleReleaseStatus = document.querySelectorAll(".data-set .value");
	if(possibleReleaseStatus.length){
		let foundIndex = -1;
		for(var i=0;i<possibleReleaseStatus.length;i++){
			if(possibleReleaseStatus[i].innerText.match(/^Releasing/)){
				foundIndex = i;
				break;
			};
		};
		if(foundIndex > -1){
			if(globalMatchingID !== URLstuff[1]){
				possibleReleaseStatus[foundIndex].innerText = "Releasing";
			}
			else{
				if(possibleReleaseStatus[foundIndex].innerText !== "Releasing"){
					return;
				}
			};
			globalMatchingID = URLstuff[1];
			possibleReleaseStatus = possibleReleaseStatus[i];
			const variables = {id: URLstuff[1],userName: whoAmI};
			let query = `
query (
    $id: Int,
    $userName: String
  ) {
  Page (page: 1) {
    activities(
      mediaId: $id,
      sort: ID_DESC
    ) {
      ... on ListActivity {
	progress
        userId
      }
    }
  }
  MediaList (
      userName: $userName,
      mediaId: $id
    ) {
    progress
  }
}`;
			let possibleMyStatus = document.querySelector(".actions .list .add");
			const simpleQuery = !possibleMyStatus || possibleMyStatus.innerText === "Add To List" || possibleMyStatus.innerText === "Planning";
			if(simpleQuery){
				query = `
query (
    $id: Int
  ) {
  Page (page: 1) {
    activities(
      mediaId: $id,
      sort: ID_DESC
    ) {
      ... on ListActivity {
	progress
        userId
      }
    }
  }
}`;
			};
			let highestChapterFinder = function(data){
				if(possibleReleaseStatus.innerText !== "Releasing"){
					return;
				}
				let guesses = [];
				let userIdCache = [];
				data.data.Page.activities.forEach(function(activity){
					if(activity.progress){
						let chapterMatch = parseInt(activity.progress.match(/\d+$/)[0]);
						if(userIdCache.indexOf(activity.userId) === -1){
							guesses.push(chapterMatch);
							userIdCache.push(activity.userId);
						};
					};
				});
				guesses.sort((b,a)=>a-b);
				if(guesses.length){
					let bestGuess = guesses[0];
					if(guesses.length > 2){
						var diff = guesses[0] - guesses[1];
						var inverseDiff = 1 + Math.ceil(50/diff);
						if(guesses.length >= inverseDiff){
							if(guesses[1] === guesses[inverseDiff]){
								bestGuess = guesses[1];
							};
						};
					};
					if(commonUnfinishedManga.hasOwnProperty(variables.id)){
						if(bestGuess < commonUnfinishedManga[variables.id].chapters){
							bestGuess = commonUnfinishedManga[variables.id].chapters;
						};
					};
					if(simpleQuery){
						if(bestGuess > 0){
							possibleReleaseStatus.innerText += " (" + bestGuess + "?)";
						}
					}
					else{
						if(bestGuess < data.data.MediaList.progress){
							bestGuess = data.data.MediaList.progress;
						};
						if(bestGuess > 0){
							if(bestGuess === data.data.MediaList.progress){
								possibleReleaseStatus.innerHTML += " <span style='color:rgb(var(--color-green))'>(" + bestGuess + "?)</span>";
							}
							else{
								possibleReleaseStatus.innerHTML += " (" + bestGuess + "?) <span style='color:rgb(var(--color-red))'>[+" + (bestGuess - data.data.MediaList.progress) + "]</span>";
							};
						}
					};
				};
			};
			generalAPIcall(query,variables,highestChapterFinder);
		}
	}
	else{
		setTimeout(mangaGuess,200);
	};
}

if(useScripts.ALbuttonReload){
	let logo = document.querySelector(".logo");
	if(logo){
		logo.onclick = function(){
			if(document.URL.match(/home\/?$/)){//we only want this behaviour here
				window.location.reload(false);//reload page, but use cache if possible
			}
		}
	}
}

function enumerateSubmissionStaff(){
	if(!document.URL.match(/^https:\/\/anilist\.co\/edit/)){
		return;
	};
	setTimeout(function(){
		enumerateSubmissionStaff();
	},500);
	let staffFound = [];
	let staffEntries = document.querySelectorAll(".staff-row .col > .image");
	Array.from(staffEntries).forEach(function(staff){
		let enumerate = staffFound.filter(a => a===staff.href).length;
		if(enumerate === 1){
			let firstStaff = document.querySelector(".staff-row .col > .image[href=\"" + staff.href.replace("https://anilist.co","") + "\"]");
			if(!firstStaff.previousSibling){
				let enumerateSpan = document.createElement("span");
				enumerateSpan.classList.add("hohEnumerateStaff");
				enumerateSpan.innerText = 1;
				firstStaff.parentNode.insertBefore(enumerateSpan,firstStaff);
			};
		}
		if(enumerate > 0){
			if(staff.previousSibling){
				staff.previousSibling.innerText = enumerate + 1;
			}
			else{
				let enumerateSpan = document.createElement("span");
				enumerateSpan.classList.add("hohEnumerateStaff");
				enumerateSpan.innerText = (enumerate + 1);
				staff.parentNode.insertBefore(enumerateSpan,staff);
			}
		};
		staffFound.push(staff.href);
	});
}

var urlChangedDependence = false;

function handleScripts(url){
	if(url === "https://anilist.co/notifications" && useScripts.notifications){
		enhanceNotifications();
		return;
	};
	if(url.match(/^https:\/\/anilist\.co\/(anime|manga)\/\d*\/[\w\-]*\/social/)){
		if(useScripts.socialTab){
			enhanceSocialTab();
		};
	};
	if(
		url.match(/\/stats\/?$/)
		&& useScripts.moreStats
	){
		addMoreStats();
	};
	if(
		url.match(/^https:\/\/anilist\.co\/home#access_token/)
	){
		let tokenList = location.hash.split("&").map(a=>a.split("="));
		useScripts.accessToken = tokenList[0][1];
		localStorage.setItem("hohSettings",JSON.stringify(useScripts));
		location.replace(location.protocol + "//" + location.hostname + location.pathname);
	};
	if(
		url.match(/^https:\/\/anilist\.co\/home#aniscripts-login/)
	){
		if(useScripts.accessToken){
			alert("Already authorized. You can rewoke this under 'apps' in your Anilist settings");
		}
		else{
			location.href = authUrl;
		};
	};
	if(url.match(/^https:\/\/anilist\.co\/user/)){
		if(useScripts.completedScore || useScripts.droppedScore){//we also want this script to run on user pages
			addCompletedScores();
		};
	}
	else if(
		url.match(/^https:\/\/anilist\.co\/forum\/thread\/.*/)
		&& useScripts.forumComments
	){
		enhanceForum();
	}
	else if(url.match(/^https:\/\/anilist\.co\/staff\/.*/)){
		if(useScripts.staffPages){
			enhanceStaff();
		}
		if(useScripts.replaceStaffRoles){
			replaceStaffRoles();
		};
	}
	else if(
		url.match(/^https:\/\/anilist\.co\/character\/.*/)
		&& useScripts.characterFavouriteCount
	){
		enhanceCharacter();
	}
	else if(
		url.match(/^https:\/\/anilist\.co\/studio\/.*/)
		&& useScripts.studioFavouriteCount
	){
		enhanceStudio();
	}
	else if(
		url.match(/^https:\/\/anilist\.co\/edit/)
		&& useScripts.enumerateSubmissionStaff
	){
		enumerateSubmissionStaff();
	};
	if(
		url.match(/^https:\/\/anilist\.co\/.+\/(anime|manga)list/)
		&& useScripts.draw3x3
	){
		draw3x3();
	};
	if(url.match(/^https:\/\/anilist\.co\/search\/characters\/?$/)){
		if(useScripts.characterFavouriteCount){
			enhanceCharacterBrowse();
		};
		document.title = "Find Characters · AniList";
	}
	else if(url.match(/^https:\/\/anilist\.co\/search\/staff\/?$/)){
		if(useScripts.staffPages){
			enhanceStaffBrowse();
		};
		document.title = "Find Staff · AniList";
	}
	else if(url.match(/^https:\/\/anilist\.co\/search\/studios\/?$/)){
		document.title = "Find Studios · AniList";
	}
	else if(url.match(/^https:\/\/anilist\.co\/search\/anime\/?$/)){
		document.title = "Find Anime · AniList";
		setTimeout(function(){
			if(document.URL.match(/^https:\/\/anilist\.co\/search\/anime\/?$/)){
				document.title = "Find Anime · AniList";
			};
		},100);
	}
	else if(url.match(/^https:\/\/anilist\.co\/search\/manga\/?$/)){
		document.title = "Find Manga · AniList";
	};
	var mangaAnimeMatch = url.match(/^https:\/\/anilist\.co\/(anime|manga)\/(\d+)\/?(.*)?/);
	if(mangaAnimeMatch){
		if(useScripts.tagDescriptions){
			enhanceTags();
		};
		if(useScripts.dubMarker && mangaAnimeMatch[1] === "anime"){
			dubMarker();
		}
		else if(useScripts.mangaGuess && mangaAnimeMatch[1] === "manga"){
			mangaGuess();
		};
		if(localStorageAvailable){
			let titleAliases = JSON.parse(localStorage.getItem("titleAliases"));
			if(useScripts.shortRomaji){
				titleAliases = shortRomaji.concat(titleAliases);
			};
			if(titleAliases){
				const urlID = mangaAnimeMatch[2];
				for(var i=0;i<titleAliases.length;i++){
					if(titleAliases[i][0] === "css/"){
						continue;
					};
					if(titleAliases[i][0].substring(7,titleAliases[i][0].length-1) === urlID){
						history.replaceState({},"","/" + mangaAnimeMatch[1] + "/" + urlID + "/" + safeURL(titleAliases[i][1]) + "/");
						let titleReplacer = function(){
							if(urlChangedDependence === false){//I have to kill these global flags with fire some day
								return;
							};
							var mainTitle = document.querySelector("h1");//fragile, just like your heterosexuality
							if(mainTitle){
								mainTitle.innerText = titleAliases[i][1];
								return;
							}
							else{
								urlChangedDependence = true;
								setTimeout(titleReplacer,100);
							};
						};
						urlChangedDependence = true;
						titleReplacer();
						break;
					};
				};
			};
		};
	};
	if(url.match(/^https:\/\/anilist\.co\/home\/?$/)){
		if(useScripts.completedScore || useScripts.droppedScore){
			addCompletedScores();
		};
		if(useScripts.progressBar){
			addProgressBar();
		};
		if(useScripts.feedCommentFilter){
			addFeedFilters();
		};
		if(useScripts.expandRight){
			expandRight();
		};
	}
	else if(url.match(/^https:\/\/anilist\.co\/activity\/?/)){
		if(useScripts.completedScore || useScripts.droppedScore){
			addCompletedScores();
		};
	};
	if(useScripts.notifications && useScripts.accessToken){
		let boring = 0;
		authAPIcall(queryAuthNotifications,{page:1,name:whoAmI},function(data){
			for(var i=0;i<data.data.Page.notifications.length && i<data.data.User.unreadNotificationCount;i++){
				if(["ACTIVITY_LIKE","ACTIVITY_REPLY_LIKE"].indexOf(data.data.Page.notifications[i].type) === -1){
					boring++;
				};
			};
			if(boring === 0){
				let notificationDot = document.querySelector(".notification-dot");
				if(notificationDot){
					notificationDot.style.background = "none";
				};
			};
		});
	};
};

const useScriptsDefinitions = [
{
	id: "",
	description: "",
	type: "heading",
	heading: "Notifications and extended behaviour"
},{
	id: "notifications",
	description: "Improve notifications"
},{
	id: "hideLikes",
	description: "Hide like notifications. Will not affect the notification count"
},{
	id: "settingsTip",
	description: "Show a notice on the notification page for where the script settings can be found"
},{
	id: "socialTab",
	description: "Make activities on the social tab more compact and calculate the average score of people you follow"
},{
	id: "forumComments",
	description: "Add a button to collapse comment threads in the forum"
},{
	id: "mangaBrowse",
	description: "Make browse default to manga"
},{
	id: "ALbuttonReload",
	description: "Make the 'AL' button reload the feeds on the homepage"
},{
	id: "",
	description: "",
	type: "heading",
	heading: "Extra info"
},{
	id: "tagDescriptions",
	description: "Show the definitions of tags when adding new ones to an entry"
},{
	id: "staffPages",
	description: "Show favourite count on staff pages"
},{
	id: "enumerateSubmissionStaff",
	description: "Enumerate the multiple credits for staff in the submission form to help avoid duplicates"
},{
	id: "replaceStaffRoles",
	description: "Add sorting to staff role pages"
},{
	id: "titleLanguage",
	description: "",
	type: "select",
	values: ["Romaji","Native","English"]
},{
	id: "characterFavouriteCount",
	description: "Show favourite count on character pages"
},{
	id: "studioFavouriteCount",
	description: "Show favourite count on staff pages"
},{
	id: "completedScore",
	description: "Show the score on the activity when people complete something"
},{
	id: "droppedScore",
	description: "Show the score on the activity when people drop something"
},{
	id: "tagIndex",
	description: "Show an index of custom tags on anime and manga lists"
},{
	id: "CSSfollowCounter",
	description: "Follow count on social page [from userstyle]"
},{
	id: "CSSsubmissionCounter",
	description: "Add counters to your submission page"
},{
	id: "dubMarker",
	subSettings: ["dubMarkerLanguage"],
	description: "Add a notice on top of the other data on an anime page if a dub is available (works by checking for voice actors)"
},{
	id: "dubMarkerLanguage",
	requires: ["dubMarker"],
	description: "",
	type: "select",
	values: ["English","German","Italian","Spanish","French","Korean","Portuguese","Hebrew","Hungarian"]
},{
	id: "mangaGuess",
	description: "Make a guess for the number of chapters for releasing manga"
},{
	id: "",
	description: "",
	type: "heading",
	heading: "Stats and tags"
},{
	id: "moreStats",
	visible: false,//if you disable the stats, you can't adjust the settings anymore, so that's a bad idea
	description: "Show an additional tab on the stats page"
},{
	id: "replaceNativeTags",
	description: "Extend the native table of tags. Adds a chapter count, and a list of individual entries when clicking on a row."
},{
	id: "noRewatches",
	description: "Don't include progress from rewatches/rereads in stats"
},{
	id: "hideCustomTags",
	description: "Hide the custom tags tables by default"
},{
	id: "timeToCompleteColumn",
	description: "Add 'time to complete' info to the tag tables"
},{
	id: "",
	description: "",
	type: "heading",
	heading: "Cosmetic changes"
},{
	id: "CSSstudioStats",
	description: "Separate animation studios from other studios in stats [from userstyle]"
},{
	id: "CSSsmileyScore",
	description: "Give smiley ratings distinct colours [from userstyle]"
},{
	id: "CSSexpandFeedFilters",
	description: "Expand the feed filters"
},{
	id: "feedCommentFilter",
	description: "Add filter options to the feeds to hide posts with few comments or likes. Use negative values for hiding posts with too many."
},{
	id: "colourPicker",
	description: "Add a colour picker in the footer for adjusting the site themes"
},{
	id: "progressBar",
	description: "Add progress bars to the progress lists"
},{
	id: "CSSfavs",
	description: "Use 5-width favourite layout [from userstyle]"
},{
	id: "CSScompactBrowse",
	description: "Use a compact view in the browse section [from userstyle]"
},{
	id: "CSSgreenManga",
	description: "Green titles for manga activities"
},{
	id: "limitProgress10",
	description: "Limit the 'in progress' sections to 10 entries"
},{
	id: "limitProgress8",
	description: "Limit the 'in progress' sections to 8 entries"
},{
	id: "expandRight",
	description: "Load the expanded view of 'in progress' in the usual place instead of full width if left in that state"
},{
	id: "shortRomaji",
	description: "Short romaji titles for everyday use. Life is too short for light novel titles."
},{
	id: "CSSprofileClutter",
	description: "Remove clutter from profiles (milestones, history chart, genres)"
},{
	id: "CSSdecimalPoint",
	description: "Give whole numbers a \".0\" suffix when using the 10 point decimal scoring system"
},{
	id: "CSSverticalNav",
	description: "Alternative browse mode [with navbar by Kuwabara]"
}
];
var current = "";
setInterval(function(){
	if(document.URL != current){
		urlChangedDependence = false;
		current = document.URL;
		handleScripts(current);
	};
	let expandPossible = document.querySelector(".description-length-toggle");
	if(expandPossible){
		expandPossible.click();
	};
},200);
const tagDescriptions = {
"4-koma" : "A manga in the 'yonkoma' format, which consists of four equal-sized panels arranged in a vertical strip.",
"Achronological Order" : "Chapters/episodes do not occur in chronological order.",
"Acting" : "Centers around actors and/or the acting industry.",
"Advertisement" : "Produced in collaboration with some companies in order to promote their products, technologies etc.",
"Afterlife" : "Partly or completely set in the afterlife.",
"Age Gap" : "Prominently features romantic relations between people with a significant age difference.",
"Age Regression" : "Prominently features a character who was returned to a younger state.",
"Agender" : "Prominently features agender characters.",
"Ahegao" : "Features a character making an exaggerated orgasm face.",
"Airsoft" : "Centers around the sport of airsoft.",
"Aliens" : "Prominently features extraterrestrial lifeforms.",
"Alternate Universe" : "Features multiple alternate universes in the same series.",
"American Football" : "Centers around the sport of American football.",
"Amnesia" : "Prominently features a character(s) with memory loss.",
"Anachronism" : "Prominently features elements that are out of place in the historical period the work takes place in, particularly modern elements in a historical setting.",
"Anal Sex" : "Features sexual penetration of the anal cavity.",
"Animals" : "Prominently features animal characters in a leading role.",
"Anthology" : "A collection of separate works collated into a single release.",
"Anti-Hero" : "Features a protagonist who lacks conventional heroic attributes and may be considered a borderline villain.",
"Archery" : "Centers around the sport of archery, or prominently features the use of archery in combat.",
"Artificial Intelligence" : "Intelligent machines.",
"Ashikoki" : "Footjob; features stimulation of genitalia by feet.",
"Assassins" : "Centers around characters who murder people as a profession.",
"Athletics" : "Centers around sporting events that involve competitive running, jumping, throwing, or walking.",
"Augmented Reality" : "Prominently features events with augmented reality as the main setting.",
"Autobiographical" : "Real stories and anecdotes written by the author about their own life.",
"Aviation" : "Regarding the flying or operation of aircraft.",
"Badminton" : "Centers around the sport of badminton.",
"Band" : "Main cast is a group of musicians.",
"Bar" : "Partly or completely set in a bar.",
"Baseball" : "Centers around the sport of baseball.",
"Basketball" : "Centers around the sport of basketball.",
"Battle Royale" : "Centers around a fierce group competition, often violent and with only one winner.",
"Biographical" : "Based on true stories of real persons living or dead.",
"Bisexual" : "Features a character who is romantically and/or sexually attracted to people of more than one sex and/or gender.",
"Blackmail" : "Features a character blackmailing another into performing sexual acts.",
"Body Swapping" : "Centers around individuals swapping bodies with one another.",
"Bondage" : "Features BDSM, with or without the use of accessories.",
"Boxing" : "Centers around the sport of boxing.",
"Boys' Love" : "Prominently features romance between two males, not inherently sexual.",
"Bullying" : "Prominently features the use of force for intimidation, often in a school setting.",
"Calligraphy" : "Centers around the art of calligraphy.",
"Card Battle" : "Centers around individuals competing in card games.",
"Cars" : "Centers around the use of automotive vehicles.",
"CGI" : "Prominently features scenes created with computer-generated imagery.",
"Chibi" : "Features \"super deformed\" character designs with smaller, rounder proportions and a cute look.",
"Chuunibyou" : "Prominently features a character with \"Middle School 2nd Year Syndrome\", who either acts like a know-it-all adult or falsely believes they have special powers.",
"Circus" : "Prominently features a circus.",
"Classic Literature" : "Adapted from a work of classic world literature.",
"College" : "Partly or completely set in a college or university.",
"Coming of Age" : "Centers around a character's transition from childhood to adulthood.",
"Conspiracy" : "Contains one or more factions controlling or attempting to control the world from the shadows.",
"Cosplay" : "Features dressing up as a different character or profession.",
"Crossdressing" : "Prominently features a character dressing up as the opposite sex.",
"Crossover" : "Centers around the placement of two or more otherwise discrete fictional characters, settings, or universes into the context of a single story.",
"Cultivation" : "Features characters using training, often martial arts-related, and other special methods to cultivate life force and gain strength or immortality.",
"Cunnilingus" : "Features oral sex performed on female genitalia.",
"Cute Girls Doing Cute Things" : "Centers around, well, cute girls doing cute things.",
"Cyberpunk" : "Set in a future of advanced technological and scientific achievements that have resulted in social disorder.",
"Cycling" : "Centers around the sport of cycling.",
"Dancing" : "Centers around the art of dance.",
"Dark Skin" : "Features dark-skinned characters in a sexual context.",
"Defloration" : "Feaures a female character who has never had sexual relations (until now).",
"Delinquents" : "Features characters with a notorious image and attitude, sometimes referred to as \"yankees\".",
"Demons" : "Prominently features malevolent otherworldly creatures.",
"Development" : "Centers around characters developing or programming a piece of technology, software, gaming, etc.",
"Dragons" : "Prominently features mythical reptiles which generally have wings and can breathe fire.",
"Drawing" : "Centers around the art of drawing, including manga and doujinshi.",
"Drugs" : "Prominently features the usage of drugs such as opioids, stimulants, hallucinogens etc.",
"Dystopian" : "Partly or completely set in a society characterized by poverty, squalor or oppression",
"Economics" : "Centers around the field of economics.",
"Educational" : "Primary aim is to educate the audience.",
"Ensemble Cast" : "Features a large cast of characters with (almost) equal screen time and importance to the plot.",
"Environmental" : "concern with the state of the natural world and how humans interact with it.",
"Episodic" : "Features story arcs that are loosely tied or lack an overarching plot.",
"Ero Guro" : "Japanese literary and artistic movement originating in the 1930's. Work have a focus on grotesque eroticism, sexual corruption, and decadence.",
"Espionage" : "Prominently features characters infiltrating an organization in order to steal sensitive information.",
"Facial" : "Features sexual ejaculation onto an individual's face.",
"Fairy Tale" : "This work tells a fairy tale, centers around fairy tales, or is based on a classic fairy tale.",
"Family Life" : "Centers around the activities of a family unit.",
"Fashion" : "Centers around the fashion industry.",
"Fellatio" : "Features oral sex performed on male genitalia.",
"Female Protagonist" : "Main character is female.",
"Fishing" : "Centers around the sport of fishing.",
"Fitness" : "Centers around exercise with the aim of improving physical health.",
"Flash" : "Created using Flash animation techniques.",
"Flat Chest" : "Features a female character with smaller-than-average breasts.",
"Food" : "Centers around cooking or food appraisal.",
"Football" : "Centers around the sport of football (known in the USA as \"soccer\").",
"Foreign" : "Partly or completely set in a country outside of Japan.",
"Fugitive" : "Prominently features a character evading capture by an individual or organization.",
"Full CGI" : "Almost entirely created with computer-generated imagery.",
"Full Colour" : "Fully coloured or drawn in colour.",
"Futanari" : "Features female characters with male genitalia.",
"Gambling" : "Centers around the act of gambling.",
"Gangs" : "Centers around gang organizations.",
"Gender Bending" : "Prominently features a character who dresses and behaves in a way characteristic of the opposite sex, or has been transformed into a person of the opposite sex.",
"Ghost" : "Prominently features a character who is a ghost.",
"Go" : "Centered around the game of Go.",
"Goblin" : "A goblin is a monstrous creature from European folklore. They are almost always small and grotesque, mischievous, and greedy. Sometimes with magical abilities.",
"Gods" : "Prominently features a character of divine or religious nature.",
"Golf" : "Centers around the sport of golf.",
"Gore" : "Prominently features graphic bloodshed and violence.",
"Guns" : "Prominently features the use of guns in combat.",
"Gyaru" : "Prominently features a female character who has a distinct American-emulated fashion style, such as tanned skin, bleached hair, and excessive makeup. Also known as gal.",
"Harem" : "Main cast features one male character plus several female characters who are romantically interested in him.",
"Henshin" : "Prominently features character or costume transformations which often grant special abilities.",
"Hikikomori" : "Prominently features a character who withdraws from social life, often seeking extreme isolation.",
"Historical" : "Partly or completely set during a real period of world history.",
"Human Pet" : "Features characters in a master-slave relationship where one is the \"owner\" and the other is a \"pet.\"",
"Ice Skating" : "Centers around the sport of ice skating.",
"Idol" : "Centers around the life and activities of an idol.",
"Incest" : "Features sexual relations between characters who are related by blood.",
"Irrumatio" : "Oral rape; features a character thrusting their genitalia into the mouth of another character.",
"Isekai" : "Features characters being transported into an alternate world setting and having to adapt to their new surroundings.",
"Iyashikei" : "Primary aim is to heal the audience through serene depictions of characters' daily lives.",
"Josei" : "Target demographic is adult females.",
"Kaiju" : "Prominently features giant monsters.",
"Karuta" : "Centers around the game of karuta.",
"Kemonomimi" : "Prominently features humanoid characters with animal ears.",
"Kids" : "Target demographic is young children.",
"Lacrosse" : "A team game played with a ball and lacrosse sticks.",
"Language Barrier" : "A barrier to communication between people who are unable to speak a common language.",
"Large Breasts" : "Features a character with larger-than-average breasts.",
"LGBTQ Issues" : "Addresses themes of LGBTQ experiences and identity; such as characters questioning their sexuality or gender identity, coming out to friends and family, and dealing with prejudice.",
"Lost Civilization" : "Featuring a civilisation with few ruins or records that exist in present day knowledge.",
"Love Triangle" : "Centered around romantic feelings between more than two people. Includes all love polygons.",
"Mafia" : "Centered around Italian organised crime syndicates.",
"Magic" : "Prominently features magical elements or the use of magic.",
"Mahjong" : "Centered around the game of mahjong.",
"Maids" : "Prominently features a character who is a maid.",
"Male Protagonist" : "Main character is male.",
"Martial Arts" : "Centers around the use of traditional hand-to-hand combat.",
"Masturbation" : "Features erotic stimulation of one's own genitalia or other erogenous regions.",
"Memory Manipulation" : "Prominently features a character(s) who has had their memories altered.",
"Mermaid" : "A mythological creature with the body of a human and the tail of a fish",
"Meta" : "Features fourth wall-breaking references to itself or genre tropes.",
"Miko" : "Prominently features a character who is a shrine maiden.",
"MILF" : "Features sexual intercourse with older women.",
"Military" : "Centered around the life and activities of military personnel.",
"Monster Girl" : "Prominently features a female character who is part-monster.",
"Mopeds" : "Prominently features mopeds.",
"Motorcycles" : "Prominently features the use of motorcycles.",
"Multiple Personalities" : "A condition wherein a person's identity is split into two or more.",
"Musical" : "Features a performance that combines songs, spoken dialogue, acting, and dance.",
"Mythology" : "Prominently features mythological elements, especially those from religious or cultural tradition.",
"Nakadashi" : "Creampie; features sexual ejaculation inside of a character.",
"Nekomimi" : "Humanoid characters with cat-like features such as cat ears and a tail.",
"Netorare" : "NTR; features a character with a partner shown being intimate with someone else.",
"Netorase" : "Features characters in a romantic relationship who agree to be sexually intimate with others.",
"Netori" : "Features a character shown being intimate with the partner of another character. The opposite of netorare.",
"Ninja" : "Prominently features Japanese warriors traditionally trained in espionage, sabotage and assasination.",
"No Dialogue" : "This work contains no dialogue.",
"Noir" : "Stylized as a cynical crime drama with low-key visuals.",
"Nudity" : "Features a character wearing no clothing or exposing intimate body parts.",
"Otaku Culture" : "Centers around the culture of a fanatical fan-base.",
"Outdoor" : "Centers around hiking, camping or other outdoor activities.",
"Paizuri" : "Features the stimulation of male genitalia by breasts.",
"Parody" : "Features deliberate exaggeration of popular tropes or a particular genre to comedic effect.",
"Philosophy" : "Relating or devoted to the study of the fundamental nature of knowledge, reality, and existence.",
"Photography" : "Centers around the use of cameras to capture photos.",
"Pirates" : "Prominently features sea-faring adventurers branded as criminals by the law.",
"Poker" : "Centers around the game of poker or its variations.",
"Police" : "Centers around the life and activities of law enforcement officers.",
"Politics" : "Centers around politics, politicians, or government activities.",
"Post-Apocalyptic" : "Partly or completely set in a world or civilization after a global disaster.",
"POV" : "Point of View; features sexual scenes shown from the perspective of the series protagonist.",
"Pregnant" : "Features pregnant female characters in a sexual context.",
"Primarily Adult Cast" : "Main cast is mostly composed of characters above a high school age.",
"Primarily Child Cast" : "Main cast is mostly composed of characters below a high school age.",
"Primarily Female Cast" : "Main cast is mostly composed of female characters.",
"Primarily Male Cast" : "Main cast is mostly composed of male characters.",
"Prostitution" : "Features characters who are paid for sexual favors.",
"Public Sex" : "Features sexual acts performed in public settings.",
"Puppetry" : "Animation style involving the manipulation of puppets to act out scenes.",
"Rakugo" : "Rakugo is the traditional Japanese performance art of comic storytelling.",
"Rape" : "Features non-consensual sexual penetration.",
"Real Robot" : "Prominently features mechanical designs loosely influenced by real-world robotics.",
"Rehabilitation" : "Prominently features the recovery of a character who became incapable of social life or work.",
"Reincarnation" : "Features a character being born again after death, typically as another person or in another world.",
"Revenge" : "Prominently features a character who aims to exact punishment in a resentful or vindictive manner.",
"Reverse Harem" : "Main cast features one female character plus several male characters who are romantically interested in her.",
"Robots" : "Prominently features humanoid machines.",
"Rugby" : "Centers around the sport of rugby.",
"Rural" : "Partly or completely set in the countryside.",
"Samurai" : "Prominently features warriors of medieval Japanese nobility bound by a code of honor.",
"Satire" : "Prominently features the use of comedy or ridicule to expose and criticise social phenomena.",
"Scat" : "Lots of feces.",
"School" : "Partly or completely set in a primary or secondary educational institution.",
"School Club" : "Partly or completely set in a school club scene.",
"Seinen" : "Target demographic is adult males.",
"Sex Toys" : "Features objects that are designed to stimulate sexual pleasure.",
"Ships" : "Prominently features the use of sea-based transportation vessels.",
"Shogi" : "Centers around the game of shogi.",
"Shoujo" : "Target demographic is teenage and young adult females.",
"Shoujo Ai" : "Prominently features romance between two females.",
"Shounen" : "Target demographic is teenage and young adult males.",
"Shounen Ai" : "Prominently features romance between two males.",
"Skeleton" : "Prominently features skeleton(s) as a character.",
"Slapstick" : "Prominently features comedy based on deliberately clumsy actions or embarrassing events.",
"Software Development" : "Centers around characters developing or programming a piece of technology, software, gaming, etc.",
"Slavery" : "Prominently features slaves, slavery, or slave trade.",
"Space" : "Partly or completely set in outer space.",
"Space Opera" : "Centers around space warfare, advanced technology, chivalric romance and adventure.",
"Steampunk" : "Prominently features technology and designs inspired by 19th-century industrial steam-powered machinery.",
"Stop Motion" : "Animation style characterized by physical objects being moved incrementally between frames to create the illusion of movement.",
"Sumata" : "Pussyjob; features the stimulation of male genitalia by the thighs and labia majora of a female character.",
"Super Power" : "Prominently features characters with special abilities that allow them to do what would normally be physically or logically impossible.",
"Super Robot" : "Prominently features large robots often piloted by hot-blooded protagonists.",
"Superhero" : "Prominently features super-powered humans who aim to serve the greater good.",
"Surreal Comedy" : "Prominently features comedic moments that defy casual reasoning, resulting in illogical events.",
"Survival" : "Centers around the struggle to live in spite of extreme obstacles.",
"Swimming" : "Centers around the sport of swimming.",
"Swordplay" : "Prominently features the use of swords in combat.",
"Table Tennis" : "Centers around the sport of table tennis (also known as \"ping pong\").",
"Tanks" : "Prominently features the use of tanks or other armoured vehicles.",
"Teacher" : "Protagonist is an educator, usually in a school setting.",
"Tekoki" : "Handjob; features the stimulation of genitalia by another's hands.",
"Tennis" : "Centers around the sport of tennis.",
"Tentacles" : "Features the long appendages most commonly associated with octopuses or squid, often sexually penetrating a character.",
"Terrorism" : "Centers around the activities of a terrorist or terrorist organization.",
"Threesome" : "Features sexual acts between three people.",
"Time Manipulation" : "Prominently features time-traveling or other time-warping phenomena.",
"Time Skip" : "Features a gap in time used to advance the story.",
"Tokusatsu" : "Prominently features the elements, which resemble Japanese special effects live-action shows",
"Tragedy" : "Centers around tragic events and unhappy endings.",
"Trains" : "Prominently features trains.",
"Triads" : "Centered around Chinese organised crime syndicates.",
"Tsundere" : "Prominently features a character who acts cold and hostile in order to mask warmer emotions.",
"Twins" : "Prominently features two siblings that were born at one birth.",
"Urban Fantasy" : "Set in a world similar to the real world, but with the existence of magic or other supernatural elements.",
"Urination" : "Features one character urinating on another. Also know as a \"golden shower.\"",
"Vampire" : "Prominently features a character who is a vampire.",
"Video Games" : "Centers around characters playing video games.",
"Virgin" : "Features a character who has never had sexual relations (until now).",
"Virtual World" : "Partly or completely set in the world inside a video game.",
"Volleyball" : "Centers around the sport of volleyball.",
"Voyeur" : "Features a character who enjoys seeing the sex acts or sex organs of others.",
"War" : "Partly or completely set during wartime.",
"Werewolf" : "Prominently features a character who is a werewolf.",
"Witch" : "Prominently features a character who is a witch.",
"Work" : "Centers around the activities of a certain occupation.",
"Wrestling" : "Centers around the sport of wrestling.",
"Writing" : "Centers around the profession of writing books or novels.",
"Wuxia" : "Chinese fiction concerning the adventures of martial artists in Ancient China.",
"Yakuza" : "Centered around Japanese organised crime syndicates.",
"Yandere" : "Prominently features a character who is obsessively in love with another, to the point of acting deranged or violent.",
"Yaoi" : "Features sexual intercourse between two males.",
"Youkai" : "Prominently features supernatural creatures from Japanese folklore.",
"Yuri" : "Prominently features romance between two females, not inherently sexual. Also known as Girls' Love.",
"Zombie" : "Prominently features reanimated corpses which often prey on live humans and turn them into zombies."
};

console.log("Aniscripts " + scriptInfo.version);
})();