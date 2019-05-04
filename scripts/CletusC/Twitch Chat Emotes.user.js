// ==UserScript==
// @name Twitch Chat Emotes
// @namespace #Cletus
// @version 2.1.6
// @description Adds a button to Twitch that allows you to "click-to-insert" an emote.
// @copyright 2011+, Ryan Chatham <ryan.b.chatham@gmail.com> (https://github.com/cletusc)
// @author Ryan Chatham <ryan.b.chatham@gmail.com> (https://github.com/cletusc)
// @icon http://www.gravatar.com/avatar.php?gravatar_id=6875e83aa6c563790cb2da914aaba8b3&r=PG&s=48&default=identicon
// @license MIT; http://opensource.org/licenses/MIT
// @license CC BY-NC-SA 3.0; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @homepage http://cletusc.github.io/Userscript--Twitch-Chat-Emotes/
// @supportURL https://github.com/cletusc/Userscript--Twitch-Chat-Emotes/issues
// @contributionURL http://cletusc.github.io/Userscript--Twitch-Chat-Emotes/#donate
// @grant none
// @include http://*.twitch.tv/*
// @include https://*.twitch.tv/*
// @exclude http://api.twitch.tv/*
// @exclude https://api.twitch.tv/*
// @exclude http://tmi.twitch.tv/*
// @exclude https://tmi.twitch.tv/*
// @exclude http://*.twitch.tv/*/dashboard
// @exclude https://*.twitch.tv/*/dashboard
// @exclude http://chatdepot.twitch.tv/*
// @exclude https://chatdepot.twitch.tv/*
// @exclude http://im.twitch.tv/*
// @exclude https://im.twitch.tv/*
// @exclude http://platform.twitter.com/*
// @exclude https://platform.twitter.com/*
// @exclude http://www.facebook.com/*
// @exclude https://www.facebook.com/*
// ==/UserScript==

/* Script compiled using build script. Script uses Browserify for CommonJS modules. */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var pkg = require('../package.json');
var publicApi = require('./modules/public-api');
var ember = require('./modules/ember-api');
var logger = require('./modules/logger');
var emotes = require('./modules/emotes');
var ui = require('./modules/ui');

logger.log('(v'+ pkg.version + ') Initial load on ' + location.href);

// Only enable script if we have the right variables.
//---------------------------------------------------
var initTimer = 0;
(function init(time) {	
	if (!time) {
		time = 0;
	}

	var objectsLoaded = (
		window.Twitch !== undefined &&
		window.jQuery !== undefined &&
		ember.isLoaded()
	);
	if (!objectsLoaded) {
		// Stops trying after 10 minutes.
		if (initTimer >= 600000) {
			logger.log('Taking too long to load, stopping. Refresh the page to try again. (' + initTimer + 'ms)');
			return;
		}

		// Give an update every 10 seconds.
		if (initTimer % 10000) {
			logger.debug('Still waiting for objects to load. (' + initTimer + 'ms)');
		}

		// Bump time up after 1s to reduce possible lag.
		time = time >= 1000 ? 1000 : time + 25;
		initTimer += time;

		setTimeout(init, time, time);
		return;
	}
	
	// Expose public api.
	if (typeof window.emoteMenu === 'undefined') {
		window.emoteMenu = publicApi;
	}

	ember.hook('route:channel', activate, deactivate);
	ember.hook('route:chat', activate, deactivate);

	activate();
})();

function activate() {
	ui.init();
	emotes.init();
}
function deactivate() {
	ui.hideMenu();
}

},{"../package.json":7,"./modules/ember-api":8,"./modules/emotes":9,"./modules/logger":10,"./modules/public-api":11,"./modules/ui":15}],2:[function(require,module,exports){
(function (doc, cssText) {
    var id = "emote-menu-for-twitch-styles";
    var styleEl = doc.getElementById(id);
    if (!styleEl) {
        styleEl = doc.createElement("style");
        styleEl.id = id;
        doc.getElementsByTagName("head")[0].appendChild(styleEl);
    }
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = cssText;
        }
    } else {
        try {
            styleEl.innerHTML = cssText;
        } catch (ignore) {
            styleEl.innerText = cssText;
        }
    }
}(document, "/**\n" +
" * Minified style.\n" +
" * Original filename: \\node_modules\\jquery.scrollbar\\jquery.scrollbar.css\n" +
" */\n" +
".scroll-wrapper{overflow:hidden!important;padding:0!important;position:relative}.scroll-wrapper>.scroll-content{border:none!important;-moz-box-sizing:content-box!important;box-sizing:content-box!important;height:auto;left:0;margin:0;max-height:none!important;max-width:none!important;overflow:scroll!important;padding:0;position:relative!important;top:0;width:auto!important}.scroll-wrapper>.scroll-content::-webkit-scrollbar{height:0;width:0}.scroll-element{display:none}.scroll-element,.scroll-element div{-moz-box-sizing:content-box;box-sizing:content-box}.scroll-element.scroll-x.scroll-scrollx_visible,.scroll-element.scroll-y.scroll-scrolly_visible{display:block}.scroll-element .scroll-arrow,.scroll-element .scroll-bar{cursor:default}.scroll-textarea{border:1px solid #ccc;border-top-color:#999}.scroll-textarea>.scroll-content{overflow:hidden!important}.scroll-textarea>.scroll-content>textarea{border:none!important;-moz-box-sizing:border-box;box-sizing:border-box;height:100%!important;margin:0;max-height:none!important;max-width:none!important;overflow:scroll!important;outline:0;padding:2px;position:relative!important;top:0;width:100%!important}.scroll-textarea>.scroll-content>textarea::-webkit-scrollbar{height:0;width:0}.scrollbar-inner>.scroll-element,.scrollbar-inner>.scroll-element div{border:none;margin:0;padding:0;position:absolute;z-index:10}.scrollbar-inner>.scroll-element div{display:block;height:100%;left:0;top:0;width:100%}.scrollbar-inner>.scroll-element.scroll-x{bottom:2px;height:8px;left:0;width:100%}.scrollbar-inner>.scroll-element.scroll-y{height:100%;right:2px;top:0;width:8px}.scrollbar-inner>.scroll-element .scroll-element_outer{overflow:hidden}.scrollbar-inner>.scroll-element .scroll-bar,.scrollbar-inner>.scroll-element .scroll-element_outer,.scrollbar-inner>.scroll-element .scroll-element_track{border-radius:8px}.scrollbar-inner>.scroll-element .scroll-bar,.scrollbar-inner>.scroll-element .scroll-element_track{-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=40)\";filter:alpha(opacity=40);opacity:.4}.scrollbar-inner>.scroll-element .scroll-element_track{background-color:#e0e0e0}.scrollbar-inner>.scroll-element .scroll-bar{background-color:#c2c2c2}.scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,.scrollbar-inner>.scroll-element:hover .scroll-bar{background-color:#919191}.scrollbar-inner>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_track{left:-12px}.scrollbar-inner>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_track{top:-12px}.scrollbar-inner>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size{left:-12px}.scrollbar-inner>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size{top:-12px}.scrollbar-outer>.scroll-element,.scrollbar-outer>.scroll-element div{border:none;margin:0;padding:0;position:absolute;z-index:10}.scrollbar-outer>.scroll-element{background-color:#fff}.scrollbar-outer>.scroll-element div{display:block;height:100%;left:0;top:0;width:100%}.scrollbar-outer>.scroll-element.scroll-x{bottom:0;height:12px;left:0;width:100%}.scrollbar-outer>.scroll-element.scroll-y{height:100%;right:0;top:0;width:12px}.scrollbar-outer>.scroll-element.scroll-x .scroll-element_outer{height:8px;top:2px}.scrollbar-outer>.scroll-element.scroll-y .scroll-element_outer{left:2px;width:8px}.scrollbar-outer>.scroll-element .scroll-element_outer{overflow:hidden}.scrollbar-outer>.scroll-element .scroll-element_track{background-color:#eee}.scrollbar-outer>.scroll-element .scroll-bar,.scrollbar-outer>.scroll-element .scroll-element_outer,.scrollbar-outer>.scroll-element .scroll-element_track{border-radius:8px}.scrollbar-outer>.scroll-element .scroll-bar{background-color:#d9d9d9}.scrollbar-outer>.scroll-element .scroll-bar:hover{background-color:#c2c2c2}.scrollbar-outer>.scroll-element.scroll-draggable .scroll-bar{background-color:#919191}.scrollbar-outer>.scroll-content.scroll-scrolly_visible{left:-12px;margin-left:12px}.scrollbar-outer>.scroll-content.scroll-scrollx_visible{top:-12px;margin-top:12px}.scrollbar-outer>.scroll-element.scroll-x .scroll-bar{min-width:10px}.scrollbar-outer>.scroll-element.scroll-y .scroll-bar{min-height:10px}.scrollbar-outer>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_track{left:-14px}.scrollbar-outer>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_track{top:-14px}.scrollbar-outer>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size{left:-14px}.scrollbar-outer>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size{top:-14px}.scrollbar-macosx>.scroll-element,.scrollbar-macosx>.scroll-element div{background:0 0;border:none;margin:0;padding:0;position:absolute;z-index:10}.scrollbar-macosx>.scroll-element div{display:block;height:100%;left:0;top:0;width:100%}.scrollbar-macosx>.scroll-element .scroll-element_track{display:none}.scrollbar-macosx>.scroll-element .scroll-bar{background-color:#6C6E71;display:block;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";filter:alpha(opacity=0);opacity:0;border-radius:7px;transition:opacity .2s linear}.scrollbar-macosx:hover>.scroll-element .scroll-bar,.scrollbar-macosx>.scroll-element.scroll-draggable .scroll-bar{-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)\";filter:alpha(opacity=70);opacity:.7}.scrollbar-macosx>.scroll-element.scroll-x{bottom:0;height:0;left:0;min-width:100%;overflow:visible;width:100%}.scrollbar-macosx>.scroll-element.scroll-y{height:100%;min-height:100%;right:0;top:0;width:0}.scrollbar-macosx>.scroll-element.scroll-x .scroll-bar{height:7px;min-width:10px;top:-9px}.scrollbar-macosx>.scroll-element.scroll-y .scroll-bar{left:-9px;min-height:10px;width:7px}.scrollbar-macosx>.scroll-element.scroll-x .scroll-element_outer{left:2px}.scrollbar-macosx>.scroll-element.scroll-x .scroll-element_size{left:-4px}.scrollbar-macosx>.scroll-element.scroll-y .scroll-element_outer{top:2px}.scrollbar-macosx>.scroll-element.scroll-y .scroll-element_size{top:-4px}.scrollbar-macosx>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size{left:-11px}.scrollbar-macosx>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size{top:-11px}.scrollbar-light>.scroll-element,.scrollbar-light>.scroll-element div{border:none;margin:0;overflow:hidden;padding:0;position:absolute;z-index:10}.scrollbar-light>.scroll-element{background-color:#fff}.scrollbar-light>.scroll-element div{display:block;height:100%;left:0;top:0;width:100%}.scrollbar-light>.scroll-element .scroll-element_outer{border-radius:10px}.scrollbar-light>.scroll-element .scroll-element_size{background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2RiZGJkYiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlOGU4ZTgiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:linear-gradient(to right,#dbdbdb 0,#e8e8e8 100%);border-radius:10px}.scrollbar-light>.scroll-element.scroll-x{bottom:0;height:17px;left:0;min-width:100%;width:100%}.scrollbar-light>.scroll-element.scroll-y{height:100%;min-height:100%;right:0;top:0;width:17px}.scrollbar-light>.scroll-element .scroll-bar{background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZlZmVmZSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmNWY1ZjUiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:linear-gradient(to right,#fefefe 0,#f5f5f5 100%);border:1px solid #dbdbdb;border-radius:10px}.scrollbar-light>.scroll-content.scroll-scrolly_visible{left:-17px;margin-left:17px}.scrollbar-light>.scroll-content.scroll-scrollx_visible{top:-17px;margin-top:17px}.scrollbar-light>.scroll-element.scroll-x .scroll-bar{height:10px;min-width:10px;top:0}.scrollbar-light>.scroll-element.scroll-y .scroll-bar{left:0;min-height:10px;width:10px}.scrollbar-light>.scroll-element.scroll-x .scroll-element_outer{height:12px;left:2px;top:2px}.scrollbar-light>.scroll-element.scroll-x .scroll-element_size{left:-4px}.scrollbar-light>.scroll-element.scroll-y .scroll-element_outer{left:2px;top:2px;width:12px}.scrollbar-light>.scroll-element.scroll-y .scroll-element_size{top:-4px}.scrollbar-light>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size{left:-19px}.scrollbar-light>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size{top:-19px}.scrollbar-light>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_track{left:-19px}.scrollbar-light>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_track{top:-19px}.scrollbar-rail>.scroll-element,.scrollbar-rail>.scroll-element div{border:none;margin:0;overflow:hidden;padding:0;position:absolute;z-index:10}.scrollbar-rail>.scroll-element{background-color:#fff}.scrollbar-rail>.scroll-element div{display:block;height:100%;left:0;top:0;width:100%}.scrollbar-rail>.scroll-element .scroll-element_size{background-color:#999;background-color:rgba(0,0,0,.3)}.scrollbar-rail>.scroll-element .scroll-element_outer:hover .scroll-element_size{background-color:#666;background-color:rgba(0,0,0,.5)}.scrollbar-rail>.scroll-element.scroll-x{bottom:0;height:12px;left:0;min-width:100%;padding:3px 0 2px;width:100%}.scrollbar-rail>.scroll-element.scroll-y{height:100%;min-height:100%;padding:0 2px 0 3px;right:0;top:0;width:12px}.scrollbar-rail>.scroll-element .scroll-bar{background-color:#d0b9a0;border-radius:2px;box-shadow:1px 1px 3px rgba(0,0,0,.5)}.scrollbar-rail>.scroll-element .scroll-element_outer:hover .scroll-bar{box-shadow:1px 1px 3px rgba(0,0,0,.6)}.scrollbar-rail>.scroll-content.scroll-scrolly_visible{left:-17px;margin-left:17px}.scrollbar-rail>.scroll-content.scroll-scrollx_visible{margin-top:17px;top:-17px}.scrollbar-rail>.scroll-element.scroll-x .scroll-bar{height:10px;min-width:10px;top:1px}.scrollbar-rail>.scroll-element.scroll-y .scroll-bar{left:1px;min-height:10px;width:10px}.scrollbar-rail>.scroll-element.scroll-x .scroll-element_outer{height:15px;left:5px}.scrollbar-rail>.scroll-element.scroll-x .scroll-element_size{height:2px;left:-10px;top:5px}.scrollbar-rail>.scroll-element.scroll-y .scroll-element_outer{top:5px;width:15px}.scrollbar-rail>.scroll-element.scroll-y .scroll-element_size{left:5px;top:-10px;width:2px}.scrollbar-rail>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size{left:-25px}.scrollbar-rail>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size{top:-25px}.scrollbar-rail>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_track{left:-25px}.scrollbar-rail>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_track{top:-25px}.scrollbar-dynamic>.scroll-element,.scrollbar-dynamic>.scroll-element div{background:0 0;border:none;margin:0;padding:0;position:absolute;z-index:10}.scrollbar-dynamic>.scroll-element div{display:block;height:100%;left:0;top:0;width:100%}.scrollbar-dynamic>.scroll-element.scroll-x{bottom:2px;height:7px;left:0;min-width:100%;width:100%}.scrollbar-dynamic>.scroll-element.scroll-y{height:100%;min-height:100%;right:2px;top:0;width:7px}.scrollbar-dynamic>.scroll-element .scroll-element_outer{opacity:.3;border-radius:12px}.scrollbar-dynamic>.scroll-element .scroll-element_size{background-color:#ccc;opacity:0;border-radius:12px;transition:opacity .2s}.scrollbar-dynamic>.scroll-element .scroll-bar{background-color:#6c6e71;border-radius:7px}.scrollbar-dynamic>.scroll-element.scroll-x .scroll-bar{bottom:0;height:7px;min-width:24px;top:auto}.scrollbar-dynamic>.scroll-element.scroll-y .scroll-bar{left:auto;min-height:24px;right:0;width:7px}.scrollbar-dynamic>.scroll-element.scroll-x .scroll-element_outer{bottom:0;top:auto;left:2px;transition:height .2s}.scrollbar-dynamic>.scroll-element.scroll-y .scroll-element_outer{left:auto;right:0;top:2px;transition:width .2s}.scrollbar-dynamic>.scroll-element.scroll-x .scroll-element_size{left:-4px}.scrollbar-dynamic>.scroll-element.scroll-y .scroll-element_size{top:-4px}.scrollbar-dynamic>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size{left:-11px}.scrollbar-dynamic>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size{top:-11px}.scrollbar-dynamic>.scroll-element.scroll-draggable .scroll-element_outer,.scrollbar-dynamic>.scroll-element:hover .scroll-element_outer{overflow:hidden;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)\";filter:alpha(opacity=70);opacity:.7}.scrollbar-dynamic>.scroll-element.scroll-draggable .scroll-element_outer .scroll-element_size,.scrollbar-dynamic>.scroll-element:hover .scroll-element_outer .scroll-element_size{opacity:1}.scrollbar-dynamic>.scroll-element.scroll-draggable .scroll-element_outer .scroll-bar,.scrollbar-dynamic>.scroll-element:hover .scroll-element_outer .scroll-bar{height:100%;width:100%;border-radius:12px}.scrollbar-dynamic>.scroll-element.scroll-x.scroll-draggable .scroll-element_outer,.scrollbar-dynamic>.scroll-element.scroll-x:hover .scroll-element_outer{height:20px;min-height:7px}.scrollbar-dynamic>.scroll-element.scroll-y.scroll-draggable .scroll-element_outer,.scrollbar-dynamic>.scroll-element.scroll-y:hover .scroll-element_outer{min-width:7px;width:20px}.scrollbar-chrome>.scroll-element,.scrollbar-chrome>.scroll-element div{border:none;margin:0;overflow:hidden;padding:0;position:absolute;z-index:10}.scrollbar-chrome>.scroll-element{background-color:#fff}.scrollbar-chrome>.scroll-element div{display:block;height:100%;left:0;top:0;width:100%}.scrollbar-chrome>.scroll-element .scroll-element_track{background:#f1f1f1;border:1px solid #dbdbdb}.scrollbar-chrome>.scroll-element.scroll-x{bottom:0;height:16px;left:0;min-width:100%;width:100%}.scrollbar-chrome>.scroll-element.scroll-y{height:100%;min-height:100%;right:0;top:0;width:16px}.scrollbar-chrome>.scroll-element .scroll-bar{background-color:#d9d9d9;border:1px solid #bdbdbd;cursor:default;border-radius:2px}.scrollbar-chrome>.scroll-element .scroll-bar:hover{background-color:#c2c2c2;border-color:#a9a9a9}.scrollbar-chrome>.scroll-element.scroll-draggable .scroll-bar{background-color:#919191;border-color:#7e7e7e}.scrollbar-chrome>.scroll-content.scroll-scrolly_visible{left:-16px;margin-left:16px}.scrollbar-chrome>.scroll-content.scroll-scrollx_visible{top:-16px;margin-top:16px}.scrollbar-chrome>.scroll-element.scroll-x .scroll-bar{height:8px;min-width:10px;top:3px}.scrollbar-chrome>.scroll-element.scroll-y .scroll-bar{left:3px;min-height:10px;width:8px}.scrollbar-chrome>.scroll-element.scroll-x .scroll-element_outer{border-left:1px solid #dbdbdb}.scrollbar-chrome>.scroll-element.scroll-x .scroll-element_track{height:14px;left:-3px}.scrollbar-chrome>.scroll-element.scroll-x .scroll-element_size{height:14px;left:-4px}.scrollbar-chrome>.scroll-element.scroll-y .scroll-element_outer{border-top:1px solid #dbdbdb}.scrollbar-chrome>.scroll-element.scroll-y .scroll-element_track{top:-3px;width:14px}.scrollbar-chrome>.scroll-element.scroll-y .scroll-element_size{top:-4px;width:14px}.scrollbar-chrome>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size{left:-19px}.scrollbar-chrome>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size{top:-19px}.scrollbar-chrome>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_track{left:-19px}.scrollbar-chrome>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_track{top:-19px}\n" +
"/**\n" +
" * Minified style.\n" +
" * Original filename: \\src\\styles\\style.css\n" +
" */\n" +
"@-webkit-keyframes spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}#emote-menu-button{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKUSURBVDhPfZTNi1JRGMZvMIsWUZts5SIXFYK0CME/IGghxVC7WUoU1NBixI+mRSD4MQzmxziKO3XUBhRmUGZKdBG40XEGU6d0GFGZcT4qxW1hi7fzvNwZqKwDD5z7vs/vueeee+6VMJxO5wUhhdvtfuHz+T4tLS2NhegfGsMDLxiwHIIhLi57PJ75VCr1Y39/n4bDIY1Go4lCDx54wYCVYzjoVjQa/dxutyfCkwSvYJpgOSQf708tuBa1yWRy/L+V/Cl4wYBFhhTxfLhum/esiiJ1u12KRCJksVhofX2dTk5OzkHMUUMPHnjB2F55VpEhPde/Lbx8FqBEIkHpdJoMBgNptVrS6XRUqVTOg7a3t2lmZob0ej2p1Wr2ggGLDOnJ3QSZH4coHo/TysoKhygUCtJoNFQsFmkwGLAwR7hSqSSVSsVeMGCRIT29F6fXJi8Xy+Uymc1mmp6eJofDQfV6nU5PT1mY2+127uHxSqUSh4FFhhQLvrvtcrm+YpkHBwdUrVZpa2uLarUadTodOjw8ZGGOGnrwwAsGLDLw1i4uLrzRYeOOj49pb2+Pdnd3qdVq8StGAIQ5ao1Ggz3wggGLDD4C4izcEcWfR0dHbMrlcrSxscGbjVAIK8lms7S5ucmB/X6fXz9YDsEQFzdjsVit2Wzyqc1kMrwfVquVjEYjzc3NkclkIpvNRmtra+yBVzAfBXtDjuGgS8FgcFbc8QvuhjNSKBQoFAqR6LFEn/L5PPfggXd5eXkWrBzDQdC1QCBgFoeut7Ozw/tyBp2FQzhPwtOFFwzY34Yo4A9wRXzdD8LhcE48wncE9no9Fuaoid574bkPLxgZ/3uI5pTQVfFlP/L7/Wmhb7JSXq/3IXrwyHZ5SNIvGCnqyh+J7+gAAAAASUVORK5CYII=)!important;background-position:50%;background-repeat:no-repeat;cursor:pointer;height:30px;width:30px}#emote-menu-button:focus{box-shadow:none}#emote-menu-button.active{box-shadow:0 0 6px 0 #7d5bbe,inset 0 0 0 1px rgba(100,65,164,.5)}.emote-menu{padding:5px;z-index:1000;display:none;background-color:#202020;position:absolute}.emote-menu a{color:#fff}.emote-menu a:hover{cursor:pointer;text-decoration:underline;color:#ccc}.emote-menu .emotes-starred{height:38px}.emote-menu .draggable{background-image:repeating-linear-gradient(45deg,transparent,transparent 5px,rgba(255,255,255,.05) 5px,rgba(255,255,255,.05) 10px);cursor:move;height:7px;margin-bottom:3px}.emote-menu .draggable:hover{background-image:repeating-linear-gradient(45deg,transparent,transparent 5px,rgba(255,255,255,.1) 5px,rgba(255,255,255,.1) 10px)}.emote-menu .header-info{border-top:1px solid #000;box-shadow:0 1px 0 rgba(255,255,255,.05) inset;background-image:linear-gradient(to top,transparent,rgba(0,0,0,.5));padding:2px;color:#ddd;text-align:center;position:relative}.emote-menu .header-info img{margin-right:8px}.emote-menu .emote{display:inline-block;padding:2px;margin:1px;cursor:pointer;border-radius:5px;text-align:center;position:relative;width:30px;height:30px;transition:all .25s ease;border:1px solid transparent}.emote-menu.editing .emote{cursor:auto}.emote-menu .emote img{max-width:100%;max-height:100%;margin:auto;position:absolute;top:0;bottom:0;left:0;right:0}.emote-menu .single-row .emote-container{overflow:hidden;height:37px}.emote-menu .single-row .emote{display:inline-block;margin-bottom:100px}.emote-menu .emote:hover{background-color:rgba(255,255,255,.1)}.emote-menu .pull-left{float:left}.emote-menu .pull-right{float:right}.emote-menu .footer{text-align:center;border-top:1px solid #000;box-shadow:0 1px 0 rgba(255,255,255,.05) inset;padding:5px 0 2px;margin-top:5px;height:18px}.emote-menu .footer .pull-left{margin-right:5px}.emote-menu .footer .pull-right{margin-left:5px}.emote-menu .icon{height:16px;width:16px;opacity:.5;background-size:contain!important}.emote-menu .icon:hover{opacity:1}.emote-menu .icon-home{background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB2ZXJzaW9uPSIxLjEiDQogICB3aWR0aD0iNjQiDQogICBoZWlnaHQ9IjY0Ig0KICAgdmlld0JveD0iMCAwIDY0IDY0Ig0KICAgaWQ9IkNhcGFfMSINCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiPjxtZXRhZGF0YQ0KICAgaWQ9Im1ldGFkYXRhMzAwMSI+PHJkZjpSREY+PGNjOldvcmsNCiAgICAgICByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUNCiAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+PGRjOnRpdGxlPjwvZGM6dGl0bGU+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzDQogICBpZD0iZGVmczI5OTkiIC8+DQo8cGF0aA0KICAgZD0ibSA1Ny4wNjIsMzEuMzk4IGMgMC45MzIsLTEuMDI1IDAuODQyLC0yLjU5NiAtMC4yMDEsLTMuNTA4IEwgMzMuODg0LDcuNzg1IEMgMzIuODQxLDYuODczIDMxLjE2OSw2Ljg5MiAzMC4xNDgsNy44MjggTCA3LjA5MywyOC45NjIgYyAtMS4wMjEsMC45MzYgLTEuMDcxLDIuNTA1IC0wLjExMSwzLjUwMyBsIDAuNTc4LDAuNjAyIGMgMC45NTksMC45OTggMi41MDksMS4xMTcgMy40NiwwLjI2NSBsIDEuNzIzLC0xLjU0MyB2IDIyLjU5IGMgMCwxLjM4NiAxLjEyMywyLjUwOCAyLjUwOCwyLjUwOCBoIDguOTg3IGMgMS4zODUsMCAyLjUwOCwtMS4xMjIgMi41MDgsLTIuNTA4IFYgMzguNTc1IGggMTEuNDYzIHYgMTUuODA0IGMgLTAuMDIsMS4zODUgMC45NzEsMi41MDcgMi4zNTYsMi41MDcgaCA5LjUyNCBjIDEuMzg1LDAgMi41MDgsLTEuMTIyIDIuNTA4LC0yLjUwOCBWIDMyLjEwNyBjIDAsMCAwLjQ3NiwwLjQxNyAxLjA2MywwLjkzMyAwLjU4NiwwLjUxNSAxLjgxNywwLjEwMiAyLjc0OSwtMC45MjQgbCAwLjY1MywtMC43MTggeiINCiAgIGlkPSJwYXRoMjk5NSINCiAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjEiIC8+DQo8L3N2Zz4=) 50% no-repeat}.emote-menu .icon-gear{background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB2ZXJzaW9uPSIxLjEiDQogICB3aWR0aD0iMjEuNTkiDQogICBoZWlnaHQ9IjIxLjEzNjk5OSINCiAgIHZpZXdCb3g9IjAgMCAyMS41OSAyMS4xMzciDQogICBpZD0iQ2FwYV8xIg0KICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PG1ldGFkYXRhDQogICBpZD0ibWV0YWRhdGEzOSI+PHJkZjpSREY+PGNjOldvcmsNCiAgICAgICByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUNCiAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+PGRjOnRpdGxlPjwvZGM6dGl0bGU+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzDQogICBpZD0iZGVmczM3IiAvPg0KPHBhdGgNCiAgIGQ9Ik0gMTguNjIyLDguMTQ1IDE4LjA3Nyw2Ljg1IGMgMCwwIDEuMjY4LC0yLjg2MSAxLjE1NiwtMi45NzEgTCAxNy41NTQsMi4yNCBDIDE3LjQzOCwyLjEyNyAxNC41NzYsMy40MzMgMTQuNTc2LDMuNDMzIEwgMTMuMjU2LDIuOSBDIDEzLjI1NiwyLjkgMTIuMDksMCAxMS45MywwIEggOS41NjEgQyA5LjM5NiwwIDguMzE3LDIuOTA2IDguMzE3LDIuOTA2IEwgNi45OTksMy40NDEgYyAwLDAgLTIuOTIyLC0xLjI0MiAtMy4wMzQsLTEuMTMxIEwgMi4yODksMy45NTEgQyAyLjE3Myw0LjA2NCAzLjUwNyw2Ljg2NyAzLjUwNyw2Ljg2NyBMIDIuOTYyLDguMTYgQyAyLjk2Miw4LjE2IDAsOS4zMDEgMCw5LjQ1NSB2IDIuMzIyIGMgMCwwLjE2MiAyLjk2OSwxLjIxOSAyLjk2OSwxLjIxOSBsIDAuNTQ1LDEuMjkxIGMgMCwwIC0xLjI2OCwyLjg1OSAtMS4xNTcsMi45NjkgbCAxLjY3OCwxLjY0MyBjIDAuMTE0LDAuMTExIDIuOTc3LC0xLjE5NSAyLjk3NywtMS4xOTUgbCAxLjMyMSwwLjUzNSBjIDAsMCAxLjE2NiwyLjg5OCAxLjMyNywyLjg5OCBoIDIuMzY5IGMgMC4xNjQsMCAxLjI0NCwtMi45MDYgMS4yNDQsLTIuOTA2IGwgMS4zMjIsLTAuNTM1IGMgMCwwIDIuOTE2LDEuMjQyIDMuMDI5LDEuMTMzIGwgMS42NzgsLTEuNjQxIGMgMC4xMTcsLTAuMTE1IC0xLjIyLC0yLjkxNiAtMS4yMiwtMi45MTYgbCAwLjU0NCwtMS4yOTMgYyAwLDAgMi45NjMsLTEuMTQzIDIuOTYzLC0xLjI5OSBWIDkuMzYgQyAyMS41OSw5LjE5OSAxOC42MjIsOC4xNDUgMTguNjIyLDguMTQ1IHogbSAtNC4zNjYsMi40MjMgYyAwLDEuODY3IC0xLjU1MywzLjM4NyAtMy40NjEsMy4zODcgLTEuOTA2LDAgLTMuNDYxLC0xLjUyIC0zLjQ2MSwtMy4zODcgMCwtMS44NjcgMS41NTUsLTMuMzg1IDMuNDYxLC0zLjM4NSAxLjkwOSwwLjAwMSAzLjQ2MSwxLjUxOCAzLjQ2MSwzLjM4NSB6Ig0KICAgaWQ9InBhdGgzIg0KICAgc3R5bGU9ImZpbGw6I0ZGRkZGRiIgLz4NCjxnDQogICBpZD0iZzUiPg0KPC9nPg0KPGcNCiAgIGlkPSJnNyI+DQo8L2c+DQo8Zw0KICAgaWQ9Imc5Ij4NCjwvZz4NCjxnDQogICBpZD0iZzExIj4NCjwvZz4NCjxnDQogICBpZD0iZzEzIj4NCjwvZz4NCjxnDQogICBpZD0iZzE1Ij4NCjwvZz4NCjxnDQogICBpZD0iZzE3Ij4NCjwvZz4NCjxnDQogICBpZD0iZzE5Ij4NCjwvZz4NCjxnDQogICBpZD0iZzIxIj4NCjwvZz4NCjxnDQogICBpZD0iZzIzIj4NCjwvZz4NCjxnDQogICBpZD0iZzI1Ij4NCjwvZz4NCjxnDQogICBpZD0iZzI3Ij4NCjwvZz4NCjxnDQogICBpZD0iZzI5Ij4NCjwvZz4NCjxnDQogICBpZD0iZzMxIj4NCjwvZz4NCjxnDQogICBpZD0iZzMzIj4NCjwvZz4NCjwvc3ZnPg0K) 50% no-repeat}.emote-menu.editing .icon-gear{-webkit-animation:spin 4s linear infinite;animation:spin 4s linear infinite}.emote-menu .icon-resize-handle{background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB2ZXJzaW9uPSIxLjEiDQogICB3aWR0aD0iMTYiDQogICBoZWlnaHQ9IjE2Ig0KICAgdmlld0JveD0iMCAwIDE2IDE2Ig0KICAgaWQ9IkNhcGFfMSINCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiPjxtZXRhZGF0YQ0KICAgaWQ9Im1ldGFkYXRhNDM1NyI+PHJkZjpSREY+PGNjOldvcmsNCiAgICAgICByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUNCiAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+PGRjOnRpdGxlPjwvZGM6dGl0bGU+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzDQogICBpZD0iZGVmczQzNTUiIC8+DQo8cGF0aA0KICAgZD0iTSAxMy41LDggQyAxMy4yMjUsOCAxMyw4LjIyNCAxMyw4LjUgdiAzLjc5MyBMIDMuNzA3LDMgSCA3LjUgQyA3Ljc3NiwzIDgsMi43NzYgOCwyLjUgOCwyLjIyNCA3Ljc3NiwyIDcuNSwyIGggLTUgTCAyLjMwOSwyLjAzOSAyLjE1LDIuMTQ0IDIuMTQ2LDIuMTQ2IDIuMTQzLDIuMTUyIDIuMDM5LDIuMzA5IDIsMi41IHYgNSBDIDIsNy43NzYgMi4yMjQsOCAyLjUsOCAyLjc3Niw4IDMsNy43NzYgMyw3LjUgViAzLjcwNyBMIDEyLjI5MywxMyBIIDguNSBDIDguMjI0LDEzIDgsMTMuMjI1IDgsMTMuNSA4LDEzLjc3NSA4LjIyNCwxNCA4LjUsMTQgaCA1IGwgMC4xOTEsLTAuMDM5IGMgMC4xMjEsLTAuMDUxIDAuMjIsLTAuMTQ4IDAuMjcsLTAuMjcgTCAxNCwxMy41MDIgViA4LjUgQyAxNCw4LjIyNCAxMy43NzUsOCAxMy41LDggeiINCiAgIGlkPSJwYXRoNDM1MSINCiAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjEiIC8+DQo8L3N2Zz4=) 50% no-repeat;cursor:nwse-resize!important}.emote-menu .icon-pin{background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB2ZXJzaW9uPSIxLjEiDQogICB3aWR0aD0iMTYiDQogICBoZWlnaHQ9IjE2Ig0KICAgaWQ9InN2ZzMwMDUiPg0KICA8bWV0YWRhdGENCiAgICAgaWQ9Im1ldGFkYXRhMzAyMyI+DQogICAgPHJkZjpSREY+DQogICAgICA8Y2M6V29yaw0KICAgICAgICAgcmRmOmFib3V0PSIiPg0KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4NCiAgICAgICAgPGRjOnR5cGUNCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4NCiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+DQogICAgICA8L2NjOldvcms+DQogICAgPC9yZGY6UkRGPg0KICA8L21ldGFkYXRhPg0KICA8ZGVmcw0KICAgICBpZD0iZGVmczMwMjEiIC8+DQogIDxnDQogICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuNzkzMDc4MiwwLDAsMC43OTMwNzgyLC0yLjE3MDk4NSwtODE0LjY5Mjk5KSINCiAgICAgaWQ9ImczMDA3Ij4NCiAgICA8Zw0KICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MTEsMC43MDcxMSwtMC43MDcxMSwwLjcwNzExLDczNy43MDc1NSwyOTUuNDg4MDgpIg0KICAgICAgIGlkPSJnMzAwOSI+DQogICAgICA8Zw0KICAgICAgICAgaWQ9ImczNzU1Ij4NCiAgICAgICAgPHBhdGgNCiAgICAgICAgICAgZD0iTSA5Ljc4MTI1LDAgQyA5LjQ3NDA1NjIsMC42ODkxMTIgOS41MjA2OCwxLjUyMzA4NTMgOS4zMTI1LDIuMTg3NSBMIDQuOTM3NSw2LjU5Mzc1IEMgMy45NTg5NjA4LDYuNDI5NDgzIDIuOTQ3NzU0OCw2LjUzMjc4OTkgMiw2LjgxMjUgTCA1LjAzMTI1LDkuODQzNzUgMC41NjI1LDE0LjMxMjUgMCwxNiBDIDAuNTY5Mjk2MjgsMTUuNzk1NjI2IDEuMTY3NzM3OCwxNS42NDAyMzcgMS43MTg3NSwxNS40MDYyNSBMIDYuMTU2MjUsMTAuOTY4NzUgOS4xODc1LDE0IGMgMC4yNzk2ODIzLC0wLjk0Nzc4MyAwLjM4MzE1MjgsLTEuOTU4OTM3IDAuMjE4NzUsLTIuOTM3NSAxLjUwMDAxMSwtMS40ODk1Nzk4IDMuMDAwMDAxLC0yLjk3OTE1OSA0LjUsLTQuNDY4NzUgMC42MDExMDIsLTAuMDMxMzYxIDEuODIyMTM4LC0wLjA5NjEzNyAyLC0wLjQ2ODc1IEMgMTMuODc5ODkyLDQuMDY5NDgwMyAxMS44NDI4NjUsMi4wMjAyMjgyIDkuNzgxMjUsMCB6Ig0KICAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjg5MTU5Mzc0LC0wLjg5MTU5Mzc0LDAuODkxNTkzNzQsMC44OTE1OTM3NCwtMi4yNjU1LDEwMzcuMTM0NSkiDQogICAgICAgICAgIGlkPSJwYXRoMzAxMSINCiAgICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MSIgLz4NCiAgICAgIDwvZz4NCiAgICA8L2c+DQogIDwvZz4NCjwvc3ZnPg0K) 50% no-repeat;transition:all .25s ease}.emote-menu .icon-pin:hover,.emote-menu.pinned .icon-pin{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:1}.emote-menu .edit-tool{background-position:50%;background-repeat:no-repeat;background-size:14px;border-radius:4px;border:1px solid #000;cursor:pointer;display:none;height:14px;opacity:.25;position:absolute;transition:all .25s ease;width:14px;z-index:1}.emote-menu .edit-tool:hover,.emote-menu .emote:hover .edit-tool{opacity:1}.emote-menu .edit-visibility{background-color:#00c800;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB2ZXJzaW9uPSIxLjEiDQogICB3aWR0aD0iMTAwIg0KICAgaGVpZ2h0PSIxMDAiDQogICB2aWV3Qm94PSIwIDAgMTAwIDEwMCINCiAgIGlkPSJMYXllcl8xIg0KICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PG1ldGFkYXRhDQogICBpZD0ibWV0YWRhdGE5Ij48cmRmOlJERj48Y2M6V29yaw0KICAgICAgIHJkZjphYm91dD0iIj48ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD48ZGM6dHlwZQ0KICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz48ZGM6dGl0bGU+PC9kYzp0aXRsZT48L2NjOldvcms+PC9yZGY6UkRGPjwvbWV0YWRhdGE+PGRlZnMNCiAgIGlkPSJkZWZzNyIgLz4NCjxwYXRoDQogICBkPSJNIDk3Ljk2NCw0Ni41NDggQyA5Ny4wOTgsNDUuNTI4IDc2LjQyNywyMS42MDMgNTAsMjEuNjAzIGMgLTI2LjQyNywwIC00Ny4wOTgsMjMuOTI1IC00Ny45NjUsMjQuOTQ2IC0xLjcwMSwyIC0xLjcwMSw0LjkwMiAxMGUtNCw2LjkwMyAwLjg2NiwxLjAyIDIxLjUzNywyNC45NDUgNDcuOTY0LDI0Ljk0NSAyNi40MjcsMCA0Ny4wOTgsLTIzLjkyNiA0Ny45NjUsLTI0Ljk0NiAxLjcwMSwtMiAxLjcwMSwtNC45MDIgLTAuMDAxLC02LjkwMyB6IE0gNTguMDczLDM1Ljk3NSBjIDEuNzc3LC0wLjk3IDQuMjU1LDAuMTQzIDUuNTM0LDIuNDg1IDEuMjc5LDIuMzQzIDAuODc1LDUuMDI5IC0wLjkwMiw1Ljk5OSAtMS43NzcsMC45NzEgLTQuMjU1LC0wLjE0MyAtNS41MzUsLTIuNDg1IC0xLjI3OSwtMi4zNDMgLTAuODc1LC01LjAyOSAwLjkwMywtNS45OTkgeiBNIDUwLDY5LjcyOSBDIDMxLjU0LDY5LjcyOSAxNi4wMDUsNTUuNTUzIDEwLjYyOCw1MCAxNC4yNTksNDYuMjQ5IDIyLjUyNiwzOC41NzEgMzMuMTk1LDMzLjk3OSAzMS4xMTQsMzcuMTQ1IDI5Ljg5NCw0MC45MjggMjkuODk0LDQ1IGMgMCwxMS4xMDQgOS4wMDEsMjAuMTA1IDIwLjEwNSwyMC4xMDUgMTEuMTA0LDAgMjAuMTA2LC05LjAwMSAyMC4xMDYsLTIwLjEwNSAwLC00LjA3MiAtMS4yMTksLTcuODU1IC0zLjMsLTExLjAyMSBDIDc3LjQ3NCwzOC41NzIgODUuNzQxLDQ2LjI1IDg5LjM3Miw1MCA4My45OTUsNTUuNTU1IDY4LjQ2LDY5LjcyOSA1MCw2OS43MjkgeiINCiAgIGlkPSJwYXRoMyIgLz4NCjwvc3ZnPg==)}.emote-menu .edit-starred{background-color:#323232;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB2ZXJzaW9uPSIxLjEiDQogICB3aWR0aD0iNTAiDQogICBoZWlnaHQ9IjUwIg0KICAgdmlld0JveD0iMCAwIDUwIDUwIg0KICAgaWQ9IkxheWVyXzEiDQogICB4bWw6c3BhY2U9InByZXNlcnZlIj48bWV0YWRhdGENCiAgIGlkPSJtZXRhZGF0YTMwMDEiPjxyZGY6UkRGPjxjYzpXb3JrDQogICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlDQogICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPjxkYzp0aXRsZT48L2RjOnRpdGxlPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48ZGVmcw0KICAgaWQ9ImRlZnMyOTk5IiAvPg0KPHBhdGgNCiAgIGQ9Im0gNDMuMDQsMjIuNjk2IC03LjU2OCw3LjM3NyAxLjc4NywxMC40MTcgYyAwLjEyNywwLjc1IC0wLjE4MiwxLjUwOSAtMC43OTcsMS45NTcgLTAuMzQ4LDAuMjUzIC0wLjc2MiwwLjM4MiAtMS4xNzYsMC4zODIgLTAuMzE4LDAgLTAuNjM4LC0wLjA3NiAtMC45MzEsLTAuMjMgTCAyNSwzNy42ODEgMTUuNjQ1LDQyLjU5OSBjIC0wLjY3NCwwLjM1NSAtMS40OSwwLjI5NSAtMi4xMDcsLTAuMTUxIEMgMTIuOTIzLDQyIDEyLjYxNCw0MS4yNDIgMTIuNzQzLDQwLjQ5MSBMIDE0LjUzLDMwLjA3NCA2Ljk2MiwyMi42OTcgQyA2LjQxNSwyMi4xNjYgNi4yMjEsMjEuMzcxIDYuNDU0LDIwLjY0NyA2LjY5LDE5LjkyMyA3LjMxNSwxOS4zOTYgOC4wNjksMTkuMjg2IGwgMTAuNDU5LC0xLjUyMSA0LjY4LC05LjQ3OCBDIDIzLjU0Myw3LjYwMyAyNC4yMzksNy4xNzEgMjUsNy4xNzEgYyAwLjc2MywwIDEuNDU2LDAuNDMyIDEuNzkzLDEuMTE1IGwgNC42NzksOS40NzggMTAuNDYxLDEuNTIxIGMgMC43NTIsMC4xMDkgMS4zNzksMC42MzcgMS42MTIsMS4zNjEgMC4yMzcsMC43MjQgMC4wMzgsMS41MTkgLTAuNTA1LDIuMDUgeiINCiAgIGlkPSJwYXRoMjk5NSINCiAgIHN0eWxlPSJmaWxsOiNjY2NjY2M7ZmlsbC1vcGFjaXR5OjEiIC8+DQo8L3N2Zz4NCg==)}.emote-menu .emote>.edit-visibility{bottom:auto;left:auto;right:0;top:0}.emote-menu .emote>.edit-starred{bottom:auto;left:0;right:auto;top:0}.emote-menu .header-info>.edit-tool{margin-left:5px}.emote-menu.editing .edit-tool{display:inline-block}.emote-menu .emote-menu-hidden .edit-visibility{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB2ZXJzaW9uPSIxLjEiDQogICB3aWR0aD0iMTAwIg0KICAgaGVpZ2h0PSIxMDAiDQogICB2aWV3Qm94PSIwIDAgMTAwIDEwMCINCiAgIGlkPSJMYXllcl8zIg0KICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PG1ldGFkYXRhDQogICBpZD0ibWV0YWRhdGExNSI+PHJkZjpSREY+PGNjOldvcmsNCiAgICAgICByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUNCiAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+PGRjOnRpdGxlPjwvZGM6dGl0bGU+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzDQogICBpZD0iZGVmczEzIiAvPg0KPGcNCiAgIGlkPSJnMyI+DQoJPHBhdGgNCiAgIGQ9Ik0gNzAuMDgyLDQ1LjQ3NSA1MC40NzQsNjUuMDgyIEMgNjEuMTk4LDY0LjgzMSA2OS44MzEsNTYuMTk3IDcwLjA4Miw0NS40NzUgeiINCiAgIGlkPSJwYXRoNSINCiAgIHN0eWxlPSJmaWxsOiNGRkZGRkYiIC8+DQoJPHBhdGgNCiAgIGQ9Im0gOTcuOTY0LDQ2LjU0OCBjIC0wLjQ1LC0wLjUyOSAtNi4yNDUsLTcuMjMgLTE1LjQwMywtMTMuNTU0IGwgLTYuMiw2LjIgQyA4Mi4zNTEsNDMuMTQ4IDg2LjkyLDQ3LjQ2OSA4OS4zNzIsNTAgODMuOTk1LDU1LjU1NSA2OC40Niw2OS43MjkgNTAsNjkuNzI5IGMgLTEuMzM0LDAgLTIuNjUxLC0wLjA4MiAtMy45NTIsLTAuMjIyIGwgLTcuNDM5LDcuNDM5IGMgMy42MzksMC45MDkgNy40NDksMS40NSAxMS4zOTEsMS40NSAyNi40MjcsMCA0Ny4wOTgsLTIzLjkyNiA0Ny45NjUsLTI0Ljk0NiAxLjcwMSwtMS45OTkgMS43MDEsLTQuOTAxIC0wLjAwMSwtNi45MDIgeiINCiAgIGlkPSJwYXRoNyINCiAgIHN0eWxlPSJmaWxsOiNGRkZGRkYiIC8+DQoJPHBhdGgNCiAgIGQ9Im0gOTEuNDExLDE2LjY2IGMgMCwtMC4yNjYgLTAuMTA1LC0wLjUyIC0wLjI5MywtMC43MDcgbCAtNy4wNzEsLTcuMDcgYyAtMC4zOTEsLTAuMzkxIC0xLjAyMywtMC4zOTEgLTEuNDE0LDAgTCA2Ni44MDQsMjQuNzExIEMgNjEuNjAyLDIyLjgxOCA1NS45NDksMjEuNjAzIDUwLDIxLjYwMyBjIC0yNi40MjcsMCAtNDcuMDk4LDIzLjkyNiAtNDcuOTY1LDI0Ljk0NiAtMS43MDEsMiAtMS43MDEsNC45MDIgMTBlLTQsNi45MDMgMC41MTcsMC42MDcgOC4wODMsOS4zNTQgMTkuNzA3LDE2LjMyIEwgOC44ODMsODIuNjMyIEMgOC42OTUsODIuODIgOC41OSw4My4wNzMgOC41OSw4My4zMzkgYyAwLDAuMjY2IDAuMTA1LDAuNTIgMC4yOTMsMC43MDcgbCA3LjA3MSw3LjA3IGMgMC4xOTUsMC4xOTUgMC40NTEsMC4yOTMgMC43MDcsMC4yOTMgMC4yNTYsMCAwLjUxMiwtMC4wOTggMC43MDcsLTAuMjkzIGwgNzMuNzUsLTczLjc1IGMgMC4xODcsLTAuMTg2IDAuMjkzLC0wLjQ0IDAuMjkzLC0wLjcwNiB6IE0gMTAuNjI4LDUwIEMgMTQuMjU5LDQ2LjI0OSAyMi41MjYsMzguNTcxIDMzLjE5NSwzMy45NzkgMzEuMTE0LDM3LjE0NSAyOS44OTQsNDAuOTI4IDI5Ljg5NCw0NSBjIDAsNC42NjUgMS42MDEsOC45NDUgNC4yNywxMi4zNTEgTCAyOC4wNCw2My40NzUgQyAxOS44ODgsNTguOTU1IDEzLjY0OSw1My4xMiAxMC42MjgsNTAgeiINCiAgIGlkPSJwYXRoOSINCiAgIHN0eWxlPSJmaWxsOiNGRkZGRkYiIC8+DQo8L2c+DQo8L3N2Zz4NCg==);background-color:red}.emote-menu .emote-menu-starred .edit-starred{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB2ZXJzaW9uPSIxLjEiDQogICB3aWR0aD0iNTAiDQogICBoZWlnaHQ9IjUwIg0KICAgdmlld0JveD0iMCAwIDUwIDUwIg0KICAgaWQ9IkxheWVyXzEiDQogICB4bWw6c3BhY2U9InByZXNlcnZlIj48bWV0YWRhdGENCiAgIGlkPSJtZXRhZGF0YTMwMDEiPjxyZGY6UkRGPjxjYzpXb3JrDQogICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlDQogICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPjxkYzp0aXRsZT48L2RjOnRpdGxlPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48ZGVmcw0KICAgaWQ9ImRlZnMyOTk5IiAvPg0KPHBhdGgNCiAgIGQ9Im0gNDMuMDQsMjIuNjk2IC03LjU2OCw3LjM3NyAxLjc4NywxMC40MTcgYyAwLjEyNywwLjc1IC0wLjE4MiwxLjUwOSAtMC43OTcsMS45NTcgLTAuMzQ4LDAuMjUzIC0wLjc2MiwwLjM4MiAtMS4xNzYsMC4zODIgLTAuMzE4LDAgLTAuNjM4LC0wLjA3NiAtMC45MzEsLTAuMjMgTCAyNSwzNy42ODEgMTUuNjQ1LDQyLjU5OSBjIC0wLjY3NCwwLjM1NSAtMS40OSwwLjI5NSAtMi4xMDcsLTAuMTUxIEMgMTIuOTIzLDQyIDEyLjYxNCw0MS4yNDIgMTIuNzQzLDQwLjQ5MSBMIDE0LjUzLDMwLjA3NCA2Ljk2MiwyMi42OTcgQyA2LjQxNSwyMi4xNjYgNi4yMjEsMjEuMzcxIDYuNDU0LDIwLjY0NyA2LjY5LDE5LjkyMyA3LjMxNSwxOS4zOTYgOC4wNjksMTkuMjg2IGwgMTAuNDU5LC0xLjUyMSA0LjY4LC05LjQ3OCBDIDIzLjU0Myw3LjYwMyAyNC4yMzksNy4xNzEgMjUsNy4xNzEgYyAwLjc2MywwIDEuNDU2LDAuNDMyIDEuNzkzLDEuMTE1IGwgNC42NzksOS40NzggMTAuNDYxLDEuNTIxIGMgMC43NTIsMC4xMDkgMS4zNzksMC42MzcgMS42MTIsMS4zNjEgMC4yMzcsMC43MjQgMC4wMzgsMS41MTkgLTAuNTA1LDIuMDUgeiINCiAgIGlkPSJwYXRoMjk5NSINCiAgIHN0eWxlPSJmaWxsOiNmZmNjMDA7ZmlsbC1vcGFjaXR5OjEiIC8+DQo8L3N2Zz4NCg==)}.emote-menu .emote.emote-menu-starred{border-color:rgba(200,200,0,.5)}.emote-menu .emote.emote-menu-hidden{border-color:rgba(255,0,0,.5)}.emote-menu #starred-emotes-group .emote:not(.emote-menu-starred),.emote-menu:not(.editing) .emote-menu-hidden{display:none}.emote-menu:not(.editing) #starred-emotes-group .emote-menu-starred{border-color:transparent}.emote-menu #starred-emotes-group{text-align:center;color:#646464}.emote-menu #starred-emotes-group:empty:before{content:\"Use the edit mode to star an emote!\";position:relative;top:8px}.emote-menu .scrollable{height:calc(100% - 101px);overflow-y:auto}.emote-menu .sticky{position:absolute;bottom:0;width:100%}.emote-menu .emote-menu-inner{position:relative;max-height:100%;height:100%}"));

},{}],3:[function(require,module,exports){
module.exports = (function() {
    var Hogan = require('hogan.js/lib/template.js');
    var templates = {};
    templates['emote'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"emote");if(t.s(t.f("thirdParty",c,p,1),c,p,0,32,44,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" third-party");});c.pop();}if(!t.s(t.f("isVisible",c,p,1),c,p,1,0,0,"")){t.b(" emote-menu-hidden");};if(t.s(t.f("isStarred",c,p,1),c,p,0,119,138,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" emote-menu-starred");});c.pop();}t.b("\" data-emote=\"");t.b(t.v(t.f("text",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("text",c,p,0)));if(t.s(t.f("thirdParty",c,p,1),c,p,0,206,229,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" (from 3rd party addon)");});c.pop();}t.b("\">\r");t.b("\n" + i);t.b("	<img src=\"");t.b(t.t(t.f("url",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("	<div class=\"edit-tool edit-starred\" data-which=\"");t.b(t.v(t.f("text",c,p,0)));t.b("\" data-command=\"toggle-starred\" title=\"Star/unstar emote: ");t.b(t.v(t.f("text",c,p,0)));t.b("\"></div>\r");t.b("\n" + i);t.b("	<div class=\"edit-tool edit-visibility\" data-which=\"");t.b(t.v(t.f("text",c,p,0)));t.b("\" data-command=\"toggle-visibility\" title=\"Hide/show emote: ");t.b(t.v(t.f("text",c,p,0)));t.b("\"></div>\r");t.b("\n" + i);t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
    templates['emoteButton'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<button class=\"button button--icon-only float-left\" title=\"Emote Menu\" id=\"emote-menu-button\"></button>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
    templates['emoteGroupHeader'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"group-header\" data-emote-channel=\"");t.b(t.v(t.f("channel",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("	<div class=\"header-info\">\r");t.b("\n" + i);t.b("		<img src=\"");t.b(t.v(t.f("badge",c,p,0)));t.b("\" />\r");t.b("\n" + i);t.b("		");t.b(t.v(t.f("channelDisplayName",c,p,0)));t.b("\r");t.b("\n" + i);t.b("		<div class=\"edit-tool edit-visibility\" data-which=\"channel-");t.b(t.v(t.f("channel",c,p,0)));t.b("\" data-command=\"toggle-visibility\" title=\"Hide/show current emotes for ");t.b(t.v(t.f("channelDisplayName",c,p,0)));t.b(" (note: new emotes will still show up if they are added)\"></div>\r");t.b("\n" + i);t.b("	</div>\r");t.b("\n" + i);t.b("	<div class=\"emote-container\"></div>\r");t.b("\n" + i);t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
    templates['menu'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"emote-menu\" id=\"emote-menu-for-twitch\">\r");t.b("\n" + i);t.b("	<div class=\"emote-menu-inner\">\r");t.b("\n" + i);t.b("\r");t.b("\n" + i);t.b("		<div class=\"draggable\"></div>\r");t.b("\n" + i);t.b("\r");t.b("\n" + i);t.b("		<div class=\"scrollable scrollbar-macosx\">\r");t.b("\n" + i);t.b("			<div class=\"group-container\" id=\"all-emotes-group\"></div>\r");t.b("\n" + i);t.b("		</div>\r");t.b("\n" + i);t.b("\r");t.b("\n" + i);t.b("		<div class=\"sticky\">\r");t.b("\n" + i);t.b("			<div class=\"group-header single-row\" id=\"starred-emotes-group\">\r");t.b("\n" + i);t.b("				<div class=\"header-info\">Favorite Emotes</div>\r");t.b("\n" + i);t.b("				<div class=\"emote-container\"></div>\r");t.b("\n" + i);t.b("			</div>\r");t.b("\n" + i);t.b("\r");t.b("\n" + i);t.b("			<div class=\"footer\">\r");t.b("\n" + i);t.b("				<a class=\"pull-left icon icon-home\" href=\"http://cletusc.github.io/Userscript--Twitch-Chat-Emotes\" target=\"_blank\" title=\"Visit the homepage where you can donate, post a review, or contact the developer\"></a>\r");t.b("\n" + i);t.b("				<a class=\"pull-left icon icon-gear\" data-command=\"toggle-editing\" title=\"Toggle edit mode\"></a>\r");t.b("\n" + i);t.b("				<a class=\"pull-right icon icon-resize-handle\" data-command=\"resize-handle\"></a>\r");t.b("\n" + i);t.b("				<a class=\"pull-right icon icon-pin\" data-command=\"toggle-pinned\" title=\"Pin/unpin the emote menu to the screen\"></a>\r");t.b("\n" + i);t.b("			</div>\r");t.b("\n" + i);t.b("		</div>\r");t.b("\n" + i);t.b("\r");t.b("\n" + i);t.b("	</div>\r");t.b("\n" + i);t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
    templates['newsMessage'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("\r");t.b("\n" + i);t.b("<div class=\"twitch-chat-emotes-news\">\r");t.b("\n" + i);t.b("	[");t.b(t.v(t.f("scriptName",c,p,0)));t.b("] News: ");t.b(t.t(t.f("message",c,p,0)));t.b(" (<a href=\"#\" data-command=\"twitch-chat-emotes:dismiss-news\" data-news-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">Dismiss</a>)\r");t.b("\n" + i);t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
    return templates;
})();
},{"hogan.js/lib/template.js":4}],4:[function(require,module,exports){
/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var Hogan = {};

(function (Hogan) {
  Hogan.Template = function (codeObj, text, compiler, options) {
    codeObj = codeObj || {};
    this.r = codeObj.code || this.r;
    this.c = compiler;
    this.options = options || {};
    this.text = text || '';
    this.partials = codeObj.partials || {};
    this.subs = codeObj.subs || {};
    this.buf = '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // ensurePartial
    ep: function(symbol, partials) {
      var partial = this.partials[symbol];

      // check to see that if we've instantiated this partial before
      var template = partials[partial.name];
      if (partial.instance && partial.base == template) {
        return partial.instance;
      }

      if (typeof template == 'string') {
        if (!this.c) {
          throw new Error("No compiler available.");
        }
        template = this.c.compile(template, this.options);
      }

      if (!template) {
        return null;
      }

      // We use this to check whether the partials dictionary has changed
      this.partials[symbol].base = template;

      if (partial.subs) {
        // Make sure we consider parent template now
        if (!partials.stackText) partials.stackText = {};
        for (key in partial.subs) {
          if (!partials.stackText[key]) {
            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
          }
        }
        template = createSpecializedPartial(template, partial.subs, partial.partials,
          this.stackSubs, this.stackPartials, partials.stackText);
      }
      this.partials[symbol].instance = template;

      return template;
    },

    // tries to find a partial in the current scope and render it
    rp: function(symbol, context, partials, indent) {
      var partial = this.ep(symbol, partials);
      if (!partial) {
        return '';
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ms(val, ctx, partials, inverted, start, end, tags);
      }

      pass = !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var found,
          names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          doModelGet = this.options.modelGet,
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        val = ctx[ctx.length - 1];
      } else {
        for (var i = 1; i < names.length; i++) {
          found = findInScope(names[i], val, doModelGet);
          if (found !== undefined) {
            cx = val;
            val = found;
          } else {
            val = '';
          }
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.mv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false,
          doModelGet = this.options.modelGet;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        val = findInScope(key, v, doModelGet);
        if (val !== undefined) {
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.mv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ls: function(func, cx, partials, text, tags) {
      var oldTags = this.options.delimiters;

      this.options.delimiters = tags;
      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
      this.options.delimiters = oldTags;

      return false;
    },

    // compile text
    ct: function(text, cx, partials) {
      if (this.options.disableLambda) {
        throw new Error('Lambda features disabled.');
      }
      return this.c.compile(text, this.options).render(cx, partials);
    },

    // template result buffering
    b: function(s) { this.buf += s; },

    fl: function() { var r = this.buf; this.buf = ''; return r; },

    // method replace section
    ms: function(func, ctx, partials, inverted, start, end, tags) {
      var textSource,
          cx = ctx[ctx.length - 1],
          result = func.call(cx);

      if (typeof result == 'function') {
        if (inverted) {
          return true;
        } else {
          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
        }
      }

      return result;
    },

    // method replace variable
    mv: function(func, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = func.call(cx);

      if (typeof result == 'function') {
        return this.ct(coerceToString(result.call(cx)), cx, partials);
      }

      return result;
    },

    sub: function(name, context, partials, indent) {
      var f = this.subs[name];
      if (f) {
        this.activeSub = name;
        f(context, partials, this, indent);
        this.activeSub = false;
      }
    }

  };

  //Find a key in an object
  function findInScope(key, scope, doModelGet) {
    var val;

    if (scope && typeof scope == 'object') {

      if (scope[key] !== undefined) {
        val = scope[key];

      // try lookup with get for backbone or similar model data
      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
        val = scope.get(key);
      }
    }

    return val;
  }

  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
    function PartialTemplate() {};
    PartialTemplate.prototype = instance;
    function Substitutions() {};
    Substitutions.prototype = instance.subs;
    var key;
    var partial = new PartialTemplate();
    partial.subs = new Substitutions();
    partial.subsText = {};  //hehe. substext.
    partial.buf = '';

    stackSubs = stackSubs || {};
    partial.stackSubs = stackSubs;
    partial.subsText = stackText;
    for (key in subs) {
      if (!stackSubs[key]) stackSubs[key] = subs[key];
    }
    for (key in stackSubs) {
      partial.subs[key] = stackSubs[key];
    }

    stackPartials = stackPartials || {};
    partial.stackPartials = stackPartials;
    for (key in partials) {
      if (!stackPartials[key]) stackPartials[key] = partials[key];
    }
    for (key in stackPartials) {
      partial.partials[key] = stackPartials[key];
    }

    return partial;
  }

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos = /\'/g,
      rQuot = /\"/g,
      hChars = /[&<>\"\']/;

  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp, '&amp;')
        .replace(rLt, '&lt;')
        .replace(rGt, '&gt;')
        .replace(rApos, '&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})(typeof exports !== 'undefined' ? exports : Hogan);

},{}],5:[function(require,module,exports){
/**
 * jQuery CSS Customizable Scrollbar
 *
 * Copyright 2014, Yuriy Khabarov
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * If you found bug, please contact me via email <13real008@gmail.com>
 *
 * @author Yuriy Khabarov aka Gromo
 * @version 0.2.6
 * @url https://github.com/gromo/jquery.scrollbar/
 *
 */
(function(e,t,n){"use strict";function h(t){if(o.webkit&&!t){return{height:0,width:0}}if(!o.data.outer){var n={border:"none","box-sizing":"content-box",height:"200px",margin:"0",padding:"0",width:"200px"};o.data.inner=e("<div>").css(e.extend({},n));o.data.outer=e("<div>").css(e.extend({left:"-1000px",overflow:"scroll",position:"absolute",top:"-1000px"},n)).append(o.data.inner).appendTo("body")}o.data.outer.scrollLeft(1e3).scrollTop(1e3);return{height:Math.ceil(o.data.outer.offset().top-o.data.inner.offset().top||0),width:Math.ceil(o.data.outer.offset().left-o.data.inner.offset().left||0)}}function p(n,r){e(t).on({"blur.scrollbar":function(){e(t).add("body").off(".scrollbar");n&&n()},"dragstart.scrollbar":function(e){e.preventDefault();return false},"mouseup.scrollbar":function(){e(t).add("body").off(".scrollbar");n&&n()}});e("body").on({"selectstart.scrollbar":function(e){e.preventDefault();return false}});r&&r.preventDefault();return false}function d(){var e=h(true);return!(e.height||e.width)}function v(e){var t=e.originalEvent;if(t.axis&&t.axis===t.HORIZONTAL_AXIS)return false;if(t.wheelDeltaX)return false;return true}var r=false;var i=1,s="px";var o={data:{},macosx:n.navigator.platform.toLowerCase().indexOf("mac")!==-1,mobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(n.navigator.userAgent),overlay:null,scroll:null,scrolls:[],webkit:/WebKit/.test(n.navigator.userAgent),log:r?function(t,r){var i=t;if(r&&typeof t!="string"){i=[];e.each(t,function(e,t){i.push('"'+e+'": '+t)});i=i.join(", ")}if(n.console&&n.console.log){n.console.log(i)}else{alert(i)}}:function(){}};var u={autoScrollSize:true,autoUpdate:true,debug:false,disableBodyScroll:false,duration:200,ignoreMobile:true,ignoreOverlay:true,scrollStep:30,showArrows:false,stepScrolling:true,type:"simple",scrollx:null,scrolly:null,onDestroy:null,onInit:null,onScroll:null,onUpdate:null};var a=function(t,r){if(!o.scroll){o.log("Init jQuery Scrollbar v0.2.6");o.overlay=d();o.scroll=h();c();e(n).resize(function(){var e=false;if(o.scroll&&(o.scroll.height||o.scroll.width)){var t=h();if(t.height!=o.scroll.height||t.width!=o.scroll.width){o.scroll=t;e=true}}c(e)})}this.container=t;this.options=e.extend({},u,n.jQueryScrollbarOptions||{});this.scrollTo=null;this.scrollx={};this.scrolly={};this.init(r)};a.prototype={destroy:function(){if(!this.wrapper){return}var n=this.container.scrollLeft();var r=this.container.scrollTop();this.container.insertBefore(this.wrapper).css({height:"",margin:""}).removeClass("scroll-content").removeClass("scroll-scrollx_visible").removeClass("scroll-scrolly_visible").off(".scrollbar").scrollLeft(n).scrollTop(r);this.scrollx.scrollbar.removeClass("scroll-scrollx_visible").find("div").andSelf().off(".scrollbar");this.scrolly.scrollbar.removeClass("scroll-scrolly_visible").find("div").andSelf().off(".scrollbar");this.wrapper.remove();e(t).add("body").off(".scrollbar");if(e.isFunction(this.options.onDestroy))this.options.onDestroy.apply(this,[this.container])},getScrollbar:function(t){var n=this.options["scroll"+t];var r={advanced:'<div class="scroll-element_corner"></div>'+'<div class="scroll-arrow scroll-arrow_less"></div>'+'<div class="scroll-arrow scroll-arrow_more"></div>'+'<div class="scroll-element_outer">'+'    <div class="scroll-element_size"></div>'+'    <div class="scroll-element_inner-wrapper">'+'        <div class="scroll-element_inner scroll-element_track">'+'            <div class="scroll-element_inner-bottom"></div>'+"        </div>"+"    </div>"+'    <div class="scroll-bar">'+'        <div class="scroll-bar_body">'+'            <div class="scroll-bar_body-inner"></div>'+"        </div>"+'        <div class="scroll-bar_bottom"></div>'+'        <div class="scroll-bar_center"></div>'+"    </div>"+"</div>",simple:'<div class="scroll-element_outer">'+'    <div class="scroll-element_size"></div>'+'    <div class="scroll-element_track"></div>'+'    <div class="scroll-bar"></div>'+"</div>"};var i=r[this.options.type]?this.options.type:"advanced";if(n){if(typeof n=="string"){n=e(n).appendTo(this.wrapper)}else{n=e(n)}}else{n=e("<div>").addClass("scroll-element").html(r[i]).appendTo(this.wrapper)}if(this.options.showArrows){n.addClass("scroll-element_arrows_visible")}return n.addClass("scroll-"+t)},init:function(n){var r=this;var u=this.container;var a=this.containerWrapper||u;var f=e.extend(this.options,n||{});var l={x:this.scrollx,y:this.scrolly};var c=this.wrapper;var h={scrollLeft:u.scrollLeft(),scrollTop:u.scrollTop()};if(o.mobile&&f.ignoreMobile||o.overlay&&f.ignoreOverlay||o.macosx&&!o.webkit){return false}if(!c){this.wrapper=c=e("<div>").addClass("scroll-wrapper").addClass(u.attr("class")).css("position",u.css("position")=="absolute"?"absolute":"relative").insertBefore(u).append(u);if(u.is("textarea")){this.containerWrapper=a=e("<div>").insertBefore(u).append(u);c.addClass("scroll-textarea")}a.addClass("scroll-content").css({height:"","margin-bottom":o.scroll.height*-1+s,"margin-right":o.scroll.width*-1+s});u.on("scroll.scrollbar",function(t){if(e.isFunction(f.onScroll)){f.onScroll.call(r,{maxScroll:l.y.maxScrollOffset,scroll:u.scrollTop(),size:l.y.size,visible:l.y.visible},{maxScroll:l.x.maxScrollOffset,scroll:u.scrollLeft(),size:l.x.size,visible:l.x.visible})}l.x.isVisible&&l.x.scroller.css("left",u.scrollLeft()*l.x.kx+s);l.y.isVisible&&l.y.scroller.css("top",u.scrollTop()*l.y.kx+s)});c.on("scroll",function(){c.scrollTop(0).scrollLeft(0)});if(f.disableBodyScroll){var d=function(e){v(e)?l.y.isVisible&&l.y.mousewheel(e):l.x.isVisible&&l.x.mousewheel(e)};c.on({"MozMousePixelScroll.scrollbar":d,"mousewheel.scrollbar":d});if(o.mobile){c.on("touchstart.scrollbar",function(n){var r=n.originalEvent.touches&&n.originalEvent.touches[0]||n;var i={pageX:r.pageX,pageY:r.pageY};var s={left:u.scrollLeft(),top:u.scrollTop()};e(t).on({"touchmove.scrollbar":function(e){var t=e.originalEvent.targetTouches&&e.originalEvent.targetTouches[0]||e;u.scrollLeft(s.left+i.pageX-t.pageX);u.scrollTop(s.top+i.pageY-t.pageY);e.preventDefault()},"touchend.scrollbar":function(){e(t).off(".scrollbar")}})})}}if(e.isFunction(f.onInit))f.onInit.apply(this,[u])}else{a.css({height:"","margin-bottom":o.scroll.height*-1+s,"margin-right":o.scroll.width*-1+s})}e.each(l,function(n,s){var o=null;var a=1;var c=n=="x"?"scrollLeft":"scrollTop";var h=f.scrollStep;var d=function(){var e=u[c]();u[c](e+h);if(a==1&&e+h>=m)e=u[c]();if(a==-1&&e+h<=m)e=u[c]();if(u[c]()==e&&o){o()}};var m=0;if(!s.scrollbar){s.scrollbar=r.getScrollbar(n);s.scroller=s.scrollbar.find(".scroll-bar");s.mousewheel=function(e){if(!s.isVisible||n=="x"&&v(e)){return true}if(n=="y"&&!v(e)){l.x.mousewheel(e);return true}var t=e.originalEvent.wheelDelta*-1||e.originalEvent.detail;var i=s.size-s.visible-s.offset;if(!(m<=0&&t<0||m>=i&&t>0)){m=m+t;if(m<0)m=0;if(m>i)m=i;r.scrollTo=r.scrollTo||{};r.scrollTo[c]=m;setTimeout(function(){if(r.scrollTo){u.stop().animate(r.scrollTo,240,"linear",function(){m=u[c]()});r.scrollTo=null}},1)}e.preventDefault();return false};s.scrollbar.on({"MozMousePixelScroll.scrollbar":s.mousewheel,"mousewheel.scrollbar":s.mousewheel,"mouseenter.scrollbar":function(){m=u[c]()}});s.scrollbar.find(".scroll-arrow, .scroll-element_track").on("mousedown.scrollbar",function(t){if(t.which!=i)return true;a=1;var l={eventOffset:t[n=="x"?"pageX":"pageY"],maxScrollValue:s.size-s.visible-s.offset,scrollbarOffset:s.scroller.offset()[n=="x"?"left":"top"],scrollbarSize:s.scroller[n=="x"?"outerWidth":"outerHeight"]()};var v=0,g=0;if(e(this).hasClass("scroll-arrow")){a=e(this).hasClass("scroll-arrow_more")?1:-1;h=f.scrollStep*a;m=a>0?l.maxScrollValue:0}else{a=l.eventOffset>l.scrollbarOffset+l.scrollbarSize?1:l.eventOffset<l.scrollbarOffset?-1:0;h=Math.round(s.visible*.75)*a;m=l.eventOffset-l.scrollbarOffset-(f.stepScrolling?a==1?l.scrollbarSize:0:Math.round(l.scrollbarSize/2));m=u[c]()+m/s.kx}r.scrollTo=r.scrollTo||{};r.scrollTo[c]=f.stepScrolling?u[c]()+h:m;if(f.stepScrolling){o=function(){m=u[c]();clearInterval(g);clearTimeout(v);v=0;g=0};v=setTimeout(function(){g=setInterval(d,40)},f.duration+100)}setTimeout(function(){if(r.scrollTo){u.animate(r.scrollTo,f.duration);r.scrollTo=null}},1);return p(o,t)});s.scroller.on("mousedown.scrollbar",function(r){if(r.which!=i)return true;var o=r[n=="x"?"pageX":"pageY"];var a=u[c]();s.scrollbar.addClass("scroll-draggable");e(t).on("mousemove.scrollbar",function(e){var t=parseInt((e[n=="x"?"pageX":"pageY"]-o)/s.kx,10);u[c](a+t)});return p(function(){s.scrollbar.removeClass("scroll-draggable");m=u[c]()},r)})}});e.each(l,function(e,t){var n="scroll-scroll"+e+"_visible";var r=e=="x"?l.y:l.x;t.scrollbar.removeClass(n);r.scrollbar.removeClass(n);a.removeClass(n)});e.each(l,function(t,n){e.extend(n,t=="x"?{offset:parseInt(u.css("left"),10)||0,size:u.prop("scrollWidth"),visible:c.width()}:{offset:parseInt(u.css("top"),10)||0,size:u.prop("scrollHeight"),visible:c.height()})});var m=function(t,n){var r="scroll-scroll"+t+"_visible";var i=t=="x"?l.y:l.x;var f=parseInt(u.css(t=="x"?"left":"top"),10)||0;var h=n.size;var p=n.visible+f;n.isVisible=h-p>1;if(n.isVisible){n.scrollbar.addClass(r);i.scrollbar.addClass(r);a.addClass(r)}else{n.scrollbar.removeClass(r);i.scrollbar.removeClass(r);a.removeClass(r)}if(t=="y"&&(n.isVisible||n.size<n.visible)){a.css("height",p+o.scroll.height+s)}if(l.x.size!=u.prop("scrollWidth")||l.y.size!=u.prop("scrollHeight")||l.x.visible!=c.width()||l.y.visible!=c.height()||l.x.offset!=(parseInt(u.css("left"),10)||0)||l.y.offset!=(parseInt(u.css("top"),10)||0)){e.each(l,function(t,n){e.extend(n,t=="x"?{offset:parseInt(u.css("left"),10)||0,size:u.prop("scrollWidth"),visible:c.width()}:{offset:parseInt(u.css("top"),10)||0,size:u.prop("scrollHeight"),visible:c.height()})});m(t=="x"?"y":"x",i)}};e.each(l,m);if(e.isFunction(f.onUpdate))f.onUpdate.apply(this,[u]);e.each(l,function(e,t){var n=e=="x"?"left":"top";var r=e=="x"?"outerWidth":"outerHeight";var i=e=="x"?"width":"height";var o=parseInt(u.css(n),10)||0;var a=t.size;var l=t.visible+o;var c=t.scrollbar.find(".scroll-element_size");c=c[r]()+(parseInt(c.css(n),10)||0);if(f.autoScrollSize){t.scrollbarSize=parseInt(c*l/a,10);t.scroller.css(i,t.scrollbarSize+s)}t.scrollbarSize=t.scroller[r]();t.kx=(c-t.scrollbarSize)/(a-l)||1;t.maxScrollOffset=a-l});u.scrollLeft(h.scrollLeft).scrollTop(h.scrollTop).trigger("scroll")}};e.fn.scrollbar=function(t,n){var r=this;if(t==="get")r=null;this.each(function(){var i=e(this);if(i.hasClass("scroll-wrapper")||i.get(0).nodeName=="body"){return true}var s=i.data("scrollbar");if(s){if(t==="get"){r=s;return false}var u=typeof t=="string"&&s[t]?t:"init";s[u].apply(s,e.isArray(n)?n:[]);if(t==="destroy"){i.removeData("scrollbar");while(e.inArray(s,o.scrolls)>=0)o.scrolls.splice(e.inArray(s,o.scrolls),1)}}else{if(typeof t!="string"){s=new a(i,t);i.data("scrollbar",s);o.scrolls.push(s)}}return true});return r};e.fn.scrollbar.options=u;if(n.angular){(function(e){var t=e.module("jQueryScrollbar",[]);t.directive("jqueryScrollbar",function(){return{link:function(e,t){t.scrollbar(e.options).on("$destroy",function(){t.scrollbar("destroy")})},restring:"AC",scope:{options:"=jqueryScrollbar"}}})})(n.angular)}var f=0,l=0;var c=function(e){var t,n,i,s,u,a,h;for(t=0;t<o.scrolls.length;t++){s=o.scrolls[t];n=s.container;i=s.options;u=s.wrapper;a=s.scrollx;h=s.scrolly;if(e||i.autoUpdate&&u&&u.is(":visible")&&(n.prop("scrollWidth")!=a.size||n.prop("scrollHeight")!=h.size||u.width()!=a.visible||u.height()!=h.visible)){s.init();if(r){o.log({scrollHeight:n.prop("scrollHeight")+":"+s.scrolly.size,scrollWidth:n.prop("scrollWidth")+":"+s.scrollx.size,visibleHeight:u.height()+":"+s.scrolly.visible,visibleWidth:u.width()+":"+s.scrollx.visible},true);l++}}}if(r&&l>10){o.log("Scroll updates exceed 10");c=function(){}}else{clearTimeout(f);f=setTimeout(c,300)}}})(jQuery,document,window);
},{}],6:[function(require,module,exports){
// Storage cache.
var cache = {};
// The store handling expiration of data.
var expiresStore = new Store({
	namespace: '__storage-wrapper:expires'
});

/**
 * Storage wrapper for making routine storage calls super easy.
 * @class Store
 * @constructor
 * @param {object} [options]                     The options for the store. Options not overridden will use the defaults.
 * @param {mixed}  [options.namespace='']        See {{#crossLink "Store/setNamespace"}}Store#setNamespace{{/crossLink}}
 * @param {mixed}  [options.storageType='local'] See {{#crossLink "Store/setStorageType"}}Store#setStorageType{{/crossLink}}
 */
function Store(options) {
	var settings = {
		namespace: '',
		storageType: 'local'
	};

	/**
	 * Sets the storage namespace.
	 * @method setNamespace
	 * @param {string|false|null} namespace The namespace to work under. To use no namespace (e.g. global namespace), pass in `false` or `null` or an empty string.
	 */
	this.setNamespace = function (namespace) {
		var validNamespace = /^[\w-:]+$/;
		// No namespace.
		if (namespace === false || namespace == null || namespace === '') {
			settings.namespace = '';
			return;
		}
		if (typeof namespace !== 'string' || !validNamespace.test(namespace)) {
			throw new Error('Invalid namespace.');
		}
		settings.namespace = namespace;
	};

	/**
	 * Gets the current storage namespace.
	 * @method getNamespace
	 * @return {string} The current namespace.
	 */
	this.getNamespace = function (includeSeparator) {
		if (includeSeparator && settings.namespace !== '') {
			return settings.namespace + ':';
		}
		return settings.namespace;
	}

	/**
	 * Sets the type of storage to use.
	 * @method setStorageType
	 * @param {string} type The type of storage to use. Use `session` for `sessionStorage` and `local` for `localStorage`.
	 */
	this.setStorageType = function (type) {
		if (['session', 'local'].indexOf(type) < 0) {
			throw new Error('Invalid storage type.');
		}
		settings.storageType = type;
	};
	/**
	 * Get the type of storage being used.
	 * @method getStorageType
	 * @return {string} The type of storage being used.
	 */
	this.getStorageType = function () {
		return settings.storageType;
	};

	// Override default settings.
	if (options) {
		for (var key in options) {
			switch (key) {
				case 'namespace':
					this.setNamespace(options[key]);
					break;
				case 'storageType':
					this.setStorageType(options[key]);
					break;
			}
		}
	}
}

/**
 * Gets the actual handler to use
 * @method getStorageHandler
 * @return {mixed} The storage handler.
 */
Store.prototype.getStorageHandler = function () {
	var handlers = {
		'local': localStorage,
		'session': sessionStorage
	};
	return handlers[this.getStorageType()];
}

/**
 * Gets the full storage name for a key, including the namespace, if any.
 * @method getStorageKey
 * @param  {string} key The storage key name.
 * @return {string}     The full storage name that is used by the storage methods.
 */
Store.prototype.getStorageKey = function (key) {
	if (!key || typeof key !== 'string' || key.length < 1) {
		throw new Error('Key must be a string.');
	}
	return this.getNamespace(true) + key;
};

/**
 * Gets a storage item from the current namespace.
 * @method get
 * @param  {string} key          The key that the data can be accessed under.
 * @param  {mixed}  defaultValue The default value to return in case the storage value is not set or `null`.
 * @return {mixed}               The data for the storage.
 */
Store.prototype.get = function (key, defaultValue) {
	// Prevent recursion. Only check expire date if it isn't called from `expiresStore`.
	if (this !== expiresStore) {
		// Check if key is expired.
		var expireDate = expiresStore.get(this.getStorageKey(key));
		if (expireDate !== null && expireDate.getTime() < Date.now()) {
			// Expired, remove it.
			this.remove(key);
			expiresStore.remove(this.getStorageKey(key));
		}
	}

	// Cached, read from memory.
	if (cache[this.getStorageKey(key)] != null) {
		return cache[this.getStorageKey(key)];
	}

	var val = this.getStorageHandler().getItem(this.getStorageKey(key));

	// Value doesn't exist and we have a default, return default.
	if (val === null && typeof defaultValue !== 'undefined') {
		return defaultValue;
	}

	// Only pre-process strings.
	if (typeof val === 'string') {
		// Handle RegExps.
		if (val.indexOf('~RegExp:') === 0) {
			var matches = /^~RegExp:([gim]*?):(.*)/.exec(val);
			val = new RegExp(matches[2], matches[1]);
		}
		// Handle Dates.
		else if (val.indexOf('~Date:') === 0) {
			val = new Date(val.replace(/^~Date:/, ''));
		}
		// Handle numbers.
		else if (val.indexOf('~Number:') === 0) {
			val = parseInt(val.replace(/^~Number:/, ''), 10);
		}
		// Handle booleans.
		else if (val.indexOf('~Boolean:') === 0) {
			val = val.replace(/^~Boolean:/, '') === 'true';
		}
		// Handle objects.
		else if (val.indexOf('~JSON:') === 0) {
			val = val.replace(/^~JSON:/, '');
			// Try parsing it.
			try {
				val = JSON.parse(val);
			}
			// Parsing went wrong (invalid JSON), return default or null.
			catch (e) {
				if (typeof defaultValue !== 'undefined') {
					return defaultValue;
				}
				return null;
			}
		}
	}

	// Return it.
	cache[this.getStorageKey(key)] = val;
	return val;
};

/**
 * Sets a storage item on the current namespace.
 * @method set
 * @param {string}      key       The key that the data can be accessed under.
 * @param {mixed}       val       The value to store. May be the following types of data: `RegExp`, `Date`, `Object`, `String`, `Boolean`, `Number`
 * @param {Date|number} [expires] The date in the future to expire, or relative number of milliseconds from `Date#now` to expire.
 *
 * Note: This converts special data types that normally can't be stored in the following way:
 * 
 * - `RegExp`: prefixed with type, flags stored, and source stored as string.
 * - `Date`: prefixed with type, stored as string using `Date#toString`.
 * - `Object`: prefixed with "JSON" indicator, stored as string using `JSON#stringify`.
 */
Store.prototype.set = function (key, val, expires) {
	var parsedVal = null;
	// Handle RegExps.
	if (val instanceof RegExp) {
		var flags = [
			val.global ? 'g' : '',
			val.ignoreCase ? 'i' : '',
			val.multiline ? 'm' : '',
		].join('');
		parsedVal = '~RegExp:' + flags + ':' + val.source;
	}
	// Handle Dates.
	else if (val instanceof Date) {
		parsedVal = '~Date:' + val.toString();
	}
	// Handle objects.
	else if (val === Object(val)) {
		parsedVal = '~JSON:' + JSON.stringify(val);
	}
	// Handle numbers.
	else if (typeof val === 'number') {
		parsedVal = '~Number:' + val.toString();
	}
	// Handle booleans.
	else if (typeof val === 'boolean') {
		parsedVal = '~Boolean:' + val.toString();
	}
	// Handle strings.
	else if (typeof val === 'string') {
		parsedVal = val;
	}
	// Throw if we don't know what it is.
	else {
		throw new Error('Unable to store this value; wrong value type.');
	}
	// Set expire date if needed.
	if (typeof expires !== 'undefined') {
		// Convert to a relative date.
		if (typeof expires === 'number') {
			expires = new Date(Date.now() + expires);
		}
		// Make sure it is a date.
		if (expires instanceof Date) {
			expiresStore.set(this.getStorageKey(key), expires);
		}
		else {
			throw new Error('Key expire must be a valid date or timestamp.');
		}
	}
	// Save it.
	cache[this.getStorageKey(key)] = val;
	this.getStorageHandler().setItem(this.getStorageKey(key), parsedVal);
};

/**
 * Gets all data for the current namespace.
 * @method getAll
 * @return {object} An object containing all data in the form of `{theKey: theData}` where `theData` is parsed using {{#crossLink "Store/get"}}Store#get{{/crossLink}}.
 */
Store.prototype.getAll = function () {
	var keys = this.listKeys();
	var data = {};
	keys.forEach(function (key) {
		data[key] = this.get(key);
	}, this);
	return data;
};

/**
 * List all keys that are tied to the current namespace.
 * @method listKeys
 * @return {array} The storage keys.
 */
Store.prototype.listKeys = function () {
	var keys = [];
	var key = null;
	var storageLength = this.getStorageHandler().length;
	var prefix = new RegExp('^' + this.getNamespace(true));
	for (var i = 0; i < storageLength; i++) {
		key = this.getStorageHandler().key(i)
		if (prefix.test(key)) {
			keys.push(key.replace(prefix, ''));
		}
	}
	return keys;
};

/**
 * Removes a specific key and data from the current namespace.
 * @method remove
 * @param {string} key The key to remove the data for.
 */
Store.prototype.remove = function (key) {
	cache[this.getStorageKey(key)] = null;
	this.getStorageHandler().removeItem(this.getStorageKey(key));
};

/**
 * Removes all data and keys from the current namespace.
 * @method removeAll
 */
Store.prototype.removeAll = function () {
	this.listKeys().forEach(this.remove, this);
};

/**
 * Removes namespaced items from the cache so your next {{#crossLink "Store/get"}}Store#get{{/crossLink}} will be fresh from the storage.
 * @method freshen
 * @param {string} key The key to remove the cache data for.
 */
Store.prototype.freshen = function (key) {
	var keys = key ? [key] : this.listKeys();
	keys.forEach(function (key) {
		cache[this.getStorageKey(key)] = null;
	}, this);
};

/**
 * Migrate data from a different namespace to current namespace.
 * @method migrate
 * @param {object}   migration                          The migration object.
 * @param {string}   migration.toKey                    The key name under your current namespace the old data should change to.
 * @param {string}   migration.fromNamespace            The old namespace that the old key belongs to.
 * @param {string}   migration.fromKey                  The old key name to migrate from.
 * @param {string}   [migration.fromStorageType]        The storage type to migrate from. Defaults to same type as where you are migrating to.
 * @param {boolean}  [migration.keepOldData=false]      Whether old data should be kept after it has been migrated.
 * @param {boolean}  [migration.overwriteNewData=false] Whether old data should overwrite currently stored data if it exists.
 * @param {function} [migration.transform]              The function to pass the old key data through before migrating.
 * @example
 * 
 *     var Store = require('storage-wrapper');
 *     var store = new Store({
 *         namespace: 'myNewApp'
 *     });
 *
 *     // Migrate from the old app.
 *     store.migrate({
 *         toKey: 'new-key',
 *         fromNamespace: 'myOldApp',
 *         fromKey: 'old-key'
 *     });
 *     
 *     // Migrate from global data. Useful when moving from other storage wrappers or regular ol' `localStorage`.
 *     store.migrate({
 *         toKey: 'other-new-key',
 *         fromNamespace: '',
 *         fromKey: 'other-old-key-on-global'
 *     });
 *     
 *     // Migrate some JSON data that was stored as a string.
 *     store.migrate({
 *         toKey: 'new-json-key',
 *         fromNamespace: 'myOldApp',
 *         fromKey: 'old-json-key',
 *         // Try converting some old JSON data.
 *         transform: function (data) {
 *             try {
 *                 return JSON.parse(data);
 *             }
 *             catch (e) {
 *                 return data;
 *             }
 *         }
 *     });
 */

Store.prototype.migrate = function (migration) {
	// Save our current namespace.
	var toNamespace = this.getNamespace();
	var toStorageType = this.getStorageType();

	// Create a temporary store to avoid changing namespace during actual get/sets.
	var store = new Store({
		namespace: toNamespace,
		storageType: toStorageType
	});

	var data = null;

	// Get data from old namespace.
	store.setNamespace(migration.fromNamespace);
	if (typeof migration.fromStorageType !== 'undefined') {
		store.setStorageType(migration.fromStorageType);
	}
	data = store.get(migration.fromKey);

	// Remove old if needed.
	if (!migration.keepOldData) {
		store.remove(migration.fromKey);
	}
	
	// No data, ignore this migration.
	if (data === null) {
		return;
	}

	// Transform data if needed.
	if (typeof migration.transform === 'function') {
		data = migration.transform(data);
	}
	else if (typeof migration.transform !== 'undefined') {
		throw new Error('Invalid transform callback.');
	}

	// Go back to current namespace.
	store.setNamespace(toNamespace);
	store.setStorageType(toStorageType);

	// Only overwrite new data if it doesn't exist or it's requested.
	if (store.get(migration.toKey) === null || migration.overwriteNewData) {
		store.set(migration.toKey, data);
	}
};

/**
 * Creates a substore that is nested in the current namespace.
 * @method createSubstore
 * @param  {string} namespace The substore's namespace.
 * @return {Store}            The substore.
 * @example
 * 
 *     var Store = require('storage-wrapper');
 *     // Create main store.
 *     var store = new Store({
 *         namespace: 'myapp'
 *     });
 *
 *     // Create substore.
 *     var substore = store.createSubstore('things');
 *     substore.set('foo', 'bar');
 *
 *     substore.get('foo') === store.get('things:foo');
 *     // true
 */
Store.prototype.createSubstore = function (namespace) {
	return new Store({
		namespace: this.getNamespace(true) + namespace,
		storageType: this.getStorageType()
	});
};

module.exports = Store;

},{}],7:[function(require,module,exports){
module.exports={
  "name": "twitch-chat-emotes",
  "version": "2.1.6",
  "homepage": "http://cletusc.github.io/Userscript--Twitch-Chat-Emotes/",
  "bugs": "https://github.com/cletusc/Userscript--Twitch-Chat-Emotes/issues",
  "author": "Ryan Chatham <ryan.b.chatham@gmail.com> (https://github.com/cletusc)",
  "repository": {
    "type": "git",
    "url": "https://github.com/cletusc/Userscript--Twitch-Chat-Emotes.git"
  },
  "userscript": {
    "name": "Twitch Chat Emotes",
    "namespace": "#Cletus",
    "version": "{{{pkg.version}}}",
    "description": "Adds a button to Twitch that allows you to \"click-to-insert\" an emote.",
    "copyright": "2011+, {{{pkg.author}}}",
    "author": "{{{pkg.author}}}",
    "icon": "http://www.gravatar.com/avatar.php?gravatar_id=6875e83aa6c563790cb2da914aaba8b3&r=PG&s=48&default=identicon",
    "license": [
      "MIT; http://opensource.org/licenses/MIT",
      "CC BY-NC-SA 3.0; http://creativecommons.org/licenses/by-nc-sa/3.0/"
    ],
    "homepage": "{{{pkg.homepage}}}",
    "supportURL": "{{{pkg.bugs}}}",
    "contributionURL": "http://cletusc.github.io/Userscript--Twitch-Chat-Emotes/#donate",
    "grant": "none",
    "include": [
      "http://*.twitch.tv/*",
      "https://*.twitch.tv/*"
    ],
    "exclude": [
      "http://api.twitch.tv/*",
      "https://api.twitch.tv/*",
      "http://tmi.twitch.tv/*",
      "https://tmi.twitch.tv/*",
      "http://*.twitch.tv/*/dashboard",
      "https://*.twitch.tv/*/dashboard",
      "http://chatdepot.twitch.tv/*",
      "https://chatdepot.twitch.tv/*",
      "http://im.twitch.tv/*",
      "https://im.twitch.tv/*",
      "http://platform.twitter.com/*",
      "https://platform.twitter.com/*",
      "http://www.facebook.com/*",
      "https://www.facebook.com/*"
    ]
  },
  "devDependencies": {
    "browser-sync": "^1.3.2",
    "browserify": "^5.9.1",
    "generate-userscript-header": "^1.0.0",
    "gulp": "^3.8.3",
    "gulp-autoprefixer": "0.0.8",
    "gulp-beautify": "1.1.0",
    "gulp-changed": "^0.4.1",
    "gulp-concat": "^2.2.0",
    "gulp-conflict": "^0.1.2",
    "gulp-css-base64": "^1.1.0",
    "gulp-css2js": "^1.0.2",
    "gulp-header": "^1.0.2",
    "gulp-hogan-compile": "^0.2.1",
    "gulp-minify-css": "^0.3.5",
    "gulp-notify": "^1.4.1",
    "gulp-rename": "^1.2.0",
    "gulp-uglify": "^0.3.1",
    "gulp-util": "^3.0.0",
    "hogan.js": "^3.0.2",
    "jquery-ui": "^1.10.5",
    "jquery.scrollbar": "^0.2.7",
    "pretty-hrtime": "^0.2.1",
    "storage-wrapper": "cletusc/storage-wrapper#v0.1.1",
    "vinyl-map": "^1.0.1",
    "vinyl-source-stream": "^0.1.1",
    "watchify": "^1.0.1"
  }
}

},{}],8:[function(require,module,exports){
var logger = require('./logger');
var api = {};
var ember = null;
var hookedFactories = {};

api.getEmber = function () {
	if (ember) {
		return ember;
	}
	if (window.App && window.App.__container__) {
		ember = window.App.__container__;
		return ember;
	}
	return false;
};

api.isLoaded = function () {
	return Boolean(api.getEmber());
};

api.lookup = function (lookupFactory) {
	if (!api.isLoaded()) {
		logger.debug('Factory lookup failure, Ember not loaded.');
		return false;
	}
	return api.getEmber().lookup(lookupFactory);
};

api.hook = function (lookupFactory, activateCb, deactivateCb) {
	if (!api.isLoaded()) {
		logger.debug('Factory hook failure, Ember not loaded.');
		return false;
	}
	if (hookedFactories[lookupFactory]) {
		logger.debug('Factory already hooked: ' + lookupFactory);
		return true;
	}
	var reopenOptions = {};
	var factory = api.lookup(lookupFactory);

	if (!factory) {
		logger.debug('Factory hook failure, factory not found: ' + lookupFactory);
		return false;
	}

	if (activateCb) {
		reopenOptions.activate = function () {
			this._super();
			activateCb.call(this);
			logger.debug('Hook run on activate: ' + lookupFactory);
		};
	}
	if (deactivateCb) {
		reopenOptions.deactivate = function () {
			this._super();
			deactivateCb.call(this);
			logger.debug('Hook run on deactivate: ' + lookupFactory);
		};
	}

	try {
		factory.reopen(reopenOptions);
		hookedFactories[lookupFactory] = true;
		logger.debug('Factory hooked: ' + lookupFactory);
		return true;
	}
	catch (err) {
		logger.debug('Factory hook failure, unexpected error: ' + lookupFactory);
		logger.debug(err);
		return false;
	}
};

api.get = function (lookupFactory, property) {
	if (!api.isLoaded()) {
		logger.debug('Factory get failure, Ember not loaded.');
		return false;
	}
	var properties = property.split('.');
	var getter = api.lookup(lookupFactory);

	properties.some(function (property) {
		// If getter fails, just exit, otherwise, keep looping.
		if (getter == null || typeof getter === 'undefined') {
			getter = null;
			return true;
		}
		if (getter[property] == null || typeof getter[property] === 'undefined') {
			getter = null;
			return true;
		}
		if (typeof getter.get === 'function') {
			getter = getter.get(property);
			if (getter == null || typeof getter === 'undefined') {
				getter = null;
				return true;
			}
			return false;
		}
		getter = getter[property];
	});

	return getter;
};

module.exports = api;

},{"./logger":10}],9:[function(require,module,exports){
var storage = require('./storage');
var logger = require('./logger');
var ui = require('./ui');
var api = {};
var emoteStore = new EmoteStore();
var $ = window.jQuery;

/**
 * The entire emote storing system.
 */
function EmoteStore() {
	var getters = {};
	var nativeEmotes = {};
	var hasInitialized = false;

	/**
	 * Get a list of usable emoticons.
	 * @param  {function} [filters]       A filter method to limit what emotes are returned. Passed to Array#filter.
	 * @param  {function|string} [sortBy] How the emotes should be sorted. `function` will be passed to sort via Array#sort. `'channel'` sorts by channel name, globals first. All other values (or omitted) sort alphanumerically.
	 * @param  {string} [returnType]      `'object'` will return in object format, e.g. `{'Kappa': Emote(...), ...}`. All other values (or omitted) return an array format, e.g. `[Emote(...), ...]`.
	 * @return {object|array}             See `returnType` param.
	 */
	this.getEmotes = function (filters, sortBy, returnType) {
		var twitchApi = require('./twitch-api');

		// Get native emotes.
		var emotes = $.extend({}, nativeEmotes);

		// Parse the custom emotes provided by third party addons.
		Object.keys(getters).forEach(function (getterName) {
			// Try the getter.
			var results = null;
			try {
				results = getters[getterName]();
			}
			catch (err) {
				logger.debug('Emote getter `' + getterName + '` failed unexpectedly, skipping.', err.toString());
				return;
			}
			if (!Array.isArray(results)) {
				logger.debug('Emote getter `' + getterName + '` must return an array, skipping.');
				return;
			}

			// Override natives and previous getters.
			results.forEach(function (emote) {
				try {
					// Create the emote.
					var instance = new Emote(emote);

					// Force the getter.
					instance.setGetterName(getterName);

					// Force emotes without channels to the getter's name.
					if (!emote.channel) {
						instance.setChannelName(getterName);
					}

					// Add/override it.
					emotes[instance.getText()] = instance;
				}
				catch (err) {
					logger.debug('Emote parsing for getter `' + getterName + '` failed, skipping.', err.toString(), emote);
				}
			});
		});

		// Covert to array.
		emotes = Object.keys(emotes).map(function (emote) {
			return emotes[emote];
		});

		// Filter results.
		if (typeof filters === 'function') {
			emotes = emotes.filter(filters);
		}
		
		// Return as an object if requested.
		if (returnType === 'object') {
			var asObject = {};
			emotes.forEach(function (emote) {
				asObject[emote.getText()] = emote;
			});
			return asObject;
		}

		// Sort results.
		if (typeof sortBy === 'function') {
			emotes.sort(sortBy);
		}
		else if (sortBy === 'channel') {
			emotes.sort(sorting.allEmotesCategory);
		}
		else {
			emotes.sort(sorting.byText);
		}

		// Return the emotes in array format.
		return emotes;
	};

	/**
	 * Registers a 3rd party emote hook.
	 * @param  {string} name   The name of the 3rd party registering the hook.
	 * @param  {function} getter The function called when looking for emotes. Must return an array of emote objects, e.g. `[emote, ...]`. See Emote class.
	 */
	this.registerGetter = function (name, getter) {
		if (typeof name !== 'string') {
			throw new Error('Name must be a string.');
		}
		if (getters[name]) {
			throw new Error('Getter already exists.');
		}
		if (typeof getter !== 'function') {
			throw new Error('Getter must be a function.');
		}
		logger.debug('Getter registered: ' + name);
		getters[name] = getter;
		ui.updateEmotes();
	};

	/**
	 * Registers a 3rd party emote hook.
	 * @param  {string} name   The name of the 3rd party hook to deregister.
	 */
	this.deregisterGetter = function (name) {
		logger.debug('Getter unregistered: ' + name);
		delete getters[name];
		ui.updateEmotes();
	};

	/**
	 * Initializes the raw data from the API endpoints. Should be called at load and/or whenever the API may have changed. Populates internal objects with updated data.
	 */
	this.init = function () {
		if (hasInitialized) {
			logger.debug('Already initialized EmoteStore, stopping init.');
			return;
		}

		logger.debug('Starting initialization.');

		var twitchApi = require('./twitch-api');
		var self = this;

		// Hash of emote set to forced channel.
		var forcedSetsToChannels = {
			// Globals.
			0: '~global',
			// Bubble emotes.
			33: 'turbo',
			// Monkey emotes.
			42: 'turbo',
			// Hidden turbo emotes.
			457: 'turbo',
			793: 'turbo',
			19151: 'twitch_prime',
			19194: 'twitch_prime'

		};

		logger.debug('Initializing emote set change listener.');

		twitchApi.getEmotes(function (emoteSets) {
			logger.debug('Parsing emote sets.');

			Object.keys(emoteSets).forEach(function (set) {
				var emotes = emoteSets[set];
				set = Number(set);
				emotes.forEach(function (emote) {
					// Set some required info.
					emote.url = '//static-cdn.jtvnw.net/emoticons/v1/' + emote.id + '/1.0';
					emote.text = getEmoteFromRegEx(emote.code);
					emote.set = set;

					// Hardcode the channels of certain sets.
					if (forcedSetsToChannels[set]) {
						emote.channel = forcedSetsToChannels[set];
					}

					var instance = new Emote(emote);

					// Save the emote for use later.
					nativeEmotes[emote.text] = instance;
				});
			});

			logger.debug('Loading subscription data.');

			// Get active subscriptions to find the channels.
			twitchApi.getTickets(function (tickets) {
				// Instances from each channel to preload channel data.
				var deferredChannelGets = {};

				logger.debug('Tickets loaded from the API.', tickets);
				tickets.forEach(function (ticket) {
					var product = ticket.product;
					var channel = product.owner_name || product.short_name;

					// Get subscriptions with emotes only.
					if (!product.emoticons || !product.emoticons.length) {
						return;
					}
					
					// Set the channel on the emotes.
					product.emoticons.forEach(function (emote) {
						var instance = nativeEmotes[getEmoteFromRegEx(emote.regex)];
						instance.setChannelName(channel);

						// Save instance for later, but only one instance per channel.
						if (!deferredChannelGets[channel]) {
							deferredChannelGets[channel] = instance;
						}
					});
				});

				// Preload channel data.
				Object.keys(deferredChannelGets).forEach(function (key) {
					var instance = deferredChannelGets[key];
					instance.getChannelBadge();
					instance.getChannelDisplayName();
				});
				ui.updateEmotes();
			});
			ui.updateEmotes();
		});

		hasInitialized = true;
		logger.debug('Finished EmoteStore initialization.');
	};
};

/**
 * Gets a specific emote, if available.
 * @param  {string}     text The text of the emote to get.
 * @return {Emote|null}      The Emote instance of the emote or `null` if it couldn't be found.
 */
EmoteStore.prototype.getEmote = function (text) {
	return this.getEmotes(null, null, 'object')[text] || null;
};

/**
 * Emote object.
 * @param {object} details              Object describing the emote.
 * @param {string} details.text         The text to use in the chat box when emote is clicked.
 * @param {string} details.url          The URL of the image for the emote.
 * @param {string} [details.badge]      The URL of the badge for the emote.
 * @param {string} [details.channel]    The channel the emote should be categorized under.
 * @param {string} [details.getterName] The 3rd party getter that registered the emote. Used internally only.
 */
function Emote(details) {
	var text = null;
	var url = null;
	var getterName = null;
	var channel = {
		name: null,
		displayName: null,
		badge: null
	};

	/**
	 * Gets the text of the emote.
	 * @return {string} The emote text.
	 */
	this.getText = function () {
		return text;
	};

	/**
	 * Sets the text of the emote.
	 * @param {string} theText The text to set.
	 */
	this.setText = function (theText) {
		if (typeof theText !== 'string' || theText.length < 1) {
			throw new Error('Invalid text');
		}
		text = theText;
	};

	/**
	 * Gets the getter name this emote belongs to.
	 * @return {string} The getter's name.
	 */
	this.getGetterName = function () {
		return getterName;
	};

	/**
	 * Sets the getter name this emote belongs to.
	 * @param {string} theGetterName The getter's name.
	 */
	this.setGetterName = function (theGetterName) {
		if (typeof theGetterName !== 'string' || theGetterName.length < 1) {
			throw new Error('Invalid getter name');
		}
		getterName = theGetterName;
	};

	/**
	 * Gets the emote's image URL.
	 * @return {string} The emote image URL.
	 */
	this.getUrl = function () {
		return url;
	};
	/**
	 * Sets the emote's image URL.
	 * @param {string} theUrl The image URL to set.
	 */
	this.setUrl = function (theUrl) {
		if (typeof theUrl !== 'string' || theUrl.length < 1) {
			throw new Error('Invalid URL');
		}
		url = theUrl;
	};

	/**
	 * Gets the emote's channel name.
	 * @return {string} The emote's channel or an empty string if it doesn't have one.
	 */
	this.getChannelName = function () {
		if (!channel.name) {
			channel.name = storage.channelNames.get(this.getText());
		}
		return channel.name || '';
	};
	/**
	 * Sets the emote's channel name.
	 * @param {string} theChannel The channel name to set.
	 */
	this.setChannelName = function (theChannel) {
		if (typeof theChannel !== 'string' || theChannel.length < 1) {
			throw new Error('Invalid channel');
		}

		// Only save the channel to storage if it's dynamic.
		if (theChannel !== '~global' && theChannel !== 'turbo' && theChannel !== 'twitch_prime') {
			storage.channelNames.set(this.getText(), theChannel);
		}
		channel.name = theChannel;
	};

	/**
	 * Gets the emote channel's badge image URL.
	 * @return {string|null} The URL of the badge image for the emote's channel or `null` if it doesn't have a channel.
	 */
	this.getChannelBadge = function () {
		var twitchApi = require('./twitch-api');
		var channelName = this.getChannelName();
		var defaultBadge = '//static-cdn.jtvnw.net/jtv_user_pictures/subscriber-star.png';

		// No channel.
		if (!channelName) {
			return null;
		}

		// Give globals a default badge.
		if (channelName === '~global') {
			return '/favicon.ico';
		}

		// Already have one preset.
		if (channel.badge) {
			return channel.badge;
		}

		// Check storage.
		channel.badge = storage.badges.get(channelName);
		if (channel.badge !== null) {
			return channel.badge;
		}

		// Set default until API returns something.
		channel.badge = defaultBadge;

		// Get from API.
		logger.debug('Getting fresh badge for: ' + channelName);
		twitchApi.getBadges(channelName, function (badges) {
			var badge = null;

			// Save turbo badge while we are here.
			if (badges.turbo && badges.turbo.image) {
				badge = badges.turbo.image;
				storage.badges.set('turbo', badge, 86400000);

				// Turbo is actually what we wanted, so we are done.
				if (channelName === 'turbo') {
					channel.badge = badge;
					return;
				}
			}

			// Save turbo badge while we are here.
			if (badges.premium && badges.premium.image) {
				badge = badges.premium.image;
				storage.badges.set('twitch_prime', badge, 86400000);

				// Turbo is actually what we wanted, so we are done.
				if (channelName === 'twitch_prime') {
					channel.badge = badge;
					return;
				}
			}

			// Save subscriber badge in storage.
			if (badges.subscriber && badges.subscriber.image) {
				channel.badge = badges.subscriber.image;
				storage.badges.set(channelName, channel.badge, 86400000);
				ui.updateEmotes();
			}
			// No subscriber badge.
			else {
				channel.badge = defaultBadge;
				logger.debug('Failed to get subscriber badge for: ' + channelName);
			}
		});
		
		return channel.badge || defaultBadge;
	};

	/**
	 * Sets the emote's channel badge image URL.
	 * @param {string} theBadge The badge image URL to set.
	 */
	this.setChannelBadge = function (theBadge) {
		if (typeof theBadge !== 'string' || theBadge.length < 1) {
			throw new Error('Invalid badge');
		}
		channel.badge = theBadge;
	};

	/**
	 * Get a channel's display name.
	 * @return {string} The channel's display name. May be equivalent to the channel the first time the API needs to be called.
	 */
	this.getChannelDisplayName = function () {
		var twitchApi = require('./twitch-api');
		var channelName = this.getChannelName();
		var self = this;

		var forcedChannelToDisplayNames = {
			'~global': 'Global',
			'turbo': 'Twitch Turbo',
			'twitch_prime': 'Twitch Prime'
		};

		// No channel.
		if (!channelName) {
			return '';
		}

		// Forced display name.
		if (forcedChannelToDisplayNames[channelName]) {
			return forcedChannelToDisplayNames[channelName];
		}

		// Already have one preset.
		if (channel.displayName) {
			return channel.displayName;
		}

		// Look for obvious bad channel names that shouldn't hit the API or storage. Use channel name instead.
		if (/[^a-z0-9_]/.test(channelName)) {
			logger.debug('Unable to get display name due to obvious non-standard channel name for: ' + channelName);
			return channelName;
		}

		// Check storage.
		channel.displayName = storage.displayNames.get(channelName);
		if (channel.displayName !== null) {
			return channel.displayName;
		}
		// Get from API.
		else {
			// Set default until API returns something.
			channel.displayName = channelName;

			logger.debug('Getting fresh display name for: ' + channelName);
			twitchApi.getUser(channelName, function (user) {
				if (!user || !user.display_name) {
					logger.debug('Failed to get display name for: ' + channelName);
					return;
				}

				// Save it.
				self.setChannelDisplayName(user.display_name);
				ui.updateEmotes();
			});
		}
		
		return channel.displayName;
	};

	/**
	 * Sets the emote's channel badge image URL.
	 * @param {string} theBadge The badge image URL to set.
	 */
	this.setChannelDisplayName = function (displayName) {
		if (typeof displayName !== 'string' || displayName.length < 1) {
			throw new Error('Invalid displayName');
		}
		channel.displayName = displayName;
		storage.displayNames.set(this.getChannelName(), displayName, 86400000);
	};

	/**
	 * Initialize the details.
	 */
	
	// Required fields.
	this.setText(details.text);
	this.setUrl(details.url);

	// Optional fields.
	if (details.getterName) {
		this.setGetterName(details.getterName);
	}
	if (details.channel) {
		this.setChannelName(details.channel);
	}
	if (details.channelDisplayName) {
		this.setChannelDisplayName(details.channelDisplayName);
	}
	if (details.badge) {
		this.setChannelBadge(details.badge);
	}
};

/**
 * State changers.
 */

/**
 * Toggle whether an emote should be a favorite.
 * @param {boolean} [force] `true` forces the emote to be a favorite, `false` forces the emote to not be a favorite.
 */
Emote.prototype.toggleFavorite = function (force) {
	if (typeof force !== 'undefined') {
		storage.starred.set(this.getText(), !!force);
		return;
	}
	storage.starred.set(this.getText(), !this.isFavorite());
};

/**
 * Toggle whether an emote should be visible out of editing mode.
 * @param {boolean} [force] `true` forces the emote to be visible, `false` forces the emote to be hidden.
 */
Emote.prototype.toggleVisibility = function (force) {
	if (typeof force !== 'undefined') {
		storage.visibility.set(this.getText(), !!force);
		return;
	}
	storage.visibility.set(this.getText(), !this.isVisible());
};

/**
 * State getters.
 */

/**
 * Whether the emote is from a 3rd party.
 * @return {boolean} Whether the emote is from a 3rd party.
 */
Emote.prototype.isThirdParty = function () {
	return !!this.getGetterName();
};

/**
 * Whether the emote was favorited.
 * @return {boolean} Whether the emote was favorited.
 */
Emote.prototype.isFavorite = function () {
	return storage.starred.get(this.getText(), false);
};

/**
 * Whether the emote is visible outside of editing mode.
 * @return {boolean} Whether the emote is visible outside of editing mode.
 */
Emote.prototype.isVisible = function () {
	return storage.visibility.get(this.getText(), true);
};

/**
 * Whether the emote is considered a simple smiley.
 * @return {boolean} Whether the emote is considered a simple smiley.
 */
Emote.prototype.isSmiley = function () {
	// The basic smiley emotes.
	var emotes = [':(', ':)', ':/', ':\\', ':D', ':o', ':p', ':z', ';)', ';p', '<3', '>(', 'B)', 'R)', 'o_o', 'O_O', '#/', ':7', ':>', ':S', '<]'];
	return emotes.indexOf(this.getText()) !== -1;
};

/**
 * Property getters/setters.
 */

/**
 * Gets the usable emote text from a regex.
 */
function getEmoteFromRegEx(regex) {
	if (typeof regex === 'string') {
		regex = new RegExp(regex);
	}
	if (!regex) {
		throw new Error('`regex` must be a RegExp string or object.');
	}

	return decodeURI(regex.source)

		// Replace HTML entity brackets with actual brackets.
		.replace('&gt\\;', '>')
		.replace('&lt\\;', '<')

		// Remove negative groups.
		//
		// /
		//   \(\?!              // (?!
		//   [^)]*              // any amount of characters that are not )
		//   \)                 // )
		// /g
		.replace(/\(\?![^)]*\)/g, '')

		// Pick first option from a group.
		//
		// /
		//   \(                 // (
		//   ([^|])*            // any amount of characters that are not |
		//   \|?                // an optional | character
		//   [^)]*              // any amount of characters that are not )
		//   \)                 // )
		// /g
		.replace(/\(([^|])*\|?[^)]*\)/g, '$1')

		// Pick first character from a character group.
		//
		// /
		//   \[                 // [
		//   ([^|\]\[])*        // any amount of characters that are not |, [, or ]
		//   \|?                // an optional | character
		//   [^\]]*             // any amount of characters that are not [, or ]
		//   \]                 // ]
		// /g
		.replace(/\[([^|\]\[])*\|?[^\]\[]*\]/g, '$1')

		// Remove optional characters.
		//
		// /
		//   [^\\]              // any character that is not \
		//   \?                 // ?
		// /g
		.replace(/[^\\]\?/g, '')

		// Remove boundaries at beginning and end.
		.replace(/^\\b|\\b$/g, '') 

		// Unescape only single backslash, not multiple.
		//
		// /
		//   \\                 // \
		//   (?!\\)             // look-ahead, any character that isn't \
		// /g
		.replace(/\\(?!\\)/g, '');
}

var sorting = {};

/**
 * Sort by alphanumeric in this order: symbols -> numbers -> AaBb... -> numbers
 */
sorting.byText = function (a, b) {
	textA = a.getText().toLowerCase();
	textB = b.getText().toLowerCase();

	if (textA < textB) {
		return -1;
	}
	if (textA > textB) {
		return 1;
	}
	return 0;
}

/**
 * Basic smilies before non-basic smilies.
 */
sorting.bySmiley = function (a, b) {
	if (a.isSmiley() &&	!b.isSmiley()) {
		return -1;
	}
	if (b.isSmiley() &&	!a.isSmiley()) {
		return 1;
	}
	return 0;
};

/**
 * Globals before subscription emotes, subscriptions in alphabetical order.
 */
sorting.byChannelName = function (a, b) {
	var channelA = a.getChannelName();
	var channelB = b.getChannelName();

	// Both don't have channels.
	if (!channelA && !channelB) {
		return 0;
	}

	// "A" has channel, "B" doesn't.
	if (channelA && !channelB) {
		return 1;
	}
	// "B" has channel, "A" doesn't.
	if (channelB && !channelA) {
		return -1;
	}

	channelA = channelA.toLowerCase();
	channelB = channelB.toLowerCase();

	if (channelA < channelB) {
		return -1;
	}
	if (channelB > channelA) {
		return 1;
	}

	// All the same
	return 0;
};

/**
 * The general sort order for the all emotes category.
 * Smileys -> Channel grouping -> alphanumeric
 */
sorting.allEmotesCategory = function (a, b) {
	var bySmiley = sorting.bySmiley(a, b);
	var byChannelName  = sorting.byChannelName(a, b);
	var byText = sorting.byText(a, b);

	if (bySmiley !== 0) {
		return bySmiley;
	}
	if (byChannelName !== 0) {
		return byChannelName;
	}
	return byText;
};

module.exports = emoteStore;

},{"./logger":10,"./storage":12,"./twitch-api":14,"./ui":15}],10:[function(require,module,exports){
var api = {};
var instance = '[instance ' + (Math.floor(Math.random() * (999 - 100)) + 100) + '] ';
var prefix = '[Emote Menu] ';
var storage = require('./storage');

api.log = function () {
	if (typeof console.log === 'undefined') {
		return;
	}
	arguments = [].slice.call(arguments).map(function (arg) {
		if (typeof arg !== 'string') {
			return JSON.stringify(arg);
		}
		return arg;
	});
	if (storage.global.get('debugMessagesEnabled', false)) {
		arguments.unshift(instance);
	}
	arguments.unshift(prefix);
	console.log.apply(console, arguments);
};

api.debug = function () {
	if (!storage.global.get('debugMessagesEnabled', false)) {
		return;
	}
	arguments = [].slice.call(arguments);
	arguments.unshift('[DEBUG] ');
	api.log.apply(null, arguments);
}

module.exports = api;

},{"./storage":12}],11:[function(require,module,exports){
var storage = require('./storage');
var logger = require('./logger');
var emotes = require('./emotes');
var api = {};

api.toggleDebug = function (forced) {
	if (typeof forced === 'undefined') {
		forced = !storage.global.get('debugMessagesEnabled', false);
	}
	else {
		forced = !!forced;
	}
	storage.global.set('debugMessagesEnabled', forced);
	logger.log('Debug messages are now ' + (forced ? 'enabled' : 'disabled'));
};

api.registerEmoteGetter = emotes.registerGetter;
api.deregisterEmoteGetter = emotes.deregisterGetter;

module.exports = api;

},{"./emotes":9,"./logger":10,"./storage":12}],12:[function(require,module,exports){
var Store = require('storage-wrapper');
var storage = {};

// General storage.
storage.global = new Store({
	namespace: 'emote-menu-for-twitch'
});

// Emote visibility storage.
storage.visibility = storage.global.createSubstore('visibility');
// Emote starred storage.
storage.starred = storage.global.createSubstore('starred');
// Display name storage.
storage.displayNames = storage.global.createSubstore('displayNames');
// Channel name storage.
storage.channelNames = storage.global.createSubstore('channelNames');
// Badges storage.
storage.badges = storage.global.createSubstore('badges');

module.exports = storage;

},{"storage-wrapper":6}],13:[function(require,module,exports){
var templates = require('../../build/templates');

module.exports = (function () {
	var data = {};
	var key = null;

	// Convert templates to their shorter "render" form.
	for (key in templates) {
		if (!templates.hasOwnProperty(key)) {
			continue;
		}
		data[key] = render(key);
	}

	// Shortcut the render function. All templates will be passed in as partials by default.
	function render(template) {
		template = templates[template];
		return function (context, partials, indent) {
			return template.render(context, partials || templates, indent);
		};
	}

	return data;
})();

},{"../../build/templates":3}],14:[function(require,module,exports){
var twitchApi = window.Twitch.api;
var jQuery = window.jQuery;
var logger = require('./logger');
var api = {};

api.getBadges = function (username, callback) {
	if (
		[
			'~global',
			'turbo',
			'twitch_prime'
		].indexOf(username) > -1
	) {
		if (!jQuery) {
			callback({});
		}
		// Note: not a documented API endpoint.
		jQuery.getJSON('https://badges.twitch.tv/v1/badges/global/display')
			.done(function (api) {
				var badges = {
					turbo: {
						image: api.badge_sets.turbo.versions['1'].image_url_1x
					},
					premium: {
						image: api.badge_sets.premium.versions['1'].image_url_1x
					}
				};
				callback(badges);
			})
			.fail(function () {
				callback({});
			});
	}
	else {
		twitchApi.get(
			'chat/' + username + '/badges',
			{api_version: 3}
		)
			.done(function (api) {
				callback(api);
			})
			.fail(function () {
				callback({});
			});
	}
};

api.getUser = function (username, callback) {
	// Note: not a documented API endpoint.
	twitchApi.get(
		'users/' + username,
		{api_version: 3}
	)
		.done(function (api) {
			callback(api);
		})
		.fail(function () {
			callback({});
		});
};

api.getTickets = function (callback) {
	// Note: not a documented API endpoint.
	twitchApi.get(
		'/api/users/:login/tickets',
		{
			offset: 0,
			limit: 100,
			unended: true,
			api_version: 3
		}
	)
		.done(function (api) {
			callback(api.tickets || []);
		})
		.fail(function () {
			callback([]);
		});
};

api.getEmotes = function (callback) {
	twitchApi.get(
		'users/:login/emotes',
		{api_version: 3}
	)
		.done(function (response) {
			if (!response || !response.emoticon_sets) {
				logger.debug('getEmotes emoticon_sets empty');
				callback({});
				return;
			}

			callback(response.emoticon_sets);
		})
		.fail(function () {
			logger.debug('getEmotes API call failed');
			callback({});
		});
};

module.exports = api;

},{"./logger":10}],15:[function(require,module,exports){
var api = {};
var $ = jQuery = window.jQuery;
var templates = require('./templates');
var storage = require('./storage');
var emotes = require('./emotes');
var logger = require('./logger');

var theMenu = new UIMenu();
var theMenuButton = new UIMenuButton();

api.init = function () {
	// Load CSS.
	require('../../build/styles');

	// Load jQuery plugins.
	require('../plugins/resizable');
	require('jquery.scrollbar');

	theMenuButton.init();
	theMenu.init();
};

api.hideMenu = function () {
	if (theMenu.dom && theMenu.dom.length) {
		theMenu.toggleDisplay(false);
	}
};

api.updateEmotes = function () {
	theMenu.updateEmotes();
}

function UIMenuButton() {
	this.dom = null;
}

UIMenuButton.prototype.init = function (timesFailed) {
	var self = this;
	var chatButton = $('.send-chat-button, .chat-buttons-container button');
	var failCounter = timesFailed || 0;
	this.dom = $('#emote-menu-button');

	// Element already exists.
	if (this.dom.length) {
		logger.debug('MenuButton already exists, stopping init.');
		return this;
	}

	if (!chatButton.length) {
		failCounter += 1;
		if (failCounter === 1) {
			logger.log('MenuButton container missing, trying again.');
		}
		if (failCounter >= 10) {
			logger.log('MenuButton container missing, MenuButton unable to be added, stopping init.');
			return this;
		}
		setTimeout(function () {
			self.init(failCounter);
		}, 1000);
		return this;
	}

	// Create element.
	this.dom = $(templates.emoteButton());
	this.dom.insertBefore(chatButton);

	// Hide then fade it in.
	this.dom.hide();
	this.dom.fadeIn();

	// Enable clicking.
	this.dom.on('click', function () {
		theMenu.toggleDisplay();
	});

	return this;
};

UIMenuButton.prototype.toggleDisplay = function (forced) {
	var state = typeof forced !== 'undefined' ? !!forced : !this.isVisible();
	if (state) {
		this.dom.addClass('active');
		return this;
	}
	this.dom.removeClass('active');

	return this;
};

UIMenuButton.prototype.isVisible = function () {
	return this.dom.hasClass('active');
};

function UIMenu() {
	this.dom = null;
	this.groups = {};
	this.emotes = [];
	this.offset = null;
	this.favorites = null;
}

UIMenu.prototype.init = function () {
	var logger = require('./logger');
	var self = this;

	this.dom = $('#emote-menu-for-twitch');

	// Element already exists.
	if (this.dom.length) {
		return this;
	}

	// Create element.
	this.dom = $(templates.menu());
	$(document.body).append(this.dom);

	this.favorites = new UIFavoritesGroup();

	// Enable dragging.
	this.dom.draggable({
		handle: '.draggable',
		start: function () {
			self.togglePinned(true);
			self.toggleMovement(true);
		},
		stop: function () {
			self.offset = self.dom.offset();
		},
		containment: $(document.body)
	});

	// Enable resizing.
	this.dom.resizable({
		handle: '[data-command="resize-handle"]',
		stop: function () {
			self.togglePinned(true);
			self.toggleMovement(true);
		},
		alsoResize: self.dom.find('.scrollable'),
		containment: $(document.body),
		minHeight: 180,
		minWidth: 200
	});

	// Enable pinning.
	this.dom.find('[data-command="toggle-pinned"]').on('click', function () {
		self.togglePinned();
	});

	// Enable editing.
	this.dom.find('[data-command="toggle-editing"]').on('click', function () {
		self.toggleEditing();
	});

	this.dom.find('.scrollable').scrollbar()

	this.updateEmotes();

	return this;
};

UIMenu.prototype._detectOutsideClick = function (event) {
	// Not outside of the menu, ignore the click.
	if ($(event.target).is('#emote-menu-for-twitch, #emote-menu-for-twitch *')) {
		return;
	}

	// Clicked on the menu button, just remove the listener and let the normal listener handle it.
	if (!this.isVisible() || $(event.target).is('#emote-menu-button, #emote-menu-button *')) {
		$(document).off('mouseup', this._detectOutsideClick.bind(this));
		return;
	}

	// Clicked outside, make sure the menu isn't pinned.
	if (!this.isPinned()) {
		// Menu wasn't pinned, remove listener.
		$(document).off('mouseup', this._detectOutsideClick.bind(this));
		this.toggleDisplay();
	}
};

UIMenu.prototype.toggleDisplay = function (forced) {
	var state = typeof forced !== 'undefined' ? !!forced : !this.isVisible();
	var loggedIn = window.Twitch && window.Twitch.user.isLoggedIn();

	// Menu should be shown.
	if (state) {
		// Check if user is logged in.
		if (!loggedIn) {
			// Call native login form.
			$.login();
			return this;
		}

		this.updateEmotes();
		this.dom.show();

		// Menu moved, move it back.
		if (this.hasMoved()) {
			this.dom.offset(this.offset);
		}
		// Never moved, make it the same size as the chat window.
		else {
			var chatContainer = $('.chat-messages');
			
			// Adjust the size to be the same as the chat container.
			this.dom.height(chatContainer.outerHeight() - (this.dom.outerHeight() - this.dom.height()));
			this.dom.width(chatContainer.outerWidth() - (this.dom.outerWidth() - this.dom.width()));

			// Adjust the offset to be the same as the chat container.
			this.offset = chatContainer.offset();
			this.dom.offset(this.offset);
		}

		// Listen for outside click.
		$(document).on('mouseup', this._detectOutsideClick.bind(this));
	}
	// Menu should be hidden.
	else {
		this.dom.hide();
		this.toggleEditing(false);
		this.togglePinned(false);
	}

	// Also toggle the menu button.
	theMenuButton.toggleDisplay(this.isVisible());

	return this;
};

UIMenu.prototype.isVisible = function () {
	return this.dom.is(':visible');
};

UIMenu.prototype.updateEmotes = function (which) {
	var emote = which ? this.getEmote(which) : null;
	var favoriteEmote = emote ? this.favorites.getEmote(which) : null;
	if (emote) {
		emote.update();
		if (favoriteEmote) {
			favoriteEmote.update();
		}
		return this;
	}
	var emotes = require('./emotes');
	var theEmotes = emotes.getEmotes();
	var theEmotesKeys = [];
	var self = this;

	theEmotes.forEach(function (emoteInstance) {
		self.addEmote(emoteInstance);
		theEmotesKeys.push(emoteInstance.getText());
	});

	// Difference the emotes and remove all non-valid emotes.
	this.emotes.forEach(function (oldEmote) {
		var text = oldEmote.getText()
		if (theEmotesKeys.indexOf(text) < 0) {
			logger.debug('Emote difference found, removing emote from UI: ' + text);
			self.removeEmote(text);
		}
	});

	// Save the emotes for next differencing.
	this.emotes = theEmotes;

	//Update groups.
	Object.keys(this.groups).forEach(function (group) {
		self.getGroup(group).init();
	});

	return this;
};

UIMenu.prototype.toggleEditing = function (forced) {
	var state = typeof forced !== 'undefined' ? !!forced : !this.isEditing();
	this.dom.toggleClass('editing', state);
	return this;
};

UIMenu.prototype.isEditing = function () {
	return this.dom.hasClass('editing');
};

UIMenu.prototype.togglePinned = function (forced) {
	var state = typeof forced !== 'undefined' ? !!forced : !this.isPinned();
	this.dom.toggleClass('pinned', state);
	return this;
};

UIMenu.prototype.isPinned = function () {
	return this.dom.hasClass('pinned');
};

UIMenu.prototype.toggleMovement = function (forced) {
	var state = typeof forced !== 'undefined' ? !!forced : !this.hasMoved();
	this.dom.toggleClass('moved', state);
	return this;
};

UIMenu.prototype.hasMoved = function () {
	return this.dom.hasClass('moved');
};

UIMenu.prototype.addGroup = function (emoteInstance) {
	var channel = emoteInstance.getChannelName();
	var self = this;

	// Already added, don't add again.
	if (this.getGroup(channel)) {
		return this;
	}

	// Add to current menu groups.
	var group = new UIGroup(emoteInstance);
	this.groups[channel] = group;

	// Sort group names, get index of where this group should go.
	var keys = Object.keys(this.groups);
	keys.sort(function (a, b) {
		// Get the instances.
		a = self.groups[a].emoteInstance;
		b = self.groups[b].emoteInstance;

		// Get the channel name.
		var aChannel = a.getChannelName();
		var bChannel = b.getChannelName();

		// Get the channel display name.
		a = a.getChannelDisplayName().toLowerCase();
		b = b.getChannelDisplayName().toLowerCase();

		// Prime goes first, always.
		if (aChannel === 'twitch_prime' && bChannel !== 'twitch_prime') {
			return -1;
		}
		if (bChannel === 'twitch_prime' && aChannel !== 'twitch_prime') {
			return 1;
		}

		// Turbo goes after Prime, always.
		if (aChannel === 'turbo' && bChannel !== 'turbo') {
			return -1;
		}
		if (bChannel === 'turbo' && aChannel !== 'turbo') {
			return 1;
		}

		// Global goes after Turbo, always.
		if (aChannel === '~global' && bChannel !== '~global') {
			return -1;
		}
		if (bChannel === '~global' && aChannel !== '~global') {
			return 1;
		}

		// A goes first.
		if (a < b) {
			return -1;
		}
		// B goest first.
		if (a > b) {
			return 1;
		}
		// Both the same, doesn't matter.
		return 0;
	});

	var index = keys.indexOf(channel);

	// First in the sort, place at the beginning of the menu.
	if (index === 0) {
		group.dom.prependTo(this.dom.find('#all-emotes-group'));
	}
	// Insert after the previous group in the sort.
	else {
		group.dom.insertAfter(this.getGroup(keys[index - 1]).dom);
	}

	return group;
};

UIMenu.prototype.getGroup = function (name) {
	return this.groups[name] || null;
};

UIMenu.prototype.addEmote = function (emoteInstance) {
	// Get the group, or add if needed.
	var group = this.getGroup(emoteInstance.getChannelName()) || this.addGroup(emoteInstance);

	group.addEmote(emoteInstance);
	group.toggleDisplay(group.isVisible(), true);

	this.favorites.addEmote(emoteInstance);

	return this;
};

UIMenu.prototype.removeEmote = function (name) {
	var self = this;
	Object.keys(this.groups).forEach(function (groupName) {
		self.groups[groupName].removeEmote(name);
	});
	this.favorites.removeEmote(name);

	return this;
};

UIMenu.prototype.getEmote = function (name) {
	var groupName = null;
	var group = null;
	var emote = null;

	for (groupName in this.groups) {
		group = this.groups[groupName];
		emote = group.getEmote(name);

		if (emote) {
			return emote;
		}
	}

	return null;
};

function UIGroup(emoteInstance) {
	this.dom = null;
	this.emotes = {};
	this.emoteInstance = emoteInstance;

	this.init();
}

UIGroup.prototype.init = function () {
	var self = this;
	var emoteInstance = this.emoteInstance;

	// First init, create new DOM.
	if (this.dom === null) {
		this.dom = $(templates.emoteGroupHeader({
			badge: emoteInstance.getChannelBadge(),
			channel: emoteInstance.getChannelName(),
			channelDisplayName: emoteInstance.getChannelDisplayName()
		}));
	}
	// Update DOM instead.
	else {
		this.dom.find('.header-info').replaceWith(
			$(templates.emoteGroupHeader({
				badge: emoteInstance.getChannelBadge(),
				channel: emoteInstance.getChannelName(),
				channelDisplayName: emoteInstance.getChannelDisplayName()
			}))
			.find('.header-info')
		);
	}

	// Enable emote hiding.
	this.dom.find('.header-info [data-command="toggle-visibility"]').on('click', function () {
		if (!theMenu.isEditing()) {
			return;
		}
		self.toggleDisplay();
	});

	this.toggleDisplay(this.isVisible(), true);
};

UIGroup.prototype.toggleDisplay = function (forced, skipUpdatingEmoteDisplay) {
	var self = this;
	var state = typeof forced !== 'undefined' ? !forced : this.isVisible();

	this.dom.toggleClass('emote-menu-hidden', state);

	// Update the display of all emotes.
	if (!skipUpdatingEmoteDisplay) {
		Object.keys(this.emotes).forEach(function (emoteName) {
			self.emotes[emoteName].toggleDisplay(!state);
			theMenu.updateEmotes(self.emotes[emoteName].instance.getText());
		});
	}

	return this;
};

UIGroup.prototype.isVisible = function () {
	var self = this;

	// If any emote is visible, the group should be visible.
	return Object.keys(this.emotes).some(function (emoteName) {
		return self.emotes[emoteName].isVisible();
	});
};

UIGroup.prototype.addEmote = function (emoteInstance) {
	var self = this;
	var emote = this.getEmote(emoteInstance.getText());

	// Already added, update instead.
	if (emote) {
		emote.update();
		return this;
	}

	// Add to current emotes.
	emote = new UIEmote(emoteInstance);
	this.emotes[emoteInstance.getText()] = emote;

	var keys = Object.keys(this.emotes);

	keys.sort(function (a, b) {
		// Get the emote instances.
		a = self.emotes[a].instance;
		b = self.emotes[b].instance;

		// A is a smiley, B isn't. A goes first.
		if (a.isSmiley() &&	!b.isSmiley()) {
			return -1;
		}
		// B is a smiley, A isn't. B goes first.
		if (b.isSmiley() &&	!a.isSmiley()) {
			return 1;
		}

		// Get the text of the emotes.
		a = a.getText().toLowerCase();
		b = b.getText().toLowerCase();

		// A goes first.
		if (a < b) {
			return -1;
		}
		// B goest first.
		if (a > b) {
			return 1;
		}
		// Both the same, doesn't matter.
		return 0;
	});

	var index = keys.indexOf(emoteInstance.getText());

	// First in the sort, place at the beginning of the group.
	if (index === 0) {
		emote.dom.prependTo(this.dom.find('.emote-container'));
	}
	// Insert after the previous emote in the sort.
	else {
		emote.dom.insertAfter(this.getEmote(keys[index - 1]).dom);
	}

	return this;
};

UIGroup.prototype.getEmote = function (name) {
	return this.emotes[name] || null;
};

UIGroup.prototype.removeEmote = function (name) {
	var emote = this.getEmote(name);
	if (!emote) {
		return this;
	}
	emote.dom.remove();
	delete this.emotes[name];

	return this;
};

function UIFavoritesGroup() {
	this.dom = $('#starred-emotes-group');
	this.emotes = {};
}

UIFavoritesGroup.prototype.addEmote = UIGroup.prototype.addEmote;
UIFavoritesGroup.prototype.getEmote = UIGroup.prototype.getEmote;
UIFavoritesGroup.prototype.removeEmote = UIGroup.prototype.removeEmote;

function UIEmote(emoteInstance) {
	this.dom = null;
	this.instance = emoteInstance;
	this.init();
}

UIEmote.prototype.init = function () {
	var self = this;

	// Create element.
	this.dom = $(templates.emote({
		url: this.instance.getUrl(),
		text: this.instance.getText(),
		thirdParty: this.instance.isThirdParty(),
		isVisible: this.instance.isVisible(),
		isStarred: this.instance.isFavorite()
	}));

	// Enable clicking.
	this.dom.on('click', function () {
		if (!theMenu.isEditing()) {
			self.addToChat();

			// Close the menu if not pinned.
			if (!theMenu.isPinned()) {
				theMenu.toggleDisplay();
			}
		}
	});

	// Enable emote hiding.
	this.dom.find('[data-command="toggle-visibility"]').on('click', function () {
		if (!theMenu.isEditing()) {
			return;
		}
		self.toggleDisplay();
		theMenu.updateEmotes(self.instance.getText());
	});

	// Enable emote favoriting.
	this.dom.find('[data-command="toggle-starred"]').on('click', function () {
		if (!theMenu.isEditing()) {
			return;
		}
		self.toggleFavorite();
		theMenu.updateEmotes(self.instance.getText());
	});

	return this;
};

UIEmote.prototype.toggleDisplay = function (forced, skipInstanceUpdate) {
	var state = typeof forced !== 'undefined' ? !forced : this.isVisible();
	this.dom.toggleClass('emote-menu-hidden', state);
	if (!skipInstanceUpdate) {
		this.instance.toggleVisibility(!state);
	}

	var group = this.getGroup();
	group.toggleDisplay(group.isVisible(), true);

	return this;
};

UIEmote.prototype.isVisible = function () {
	return !this.dom.hasClass('emote-menu-hidden');
};

UIEmote.prototype.toggleFavorite = function (forced, skipInstanceUpdate) {
	var state = typeof forced !== 'undefined' ? !!forced : !this.isFavorite();
	this.dom.toggleClass('emote-menu-starred', state);
	if (!skipInstanceUpdate) {
		this.instance.toggleFavorite(state);
	}
	return this;
};

UIEmote.prototype.isFavorite = function () {
	return this.dom.hasClass('emote-menu-starred');
};

UIEmote.prototype.addToChat = function () {
	var ember = require('./ember-api');
	// Get textarea element.
	var element = $('.chat-interface textarea').get(0);
	var text = this.instance.getText();

	// Insert at cursor / replace selection.
	// https://developer.mozilla.org/en-US/docs/Code_snippets/Miscellaneous
	var selectionEnd = element.selectionStart + text.length;
	var currentValue = element.value;
	var beforeText = currentValue.substring(0, element.selectionStart);
	var afterText = currentValue.substring(element.selectionEnd, currentValue.length);
	// Smart padding, only put space at start if needed.
	if (
		beforeText !== '' &&
		beforeText.substr(-1) !== ' '
	) {
		text = ' ' + text;
	}
	// Always put space at end.
	text = beforeText + text + ' ' + afterText;
	// Set the text.
	ember.get('controller:chat', 'currentRoom').set('messageToSend', text);
	element.focus();
	// Put cursor at end.
	selectionEnd = element.selectionStart + text.length;
	element.setSelectionRange(selectionEnd, selectionEnd);

	return this;
};

UIEmote.prototype.getGroup = function () {
	return theMenu.getGroup(this.instance.getChannelName());
};

UIEmote.prototype.update = function () {
	this.toggleDisplay(this.instance.isVisible(), true);
	this.toggleFavorite(this.instance.isFavorite(), true);
};

module.exports = api;

},{"../../build/styles":2,"../plugins/resizable":16,"./ember-api":8,"./emotes":9,"./logger":10,"./storage":12,"./templates":13,"jquery.scrollbar":5}],16:[function(require,module,exports){
(function ($) {
	$.fn.resizable = function (options) {
		var settings = $.extend({
			alsoResize: null,
			alsoResizeType: 'both', // `height`, `width`, `both`
			containment: null,
			create: null,
			destroy: null,
			handle: '.resize-handle',
			maxHeight: 9999,
			maxWidth: 9999,
			minHeight: 0,
			minWidth: 0,
			resize: null,
			resizeOnce: null,
			snapSize: 1,
			start: null,
			stop: null
		}, options);

		settings.element = $(this);

		function recalculateSize(evt) {
			var data = evt.data,
				resized = {};
			data.diffX = Math.round((evt.pageX - data.pageX) / settings.snapSize) * settings.snapSize;
			data.diffY = Math.round((evt.pageY - data.pageY) / settings.snapSize) * settings.snapSize;
			if (Math.abs(data.diffX) > 0 || Math.abs(data.diffY) > 0) {
				if (
					settings.element.height() !== data.height + data.diffY &&
					data.height + data.diffY >= settings.minHeight &&
					data.height + data.diffY <= settings.maxHeight &&
					(settings.containment ? data.outerHeight + data.diffY + data.offset.top <= settings.containment.offset().top + settings.containment.outerHeight() : true)
				) {
					settings.element.height(data.height + data.diffY);
					resized.height = true;
				}
				if (
					settings.element.width() !== data.width + data.diffX &&
					data.width + data.diffX >= settings.minWidth &&
					data.width + data.diffX <= settings.maxWidth &&
					(settings.containment ? data.outerWidth + data.diffX + data.offset.left <= settings.containment.offset().left + settings.containment.outerWidth() : true)
				) {
					settings.element.width(data.width + data.diffX);
					resized.width = true;
				}
				if (resized.height || resized.width) {
					if (settings.resizeOnce) {
						settings.resizeOnce.bind(settings.element)(evt.data);
						settings.resizeOnce = null;
					}
					if (settings.resize) {
						settings.resize.bind(settings.element)(evt.data);
					}
					if (settings.alsoResize) {
						if (resized.height && (settings.alsoResizeType === 'height' || settings.alsoResizeType === 'both')) {
							settings.alsoResize.height(data.alsoResizeHeight + data.diffY);
						}
						if (resized.width && (settings.alsoResizeType === 'width' || settings.alsoResizeType === 'both')) {
							settings.alsoResize.width(data.alsoResizeWidth + data.diffX);
						}
					}
				}
			}
		}

		function start(evt) {
			evt.preventDefault();
			if (settings.start) {
				settings.start.bind(settings.element)();
			}
			var data = {
				alsoResizeHeight: settings.alsoResize ? settings.alsoResize.height() : 0,
				alsoResizeWidth: settings.alsoResize ? settings.alsoResize.width() : 0,
				height: settings.element.height(),
				offset: settings.element.offset(),
				outerHeight: settings.element.outerHeight(),
				outerWidth: settings.element.outerWidth(),
				pageX: evt.pageX,
				pageY: evt.pageY,
				width: settings.element.width()
			};
			$(document).on('mousemove', '*', data, recalculateSize);
			$(document).on('mouseup', '*', stop);
		}

		function stop() {
			if (settings.stop) {
				settings.stop.bind(settings.element)();
			}
			$(document).off('mousemove', '*', recalculateSize);
			$(document).off('mouseup', '*', stop);
		}

		if (settings.handle) {
			if (settings.alsoResize && ['both', 'height', 'width'].indexOf(settings.alsoResizeType) >= 0) {
				settings.alsoResize = $(settings.alsoResize);
			}
			if (settings.containment) {
				settings.containment = $(settings.containment);
			}
			settings.handle = $(settings.handle);
			settings.snapSize = settings.snapSize < 1 ? 1 : settings.snapSize;

			if (options === 'destroy') {
				settings.handle.off('mousedown', start);

				if (settings.destroy) {
					settings.destroy.bind(this)();
				}
				return this;
			}

			settings.handle.on('mousedown', start);

			if (settings.create) {
				settings.create.bind(this)();
			}
		}
		return this;
	};
})(jQuery);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiLi9zcmMvc2NyaXB0LmpzIiwiQzovVXNlcnMvQ2xldHVzL1Byb2plY3RzL1VzZXJzY3JpcHQtLVR3aXRjaC1DaGF0LUVtb3Rlcy9idWlsZC9zdHlsZXMuanMiLCJDOi9Vc2Vycy9DbGV0dXMvUHJvamVjdHMvVXNlcnNjcmlwdC0tVHdpdGNoLUNoYXQtRW1vdGVzL2J1aWxkL3RlbXBsYXRlcy5qcyIsIkM6L1VzZXJzL0NsZXR1cy9Qcm9qZWN0cy9Vc2Vyc2NyaXB0LS1Ud2l0Y2gtQ2hhdC1FbW90ZXMvbm9kZV9tb2R1bGVzL2hvZ2FuLmpzL2xpYi90ZW1wbGF0ZS5qcyIsIkM6L1VzZXJzL0NsZXR1cy9Qcm9qZWN0cy9Vc2Vyc2NyaXB0LS1Ud2l0Y2gtQ2hhdC1FbW90ZXMvbm9kZV9tb2R1bGVzL2pxdWVyeS5zY3JvbGxiYXIvanF1ZXJ5LnNjcm9sbGJhci5taW4uanMiLCJDOi9Vc2Vycy9DbGV0dXMvUHJvamVjdHMvVXNlcnNjcmlwdC0tVHdpdGNoLUNoYXQtRW1vdGVzL25vZGVfbW9kdWxlcy9zdG9yYWdlLXdyYXBwZXIvaW5kZXguanMiLCJDOi9Vc2Vycy9DbGV0dXMvUHJvamVjdHMvVXNlcnNjcmlwdC0tVHdpdGNoLUNoYXQtRW1vdGVzL3BhY2thZ2UuanNvbiIsIkM6L1VzZXJzL0NsZXR1cy9Qcm9qZWN0cy9Vc2Vyc2NyaXB0LS1Ud2l0Y2gtQ2hhdC1FbW90ZXMvc3JjL21vZHVsZXMvZW1iZXItYXBpLmpzIiwiQzovVXNlcnMvQ2xldHVzL1Byb2plY3RzL1VzZXJzY3JpcHQtLVR3aXRjaC1DaGF0LUVtb3Rlcy9zcmMvbW9kdWxlcy9lbW90ZXMuanMiLCJDOi9Vc2Vycy9DbGV0dXMvUHJvamVjdHMvVXNlcnNjcmlwdC0tVHdpdGNoLUNoYXQtRW1vdGVzL3NyYy9tb2R1bGVzL2xvZ2dlci5qcyIsIkM6L1VzZXJzL0NsZXR1cy9Qcm9qZWN0cy9Vc2Vyc2NyaXB0LS1Ud2l0Y2gtQ2hhdC1FbW90ZXMvc3JjL21vZHVsZXMvcHVibGljLWFwaS5qcyIsIkM6L1VzZXJzL0NsZXR1cy9Qcm9qZWN0cy9Vc2Vyc2NyaXB0LS1Ud2l0Y2gtQ2hhdC1FbW90ZXMvc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIkM6L1VzZXJzL0NsZXR1cy9Qcm9qZWN0cy9Vc2Vyc2NyaXB0LS1Ud2l0Y2gtQ2hhdC1FbW90ZXMvc3JjL21vZHVsZXMvdGVtcGxhdGVzLmpzIiwiQzovVXNlcnMvQ2xldHVzL1Byb2plY3RzL1VzZXJzY3JpcHQtLVR3aXRjaC1DaGF0LUVtb3Rlcy9zcmMvbW9kdWxlcy90d2l0Y2gtYXBpLmpzIiwiQzovVXNlcnMvQ2xldHVzL1Byb2plY3RzL1VzZXJzY3JpcHQtLVR3aXRjaC1DaGF0LUVtb3Rlcy9zcmMvbW9kdWxlcy91aS5qcyIsIkM6L1VzZXJzL0NsZXR1cy9Qcm9qZWN0cy9Vc2Vyc2NyaXB0LS1Ud2l0Y2gtQ2hhdC1FbW90ZXMvc3JjL3BsdWdpbnMvcmVzaXphYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL3VCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHBrZyA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xyXG52YXIgcHVibGljQXBpID0gcmVxdWlyZSgnLi9tb2R1bGVzL3B1YmxpYy1hcGknKTtcclxudmFyIGVtYmVyID0gcmVxdWlyZSgnLi9tb2R1bGVzL2VtYmVyLWFwaScpO1xyXG52YXIgbG9nZ2VyID0gcmVxdWlyZSgnLi9tb2R1bGVzL2xvZ2dlcicpO1xyXG52YXIgZW1vdGVzID0gcmVxdWlyZSgnLi9tb2R1bGVzL2Vtb3RlcycpO1xyXG52YXIgdWkgPSByZXF1aXJlKCcuL21vZHVsZXMvdWknKTtcclxuXHJcbmxvZ2dlci5sb2coJyh2JysgcGtnLnZlcnNpb24gKyAnKSBJbml0aWFsIGxvYWQgb24gJyArIGxvY2F0aW9uLmhyZWYpO1xyXG5cclxuLy8gT25seSBlbmFibGUgc2NyaXB0IGlmIHdlIGhhdmUgdGhlIHJpZ2h0IHZhcmlhYmxlcy5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxudmFyIGluaXRUaW1lciA9IDA7XHJcbihmdW5jdGlvbiBpbml0KHRpbWUpIHtcdFxyXG5cdGlmICghdGltZSkge1xyXG5cdFx0dGltZSA9IDA7XHJcblx0fVxyXG5cclxuXHR2YXIgb2JqZWN0c0xvYWRlZCA9IChcclxuXHRcdHdpbmRvdy5Ud2l0Y2ggIT09IHVuZGVmaW5lZCAmJlxyXG5cdFx0d2luZG93LmpRdWVyeSAhPT0gdW5kZWZpbmVkICYmXHJcblx0XHRlbWJlci5pc0xvYWRlZCgpXHJcblx0KTtcclxuXHRpZiAoIW9iamVjdHNMb2FkZWQpIHtcclxuXHRcdC8vIFN0b3BzIHRyeWluZyBhZnRlciAxMCBtaW51dGVzLlxyXG5cdFx0aWYgKGluaXRUaW1lciA+PSA2MDAwMDApIHtcclxuXHRcdFx0bG9nZ2VyLmxvZygnVGFraW5nIHRvbyBsb25nIHRvIGxvYWQsIHN0b3BwaW5nLiBSZWZyZXNoIHRoZSBwYWdlIHRvIHRyeSBhZ2Fpbi4gKCcgKyBpbml0VGltZXIgKyAnbXMpJyk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBHaXZlIGFuIHVwZGF0ZSBldmVyeSAxMCBzZWNvbmRzLlxyXG5cdFx0aWYgKGluaXRUaW1lciAlIDEwMDAwKSB7XHJcblx0XHRcdGxvZ2dlci5kZWJ1ZygnU3RpbGwgd2FpdGluZyBmb3Igb2JqZWN0cyB0byBsb2FkLiAoJyArIGluaXRUaW1lciArICdtcyknKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBCdW1wIHRpbWUgdXAgYWZ0ZXIgMXMgdG8gcmVkdWNlIHBvc3NpYmxlIGxhZy5cclxuXHRcdHRpbWUgPSB0aW1lID49IDEwMDAgPyAxMDAwIDogdGltZSArIDI1O1xyXG5cdFx0aW5pdFRpbWVyICs9IHRpbWU7XHJcblxyXG5cdFx0c2V0VGltZW91dChpbml0LCB0aW1lLCB0aW1lKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0XHJcblx0Ly8gRXhwb3NlIHB1YmxpYyBhcGkuXHJcblx0aWYgKHR5cGVvZiB3aW5kb3cuZW1vdGVNZW51ID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0d2luZG93LmVtb3RlTWVudSA9IHB1YmxpY0FwaTtcclxuXHR9XHJcblxyXG5cdGVtYmVyLmhvb2soJ3JvdXRlOmNoYW5uZWwnLCBhY3RpdmF0ZSwgZGVhY3RpdmF0ZSk7XHJcblx0ZW1iZXIuaG9vaygncm91dGU6Y2hhdCcsIGFjdGl2YXRlLCBkZWFjdGl2YXRlKTtcclxuXHJcblx0YWN0aXZhdGUoKTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFjdGl2YXRlKCkge1xyXG5cdHVpLmluaXQoKTtcclxuXHRlbW90ZXMuaW5pdCgpO1xyXG59XHJcbmZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XHJcblx0dWkuaGlkZU1lbnUoKTtcclxufVxyXG4iLCIoZnVuY3Rpb24gKGRvYywgY3NzVGV4dCkge1xuICAgIHZhciBpZCA9IFwiZW1vdGUtbWVudS1mb3ItdHdpdGNoLXN0eWxlc1wiO1xuICAgIHZhciBzdHlsZUVsID0gZG9jLmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoIXN0eWxlRWwpIHtcbiAgICAgICAgc3R5bGVFbCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgICAgIHN0eWxlRWwuaWQgPSBpZDtcbiAgICAgICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZUVsKTtcbiAgICB9XG4gICAgaWYgKHN0eWxlRWwuc3R5bGVTaGVldCkge1xuICAgICAgICBpZiAoIXN0eWxlRWwuc3R5bGVTaGVldC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgc3R5bGVFbC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NUZXh0O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0eWxlRWwuaW5uZXJIVE1MID0gY3NzVGV4dDtcbiAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7XG4gICAgICAgICAgICBzdHlsZUVsLmlubmVyVGV4dCA9IGNzc1RleHQ7XG4gICAgICAgIH1cbiAgICB9XG59KGRvY3VtZW50LCBcIi8qKlxcblwiICtcblwiICogTWluaWZpZWQgc3R5bGUuXFxuXCIgK1xuXCIgKiBPcmlnaW5hbCBmaWxlbmFtZTogXFxcXG5vZGVfbW9kdWxlc1xcXFxqcXVlcnkuc2Nyb2xsYmFyXFxcXGpxdWVyeS5zY3JvbGxiYXIuY3NzXFxuXCIgK1xuXCIgKi9cXG5cIiArXG5cIi5zY3JvbGwtd3JhcHBlcntvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50O3BhZGRpbmc6MCFpbXBvcnRhbnQ7cG9zaXRpb246cmVsYXRpdmV9LnNjcm9sbC13cmFwcGVyPi5zY3JvbGwtY29udGVudHtib3JkZXI6bm9uZSFpbXBvcnRhbnQ7LW1vei1ib3gtc2l6aW5nOmNvbnRlbnQtYm94IWltcG9ydGFudDtib3gtc2l6aW5nOmNvbnRlbnQtYm94IWltcG9ydGFudDtoZWlnaHQ6YXV0bztsZWZ0OjA7bWFyZ2luOjA7bWF4LWhlaWdodDpub25lIWltcG9ydGFudDttYXgtd2lkdGg6bm9uZSFpbXBvcnRhbnQ7b3ZlcmZsb3c6c2Nyb2xsIWltcG9ydGFudDtwYWRkaW5nOjA7cG9zaXRpb246cmVsYXRpdmUhaW1wb3J0YW50O3RvcDowO3dpZHRoOmF1dG8haW1wb3J0YW50fS5zY3JvbGwtd3JhcHBlcj4uc2Nyb2xsLWNvbnRlbnQ6Oi13ZWJraXQtc2Nyb2xsYmFye2hlaWdodDowO3dpZHRoOjB9LnNjcm9sbC1lbGVtZW50e2Rpc3BsYXk6bm9uZX0uc2Nyb2xsLWVsZW1lbnQsLnNjcm9sbC1lbGVtZW50IGRpdnstbW96LWJveC1zaXppbmc6Y29udGVudC1ib3g7Ym94LXNpemluZzpjb250ZW50LWJveH0uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXguc2Nyb2xsLXNjcm9sbHhfdmlzaWJsZSwuc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXkuc2Nyb2xsLXNjcm9sbHlfdmlzaWJsZXtkaXNwbGF5OmJsb2NrfS5zY3JvbGwtZWxlbWVudCAuc2Nyb2xsLWFycm93LC5zY3JvbGwtZWxlbWVudCAuc2Nyb2xsLWJhcntjdXJzb3I6ZGVmYXVsdH0uc2Nyb2xsLXRleHRhcmVhe2JvcmRlcjoxcHggc29saWQgI2NjYztib3JkZXItdG9wLWNvbG9yOiM5OTl9LnNjcm9sbC10ZXh0YXJlYT4uc2Nyb2xsLWNvbnRlbnR7b3ZlcmZsb3c6aGlkZGVuIWltcG9ydGFudH0uc2Nyb2xsLXRleHRhcmVhPi5zY3JvbGwtY29udGVudD50ZXh0YXJlYXtib3JkZXI6bm9uZSFpbXBvcnRhbnQ7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94O2hlaWdodDoxMDAlIWltcG9ydGFudDttYXJnaW46MDttYXgtaGVpZ2h0Om5vbmUhaW1wb3J0YW50O21heC13aWR0aDpub25lIWltcG9ydGFudDtvdmVyZmxvdzpzY3JvbGwhaW1wb3J0YW50O291dGxpbmU6MDtwYWRkaW5nOjJweDtwb3NpdGlvbjpyZWxhdGl2ZSFpbXBvcnRhbnQ7dG9wOjA7d2lkdGg6MTAwJSFpbXBvcnRhbnR9LnNjcm9sbC10ZXh0YXJlYT4uc2Nyb2xsLWNvbnRlbnQ+dGV4dGFyZWE6Oi13ZWJraXQtc2Nyb2xsYmFye2hlaWdodDowO3dpZHRoOjB9LnNjcm9sbGJhci1pbm5lcj4uc2Nyb2xsLWVsZW1lbnQsLnNjcm9sbGJhci1pbm5lcj4uc2Nyb2xsLWVsZW1lbnQgZGl2e2JvcmRlcjpub25lO21hcmdpbjowO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwfS5zY3JvbGxiYXItaW5uZXI+LnNjcm9sbC1lbGVtZW50IGRpdntkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO2xlZnQ6MDt0b3A6MDt3aWR0aDoxMDAlfS5zY3JvbGxiYXItaW5uZXI+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC14e2JvdHRvbToycHg7aGVpZ2h0OjhweDtsZWZ0OjA7d2lkdGg6MTAwJX0uc2Nyb2xsYmFyLWlubmVyPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteXtoZWlnaHQ6MTAwJTtyaWdodDoycHg7dG9wOjA7d2lkdGg6OHB4fS5zY3JvbGxiYXItaW5uZXI+LnNjcm9sbC1lbGVtZW50IC5zY3JvbGwtZWxlbWVudF9vdXRlcntvdmVyZmxvdzpoaWRkZW59LnNjcm9sbGJhci1pbm5lcj4uc2Nyb2xsLWVsZW1lbnQgLnNjcm9sbC1iYXIsLnNjcm9sbGJhci1pbm5lcj4uc2Nyb2xsLWVsZW1lbnQgLnNjcm9sbC1lbGVtZW50X291dGVyLC5zY3JvbGxiYXItaW5uZXI+LnNjcm9sbC1lbGVtZW50IC5zY3JvbGwtZWxlbWVudF90cmFja3tib3JkZXItcmFkaXVzOjhweH0uc2Nyb2xsYmFyLWlubmVyPi5zY3JvbGwtZWxlbWVudCAuc2Nyb2xsLWJhciwuc2Nyb2xsYmFyLWlubmVyPi5zY3JvbGwtZWxlbWVudCAuc2Nyb2xsLWVsZW1lbnRfdHJhY2t7LW1zLWZpbHRlcjpcXFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkFscGhhKE9wYWNpdHk9NDApXFxcIjtmaWx0ZXI6YWxwaGEob3BhY2l0eT00MCk7b3BhY2l0eTouNH0uc2Nyb2xsYmFyLWlubmVyPi5zY3JvbGwtZWxlbWVudCAuc2Nyb2xsLWVsZW1lbnRfdHJhY2t7YmFja2dyb3VuZC1jb2xvcjojZTBlMGUwfS5zY3JvbGxiYXItaW5uZXI+LnNjcm9sbC1lbGVtZW50IC5zY3JvbGwtYmFye2JhY2tncm91bmQtY29sb3I6I2MyYzJjMn0uc2Nyb2xsYmFyLWlubmVyPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwtZHJhZ2dhYmxlIC5zY3JvbGwtYmFyLC5zY3JvbGxiYXItaW5uZXI+LnNjcm9sbC1lbGVtZW50OmhvdmVyIC5zY3JvbGwtYmFye2JhY2tncm91bmQtY29sb3I6IzkxOTE5MX0uc2Nyb2xsYmFyLWlubmVyPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteC5zY3JvbGwtc2Nyb2xseV92aXNpYmxlIC5zY3JvbGwtZWxlbWVudF90cmFja3tsZWZ0Oi0xMnB4fS5zY3JvbGxiYXItaW5uZXI+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC15LnNjcm9sbC1zY3JvbGx4X3Zpc2libGUgLnNjcm9sbC1lbGVtZW50X3RyYWNre3RvcDotMTJweH0uc2Nyb2xsYmFyLWlubmVyPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteC5zY3JvbGwtc2Nyb2xseV92aXNpYmxlIC5zY3JvbGwtZWxlbWVudF9zaXple2xlZnQ6LTEycHh9LnNjcm9sbGJhci1pbm5lcj4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXkuc2Nyb2xsLXNjcm9sbHhfdmlzaWJsZSAuc2Nyb2xsLWVsZW1lbnRfc2l6ZXt0b3A6LTEycHh9LnNjcm9sbGJhci1vdXRlcj4uc2Nyb2xsLWVsZW1lbnQsLnNjcm9sbGJhci1vdXRlcj4uc2Nyb2xsLWVsZW1lbnQgZGl2e2JvcmRlcjpub25lO21hcmdpbjowO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwfS5zY3JvbGxiYXItb3V0ZXI+LnNjcm9sbC1lbGVtZW50e2JhY2tncm91bmQtY29sb3I6I2ZmZn0uc2Nyb2xsYmFyLW91dGVyPi5zY3JvbGwtZWxlbWVudCBkaXZ7ZGlzcGxheTpibG9jaztoZWlnaHQ6MTAwJTtsZWZ0OjA7dG9wOjA7d2lkdGg6MTAwJX0uc2Nyb2xsYmFyLW91dGVyPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteHtib3R0b206MDtoZWlnaHQ6MTJweDtsZWZ0OjA7d2lkdGg6MTAwJX0uc2Nyb2xsYmFyLW91dGVyPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteXtoZWlnaHQ6MTAwJTtyaWdodDowO3RvcDowO3dpZHRoOjEycHh9LnNjcm9sbGJhci1vdXRlcj4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXggLnNjcm9sbC1lbGVtZW50X291dGVye2hlaWdodDo4cHg7dG9wOjJweH0uc2Nyb2xsYmFyLW91dGVyPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteSAuc2Nyb2xsLWVsZW1lbnRfb3V0ZXJ7bGVmdDoycHg7d2lkdGg6OHB4fS5zY3JvbGxiYXItb3V0ZXI+LnNjcm9sbC1lbGVtZW50IC5zY3JvbGwtZWxlbWVudF9vdXRlcntvdmVyZmxvdzpoaWRkZW59LnNjcm9sbGJhci1vdXRlcj4uc2Nyb2xsLWVsZW1lbnQgLnNjcm9sbC1lbGVtZW50X3RyYWNre2JhY2tncm91bmQtY29sb3I6I2VlZX0uc2Nyb2xsYmFyLW91dGVyPi5zY3JvbGwtZWxlbWVudCAuc2Nyb2xsLWJhciwuc2Nyb2xsYmFyLW91dGVyPi5zY3JvbGwtZWxlbWVudCAuc2Nyb2xsLWVsZW1lbnRfb3V0ZXIsLnNjcm9sbGJhci1vdXRlcj4uc2Nyb2xsLWVsZW1lbnQgLnNjcm9sbC1lbGVtZW50X3RyYWNre2JvcmRlci1yYWRpdXM6OHB4fS5zY3JvbGxiYXItb3V0ZXI+LnNjcm9sbC1lbGVtZW50IC5zY3JvbGwtYmFye2JhY2tncm91bmQtY29sb3I6I2Q5ZDlkOX0uc2Nyb2xsYmFyLW91dGVyPi5zY3JvbGwtZWxlbWVudCAuc2Nyb2xsLWJhcjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNjMmMyYzJ9LnNjcm9sbGJhci1vdXRlcj4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLWRyYWdnYWJsZSAuc2Nyb2xsLWJhcntiYWNrZ3JvdW5kLWNvbG9yOiM5MTkxOTF9LnNjcm9sbGJhci1vdXRlcj4uc2Nyb2xsLWNvbnRlbnQuc2Nyb2xsLXNjcm9sbHlfdmlzaWJsZXtsZWZ0Oi0xMnB4O21hcmdpbi1sZWZ0OjEycHh9LnNjcm9sbGJhci1vdXRlcj4uc2Nyb2xsLWNvbnRlbnQuc2Nyb2xsLXNjcm9sbHhfdmlzaWJsZXt0b3A6LTEycHg7bWFyZ2luLXRvcDoxMnB4fS5zY3JvbGxiYXItb3V0ZXI+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC14IC5zY3JvbGwtYmFye21pbi13aWR0aDoxMHB4fS5zY3JvbGxiYXItb3V0ZXI+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC15IC5zY3JvbGwtYmFye21pbi1oZWlnaHQ6MTBweH0uc2Nyb2xsYmFyLW91dGVyPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteC5zY3JvbGwtc2Nyb2xseV92aXNpYmxlIC5zY3JvbGwtZWxlbWVudF90cmFja3tsZWZ0Oi0xNHB4fS5zY3JvbGxiYXItb3V0ZXI+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC15LnNjcm9sbC1zY3JvbGx4X3Zpc2libGUgLnNjcm9sbC1lbGVtZW50X3RyYWNre3RvcDotMTRweH0uc2Nyb2xsYmFyLW91dGVyPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteC5zY3JvbGwtc2Nyb2xseV92aXNpYmxlIC5zY3JvbGwtZWxlbWVudF9zaXple2xlZnQ6LTE0cHh9LnNjcm9sbGJhci1vdXRlcj4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXkuc2Nyb2xsLXNjcm9sbHhfdmlzaWJsZSAuc2Nyb2xsLWVsZW1lbnRfc2l6ZXt0b3A6LTE0cHh9LnNjcm9sbGJhci1tYWNvc3g+LnNjcm9sbC1lbGVtZW50LC5zY3JvbGxiYXItbWFjb3N4Pi5zY3JvbGwtZWxlbWVudCBkaXZ7YmFja2dyb3VuZDowIDA7Ym9yZGVyOm5vbmU7bWFyZ2luOjA7cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTB9LnNjcm9sbGJhci1tYWNvc3g+LnNjcm9sbC1lbGVtZW50IGRpdntkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO2xlZnQ6MDt0b3A6MDt3aWR0aDoxMDAlfS5zY3JvbGxiYXItbWFjb3N4Pi5zY3JvbGwtZWxlbWVudCAuc2Nyb2xsLWVsZW1lbnRfdHJhY2t7ZGlzcGxheTpub25lfS5zY3JvbGxiYXItbWFjb3N4Pi5zY3JvbGwtZWxlbWVudCAuc2Nyb2xsLWJhcntiYWNrZ3JvdW5kLWNvbG9yOiM2QzZFNzE7ZGlzcGxheTpibG9jazstbXMtZmlsdGVyOlxcXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQWxwaGEoT3BhY2l0eT0wKVxcXCI7ZmlsdGVyOmFscGhhKG9wYWNpdHk9MCk7b3BhY2l0eTowO2JvcmRlci1yYWRpdXM6N3B4O3RyYW5zaXRpb246b3BhY2l0eSAuMnMgbGluZWFyfS5zY3JvbGxiYXItbWFjb3N4OmhvdmVyPi5zY3JvbGwtZWxlbWVudCAuc2Nyb2xsLWJhciwuc2Nyb2xsYmFyLW1hY29zeD4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLWRyYWdnYWJsZSAuc2Nyb2xsLWJhcnstbXMtZmlsdGVyOlxcXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQWxwaGEoT3BhY2l0eT03MClcXFwiO2ZpbHRlcjphbHBoYShvcGFjaXR5PTcwKTtvcGFjaXR5Oi43fS5zY3JvbGxiYXItbWFjb3N4Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteHtib3R0b206MDtoZWlnaHQ6MDtsZWZ0OjA7bWluLXdpZHRoOjEwMCU7b3ZlcmZsb3c6dmlzaWJsZTt3aWR0aDoxMDAlfS5zY3JvbGxiYXItbWFjb3N4Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteXtoZWlnaHQ6MTAwJTttaW4taGVpZ2h0OjEwMCU7cmlnaHQ6MDt0b3A6MDt3aWR0aDowfS5zY3JvbGxiYXItbWFjb3N4Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteCAuc2Nyb2xsLWJhcntoZWlnaHQ6N3B4O21pbi13aWR0aDoxMHB4O3RvcDotOXB4fS5zY3JvbGxiYXItbWFjb3N4Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteSAuc2Nyb2xsLWJhcntsZWZ0Oi05cHg7bWluLWhlaWdodDoxMHB4O3dpZHRoOjdweH0uc2Nyb2xsYmFyLW1hY29zeD4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXggLnNjcm9sbC1lbGVtZW50X291dGVye2xlZnQ6MnB4fS5zY3JvbGxiYXItbWFjb3N4Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteCAuc2Nyb2xsLWVsZW1lbnRfc2l6ZXtsZWZ0Oi00cHh9LnNjcm9sbGJhci1tYWNvc3g+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC15IC5zY3JvbGwtZWxlbWVudF9vdXRlcnt0b3A6MnB4fS5zY3JvbGxiYXItbWFjb3N4Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteSAuc2Nyb2xsLWVsZW1lbnRfc2l6ZXt0b3A6LTRweH0uc2Nyb2xsYmFyLW1hY29zeD4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXguc2Nyb2xsLXNjcm9sbHlfdmlzaWJsZSAuc2Nyb2xsLWVsZW1lbnRfc2l6ZXtsZWZ0Oi0xMXB4fS5zY3JvbGxiYXItbWFjb3N4Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteS5zY3JvbGwtc2Nyb2xseF92aXNpYmxlIC5zY3JvbGwtZWxlbWVudF9zaXple3RvcDotMTFweH0uc2Nyb2xsYmFyLWxpZ2h0Pi5zY3JvbGwtZWxlbWVudCwuc2Nyb2xsYmFyLWxpZ2h0Pi5zY3JvbGwtZWxlbWVudCBkaXZ7Ym9yZGVyOm5vbmU7bWFyZ2luOjA7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwfS5zY3JvbGxiYXItbGlnaHQ+LnNjcm9sbC1lbGVtZW50e2JhY2tncm91bmQtY29sb3I6I2ZmZn0uc2Nyb2xsYmFyLWxpZ2h0Pi5zY3JvbGwtZWxlbWVudCBkaXZ7ZGlzcGxheTpibG9jaztoZWlnaHQ6MTAwJTtsZWZ0OjA7dG9wOjA7d2lkdGg6MTAwJX0uc2Nyb2xsYmFyLWxpZ2h0Pi5zY3JvbGwtZWxlbWVudCAuc2Nyb2xsLWVsZW1lbnRfb3V0ZXJ7Ym9yZGVyLXJhZGl1czoxMHB4fS5zY3JvbGxiYXItbGlnaHQ+LnNjcm9sbC1lbGVtZW50IC5zY3JvbGwtZWxlbWVudF9zaXple2JhY2tncm91bmQ6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlBL1BnbzhjM1puSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlnZDJsa2RHZzlJakV3TUNVaUlHaGxhV2RvZEQwaU1UQXdKU0lnZG1sbGQwSnZlRDBpTUNBd0lERWdNU0lnY0hKbGMyVnlkbVZCYzNCbFkzUlNZWFJwYnowaWJtOXVaU0krQ2lBZ1BHeHBibVZoY2tkeVlXUnBaVzUwSUdsa1BTSm5jbUZrTFhWaloyY3RaMlZ1WlhKaGRHVmtJaUJuY21Ga2FXVnVkRlZ1YVhSelBTSjFjMlZ5VTNCaFkyVlBibFZ6WlNJZ2VERTlJakFsSWlCNU1UMGlNQ1VpSUhneVBTSXhNREFsSWlCNU1qMGlNQ1VpUGdvZ0lDQWdQSE4wYjNBZ2IyWm1jMlYwUFNJd0pTSWdjM1J2Y0MxamIyeHZjajBpSTJSaVpHSmtZaUlnYzNSdmNDMXZjR0ZqYVhSNVBTSXhJaTgrQ2lBZ0lDQThjM1J2Y0NCdlptWnpaWFE5SWpFd01DVWlJSE4wYjNBdFkyOXNiM0k5SWlObE9HVTRaVGdpSUhOMGIzQXRiM0JoWTJsMGVUMGlNU0l2UGdvZ0lEd3ZiR2x1WldGeVIzSmhaR2xsYm5RK0NpQWdQSEpsWTNRZ2VEMGlNQ0lnZVQwaU1DSWdkMmxrZEdnOUlqRWlJR2hsYVdkb2REMGlNU0lnWm1sc2JEMGlkWEpzS0NObmNtRmtMWFZqWjJjdFoyVnVaWEpoZEdWa0tTSWdMejRLUEM5emRtYyspO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCNkYmRiZGIgMCwjZThlOGU4IDEwMCUpO2JvcmRlci1yYWRpdXM6MTBweH0uc2Nyb2xsYmFyLWxpZ2h0Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteHtib3R0b206MDtoZWlnaHQ6MTdweDtsZWZ0OjA7bWluLXdpZHRoOjEwMCU7d2lkdGg6MTAwJX0uc2Nyb2xsYmFyLWxpZ2h0Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteXtoZWlnaHQ6MTAwJTttaW4taGVpZ2h0OjEwMCU7cmlnaHQ6MDt0b3A6MDt3aWR0aDoxN3B4fS5zY3JvbGxiYXItbGlnaHQ+LnNjcm9sbC1lbGVtZW50IC5zY3JvbGwtYmFye2JhY2tncm91bmQ6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlBL1BnbzhjM1puSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlnZDJsa2RHZzlJakV3TUNVaUlHaGxhV2RvZEQwaU1UQXdKU0lnZG1sbGQwSnZlRDBpTUNBd0lERWdNU0lnY0hKbGMyVnlkbVZCYzNCbFkzUlNZWFJwYnowaWJtOXVaU0krQ2lBZ1BHeHBibVZoY2tkeVlXUnBaVzUwSUdsa1BTSm5jbUZrTFhWaloyY3RaMlZ1WlhKaGRHVmtJaUJuY21Ga2FXVnVkRlZ1YVhSelBTSjFjMlZ5VTNCaFkyVlBibFZ6WlNJZ2VERTlJakFsSWlCNU1UMGlNQ1VpSUhneVBTSXhNREFsSWlCNU1qMGlNQ1VpUGdvZ0lDQWdQSE4wYjNBZ2IyWm1jMlYwUFNJd0pTSWdjM1J2Y0MxamIyeHZjajBpSTJabFptVm1aU0lnYzNSdmNDMXZjR0ZqYVhSNVBTSXhJaTgrQ2lBZ0lDQThjM1J2Y0NCdlptWnpaWFE5SWpFd01DVWlJSE4wYjNBdFkyOXNiM0k5SWlObU5XWTFaalVpSUhOMGIzQXRiM0JoWTJsMGVUMGlNU0l2UGdvZ0lEd3ZiR2x1WldGeVIzSmhaR2xsYm5RK0NpQWdQSEpsWTNRZ2VEMGlNQ0lnZVQwaU1DSWdkMmxrZEdnOUlqRWlJR2hsYVdkb2REMGlNU0lnWm1sc2JEMGlkWEpzS0NObmNtRmtMWFZqWjJjdFoyVnVaWEpoZEdWa0tTSWdMejRLUEM5emRtYyspO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCNmZWZlZmUgMCwjZjVmNWY1IDEwMCUpO2JvcmRlcjoxcHggc29saWQgI2RiZGJkYjtib3JkZXItcmFkaXVzOjEwcHh9LnNjcm9sbGJhci1saWdodD4uc2Nyb2xsLWNvbnRlbnQuc2Nyb2xsLXNjcm9sbHlfdmlzaWJsZXtsZWZ0Oi0xN3B4O21hcmdpbi1sZWZ0OjE3cHh9LnNjcm9sbGJhci1saWdodD4uc2Nyb2xsLWNvbnRlbnQuc2Nyb2xsLXNjcm9sbHhfdmlzaWJsZXt0b3A6LTE3cHg7bWFyZ2luLXRvcDoxN3B4fS5zY3JvbGxiYXItbGlnaHQ+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC14IC5zY3JvbGwtYmFye2hlaWdodDoxMHB4O21pbi13aWR0aDoxMHB4O3RvcDowfS5zY3JvbGxiYXItbGlnaHQ+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC15IC5zY3JvbGwtYmFye2xlZnQ6MDttaW4taGVpZ2h0OjEwcHg7d2lkdGg6MTBweH0uc2Nyb2xsYmFyLWxpZ2h0Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteCAuc2Nyb2xsLWVsZW1lbnRfb3V0ZXJ7aGVpZ2h0OjEycHg7bGVmdDoycHg7dG9wOjJweH0uc2Nyb2xsYmFyLWxpZ2h0Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteCAuc2Nyb2xsLWVsZW1lbnRfc2l6ZXtsZWZ0Oi00cHh9LnNjcm9sbGJhci1saWdodD4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXkgLnNjcm9sbC1lbGVtZW50X291dGVye2xlZnQ6MnB4O3RvcDoycHg7d2lkdGg6MTJweH0uc2Nyb2xsYmFyLWxpZ2h0Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteSAuc2Nyb2xsLWVsZW1lbnRfc2l6ZXt0b3A6LTRweH0uc2Nyb2xsYmFyLWxpZ2h0Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteC5zY3JvbGwtc2Nyb2xseV92aXNpYmxlIC5zY3JvbGwtZWxlbWVudF9zaXple2xlZnQ6LTE5cHh9LnNjcm9sbGJhci1saWdodD4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXkuc2Nyb2xsLXNjcm9sbHhfdmlzaWJsZSAuc2Nyb2xsLWVsZW1lbnRfc2l6ZXt0b3A6LTE5cHh9LnNjcm9sbGJhci1saWdodD4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXguc2Nyb2xsLXNjcm9sbHlfdmlzaWJsZSAuc2Nyb2xsLWVsZW1lbnRfdHJhY2t7bGVmdDotMTlweH0uc2Nyb2xsYmFyLWxpZ2h0Pi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteS5zY3JvbGwtc2Nyb2xseF92aXNpYmxlIC5zY3JvbGwtZWxlbWVudF90cmFja3t0b3A6LTE5cHh9LnNjcm9sbGJhci1yYWlsPi5zY3JvbGwtZWxlbWVudCwuc2Nyb2xsYmFyLXJhaWw+LnNjcm9sbC1lbGVtZW50IGRpdntib3JkZXI6bm9uZTttYXJnaW46MDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTB9LnNjcm9sbGJhci1yYWlsPi5zY3JvbGwtZWxlbWVudHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LnNjcm9sbGJhci1yYWlsPi5zY3JvbGwtZWxlbWVudCBkaXZ7ZGlzcGxheTpibG9jaztoZWlnaHQ6MTAwJTtsZWZ0OjA7dG9wOjA7d2lkdGg6MTAwJX0uc2Nyb2xsYmFyLXJhaWw+LnNjcm9sbC1lbGVtZW50IC5zY3JvbGwtZWxlbWVudF9zaXple2JhY2tncm91bmQtY29sb3I6Izk5OTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjMpfS5zY3JvbGxiYXItcmFpbD4uc2Nyb2xsLWVsZW1lbnQgLnNjcm9sbC1lbGVtZW50X291dGVyOmhvdmVyIC5zY3JvbGwtZWxlbWVudF9zaXple2JhY2tncm91bmQtY29sb3I6IzY2NjtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjUpfS5zY3JvbGxiYXItcmFpbD4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXh7Ym90dG9tOjA7aGVpZ2h0OjEycHg7bGVmdDowO21pbi13aWR0aDoxMDAlO3BhZGRpbmc6M3B4IDAgMnB4O3dpZHRoOjEwMCV9LnNjcm9sbGJhci1yYWlsPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteXtoZWlnaHQ6MTAwJTttaW4taGVpZ2h0OjEwMCU7cGFkZGluZzowIDJweCAwIDNweDtyaWdodDowO3RvcDowO3dpZHRoOjEycHh9LnNjcm9sbGJhci1yYWlsPi5zY3JvbGwtZWxlbWVudCAuc2Nyb2xsLWJhcntiYWNrZ3JvdW5kLWNvbG9yOiNkMGI5YTA7Ym9yZGVyLXJhZGl1czoycHg7Ym94LXNoYWRvdzoxcHggMXB4IDNweCByZ2JhKDAsMCwwLC41KX0uc2Nyb2xsYmFyLXJhaWw+LnNjcm9sbC1lbGVtZW50IC5zY3JvbGwtZWxlbWVudF9vdXRlcjpob3ZlciAuc2Nyb2xsLWJhcntib3gtc2hhZG93OjFweCAxcHggM3B4IHJnYmEoMCwwLDAsLjYpfS5zY3JvbGxiYXItcmFpbD4uc2Nyb2xsLWNvbnRlbnQuc2Nyb2xsLXNjcm9sbHlfdmlzaWJsZXtsZWZ0Oi0xN3B4O21hcmdpbi1sZWZ0OjE3cHh9LnNjcm9sbGJhci1yYWlsPi5zY3JvbGwtY29udGVudC5zY3JvbGwtc2Nyb2xseF92aXNpYmxle21hcmdpbi10b3A6MTdweDt0b3A6LTE3cHh9LnNjcm9sbGJhci1yYWlsPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteCAuc2Nyb2xsLWJhcntoZWlnaHQ6MTBweDttaW4td2lkdGg6MTBweDt0b3A6MXB4fS5zY3JvbGxiYXItcmFpbD4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXkgLnNjcm9sbC1iYXJ7bGVmdDoxcHg7bWluLWhlaWdodDoxMHB4O3dpZHRoOjEwcHh9LnNjcm9sbGJhci1yYWlsPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteCAuc2Nyb2xsLWVsZW1lbnRfb3V0ZXJ7aGVpZ2h0OjE1cHg7bGVmdDo1cHh9LnNjcm9sbGJhci1yYWlsPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteCAuc2Nyb2xsLWVsZW1lbnRfc2l6ZXtoZWlnaHQ6MnB4O2xlZnQ6LTEwcHg7dG9wOjVweH0uc2Nyb2xsYmFyLXJhaWw+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC15IC5zY3JvbGwtZWxlbWVudF9vdXRlcnt0b3A6NXB4O3dpZHRoOjE1cHh9LnNjcm9sbGJhci1yYWlsPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteSAuc2Nyb2xsLWVsZW1lbnRfc2l6ZXtsZWZ0OjVweDt0b3A6LTEwcHg7d2lkdGg6MnB4fS5zY3JvbGxiYXItcmFpbD4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXguc2Nyb2xsLXNjcm9sbHlfdmlzaWJsZSAuc2Nyb2xsLWVsZW1lbnRfc2l6ZXtsZWZ0Oi0yNXB4fS5zY3JvbGxiYXItcmFpbD4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXkuc2Nyb2xsLXNjcm9sbHhfdmlzaWJsZSAuc2Nyb2xsLWVsZW1lbnRfc2l6ZXt0b3A6LTI1cHh9LnNjcm9sbGJhci1yYWlsPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteC5zY3JvbGwtc2Nyb2xseV92aXNpYmxlIC5zY3JvbGwtZWxlbWVudF90cmFja3tsZWZ0Oi0yNXB4fS5zY3JvbGxiYXItcmFpbD4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXkuc2Nyb2xsLXNjcm9sbHhfdmlzaWJsZSAuc2Nyb2xsLWVsZW1lbnRfdHJhY2t7dG9wOi0yNXB4fS5zY3JvbGxiYXItZHluYW1pYz4uc2Nyb2xsLWVsZW1lbnQsLnNjcm9sbGJhci1keW5hbWljPi5zY3JvbGwtZWxlbWVudCBkaXZ7YmFja2dyb3VuZDowIDA7Ym9yZGVyOm5vbmU7bWFyZ2luOjA7cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTB9LnNjcm9sbGJhci1keW5hbWljPi5zY3JvbGwtZWxlbWVudCBkaXZ7ZGlzcGxheTpibG9jaztoZWlnaHQ6MTAwJTtsZWZ0OjA7dG9wOjA7d2lkdGg6MTAwJX0uc2Nyb2xsYmFyLWR5bmFtaWM+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC14e2JvdHRvbToycHg7aGVpZ2h0OjdweDtsZWZ0OjA7bWluLXdpZHRoOjEwMCU7d2lkdGg6MTAwJX0uc2Nyb2xsYmFyLWR5bmFtaWM+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC15e2hlaWdodDoxMDAlO21pbi1oZWlnaHQ6MTAwJTtyaWdodDoycHg7dG9wOjA7d2lkdGg6N3B4fS5zY3JvbGxiYXItZHluYW1pYz4uc2Nyb2xsLWVsZW1lbnQgLnNjcm9sbC1lbGVtZW50X291dGVye29wYWNpdHk6LjM7Ym9yZGVyLXJhZGl1czoxMnB4fS5zY3JvbGxiYXItZHluYW1pYz4uc2Nyb2xsLWVsZW1lbnQgLnNjcm9sbC1lbGVtZW50X3NpemV7YmFja2dyb3VuZC1jb2xvcjojY2NjO29wYWNpdHk6MDtib3JkZXItcmFkaXVzOjEycHg7dHJhbnNpdGlvbjpvcGFjaXR5IC4yc30uc2Nyb2xsYmFyLWR5bmFtaWM+LnNjcm9sbC1lbGVtZW50IC5zY3JvbGwtYmFye2JhY2tncm91bmQtY29sb3I6IzZjNmU3MTtib3JkZXItcmFkaXVzOjdweH0uc2Nyb2xsYmFyLWR5bmFtaWM+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC14IC5zY3JvbGwtYmFye2JvdHRvbTowO2hlaWdodDo3cHg7bWluLXdpZHRoOjI0cHg7dG9wOmF1dG99LnNjcm9sbGJhci1keW5hbWljPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteSAuc2Nyb2xsLWJhcntsZWZ0OmF1dG87bWluLWhlaWdodDoyNHB4O3JpZ2h0OjA7d2lkdGg6N3B4fS5zY3JvbGxiYXItZHluYW1pYz4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXggLnNjcm9sbC1lbGVtZW50X291dGVye2JvdHRvbTowO3RvcDphdXRvO2xlZnQ6MnB4O3RyYW5zaXRpb246aGVpZ2h0IC4yc30uc2Nyb2xsYmFyLWR5bmFtaWM+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC15IC5zY3JvbGwtZWxlbWVudF9vdXRlcntsZWZ0OmF1dG87cmlnaHQ6MDt0b3A6MnB4O3RyYW5zaXRpb246d2lkdGggLjJzfS5zY3JvbGxiYXItZHluYW1pYz4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXggLnNjcm9sbC1lbGVtZW50X3NpemV7bGVmdDotNHB4fS5zY3JvbGxiYXItZHluYW1pYz4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXkgLnNjcm9sbC1lbGVtZW50X3NpemV7dG9wOi00cHh9LnNjcm9sbGJhci1keW5hbWljPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteC5zY3JvbGwtc2Nyb2xseV92aXNpYmxlIC5zY3JvbGwtZWxlbWVudF9zaXple2xlZnQ6LTExcHh9LnNjcm9sbGJhci1keW5hbWljPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteS5zY3JvbGwtc2Nyb2xseF92aXNpYmxlIC5zY3JvbGwtZWxlbWVudF9zaXple3RvcDotMTFweH0uc2Nyb2xsYmFyLWR5bmFtaWM+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC1kcmFnZ2FibGUgLnNjcm9sbC1lbGVtZW50X291dGVyLC5zY3JvbGxiYXItZHluYW1pYz4uc2Nyb2xsLWVsZW1lbnQ6aG92ZXIgLnNjcm9sbC1lbGVtZW50X291dGVye292ZXJmbG93OmhpZGRlbjstbXMtZmlsdGVyOlxcXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQWxwaGEoT3BhY2l0eT03MClcXFwiO2ZpbHRlcjphbHBoYShvcGFjaXR5PTcwKTtvcGFjaXR5Oi43fS5zY3JvbGxiYXItZHluYW1pYz4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLWRyYWdnYWJsZSAuc2Nyb2xsLWVsZW1lbnRfb3V0ZXIgLnNjcm9sbC1lbGVtZW50X3NpemUsLnNjcm9sbGJhci1keW5hbWljPi5zY3JvbGwtZWxlbWVudDpob3ZlciAuc2Nyb2xsLWVsZW1lbnRfb3V0ZXIgLnNjcm9sbC1lbGVtZW50X3NpemV7b3BhY2l0eToxfS5zY3JvbGxiYXItZHluYW1pYz4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLWRyYWdnYWJsZSAuc2Nyb2xsLWVsZW1lbnRfb3V0ZXIgLnNjcm9sbC1iYXIsLnNjcm9sbGJhci1keW5hbWljPi5zY3JvbGwtZWxlbWVudDpob3ZlciAuc2Nyb2xsLWVsZW1lbnRfb3V0ZXIgLnNjcm9sbC1iYXJ7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtib3JkZXItcmFkaXVzOjEycHh9LnNjcm9sbGJhci1keW5hbWljPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteC5zY3JvbGwtZHJhZ2dhYmxlIC5zY3JvbGwtZWxlbWVudF9vdXRlciwuc2Nyb2xsYmFyLWR5bmFtaWM+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC14OmhvdmVyIC5zY3JvbGwtZWxlbWVudF9vdXRlcntoZWlnaHQ6MjBweDttaW4taGVpZ2h0OjdweH0uc2Nyb2xsYmFyLWR5bmFtaWM+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC15LnNjcm9sbC1kcmFnZ2FibGUgLnNjcm9sbC1lbGVtZW50X291dGVyLC5zY3JvbGxiYXItZHluYW1pYz4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXk6aG92ZXIgLnNjcm9sbC1lbGVtZW50X291dGVye21pbi13aWR0aDo3cHg7d2lkdGg6MjBweH0uc2Nyb2xsYmFyLWNocm9tZT4uc2Nyb2xsLWVsZW1lbnQsLnNjcm9sbGJhci1jaHJvbWU+LnNjcm9sbC1lbGVtZW50IGRpdntib3JkZXI6bm9uZTttYXJnaW46MDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTB9LnNjcm9sbGJhci1jaHJvbWU+LnNjcm9sbC1lbGVtZW50e2JhY2tncm91bmQtY29sb3I6I2ZmZn0uc2Nyb2xsYmFyLWNocm9tZT4uc2Nyb2xsLWVsZW1lbnQgZGl2e2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjEwMCU7bGVmdDowO3RvcDowO3dpZHRoOjEwMCV9LnNjcm9sbGJhci1jaHJvbWU+LnNjcm9sbC1lbGVtZW50IC5zY3JvbGwtZWxlbWVudF90cmFja3tiYWNrZ3JvdW5kOiNmMWYxZjE7Ym9yZGVyOjFweCBzb2xpZCAjZGJkYmRifS5zY3JvbGxiYXItY2hyb21lPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteHtib3R0b206MDtoZWlnaHQ6MTZweDtsZWZ0OjA7bWluLXdpZHRoOjEwMCU7d2lkdGg6MTAwJX0uc2Nyb2xsYmFyLWNocm9tZT4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXl7aGVpZ2h0OjEwMCU7bWluLWhlaWdodDoxMDAlO3JpZ2h0OjA7dG9wOjA7d2lkdGg6MTZweH0uc2Nyb2xsYmFyLWNocm9tZT4uc2Nyb2xsLWVsZW1lbnQgLnNjcm9sbC1iYXJ7YmFja2dyb3VuZC1jb2xvcjojZDlkOWQ5O2JvcmRlcjoxcHggc29saWQgI2JkYmRiZDtjdXJzb3I6ZGVmYXVsdDtib3JkZXItcmFkaXVzOjJweH0uc2Nyb2xsYmFyLWNocm9tZT4uc2Nyb2xsLWVsZW1lbnQgLnNjcm9sbC1iYXI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojYzJjMmMyO2JvcmRlci1jb2xvcjojYTlhOWE5fS5zY3JvbGxiYXItY2hyb21lPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwtZHJhZ2dhYmxlIC5zY3JvbGwtYmFye2JhY2tncm91bmQtY29sb3I6IzkxOTE5MTtib3JkZXItY29sb3I6IzdlN2U3ZX0uc2Nyb2xsYmFyLWNocm9tZT4uc2Nyb2xsLWNvbnRlbnQuc2Nyb2xsLXNjcm9sbHlfdmlzaWJsZXtsZWZ0Oi0xNnB4O21hcmdpbi1sZWZ0OjE2cHh9LnNjcm9sbGJhci1jaHJvbWU+LnNjcm9sbC1jb250ZW50LnNjcm9sbC1zY3JvbGx4X3Zpc2libGV7dG9wOi0xNnB4O21hcmdpbi10b3A6MTZweH0uc2Nyb2xsYmFyLWNocm9tZT4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXggLnNjcm9sbC1iYXJ7aGVpZ2h0OjhweDttaW4td2lkdGg6MTBweDt0b3A6M3B4fS5zY3JvbGxiYXItY2hyb21lPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteSAuc2Nyb2xsLWJhcntsZWZ0OjNweDttaW4taGVpZ2h0OjEwcHg7d2lkdGg6OHB4fS5zY3JvbGxiYXItY2hyb21lPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteCAuc2Nyb2xsLWVsZW1lbnRfb3V0ZXJ7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNkYmRiZGJ9LnNjcm9sbGJhci1jaHJvbWU+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC14IC5zY3JvbGwtZWxlbWVudF90cmFja3toZWlnaHQ6MTRweDtsZWZ0Oi0zcHh9LnNjcm9sbGJhci1jaHJvbWU+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC14IC5zY3JvbGwtZWxlbWVudF9zaXple2hlaWdodDoxNHB4O2xlZnQ6LTRweH0uc2Nyb2xsYmFyLWNocm9tZT4uc2Nyb2xsLWVsZW1lbnQuc2Nyb2xsLXkgLnNjcm9sbC1lbGVtZW50X291dGVye2JvcmRlci10b3A6MXB4IHNvbGlkICNkYmRiZGJ9LnNjcm9sbGJhci1jaHJvbWU+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC15IC5zY3JvbGwtZWxlbWVudF90cmFja3t0b3A6LTNweDt3aWR0aDoxNHB4fS5zY3JvbGxiYXItY2hyb21lPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteSAuc2Nyb2xsLWVsZW1lbnRfc2l6ZXt0b3A6LTRweDt3aWR0aDoxNHB4fS5zY3JvbGxiYXItY2hyb21lPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteC5zY3JvbGwtc2Nyb2xseV92aXNpYmxlIC5zY3JvbGwtZWxlbWVudF9zaXple2xlZnQ6LTE5cHh9LnNjcm9sbGJhci1jaHJvbWU+LnNjcm9sbC1lbGVtZW50LnNjcm9sbC15LnNjcm9sbC1zY3JvbGx4X3Zpc2libGUgLnNjcm9sbC1lbGVtZW50X3NpemV7dG9wOi0xOXB4fS5zY3JvbGxiYXItY2hyb21lPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteC5zY3JvbGwtc2Nyb2xseV92aXNpYmxlIC5zY3JvbGwtZWxlbWVudF90cmFja3tsZWZ0Oi0xOXB4fS5zY3JvbGxiYXItY2hyb21lPi5zY3JvbGwtZWxlbWVudC5zY3JvbGwteS5zY3JvbGwtc2Nyb2xseF92aXNpYmxlIC5zY3JvbGwtZWxlbWVudF90cmFja3t0b3A6LTE5cHh9XFxuXCIgK1xuXCIvKipcXG5cIiArXG5cIiAqIE1pbmlmaWVkIHN0eWxlLlxcblwiICtcblwiICogT3JpZ2luYWwgZmlsZW5hbWU6IFxcXFxzcmNcXFxcc3R5bGVzXFxcXHN0eWxlLmNzc1xcblwiICtcblwiICovXFxuXCIgK1xuXCJALXdlYmtpdC1rZXlmcmFtZXMgc3BpbnsxMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QGtleWZyYW1lcyBzcGluezEwMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfX0jZW1vdGUtbWVudS1idXR0b257YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCSUFBQUFRQ0FZQUFBQWJCaTljQUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBQUpjRWhaY3dBQURzTUFBQTdEQWNkdnFHUUFBQUtVU1VSQlZEaFBmWlROaTFKUkdNWnZNSXNXVVp0czVTSVhGWUswQ01FL0lHZ2h4VkM3V1VvVTFOQml4SSttUlNENE1Rem14emlLTzNYVUJoUm1VR1pLZEJHNDBYRUdVNmQwR0ZHWmNUNHF4VzFoaTdmenZOd1pxS3dERDV6N3ZzL3Z1ZWVlZSs2Vk1KeE81d1VoaGR2dGZ1SHorVDR0TFMyTmhlZ2ZHc01ETHhpd0hJSWhMaTU3UEo3NVZDcjFZMzkvbjRiRElZMUdvNGxDRHg1NHdZQ1ZZempvVmpRYS9keHV0eWZDa3dTdllKcGdPU1FmNzA4dHVCYTF5V1J5L0wrVi9DbDR3WUJGaGhUeGZMaHVtL2VzaWlKMXUxMktSQ0prc1Zob2ZYMmRUazVPemtITVVVTVBIbmpCMkY1NVZwRWhQZGUvTGJ4OEZxQkVJa0hwZEpvTUJnTnB0VnJTNlhSVXFWVE9nN2EzdDJsbVpvYjBlajJwMVdyMmdnR0xET25KM1FTWkg0Y29Iby9UeXNvS2h5Z1VDdEpvTkZRc0Zta3dHTEF3UjdoU3FTU1ZTc1ZlTUdDUklUMjlGNmZYSmk4WHkrVXltYzFtbXA2ZUpvZkRRZlY2blU1UFQxbVkyKzEyN3VIeFNxVVNoNEZGaGhRTHZydnRjcm0rWXBrSEJ3ZFVyVlpwYTJ1TGFyVWFkVG9kT2p3OFpHR09HbnJ3d0FzR0xETHcxaTR1THJ6UlllT09qNDlwYjIrUGRuZDNxZFZxOFN0R0FJUTVhbzFHZ3ozd2dnR0xERDRDNGl6Y0VjV2ZSMGRIYk1ybGNyU3hzY0dialZBSUs4bG1zN1M1dWNtQi9YNmZYejlZRHNFUUZ6ZGpzVml0Mld6eXFjMWtNcndmVnF1VmpFWWp6YzNOa2Nsa0lwdk5SbXRyYSt5QlZ6QWZCWHREanVHZ1M4RmdjRmJjOFF2dWhqTlNLQlFvRkFxUjZMRkVuL0w1UFBmZ2dYZDVlWGtXckJ6RFFkQzFRQ0JnRm9ldXQ3T3p3L3R5QnAyRlF6aFB3dE9GRnd6WTM0WW80QTl3Ulh6ZEQ4TGhjRTQ4d25jRTlubzlGdWFvaWQ1NzRia1BMeGdaLzN1STVwVFFWZkZsUC9MNy9XbWhiN0pTWHEvM0lYcnd5SFo1U05JdkdDbnF5aCtKNytnQUFBQUFTVVZPUks1Q1lJST0pIWltcG9ydGFudDtiYWNrZ3JvdW5kLXBvc2l0aW9uOjUwJTtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7Y3Vyc29yOnBvaW50ZXI7aGVpZ2h0OjMwcHg7d2lkdGg6MzBweH0jZW1vdGUtbWVudS1idXR0b246Zm9jdXN7Ym94LXNoYWRvdzpub25lfSNlbW90ZS1tZW51LWJ1dHRvbi5hY3RpdmV7Ym94LXNoYWRvdzowIDAgNnB4IDAgIzdkNWJiZSxpbnNldCAwIDAgMCAxcHggcmdiYSgxMDAsNjUsMTY0LC41KX0uZW1vdGUtbWVudXtwYWRkaW5nOjVweDt6LWluZGV4OjEwMDA7ZGlzcGxheTpub25lO2JhY2tncm91bmQtY29sb3I6IzIwMjAyMDtwb3NpdGlvbjphYnNvbHV0ZX0uZW1vdGUtbWVudSBhe2NvbG9yOiNmZmZ9LmVtb3RlLW1lbnUgYTpob3ZlcntjdXJzb3I6cG9pbnRlcjt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lO2NvbG9yOiNjY2N9LmVtb3RlLW1lbnUgLmVtb3Rlcy1zdGFycmVke2hlaWdodDozOHB4fS5lbW90ZS1tZW51IC5kcmFnZ2FibGV7YmFja2dyb3VuZC1pbWFnZTpyZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDQ1ZGVnLHRyYW5zcGFyZW50LHRyYW5zcGFyZW50IDVweCxyZ2JhKDI1NSwyNTUsMjU1LC4wNSkgNXB4LHJnYmEoMjU1LDI1NSwyNTUsLjA1KSAxMHB4KTtjdXJzb3I6bW92ZTtoZWlnaHQ6N3B4O21hcmdpbi1ib3R0b206M3B4fS5lbW90ZS1tZW51IC5kcmFnZ2FibGU6aG92ZXJ7YmFja2dyb3VuZC1pbWFnZTpyZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDQ1ZGVnLHRyYW5zcGFyZW50LHRyYW5zcGFyZW50IDVweCxyZ2JhKDI1NSwyNTUsMjU1LC4xKSA1cHgscmdiYSgyNTUsMjU1LDI1NSwuMSkgMTBweCl9LmVtb3RlLW1lbnUgLmhlYWRlci1pbmZve2JvcmRlci10b3A6MXB4IHNvbGlkICMwMDA7Ym94LXNoYWRvdzowIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjA1KSBpbnNldDtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCh0byB0b3AsdHJhbnNwYXJlbnQscmdiYSgwLDAsMCwuNSkpO3BhZGRpbmc6MnB4O2NvbG9yOiNkZGQ7dGV4dC1hbGlnbjpjZW50ZXI7cG9zaXRpb246cmVsYXRpdmV9LmVtb3RlLW1lbnUgLmhlYWRlci1pbmZvIGltZ3ttYXJnaW4tcmlnaHQ6OHB4fS5lbW90ZS1tZW51IC5lbW90ZXtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjJweDttYXJnaW46MXB4O2N1cnNvcjpwb2ludGVyO2JvcmRlci1yYWRpdXM6NXB4O3RleHQtYWxpZ246Y2VudGVyO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHg7dHJhbnNpdGlvbjphbGwgLjI1cyBlYXNlO2JvcmRlcjoxcHggc29saWQgdHJhbnNwYXJlbnR9LmVtb3RlLW1lbnUuZWRpdGluZyAuZW1vdGV7Y3Vyc29yOmF1dG99LmVtb3RlLW1lbnUgLmVtb3RlIGltZ3ttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCU7bWFyZ2luOmF1dG87cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjB9LmVtb3RlLW1lbnUgLnNpbmdsZS1yb3cgLmVtb3RlLWNvbnRhaW5lcntvdmVyZmxvdzpoaWRkZW47aGVpZ2h0OjM3cHh9LmVtb3RlLW1lbnUgLnNpbmdsZS1yb3cgLmVtb3Rle2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1ib3R0b206MTAwcHh9LmVtb3RlLW1lbnUgLmVtb3RlOmhvdmVye2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuMSl9LmVtb3RlLW1lbnUgLnB1bGwtbGVmdHtmbG9hdDpsZWZ0fS5lbW90ZS1tZW51IC5wdWxsLXJpZ2h0e2Zsb2F0OnJpZ2h0fS5lbW90ZS1tZW51IC5mb290ZXJ7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXRvcDoxcHggc29saWQgIzAwMDtib3gtc2hhZG93OjAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwuMDUpIGluc2V0O3BhZGRpbmc6NXB4IDAgMnB4O21hcmdpbi10b3A6NXB4O2hlaWdodDoxOHB4fS5lbW90ZS1tZW51IC5mb290ZXIgLnB1bGwtbGVmdHttYXJnaW4tcmlnaHQ6NXB4fS5lbW90ZS1tZW51IC5mb290ZXIgLnB1bGwtcmlnaHR7bWFyZ2luLWxlZnQ6NXB4fS5lbW90ZS1tZW51IC5pY29ue2hlaWdodDoxNnB4O3dpZHRoOjE2cHg7b3BhY2l0eTouNTtiYWNrZ3JvdW5kLXNpemU6Y29udGFpbiFpbXBvcnRhbnR9LmVtb3RlLW1lbnUgLmljb246aG92ZXJ7b3BhY2l0eToxfS5lbW90ZS1tZW51IC5pY29uLWhvbWV7YmFja2dyb3VuZDp1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lJSE4wWVc1a1lXeHZibVU5SW01dklqOCtEUW84SVMwdElFTnlaV0YwWldRZ2QybDBhQ0JKYm10elkyRndaU0FvYUhSMGNEb3ZMM2QzZHk1cGJtdHpZMkZ3WlM1dmNtY3ZLU0F0TFQ0TkNnMEtQSE4yWncwS0lDQWdlRzFzYm5NNlpHTTlJbWgwZEhBNkx5OXdkWEpzTG05eVp5OWtZeTlsYkdWdFpXNTBjeTh4TGpFdklnMEtJQ0FnZUcxc2JuTTZZMk05SW1oMGRIQTZMeTlqY21WaGRHbDJaV052YlcxdmJuTXViM0puTDI1ekl5SU5DaUFnSUhodGJHNXpPbkprWmowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzh3TWk4eU1pMXlaR1l0YzNsdWRHRjRMVzV6SXlJTkNpQWdJSGh0Ykc1ek9uTjJaejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpRFFvZ0lDQjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaURRb2dJQ0IyWlhKemFXOXVQU0l4TGpFaURRb2dJQ0IzYVdSMGFEMGlOalFpRFFvZ0lDQm9aV2xuYUhROUlqWTBJZzBLSUNBZ2RtbGxkMEp2ZUQwaU1DQXdJRFkwSURZMElnMEtJQ0FnYVdROUlrTmhjR0ZmTVNJTkNpQWdJSGh0YkRwemNHRmpaVDBpY0hKbGMyVnlkbVVpUGp4dFpYUmhaR0YwWVEwS0lDQWdhV1E5SW0xbGRHRmtZWFJoTXpBd01TSStQSEprWmpwU1JFWStQR05qT2xkdmNtc05DaUFnSUNBZ0lDQnlaR1k2WVdKdmRYUTlJaUkrUEdSak9tWnZjbTFoZEQ1cGJXRm5aUzl6ZG1jcmVHMXNQQzlrWXpwbWIzSnRZWFErUEdSak9uUjVjR1VOQ2lBZ0lDQWdJQ0FnSUhKa1pqcHlaWE52ZFhKalpUMGlhSFIwY0RvdkwzQjFjbXd1YjNKbkwyUmpMMlJqYldsMGVYQmxMMU4wYVd4c1NXMWhaMlVpSUM4K1BHUmpPblJwZEd4bFBqd3ZaR002ZEdsMGJHVStQQzlqWXpwWGIzSnJQand2Y21SbU9sSkVSajQ4TDIxbGRHRmtZWFJoUGp4a1pXWnpEUW9nSUNCcFpEMGlaR1ZtY3pJNU9Ua2lJQzgrRFFvOGNHRjBhQTBLSUNBZ1pEMGliU0ExTnk0d05qSXNNekV1TXprNElHTWdNQzQ1TXpJc0xURXVNREkxSURBdU9EUXlMQzB5TGpVNU5pQXRNQzR5TURFc0xUTXVOVEE0SUV3Z016TXVPRGcwTERjdU56ZzFJRU1nTXpJdU9EUXhMRFl1T0RjeklETXhMakUyT1N3MkxqZzVNaUF6TUM0eE5EZ3NOeTQ0TWpnZ1RDQTNMakE1TXl3eU9DNDVOaklnWXlBdE1TNHdNakVzTUM0NU16WWdMVEV1TURjeExESXVOVEExSUMwd0xqRXhNU3d6TGpVd015QnNJREF1TlRjNExEQXVOakF5SUdNZ01DNDVOVGtzTUM0NU9UZ2dNaTQxTURrc01TNHhNVGNnTXk0ME5pd3dMakkyTlNCc0lERXVOekl6TEMweExqVTBNeUIySURJeUxqVTVJR01nTUN3eExqTTROaUF4TGpFeU15d3lMalV3T0NBeUxqVXdPQ3d5TGpVd09DQm9JRGd1T1RnM0lHTWdNUzR6T0RVc01DQXlMalV3T0N3dE1TNHhNaklnTWk0MU1EZ3NMVEl1TlRBNElGWWdNemd1TlRjMUlHZ2dNVEV1TkRZeklIWWdNVFV1T0RBMElHTWdMVEF1TURJc01TNHpPRFVnTUM0NU56RXNNaTQxTURjZ01pNHpOVFlzTWk0MU1EY2dhQ0E1TGpVeU5DQmpJREV1TXpnMUxEQWdNaTQxTURnc0xURXVNVEl5SURJdU5UQTRMQzB5TGpVd09DQldJRE15TGpFd055QmpJREFzTUNBd0xqUTNOaXd3TGpReE55QXhMakEyTXl3d0xqa3pNeUF3TGpVNE5pd3dMalV4TlNBeExqZ3hOeXd3TGpFd01pQXlMamMwT1N3dE1DNDVNalFnYkNBd0xqWTFNeXd0TUM0M01UZ2dlaUlOQ2lBZ0lHbGtQU0p3WVhSb01qazVOU0lOQ2lBZ0lITjBlV3hsUFNKbWFXeHNPaU5tWm1abVptWTdabWxzYkMxdmNHRmphWFI1T2pFaUlDOCtEUW84TDNOMlp6ND0pIDUwJSBuby1yZXBlYXR9LmVtb3RlLW1lbnUgLmljb24tZ2VhcntiYWNrZ3JvdW5kOnVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaUlITjBZVzVrWVd4dmJtVTlJbTV2SWo4K0RRbzhJUzB0SUVOeVpXRjBaV1FnZDJsMGFDQkpibXR6WTJGd1pTQW9hSFIwY0RvdkwzZDNkeTVwYm10elkyRndaUzV2Y21jdktTQXRMVDROQ2cwS1BITjJadzBLSUNBZ2VHMXNibk02WkdNOUltaDBkSEE2THk5d2RYSnNMbTl5Wnk5a1l5OWxiR1Z0Wlc1MGN5OHhMakV2SWcwS0lDQWdlRzFzYm5NNlkyTTlJbWgwZEhBNkx5OWpjbVZoZEdsMlpXTnZiVzF2Ym5NdWIzSm5MMjV6SXlJTkNpQWdJSGh0Ykc1ek9uSmtaajBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOHdNaTh5TWkxeVpHWXRjM2x1ZEdGNExXNXpJeUlOQ2lBZ0lIaHRiRzV6T25OMlp6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lEUW9nSUNCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpRFFvZ0lDQjJaWEp6YVc5dVBTSXhMakVpRFFvZ0lDQjNhV1IwYUQwaU1qRXVOVGtpRFFvZ0lDQm9aV2xuYUhROUlqSXhMakV6TmprNU9TSU5DaUFnSUhacFpYZENiM2c5SWpBZ01DQXlNUzQxT1NBeU1TNHhNemNpRFFvZ0lDQnBaRDBpUTJGd1lWOHhJZzBLSUNBZ2VHMXNPbk53WVdObFBTSndjbVZ6WlhKMlpTSStQRzFsZEdGa1lYUmhEUW9nSUNCcFpEMGliV1YwWVdSaGRHRXpPU0krUEhKa1pqcFNSRVkrUEdOak9sZHZjbXNOQ2lBZ0lDQWdJQ0J5WkdZNllXSnZkWFE5SWlJK1BHUmpPbVp2Y20xaGRENXBiV0ZuWlM5emRtY3JlRzFzUEM5a1l6cG1iM0p0WVhRK1BHUmpPblI1Y0dVTkNpQWdJQ0FnSUNBZ0lISmtaanB5WlhOdmRYSmpaVDBpYUhSMGNEb3ZMM0IxY213dWIzSm5MMlJqTDJSamJXbDBlWEJsTDFOMGFXeHNTVzFoWjJVaUlDOCtQR1JqT25ScGRHeGxQand2WkdNNmRHbDBiR1UrUEM5all6cFhiM0pyUGp3dmNtUm1PbEpFUmo0OEwyMWxkR0ZrWVhSaFBqeGtaV1p6RFFvZ0lDQnBaRDBpWkdWbWN6TTNJaUF2UGcwS1BIQmhkR2dOQ2lBZ0lHUTlJazBnTVRndU5qSXlMRGd1TVRRMUlERTRMakEzTnl3MkxqZzFJR01nTUN3d0lERXVNalk0TEMweUxqZzJNU0F4TGpFMU5pd3RNaTQ1TnpFZ1RDQXhOeTQxTlRRc01pNHlOQ0JESURFM0xqUXpPQ3d5TGpFeU55QXhOQzQxTnpZc015NDBNek1nTVRRdU5UYzJMRE11TkRNeklFd2dNVE11TWpVMkxESXVPU0JESURFekxqSTFOaXd5TGprZ01USXVNRGtzTUNBeE1TNDVNeXd3SUVnZ09TNDFOakVnUXlBNUxqTTVOaXd3SURndU16RTNMREl1T1RBMklEZ3VNekUzTERJdU9UQTJJRXdnTmk0NU9Ua3NNeTQwTkRFZ1l5QXdMREFnTFRJdU9USXlMQzB4TGpJME1pQXRNeTR3TXpRc0xURXVNVE14SUV3Z01pNHlPRGtzTXk0NU5URWdReUF5TGpFM015dzBMakEyTkNBekxqVXdOeXcyTGpnMk55QXpMalV3Tnl3MkxqZzJOeUJNSURJdU9UWXlMRGd1TVRZZ1F5QXlMamsyTWl3NExqRTJJREFzT1M0ek1ERWdNQ3c1TGpRMU5TQjJJREl1TXpJeUlHTWdNQ3d3TGpFMk1pQXlMamsyT1N3eExqSXhPU0F5TGprMk9Td3hMakl4T1NCc0lEQXVOVFExTERFdU1qa3hJR01nTUN3d0lDMHhMakkyT0N3eUxqZzFPU0F0TVM0eE5UY3NNaTQ1TmprZ2JDQXhMalkzT0N3eExqWTBNeUJqSURBdU1URTBMREF1TVRFeElESXVPVGMzTEMweExqRTVOU0F5TGprM055d3RNUzR4T1RVZ2JDQXhMak15TVN3d0xqVXpOU0JqSURBc01DQXhMakUyTml3eUxqZzVPQ0F4TGpNeU55d3lMamc1T0NCb0lESXVNelk1SUdNZ01DNHhOalFzTUNBeExqSTBOQ3d0TWk0NU1EWWdNUzR5TkRRc0xUSXVPVEEySUd3Z01TNHpNaklzTFRBdU5UTTFJR01nTUN3d0lESXVPVEUyTERFdU1qUXlJRE11TURJNUxERXVNVE16SUd3Z01TNDJOemdzTFRFdU5qUXhJR01nTUM0eE1UY3NMVEF1TVRFMUlDMHhMakl5TEMweUxqa3hOaUF0TVM0eU1pd3RNaTQ1TVRZZ2JDQXdMalUwTkN3dE1TNHlPVE1nWXlBd0xEQWdNaTQ1TmpNc0xURXVNVFF6SURJdU9UWXpMQzB4TGpJNU9TQldJRGt1TXpZZ1F5QXlNUzQxT1N3NUxqRTVPU0F4T0M0Mk1qSXNPQzR4TkRVZ01UZ3VOakl5TERndU1UUTFJSG9nYlNBdE5DNHpOallzTWk0ME1qTWdZeUF3TERFdU9EWTNJQzB4TGpVMU15d3pMak00TnlBdE15NDBOakVzTXk0ek9EY2dMVEV1T1RBMkxEQWdMVE11TkRZeExDMHhMalV5SUMwekxqUTJNU3d0TXk0ek9EY2dNQ3d0TVM0NE5qY2dNUzQxTlRVc0xUTXVNemcxSURNdU5EWXhMQzB6TGpNNE5TQXhMamt3T1N3d0xqQXdNU0F6TGpRMk1Td3hMalV4T0NBekxqUTJNU3d6TGpNNE5TQjZJZzBLSUNBZ2FXUTlJbkJoZEdneklnMEtJQ0FnYzNSNWJHVTlJbVpwYkd3NkkwWkdSa1pHUmlJZ0x6NE5DanhuRFFvZ0lDQnBaRDBpWnpVaVBnMEtQQzluUGcwS1BHY05DaUFnSUdsa1BTSm5OeUkrRFFvOEwyYytEUW84WncwS0lDQWdhV1E5SW1jNUlqNE5Dand2Wno0TkNqeG5EUW9nSUNCcFpEMGlaekV4SWo0TkNqd3ZaejROQ2p4bkRRb2dJQ0JwWkQwaVp6RXpJajROQ2p3dlp6NE5DanhuRFFvZ0lDQnBaRDBpWnpFMUlqNE5Dand2Wno0TkNqeG5EUW9nSUNCcFpEMGlaekUzSWo0TkNqd3ZaejROQ2p4bkRRb2dJQ0JwWkQwaVp6RTVJajROQ2p3dlp6NE5DanhuRFFvZ0lDQnBaRDBpWnpJeElqNE5Dand2Wno0TkNqeG5EUW9nSUNCcFpEMGlaekl6SWo0TkNqd3ZaejROQ2p4bkRRb2dJQ0JwWkQwaVp6STFJajROQ2p3dlp6NE5DanhuRFFvZ0lDQnBaRDBpWnpJM0lqNE5Dand2Wno0TkNqeG5EUW9nSUNCcFpEMGlaekk1SWo0TkNqd3ZaejROQ2p4bkRRb2dJQ0JwWkQwaVp6TXhJajROQ2p3dlp6NE5DanhuRFFvZ0lDQnBaRDBpWnpNeklqNE5Dand2Wno0TkNqd3ZjM1puUGcwSykgNTAlIG5vLXJlcGVhdH0uZW1vdGUtbWVudS5lZGl0aW5nIC5pY29uLWdlYXJ7LXdlYmtpdC1hbmltYXRpb246c3BpbiA0cyBsaW5lYXIgaW5maW5pdGU7YW5pbWF0aW9uOnNwaW4gNHMgbGluZWFyIGluZmluaXRlfS5lbW90ZS1tZW51IC5pY29uLXJlc2l6ZS1oYW5kbGV7YmFja2dyb3VuZDp1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lJSE4wWVc1a1lXeHZibVU5SW01dklqOCtEUW84SVMwdElFTnlaV0YwWldRZ2QybDBhQ0JKYm10elkyRndaU0FvYUhSMGNEb3ZMM2QzZHk1cGJtdHpZMkZ3WlM1dmNtY3ZLU0F0TFQ0TkNnMEtQSE4yWncwS0lDQWdlRzFzYm5NNlpHTTlJbWgwZEhBNkx5OXdkWEpzTG05eVp5OWtZeTlsYkdWdFpXNTBjeTh4TGpFdklnMEtJQ0FnZUcxc2JuTTZZMk05SW1oMGRIQTZMeTlqY21WaGRHbDJaV052YlcxdmJuTXViM0puTDI1ekl5SU5DaUFnSUhodGJHNXpPbkprWmowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzh3TWk4eU1pMXlaR1l0YzNsdWRHRjRMVzV6SXlJTkNpQWdJSGh0Ykc1ek9uTjJaejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpRFFvZ0lDQjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaURRb2dJQ0IyWlhKemFXOXVQU0l4TGpFaURRb2dJQ0IzYVdSMGFEMGlNVFlpRFFvZ0lDQm9aV2xuYUhROUlqRTJJZzBLSUNBZ2RtbGxkMEp2ZUQwaU1DQXdJREUySURFMklnMEtJQ0FnYVdROUlrTmhjR0ZmTVNJTkNpQWdJSGh0YkRwemNHRmpaVDBpY0hKbGMyVnlkbVVpUGp4dFpYUmhaR0YwWVEwS0lDQWdhV1E5SW0xbGRHRmtZWFJoTkRNMU55SStQSEprWmpwU1JFWStQR05qT2xkdmNtc05DaUFnSUNBZ0lDQnlaR1k2WVdKdmRYUTlJaUkrUEdSak9tWnZjbTFoZEQ1cGJXRm5aUzl6ZG1jcmVHMXNQQzlrWXpwbWIzSnRZWFErUEdSak9uUjVjR1VOQ2lBZ0lDQWdJQ0FnSUhKa1pqcHlaWE52ZFhKalpUMGlhSFIwY0RvdkwzQjFjbXd1YjNKbkwyUmpMMlJqYldsMGVYQmxMMU4wYVd4c1NXMWhaMlVpSUM4K1BHUmpPblJwZEd4bFBqd3ZaR002ZEdsMGJHVStQQzlqWXpwWGIzSnJQand2Y21SbU9sSkVSajQ4TDIxbGRHRmtZWFJoUGp4a1pXWnpEUW9nSUNCcFpEMGlaR1ZtY3pRek5UVWlJQzgrRFFvOGNHRjBhQTBLSUNBZ1pEMGlUU0F4TXk0MUxEZ2dReUF4TXk0eU1qVXNPQ0F4TXl3NExqSXlOQ0F4TXl3NExqVWdkaUF6TGpjNU15Qk1JRE11TnpBM0xETWdTQ0EzTGpVZ1F5QTNMamMzTml3eklEZ3NNaTQzTnpZZ09Dd3lMalVnT0N3eUxqSXlOQ0EzTGpjM05pd3lJRGN1TlN3eUlHZ2dMVFVnVENBeUxqTXdPU3d5TGpBek9TQXlMakUxTERJdU1UUTBJREl1TVRRMkxESXVNVFEySURJdU1UUXpMREl1TVRVeUlESXVNRE01TERJdU16QTVJRElzTWk0MUlIWWdOU0JESURJc055NDNOellnTWk0eU1qUXNPQ0F5TGpVc09DQXlMamMzTml3NElETXNOeTQzTnpZZ015dzNMalVnVmlBekxqY3dOeUJNSURFeUxqSTVNeXd4TXlCSUlEZ3VOU0JESURndU1qSTBMREV6SURnc01UTXVNakkxSURnc01UTXVOU0E0TERFekxqYzNOU0E0TGpJeU5Dd3hOQ0E0TGpVc01UUWdhQ0ExSUd3Z01DNHhPVEVzTFRBdU1ETTVJR01nTUM0eE1qRXNMVEF1TURVeElEQXVNaklzTFRBdU1UUTRJREF1TWpjc0xUQXVNamNnVENBeE5Dd3hNeTQxTURJZ1ZpQTRMalVnUXlBeE5DdzRMakl5TkNBeE15NDNOelVzT0NBeE15NDFMRGdnZWlJTkNpQWdJR2xrUFNKd1lYUm9ORE0xTVNJTkNpQWdJSE4wZVd4bFBTSm1hV3hzT2lObVptWm1abVk3Wm1sc2JDMXZjR0ZqYVhSNU9qRWlJQzgrRFFvOEwzTjJaejQ9KSA1MCUgbm8tcmVwZWF0O2N1cnNvcjpud3NlLXJlc2l6ZSFpbXBvcnRhbnR9LmVtb3RlLW1lbnUgLmljb24tcGlue2JhY2tncm91bmQ6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpSUhOMFlXNWtZV3h2Ym1VOUltNXZJajgrRFFvOElTMHRJRU55WldGMFpXUWdkMmwwYUNCSmJtdHpZMkZ3WlNBb2FIUjBjRG92TDNkM2R5NXBibXR6WTJGd1pTNXZjbWN2S1NBdExUNE5DZzBLUEhOMlp3MEtJQ0FnZUcxc2JuTTZaR005SW1oMGRIQTZMeTl3ZFhKc0xtOXlaeTlrWXk5bGJHVnRaVzUwY3k4eExqRXZJZzBLSUNBZ2VHMXNibk02WTJNOUltaDBkSEE2THk5amNtVmhkR2wyWldOdmJXMXZibk11YjNKbkwyNXpJeUlOQ2lBZ0lIaHRiRzV6T25Ka1pqMGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M4d01pOHlNaTF5WkdZdGMzbHVkR0Y0TFc1ekl5SU5DaUFnSUhodGJHNXpPbk4yWnowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaURRb2dJQ0I0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lEUW9nSUNCMlpYSnphVzl1UFNJeExqRWlEUW9nSUNCM2FXUjBhRDBpTVRZaURRb2dJQ0JvWldsbmFIUTlJakUySWcwS0lDQWdhV1E5SW5OMlp6TXdNRFVpUGcwS0lDQThiV1YwWVdSaGRHRU5DaUFnSUNBZ2FXUTlJbTFsZEdGa1lYUmhNekF5TXlJK0RRb2dJQ0FnUEhKa1pqcFNSRVkrRFFvZ0lDQWdJQ0E4WTJNNlYyOXlhdzBLSUNBZ0lDQWdJQ0FnY21SbU9tRmliM1YwUFNJaVBnMEtJQ0FnSUNBZ0lDQThaR002Wm05eWJXRjBQbWx0WVdkbEwzTjJaeXQ0Yld3OEwyUmpPbVp2Y20xaGRENE5DaUFnSUNBZ0lDQWdQR1JqT25SNWNHVU5DaUFnSUNBZ0lDQWdJQ0FnY21SbU9uSmxjMjkxY21ObFBTSm9kSFJ3T2k4dmNIVnliQzV2Y21jdlpHTXZaR050YVhSNWNHVXZVM1JwYkd4SmJXRm5aU0lnTHo0TkNpQWdJQ0FnSUNBZ1BHUmpPblJwZEd4bFBqd3ZaR002ZEdsMGJHVStEUW9nSUNBZ0lDQThMMk5qT2xkdmNtcytEUW9nSUNBZ1BDOXlaR1k2VWtSR1BnMEtJQ0E4TDIxbGRHRmtZWFJoUGcwS0lDQThaR1ZtY3cwS0lDQWdJQ0JwWkQwaVpHVm1jek13TWpFaUlDOCtEUW9nSUR4bkRRb2dJQ0FnSUhSeVlXNXpabTl5YlQwaWJXRjBjbWw0S0RBdU56a3pNRGM0TWl3d0xEQXNNQzQzT1RNd056Z3lMQzB5TGpFM01EazROU3d0T0RFMExqWTVNams1S1NJTkNpQWdJQ0FnYVdROUltY3pNREEzSWo0TkNpQWdJQ0E4WncwS0lDQWdJQ0FnSUhSeVlXNXpabTl5YlQwaWJXRjBjbWw0S0RBdU56QTNNVEVzTUM0M01EY3hNU3d0TUM0M01EY3hNU3d3TGpjd056RXhMRGN6Tnk0M01EYzFOU3d5T1RVdU5EZzRNRGdwSWcwS0lDQWdJQ0FnSUdsa1BTSm5NekF3T1NJK0RRb2dJQ0FnSUNBOFp3MEtJQ0FnSUNBZ0lDQWdhV1E5SW1jek56VTFJajROQ2lBZ0lDQWdJQ0FnUEhCaGRHZ05DaUFnSUNBZ0lDQWdJQ0FnWkQwaVRTQTVMamM0TVRJMUxEQWdReUE1TGpRM05EQTFOaklzTUM0Mk9Ea3hNVElnT1M0MU1qQTJPQ3d4TGpVeU16QTROVE1nT1M0ek1USTFMREl1TVRnM05TQk1JRFF1T1RNM05TdzJMalU1TXpjMUlFTWdNeTQ1TlRnNU5qQTRMRFl1TkRJNU5EZ3pJREl1T1RRM056VTBPQ3cyTGpVek1qYzRPVGtnTWl3MkxqZ3hNalVnVENBMUxqQXpNVEkxTERrdU9EUXpOelVnTUM0MU5qSTFMREUwTGpNeE1qVWdNQ3d4TmlCRElEQXVOVFk1TWprMk1qZ3NNVFV1TnprMU5qSTJJREV1TVRZM056TTNPQ3d4TlM0Mk5EQXlNemNnTVM0M01UZzNOU3d4TlM0ME1EWXlOU0JNSURZdU1UVTJNalVzTVRBdU9UWTROelVnT1M0eE9EYzFMREUwSUdNZ01DNHlOemsyT0RJekxDMHdMamswTnpjNE15QXdMak00TXpFMU1qZ3NMVEV1T1RVNE9UTTNJREF1TWpFNE56VXNMVEl1T1RNM05TQXhMalV3TURBeE1Td3RNUzQwT0RrMU56azRJRE11TURBd01EQXhMQzB5TGprM09URTFPU0EwTGpVc0xUUXVORFk0TnpVZ01DNDJNREV4TURJc0xUQXVNRE14TXpZeElERXVPREl5TVRNNExDMHdMakE1TmpFek55QXlMQzB3TGpRMk9EYzFJRU1nTVRNdU9EYzVPRGt5TERRdU1EWTVORGd3TXlBeE1TNDROREk0TmpVc01pNHdNakF5TWpneUlEa3VOemd4TWpVc01DQjZJZzBLSUNBZ0lDQWdJQ0FnSUNCMGNtRnVjMlp2Y20wOUltMWhkSEpwZUNnd0xqZzVNVFU1TXpjMExDMHdMamc1TVRVNU16YzBMREF1T0RreE5Ua3pOelFzTUM0NE9URTFPVE0zTkN3dE1pNHlOalUxTERFd016Y3VNVE0wTlNraURRb2dJQ0FnSUNBZ0lDQWdJR2xrUFNKd1lYUm9NekF4TVNJTkNpQWdJQ0FnSUNBZ0lDQWdjM1I1YkdVOUltWnBiR3c2STJabVptWm1aanRtYVd4c0xXOXdZV05wZEhrNk1TSWdMejROQ2lBZ0lDQWdJRHd2Wno0TkNpQWdJQ0E4TDJjK0RRb2dJRHd2Wno0TkNqd3ZjM1puUGcwSykgNTAlIG5vLXJlcGVhdDt0cmFuc2l0aW9uOmFsbCAuMjVzIGVhc2V9LmVtb3RlLW1lbnUgLmljb24tcGluOmhvdmVyLC5lbW90ZS1tZW51LnBpbm5lZCAuaWNvbi1waW57LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpO29wYWNpdHk6MX0uZW1vdGUtbWVudSAuZWRpdC10b29se2JhY2tncm91bmQtcG9zaXRpb246NTAlO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXNpemU6MTRweDtib3JkZXItcmFkaXVzOjRweDtib3JkZXI6MXB4IHNvbGlkICMwMDA7Y3Vyc29yOnBvaW50ZXI7ZGlzcGxheTpub25lO2hlaWdodDoxNHB4O29wYWNpdHk6LjI1O3Bvc2l0aW9uOmFic29sdXRlO3RyYW5zaXRpb246YWxsIC4yNXMgZWFzZTt3aWR0aDoxNHB4O3otaW5kZXg6MX0uZW1vdGUtbWVudSAuZWRpdC10b29sOmhvdmVyLC5lbW90ZS1tZW51IC5lbW90ZTpob3ZlciAuZWRpdC10b29se29wYWNpdHk6MX0uZW1vdGUtbWVudSAuZWRpdC12aXNpYmlsaXR5e2JhY2tncm91bmQtY29sb3I6IzAwYzgwMDtiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaUlITjBZVzVrWVd4dmJtVTlJbTV2SWo4K0RRbzhJUzB0SUVOeVpXRjBaV1FnZDJsMGFDQkpibXR6WTJGd1pTQW9hSFIwY0RvdkwzZDNkeTVwYm10elkyRndaUzV2Y21jdktTQXRMVDROQ2cwS1BITjJadzBLSUNBZ2VHMXNibk02WkdNOUltaDBkSEE2THk5d2RYSnNMbTl5Wnk5a1l5OWxiR1Z0Wlc1MGN5OHhMakV2SWcwS0lDQWdlRzFzYm5NNlkyTTlJbWgwZEhBNkx5OWpjbVZoZEdsMlpXTnZiVzF2Ym5NdWIzSm5MMjV6SXlJTkNpQWdJSGh0Ykc1ek9uSmtaajBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOHdNaTh5TWkxeVpHWXRjM2x1ZEdGNExXNXpJeUlOQ2lBZ0lIaHRiRzV6T25OMlp6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lEUW9nSUNCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpRFFvZ0lDQjJaWEp6YVc5dVBTSXhMakVpRFFvZ0lDQjNhV1IwYUQwaU1UQXdJZzBLSUNBZ2FHVnBaMmgwUFNJeE1EQWlEUW9nSUNCMmFXVjNRbTk0UFNJd0lEQWdNVEF3SURFd01DSU5DaUFnSUdsa1BTSk1ZWGxsY2w4eElnMEtJQ0FnZUcxc09uTndZV05sUFNKd2NtVnpaWEoyWlNJK1BHMWxkR0ZrWVhSaERRb2dJQ0JwWkQwaWJXVjBZV1JoZEdFNUlqNDhjbVJtT2xKRVJqNDhZMk02VjI5eWF3MEtJQ0FnSUNBZ0lISmtaanBoWW05MWREMGlJajQ4WkdNNlptOXliV0YwUG1sdFlXZGxMM04yWnl0NGJXdzhMMlJqT21admNtMWhkRDQ4WkdNNmRIbHdaUTBLSUNBZ0lDQWdJQ0FnY21SbU9uSmxjMjkxY21ObFBTSm9kSFJ3T2k4dmNIVnliQzV2Y21jdlpHTXZaR050YVhSNWNHVXZVM1JwYkd4SmJXRm5aU0lnTHo0OFpHTTZkR2wwYkdVK1BDOWtZenAwYVhSc1pUNDhMMk5qT2xkdmNtcytQQzl5WkdZNlVrUkdQand2YldWMFlXUmhkR0UrUEdSbFpuTU5DaUFnSUdsa1BTSmtaV1p6TnlJZ0x6NE5Danh3WVhSb0RRb2dJQ0JrUFNKTklEazNMamsyTkN3ME5pNDFORGdnUXlBNU55NHdPVGdzTkRVdU5USTRJRGMyTGpReU55d3lNUzQyTURNZ05UQXNNakV1TmpBeklHTWdMVEkyTGpReU55d3dJQzAwTnk0d09UZ3NNak11T1RJMUlDMDBOeTQ1TmpVc01qUXVPVFEySUMweExqY3dNU3d5SUMweExqY3dNU3cwTGprd01pQXhNR1V0TkN3Mkxqa3dNeUF3TGpnMk5pd3hMakF5SURJeExqVXpOeXd5TkM0NU5EVWdORGN1T1RZMExESTBMamswTlNBeU5pNDBNamNzTUNBME55NHdPVGdzTFRJekxqa3lOaUEwTnk0NU5qVXNMVEkwTGprME5pQXhMamN3TVN3dE1pQXhMamN3TVN3dE5DNDVNRElnTFRBdU1EQXhMQzAyTGprd015QjZJRTBnTlRndU1EY3pMRE0xTGprM05TQmpJREV1TnpjM0xDMHdMamszSURRdU1qVTFMREF1TVRReklEVXVOVE0wTERJdU5EZzFJREV1TWpjNUxESXVNelF6SURBdU9EYzFMRFV1TURJNUlDMHdMamt3TWl3MUxqazVPU0F0TVM0M056Y3NNQzQ1TnpFZ0xUUXVNalUxTEMwd0xqRTBNeUF0TlM0MU16VXNMVEl1TkRnMUlDMHhMakkzT1N3dE1pNHpORE1nTFRBdU9EYzFMQzAxTGpBeU9TQXdMamt3TXl3dE5TNDVPVGtnZWlCTklEVXdMRFk1TGpjeU9TQkRJRE14TGpVMExEWTVMamN5T1NBeE5pNHdNRFVzTlRVdU5UVXpJREV3TGpZeU9DdzFNQ0F4TkM0eU5Ua3NORFl1TWpRNUlESXlMalV5Tml3ek9DNDFOekVnTXpNdU1UazFMRE16TGprM09TQXpNUzR4TVRRc016Y3VNVFExSURJNUxqZzVOQ3cwTUM0NU1qZ2dNamt1T0RrMExEUTFJR01nTUN3eE1TNHhNRFFnT1M0d01ERXNNakF1TVRBMUlESXdMakV3TlN3eU1DNHhNRFVnTVRFdU1UQTBMREFnTWpBdU1UQTJMQzA1TGpBd01TQXlNQzR4TURZc0xUSXdMakV3TlNBd0xDMDBMakEzTWlBdE1TNHlNVGtzTFRjdU9EVTFJQzB6TGpNc0xURXhMakF5TVNCRElEYzNMalEzTkN3ek9DNDFOeklnT0RVdU56UXhMRFEyTGpJMUlEZzVMak0zTWl3MU1DQTRNeTQ1T1RVc05UVXVOVFUxSURZNExqUTJMRFk1TGpjeU9TQTFNQ3cyT1M0M01qa2dlaUlOQ2lBZ0lHbGtQU0p3WVhSb015SWdMejROQ2p3dmMzWm5QZz09KX0uZW1vdGUtbWVudSAuZWRpdC1zdGFycmVke2JhY2tncm91bmQtY29sb3I6IzMyMzIzMjtiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaUlITjBZVzVrWVd4dmJtVTlJbTV2SWo4K0RRbzhJUzB0SUVOeVpXRjBaV1FnZDJsMGFDQkpibXR6WTJGd1pTQW9hSFIwY0RvdkwzZDNkeTVwYm10elkyRndaUzV2Y21jdktTQXRMVDROQ2cwS1BITjJadzBLSUNBZ2VHMXNibk02WkdNOUltaDBkSEE2THk5d2RYSnNMbTl5Wnk5a1l5OWxiR1Z0Wlc1MGN5OHhMakV2SWcwS0lDQWdlRzFzYm5NNlkyTTlJbWgwZEhBNkx5OWpjbVZoZEdsMlpXTnZiVzF2Ym5NdWIzSm5MMjV6SXlJTkNpQWdJSGh0Ykc1ek9uSmtaajBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOHdNaTh5TWkxeVpHWXRjM2x1ZEdGNExXNXpJeUlOQ2lBZ0lIaHRiRzV6T25OMlp6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lEUW9nSUNCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpRFFvZ0lDQjJaWEp6YVc5dVBTSXhMakVpRFFvZ0lDQjNhV1IwYUQwaU5UQWlEUW9nSUNCb1pXbG5hSFE5SWpVd0lnMEtJQ0FnZG1sbGQwSnZlRDBpTUNBd0lEVXdJRFV3SWcwS0lDQWdhV1E5SWt4aGVXVnlYekVpRFFvZ0lDQjRiV3c2YzNCaFkyVTlJbkJ5WlhObGNuWmxJajQ4YldWMFlXUmhkR0VOQ2lBZ0lHbGtQU0p0WlhSaFpHRjBZVE13TURFaVBqeHlaR1k2VWtSR1BqeGpZenBYYjNKckRRb2dJQ0FnSUNBZ2NtUm1PbUZpYjNWMFBTSWlQanhrWXpwbWIzSnRZWFErYVcxaFoyVXZjM1puSzNodGJEd3ZaR002Wm05eWJXRjBQanhrWXpwMGVYQmxEUW9nSUNBZ0lDQWdJQ0J5WkdZNmNtVnpiM1Z5WTJVOUltaDBkSEE2THk5d2RYSnNMbTl5Wnk5a1l5OWtZMjFwZEhsd1pTOVRkR2xzYkVsdFlXZGxJaUF2UGp4a1l6cDBhWFJzWlQ0OEwyUmpPblJwZEd4bFBqd3ZZMk02VjI5eWF6NDhMM0prWmpwU1JFWStQQzl0WlhSaFpHRjBZVDQ4WkdWbWN3MEtJQ0FnYVdROUltUmxabk15T1RrNUlpQXZQZzBLUEhCaGRHZ05DaUFnSUdROUltMGdORE11TURRc01qSXVOamsySUMwM0xqVTJPQ3czTGpNM055QXhMamM0Tnl3eE1DNDBNVGNnWXlBd0xqRXlOeXd3TGpjMUlDMHdMakU0TWl3eExqVXdPU0F0TUM0M09UY3NNUzQ1TlRjZ0xUQXVNelE0TERBdU1qVXpJQzB3TGpjMk1pd3dMak00TWlBdE1TNHhOellzTUM0ek9ESWdMVEF1TXpFNExEQWdMVEF1TmpNNExDMHdMakEzTmlBdE1DNDVNekVzTFRBdU1qTWdUQ0F5TlN3ek55NDJPREVnTVRVdU5qUTFMRFF5TGpVNU9TQmpJQzB3TGpZM05Dd3dMak0xTlNBdE1TNDBPU3d3TGpJNU5TQXRNaTR4TURjc0xUQXVNVFV4SUVNZ01USXVPVEl6TERReUlERXlMall4TkN3ME1TNHlORElnTVRJdU56UXpMRFF3TGpRNU1TQk1JREUwTGpVekxETXdMakEzTkNBMkxqazJNaXd5TWk0Mk9UY2dReUEyTGpReE5Td3lNaTR4TmpZZ05pNHlNakVzTWpFdU16Y3hJRFl1TkRVMExESXdMalkwTnlBMkxqWTVMREU1TGpreU15QTNMak14TlN3eE9TNHpPVFlnT0M0d05qa3NNVGt1TWpnMklHd2dNVEF1TkRVNUxDMHhMalV5TVNBMExqWTRMQzA1TGpRM09DQkRJREl6TGpVME15dzNMall3TXlBeU5DNHlNemtzTnk0eE56RWdNalVzTnk0eE56RWdZeUF3TGpjMk15d3dJREV1TkRVMkxEQXVORE15SURFdU56a3pMREV1TVRFMUlHd2dOQzQyTnprc09TNDBOemdnTVRBdU5EWXhMREV1TlRJeElHTWdNQzQzTlRJc01DNHhNRGtnTVM0ek56a3NNQzQyTXpjZ01TNDJNVElzTVM0ek5qRWdNQzR5TXpjc01DNDNNalFnTUM0d016Z3NNUzQxTVRrZ0xUQXVOVEExTERJdU1EVWdlaUlOQ2lBZ0lHbGtQU0p3WVhSb01qazVOU0lOQ2lBZ0lITjBlV3hsUFNKbWFXeHNPaU5qWTJOalkyTTdabWxzYkMxdmNHRmphWFI1T2pFaUlDOCtEUW84TDNOMlp6NE5DZz09KX0uZW1vdGUtbWVudSAuZW1vdGU+LmVkaXQtdmlzaWJpbGl0eXtib3R0b206YXV0bztsZWZ0OmF1dG87cmlnaHQ6MDt0b3A6MH0uZW1vdGUtbWVudSAuZW1vdGU+LmVkaXQtc3RhcnJlZHtib3R0b206YXV0bztsZWZ0OjA7cmlnaHQ6YXV0bzt0b3A6MH0uZW1vdGUtbWVudSAuaGVhZGVyLWluZm8+LmVkaXQtdG9vbHttYXJnaW4tbGVmdDo1cHh9LmVtb3RlLW1lbnUuZWRpdGluZyAuZWRpdC10b29se2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5lbW90ZS1tZW51IC5lbW90ZS1tZW51LWhpZGRlbiAuZWRpdC12aXNpYmlsaXR5e2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpSUhOMFlXNWtZV3h2Ym1VOUltNXZJajgrRFFvOElTMHRJRU55WldGMFpXUWdkMmwwYUNCSmJtdHpZMkZ3WlNBb2FIUjBjRG92TDNkM2R5NXBibXR6WTJGd1pTNXZjbWN2S1NBdExUNE5DZzBLUEhOMlp3MEtJQ0FnZUcxc2JuTTZaR005SW1oMGRIQTZMeTl3ZFhKc0xtOXlaeTlrWXk5bGJHVnRaVzUwY3k4eExqRXZJZzBLSUNBZ2VHMXNibk02WTJNOUltaDBkSEE2THk5amNtVmhkR2wyWldOdmJXMXZibk11YjNKbkwyNXpJeUlOQ2lBZ0lIaHRiRzV6T25Ka1pqMGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M4d01pOHlNaTF5WkdZdGMzbHVkR0Y0TFc1ekl5SU5DaUFnSUhodGJHNXpPbk4yWnowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaURRb2dJQ0I0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lEUW9nSUNCMlpYSnphVzl1UFNJeExqRWlEUW9nSUNCM2FXUjBhRDBpTVRBd0lnMEtJQ0FnYUdWcFoyaDBQU0l4TURBaURRb2dJQ0IyYVdWM1FtOTRQU0l3SURBZ01UQXdJREV3TUNJTkNpQWdJR2xrUFNKTVlYbGxjbDh6SWcwS0lDQWdlRzFzT25Od1lXTmxQU0p3Y21WelpYSjJaU0krUEcxbGRHRmtZWFJoRFFvZ0lDQnBaRDBpYldWMFlXUmhkR0V4TlNJK1BISmtaanBTUkVZK1BHTmpPbGR2Y21zTkNpQWdJQ0FnSUNCeVpHWTZZV0p2ZFhROUlpSStQR1JqT21admNtMWhkRDVwYldGblpTOXpkbWNyZUcxc1BDOWtZenBtYjNKdFlYUStQR1JqT25SNWNHVU5DaUFnSUNBZ0lDQWdJSEprWmpweVpYTnZkWEpqWlQwaWFIUjBjRG92TDNCMWNtd3ViM0puTDJSakwyUmpiV2wwZVhCbEwxTjBhV3hzU1cxaFoyVWlJQzgrUEdSak9uUnBkR3hsUGp3dlpHTTZkR2wwYkdVK1BDOWpZenBYYjNKclBqd3ZjbVJtT2xKRVJqNDhMMjFsZEdGa1lYUmhQanhrWldaekRRb2dJQ0JwWkQwaVpHVm1jekV6SWlBdlBnMEtQR2NOQ2lBZ0lHbGtQU0puTXlJK0RRb0pQSEJoZEdnTkNpQWdJR1E5SWswZ056QXVNRGd5TERRMUxqUTNOU0ExTUM0ME56UXNOalV1TURneUlFTWdOakV1TVRrNExEWTBMamd6TVNBMk9TNDRNekVzTlRZdU1UazNJRGN3TGpBNE1pdzBOUzQwTnpVZ2VpSU5DaUFnSUdsa1BTSndZWFJvTlNJTkNpQWdJSE4wZVd4bFBTSm1hV3hzT2lOR1JrWkdSa1lpSUM4K0RRb0pQSEJoZEdnTkNpQWdJR1E5SW0wZ09UY3VPVFkwTERRMkxqVTBPQ0JqSUMwd0xqUTFMQzB3TGpVeU9TQXROaTR5TkRVc0xUY3VNak1nTFRFMUxqUXdNeXd0TVRNdU5UVTBJR3dnTFRZdU1pdzJMaklnUXlBNE1pNHpOVEVzTkRNdU1UUTRJRGcyTGpreUxEUTNMalEyT1NBNE9TNHpOeklzTlRBZ09ETXVPVGsxTERVMUxqVTFOU0EyT0M0ME5pdzJPUzQzTWprZ05UQXNOamt1TnpJNUlHTWdMVEV1TXpNMExEQWdMVEl1TmpVeExDMHdMakE0TWlBdE15NDVOVElzTFRBdU1qSXlJR3dnTFRjdU5ETTVMRGN1TkRNNUlHTWdNeTQyTXprc01DNDVNRGtnTnk0ME5Ea3NNUzQwTlNBeE1TNHpPVEVzTVM0ME5TQXlOaTQwTWpjc01DQTBOeTR3T1Rnc0xUSXpMamt5TmlBME55NDVOalVzTFRJMExqazBOaUF4TGpjd01Td3RNUzQ1T1RrZ01TNDNNREVzTFRRdU9UQXhJQzB3TGpBd01Td3ROaTQ1TURJZ2VpSU5DaUFnSUdsa1BTSndZWFJvTnlJTkNpQWdJSE4wZVd4bFBTSm1hV3hzT2lOR1JrWkdSa1lpSUM4K0RRb0pQSEJoZEdnTkNpQWdJR1E5SW0wZ09URXVOREV4TERFMkxqWTJJR01nTUN3dE1DNHlOallnTFRBdU1UQTFMQzB3TGpVeUlDMHdMakk1TXl3dE1DNDNNRGNnYkNBdE55NHdOekVzTFRjdU1EY2dZeUF0TUM0ek9URXNMVEF1TXpreElDMHhMakF5TXl3dE1DNHpPVEVnTFRFdU5ERTBMREFnVENBMk5pNDRNRFFzTWpRdU56RXhJRU1nTmpFdU5qQXlMREl5TGpneE9DQTFOUzQ1TkRrc01qRXVOakF6SURVd0xESXhMall3TXlCaklDMHlOaTQwTWpjc01DQXRORGN1TURrNExESXpMamt5TmlBdE5EY3VPVFkxTERJMExqazBOaUF0TVM0M01ERXNNaUF0TVM0M01ERXNOQzQ1TURJZ01UQmxMVFFzTmk0NU1ETWdNQzQxTVRjc01DNDJNRGNnT0M0d09ETXNPUzR6TlRRZ01Ua3VOekEzTERFMkxqTXlJRXdnT0M0NE9ETXNPREl1TmpNeUlFTWdPQzQyT1RVc09ESXVPRElnT0M0MU9TdzRNeTR3TnpNZ09DNDFPU3c0TXk0ek16a2dZeUF3TERBdU1qWTJJREF1TVRBMUxEQXVOVElnTUM0eU9UTXNNQzQzTURjZ2JDQTNMakEzTVN3M0xqQTNJR01nTUM0eE9UVXNNQzR4T1RVZ01DNDBOVEVzTUM0eU9UTWdNQzQzTURjc01DNHlPVE1nTUM0eU5UWXNNQ0F3TGpVeE1pd3RNQzR3T1RnZ01DNDNNRGNzTFRBdU1qa3pJR3dnTnpNdU56VXNMVGN6TGpjMUlHTWdNQzR4T0Rjc0xUQXVNVGcySURBdU1qa3pMQzB3TGpRMElEQXVNamt6TEMwd0xqY3dOaUI2SUUwZ01UQXVOakk0TERVd0lFTWdNVFF1TWpVNUxEUTJMakkwT1NBeU1pNDFNallzTXpndU5UY3hJRE16TGpFNU5Td3pNeTQ1TnprZ016RXVNVEUwTERNM0xqRTBOU0F5T1M0NE9UUXNOREF1T1RJNElESTVMamc1TkN3ME5TQmpJREFzTkM0Mk5qVWdNUzQyTURFc09DNDVORFVnTkM0eU55d3hNaTR6TlRFZ1RDQXlPQzR3TkN3Mk15NDBOelVnUXlBeE9TNDRPRGdzTlRndU9UVTFJREV6TGpZME9TdzFNeTR4TWlBeE1DNDJNamdzTlRBZ2VpSU5DaUFnSUdsa1BTSndZWFJvT1NJTkNpQWdJSE4wZVd4bFBTSm1hV3hzT2lOR1JrWkdSa1lpSUM4K0RRbzhMMmMrRFFvOEwzTjJaejROQ2c9PSk7YmFja2dyb3VuZC1jb2xvcjpyZWR9LmVtb3RlLW1lbnUgLmVtb3RlLW1lbnUtc3RhcnJlZCAuZWRpdC1zdGFycmVke2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpSUhOMFlXNWtZV3h2Ym1VOUltNXZJajgrRFFvOElTMHRJRU55WldGMFpXUWdkMmwwYUNCSmJtdHpZMkZ3WlNBb2FIUjBjRG92TDNkM2R5NXBibXR6WTJGd1pTNXZjbWN2S1NBdExUNE5DZzBLUEhOMlp3MEtJQ0FnZUcxc2JuTTZaR005SW1oMGRIQTZMeTl3ZFhKc0xtOXlaeTlrWXk5bGJHVnRaVzUwY3k4eExqRXZJZzBLSUNBZ2VHMXNibk02WTJNOUltaDBkSEE2THk5amNtVmhkR2wyWldOdmJXMXZibk11YjNKbkwyNXpJeUlOQ2lBZ0lIaHRiRzV6T25Ka1pqMGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M4d01pOHlNaTF5WkdZdGMzbHVkR0Y0TFc1ekl5SU5DaUFnSUhodGJHNXpPbk4yWnowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaURRb2dJQ0I0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lEUW9nSUNCMlpYSnphVzl1UFNJeExqRWlEUW9nSUNCM2FXUjBhRDBpTlRBaURRb2dJQ0JvWldsbmFIUTlJalV3SWcwS0lDQWdkbWxsZDBKdmVEMGlNQ0F3SURVd0lEVXdJZzBLSUNBZ2FXUTlJa3hoZVdWeVh6RWlEUW9nSUNCNGJXdzZjM0JoWTJVOUluQnlaWE5sY25abElqNDhiV1YwWVdSaGRHRU5DaUFnSUdsa1BTSnRaWFJoWkdGMFlUTXdNREVpUGp4eVpHWTZVa1JHUGp4all6cFhiM0pyRFFvZ0lDQWdJQ0FnY21SbU9tRmliM1YwUFNJaVBqeGtZenBtYjNKdFlYUSthVzFoWjJVdmMzWm5LM2h0YkR3dlpHTTZabTl5YldGMFBqeGtZenAwZVhCbERRb2dJQ0FnSUNBZ0lDQnlaR1k2Y21WemIzVnlZMlU5SW1oMGRIQTZMeTl3ZFhKc0xtOXlaeTlrWXk5a1kyMXBkSGx3WlM5VGRHbHNiRWx0WVdkbElpQXZQanhrWXpwMGFYUnNaVDQ4TDJSak9uUnBkR3hsUGp3dlkyTTZWMjl5YXo0OEwzSmtaanBTUkVZK1BDOXRaWFJoWkdGMFlUNDhaR1ZtY3cwS0lDQWdhV1E5SW1SbFpuTXlPVGs1SWlBdlBnMEtQSEJoZEdnTkNpQWdJR1E5SW0wZ05ETXVNRFFzTWpJdU5qazJJQzAzTGpVMk9DdzNMak0zTnlBeExqYzROeXd4TUM0ME1UY2dZeUF3TGpFeU55d3dMamMxSUMwd0xqRTRNaXd4TGpVd09TQXRNQzQzT1Rjc01TNDVOVGNnTFRBdU16UTRMREF1TWpVeklDMHdMamMyTWl3d0xqTTRNaUF0TVM0eE56WXNNQzR6T0RJZ0xUQXVNekU0TERBZ0xUQXVOak00TEMwd0xqQTNOaUF0TUM0NU16RXNMVEF1TWpNZ1RDQXlOU3d6Tnk0Mk9ERWdNVFV1TmpRMUxEUXlMalU1T1NCaklDMHdMalkzTkN3d0xqTTFOU0F0TVM0ME9Td3dMakk1TlNBdE1pNHhNRGNzTFRBdU1UVXhJRU1nTVRJdU9USXpMRFF5SURFeUxqWXhOQ3cwTVM0eU5ESWdNVEl1TnpRekxEUXdMalE1TVNCTUlERTBMalV6TERNd0xqQTNOQ0EyTGprMk1pd3lNaTQyT1RjZ1F5QTJMalF4TlN3eU1pNHhOallnTmk0eU1qRXNNakV1TXpjeElEWXVORFUwTERJd0xqWTBOeUEyTGpZNUxERTVMamt5TXlBM0xqTXhOU3d4T1M0ek9UWWdPQzR3Tmprc01Ua3VNamcySUd3Z01UQXVORFU1TEMweExqVXlNU0EwTGpZNExDMDVMalEzT0NCRElESXpMalUwTXl3M0xqWXdNeUF5TkM0eU16a3NOeTR4TnpFZ01qVXNOeTR4TnpFZ1l5QXdMamMyTXl3d0lERXVORFUyTERBdU5ETXlJREV1TnprekxERXVNVEUxSUd3Z05DNDJOemtzT1M0ME56Z2dNVEF1TkRZeExERXVOVEl4SUdNZ01DNDNOVElzTUM0eE1Ea2dNUzR6Tnprc01DNDJNemNnTVM0Mk1USXNNUzR6TmpFZ01DNHlNemNzTUM0M01qUWdNQzR3TXpnc01TNDFNVGtnTFRBdU5UQTFMREl1TURVZ2VpSU5DaUFnSUdsa1BTSndZWFJvTWprNU5TSU5DaUFnSUhOMGVXeGxQU0ptYVd4c09pTm1abU5qTURBN1ptbHNiQzF2Y0dGamFYUjVPakVpSUM4K0RRbzhMM04yWno0TkNnPT0pfS5lbW90ZS1tZW51IC5lbW90ZS5lbW90ZS1tZW51LXN0YXJyZWR7Ym9yZGVyLWNvbG9yOnJnYmEoMjAwLDIwMCwwLC41KX0uZW1vdGUtbWVudSAuZW1vdGUuZW1vdGUtbWVudS1oaWRkZW57Ym9yZGVyLWNvbG9yOnJnYmEoMjU1LDAsMCwuNSl9LmVtb3RlLW1lbnUgI3N0YXJyZWQtZW1vdGVzLWdyb3VwIC5lbW90ZTpub3QoLmVtb3RlLW1lbnUtc3RhcnJlZCksLmVtb3RlLW1lbnU6bm90KC5lZGl0aW5nKSAuZW1vdGUtbWVudS1oaWRkZW57ZGlzcGxheTpub25lfS5lbW90ZS1tZW51Om5vdCguZWRpdGluZykgI3N0YXJyZWQtZW1vdGVzLWdyb3VwIC5lbW90ZS1tZW51LXN0YXJyZWR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50fS5lbW90ZS1tZW51ICNzdGFycmVkLWVtb3Rlcy1ncm91cHt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojNjQ2NDY0fS5lbW90ZS1tZW51ICNzdGFycmVkLWVtb3Rlcy1ncm91cDplbXB0eTpiZWZvcmV7Y29udGVudDpcXFwiVXNlIHRoZSBlZGl0IG1vZGUgdG8gc3RhciBhbiBlbW90ZSFcXFwiO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo4cHh9LmVtb3RlLW1lbnUgLnNjcm9sbGFibGV7aGVpZ2h0OmNhbGMoMTAwJSAtIDEwMXB4KTtvdmVyZmxvdy15OmF1dG99LmVtb3RlLW1lbnUgLnN0aWNreXtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MDt3aWR0aDoxMDAlfS5lbW90ZS1tZW51IC5lbW90ZS1tZW51LWlubmVye3Bvc2l0aW9uOnJlbGF0aXZlO21heC1oZWlnaHQ6MTAwJTtoZWlnaHQ6MTAwJX1cIikpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIEhvZ2FuID0gcmVxdWlyZSgnaG9nYW4uanMvbGliL3RlbXBsYXRlLmpzJyk7XG4gICAgdmFyIHRlbXBsYXRlcyA9IHt9O1xuICAgIHRlbXBsYXRlc1snZW1vdGUnXSA9IG5ldyBIb2dhbi5UZW1wbGF0ZSh7Y29kZTogZnVuY3Rpb24gKGMscCxpKSB7IHZhciB0PXRoaXM7dC5iKGk9aXx8XCJcIik7dC5iKFwiPGRpdiBjbGFzcz1cXFwiZW1vdGVcIik7aWYodC5zKHQuZihcInRoaXJkUGFydHlcIixjLHAsMSksYyxwLDAsMzIsNDQsXCJ7eyB9fVwiKSl7dC5ycyhjLHAsZnVuY3Rpb24oYyxwLHQpe3QuYihcIiB0aGlyZC1wYXJ0eVwiKTt9KTtjLnBvcCgpO31pZighdC5zKHQuZihcImlzVmlzaWJsZVwiLGMscCwxKSxjLHAsMSwwLDAsXCJcIikpe3QuYihcIiBlbW90ZS1tZW51LWhpZGRlblwiKTt9O2lmKHQucyh0LmYoXCJpc1N0YXJyZWRcIixjLHAsMSksYyxwLDAsMTE5LDEzOCxcInt7IH19XCIpKXt0LnJzKGMscCxmdW5jdGlvbihjLHAsdCl7dC5iKFwiIGVtb3RlLW1lbnUtc3RhcnJlZFwiKTt9KTtjLnBvcCgpO310LmIoXCJcXFwiIGRhdGEtZW1vdGU9XFxcIlwiKTt0LmIodC52KHQuZihcInRleHRcIixjLHAsMCkpKTt0LmIoXCJcXFwiIHRpdGxlPVxcXCJcIik7dC5iKHQudih0LmYoXCJ0ZXh0XCIsYyxwLDApKSk7aWYodC5zKHQuZihcInRoaXJkUGFydHlcIixjLHAsMSksYyxwLDAsMjA2LDIyOSxcInt7IH19XCIpKXt0LnJzKGMscCxmdW5jdGlvbihjLHAsdCl7dC5iKFwiIChmcm9tIDNyZCBwYXJ0eSBhZGRvbilcIik7fSk7Yy5wb3AoKTt9dC5iKFwiXFxcIj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdDxpbWcgc3JjPVxcXCJcIik7dC5iKHQudCh0LmYoXCJ1cmxcIixjLHAsMCkpKTt0LmIoXCJcXFwiPlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIlx0PGRpdiBjbGFzcz1cXFwiZWRpdC10b29sIGVkaXQtc3RhcnJlZFxcXCIgZGF0YS13aGljaD1cXFwiXCIpO3QuYih0LnYodC5mKFwidGV4dFwiLGMscCwwKSkpO3QuYihcIlxcXCIgZGF0YS1jb21tYW5kPVxcXCJ0b2dnbGUtc3RhcnJlZFxcXCIgdGl0bGU9XFxcIlN0YXIvdW5zdGFyIGVtb3RlOiBcIik7dC5iKHQudih0LmYoXCJ0ZXh0XCIsYyxwLDApKSk7dC5iKFwiXFxcIj48L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdDxkaXYgY2xhc3M9XFxcImVkaXQtdG9vbCBlZGl0LXZpc2liaWxpdHlcXFwiIGRhdGEtd2hpY2g9XFxcIlwiKTt0LmIodC52KHQuZihcInRleHRcIixjLHAsMCkpKTt0LmIoXCJcXFwiIGRhdGEtY29tbWFuZD1cXFwidG9nZ2xlLXZpc2liaWxpdHlcXFwiIHRpdGxlPVxcXCJIaWRlL3Nob3cgZW1vdGU6IFwiKTt0LmIodC52KHQuZihcInRleHRcIixjLHAsMCkpKTt0LmIoXCJcXFwiPjwvZGl2PlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIjwvZGl2PlxcclwiKTt0LmIoXCJcXG5cIik7cmV0dXJuIHQuZmwoKTsgfSxwYXJ0aWFsczoge30sIHN1YnM6IHsgIH19KTtcbiAgICB0ZW1wbGF0ZXNbJ2Vtb3RlQnV0dG9uJ10gPSBuZXcgSG9nYW4uVGVtcGxhdGUoe2NvZGU6IGZ1bmN0aW9uIChjLHAsaSkgeyB2YXIgdD10aGlzO3QuYihpPWl8fFwiXCIpO3QuYihcIjxidXR0b24gY2xhc3M9XFxcImJ1dHRvbiBidXR0b24tLWljb24tb25seSBmbG9hdC1sZWZ0XFxcIiB0aXRsZT1cXFwiRW1vdGUgTWVudVxcXCIgaWQ9XFxcImVtb3RlLW1lbnUtYnV0dG9uXFxcIj48L2J1dHRvbj5cXHJcIik7dC5iKFwiXFxuXCIpO3JldHVybiB0LmZsKCk7IH0scGFydGlhbHM6IHt9LCBzdWJzOiB7ICB9fSk7XG4gICAgdGVtcGxhdGVzWydlbW90ZUdyb3VwSGVhZGVyJ10gPSBuZXcgSG9nYW4uVGVtcGxhdGUoe2NvZGU6IGZ1bmN0aW9uIChjLHAsaSkgeyB2YXIgdD10aGlzO3QuYihpPWl8fFwiXCIpO3QuYihcIjxkaXYgY2xhc3M9XFxcImdyb3VwLWhlYWRlclxcXCIgZGF0YS1lbW90ZS1jaGFubmVsPVxcXCJcIik7dC5iKHQudih0LmYoXCJjaGFubmVsXCIsYyxwLDApKSk7dC5iKFwiXFxcIj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdDxkaXYgY2xhc3M9XFxcImhlYWRlci1pbmZvXFxcIj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdFx0PGltZyBzcmM9XFxcIlwiKTt0LmIodC52KHQuZihcImJhZGdlXCIsYyxwLDApKSk7dC5iKFwiXFxcIiAvPlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIlx0XHRcIik7dC5iKHQudih0LmYoXCJjaGFubmVsRGlzcGxheU5hbWVcIixjLHAsMCkpKTt0LmIoXCJcXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdFx0PGRpdiBjbGFzcz1cXFwiZWRpdC10b29sIGVkaXQtdmlzaWJpbGl0eVxcXCIgZGF0YS13aGljaD1cXFwiY2hhbm5lbC1cIik7dC5iKHQudih0LmYoXCJjaGFubmVsXCIsYyxwLDApKSk7dC5iKFwiXFxcIiBkYXRhLWNvbW1hbmQ9XFxcInRvZ2dsZS12aXNpYmlsaXR5XFxcIiB0aXRsZT1cXFwiSGlkZS9zaG93IGN1cnJlbnQgZW1vdGVzIGZvciBcIik7dC5iKHQudih0LmYoXCJjaGFubmVsRGlzcGxheU5hbWVcIixjLHAsMCkpKTt0LmIoXCIgKG5vdGU6IG5ldyBlbW90ZXMgd2lsbCBzdGlsbCBzaG93IHVwIGlmIHRoZXkgYXJlIGFkZGVkKVxcXCI+PC9kaXY+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiXHQ8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdDxkaXYgY2xhc3M9XFxcImVtb3RlLWNvbnRhaW5lclxcXCI+PC9kaXY+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiPC9kaXY+XFxyXCIpO3QuYihcIlxcblwiKTtyZXR1cm4gdC5mbCgpOyB9LHBhcnRpYWxzOiB7fSwgc3ViczogeyAgfX0pO1xuICAgIHRlbXBsYXRlc1snbWVudSddID0gbmV3IEhvZ2FuLlRlbXBsYXRlKHtjb2RlOiBmdW5jdGlvbiAoYyxwLGkpIHsgdmFyIHQ9dGhpczt0LmIoaT1pfHxcIlwiKTt0LmIoXCI8ZGl2IGNsYXNzPVxcXCJlbW90ZS1tZW51XFxcIiBpZD1cXFwiZW1vdGUtbWVudS1mb3ItdHdpdGNoXFxcIj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdDxkaXYgY2xhc3M9XFxcImVtb3RlLW1lbnUtaW5uZXJcXFwiPlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIlx0XHQ8ZGl2IGNsYXNzPVxcXCJkcmFnZ2FibGVcXFwiPjwvZGl2PlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIlx0XHQ8ZGl2IGNsYXNzPVxcXCJzY3JvbGxhYmxlIHNjcm9sbGJhci1tYWNvc3hcXFwiPlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIlx0XHRcdDxkaXYgY2xhc3M9XFxcImdyb3VwLWNvbnRhaW5lclxcXCIgaWQ9XFxcImFsbC1lbW90ZXMtZ3JvdXBcXFwiPjwvZGl2PlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIlx0XHQ8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdFx0PGRpdiBjbGFzcz1cXFwic3RpY2t5XFxcIj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdFx0XHQ8ZGl2IGNsYXNzPVxcXCJncm91cC1oZWFkZXIgc2luZ2xlLXJvd1xcXCIgaWQ9XFxcInN0YXJyZWQtZW1vdGVzLWdyb3VwXFxcIj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdFx0XHRcdDxkaXYgY2xhc3M9XFxcImhlYWRlci1pbmZvXFxcIj5GYXZvcml0ZSBFbW90ZXM8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdFx0XHRcdDxkaXYgY2xhc3M9XFxcImVtb3RlLWNvbnRhaW5lclxcXCI+PC9kaXY+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiXHRcdFx0PC9kaXY+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiXFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiXHRcdFx0PGRpdiBjbGFzcz1cXFwiZm9vdGVyXFxcIj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdFx0XHRcdDxhIGNsYXNzPVxcXCJwdWxsLWxlZnQgaWNvbiBpY29uLWhvbWVcXFwiIGhyZWY9XFxcImh0dHA6Ly9jbGV0dXNjLmdpdGh1Yi5pby9Vc2Vyc2NyaXB0LS1Ud2l0Y2gtQ2hhdC1FbW90ZXNcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiB0aXRsZT1cXFwiVmlzaXQgdGhlIGhvbWVwYWdlIHdoZXJlIHlvdSBjYW4gZG9uYXRlLCBwb3N0IGEgcmV2aWV3LCBvciBjb250YWN0IHRoZSBkZXZlbG9wZXJcXFwiPjwvYT5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdFx0XHRcdDxhIGNsYXNzPVxcXCJwdWxsLWxlZnQgaWNvbiBpY29uLWdlYXJcXFwiIGRhdGEtY29tbWFuZD1cXFwidG9nZ2xlLWVkaXRpbmdcXFwiIHRpdGxlPVxcXCJUb2dnbGUgZWRpdCBtb2RlXFxcIj48L2E+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiXHRcdFx0XHQ8YSBjbGFzcz1cXFwicHVsbC1yaWdodCBpY29uIGljb24tcmVzaXplLWhhbmRsZVxcXCIgZGF0YS1jb21tYW5kPVxcXCJyZXNpemUtaGFuZGxlXFxcIj48L2E+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiXHRcdFx0XHQ8YSBjbGFzcz1cXFwicHVsbC1yaWdodCBpY29uIGljb24tcGluXFxcIiBkYXRhLWNvbW1hbmQ9XFxcInRvZ2dsZS1waW5uZWRcXFwiIHRpdGxlPVxcXCJQaW4vdW5waW4gdGhlIGVtb3RlIG1lbnUgdG8gdGhlIHNjcmVlblxcXCI+PC9hPlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIlx0XHRcdDwvZGl2PlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIlx0XHQ8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdDwvZGl2PlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIjwvZGl2PlxcclwiKTt0LmIoXCJcXG5cIik7cmV0dXJuIHQuZmwoKTsgfSxwYXJ0aWFsczoge30sIHN1YnM6IHsgIH19KTtcbiAgICB0ZW1wbGF0ZXNbJ25ld3NNZXNzYWdlJ10gPSBuZXcgSG9nYW4uVGVtcGxhdGUoe2NvZGU6IGZ1bmN0aW9uIChjLHAsaSkgeyB2YXIgdD10aGlzO3QuYihpPWl8fFwiXCIpO3QuYihcIlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIjxkaXYgY2xhc3M9XFxcInR3aXRjaC1jaGF0LWVtb3Rlcy1uZXdzXFxcIj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCJcdFtcIik7dC5iKHQudih0LmYoXCJzY3JpcHROYW1lXCIsYyxwLDApKSk7dC5iKFwiXSBOZXdzOiBcIik7dC5iKHQudCh0LmYoXCJtZXNzYWdlXCIsYyxwLDApKSk7dC5iKFwiICg8YSBocmVmPVxcXCIjXFxcIiBkYXRhLWNvbW1hbmQ9XFxcInR3aXRjaC1jaGF0LWVtb3RlczpkaXNtaXNzLW5ld3NcXFwiIGRhdGEtbmV3cy1pZD1cXFwiXCIpO3QuYih0LnYodC5mKFwiaWRcIixjLHAsMCkpKTt0LmIoXCJcXFwiPkRpc21pc3M8L2E+KVxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIjwvZGl2PlxcclwiKTt0LmIoXCJcXG5cIik7cmV0dXJuIHQuZmwoKTsgfSxwYXJ0aWFsczoge30sIHN1YnM6IHsgIH19KTtcbiAgICByZXR1cm4gdGVtcGxhdGVzO1xufSkoKTsiLCIvKlxuICogIENvcHlyaWdodCAyMDExIFR3aXR0ZXIsIEluYy5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbnZhciBIb2dhbiA9IHt9O1xuXG4oZnVuY3Rpb24gKEhvZ2FuKSB7XG4gIEhvZ2FuLlRlbXBsYXRlID0gZnVuY3Rpb24gKGNvZGVPYmosIHRleHQsIGNvbXBpbGVyLCBvcHRpb25zKSB7XG4gICAgY29kZU9iaiA9IGNvZGVPYmogfHwge307XG4gICAgdGhpcy5yID0gY29kZU9iai5jb2RlIHx8IHRoaXMucjtcbiAgICB0aGlzLmMgPSBjb21waWxlcjtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMudGV4dCA9IHRleHQgfHwgJyc7XG4gICAgdGhpcy5wYXJ0aWFscyA9IGNvZGVPYmoucGFydGlhbHMgfHwge307XG4gICAgdGhpcy5zdWJzID0gY29kZU9iai5zdWJzIHx8IHt9O1xuICAgIHRoaXMuYnVmID0gJyc7XG4gIH1cblxuICBIb2dhbi5UZW1wbGF0ZS5wcm90b3R5cGUgPSB7XG4gICAgLy8gcmVuZGVyOiByZXBsYWNlZCBieSBnZW5lcmF0ZWQgY29kZS5cbiAgICByOiBmdW5jdGlvbiAoY29udGV4dCwgcGFydGlhbHMsIGluZGVudCkgeyByZXR1cm4gJyc7IH0sXG5cbiAgICAvLyB2YXJpYWJsZSBlc2NhcGluZ1xuICAgIHY6IGhvZ2FuRXNjYXBlLFxuXG4gICAgLy8gdHJpcGxlIHN0YWNoZVxuICAgIHQ6IGNvZXJjZVRvU3RyaW5nLFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoY29udGV4dCwgcGFydGlhbHMsIGluZGVudCkge1xuICAgICAgcmV0dXJuIHRoaXMucmkoW2NvbnRleHRdLCBwYXJ0aWFscyB8fCB7fSwgaW5kZW50KTtcbiAgICB9LFxuXG4gICAgLy8gcmVuZGVyIGludGVybmFsIC0tIGEgaG9vayBmb3Igb3ZlcnJpZGVzIHRoYXQgY2F0Y2hlcyBwYXJ0aWFscyB0b29cbiAgICByaTogZnVuY3Rpb24gKGNvbnRleHQsIHBhcnRpYWxzLCBpbmRlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnIoY29udGV4dCwgcGFydGlhbHMsIGluZGVudCk7XG4gICAgfSxcblxuICAgIC8vIGVuc3VyZVBhcnRpYWxcbiAgICBlcDogZnVuY3Rpb24oc3ltYm9sLCBwYXJ0aWFscykge1xuICAgICAgdmFyIHBhcnRpYWwgPSB0aGlzLnBhcnRpYWxzW3N5bWJvbF07XG5cbiAgICAgIC8vIGNoZWNrIHRvIHNlZSB0aGF0IGlmIHdlJ3ZlIGluc3RhbnRpYXRlZCB0aGlzIHBhcnRpYWwgYmVmb3JlXG4gICAgICB2YXIgdGVtcGxhdGUgPSBwYXJ0aWFsc1twYXJ0aWFsLm5hbWVdO1xuICAgICAgaWYgKHBhcnRpYWwuaW5zdGFuY2UgJiYgcGFydGlhbC5iYXNlID09IHRlbXBsYXRlKSB7XG4gICAgICAgIHJldHVybiBwYXJ0aWFsLmluc3RhbmNlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRlbXBsYXRlID09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICghdGhpcy5jKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29tcGlsZXIgYXZhaWxhYmxlLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wbGF0ZSA9IHRoaXMuYy5jb21waWxlKHRlbXBsYXRlLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRlbXBsYXRlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSB1c2UgdGhpcyB0byBjaGVjayB3aGV0aGVyIHRoZSBwYXJ0aWFscyBkaWN0aW9uYXJ5IGhhcyBjaGFuZ2VkXG4gICAgICB0aGlzLnBhcnRpYWxzW3N5bWJvbF0uYmFzZSA9IHRlbXBsYXRlO1xuXG4gICAgICBpZiAocGFydGlhbC5zdWJzKSB7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBjb25zaWRlciBwYXJlbnQgdGVtcGxhdGUgbm93XG4gICAgICAgIGlmICghcGFydGlhbHMuc3RhY2tUZXh0KSBwYXJ0aWFscy5zdGFja1RleHQgPSB7fTtcbiAgICAgICAgZm9yIChrZXkgaW4gcGFydGlhbC5zdWJzKSB7XG4gICAgICAgICAgaWYgKCFwYXJ0aWFscy5zdGFja1RleHRba2V5XSkge1xuICAgICAgICAgICAgcGFydGlhbHMuc3RhY2tUZXh0W2tleV0gPSAodGhpcy5hY3RpdmVTdWIgIT09IHVuZGVmaW5lZCAmJiBwYXJ0aWFscy5zdGFja1RleHRbdGhpcy5hY3RpdmVTdWJdKSA/IHBhcnRpYWxzLnN0YWNrVGV4dFt0aGlzLmFjdGl2ZVN1Yl0gOiB0aGlzLnRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRlbXBsYXRlID0gY3JlYXRlU3BlY2lhbGl6ZWRQYXJ0aWFsKHRlbXBsYXRlLCBwYXJ0aWFsLnN1YnMsIHBhcnRpYWwucGFydGlhbHMsXG4gICAgICAgICAgdGhpcy5zdGFja1N1YnMsIHRoaXMuc3RhY2tQYXJ0aWFscywgcGFydGlhbHMuc3RhY2tUZXh0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFydGlhbHNbc3ltYm9sXS5pbnN0YW5jZSA9IHRlbXBsYXRlO1xuXG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfSxcblxuICAgIC8vIHRyaWVzIHRvIGZpbmQgYSBwYXJ0aWFsIGluIHRoZSBjdXJyZW50IHNjb3BlIGFuZCByZW5kZXIgaXRcbiAgICBycDogZnVuY3Rpb24oc3ltYm9sLCBjb250ZXh0LCBwYXJ0aWFscywgaW5kZW50KSB7XG4gICAgICB2YXIgcGFydGlhbCA9IHRoaXMuZXAoc3ltYm9sLCBwYXJ0aWFscyk7XG4gICAgICBpZiAoIXBhcnRpYWwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFydGlhbC5yaShjb250ZXh0LCBwYXJ0aWFscywgaW5kZW50KTtcbiAgICB9LFxuXG4gICAgLy8gcmVuZGVyIGEgc2VjdGlvblxuICAgIHJzOiBmdW5jdGlvbihjb250ZXh0LCBwYXJ0aWFscywgc2VjdGlvbikge1xuICAgICAgdmFyIHRhaWwgPSBjb250ZXh0W2NvbnRleHQubGVuZ3RoIC0gMV07XG5cbiAgICAgIGlmICghaXNBcnJheSh0YWlsKSkge1xuICAgICAgICBzZWN0aW9uKGNvbnRleHQsIHBhcnRpYWxzLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhaWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29udGV4dC5wdXNoKHRhaWxbaV0pO1xuICAgICAgICBzZWN0aW9uKGNvbnRleHQsIHBhcnRpYWxzLCB0aGlzKTtcbiAgICAgICAgY29udGV4dC5wb3AoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gbWF5YmUgc3RhcnQgYSBzZWN0aW9uXG4gICAgczogZnVuY3Rpb24odmFsLCBjdHgsIHBhcnRpYWxzLCBpbnZlcnRlZCwgc3RhcnQsIGVuZCwgdGFncykge1xuICAgICAgdmFyIHBhc3M7XG5cbiAgICAgIGlmIChpc0FycmF5KHZhbCkgJiYgdmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdmFsID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFsID0gdGhpcy5tcyh2YWwsIGN0eCwgcGFydGlhbHMsIGludmVydGVkLCBzdGFydCwgZW5kLCB0YWdzKTtcbiAgICAgIH1cblxuICAgICAgcGFzcyA9ICEhdmFsO1xuXG4gICAgICBpZiAoIWludmVydGVkICYmIHBhc3MgJiYgY3R4KSB7XG4gICAgICAgIGN0eC5wdXNoKCh0eXBlb2YgdmFsID09ICdvYmplY3QnKSA/IHZhbCA6IGN0eFtjdHgubGVuZ3RoIC0gMV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFzcztcbiAgICB9LFxuXG4gICAgLy8gZmluZCB2YWx1ZXMgd2l0aCBkb3R0ZWQgbmFtZXNcbiAgICBkOiBmdW5jdGlvbihrZXksIGN0eCwgcGFydGlhbHMsIHJldHVybkZvdW5kKSB7XG4gICAgICB2YXIgZm91bmQsXG4gICAgICAgICAgbmFtZXMgPSBrZXkuc3BsaXQoJy4nKSxcbiAgICAgICAgICB2YWwgPSB0aGlzLmYobmFtZXNbMF0sIGN0eCwgcGFydGlhbHMsIHJldHVybkZvdW5kKSxcbiAgICAgICAgICBkb01vZGVsR2V0ID0gdGhpcy5vcHRpb25zLm1vZGVsR2V0LFxuICAgICAgICAgIGN4ID0gbnVsbDtcblxuICAgICAgaWYgKGtleSA9PT0gJy4nICYmIGlzQXJyYXkoY3R4W2N0eC5sZW5ndGggLSAyXSkpIHtcbiAgICAgICAgdmFsID0gY3R4W2N0eC5sZW5ndGggLSAxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBmb3VuZCA9IGZpbmRJblNjb3BlKG5hbWVzW2ldLCB2YWwsIGRvTW9kZWxHZXQpO1xuICAgICAgICAgIGlmIChmb3VuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjeCA9IHZhbDtcbiAgICAgICAgICAgIHZhbCA9IGZvdW5kO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWwgPSAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHJldHVybkZvdW5kICYmICF2YWwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJldHVybkZvdW5kICYmIHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjdHgucHVzaChjeCk7XG4gICAgICAgIHZhbCA9IHRoaXMubXYodmFsLCBjdHgsIHBhcnRpYWxzKTtcbiAgICAgICAgY3R4LnBvcCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsO1xuICAgIH0sXG5cbiAgICAvLyBmaW5kIHZhbHVlcyB3aXRoIG5vcm1hbCBuYW1lc1xuICAgIGY6IGZ1bmN0aW9uKGtleSwgY3R4LCBwYXJ0aWFscywgcmV0dXJuRm91bmQpIHtcbiAgICAgIHZhciB2YWwgPSBmYWxzZSxcbiAgICAgICAgICB2ID0gbnVsbCxcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlLFxuICAgICAgICAgIGRvTW9kZWxHZXQgPSB0aGlzLm9wdGlvbnMubW9kZWxHZXQ7XG5cbiAgICAgIGZvciAodmFyIGkgPSBjdHgubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdiA9IGN0eFtpXTtcbiAgICAgICAgdmFsID0gZmluZEluU2NvcGUoa2V5LCB2LCBkb01vZGVsR2V0KTtcbiAgICAgICAgaWYgKHZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgcmV0dXJuIChyZXR1cm5Gb3VuZCkgPyBmYWxzZSA6IFwiXCI7XG4gICAgICB9XG5cbiAgICAgIGlmICghcmV0dXJuRm91bmQgJiYgdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbCA9IHRoaXMubXYodmFsLCBjdHgsIHBhcnRpYWxzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9LFxuXG4gICAgLy8gaGlnaGVyIG9yZGVyIHRlbXBsYXRlc1xuICAgIGxzOiBmdW5jdGlvbihmdW5jLCBjeCwgcGFydGlhbHMsIHRleHQsIHRhZ3MpIHtcbiAgICAgIHZhciBvbGRUYWdzID0gdGhpcy5vcHRpb25zLmRlbGltaXRlcnM7XG5cbiAgICAgIHRoaXMub3B0aW9ucy5kZWxpbWl0ZXJzID0gdGFncztcbiAgICAgIHRoaXMuYih0aGlzLmN0KGNvZXJjZVRvU3RyaW5nKGZ1bmMuY2FsbChjeCwgdGV4dCkpLCBjeCwgcGFydGlhbHMpKTtcbiAgICAgIHRoaXMub3B0aW9ucy5kZWxpbWl0ZXJzID0gb2xkVGFncztcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvLyBjb21waWxlIHRleHRcbiAgICBjdDogZnVuY3Rpb24odGV4dCwgY3gsIHBhcnRpYWxzKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVMYW1iZGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMYW1iZGEgZmVhdHVyZXMgZGlzYWJsZWQuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5jLmNvbXBpbGUodGV4dCwgdGhpcy5vcHRpb25zKS5yZW5kZXIoY3gsIHBhcnRpYWxzKTtcbiAgICB9LFxuXG4gICAgLy8gdGVtcGxhdGUgcmVzdWx0IGJ1ZmZlcmluZ1xuICAgIGI6IGZ1bmN0aW9uKHMpIHsgdGhpcy5idWYgKz0gczsgfSxcblxuICAgIGZsOiBmdW5jdGlvbigpIHsgdmFyIHIgPSB0aGlzLmJ1ZjsgdGhpcy5idWYgPSAnJzsgcmV0dXJuIHI7IH0sXG5cbiAgICAvLyBtZXRob2QgcmVwbGFjZSBzZWN0aW9uXG4gICAgbXM6IGZ1bmN0aW9uKGZ1bmMsIGN0eCwgcGFydGlhbHMsIGludmVydGVkLCBzdGFydCwgZW5kLCB0YWdzKSB7XG4gICAgICB2YXIgdGV4dFNvdXJjZSxcbiAgICAgICAgICBjeCA9IGN0eFtjdHgubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgcmVzdWx0ID0gZnVuYy5jYWxsKGN4KTtcblxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAoaW52ZXJ0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXh0U291cmNlID0gKHRoaXMuYWN0aXZlU3ViICYmIHRoaXMuc3Vic1RleHQgJiYgdGhpcy5zdWJzVGV4dFt0aGlzLmFjdGl2ZVN1Yl0pID8gdGhpcy5zdWJzVGV4dFt0aGlzLmFjdGl2ZVN1Yl0gOiB0aGlzLnRleHQ7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubHMocmVzdWx0LCBjeCwgcGFydGlhbHMsIHRleHRTb3VyY2Uuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpLCB0YWdzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICAvLyBtZXRob2QgcmVwbGFjZSB2YXJpYWJsZVxuICAgIG12OiBmdW5jdGlvbihmdW5jLCBjdHgsIHBhcnRpYWxzKSB7XG4gICAgICB2YXIgY3ggPSBjdHhbY3R4Lmxlbmd0aCAtIDFdO1xuICAgICAgdmFyIHJlc3VsdCA9IGZ1bmMuY2FsbChjeCk7XG5cbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3QoY29lcmNlVG9TdHJpbmcocmVzdWx0LmNhbGwoY3gpKSwgY3gsIHBhcnRpYWxzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgc3ViOiBmdW5jdGlvbihuYW1lLCBjb250ZXh0LCBwYXJ0aWFscywgaW5kZW50KSB7XG4gICAgICB2YXIgZiA9IHRoaXMuc3Vic1tuYW1lXTtcbiAgICAgIGlmIChmKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlU3ViID0gbmFtZTtcbiAgICAgICAgZihjb250ZXh0LCBwYXJ0aWFscywgdGhpcywgaW5kZW50KTtcbiAgICAgICAgdGhpcy5hY3RpdmVTdWIgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICAvL0ZpbmQgYSBrZXkgaW4gYW4gb2JqZWN0XG4gIGZ1bmN0aW9uIGZpbmRJblNjb3BlKGtleSwgc2NvcGUsIGRvTW9kZWxHZXQpIHtcbiAgICB2YXIgdmFsO1xuXG4gICAgaWYgKHNjb3BlICYmIHR5cGVvZiBzY29wZSA9PSAnb2JqZWN0Jykge1xuXG4gICAgICBpZiAoc2NvcGVba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbCA9IHNjb3BlW2tleV07XG5cbiAgICAgIC8vIHRyeSBsb29rdXAgd2l0aCBnZXQgZm9yIGJhY2tib25lIG9yIHNpbWlsYXIgbW9kZWwgZGF0YVxuICAgICAgfSBlbHNlIGlmIChkb01vZGVsR2V0ICYmIHNjb3BlLmdldCAmJiB0eXBlb2Ygc2NvcGUuZ2V0ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFsID0gc2NvcGUuZ2V0KGtleSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNwZWNpYWxpemVkUGFydGlhbChpbnN0YW5jZSwgc3VicywgcGFydGlhbHMsIHN0YWNrU3Vicywgc3RhY2tQYXJ0aWFscywgc3RhY2tUZXh0KSB7XG4gICAgZnVuY3Rpb24gUGFydGlhbFRlbXBsYXRlKCkge307XG4gICAgUGFydGlhbFRlbXBsYXRlLnByb3RvdHlwZSA9IGluc3RhbmNlO1xuICAgIGZ1bmN0aW9uIFN1YnN0aXR1dGlvbnMoKSB7fTtcbiAgICBTdWJzdGl0dXRpb25zLnByb3RvdHlwZSA9IGluc3RhbmNlLnN1YnM7XG4gICAgdmFyIGtleTtcbiAgICB2YXIgcGFydGlhbCA9IG5ldyBQYXJ0aWFsVGVtcGxhdGUoKTtcbiAgICBwYXJ0aWFsLnN1YnMgPSBuZXcgU3Vic3RpdHV0aW9ucygpO1xuICAgIHBhcnRpYWwuc3Vic1RleHQgPSB7fTsgIC8vaGVoZS4gc3Vic3RleHQuXG4gICAgcGFydGlhbC5idWYgPSAnJztcblxuICAgIHN0YWNrU3VicyA9IHN0YWNrU3VicyB8fCB7fTtcbiAgICBwYXJ0aWFsLnN0YWNrU3VicyA9IHN0YWNrU3VicztcbiAgICBwYXJ0aWFsLnN1YnNUZXh0ID0gc3RhY2tUZXh0O1xuICAgIGZvciAoa2V5IGluIHN1YnMpIHtcbiAgICAgIGlmICghc3RhY2tTdWJzW2tleV0pIHN0YWNrU3Vic1trZXldID0gc3Vic1trZXldO1xuICAgIH1cbiAgICBmb3IgKGtleSBpbiBzdGFja1N1YnMpIHtcbiAgICAgIHBhcnRpYWwuc3Vic1trZXldID0gc3RhY2tTdWJzW2tleV07XG4gICAgfVxuXG4gICAgc3RhY2tQYXJ0aWFscyA9IHN0YWNrUGFydGlhbHMgfHwge307XG4gICAgcGFydGlhbC5zdGFja1BhcnRpYWxzID0gc3RhY2tQYXJ0aWFscztcbiAgICBmb3IgKGtleSBpbiBwYXJ0aWFscykge1xuICAgICAgaWYgKCFzdGFja1BhcnRpYWxzW2tleV0pIHN0YWNrUGFydGlhbHNba2V5XSA9IHBhcnRpYWxzW2tleV07XG4gICAgfVxuICAgIGZvciAoa2V5IGluIHN0YWNrUGFydGlhbHMpIHtcbiAgICAgIHBhcnRpYWwucGFydGlhbHNba2V5XSA9IHN0YWNrUGFydGlhbHNba2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFydGlhbDtcbiAgfVxuXG4gIHZhciByQW1wID0gLyYvZyxcbiAgICAgIHJMdCA9IC88L2csXG4gICAgICByR3QgPSAvPi9nLFxuICAgICAgckFwb3MgPSAvXFwnL2csXG4gICAgICByUXVvdCA9IC9cXFwiL2csXG4gICAgICBoQ2hhcnMgPSAvWyY8PlxcXCJcXCddLztcblxuICBmdW5jdGlvbiBjb2VyY2VUb1N0cmluZyh2YWwpIHtcbiAgICByZXR1cm4gU3RyaW5nKCh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpID8gJycgOiB2YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gaG9nYW5Fc2NhcGUoc3RyKSB7XG4gICAgc3RyID0gY29lcmNlVG9TdHJpbmcoc3RyKTtcbiAgICByZXR1cm4gaENoYXJzLnRlc3Qoc3RyKSA/XG4gICAgICBzdHJcbiAgICAgICAgLnJlcGxhY2UockFtcCwgJyZhbXA7JylcbiAgICAgICAgLnJlcGxhY2Uockx0LCAnJmx0OycpXG4gICAgICAgIC5yZXBsYWNlKHJHdCwgJyZndDsnKVxuICAgICAgICAucmVwbGFjZShyQXBvcywgJyYjMzk7JylcbiAgICAgICAgLnJlcGxhY2UoclF1b3QsICcmcXVvdDsnKSA6XG4gICAgICBzdHI7XG4gIH1cblxuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24oYSkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbn0pKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyA/IGV4cG9ydHMgOiBIb2dhbik7XG4iLCIvKipcbiAqIGpRdWVyeSBDU1MgQ3VzdG9taXphYmxlIFNjcm9sbGJhclxuICpcbiAqIENvcHlyaWdodCAyMDE0LCBZdXJpeSBLaGFiYXJvdlxuICogRHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIG9yIEdQTCBWZXJzaW9uIDIgbGljZW5zZXMuXG4gKlxuICogSWYgeW91IGZvdW5kIGJ1ZywgcGxlYXNlIGNvbnRhY3QgbWUgdmlhIGVtYWlsIDwxM3JlYWwwMDhAZ21haWwuY29tPlxuICpcbiAqIEBhdXRob3IgWXVyaXkgS2hhYmFyb3YgYWthIEdyb21vXG4gKiBAdmVyc2lvbiAwLjIuNlxuICogQHVybCBodHRwczovL2dpdGh1Yi5jb20vZ3JvbW8vanF1ZXJ5LnNjcm9sbGJhci9cbiAqXG4gKi9cbihmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gaCh0KXtpZihvLndlYmtpdCYmIXQpe3JldHVybntoZWlnaHQ6MCx3aWR0aDowfX1pZighby5kYXRhLm91dGVyKXt2YXIgbj17Ym9yZGVyOlwibm9uZVwiLFwiYm94LXNpemluZ1wiOlwiY29udGVudC1ib3hcIixoZWlnaHQ6XCIyMDBweFwiLG1hcmdpbjpcIjBcIixwYWRkaW5nOlwiMFwiLHdpZHRoOlwiMjAwcHhcIn07by5kYXRhLmlubmVyPWUoXCI8ZGl2PlwiKS5jc3MoZS5leHRlbmQoe30sbikpO28uZGF0YS5vdXRlcj1lKFwiPGRpdj5cIikuY3NzKGUuZXh0ZW5kKHtsZWZ0OlwiLTEwMDBweFwiLG92ZXJmbG93Olwic2Nyb2xsXCIscG9zaXRpb246XCJhYnNvbHV0ZVwiLHRvcDpcIi0xMDAwcHhcIn0sbikpLmFwcGVuZChvLmRhdGEuaW5uZXIpLmFwcGVuZFRvKFwiYm9keVwiKX1vLmRhdGEub3V0ZXIuc2Nyb2xsTGVmdCgxZTMpLnNjcm9sbFRvcCgxZTMpO3JldHVybntoZWlnaHQ6TWF0aC5jZWlsKG8uZGF0YS5vdXRlci5vZmZzZXQoKS50b3Atby5kYXRhLmlubmVyLm9mZnNldCgpLnRvcHx8MCksd2lkdGg6TWF0aC5jZWlsKG8uZGF0YS5vdXRlci5vZmZzZXQoKS5sZWZ0LW8uZGF0YS5pbm5lci5vZmZzZXQoKS5sZWZ0fHwwKX19ZnVuY3Rpb24gcChuLHIpe2UodCkub24oe1wiYmx1ci5zY3JvbGxiYXJcIjpmdW5jdGlvbigpe2UodCkuYWRkKFwiYm9keVwiKS5vZmYoXCIuc2Nyb2xsYmFyXCIpO24mJm4oKX0sXCJkcmFnc3RhcnQuc2Nyb2xsYmFyXCI6ZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpO3JldHVybiBmYWxzZX0sXCJtb3VzZXVwLnNjcm9sbGJhclwiOmZ1bmN0aW9uKCl7ZSh0KS5hZGQoXCJib2R5XCIpLm9mZihcIi5zY3JvbGxiYXJcIik7biYmbigpfX0pO2UoXCJib2R5XCIpLm9uKHtcInNlbGVjdHN0YXJ0LnNjcm9sbGJhclwiOmZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKTtyZXR1cm4gZmFsc2V9fSk7ciYmci5wcmV2ZW50RGVmYXVsdCgpO3JldHVybiBmYWxzZX1mdW5jdGlvbiBkKCl7dmFyIGU9aCh0cnVlKTtyZXR1cm4hKGUuaGVpZ2h0fHxlLndpZHRoKX1mdW5jdGlvbiB2KGUpe3ZhciB0PWUub3JpZ2luYWxFdmVudDtpZih0LmF4aXMmJnQuYXhpcz09PXQuSE9SSVpPTlRBTF9BWElTKXJldHVybiBmYWxzZTtpZih0LndoZWVsRGVsdGFYKXJldHVybiBmYWxzZTtyZXR1cm4gdHJ1ZX12YXIgcj1mYWxzZTt2YXIgaT0xLHM9XCJweFwiO3ZhciBvPXtkYXRhOnt9LG1hY29zeDpuLm5hdmlnYXRvci5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJtYWNcIikhPT0tMSxtb2JpbGU6L0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5L2kudGVzdChuLm5hdmlnYXRvci51c2VyQWdlbnQpLG92ZXJsYXk6bnVsbCxzY3JvbGw6bnVsbCxzY3JvbGxzOltdLHdlYmtpdDovV2ViS2l0Ly50ZXN0KG4ubmF2aWdhdG9yLnVzZXJBZ2VudCksbG9nOnI/ZnVuY3Rpb24odCxyKXt2YXIgaT10O2lmKHImJnR5cGVvZiB0IT1cInN0cmluZ1wiKXtpPVtdO2UuZWFjaCh0LGZ1bmN0aW9uKGUsdCl7aS5wdXNoKCdcIicrZSsnXCI6ICcrdCl9KTtpPWkuam9pbihcIiwgXCIpfWlmKG4uY29uc29sZSYmbi5jb25zb2xlLmxvZyl7bi5jb25zb2xlLmxvZyhpKX1lbHNle2FsZXJ0KGkpfX06ZnVuY3Rpb24oKXt9fTt2YXIgdT17YXV0b1Njcm9sbFNpemU6dHJ1ZSxhdXRvVXBkYXRlOnRydWUsZGVidWc6ZmFsc2UsZGlzYWJsZUJvZHlTY3JvbGw6ZmFsc2UsZHVyYXRpb246MjAwLGlnbm9yZU1vYmlsZTp0cnVlLGlnbm9yZU92ZXJsYXk6dHJ1ZSxzY3JvbGxTdGVwOjMwLHNob3dBcnJvd3M6ZmFsc2Usc3RlcFNjcm9sbGluZzp0cnVlLHR5cGU6XCJzaW1wbGVcIixzY3JvbGx4Om51bGwsc2Nyb2xseTpudWxsLG9uRGVzdHJveTpudWxsLG9uSW5pdDpudWxsLG9uU2Nyb2xsOm51bGwsb25VcGRhdGU6bnVsbH07dmFyIGE9ZnVuY3Rpb24odCxyKXtpZighby5zY3JvbGwpe28ubG9nKFwiSW5pdCBqUXVlcnkgU2Nyb2xsYmFyIHYwLjIuNlwiKTtvLm92ZXJsYXk9ZCgpO28uc2Nyb2xsPWgoKTtjKCk7ZShuKS5yZXNpemUoZnVuY3Rpb24oKXt2YXIgZT1mYWxzZTtpZihvLnNjcm9sbCYmKG8uc2Nyb2xsLmhlaWdodHx8by5zY3JvbGwud2lkdGgpKXt2YXIgdD1oKCk7aWYodC5oZWlnaHQhPW8uc2Nyb2xsLmhlaWdodHx8dC53aWR0aCE9by5zY3JvbGwud2lkdGgpe28uc2Nyb2xsPXQ7ZT10cnVlfX1jKGUpfSl9dGhpcy5jb250YWluZXI9dDt0aGlzLm9wdGlvbnM9ZS5leHRlbmQoe30sdSxuLmpRdWVyeVNjcm9sbGJhck9wdGlvbnN8fHt9KTt0aGlzLnNjcm9sbFRvPW51bGw7dGhpcy5zY3JvbGx4PXt9O3RoaXMuc2Nyb2xseT17fTt0aGlzLmluaXQocil9O2EucHJvdG90eXBlPXtkZXN0cm95OmZ1bmN0aW9uKCl7aWYoIXRoaXMud3JhcHBlcil7cmV0dXJufXZhciBuPXRoaXMuY29udGFpbmVyLnNjcm9sbExlZnQoKTt2YXIgcj10aGlzLmNvbnRhaW5lci5zY3JvbGxUb3AoKTt0aGlzLmNvbnRhaW5lci5pbnNlcnRCZWZvcmUodGhpcy53cmFwcGVyKS5jc3Moe2hlaWdodDpcIlwiLG1hcmdpbjpcIlwifSkucmVtb3ZlQ2xhc3MoXCJzY3JvbGwtY29udGVudFwiKS5yZW1vdmVDbGFzcyhcInNjcm9sbC1zY3JvbGx4X3Zpc2libGVcIikucmVtb3ZlQ2xhc3MoXCJzY3JvbGwtc2Nyb2xseV92aXNpYmxlXCIpLm9mZihcIi5zY3JvbGxiYXJcIikuc2Nyb2xsTGVmdChuKS5zY3JvbGxUb3Aocik7dGhpcy5zY3JvbGx4LnNjcm9sbGJhci5yZW1vdmVDbGFzcyhcInNjcm9sbC1zY3JvbGx4X3Zpc2libGVcIikuZmluZChcImRpdlwiKS5hbmRTZWxmKCkub2ZmKFwiLnNjcm9sbGJhclwiKTt0aGlzLnNjcm9sbHkuc2Nyb2xsYmFyLnJlbW92ZUNsYXNzKFwic2Nyb2xsLXNjcm9sbHlfdmlzaWJsZVwiKS5maW5kKFwiZGl2XCIpLmFuZFNlbGYoKS5vZmYoXCIuc2Nyb2xsYmFyXCIpO3RoaXMud3JhcHBlci5yZW1vdmUoKTtlKHQpLmFkZChcImJvZHlcIikub2ZmKFwiLnNjcm9sbGJhclwiKTtpZihlLmlzRnVuY3Rpb24odGhpcy5vcHRpb25zLm9uRGVzdHJveSkpdGhpcy5vcHRpb25zLm9uRGVzdHJveS5hcHBseSh0aGlzLFt0aGlzLmNvbnRhaW5lcl0pfSxnZXRTY3JvbGxiYXI6ZnVuY3Rpb24odCl7dmFyIG49dGhpcy5vcHRpb25zW1wic2Nyb2xsXCIrdF07dmFyIHI9e2FkdmFuY2VkOic8ZGl2IGNsYXNzPVwic2Nyb2xsLWVsZW1lbnRfY29ybmVyXCI+PC9kaXY+JysnPGRpdiBjbGFzcz1cInNjcm9sbC1hcnJvdyBzY3JvbGwtYXJyb3dfbGVzc1wiPjwvZGl2PicrJzxkaXYgY2xhc3M9XCJzY3JvbGwtYXJyb3cgc2Nyb2xsLWFycm93X21vcmVcIj48L2Rpdj4nKyc8ZGl2IGNsYXNzPVwic2Nyb2xsLWVsZW1lbnRfb3V0ZXJcIj4nKycgICAgPGRpdiBjbGFzcz1cInNjcm9sbC1lbGVtZW50X3NpemVcIj48L2Rpdj4nKycgICAgPGRpdiBjbGFzcz1cInNjcm9sbC1lbGVtZW50X2lubmVyLXdyYXBwZXJcIj4nKycgICAgICAgIDxkaXYgY2xhc3M9XCJzY3JvbGwtZWxlbWVudF9pbm5lciBzY3JvbGwtZWxlbWVudF90cmFja1wiPicrJyAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzY3JvbGwtZWxlbWVudF9pbm5lci1ib3R0b21cIj48L2Rpdj4nK1wiICAgICAgICA8L2Rpdj5cIitcIiAgICA8L2Rpdj5cIisnICAgIDxkaXYgY2xhc3M9XCJzY3JvbGwtYmFyXCI+JysnICAgICAgICA8ZGl2IGNsYXNzPVwic2Nyb2xsLWJhcl9ib2R5XCI+JysnICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNjcm9sbC1iYXJfYm9keS1pbm5lclwiPjwvZGl2PicrXCIgICAgICAgIDwvZGl2PlwiKycgICAgICAgIDxkaXYgY2xhc3M9XCJzY3JvbGwtYmFyX2JvdHRvbVwiPjwvZGl2PicrJyAgICAgICAgPGRpdiBjbGFzcz1cInNjcm9sbC1iYXJfY2VudGVyXCI+PC9kaXY+JytcIiAgICA8L2Rpdj5cIitcIjwvZGl2PlwiLHNpbXBsZTonPGRpdiBjbGFzcz1cInNjcm9sbC1lbGVtZW50X291dGVyXCI+JysnICAgIDxkaXYgY2xhc3M9XCJzY3JvbGwtZWxlbWVudF9zaXplXCI+PC9kaXY+JysnICAgIDxkaXYgY2xhc3M9XCJzY3JvbGwtZWxlbWVudF90cmFja1wiPjwvZGl2PicrJyAgICA8ZGl2IGNsYXNzPVwic2Nyb2xsLWJhclwiPjwvZGl2PicrXCI8L2Rpdj5cIn07dmFyIGk9clt0aGlzLm9wdGlvbnMudHlwZV0/dGhpcy5vcHRpb25zLnR5cGU6XCJhZHZhbmNlZFwiO2lmKG4pe2lmKHR5cGVvZiBuPT1cInN0cmluZ1wiKXtuPWUobikuYXBwZW5kVG8odGhpcy53cmFwcGVyKX1lbHNle249ZShuKX19ZWxzZXtuPWUoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcInNjcm9sbC1lbGVtZW50XCIpLmh0bWwocltpXSkuYXBwZW5kVG8odGhpcy53cmFwcGVyKX1pZih0aGlzLm9wdGlvbnMuc2hvd0Fycm93cyl7bi5hZGRDbGFzcyhcInNjcm9sbC1lbGVtZW50X2Fycm93c192aXNpYmxlXCIpfXJldHVybiBuLmFkZENsYXNzKFwic2Nyb2xsLVwiK3QpfSxpbml0OmZ1bmN0aW9uKG4pe3ZhciByPXRoaXM7dmFyIHU9dGhpcy5jb250YWluZXI7dmFyIGE9dGhpcy5jb250YWluZXJXcmFwcGVyfHx1O3ZhciBmPWUuZXh0ZW5kKHRoaXMub3B0aW9ucyxufHx7fSk7dmFyIGw9e3g6dGhpcy5zY3JvbGx4LHk6dGhpcy5zY3JvbGx5fTt2YXIgYz10aGlzLndyYXBwZXI7dmFyIGg9e3Njcm9sbExlZnQ6dS5zY3JvbGxMZWZ0KCksc2Nyb2xsVG9wOnUuc2Nyb2xsVG9wKCl9O2lmKG8ubW9iaWxlJiZmLmlnbm9yZU1vYmlsZXx8by5vdmVybGF5JiZmLmlnbm9yZU92ZXJsYXl8fG8ubWFjb3N4JiYhby53ZWJraXQpe3JldHVybiBmYWxzZX1pZighYyl7dGhpcy53cmFwcGVyPWM9ZShcIjxkaXY+XCIpLmFkZENsYXNzKFwic2Nyb2xsLXdyYXBwZXJcIikuYWRkQ2xhc3ModS5hdHRyKFwiY2xhc3NcIikpLmNzcyhcInBvc2l0aW9uXCIsdS5jc3MoXCJwb3NpdGlvblwiKT09XCJhYnNvbHV0ZVwiP1wiYWJzb2x1dGVcIjpcInJlbGF0aXZlXCIpLmluc2VydEJlZm9yZSh1KS5hcHBlbmQodSk7aWYodS5pcyhcInRleHRhcmVhXCIpKXt0aGlzLmNvbnRhaW5lcldyYXBwZXI9YT1lKFwiPGRpdj5cIikuaW5zZXJ0QmVmb3JlKHUpLmFwcGVuZCh1KTtjLmFkZENsYXNzKFwic2Nyb2xsLXRleHRhcmVhXCIpfWEuYWRkQ2xhc3MoXCJzY3JvbGwtY29udGVudFwiKS5jc3Moe2hlaWdodDpcIlwiLFwibWFyZ2luLWJvdHRvbVwiOm8uc2Nyb2xsLmhlaWdodCotMStzLFwibWFyZ2luLXJpZ2h0XCI6by5zY3JvbGwud2lkdGgqLTErc30pO3Uub24oXCJzY3JvbGwuc2Nyb2xsYmFyXCIsZnVuY3Rpb24odCl7aWYoZS5pc0Z1bmN0aW9uKGYub25TY3JvbGwpKXtmLm9uU2Nyb2xsLmNhbGwocix7bWF4U2Nyb2xsOmwueS5tYXhTY3JvbGxPZmZzZXQsc2Nyb2xsOnUuc2Nyb2xsVG9wKCksc2l6ZTpsLnkuc2l6ZSx2aXNpYmxlOmwueS52aXNpYmxlfSx7bWF4U2Nyb2xsOmwueC5tYXhTY3JvbGxPZmZzZXQsc2Nyb2xsOnUuc2Nyb2xsTGVmdCgpLHNpemU6bC54LnNpemUsdmlzaWJsZTpsLngudmlzaWJsZX0pfWwueC5pc1Zpc2libGUmJmwueC5zY3JvbGxlci5jc3MoXCJsZWZ0XCIsdS5zY3JvbGxMZWZ0KCkqbC54Lmt4K3MpO2wueS5pc1Zpc2libGUmJmwueS5zY3JvbGxlci5jc3MoXCJ0b3BcIix1LnNjcm9sbFRvcCgpKmwueS5reCtzKX0pO2Mub24oXCJzY3JvbGxcIixmdW5jdGlvbigpe2Muc2Nyb2xsVG9wKDApLnNjcm9sbExlZnQoMCl9KTtpZihmLmRpc2FibGVCb2R5U2Nyb2xsKXt2YXIgZD1mdW5jdGlvbihlKXt2KGUpP2wueS5pc1Zpc2libGUmJmwueS5tb3VzZXdoZWVsKGUpOmwueC5pc1Zpc2libGUmJmwueC5tb3VzZXdoZWVsKGUpfTtjLm9uKHtcIk1vek1vdXNlUGl4ZWxTY3JvbGwuc2Nyb2xsYmFyXCI6ZCxcIm1vdXNld2hlZWwuc2Nyb2xsYmFyXCI6ZH0pO2lmKG8ubW9iaWxlKXtjLm9uKFwidG91Y2hzdGFydC5zY3JvbGxiYXJcIixmdW5jdGlvbihuKXt2YXIgcj1uLm9yaWdpbmFsRXZlbnQudG91Y2hlcyYmbi5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF18fG47dmFyIGk9e3BhZ2VYOnIucGFnZVgscGFnZVk6ci5wYWdlWX07dmFyIHM9e2xlZnQ6dS5zY3JvbGxMZWZ0KCksdG9wOnUuc2Nyb2xsVG9wKCl9O2UodCkub24oe1widG91Y2htb3ZlLnNjcm9sbGJhclwiOmZ1bmN0aW9uKGUpe3ZhciB0PWUub3JpZ2luYWxFdmVudC50YXJnZXRUb3VjaGVzJiZlLm9yaWdpbmFsRXZlbnQudGFyZ2V0VG91Y2hlc1swXXx8ZTt1LnNjcm9sbExlZnQocy5sZWZ0K2kucGFnZVgtdC5wYWdlWCk7dS5zY3JvbGxUb3Aocy50b3AraS5wYWdlWS10LnBhZ2VZKTtlLnByZXZlbnREZWZhdWx0KCl9LFwidG91Y2hlbmQuc2Nyb2xsYmFyXCI6ZnVuY3Rpb24oKXtlKHQpLm9mZihcIi5zY3JvbGxiYXJcIil9fSl9KX19aWYoZS5pc0Z1bmN0aW9uKGYub25Jbml0KSlmLm9uSW5pdC5hcHBseSh0aGlzLFt1XSl9ZWxzZXthLmNzcyh7aGVpZ2h0OlwiXCIsXCJtYXJnaW4tYm90dG9tXCI6by5zY3JvbGwuaGVpZ2h0Ki0xK3MsXCJtYXJnaW4tcmlnaHRcIjpvLnNjcm9sbC53aWR0aCotMStzfSl9ZS5lYWNoKGwsZnVuY3Rpb24obixzKXt2YXIgbz1udWxsO3ZhciBhPTE7dmFyIGM9bj09XCJ4XCI/XCJzY3JvbGxMZWZ0XCI6XCJzY3JvbGxUb3BcIjt2YXIgaD1mLnNjcm9sbFN0ZXA7dmFyIGQ9ZnVuY3Rpb24oKXt2YXIgZT11W2NdKCk7dVtjXShlK2gpO2lmKGE9PTEmJmUraD49bSllPXVbY10oKTtpZihhPT0tMSYmZStoPD1tKWU9dVtjXSgpO2lmKHVbY10oKT09ZSYmbyl7bygpfX07dmFyIG09MDtpZighcy5zY3JvbGxiYXIpe3Muc2Nyb2xsYmFyPXIuZ2V0U2Nyb2xsYmFyKG4pO3Muc2Nyb2xsZXI9cy5zY3JvbGxiYXIuZmluZChcIi5zY3JvbGwtYmFyXCIpO3MubW91c2V3aGVlbD1mdW5jdGlvbihlKXtpZighcy5pc1Zpc2libGV8fG49PVwieFwiJiZ2KGUpKXtyZXR1cm4gdHJ1ZX1pZihuPT1cInlcIiYmIXYoZSkpe2wueC5tb3VzZXdoZWVsKGUpO3JldHVybiB0cnVlfXZhciB0PWUub3JpZ2luYWxFdmVudC53aGVlbERlbHRhKi0xfHxlLm9yaWdpbmFsRXZlbnQuZGV0YWlsO3ZhciBpPXMuc2l6ZS1zLnZpc2libGUtcy5vZmZzZXQ7aWYoIShtPD0wJiZ0PDB8fG0+PWkmJnQ+MCkpe209bSt0O2lmKG08MCltPTA7aWYobT5pKW09aTtyLnNjcm9sbFRvPXIuc2Nyb2xsVG98fHt9O3Iuc2Nyb2xsVG9bY109bTtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aWYoci5zY3JvbGxUbyl7dS5zdG9wKCkuYW5pbWF0ZShyLnNjcm9sbFRvLDI0MCxcImxpbmVhclwiLGZ1bmN0aW9uKCl7bT11W2NdKCl9KTtyLnNjcm9sbFRvPW51bGx9fSwxKX1lLnByZXZlbnREZWZhdWx0KCk7cmV0dXJuIGZhbHNlfTtzLnNjcm9sbGJhci5vbih7XCJNb3pNb3VzZVBpeGVsU2Nyb2xsLnNjcm9sbGJhclwiOnMubW91c2V3aGVlbCxcIm1vdXNld2hlZWwuc2Nyb2xsYmFyXCI6cy5tb3VzZXdoZWVsLFwibW91c2VlbnRlci5zY3JvbGxiYXJcIjpmdW5jdGlvbigpe209dVtjXSgpfX0pO3Muc2Nyb2xsYmFyLmZpbmQoXCIuc2Nyb2xsLWFycm93LCAuc2Nyb2xsLWVsZW1lbnRfdHJhY2tcIikub24oXCJtb3VzZWRvd24uc2Nyb2xsYmFyXCIsZnVuY3Rpb24odCl7aWYodC53aGljaCE9aSlyZXR1cm4gdHJ1ZTthPTE7dmFyIGw9e2V2ZW50T2Zmc2V0OnRbbj09XCJ4XCI/XCJwYWdlWFwiOlwicGFnZVlcIl0sbWF4U2Nyb2xsVmFsdWU6cy5zaXplLXMudmlzaWJsZS1zLm9mZnNldCxzY3JvbGxiYXJPZmZzZXQ6cy5zY3JvbGxlci5vZmZzZXQoKVtuPT1cInhcIj9cImxlZnRcIjpcInRvcFwiXSxzY3JvbGxiYXJTaXplOnMuc2Nyb2xsZXJbbj09XCJ4XCI/XCJvdXRlcldpZHRoXCI6XCJvdXRlckhlaWdodFwiXSgpfTt2YXIgdj0wLGc9MDtpZihlKHRoaXMpLmhhc0NsYXNzKFwic2Nyb2xsLWFycm93XCIpKXthPWUodGhpcykuaGFzQ2xhc3MoXCJzY3JvbGwtYXJyb3dfbW9yZVwiKT8xOi0xO2g9Zi5zY3JvbGxTdGVwKmE7bT1hPjA/bC5tYXhTY3JvbGxWYWx1ZTowfWVsc2V7YT1sLmV2ZW50T2Zmc2V0Pmwuc2Nyb2xsYmFyT2Zmc2V0K2wuc2Nyb2xsYmFyU2l6ZT8xOmwuZXZlbnRPZmZzZXQ8bC5zY3JvbGxiYXJPZmZzZXQ/LTE6MDtoPU1hdGgucm91bmQocy52aXNpYmxlKi43NSkqYTttPWwuZXZlbnRPZmZzZXQtbC5zY3JvbGxiYXJPZmZzZXQtKGYuc3RlcFNjcm9sbGluZz9hPT0xP2wuc2Nyb2xsYmFyU2l6ZTowOk1hdGgucm91bmQobC5zY3JvbGxiYXJTaXplLzIpKTttPXVbY10oKSttL3Mua3h9ci5zY3JvbGxUbz1yLnNjcm9sbFRvfHx7fTtyLnNjcm9sbFRvW2NdPWYuc3RlcFNjcm9sbGluZz91W2NdKCkraDptO2lmKGYuc3RlcFNjcm9sbGluZyl7bz1mdW5jdGlvbigpe209dVtjXSgpO2NsZWFySW50ZXJ2YWwoZyk7Y2xlYXJUaW1lb3V0KHYpO3Y9MDtnPTB9O3Y9c2V0VGltZW91dChmdW5jdGlvbigpe2c9c2V0SW50ZXJ2YWwoZCw0MCl9LGYuZHVyYXRpb24rMTAwKX1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aWYoci5zY3JvbGxUbyl7dS5hbmltYXRlKHIuc2Nyb2xsVG8sZi5kdXJhdGlvbik7ci5zY3JvbGxUbz1udWxsfX0sMSk7cmV0dXJuIHAobyx0KX0pO3Muc2Nyb2xsZXIub24oXCJtb3VzZWRvd24uc2Nyb2xsYmFyXCIsZnVuY3Rpb24ocil7aWYoci53aGljaCE9aSlyZXR1cm4gdHJ1ZTt2YXIgbz1yW249PVwieFwiP1wicGFnZVhcIjpcInBhZ2VZXCJdO3ZhciBhPXVbY10oKTtzLnNjcm9sbGJhci5hZGRDbGFzcyhcInNjcm9sbC1kcmFnZ2FibGVcIik7ZSh0KS5vbihcIm1vdXNlbW92ZS5zY3JvbGxiYXJcIixmdW5jdGlvbihlKXt2YXIgdD1wYXJzZUludCgoZVtuPT1cInhcIj9cInBhZ2VYXCI6XCJwYWdlWVwiXS1vKS9zLmt4LDEwKTt1W2NdKGErdCl9KTtyZXR1cm4gcChmdW5jdGlvbigpe3Muc2Nyb2xsYmFyLnJlbW92ZUNsYXNzKFwic2Nyb2xsLWRyYWdnYWJsZVwiKTttPXVbY10oKX0scil9KX19KTtlLmVhY2gobCxmdW5jdGlvbihlLHQpe3ZhciBuPVwic2Nyb2xsLXNjcm9sbFwiK2UrXCJfdmlzaWJsZVwiO3ZhciByPWU9PVwieFwiP2wueTpsLng7dC5zY3JvbGxiYXIucmVtb3ZlQ2xhc3Mobik7ci5zY3JvbGxiYXIucmVtb3ZlQ2xhc3Mobik7YS5yZW1vdmVDbGFzcyhuKX0pO2UuZWFjaChsLGZ1bmN0aW9uKHQsbil7ZS5leHRlbmQobix0PT1cInhcIj97b2Zmc2V0OnBhcnNlSW50KHUuY3NzKFwibGVmdFwiKSwxMCl8fDAsc2l6ZTp1LnByb3AoXCJzY3JvbGxXaWR0aFwiKSx2aXNpYmxlOmMud2lkdGgoKX06e29mZnNldDpwYXJzZUludCh1LmNzcyhcInRvcFwiKSwxMCl8fDAsc2l6ZTp1LnByb3AoXCJzY3JvbGxIZWlnaHRcIiksdmlzaWJsZTpjLmhlaWdodCgpfSl9KTt2YXIgbT1mdW5jdGlvbih0LG4pe3ZhciByPVwic2Nyb2xsLXNjcm9sbFwiK3QrXCJfdmlzaWJsZVwiO3ZhciBpPXQ9PVwieFwiP2wueTpsLng7dmFyIGY9cGFyc2VJbnQodS5jc3ModD09XCJ4XCI/XCJsZWZ0XCI6XCJ0b3BcIiksMTApfHwwO3ZhciBoPW4uc2l6ZTt2YXIgcD1uLnZpc2libGUrZjtuLmlzVmlzaWJsZT1oLXA+MTtpZihuLmlzVmlzaWJsZSl7bi5zY3JvbGxiYXIuYWRkQ2xhc3Mocik7aS5zY3JvbGxiYXIuYWRkQ2xhc3Mocik7YS5hZGRDbGFzcyhyKX1lbHNle24uc2Nyb2xsYmFyLnJlbW92ZUNsYXNzKHIpO2kuc2Nyb2xsYmFyLnJlbW92ZUNsYXNzKHIpO2EucmVtb3ZlQ2xhc3Mocil9aWYodD09XCJ5XCImJihuLmlzVmlzaWJsZXx8bi5zaXplPG4udmlzaWJsZSkpe2EuY3NzKFwiaGVpZ2h0XCIscCtvLnNjcm9sbC5oZWlnaHQrcyl9aWYobC54LnNpemUhPXUucHJvcChcInNjcm9sbFdpZHRoXCIpfHxsLnkuc2l6ZSE9dS5wcm9wKFwic2Nyb2xsSGVpZ2h0XCIpfHxsLngudmlzaWJsZSE9Yy53aWR0aCgpfHxsLnkudmlzaWJsZSE9Yy5oZWlnaHQoKXx8bC54Lm9mZnNldCE9KHBhcnNlSW50KHUuY3NzKFwibGVmdFwiKSwxMCl8fDApfHxsLnkub2Zmc2V0IT0ocGFyc2VJbnQodS5jc3MoXCJ0b3BcIiksMTApfHwwKSl7ZS5lYWNoKGwsZnVuY3Rpb24odCxuKXtlLmV4dGVuZChuLHQ9PVwieFwiP3tvZmZzZXQ6cGFyc2VJbnQodS5jc3MoXCJsZWZ0XCIpLDEwKXx8MCxzaXplOnUucHJvcChcInNjcm9sbFdpZHRoXCIpLHZpc2libGU6Yy53aWR0aCgpfTp7b2Zmc2V0OnBhcnNlSW50KHUuY3NzKFwidG9wXCIpLDEwKXx8MCxzaXplOnUucHJvcChcInNjcm9sbEhlaWdodFwiKSx2aXNpYmxlOmMuaGVpZ2h0KCl9KX0pO20odD09XCJ4XCI/XCJ5XCI6XCJ4XCIsaSl9fTtlLmVhY2gobCxtKTtpZihlLmlzRnVuY3Rpb24oZi5vblVwZGF0ZSkpZi5vblVwZGF0ZS5hcHBseSh0aGlzLFt1XSk7ZS5lYWNoKGwsZnVuY3Rpb24oZSx0KXt2YXIgbj1lPT1cInhcIj9cImxlZnRcIjpcInRvcFwiO3ZhciByPWU9PVwieFwiP1wib3V0ZXJXaWR0aFwiOlwib3V0ZXJIZWlnaHRcIjt2YXIgaT1lPT1cInhcIj9cIndpZHRoXCI6XCJoZWlnaHRcIjt2YXIgbz1wYXJzZUludCh1LmNzcyhuKSwxMCl8fDA7dmFyIGE9dC5zaXplO3ZhciBsPXQudmlzaWJsZStvO3ZhciBjPXQuc2Nyb2xsYmFyLmZpbmQoXCIuc2Nyb2xsLWVsZW1lbnRfc2l6ZVwiKTtjPWNbcl0oKSsocGFyc2VJbnQoYy5jc3MobiksMTApfHwwKTtpZihmLmF1dG9TY3JvbGxTaXplKXt0LnNjcm9sbGJhclNpemU9cGFyc2VJbnQoYypsL2EsMTApO3Quc2Nyb2xsZXIuY3NzKGksdC5zY3JvbGxiYXJTaXplK3MpfXQuc2Nyb2xsYmFyU2l6ZT10LnNjcm9sbGVyW3JdKCk7dC5reD0oYy10LnNjcm9sbGJhclNpemUpLyhhLWwpfHwxO3QubWF4U2Nyb2xsT2Zmc2V0PWEtbH0pO3Uuc2Nyb2xsTGVmdChoLnNjcm9sbExlZnQpLnNjcm9sbFRvcChoLnNjcm9sbFRvcCkudHJpZ2dlcihcInNjcm9sbFwiKX19O2UuZm4uc2Nyb2xsYmFyPWZ1bmN0aW9uKHQsbil7dmFyIHI9dGhpcztpZih0PT09XCJnZXRcIilyPW51bGw7dGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGk9ZSh0aGlzKTtpZihpLmhhc0NsYXNzKFwic2Nyb2xsLXdyYXBwZXJcIil8fGkuZ2V0KDApLm5vZGVOYW1lPT1cImJvZHlcIil7cmV0dXJuIHRydWV9dmFyIHM9aS5kYXRhKFwic2Nyb2xsYmFyXCIpO2lmKHMpe2lmKHQ9PT1cImdldFwiKXtyPXM7cmV0dXJuIGZhbHNlfXZhciB1PXR5cGVvZiB0PT1cInN0cmluZ1wiJiZzW3RdP3Q6XCJpbml0XCI7c1t1XS5hcHBseShzLGUuaXNBcnJheShuKT9uOltdKTtpZih0PT09XCJkZXN0cm95XCIpe2kucmVtb3ZlRGF0YShcInNjcm9sbGJhclwiKTt3aGlsZShlLmluQXJyYXkocyxvLnNjcm9sbHMpPj0wKW8uc2Nyb2xscy5zcGxpY2UoZS5pbkFycmF5KHMsby5zY3JvbGxzKSwxKX19ZWxzZXtpZih0eXBlb2YgdCE9XCJzdHJpbmdcIil7cz1uZXcgYShpLHQpO2kuZGF0YShcInNjcm9sbGJhclwiLHMpO28uc2Nyb2xscy5wdXNoKHMpfX1yZXR1cm4gdHJ1ZX0pO3JldHVybiByfTtlLmZuLnNjcm9sbGJhci5vcHRpb25zPXU7aWYobi5hbmd1bGFyKXsoZnVuY3Rpb24oZSl7dmFyIHQ9ZS5tb2R1bGUoXCJqUXVlcnlTY3JvbGxiYXJcIixbXSk7dC5kaXJlY3RpdmUoXCJqcXVlcnlTY3JvbGxiYXJcIixmdW5jdGlvbigpe3JldHVybntsaW5rOmZ1bmN0aW9uKGUsdCl7dC5zY3JvbGxiYXIoZS5vcHRpb25zKS5vbihcIiRkZXN0cm95XCIsZnVuY3Rpb24oKXt0LnNjcm9sbGJhcihcImRlc3Ryb3lcIil9KX0scmVzdHJpbmc6XCJBQ1wiLHNjb3BlOntvcHRpb25zOlwiPWpxdWVyeVNjcm9sbGJhclwifX19KX0pKG4uYW5ndWxhcil9dmFyIGY9MCxsPTA7dmFyIGM9ZnVuY3Rpb24oZSl7dmFyIHQsbixpLHMsdSxhLGg7Zm9yKHQ9MDt0PG8uc2Nyb2xscy5sZW5ndGg7dCsrKXtzPW8uc2Nyb2xsc1t0XTtuPXMuY29udGFpbmVyO2k9cy5vcHRpb25zO3U9cy53cmFwcGVyO2E9cy5zY3JvbGx4O2g9cy5zY3JvbGx5O2lmKGV8fGkuYXV0b1VwZGF0ZSYmdSYmdS5pcyhcIjp2aXNpYmxlXCIpJiYobi5wcm9wKFwic2Nyb2xsV2lkdGhcIikhPWEuc2l6ZXx8bi5wcm9wKFwic2Nyb2xsSGVpZ2h0XCIpIT1oLnNpemV8fHUud2lkdGgoKSE9YS52aXNpYmxlfHx1LmhlaWdodCgpIT1oLnZpc2libGUpKXtzLmluaXQoKTtpZihyKXtvLmxvZyh7c2Nyb2xsSGVpZ2h0Om4ucHJvcChcInNjcm9sbEhlaWdodFwiKStcIjpcIitzLnNjcm9sbHkuc2l6ZSxzY3JvbGxXaWR0aDpuLnByb3AoXCJzY3JvbGxXaWR0aFwiKStcIjpcIitzLnNjcm9sbHguc2l6ZSx2aXNpYmxlSGVpZ2h0OnUuaGVpZ2h0KCkrXCI6XCIrcy5zY3JvbGx5LnZpc2libGUsdmlzaWJsZVdpZHRoOnUud2lkdGgoKStcIjpcIitzLnNjcm9sbHgudmlzaWJsZX0sdHJ1ZSk7bCsrfX19aWYociYmbD4xMCl7by5sb2coXCJTY3JvbGwgdXBkYXRlcyBleGNlZWQgMTBcIik7Yz1mdW5jdGlvbigpe319ZWxzZXtjbGVhclRpbWVvdXQoZik7Zj1zZXRUaW1lb3V0KGMsMzAwKX19fSkoalF1ZXJ5LGRvY3VtZW50LHdpbmRvdyk7IiwiLy8gU3RvcmFnZSBjYWNoZS5cclxudmFyIGNhY2hlID0ge307XHJcbi8vIFRoZSBzdG9yZSBoYW5kbGluZyBleHBpcmF0aW9uIG9mIGRhdGEuXHJcbnZhciBleHBpcmVzU3RvcmUgPSBuZXcgU3RvcmUoe1xyXG5cdG5hbWVzcGFjZTogJ19fc3RvcmFnZS13cmFwcGVyOmV4cGlyZXMnXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JhZ2Ugd3JhcHBlciBmb3IgbWFraW5nIHJvdXRpbmUgc3RvcmFnZSBjYWxscyBzdXBlciBlYXN5LlxyXG4gKiBAY2xhc3MgU3RvcmVcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gICAgICAgICAgICAgICAgICAgICBUaGUgb3B0aW9ucyBmb3IgdGhlIHN0b3JlLiBPcHRpb25zIG5vdCBvdmVycmlkZGVuIHdpbGwgdXNlIHRoZSBkZWZhdWx0cy5cclxuICogQHBhcmFtIHttaXhlZH0gIFtvcHRpb25zLm5hbWVzcGFjZT0nJ10gICAgICAgIFNlZSB7eyNjcm9zc0xpbmsgXCJTdG9yZS9zZXROYW1lc3BhY2VcIn19U3RvcmUjc2V0TmFtZXNwYWNle3svY3Jvc3NMaW5rfX1cclxuICogQHBhcmFtIHttaXhlZH0gIFtvcHRpb25zLnN0b3JhZ2VUeXBlPSdsb2NhbCddIFNlZSB7eyNjcm9zc0xpbmsgXCJTdG9yZS9zZXRTdG9yYWdlVHlwZVwifX1TdG9yZSNzZXRTdG9yYWdlVHlwZXt7L2Nyb3NzTGlua319XHJcbiAqL1xyXG5mdW5jdGlvbiBTdG9yZShvcHRpb25zKSB7XHJcblx0dmFyIHNldHRpbmdzID0ge1xyXG5cdFx0bmFtZXNwYWNlOiAnJyxcclxuXHRcdHN0b3JhZ2VUeXBlOiAnbG9jYWwnXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgc3RvcmFnZSBuYW1lc3BhY2UuXHJcblx0ICogQG1ldGhvZCBzZXROYW1lc3BhY2VcclxuXHQgKiBAcGFyYW0ge3N0cmluZ3xmYWxzZXxudWxsfSBuYW1lc3BhY2UgVGhlIG5hbWVzcGFjZSB0byB3b3JrIHVuZGVyLiBUbyB1c2Ugbm8gbmFtZXNwYWNlIChlLmcuIGdsb2JhbCBuYW1lc3BhY2UpLCBwYXNzIGluIGBmYWxzZWAgb3IgYG51bGxgIG9yIGFuIGVtcHR5IHN0cmluZy5cclxuXHQgKi9cclxuXHR0aGlzLnNldE5hbWVzcGFjZSA9IGZ1bmN0aW9uIChuYW1lc3BhY2UpIHtcclxuXHRcdHZhciB2YWxpZE5hbWVzcGFjZSA9IC9eW1xcdy06XSskLztcclxuXHRcdC8vIE5vIG5hbWVzcGFjZS5cclxuXHRcdGlmIChuYW1lc3BhY2UgPT09IGZhbHNlIHx8IG5hbWVzcGFjZSA9PSBudWxsIHx8IG5hbWVzcGFjZSA9PT0gJycpIHtcclxuXHRcdFx0c2V0dGluZ3MubmFtZXNwYWNlID0gJyc7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmICh0eXBlb2YgbmFtZXNwYWNlICE9PSAnc3RyaW5nJyB8fCAhdmFsaWROYW1lc3BhY2UudGVzdChuYW1lc3BhY2UpKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBuYW1lc3BhY2UuJyk7XHJcblx0XHR9XHJcblx0XHRzZXR0aW5ncy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBzdG9yYWdlIG5hbWVzcGFjZS5cclxuXHQgKiBAbWV0aG9kIGdldE5hbWVzcGFjZVxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGN1cnJlbnQgbmFtZXNwYWNlLlxyXG5cdCAqL1xyXG5cdHRoaXMuZ2V0TmFtZXNwYWNlID0gZnVuY3Rpb24gKGluY2x1ZGVTZXBhcmF0b3IpIHtcclxuXHRcdGlmIChpbmNsdWRlU2VwYXJhdG9yICYmIHNldHRpbmdzLm5hbWVzcGFjZSAhPT0gJycpIHtcclxuXHRcdFx0cmV0dXJuIHNldHRpbmdzLm5hbWVzcGFjZSArICc6JztcclxuXHRcdH1cclxuXHRcdHJldHVybiBzZXR0aW5ncy5uYW1lc3BhY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB0eXBlIG9mIHN0b3JhZ2UgdG8gdXNlLlxyXG5cdCAqIEBtZXRob2Qgc2V0U3RvcmFnZVR5cGVcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUaGUgdHlwZSBvZiBzdG9yYWdlIHRvIHVzZS4gVXNlIGBzZXNzaW9uYCBmb3IgYHNlc3Npb25TdG9yYWdlYCBhbmQgYGxvY2FsYCBmb3IgYGxvY2FsU3RvcmFnZWAuXHJcblx0ICovXHJcblx0dGhpcy5zZXRTdG9yYWdlVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XHJcblx0XHRpZiAoWydzZXNzaW9uJywgJ2xvY2FsJ10uaW5kZXhPZih0eXBlKSA8IDApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0b3JhZ2UgdHlwZS4nKTtcclxuXHRcdH1cclxuXHRcdHNldHRpbmdzLnN0b3JhZ2VUeXBlID0gdHlwZTtcclxuXHR9O1xyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgdHlwZSBvZiBzdG9yYWdlIGJlaW5nIHVzZWQuXHJcblx0ICogQG1ldGhvZCBnZXRTdG9yYWdlVHlwZVxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHR5cGUgb2Ygc3RvcmFnZSBiZWluZyB1c2VkLlxyXG5cdCAqL1xyXG5cdHRoaXMuZ2V0U3RvcmFnZVR5cGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gc2V0dGluZ3Muc3RvcmFnZVR5cGU7XHJcblx0fTtcclxuXHJcblx0Ly8gT3ZlcnJpZGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuXHRpZiAob3B0aW9ucykge1xyXG5cdFx0Zm9yICh2YXIga2V5IGluIG9wdGlvbnMpIHtcclxuXHRcdFx0c3dpdGNoIChrZXkpIHtcclxuXHRcdFx0XHRjYXNlICduYW1lc3BhY2UnOlxyXG5cdFx0XHRcdFx0dGhpcy5zZXROYW1lc3BhY2Uob3B0aW9uc1trZXldKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3N0b3JhZ2VUeXBlJzpcclxuXHRcdFx0XHRcdHRoaXMuc2V0U3RvcmFnZVR5cGUob3B0aW9uc1trZXldKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgYWN0dWFsIGhhbmRsZXIgdG8gdXNlXHJcbiAqIEBtZXRob2QgZ2V0U3RvcmFnZUhhbmRsZXJcclxuICogQHJldHVybiB7bWl4ZWR9IFRoZSBzdG9yYWdlIGhhbmRsZXIuXHJcbiAqL1xyXG5TdG9yZS5wcm90b3R5cGUuZ2V0U3RvcmFnZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGhhbmRsZXJzID0ge1xyXG5cdFx0J2xvY2FsJzogbG9jYWxTdG9yYWdlLFxyXG5cdFx0J3Nlc3Npb24nOiBzZXNzaW9uU3RvcmFnZVxyXG5cdH07XHJcblx0cmV0dXJuIGhhbmRsZXJzW3RoaXMuZ2V0U3RvcmFnZVR5cGUoKV07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBmdWxsIHN0b3JhZ2UgbmFtZSBmb3IgYSBrZXksIGluY2x1ZGluZyB0aGUgbmFtZXNwYWNlLCBpZiBhbnkuXHJcbiAqIEBtZXRob2QgZ2V0U3RvcmFnZUtleVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGtleSBUaGUgc3RvcmFnZSBrZXkgbmFtZS5cclxuICogQHJldHVybiB7c3RyaW5nfSAgICAgVGhlIGZ1bGwgc3RvcmFnZSBuYW1lIHRoYXQgaXMgdXNlZCBieSB0aGUgc3RvcmFnZSBtZXRob2RzLlxyXG4gKi9cclxuU3RvcmUucHJvdG90eXBlLmdldFN0b3JhZ2VLZXkgPSBmdW5jdGlvbiAoa2V5KSB7XHJcblx0aWYgKCFrZXkgfHwgdHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwga2V5Lmxlbmd0aCA8IDEpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcignS2V5IG11c3QgYmUgYSBzdHJpbmcuJyk7XHJcblx0fVxyXG5cdHJldHVybiB0aGlzLmdldE5hbWVzcGFjZSh0cnVlKSArIGtleTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIGEgc3RvcmFnZSBpdGVtIGZyb20gdGhlIGN1cnJlbnQgbmFtZXNwYWNlLlxyXG4gKiBAbWV0aG9kIGdldFxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGtleSAgICAgICAgICBUaGUga2V5IHRoYXQgdGhlIGRhdGEgY2FuIGJlIGFjY2Vzc2VkIHVuZGVyLlxyXG4gKiBAcGFyYW0gIHttaXhlZH0gIGRlZmF1bHRWYWx1ZSBUaGUgZGVmYXVsdCB2YWx1ZSB0byByZXR1cm4gaW4gY2FzZSB0aGUgc3RvcmFnZSB2YWx1ZSBpcyBub3Qgc2V0IG9yIGBudWxsYC5cclxuICogQHJldHVybiB7bWl4ZWR9ICAgICAgICAgICAgICAgVGhlIGRhdGEgZm9yIHRoZSBzdG9yYWdlLlxyXG4gKi9cclxuU3RvcmUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXksIGRlZmF1bHRWYWx1ZSkge1xyXG5cdC8vIFByZXZlbnQgcmVjdXJzaW9uLiBPbmx5IGNoZWNrIGV4cGlyZSBkYXRlIGlmIGl0IGlzbid0IGNhbGxlZCBmcm9tIGBleHBpcmVzU3RvcmVgLlxyXG5cdGlmICh0aGlzICE9PSBleHBpcmVzU3RvcmUpIHtcclxuXHRcdC8vIENoZWNrIGlmIGtleSBpcyBleHBpcmVkLlxyXG5cdFx0dmFyIGV4cGlyZURhdGUgPSBleHBpcmVzU3RvcmUuZ2V0KHRoaXMuZ2V0U3RvcmFnZUtleShrZXkpKTtcclxuXHRcdGlmIChleHBpcmVEYXRlICE9PSBudWxsICYmIGV4cGlyZURhdGUuZ2V0VGltZSgpIDwgRGF0ZS5ub3coKSkge1xyXG5cdFx0XHQvLyBFeHBpcmVkLCByZW1vdmUgaXQuXHJcblx0XHRcdHRoaXMucmVtb3ZlKGtleSk7XHJcblx0XHRcdGV4cGlyZXNTdG9yZS5yZW1vdmUodGhpcy5nZXRTdG9yYWdlS2V5KGtleSkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gQ2FjaGVkLCByZWFkIGZyb20gbWVtb3J5LlxyXG5cdGlmIChjYWNoZVt0aGlzLmdldFN0b3JhZ2VLZXkoa2V5KV0gIT0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIGNhY2hlW3RoaXMuZ2V0U3RvcmFnZUtleShrZXkpXTtcclxuXHR9XHJcblxyXG5cdHZhciB2YWwgPSB0aGlzLmdldFN0b3JhZ2VIYW5kbGVyKCkuZ2V0SXRlbSh0aGlzLmdldFN0b3JhZ2VLZXkoa2V5KSk7XHJcblxyXG5cdC8vIFZhbHVlIGRvZXNuJ3QgZXhpc3QgYW5kIHdlIGhhdmUgYSBkZWZhdWx0LCByZXR1cm4gZGVmYXVsdC5cclxuXHRpZiAodmFsID09PSBudWxsICYmIHR5cGVvZiBkZWZhdWx0VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG5cdH1cclxuXHJcblx0Ly8gT25seSBwcmUtcHJvY2VzcyBzdHJpbmdzLlxyXG5cdGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xyXG5cdFx0Ly8gSGFuZGxlIFJlZ0V4cHMuXHJcblx0XHRpZiAodmFsLmluZGV4T2YoJ35SZWdFeHA6JykgPT09IDApIHtcclxuXHRcdFx0dmFyIG1hdGNoZXMgPSAvXn5SZWdFeHA6KFtnaW1dKj8pOiguKikvLmV4ZWModmFsKTtcclxuXHRcdFx0dmFsID0gbmV3IFJlZ0V4cChtYXRjaGVzWzJdLCBtYXRjaGVzWzFdKTtcclxuXHRcdH1cclxuXHRcdC8vIEhhbmRsZSBEYXRlcy5cclxuXHRcdGVsc2UgaWYgKHZhbC5pbmRleE9mKCd+RGF0ZTonKSA9PT0gMCkge1xyXG5cdFx0XHR2YWwgPSBuZXcgRGF0ZSh2YWwucmVwbGFjZSgvXn5EYXRlOi8sICcnKSk7XHJcblx0XHR9XHJcblx0XHQvLyBIYW5kbGUgbnVtYmVycy5cclxuXHRcdGVsc2UgaWYgKHZhbC5pbmRleE9mKCd+TnVtYmVyOicpID09PSAwKSB7XHJcblx0XHRcdHZhbCA9IHBhcnNlSW50KHZhbC5yZXBsYWNlKC9efk51bWJlcjovLCAnJyksIDEwKTtcclxuXHRcdH1cclxuXHRcdC8vIEhhbmRsZSBib29sZWFucy5cclxuXHRcdGVsc2UgaWYgKHZhbC5pbmRleE9mKCd+Qm9vbGVhbjonKSA9PT0gMCkge1xyXG5cdFx0XHR2YWwgPSB2YWwucmVwbGFjZSgvXn5Cb29sZWFuOi8sICcnKSA9PT0gJ3RydWUnO1xyXG5cdFx0fVxyXG5cdFx0Ly8gSGFuZGxlIG9iamVjdHMuXHJcblx0XHRlbHNlIGlmICh2YWwuaW5kZXhPZignfkpTT046JykgPT09IDApIHtcclxuXHRcdFx0dmFsID0gdmFsLnJlcGxhY2UoL15+SlNPTjovLCAnJyk7XHJcblx0XHRcdC8vIFRyeSBwYXJzaW5nIGl0LlxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHZhbCA9IEpTT04ucGFyc2UodmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBQYXJzaW5nIHdlbnQgd3JvbmcgKGludmFsaWQgSlNPTiksIHJldHVybiBkZWZhdWx0IG9yIG51bGwuXHJcblx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBkZWZhdWx0VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gUmV0dXJuIGl0LlxyXG5cdGNhY2hlW3RoaXMuZ2V0U3RvcmFnZUtleShrZXkpXSA9IHZhbDtcclxuXHRyZXR1cm4gdmFsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgYSBzdG9yYWdlIGl0ZW0gb24gdGhlIGN1cnJlbnQgbmFtZXNwYWNlLlxyXG4gKiBAbWV0aG9kIHNldFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICBrZXkgICAgICAgVGhlIGtleSB0aGF0IHRoZSBkYXRhIGNhbiBiZSBhY2Nlc3NlZCB1bmRlci5cclxuICogQHBhcmFtIHttaXhlZH0gICAgICAgdmFsICAgICAgIFRoZSB2YWx1ZSB0byBzdG9yZS4gTWF5IGJlIHRoZSBmb2xsb3dpbmcgdHlwZXMgb2YgZGF0YTogYFJlZ0V4cGAsIGBEYXRlYCwgYE9iamVjdGAsIGBTdHJpbmdgLCBgQm9vbGVhbmAsIGBOdW1iZXJgXHJcbiAqIEBwYXJhbSB7RGF0ZXxudW1iZXJ9IFtleHBpcmVzXSBUaGUgZGF0ZSBpbiB0aGUgZnV0dXJlIHRvIGV4cGlyZSwgb3IgcmVsYXRpdmUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBmcm9tIGBEYXRlI25vd2AgdG8gZXhwaXJlLlxyXG4gKlxyXG4gKiBOb3RlOiBUaGlzIGNvbnZlcnRzIHNwZWNpYWwgZGF0YSB0eXBlcyB0aGF0IG5vcm1hbGx5IGNhbid0IGJlIHN0b3JlZCBpbiB0aGUgZm9sbG93aW5nIHdheTpcclxuICogXHJcbiAqIC0gYFJlZ0V4cGA6IHByZWZpeGVkIHdpdGggdHlwZSwgZmxhZ3Mgc3RvcmVkLCBhbmQgc291cmNlIHN0b3JlZCBhcyBzdHJpbmcuXHJcbiAqIC0gYERhdGVgOiBwcmVmaXhlZCB3aXRoIHR5cGUsIHN0b3JlZCBhcyBzdHJpbmcgdXNpbmcgYERhdGUjdG9TdHJpbmdgLlxyXG4gKiAtIGBPYmplY3RgOiBwcmVmaXhlZCB3aXRoIFwiSlNPTlwiIGluZGljYXRvciwgc3RvcmVkIGFzIHN0cmluZyB1c2luZyBgSlNPTiNzdHJpbmdpZnlgLlxyXG4gKi9cclxuU3RvcmUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbCwgZXhwaXJlcykge1xyXG5cdHZhciBwYXJzZWRWYWwgPSBudWxsO1xyXG5cdC8vIEhhbmRsZSBSZWdFeHBzLlxyXG5cdGlmICh2YWwgaW5zdGFuY2VvZiBSZWdFeHApIHtcclxuXHRcdHZhciBmbGFncyA9IFtcclxuXHRcdFx0dmFsLmdsb2JhbCA/ICdnJyA6ICcnLFxyXG5cdFx0XHR2YWwuaWdub3JlQ2FzZSA/ICdpJyA6ICcnLFxyXG5cdFx0XHR2YWwubXVsdGlsaW5lID8gJ20nIDogJycsXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdFx0cGFyc2VkVmFsID0gJ35SZWdFeHA6JyArIGZsYWdzICsgJzonICsgdmFsLnNvdXJjZTtcclxuXHR9XHJcblx0Ly8gSGFuZGxlIERhdGVzLlxyXG5cdGVsc2UgaWYgKHZhbCBpbnN0YW5jZW9mIERhdGUpIHtcclxuXHRcdHBhcnNlZFZhbCA9ICd+RGF0ZTonICsgdmFsLnRvU3RyaW5nKCk7XHJcblx0fVxyXG5cdC8vIEhhbmRsZSBvYmplY3RzLlxyXG5cdGVsc2UgaWYgKHZhbCA9PT0gT2JqZWN0KHZhbCkpIHtcclxuXHRcdHBhcnNlZFZhbCA9ICd+SlNPTjonICsgSlNPTi5zdHJpbmdpZnkodmFsKTtcclxuXHR9XHJcblx0Ly8gSGFuZGxlIG51bWJlcnMuXHJcblx0ZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcclxuXHRcdHBhcnNlZFZhbCA9ICd+TnVtYmVyOicgKyB2YWwudG9TdHJpbmcoKTtcclxuXHR9XHJcblx0Ly8gSGFuZGxlIGJvb2xlYW5zLlxyXG5cdGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdib29sZWFuJykge1xyXG5cdFx0cGFyc2VkVmFsID0gJ35Cb29sZWFuOicgKyB2YWwudG9TdHJpbmcoKTtcclxuXHR9XHJcblx0Ly8gSGFuZGxlIHN0cmluZ3MuXHJcblx0ZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdHBhcnNlZFZhbCA9IHZhbDtcclxuXHR9XHJcblx0Ly8gVGhyb3cgaWYgd2UgZG9uJ3Qga25vdyB3aGF0IGl0IGlzLlxyXG5cdGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gc3RvcmUgdGhpcyB2YWx1ZTsgd3JvbmcgdmFsdWUgdHlwZS4nKTtcclxuXHR9XHJcblx0Ly8gU2V0IGV4cGlyZSBkYXRlIGlmIG5lZWRlZC5cclxuXHRpZiAodHlwZW9mIGV4cGlyZXMgIT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHQvLyBDb252ZXJ0IHRvIGEgcmVsYXRpdmUgZGF0ZS5cclxuXHRcdGlmICh0eXBlb2YgZXhwaXJlcyA9PT0gJ251bWJlcicpIHtcclxuXHRcdFx0ZXhwaXJlcyA9IG5ldyBEYXRlKERhdGUubm93KCkgKyBleHBpcmVzKTtcclxuXHRcdH1cclxuXHRcdC8vIE1ha2Ugc3VyZSBpdCBpcyBhIGRhdGUuXHJcblx0XHRpZiAoZXhwaXJlcyBpbnN0YW5jZW9mIERhdGUpIHtcclxuXHRcdFx0ZXhwaXJlc1N0b3JlLnNldCh0aGlzLmdldFN0b3JhZ2VLZXkoa2V5KSwgZXhwaXJlcyk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdLZXkgZXhwaXJlIG11c3QgYmUgYSB2YWxpZCBkYXRlIG9yIHRpbWVzdGFtcC4nKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly8gU2F2ZSBpdC5cclxuXHRjYWNoZVt0aGlzLmdldFN0b3JhZ2VLZXkoa2V5KV0gPSB2YWw7XHJcblx0dGhpcy5nZXRTdG9yYWdlSGFuZGxlcigpLnNldEl0ZW0odGhpcy5nZXRTdG9yYWdlS2V5KGtleSksIHBhcnNlZFZhbCk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyBhbGwgZGF0YSBmb3IgdGhlIGN1cnJlbnQgbmFtZXNwYWNlLlxyXG4gKiBAbWV0aG9kIGdldEFsbFxyXG4gKiBAcmV0dXJuIHtvYmplY3R9IEFuIG9iamVjdCBjb250YWluaW5nIGFsbCBkYXRhIGluIHRoZSBmb3JtIG9mIGB7dGhlS2V5OiB0aGVEYXRhfWAgd2hlcmUgYHRoZURhdGFgIGlzIHBhcnNlZCB1c2luZyB7eyNjcm9zc0xpbmsgXCJTdG9yZS9nZXRcIn19U3RvcmUjZ2V0e3svY3Jvc3NMaW5rfX0uXHJcbiAqL1xyXG5TdG9yZS5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBrZXlzID0gdGhpcy5saXN0S2V5cygpO1xyXG5cdHZhciBkYXRhID0ge307XHJcblx0a2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuXHRcdGRhdGFba2V5XSA9IHRoaXMuZ2V0KGtleSk7XHJcblx0fSwgdGhpcyk7XHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogTGlzdCBhbGwga2V5cyB0aGF0IGFyZSB0aWVkIHRvIHRoZSBjdXJyZW50IG5hbWVzcGFjZS5cclxuICogQG1ldGhvZCBsaXN0S2V5c1xyXG4gKiBAcmV0dXJuIHthcnJheX0gVGhlIHN0b3JhZ2Uga2V5cy5cclxuICovXHJcblN0b3JlLnByb3RvdHlwZS5saXN0S2V5cyA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIga2V5cyA9IFtdO1xyXG5cdHZhciBrZXkgPSBudWxsO1xyXG5cdHZhciBzdG9yYWdlTGVuZ3RoID0gdGhpcy5nZXRTdG9yYWdlSGFuZGxlcigpLmxlbmd0aDtcclxuXHR2YXIgcHJlZml4ID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLmdldE5hbWVzcGFjZSh0cnVlKSk7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdG9yYWdlTGVuZ3RoOyBpKyspIHtcclxuXHRcdGtleSA9IHRoaXMuZ2V0U3RvcmFnZUhhbmRsZXIoKS5rZXkoaSlcclxuXHRcdGlmIChwcmVmaXgudGVzdChrZXkpKSB7XHJcblx0XHRcdGtleXMucHVzaChrZXkucmVwbGFjZShwcmVmaXgsICcnKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBrZXlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYSBzcGVjaWZpYyBrZXkgYW5kIGRhdGEgZnJvbSB0aGUgY3VycmVudCBuYW1lc3BhY2UuXHJcbiAqIEBtZXRob2QgcmVtb3ZlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSB0byByZW1vdmUgdGhlIGRhdGEgZm9yLlxyXG4gKi9cclxuU3RvcmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuXHRjYWNoZVt0aGlzLmdldFN0b3JhZ2VLZXkoa2V5KV0gPSBudWxsO1xyXG5cdHRoaXMuZ2V0U3RvcmFnZUhhbmRsZXIoKS5yZW1vdmVJdGVtKHRoaXMuZ2V0U3RvcmFnZUtleShrZXkpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFsbCBkYXRhIGFuZCBrZXlzIGZyb20gdGhlIGN1cnJlbnQgbmFtZXNwYWNlLlxyXG4gKiBAbWV0aG9kIHJlbW92ZUFsbFxyXG4gKi9cclxuU3RvcmUucHJvdG90eXBlLnJlbW92ZUFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGlzLmxpc3RLZXlzKCkuZm9yRWFjaCh0aGlzLnJlbW92ZSwgdGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBuYW1lc3BhY2VkIGl0ZW1zIGZyb20gdGhlIGNhY2hlIHNvIHlvdXIgbmV4dCB7eyNjcm9zc0xpbmsgXCJTdG9yZS9nZXRcIn19U3RvcmUjZ2V0e3svY3Jvc3NMaW5rfX0gd2lsbCBiZSBmcmVzaCBmcm9tIHRoZSBzdG9yYWdlLlxyXG4gKiBAbWV0aG9kIGZyZXNoZW5cclxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IHRvIHJlbW92ZSB0aGUgY2FjaGUgZGF0YSBmb3IuXHJcbiAqL1xyXG5TdG9yZS5wcm90b3R5cGUuZnJlc2hlbiA9IGZ1bmN0aW9uIChrZXkpIHtcclxuXHR2YXIga2V5cyA9IGtleSA/IFtrZXldIDogdGhpcy5saXN0S2V5cygpO1xyXG5cdGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcblx0XHRjYWNoZVt0aGlzLmdldFN0b3JhZ2VLZXkoa2V5KV0gPSBudWxsO1xyXG5cdH0sIHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1pZ3JhdGUgZGF0YSBmcm9tIGEgZGlmZmVyZW50IG5hbWVzcGFjZSB0byBjdXJyZW50IG5hbWVzcGFjZS5cclxuICogQG1ldGhvZCBtaWdyYXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSAgIG1pZ3JhdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIG1pZ3JhdGlvbiBvYmplY3QuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSAgIG1pZ3JhdGlvbi50b0tleSAgICAgICAgICAgICAgICAgICAgVGhlIGtleSBuYW1lIHVuZGVyIHlvdXIgY3VycmVudCBuYW1lc3BhY2UgdGhlIG9sZCBkYXRhIHNob3VsZCBjaGFuZ2UgdG8uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSAgIG1pZ3JhdGlvbi5mcm9tTmFtZXNwYWNlICAgICAgICAgICAgVGhlIG9sZCBuYW1lc3BhY2UgdGhhdCB0aGUgb2xkIGtleSBiZWxvbmdzIHRvLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gICBtaWdyYXRpb24uZnJvbUtleSAgICAgICAgICAgICAgICAgIFRoZSBvbGQga2V5IG5hbWUgdG8gbWlncmF0ZSBmcm9tLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gICBbbWlncmF0aW9uLmZyb21TdG9yYWdlVHlwZV0gICAgICAgIFRoZSBzdG9yYWdlIHR5cGUgdG8gbWlncmF0ZSBmcm9tLiBEZWZhdWx0cyB0byBzYW1lIHR5cGUgYXMgd2hlcmUgeW91IGFyZSBtaWdyYXRpbmcgdG8uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gIFttaWdyYXRpb24ua2VlcE9sZERhdGE9ZmFsc2VdICAgICAgV2hldGhlciBvbGQgZGF0YSBzaG91bGQgYmUga2VwdCBhZnRlciBpdCBoYXMgYmVlbiBtaWdyYXRlZC5cclxuICogQHBhcmFtIHtib29sZWFufSAgW21pZ3JhdGlvbi5vdmVyd3JpdGVOZXdEYXRhPWZhbHNlXSBXaGV0aGVyIG9sZCBkYXRhIHNob3VsZCBvdmVyd3JpdGUgY3VycmVudGx5IHN0b3JlZCBkYXRhIGlmIGl0IGV4aXN0cy5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gW21pZ3JhdGlvbi50cmFuc2Zvcm1dICAgICAgICAgICAgICBUaGUgZnVuY3Rpb24gdG8gcGFzcyB0aGUgb2xkIGtleSBkYXRhIHRocm91Z2ggYmVmb3JlIG1pZ3JhdGluZy5cclxuICogQGV4YW1wbGVcclxuICogXHJcbiAqICAgICB2YXIgU3RvcmUgPSByZXF1aXJlKCdzdG9yYWdlLXdyYXBwZXInKTtcclxuICogICAgIHZhciBzdG9yZSA9IG5ldyBTdG9yZSh7XHJcbiAqICAgICAgICAgbmFtZXNwYWNlOiAnbXlOZXdBcHAnXHJcbiAqICAgICB9KTtcclxuICpcclxuICogICAgIC8vIE1pZ3JhdGUgZnJvbSB0aGUgb2xkIGFwcC5cclxuICogICAgIHN0b3JlLm1pZ3JhdGUoe1xyXG4gKiAgICAgICAgIHRvS2V5OiAnbmV3LWtleScsXHJcbiAqICAgICAgICAgZnJvbU5hbWVzcGFjZTogJ215T2xkQXBwJyxcclxuICogICAgICAgICBmcm9tS2V5OiAnb2xkLWtleSdcclxuICogICAgIH0pO1xyXG4gKiAgICAgXHJcbiAqICAgICAvLyBNaWdyYXRlIGZyb20gZ2xvYmFsIGRhdGEuIFVzZWZ1bCB3aGVuIG1vdmluZyBmcm9tIG90aGVyIHN0b3JhZ2Ugd3JhcHBlcnMgb3IgcmVndWxhciBvbCcgYGxvY2FsU3RvcmFnZWAuXHJcbiAqICAgICBzdG9yZS5taWdyYXRlKHtcclxuICogICAgICAgICB0b0tleTogJ290aGVyLW5ldy1rZXknLFxyXG4gKiAgICAgICAgIGZyb21OYW1lc3BhY2U6ICcnLFxyXG4gKiAgICAgICAgIGZyb21LZXk6ICdvdGhlci1vbGQta2V5LW9uLWdsb2JhbCdcclxuICogICAgIH0pO1xyXG4gKiAgICAgXHJcbiAqICAgICAvLyBNaWdyYXRlIHNvbWUgSlNPTiBkYXRhIHRoYXQgd2FzIHN0b3JlZCBhcyBhIHN0cmluZy5cclxuICogICAgIHN0b3JlLm1pZ3JhdGUoe1xyXG4gKiAgICAgICAgIHRvS2V5OiAnbmV3LWpzb24ta2V5JyxcclxuICogICAgICAgICBmcm9tTmFtZXNwYWNlOiAnbXlPbGRBcHAnLFxyXG4gKiAgICAgICAgIGZyb21LZXk6ICdvbGQtanNvbi1rZXknLFxyXG4gKiAgICAgICAgIC8vIFRyeSBjb252ZXJ0aW5nIHNvbWUgb2xkIEpTT04gZGF0YS5cclxuICogICAgICAgICB0cmFuc2Zvcm06IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAqICAgICAgICAgICAgIHRyeSB7XHJcbiAqICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcclxuICogICAgICAgICAgICAgfVxyXG4gKiAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gKiAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAqICAgICAgICAgICAgIH1cclxuICogICAgICAgICB9XHJcbiAqICAgICB9KTtcclxuICovXHJcblxyXG5TdG9yZS5wcm90b3R5cGUubWlncmF0ZSA9IGZ1bmN0aW9uIChtaWdyYXRpb24pIHtcclxuXHQvLyBTYXZlIG91ciBjdXJyZW50IG5hbWVzcGFjZS5cclxuXHR2YXIgdG9OYW1lc3BhY2UgPSB0aGlzLmdldE5hbWVzcGFjZSgpO1xyXG5cdHZhciB0b1N0b3JhZ2VUeXBlID0gdGhpcy5nZXRTdG9yYWdlVHlwZSgpO1xyXG5cclxuXHQvLyBDcmVhdGUgYSB0ZW1wb3Jhcnkgc3RvcmUgdG8gYXZvaWQgY2hhbmdpbmcgbmFtZXNwYWNlIGR1cmluZyBhY3R1YWwgZ2V0L3NldHMuXHJcblx0dmFyIHN0b3JlID0gbmV3IFN0b3JlKHtcclxuXHRcdG5hbWVzcGFjZTogdG9OYW1lc3BhY2UsXHJcblx0XHRzdG9yYWdlVHlwZTogdG9TdG9yYWdlVHlwZVxyXG5cdH0pO1xyXG5cclxuXHR2YXIgZGF0YSA9IG51bGw7XHJcblxyXG5cdC8vIEdldCBkYXRhIGZyb20gb2xkIG5hbWVzcGFjZS5cclxuXHRzdG9yZS5zZXROYW1lc3BhY2UobWlncmF0aW9uLmZyb21OYW1lc3BhY2UpO1xyXG5cdGlmICh0eXBlb2YgbWlncmF0aW9uLmZyb21TdG9yYWdlVHlwZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdHN0b3JlLnNldFN0b3JhZ2VUeXBlKG1pZ3JhdGlvbi5mcm9tU3RvcmFnZVR5cGUpO1xyXG5cdH1cclxuXHRkYXRhID0gc3RvcmUuZ2V0KG1pZ3JhdGlvbi5mcm9tS2V5KTtcclxuXHJcblx0Ly8gUmVtb3ZlIG9sZCBpZiBuZWVkZWQuXHJcblx0aWYgKCFtaWdyYXRpb24ua2VlcE9sZERhdGEpIHtcclxuXHRcdHN0b3JlLnJlbW92ZShtaWdyYXRpb24uZnJvbUtleSk7XHJcblx0fVxyXG5cdFxyXG5cdC8vIE5vIGRhdGEsIGlnbm9yZSB0aGlzIG1pZ3JhdGlvbi5cclxuXHRpZiAoZGF0YSA9PT0gbnVsbCkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Ly8gVHJhbnNmb3JtIGRhdGEgaWYgbmVlZGVkLlxyXG5cdGlmICh0eXBlb2YgbWlncmF0aW9uLnRyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0ZGF0YSA9IG1pZ3JhdGlvbi50cmFuc2Zvcm0oZGF0YSk7XHJcblx0fVxyXG5cdGVsc2UgaWYgKHR5cGVvZiBtaWdyYXRpb24udHJhbnNmb3JtICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRyYW5zZm9ybSBjYWxsYmFjay4nKTtcclxuXHR9XHJcblxyXG5cdC8vIEdvIGJhY2sgdG8gY3VycmVudCBuYW1lc3BhY2UuXHJcblx0c3RvcmUuc2V0TmFtZXNwYWNlKHRvTmFtZXNwYWNlKTtcclxuXHRzdG9yZS5zZXRTdG9yYWdlVHlwZSh0b1N0b3JhZ2VUeXBlKTtcclxuXHJcblx0Ly8gT25seSBvdmVyd3JpdGUgbmV3IGRhdGEgaWYgaXQgZG9lc24ndCBleGlzdCBvciBpdCdzIHJlcXVlc3RlZC5cclxuXHRpZiAoc3RvcmUuZ2V0KG1pZ3JhdGlvbi50b0tleSkgPT09IG51bGwgfHwgbWlncmF0aW9uLm92ZXJ3cml0ZU5ld0RhdGEpIHtcclxuXHRcdHN0b3JlLnNldChtaWdyYXRpb24udG9LZXksIGRhdGEpO1xyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgc3Vic3RvcmUgdGhhdCBpcyBuZXN0ZWQgaW4gdGhlIGN1cnJlbnQgbmFtZXNwYWNlLlxyXG4gKiBAbWV0aG9kIGNyZWF0ZVN1YnN0b3JlXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gbmFtZXNwYWNlIFRoZSBzdWJzdG9yZSdzIG5hbWVzcGFjZS5cclxuICogQHJldHVybiB7U3RvcmV9ICAgICAgICAgICAgVGhlIHN1YnN0b3JlLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBcclxuICogICAgIHZhciBTdG9yZSA9IHJlcXVpcmUoJ3N0b3JhZ2Utd3JhcHBlcicpO1xyXG4gKiAgICAgLy8gQ3JlYXRlIG1haW4gc3RvcmUuXHJcbiAqICAgICB2YXIgc3RvcmUgPSBuZXcgU3RvcmUoe1xyXG4gKiAgICAgICAgIG5hbWVzcGFjZTogJ215YXBwJ1xyXG4gKiAgICAgfSk7XHJcbiAqXHJcbiAqICAgICAvLyBDcmVhdGUgc3Vic3RvcmUuXHJcbiAqICAgICB2YXIgc3Vic3RvcmUgPSBzdG9yZS5jcmVhdGVTdWJzdG9yZSgndGhpbmdzJyk7XHJcbiAqICAgICBzdWJzdG9yZS5zZXQoJ2ZvbycsICdiYXInKTtcclxuICpcclxuICogICAgIHN1YnN0b3JlLmdldCgnZm9vJykgPT09IHN0b3JlLmdldCgndGhpbmdzOmZvbycpO1xyXG4gKiAgICAgLy8gdHJ1ZVxyXG4gKi9cclxuU3RvcmUucHJvdG90eXBlLmNyZWF0ZVN1YnN0b3JlID0gZnVuY3Rpb24gKG5hbWVzcGFjZSkge1xyXG5cdHJldHVybiBuZXcgU3RvcmUoe1xyXG5cdFx0bmFtZXNwYWNlOiB0aGlzLmdldE5hbWVzcGFjZSh0cnVlKSArIG5hbWVzcGFjZSxcclxuXHRcdHN0b3JhZ2VUeXBlOiB0aGlzLmdldFN0b3JhZ2VUeXBlKClcclxuXHR9KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3RvcmU7XHJcbiIsIm1vZHVsZS5leHBvcnRzPXtcclxuICBcIm5hbWVcIjogXCJ0d2l0Y2gtY2hhdC1lbW90ZXNcIixcclxuICBcInZlcnNpb25cIjogXCIyLjEuNlwiLFxyXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwOi8vY2xldHVzYy5naXRodWIuaW8vVXNlcnNjcmlwdC0tVHdpdGNoLUNoYXQtRW1vdGVzL1wiLFxyXG4gIFwiYnVnc1wiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9jbGV0dXNjL1VzZXJzY3JpcHQtLVR3aXRjaC1DaGF0LUVtb3Rlcy9pc3N1ZXNcIixcclxuICBcImF1dGhvclwiOiBcIlJ5YW4gQ2hhdGhhbSA8cnlhbi5iLmNoYXRoYW1AZ21haWwuY29tPiAoaHR0cHM6Ly9naXRodWIuY29tL2NsZXR1c2MpXCIsXHJcbiAgXCJyZXBvc2l0b3J5XCI6IHtcclxuICAgIFwidHlwZVwiOiBcImdpdFwiLFxyXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vY2xldHVzYy9Vc2Vyc2NyaXB0LS1Ud2l0Y2gtQ2hhdC1FbW90ZXMuZ2l0XCJcclxuICB9LFxyXG4gIFwidXNlcnNjcmlwdFwiOiB7XHJcbiAgICBcIm5hbWVcIjogXCJUd2l0Y2ggQ2hhdCBFbW90ZXNcIixcclxuICAgIFwibmFtZXNwYWNlXCI6IFwiI0NsZXR1c1wiLFxyXG4gICAgXCJ2ZXJzaW9uXCI6IFwie3t7cGtnLnZlcnNpb259fX1cIixcclxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBZGRzIGEgYnV0dG9uIHRvIFR3aXRjaCB0aGF0IGFsbG93cyB5b3UgdG8gXFxcImNsaWNrLXRvLWluc2VydFxcXCIgYW4gZW1vdGUuXCIsXHJcbiAgICBcImNvcHlyaWdodFwiOiBcIjIwMTErLCB7e3twa2cuYXV0aG9yfX19XCIsXHJcbiAgICBcImF1dGhvclwiOiBcInt7e3BrZy5hdXRob3J9fX1cIixcclxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci5waHA/Z3JhdmF0YXJfaWQ9Njg3NWU4M2FhNmM1NjM3OTBjYjJkYTkxNGFhYmE4YjMmcj1QRyZzPTQ4JmRlZmF1bHQ9aWRlbnRpY29uXCIsXHJcbiAgICBcImxpY2Vuc2VcIjogW1xyXG4gICAgICBcIk1JVDsgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFwiLFxyXG4gICAgICBcIkNDIEJZLU5DLVNBIDMuMDsgaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktbmMtc2EvMy4wL1wiXHJcbiAgICBdLFxyXG4gICAgXCJob21lcGFnZVwiOiBcInt7e3BrZy5ob21lcGFnZX19fVwiLFxyXG4gICAgXCJzdXBwb3J0VVJMXCI6IFwie3t7cGtnLmJ1Z3N9fX1cIixcclxuICAgIFwiY29udHJpYnV0aW9uVVJMXCI6IFwiaHR0cDovL2NsZXR1c2MuZ2l0aHViLmlvL1VzZXJzY3JpcHQtLVR3aXRjaC1DaGF0LUVtb3Rlcy8jZG9uYXRlXCIsXHJcbiAgICBcImdyYW50XCI6IFwibm9uZVwiLFxyXG4gICAgXCJpbmNsdWRlXCI6IFtcclxuICAgICAgXCJodHRwOi8vKi50d2l0Y2gudHYvKlwiLFxyXG4gICAgICBcImh0dHBzOi8vKi50d2l0Y2gudHYvKlwiXHJcbiAgICBdLFxyXG4gICAgXCJleGNsdWRlXCI6IFtcclxuICAgICAgXCJodHRwOi8vYXBpLnR3aXRjaC50di8qXCIsXHJcbiAgICAgIFwiaHR0cHM6Ly9hcGkudHdpdGNoLnR2LypcIixcclxuICAgICAgXCJodHRwOi8vdG1pLnR3aXRjaC50di8qXCIsXHJcbiAgICAgIFwiaHR0cHM6Ly90bWkudHdpdGNoLnR2LypcIixcclxuICAgICAgXCJodHRwOi8vKi50d2l0Y2gudHYvKi9kYXNoYm9hcmRcIixcclxuICAgICAgXCJodHRwczovLyoudHdpdGNoLnR2LyovZGFzaGJvYXJkXCIsXHJcbiAgICAgIFwiaHR0cDovL2NoYXRkZXBvdC50d2l0Y2gudHYvKlwiLFxyXG4gICAgICBcImh0dHBzOi8vY2hhdGRlcG90LnR3aXRjaC50di8qXCIsXHJcbiAgICAgIFwiaHR0cDovL2ltLnR3aXRjaC50di8qXCIsXHJcbiAgICAgIFwiaHR0cHM6Ly9pbS50d2l0Y2gudHYvKlwiLFxyXG4gICAgICBcImh0dHA6Ly9wbGF0Zm9ybS50d2l0dGVyLmNvbS8qXCIsXHJcbiAgICAgIFwiaHR0cHM6Ly9wbGF0Zm9ybS50d2l0dGVyLmNvbS8qXCIsXHJcbiAgICAgIFwiaHR0cDovL3d3dy5mYWNlYm9vay5jb20vKlwiLFxyXG4gICAgICBcImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS8qXCJcclxuICAgIF1cclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiYnJvd3Nlci1zeW5jXCI6IFwiXjEuMy4yXCIsXHJcbiAgICBcImJyb3dzZXJpZnlcIjogXCJeNS45LjFcIixcclxuICAgIFwiZ2VuZXJhdGUtdXNlcnNjcmlwdC1oZWFkZXJcIjogXCJeMS4wLjBcIixcclxuICAgIFwiZ3VscFwiOiBcIl4zLjguM1wiLFxyXG4gICAgXCJndWxwLWF1dG9wcmVmaXhlclwiOiBcIjAuMC44XCIsXHJcbiAgICBcImd1bHAtYmVhdXRpZnlcIjogXCIxLjEuMFwiLFxyXG4gICAgXCJndWxwLWNoYW5nZWRcIjogXCJeMC40LjFcIixcclxuICAgIFwiZ3VscC1jb25jYXRcIjogXCJeMi4yLjBcIixcclxuICAgIFwiZ3VscC1jb25mbGljdFwiOiBcIl4wLjEuMlwiLFxyXG4gICAgXCJndWxwLWNzcy1iYXNlNjRcIjogXCJeMS4xLjBcIixcclxuICAgIFwiZ3VscC1jc3MyanNcIjogXCJeMS4wLjJcIixcclxuICAgIFwiZ3VscC1oZWFkZXJcIjogXCJeMS4wLjJcIixcclxuICAgIFwiZ3VscC1ob2dhbi1jb21waWxlXCI6IFwiXjAuMi4xXCIsXHJcbiAgICBcImd1bHAtbWluaWZ5LWNzc1wiOiBcIl4wLjMuNVwiLFxyXG4gICAgXCJndWxwLW5vdGlmeVwiOiBcIl4xLjQuMVwiLFxyXG4gICAgXCJndWxwLXJlbmFtZVwiOiBcIl4xLjIuMFwiLFxyXG4gICAgXCJndWxwLXVnbGlmeVwiOiBcIl4wLjMuMVwiLFxyXG4gICAgXCJndWxwLXV0aWxcIjogXCJeMy4wLjBcIixcclxuICAgIFwiaG9nYW4uanNcIjogXCJeMy4wLjJcIixcclxuICAgIFwianF1ZXJ5LXVpXCI6IFwiXjEuMTAuNVwiLFxyXG4gICAgXCJqcXVlcnkuc2Nyb2xsYmFyXCI6IFwiXjAuMi43XCIsXHJcbiAgICBcInByZXR0eS1ocnRpbWVcIjogXCJeMC4yLjFcIixcclxuICAgIFwic3RvcmFnZS13cmFwcGVyXCI6IFwiY2xldHVzYy9zdG9yYWdlLXdyYXBwZXIjdjAuMS4xXCIsXHJcbiAgICBcInZpbnlsLW1hcFwiOiBcIl4xLjAuMVwiLFxyXG4gICAgXCJ2aW55bC1zb3VyY2Utc3RyZWFtXCI6IFwiXjAuMS4xXCIsXHJcbiAgICBcIndhdGNoaWZ5XCI6IFwiXjEuMC4xXCJcclxuICB9XHJcbn1cclxuIiwidmFyIGxvZ2dlciA9IHJlcXVpcmUoJy4vbG9nZ2VyJyk7XHJcbnZhciBhcGkgPSB7fTtcclxudmFyIGVtYmVyID0gbnVsbDtcclxudmFyIGhvb2tlZEZhY3RvcmllcyA9IHt9O1xyXG5cclxuYXBpLmdldEVtYmVyID0gZnVuY3Rpb24gKCkge1xyXG5cdGlmIChlbWJlcikge1xyXG5cdFx0cmV0dXJuIGVtYmVyO1xyXG5cdH1cclxuXHRpZiAod2luZG93LkFwcCAmJiB3aW5kb3cuQXBwLl9fY29udGFpbmVyX18pIHtcclxuXHRcdGVtYmVyID0gd2luZG93LkFwcC5fX2NvbnRhaW5lcl9fO1xyXG5cdFx0cmV0dXJuIGVtYmVyO1xyXG5cdH1cclxuXHRyZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5hcGkuaXNMb2FkZWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIEJvb2xlYW4oYXBpLmdldEVtYmVyKCkpO1xyXG59O1xyXG5cclxuYXBpLmxvb2t1cCA9IGZ1bmN0aW9uIChsb29rdXBGYWN0b3J5KSB7XHJcblx0aWYgKCFhcGkuaXNMb2FkZWQoKSkge1xyXG5cdFx0bG9nZ2VyLmRlYnVnKCdGYWN0b3J5IGxvb2t1cCBmYWlsdXJlLCBFbWJlciBub3QgbG9hZGVkLicpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRyZXR1cm4gYXBpLmdldEVtYmVyKCkubG9va3VwKGxvb2t1cEZhY3RvcnkpO1xyXG59O1xyXG5cclxuYXBpLmhvb2sgPSBmdW5jdGlvbiAobG9va3VwRmFjdG9yeSwgYWN0aXZhdGVDYiwgZGVhY3RpdmF0ZUNiKSB7XHJcblx0aWYgKCFhcGkuaXNMb2FkZWQoKSkge1xyXG5cdFx0bG9nZ2VyLmRlYnVnKCdGYWN0b3J5IGhvb2sgZmFpbHVyZSwgRW1iZXIgbm90IGxvYWRlZC4nKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0aWYgKGhvb2tlZEZhY3Rvcmllc1tsb29rdXBGYWN0b3J5XSkge1xyXG5cdFx0bG9nZ2VyLmRlYnVnKCdGYWN0b3J5IGFscmVhZHkgaG9va2VkOiAnICsgbG9va3VwRmFjdG9yeSk7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0dmFyIHJlb3Blbk9wdGlvbnMgPSB7fTtcclxuXHR2YXIgZmFjdG9yeSA9IGFwaS5sb29rdXAobG9va3VwRmFjdG9yeSk7XHJcblxyXG5cdGlmICghZmFjdG9yeSkge1xyXG5cdFx0bG9nZ2VyLmRlYnVnKCdGYWN0b3J5IGhvb2sgZmFpbHVyZSwgZmFjdG9yeSBub3QgZm91bmQ6ICcgKyBsb29rdXBGYWN0b3J5KTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGlmIChhY3RpdmF0ZUNiKSB7XHJcblx0XHRyZW9wZW5PcHRpb25zLmFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLl9zdXBlcigpO1xyXG5cdFx0XHRhY3RpdmF0ZUNiLmNhbGwodGhpcyk7XHJcblx0XHRcdGxvZ2dlci5kZWJ1ZygnSG9vayBydW4gb24gYWN0aXZhdGU6ICcgKyBsb29rdXBGYWN0b3J5KTtcclxuXHRcdH07XHJcblx0fVxyXG5cdGlmIChkZWFjdGl2YXRlQ2IpIHtcclxuXHRcdHJlb3Blbk9wdGlvbnMuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhpcy5fc3VwZXIoKTtcclxuXHRcdFx0ZGVhY3RpdmF0ZUNiLmNhbGwodGhpcyk7XHJcblx0XHRcdGxvZ2dlci5kZWJ1ZygnSG9vayBydW4gb24gZGVhY3RpdmF0ZTogJyArIGxvb2t1cEZhY3RvcnkpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHRyeSB7XHJcblx0XHRmYWN0b3J5LnJlb3BlbihyZW9wZW5PcHRpb25zKTtcclxuXHRcdGhvb2tlZEZhY3Rvcmllc1tsb29rdXBGYWN0b3J5XSA9IHRydWU7XHJcblx0XHRsb2dnZXIuZGVidWcoJ0ZhY3RvcnkgaG9va2VkOiAnICsgbG9va3VwRmFjdG9yeSk7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0Y2F0Y2ggKGVycikge1xyXG5cdFx0bG9nZ2VyLmRlYnVnKCdGYWN0b3J5IGhvb2sgZmFpbHVyZSwgdW5leHBlY3RlZCBlcnJvcjogJyArIGxvb2t1cEZhY3RvcnkpO1xyXG5cdFx0bG9nZ2VyLmRlYnVnKGVycik7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59O1xyXG5cclxuYXBpLmdldCA9IGZ1bmN0aW9uIChsb29rdXBGYWN0b3J5LCBwcm9wZXJ0eSkge1xyXG5cdGlmICghYXBpLmlzTG9hZGVkKCkpIHtcclxuXHRcdGxvZ2dlci5kZWJ1ZygnRmFjdG9yeSBnZXQgZmFpbHVyZSwgRW1iZXIgbm90IGxvYWRlZC4nKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0dmFyIHByb3BlcnRpZXMgPSBwcm9wZXJ0eS5zcGxpdCgnLicpO1xyXG5cdHZhciBnZXR0ZXIgPSBhcGkubG9va3VwKGxvb2t1cEZhY3RvcnkpO1xyXG5cclxuXHRwcm9wZXJ0aWVzLnNvbWUoZnVuY3Rpb24gKHByb3BlcnR5KSB7XHJcblx0XHQvLyBJZiBnZXR0ZXIgZmFpbHMsIGp1c3QgZXhpdCwgb3RoZXJ3aXNlLCBrZWVwIGxvb3BpbmcuXHJcblx0XHRpZiAoZ2V0dGVyID09IG51bGwgfHwgdHlwZW9mIGdldHRlciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0Z2V0dGVyID0gbnVsbDtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRpZiAoZ2V0dGVyW3Byb3BlcnR5XSA9PSBudWxsIHx8IHR5cGVvZiBnZXR0ZXJbcHJvcGVydHldID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRnZXR0ZXIgPSBudWxsO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGlmICh0eXBlb2YgZ2V0dGVyLmdldCA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRnZXR0ZXIgPSBnZXR0ZXIuZ2V0KHByb3BlcnR5KTtcclxuXHRcdFx0aWYgKGdldHRlciA9PSBudWxsIHx8IHR5cGVvZiBnZXR0ZXIgPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0Z2V0dGVyID0gbnVsbDtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRnZXR0ZXIgPSBnZXR0ZXJbcHJvcGVydHldO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gZ2V0dGVyO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhcGk7XHJcbiIsInZhciBzdG9yYWdlID0gcmVxdWlyZSgnLi9zdG9yYWdlJyk7XHJcbnZhciBsb2dnZXIgPSByZXF1aXJlKCcuL2xvZ2dlcicpO1xyXG52YXIgdWkgPSByZXF1aXJlKCcuL3VpJyk7XHJcbnZhciBhcGkgPSB7fTtcclxudmFyIGVtb3RlU3RvcmUgPSBuZXcgRW1vdGVTdG9yZSgpO1xyXG52YXIgJCA9IHdpbmRvdy5qUXVlcnk7XHJcblxyXG4vKipcclxuICogVGhlIGVudGlyZSBlbW90ZSBzdG9yaW5nIHN5c3RlbS5cclxuICovXHJcbmZ1bmN0aW9uIEVtb3RlU3RvcmUoKSB7XHJcblx0dmFyIGdldHRlcnMgPSB7fTtcclxuXHR2YXIgbmF0aXZlRW1vdGVzID0ge307XHJcblx0dmFyIGhhc0luaXRpYWxpemVkID0gZmFsc2U7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBhIGxpc3Qgb2YgdXNhYmxlIGVtb3RpY29ucy5cclxuXHQgKiBAcGFyYW0gIHtmdW5jdGlvbn0gW2ZpbHRlcnNdICAgICAgIEEgZmlsdGVyIG1ldGhvZCB0byBsaW1pdCB3aGF0IGVtb3RlcyBhcmUgcmV0dXJuZWQuIFBhc3NlZCB0byBBcnJheSNmaWx0ZXIuXHJcblx0ICogQHBhcmFtICB7ZnVuY3Rpb258c3RyaW5nfSBbc29ydEJ5XSBIb3cgdGhlIGVtb3RlcyBzaG91bGQgYmUgc29ydGVkLiBgZnVuY3Rpb25gIHdpbGwgYmUgcGFzc2VkIHRvIHNvcnQgdmlhIEFycmF5I3NvcnQuIGAnY2hhbm5lbCdgIHNvcnRzIGJ5IGNoYW5uZWwgbmFtZSwgZ2xvYmFscyBmaXJzdC4gQWxsIG90aGVyIHZhbHVlcyAob3Igb21pdHRlZCkgc29ydCBhbHBoYW51bWVyaWNhbGx5LlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gW3JldHVyblR5cGVdICAgICAgYCdvYmplY3QnYCB3aWxsIHJldHVybiBpbiBvYmplY3QgZm9ybWF0LCBlLmcuIGB7J0thcHBhJzogRW1vdGUoLi4uKSwgLi4ufWAuIEFsbCBvdGhlciB2YWx1ZXMgKG9yIG9taXR0ZWQpIHJldHVybiBhbiBhcnJheSBmb3JtYXQsIGUuZy4gYFtFbW90ZSguLi4pLCAuLi5dYC5cclxuXHQgKiBAcmV0dXJuIHtvYmplY3R8YXJyYXl9ICAgICAgICAgICAgIFNlZSBgcmV0dXJuVHlwZWAgcGFyYW0uXHJcblx0ICovXHJcblx0dGhpcy5nZXRFbW90ZXMgPSBmdW5jdGlvbiAoZmlsdGVycywgc29ydEJ5LCByZXR1cm5UeXBlKSB7XHJcblx0XHR2YXIgdHdpdGNoQXBpID0gcmVxdWlyZSgnLi90d2l0Y2gtYXBpJyk7XHJcblxyXG5cdFx0Ly8gR2V0IG5hdGl2ZSBlbW90ZXMuXHJcblx0XHR2YXIgZW1vdGVzID0gJC5leHRlbmQoe30sIG5hdGl2ZUVtb3Rlcyk7XHJcblxyXG5cdFx0Ly8gUGFyc2UgdGhlIGN1c3RvbSBlbW90ZXMgcHJvdmlkZWQgYnkgdGhpcmQgcGFydHkgYWRkb25zLlxyXG5cdFx0T2JqZWN0LmtleXMoZ2V0dGVycykuZm9yRWFjaChmdW5jdGlvbiAoZ2V0dGVyTmFtZSkge1xyXG5cdFx0XHQvLyBUcnkgdGhlIGdldHRlci5cclxuXHRcdFx0dmFyIHJlc3VsdHMgPSBudWxsO1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHJlc3VsdHMgPSBnZXR0ZXJzW2dldHRlck5hbWVdKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKGVycikge1xyXG5cdFx0XHRcdGxvZ2dlci5kZWJ1ZygnRW1vdGUgZ2V0dGVyIGAnICsgZ2V0dGVyTmFtZSArICdgIGZhaWxlZCB1bmV4cGVjdGVkbHksIHNraXBwaW5nLicsIGVyci50b1N0cmluZygpKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFBcnJheS5pc0FycmF5KHJlc3VsdHMpKSB7XHJcblx0XHRcdFx0bG9nZ2VyLmRlYnVnKCdFbW90ZSBnZXR0ZXIgYCcgKyBnZXR0ZXJOYW1lICsgJ2AgbXVzdCByZXR1cm4gYW4gYXJyYXksIHNraXBwaW5nLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gT3ZlcnJpZGUgbmF0aXZlcyBhbmQgcHJldmlvdXMgZ2V0dGVycy5cclxuXHRcdFx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChlbW90ZSkge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHQvLyBDcmVhdGUgdGhlIGVtb3RlLlxyXG5cdFx0XHRcdFx0dmFyIGluc3RhbmNlID0gbmV3IEVtb3RlKGVtb3RlKTtcclxuXHJcblx0XHRcdFx0XHQvLyBGb3JjZSB0aGUgZ2V0dGVyLlxyXG5cdFx0XHRcdFx0aW5zdGFuY2Uuc2V0R2V0dGVyTmFtZShnZXR0ZXJOYW1lKTtcclxuXHJcblx0XHRcdFx0XHQvLyBGb3JjZSBlbW90ZXMgd2l0aG91dCBjaGFubmVscyB0byB0aGUgZ2V0dGVyJ3MgbmFtZS5cclxuXHRcdFx0XHRcdGlmICghZW1vdGUuY2hhbm5lbCkge1xyXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDaGFubmVsTmFtZShnZXR0ZXJOYW1lKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBBZGQvb3ZlcnJpZGUgaXQuXHJcblx0XHRcdFx0XHRlbW90ZXNbaW5zdGFuY2UuZ2V0VGV4dCgpXSA9IGluc3RhbmNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZXJyKSB7XHJcblx0XHRcdFx0XHRsb2dnZXIuZGVidWcoJ0Vtb3RlIHBhcnNpbmcgZm9yIGdldHRlciBgJyArIGdldHRlck5hbWUgKyAnYCBmYWlsZWQsIHNraXBwaW5nLicsIGVyci50b1N0cmluZygpLCBlbW90ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIENvdmVydCB0byBhcnJheS5cclxuXHRcdGVtb3RlcyA9IE9iamVjdC5rZXlzKGVtb3RlcykubWFwKGZ1bmN0aW9uIChlbW90ZSkge1xyXG5cdFx0XHRyZXR1cm4gZW1vdGVzW2Vtb3RlXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEZpbHRlciByZXN1bHRzLlxyXG5cdFx0aWYgKHR5cGVvZiBmaWx0ZXJzID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdGVtb3RlcyA9IGVtb3Rlcy5maWx0ZXIoZmlsdGVycyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8vIFJldHVybiBhcyBhbiBvYmplY3QgaWYgcmVxdWVzdGVkLlxyXG5cdFx0aWYgKHJldHVyblR5cGUgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdHZhciBhc09iamVjdCA9IHt9O1xyXG5cdFx0XHRlbW90ZXMuZm9yRWFjaChmdW5jdGlvbiAoZW1vdGUpIHtcclxuXHRcdFx0XHRhc09iamVjdFtlbW90ZS5nZXRUZXh0KCldID0gZW1vdGU7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gYXNPYmplY3Q7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU29ydCByZXN1bHRzLlxyXG5cdFx0aWYgKHR5cGVvZiBzb3J0QnkgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0ZW1vdGVzLnNvcnQoc29ydEJ5KTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHNvcnRCeSA9PT0gJ2NoYW5uZWwnKSB7XHJcblx0XHRcdGVtb3Rlcy5zb3J0KHNvcnRpbmcuYWxsRW1vdGVzQ2F0ZWdvcnkpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGVtb3Rlcy5zb3J0KHNvcnRpbmcuYnlUZXh0KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZXR1cm4gdGhlIGVtb3RlcyBpbiBhcnJheSBmb3JtYXQuXHJcblx0XHRyZXR1cm4gZW1vdGVzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyBhIDNyZCBwYXJ0eSBlbW90ZSBob29rLlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gbmFtZSAgIFRoZSBuYW1lIG9mIHRoZSAzcmQgcGFydHkgcmVnaXN0ZXJpbmcgdGhlIGhvb2suXHJcblx0ICogQHBhcmFtICB7ZnVuY3Rpb259IGdldHRlciBUaGUgZnVuY3Rpb24gY2FsbGVkIHdoZW4gbG9va2luZyBmb3IgZW1vdGVzLiBNdXN0IHJldHVybiBhbiBhcnJheSBvZiBlbW90ZSBvYmplY3RzLCBlLmcuIGBbZW1vdGUsIC4uLl1gLiBTZWUgRW1vdGUgY2xhc3MuXHJcblx0ICovXHJcblx0dGhpcy5yZWdpc3RlckdldHRlciA9IGZ1bmN0aW9uIChuYW1lLCBnZXR0ZXIpIHtcclxuXHRcdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdOYW1lIG11c3QgYmUgYSBzdHJpbmcuJyk7XHJcblx0XHR9XHJcblx0XHRpZiAoZ2V0dGVyc1tuYW1lXSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0dldHRlciBhbHJlYWR5IGV4aXN0cy4nKTtcclxuXHRcdH1cclxuXHRcdGlmICh0eXBlb2YgZ2V0dGVyICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignR2V0dGVyIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcclxuXHRcdH1cclxuXHRcdGxvZ2dlci5kZWJ1ZygnR2V0dGVyIHJlZ2lzdGVyZWQ6ICcgKyBuYW1lKTtcclxuXHRcdGdldHRlcnNbbmFtZV0gPSBnZXR0ZXI7XHJcblx0XHR1aS51cGRhdGVFbW90ZXMoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZWdpc3RlcnMgYSAzcmQgcGFydHkgZW1vdGUgaG9vay5cclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IG5hbWUgICBUaGUgbmFtZSBvZiB0aGUgM3JkIHBhcnR5IGhvb2sgdG8gZGVyZWdpc3Rlci5cclxuXHQgKi9cclxuXHR0aGlzLmRlcmVnaXN0ZXJHZXR0ZXIgPSBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0bG9nZ2VyLmRlYnVnKCdHZXR0ZXIgdW5yZWdpc3RlcmVkOiAnICsgbmFtZSk7XHJcblx0XHRkZWxldGUgZ2V0dGVyc1tuYW1lXTtcclxuXHRcdHVpLnVwZGF0ZUVtb3RlcygpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSByYXcgZGF0YSBmcm9tIHRoZSBBUEkgZW5kcG9pbnRzLiBTaG91bGQgYmUgY2FsbGVkIGF0IGxvYWQgYW5kL29yIHdoZW5ldmVyIHRoZSBBUEkgbWF5IGhhdmUgY2hhbmdlZC4gUG9wdWxhdGVzIGludGVybmFsIG9iamVjdHMgd2l0aCB1cGRhdGVkIGRhdGEuXHJcblx0ICovXHJcblx0dGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKGhhc0luaXRpYWxpemVkKSB7XHJcblx0XHRcdGxvZ2dlci5kZWJ1ZygnQWxyZWFkeSBpbml0aWFsaXplZCBFbW90ZVN0b3JlLCBzdG9wcGluZyBpbml0LicpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bG9nZ2VyLmRlYnVnKCdTdGFydGluZyBpbml0aWFsaXphdGlvbi4nKTtcclxuXHJcblx0XHR2YXIgdHdpdGNoQXBpID0gcmVxdWlyZSgnLi90d2l0Y2gtYXBpJyk7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0Ly8gSGFzaCBvZiBlbW90ZSBzZXQgdG8gZm9yY2VkIGNoYW5uZWwuXHJcblx0XHR2YXIgZm9yY2VkU2V0c1RvQ2hhbm5lbHMgPSB7XHJcblx0XHRcdC8vIEdsb2JhbHMuXHJcblx0XHRcdDA6ICd+Z2xvYmFsJyxcclxuXHRcdFx0Ly8gQnViYmxlIGVtb3Rlcy5cclxuXHRcdFx0MzM6ICd0dXJibycsXHJcblx0XHRcdC8vIE1vbmtleSBlbW90ZXMuXHJcblx0XHRcdDQyOiAndHVyYm8nLFxyXG5cdFx0XHQvLyBIaWRkZW4gdHVyYm8gZW1vdGVzLlxyXG5cdFx0XHQ0NTc6ICd0dXJibycsXHJcblx0XHRcdDc5MzogJ3R1cmJvJyxcclxuXHRcdFx0MTkxNTE6ICd0d2l0Y2hfcHJpbWUnLFxyXG5cdFx0XHQxOTE5NDogJ3R3aXRjaF9wcmltZSdcclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdGxvZ2dlci5kZWJ1ZygnSW5pdGlhbGl6aW5nIGVtb3RlIHNldCBjaGFuZ2UgbGlzdGVuZXIuJyk7XHJcblxyXG5cdFx0dHdpdGNoQXBpLmdldEVtb3RlcyhmdW5jdGlvbiAoZW1vdGVTZXRzKSB7XHJcblx0XHRcdGxvZ2dlci5kZWJ1ZygnUGFyc2luZyBlbW90ZSBzZXRzLicpO1xyXG5cclxuXHRcdFx0T2JqZWN0LmtleXMoZW1vdGVTZXRzKS5mb3JFYWNoKGZ1bmN0aW9uIChzZXQpIHtcclxuXHRcdFx0XHR2YXIgZW1vdGVzID0gZW1vdGVTZXRzW3NldF07XHJcblx0XHRcdFx0c2V0ID0gTnVtYmVyKHNldCk7XHJcblx0XHRcdFx0ZW1vdGVzLmZvckVhY2goZnVuY3Rpb24gKGVtb3RlKSB7XHJcblx0XHRcdFx0XHQvLyBTZXQgc29tZSByZXF1aXJlZCBpbmZvLlxyXG5cdFx0XHRcdFx0ZW1vdGUudXJsID0gJy8vc3RhdGljLWNkbi5qdHZudy5uZXQvZW1vdGljb25zL3YxLycgKyBlbW90ZS5pZCArICcvMS4wJztcclxuXHRcdFx0XHRcdGVtb3RlLnRleHQgPSBnZXRFbW90ZUZyb21SZWdFeChlbW90ZS5jb2RlKTtcclxuXHRcdFx0XHRcdGVtb3RlLnNldCA9IHNldDtcclxuXHJcblx0XHRcdFx0XHQvLyBIYXJkY29kZSB0aGUgY2hhbm5lbHMgb2YgY2VydGFpbiBzZXRzLlxyXG5cdFx0XHRcdFx0aWYgKGZvcmNlZFNldHNUb0NoYW5uZWxzW3NldF0pIHtcclxuXHRcdFx0XHRcdFx0ZW1vdGUuY2hhbm5lbCA9IGZvcmNlZFNldHNUb0NoYW5uZWxzW3NldF07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dmFyIGluc3RhbmNlID0gbmV3IEVtb3RlKGVtb3RlKTtcclxuXHJcblx0XHRcdFx0XHQvLyBTYXZlIHRoZSBlbW90ZSBmb3IgdXNlIGxhdGVyLlxyXG5cdFx0XHRcdFx0bmF0aXZlRW1vdGVzW2Vtb3RlLnRleHRdID0gaW5zdGFuY2U7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0bG9nZ2VyLmRlYnVnKCdMb2FkaW5nIHN1YnNjcmlwdGlvbiBkYXRhLicpO1xyXG5cclxuXHRcdFx0Ly8gR2V0IGFjdGl2ZSBzdWJzY3JpcHRpb25zIHRvIGZpbmQgdGhlIGNoYW5uZWxzLlxyXG5cdFx0XHR0d2l0Y2hBcGkuZ2V0VGlja2V0cyhmdW5jdGlvbiAodGlja2V0cykge1xyXG5cdFx0XHRcdC8vIEluc3RhbmNlcyBmcm9tIGVhY2ggY2hhbm5lbCB0byBwcmVsb2FkIGNoYW5uZWwgZGF0YS5cclxuXHRcdFx0XHR2YXIgZGVmZXJyZWRDaGFubmVsR2V0cyA9IHt9O1xyXG5cclxuXHRcdFx0XHRsb2dnZXIuZGVidWcoJ1RpY2tldHMgbG9hZGVkIGZyb20gdGhlIEFQSS4nLCB0aWNrZXRzKTtcclxuXHRcdFx0XHR0aWNrZXRzLmZvckVhY2goZnVuY3Rpb24gKHRpY2tldCkge1xyXG5cdFx0XHRcdFx0dmFyIHByb2R1Y3QgPSB0aWNrZXQucHJvZHVjdDtcclxuXHRcdFx0XHRcdHZhciBjaGFubmVsID0gcHJvZHVjdC5vd25lcl9uYW1lIHx8IHByb2R1Y3Quc2hvcnRfbmFtZTtcclxuXHJcblx0XHRcdFx0XHQvLyBHZXQgc3Vic2NyaXB0aW9ucyB3aXRoIGVtb3RlcyBvbmx5LlxyXG5cdFx0XHRcdFx0aWYgKCFwcm9kdWN0LmVtb3RpY29ucyB8fCAhcHJvZHVjdC5lbW90aWNvbnMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gU2V0IHRoZSBjaGFubmVsIG9uIHRoZSBlbW90ZXMuXHJcblx0XHRcdFx0XHRwcm9kdWN0LmVtb3RpY29ucy5mb3JFYWNoKGZ1bmN0aW9uIChlbW90ZSkge1xyXG5cdFx0XHRcdFx0XHR2YXIgaW5zdGFuY2UgPSBuYXRpdmVFbW90ZXNbZ2V0RW1vdGVGcm9tUmVnRXgoZW1vdGUucmVnZXgpXTtcclxuXHRcdFx0XHRcdFx0aW5zdGFuY2Uuc2V0Q2hhbm5lbE5hbWUoY2hhbm5lbCk7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBTYXZlIGluc3RhbmNlIGZvciBsYXRlciwgYnV0IG9ubHkgb25lIGluc3RhbmNlIHBlciBjaGFubmVsLlxyXG5cdFx0XHRcdFx0XHRpZiAoIWRlZmVycmVkQ2hhbm5lbEdldHNbY2hhbm5lbF0pIHtcclxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZENoYW5uZWxHZXRzW2NoYW5uZWxdID0gaW5zdGFuY2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHQvLyBQcmVsb2FkIGNoYW5uZWwgZGF0YS5cclxuXHRcdFx0XHRPYmplY3Qua2V5cyhkZWZlcnJlZENoYW5uZWxHZXRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuXHRcdFx0XHRcdHZhciBpbnN0YW5jZSA9IGRlZmVycmVkQ2hhbm5lbEdldHNba2V5XTtcclxuXHRcdFx0XHRcdGluc3RhbmNlLmdldENoYW5uZWxCYWRnZSgpO1xyXG5cdFx0XHRcdFx0aW5zdGFuY2UuZ2V0Q2hhbm5lbERpc3BsYXlOYW1lKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dWkudXBkYXRlRW1vdGVzKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR1aS51cGRhdGVFbW90ZXMoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGhhc0luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdGxvZ2dlci5kZWJ1ZygnRmluaXNoZWQgRW1vdGVTdG9yZSBpbml0aWFsaXphdGlvbi4nKTtcclxuXHR9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgYSBzcGVjaWZpYyBlbW90ZSwgaWYgYXZhaWxhYmxlLlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICB0ZXh0IFRoZSB0ZXh0IG9mIHRoZSBlbW90ZSB0byBnZXQuXHJcbiAqIEByZXR1cm4ge0Vtb3RlfG51bGx9ICAgICAgVGhlIEVtb3RlIGluc3RhbmNlIG9mIHRoZSBlbW90ZSBvciBgbnVsbGAgaWYgaXQgY291bGRuJ3QgYmUgZm91bmQuXHJcbiAqL1xyXG5FbW90ZVN0b3JlLnByb3RvdHlwZS5nZXRFbW90ZSA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcblx0cmV0dXJuIHRoaXMuZ2V0RW1vdGVzKG51bGwsIG51bGwsICdvYmplY3QnKVt0ZXh0XSB8fCBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtb3RlIG9iamVjdC5cclxuICogQHBhcmFtIHtvYmplY3R9IGRldGFpbHMgICAgICAgICAgICAgIE9iamVjdCBkZXNjcmliaW5nIHRoZSBlbW90ZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IGRldGFpbHMudGV4dCAgICAgICAgIFRoZSB0ZXh0IHRvIHVzZSBpbiB0aGUgY2hhdCBib3ggd2hlbiBlbW90ZSBpcyBjbGlja2VkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZGV0YWlscy51cmwgICAgICAgICAgVGhlIFVSTCBvZiB0aGUgaW1hZ2UgZm9yIHRoZSBlbW90ZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IFtkZXRhaWxzLmJhZGdlXSAgICAgIFRoZSBVUkwgb2YgdGhlIGJhZGdlIGZvciB0aGUgZW1vdGUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZGV0YWlscy5jaGFubmVsXSAgICBUaGUgY2hhbm5lbCB0aGUgZW1vdGUgc2hvdWxkIGJlIGNhdGVnb3JpemVkIHVuZGVyLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2RldGFpbHMuZ2V0dGVyTmFtZV0gVGhlIDNyZCBwYXJ0eSBnZXR0ZXIgdGhhdCByZWdpc3RlcmVkIHRoZSBlbW90ZS4gVXNlZCBpbnRlcm5hbGx5IG9ubHkuXHJcbiAqL1xyXG5mdW5jdGlvbiBFbW90ZShkZXRhaWxzKSB7XHJcblx0dmFyIHRleHQgPSBudWxsO1xyXG5cdHZhciB1cmwgPSBudWxsO1xyXG5cdHZhciBnZXR0ZXJOYW1lID0gbnVsbDtcclxuXHR2YXIgY2hhbm5lbCA9IHtcclxuXHRcdG5hbWU6IG51bGwsXHJcblx0XHRkaXNwbGF5TmFtZTogbnVsbCxcclxuXHRcdGJhZGdlOiBudWxsXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgdGV4dCBvZiB0aGUgZW1vdGUuXHJcblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgZW1vdGUgdGV4dC5cclxuXHQgKi9cclxuXHR0aGlzLmdldFRleHQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGV4dDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB0ZXh0IG9mIHRoZSBlbW90ZS5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGhlVGV4dCBUaGUgdGV4dCB0byBzZXQuXHJcblx0ICovXHJcblx0dGhpcy5zZXRUZXh0ID0gZnVuY3Rpb24gKHRoZVRleHQpIHtcclxuXHRcdGlmICh0eXBlb2YgdGhlVGV4dCAhPT0gJ3N0cmluZycgfHwgdGhlVGV4dC5sZW5ndGggPCAxKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0ZXh0Jyk7XHJcblx0XHR9XHJcblx0XHR0ZXh0ID0gdGhlVGV4dDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBnZXR0ZXIgbmFtZSB0aGlzIGVtb3RlIGJlbG9uZ3MgdG8uXHJcblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgZ2V0dGVyJ3MgbmFtZS5cclxuXHQgKi9cclxuXHR0aGlzLmdldEdldHRlck5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZ2V0dGVyTmFtZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBnZXR0ZXIgbmFtZSB0aGlzIGVtb3RlIGJlbG9uZ3MgdG8uXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRoZUdldHRlck5hbWUgVGhlIGdldHRlcidzIG5hbWUuXHJcblx0ICovXHJcblx0dGhpcy5zZXRHZXR0ZXJOYW1lID0gZnVuY3Rpb24gKHRoZUdldHRlck5hbWUpIHtcclxuXHRcdGlmICh0eXBlb2YgdGhlR2V0dGVyTmFtZSAhPT0gJ3N0cmluZycgfHwgdGhlR2V0dGVyTmFtZS5sZW5ndGggPCAxKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBnZXR0ZXIgbmFtZScpO1xyXG5cdFx0fVxyXG5cdFx0Z2V0dGVyTmFtZSA9IHRoZUdldHRlck5hbWU7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgZW1vdGUncyBpbWFnZSBVUkwuXHJcblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgZW1vdGUgaW1hZ2UgVVJMLlxyXG5cdCAqL1xyXG5cdHRoaXMuZ2V0VXJsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHVybDtcclxuXHR9O1xyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGVtb3RlJ3MgaW1hZ2UgVVJMLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aGVVcmwgVGhlIGltYWdlIFVSTCB0byBzZXQuXHJcblx0ICovXHJcblx0dGhpcy5zZXRVcmwgPSBmdW5jdGlvbiAodGhlVXJsKSB7XHJcblx0XHRpZiAodHlwZW9mIHRoZVVybCAhPT0gJ3N0cmluZycgfHwgdGhlVXJsLmxlbmd0aCA8IDEpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFVSTCcpO1xyXG5cdFx0fVxyXG5cdFx0dXJsID0gdGhlVXJsO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGVtb3RlJ3MgY2hhbm5lbCBuYW1lLlxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGVtb3RlJ3MgY2hhbm5lbCBvciBhbiBlbXB0eSBzdHJpbmcgaWYgaXQgZG9lc24ndCBoYXZlIG9uZS5cclxuXHQgKi9cclxuXHR0aGlzLmdldENoYW5uZWxOYW1lID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCFjaGFubmVsLm5hbWUpIHtcclxuXHRcdFx0Y2hhbm5lbC5uYW1lID0gc3RvcmFnZS5jaGFubmVsTmFtZXMuZ2V0KHRoaXMuZ2V0VGV4dCgpKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBjaGFubmVsLm5hbWUgfHwgJyc7XHJcblx0fTtcclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBlbW90ZSdzIGNoYW5uZWwgbmFtZS5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGhlQ2hhbm5lbCBUaGUgY2hhbm5lbCBuYW1lIHRvIHNldC5cclxuXHQgKi9cclxuXHR0aGlzLnNldENoYW5uZWxOYW1lID0gZnVuY3Rpb24gKHRoZUNoYW5uZWwpIHtcclxuXHRcdGlmICh0eXBlb2YgdGhlQ2hhbm5lbCAhPT0gJ3N0cmluZycgfHwgdGhlQ2hhbm5lbC5sZW5ndGggPCAxKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjaGFubmVsJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gT25seSBzYXZlIHRoZSBjaGFubmVsIHRvIHN0b3JhZ2UgaWYgaXQncyBkeW5hbWljLlxyXG5cdFx0aWYgKHRoZUNoYW5uZWwgIT09ICd+Z2xvYmFsJyAmJiB0aGVDaGFubmVsICE9PSAndHVyYm8nICYmIHRoZUNoYW5uZWwgIT09ICd0d2l0Y2hfcHJpbWUnKSB7XHJcblx0XHRcdHN0b3JhZ2UuY2hhbm5lbE5hbWVzLnNldCh0aGlzLmdldFRleHQoKSwgdGhlQ2hhbm5lbCk7XHJcblx0XHR9XHJcblx0XHRjaGFubmVsLm5hbWUgPSB0aGVDaGFubmVsO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGVtb3RlIGNoYW5uZWwncyBiYWRnZSBpbWFnZSBVUkwuXHJcblx0ICogQHJldHVybiB7c3RyaW5nfG51bGx9IFRoZSBVUkwgb2YgdGhlIGJhZGdlIGltYWdlIGZvciB0aGUgZW1vdGUncyBjaGFubmVsIG9yIGBudWxsYCBpZiBpdCBkb2Vzbid0IGhhdmUgYSBjaGFubmVsLlxyXG5cdCAqL1xyXG5cdHRoaXMuZ2V0Q2hhbm5lbEJhZGdlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHR3aXRjaEFwaSA9IHJlcXVpcmUoJy4vdHdpdGNoLWFwaScpO1xyXG5cdFx0dmFyIGNoYW5uZWxOYW1lID0gdGhpcy5nZXRDaGFubmVsTmFtZSgpO1xyXG5cdFx0dmFyIGRlZmF1bHRCYWRnZSA9ICcvL3N0YXRpYy1jZG4uanR2bncubmV0L2p0dl91c2VyX3BpY3R1cmVzL3N1YnNjcmliZXItc3Rhci5wbmcnO1xyXG5cclxuXHRcdC8vIE5vIGNoYW5uZWwuXHJcblx0XHRpZiAoIWNoYW5uZWxOYW1lKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEdpdmUgZ2xvYmFscyBhIGRlZmF1bHQgYmFkZ2UuXHJcblx0XHRpZiAoY2hhbm5lbE5hbWUgPT09ICd+Z2xvYmFsJykge1xyXG5cdFx0XHRyZXR1cm4gJy9mYXZpY29uLmljbyc7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWxyZWFkeSBoYXZlIG9uZSBwcmVzZXQuXHJcblx0XHRpZiAoY2hhbm5lbC5iYWRnZSkge1xyXG5cdFx0XHRyZXR1cm4gY2hhbm5lbC5iYWRnZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDaGVjayBzdG9yYWdlLlxyXG5cdFx0Y2hhbm5lbC5iYWRnZSA9IHN0b3JhZ2UuYmFkZ2VzLmdldChjaGFubmVsTmFtZSk7XHJcblx0XHRpZiAoY2hhbm5lbC5iYWRnZSAhPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gY2hhbm5lbC5iYWRnZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBTZXQgZGVmYXVsdCB1bnRpbCBBUEkgcmV0dXJucyBzb21ldGhpbmcuXHJcblx0XHRjaGFubmVsLmJhZGdlID0gZGVmYXVsdEJhZGdlO1xyXG5cclxuXHRcdC8vIEdldCBmcm9tIEFQSS5cclxuXHRcdGxvZ2dlci5kZWJ1ZygnR2V0dGluZyBmcmVzaCBiYWRnZSBmb3I6ICcgKyBjaGFubmVsTmFtZSk7XHJcblx0XHR0d2l0Y2hBcGkuZ2V0QmFkZ2VzKGNoYW5uZWxOYW1lLCBmdW5jdGlvbiAoYmFkZ2VzKSB7XHJcblx0XHRcdHZhciBiYWRnZSA9IG51bGw7XHJcblxyXG5cdFx0XHQvLyBTYXZlIHR1cmJvIGJhZGdlIHdoaWxlIHdlIGFyZSBoZXJlLlxyXG5cdFx0XHRpZiAoYmFkZ2VzLnR1cmJvICYmIGJhZGdlcy50dXJiby5pbWFnZSkge1xyXG5cdFx0XHRcdGJhZGdlID0gYmFkZ2VzLnR1cmJvLmltYWdlO1xyXG5cdFx0XHRcdHN0b3JhZ2UuYmFkZ2VzLnNldCgndHVyYm8nLCBiYWRnZSwgODY0MDAwMDApO1xyXG5cclxuXHRcdFx0XHQvLyBUdXJibyBpcyBhY3R1YWxseSB3aGF0IHdlIHdhbnRlZCwgc28gd2UgYXJlIGRvbmUuXHJcblx0XHRcdFx0aWYgKGNoYW5uZWxOYW1lID09PSAndHVyYm8nKSB7XHJcblx0XHRcdFx0XHRjaGFubmVsLmJhZGdlID0gYmFkZ2U7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTYXZlIHR1cmJvIGJhZGdlIHdoaWxlIHdlIGFyZSBoZXJlLlxyXG5cdFx0XHRpZiAoYmFkZ2VzLnByZW1pdW0gJiYgYmFkZ2VzLnByZW1pdW0uaW1hZ2UpIHtcclxuXHRcdFx0XHRiYWRnZSA9IGJhZGdlcy5wcmVtaXVtLmltYWdlO1xyXG5cdFx0XHRcdHN0b3JhZ2UuYmFkZ2VzLnNldCgndHdpdGNoX3ByaW1lJywgYmFkZ2UsIDg2NDAwMDAwKTtcclxuXHJcblx0XHRcdFx0Ly8gVHVyYm8gaXMgYWN0dWFsbHkgd2hhdCB3ZSB3YW50ZWQsIHNvIHdlIGFyZSBkb25lLlxyXG5cdFx0XHRcdGlmIChjaGFubmVsTmFtZSA9PT0gJ3R3aXRjaF9wcmltZScpIHtcclxuXHRcdFx0XHRcdGNoYW5uZWwuYmFkZ2UgPSBiYWRnZTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNhdmUgc3Vic2NyaWJlciBiYWRnZSBpbiBzdG9yYWdlLlxyXG5cdFx0XHRpZiAoYmFkZ2VzLnN1YnNjcmliZXIgJiYgYmFkZ2VzLnN1YnNjcmliZXIuaW1hZ2UpIHtcclxuXHRcdFx0XHRjaGFubmVsLmJhZGdlID0gYmFkZ2VzLnN1YnNjcmliZXIuaW1hZ2U7XHJcblx0XHRcdFx0c3RvcmFnZS5iYWRnZXMuc2V0KGNoYW5uZWxOYW1lLCBjaGFubmVsLmJhZGdlLCA4NjQwMDAwMCk7XHJcblx0XHRcdFx0dWkudXBkYXRlRW1vdGVzKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gTm8gc3Vic2NyaWJlciBiYWRnZS5cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Y2hhbm5lbC5iYWRnZSA9IGRlZmF1bHRCYWRnZTtcclxuXHRcdFx0XHRsb2dnZXIuZGVidWcoJ0ZhaWxlZCB0byBnZXQgc3Vic2NyaWJlciBiYWRnZSBmb3I6ICcgKyBjaGFubmVsTmFtZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gY2hhbm5lbC5iYWRnZSB8fCBkZWZhdWx0QmFkZ2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZW1vdGUncyBjaGFubmVsIGJhZGdlIGltYWdlIFVSTC5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGhlQmFkZ2UgVGhlIGJhZGdlIGltYWdlIFVSTCB0byBzZXQuXHJcblx0ICovXHJcblx0dGhpcy5zZXRDaGFubmVsQmFkZ2UgPSBmdW5jdGlvbiAodGhlQmFkZ2UpIHtcclxuXHRcdGlmICh0eXBlb2YgdGhlQmFkZ2UgIT09ICdzdHJpbmcnIHx8IHRoZUJhZGdlLmxlbmd0aCA8IDEpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGJhZGdlJyk7XHJcblx0XHR9XHJcblx0XHRjaGFubmVsLmJhZGdlID0gdGhlQmFkZ2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0IGEgY2hhbm5lbCdzIGRpc3BsYXkgbmFtZS5cclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBjaGFubmVsJ3MgZGlzcGxheSBuYW1lLiBNYXkgYmUgZXF1aXZhbGVudCB0byB0aGUgY2hhbm5lbCB0aGUgZmlyc3QgdGltZSB0aGUgQVBJIG5lZWRzIHRvIGJlIGNhbGxlZC5cclxuXHQgKi9cclxuXHR0aGlzLmdldENoYW5uZWxEaXNwbGF5TmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciB0d2l0Y2hBcGkgPSByZXF1aXJlKCcuL3R3aXRjaC1hcGknKTtcclxuXHRcdHZhciBjaGFubmVsTmFtZSA9IHRoaXMuZ2V0Q2hhbm5lbE5hbWUoKTtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0XHR2YXIgZm9yY2VkQ2hhbm5lbFRvRGlzcGxheU5hbWVzID0ge1xyXG5cdFx0XHQnfmdsb2JhbCc6ICdHbG9iYWwnLFxyXG5cdFx0XHQndHVyYm8nOiAnVHdpdGNoIFR1cmJvJyxcclxuXHRcdFx0J3R3aXRjaF9wcmltZSc6ICdUd2l0Y2ggUHJpbWUnXHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIE5vIGNoYW5uZWwuXHJcblx0XHRpZiAoIWNoYW5uZWxOYW1lKSB7XHJcblx0XHRcdHJldHVybiAnJztcclxuXHRcdH1cclxuXHJcblx0XHQvLyBGb3JjZWQgZGlzcGxheSBuYW1lLlxyXG5cdFx0aWYgKGZvcmNlZENoYW5uZWxUb0Rpc3BsYXlOYW1lc1tjaGFubmVsTmFtZV0pIHtcclxuXHRcdFx0cmV0dXJuIGZvcmNlZENoYW5uZWxUb0Rpc3BsYXlOYW1lc1tjaGFubmVsTmFtZV07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWxyZWFkeSBoYXZlIG9uZSBwcmVzZXQuXHJcblx0XHRpZiAoY2hhbm5lbC5kaXNwbGF5TmFtZSkge1xyXG5cdFx0XHRyZXR1cm4gY2hhbm5lbC5kaXNwbGF5TmFtZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBMb29rIGZvciBvYnZpb3VzIGJhZCBjaGFubmVsIG5hbWVzIHRoYXQgc2hvdWxkbid0IGhpdCB0aGUgQVBJIG9yIHN0b3JhZ2UuIFVzZSBjaGFubmVsIG5hbWUgaW5zdGVhZC5cclxuXHRcdGlmICgvW15hLXowLTlfXS8udGVzdChjaGFubmVsTmFtZSkpIHtcclxuXHRcdFx0bG9nZ2VyLmRlYnVnKCdVbmFibGUgdG8gZ2V0IGRpc3BsYXkgbmFtZSBkdWUgdG8gb2J2aW91cyBub24tc3RhbmRhcmQgY2hhbm5lbCBuYW1lIGZvcjogJyArIGNoYW5uZWxOYW1lKTtcclxuXHRcdFx0cmV0dXJuIGNoYW5uZWxOYW1lO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoZWNrIHN0b3JhZ2UuXHJcblx0XHRjaGFubmVsLmRpc3BsYXlOYW1lID0gc3RvcmFnZS5kaXNwbGF5TmFtZXMuZ2V0KGNoYW5uZWxOYW1lKTtcclxuXHRcdGlmIChjaGFubmVsLmRpc3BsYXlOYW1lICE9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBjaGFubmVsLmRpc3BsYXlOYW1lO1xyXG5cdFx0fVxyXG5cdFx0Ly8gR2V0IGZyb20gQVBJLlxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdC8vIFNldCBkZWZhdWx0IHVudGlsIEFQSSByZXR1cm5zIHNvbWV0aGluZy5cclxuXHRcdFx0Y2hhbm5lbC5kaXNwbGF5TmFtZSA9IGNoYW5uZWxOYW1lO1xyXG5cclxuXHRcdFx0bG9nZ2VyLmRlYnVnKCdHZXR0aW5nIGZyZXNoIGRpc3BsYXkgbmFtZSBmb3I6ICcgKyBjaGFubmVsTmFtZSk7XHJcblx0XHRcdHR3aXRjaEFwaS5nZXRVc2VyKGNoYW5uZWxOYW1lLCBmdW5jdGlvbiAodXNlcikge1xyXG5cdFx0XHRcdGlmICghdXNlciB8fCAhdXNlci5kaXNwbGF5X25hbWUpIHtcclxuXHRcdFx0XHRcdGxvZ2dlci5kZWJ1ZygnRmFpbGVkIHRvIGdldCBkaXNwbGF5IG5hbWUgZm9yOiAnICsgY2hhbm5lbE5hbWUpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gU2F2ZSBpdC5cclxuXHRcdFx0XHRzZWxmLnNldENoYW5uZWxEaXNwbGF5TmFtZSh1c2VyLmRpc3BsYXlfbmFtZSk7XHJcblx0XHRcdFx0dWkudXBkYXRlRW1vdGVzKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gY2hhbm5lbC5kaXNwbGF5TmFtZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBlbW90ZSdzIGNoYW5uZWwgYmFkZ2UgaW1hZ2UgVVJMLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aGVCYWRnZSBUaGUgYmFkZ2UgaW1hZ2UgVVJMIHRvIHNldC5cclxuXHQgKi9cclxuXHR0aGlzLnNldENoYW5uZWxEaXNwbGF5TmFtZSA9IGZ1bmN0aW9uIChkaXNwbGF5TmFtZSkge1xyXG5cdFx0aWYgKHR5cGVvZiBkaXNwbGF5TmFtZSAhPT0gJ3N0cmluZycgfHwgZGlzcGxheU5hbWUubGVuZ3RoIDwgMSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZGlzcGxheU5hbWUnKTtcclxuXHRcdH1cclxuXHRcdGNoYW5uZWwuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcclxuXHRcdHN0b3JhZ2UuZGlzcGxheU5hbWVzLnNldCh0aGlzLmdldENoYW5uZWxOYW1lKCksIGRpc3BsYXlOYW1lLCA4NjQwMDAwMCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZSB0aGUgZGV0YWlscy5cclxuXHQgKi9cclxuXHRcclxuXHQvLyBSZXF1aXJlZCBmaWVsZHMuXHJcblx0dGhpcy5zZXRUZXh0KGRldGFpbHMudGV4dCk7XHJcblx0dGhpcy5zZXRVcmwoZGV0YWlscy51cmwpO1xyXG5cclxuXHQvLyBPcHRpb25hbCBmaWVsZHMuXHJcblx0aWYgKGRldGFpbHMuZ2V0dGVyTmFtZSkge1xyXG5cdFx0dGhpcy5zZXRHZXR0ZXJOYW1lKGRldGFpbHMuZ2V0dGVyTmFtZSk7XHJcblx0fVxyXG5cdGlmIChkZXRhaWxzLmNoYW5uZWwpIHtcclxuXHRcdHRoaXMuc2V0Q2hhbm5lbE5hbWUoZGV0YWlscy5jaGFubmVsKTtcclxuXHR9XHJcblx0aWYgKGRldGFpbHMuY2hhbm5lbERpc3BsYXlOYW1lKSB7XHJcblx0XHR0aGlzLnNldENoYW5uZWxEaXNwbGF5TmFtZShkZXRhaWxzLmNoYW5uZWxEaXNwbGF5TmFtZSk7XHJcblx0fVxyXG5cdGlmIChkZXRhaWxzLmJhZGdlKSB7XHJcblx0XHR0aGlzLnNldENoYW5uZWxCYWRnZShkZXRhaWxzLmJhZGdlKTtcclxuXHR9XHJcbn07XHJcblxyXG4vKipcclxuICogU3RhdGUgY2hhbmdlcnMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZSB3aGV0aGVyIGFuIGVtb3RlIHNob3VsZCBiZSBhIGZhdm9yaXRlLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JjZV0gYHRydWVgIGZvcmNlcyB0aGUgZW1vdGUgdG8gYmUgYSBmYXZvcml0ZSwgYGZhbHNlYCBmb3JjZXMgdGhlIGVtb3RlIHRvIG5vdCBiZSBhIGZhdm9yaXRlLlxyXG4gKi9cclxuRW1vdGUucHJvdG90eXBlLnRvZ2dsZUZhdm9yaXRlID0gZnVuY3Rpb24gKGZvcmNlKSB7XHJcblx0aWYgKHR5cGVvZiBmb3JjZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdHN0b3JhZ2Uuc3RhcnJlZC5zZXQodGhpcy5nZXRUZXh0KCksICEhZm9yY2UpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRzdG9yYWdlLnN0YXJyZWQuc2V0KHRoaXMuZ2V0VGV4dCgpLCAhdGhpcy5pc0Zhdm9yaXRlKCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZSB3aGV0aGVyIGFuIGVtb3RlIHNob3VsZCBiZSB2aXNpYmxlIG91dCBvZiBlZGl0aW5nIG1vZGUuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZvcmNlXSBgdHJ1ZWAgZm9yY2VzIHRoZSBlbW90ZSB0byBiZSB2aXNpYmxlLCBgZmFsc2VgIGZvcmNlcyB0aGUgZW1vdGUgdG8gYmUgaGlkZGVuLlxyXG4gKi9cclxuRW1vdGUucHJvdG90eXBlLnRvZ2dsZVZpc2liaWxpdHkgPSBmdW5jdGlvbiAoZm9yY2UpIHtcclxuXHRpZiAodHlwZW9mIGZvcmNlICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0c3RvcmFnZS52aXNpYmlsaXR5LnNldCh0aGlzLmdldFRleHQoKSwgISFmb3JjZSk7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHN0b3JhZ2UudmlzaWJpbGl0eS5zZXQodGhpcy5nZXRUZXh0KCksICF0aGlzLmlzVmlzaWJsZSgpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdGF0ZSBnZXR0ZXJzLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXaGV0aGVyIHRoZSBlbW90ZSBpcyBmcm9tIGEgM3JkIHBhcnR5LlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIHRoZSBlbW90ZSBpcyBmcm9tIGEgM3JkIHBhcnR5LlxyXG4gKi9cclxuRW1vdGUucHJvdG90eXBlLmlzVGhpcmRQYXJ0eSA9IGZ1bmN0aW9uICgpIHtcclxuXHRyZXR1cm4gISF0aGlzLmdldEdldHRlck5hbWUoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXaGV0aGVyIHRoZSBlbW90ZSB3YXMgZmF2b3JpdGVkLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIHRoZSBlbW90ZSB3YXMgZmF2b3JpdGVkLlxyXG4gKi9cclxuRW1vdGUucHJvdG90eXBlLmlzRmF2b3JpdGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIHN0b3JhZ2Uuc3RhcnJlZC5nZXQodGhpcy5nZXRUZXh0KCksIGZhbHNlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXaGV0aGVyIHRoZSBlbW90ZSBpcyB2aXNpYmxlIG91dHNpZGUgb2YgZWRpdGluZyBtb2RlLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIHRoZSBlbW90ZSBpcyB2aXNpYmxlIG91dHNpZGUgb2YgZWRpdGluZyBtb2RlLlxyXG4gKi9cclxuRW1vdGUucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRyZXR1cm4gc3RvcmFnZS52aXNpYmlsaXR5LmdldCh0aGlzLmdldFRleHQoKSwgdHJ1ZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV2hldGhlciB0aGUgZW1vdGUgaXMgY29uc2lkZXJlZCBhIHNpbXBsZSBzbWlsZXkuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdGhlIGVtb3RlIGlzIGNvbnNpZGVyZWQgYSBzaW1wbGUgc21pbGV5LlxyXG4gKi9cclxuRW1vdGUucHJvdG90eXBlLmlzU21pbGV5ID0gZnVuY3Rpb24gKCkge1xyXG5cdC8vIFRoZSBiYXNpYyBzbWlsZXkgZW1vdGVzLlxyXG5cdHZhciBlbW90ZXMgPSBbJzooJywgJzopJywgJzovJywgJzpcXFxcJywgJzpEJywgJzpvJywgJzpwJywgJzp6JywgJzspJywgJztwJywgJzwzJywgJz4oJywgJ0IpJywgJ1IpJywgJ29fbycsICdPX08nLCAnIy8nLCAnOjcnLCAnOj4nLCAnOlMnLCAnPF0nXTtcclxuXHRyZXR1cm4gZW1vdGVzLmluZGV4T2YodGhpcy5nZXRUZXh0KCkpICE9PSAtMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9wZXJ0eSBnZXR0ZXJzL3NldHRlcnMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHVzYWJsZSBlbW90ZSB0ZXh0IGZyb20gYSByZWdleC5cclxuICovXHJcbmZ1bmN0aW9uIGdldEVtb3RlRnJvbVJlZ0V4KHJlZ2V4KSB7XHJcblx0aWYgKHR5cGVvZiByZWdleCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdHJlZ2V4ID0gbmV3IFJlZ0V4cChyZWdleCk7XHJcblx0fVxyXG5cdGlmICghcmVnZXgpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcignYHJlZ2V4YCBtdXN0IGJlIGEgUmVnRXhwIHN0cmluZyBvciBvYmplY3QuJyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZGVjb2RlVVJJKHJlZ2V4LnNvdXJjZSlcclxuXHJcblx0XHQvLyBSZXBsYWNlIEhUTUwgZW50aXR5IGJyYWNrZXRzIHdpdGggYWN0dWFsIGJyYWNrZXRzLlxyXG5cdFx0LnJlcGxhY2UoJyZndFxcXFw7JywgJz4nKVxyXG5cdFx0LnJlcGxhY2UoJyZsdFxcXFw7JywgJzwnKVxyXG5cclxuXHRcdC8vIFJlbW92ZSBuZWdhdGl2ZSBncm91cHMuXHJcblx0XHQvL1xyXG5cdFx0Ly8gL1xyXG5cdFx0Ly8gICBcXChcXD8hICAgICAgICAgICAgICAvLyAoPyFcclxuXHRcdC8vICAgW14pXSogICAgICAgICAgICAgIC8vIGFueSBhbW91bnQgb2YgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgKVxyXG5cdFx0Ly8gICBcXCkgICAgICAgICAgICAgICAgIC8vIClcclxuXHRcdC8vIC9nXHJcblx0XHQucmVwbGFjZSgvXFwoXFw/IVteKV0qXFwpL2csICcnKVxyXG5cclxuXHRcdC8vIFBpY2sgZmlyc3Qgb3B0aW9uIGZyb20gYSBncm91cC5cclxuXHRcdC8vXHJcblx0XHQvLyAvXHJcblx0XHQvLyAgIFxcKCAgICAgICAgICAgICAgICAgLy8gKFxyXG5cdFx0Ly8gICAoW158XSkqICAgICAgICAgICAgLy8gYW55IGFtb3VudCBvZiBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCB8XHJcblx0XHQvLyAgIFxcfD8gICAgICAgICAgICAgICAgLy8gYW4gb3B0aW9uYWwgfCBjaGFyYWN0ZXJcclxuXHRcdC8vICAgW14pXSogICAgICAgICAgICAgIC8vIGFueSBhbW91bnQgb2YgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgKVxyXG5cdFx0Ly8gICBcXCkgICAgICAgICAgICAgICAgIC8vIClcclxuXHRcdC8vIC9nXHJcblx0XHQucmVwbGFjZSgvXFwoKFtefF0pKlxcfD9bXildKlxcKS9nLCAnJDEnKVxyXG5cclxuXHRcdC8vIFBpY2sgZmlyc3QgY2hhcmFjdGVyIGZyb20gYSBjaGFyYWN0ZXIgZ3JvdXAuXHJcblx0XHQvL1xyXG5cdFx0Ly8gL1xyXG5cdFx0Ly8gICBcXFsgICAgICAgICAgICAgICAgIC8vIFtcclxuXHRcdC8vICAgKFtefFxcXVxcW10pKiAgICAgICAgLy8gYW55IGFtb3VudCBvZiBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCB8LCBbLCBvciBdXHJcblx0XHQvLyAgIFxcfD8gICAgICAgICAgICAgICAgLy8gYW4gb3B0aW9uYWwgfCBjaGFyYWN0ZXJcclxuXHRcdC8vICAgW15cXF1dKiAgICAgICAgICAgICAvLyBhbnkgYW1vdW50IG9mIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IFssIG9yIF1cclxuXHRcdC8vICAgXFxdICAgICAgICAgICAgICAgICAvLyBdXHJcblx0XHQvLyAvZ1xyXG5cdFx0LnJlcGxhY2UoL1xcWyhbXnxcXF1cXFtdKSpcXHw/W15cXF1cXFtdKlxcXS9nLCAnJDEnKVxyXG5cclxuXHRcdC8vIFJlbW92ZSBvcHRpb25hbCBjaGFyYWN0ZXJzLlxyXG5cdFx0Ly9cclxuXHRcdC8vIC9cclxuXHRcdC8vICAgW15cXFxcXSAgICAgICAgICAgICAgLy8gYW55IGNoYXJhY3RlciB0aGF0IGlzIG5vdCBcXFxyXG5cdFx0Ly8gICBcXD8gICAgICAgICAgICAgICAgIC8vID9cclxuXHRcdC8vIC9nXHJcblx0XHQucmVwbGFjZSgvW15cXFxcXVxcPy9nLCAnJylcclxuXHJcblx0XHQvLyBSZW1vdmUgYm91bmRhcmllcyBhdCBiZWdpbm5pbmcgYW5kIGVuZC5cclxuXHRcdC5yZXBsYWNlKC9eXFxcXGJ8XFxcXGIkL2csICcnKSBcclxuXHJcblx0XHQvLyBVbmVzY2FwZSBvbmx5IHNpbmdsZSBiYWNrc2xhc2gsIG5vdCBtdWx0aXBsZS5cclxuXHRcdC8vXHJcblx0XHQvLyAvXHJcblx0XHQvLyAgIFxcXFwgICAgICAgICAgICAgICAgIC8vIFxcXHJcblx0XHQvLyAgICg/IVxcXFwpICAgICAgICAgICAgIC8vIGxvb2stYWhlYWQsIGFueSBjaGFyYWN0ZXIgdGhhdCBpc24ndCBcXFxyXG5cdFx0Ly8gL2dcclxuXHRcdC5yZXBsYWNlKC9cXFxcKD8hXFxcXCkvZywgJycpO1xyXG59XHJcblxyXG52YXIgc29ydGluZyA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIFNvcnQgYnkgYWxwaGFudW1lcmljIGluIHRoaXMgb3JkZXI6IHN5bWJvbHMgLT4gbnVtYmVycyAtPiBBYUJiLi4uIC0+IG51bWJlcnNcclxuICovXHJcbnNvcnRpbmcuYnlUZXh0ID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHR0ZXh0QSA9IGEuZ2V0VGV4dCgpLnRvTG93ZXJDYXNlKCk7XHJcblx0dGV4dEIgPSBiLmdldFRleHQoKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRpZiAodGV4dEEgPCB0ZXh0Qikge1xyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH1cclxuXHRpZiAodGV4dEEgPiB0ZXh0Qikge1xyXG5cdFx0cmV0dXJuIDE7XHJcblx0fVxyXG5cdHJldHVybiAwO1xyXG59XHJcblxyXG4vKipcclxuICogQmFzaWMgc21pbGllcyBiZWZvcmUgbm9uLWJhc2ljIHNtaWxpZXMuXHJcbiAqL1xyXG5zb3J0aW5nLmJ5U21pbGV5ID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRpZiAoYS5pc1NtaWxleSgpICYmXHQhYi5pc1NtaWxleSgpKSB7XHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fVxyXG5cdGlmIChiLmlzU21pbGV5KCkgJiZcdCFhLmlzU21pbGV5KCkpIHtcclxuXHRcdHJldHVybiAxO1xyXG5cdH1cclxuXHRyZXR1cm4gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHbG9iYWxzIGJlZm9yZSBzdWJzY3JpcHRpb24gZW1vdGVzLCBzdWJzY3JpcHRpb25zIGluIGFscGhhYmV0aWNhbCBvcmRlci5cclxuICovXHJcbnNvcnRpbmcuYnlDaGFubmVsTmFtZSA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0dmFyIGNoYW5uZWxBID0gYS5nZXRDaGFubmVsTmFtZSgpO1xyXG5cdHZhciBjaGFubmVsQiA9IGIuZ2V0Q2hhbm5lbE5hbWUoKTtcclxuXHJcblx0Ly8gQm90aCBkb24ndCBoYXZlIGNoYW5uZWxzLlxyXG5cdGlmICghY2hhbm5lbEEgJiYgIWNoYW5uZWxCKSB7XHJcblx0XHRyZXR1cm4gMDtcclxuXHR9XHJcblxyXG5cdC8vIFwiQVwiIGhhcyBjaGFubmVsLCBcIkJcIiBkb2Vzbid0LlxyXG5cdGlmIChjaGFubmVsQSAmJiAhY2hhbm5lbEIpIHtcclxuXHRcdHJldHVybiAxO1xyXG5cdH1cclxuXHQvLyBcIkJcIiBoYXMgY2hhbm5lbCwgXCJBXCIgZG9lc24ndC5cclxuXHRpZiAoY2hhbm5lbEIgJiYgIWNoYW5uZWxBKSB7XHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fVxyXG5cclxuXHRjaGFubmVsQSA9IGNoYW5uZWxBLnRvTG93ZXJDYXNlKCk7XHJcblx0Y2hhbm5lbEIgPSBjaGFubmVsQi50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRpZiAoY2hhbm5lbEEgPCBjaGFubmVsQikge1xyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH1cclxuXHRpZiAoY2hhbm5lbEIgPiBjaGFubmVsQSkge1xyXG5cdFx0cmV0dXJuIDE7XHJcblx0fVxyXG5cclxuXHQvLyBBbGwgdGhlIHNhbWVcclxuXHRyZXR1cm4gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgZ2VuZXJhbCBzb3J0IG9yZGVyIGZvciB0aGUgYWxsIGVtb3RlcyBjYXRlZ29yeS5cclxuICogU21pbGV5cyAtPiBDaGFubmVsIGdyb3VwaW5nIC0+IGFscGhhbnVtZXJpY1xyXG4gKi9cclxuc29ydGluZy5hbGxFbW90ZXNDYXRlZ29yeSA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0dmFyIGJ5U21pbGV5ID0gc29ydGluZy5ieVNtaWxleShhLCBiKTtcclxuXHR2YXIgYnlDaGFubmVsTmFtZSAgPSBzb3J0aW5nLmJ5Q2hhbm5lbE5hbWUoYSwgYik7XHJcblx0dmFyIGJ5VGV4dCA9IHNvcnRpbmcuYnlUZXh0KGEsIGIpO1xyXG5cclxuXHRpZiAoYnlTbWlsZXkgIT09IDApIHtcclxuXHRcdHJldHVybiBieVNtaWxleTtcclxuXHR9XHJcblx0aWYgKGJ5Q2hhbm5lbE5hbWUgIT09IDApIHtcclxuXHRcdHJldHVybiBieUNoYW5uZWxOYW1lO1xyXG5cdH1cclxuXHRyZXR1cm4gYnlUZXh0O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBlbW90ZVN0b3JlO1xyXG4iLCJ2YXIgYXBpID0ge307XHJcbnZhciBpbnN0YW5jZSA9ICdbaW5zdGFuY2UgJyArIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoOTk5IC0gMTAwKSkgKyAxMDApICsgJ10gJztcclxudmFyIHByZWZpeCA9ICdbRW1vdGUgTWVudV0gJztcclxudmFyIHN0b3JhZ2UgPSByZXF1aXJlKCcuL3N0b3JhZ2UnKTtcclxuXHJcbmFwaS5sb2cgPSBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKHR5cGVvZiBjb25zb2xlLmxvZyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0YXJndW1lbnRzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpLm1hcChmdW5jdGlvbiAoYXJnKSB7XHJcblx0XHRpZiAodHlwZW9mIGFyZyAhPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGFyZyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gYXJnO1xyXG5cdH0pO1xyXG5cdGlmIChzdG9yYWdlLmdsb2JhbC5nZXQoJ2RlYnVnTWVzc2FnZXNFbmFibGVkJywgZmFsc2UpKSB7XHJcblx0XHRhcmd1bWVudHMudW5zaGlmdChpbnN0YW5jZSk7XHJcblx0fVxyXG5cdGFyZ3VtZW50cy51bnNoaWZ0KHByZWZpeCk7XHJcblx0Y29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxufTtcclxuXHJcbmFwaS5kZWJ1ZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoIXN0b3JhZ2UuZ2xvYmFsLmdldCgnZGVidWdNZXNzYWdlc0VuYWJsZWQnLCBmYWxzZSkpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0YXJndW1lbnRzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG5cdGFyZ3VtZW50cy51bnNoaWZ0KCdbREVCVUddICcpO1xyXG5cdGFwaS5sb2cuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhcGk7XHJcbiIsInZhciBzdG9yYWdlID0gcmVxdWlyZSgnLi9zdG9yYWdlJyk7XHJcbnZhciBsb2dnZXIgPSByZXF1aXJlKCcuL2xvZ2dlcicpO1xyXG52YXIgZW1vdGVzID0gcmVxdWlyZSgnLi9lbW90ZXMnKTtcclxudmFyIGFwaSA9IHt9O1xyXG5cclxuYXBpLnRvZ2dsZURlYnVnID0gZnVuY3Rpb24gKGZvcmNlZCkge1xyXG5cdGlmICh0eXBlb2YgZm9yY2VkID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0Zm9yY2VkID0gIXN0b3JhZ2UuZ2xvYmFsLmdldCgnZGVidWdNZXNzYWdlc0VuYWJsZWQnLCBmYWxzZSk7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0Zm9yY2VkID0gISFmb3JjZWQ7XHJcblx0fVxyXG5cdHN0b3JhZ2UuZ2xvYmFsLnNldCgnZGVidWdNZXNzYWdlc0VuYWJsZWQnLCBmb3JjZWQpO1xyXG5cdGxvZ2dlci5sb2coJ0RlYnVnIG1lc3NhZ2VzIGFyZSBub3cgJyArIChmb3JjZWQgPyAnZW5hYmxlZCcgOiAnZGlzYWJsZWQnKSk7XHJcbn07XHJcblxyXG5hcGkucmVnaXN0ZXJFbW90ZUdldHRlciA9IGVtb3Rlcy5yZWdpc3RlckdldHRlcjtcclxuYXBpLmRlcmVnaXN0ZXJFbW90ZUdldHRlciA9IGVtb3Rlcy5kZXJlZ2lzdGVyR2V0dGVyO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhcGk7XHJcbiIsInZhciBTdG9yZSA9IHJlcXVpcmUoJ3N0b3JhZ2Utd3JhcHBlcicpO1xyXG52YXIgc3RvcmFnZSA9IHt9O1xyXG5cclxuLy8gR2VuZXJhbCBzdG9yYWdlLlxyXG5zdG9yYWdlLmdsb2JhbCA9IG5ldyBTdG9yZSh7XHJcblx0bmFtZXNwYWNlOiAnZW1vdGUtbWVudS1mb3ItdHdpdGNoJ1xyXG59KTtcclxuXHJcbi8vIEVtb3RlIHZpc2liaWxpdHkgc3RvcmFnZS5cclxuc3RvcmFnZS52aXNpYmlsaXR5ID0gc3RvcmFnZS5nbG9iYWwuY3JlYXRlU3Vic3RvcmUoJ3Zpc2liaWxpdHknKTtcclxuLy8gRW1vdGUgc3RhcnJlZCBzdG9yYWdlLlxyXG5zdG9yYWdlLnN0YXJyZWQgPSBzdG9yYWdlLmdsb2JhbC5jcmVhdGVTdWJzdG9yZSgnc3RhcnJlZCcpO1xyXG4vLyBEaXNwbGF5IG5hbWUgc3RvcmFnZS5cclxuc3RvcmFnZS5kaXNwbGF5TmFtZXMgPSBzdG9yYWdlLmdsb2JhbC5jcmVhdGVTdWJzdG9yZSgnZGlzcGxheU5hbWVzJyk7XHJcbi8vIENoYW5uZWwgbmFtZSBzdG9yYWdlLlxyXG5zdG9yYWdlLmNoYW5uZWxOYW1lcyA9IHN0b3JhZ2UuZ2xvYmFsLmNyZWF0ZVN1YnN0b3JlKCdjaGFubmVsTmFtZXMnKTtcclxuLy8gQmFkZ2VzIHN0b3JhZ2UuXHJcbnN0b3JhZ2UuYmFkZ2VzID0gc3RvcmFnZS5nbG9iYWwuY3JlYXRlU3Vic3RvcmUoJ2JhZGdlcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzdG9yYWdlO1xyXG4iLCJ2YXIgdGVtcGxhdGVzID0gcmVxdWlyZSgnLi4vLi4vYnVpbGQvdGVtcGxhdGVzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGRhdGEgPSB7fTtcclxuXHR2YXIga2V5ID0gbnVsbDtcclxuXHJcblx0Ly8gQ29udmVydCB0ZW1wbGF0ZXMgdG8gdGhlaXIgc2hvcnRlciBcInJlbmRlclwiIGZvcm0uXHJcblx0Zm9yIChrZXkgaW4gdGVtcGxhdGVzKSB7XHJcblx0XHRpZiAoIXRlbXBsYXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0fVxyXG5cdFx0ZGF0YVtrZXldID0gcmVuZGVyKGtleSk7XHJcblx0fVxyXG5cclxuXHQvLyBTaG9ydGN1dCB0aGUgcmVuZGVyIGZ1bmN0aW9uLiBBbGwgdGVtcGxhdGVzIHdpbGwgYmUgcGFzc2VkIGluIGFzIHBhcnRpYWxzIGJ5IGRlZmF1bHQuXHJcblx0ZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlKSB7XHJcblx0XHR0ZW1wbGF0ZSA9IHRlbXBsYXRlc1t0ZW1wbGF0ZV07XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsIHBhcnRpYWxzLCBpbmRlbnQpIHtcclxuXHRcdFx0cmV0dXJuIHRlbXBsYXRlLnJlbmRlcihjb250ZXh0LCBwYXJ0aWFscyB8fCB0ZW1wbGF0ZXMsIGluZGVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGE7XHJcbn0pKCk7XHJcbiIsInZhciB0d2l0Y2hBcGkgPSB3aW5kb3cuVHdpdGNoLmFwaTtcclxudmFyIGpRdWVyeSA9IHdpbmRvdy5qUXVlcnk7XHJcbnZhciBsb2dnZXIgPSByZXF1aXJlKCcuL2xvZ2dlcicpO1xyXG52YXIgYXBpID0ge307XHJcblxyXG5hcGkuZ2V0QmFkZ2VzID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBjYWxsYmFjaykge1xyXG5cdGlmIChcclxuXHRcdFtcclxuXHRcdFx0J35nbG9iYWwnLFxyXG5cdFx0XHQndHVyYm8nLFxyXG5cdFx0XHQndHdpdGNoX3ByaW1lJ1xyXG5cdFx0XS5pbmRleE9mKHVzZXJuYW1lKSA+IC0xXHJcblx0KSB7XHJcblx0XHRpZiAoIWpRdWVyeSkge1xyXG5cdFx0XHRjYWxsYmFjayh7fSk7XHJcblx0XHR9XHJcblx0XHQvLyBOb3RlOiBub3QgYSBkb2N1bWVudGVkIEFQSSBlbmRwb2ludC5cclxuXHRcdGpRdWVyeS5nZXRKU09OKCdodHRwczovL2JhZGdlcy50d2l0Y2gudHYvdjEvYmFkZ2VzL2dsb2JhbC9kaXNwbGF5JylcclxuXHRcdFx0LmRvbmUoZnVuY3Rpb24gKGFwaSkge1xyXG5cdFx0XHRcdHZhciBiYWRnZXMgPSB7XHJcblx0XHRcdFx0XHR0dXJibzoge1xyXG5cdFx0XHRcdFx0XHRpbWFnZTogYXBpLmJhZGdlX3NldHMudHVyYm8udmVyc2lvbnNbJzEnXS5pbWFnZV91cmxfMXhcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRwcmVtaXVtOiB7XHJcblx0XHRcdFx0XHRcdGltYWdlOiBhcGkuYmFkZ2Vfc2V0cy5wcmVtaXVtLnZlcnNpb25zWycxJ10uaW1hZ2VfdXJsXzF4XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRjYWxsYmFjayhiYWRnZXMpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQuZmFpbChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y2FsbGJhY2soe30pO1xyXG5cdFx0XHR9KTtcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHR0d2l0Y2hBcGkuZ2V0KFxyXG5cdFx0XHQnY2hhdC8nICsgdXNlcm5hbWUgKyAnL2JhZGdlcycsXHJcblx0XHRcdHthcGlfdmVyc2lvbjogM31cclxuXHRcdClcclxuXHRcdFx0LmRvbmUoZnVuY3Rpb24gKGFwaSkge1xyXG5cdFx0XHRcdGNhbGxiYWNrKGFwaSk7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRjYWxsYmFjayh7fSk7XHJcblx0XHRcdH0pO1xyXG5cdH1cclxufTtcclxuXHJcbmFwaS5nZXRVc2VyID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBjYWxsYmFjaykge1xyXG5cdC8vIE5vdGU6IG5vdCBhIGRvY3VtZW50ZWQgQVBJIGVuZHBvaW50LlxyXG5cdHR3aXRjaEFwaS5nZXQoXHJcblx0XHQndXNlcnMvJyArIHVzZXJuYW1lLFxyXG5cdFx0e2FwaV92ZXJzaW9uOiAzfVxyXG5cdClcclxuXHRcdC5kb25lKGZ1bmN0aW9uIChhcGkpIHtcclxuXHRcdFx0Y2FsbGJhY2soYXBpKTtcclxuXHRcdH0pXHJcblx0XHQuZmFpbChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGNhbGxiYWNrKHt9KTtcclxuXHRcdH0pO1xyXG59O1xyXG5cclxuYXBpLmdldFRpY2tldHMgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuXHQvLyBOb3RlOiBub3QgYSBkb2N1bWVudGVkIEFQSSBlbmRwb2ludC5cclxuXHR0d2l0Y2hBcGkuZ2V0KFxyXG5cdFx0Jy9hcGkvdXNlcnMvOmxvZ2luL3RpY2tldHMnLFxyXG5cdFx0e1xyXG5cdFx0XHRvZmZzZXQ6IDAsXHJcblx0XHRcdGxpbWl0OiAxMDAsXHJcblx0XHRcdHVuZW5kZWQ6IHRydWUsXHJcblx0XHRcdGFwaV92ZXJzaW9uOiAzXHJcblx0XHR9XHJcblx0KVxyXG5cdFx0LmRvbmUoZnVuY3Rpb24gKGFwaSkge1xyXG5cdFx0XHRjYWxsYmFjayhhcGkudGlja2V0cyB8fCBbXSk7XHJcblx0XHR9KVxyXG5cdFx0LmZhaWwoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRjYWxsYmFjayhbXSk7XHJcblx0XHR9KTtcclxufTtcclxuXHJcbmFwaS5nZXRFbW90ZXMgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuXHR0d2l0Y2hBcGkuZ2V0KFxyXG5cdFx0J3VzZXJzLzpsb2dpbi9lbW90ZXMnLFxyXG5cdFx0e2FwaV92ZXJzaW9uOiAzfVxyXG5cdClcclxuXHRcdC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cdFx0XHRpZiAoIXJlc3BvbnNlIHx8ICFyZXNwb25zZS5lbW90aWNvbl9zZXRzKSB7XHJcblx0XHRcdFx0bG9nZ2VyLmRlYnVnKCdnZXRFbW90ZXMgZW1vdGljb25fc2V0cyBlbXB0eScpO1xyXG5cdFx0XHRcdGNhbGxiYWNrKHt9KTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNhbGxiYWNrKHJlc3BvbnNlLmVtb3RpY29uX3NldHMpO1xyXG5cdFx0fSlcclxuXHRcdC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0bG9nZ2VyLmRlYnVnKCdnZXRFbW90ZXMgQVBJIGNhbGwgZmFpbGVkJyk7XHJcblx0XHRcdGNhbGxiYWNrKHt9KTtcclxuXHRcdH0pO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhcGk7XHJcbiIsInZhciBhcGkgPSB7fTtcclxudmFyICQgPSBqUXVlcnkgPSB3aW5kb3cualF1ZXJ5O1xyXG52YXIgdGVtcGxhdGVzID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMnKTtcclxudmFyIHN0b3JhZ2UgPSByZXF1aXJlKCcuL3N0b3JhZ2UnKTtcclxudmFyIGVtb3RlcyA9IHJlcXVpcmUoJy4vZW1vdGVzJyk7XHJcbnZhciBsb2dnZXIgPSByZXF1aXJlKCcuL2xvZ2dlcicpO1xyXG5cclxudmFyIHRoZU1lbnUgPSBuZXcgVUlNZW51KCk7XHJcbnZhciB0aGVNZW51QnV0dG9uID0gbmV3IFVJTWVudUJ1dHRvbigpO1xyXG5cclxuYXBpLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0Ly8gTG9hZCBDU1MuXHJcblx0cmVxdWlyZSgnLi4vLi4vYnVpbGQvc3R5bGVzJyk7XHJcblxyXG5cdC8vIExvYWQgalF1ZXJ5IHBsdWdpbnMuXHJcblx0cmVxdWlyZSgnLi4vcGx1Z2lucy9yZXNpemFibGUnKTtcclxuXHRyZXF1aXJlKCdqcXVlcnkuc2Nyb2xsYmFyJyk7XHJcblxyXG5cdHRoZU1lbnVCdXR0b24uaW5pdCgpO1xyXG5cdHRoZU1lbnUuaW5pdCgpO1xyXG59O1xyXG5cclxuYXBpLmhpZGVNZW51ID0gZnVuY3Rpb24gKCkge1xyXG5cdGlmICh0aGVNZW51LmRvbSAmJiB0aGVNZW51LmRvbS5sZW5ndGgpIHtcclxuXHRcdHRoZU1lbnUudG9nZ2xlRGlzcGxheShmYWxzZSk7XHJcblx0fVxyXG59O1xyXG5cclxuYXBpLnVwZGF0ZUVtb3RlcyA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGVNZW51LnVwZGF0ZUVtb3RlcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBVSU1lbnVCdXR0b24oKSB7XHJcblx0dGhpcy5kb20gPSBudWxsO1xyXG59XHJcblxyXG5VSU1lbnVCdXR0b24ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAodGltZXNGYWlsZWQpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0dmFyIGNoYXRCdXR0b24gPSAkKCcuc2VuZC1jaGF0LWJ1dHRvbiwgLmNoYXQtYnV0dG9ucy1jb250YWluZXIgYnV0dG9uJyk7XHJcblx0dmFyIGZhaWxDb3VudGVyID0gdGltZXNGYWlsZWQgfHwgMDtcclxuXHR0aGlzLmRvbSA9ICQoJyNlbW90ZS1tZW51LWJ1dHRvbicpO1xyXG5cclxuXHQvLyBFbGVtZW50IGFscmVhZHkgZXhpc3RzLlxyXG5cdGlmICh0aGlzLmRvbS5sZW5ndGgpIHtcclxuXHRcdGxvZ2dlci5kZWJ1ZygnTWVudUJ1dHRvbiBhbHJlYWR5IGV4aXN0cywgc3RvcHBpbmcgaW5pdC4nKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0aWYgKCFjaGF0QnV0dG9uLmxlbmd0aCkge1xyXG5cdFx0ZmFpbENvdW50ZXIgKz0gMTtcclxuXHRcdGlmIChmYWlsQ291bnRlciA9PT0gMSkge1xyXG5cdFx0XHRsb2dnZXIubG9nKCdNZW51QnV0dG9uIGNvbnRhaW5lciBtaXNzaW5nLCB0cnlpbmcgYWdhaW4uJyk7XHJcblx0XHR9XHJcblx0XHRpZiAoZmFpbENvdW50ZXIgPj0gMTApIHtcclxuXHRcdFx0bG9nZ2VyLmxvZygnTWVudUJ1dHRvbiBjb250YWluZXIgbWlzc2luZywgTWVudUJ1dHRvbiB1bmFibGUgdG8gYmUgYWRkZWQsIHN0b3BwaW5nIGluaXQuJyk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHNlbGYuaW5pdChmYWlsQ291bnRlcik7XHJcblx0XHR9LCAxMDAwKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0Ly8gQ3JlYXRlIGVsZW1lbnQuXHJcblx0dGhpcy5kb20gPSAkKHRlbXBsYXRlcy5lbW90ZUJ1dHRvbigpKTtcclxuXHR0aGlzLmRvbS5pbnNlcnRCZWZvcmUoY2hhdEJ1dHRvbik7XHJcblxyXG5cdC8vIEhpZGUgdGhlbiBmYWRlIGl0IGluLlxyXG5cdHRoaXMuZG9tLmhpZGUoKTtcclxuXHR0aGlzLmRvbS5mYWRlSW4oKTtcclxuXHJcblx0Ly8gRW5hYmxlIGNsaWNraW5nLlxyXG5cdHRoaXMuZG9tLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoZU1lbnUudG9nZ2xlRGlzcGxheSgpO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcblVJTWVudUJ1dHRvbi5wcm90b3R5cGUudG9nZ2xlRGlzcGxheSA9IGZ1bmN0aW9uIChmb3JjZWQpIHtcclxuXHR2YXIgc3RhdGUgPSB0eXBlb2YgZm9yY2VkICE9PSAndW5kZWZpbmVkJyA/ICEhZm9yY2VkIDogIXRoaXMuaXNWaXNpYmxlKCk7XHJcblx0aWYgKHN0YXRlKSB7XHJcblx0XHR0aGlzLmRvbS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblx0dGhpcy5kb20ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcblVJTWVudUJ1dHRvbi5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiB0aGlzLmRvbS5oYXNDbGFzcygnYWN0aXZlJyk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBVSU1lbnUoKSB7XHJcblx0dGhpcy5kb20gPSBudWxsO1xyXG5cdHRoaXMuZ3JvdXBzID0ge307XHJcblx0dGhpcy5lbW90ZXMgPSBbXTtcclxuXHR0aGlzLm9mZnNldCA9IG51bGw7XHJcblx0dGhpcy5mYXZvcml0ZXMgPSBudWxsO1xyXG59XHJcblxyXG5VSU1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGxvZ2dlciA9IHJlcXVpcmUoJy4vbG9nZ2VyJyk7XHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHR0aGlzLmRvbSA9ICQoJyNlbW90ZS1tZW51LWZvci10d2l0Y2gnKTtcclxuXHJcblx0Ly8gRWxlbWVudCBhbHJlYWR5IGV4aXN0cy5cclxuXHRpZiAodGhpcy5kb20ubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdC8vIENyZWF0ZSBlbGVtZW50LlxyXG5cdHRoaXMuZG9tID0gJCh0ZW1wbGF0ZXMubWVudSgpKTtcclxuXHQkKGRvY3VtZW50LmJvZHkpLmFwcGVuZCh0aGlzLmRvbSk7XHJcblxyXG5cdHRoaXMuZmF2b3JpdGVzID0gbmV3IFVJRmF2b3JpdGVzR3JvdXAoKTtcclxuXHJcblx0Ly8gRW5hYmxlIGRyYWdnaW5nLlxyXG5cdHRoaXMuZG9tLmRyYWdnYWJsZSh7XHJcblx0XHRoYW5kbGU6ICcuZHJhZ2dhYmxlJyxcclxuXHRcdHN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHNlbGYudG9nZ2xlUGlubmVkKHRydWUpO1xyXG5cdFx0XHRzZWxmLnRvZ2dsZU1vdmVtZW50KHRydWUpO1xyXG5cdFx0fSxcclxuXHRcdHN0b3A6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c2VsZi5vZmZzZXQgPSBzZWxmLmRvbS5vZmZzZXQoKTtcclxuXHRcdH0sXHJcblx0XHRjb250YWlubWVudDogJChkb2N1bWVudC5ib2R5KVxyXG5cdH0pO1xyXG5cclxuXHQvLyBFbmFibGUgcmVzaXppbmcuXHJcblx0dGhpcy5kb20ucmVzaXphYmxlKHtcclxuXHRcdGhhbmRsZTogJ1tkYXRhLWNvbW1hbmQ9XCJyZXNpemUtaGFuZGxlXCJdJyxcclxuXHRcdHN0b3A6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c2VsZi50b2dnbGVQaW5uZWQodHJ1ZSk7XHJcblx0XHRcdHNlbGYudG9nZ2xlTW92ZW1lbnQodHJ1ZSk7XHJcblx0XHR9LFxyXG5cdFx0YWxzb1Jlc2l6ZTogc2VsZi5kb20uZmluZCgnLnNjcm9sbGFibGUnKSxcclxuXHRcdGNvbnRhaW5tZW50OiAkKGRvY3VtZW50LmJvZHkpLFxyXG5cdFx0bWluSGVpZ2h0OiAxODAsXHJcblx0XHRtaW5XaWR0aDogMjAwXHJcblx0fSk7XHJcblxyXG5cdC8vIEVuYWJsZSBwaW5uaW5nLlxyXG5cdHRoaXMuZG9tLmZpbmQoJ1tkYXRhLWNvbW1hbmQ9XCJ0b2dnbGUtcGlubmVkXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0c2VsZi50b2dnbGVQaW5uZWQoKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gRW5hYmxlIGVkaXRpbmcuXHJcblx0dGhpcy5kb20uZmluZCgnW2RhdGEtY29tbWFuZD1cInRvZ2dsZS1lZGl0aW5nXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0c2VsZi50b2dnbGVFZGl0aW5nKCk7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuZG9tLmZpbmQoJy5zY3JvbGxhYmxlJykuc2Nyb2xsYmFyKClcclxuXHJcblx0dGhpcy51cGRhdGVFbW90ZXMoKTtcclxuXHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5VSU1lbnUucHJvdG90eXBlLl9kZXRlY3RPdXRzaWRlQ2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHQvLyBOb3Qgb3V0c2lkZSBvZiB0aGUgbWVudSwgaWdub3JlIHRoZSBjbGljay5cclxuXHRpZiAoJChldmVudC50YXJnZXQpLmlzKCcjZW1vdGUtbWVudS1mb3ItdHdpdGNoLCAjZW1vdGUtbWVudS1mb3ItdHdpdGNoIConKSkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Ly8gQ2xpY2tlZCBvbiB0aGUgbWVudSBidXR0b24sIGp1c3QgcmVtb3ZlIHRoZSBsaXN0ZW5lciBhbmQgbGV0IHRoZSBub3JtYWwgbGlzdGVuZXIgaGFuZGxlIGl0LlxyXG5cdGlmICghdGhpcy5pc1Zpc2libGUoKSB8fCAkKGV2ZW50LnRhcmdldCkuaXMoJyNlbW90ZS1tZW51LWJ1dHRvbiwgI2Vtb3RlLW1lbnUtYnV0dG9uIConKSkge1xyXG5cdFx0JChkb2N1bWVudCkub2ZmKCdtb3VzZXVwJywgdGhpcy5fZGV0ZWN0T3V0c2lkZUNsaWNrLmJpbmQodGhpcykpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Ly8gQ2xpY2tlZCBvdXRzaWRlLCBtYWtlIHN1cmUgdGhlIG1lbnUgaXNuJ3QgcGlubmVkLlxyXG5cdGlmICghdGhpcy5pc1Bpbm5lZCgpKSB7XHJcblx0XHQvLyBNZW51IHdhc24ndCBwaW5uZWQsIHJlbW92ZSBsaXN0ZW5lci5cclxuXHRcdCQoZG9jdW1lbnQpLm9mZignbW91c2V1cCcsIHRoaXMuX2RldGVjdE91dHNpZGVDbGljay5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMudG9nZ2xlRGlzcGxheSgpO1xyXG5cdH1cclxufTtcclxuXHJcblVJTWVudS5wcm90b3R5cGUudG9nZ2xlRGlzcGxheSA9IGZ1bmN0aW9uIChmb3JjZWQpIHtcclxuXHR2YXIgc3RhdGUgPSB0eXBlb2YgZm9yY2VkICE9PSAndW5kZWZpbmVkJyA/ICEhZm9yY2VkIDogIXRoaXMuaXNWaXNpYmxlKCk7XHJcblx0dmFyIGxvZ2dlZEluID0gd2luZG93LlR3aXRjaCAmJiB3aW5kb3cuVHdpdGNoLnVzZXIuaXNMb2dnZWRJbigpO1xyXG5cclxuXHQvLyBNZW51IHNob3VsZCBiZSBzaG93bi5cclxuXHRpZiAoc3RhdGUpIHtcclxuXHRcdC8vIENoZWNrIGlmIHVzZXIgaXMgbG9nZ2VkIGluLlxyXG5cdFx0aWYgKCFsb2dnZWRJbikge1xyXG5cdFx0XHQvLyBDYWxsIG5hdGl2ZSBsb2dpbiBmb3JtLlxyXG5cdFx0XHQkLmxvZ2luKCk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudXBkYXRlRW1vdGVzKCk7XHJcblx0XHR0aGlzLmRvbS5zaG93KCk7XHJcblxyXG5cdFx0Ly8gTWVudSBtb3ZlZCwgbW92ZSBpdCBiYWNrLlxyXG5cdFx0aWYgKHRoaXMuaGFzTW92ZWQoKSkge1xyXG5cdFx0XHR0aGlzLmRvbS5vZmZzZXQodGhpcy5vZmZzZXQpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gTmV2ZXIgbW92ZWQsIG1ha2UgaXQgdGhlIHNhbWUgc2l6ZSBhcyB0aGUgY2hhdCB3aW5kb3cuXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dmFyIGNoYXRDb250YWluZXIgPSAkKCcuY2hhdC1tZXNzYWdlcycpO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly8gQWRqdXN0IHRoZSBzaXplIHRvIGJlIHRoZSBzYW1lIGFzIHRoZSBjaGF0IGNvbnRhaW5lci5cclxuXHRcdFx0dGhpcy5kb20uaGVpZ2h0KGNoYXRDb250YWluZXIub3V0ZXJIZWlnaHQoKSAtICh0aGlzLmRvbS5vdXRlckhlaWdodCgpIC0gdGhpcy5kb20uaGVpZ2h0KCkpKTtcclxuXHRcdFx0dGhpcy5kb20ud2lkdGgoY2hhdENvbnRhaW5lci5vdXRlcldpZHRoKCkgLSAodGhpcy5kb20ub3V0ZXJXaWR0aCgpIC0gdGhpcy5kb20ud2lkdGgoKSkpO1xyXG5cclxuXHRcdFx0Ly8gQWRqdXN0IHRoZSBvZmZzZXQgdG8gYmUgdGhlIHNhbWUgYXMgdGhlIGNoYXQgY29udGFpbmVyLlxyXG5cdFx0XHR0aGlzLm9mZnNldCA9IGNoYXRDb250YWluZXIub2Zmc2V0KCk7XHJcblx0XHRcdHRoaXMuZG9tLm9mZnNldCh0aGlzLm9mZnNldCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTGlzdGVuIGZvciBvdXRzaWRlIGNsaWNrLlxyXG5cdFx0JChkb2N1bWVudCkub24oJ21vdXNldXAnLCB0aGlzLl9kZXRlY3RPdXRzaWRlQ2xpY2suYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cdC8vIE1lbnUgc2hvdWxkIGJlIGhpZGRlbi5cclxuXHRlbHNlIHtcclxuXHRcdHRoaXMuZG9tLmhpZGUoKTtcclxuXHRcdHRoaXMudG9nZ2xlRWRpdGluZyhmYWxzZSk7XHJcblx0XHR0aGlzLnRvZ2dsZVBpbm5lZChmYWxzZSk7XHJcblx0fVxyXG5cclxuXHQvLyBBbHNvIHRvZ2dsZSB0aGUgbWVudSBidXR0b24uXHJcblx0dGhlTWVudUJ1dHRvbi50b2dnbGVEaXNwbGF5KHRoaXMuaXNWaXNpYmxlKCkpO1xyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcblVJTWVudS5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiB0aGlzLmRvbS5pcygnOnZpc2libGUnKTtcclxufTtcclxuXHJcblVJTWVudS5wcm90b3R5cGUudXBkYXRlRW1vdGVzID0gZnVuY3Rpb24gKHdoaWNoKSB7XHJcblx0dmFyIGVtb3RlID0gd2hpY2ggPyB0aGlzLmdldEVtb3RlKHdoaWNoKSA6IG51bGw7XHJcblx0dmFyIGZhdm9yaXRlRW1vdGUgPSBlbW90ZSA/IHRoaXMuZmF2b3JpdGVzLmdldEVtb3RlKHdoaWNoKSA6IG51bGw7XHJcblx0aWYgKGVtb3RlKSB7XHJcblx0XHRlbW90ZS51cGRhdGUoKTtcclxuXHRcdGlmIChmYXZvcml0ZUVtb3RlKSB7XHJcblx0XHRcdGZhdm9yaXRlRW1vdGUudXBkYXRlKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblx0dmFyIGVtb3RlcyA9IHJlcXVpcmUoJy4vZW1vdGVzJyk7XHJcblx0dmFyIHRoZUVtb3RlcyA9IGVtb3Rlcy5nZXRFbW90ZXMoKTtcclxuXHR2YXIgdGhlRW1vdGVzS2V5cyA9IFtdO1xyXG5cdHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0dGhlRW1vdGVzLmZvckVhY2goZnVuY3Rpb24gKGVtb3RlSW5zdGFuY2UpIHtcclxuXHRcdHNlbGYuYWRkRW1vdGUoZW1vdGVJbnN0YW5jZSk7XHJcblx0XHR0aGVFbW90ZXNLZXlzLnB1c2goZW1vdGVJbnN0YW5jZS5nZXRUZXh0KCkpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBEaWZmZXJlbmNlIHRoZSBlbW90ZXMgYW5kIHJlbW92ZSBhbGwgbm9uLXZhbGlkIGVtb3Rlcy5cclxuXHR0aGlzLmVtb3Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChvbGRFbW90ZSkge1xyXG5cdFx0dmFyIHRleHQgPSBvbGRFbW90ZS5nZXRUZXh0KClcclxuXHRcdGlmICh0aGVFbW90ZXNLZXlzLmluZGV4T2YodGV4dCkgPCAwKSB7XHJcblx0XHRcdGxvZ2dlci5kZWJ1ZygnRW1vdGUgZGlmZmVyZW5jZSBmb3VuZCwgcmVtb3ZpbmcgZW1vdGUgZnJvbSBVSTogJyArIHRleHQpO1xyXG5cdFx0XHRzZWxmLnJlbW92ZUVtb3RlKHRleHQpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBTYXZlIHRoZSBlbW90ZXMgZm9yIG5leHQgZGlmZmVyZW5jaW5nLlxyXG5cdHRoaXMuZW1vdGVzID0gdGhlRW1vdGVzO1xyXG5cclxuXHQvL1VwZGF0ZSBncm91cHMuXHJcblx0T2JqZWN0LmtleXModGhpcy5ncm91cHMpLmZvckVhY2goZnVuY3Rpb24gKGdyb3VwKSB7XHJcblx0XHRzZWxmLmdldEdyb3VwKGdyb3VwKS5pbml0KCk7XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVUlNZW51LnByb3RvdHlwZS50b2dnbGVFZGl0aW5nID0gZnVuY3Rpb24gKGZvcmNlZCkge1xyXG5cdHZhciBzdGF0ZSA9IHR5cGVvZiBmb3JjZWQgIT09ICd1bmRlZmluZWQnID8gISFmb3JjZWQgOiAhdGhpcy5pc0VkaXRpbmcoKTtcclxuXHR0aGlzLmRvbS50b2dnbGVDbGFzcygnZWRpdGluZycsIHN0YXRlKTtcclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcblVJTWVudS5wcm90b3R5cGUuaXNFZGl0aW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiB0aGlzLmRvbS5oYXNDbGFzcygnZWRpdGluZycpO1xyXG59O1xyXG5cclxuVUlNZW51LnByb3RvdHlwZS50b2dnbGVQaW5uZWQgPSBmdW5jdGlvbiAoZm9yY2VkKSB7XHJcblx0dmFyIHN0YXRlID0gdHlwZW9mIGZvcmNlZCAhPT0gJ3VuZGVmaW5lZCcgPyAhIWZvcmNlZCA6ICF0aGlzLmlzUGlubmVkKCk7XHJcblx0dGhpcy5kb20udG9nZ2xlQ2xhc3MoJ3Bpbm5lZCcsIHN0YXRlKTtcclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcblVJTWVudS5wcm90b3R5cGUuaXNQaW5uZWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIHRoaXMuZG9tLmhhc0NsYXNzKCdwaW5uZWQnKTtcclxufTtcclxuXHJcblVJTWVudS5wcm90b3R5cGUudG9nZ2xlTW92ZW1lbnQgPSBmdW5jdGlvbiAoZm9yY2VkKSB7XHJcblx0dmFyIHN0YXRlID0gdHlwZW9mIGZvcmNlZCAhPT0gJ3VuZGVmaW5lZCcgPyAhIWZvcmNlZCA6ICF0aGlzLmhhc01vdmVkKCk7XHJcblx0dGhpcy5kb20udG9nZ2xlQ2xhc3MoJ21vdmVkJywgc3RhdGUpO1xyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVUlNZW51LnByb3RvdHlwZS5oYXNNb3ZlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRyZXR1cm4gdGhpcy5kb20uaGFzQ2xhc3MoJ21vdmVkJyk7XHJcbn07XHJcblxyXG5VSU1lbnUucHJvdG90eXBlLmFkZEdyb3VwID0gZnVuY3Rpb24gKGVtb3RlSW5zdGFuY2UpIHtcclxuXHR2YXIgY2hhbm5lbCA9IGVtb3RlSW5zdGFuY2UuZ2V0Q2hhbm5lbE5hbWUoKTtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdC8vIEFscmVhZHkgYWRkZWQsIGRvbid0IGFkZCBhZ2Fpbi5cclxuXHRpZiAodGhpcy5nZXRHcm91cChjaGFubmVsKSkge1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHQvLyBBZGQgdG8gY3VycmVudCBtZW51IGdyb3Vwcy5cclxuXHR2YXIgZ3JvdXAgPSBuZXcgVUlHcm91cChlbW90ZUluc3RhbmNlKTtcclxuXHR0aGlzLmdyb3Vwc1tjaGFubmVsXSA9IGdyb3VwO1xyXG5cclxuXHQvLyBTb3J0IGdyb3VwIG5hbWVzLCBnZXQgaW5kZXggb2Ygd2hlcmUgdGhpcyBncm91cCBzaG91bGQgZ28uXHJcblx0dmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmdyb3Vwcyk7XHJcblx0a2V5cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHQvLyBHZXQgdGhlIGluc3RhbmNlcy5cclxuXHRcdGEgPSBzZWxmLmdyb3Vwc1thXS5lbW90ZUluc3RhbmNlO1xyXG5cdFx0YiA9IHNlbGYuZ3JvdXBzW2JdLmVtb3RlSW5zdGFuY2U7XHJcblxyXG5cdFx0Ly8gR2V0IHRoZSBjaGFubmVsIG5hbWUuXHJcblx0XHR2YXIgYUNoYW5uZWwgPSBhLmdldENoYW5uZWxOYW1lKCk7XHJcblx0XHR2YXIgYkNoYW5uZWwgPSBiLmdldENoYW5uZWxOYW1lKCk7XHJcblxyXG5cdFx0Ly8gR2V0IHRoZSBjaGFubmVsIGRpc3BsYXkgbmFtZS5cclxuXHRcdGEgPSBhLmdldENoYW5uZWxEaXNwbGF5TmFtZSgpLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRiID0gYi5nZXRDaGFubmVsRGlzcGxheU5hbWUoKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRcdC8vIFByaW1lIGdvZXMgZmlyc3QsIGFsd2F5cy5cclxuXHRcdGlmIChhQ2hhbm5lbCA9PT0gJ3R3aXRjaF9wcmltZScgJiYgYkNoYW5uZWwgIT09ICd0d2l0Y2hfcHJpbWUnKSB7XHJcblx0XHRcdHJldHVybiAtMTtcclxuXHRcdH1cclxuXHRcdGlmIChiQ2hhbm5lbCA9PT0gJ3R3aXRjaF9wcmltZScgJiYgYUNoYW5uZWwgIT09ICd0d2l0Y2hfcHJpbWUnKSB7XHJcblx0XHRcdHJldHVybiAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFR1cmJvIGdvZXMgYWZ0ZXIgUHJpbWUsIGFsd2F5cy5cclxuXHRcdGlmIChhQ2hhbm5lbCA9PT0gJ3R1cmJvJyAmJiBiQ2hhbm5lbCAhPT0gJ3R1cmJvJykge1xyXG5cdFx0XHRyZXR1cm4gLTE7XHJcblx0XHR9XHJcblx0XHRpZiAoYkNoYW5uZWwgPT09ICd0dXJibycgJiYgYUNoYW5uZWwgIT09ICd0dXJibycpIHtcclxuXHRcdFx0cmV0dXJuIDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gR2xvYmFsIGdvZXMgYWZ0ZXIgVHVyYm8sIGFsd2F5cy5cclxuXHRcdGlmIChhQ2hhbm5lbCA9PT0gJ35nbG9iYWwnICYmIGJDaGFubmVsICE9PSAnfmdsb2JhbCcpIHtcclxuXHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGJDaGFubmVsID09PSAnfmdsb2JhbCcgJiYgYUNoYW5uZWwgIT09ICd+Z2xvYmFsJykge1xyXG5cdFx0XHRyZXR1cm4gMTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBIGdvZXMgZmlyc3QuXHJcblx0XHRpZiAoYSA8IGIpIHtcclxuXHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0fVxyXG5cdFx0Ly8gQiBnb2VzdCBmaXJzdC5cclxuXHRcdGlmIChhID4gYikge1xyXG5cdFx0XHRyZXR1cm4gMTtcclxuXHRcdH1cclxuXHRcdC8vIEJvdGggdGhlIHNhbWUsIGRvZXNuJ3QgbWF0dGVyLlxyXG5cdFx0cmV0dXJuIDA7XHJcblx0fSk7XHJcblxyXG5cdHZhciBpbmRleCA9IGtleXMuaW5kZXhPZihjaGFubmVsKTtcclxuXHJcblx0Ly8gRmlyc3QgaW4gdGhlIHNvcnQsIHBsYWNlIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIG1lbnUuXHJcblx0aWYgKGluZGV4ID09PSAwKSB7XHJcblx0XHRncm91cC5kb20ucHJlcGVuZFRvKHRoaXMuZG9tLmZpbmQoJyNhbGwtZW1vdGVzLWdyb3VwJykpO1xyXG5cdH1cclxuXHQvLyBJbnNlcnQgYWZ0ZXIgdGhlIHByZXZpb3VzIGdyb3VwIGluIHRoZSBzb3J0LlxyXG5cdGVsc2Uge1xyXG5cdFx0Z3JvdXAuZG9tLmluc2VydEFmdGVyKHRoaXMuZ2V0R3JvdXAoa2V5c1tpbmRleCAtIDFdKS5kb20pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGdyb3VwO1xyXG59O1xyXG5cclxuVUlNZW51LnByb3RvdHlwZS5nZXRHcm91cCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0cmV0dXJuIHRoaXMuZ3JvdXBzW25hbWVdIHx8IG51bGw7XHJcbn07XHJcblxyXG5VSU1lbnUucHJvdG90eXBlLmFkZEVtb3RlID0gZnVuY3Rpb24gKGVtb3RlSW5zdGFuY2UpIHtcclxuXHQvLyBHZXQgdGhlIGdyb3VwLCBvciBhZGQgaWYgbmVlZGVkLlxyXG5cdHZhciBncm91cCA9IHRoaXMuZ2V0R3JvdXAoZW1vdGVJbnN0YW5jZS5nZXRDaGFubmVsTmFtZSgpKSB8fCB0aGlzLmFkZEdyb3VwKGVtb3RlSW5zdGFuY2UpO1xyXG5cclxuXHRncm91cC5hZGRFbW90ZShlbW90ZUluc3RhbmNlKTtcclxuXHRncm91cC50b2dnbGVEaXNwbGF5KGdyb3VwLmlzVmlzaWJsZSgpLCB0cnVlKTtcclxuXHJcblx0dGhpcy5mYXZvcml0ZXMuYWRkRW1vdGUoZW1vdGVJbnN0YW5jZSk7XHJcblxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVUlNZW51LnByb3RvdHlwZS5yZW1vdmVFbW90ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdE9iamVjdC5rZXlzKHRoaXMuZ3JvdXBzKS5mb3JFYWNoKGZ1bmN0aW9uIChncm91cE5hbWUpIHtcclxuXHRcdHNlbGYuZ3JvdXBzW2dyb3VwTmFtZV0ucmVtb3ZlRW1vdGUobmFtZSk7XHJcblx0fSk7XHJcblx0dGhpcy5mYXZvcml0ZXMucmVtb3ZlRW1vdGUobmFtZSk7XHJcblxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVUlNZW51LnByb3RvdHlwZS5nZXRFbW90ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0dmFyIGdyb3VwTmFtZSA9IG51bGw7XHJcblx0dmFyIGdyb3VwID0gbnVsbDtcclxuXHR2YXIgZW1vdGUgPSBudWxsO1xyXG5cclxuXHRmb3IgKGdyb3VwTmFtZSBpbiB0aGlzLmdyb3Vwcykge1xyXG5cdFx0Z3JvdXAgPSB0aGlzLmdyb3Vwc1tncm91cE5hbWVdO1xyXG5cdFx0ZW1vdGUgPSBncm91cC5nZXRFbW90ZShuYW1lKTtcclxuXHJcblx0XHRpZiAoZW1vdGUpIHtcclxuXHRcdFx0cmV0dXJuIGVtb3RlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBVSUdyb3VwKGVtb3RlSW5zdGFuY2UpIHtcclxuXHR0aGlzLmRvbSA9IG51bGw7XHJcblx0dGhpcy5lbW90ZXMgPSB7fTtcclxuXHR0aGlzLmVtb3RlSW5zdGFuY2UgPSBlbW90ZUluc3RhbmNlO1xyXG5cclxuXHR0aGlzLmluaXQoKTtcclxufVxyXG5cclxuVUlHcm91cC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0dmFyIGVtb3RlSW5zdGFuY2UgPSB0aGlzLmVtb3RlSW5zdGFuY2U7XHJcblxyXG5cdC8vIEZpcnN0IGluaXQsIGNyZWF0ZSBuZXcgRE9NLlxyXG5cdGlmICh0aGlzLmRvbSA9PT0gbnVsbCkge1xyXG5cdFx0dGhpcy5kb20gPSAkKHRlbXBsYXRlcy5lbW90ZUdyb3VwSGVhZGVyKHtcclxuXHRcdFx0YmFkZ2U6IGVtb3RlSW5zdGFuY2UuZ2V0Q2hhbm5lbEJhZGdlKCksXHJcblx0XHRcdGNoYW5uZWw6IGVtb3RlSW5zdGFuY2UuZ2V0Q2hhbm5lbE5hbWUoKSxcclxuXHRcdFx0Y2hhbm5lbERpc3BsYXlOYW1lOiBlbW90ZUluc3RhbmNlLmdldENoYW5uZWxEaXNwbGF5TmFtZSgpXHJcblx0XHR9KSk7XHJcblx0fVxyXG5cdC8vIFVwZGF0ZSBET00gaW5zdGVhZC5cclxuXHRlbHNlIHtcclxuXHRcdHRoaXMuZG9tLmZpbmQoJy5oZWFkZXItaW5mbycpLnJlcGxhY2VXaXRoKFxyXG5cdFx0XHQkKHRlbXBsYXRlcy5lbW90ZUdyb3VwSGVhZGVyKHtcclxuXHRcdFx0XHRiYWRnZTogZW1vdGVJbnN0YW5jZS5nZXRDaGFubmVsQmFkZ2UoKSxcclxuXHRcdFx0XHRjaGFubmVsOiBlbW90ZUluc3RhbmNlLmdldENoYW5uZWxOYW1lKCksXHJcblx0XHRcdFx0Y2hhbm5lbERpc3BsYXlOYW1lOiBlbW90ZUluc3RhbmNlLmdldENoYW5uZWxEaXNwbGF5TmFtZSgpXHJcblx0XHRcdH0pKVxyXG5cdFx0XHQuZmluZCgnLmhlYWRlci1pbmZvJylcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHQvLyBFbmFibGUgZW1vdGUgaGlkaW5nLlxyXG5cdHRoaXMuZG9tLmZpbmQoJy5oZWFkZXItaW5mbyBbZGF0YS1jb21tYW5kPVwidG9nZ2xlLXZpc2liaWxpdHlcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoZU1lbnUuaXNFZGl0aW5nKCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0c2VsZi50b2dnbGVEaXNwbGF5KCk7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMudG9nZ2xlRGlzcGxheSh0aGlzLmlzVmlzaWJsZSgpLCB0cnVlKTtcclxufTtcclxuXHJcblVJR3JvdXAucHJvdG90eXBlLnRvZ2dsZURpc3BsYXkgPSBmdW5jdGlvbiAoZm9yY2VkLCBza2lwVXBkYXRpbmdFbW90ZURpc3BsYXkpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0dmFyIHN0YXRlID0gdHlwZW9mIGZvcmNlZCAhPT0gJ3VuZGVmaW5lZCcgPyAhZm9yY2VkIDogdGhpcy5pc1Zpc2libGUoKTtcclxuXHJcblx0dGhpcy5kb20udG9nZ2xlQ2xhc3MoJ2Vtb3RlLW1lbnUtaGlkZGVuJywgc3RhdGUpO1xyXG5cclxuXHQvLyBVcGRhdGUgdGhlIGRpc3BsYXkgb2YgYWxsIGVtb3Rlcy5cclxuXHRpZiAoIXNraXBVcGRhdGluZ0Vtb3RlRGlzcGxheSkge1xyXG5cdFx0T2JqZWN0LmtleXModGhpcy5lbW90ZXMpLmZvckVhY2goZnVuY3Rpb24gKGVtb3RlTmFtZSkge1xyXG5cdFx0XHRzZWxmLmVtb3Rlc1tlbW90ZU5hbWVdLnRvZ2dsZURpc3BsYXkoIXN0YXRlKTtcclxuXHRcdFx0dGhlTWVudS51cGRhdGVFbW90ZXMoc2VsZi5lbW90ZXNbZW1vdGVOYW1lXS5pbnN0YW5jZS5nZXRUZXh0KCkpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcblVJR3JvdXAucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdC8vIElmIGFueSBlbW90ZSBpcyB2aXNpYmxlLCB0aGUgZ3JvdXAgc2hvdWxkIGJlIHZpc2libGUuXHJcblx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZW1vdGVzKS5zb21lKGZ1bmN0aW9uIChlbW90ZU5hbWUpIHtcclxuXHRcdHJldHVybiBzZWxmLmVtb3Rlc1tlbW90ZU5hbWVdLmlzVmlzaWJsZSgpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuVUlHcm91cC5wcm90b3R5cGUuYWRkRW1vdGUgPSBmdW5jdGlvbiAoZW1vdGVJbnN0YW5jZSkge1xyXG5cdHZhciBzZWxmID0gdGhpcztcclxuXHR2YXIgZW1vdGUgPSB0aGlzLmdldEVtb3RlKGVtb3RlSW5zdGFuY2UuZ2V0VGV4dCgpKTtcclxuXHJcblx0Ly8gQWxyZWFkeSBhZGRlZCwgdXBkYXRlIGluc3RlYWQuXHJcblx0aWYgKGVtb3RlKSB7XHJcblx0XHRlbW90ZS51cGRhdGUoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0Ly8gQWRkIHRvIGN1cnJlbnQgZW1vdGVzLlxyXG5cdGVtb3RlID0gbmV3IFVJRW1vdGUoZW1vdGVJbnN0YW5jZSk7XHJcblx0dGhpcy5lbW90ZXNbZW1vdGVJbnN0YW5jZS5nZXRUZXh0KCldID0gZW1vdGU7XHJcblxyXG5cdHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcy5lbW90ZXMpO1xyXG5cclxuXHRrZXlzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRcdC8vIEdldCB0aGUgZW1vdGUgaW5zdGFuY2VzLlxyXG5cdFx0YSA9IHNlbGYuZW1vdGVzW2FdLmluc3RhbmNlO1xyXG5cdFx0YiA9IHNlbGYuZW1vdGVzW2JdLmluc3RhbmNlO1xyXG5cclxuXHRcdC8vIEEgaXMgYSBzbWlsZXksIEIgaXNuJ3QuIEEgZ29lcyBmaXJzdC5cclxuXHRcdGlmIChhLmlzU21pbGV5KCkgJiZcdCFiLmlzU21pbGV5KCkpIHtcclxuXHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0fVxyXG5cdFx0Ly8gQiBpcyBhIHNtaWxleSwgQSBpc24ndC4gQiBnb2VzIGZpcnN0LlxyXG5cdFx0aWYgKGIuaXNTbWlsZXkoKSAmJlx0IWEuaXNTbWlsZXkoKSkge1xyXG5cdFx0XHRyZXR1cm4gMTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBHZXQgdGhlIHRleHQgb2YgdGhlIGVtb3Rlcy5cclxuXHRcdGEgPSBhLmdldFRleHQoKS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0YiA9IGIuZ2V0VGV4dCgpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0Ly8gQSBnb2VzIGZpcnN0LlxyXG5cdFx0aWYgKGEgPCBiKSB7XHJcblx0XHRcdHJldHVybiAtMTtcclxuXHRcdH1cclxuXHRcdC8vIEIgZ29lc3QgZmlyc3QuXHJcblx0XHRpZiAoYSA+IGIpIHtcclxuXHRcdFx0cmV0dXJuIDE7XHJcblx0XHR9XHJcblx0XHQvLyBCb3RoIHRoZSBzYW1lLCBkb2Vzbid0IG1hdHRlci5cclxuXHRcdHJldHVybiAwO1xyXG5cdH0pO1xyXG5cclxuXHR2YXIgaW5kZXggPSBrZXlzLmluZGV4T2YoZW1vdGVJbnN0YW5jZS5nZXRUZXh0KCkpO1xyXG5cclxuXHQvLyBGaXJzdCBpbiB0aGUgc29ydCwgcGxhY2UgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgZ3JvdXAuXHJcblx0aWYgKGluZGV4ID09PSAwKSB7XHJcblx0XHRlbW90ZS5kb20ucHJlcGVuZFRvKHRoaXMuZG9tLmZpbmQoJy5lbW90ZS1jb250YWluZXInKSk7XHJcblx0fVxyXG5cdC8vIEluc2VydCBhZnRlciB0aGUgcHJldmlvdXMgZW1vdGUgaW4gdGhlIHNvcnQuXHJcblx0ZWxzZSB7XHJcblx0XHRlbW90ZS5kb20uaW5zZXJ0QWZ0ZXIodGhpcy5nZXRFbW90ZShrZXlzW2luZGV4IC0gMV0pLmRvbSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcblVJR3JvdXAucHJvdG90eXBlLmdldEVtb3RlID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRyZXR1cm4gdGhpcy5lbW90ZXNbbmFtZV0gfHwgbnVsbDtcclxufTtcclxuXHJcblVJR3JvdXAucHJvdG90eXBlLnJlbW92ZUVtb3RlID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuXHR2YXIgZW1vdGUgPSB0aGlzLmdldEVtb3RlKG5hbWUpO1xyXG5cdGlmICghZW1vdGUpIHtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHRlbW90ZS5kb20ucmVtb3ZlKCk7XHJcblx0ZGVsZXRlIHRoaXMuZW1vdGVzW25hbWVdO1xyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcbmZ1bmN0aW9uIFVJRmF2b3JpdGVzR3JvdXAoKSB7XHJcblx0dGhpcy5kb20gPSAkKCcjc3RhcnJlZC1lbW90ZXMtZ3JvdXAnKTtcclxuXHR0aGlzLmVtb3RlcyA9IHt9O1xyXG59XHJcblxyXG5VSUZhdm9yaXRlc0dyb3VwLnByb3RvdHlwZS5hZGRFbW90ZSA9IFVJR3JvdXAucHJvdG90eXBlLmFkZEVtb3RlO1xyXG5VSUZhdm9yaXRlc0dyb3VwLnByb3RvdHlwZS5nZXRFbW90ZSA9IFVJR3JvdXAucHJvdG90eXBlLmdldEVtb3RlO1xyXG5VSUZhdm9yaXRlc0dyb3VwLnByb3RvdHlwZS5yZW1vdmVFbW90ZSA9IFVJR3JvdXAucHJvdG90eXBlLnJlbW92ZUVtb3RlO1xyXG5cclxuZnVuY3Rpb24gVUlFbW90ZShlbW90ZUluc3RhbmNlKSB7XHJcblx0dGhpcy5kb20gPSBudWxsO1xyXG5cdHRoaXMuaW5zdGFuY2UgPSBlbW90ZUluc3RhbmNlO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59XHJcblxyXG5VSUVtb3RlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0Ly8gQ3JlYXRlIGVsZW1lbnQuXHJcblx0dGhpcy5kb20gPSAkKHRlbXBsYXRlcy5lbW90ZSh7XHJcblx0XHR1cmw6IHRoaXMuaW5zdGFuY2UuZ2V0VXJsKCksXHJcblx0XHR0ZXh0OiB0aGlzLmluc3RhbmNlLmdldFRleHQoKSxcclxuXHRcdHRoaXJkUGFydHk6IHRoaXMuaW5zdGFuY2UuaXNUaGlyZFBhcnR5KCksXHJcblx0XHRpc1Zpc2libGU6IHRoaXMuaW5zdGFuY2UuaXNWaXNpYmxlKCksXHJcblx0XHRpc1N0YXJyZWQ6IHRoaXMuaW5zdGFuY2UuaXNGYXZvcml0ZSgpXHJcblx0fSkpO1xyXG5cclxuXHQvLyBFbmFibGUgY2xpY2tpbmcuXHJcblx0dGhpcy5kb20ub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGVNZW51LmlzRWRpdGluZygpKSB7XHJcblx0XHRcdHNlbGYuYWRkVG9DaGF0KCk7XHJcblxyXG5cdFx0XHQvLyBDbG9zZSB0aGUgbWVudSBpZiBub3QgcGlubmVkLlxyXG5cdFx0XHRpZiAoIXRoZU1lbnUuaXNQaW5uZWQoKSkge1xyXG5cdFx0XHRcdHRoZU1lbnUudG9nZ2xlRGlzcGxheSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIEVuYWJsZSBlbW90ZSBoaWRpbmcuXHJcblx0dGhpcy5kb20uZmluZCgnW2RhdGEtY29tbWFuZD1cInRvZ2dsZS12aXNpYmlsaXR5XCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGVNZW51LmlzRWRpdGluZygpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHNlbGYudG9nZ2xlRGlzcGxheSgpO1xyXG5cdFx0dGhlTWVudS51cGRhdGVFbW90ZXMoc2VsZi5pbnN0YW5jZS5nZXRUZXh0KCkpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBFbmFibGUgZW1vdGUgZmF2b3JpdGluZy5cclxuXHR0aGlzLmRvbS5maW5kKCdbZGF0YS1jb21tYW5kPVwidG9nZ2xlLXN0YXJyZWRcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoZU1lbnUuaXNFZGl0aW5nKCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0c2VsZi50b2dnbGVGYXZvcml0ZSgpO1xyXG5cdFx0dGhlTWVudS51cGRhdGVFbW90ZXMoc2VsZi5pbnN0YW5jZS5nZXRUZXh0KCkpO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcblVJRW1vdGUucHJvdG90eXBlLnRvZ2dsZURpc3BsYXkgPSBmdW5jdGlvbiAoZm9yY2VkLCBza2lwSW5zdGFuY2VVcGRhdGUpIHtcclxuXHR2YXIgc3RhdGUgPSB0eXBlb2YgZm9yY2VkICE9PSAndW5kZWZpbmVkJyA/ICFmb3JjZWQgOiB0aGlzLmlzVmlzaWJsZSgpO1xyXG5cdHRoaXMuZG9tLnRvZ2dsZUNsYXNzKCdlbW90ZS1tZW51LWhpZGRlbicsIHN0YXRlKTtcclxuXHRpZiAoIXNraXBJbnN0YW5jZVVwZGF0ZSkge1xyXG5cdFx0dGhpcy5pbnN0YW5jZS50b2dnbGVWaXNpYmlsaXR5KCFzdGF0ZSk7XHJcblx0fVxyXG5cclxuXHR2YXIgZ3JvdXAgPSB0aGlzLmdldEdyb3VwKCk7XHJcblx0Z3JvdXAudG9nZ2xlRGlzcGxheShncm91cC5pc1Zpc2libGUoKSwgdHJ1ZSk7XHJcblxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVUlFbW90ZS5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiAhdGhpcy5kb20uaGFzQ2xhc3MoJ2Vtb3RlLW1lbnUtaGlkZGVuJyk7XHJcbn07XHJcblxyXG5VSUVtb3RlLnByb3RvdHlwZS50b2dnbGVGYXZvcml0ZSA9IGZ1bmN0aW9uIChmb3JjZWQsIHNraXBJbnN0YW5jZVVwZGF0ZSkge1xyXG5cdHZhciBzdGF0ZSA9IHR5cGVvZiBmb3JjZWQgIT09ICd1bmRlZmluZWQnID8gISFmb3JjZWQgOiAhdGhpcy5pc0Zhdm9yaXRlKCk7XHJcblx0dGhpcy5kb20udG9nZ2xlQ2xhc3MoJ2Vtb3RlLW1lbnUtc3RhcnJlZCcsIHN0YXRlKTtcclxuXHRpZiAoIXNraXBJbnN0YW5jZVVwZGF0ZSkge1xyXG5cdFx0dGhpcy5pbnN0YW5jZS50b2dnbGVGYXZvcml0ZShzdGF0ZSk7XHJcblx0fVxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVUlFbW90ZS5wcm90b3R5cGUuaXNGYXZvcml0ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRyZXR1cm4gdGhpcy5kb20uaGFzQ2xhc3MoJ2Vtb3RlLW1lbnUtc3RhcnJlZCcpO1xyXG59O1xyXG5cclxuVUlFbW90ZS5wcm90b3R5cGUuYWRkVG9DaGF0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBlbWJlciA9IHJlcXVpcmUoJy4vZW1iZXItYXBpJyk7XHJcblx0Ly8gR2V0IHRleHRhcmVhIGVsZW1lbnQuXHJcblx0dmFyIGVsZW1lbnQgPSAkKCcuY2hhdC1pbnRlcmZhY2UgdGV4dGFyZWEnKS5nZXQoMCk7XHJcblx0dmFyIHRleHQgPSB0aGlzLmluc3RhbmNlLmdldFRleHQoKTtcclxuXHJcblx0Ly8gSW5zZXJ0IGF0IGN1cnNvciAvIHJlcGxhY2Ugc2VsZWN0aW9uLlxyXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvQ29kZV9zbmlwcGV0cy9NaXNjZWxsYW5lb3VzXHJcblx0dmFyIHNlbGVjdGlvbkVuZCA9IGVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgKyB0ZXh0Lmxlbmd0aDtcclxuXHR2YXIgY3VycmVudFZhbHVlID0gZWxlbWVudC52YWx1ZTtcclxuXHR2YXIgYmVmb3JlVGV4dCA9IGN1cnJlbnRWYWx1ZS5zdWJzdHJpbmcoMCwgZWxlbWVudC5zZWxlY3Rpb25TdGFydCk7XHJcblx0dmFyIGFmdGVyVGV4dCA9IGN1cnJlbnRWYWx1ZS5zdWJzdHJpbmcoZWxlbWVudC5zZWxlY3Rpb25FbmQsIGN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG5cdC8vIFNtYXJ0IHBhZGRpbmcsIG9ubHkgcHV0IHNwYWNlIGF0IHN0YXJ0IGlmIG5lZWRlZC5cclxuXHRpZiAoXHJcblx0XHRiZWZvcmVUZXh0ICE9PSAnJyAmJlxyXG5cdFx0YmVmb3JlVGV4dC5zdWJzdHIoLTEpICE9PSAnICdcclxuXHQpIHtcclxuXHRcdHRleHQgPSAnICcgKyB0ZXh0O1xyXG5cdH1cclxuXHQvLyBBbHdheXMgcHV0IHNwYWNlIGF0IGVuZC5cclxuXHR0ZXh0ID0gYmVmb3JlVGV4dCArIHRleHQgKyAnICcgKyBhZnRlclRleHQ7XHJcblx0Ly8gU2V0IHRoZSB0ZXh0LlxyXG5cdGVtYmVyLmdldCgnY29udHJvbGxlcjpjaGF0JywgJ2N1cnJlbnRSb29tJykuc2V0KCdtZXNzYWdlVG9TZW5kJywgdGV4dCk7XHJcblx0ZWxlbWVudC5mb2N1cygpO1xyXG5cdC8vIFB1dCBjdXJzb3IgYXQgZW5kLlxyXG5cdHNlbGVjdGlvbkVuZCA9IGVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgKyB0ZXh0Lmxlbmd0aDtcclxuXHRlbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvbkVuZCwgc2VsZWN0aW9uRW5kKTtcclxuXHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5VSUVtb3RlLnByb3RvdHlwZS5nZXRHcm91cCA9IGZ1bmN0aW9uICgpIHtcclxuXHRyZXR1cm4gdGhlTWVudS5nZXRHcm91cCh0aGlzLmluc3RhbmNlLmdldENoYW5uZWxOYW1lKCkpO1xyXG59O1xyXG5cclxuVUlFbW90ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG5cdHRoaXMudG9nZ2xlRGlzcGxheSh0aGlzLmluc3RhbmNlLmlzVmlzaWJsZSgpLCB0cnVlKTtcclxuXHR0aGlzLnRvZ2dsZUZhdm9yaXRlKHRoaXMuaW5zdGFuY2UuaXNGYXZvcml0ZSgpLCB0cnVlKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYXBpO1xyXG4iLCIoZnVuY3Rpb24gKCQpIHtcclxuXHQkLmZuLnJlc2l6YWJsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0XHR2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7XHJcblx0XHRcdGFsc29SZXNpemU6IG51bGwsXHJcblx0XHRcdGFsc29SZXNpemVUeXBlOiAnYm90aCcsIC8vIGBoZWlnaHRgLCBgd2lkdGhgLCBgYm90aGBcclxuXHRcdFx0Y29udGFpbm1lbnQ6IG51bGwsXHJcblx0XHRcdGNyZWF0ZTogbnVsbCxcclxuXHRcdFx0ZGVzdHJveTogbnVsbCxcclxuXHRcdFx0aGFuZGxlOiAnLnJlc2l6ZS1oYW5kbGUnLFxyXG5cdFx0XHRtYXhIZWlnaHQ6IDk5OTksXHJcblx0XHRcdG1heFdpZHRoOiA5OTk5LFxyXG5cdFx0XHRtaW5IZWlnaHQ6IDAsXHJcblx0XHRcdG1pbldpZHRoOiAwLFxyXG5cdFx0XHRyZXNpemU6IG51bGwsXHJcblx0XHRcdHJlc2l6ZU9uY2U6IG51bGwsXHJcblx0XHRcdHNuYXBTaXplOiAxLFxyXG5cdFx0XHRzdGFydDogbnVsbCxcclxuXHRcdFx0c3RvcDogbnVsbFxyXG5cdFx0fSwgb3B0aW9ucyk7XHJcblxyXG5cdFx0c2V0dGluZ3MuZWxlbWVudCA9ICQodGhpcyk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gcmVjYWxjdWxhdGVTaXplKGV2dCkge1xyXG5cdFx0XHR2YXIgZGF0YSA9IGV2dC5kYXRhLFxyXG5cdFx0XHRcdHJlc2l6ZWQgPSB7fTtcclxuXHRcdFx0ZGF0YS5kaWZmWCA9IE1hdGgucm91bmQoKGV2dC5wYWdlWCAtIGRhdGEucGFnZVgpIC8gc2V0dGluZ3Muc25hcFNpemUpICogc2V0dGluZ3Muc25hcFNpemU7XHJcblx0XHRcdGRhdGEuZGlmZlkgPSBNYXRoLnJvdW5kKChldnQucGFnZVkgLSBkYXRhLnBhZ2VZKSAvIHNldHRpbmdzLnNuYXBTaXplKSAqIHNldHRpbmdzLnNuYXBTaXplO1xyXG5cdFx0XHRpZiAoTWF0aC5hYnMoZGF0YS5kaWZmWCkgPiAwIHx8IE1hdGguYWJzKGRhdGEuZGlmZlkpID4gMCkge1xyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdHNldHRpbmdzLmVsZW1lbnQuaGVpZ2h0KCkgIT09IGRhdGEuaGVpZ2h0ICsgZGF0YS5kaWZmWSAmJlxyXG5cdFx0XHRcdFx0ZGF0YS5oZWlnaHQgKyBkYXRhLmRpZmZZID49IHNldHRpbmdzLm1pbkhlaWdodCAmJlxyXG5cdFx0XHRcdFx0ZGF0YS5oZWlnaHQgKyBkYXRhLmRpZmZZIDw9IHNldHRpbmdzLm1heEhlaWdodCAmJlxyXG5cdFx0XHRcdFx0KHNldHRpbmdzLmNvbnRhaW5tZW50ID8gZGF0YS5vdXRlckhlaWdodCArIGRhdGEuZGlmZlkgKyBkYXRhLm9mZnNldC50b3AgPD0gc2V0dGluZ3MuY29udGFpbm1lbnQub2Zmc2V0KCkudG9wICsgc2V0dGluZ3MuY29udGFpbm1lbnQub3V0ZXJIZWlnaHQoKSA6IHRydWUpXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRzZXR0aW5ncy5lbGVtZW50LmhlaWdodChkYXRhLmhlaWdodCArIGRhdGEuZGlmZlkpO1xyXG5cdFx0XHRcdFx0cmVzaXplZC5oZWlnaHQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRzZXR0aW5ncy5lbGVtZW50LndpZHRoKCkgIT09IGRhdGEud2lkdGggKyBkYXRhLmRpZmZYICYmXHJcblx0XHRcdFx0XHRkYXRhLndpZHRoICsgZGF0YS5kaWZmWCA+PSBzZXR0aW5ncy5taW5XaWR0aCAmJlxyXG5cdFx0XHRcdFx0ZGF0YS53aWR0aCArIGRhdGEuZGlmZlggPD0gc2V0dGluZ3MubWF4V2lkdGggJiZcclxuXHRcdFx0XHRcdChzZXR0aW5ncy5jb250YWlubWVudCA/IGRhdGEub3V0ZXJXaWR0aCArIGRhdGEuZGlmZlggKyBkYXRhLm9mZnNldC5sZWZ0IDw9IHNldHRpbmdzLmNvbnRhaW5tZW50Lm9mZnNldCgpLmxlZnQgKyBzZXR0aW5ncy5jb250YWlubWVudC5vdXRlcldpZHRoKCkgOiB0cnVlKVxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0c2V0dGluZ3MuZWxlbWVudC53aWR0aChkYXRhLndpZHRoICsgZGF0YS5kaWZmWCk7XHJcblx0XHRcdFx0XHRyZXNpemVkLndpZHRoID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHJlc2l6ZWQuaGVpZ2h0IHx8IHJlc2l6ZWQud2lkdGgpIHtcclxuXHRcdFx0XHRcdGlmIChzZXR0aW5ncy5yZXNpemVPbmNlKSB7XHJcblx0XHRcdFx0XHRcdHNldHRpbmdzLnJlc2l6ZU9uY2UuYmluZChzZXR0aW5ncy5lbGVtZW50KShldnQuZGF0YSk7XHJcblx0XHRcdFx0XHRcdHNldHRpbmdzLnJlc2l6ZU9uY2UgPSBudWxsO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKHNldHRpbmdzLnJlc2l6ZSkge1xyXG5cdFx0XHRcdFx0XHRzZXR0aW5ncy5yZXNpemUuYmluZChzZXR0aW5ncy5lbGVtZW50KShldnQuZGF0YSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoc2V0dGluZ3MuYWxzb1Jlc2l6ZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAocmVzaXplZC5oZWlnaHQgJiYgKHNldHRpbmdzLmFsc29SZXNpemVUeXBlID09PSAnaGVpZ2h0JyB8fCBzZXR0aW5ncy5hbHNvUmVzaXplVHlwZSA9PT0gJ2JvdGgnKSkge1xyXG5cdFx0XHRcdFx0XHRcdHNldHRpbmdzLmFsc29SZXNpemUuaGVpZ2h0KGRhdGEuYWxzb1Jlc2l6ZUhlaWdodCArIGRhdGEuZGlmZlkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChyZXNpemVkLndpZHRoICYmIChzZXR0aW5ncy5hbHNvUmVzaXplVHlwZSA9PT0gJ3dpZHRoJyB8fCBzZXR0aW5ncy5hbHNvUmVzaXplVHlwZSA9PT0gJ2JvdGgnKSkge1xyXG5cdFx0XHRcdFx0XHRcdHNldHRpbmdzLmFsc29SZXNpemUud2lkdGgoZGF0YS5hbHNvUmVzaXplV2lkdGggKyBkYXRhLmRpZmZYKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHN0YXJ0KGV2dCkge1xyXG5cdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0aWYgKHNldHRpbmdzLnN0YXJ0KSB7XHJcblx0XHRcdFx0c2V0dGluZ3Muc3RhcnQuYmluZChzZXR0aW5ncy5lbGVtZW50KSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBkYXRhID0ge1xyXG5cdFx0XHRcdGFsc29SZXNpemVIZWlnaHQ6IHNldHRpbmdzLmFsc29SZXNpemUgPyBzZXR0aW5ncy5hbHNvUmVzaXplLmhlaWdodCgpIDogMCxcclxuXHRcdFx0XHRhbHNvUmVzaXplV2lkdGg6IHNldHRpbmdzLmFsc29SZXNpemUgPyBzZXR0aW5ncy5hbHNvUmVzaXplLndpZHRoKCkgOiAwLFxyXG5cdFx0XHRcdGhlaWdodDogc2V0dGluZ3MuZWxlbWVudC5oZWlnaHQoKSxcclxuXHRcdFx0XHRvZmZzZXQ6IHNldHRpbmdzLmVsZW1lbnQub2Zmc2V0KCksXHJcblx0XHRcdFx0b3V0ZXJIZWlnaHQ6IHNldHRpbmdzLmVsZW1lbnQub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRvdXRlcldpZHRoOiBzZXR0aW5ncy5lbGVtZW50Lm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRwYWdlWDogZXZ0LnBhZ2VYLFxyXG5cdFx0XHRcdHBhZ2VZOiBldnQucGFnZVksXHJcblx0XHRcdFx0d2lkdGg6IHNldHRpbmdzLmVsZW1lbnQud2lkdGgoKVxyXG5cdFx0XHR9O1xyXG5cdFx0XHQkKGRvY3VtZW50KS5vbignbW91c2Vtb3ZlJywgJyonLCBkYXRhLCByZWNhbGN1bGF0ZVNpemUpO1xyXG5cdFx0XHQkKGRvY3VtZW50KS5vbignbW91c2V1cCcsICcqJywgc3RvcCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc3RvcCgpIHtcclxuXHRcdFx0aWYgKHNldHRpbmdzLnN0b3ApIHtcclxuXHRcdFx0XHRzZXR0aW5ncy5zdG9wLmJpbmQoc2V0dGluZ3MuZWxlbWVudCkoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQkKGRvY3VtZW50KS5vZmYoJ21vdXNlbW92ZScsICcqJywgcmVjYWxjdWxhdGVTaXplKTtcclxuXHRcdFx0JChkb2N1bWVudCkub2ZmKCdtb3VzZXVwJywgJyonLCBzdG9wKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2V0dGluZ3MuaGFuZGxlKSB7XHJcblx0XHRcdGlmIChzZXR0aW5ncy5hbHNvUmVzaXplICYmIFsnYm90aCcsICdoZWlnaHQnLCAnd2lkdGgnXS5pbmRleE9mKHNldHRpbmdzLmFsc29SZXNpemVUeXBlKSA+PSAwKSB7XHJcblx0XHRcdFx0c2V0dGluZ3MuYWxzb1Jlc2l6ZSA9ICQoc2V0dGluZ3MuYWxzb1Jlc2l6ZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHNldHRpbmdzLmNvbnRhaW5tZW50KSB7XHJcblx0XHRcdFx0c2V0dGluZ3MuY29udGFpbm1lbnQgPSAkKHNldHRpbmdzLmNvbnRhaW5tZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzZXR0aW5ncy5oYW5kbGUgPSAkKHNldHRpbmdzLmhhbmRsZSk7XHJcblx0XHRcdHNldHRpbmdzLnNuYXBTaXplID0gc2V0dGluZ3Muc25hcFNpemUgPCAxID8gMSA6IHNldHRpbmdzLnNuYXBTaXplO1xyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMgPT09ICdkZXN0cm95Jykge1xyXG5cdFx0XHRcdHNldHRpbmdzLmhhbmRsZS5vZmYoJ21vdXNlZG93bicsIHN0YXJ0KTtcclxuXHJcblx0XHRcdFx0aWYgKHNldHRpbmdzLmRlc3Ryb3kpIHtcclxuXHRcdFx0XHRcdHNldHRpbmdzLmRlc3Ryb3kuYmluZCh0aGlzKSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2V0dGluZ3MuaGFuZGxlLm9uKCdtb3VzZWRvd24nLCBzdGFydCk7XHJcblxyXG5cdFx0XHRpZiAoc2V0dGluZ3MuY3JlYXRlKSB7XHJcblx0XHRcdFx0c2V0dGluZ3MuY3JlYXRlLmJpbmQodGhpcykoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxufSkoalF1ZXJ5KTtcclxuIl19
