// ==UserScript==
// @name           MAL Forum Stalker
// @version        1.2.0
// @namespace      http://sedmelluq.com
// @description    Background color of posts in forum depends on the poster's gender
// @license        Public Domain; http://creativecommons.org/publicdomain/zero/1.0/
// @include        http://myanimelist.net/forum/*
// @grant          none
// ==/UserScript==

/* global $ */
/* jshint unused:true */

(function() {
	"use strict";
	
	var x$ = null;
	
	function MalStalker(maleColour, femaleColour, unspecifiedColour, deletedColour) {
		this.userCache = null;
		this.requestMap = {};
		this.requestList = null;
		this.requestListProgress = null;
		this.depCount = 0;
		this.genderColours = { "Male" : maleColour, "Female" : femaleColour, "Not specified" : unspecifiedColour, "Deleted" : deletedColour};
	}

	MalStalker.prototype.loadScript = function(url, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		script.onload = callback;
		document.getElementsByTagName("head")[0].appendChild(script);
	};
	
	MalStalker.prototype.safeAlert = function(text) {
		if("alert" in window && typeof window.alert === "function") {
			window.alert(text);
		}
		else if("console" in window && typeof window.console === "object") {
			window.console.log(text);
		}
	};
	
	MalStalker.prototype.safeLog = function(text) {
		if("console" in window && typeof window.console === "object") {
			window.console.log(text);
		}
	};
	
	MalStalker.prototype.getPageType = function() {
		var url = window.location.href;
		
		if(/\?board/i.test(url)) {
			return "board";
		}
		else if(/\?topicid/i.test(url)) {
			return "topic";
		}
	};
	
	MalStalker.prototype.domFromFullHtml = function(html) {
		return x$("<div id=\"fakebody\">" + html.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, "") + "</div>");
	};
	
	MalStalker.prototype.loadStorageItem = function(itemName) {
		var storageItem = localStorage.getItem(itemName);
		
		return (storageItem === null) ? null : JSON.parse(storageItem);
	};
	
	MalStalker.prototype.saveStorageItem = function(itemName, data) {
		localStorage.setItem(itemName, JSON.stringify(data));
	};
	
	MalStalker.prototype.clearStorageItem = function(itemName) {
		localStorage.removeItem(itemName);
	};
	
	MalStalker.prototype.saveUserCache = function() {
		this.saveStorageItem("malStalkerCache", this.userCache);
	};
	
	MalStalker.prototype.loadUserCache = function() {
		if(window.location.hash === "#refreshstalker") {
			this.clearStorageItem("malStalkerCache");
			window.location.hash = "";
		}
	
		this.userCache = this.loadStorageItem("malStalkerCache");
		
		if(this.userCache === null) {
			this.userCache = {};
			this.saveUserCache();
		}
	};
	
	MalStalker.prototype.createSortedRequestList = function() {
		this.requestList = [];
		
		for(var request in this.requestMap) {
			if(this.requestMap.hasOwnProperty(request)) {
				this.requestList.push(this.requestMap[request]);
			}
		}
		
		this.requestList.sort( function(a, b) {
			return b.elements.length - a.elements.length;
		});
		
		this.requestMap = null;
		this.requestListProgress = 0;
	};
	
	MalStalker.prototype.userLoadFinished = function(success, userMissing) {
		var targetRequest = this.requestList[this.requestListProgress];
		
		if((success || userMissing) && this.userCache.hasOwnProperty(targetRequest.name)) {
			var userData = this.userCache[targetRequest.name];
			
			for(var i = 0; i < targetRequest.elements.length; i++) {
				this.processElement(userData, targetRequest.elements[i]);
			}
			
			if (userMissing) {
				this.safeLog("User " + targetRequest.name + " does not exist.");
			}
		}
		else {
			this.safeLog("Failed to load data for user " + targetRequest.name + ".");
		}
		
		this.requestList[this.requestListProgress] = null;		
		this.requestListProgress++;
		this.scheduleDataLoader();
	};
	
	MalStalker.prototype.recordUserData = function(username, gender, compatibilityHtml) {
		this.loadUserCache();
		this.userCache[username] = { name: username, gender: gender, compatibilityHtml: compatibilityHtml };
		this.saveUserCache();
	};
	
	MalStalker.prototype.findGenderFromProfile = function(dom) {
		var gender = "Not specified";
	
		x$(dom).find(".clearfix .user-status-title").each( function(index, element) {
			if(x$(element).text() === "Gender") {
				gender = x$(element).next().text();
			}
		});
		
		return gender;
	};
	
	MalStalker.prototype.findCompatibilityHtmlFromProfile = function(dom) {
		var block = x$(dom).find(".bar-outer.anime");
		if (block.length === 0) {
			return null;
		}
		return x$(block[0]).prop("outerHTML");
	};
	
	MalStalker.prototype.loadNextUser = function() {
		var self = this;
		var targetRequest = this.requestList[this.requestListProgress];
	
		this.loadUserCache();
		
		if(this.userCache.hasOwnProperty(targetRequest.name)) {
			this.userLoadFinished(true, false);
		}
		else {
			var profileLink = "/profile/" + targetRequest.name;
			
			x$.ajax(profileLink, {dataType: "text", timeout: 5000}).done( function(data) {
				var dom = self.domFromFullHtml(data);
				var gender = self.findGenderFromProfile(dom);
				var compatibilityHtml = self.findCompatibilityHtmlFromProfile(dom);
				
				if(gender !== null) {
					self.recordUserData(targetRequest.name, gender, compatibilityHtml);
					self.userLoadFinished(true, false);
				}
				else {
					self.userLoadFinished(false, false);
				}
			}).fail( function(response) {
				if (response.status == 404) {
					self.recordUserData(targetRequest.name, "Deleted", null);
					self.userLoadFinished(false, true);
				}
				else {
					self.userLoadFinished(false, false);
				}
			});
		}
	};
	
	MalStalker.prototype.scheduleDataLoader = function() {
		var self = this;
	
		if(this.requestListProgress < this.requestList.length) {
			setTimeout( function() { self.loadNextUser(); }, 2000 );
		}
	};
	
	MalStalker.prototype.addToRequestedList = function(username, element) {
		if(username.trim().length === 0) {
			
		}
		else if(this.requestMap.hasOwnProperty(username)) {
			this.requestMap[username].elements.push(element);
		}
		else {
			this.requestMap[username] = { name: username, elements: [element] };
		}
	};
	
	MalStalker.prototype.processGenderForElement = function(user, element) {
		var self = this;
		
		if(user.gender === null) {
			return;
		}
		
		var colour = self.genderColours[user.gender];
		
		element.css("background-color", colour);
	};
	
	MalStalker.prototype.findPostHeaderFromElement = function(element) {
		if (element.prop("tagName") !== "TD") {
			return null;
		}
		
		var header = element.closest(".forum_topic_message").closest(".forum_border_around").children(".forum_category");
		if (header.length === 0) {
			return null;
		}
		
		return header;
	};
	
	MalStalker.prototype.processCompatibilityForElement = function(user, element) {
		var self = this;
		
		var header = self.findPostHeaderFromElement(element);
		if (header === null || user.compatibilityHtml === null) {
			return;
		}
		
		header.css("width", "auto");
		header.addClass("user-profile");
		
		var dateItem = header.find(".date");
		var graphElement = x$("<div/>", {
			"class": "user-compatability-graph",
			"css": {
				"width": "220px",
				"float": "right",
				"position": "relative",
				"top": "-4px"
			}
		});
		
		graphElement.html(user.compatibilityHtml);
		dateItem.before(graphElement);
	};
	
	MalStalker.prototype.processElement = function(user, element) {
		var self = this;
		
		self.processGenderForElement(user, element);
		self.processCompatibilityForElement(user, element);
	};
	
	MalStalker.prototype.recordElement = function(username, element) {
		if(this.userCache.hasOwnProperty(username)) {
			this.processElement(this.userCache[username], element);
		}
		else {
			this.addToRequestedList(username, element);
		}
	};
	
	MalStalker.prototype.initForBoard = function() {
		var self = this;
		
		x$.each(x$("table .forum_postusername a"), function (index, element) {
			self.recordElement(x$(element).text(), x$(element).closest("td"));
		});
	};
	
	MalStalker.prototype.initForTopic = function() {
		var self = this;
		
		x$.each(x$(".forum_border_around tr:nth-of-type(1) .forum_boardrow2 strong"), function (index, element) {
			self.recordElement(x$(element).text(), x$(element).closest("td"));
		});
		
		x$.each(x$(".quotetext > strong"), function (index, element) {
			self.recordElement(x$(element).text().slice(0, -6), x$(element).closest("div"));
		});
	};
	
	MalStalker.prototype.init = function() {
		this.pageType = this.getPageType();
		this.loadUserCache();
		
		if(this.pageType === "board") {
			this.initForBoard();
		}
		else if(this.pageType === "topic") {
			this.initForTopic();
		}
		
		this.createSortedRequestList();
		this.scheduleDataLoader();
	};
	
	MalStalker.prototype.loadCallback = function() {
		var self = this;
		this.depCount++;
		
		if(this.depCount === 2) {
			x$(document).ready( function() { self.init(); } );
		}
	};
	
	MalStalker.prototype.preinit = function() {
		var self = this;
		
		if(x$ === null) {
			self.loadScript("//cdnjs.cloudflare.com/ajax/libs/json3/3.3.0/json3.min.js", function() {
				self.loadCallback();
			});
			
			self.loadScript("//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js", function() {
				x$ = $.noConflict(true);
				self.loadCallback();
			});
		}
		else {
			x$(document).ready( function() { self.init(); } );
		}
	};
	
	var malStalker = new MalStalker("#dde6f6", "#f6ddf6", "#e8e8e8", "#d8e8d8");
	malStalker.preinit();
	
})();
