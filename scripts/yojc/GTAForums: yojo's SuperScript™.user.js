// ==UserScript==
// @name			GTAForums: yojo's SuperScript™
// @description		Adds some fancy stuff.
// @author			yojo2
// @namespace		https://greasyfork.org/en/scripts/6743-gtaforums-yojo-s-superscript
// @version			1.02
// @include			http://gtaforums.com/*
// @run-at			document-end
// @grant			none
// @icon			http://yojc.is-best.net/favicon.ico
// ==/UserScript==

(function () {
	function doStuff() {
		var yojcVersion = 1.02;
		var forumSkin = jQuery("#new_skin_menucontent > .selected > a").text();
		var threadLink = "http://google.com";
		
		// tak bo cośtam
		jQuery.noConflict();
		
		function debug(fun) {
			if (true) {
				var today = new Date;
				console.debug(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "." + today.getMilliseconds() + " # " + fun);
			}
		}
		
		function alertError(id, e) {
			alert("yojo's SuperScript™ has failed to execute function yojc_" + id + "!" + "\n\n\Please post this error in this thread:\n			" + threadLink + "\n\Leave any info you might find necessary to replicate the bug.\n\Sorry for the inconvenience.\n\n\Script version: " + yojcVersion + "\n\Current page: " + window.location.href + "\n\User Agent: " + navigator.userAgent + "\n\Error message: " + e);
		}
		
		// sprawdza czy dana funkcja ma być włączona
		
		function shouldItRun(name) {
			if(localStorage.getItem("yojc_" + name) == "true") {
				debug(name + " should run");
				return true;
			}
			else {
				debug(name + " should not run");
				return false;
			}
		}
		
		function properDate(forumDate, datePrefix) {
			var datePrefix = typeof datePrefix !== 'undefined' ? datePrefix : "";
			var regDate = new Date(0);
			
			if (forumDate.match(datePrefix + "A day ago")) {
				var regDate = new Date();
				regDate.setDate(regDate.getDate() - 1);
				
				regDate.setHours(0);
				regDate.setMinutes(0);
				regDate.setSeconds(0);
				regDate.setMilliseconds(0);
			}
			else if (forumDate.match(RegExp(datePrefix + "(A|An|\\d+) (hour|minute|second|day|week|month|year)s{0,1} ago"))) {
				var regTimeRaw = forumDate.match(RegExp(datePrefix + "(A|An|\\d+) (hour|minute|second|day|week|month|year)s{0,1} ago"));
				var regTime = new Date().getTime();
				
				if (regTimeRaw[1].match("A"))
					var regOffset = 1;
				else
					var regOffset = regTimeRaw[1];
				var regType = regTimeRaw[2];
				
				if (regType.match("second")) {
					regTime -= 1000 * regOffset;
				}
				else if (regType.match("minute")) {
					regTime -= 60 * 1000 * regOffset;
				}
				else if (regType.match("hour")) {
					regTime -= 60 * 60 * 1000 * regOffset;
				}
				else if (regType.match("day")) {
					regTime -= 24 * 60 * 60 * 1000 * regOffset;
				}
				else if (regType.match("week")) {
					regTime -= 7 *24 * 60 * 60 * 1000 * regOffset;
				}
				
				var regDate = new Date(regTime);
			}
			else {
				var regDateRaw = forumDate.match(/\d{1,2}\s\w{1,4}\s\d{4}/)[0];
				var regDate = new Date(regDateRaw);
			}
			
			return regDate;
		}
		
		// sprawdza wyświetlaną stronę
		
		function viewing(name) {
			switch (name) {
				case "profile":
					if (window.location.href.match("/user/"))
						return true;
					else
						return false;
					break;
				
				case "forum":
					if (window.location.href.match("/forum/"))
						return true;
					else
						return false;
					break;
				
				case "ignored":
					if (window.location.href.match("ignoredusers"))
						return true;
					else
						return false;
					break;
				
				case "main":
					if (jQuery("#board_statistics").length > 0)
						return true;
					else
						return false;
					break;
				
				case "msgEdit":
					if (jQuery("#postingform").length > 0)
						return true;
					else
						return false;
					break;
				
				case "privmsg":
					if (window.location.href.match("topicID="))
						return true;
					else
						return false;
					break;
				
				case "settings":
					if (window.location.href.match("area=yojc"))
						return true;
					else
						return false;
					break;
				
				case "topic":
					if (window.location.href.match("/topic/"))
						return true;
					else
						return false;
					break;
				
				case "userCP":
					if (window.location.href.match("module=usercp"))
						return true;
					else
						return false;
					break;
				
				case "newContent":
					if (window.location.href.match("do=viewNewContent"))
						return true;
					else
						return false;
					break;
				
				case "report":
					if (window.location.href.match("do=show_report"))
						return true;
					else
						return false;
					break;
				
				case "mostRep":
					if (window.location.href.match("module=reputation&section=most"))
						return true;
					else
						return false;
					break;
				
				case "blogMain":
					if (window.location.href.match("app=blog&type=dash") || window.location.href.match("app=blog&s=") || window.location.href.match(/app\=blog$/))
						return true;
					else
						return false;
					break;
				
				case "blogList":
					if (window.location.href.match("app=blog") || window.location.href.match("type=all"))
						return true;
					else
						return false;
					break;
				
				case "blogView":
					if (window.location.href.match("app=blog") || window.location.href.match("showentry="))
						return true;
					else
						return false;
					break;
				
				case "deletedPosts":
					if (window.location.href.match("tab=deletedposts"))
						return true;
					else
						return false;
					break;
				
				default:
					return false;
					break;
			}
		}
		
		// tworzenie linku do panelu ustawień
		
		function createLinkToPanel() {
			debug(arguments.callee.name);
			
			jQuery("<li/>", {
				id: "yojc",
				style: "z-index: 10000;"
			}).appendTo("#links");
			
			jQuery("<a/>", {
				href: "http://gtaforums.com/index.php?app=core&module=usercp&tab=core&area=yojc",
				title: "SuperScript's Settings",
				text: "yojo's SuperScript™",
				style: "z-index: 10000;"
			}).appendTo("#yojc");
		}
		
		// tworzenie zakładki z ustawieniami skryptu
		
		function createSettingsPanelTab() {
			if (!viewing("userCP"))
				return;
			
			debug(arguments.callee.name);
			
			jQuery("<li/>", {
				id: "yojcTab"
			}).append(jQuery("<a/>", {
				href: "http://gtaforums.com/index.php?app=core&module=usercp&tab=core&area=yojc",
				title: "SuperScript's Settings",
				text: "yojo's SuperScript™"
			})).appendTo("#usercp_tabs > ul");
		}
		
		// tworzenie strony z ustawieniami
		
		function createSettingsPanel() {
			try {
				if (!viewing("settings"))
					return;
				
				debug(arguments.callee.name);
			
				// tworzenie checkboxa
				
				function createCheckbox(id, label, desc) {
					return jQuery('<ul>\
						<li class="field checkbox">\
							<input class="input_check" id="' + id + '" name="' + id + '" value="1" type="checkbox"> <label for="' + id + '">' + label + '</label><br>\
							<span class="desc lighter">' + desc + '</span>\
						</li>\
					</ul>');
				}
				
				// zwijanie/rozwijanie dodatkowych opcji
				
				function createClickEvent(id) {
					if (!jQuery("#" + id).prop('checked'))
						jQuery("#" + id).parent().parent().next().hide();
					
					jQuery("#" + id).click(function() {
						jQuery(this).parent().parent().next().slideToggle();
					});
				}
				
				jQuery(".ipsType_pagetitle").html("SuperScript's Settings");
				jQuery("#yojcTab").attr("class", "active");
				document.title = "SuperScript's Settings - GTA Forums";
				jQuery("div.ipsPad").html("Currently installed script version: <b>" + yojcVersion + "</b>.\
					<br>Script should update itself automatically; if it doesn't, check this page for updates: <a href=\"https://greasyfork.org/en/scripts/6743-gtaforums-yojo-s-superscript\" title=\"Script's page @ greasyfork.org\">https://greasyfork.org/en/scripts/6743-gtaforums-yojo-s-superscript</a>. It also contains the script's full changelog.\
					<br>Please report all issues and suggestions in this thread: <a href=\"" + threadLink + "\" title=\"Script's thread @ GTAForums\">yojo's SuperScript&trade;</a>. There you can also find a more detailed description of every feature.\
					<br><br>");
				
				// ustawienia dla użytkowników
				
				jQuery("div.ipsPad").append(jQuery("<h2/>", {
					id: "yojcUserHeading",
					class: "ipsType_subtitle ipsSettings_pagetitle",
					text: "User settings"
				}));
				
				jQuery("div.ipsPad").append(jQuery("<fieldset/>", {
					id: "yojcUserSettings",
					class: "ipsSettings_section"
				}));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_ignoreTopics", "Ignore threads from selected users", "threads made by selected users will be hidden from your view. this works the same as post ignoring mechanism."));
				jQuery("#yojcUserSettings").append(jQuery('<div style="margin-left: 0 !important;">\
						<input autocomplete="off" placeholder="User list (separate by commas, not case sensitive)" class="input_text" id="yojc_ignoreTopicsOpts" style="width: 99% !important" value="' + localStorage.getItem("yojc_ignoreTopicsOpts") + '" type="text">\
					</div>'));
					
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_showSubforums", "Show full subforum info", "Changes the plain subforum list into a full table, with info such as date of the last post, etc."));
				jQuery("#yojcUserSettings").append(jQuery('<div id="yojc_showSubforumsDummy" style="margin-left: 50px !important;"></div>'));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_hideForums", "Hide selected forums", "Hides selected forums from the main page (only)."));
				jQuery("#yojcUserSettings").append(jQuery('<div id="yojc_hideForumsDummy" style="margin-left: 50px !important;"></div>'));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_simpleEditor", "Repair simple (BBCode) editor.", "Buttons such as bold, italics, etc. will work again in non-visual editor."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_colorNick", "Color nicks according to user's group", "When viewing topic/PM, user's nickname will be the same colour as said user's group."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_showPostsPerDay", "Show post per day ratio", "Show post/views per day ratio in profiles."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_toggleSpoiler", "Add \"All/None\" button for spoilers", "Allows to quickly show a spoiler and all spoilers embedded in it."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_toggleSig", "Add \"Show/Hide Signatures\" button", "Hides all signatures, which can be toggled with a press of a button."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_toggleRep", "Add \"Show/Hide Reputation\" button", "Hides all reputation related stuff, which can be toggled with a press of a button."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_toggleQuote", "Add \"Show/Hide Quote\" button", "Gives an ability to hide and show the quotes. Prevents \"pyramids\", ie. automatically hides quotes that are in another quotes."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_toggleCode", "Hide [code] tag contents", "The contents will be hidden until you click on it."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_copyNick", "Copy nick to clipboard", "By clicking on user group title (or \"Online/Offline\" badge in profile) you can quickly copy user's nickname to clipboard. Nick can be wrapped in BBCode tags, eg. [b][member=" + jQuery("#user_link").text().trim() + "][/b]."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_moveFlagsNMedals", "Move flags and medals to the username", "Less wasted space, look neater IMHO."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_turnOffLightbox", "Turn off \"Lightbox\" gallery.", "This gallery activates upon clicking on an image in a posts. Doesn't really work properly in Firefox, as it blocks MMB and RMB."));
				
				// koniec
				
				jQuery("div.ipsPad").append(jQuery("<fieldset/>", {
					id: "yojcSaveSettings",
					class: "ipsSettings_section"
				}));
				
				jQuery("#yojcSaveSettings").append(jQuery('<a class="input_submit ipsButton_secondary clickable important" title="Click to save">Save settings</a>'));
				
				
				jQuery("input[id^=yojc_]").each(function() {
					if (localStorage.getItem(this.id) == "true")
						jQuery(this).prop('checked', true);
				});
				
				createClickEvent("yojc_ignoreTopics");
				createClickEvent("yojc_ignoreBlogEntries");
				createClickEvent("yojc_showSubforums");
				createClickEvent("yojc_hideForums");
				
				// spis forów
				
				jQuery.ajax("http://gtaforums.com/index.php?app=core&module=search&search_in=forums").done(function(response) {
					jQuery(response).find("select.input")
						.detach().attr("id", "yojc_showSubforumsOpts").appendTo(jQuery("#yojc_showSubforumsDummy"))
						.clone().attr("id", "yojc_hideForumsOpts").appendTo(jQuery("#yojc_hideForumsDummy"));
					
					jQuery("select.input > option").each(function(i, e) {
						if(this.innerHTML[0] !== "&")
							this.disabled=("disabled")
					});
					
					// wywalamy z listy fora bez subforów
					
					var showSubforumsList = localStorage.getItem("yojc_showSubforumsOpts").split(",");
					var tmp = jQuery("#yojc_showSubforumsOpts > option");
					tmp.each(function(i, e) {
						if (showSubforumsList.indexOf(this.value) > -1)
							this.selected = "selected";
						
						if (i === tmp.length-1) {
							jQuery(this).remove();
							return false;
						}
						else {
							var currentLevel = (this.innerHTML.match(/\-\-/g) || []).length;
							var nextLevel = (tmp.eq(i+1).html().match(/\-\-/g) || []).length;
							
							if (currentLevel >= nextLevel) {
								jQuery(this).remove();
							}
							else {
								return true;
							}
						}
					});
					
					if (localStorage.getItem("yojc_hideForumsOpts")) {
						var hideForumsList = localStorage.getItem("yojc_hideForumsOpts").split(",");
						
						jQuery("#yojc_hideForumsOpts > option").each(function(i, e) {
							if (hideForumsList.indexOf(this.value) > -1)
								this.selected = "selected";
						});
					}
				});
				
				// obsługa przycisku zapisz
				
				jQuery(".input_submit").click(function() {
					jQuery("input[id^=yojc_]").each(function() {
						localStorage.setItem(this.id, jQuery(this).prop('checked'));
					});
					
					localStorage.setItem("yojc_ignoreTopicsOpts", jQuery("#yojc_ignoreTopicsOpts").val());
					
					localStorage.setItem("yojc_showSubforumsOpts", (jQuery("#yojc_showSubforumsOpts").val() != null ? jQuery("#yojc_showSubforumsOpts").val().toString() : null));
					
					localStorage.setItem("yojc_hideForumsOpts", (jQuery("#yojc_hideForumsOpts").val() != null ? jQuery("#yojc_hideForumsOpts").val().toString() : null));
					
					var _options = {
						type: 'pane',
						modal: true,
						initial: '<div><h3>Great success!</h3>\
							<div class="ipsPad ipsForm_center"><p>Looks like the settings were saved properly.</p>\
							<br /><span onclick="ipb.global.popups[\'yojcSave\'].hide()" class="clickable ipsButton_secondary important">Close</span></div>',
						hideAtStart: false,
						w: '',
						h: '',
					};
					ipb.global.popups['yojcSave'] = new ipb.Popup('confirm',_options);
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		
		//---------------------------------
		// skrypty dla użytkowników
		//---------------------------------
		
		//---------------------------------
		// pokazywanie średniej postów
		//---------------------------------
		
		function showPostsPerDay() {
			try {
				if (!viewing("profile"))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				// http://stackoverflow.com/questions/6784894/add-commas-or-spaces-to-group-every-three-digits
				function commafy(num) {
					var str = num.toString().split('.');
					if (str[0].length >= 4) {
						str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
					}
					if (str[1] && str[1].length >= 4) {
						str[1] = str[1].replace(/(\d{3})/g, '$1 ');
					}
					return str.join('.');
				}
				
				function round(num, count) {
					count = Math.pow(10, count);
					return Math.round((num)*count)/count;
				}
				
				function avg(count, date) {
					var today = new Date();
					var dayLength = 1000*60*60*24;
					
					if (today !== date)
						return round(count/((today.getTime()-date.getTime())/dayLength), 3);
					else
						return 0;
				}
				
				var regDate = properDate(jQuery("#user_info_cell").text(), "Member Since ");
				
				var $profileFields = jQuery(".row_data");
				
				var postCount = parseInt($profileFields.eq(1).html().replace(/,/g, "").match(/\d+/)[0], 10);
				var viewCount = parseInt($profileFields.eq(2).html().replace(/,/g, "").match(/\d+/)[0], 10);
				
				$profileFields.eq(1).html(commafy(postCount) + " (" + avg(postCount, regDate) + " per day)");
				$profileFields.eq(2).html(commafy(viewCount) + " (" + avg(viewCount, regDate) + " per day)");
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// kolorowanie nicków
		//---------------------------------
		
		function colorNick() {
			try {
				if (!(viewing("topic") || viewing("privmsg")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				var $colorList = jQuery(".group_title");
				
				$colorList.each(function(i) {
					var e = jQuery(this).parent().parent().find(".author.vcard, .author.vcard > a");
					e.attr("style", jQuery(this).find("span").attr("style"));
					e.css("font-weight", "normal");
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// pokazywanie pełnych danych subforów
		//---------------------------------
		
		function showSubforums($e) {
			try {
				if (!(viewing("main") || viewing("forum")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				if ($e == null) {
					debug(arguments.callee.name);
					$e = jQuery("body");
				}
				
				var customColor = localStorage.getItem("customcolor");
				var forumList = localStorage.getItem("yojc_showSubforumsOpts").split(",");
				
				function sendRequest(thisId, $thisForum) {
					jQuery.ajax("http://gtaforums.com/index.php?showforum=" + thisId).done(function(response) {
						/* w newTr -> newTd zostanie umieszczona nowa lista subforów */
						var $newTr = jQuery("<tr/>");
						var $newTd = jQuery("<td/>", {
							colspan: "4"
						});
					 
						/* wpakowanie kodu do tymczasowego div */
						var $tempNode = jQuery(response.replace(/returntoforumid=\d+/g, "returntoforumid=0"));
						
						/* usuwanie kolumn "wyświetleń/postów" oraz "ostatni post" (jeśli w danym dziale da się pisać tylko w subforach) */
						if ($tempNode.find("#forum_table").length === 0 || $tempNode.find("#forum_table .col_f_post").length === 0) {
							$thisForum.parent().next().remove();
							$thisForum.parent().next().remove();
							$thisForum.parent().attr("colspan", "3");
						}
						else {
							// poprawiamy kolumnę "Ostatni post"
							var latestPost = 0;
							var latestDate = new Date(0);
							var pinnedFlag = false;
							
							var dateClass = "a[title^=\"Go to last post\"]";
							
							$tempNode.find("#forum_table .col_f_post").each(function(i) {
								if (i === 0)
									return true;
								else if (jQuery(this).parent().find(".ipsBadge.ipsBadge_Pinned").length > 0) {
									if (!pinnedFlag) {
										latestPost = i;
										latestDate = jQuery(this).find(dateClass);
										pinnedFlag = true;
										return true;
									}
									else
										return true;
								}
								else {
									if (!pinnedFlag) {
										latestPost = i;
										latestDate = jQuery(this).find(dateClass);
										return false;
									}
									else {
										var thisDate = jQuery(this).find(dateClass);
										
										if (properDate(thisDate.text()) > properDate(latestDate.text())) {
											latestPost = i;
											latestDate = thisDate;
										}
										return false;
									}
								}
							});
							
							if (latestPost !== 0) {
								var latestPostCell = $tempNode.find("#forum_table .col_f_post").eq(latestPost);
								
								var $posterNick = latestPostCell.find(".name");
								var $posterAv = latestPostCell.find("img");
								var posterID = latestPostCell.html().match(/\/user\/(\d+)/)[1];
								var postDate = latestPostCell.find(dateClass).text().trim();
								var topicID = latestPostCell.html().match(/\/topic\/(\d+)/)[1];
								var topicTitle = latestPostCell.parent().find(".topic_title").text().trim();
								var topicTitleShort = (topicTitle.length > 30 ? topicTitle.substring(0, 27).trim() + "..." : topicTitle);
								
								var tdNewContents = '<a href="http://gtaforums.com/index.php?showuser=' + posterID + '" class="ipsUserPhotoLink left">\
										<img id="replaceThisTyCwelu">\
									</a>\
									<ul class="last_post ipsType_small">\
										<li><span class="highlight_unread"><a href="http://gtaforums.com/index.php?showtopic=' + topicID + '&amp;view=getnewpost" title="' + topicTitle + '">' + topicTitleShort + '</a></span></li>\
											<li>By <a id="replaceThisTyCiulu"></a><br>\
													<span class="desc lighter blend_links">\
													<a href="http://gtaforums.com/index.php?showtopic=' + topicID + '&amp;view=getlastpost" title="Go to last post: ' + topicTitle + '">' + postDate + '</a>\
												</span>\
											</li>\
									</ul>';
									
								$thisForum.parent().parent().find(".col_c_post").html(tdNewContents);
								$thisForum.parent().parent().find(".col_c_post #replaceThisTyCiulu").replaceWith($posterNick);
								
								if ($posterAv.length > 0) {
									$posterAv.attr("alt", "Zdjęcie")
									$thisForum.parent().parent().find(".col_c_post #replaceThisTyCwelu").replaceWith($posterAv);
								}
								else
									$thisForum.parent().parent().find(".col_c_post #replaceThisTyCwelu").remove();
							}
						}
						
						/* wyciągnięcie z kodu strony tabeli z subforami */
						$newSubforumsList = $tempNode.find(".ipb_table:not(*[id=forum_table])").last().detach();
						$newSubforumsList.addClass("gtaf_container");
						$newSubforumsList.attr("style", "border-width: 1px !important");
						
						/* dołączenie tabeli do strony głównej forum */
						$newTd.append($newSubforumsList);
						$newTd.appendTo($newTr);
						$thisForum.parent().parent().after($newTr);
						
						/* usuwanie standardowej listy subforów */
						$thisForum.hide();
						$thisForum.children().each(function() {
							jQuery(this).hide();
						});
						
						hideForums($newTr);
						showSubforums($newTr);
					});
					
					
				}
				
				/* wysłanie zapytań */
				
				$e.find(".ipsList_inline.ipsType_small.subforums").each(function(i, e) {
					var forumId = e.parentNode.children[0].innerHTML.match(/\/forum\/(\d+)/)[1];
					if (forumList.indexOf(forumId) > -1)
						sendRequest(forumId, jQuery(e));
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// ukrywanie forów na stronie głównej
		//---------------------------------
		
		function hideForums($e) {
			try {
				if (!(viewing("main")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				if ($e == null) {
					debug(arguments.callee.name);
					$e = jQuery("body");
				}
				
				var forumList = localStorage.getItem("yojc_hideForumsOpts").split(",");
				var $subForumsList = $e.prev().find(".ipsList_inline.ipsType_small.subforums");
				console.info($subForumsList)
				
				$e.find("td.col_c_forum").each(function(i, e) {
					e = jQuery(e);
					
					var forumId = e.html().match(/\/forum\/(\d+)/)[1];
					if (forumList.indexOf(forumId) > -1) {
						$subForumsList.show();
						$subForumsList.find("a[href*=forum\\/" + forumId + "]").parent().show();
						e.parent().remove();
					}
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// ignorowanie tematów
		//---------------------------------
		
		function ignoreTopics() {
			try {
				if (!(viewing("newContent") || viewing("forum")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				var removedTopics = [];
				var ignoreArray = jQuery.map(localStorage.getItem("yojc_ignoreTopicsOpts").toLowerCase().split(","), jQuery.trim);
				
				var nickClass = ".desc";
				
				jQuery("tr[id^=trow]").each(function() {
					var $nickname = jQuery(this).find(nickClass + " > .___hover___member");
					var nickname = $nickname.text();
					
					if(nickname == "") {
						nickname = jQuery(this).find(".topic_desc").text();
						nickname = nickname.substring(26, nickname.indexOf("_*,"));
						$nickname = jQuery("<span>" + nickname + "</span>")
					}
					
					if(ignoreArray.indexOf(nickname.toLowerCase()) != -1) {
						var colspan = 4;
						var $modTickbox = jQuery(this).find(".col_f_mod");
						if($modTickbox)
							colspan++;
						
						jQuery(this).find(nickClass + " > .___hover___member").replaceWith(jQuery("<a id=\"unhide_username_" + removedTopics.length + "\">dupa</a>"));
						
						var $newCell = jQuery("\
							<td class=\"post_ignore\" colspan=\"" + colspan + "\" style=\"padding: none !important\">\
								This thread is hidden because you have chosen to ignore threads by <a id=\"replace\"></a>. \
								<a id=\"unhide_topic_" + removedTopics.length + "\" title=\"View this thread\" style=\"cursor: pointer;\">View it anyway?</a>\
							</td>");
						$newCell.find("#replace").replaceWith($nickname);
						
						$newCell.find("a[id^=unhide_topic_]").click(function() {
							var arrayId = parseInt(jQuery(this).attr('id').replace(/\D+/, ""));
							var $nickname = jQuery(this).parent().find(".___hover___member");
							var $parentNode = jQuery(this).parent().parent();
							
							$parentNode.toggle("fast", function() {
								$parentNode.children().remove();
								$parentNode.append(removedTopics[arrayId]);
								$parentNode.find("#unhide_username_" + arrayId).replaceWith($nickname);
								
								removedTopics[arrayId] = null;
								jQuery(this).toggle("slow");
							});
						});
						
						removedTopics.push(jQuery(this).children().detach());
						jQuery(this).append($newCell);
						jQuery(this).append($modTickbox.clone(true, true));
					}
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// naprawa prostego edytora
		//---------------------------------
		
		function simpleEditor() {
			try {
				if (!(viewing("msgEdit") || viewing("topic") || viewing("privmsg") || viewing("blogView") || viewing("report")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				// http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
				
				function setCaretPosition(ctrl, pos) {
					if(ctrl.setSelectionRange) {
						ctrl.focus();
						ctrl.setSelectionRange(pos,pos);
					}
					else if (ctrl.createTextRange) {
						var range = ctrl.createTextRange();
						range.collapse(true);
						range.moveEnd('character', pos);
						range.moveStart('character', pos);
						range.select();
					}
				}
				
				// to też gdzieś znalezione (przynajmniej część), ale nie pamiętam gdzie
				
				function formatText(e, tagStart, tagEnd) {
					e = jQuery(e).parent().parent().parent().parent().parent().parent().parent().find("textarea.cke_source").get(0);
					var pos = e.value.substring(0, e.selectionStart).length + tagStart.length + e.value.substring(e.selectionStart, e.selectionEnd).length;
					
					if (e.value.substring(e.selectionStart, e.selectionEnd).length != 0) {
						pos += tagEnd.length;
					}
					
					if (e.setSelectionRange) {
						e.value = e.value.substring(0, e.selectionStart)
							+ tagStart
							+ e.value.substring(e.selectionStart, e.selectionEnd)
							+ tagEnd
							+ e.value.substring(e.selectionEnd, e.value.length);
						setCaretPosition(e, pos);
					}
				}
				
				// usuwa tagi z zaznaczenia
				
				function deleteTags(e) {
					e = jQuery(e).parent().parent().parent().parent().parent().parent().parent().find("textarea.cke_source").get(0);
					
					var beforeSelection = e.value.substring(0, e.selectionStart)
					var contentSelection = e.value.substring(e.selectionStart, e.selectionEnd);
					var afterSelection = e.value.substring(e.selectionEnd);
					
					e.value = beforeSelection + contentSelection.replace(/\[[\s\S]+?\]/g, "") + afterSelection;
				}
				
				// sprawdza tryb edytora (żeby nie waliło błędami po przejściu w tryb wizualny)
				
				function checkEditorMode(e) {
					if (jQuery(e).parent().parent().parent().parent().parent().parent().parent().find(".cke_button_removeFormat").attr("class").match("cke_off"))
						return true;
					else
						return false;
				}
				
				// dodaje eventy do guzików
				
				function fixButton(id, name, tagStart, tagEnd, e) {
					var switchId = parseInt(jQuery(e).parent().parent().parent().find(".cke_button_ipssource").attr("id").substring(4), 10);
					var switchIdBase = 6;
					
					var button = jQuery("#cke_" + (switchId - switchIdBase + id));
					button.attr("class", "cke_button_" + name);
					
					if (!button.data("events")) {
						if (tagStart !== null && tagEnd !== null) {
							button.click(function() {
								if (!checkEditorMode(this))
									formatText(this, tagStart, tagEnd);
							});
						}
						else if (name === "ipsemoticon") {
							button.click(function() {
								if (!checkEditorMode(this)) {
									console.info("test");
									var newWindow = window.open("http://gtaforums.com/index.php?app=forums&module=extras&section=legends","Emoticons - GTA Forums","height=600,width=300");
									if (window.focus) {
										newWindow.focus ()
									}
								}
							});
						}
						else {
							button.click(function() {
								deleteTags(this);
							});
						}
					}
				}
				
				// dodaje listy rozwijania do guzików
				
				function fixList(id, name, e) {
					var switchId = parseInt(jQuery(e).parent().parent().parent().find(".cke_button_ipssource").attr("id").substring(4), 10);
					var switchIdBase = 6;
					
					var button = jQuery("#cke_" + (switchId - switchIdBase + id));
					
					if (["font", "fontSize"].indexOf(name) === -1)
						button.attr("class", "cke_button_" + name);
					else
						button.attr("class", "cke_" + name);
					
					if (!button.data("events")) {
						if (name === "textcolor") {
							var resultList = [
								"(none)<span class=\"yojc_tagValue\" style=\"display: none;\"></span>",
								"Black<span class=\"yojc_tagValue\" style=\"display: none;\">black</span>",
								"Blue<span class=\"yojc_tagValue\" style=\"display: none;\">blue</span>",
								"Brown<span class=\"yojc_tagValue\" style=\"display: none;\">brown</span>",
								"Green<span class=\"yojc_tagValue\" style=\"display: none;\">green</span>",
								"Grey<span class=\"yojc_tagValue\" style=\"display: none;\">grey</span>",
								"Orange<span class=\"yojc_tagValue\" style=\"display: none;\">orange</span>",
								"Pink<span class=\"yojc_tagValue\" style=\"display: none;\">pink</span>",
								"Red<span class=\"yojc_tagValue\" style=\"display: none;\">red</span>",
								"White<span class=\"yojc_tagValue\" style=\"display: none;\">white</span>",
								"Yellow<span class=\"yojc_tagValue\" style=\"display: none;\">yellow</span>"
							];
						}
						else if (name === "font") {
							var resultList = [
								"<span class=\"yojc_tagValueOmit\">(none)</span>",
								"<span style=\"font-family: monospace;\">(monospace)</span>",
								"<span style=\"font-family: sans-serif;\">(sans-serif)</span>",
								"<span style=\"font-family: serif;\">(serif)</span>",
								"<span style=\"font-family: arial,helvetica,sans-serif;\">Arial</span>",
								"<span style=\"font-family: calibri,tahoma,geneva,sans-serif;\">Calibri</span>",
								"<span style=\"font-family: comic sans ms,cursive;\">Comic Sans MS</span>",
								"<span style=\"font-family: courier new,courier,monospace;\">Courier New</span>",
								"<span style=\"font-family: consolas,monospace;\">Consolas</span>",
								"<span style=\"font-family: georgia,serif;\">Georgia</span>",
								"<span style=\"font-family: lucida sans unicode,lucida grande,sans-serif;\">Lucida Sans Unicode</span>",
								"<span style=\"font-family: segoe ui,tahoma,geneva,sans-serif;\">Segoe UI</span>",
								"<span style=\"font-family: tahoma,geneva,sans-serif;\">Tahoma</span>",
								"<span style=\"font-family: times new roman,times,serif;\">Times New Roman</span>",
								"<span style=\"font-family: trebuchet ms,helvetica,sans-serif;\">Trebuchet MS</span>",
								"<span style=\"font-family: ubuntu,tahoma,geneva,sans-serif;\">Ubuntu</span>",
								"<span style=\"font-family: verdana,geneva,sans-serif;\">Verdana</span>"
							];
						}
						else if (name === "ipsbbcode") {
							var resultList = [
								"[acronym=]<span class=\"yojc_tagStart\" style=\"display: none;\">[acronym=]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/acronym]</span>",
								"[background=]<span class=\"yojc_tagStart\" style=\"display: none;\">[background=]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/background]</span>",
								"[html]<span class=\"yojc_tagStart\" style=\"display: none;\">[html]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/html]</span>",
								"[hr]<span class=\"yojc_tagStart\" style=\"display: none;\">[hr]</span><span class=\"yojc_tagEnd\" style=\"display: none;\"></span>",
								"[media]<span class=\"yojc_tagStart\" style=\"display: none;\">[media]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/media]</span>",
								"[php]<span class=\"yojc_tagStart\" style=\"display: none;\">[php]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/php]</span>",
								"[post=]<span class=\"yojc_tagStart\" style=\"display: none;\">[post=]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/post]</span>",
								"[spoiler]<span class=\"yojc_tagStart\" style=\"display: none;\">[spoiler]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/spoiler]</span>",
								"[sql]<span class=\"yojc_tagStart\" style=\"display: none;\">[sql]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/sql]</span>",
								"[table]<span class=\"yojc_tagStart\" style=\"display: none;\">[table]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/table]</span>",
								"[td]<span class=\"yojc_tagStart\" style=\"display: none;\">[td]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/td]</span>",
								"[topic=]<span class=\"yojc_tagStart\" style=\"display: none;\">[topic=]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/topic]</span>",
								"[tr]<span class=\"yojc_tagStart\" style=\"display: none;\">[tr]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/tr]</span>",
								"[twitter]<span class=\"yojc_tagStart\" style=\"display: none;\">[twitter]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/twitter]</span>",
								"[xml]<span class=\"yojc_tagStart\" style=\"display: none;\">[xml]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/xml]</span>",
								"[youtube]<span class=\"yojc_tagStart\" style=\"display: none;\">[youtube]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/youtube]</span>"
							];
							var descList = [
								"Inserts an acronym into the post (hover the cursor to show description).\n[acronym=(definition)](acronym)[/acronym]",
								"Puts a background behind the text.\n[background=(bgColor)](text)[/background]</span>",
								"Same as [code], only for HTML.\n[html](tekst)[/html]",
								"Inserts a horizontal line.\n[hr]",
								"Insert a media element (like Flash).\n[media(=size)](link)[/media]",
								"Same as [code], only for PHP.\n[php](text)[/php]",
								"Inserts link to a specific post on GTAForums.\n[post=(postID)](text)[/post]",
								"Inserts hidden content (with Show/Hide button).\n[spoiler](text)[/spoiler]",
								"Same as [code], only for SQL.\n[sql](text)[/sql]",
								"Inserts <table> HTML tag.\n[table]([tr] tags)[/table]",
								"Inserts <td> HTML tag.\n[td](text)[/td]",
								"Insert link to a specific topic on GTAForums.\n[topic=(topicID)](text)[/topic]",
								"Inserts <tr> HTML tag.\n[tr]([td] tags)[/tr]",
								"Inserts link to Twitter account.\n[twitter](nick)[/twitter]",
								"Same as [code], only for XML.\n[xml](text)[/xml]",
								"Inserts YouTube Player.\n[youtube](link)[/youtube]"
							];
						}
						else if (name === "fontSize") {
							var resultList = [
								"(none)",
								"<span style=\"font-size: 8px\">8</span>",
								"<span style=\"font-size: 10px\">10</span>",
								"<span style=\"font-size: 12px\">12 (stand.)</span>",
								"<span style=\"font-size: 14px\">14</span>",
								"<span style=\"font-size: 18px\">18</span>",
								"<span style=\"font-size: 24px\">24</span>",
								"<span style=\"font-size: 36px\">36</span>",
								"<span style=\"font-size: 48px\">48</span>"
							];
						}
						
						var $listContainer = jQuery("<ul/>", {
							id: "topic_reply_" + name + "_menucontent_" + (switchId - switchIdBase + id),
							class: "ipbmenu_content",
							style: "display: none; position: absolute; z-index: 9999;"
						});
						
						jQuery.each(resultList, function(i, e) {
							var $listRow = jQuery("<li/>", {
								style: "z-index: 10000;"
							});
							
							var $listElement = jQuery("<a/>", {
								style: "cursor: pointer; z-index: 10000;",
								html: e
							});
							
							if (name === "textcolor") {
								$listElement.click(function() {
									if (!checkEditorMode(button.get(0)))
										formatText(button.get(0), "[color=" + jQuery(this).find(".yojc_tagValue").text() + "]", "[/color]");
								});
							}
							else if (name === "font") {
								$listElement.click(function() {
									if (!checkEditorMode(button.get(0)))
										formatText(button.get(0), "[font=" + (jQuery(this).find("span").attr("class") === "yojc_tagValueOmit" ? "" : jQuery(this).find("span").css("font-family")) + "]", "[/font]");
								});
							}
							else if (name === "fontSize") {
								$listElement.click(function() {
									if (!checkEditorMode(button.get(0)))
										formatText(button.get(0), "[size=" + (jQuery(this).parent().index() || "") + "]", "[/size]");
								});
							}
							else if (name === "ipsbbcode") {
								$listElement.attr("title", descList[i]);
								
								$listElement.click(function() {
									if (!checkEditorMode(button.get(0)))
										formatText(button.get(0), jQuery(this).find(".yojc_tagStart").text(), jQuery(this).find(".yojc_tagEnd").text());
								});
							}
							
							$listRow.append($listElement);
							$listContainer.append($listRow);
						});
						
						jQuery("body").append($listContainer);
						
						var nickMenu = new ipb.Menu( button.get(0), $("topic_reply_" + name + "_menucontent_" + (switchId - switchIdBase + id)), { stopClose: false } );
					}
				}
				
				// naprawia wszystko
				
				function fixAllButtons(e) {
					jQuery("textarea.cke_source:not(*.yojcDone)").each(function() {
						if (jQuery(this).parent().attr("id") === "cke_contents_commentFastReply") {
						
							fixButton(7, "removeFormat", null, null, this);
							
							fixButton(9, "bold", "[b]", "[/b]", this);
							fixButton(10, "italic", "[i]", "[/i]", this);
							fixButton(11, "underline", "[u]", "[/u]", this);
							fixButton(12, "strike", "[s]", "[/s]", this);
							
							fixList(15, "font", this);
							fixButton(14, "bulletedlist", "[list][*]", "[/list]", this);
							fixList(18, "textcolor", this);
							
							fixButton(20, "link", "[url=", "][/url]", this);
							fixButton(21, "unlink", "[url]", "[/url]", this);
							fixButton(22, "image", "[img]", "[/img]", this);
							
							fixButton(24, "code", "[code]", "[/code]", this);
							fixButton(25, "quote", "[quote]", "[/quote]", this);
							
							jQuery(this).addClass("yojcDone");
						}
						else {
							fixButton(7, "removeFormat", null, null, this);
							
							fixList(8, "ipsbbcode", this);
							fixList(10, "font", this);
							fixList(11, "fontSize", this);
							fixList(13, "textcolor", this);
							
							fixButton(14, "ipsemoticon", null, null, this);
							
							fixButton(32, "bold", "[b]", "[/b]", this);
							fixButton(33, "italic", "[i]", "[/i]", this);
							fixButton(34, "underline", "[u]", "[/u]", this);
							fixButton(35, "strike", "[s]", "[/s]", this);
							
							fixButton(37, "subscript", "[sub]", "[/sub]", this);
							fixButton(38, "superscript", "[sup]", "[/sup]", this);
							
							fixButton(40, "bulletedlist", "[list][*]", "[/list]", this);
							fixButton(41, "numberedlist", "[list=1][*]", "[/list]", this);
							
							fixButton(43, "link", "[url=", "][/url]", this);
							fixButton(44, "unlink", "[url]", "[/url]", this);
							fixButton(45, "image", "[img]", "[/img]", this);
							
							fixButton(46, "code", "[code]", "[/code]", this);
							fixButton(47, "quote", "[quote]", "[/quote]", this);
							
							fixButton(52, "indent", "[indent=1]", "[/indent]", this);
							fixButton(53, "justifyleft", "[left]", "[/left]", this);
							fixButton(54, "justifycenter", "[center]", "[/center]", this);
							fixButton(55, "justifyright", "[right]", "[/right]", this);
							
							jQuery(this).addClass("yojcDone");
						}
					});
				}
				
				
				jQuery("body").click(fixAllButtons);
				
				var $script = jQuery("<script/>", {
					type: "text/javascript",
					text: fixButton + formatText + setCaretPosition + deleteTags
				})
				jQuery("body").append($script);
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// rozwijanie całych spoilerów
		//---------------------------------
		
		function toggleSpoiler() {
			try {
				if (!(viewing("topic") || viewing("privmsg") || viewing("msgEdit") || viewing("report") || viewing("profile")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				jQuery(".bbc_spoiler_show:not(.bbc_spoiler_wrapper *)").each(function() {
					var e = jQuery(this);
					
					var $button = jQuery("<input/>", {
						type: "button",
						value: "All",
						style: "width: 45px; font-size: 0.7em; margin: 0 0 0 5px; padding: 0;"
					});
					
					e.after($button);
					
					$button.click(function() {
						if (this.value === "All") {
							jQuery(this).parent().find(".bbc_spoiler_content").attr("style", "");
							jQuery(this).parent().find(".bbc_spoiler_show[value=Show]").val("Hide");
							this.value = "None";
						}
						else {
							jQuery(this).parent().find(".bbc_spoiler_content").attr("style", "display: none;");
							jQuery(this).parent().find(".bbc_spoiler_show[value=Hide]").val("Show");
							this.value = "All";
						}
					});
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// pokazywanie/ukrywanie sygnatur/reputacji
		//---------------------------------
		
		function toggleSigRep() {
			try {
				if (!(viewing("topic") || viewing("privmsg") || viewing("profile") || viewing("mostRep") || viewing("blogView")))
					return;
				
				function toggleMain(prefix, text, target) {
					function toggle() {
						var labels = ["Show " + text, "Hide " + text]
						var $toggleButton = jQuery("#" + prefix + "Button");
						var $sigList = jQuery(target);
						
						if ($sigList && $toggleButton.text() === labels[0]) {
							$sigList.each(function() {
								jQuery(this).attr("style", "display: block !important");
							});
							$toggleButton.html(labels[1]);
						}
						else if ($sigList && $toggleButton.text() === labels[1]) {
							$sigList.each(function() {
								jQuery(this).attr("style", "display: none !important");
							});
							$toggleButton.html(labels[0]);
						}
					}
					
					var $toggleButton = jQuery("<a/>", {
						id: prefix + "Button",
						style: "padding-right: 20px; cursor: pointer;",
						text: "Hide " + text
					});
					
					var $container = jQuery("<li/>", {
						id: "logout"
					});
					$container.append($toggleButton);
					
					jQuery("#logout").eq(0).before($container);
					
					$toggleButton.click(toggle);
					toggle();
				}
				
				if (shouldItRun("toggleSig") && !(viewing("profile") || viewing("mostRep") || viewing("blogView"))) {
					debug("toggleSig");
					toggleMain("sig", "sigs", ".signature, .signature_outer");
				}
				
				if (shouldItRun("toggleRep") && !viewing("privmsg")) {
					debug("toggleRep");
					toggleMain("rep", "rep", ".reputation, div.rep_bar > ul.ipsList_inline, p.rep_highlight, .ipsLikeBar");
				}
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// move flags & medals
		//---------------------------------
		
		function moveFlagsNMedals() {
			try {
				if (!(viewing("topic") || viewing("privmsg") || viewing("profile") || viewing("mostRep") || viewing("blogView")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				jQuery("li > img[src^=\\/public\\/style_images\\/flags\\/]").each(function() {
					if (forumSkin === "GTAForums 2013")
						jQuery(this).parent().parent().prev().find("h5").prepend(jQuery(this));
					else
						jQuery(this).parent().parent().find("h5").prepend(jQuery(this));
					jQuery(this).css("margin-top", "-4px");
					jQuery(this).next().find("*[itemprop=name]").prepend(" ");
				});
				
				jQuery("li > #awards > .award > img").each(function() {
					jQuery(this).attr("title", jQuery(this).next().text().trim());
					jQuery(this).css("margin-left", "3px");
					
					if (forumSkin === "GTAForums 2013")
						jQuery(this).parent().parent().parent().parent().prev().find("h5").append(jQuery(this));
					else
						jQuery(this).parent().parent().parent().parent().find("h5").append(jQuery(this));
					
					jQuery(this).next().find("*[itemprop=name]").append(" ");
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// wyłączanie Lightboxa
		//---------------------------------
		
		function turnOffLightbox() {
			try {
				if (!(viewing("topic") || viewing("privmsg") || viewing("msgEdit") || viewing("report") || viewing("profile") || viewing("blogView")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				jQuery("a[id^=ipb-attach-url], *[rel=lightbox]").attr("rel", "");
				
				jQuery("img.bbc_img").each(function() {
					if (this.parentNode.tagName !== "A")
						jQuery(this).attr("style", "cursor: default !important;");
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// chowanie kodu
		//---------------------------------
		
		function toggleCode() {
			try {
				if (!(viewing("topic") || viewing("privmsg") || viewing("msgEdit") || viewing("report") || viewing("profile") || viewing("blogView")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				jQuery(".prettyprint").hide();

				var $showButton = jQuery("<pre/>", {
					class: "prettyprint",
					style: "cursor: pointer",
					text: "Click to show the contents"
				});

				$showButton.click(function() {
					jQuery(this).fadeOut("fast", function() {
						jQuery(this).next().fadeToggle();
						jQuery(this).remove();
					});
				});

				jQuery(".prettyprint").before($showButton);
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// zwijanie cytatów
		//---------------------------------
		
		function toggleQuote() {
			try {
				if (!(viewing("topic") || viewing("privmsg") || viewing("msgEdit") || viewing("report") || viewing("profile") || viewing("blogView")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				jQuery(".citation").each(function() {
					var button = jQuery("<a/>", {
						class: "quoteToggle",
						text: " (hide quote)",
						style: "cursor: pointer;"
					});
					
					button.click(function() {
						if (this.innerHTML == " (hide quote)") {
							jQuery(this).parent().fadeTo("slow", 0.3);
							this.innerHTML = " (show quote)";
						}
						else if (this.innerHTML == " (show quote)") {
							jQuery(this).parent().fadeTo("slow", 1);
							this.innerHTML = " (hide quote)";
						}
						
						jQuery(this).parent().next().fadeToggle();
					});
					
					jQuery(this).append(button);
				});
				
				if (viewing("report"))
					var base = ".ipsBlockquote .ipsBlockquote .ipsBlockquote";
				else
					var base = ".ipsBlockquote .ipsBlockquote";
				
				jQuery(base + ":not(" + base + " .ipsBlockquote)").each(function() {
					jQuery(this).prev().find("a.quoteToggle").click();
					jQuery(this).hide();
					jQuery(this).prev().fadeTo(0, 0.3);
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// koipiowanie nicków do schowka
		//---------------------------------
		
		function copyNick() {
			try {
				if (!(viewing("topic") || viewing("profile")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				function appendList(count) {
					// niestety IPB się wysypuje przy próbie podpięcia tej samej listy do wielu elementów (menu otwiera się i znika)
					// więc musi być to zrobione tak ciulowo (bo tak to jedna lista by wystarczyła), chyba, że masz lepszy pomysł
					for (var i=0; i<count; i++) {
						var tmpNick = "<span class=\"yojc_copyNick\" style=\"display: none;\">dupa</span>";
						var resultList = [
							"Nick only" + tmpNick + "",
							"@[b][member=" + tmpNick + "][/b]: ",
							"[b][member=" + tmpNick + "][/b]",
							"[member=" + tmpNick + "]"
						];
						
						var $listContainer = jQuery("<ul/>", {
							id: "topic_user_nick_menucontent_" + i,
							class: "ipbmenu_content",
							style: "display: none; position: absolute; z-index: 9999;"
						});
						
						jQuery.each(resultList, function(i, e) {
							var $listRow = jQuery("<li/>", {
							style: "z-index: 10000;"
							});
							
							var $listElement = jQuery("<a/>", {
								style: "cursor: pointer; z-index: 10000;",
								html: e
							});

							$listElement.click(function() {
								prompt("Copy to clipboard (Ctrl + C):", this.textContent.replace("Nick only", ""));
							});
							
							$listRow.append($listElement);
							$listContainer.append($listRow);
						});
						
						jQuery("body").append($listContainer);
					}
				}
				
				if (viewing("topic")) {
					
					appendList(jQuery(".group_title").length);
					
					try {
						jQuery(".group_title").each(function(i, e) {
							var nickMenu = new ipb.Menu(this, $("topic_user_nick_menucontent_" + i), { stopClose: false });
						});
					}
					catch (err) {
					}
					
					jQuery(".group_title").css("cursor", "pointer");
					
					jQuery(".group_title").click(function() {
						var nick = jQuery(this).parent().prev().text().trim();
						jQuery(".yojc_copyNick").html(nick);
					});
				}
				else if (viewing("profile")) {
					appendList(1);
					
					var nickMenu = new ipb.Menu(jQuery(".ipsBadge.reset_cursor").get(0), $("topic_user_nick_menucontent_0"), { stopClose: false });
					
					jQuery(".yojc_copyNick").html(jQuery(".ipsType_pagetitle > .fn.nickname").text());
					jQuery(".yojc_copyId").html(window.location.href.match(/\user\/(\d+)/)[1]);
					
					jQuery(".ipsBadge.reset_cursor").css("cursor", "pointer");
				}
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		// jedziemy z koksem
		debug("yojo's SuperScript");
		debug("If \"End\" doesn't come up in the console, then something's screwed up");
		
		createLinkToPanel();
		createSettingsPanelTab();
		createSettingsPanel();
		
		setTimeout(function(){ignoreTopics()}, 100);
		setTimeout(function(){toggleQuote()}, 100);
		
		showPostsPerDay();
		colorNick();
		hideForums(null);
		showSubforums(null);
		toggleSpoiler();
		toggleSigRep();
		simpleEditor();
		turnOffLightbox();
		toggleCode();
		copyNick();
		moveFlagsNMedals();
		
		debug("End");
	}
	
	doStuff();
})();