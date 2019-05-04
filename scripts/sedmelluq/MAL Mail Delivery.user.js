// ==UserScript==
// @name           MAL Mail Delivery
// @version        1.0.0
// @namespace      http://sedmelluq.com
// @description    For sending a message to many users.
// @license        Public Domain; http://creativecommons.org/publicdomain/zero/1.0/
// @include        http://myanimelist.net/mymessages.php*
// @grant          none
// ==/UserScript==

/* global $ */

(function() {
	"use strict";
	
	var x$ = null;
	
	function MalDelivery() {
		var self = this;
		self.depCount = 0;
		self.userLists = [];
		self.deliveryHistory = [];
		self.activeDelivery = null;
		self.deliveryUserList = null;
		self.editedUserList = null;
		self.delivering = false;
		self.cancelling = false;
	}

	MalDelivery.prototype.loadScript = function(url, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		script.onload = callback;
		document.getElementsByTagName("head")[0].appendChild(script);
	};

	MalDelivery.prototype.loadStorageItem = function(itemName) {
		var storageItem = localStorage.getItem(itemName);
		
		return (storageItem === null) ? null : JSON.parse(storageItem);
	};
	
	MalDelivery.prototype.clearStorageItem = function(itemName) {
		localStorage.removeItem(itemName);
	};
	
	MalDelivery.prototype.loadAllData = function() {
		var self = this;
		self.userLists = self.loadStorageItem("malDeliveryUserLists") || [];
		self.deliveryHistory = self.loadStorageItem("malDeliveryHistory") || [];
		self.activeDelivery = self.loadStorageItem("malDeliveryActive");
	};
	
	MalDelivery.prototype.saveUserLists = function() {
		var self = this;
		localStorage.setItem("malDeliveryUserLists", JSON.stringify(self.userLists));
	};
	
	MalDelivery.prototype.saveActiveDelivery = function() {
		var self = this;
		localStorage.setItem("malDeliveryActive", JSON.stringify(self.activeDelivery));
	};
	
	MalDelivery.prototype.htmlClearDiv = function() {
		return x$("<div/>", {"css": {"clear": "both"}});
	};
	
	MalDelivery.prototype.htmlCreateMainBlocks = function(content) {
		var self = this;
		
		var wrappingForm = x$("<form/>", {"method": "post", "action": "#", "id": "delivery-wrapper-form"});
		content.append(wrappingForm);
		
		var leftBlock = x$("<div>", {"id": "delivery-left-block", "css": {"width": "500px", "float": "left", "margin-right": "20px"}});
		wrappingForm.append(leftBlock);
		
		leftBlock.append(x$("<div/>", {"id": "delivery-current-block"}));
		leftBlock.append(x$("<div/>", {"id": "delivery-history-block"}));
		
		var rightBlock = x$("<div/>", {"id": "delivery-right-block", "css": {"width": "500px", "float": "left"}});
		wrappingForm.append(rightBlock);
		
		rightBlock.append(x$("<div/>", {"id": "delivery-userlist-edit-block"}));
		rightBlock.append(x$("<div/>", {"id": "delivery-userlist-block"}));
		
		wrappingForm.append(self.htmlClearDiv());
	};
	
	MalDelivery.prototype.resetMessage = function() {
		var self = this;
		
		self.deliveryUserList = null;
		x$("#delivery-message-box").val("");
		x$("#delivery-send-error").html("");
		
		self.htmlCreateDeliveryUserList();
	};
	
	MalDelivery.prototype.checkDeliveryCancelled = function() {
		var self = this;
		
		if (self.activeDelivery === null || self.delivering === false) {
			self.cancelling = false;
			self.htmlUpdateActiveDelivery();
			return true;
		}
		else if (self.activeDelivery.progress == self.activeDelivery.total) {
			self.delivering = false;
			self.cancelling = false;
			self.htmlUpdateActiveDelivery();
			return true;
		}
		
		return false;
	};
	
	MalDelivery.prototype.domFromFullHtml = function(html) {
		return x$("<div id=\"fakebody\">" + html.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, "") + "</div>");
	};
	
	MalDelivery.prototype.findUserIdFromProfile = function(dom) {
		var element = x$(dom).find("input[name=profileMemId]");
		if (element.length === 0) {
			return null;
		}
		
		return parseInt(element.val(), 10);
	};
	
	MalDelivery.prototype.findTokenFromProfile = function(text) {
		var start = "csrf_token' content='";
		var position = text.indexOf(start);
		
		if (position === -1) {
			return null;
		}
		
		var endPosition = text.indexOf("'", position + start.length);
		
		if (endPosition === -1) {
			return null;
		}
		
		return text.substring(position + start.length, endPosition);
	};
	
	MalDelivery.prototype.doDeliveryMessageStep = function(delivery, userName, userId, csrfToken) {
		var self = this;
		var deliveryLink = "http://myanimelist.net/addcomment.php";
		
		var sendData = {
			"commentText": delivery.message,
			"profileMemId": userId,
			"profileUsername": userName,
			"commentSubmit": "Submit Comment",
			"csrf_token": csrfToken
		};
		
		x$.ajax(deliveryLink, {method: "POST", data: sendData, dataType: "text", timeout: 5000}).done( function(data) {
			delivery.nextQueryTime = new Date().getTime() + 21000;
			
			if (data.length < 1000) {
				// We received a direct message, rather than redirect to profile
				if (data.trim() === "You can only post a comment every 20 seconds.") {
					console.log("Received a cooldown warning, waiting 25 seconds.");
					delivery.nextQueryTime = new Date().getTime() + 25000;
				}
				else {
					console.log("Unknown error from server, considering as failed message", data);
					
					delivery.failures[delivery.progress] = true;
					delivery.progress++;
				}
			}
			else {
				// Should be success, double checking
				var dom = self.domFromFullHtml(data);
				var userId = self.findUserIdFromProfile(dom);
				
				if (userId !== null) {
					// We were redirected to profile, all seems good
					delivery.progress++;
				}
				else {
					// Unknown error, treating as failed message
					console.log("Unexpected result when posting message, considering as failed message");
					
					delivery.failures[delivery.progress] = true;
					delivery.progress++;
				}
			}
			
			self.saveActiveDelivery();
			self.htmlUpdateActiveDelivery();
			self.scheduleDeliveryStep();
		}).fail( function(response) {
			console.log("Server error, retrying 60 seconds later", response);
			
			delivery.nextQueryTime = new Date().getTime() + 60000;
			
			self.saveActiveDelivery();
			self.htmlUpdateActiveDelivery();
			self.scheduleDeliveryStep();
		});
	};
	
	MalDelivery.prototype.doDeliveryStep = function() {
		var self = this;
		
		if (self.checkDeliveryCancelled()) {
			return;
		}
		
		var delivery = self.activeDelivery;
		
		var currentTarget = delivery.userList.users[delivery.progress];
		var profileLink = "http://myanimelist.net/profile/" + currentTarget;
		
		x$.ajax(profileLink, {dataType: "text", timeout: 5000}).done( function(data) {
			var dom = self.domFromFullHtml(data);
			var userId = self.findUserIdFromProfile(dom);
			
			if (userId === null) {
				self.pausedWithError("Script error: Could not find user ID from profile.");
				return;
			}
			
			var csrfToken = self.findTokenFromProfile(data);
			
			if (csrfToken === null) {
				self.pausedWithError("Script error: Could not find token from profile.");
				return;
			}
			
			self.doDeliveryMessageStep(delivery, currentTarget, userId, csrfToken);
		}).fail( function(response) {
			if (response.status == 404) {
				console.log("User " + currentTarget + " does not appear to exist, marking as failure.");
				
				delivery.failures[delivery.progress] = true;
				delivery.progress++;
				
				delivery.nextQueryTime = new Date().getTime() + 5000;
			}
			else {
				console.log("Server error, retrying 60 seconds later", response);
				
				delivery.nextQueryTime = new Date().getTime() + 60000;
			}
			
			self.saveActiveDelivery();
			self.htmlUpdateActiveDelivery();
			self.scheduleDeliveryStep();
		});
	};
	
	MalDelivery.prototype.scheduleDeliveryStep = function() {
		var self = this;
		
		if (self.checkDeliveryCancelled()) {
			return;
		}
		
		var currentTime = new Date().getTime();
		var delay = Math.max(0, self.activeDelivery.nextQueryTime - currentTime);
		
		window.setTimeout( function() {
			self.doDeliveryStep();
		}, delay);
	};
	
	MalDelivery.prototype.sendMessage = function() {
		var self = this;
		
		if (self.cancelling) {
			x$("#delivery-send-error").text("Currently cancelling previous delivery, please wait a moment.");
			return;
		}
		
		if (self.deliveryUserList === null || self.deliveryUserList.users.length === 0) {
			x$("#delivery-send-error").text("User list is empty.");
			return;
		}
		
		var message = x$("#delivery-message-box").val();
		if (message.length < 10) {
			x$("#delivery-send-error").text("Message length is less than 10 characters, probably not intended.");
			return;
		}
		
		self.activeDelivery = self.loadStorageItem("malDeliveryActive");
		
		if (self.activeDelivery !== null) {
			x$("#delivery-send-error").text("A delivery is already in progress, maybe in another tab?");
			return;
		}
		
		self.activeDelivery = { "userList": self.deliveryUserList, "progress": 0, "total": self.deliveryUserList.users.length, "failures": {}, "message": message, "nextQueryTime": 0 };
		
		self.saveActiveDelivery();
		self.resetMessage();
		
		self.delivering = true;
		self.scheduleDeliveryStep();
		
		self.htmlLoadActiveDelivery();
	};
	
	MalDelivery.prototype.pausedWithError = function(error) {
		var self = this;
		
		self.delivering = false;
		self.cancelling = false;
		self.htmlUpdateActiveDelivery();
		
		x$("#delivery-send-error").text(error);
	};
	
	MalDelivery.prototype.htmlUpdateActiveDelivery = function() {
		var self = this;
		var delivery = self.activeDelivery;
		
		if (delivery === null) {
			return;
		}
		
		x$("#delivery-active-progress").text("" + delivery.progress);
		x$("#delivery-active-status").html("");
		
		if (self.delivering) {
			var pauseLink = x$("<a/>", { "text": "Running (pause)", "href": "#", "click": function() {
				self.delivering = false;
				self.cancelling = true;
				self.htmlUpdateActiveDelivery();
				return false;
			}});
			
			x$("#delivery-active-status").append(pauseLink);
		}
		else if (self.cancelling) {
			x$("#delivery-active-status").append("Cancelling...");
		}
		else if (delivery.progress == delivery.total) {
			x$("#delivery-active-status").append("Finished");
		}
		else {
			var resumeLink = x$("<a/>", { "text": "Paused (resume)", "href": "#", "click": function() {
				if (delivery !== null && delivery.progress < delivery.total) {
					self.delivering = true;
					self.scheduleDeliveryStep();
					self.htmlUpdateActiveDelivery();
				}
				return false;
			}});
			
			x$("#delivery-active-status").append(resumeLink);
		}
		
		if (!self.delivering && !self.cancelling) {
			var deleteLink = x$("<a/>", { "text": " (FORGET)", "href": "#", "click": function() {
				if (!self.delivering && !self.cancelling) {
					self.activeDelivery = null;
					self.saveActiveDelivery();
					self.htmlLoadActiveDelivery();
				}
			}});
			
			x$("#delivery-active-status").append(deleteLink);
		}
		
		var container = x$("#delivery-active-userlist");
		container.html("");
		container.append(x$("<b/>", { "text": delivery.userList.name }));
		container.append(" (" + delivery.userList.users.length + " users: ");
		
		for (var i = 0; i < delivery.userList.users.length; i++) {
			var color = i < delivery.progress ? (delivery.failures.hasOwnProperty(i) ? "red" : "green") : "black";
			
			container.append(x$("<i/>", { "text": delivery.userList.users[i], "css": { "color": color } }));
			
			if (i + 1 < delivery.userList.users.length) {
				container.append(", ");
			}
		}
		
		container.append(" )");
	};
	
	MalDelivery.prototype.htmlLoadActiveDelivery = function() {
		var self = this;
		var container = x$("#delivery-current-block");
		container.html("");
		
		if (self.activeDelivery === null) {
			container.append(x$("<h2/>", { "html": "Send new message" }));
			
			var userListLine = x$("<p/>");
			userListLine.append("User list: ");
			userListLine.append(x$("<span/>", { "id": "delivery-current-userlist-desc" }));
			container.append(userListLine);
			
			container.append(x$("<textarea/>", { "id": "delivery-message-box", "css": {"width": "480px", "height": "150px" }}));
			
			container.append(x$("<div/>", { "id": "delivery-send-error", "css": {"color": "red"}}));
			
			var buttonContainer = x$("<div/>");
			var messageSendButton = x$("<input/>", { "type": "button", "id": "mal-delivery-send", "disabled": true, "css": {"width": "200px"}, "value": "Send" });
			messageSendButton.click( function() {
				self.sendMessage();
			});
			
			var messageResetButton = x$("<input/>", { "type": "button", "id": "mal-delivery-reset", "css": {"width": "200px"}, "value": "Reset" });
			messageResetButton.click( function() {
				self.resetMessage();
			});
			
			buttonContainer.append(messageSendButton);
			buttonContainer.append(messageResetButton);
			container.append(buttonContainer);
			
			self.htmlCreateDeliveryUserList();
		}
		else {
			container.append(x$("<h2/>", { "html": "Current delivery" }));
			
			var statusLine = x$("<p/>");
			statusLine.append("Status: ");
			statusLine.append(x$("<span/>", { "id": "delivery-active-status" }));
			container.append(statusLine);
			
			container.append(x$("<div/>", { "id": "delivery-send-error", "css": {"color": "red"}}));
			
			var progressLine = x$("<p/>");
			progressLine.append("Progress: ");
			progressLine.append(x$("<span/>", { "id": "delivery-active-progress" }));
			progressLine.append("/" + self.activeDelivery.userList.users.length);
			container.append(progressLine);
			
			var deliveryUserListLine = x$("<p/>");
			deliveryUserListLine.append("User list: ");
			deliveryUserListLine.append(x$("<span/>", { "id": "delivery-active-userlist" }));
			container.append(deliveryUserListLine);
			
			var activeMessageBox = x$("<textarea/>", { "id": "active-message-box", "disabled": true, "css": {"width": "480px", "height": "150px" }});
			activeMessageBox.val(self.activeDelivery.message);
			
			self.htmlUpdateActiveDelivery();
		}
	};
	
	MalDelivery.prototype.htmlCreateDeliveryUserList = function() {
		var self = this;
		var container = x$("#delivery-current-userlist-desc");
		
		x$("#mal-delivery-send").prop("disabled", self.deliveryUserList === null);
		
		if (self.deliveryUserList !== null) {
			container.html("");
			container.append(x$("<b/>", { "text": self.deliveryUserList.name }));
			container.append(" (" + self.deliveryUserList.users.length + " users: ");
			container.append(x$("<i/>", { "text": self.deliveryUserList.users.join(", ") }));
			container.append(" )");
		}
		else {
			container.html("------");
		}
	};
	
	MalDelivery.prototype.findUserListIndex = function(name) {
		var self = this;
		var i;
		
		for (i = 0; i < self.userLists.length; i++) {
			if (name === self.userLists[i].name) {
				return i;
			}
		}
		
		return null;
	};
	
	MalDelivery.prototype.deleteUserList = function(list) {
		var self = this;
		var index = self.findUserListIndex(list.name);
		
		if (index === null) {
			return;
		}
		
		self.userLists.splice(index, 1);
		self.saveUserLists();
		self.htmlLoadUserList();
	};
	
	MalDelivery.prototype.selectUserList = function(list) {
		var self = this;
		
		if (self.activeDelivery !== null) {
			// New delivery html is not loaded
			return;
		}
		
		self.deliveryUserList = list;
		self.htmlCreateDeliveryUserList();
	};
	
	MalDelivery.prototype.createUserListFunction = function(action, list) {
		var self = this;
		
		return function() {
			if (action === "edit") {
				self.startEditUserList(list);
			}
			else if (action === "delete") {
				if (window.confirm("Are you sure you want to delete this list?")) {
					self.deleteUserList(list);
				}
			}
			else if (action === "select") {
				self.selectUserList(list);
			}
			return false;
		};
	};
	
	MalDelivery.prototype.generateNewUserList = function() {
		var self = this;
		console.log(self);
		self.userLists.push({"name": "List #" + Math.floor(Math.random() * 1000000), "users": ["exampleuser", "anotherexampleuser"]});
		self.saveUserLists();
		self.htmlLoadUserList();
	};
	
	MalDelivery.prototype.htmlLoadUserList = function() {
		var self = this;
		var container = x$("#delivery-userlist-block");
		var i;
		
		container.html("");
		container.append(x$("<h2/>", { "html": "User lists" }));
		
		var createDiv = x$("<div/>", { "css": { "border-bottom": "1px solid #c0c0c0" } } );
		var createNewLink = x$("<a/>", { "html": "Create new user list", "href": "#" });
		createNewLink.click( function() {
			self.generateNewUserList();
		});
		createDiv.append(createNewLink);
		
		container.append(createDiv);
		
		for (i = 0; i < self.userLists.length; i++) {
			var list = self.userLists[i];
			var itemDiv = x$("<div/>", { "css": { "border-bottom": "1px solid #c0c0c0" } } );
			var headerPart = x$("<p/>");
			
			headerPart.append("List name: ");
			headerPart.append(x$("<b/>", { "text": list.name }));
			headerPart.append(" ");
			
			var editLink = x$("<a/>", { "html": "Edit", "href": "#" });
			editLink.click( self.createUserListFunction("edit", list) );
			
			var deleteLink = x$("<a/>", { "html": "Delete", "href": "#" });
			deleteLink.click( self.createUserListFunction("delete", list) );
			
			var selectLink = x$("<a/>", { "html": "Select", "href": "#" });
			selectLink.click( self.createUserListFunction("select", list) );
			
			headerPart.append("<br />");
			headerPart.append(editLink);
			headerPart.append(" | ");
			headerPart.append(deleteLink);
			headerPart.append(" | ");
			headerPart.append(selectLink);
			
			itemDiv.append(headerPart);
			
			var memberList = x$("<div/>");
			var memberListParagraph = x$("<p/>", { text: "Members: " });
			memberListParagraph.append(x$("<i/>", { text: list.users.join(", ") }));
			memberList.append(memberListParagraph);
			
			itemDiv.append(memberList);
			
			container.append(itemDiv);
		}
	};
	
	MalDelivery.prototype.cancelUserListEdit = function() {
		var self = this;
		
		self.editedUserList = null;
		self.htmlLoadUserListEdit();
	};
	
	MalDelivery.prototype.buildUserListFromEdit = function() {
		return {"name": x$("#delivery-user-list-edit-name").val(), "users": x$("#delivery-user-list-edit-list").val().split("\n")};
	};
	
	MalDelivery.prototype.saveUserListEdit = function() {
		var self = this;
		var updated = self.buildUserListFromEdit();
		var oldIndex = self.findUserListIndex(self.editedUserList.name);
		var newIndex = self.findUserListIndex(updated.name);
		
		if (newIndex !== oldIndex && newIndex !== null) {
			x$("#delivery-user-list-edit-error").text("A list with that name already exists.");
			return;
		}
		
		if (oldIndex !== null) {
			// Replacing old one
			self.userLists[oldIndex] = updated;
		}
		else {
			// Old one was deleted, just adding it to the end
			self.userLists.push(updated);
		}
		
		self.saveUserLists();
		self.htmlLoadUserList();
		
		self.editedUserList = null;
		self.htmlLoadUserListEdit();
	};
	
	MalDelivery.prototype.startEditUserList = function(list) {
		var self = this;
		
		self.editedUserList = list;
		self.htmlLoadUserListEdit();
	};
	
	MalDelivery.prototype.htmlLoadUserListEdit = function() {
		var self = this;
		var container = x$("#delivery-userlist-edit-block");
		container.html("");
		
		if (self.editedUserList === null) {
			return;
		}
		
		var header = x$("<h2/>", { "html": "Editing user list: " });
		header.append(x$("<span/>", { "text": self.editedUserList.name }));
		container.append(header);
		
		container.append("Name: ");
		
		var nameInput = x$("<input/>", { "id": "delivery-user-list-edit-name", "type": "text", "css": { "width": "450px" } });
		nameInput.val(self.editedUserList.name);
		container.append(nameInput);
		
		container.append("<br />");
		
		var textarea = x$("<textarea/>", {"id": "delivery-user-list-edit-list", "css": { "width": "480px", "height": "150px" } });
		textarea.val(self.editedUserList.users.join("\n"));
		container.append(textarea);
		
		var saveButton = x$("<input/>", { "type": "button", "id": "mal-userlist-save", "css": {"width": "200px"}, "value": "Save" });
		saveButton.click( function() {
			self.saveUserListEdit();
		});
		
		var cancelButton = x$("<input/>", { "type": "button", "id": "mal-userlist-cancel", "css": {"width": "200px"}, "value": "Cancel" });
		cancelButton.click( function() {
			self.cancelUserListEdit();
		});
		
		container.append("<br/>");
		container.append(x$("<span/>", { "id": "delivery-user-list-edit-error", "css": {"color": "red"}}));
		container.append("<br/>");
		container.append(saveButton);
		container.append(cancelButton);
	};
	
	MalDelivery.prototype.htmlGenerate = function() {
		var self = this;
		var content = x$("#content");
		var header = x$(x$("#contentWrapper h1")[0]);
		
		header.html("Mail delivery");
		content.html("");
		
		self.htmlCreateMainBlocks(content);
		self.htmlLoadActiveDelivery();
		//self.htmlLoadDeliveryHistory();
		self.htmlLoadUserListEdit(null);
		self.htmlLoadUserList();
	};
	
	MalDelivery.prototype.openDeliveryPage = function() {
		var self = this;
		
		self.loadAllData();
		self.htmlGenerate();
	};
	
	MalDelivery.prototype.createDeliveryMenuItem = function() {
		var self = this;
		
		var menuContainer = x$("#horiznav_nav ul");
		if (menuContainer.length === 0) {
			return;
		}
		
		var newElement = x$("<li/>");
		var elementLink = x$("<a/>", { "href": "#", "html": "Mail delivery" });
		elementLink.click( function() {
			self.openDeliveryPage();
			return false;
		});
		
		newElement.append(elementLink);
		menuContainer.append(newElement);
	};
	
	MalDelivery.prototype.init = function() {
		var self = this;
		
		self.createDeliveryMenuItem();
	};
	
	MalDelivery.prototype.loadCallback = function() {
		var self = this;
		
		self.depCount++;
		
		if(self.depCount === 2) {
			x$(document).ready( function() {
				self.init();
			});
		}
	};
	
	MalDelivery.prototype.preinit = function() {
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
	
	var malDelivery = new MalDelivery();
	malDelivery.preinit();
	
})();
