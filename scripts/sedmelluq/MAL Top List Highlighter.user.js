// ==UserScript==
// @name           MAL Top List Highlighter
// @version        1.6.1
// @namespace      http://sedmelluq.com
// @description    Highlights already seen shows based on the last viewed anime/manga list, automatically appends pages when scrolled to top list end.
// @license        Public Domain; http://creativecommons.org/publicdomain/zero/1.0/
// @include        http://myanimelist.net/topanime.php*
// @include        http://myanimelist.net/animelist/*
// @include        http://myanimelist.net/anime.php*
// @include        http://myanimelist.net/topmanga.php*
// @include        http://myanimelist.net/mangalist/*
// @include        http://myanimelist.net/manga.php*
// @grant          none
// ==/UserScript==

/* global $ */

(function() {
	"use strict";
	
	var x$ = null;
	
	function MalMarker() {
		this.seenList = { anime: null, manga: null };
		this.medium = null;
		this.depCount = 0;
		this.prevPageLast = null;
		this.lastElement = null;
		this.listIndex = null;
		this.listType = null;
		this.pageLoading = true;
		this.settings = null;
		this.loadingList = false;
		this.pageType = null;
		this.endReached = false;
		this.elementsPerPage = 50;
		this.seenStatusText = {
			anime : ["Unknown", "Currently watching", "Completed", "On hold", "Dropped", "Planning to watch"],
			manga : ["Unknown", "Currently reading", "Completed", "On hold", "Dropped", "Planning to read"]
		};
	}

	MalMarker.prototype.loadScript = function(url, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		script.onload = callback;
		document.getElementsByTagName("head")[0].appendChild(script);
	};
	
	MalMarker.prototype.loadCSS = function() {
		x$(
			"<style>" +
			"	.x2 { background: #cccccc !important; }" + 
			"	.x1 { background: #e5e5e5 !important; }" + 
			"	.msRating { width: 250px; float: right; }" +
			"	.hiddenLine { display: none; }" +
			"</style>"
		).appendTo("head");
	};
	
	MalMarker.prototype.safeAlert = function(text) {
		if("alert" in window && typeof window.alert === "function") {
			window.alert(text);
		}
		else if("console" in window && typeof window.console === "object") {
			window.console.log(text);
		}
	};
	
	MalMarker.prototype.resetUserList = function(medium) {
		this.seenList[medium] = {};
	};
	
	MalMarker.prototype.dummyRatingElement = {text : function() { return "-"; }};
	
	MalMarker.prototype.getUserListLineItemId = function (element, medium) {
		var linkElement = x$(element).find("a.animetitle");

		if (linkElement.length < 1) {
			return null;
		}

		var match = linkElement.attr("href").match(medium === "anime" ? /.*\/anime\/([\d]+)\/.*/ : /.*\/manga\/([\d]+)\/.*/);

		if (match === null) {
			return null;
		}

		var itemId = parseInt(match[1], 10);

		if(isNaN(itemId)) {
			return null;
		}

		return itemId;
	};
	
	MalMarker.prototype.getUserListLineItemRating = function (element) {
		var ratingElement = x$(element).find("span[id^=\"scoreval\"]");
		
		if(ratingElement.length < 1) {
			if(ratingColumn === null) {
				ratingElement = this.dummyRatingElement;
			}
			else {
				ratingElement = x$(element).find("td:nth-of-type(" + (ratingColumn+1) + ")");
			}
		}
		
		var itemRating = parseInt(ratingElement.text(), 10);
		
		if(isNaN(itemRating)) {
			itemRating = -1;
		}
		
		return itemRating;
	};
	
	MalMarker.prototype.addLineToLists = function(element, itemStatus, ratingColumn) {
		var self = this;
		
		var itemId = self.getUserListLineItemId(element, self.medium);
		
		if(itemId === null) {
			return;
		}
		
		var itemRating = self.getUserListLineItemRating(element);
		
		self.seenList[self.medium][itemId] = {status : itemStatus, rating : itemRating};
	};
	
	MalMarker.prototype.findColumnIdByName = function(element, columnName) {
		var columnIndex = null;
	
		x$(element).find("td").each( function(index) {
			var scoreLink = x$(this).find(".table_headerLink");
			
			if(scoreLink.length > 0 && x$(scoreLink[0]).text() === columnName) {
				columnIndex = index;
				return false;
			}
		});
		
		return columnIndex;
	};
	
	MalMarker.prototype.collectRatingsFromElement = function(element) {
		var self = this;
		self.resetUserList(self.medium);
		
		var currentStatus = null;
		var ratingColumn = null;
	
		x$(element).find("#list_surround > table").each( function() {
			if(this.className !== "") {
				currentStatus = ["header_cw", "header_completed", "header_onhold", "header_dropped", "header_ptw"].indexOf(this.className) + 1;
				
				if(currentStatus < 1) {
					return false;
				}
				
				ratingColumn = -1;
			}
			else if(currentStatus !== null) {
				if(ratingColumn === -1) {
					ratingColumn = self.findColumnIdByName(this, "Score");
				}
				else {
					self.addLineToLists(this, currentStatus, ratingColumn);
				}
			}
		} );
	};
	
	MalMarker.prototype.markOneLine = function(element, info) {
		var self = this;
		
		x$(element).removeClass("x1 x2 x3 x4 x5").addClass("x" + info.status);
		x$(element).children("td").removeClass("x1 x2 x3 x4 x5").addClass("x" + info.status);
		
		var statusText = "";
		
		if(self.seenList[self.medium] === null) {
			statusText += "Seen";
		}
		else {
			statusText += self.seenStatusText[self.medium][info.status];
		}
		
		if(self.settings.skipCompleted && info.status === 2) {
			x$(element).css("display", "none");
		}
		
		if(info.rating >= 0) {
			statusText += "<br />Rated " + info.rating;
		}
		
		x$(element).find(".spaceit_pad").prepend("<div class=\"msRating\">" + statusText + "</div>");
	};
	
	MalMarker.prototype.getSeenInfo = function(element, itemId) {
		var self = this;
	
		if(isNaN(itemId)) {
			return null;
		}
		else if(self.seenList[self.medium] !== null) {
			if(self.seenList[self.medium].hasOwnProperty(itemId)) {
				return self.seenList[self.medium][itemId];
			}
		}
		else if(x$(element).find(".button_edit").length > 0) {
			return {status : 2, rating : -1};
		}
		
		return null;
	};
	
	MalMarker.prototype.getViewCount = function(element, itemId) {
		var thirdCell = element.children("td:nth-of-type(3)");
		if(thirdCell.length === 0) return null;
		
		var spaceDiv = thirdCell.children(".spaceit_pad");
		if(spaceDiv.length === 0) return null;
		
		var lightLink = spaceDiv.children(".lightLink");
		if(lightLink.length === 0) return null;
		
		var text = lightLink.text().replace(",", "");
		var textParts = text.split(" ");
		if(textParts.length < 2) return null;
		
		var viewCount = parseInt(textParts[0], 10);
		if(isNaN(viewCount)) return null;
		
		return viewCount;
	};
	
	MalMarker.prototype.markAreaElementList = function(elements) {
		var self = this;
		
		if(!self.settings.useLists) {
			return false;
		}
	
		self.prevPageLast = self.lastElement;
	
		elements.each( function() {
			var itemId = parseInt(this.id.substr(4), 10);
			var element = x$(this).parents().eq(1);
			var seenInfo = self.getSeenInfo(element, itemId);
			
			if(seenInfo !== null) {
				self.markOneLine(element, seenInfo);
			}
			
			self.lastElement = this;
		});
		
		if(self.prevPageLast === null) {
			self.prevPageLast = self.lastElement;
		}
	};
	
	MalMarker.prototype.clearListTweaks = function() {
		x$(".x2").css("display", "");
		x$(".x1, .x2, .x3, .x4, .hiddenLine").removeClass("x1 x2 x3 x4 hiddenLine");
		x$(".msRating").remove();
	};
	
	MalMarker.prototype.markFirstPage = function() {
		var self = this;
	
		self.markAreaElementList(x$("div[id^=area]"));
		
		self.pageLoading = false;
	};
	
	MalMarker.prototype.findSearchResultLines = function() {
		var self = this;
		var result = null;
		
		x$("table").each( function(index, element) {
			var firstCell = x$(element).find("tr:first-of-type td:first-of-type");
			
			if (firstCell.text().indexOf("Search Results") !== -1) {
				result = x$(element).find("tr:not(:first-child)");
				return false;
			}
		});
		
		return result;
	};
	
	MalMarker.prototype.markSearchResults = function() {
		var self = this;
		
		if(!self.settings.useLists) {
			return;
		}
		
		var lines = self.findSearchResultLines();
		if (lines !== null) {
			lines.each( function(index, element) {
				var itemId = parseInt($(element).find(".picSurround a").attr("id").substr(6), 10);
				var seenInfo = self.getSeenInfo(element, itemId);
			
				if(seenInfo !== null) {
					self.markOneLine(element, seenInfo);
				}
			});
		}
	};
	
	MalMarker.prototype.loadPageType = function() {
		var self = this;
		var url = window.location.href;
		
		if(/animelist\/[^&]/i.test(url)) {
			self.pageType = "userlist";
			self.medium = "anime";
		}
		else if(/topanime\.php/i.test(url)) {
			self.pageType = "toplist";
			self.medium = "anime";
		}
		else if(/\/anime\.php/i.test(url)) {
			self.pageType = "search";
			self.medium = "anime";
		}
		else if(/mangalist\/[^&]/i.test(url)) {
			self.pageType = "userlist";
			self.medium = "manga";
		}
		else if(/topmanga\.php/i.test(url)) {
			self.pageType = "toplist";
			self.medium = "manga";
		}
		else if(/\/manga\.php/i.test(url)) {
			self.pageType = "search";
			self.medium = "manga";
		}
	};
	
	MalMarker.prototype.getCurrentUser = function() {
		var self = this;
	
		if(self.pageType === "userlist") {
			var nameElement = x$("#mal_cs_listinfo a > strong");
			
			return (nameElement.length === 0) ? null : nameElement.text();
		}
		else if(self.pageType === "toplist") {
			var nameLink = x$("#nav a[href^=\"/profile/\"]");
			
			if(nameLink.length === 0) {
				return null;
			}
			
			var linkHref = nameLink.attr("href");
			var namePos = linkHref.lastIndexOf("/");
			
			return (namePos === -1) ? null : linkHref.substr(namePos + 1);
		}
		
		return null;
	};
	
	MalMarker.prototype.getCurrentListOwner = function() {
		var namePos = window.location.pathname.lastIndexOf("/");
		
		if(namePos === -1) {
			return null;
		}
		
		var endPart = window.location.pathname.substr(namePos + 1);
		var andPos = endPart.indexOf("&");
		
		return (andPos === -1) ? endPart : endPart.substr(0, andPos);
	};
	
	MalMarker.prototype.isCurrentUserList = function() {
		return this.getCurrentListOwner() === this.getCurrentUser();
	};
	
	MalMarker.prototype.checkLineAgainstFilter = function(element, filterParts, typeColumn) {
		var typeElement = x$(element).find("td:nth-of-type(" + (typeColumn+1) + ")");
		
		if(typeElement.length === 0) {
			return;
		}
		
		var typeName = typeElement.text();
		
		if(filterParts.indexOf(typeName) === -1) {
			x$(element).addClass("hiddenLine");
		}
	};
	
	MalMarker.prototype.saveRatings = function(medium) {
		localStorage.setItem(medium === "anime" ? "malMarkerSeenList" : "malMarkerMangaSeenList", JSON.stringify(this.seenList[medium]));
	};
	
	MalMarker.prototype.initForUserList = function() {
		var self = this;
		
		self.loadSettings();
		self.loadCSS();
		
		var currentUser = self.getCurrentUser();
		
		if(self.settings.useLists) {
			if(self.settings.switchLists || currentUser === null || self.getCurrentListOwner() === currentUser) {
				self.settings.lastUpdate = (new Date()).getTime();
				self.settings.listOwner = self.getCurrentListOwner();
				
				self.collectRatingsFromElement(document);
				self.saveRatings(self.medium);
				self.saveSettings();
			}
		}
	};
	
	MalMarker.prototype.loadUserList = function(username) {
		var self = this;
		
		if(self.loadingList) {
			return;
		}
		
		self.loadingList = true;
		
		var listLink = "/" + self.medium + "list/" + username + "&status=7&order=0";
		
		x$.ajax(listLink, {dataType: "text", timeout: 5000}).done( function(data) {
			self.settings.lastUpdate = (new Date()).getTime();
			self.settings.listOwner = username;
			
			var dom = self.domFromFullHtml(data);
			self.collectRatingsFromElement(dom);
			
			self.saveRatings();
			self.saveSettings();
			
			self.clearListTweaks();
			self.markFirstPage();
			
			self.loadingList = false;
		}).fail( function() {
			self.loadingList = false;
			
			self.safeAlert("Failed to update list.");
		});
	};
	
	MalMarker.prototype.loadRatings = function(medium) {
		this.seenList[medium] = this.loadStorageItem(medium === "anime" ? "malMarkerSeenList" : "malMarkerMangaSeenList");
	};
	
	MalMarker.prototype.getUrlParam = function(paramName) {
		return decodeURIComponent((new RegExp(paramName + "=" + "(.+?)(&|$)").exec(window.location.search) || [, ""])[1]);
	};
	
	MalMarker.prototype.getNextPageUrl = function() {
		var self = this;
		
		if(self.listIndex === null) {
			self.listIndex = parseInt(self.getUrlParam("limit"), 10);
			
			if(isNaN(self.listIndex)) {
				self.listIndex = 0;
			}
			
			self.listIndex += self.elementsPerPage;
			self.listType = self.getUrlParam("type");
		}
		
		return "/top" + self.medium + ".php?type=" + self.listType + "&limit=" + self.listIndex;
	};
	
	MalMarker.prototype.domFromFullHtml = function(html) {
		return x$("<div id=\"fakebody\">" + html.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, "") + "</div>");
	};
	
	MalMarker.prototype.loadNextTopPage = function() {
		var self = this;
		
		if(self.endReached) {
			return;
		}
		
		var url = self.getNextPageUrl();
		
		self.pageLoading = true;
		
		x$.ajax(url, {dataType: "text", timeout: 5000}).done( function(data) {
			var dom = self.domFromFullHtml(data);
			
			self.markAreaElementList(dom.find("div[id^=area]"));
			
			var domLines = dom.find("#content > div:nth-of-type(3) > table > tbody > tr");
			
			if(domLines.length === 0) {
				self.endReached = true;
			}
			
			x$("#content > div:nth-of-type(3) > table > tbody").append( domLines );
			
			self.listIndex += self.elementsPerPage;
			self.pageLoading = false;
			
			setTimeout(self.checkScroll, 500);
		}).fail( function() {
			self.safeAlert("Failed to fetch next page.");
			
			self.pageLoading = false;
			
			setTimeout(self.checkScroll, 500);
		});
	};
	
	MalMarker.prototype.checkScroll = function() {
		var self = this;
		
		if(!self.settings.autoPaging) {
			return;
		}
	
		var windowEndPos = x$(window).height() + x$(window).scrollTop();
	
		if(!self.pageLoading && self.prevPageLast !== null && x$(self.prevPageLast).offset().top < windowEndPos) {
			self.loadNextTopPage();
		}
	};
	
	MalMarker.prototype.setupPaging = function() {
		var self = this;
		
		x$(window).scroll( function () {
			self.checkScroll();
		});
	};
	
	MalMarker.prototype.saveSettings = function() {
		localStorage.setItem("malMarkerSettings", JSON.stringify(this.settings));
		
		this.settingsUpdated();
	};
	
	MalMarker.prototype.appendWrappedLink = function(element, text, callback) {
		element.append(" (");
		
		var linkElement = x$("<a>");
		linkElement.attr("href", "#");
		
		linkElement.click( function () {
			callback();
			return false;
		});
		
		linkElement.html(text);
		
		element.append(linkElement);
		element.append(")");
	};
	
	MalMarker.prototype.getMinutesSince = function(stamp) {
		return Math.floor(((new Date()).getTime() - stamp) / 60000);
	};
	
	MalMarker.prototype.createBooleanSettingHtml = function (element, name, currentValue, onEnable, onDisable) {
		var self = this;
		
		element.append(name + " " + (currentValue ? "enabled" : "disabled"));
		
		self.appendWrappedLink(element, currentValue ? "disable" : "enable", function() {
			if (currentValue) {
				onDisable();
			}
			else {
				onEnable;
			}
			
			self.saveSettings();
		});
		
		element.append(". ");
	};
	
	MalMarker.prototype.buildSettingsHtml = function (element) {
		var self = this;
		var currentUser = self.getCurrentUser();
		
		element.html("");
		
		self.createBooleanSettingHtml(element, "Lists", self.settings.useLists, function () {
			self.settings.useLists = true;
			self.markFirstPage();
		}, function() {
			self.settings.useLists = false;
			self.clearListTweaks();
		});
		
		if(self.settings.useLists) {
			if(self.seenList[self.medium] === null) {
				element.append("No " + self.medium + " list loaded");
				
				if(currentUser !== null) {
					self.appendWrappedLink(element, "use your list", function() { 
						self.loadUserList(currentUser);
						return false;
					});
				}
				
				element.append(". ");
			}
			else if(self.settings.listOwner !== null) {
				if(self.settings.listOwner === currentUser) {
					element.append("Your " + self.medium + " list loaded");
				}
				else {
					element.append("Using " + self.medium + " list of " + self.settings.listOwner);
					
					if(currentUser !== null) {
						self.appendWrappedLink(element, "use your list", function() { 
							self.loadUserList(currentUser);
							return false;
						});
					}
				}
				
				element.append(", last updated " + self.getMinutesSince(self.settings.lastUpdate) + " minutes ago");
				
				self.appendWrappedLink(element, "update", function() { 
					self.loadUserList(self.settings.listOwner);
					return false;
				});
				
				element.append(". ");
			}
			
			self.createBooleanSettingHtml(element, "Skip-completed", self.settings.skipCompleted, function () {
				self.settings.skipCompleted = true;
				x$(".x2").css("display", "none");
			}, function() {
				self.settings.skipCompleted = false;
				x$(".x2").css("display", "");
			});
			
			self.createBooleanSettingHtml(element, "List switching", self.settings.switchLists, function () {
				self.settings.switchLists = true;
				x$(".x2").css("display", "none");
			}, function() {
				self.settings.switchLists = false;
				x$(".x2").css("display", "");
			});
		}
		
		self.createBooleanSettingHtml(element, "Page autoloading", self.settings.autoPaging, function () {
			self.settings.autoPaging = true;
		}, function() {
			self.settings.autoPaging = false;
		});
	};
	
	MalMarker.prototype.settingsUpdated = function() {
		var self = this;
	
		if(self.pageType === "toplist") {
			var settingsInfoElem = x$("#malMarkerSettings");
			
			if(settingsInfoElem.length === 0) {
				settingsInfoElem = x$(document.createElement("div"));
				settingsInfoElem.attr("id", "malMarkerSettings");
				settingsInfoElem.css("margin-bottom", "15px");
				
				x$("#content > div:nth-of-type(2)").prepend(settingsInfoElem);
			}
			
			self.buildSettingsHtml(settingsInfoElem);
		}
	};
	
	MalMarker.prototype.loadStorageItem = function(itemName) {
		var storageItem = localStorage.getItem(itemName);
		
		return (storageItem === null) ? null : JSON.parse(storageItem);
	};
	
	MalMarker.prototype.clearStorageItem = function(itemName) {
		localStorage.removeItem(itemName);
	};
	
	MalMarker.prototype.loadSettings = function() {
		var self = this;
		
		if(window.location.hash === "#mthclear") {
			self.clearStorageItem("malMarkerSettings");
			self.clearStorageItem("malMarkerSeenList");
			self.clearStorageItem("malMarkerMangaSeenList");
			
			self.seenList = { anime: null, manga: null };
			window.location.hash = "";
		}
	
		self.settings = self.loadStorageItem("malMarkerSettings");
		
		if(self.settings === null) {
			self.settings = {};
			self.settings.useLists = true;
			self.settings.lastUpdate = (new Date()).getTime();
			self.settings.listOwner = null;
			self.settings.switchLists = true;
			self.settings.autoPaging = true;
			self.settings.skipCompleted = false;
			self.saveSettings();
		}
		else {
			self.settingsUpdated();
		}
	};
	
	MalMarker.prototype.initForTopList = function() {
		var self = this;
		
		self.loadRatings(self.medium);
		self.loadSettings();
		self.setupPaging();
		self.loadCSS();
		self.markFirstPage();
		
		setTimeout(self.checkScroll, 500);
	};
	
	MalMarker.prototype.initForSearchResults = function() {
		var self = this;
		
		self.loadRatings(self.medium);
		self.loadSettings();
		self.loadCSS();
		self.markSearchResults();
	};
	
	MalMarker.prototype.init = function() {
		var self = this;
		
		self.loadPageType();
		
		if(self.pageType === "userlist") {
			self.initForUserList();
		}
		else if(self.pageType === "toplist") {
			self.initForTopList();
		}
		else if(self.pageType === "search") {
			self.initForSearchResults();
		}
	};
	
	MalMarker.prototype.loadCallback = function() {
		var self = this;
		
		self.depCount++;
		
		if(self.depCount === 2) {
			x$(document).ready( function() {
				self.init();
			});
		}
	};
	
	MalMarker.prototype.preinit = function() {
		var self = this;
		
		if(x$ === null) {
			self.loadScript("//cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js", function() {
				self.loadCallback();
			});
			
			self.loadScript("//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js", function() {
				x$ = $.noConflict(true);
				self.loadCallback();
			});
		}
		else {
			x$(document).ready( function() { self.init(); } );
		}
	};
	
	var malMarker = new MalMarker();
	malMarker.preinit();
	
})();
