// ==UserScript==
// @name           MAL Message Autosave
// @version        1.0.0
// @namespace      http://sedmelluq.com
// @description    Saves unsent messages.
// @license        Public Domain; http://creativecommons.org/publicdomain/zero/1.0/
// @include        http://myanimelist.net/forum/*
// @grant          none
// ==/UserScript==
// ==UserScript==

/* global $ */
/* jshint unused:true */

(function() {
	"use strict";
	
	var x$ = null;
	
	function MalAutosave() {
		this.lastSaveTime = 0;
		this.triggeredSave = null;
		this.initTime = this.currentTime();
		this.postCache = null;
		this.depCount = 0;
		this.currentUser = null;
		this.topicId = null;
	}

	MalAutosave.prototype.loadScript = function(url, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		script.onload = callback;
		document.getElementsByTagName("head")[0].appendChild(script);
	};
	
	MalAutosave.prototype.safeAlert = function(text) {
		if("alert" in window && typeof window.alert === "function") {
			window.alert(text);
		}
		else if("console" in window && typeof window.console === "object") {
			window.console.log(text);
		}
	};
	
	MalAutosave.prototype.safeLog = function(text) {
		if("console" in window && typeof window.console === "object") {
			window.console.log(text);
		}
	};
	
	MalAutosave.prototype.getPageType = function() {
		var url = window.location.href;
		
		if(/\?board/i.test(url)) {
			return "board";
		}
		else if(/\?topicid/i.test(url)) {
			return "topic";
		}
	};
	
	MalAutosave.prototype.getCurrentUser = function() {
		var nameLink = x$("#nav a[href^=\"/profile/\"]");
		
		if(nameLink.length === 0) {
			return null;
		}
		
		var linkHref = nameLink.attr("href");
		var namePos = linkHref.lastIndexOf("/");
		
		return (namePos === -1) ? null : linkHref.substr(namePos + 1);
	};
	
	MalAutosave.prototype.getUrlParam = function(paramName) {
		return decodeURIComponent((new RegExp(paramName + "=" + "(.+?)(&|$)").exec(window.location.search) || [, ""])[1]);
	};
	
	MalAutosave.prototype.loadStorageItem = function(itemName) {
		var storageItem = localStorage.getItem(itemName);
		
		return (storageItem === null) ? null : JSON.parse(storageItem);
	};
	
	MalAutosave.prototype.saveStorageItem = function(itemName, data) {
		localStorage.setItem(itemName, JSON.stringify(data));
	};
	
	MalAutosave.prototype.clearStorageItem = function(itemName) {
		localStorage.removeItem(itemName);
	};
	
	MalAutosave.prototype.savePostCache = function() {
		this.saveStorageItem("malAutosavePostCache", this.postCache);
	};
	
	MalAutosave.prototype.loadPostCache = function() {
		this.postCache = this.loadStorageItem("malAutosavePostCache");
		
		if(this.postCache === null) {
			this.postCache = {};
			this.savePostCache();
		}
	};
	
	MalAutosave.prototype.currentTime = function() {
		return +new Date;
	};
	
	MalAutosave.prototype.filterPostCache = function() {
		var self = this;
		var now = self.currentTime();
		var changes = false;
		
		x$.each(self.postCache, function(topicId, posts) {
			x$.each(posts, function(stamp, data) {
				if(now - stamp > 3600000) {
					delete posts[stamp];
					changes = true;
				}
			});
			
			if(posts.length === 0) {
				delete self.postCache[topicId];
			}
		});
		
		if(changes) {
			self.savePostCache();
		}
	};
	
	MalAutosave.prototype.getSavedMessageInfoDiv = function() {
		var infoDiv = x$("#savedMessageInfo");
		
		if(infoDiv.length === 0) {
			infoDiv = x$("<div/>", {"id": "savedMessageInfo"});
			x$("#messageText").after(infoDiv);
		}
		
		return infoDiv;
	};
	
	MalAutosave.prototype.findCurrentTopicEntries = function() {
		var self = this;
		var cachedKeys = [];
		var cachedEntries = [];
		
		if(this.postCache.hasOwnProperty(this.topicId)) {
			x$.each(this.postCache[this.topicId], function (stamp, text) {
				var stampInt = parseInt(stamp, 10)
			
				if(stampInt !== self.initTime) {
					cachedKeys.push(stampInt);
				}
			});
		}
		
		cachedKeys.sort();
		
		for(var i = 0; i < cachedKeys.length; i++) {
			cachedEntries.push({"time": cachedKeys[i], "text": this.postCache[this.topicId][cachedKeys[i]]});
		}
		
		return cachedEntries;
	};
	
	MalAutosave.prototype.getSecondsSinceTime = function(stamp) {
		return Math.floor((this.currentTime() - stamp) / 1000);
	};
	
	MalAutosave.prototype.getTextFromStamp = function(stamp) {
		if(!this.postCache.hasOwnProperty(this.topicId)) {
			return null;
		}
		
		var topic = this.postCache[this.topicId];
		
		if(!topic.hasOwnProperty(stamp)) {
			return null;
		}
		
		return topic[stamp];
	};
	
	MalAutosave.prototype.writeMessageBoxText = function(text) {
		x$("#messageText").val(text);
	};
	
	MalAutosave.prototype.readMessageBoxText = function() {
		return x$("#messageText").val();
	};
	
	MalAutosave.prototype.restoreFromStamp = function(stamp) {
		var text = this.getTextFromStamp(stamp);
		
		if(text === null) return false;
		
		this.saveCurrentMessage();
		this.initTime = stamp;
		this.writeMessageBoxText(text);
		this.showSavedMessageInfo();
		
		return false;
	};
	
	MalAutosave.prototype.createRestoreLink = function(entry) {
		var self = this;
		var link = x$("<a />", {"href": "#", "color": "#c50002"});
		link.data("stamp", entry["time"]);
		link.click( function() { return self.restoreFromStamp(x$(this).data("stamp")); });
		link.html("[" + this.getSecondsSinceTime(entry["time"]) + " seconds ago, " + entry["text"].length + " characters] ");
		return link;
	};
	
	MalAutosave.prototype.deleteCurrentTopicEntries = function() {
		this.loadPostCache();
		
		if(this.postCache.hasOwnProperty(this.topicId)) {
			delete this.postCache[this.topicId];
		}
		
		this.savePostCache();
		this.showSavedMessageInfo();
		
		return false;
	};
	
	MalAutosave.prototype.createDeleteLink = function() {
		var self = this;
		var link = x$("<a />", {"href": "#", "color": "#c50002"});
		link.click( function() { return self.deleteCurrentTopicEntries(); });
		link.html("[Delete all] ");
		return link;
	};
	
	MalAutosave.prototype.showSavedMessageInfo = function() {
		var self = this;
		var infoDiv = this.getSavedMessageInfoDiv();
		var entries = this.findCurrentTopicEntries();
		
		infoDiv.html("");
		
		x$.each(entries, function(index, entry) {
			infoDiv.append(self.createRestoreLink(entry));
			infoDiv.append("<br />");
		});
		
		if(entries.length > 0) {
			infoDiv.append(self.createDeleteLink());
		}
	};
	
	MalAutosave.prototype.clearSaveTrigger = function() {
		if(this.triggeredSave !== null) {
			clearTimeout(this.triggeredSave);
			this.triggeredSave = null;
		}
	};
	
	MalAutosave.prototype.createSaveTrigger = function(time) {
		var self = this;
		this.clearSaveTrigger();
		
		setTimeout( function() { self.saveCurrentMessage(); }, time);
	};
	
	MalAutosave.prototype.saveCurrentMessage = function() {
		this.clearSaveTrigger();
		this.loadPostCache();
		
		var text = this.readMessageBoxText();
		
		if(text.length > 10) {
			if(!this.postCache.hasOwnProperty(this.topicId)) {
				this.postCache[this.topicId] = {};
			}
		
			this.postCache[this.topicId][this.initTime] = text;
			this.savePostCache();
			
			//this.safeLog("Message saved at " + (new Date().toLocaleTimeString()) + ".");
		}
		else if(text.length === 0 && this.getTextFromStamp() !== null) {
			delete this.postCache[this.topicId][this.initTime];
			
			if(this.postCache[this.topicId].length === 0) {
				delete this.postCache[this.topicId];
			}
			
			//this.safeLog("Erased saved post at " + (new Date().toLocaleTimeString()) + ".");
		}
		else {
			//this.safeLog("No need to save, text not long enough, at " + (new Date().toLocaleTimeString()) + ".");
		}
		
		this.lastSaveTime = this.currentTime();
	};
	
	MalAutosave.prototype.messageChanged = function() {
		if(this.currentTime() > this.lastSaveTime + 3000) {
			this.saveCurrentMessage();
		}
		else {
			this.createSaveTrigger(500);
		}
	};
	
	MalAutosave.prototype.setupSaveEvents = function() {
		var self = this;
		
		x$("#messageText").on("input", function() {
			self.messageChanged();
		});
	};
	
	MalAutosave.prototype.initForTopic = function() {
		this.topicId = this.getUrlParam("topicid");
		this.loadPostCache();
		this.filterPostCache();
		this.showSavedMessageInfo();
		this.setupSaveEvents();
	};
	
	MalAutosave.prototype.init = function() {
		this.pageType = this.getPageType();
		this.currentUser = this.getCurrentUser();
		
		if(this.currentUser !== null) {
			if(this.pageType === "topic") {
				this.initForTopic();
			}
		}
		else {
			console.log("Not logged in.");
		}
	};
	
	MalAutosave.prototype.loadCallback = function() {
		var self = this;
		this.depCount++;
		
		if(this.depCount === 2) {
			x$(document).ready( function() { self.init(); } );
		}
	};
	
	MalAutosave.prototype.preinit = function() {
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
	
	var malAutosave = new MalAutosave();
	malAutosave.preinit();
	
})();
