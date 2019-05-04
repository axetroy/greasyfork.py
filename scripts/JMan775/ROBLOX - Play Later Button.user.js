// ==UserScript==
// @name         ROBLOX - Play Later Button
// @description  Adds a "Play Later" button to game pages.
//
// @author       JMan775
// @version      1.0.1
//
// @icon         http://svgshare.com/i/a9.svg
//
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @match        https://*.roblox.com/home*
// @match        https://*.roblox.com/games/*/*
//
// @connect      api.roblox.com
// @connect      api.trello.com
//
// @run-at       document-body
//
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @namespace https://greasyfork.org/users/222479
// ==/UserScript==

(function() {
	'use strict';

	var strings = {
		"boardName": "Play Later for ROBLOX",
		"playlist": "Playlist",
		"history": "History",
		"notAuth": "Not Authorised",
		"pleaseAuth": "Please give us access to Trello. We'll use this to store your playlist!",
		"connect": "Connect",
		"verify": "Verify",
		"authTokenPlaceholder": "Authorisation token...",
		"remove": "Remove",
		"playLater": "Play Later",
		"adding": "Adding...",
		"removing": "Removing...",
		"refresh": "Refresh",
	};

	function create(Element){return $(document.createElement(Element));}

	var modifyHomePage;
	var trelloAuth, homeRightCol = "div.home-right-col:eq(0)", gamePlayButtons = "div.game-play-buttons:eq(0)";

	var res = {
		"trelloVal": "trelloAuthToken",
		"key": "08599ec45f45ac53d96cec6b72448451",
		"authUrl": "https://bit.ly/2juAlOq",
		"api": "https://api.trello.com/1",
		"rbx": "https://api.roblox.com",
		"gameUrl": "/games/{ID}/view?rbxp=187664365",
		"assetGame": "https://assetgame.roblox.com/Thumbs/Asset.ashx",
		"profileUrl": "/users/{ID}/profile?rbxp=187664365",
		"groupUrl": "/My/Groups.aspx?gid={ID}&rbxp=187664365",
		"loadingImg": "https://images.rbxcdn.com/ec4e85b0c4396cf753a06fade0a8d8af.gif",
		"devAssist": true,
	};

	function createSection(){
		var section = $("div.rg-play-later-list:eq(0)");
		if (section !== null || section !== undefined) section.remove();

		section = create("div").addClass("section rg-play-later-list");
		var header = create("div").addClass("section-header").appendTo(section);
		create("h3").text(strings.playlist).appendTo(header);
		create("a").addClass("btn-control-xs btn-more btn-fixed-width").text(strings.refresh).attr("href","#").appendTo(header)
		.click(function(evt){
			evt.preventDefault();
			modifyHomePage();
		});

		var content = create("div").addClass("section-content").appendTo(section);
		return {"section": section, "content": content};
	}

	function createUnauthorisedBox(section){
		create("h3").text(strings.notAuth).appendTo(section);
		create("p").text(strings.pleaseAuth).appendTo(section);
		section.append("<br>");

		var authButton = create("a").addClass("btn-primary-md").text(strings.connect);
		var center = create("center").append(authButton).appendTo(section);

		authButton.click(function(evt){
			evt.preventDefault();
			center.remove();

			var verifyForm = create("div").addClass("form-horizontal").appendTo(section);
			var verifyFormGroup = create("div").addClass("form-group").appendTo(verifyForm);
			var verifyInput = create("input").addClass("form-control input-field").attr("placeholder", strings.authTokenPlaceholder).appendTo(verifyFormGroup);
			var verifyButton = create("a").addClass("btn-primary-md btn-fixed-width").text(strings.verify).appendTo(verifyForm);
			
			verifyButton.click(function(evt){
				evt.preventDefault();
				GM_setValue(res.trelloVal, verifyInput.val().trim().length > 0 && verifyInput.val().trim() || "");
			});

			window.open(res.authUrl);
			verifyInput.focus();
		});
	}

	function removeCardFromPlaylist(board, card, authToken, callback){
		$.getJSON(res.api+"/boards/"+board.id+"/lists?key="+res.key+"&token="+authToken, function(data){
			var list;

			for (let tlist of data){
				if (!tlist.closed && tlist.name == strings.history){
					list = tlist;
					break;
				}
			}

			if (list === null || list === undefined){
				$.post(res.api+"/lists?key="+res.key+"&token="+authToken, {"name": strings.history, "idBoard": board.id, "pos": "bottom"}, function(data){
					removeCardFromPlaylist(board, card, authToken, callback);
				});
			}else{
				GM_xmlhttpRequest({
					method: "PUT",
					url: res.api+"/cards/"+card.id+"/idList?key="+res.key+"&token="+authToken+"&value="+list.id,
					onload: function(response){
						if ($.isFunction(callback)) callback();
					}
				});
			}
		});
	}

	function getTrelloBoard(authToken, callback){
		$.getJSON(res.api+"/member/me/boards?key="+res.key+"&token="+authToken, function(data){
			var board;

			for (let tboard of data){
				if (!tboard.closed && tboard.name == strings.boardName){
					board = tboard;
					break;
				}
			}

			if (board === null || board === undefined){
				$.post(res.api+"/boards?key="+res.key+"&token="+authToken, {"name": strings.boardName, "defaultLists": false}, function(data){
					getTrelloBoard(authToken, callback);
				});
			}else{
				callback(board);
			}
		});
	}

	function getTrelloList(authToken, board, listName, callback){
		$.getJSON(res.api+"/boards/"+board.id+"/lists?key="+res.key+"&token="+authToken, function(data){
			var list;

			for (let tlist of data){
				if (!tlist.closed && tlist.name == listName){
					list = tlist;
					break;
				}
			}

			if (list === null || list === undefined){
				$.post(res.api+"/lists?key="+res.key+"&token="+authToken, {"name": listName, "idBoard": board.id, "pos": "bottom"}, function(data){
					getTrelloList(authToken, board, listName, callback);
				});
			}else{
				callback(list);
			}
		});
	}

	function createAuthorisedBox(section, authToken){
		var list = create("ul").addClass("vlist class").appendTo(section);

		getTrelloBoard(authToken, function(board){
			create("p").addClass("text-date-hint").text("[BOARD ID] "+board.id).insertBefore(list);

			getTrelloList(authToken, board, strings.playlist, function(tlist){
				create("p").addClass("text-date-hint").text("[PLAYLIST ID] "+tlist.id).insertBefore(list);

				$.getJSON(res.api+"/lists/"+tlist.id+"/cards?key="+res.key+"&token="+authToken, function(data){
					for (let card of data){
						if (!card.closed){
							GM_xmlhttpRequest({
								method: "GET",
								url: res.rbx+"/marketplace/productinfo?assetId="+card.name,
								onload: function(response){
									let data = $.parseJSON(response.responseText);
									let gameUrl = res.gameUrl.replace("{ID}", data.AssetId);
									let profileUrl = res.profileUrl.replace("{ID}", data.Creator.Id);
									let groupUrl = res.groupUrl.replace("{ID}", data.Creator.Id);

									let listItem = create("li").addClass("list-item").appendTo(list);
									let listHeader = create("a").addClass("list-header").attr("href", gameUrl).appendTo(listItem);
									create("img").addClass("header-thumb").attr("src", res.assetGame+"?width=100&height=100&assetId="+data.AssetId).appendTo(listHeader);

									let listBody = create("div").addClass("list-body").appendTo(listItem);
									create("h3").addClass("list-content text-overflow").css("margin", "0").append(create("a").attr("href", gameUrl).text(data.Name)).appendTo(listBody);
									listBody.append("by ");

									create("a").attr("href", (data.Creator.CreatorType == "Group" && groupUrl || profileUrl)).addClass("text-name text-overflow").text(data.Creator.Name).appendTo(listBody);

									create("span").addClass("icon-alert").css("position","absolute").css("top","0").css("right","0").css("cursor","pointer").attr("title", strings.remove).appendTo(listBody)
										.click(function(){
										listItem.html('<center><img src="'+res.loadingImg+'"></center>');

										removeCardFromPlaylist(board, card, authToken, function(){
											listItem.remove();
										});
									});
								}
							});
						}
					}
				});
			});
		});
	}

	modifyHomePage = function(){
		if ($(homeRightCol) === null || $(homeRightCol) === undefined) return;
		var section = createSection(), trelloAuth = GM_getValue(res.trelloVal, "");

		if (trelloAuth.length > 0){
			createAuthorisedBox(section.content, trelloAuth);
		}else{
			createUnauthorisedBox(section.content);
		}

		section.section.insertBefore($(homeRightCol).children(0));
	};
	
	function addCardToPlaylist(authToken, list, data, callback){
		var cardData = Object.assign({"pos": "bottom", "idList": list.id}, ((data !== null && data !== undefined) && data || {}));
		$.post(res.api+"/cards?key="+res.key+"&token="+authToken, cardData, function(data){
			callback(data);
		});
	}

	function modifyGamePage(){
		if ($(gamePlayButtons) === null || $(gamePlayButtons) === undefined) return;
		var authToken = GM_getValue(res.trelloVal, ""), placeId = $("*[data-place-id]:eq(0)").attr("data-place-id");

		if (authToken.length > 0){
			getTrelloBoard(authToken, function(board){
				getTrelloList(authToken, board, strings.playlist, function(list){
					$.getJSON(res.api+"/lists/"+list.id+"/cards?key="+res.key+"&token="+authToken, function(data){
						var card;
						
						for (let tcard of data){
							if (!tcard.closed && tcard.name == placeId){
								card = tcard;
								break;
							}
						}
						
						var laterButton = create("a").addClass("btn-secondary-xs").css("min-width", "88%").css("margin-top", "4px").appendTo(gamePlayButtons)
						.text((card === null || card === undefined) && strings.playLater || strings.remove);
						
						laterButton.click(function(){
							if (card === null || card === undefined){
								$(this).text(strings.adding).promise().done(function(){
									addCardToPlaylist(authToken, list, {"name": placeId}, function(newCard){
										card = newCard; laterButton.text(strings.remove);
									});
								});
							}else{
								$(this).text(strings.removing).promise().done(function(){
									removeCardFromPlaylist(board, card, authToken, function(){
										card = null; laterButton.text(strings.playLater);
									});
								});
							}
						});
					});
				});
			});
		}
	}

	function documentReady(){
		var path = location.pathname.toLowerCase();

		if (path == "/" || path == "/home"){
			modifyHomePage();
		}else{
			if (res.devAssist){
				if ((location.href.indexOf("?rbxp=187664365") > -1) === false){
					location.href = location.protocol+"//"+location.host+location.pathname+"?rbxp=187664365";
					return;
				}
			}
			
			modifyGamePage();
		}

		GM_addValueChangeListener(res.trelloVal, documentReady);

		GM_registerMenuCommand("[Play Later] Clear Tokens", function(){
			GM_deleteValue(res.trelloVal);
		});
	}

	$(document).ready(documentReady);
})();