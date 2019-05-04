// ==UserScript==
// @id             b77e78bb-5ab5-403b-ae45-7540077fbc64
// @name           Youtube - Right Side Description 
// @namespace      Takato
// @author         Takato
// @copyright      2010+, Takato (https://greasyfork.org/users/1158/)
// @licence        Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International - Additional conditions apply; https://greasyfork.org/scripts/976/
// @description    Moves the video description to the right of the video (like it used to be 2009 and earlier) and makes a few 2009ish style tweaks to the video page.
// @icon           https://i.imgur.com/RAHw2kQ.png https://i.imgur.com/qlQhuaa.png
// @icon64         https://i.imgur.com/qlQhuaa.png
// @resource       icon https://i.imgur.com/RAHw2kQ.png
// @resource       icon64 https://i.imgur.com/RAHw2kQ.png
// @version        2018.06.17
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require		   https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @website        https://greasyfork.org/scripts/976/
// @noframes
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_addStyle
// @grant          GM_getResourceURL
// @grant          GM.getValue
// @grant          GM.setValue
// @grant          GM.deleteValue
// @grant          GM.addStyle
// @grant          GM.getResourceUrl
// @include        *//www.youtube.com/*
// ==/UserScript==
// This script is licenced under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (https://creativecommons.org/licenses/by-nc-sa/4.0/) with additional conditions. 
// See https://greasyfork.org/scripts/976/ for full details of the licence and conditions.
(async function() {

var script = {};
script.version = "2018.06.17";

// SETTINGS -----------------------------

// Main settings: Available by clicking "More" below the video.
// - Change style between 'default' and 'retro'.

// --------------------------------------



// Everything below this line shouldn't be edited unless you are a coder. All settings are listed above.

// Defining static script properties
script.name = "Right Side Description"; // Previously known as Better Watch Page
script.shortname = "RSD";
script.website = "https://greasyfork.org/scripts/976/";
script.discussion = "https://greasyfork.org/scripts/976/feedback";
script.icon = await GM.getResourceUrl("icon");
script.icon64 = await GM.getResourceUrl("icon64");
script.mainCSS = "/* Title */ #watch-headline-title {margin-top:5px; margin-bottom:-5px;} #watch-headline-title .watch-title-container {width:auto; display: inline-block; vertical-align: middle;} #page.watch-stage-mode #watch-headline-title {margin-top:0px; margin-bottom:0px;} #watch-headline-title .long-title {font-size:inherit !important; letter-spacing:normal !important;}  #watch-headline-additional {display:inline-block; margin-bottom:0; margin-left:8px; vertical-align: middle; } #watch-headline-additional:empty {display:none;} #watch-headline-additional > * {margin:3px; display:inline-block;} #watch-headline-additional > .standalone-collection-badge-renderer-text > a {margin-right:0;}  /* Sidebar */ #bwp-sidebar-container {overflow:auto; margin-top:0; max-height:390px; }  #watch7-user-header {padding-top:0;} #watch7-user-header .yt-user-photo {float:left;} #watch7-user-header .yt-user-info {max-width:calc(100% - 58px); margin-left:58px; line-height:1.5em ;} #watch7-user-header .yt-user-info a {font-weight:bold;} #watch-uploader-info {margin-left:58px; line-height:1.5em;} #watch-uploader-info strong {font-weight:normal;} #watch7-subscription-container {float:right;}  #action-panel-details {clear:both;} #action-panel-details button.yt-uix-button-expander.yt-uix-expander-body {display:none;}  /* Below Video */ #watch-header {position:relative; min-height:auto;}  #watch8-action-buttons, #watch8-ytcenter-buttons {border-top:none;} #watch-header > #watch7-views-info {height:100%; top:0 !important; bottom:0px !important; right:12px !important;} #watch7-views-info .watch-view-count {position:absolute; top:0; right:0;} #watch7-views-info .video-extras-sparkbars {position:absolute; bottom:3px; right:0; width:100%;} #watch8-sentiment-actions {z-index:5; position:relative;}  /* Below Video - Youtube+ */ #advanced-options {left:0; right:initial !important; overflow:hidden;} #console-button {position:relative !important; float:left;} #player-console {right:0; top:0 !important; float:left !important; height:20px;} #player-console > div {margin-top:-4px; height:24px;}  "; 
script.retroCSS = "/* Retro Mode*/ body {background-color:white;} body, input, textarea, select {font-family:arial,sans-serif;} .yt-card {box-shadow:none; border:1px solid #e2e2e2;}  #watch-headline-title h1 {font-size:19px; font-weight:bold;}  #bwp-sidebar-container {background:#EEEEEE; border:1px solid #CCCCCC; font-size:12px; padding:6px;} #bwp-sidebar-container a, #action-panel-details:hover a {color:#0033CC;} #watch7-user-header {padding-bottom:5px;} #watch7-user-header .yt-user-photo {border:1px solid #999999;} #watch7-user-header .yt-user-photo > .video-thumb {border:1px solid white;} #watch-description-text {line-height:15px;} #watch-description-extras {border-top:1px solid #CCCCCC; padding-top:4px;} #watch-description-extras .watch-meta-item:last-child .title, #watch-description-extras .watch-meta-item:last-child .content {margin-bottom:0;}    #watch7-sidebar-offer {margin-right:-1px;}  #yt-masthead-container {border-bottom-color:#CCCCCC;} #yt-masthead #logo-container:not(.doodle) {margin-top:-5px; margin-bottom:-5px;} body:not(.bwpRetroDark) #yt-masthead #logo-container:not(.doodle) .logo:not(.doodle) {background:url(https://s.ytimg.com/yt/img/master.png) 0px -641px; height:40px; width:98px; } #logo-container .content-region {display:none;}  .show-guide #appbar-guide-menu {box-shadow:none; border-color:#CCCCCC; border-style:solid; border-width:0px 1px 1px 0px;}     #player-api {padding-bottom:30px; overflow:hidden;} #movie_player:not(.ytp-fullscreen) {overflow:visible; contain: layout style size;} #movie_player:not(.ytp-fullscreen) .ytp-player-content, #movie_player:not(.ytp-fullscreen) .ytp-settings-menu {bottom:8px;} #movie_player:not(.ytp-fullscreen) .ytp-player-content.html5-endscreen {bottom:39px; top:28px;} #movie_player:not(.ytp-fullscreen) .ytp-bottom {bottom:14px; top:auto !important;} #movie_player:not(.ytp-fullscreen) .ytp-gradient-bottom {display:none;} #movie_player:not(.ytp-fullscreen) .ytp-chrome-bottom {background-color:#ccc; color:#000; text-shadow:none; border:0px solid #ccc; border-width: 0px 12px 0 12px; left:0 !important; opacity:1; bottom:-30px; height:27px;} html.part_cinema_mode #movie_player:not(.ytp-fullscreen):not(:hover) .ytp-chrome-bottom {opacity:0.13;}   #movie_player:not(.ytp-fullscreen) .ytp-progress-bar-container {bottom:27px;} #movie_player:not(.ytp-fullscreen) .ytp-progress-list {transform-origin:center bottom !important; background-color:#444; margin-left:-12px;} #movie_player:not(.ytp-fullscreen) .ytp-progress-bar-container:not(:hover) .ytp-progress-list {width:calc(100% + 24px) !important; } #movie_player:not(.ytp-fullscreen) .ytp-progress-bar-container:hover .ytp-progress-list {border:0px solid transparent; border-width:0px 12px 0px 12px; margin-right:-12px;}   #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls {padding-left:0; padding-right:0; margin-left:-12px; margin-right:-12px; height:27px; line-height:27px;} #movie_player:not(.ytp-fullscreen) .ytp-time-display {height:34px; margin-top:-3px; font-size:95%; line-height:34px;} #movie_player:not(.ytp-fullscreen) .ytp-time-separator, #movie_player:not(.ytp-fullscreen) .ytp-time-duration {color:#666;} #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-button, #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-volume-panel {color:#4d4d4d; opacity:1; height:34px; margin-top:-3px;} #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-volume-panel .ytp-volume-slider-handle:before, #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-volume-panel .ytp-volume-slider-handle, #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-volume-panel .ytp-volume-slider-handle:after {background-color:#4d4d4d;} #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-volume-panel .ytp-volume-slider-handle:after {opacity:0.35;} #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-button:hover {color:#3d3d3d;} #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-button .ytp-svg-fill, #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-button path[fill='#fff'] {fill:currentColor;} #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-button .ytp-svg-shadow {stroke:none;}   #page:not(.watch-wide) #watch7-content {margin-top:27px;} #page.watch-wide #watch7-container {margin-top:37px;} #page.watch-stage-mode #player-playlist .watch-playlist {margin-top:27px;}";
script.retroDarkCSS = "/* Retro Dark */ 	 #watch7-user-header .yt-user-photo {border-color:#1b1b1b;} 	 #watch-description-extras {border-top-color:#444444;}  	 /*youtube umbra*/	#bwp-sidebar-container { background-color: var(--card-bg-color); color: var(--main-text-color); border-color: var(--card-border-color) }  	#bwp-sidebar-container a {color:var(--link-color);} 	  #movie_player:not(.ytp-fullscreen) .ytp-chrome-bottom {background-color:#1b1b1b; color:#fff; border-color:#1b1b1b;}    #movie_player:not(.ytp-fullscreen) .ytp-time-separator, #movie_player:not(.ytp-fullscreen) .ytp-time-duration {color:#999;} #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-button, #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-volume-panel {color:#8E8E8E; } #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-volume-panel .ytp-volume-slider-handle:before, #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-volume-panel .ytp-volume-slider-handle, #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-volume-panel .ytp-volume-slider-handle:after {background-color:#8E8E8E;} #movie_player:not(.ytp-fullscreen) .ytp-chrome-controls .ytp-button:hover {color:#EBEBEB;} ";

// Defining dynamic script properties
script.cssMainLoaded = null;
script.cssRetroLoaded = null;
script.cssRetroDarkLoaded = null;
script.forceControlsTimer = null;
script.forceControlsListener = null;


async function mainScript() {
	
	// Don't run in Youtube+ Popups
	if ($("html").hasClass("part_popout")) return;

	
	// Abort and clean up on non-video pages.
	if (!$("#page").hasClass("watch")) {
		$("body").removeClass("bwpScript");
		applyRetroMode(false);
		$("#page > #watch7-headline").remove();
		$("#bwpCrash").remove();
		if (script.cssMainLoaded) {
			$(script.cssMainLoaded).remove();
			script.cssMainLoaded = null;
		}
		return;
	}
	
	$("body").addClass("bwpScript");
	
	// Insert script crash notification
	if (!($("#bwpCrash").length > 0)) {
		$(document.createElement("div"))
			.attr("id", "bwpCrash")
			.attr("style", "font-size:12px !important; border:1px solid black !important; padding:2px !important; margin:2px !important; font-weight:bold !important; color:black !important; background:white !important;")
			.html("'" + script.name + "' has crashed. Try refreshing the page or checking for a script update.")
			.insertBefore("#page");
	}
	
	// Insert CSS
	if (!script.cssMainLoaded) {
		script.cssMainLoaded = GM_addStyle(script.mainCSS);
	}
	
	

	// Enable retro style (based on setting)
	applyRetroMode(await GM.getValue("retrostyle", true));
	// Add listen event to player state to apply retro style (based on setting) when other scripts prevent autoplay
	async function postloadRetroApply() {
		applyRetroMode(await GM.getValue("retrostyle", true));
		$("#player-api").off("click", "#movie_player.unstarted-mode", postloadRetroApply);
	}
	$("#player-api").on("click", "#movie_player.unstarted-mode", postloadRetroApply);
	

	// Add button to toggle retro style
	$(document.createElement("li"))
		.attr("id", "bwp-retrostyle-toggle")
		.appendTo("#action-panel-overflow-menu");
	$(document.createElement("button"))
		.attr("class", "yt-ui-menu-item has-icon")
		.html("<span class='yt-ui-menu-item-icon' style='margin-right:6px;margin-left:-14px;margin-bottom:-6px;vertical-align:top;opacity:1;'><img width='24' src='"+script.icon+"' style='margin-bottom:-8px;'/></span> <span class='yt-ui-menu-item-label'>Toggle 'Retro Style'</span>")
		.click(async function() {
			GM.setValue("retrostyle", !(await GM.getValue("retrostyle", true)));
			applyRetroMode(await GM.getValue("retrostyle", true));
		})
		.appendTo("#bwp-retrostyle-toggle");
	
	
	// Remove VEVO branding
	$("#watch7-container")
		.removeClass("watch-branded")
		.removeClass("watch-branded-banner");
	$("#player")
		.attr("style", "")
		.removeClass("watch-branded-banner");
	$("#watch7-branded-banner").remove();

	
	// Move description & channel details to the right-side column
	$(document.createElement("div"))
		.attr("id","bwp-sidebar-container")
		.attr("class", "yt-card yt-card-has-padding")
		.insertBefore("#watch7-sidebar-contents");
	$("#watch7-user-header").appendTo("#bwp-sidebar-container");
	$("#action-panel-details")
		.removeClass("yt-uix-expander-collapsed")
		.removeClass("yt-card")
		.removeClass("yt-card-has-padding")
		.appendTo("#bwp-sidebar-container");


	// Move Upload time into user info
	$("#watch-uploader-info").appendTo("#watch7-user-header");
	$("#watch-uploader-info strong").text(function() { return $(this).text().replace("Published on ",""); });

	// Relocate views for correct styling
	$("#watch7-views-info").appendTo("#watch-header");

	
	// Move title above video
	$("#page > #watch7-headline").remove(); // Remove any existing
	$("#watch-header #watch7-headline").insertBefore("#player").addClass("content-alignment");
	
	$(document.createElement("div")) // Container for non-title content such as Youtube Red
		.attr("id", "watch-headline-additional")
		.attr("class", "yt-card")
		.appendTo("#watch-headline-title");
	$("#watch7-headline > *:not(#watch-headline-title):not(#watch-headline-additional)").prependTo("#watch-headline-additional");

	
	// Unavailable video
	/*if ($("#player-unavailable").length > 0) {
		$("#unavailable-submessage").append("");
		if ($("#watch7-content meta[itemprop=\"regionsAllowed\"]").length > 0) {
			$("#unavailable-submessage").append("<br/><br/>Countries allowed to watch this video are '<i>"+$("#watch7-content meta[itemprop=\"regionsAllowed\"]").attr("content")+"</i>'");
		}
	}*/
	
	
	// Remove Crash notice
	$("#bwpCrash").remove();
	

}

function betaScript() {
	if (!($("#bwp-retrostyle-toggle").length > 0)) {
		if ($("ytd-app").length > 0) {
			if ($("ytd-watch:not([hidden])").length > 0) {
				if (!($("#bwpBeta").length > 0)) {
					$(document.createElement("div"))
						.attr("id", "bwpBeta")
						.attr("style", "cursor:pointer !important;")
						.html("<img src='"+script.icon+"' title='"+script.name+" Notice' onclick='alert(\""+script.name+" does not support the new Youtube design yet. Please visit "+script.website+" for more information. \")'/>")
						.prependTo("#extra-buttons");
				}
			} else {
				$("#bwpBeta").remove();
			}
		}
	}
}


mainScript();
$(document).on("spfdone", mainScript);
$(document).on("yt-navigate-finish", betaScript);



function applyRetroMode(activate) {
	if (activate) {
		if (!script.cssRetroLoaded) {
			script.cssRetroLoaded = GM_addStyle(script.retroCSS);
		}
		$("body").addClass("bwpRetro");
		if (isDark($("body").css("background-color"))) {
			applyRetroDarkMode(true);	
		} else {
			applyRetroDarkMode(false);
		}
		if (!script.forceControlsTimer) {
			var mouseMoveEvent = new Event('mousemove');
			script.forceControlsTimer = setInterval(function() {
				if (!document.hidden) {
					$("#movie_player.playing-mode:not(.ytp-fullscreen)")[0].dispatchEvent(mouseMoveEvent);
				}
			}, 1000);
		}
		if (!script.forceControlsListener) {
			script.forceControlsListener = function() {
				if (!document.hidden) {
					var mouseMoveEvent = new Event('mousemove');
					$("#movie_player.playing-mode:not(.ytp-fullscreen)")[0].dispatchEvent(mouseMoveEvent);
				}
			}
			$(document).on("visibilitychange", script.forceControlsListener);
		}
	} else {
		if (script.cssRetroLoaded) {
			$(script.cssRetroLoaded).remove();
			script.cssRetroLoaded = null;
		}
		$("body").removeClass("bwpRetro");
		applyRetroDarkMode(false);
		if (script.forceControlsTimer) {
			clearInterval(script.forceControlsTimer);
			script.forceControlsTimer = null;
		}
		if (script.forceControlsListener) {
			$(document).off("visibilitychange", script.forceControlsListener);
			script.forceControlsListener = null;
		}		
	}
}

function applyRetroDarkMode(activate) {
	if (activate) {
		if (!script.cssRetroDarkLoaded) {
			script.cssRetroDarkLoaded = GM_addStyle(script.retroDarkCSS);
		}
		$("body").addClass("bwpRetroDark");
	} else {
		if (script.cssRetroDarkLoaded) {
			$(script.cssRetroDarkLoaded).remove();
			script.cssRetroDarkLoaded = null;
		}
		$("body").removeClass("bwpRetroDark");
	}
}



	

function isDark(rgb) {
	var re = /rgb\([ ]*(\d+),[ ]*(\d+),[ ]*(\d+)[ ]*\)/;
	var match = rgb.match(re);
	if (match == null) {
		return false;
	}
	var luma = 0.2126 * match[1] + 0.7152 * match[2] + 0.0722 * match[3];
	if (luma < 40) {
		return true;
	}
	
	return false;
}



})();