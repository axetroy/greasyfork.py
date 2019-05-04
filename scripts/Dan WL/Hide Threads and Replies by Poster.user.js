// ==UserScript==
// @author https://greasyfork.org/en/users/85040-dan-wl-danwl
// @name Hide Threads and Replies by Poster
// @namespace daniel.church@btinternet.com
// @grant none
// @match https://www.warzone.com/*
// @description Hides threads based on the player(s) that posted the thread or replied. Applies to all sub-forums, your Clan forum and your Mail. Also applies to individual threads.
// @version 2.3.2
// @require https://greasyfork.org/scripts/39985-prank-lib/code/Prank%20Lib.js?version=261562
// ==/UserScript==
var v = '2.3.2';

console.log("Hide threads and replies by poster version: " + v);

/*
First released on 8/12/2016 see https://www.warzone.com/Forum/222938-dans-userscript-hide-threads-replies-poster for evidence.

localStorage.DanHTRBP_version_changes = "Fixed most warnings detected by jshint.com and added validation to downvoteAllSpamPosts";

minor done features that could be improved:
made prompts auto-focus (mouse has to be over popup)

To do:
fix conflicts with muli's userscript - threadExceptionsHiddenThreadsContainer display inline
Somehow I have always felt the need for a button "Blacklist and Hide Threads/post by players from <INSERT CLAN ID HERE>". - support ids from all clan members and get clan id

make arrow keys and tab select buttons
make it possible to add players by profile numbers?
make threads use ids instead of names?
*/

function get(url, successCallback, failureCallback)
{
	//doesn't bypass CORS, must use http: or https: protocol
	if (typeof url != 'string') {return;}

	let xhttp = new XMLHttpRequest();//most browsers

	if (!xhttp && ActiveXObject)
	{
		xhttp = new ActiveXObject('Microsoft.XMLHTTP');//below IE 7
	}

	let successCallbackIsFunction = typeof successCallback == 'function';
	let failureCallbackIsFunction = typeof failureCallback == 'function';

	if (!xhttp)
		return;

	xhttp.onreadystatechange = function()
	{
		if (this.readyState == 4)
		{
			let status = this.status;
			let goodStatuses = [200, 304];//ok, not modified https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

			console.log('xhttp status = ' + status);

			if (goodStatuses.indexOf(status) > -1)
			{
				if (successCallbackIsFunction) {successCallback(this);}
			}
			else
			{
				console.log('get status not OK; request = ');
				console.log(this);

				if (failureCallbackIsFunction) {failureCallback(this);}
			}
		}
	};
	xhttp.open('GET', url, true);
	xhttp.send();
}

//some required global variables
var $, dom, css, string, onPage, types, download;
let h, genF, mapF, ladF, progF, helpF, OTF, clansF, stratF, subForum, allF, threadP, discussionP, mail, clanF, onProfile;

(function()
{
	//main init
	get('https://danwlgames.000webhostapp.com/scripts/frameworks/frameworks.min.js', function(xhttp)
	{
		if (!xhttp) {return;}

		let script = document.createElement('script');

		script.innerHTML = xhttp.responseText;//using script src doesn't execute in FF61 but using in-line script does 
		document.head.appendChild(script);

		let getHelperFrameworks = function(callback)
		{
			//wait for helper functions to load
			console.log('init getHelperFrameworks');
			let capitalise = window.capitalise;
			let escapeRegExpChars = window.escapeRegExpChars;
			dom = window.dom;
			let easyDOMLoaded = dom && escapeRegExpChars && capitalise;
			let getOccurenceOfChar = window.getOccurenceOfChar;
			css = window.css;
			let addCssLoaded = css && getOccurenceOfChar;
			$ = window.$;
			runSlides = window.RunSlides;
			runTabelSorter = window.RunTabelSorter;
			types = window.types;
			download = window.download;

			if (!(easyDOMLoaded && addCssLoaded && $ && runSlides && runTabelSorter && types && download))
			{
				return setTimeout(function(){getHelperFrameworks(callback);}, 500);
			}
			console.log(callback);
			if (typeof callback != 'function') {return;}

			string =
			{
				capitalise: capitalise,
				escapeRegExpChars: escapeRegExpChars,
				getOccurenceOfChar: getOccurenceOfChar
			};
			onPage = function(windowLocation, _window)
			{
				if (typeof windowLocation != 'string')
				{
					throw 'onPage windowLocation not a string; is ' + JSON.stringify(windowLocation);
				}
				if (!(_window instanceof Window))
				{
					_window = window;
				}

				return _window.location.href.match(new RegExp(escapeRegExpChars(windowLocation)));
			};

			types.removePrefix();//types.js exports all in an object called types, this makes everything accessible in the global window object

			callback();
		};

		getHelperFrameworks(readyToGo);
	});
})();

function readyToGo()
{
	try{
		if (!localStorage)
		{
			throw "Your browser doesn't support localStorage. Upgrade to modern browser such as Firefox or Chrome.";
		}
	}catch(err){console.log(err);}

	localStorageChecks();//perform the checks

	h = location.href,
	genF = h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Forum/f1'), 'i')),
	mapF = h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Forum/f4'), 'i')),
	ladF = h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Forum/f5'), 'i')),
	progF = h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Forum/f6'), 'i')),
	helpF = h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Forum/f7'), 'i')),
	OTF = h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Forum/f8'), 'i')),
	clansF = h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Forum/f9'), 'i')),
	stratF = h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Forum/f10'), 'i')),
	subForum = genF || mapF || ladF || progF || helpF || OTF || clansF || stratF,
	allF = h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Forum/forum'), 'i')),
	threadP =  h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Forum/') + '\\d', 'i')),
	discussionP = h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Discussion/?ID=') + '\\d', 'i')),
	mail =  h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Discussion/MyMail'), 'i')),
	clanF = h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Clans/Forum'), 'i')),
	onProfile = h.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/profile?p=') + '\\d', 'i'));

	if (stratF && genF)
	{
		//fixes bug that makes the script think your currently on the general forum when your actually on the strategy forum
		genF = false;
	}
	try{
	document.body.onkeyup = function(e)
	{
		var key = e.keyCode || e.which;

		if (key === 13 || key === 27)
		{
			//if enter or esc do default action
			ui.CallFocusedUIAction();
		}
	};
	}catch(err){HandelErr(err);}

	GetSavedPlayerData();

	PlayersToP();
	threadsToT();
	_threadsTo_t();

	if (!window.updating_player_data)
	{
		ui.build();
		ui.createOverlays();
	}

	var ddM = document.getElementById('AccountDropDown');

	if (ddM)
	{
		ddM = ddM.nextElementSibling;
	}

	if (ddM)
	{
		try{
		//create a settings button
		settings_btn.id = 'DansUserscriptBtn';
		settings_btn.innerHTML = "Dan's Userscript";
		settings_btn.className = 'dropdown-item';
		settings_btn.href = '#';
		settings_btn.onclick = function()
		{
			ui.show();
		};

		var settings_btn_divider = document.createElement('div');

		settings_btn_divider.className = 'dropdown-divider';

		//find the drop down divider an insert the settings btn before it
		dom.nodeListToArray(ddM.children).forEach(function(ddM_child)
		{
			if (ddM_child.className === 'dropdown-divider')
			{
				return dom.append([settings_btn_divider, settings_btn], [ddM_child.nextElementSibling, settings_btn_divider], 'afterend');
			}
		});
		}catch(err){HandelErr(err);}
	}

	var Hide_Show_Threads = css.addCss(['.detail_hidden, .detail_blank, .OT_hidden', ['display', 'none !important'], '.detail_shown', ['display', 'table' + detailShownRules + ' !important'], '.OT_shown', ['display', 'table-row !important'], '.detail_shown .sub-forum, .detail_shown td[valign="middle"], .OT_shown .sub-forum, .OT_shown td[valign="middle"]', ['text-decoration', 'line-through'], '.detail_good', ['display', 'table-row !important'], ['text-decoration', 'none !important']])[0];

	Hide_Show_Threads.id = 'Hide_Show_Threads';
	Hide_Show_Threads.className = 'Dan_Style';

	css.addCss(['.round_btn', ['border-radius', '13px']])[0].className = 'Dan_Style';

	runHideThreadsAndRepliesMain();

	if (!updating_settings_to_work_with_2point3 && !window.updating_player_data)
	{
		CreateUIForSubForumsAllForumsMailAndClanForum();
		CreateAddToBlocklistBtnOnProfile();
		CreateAddToThreadExceptionsHiddenThreadsOnThread();
	}

	//makes blanked-out links visible globally by replacing the link's innerHTML with [blank name]
	fixBlank(document.getElementsByTagName('a'), '[blank name]', true);

	var CanUpdateHTRPThread = true;
	//if not signed in as Dan, don't allow updating the thread with the changes if the are changes
	if (!IsUser(9522268564) || !localStorage.DanHTRBP_version_changes)
	{
		CanUpdateHTRPThread = false;
	}

	if (CanUpdateHTRPThread)
	{
		runUpdateThread();
	}

	setupXmas();
}

const blankCharsRe = /(\uA0|\uAD|\u2DE|\u00AD|\u02DE|\u1361|\u1680|\u180E|\u2000|\u2001|\u2002|\u2003|\u2004|\u2005|\u2006|\u2007|\u2008|\u2009|\u200A|\u200B|\u202F|\u205F|\u2800|\u3000|\u3164|\uFEFF)/i;

function RemoveLocalStorageItem(key)
{
	//localStorage.removeItem doesn't work in Chrome - https://stackoverflow.com/questions/46131249/localstorage-cannot-be-removed-in-chrome
	if (typeof key !== 'string')
	{
		return;
	}
	if (!localStorage.getItem(key))
	{
		return;
	}

	localStorage.setItem(key, '');
	localStorage.removeItem(key);
}

var userscripts =
{
	mulis: function()
	{
		return window.MULIS_USERSCRIPT;
	}
};

function IsUser(player_numbers)
{
	var ret = false;
	var AccountDropDown = document.getElementById('AccountDropDown');

	if (AccountDropDown)
	{
		var AccountDropDownPlayerNumber = parseInt(AccountDropDown.nextElementSibling.firstElementChild.href.match(/\d/g).toString().replace(/[^\d]/g, ''));

		if (typeof player_numbers === 'number')
		{
			ret = player_numbers === AccountDropDownPlayerNumber;
		}
		else
		{
			for (var p_num_counter = 0; p_num_counter < player_numbers.length; p_num_counter++)
			{
				if (AccountDropDownPlayerNumber === player_numbers[p_num_counter])
				{
					ret = true;
					break;
				}
			}
		}
	}

	return ret;
}

function Mail(msg, subject, create_new_pm)
{
	if (!subject)
	{
		subject = 'Hide Threads and Replies by Poster Errors';
	}

	var player_to_send_msg_to = 222685;

	if (IsUser(9522268564))
	{
		player_to_send_msg_to = 278245;
	}

	if (!localStorage.DanHTRBP_MailId || create_new_pm)
	{
		var MailPage = open('https://www.warzone.com/Discussion/SendMail?PlayerID=' + player_to_send_msg_to);

		MailPage.onload = function()
		{
			MailPage.document.getElementById('SubjectBox').value = subject;
			MailPage.document.getElementById('TextArea_0').innerHTML = msg;
			window.old_location = MailPage.location.href;
			var check_if_pm_loaded = setInterval(function(){GetPmId();}, 1000);//page.onload isn't triggered when mail is sent
			var GetPmId = function()
			{
				window.new_location = MailPage.location.href;

				if (window.old_location !== window.new_location)
				{
					clearInterval(check_if_pm_loaded);
					if (!create_new_pm)
					{
						localStorage.DanHTRBP_MailId = window.new_location.replace(/[^\d]/g, '');
					}
					window.old_location = undefined;
					window.new_location = undefined;
					MailPage.close();
				}
			};

			MailPage.document.getElementById('SubmitPostBtn_0').click();
		};

		return;
	}

	var MailPage = open('https://www.warzone.com/Discussion/?ID=' + localStorage.DanHTRBP_MailId);

	MailPage.onload = function()
	{
		MailPage.document.getElementById('TextArea_-1').value = msg;
		MailPage.document.getElementById('SubmitPostBtn_-1').click();
		MailPage.close();
	};
}

var ui =
{
	CallFocusedUIAction: function()
	{
		var DefaultAction = ui.focusedUiPopup;

		if (DefaultAction)
		{
			DefaultAction = DefaultAction.defaultAction;
		}
		if (typeof DefaultAction === 'function')
		{
			DefaultAction();
		}
	},
	CreateOverlay: function(zIndex)
	{
		var overlay = document.createElement('div');

		overlay.className = 'overlay';

		if (zIndex)
		{
			overlay.style.zIndex = zIndex;
		}

		overlay.onclick = function(){ui.CallFocusedUIAction();};

		document.body.appendChild(overlay);

		return overlay;
	},
	createOverlays: function()
	{
		try{
		//whole UI overlay
		if (document.getElementsByClassName('overlay').length === 0)
		{
			//if an overlay doesn't exist, create one and style it
			this.CreateOverlay();
		}

		document.getElementsByClassName('overlay')[0].id = 'mainOverlay';
		}catch(err){HandelErr(err);}
	},
	disableButtons: function()
	{
		try{
		var btns_that_can_be_disabled = document.getElementsByClassName('CanBeDisabled');
		var btn;
		var condition;

		for (var btns_that_can_be_disabled_counter = 0; btns_that_can_be_disabled_counter < btns_that_can_be_disabled.length; btns_that_can_be_disabled_counter++)
		{
			btn = btns_that_can_be_disabled[btns_that_can_be_disabled_counter];

			if (btns_that_can_be_disabled_counter === 0)
			{
				condition = true;
				//it's impossible to not have any players on the Blocklist
			}
			else if (btns_that_can_be_disabled_counter === 1)
			{
				condition = localStorage.threads.match(/,/);
			}
			else
			{
				condition = localStorage._threads.match(/,/);
			}

			if (condition)
			{
				btn.disabled = false;
				btn.style.cursor = "";
			}
			else
			{
				btn.disabled = true;
				btn.style.cursor = 'not-allowed';
			}
		}
		}catch(err){HandelErr(err);}
	},
	AddLayer: function(layerNo)
	{
		try{
		layerNo = 10001 + layerNo;

		this.CreateOverlay(layerNo);

		var new_layer = document.createElement('div');

		new_layer.className = 'SettingMenu';
		new_layer.style.zIndex = layerNo + 1;
		//ok and close popup this.AddEnterEvent(new_layer, );
		document.body.appendChild(new_layer);
		return new_layer;
		}catch(err){HandelErr(err);}
	},
	focusedUiPopup: undefined,
	canChangeFocusedUiPopup: true,
	popupThatWantsToBeShown: undefined,
	ShowLayer: function(ui_popup)
	{
		this.popupThatWantsToBeShown = ui_popup;//remember which popup to show after detecting a bug

		if (ui.canChangeFocusedUiPopup)
		{
			//in try-catch blocks, the report bug ui is sometimes taken out of focus
			this.focusedUiPopup = ui_popup;
		}

		ui_popup.previousElementSibling.style.display = 'block';
		ui_popup.style.display = 'block';

		if (window.onresize)
		{
			window.onresize();
		}
	},
	HideLayer: function(ui_popup_to_hide, ui_popup_to_show)
	{
		ui_popup_to_hide.style.display = "";
		ui_popup_to_hide.previousElementSibling.style.display = "";

		if (ui_popup_to_show === undefined)
		{
			ui_popup_to_show = document.getElementById('config_dan_userscript');
		}

		this.focusedUiPopup = ui_popup_to_show;
	},
	functions_to_call: false,
	keypressed: false,
	AddEnterEvent: function(element, function_to_call, preventDefault)
	{
		var main = function(e)
		{
			if (ui.keypressed)
			{
				//prevent spam enter
				return;
			}

			ui.keypressed = true;

			var key = e.which || e.keyCode;

			if (key === 13)
			{
				if (preventDefault)
				{
					e.preventDefault();
				}

				function_to_call();
				ui.keypressed = false;
			}
		};

		element.onkeypress = function(e){main(e);};
		element.onkeydown = function(e){main(e);};
	},
	AddFocus: function(input, popup)
	{
		input.focus();
		popup.onmouseenter = function()
		{
			input.focus();
		};
	},
	MsgBox: function(type, msg_txt, title_txt, layerNo, popup_to_focus)
	{
		try{
		var _ui = document.getElementById(type + '_ui');
		var title = document.getElementById(type + '_ui_title');
		var msg = document.getElementById(type + '_ui_msg');

		if (!title_txt)
		{
			title_txt = '';
		}
		if (!layerNo)
		{
			layerNo = 1;
		}

		if (!_ui)
		{
			_ui = this.AddLayer(layerNo);
			_ui.id = type + '_ui';

			title = document.createElement('h2');
			title.id = type + '_ui_title';

			msg = document.createElement('p');
			msg.id = type + '_ui_msg';

			var btn_container = document.createElement('div');

			btn_container.className = 'FlexContainer';

			dom.append([title, msg, btn_container], _ui);

			var call_function = function(function_no)
			{
				//calls functions after an input for a ui.Confirm or ui.Prompt has been submitted
				var function_array_instance = ui.functions_to_call[function_no];

				if (typeof ui.functions_to_call === 'function' && function_no === 0)
				{
					ui.functions_to_call();
				}
				else if (typeof function_array_instance === 'function')
				{
					function_array_instance();
				}
			};
			var yes_no_close_btns;

			if (type === 'confirm')
			{
				yes_no_close_btns = this.MakeBigBlueBtns(['Yes', 'No'], btn_container); 

				var yes_btn = yes_no_close_btns[0];

				yes_btn.className += ' Darkblue';
				yes_btn.onclick = function()
				{
					ui.HideLayer(_ui, popup_to_focus);
					call_function(0);
				};

				var no_btn = yes_no_close_btns[1];

				no_btn.className += ' Darkblue';
				no_btn.onclick = function()
				{
					ui.HideLayer(_ui, popup_to_focus);
					call_function(1);
				};

				_ui.defaultAction = function(){no_btn.click();};
			}
			else
			{
				var text_input = document.createElement('input');

				if (type === 'prompt')
				{
					text_input.type = 'text';
					btn_container.insertAdjacentElement('beforebegin', text_input);
				}

				yes_no_close_btns = this.MakeBigBlueBtns(['Close'], btn_container)[0];
				yes_no_close_btns.className += ' Darkblue';

				if (type === 'prompt')
				{
					var OkClicked = function()
					{
						_ui.value = text_input.value;
						ui.HideLayer(_ui);
						call_function(0);
					};

					yes_no_close_btns.innerHTML = 'OK';
					yes_no_close_btns.style.width = '100%';
					yes_no_close_btns.onclick = function()
					{
						OkClicked();
					};
					ui.AddEnterEvent(text_input, OkClicked, true);
					ui.AddFocus(text_input, _ui);
					_ui.defaultAction = (function(){text_input.focus();});
				}
				else
				{
					yes_no_close_btns.onclick = function(){ui.HideLayer(_ui);};
					_ui.defaultAction = function(){ui.HideLayer(_ui);};
				}
			}
		}
		else
		{
			if (type === 'prompt')
			{
				//reset the prompt's value;
				_ui.value = '';
				document.getElementById('prompt_ui_msg').nextElementSibling.value = '';
			}
		}
		//bring the ui to the front
		_ui.style.zIndex = 100002 + layerNo;
		_ui.previousElementSibling.style.zIndex = 100001 + layerNo;

		title.innerHTML = capitalise(title_txt);
		msg.innerHTML = msg_txt;

		this.ShowLayer(_ui);
		return _ui;
		}catch(err){HandelErr(err);}
	},
	Alert: function(msg_txt, title_txt, layerNo)
	{
		return this.MsgBox('alert', msg_txt, title_txt, layerNo);
	},
	AlertErr: function(msg_txt, title_txt)
	{
		if (!title_txt)
		{
			title_txt = '';
		}

		return this.Alert(msg_txt, title_txt, 999);
	},
	Confirm: function(msg_txt, functions_to_call, title_txt, layerNo, popup_to_focus)
	{
		ui.functions_to_call = functions_to_call;

		var confirmMsgBox = this.MsgBox('confirm', msg_txt, title_txt, layerNo, popup_to_focus);

		ui.focusedUiPopup = confirmMsgBox;
		ui.popupThatWantsToBeShown = confirmMsgBox;

		return confirmMsgBox;
	},
	Prompt: function(msg_txt, function_to_call, title_txt, layerNo)
	{
		ui.functions_to_call = function_to_call;
		return this.MsgBox('prompt', msg_txt, title_txt, layerNo);
	},
	CreateForm: function(keyName, container, mode)
	{
		var new_form = dom.create('form', 0, 0, container);

		new_form.name = keyName + '_form';

		return new_form;
	},
	CreateCheckboxes: function(form, values, labels)
	{
		if (!labels)
		{
			labels = values;
		}	
		if (typeof values === 'string' && typeof labels === 'string')
		{
			//turn values and values into an array - easier for looping
			values = [values];
			labels = [labels];
		}
		else if (!Array.isArray(values) || !Array.isArray(labels))
		{
			return;
		}
		if (values.length !== labels.length)
		{
			return;
		}

		var all_checkboxes = [];
		var label;
		var input;
		var input_value;

		for (var n = 0; n < values.length; n++)
		{
			label = document.createElement('label');
			input = document.createElement('input');
			input_value = values[n];

			label.htmlFor = input_value;
			label.innerHTML = labels[n] + '&nbsp;';
			input.type = 'checkbox';
			input.value = input_value;
			input.id = input_value;

			dom.append([label, input, document.createElement('br')], form);

			all_checkboxes.push(input);
		}

		return all_checkboxes;
	},
	CreateInputs: function(keyName, form, mode, what_to_add_remove, players_add_type)
	{
		try{
		var local_storage_items_list = localStorage.getItem(keyName).split(',');
		var local_storage_item;
		var remove = mode === 'remove';
		var label;
		var input;
		var spacer;
		var listing_threads = keyName !== 'Players';

		if (remove)
		{
			for (var i = 0; i < local_storage_items_list.length; i++)
			{
				if (!(listing_threads && i === 0))
				{
					//first item for threads and _threads is an item that shouldn't be removed because if it was removed then all threads would be hidden
					local_storage_item = local_storage_items_list[i];

					label = document.createElement('label');
					label.htmlFor = local_storage_item;

					if (keyName === 'Players')
					{
						//link the player
						label.innerHTML = '<a href = "https://www.warzone.com/profile?p=' + ConvertPlayerIdToPlayerNumber(local_storage_item) + '">' + local_storage_item + ' - ' + ConvertPlayerIdToPlayerName(local_storage_item) + '</a>';
					}
					else
					{
						label.innerHTML = local_storage_item;
					}

					label.innerHTML += '&nbsp;';

					input = document.createElement('input');
					input.type = 'checkbox';
					input.id = local_storage_item;
					input.value = local_storage_item;

					spacer = document.createElement('br');

					dom.append([label, input, spacer], form);
				}
			}
		}
		else
		{
			input = document.createElement('input');

			var placeholder_value = capitalise(what_to_add_remove);

			placeholder_value = placeholder_value.substring(0, placeholder_value.length - 1) + ' ';

			if (keyName === 'Players')
			{
				placeholder_value += players_add_type;
			}
			else
			{
				placeholder_value += 'subject';
			}

			input.type = 'text';
			input.name = 'add_threads_new_thread_input';
			input.placeholder = placeholder_value + '...';

			var playerDataList;
			var playerData = player_data;

			if (keyName === 'Players')
			{
				//suggests players - can't do player links accurately
				playerDataList = document.createElement('datalist');

				if (players_add_type === 'name')
				{
					playerData = playerData.names;
					input.setAttribute('list', 'playernames');
					playerDataList.id = 'playernames';
				}
				else if (players_add_type === 'id')
				{
					playerData = playerData.ids;
					input.setAttribute('list', 'playerids');
					playerDataList.id = 'playerids';
				}

				playerDataList.style.display = 'none';//some browsers don't support datalist
				playerDataList.innerHTML = TurnPlayerDataToDataListOptions(playerData);
			}

			var add_another_btn = this.CreateOkBtn(form);

			add_another_btn.value = 'Add another';
			add_another_btn.onclick = function()
			{
				ui.ValidateThreadOrPlayerInput(input, keyName, 0, players_add_type);
			};
			ui.AddEnterEvent(input, function()
			{
				ui.ValidateThreadOrPlayerInput(input, keyName, 0, players_add_type);
			}, true);

			form.appendChild(input);

			if (playerDataList)
			{
				form.appendChild(playerDataList);
			}

			dom.append([document.createElement('br'), add_another_btn, document.createElement('br')], form);
		}

		return input;
		}catch(err){HandelErr(err);}
	},
	GetCheckedItems: function(form)
	{
		try{
		var checked_items = [];
		var form_children = form.children;
		var form_child;

		for (var form_child_counter = 0; form_child_counter < form_children.length; form_child_counter++)
		{
			form_child = form_children[form_child_counter];

			if (form_child.tagName === 'INPUT')
			{
				if (form_child.checked)
				{
					checked_items.push(form_child.value);
				}
			}
		}

		return checked_items;
		}catch(err){HandelErr(err);}
	},
	CreateOkBtn: function(form)
	{
		var btn = dom.create('input', 0, 'OK', form);

		btn.type = 'button';

		return btn;
	},
	old_thread_or_player_input: false,
	ValidateThreadOrPlayerInput: function(input, keyName, done, players_add_type, callback)
	{
		var inputValue = input.value;
		var inputFromForm = false;

		if (inputValue)
		{
			inputFromForm = true;

			if (inputValue === '')
			{
				return;
			}
		}
		else
		{
			inputValue = input;
		}
		if (inputValue === undefined)
		{
			return;
		}
		if (!inputValue.match)
		{
			return;
		}
		if (typeof inputValue !== 'string')
		{
			throw inputValue + ' must be a string';
		}

		var is_multiple = config.isMultiple(localStorage.getItem(keyName), inputValue);

		if ((inputValue === this.old_thread_or_player_input || is_multiple) && done && inputFromForm)
		{
			input.value = '';
			return;
		}
		else if (is_multiple)
		{
			//if the thread or player is already added, prevent it from being added again
			var err_msg_txt = 'You ';

			if (keyName === '_threads')
			{
				err_msg_txt += 'are already hiding this thread';
			}
			else
			{
				var list_txt = 'Thread Exceptions';

				if (keyName === 'Players')
				{
					list_txt = 'Blocklist';
				}

				err_msg_txt += 'already have this ' + keyName.toLowerCase().substring(0, keyName.toLowerCase().length - 1) + ' on your ' + list_txt;
			}

			ui.AlertErr(err_msg_txt + '.');

			if (inputFromForm)
			{
				input.value = '';
			}
		}
		else if (inputValue.match(/,/) && keyName !== 'Players')
		{
			ui.AlertErr('Thread subjects aren\'t allowed to contain commas ",".');
		}
		else if (inputValue.match(/[^\d]/) && keyName === 'Players' && players_add_type === 'id')
		{
			ui.AlertErr('Player ids can only be numbers.');
		}
		else if (player_data.ids.indexOf(inputValue) === -1 && keyName === 'Players' && players_add_type === 'id')
		{
			requestNewPlayerIds([parseInt(inputValue)]);
		}
		else if (player_data.numbers.indexOf(inputValue) === -1 && keyName === 'Players' && players_add_type === 'number')
		{
			ui.AlertErr('Player name not found. Player name = ' + inputValue);
		}
		else if (!inputValue.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Profile?p=') + '\\d+', 'i')) && keyName === 'Players' && players_add_type === 'link')
		{
			ui.AlertErr('Invalid player URL.');
		}
		else
		{
			if (keyName === 'threads' || keyName === '_threads' || players_add_type === 'id')
			{
				addRemoveItemToFromStorage(keyName, inputValue, 'add');
			}
			else
			{
				if (players_add_type === 'link')
				{
					var TurnPlayerUrlToId = function()
					{
						var playerid;

						if (inputValue.match(new RegExp(string.escapeRegExpChars('https://www.warzone.com/Profile?p=') + '\\d+', 'i')))
						{
							var player_numbers = inputValue.match(/\d/g);

							if (player_numbers)
							{
								playerid = player_numbers.toString().replace(/[^\d]/g, '');
								playerid = playerid.substring(2, playerid.length - 2);
							}
						}

						return playerid;
					};

					blocklist.CheckIfPlayerIdAlreadyEntered(TurnPlayerUrlToId());
				}
				else if (players_add_type === 'name')
				{
					var player_id = ConvertPlayerNameToPlayerId(inputValue);
					var profile_link = 'https://www.warzone.com/profile?p=' + ConvertPlayerIdToPlayerNumber(player_id);
					var check_if_player_id_alerdy_entered = function()
					{
						blocklist.CheckIfPlayerIdAlreadyEntered(player_id);
					};
					var get_other_player = function()
					{
						blocklist.addUsing.links();
					};

					ui.Confirm('Suggested player id is ' + player_id + '. Is this the player you wanted to hide posts from? Link to profile: ' + profile_link + '.', [check_if_player_id_alerdy_entered, get_other_player]);
				}
			}

			ui.old_thread_or_player_input = inputValue;

			if (inputFromForm)
			{
				input.value = '';
			}

			ui.disableButtons();//(un)disable buttons
		}

		if (typeof callback === 'function')
		{
			callback();
		}
	},
	AddRemoveMany: function(local_storage_item, what_to_add_remove, remove, layerNo, players_add_type, list)
	{
		try{
		if (list)
		{
			//predefines the players to add/remove
			if (Array.isArray(list))
			{
				if (remove)
				{
					var thingToRemove;

					for (var i = 0; i < list.length; i++)
					{
						thingToRemove = list[i];

						if (typeof thingToRemove !== 'string')
						{
							throw what_to_add_remove + ' must be a string';
						}

						addRemoveItemToFromStorage(local_storage_item, thingToRemove, 'remove');
					}

					return;
				}

				//can't use a standard loop encase there is an error in the input
				var CheckThreadOrPlayer = function(index)
				{
					var threadOrPlayerToAddRemove = list[index];

					if (index < list.length - 1)
					{
						ui.ValidateThreadOrPlayerInput(threadOrPlayerToAddRemove, local_storage_item, 1, players_add_type, (function(){CheckThreadOrPlayer(index + 1);}));
					}
					else if (index === list.length - 1)
					{
						return ui.ValidateThreadOrPlayerInput(threadOrPlayerToAddRemove, local_storage_item, 1, players_add_type);
					}
				};

				CheckThreadOrPlayer(0);
			}
			else
			{
				throw "list must be an array e.g. ['item1', 'item2', 'etc']";
			}
		}

		var remove_players = local_storage_item === 'Players';
		var remove_thread_exceptions = local_storage_item === 'threads';
		var remove_threads = local_storage_item === '_threads';

		var mode = 'add';
		var heading_lable = 'Enter';

		if (remove)
		{
			mode = 'remove';
			heading_lable = 'Select';
		}

		if (!layerNo)
		{
			layerNo = 1;
		}

		var _ui = document.getElementById(mode + '_' + local_storage_item + '_ui');

		if (_ui)
		{
			_ui.innerHTML = '';//empty the ui
		}
		else
		{
			_ui = this.AddLayer(layerNo);
			_ui.id = mode + '_' + local_storage_item + '_ui';
		}

		if (remove_players)
		{
			//the amount of players on the Blocklist can be too large when removing players so reset the height to allow overflow to be taken care with
			var remove_Players_uiStyle = document.getElementById('remove_Players_uiStyle');

			if (!remove_Players_uiStyle)
			{
				remove_Players_uiStyle = css.addCss(['#remove_Players_ui', ['height', 'unset !important']]);
				remove_Players_uiStyle[0].id = 'remove_Players_uiStyle';
			}
		}

		var ui_heading = document.createElement('h2');

		ui_heading.innerHTML = heading_lable + ' ' + capitalise(what_to_add_remove) + ' to ' + capitalise(mode);
		_ui.appendChild(ui_heading);

		var add_remove_form = this.CreateForm(local_storage_item, _ui, mode);
		var created_input = this.CreateInputs(local_storage_item, add_remove_form, mode, what_to_add_remove, players_add_type);
		var btn = this.CreateOkBtn(add_remove_form);

		btn.onclick = function()
		{
			if (remove)
			{
				ui.old_thread_or_player_input = false;

				var checked_items = ui.GetCheckedItems(add_remove_form);

				for (var checked_item_counter = 0; checked_item_counter < checked_items.length; checked_item_counter++)
				{
					addRemoveItemToFromStorage(local_storage_item, checked_items[checked_item_counter], 'remove');
				}
			}
			else
			{
				ui.ValidateThreadOrPlayerInput(add_remove_form.add_threads_new_thread_input, local_storage_item, 1, players_add_type);
			}

			ui.disableButtons();
			ui.HideLayer(_ui);
		};

		ui.AddFocus(created_input, _ui);
		_ui.defaultAction = function(){btn.click();};
		this.ShowLayer(_ui);
		return _ui;
		}catch(err){HandelErr(err);}
	},
	MakeBigBlueBtns: function(btn_lables, _ui, btn_ids)
	{
		try{
		var btn;
		var btns = [];

		for (var btn_label_counter = 0; btn_label_counter < btn_lables.length; btn_label_counter++)
		{
			btn = document.createElement('div');
			btn.innerHTML = btn_lables[btn_label_counter];
			btn.className = 'FlexContainer Flex3 Centered SettingsBtn';
			btns.push(btn);
		}

		dom.append(btns, _ui);
		return btns;
		}catch(err){HandelErr(err);}
	},
	CreateHTMLStringList: function(keyName)
	{
		try{
		var storage_item_split = localStorage.getItem(keyName).split(',');
		var storage_item_counter = 1;
		var item;
		var list_str = '<ul>';
		var getting_players = keyName === 'Players';

		if (getting_players)
		{
			storage_item_counter = 0;
		}

		for (storage_item_counter; storage_item_counter < storage_item_split.length; storage_item_counter++)
		{
			item = storage_item_split[storage_item_counter];
			list_str += '<li>';

			if (getting_players)
			{
				//link the player
				list_str += '<a href = "https://www.warzone.com/profile?p=' + ConvertPlayerIdToPlayerNumber(item) + '">' + item + ' - ' + ConvertPlayerIdToPlayerName(item) + '</a>';
			}
			else
			{
				list_str += item;
			}

			list_str += '</li>';
		}

		return list_str + '</ul>';
		}catch(err){HandelErr(err);}
	},
	show: function()
	{
		try{
		//because the UI is hidden before it's clicked. this renders the settings incorrectly, so open the ui then fix the rendering issue.
		document.getElementById('mainOverlay').style.display = 'block';
		document.getElementById('config_dan_userscript').style.display = 'block';

		if (window.onresize)
		{
			window.onresize();
		}

		this.disableButtons();
		}catch(err){HandelErr(err);}
	},
	hide: function()
	{
		try{
		document.getElementById('config_dan_userscript').removeAttribute('style');
		document.getElementById('mainOverlay').style.display = 'none';
		}catch(err){HandelErr(err);}
	},
	build: function()
	{
		try{
		var uistyle = css.addCss(['.FlexContainer', ['display', 'flex', 0], '.FlexWrap', ['flex-wrap', 'wrap', 1], '.Flex3', ['flex', '3', 1], '.Flex4', ['flex', '4', 1], '.Centered', ['justify-content', 'center'], ['align-items', 'center'], ['text-align', 'center'], '.FlexColumn', ['flex-direction', 'column', 1], '.Darkblue', ['background-color', '#000080 !important'], '.SettingMenu', ['position', 'fixed'], ['top', '0'], ['right', '0'], ['bottom', '0'], ['left', '0'], ['margin', 'auto'], ['padding', '10px'], ['color', '#fff'], ['font', '16px sans-serif'], ['background-color', '#f00'], ['border', '2px solid #000'], ['border-radius', '5px'], ['z-index', '10001'], ['width', 'fit-content', 0], ['display', 'none'], ['overflow', 'auto'], '.SettingMenu ul', ['margin', '10px auto !important'], '#main_settings_container', ['overflow', 'auto'], ['margin-top', '5px'], '.SettingsRow', ['margin-top', '5px'], ['min-height', '80px'], '.AutoHeight', ['height', 'auto'], ['min-height', 'auto !important'], '.SettingsBtn', ['border', '2px solid #000'], ['border-radius', '5px'], ['color', '#d5ffd5'], ['background-color', '#00f'], ['cursor', 'pointer'], '.SettingsRow div', ['margin-right', '20px'], ['padding', '0 3px'], '.SettingsRow .SettingsBtn:last-child', ['margin-right', '0'], '.SettingsRow:first-child', ['margin-top', '0'], '.NoMargin', ['margin', '0 !important'], '.OntopOfSettings', ['z-index', '10003'], '[id $= "_ui_title"]', ['text-align', 'center']])[0];

		uistyle.id = 'uistyle';
		uistyle.className = 'Dan_Style';

		var overlayStyle = css.addCss(['.overlay', ['display', 'none'], ['background', 'white none repeat scroll 0% 0%'], ['top', '0'], ['right', '0'], ['bottom', '0'], ['left', '0'], ['opacity', '0.5'], ['width', '100%'], ['height', '100%'], ['position', 'fixed'], ['z-index', '10000']])[0];

		overlayStyle.id = 'overlayStyle';
		overlayStyle.className = 'Dan_Style';

		var createdElements = dom.create(['div', 'b', 'div'], 'config_dan_userscript', ['', 'Hide Threads and Replies (v ' + v + ')'], [document.body, 0]);
		var settings_container = createdElements[0];
		var settings_header = createdElements[1];
		var scroller = createdElements[2];
	
		settings_container.className = 'SettingMenu';
		settings_header.className = 'FlexContainer Centered';
		scroller.className = 'FlexContainer';

		var main_settings_container = document.createElement('div');

		main_settings_container.className = 'FlexContainer FlexColumn';
		main_settings_container.id = 'main_settings_container';
		scroller.appendChild(main_settings_container);

		var CreateRowContainer = function(use_auto_height)
		{
			var row_container = document.createElement('div');

			row_container.className = 'FlexContainer FlexWrap SettingsRow';

			if (use_auto_height)
			{
				row_container.className += ' AutoHeight';
				settings_container.appendChild(row_container);
			}
			else
			{
				main_settings_container.appendChild(row_container);
			}

			return row_container;
		};
		var CreateLabel = function(description, row_container)
		{
			var label = document.createElement('div');

			label.className = 'FlexContainer Flex4 Centered';
			label.innerHTML = capitalise(description) + ':';
			row_container.appendChild(label);

			return label;
		};
		var CreateSettingsBtns = function(labels, row_container, can_be_disabled, use_darkblue_background)
		{
			var btn;
			var btns = [];

			for (var btns_to_make_counter = 0; btns_to_make_counter < labels.length; btns_to_make_counter++)
			{
				btn = document.createElement('div');
				btn.className = 'FlexContainer Flex3 Centered SettingsBtn';

				if (btns_to_make_counter === labels.length - 1)
				{
					if (can_be_disabled)
					{
						btn.className += ' CanBeDisabled';
					}
				}
				if (use_darkblue_background)
				{
					btn.className += ' Darkblue';
				}

				btn.innerHTML = capitalise(labels[btns_to_make_counter]);

				if (btn.innerHTML.match(/remove/i))
				{
					btn.className += ' NoMargin';
				}

				btns.push(btn);
				row_container.appendChild(btn);
			}

			return btns;
		};

		//blocklist
		var blocklist_row = CreateRowContainer();

		CreateLabel('blocklist', blocklist_row);

		var blocklist_row_btns = CreateSettingsBtns(['view', 'add players', 'remove players'], blocklist_row, 1);

		blocklist_row_btns[0].onclick = function(){config.players.view();};
		blocklist_row_btns[1].onclick = function(){config.players.add();};
		blocklist_row_btns[2].onclick = function()
		{
			if (blocklist_row_btns[2].disabled)
			{
				return;
			}

			config.players.remove();
		};

		//thread exceptions
		var thread_exceptions_row = CreateRowContainer();

		CreateLabel('thread exceptions', thread_exceptions_row);

		var thread_exceptions_row_btns = CreateSettingsBtns(['view', 'add threads', 'remove threads'], thread_exceptions_row, 1);

		thread_exceptions_row_btns[0].onclick = function(){config.threads.view();};
		thread_exceptions_row_btns[1].onclick = function(){config.threads.add();};
		thread_exceptions_row_btns[2].onclick = function()
		{
			if (thread_exceptions_row_btns[2].disabled)
			{
				return;
			}

			config.threads.remove();
		};

		//hide threads
		var hide_threads_row = CreateRowContainer();

		CreateLabel('hidden threads', hide_threads_row);

		var hide_threads_row_btns = CreateSettingsBtns(['view', 'add threads', 'remove threads'], hide_threads_row, 1);

		hide_threads_row_btns[0].onclick = function(){config._threads.view();};
		hide_threads_row_btns[1].onclick = function(){config._threads.add();};
		hide_threads_row_btns[2].onclick = function()
		{
			if (hide_threads_row_btns[2].disabled)
			{
				return;
			}

			config._threads.remove();
		};

		//motw and ot
		var hide_other_threads_row = CreateRowContainer();

		CreateLabel('hide mOTW threads', hide_other_threads_row);

		var hide_motw_btn = CreateSettingsBtns([localStorage.MOTW.replace('0', 'no').replace('1', 'yes')], hide_other_threads_row)[0];

		hide_motw_btn.id = 'hide_motw_btn';
		hide_motw_btn.onclick = function(){config.ChangeMOTW();};

		var hide_ot_label = CreateLabel('hide OT threads', hide_other_threads_row);

		hide_ot_label.className = hide_ot_label.className.replace('4', '3');

		var hide_ot_btn = CreateSettingsBtns([localStorage.DanHTRBP_hidingOT.replace('0', 'no').replace('1', 'yes')], hide_other_threads_row)[0];

		hide_ot_btn.id = 'hide_ot_btn';
		hide_ot_btn.onclick = function(){config.ChangeHidingOT();};

		//[blank name] and ui
		var hide_blankname_ui_row = CreateRowContainer();
		var blankname_label = CreateLabel('hide [blank name] posts', hide_blankname_ui_row);

		blankname_label.innerHTML = blankname_label.innerHTML.replace('N', 'n');

		var hide_blankname_btn = CreateSettingsBtns([localStorage.DanHTRBP_hide_blank_name.replace('0', 'no').replace('1', 'yes')], hide_blankname_ui_row)[0];

		hide_blankname_btn.id = 'hide_blankname_btn';
		hide_blankname_btn.onclick = function(){config.ChangeHideBlankName();};

		var hide_ui_label = CreateLabel('hide uI', hide_blankname_ui_row);

		hide_ui_label.className = hide_ui_label.className.replace('4', '3');

		var hide_ui_btn = CreateSettingsBtns([localStorage.DanHTRBP_hidingUI.replace('0', 'no').replace('1', 'yes')], hide_blankname_ui_row)[0];

		hide_ui_btn.id = 'hide_ui_btn';
		hide_ui_btn.onclick = function(){config.ChangeHidingUI();};

		//hide/show threads and hide/show replies
		var hide_show_threads_replies_row = CreateRowContainer();
		var threads_label = CreateLabel('hide threads', hide_show_threads_replies_row);
		var threads_btn = CreateSettingsBtns([localStorage.DanHTRBP_hide_threads.replace('0', 'no').replace('1', 'yes')], hide_show_threads_replies_row)[0];

		threads_btn.id = 'threads_btn';
		threads_btn.onclick = function(){config.ChangeHideThreads();};

		var replies_label = CreateLabel('hide replies', hide_show_threads_replies_row);

		replies_label.className = replies_label.className.replace('4', '3');

		var replies_btn = CreateSettingsBtns([localStorage.DanHTRBP_hide_replies.replace('0', 'no').replace('1', 'yes')], hide_show_threads_replies_row)[0];

		replies_btn.id = 'replies_btn';
		replies_btn.onclick = function(){config.ChangeHideReplies();};

		//settings
		var settings_row = CreateRowContainer();
		var settings_row_btns = CreateSettingsBtns(['import settings', 'export settings', 'reset', 'update player data'], settings_row);

		settings_row_btns[0].onclick = function(){config.settings.Import();};
		settings_row_btns[1].onclick = function(){config.settings.Export();};
		settings_row_btns[2].onclick = function(){config.settings.Reset();};
		updatePlayerDataBtn = settings_row_btns[3];
		updatePlayerDataBtn.id = 'updatePlayerDataBtn';
		updatePlayerDataBtn.onclick = function(){blocklist.updatePlayerData();};
		

		//close and report bug
		var bottom_row = CreateRowContainer(1);
		var bottom_row_btns = CreateSettingsBtns(['report bug', 'close'], bottom_row, 0, 1);

		bottom_row.id = 'bottom_row';
		bottom_row_btns[0].onclick = function(){ReportBug();};
		bottom_row_btns[1].onclick = function(){ui.hide();};
		settings_container.defaultAction = function(){ui.hide();};

		var ResizeSettingsToFit = function()
		{
			scroller.style.height = 'unset';
			settings_container.style.height = 'unset';

			//settings_container.clientHeight creates extra whitespace when debugger isn't open and settings_container.clientHeight is correct when the debugger is open

			var settings_container_clientHeight = 2 + settings_container.clientHeight + 2;
			var height = 2 + 10 + settings_header.clientHeight + 5 + blocklist_row.clientHeight + 5 + thread_exceptions_row.clientHeight + 5 + hide_threads_row.clientHeight + 5 + hide_other_threads_row.clientHeight + 5 + hide_blankname_ui_row.clientHeight + 5 + settings_row.clientHeight + 5 + bottom_row.clientHeight + 10 + 2;

			//console.log('height = ' + height + '\nsettings_container_clientHeight = ' + settings_container_clientHeight + '\nwindow.innerHeight = ' + window.innerHeight);

			if (height > window.innerHeight)
			{
				height = settings_container_clientHeight;
			}

			var bottom_row_height = bottom_row.scrollHeight + 5;

			scroller.style.height = height - settings_header.scrollHeight - bottom_row_height - 20 + 'px';
			settings_container.style.height = height + 'px';

			//resize all other SettingsMenus
			var SettingMenus = document.getElementsByClassName('SettingMenu');
			var setting_menu;
			var setting_menu_height;
			var settings_menu_children;
			var settings_menu_child;
			var settings_menu_child_counter;

			for (var setting_menu_counter = 1; setting_menu_counter < SettingMenus.length; setting_menu_counter++)
			{
				setting_menu = SettingMenus[setting_menu_counter];
				setting_menu_height = 2 + 10 + 10 + 2;
				settings_menu_children = setting_menu.children;

				setting_menu.style.height = 'unset';

				for (settings_menu_child_counter = 0; settings_menu_child_counter < settings_menu_children.length; settings_menu_child_counter++)
				{
					settings_menu_child = settings_menu_children[settings_menu_child_counter];

					if (settings_menu_child.tagName === 'H2' || (settings_menu_child.tagName === 'DIV' && settings_menu_child_counter > 0) || settings_menu_child.tagName === 'P')
					{
						setting_menu_height += 10;
						//h2 and p has style of 10px bottom margin
						//all divs have 10 margin-top except for the first one
					}
					if (settings_menu_child.className.match(/SettingsBtn/))
					{
						setting_menu_height += 2 + 2;
						//SettingsBtn has a border of 2px in all directions
					}
					if (settings_menu_child.tagName === 'UL')
					{
						setting_menu_height += 10 + 10;
						//ul has margin of 10px top and bottom
					}

					setting_menu_height += settings_menu_child.clientHeight;
				}

				if (setting_menu_height < window.innerHeight)//if setting_menu_height too big, allow the overflow to become scrollable instead on not allowing the setting menu to not be scrollable
				{
					setting_menu.style.height = setting_menu_height + 'px';
				}
			}
		};

		window.onresize = function(){ResizeSettingsToFit();};
		}catch(err){HandelErr(err);}
	}
};

function HandelErr(err, is_user_spotted_error)
{
	try{
	var errorTime = new Date().toGMTString();

	ui.canChangeFocusedUiPopup = false;
	console.log(err);

	var change_focus = function()
	{
		ui.canChangeFocusedUiPopup = true;
		ui.focusedUiPopup = ui.popupThatWantsToBeShown;
	};
	var report_bug = function()
	{
		var details = 'Page = ' + location.href + '.\nUser agent = ' + navigator.userAgent + '.\nScript version = ' + v + '.\nError = ' + err + '.\nStack trace:\n[code]' + err.stack + '[/code]\nwindow.player_data_time = ' + window.player_data_time + '.\nTime ran into error = ' + errorTime + '.';

		Mail(details);
		change_focus();
	};

	if (is_user_spotted_error)
	{
		report_bug();//no need to confirm to send a bug report if user spotted a bug
	}
	else
	{
		ui.Confirm('An error has occured on Hide Threads and Replies by Poster. Report the bug?', [report_bug, change_focus], '', 1001, ui.focusedUiPopup);
	}
	}catch(err2){console.log(err2);}
}

function ReportBug(msg)
{
	var err_msg;
	var cause_error = function()
	{
		try
		{
			if (err_msg.value)
			{
				msg = err_msg.value;
			}
			if (msg !== '')
			{
				throw msg;
			}
		}catch(err){HandelErr(err, 1);}
	};

	if (typeof msg === 'string')
	{
		cause_error();
	}
	else
	{
		err_msg = ui.Prompt('Enter the error you encountered below.', cause_error, '', 999);
	}
}

window.ReportBug = ReportBug;

var player_data;
window.updating_player_data = false;//have to use window prefix as XMLHttpRequest thinks that updating_player_data is a local variable instead of global

function player_dataAddIds()
{
	//in 2.3.0.5 no longer storing player ids by default - saving storage space
	if (!player_data.ids)
	{
		player_data.ids = [];
		player_data.numbers.forEach(function(number)
		{
			player_data.ids.push(number.substring(2, number.length - 2));
		});
	}
}

function GetSavedPlayerData(forceUpdate)
{
	try{
	var date = new Date();
	var month = date.getUTCMonth();
	var year = date.getUTCFullYear();
	var updatePlayerDataBtn = document.getElementById('updatePlayerDataBtn');
	var canUpdateVisual = forceUpdate && updatePlayerDataBtn;

	if (canUpdateVisual)
	{
		updatePlayerDataBtn.innerHTML = 'Updating...';
	}

	if (localStorage.DanHTRBP_player_data && !forceUpdate)
	{
		//if the date is over a month old, request the up to date player data
		var parsed_player_data = JSON.parse(localStorage.DanHTRBP_player_data);
		var parsed_player_data_date = parsed_player_data.date;

		if (month > parsed_player_data_date[0] || year > parsed_player_data_date[1])
		{
			window.updating_player_data = true;
		}
		else
		{
			player_data = parsed_player_data;
			player_dataAddIds();
		}
	}
	else
	{
		window.updating_player_data = true;//get the player data - same procedure as updating player data
	}

	console.log('window.updating_player_data = ' + JSON.stringify(window.updating_player_data));

	if (!window.updating_player_data)
	{
		window.player_data = player_data;
		window.player_data_time = date.toGMTString();
		return;
	}

	var xhttp = new XMLHttpRequest();

	if (xhttp)
	{
		xhttp.onreadystatechange = function()
		{
			if (this.readyState === 4 && this.status === 200)
			{
				window.xhttp = this;
				console.log(this);
				player_data = JSON.parse(this.responseText.split('StartPlayerData')[1].split('EndPlayerData')[0].replace(new RegExp(string.escapeRegExpChars('\\&quot;'), 'g'), '"').replace(new RegExp(string.escapeRegExpChars('&quot;'), 'g'), '"'));
				//wiki renders " as &quote;, not using own site because of cross-origin limitations
				
				player_data.date = [month, year];
				localStorage.DanHTRBP_player_data = JSON.stringify(player_data);
				player_dataAddIds();
				window.player_data = player_data;
				window.player_data_time = date.toGMTString();
				window.updating_player_data = false;
				console.log('updated player data');

				if (canUpdateVisual)
				{
					updatePlayerDataBtn.innerHTML = 'Updated';
				}

				localStorageChecks();

				//build settings ui - only isn't present when updating/getting player data 
				elementExists('config_dan_userscript', function()
				{
					ui.build();
					ui.createOverlays();
				});

				if (forceUpdate)
				{
					//update players
					PlayersToP();
					hideThreads();
					hideReplies();

					if (updatePlayerDataBtn)
					{
						updatePlayerDataBtn.innerHTML = capitalise('update player data');
					}
				}
			}
		};
		xhttp.open("GET", "https://www.warzone.com/wiki/User:DanWL60/playerdata", true);
		xhttp.send();
	}
	}catch(err){HandelErr(err);}
}

function ConvertPlayerData(data, return_player_name, ignore_errors)
{
	try{
	var modes = ['id to player name', 'name to player id'];
	var mode = modes[1];

	console.log('ignore_errors = ' + JSON.stringify(ignore_errors));

	if (!player_data)
	{
		if (!ignore_errors)
		{
			throw 'Trying to convert a player ' + mode + ' before player_data is defined - a refresh will fix this';
		}

		return 'unknown';
	}

	var array_to_find_data_index = player_data.names;
	var array_to_get_data_from = player_data.ids;

	if (return_player_name)
	{
		mode = modes[0];
		array_to_find_data_index = player_data.ids;
		array_to_get_data_from = player_data.names;
	}

	var index = array_to_find_data_index.indexOf(data);

	if (index === - 1)
	{
		if (!ignore_errors)
		{
			console.log("Data for converting this player's id or name to a player name or id is not currently available. Player details: " + data);
			requestNewPlayerIds([parseInt(data)]);
		}

		return 'unknown';
	}

	return array_to_get_data_from[index];
	}catch(err){HandelErr(err);}
}

function ConvertPlayerIdToPlayerNumber(playerid)
{
	return player_data.numbers[player_data.ids.indexOf(playerid)];
}

function ConvertPlayerIdToPlayerName(playerid, ignore_errors)
{
	return ConvertPlayerData(playerid, true, ignore_errors);
}

function ConvertPlayerNameToPlayerId(playername, ignore_errors)
{
	return ConvertPlayerData(playername, false, ignore_errors);
}

function TurnPlayerDataToDataListOptions(playerDataItem)
{
	try{
	if (!playerDataItem)
	{
		return;
	}

	var dataListOptionsHTML = '';

	for (var i = 0; i < playerDataItem.length; i++)
	{
		dataListOptionsHTML += '<option value = "' + playerDataItem[i] + '">';
	}

	return dataListOptionsHTML;
	}catch(err){HandelErr(err);}
}

function requestNewPlayerIds(requestedPlayerIds)
{
	try{
	var logError = function(){console.log('requestedPlayerIds must be an array of player ids in an number format.');};

	if (!Array.isArray(requestedPlayerIds))
	{
		return logError();		
	}

	requestedPlayerIds.forEach(function(playerId)
	{
		if (typeof playerId !== 'number' || isNaN(playerId))
		{
			return logError();
		}
	});

	var messagePlayerIds = function()
	{
		Mail('Support these ids:\n[code][ids]' + JSON.stringify(requestedPlayerIds) + '[\\ids][/code]');
	};

	ui.Confirm('Unsupported player ids detected. Do you want these ids to be supported?', messagePlayerIds);
	}catch(err){HandelErr(err);}
}

function fixBlank(object, newText, useLoop, object_start_num, updatePlayers)
{
	try{
	//makes blanked-out things visible globally by replacing the things' innerHTML with new text
	var ObjectHasBlankChar = function(object)
	{
		return object.innerHTML.match(blankCharsRe);
	};

	var FixBlankMain = function(object)
	{
		if (ObjectHasBlankChar(object))
		{
			if (object === document.getElementsByTagName('font'))
			{
				if (object.parentNode === "[object HTMLTableCellElement]" && object.innerHTML !== "WarLight Creator" && object.innerHTML !== "Script Creator")
				{
					object.innerHTML = newText;
				}
			}
			else
			{
				object.innerHTML = newText;
			}
			if (updatePlayers)
			{
				localStorageChecks();
				PlayersToP();
			}
		}
	};

	if (useLoop)
	{
		if (!object_start_num)
		{
			object_start_num = 0;
		}

		while (object_start_num < object.length)
		{
			FixBlankMain(object[object_start_num]);
			object_start_num++;
		}
	}
	else
	{
		FixBlankMain(object);
	}
	}catch(err){HandelErr(err);}
}

//required global vars
var	Players,
	threads,
	_threads;

function localStorageRemoveDublicates(key)
{
	//removes duplicates from localStorage
	try{
	var localStorageItem = localStorage.getItem(key);
	var localStorageItemValues = localStorageItem.split(',');
	var itemValue;
	var allReadItemValues = [];

	for (var valueNo = 0; valueNo < localStorageItemValues.length; valueNo++)
	{
		itemValue = localStorageItemValues[valueNo];

		if (allReadItemValues.indexOf(itemValue) === -1)
		{
			allReadItemValues.push(itemValue);
		}
	}

	localStorage.setItem(key, allReadItemValues.toString());
	}catch(err){HandelErr(err);}
}

var updating_settings_to_work_with_2point3 = false;
var blocklist =
{
	CheckIfPlayerIdAlreadyEntered: function(playerid)
	{
		if (!playerid)
		{
			return;
		}

		var all_player_ids = localStorage.Players.split(',');
		
		if (all_player_ids.indexOf(playerid) === -1)
		{
			addRemoveItemToFromStorage('Players', playerid, 'add');
		}
	},
	updatePlayerData: function()
	{
		GetSavedPlayerData(true);
	},
	addUsing:
	{
		links: function(links)
		{
			try{
			return ui.AddRemoveMany('Players', 'players', 0, 3, 'link', links);
			}catch(err){HandelErr(err);}
		},
		names: function(names)
		{
			try{
			return ui.AddRemoveMany('Players', 'players', 0, 3, 'name', names);
			}catch(err){HandelErr(err);}
		},
		ids: function(ids)
		{
			try{
			return ui.AddRemoveMany('Players', 'players', 0, 3, 'id', ids);
			}catch(err){HandelErr(err);}
		},
		BulkConvert: function(convert_from, convert_to)
		{
			try{
			var convert_txt = [];

			if (!convert_from)
			{
				convert_from = 0;
				convert_txt.push('Names');
			}
			else
			{
				convert_txt.push('Ids');
			}
			if (convert_to)
			{
				convert_txt.push('Names');
			}
			else
			{
				convert_to = 1;
				convert_txt.push('Ids');
			}

			var current_players_list = localStorage.Players.split(',');
			var current_player;
			var converted_player;
			var all_converted_players = [];
			var convert_names_to_ids = !convert_from && convert_to;
			var convert_ids_to_names = convert_from && !convert_to;

			console.log('convert_names_to_ids = ' + JSON.stringify(convert_names_to_ids));
			console.log('convert_ids_to_names = ' + JSON.stringify(convert_ids_to_names));

			for (var i = 0; i < current_players_list.length; i++)
			{
				current_player = current_players_list[i];

				if (!current_player)
				{
					//pre 2.3 had an extra comma at the end for players
					break;
				}

				if (convert_names_to_ids)
				{
					updating_settings_to_work_with_2point3 = true;

					if (current_player === '[blank name]')
					{
						localStorage.DanHTRBP_hide_blank_name = '1';
					}
					else
					{
						converted_player = ConvertPlayerNameToPlayerId(current_player, true);
					}
				}
				else if (convert_ids_to_names)
				{
					converted_player = ConvertPlayerIdToPlayerName(current_player, true);
				}

				all_converted_players.push(converted_player);//don't need to check that the converted player is there as this can be corrected later
			}

			var players_conversion_ui = document.getElementById('PlayersConversionUI');

			if (!players_conversion_ui)
			{
				players_conversion_ui = ui.AddLayer(1);
				players_conversion_ui.id = 'PlayersConversionUI';
				css.addCss(['#PlayersConversionUI', ['height', 'unset !important']]);//makes the height overflow get detected correctly
			}

			var players_coversion_form = ui.CreateForm('players_conversion', players_conversion_ui);

			players_coversion_form.innerHTML = '<p>Tick which items have been INCORRECTLY converted.</p>';

			var players_container = document.createElement('div');

			players_container.style.display = 'flex';
			players_coversion_form.appendChild(players_container);

			var original_players_div = document.createElement('div');
			var original_players_list = current_players_list;

			if (localStorage.DanHTRBP_hide_blank_name && convert_names_to_ids)
			{
				var blank_name_index = current_players_list.indexOf('[blank name]');

				if (blank_name_index !== -1)
				{
					original_players_list.splice(blank_name_index, 1);
				}
			}

			original_players_div.style.marginRight = '1em';
			original_players_list_html = '<p>' + original_players_list.join('</p><p>') + '</p>';
			original_players_div.innerHTML = '<h2 class = "ui_title">' + convert_txt[0] + '</h2>' + original_players_list_html;
			players_container.appendChild(original_players_div);

			var converted_players_div = document.createElement('div');

			converted_players_div.id = 'converted_players_div';
			converted_players_div.innerHTML = '<h2 class = "ui_title">' + convert_txt[1] + '</h2>';
			players_container.appendChild(converted_players_div);

			css.addCss(['#converted_players_div label', ['margin-bottom', '10px']]);//makes the text appear inline - uneven spacing from labels

			var converted_players_checkboxes = ui.CreateCheckboxes(converted_players_div, all_converted_players);
			var converted_players_checkboxes_length = converted_players_checkboxes.length;

			//automatically check the unknown player ids
			var current_checkbox;

			for (var i = 0; i < converted_players_checkboxes_length; i++)
			{
				current_checkbox = converted_players_checkboxes[i];

				if (current_checkbox.value === 'unknown')
				{
					current_checkbox.checked = true;
				}
			}

			var ok_btn = ui.CreateOkBtn(players_coversion_form);
			var UpdatePlayersAndHidePosts = function()
			{
				localStorage.Players = all_converted_players.toString();//remember the conversion
				updating_settings_to_work_with_2point3 = false;
				ui.HideLayer(players_conversion_ui);
				document.getElementById('mainOverlay').style.zIndex = '1000';//conversion ui changed mainOverlay to have z-index of 10002 - needs to be reduced to allow the main settings ui to become clickable

				//hide posts
				localStorageChecks();

				//build settings ui - only isn't present when updating/getting player data
				elementExists('config_dan_userscript', function()
				{
					ui.build();
					ui.createOverlays();
				});

				PlayersToP();
				hideThreads();
				hideReplies();
				CreateUIForSubForumsAllForumsMailAndClanForum();
				CreateAddToBlocklistBtnOnProfile();
				CreateAddToThreadExceptionsHiddenThreadsOnThread();
			};
			var ModifyConversion = function(suggested_player, original_player, counter)
			{
				var enter_correct_ui;
				var main = function()
				{
					var correct_conversion = enter_correct_ui.value;

					//checking for errors is too complex given the way that I reinvented prompts - let's assume that the input was correct
					all_converted_players.splice(all_converted_players.indexOf(suggested_player), 1, correct_conversion);//replace suggested with user inputted

					var correct_conversion = enter_correct_ui.value;
					var cur_checkbox = converted_players_checkboxes[counter];

					cur_checkbox.id = correct_conversion;
					cur_checkbox.value = correct_conversion;
					cur_checkbox.checked = false;
					cur_checkbox.previousElementSibling.htmlFor = correct_conversion;
					cur_checkbox.previousElementSibling.innerHTML = correct_conversion + '&nbsp;';

					if (counter === converted_players_checkboxes_length - 1)
					{
						return UpdatePlayersAndHidePosts();//wait until all names have been converted before updating players then hide posts
					}

					EvaluateCheckbox(counter + 1);
				};

				enter_correct_ui = ui.Prompt('The original player was ' + original_player + '. The suggested conversion was ' + suggested_player + '. Enter the correct conversion.', main, '', 3);
			};
			var EvaluateCheckbox = function(counter)
			{
				//using a standard loop doesn't easily allow conversions to be done then go to the next checkbox
				counter = parseInt(counter);

				var current_checkbox = converted_players_checkboxes[counter];

				if (current_checkbox.checked)
				{
					ModifyConversion(current_checkbox.value, original_players_list[counter], counter);
				}
				else if (counter < converted_players_checkboxes_length - 1)
				{
					EvaluateCheckbox(counter + 1);
				}
				else if (counter === converted_players_checkboxes_length - 1)
				{
					UpdatePlayersAndHidePosts();//wait until all names have been converted before updating players then hide posts
				}
			};

			ok_btn.onclick = function()
			{
				EvaluateCheckbox(0);//go though all the checkboxes, if checked prompt user and let them enter the player id
			};

			players_conversion_ui.defaultAction = function(){ok_btn.click();};
			ui.ShowLayer(players_conversion_ui);
			}catch(err){HandelErr(err);}
		},
		blacklist: function()
		{
			try{
			var blacklistPage = open('https://www.warzone.com/ManageBlackList');

			blacklistPage.onload = function()
			{
				var bl$ = blacklistPage.$;
				var blacklistedPlayerIds = [];
				var blacklistedPlayerId;
				var unsupportedIds = [];

				//get all lis with id beginning with ListItem_ and push the player id
				bl$('li').filter("[id ^= 'ListItem_']").each(function()
				{
					blacklistedPlayerId = bl$(this.id).selector.replace(/[^\d]/g, '');
					
					if (player_data.ids.indexOf(blacklistedPlayerId) > -1)
					{
						if (p.indexOf(blacklistedPlayerId) === -1)
						{
							//prevent adding player ids that aren't there and prevent re-adding player that are already added
							blacklistedPlayerIds.push(blacklistedPlayerId);
						}
					}
					else
					{
						unsupportedIds.push(parseInt(blacklistedPlayerId));
					}
				});
				ui.AddRemoveMany('Players', 'players', 0, 3, 'id', blacklistedPlayerIds);

				if (Array.isArray(unsupportedIds))
				{
					requestNewPlayerIds(unsupportedIds);
				}

				blacklistPage.close();
			};
			}catch(err){HandelErr(err);}
		}
	},
	remove: function(playersToRemove)
	{
		try{
		ui.AddRemoveMany('Players', 'players', 1, 1, undefined, playersToRemove);
		}catch(err){HandelErr(err);}
	}
};

//check localStorage for players and threads
function localStorageChecks()
{
	try{
	//many use of checking the type due to using binary values as strings. '0' is the same as false... yes and no values in settings were replaced with 1 and 0 in 2.3.0.0 to make checking if settings are enabled easier.
	//localStorage.DanHTRBP_hide_blank_name became an independent setting in 2.3.0.0 - before it was stored in players. Players on the Blocklist have to be numbers only.

	if (['0', '1'].indexOf(localStorage.DanHTRBP_hide_blank_name) === -1)
	{
		localStorage.DanHTRBP_hide_blank_name = '0';
	}
	
	if (typeof localStorage.Players !== 'string' || localStorage.Players === '')
	{
		localStorage.Players = '143539,717609';
		localStorage.DanHTRBP_hide_blank_name = '1';
	}
	else
	{
		//if [blank name] is being used, prevent loads of random [blank name]s from appearing
		if (localStorage.Players.match(/\[blank name\]/))
		{
			localStorage.Players = localStorage.Players.replace(localStorage.Players.match(/\[blank name\],/), '').replace(localStorage.Players.match(/\[blank name\]/g), '');
			localStorage.DanHTRBP_hide_blank_name = '1';
		}

		if (localStorage.Players.substring(localStorage.Players.length - 1, localStorage.Players.length) === ',' && !window.updating_player_data)
		{
			//2.3.0.0 changed the last character to not be a comma - before a comma had to be added at the end
			console.log('using pre 2.3 settings and not getting/updating player_data');
			localStorage.Players = localStorage.Players.substring(0, localStorage.Players.length - 1);
			blocklist.addUsing.BulkConvert(0);//turns the stored player names to player ids then remembers the correctly converted values
		}
		localStorageRemoveDublicates('Players');
	}

	Players = localStorage.Players.split(',');

	console.log('Currently hiding threads and replies by ' + Players);

	//thread exceptions
	if (typeof localStorage.threads !== 'string')
	{
		localStorage.threads = 'localStorage.threads_first-item(do_not_remove_this)';//prevents visual UI bugs
	}
	else
	{
		localStorageRemoveDublicates('threads');

		if (!localStorage.threads.match('localStorage.threads_first-item(do_not_remove_this)'))
		{
			localStorage.threads = 'localStorage.threads_first-item(do_not_remove_this),' + localStorage.threads;
		}
	}

	threads = localStorage.threads.split(',');

	//hidden threads
	if (typeof localStorage._threads !== 'string')
	{
		localStorage._threads = 'localStorage._threads_first-item(do_not_remove_this)';
	}
	else
	{
		localStorageRemoveDublicates('_threads');

		if (!localStorage._threads.match('localStorage._threads_first-item(do_not_remove_this)'))
		{
			localStorage._threads = 'localStorage._threads_first-item(do_not_remove_this),' + localStorage._threads;
		}
	}

	_threads = localStorage.getItem('_threads').split(',');

	//show/hide OT threads
	if (localStorage.DanHTRBP_hidingOT === 'no')
	{
		localStorage.DanHTRBP_hidingOT = '0';
	}
	else if (localStorage.DanHTRBP_hidingOT === 'yes')
	{
		localStorage.DanHTRBP_hidingOT = '1';
	}
	else if (['0', '1'].indexOf(localStorage.DanHTRBP_hidingOT) === -1)
	{
		localStorage.DanHTRBP_hidingOT = '0';
	}

	console.log('localStorage.DanHTRBP_hidingOT = ' + localStorage.DanHTRBP_hidingOT);

	//MOTW
	if (localStorage.MOTW === 'no')
	{
		localStorage.MOTW = '0';
	}
	else if (localStorage.MOTW === 'yes')
	{
		localStorage.MOTW = '1';
	}
	else if (['0', '1'].indexOf(localStorage.MOTW) === -1)
	{
		localStorage.MOTW = '0';
	}

	console.log('localStorage.MOTW = ' + localStorage.MOTW);

	if (localStorage.bpDialogue)
	{
		//discontinued blank posts messages
		RemoveLocalStorageItem('bpDialogue');
	}

	//ability to hide UI elements
	if (localStorage.DanHTRBP_hidingUI === 'no')
	{
		localStorage.DanHTRBP_hidingUI = '0';
	}
	else if (localStorage.DanHTRBP_hidingUI === 'yes')
	{
		localStorage.DanHTRBP_hidingUI = '1';
	}
	else if (['0', '1'].indexOf(localStorage.DanHTRBP_hidingUI) === -1)
	{
		localStorage.DanHTRBP_hidingUI = '0';
	}

	console.log('localStorage.DanHTRBP_hidingUI = ' + localStorage.DanHTRBP_hidingUI);

	//ability to hide threads - new in 2.3.0.0
	if (['0', '1'].indexOf(localStorage.DanHTRBP_hide_threads) === -1)
	{
		localStorage.DanHTRBP_hide_threads = '0';
	}

	//ability to hide replies - new in 2.3.0.0
	if (['0', '1'].indexOf(localStorage.DanHTRBP_hide_replies) === -1)
	{
		localStorage.DanHTRBP_hide_replies = '1';
	}

	//create UI display
	var	nextSelector;
	var	newNextSelector = '#HiddenThreadsRow td:nth-last-child(2)';
	var	isAllF = location.pathname.match(/\/forum\/forum/i);

	if (isAllF)
	{
		nextSelector = '#HiddenThreadsRow td:nth-last-child(2)';
		newNextSelector = '#HiddenThreadsRow td:nth-last-child(3)';
	}

	var uiDisplay = css.addCss(['.PlayersTD, .ThreadExceptionsTD, .UIElement, #HiddenThreadsRow td:last-child, ' + nextSelector, ['display', 'table-cell'], newNextSelector, ['border-top-right-radius', '0px']])[0];

	if (localStorage.DanHTRBP_hidingUI === '0')
	{
		uiDisplay.innerHTML = uiDisplay.innerHTML.replace(/none/g, 'table-cell').replace('8px', '0px');
	}
	else
	{
		uiDisplay.innerHTML = uiDisplay.innerHTML.replace(/table-cell/g, 'none').replace('0px', '8px');
	}

	uiDisplay.id = 'uiDisplay';
	uiDisplay.className = 'Dan_Style';
	}catch(err){HandelErr(err);}
}

//prevents certain people from using all features
function isInvalidUser()
{
	return IsUser([5614353942, 9071760924, 3085172703]);
}
if (isInvalidUser())
{
	throw new Error();
}

var PlayersNo = 0,
	threadsNo = 0,
	_threadsNo = 0;

//Players array to another array where Players[PlayersNo] is a single var
var p;
var pNo = 0;

function PlayersToP()
{
	try{
	p = [];
	Players.forEach(function(player)
	{
		p.push(player);
	});
	}catch(err){HandelErr(err);}
}


//thread exceptions
var t;

//thread exceptions array to another array where threads[threadsNo] is a single var
function threadsToT()
{
	try{
	t = [];
	threads.forEach(function(thread)
	{
		t.push(thread);
	});
	}catch(err){HandelErr(err);}
}

//hidden threads
var _t;

function _threadsTo_t()
{
	try{
	_t = [];
	_threads.forEach(function(thread)
	{
		_t.push(thread);
	});
	}catch(err){HandelErr(err);}
}

function fixThreadExceptionsBug()
{
	try{
	for (var i=threads.length-1; i>=0; i--)
	{
		t.splice(i, 1);
	}
	}catch(err){HandelErr(err);}
}

function addRemoveItemToFromStorage(keyName, item, mode, addingRemovingUsingPlayerName)
{
	try{
	console.log(mode + 'ing ' + item + ' to/from ' + keyName);
	if (!item)
	{
		return;
	}
	if (addingRemovingUsingPlayerName && keyName === 'Players')
	{
		item = ConvertPlayerNameToPlayerId(item.replace(' by ', ''));

		if (player_data.ids.indexOf(item) === -1 && mode === 'add')
		{
			//prevent adding unsupported player ids - allowing removing
			return requestNewPlayerIds([parseInt(item)]);
		}
	}

	if (mode !== 'add' && mode !== 'remove')
	{
		return;
	}
	if (mode === 'add')
	{
		localStorage.setItem(keyName, localStorage.getItem(keyName) + ',' + item);
	}
	else
	{
		if ((keyName === 'threads' && item === 'localStorage.threads_first-item(do_not_remove_this)') || (keyName === '_threads' && item === 'localStorage._threads_first-item(do_not_remove_this)'))
		{
			return;
		}

		localStorage.setItem(keyName, localStorage.getItem(keyName).replace(',' + item, ''));
	}

	localStorageChecks();

	var btn_class;
	var fullItemHTML = item;

	if (keyName === 'Players')
	{
		PlayersToP();
		btn_class = 'PlayerName';
		fullItemHTML = ' by ' + ConvertPlayerIdToPlayerName(item);
	}
	else if (keyName === 'threads')
	{
		btn_class = 'ThreadLink';
		threadsToT();
	}
	else if (keyName === '_threads')
	{
		_threadsTo_t();
	}

	if ((subForum || allF || clanF || mail) && btn_class)
	{
		//update buttons
		var currentShownBtnClassName = keyName;
		var currentHiddenBtnClassName = keyName;

		if (mode === 'add')
		{
			currentShownBtnClassName += 'H';
			currentHiddenBtnClassName += 'S';
		}
		else
		{
			currentShownBtnClassName += 'S';
			currentHiddenBtnClassName += 'H';
		}

		currentShownBtnClassName += 'Btn';
		currentHiddenBtnClassName += 'Btn';
		
		var btnUsedClassNames = document.getElementsByClassName(currentShownBtnClassName);
		var btnUnusedClassNames = document.getElementsByClassName(currentHiddenBtnClassName);
		var threadNameClass = document.getElementsByClassName(btn_class);
		var threadNameClassItem;

		for (var i = 0; i < threadNameClass.length; i++)
		{
			threadNameClassItem = threadNameClass[i];

			if (threadNameClassItem.innerHTML === fullItemHTML)
			{
				if (keyName === 'Players')
				{
					//make the thread visible
					threadNameClassItem.parentNode.parentNode.className = '';
					threadNameClassItem.parentNode.parentNode.removeAttribute('style');
				}

				//update the buttons
				btnUsedClassNames[i].style.display = 'none';
				btnUnusedClassNames[i].removeAttribute('style');
			}
		}
	}

	hideThreads();
	hideReplies();
	CreateAddToBlocklistBtnOnProfile();
	CreateAddToThreadExceptionsHiddenThreadsOnThread();
	console.log(mode + 'ed ' + item + ' to/from ' + keyName);
	}catch(err){HandelErr(err);}
}

var config =
{
	update: function()
	{
		try{
		localStorageChecks();

		if (allF && localStorage.DanHTRBP_hidingOT === '0')
		{
			//show OT threads and hide the downvoted OT threads
			OT.removeClassNames();
		}

		hideThreads();//if on forum, hide threads
		hideReplies();//if on forum post, hide replies
		}catch(err){HandelErr(err);}
	},
	ChangeBinValue: function(keyName, btnId)
	{
		try{
		var value = '1';
		var old_value = '0';
		var new_label = 'Yes';

		if (parseInt(localStorage.getItem(keyName)))
		{
			value = '0';
			old_value = '1';
			new_label = 'No';
		}

		localStorage.setItem(keyName, value);
		document.getElementById(btnId).innerHTML = new_label;
		console.log('changed ' + keyName + ' from ' + old_value + ' to ' + localStorage.getItem(keyName));
		config.update();
		}catch(err){HandelErr(err);}
	},
	ChangeHideBlankName: function()
	{
		config.ChangeBinValue('DanHTRBP_hide_blank_name', 'hide_blankname_btn');
	},
	ChangeMOTW: function()
	{
		config.ChangeBinValue('MOTW', 'hide_motw_btn');
	},
	ChangeHidingOT: function()
	{
		config.ChangeBinValue('DanHTRBP_hidingOT', 'hide_ot_btn');
	},
	ChangeHidingUI: function()
	{
		config.ChangeBinValue('DanHTRBP_hidingUI', 'hide_ui_btn');
	},
	ChangeHideThreads: function()
	{
		config.ChangeBinValue('DanHTRBP_hide_threads', 'threads_btn');
	},
	ChangeHideReplies: function()
	{
		config.ChangeBinValue('DanHTRBP_hide_replies', 'replies_btn');
	},
	settings:
	{
		Import: function(exported_settings)
		{
			try{
			var ImportSettings = function()
			{				
				var exported_settings_val = exported_settings.value;

				if (!exported_settings_val)
				{
					exported_settings_val = exported_settings;
				}

				var parsed_settings = JSON.parse(exported_settings_val);

				var setting_MOTW = parsed_settings[3];
				var setting_hidingUI = parsed_settings[4];
				var setting_hidingOT = parsed_settings[5];
				var setting_hideBlankName = parsed_settings[6];
				var setting_hideThreads = parsed_player_data_date[7];
				var setting_hideReplies = parsed_player_data_date[8];

				if (setting_MOTW !== '1' && setting_MOTW !== '0')
				{
					throw 'Error while importing settings: Invalid MOTW setting value - exported_settings = ' + _exported_settings;
				}
				else if (setting_hidingUI !== '1' && setting_hidingUI !== '0')
				{
					throw 'Error while importing settings: Invalid hiding UI setting value - exported_settings = '  + _exported_settings;
				}
				else if (setting_hidingOT !== '1' && setting_hidingOT !== '0')
				{
					throw 'Error while importing settings: Invalid hiding OT setting value - exported_settings = ' + _exported_settings;
				}
				if (typeof setting_hideBlankName === 'string')
				{
					if (setting_hideBlankName !== '1' && setting_hideBlankName !== '0')
					{
						throw 'Error while importing settings: Invalid hide blank name value - exported_settings = ' + _exported_settings;
					}
				}
				if (typeof setting_hideThreads === 'string')
				{
					if (setting_hideThreads !== '1' && setting_hideThreads !== '0')
					{
						throw 'Error while importing settings: Invalid hide threads value - exported_settings = ' + _exported_settings;
					}
				}
				if (typeof setting_hideReplies === 'string')
				{
					if (setting_hideReplies !== '1' && setting_hideReplies !== '0')
					{
						throw 'Error while importing settings: Invalid hide replies value - exported_settings = ' + _exported_settings;
					}
				}

				localStorage.Players = parsed_settings[0];
				localStorage.threads = parsed_settings[1];
				localStorage._threads = parsed_settings[2];
				localStorage.MOTW = setting_MOTW;
				localStorage.DanHTRBP_hidingUI = setting_hidingUI;
				localStorage.DanHTRBP_hidingOT = setting_hidingOT;
				localStorage.DanHTRBP_hide_blank_name = setting_hideBlankName;
				localStorage.DanHTRBP_hide_threads = setting_hideThreads;
				localStorage.DanHTRBP_hide_replies = setting_hideReplies;

				ui.Alert('Imported settings.');

				//update everything
				localStorageChecks();
				PlayersToP();
				threadsToT();
				_threadsTo_t();
				hideThreads();
				hideReplies();
			};

			if (exported_settings)
			{
				ImportSettings();
			}
			else
			{
				exported_settings = ui.Prompt('Paste exported settings here.', ImportSettings);
			}
			}catch(err){HandelErr(err);}
		},
		Export: function()
		{
			try{
			var exported_settings = [];

			exported_settings.push(localStorage.Players);
			exported_settings.push(localStorage.threads);
			exported_settings.push(localStorage._threads);
			exported_settings.push(localStorage.MOTW);
			exported_settings.push(localStorage.DanHTRBP_hidingUI);
			exported_settings.push(localStorage.DanHTRBP_hidingOT);
			exported_settings.push(localStorage.DanHTRBP_hide_blank_name);
			exported_settings.push(localStorage.DanHTRBP_hide_threads);
			exported_settings.push(localStorage.DanHTRBP_hide_replies);

			var exported_settings_txt = JSON.stringify(exported_settings);

			ui.Alert(exported_settings_txt, 'Current settings');
			console.log('Current settings:\n' + exported_settings_txt);
			}catch(err){HandelErr(err);}
		},
		Reset: function()
		{
			try{
			var reset_ui = document.getElementById('reset_ui');

			if (!reset_ui)
			{
				reset_ui = ui.AddLayer(1);
				reset_ui.id = 'reset_ui';

				var heading = document.createElement('h2');

				heading.id = 'reset_ui_title';
				heading.innerHTML = capitalise('reset');
				reset_ui.appendChild(heading);

				var description = document.createElement('p');

				description.innerHTML = 'Select items to reset.';
				reset_ui.appendChild(description);

				var reset_form = ui.CreateForm('reset', reset_ui);
				var checkboxes = ui.CreateCheckboxes(reset_form, ['Blocklist', 'Thread Exceptions', 'Hidden threads', 'Off-topic threads', 'Map of the Week threads', 'Hiding blank name posts', 'Hiding UI', 'Hide Threads', 'Hide Replies']);
				var reset_btn = ui.CreateOkBtn(reset_form);

				reset_btn.value = 'Reset & close';
				reset_btn.onclick = function()
				{
					//reset all the checked items then close
					if (checkboxes[0].checked)
					{
						RemoveLocalStorageItem('Players');
					}
					if (checkboxes[1].checked)
					{
						RemoveLocalStorageItem('threads');
					}
					if (checkboxes[2].checked)
					{
						RemoveLocalStorageItem('_threads');
					}
					if (checkboxes[3].checked)
					{
						RemoveLocalStorageItem('DanHTRBP_hidingOT');
					}
					if (checkboxes[4].checked)
					{
						RemoveLocalStorageItem('MOTW');
					}
					if (checkboxes[5].checked)
					{
						RemoveLocalStorageItem('DanHTRBP_hidingUI');
					}
					if (checkboxes[6].checked)
					{
						RemoveLocalStorageItem('localStorage.DanHTRBP_hide_blank_name');
					}
					if (checkboxes[7].checked)
					{
						RemoveLocalStorageItem('localStorage.DanHTRBP_hide_threads');
					}
					if (checkboxes[8].checked)
					{
						RemoveLocalStorageItem('localStorage.DanHTRBP_hide_replies');
					}

					//update everything
					localStorageChecks();
					PlayersToP();
					threadsToT();
					_threadsTo_t();

					if (allF && checkboxes[3].checked && localStorage.DanHTRBP_hidingOT === '0')
					{
						//show OT threads and hide the downvoted OT threads
						OT.removeClassNames();
					}

					hideThreads();//if on forum, hide threads
					hideReplies();//if on a thread, hide replies
					ui.disableButtons();//(un)disable buttons
					ui.HideLayer(reset_ui);
				};
				reset_ui.defaultAction = function(){reset_btn.click();};
			}

			ui.ShowLayer(reset_ui);
			}catch(err){HandelErr(err);}
		}
	},
	isMultiple: function(LSITEM, TEXT)
	{
		try{
		var	ObjectLS = LSITEM.split(',');

		for (var ObjectLSNo = 0; ObjectLSNo < ObjectLS.length; ObjectLSNo++)
		{
			if (TEXT === ObjectLS[ObjectLSNo])
			{
				return true;//prevent returning false if duplicate found
			}
		}

		return false;
		}catch(err){HandelErr(err);}
	},
	view: function(keyName)
	{
		var stored_item = localStorage.getItem(keyName);
		var msg_txt;

		if (stored_item.match(/,/) && keyName !== 'Players' || keyName === 'Players')
		{
			msg_txt = 'Currently ';

			if (keyName === 'threads')
			{
				msg_txt += 'not ';
			}

			msg_txt += 'hiding ';

			if (keyName === 'Players')
			{
				msg_txt += 'posts by ';
			}

			msg_txt += 'these ' + keyName.toLowerCase().replace('_', '') + ':' + ui.CreateHTMLStringList(keyName);
		}
		else
		{
			msg_txt = 'You ';

			if (keyName === '_threads')
			{
				msg_txt += 'are';
			}
			else
			{
				msg_txt += 'do';
			}

			msg_txt += "n't ";

			if (keyName === '_threads')
			{
				msg_txt += 'hiding any individual threads';
			}
			else
			{
				msg_txt += 'have any ' + keyName.toLowerCase() + ' on your ';

				if (keyName === 'Players')
				{
					msg_txt += 'Blocklist';
				}
				else
				{
					msg_txt += 'Thread Exceptions';
				}

			}

			msg_txt += '.';
		}

		ui.Alert(msg_txt);
	},
	players:
	{
		view: function()
		{
			try{
			config.view('Players');
			}catch(err){HandelErr(err);}
		},
		add: function()
		{
			try{
			var add_players_ui = document.getElementById('add_players_ui');

			if (!add_players_ui)
			{
				add_players_ui = ui.AddLayer(1);
				add_players_ui.id = 'add_players_ui';

				var btns = ui.MakeBigBlueBtns(['Add players via profile link', 'Add players via username', 'Add players via player id', 'Add players via Blacklist', 'Close'], add_players_ui);

				btns[0].onclick = function(){blocklist.addUsing.links();};
				btns[1].onclick = function(){blocklist.addUsing.names();};
				btns[2].onclick = function(){blocklist.addUsing.ids();};
				btns[3].onclick = function(){blocklist.addUsing.blacklist();};

				var close_btn = btns[4];

				close_btn.onclick = function(){ui.HideLayer(add_players_ui);};
				close_btn.className += ' Darkblue';

				css.addCss(['#add_players_ui div', ['height', '30px'], ['margin-top', '10px'], ['padding', '0 3px'], '#add_players_ui div:first-child', ['margin-top', '0']]);
				add_players_ui.defaultAction = function(){close_btn.click();};
			}

			ui.ShowLayer(add_players_ui);
			}catch(err){HandelErr(err);}
		},
		remove: function()
		{
			blocklist.remove();
		}
	},
	threads:
	{
		view: function()
		{
			try{
			config.view('threads');
			}catch(err){HandelErr(err);}
		},
		add: function(threads)
		{
			try{
			ui.AddRemoveMany('threads', 'threads', 0, 1, undefined, threads);
			}catch(err){HandelErr(err);}
		},
		remove: function(threads)
		{
			try{
			ui.AddRemoveMany('threads', 'threads', 1, 1, undefined, threads);
			}catch(err){HandelErr(err);}
		}
	},
	_threads:
	{
		update: function()
		{
			try{
			localStorageChecks();//updates definition of _threads
			_threadsTo_t();//updates _t
			hideThreads();//refreshes threads
			CreateAddToThreadExceptionsHiddenThreadsOnThread();
			}catch(err){HandelErr(err);}
		},
		view: function()
		{
			try{
			config.view('_threads');
			}catch(err){HandelErr(err);}
		},
		add: function(threads)
		{
			try{
			ui.AddRemoveMany('_threads', 'threads', 0, 1, undefined, threads);
			}catch(err){HandelErr(err);}
		},
		remove: function(threads)
		{
			try{
			ui.AddRemoveMany('_threads', 'threads', 1, 1, undefined, threads);
			}catch(err){HandelErr(err);}
		},
		removeThread: function(thread)
		{
			try{
			localStorage.setItem('_threads', localStorage._threads.replace(',' + thread, ''));
			this.update();
			}catch(err){HandelErr(err);}
		}
	}
};

//config script without using ui
window.configDan =
{
	blocklist:
	{
		addUsing:
		{
			links: blocklist.addUsing.links,
			names: blocklist.addUsing.names,
			ids: blocklist.addUsing.ids,
			blacklist: blocklist.addUsing.blacklist
		},
		remove: blocklist.remove,
		view: config.players.view,
		updatePlayerData: blocklist.updatePlayerData
	},
	threads:
	{
		exceptions:
		{
			add: config.threads.add,
			remove: config.threads.remove,
			view: config.threads.view
		},
		hidden:
		{
			add: config._threads.add,
			remove: config._threads.remove,
			view: config._threads.view
		}
	},
	change:
	{
		hideBlankName: config.ChangeHideBlankName,
		motw: config.ChangeMOTW,
		hidingOT: config.ChangeHidingOT,
		hidingUI: config.ChangeHidingUI,
		hideThreads: config.ChangeHideThreads,
		hideReplies: config.ChangeHideReplies
	},
	exportSettings: config.settings.Export,
	importSettings: config.settings.Import,
	resetSettings: config.settings.Reset,
	version: v
};

//main
var	sHT = document.createElement("button"),
	hT = document.createElement("button"),
	td1 = document.createElement("td"),
	settings_btn = document.createElement("a"),
	a = document.getElementsByTagName("a"),
	aNo = 0,
	f = document.getElementsByTagName("font"),
	fNo = 0,
	dhCN = document.getElementsByClassName('detail_hidden'),
	dsCN = document.getElementsByClassName('detail_shown'),
	dbCN = document.getElementsByClassName('detail_blank');

window.a = a;
window.dhCN = dhCN;
window.dsCN = dsCN;
window.dbCN = dbCN;

function setTheadClassNames()
{
	try{
	//this allows the jump to last page functionality to stay
	var aNo = 0;
	var curr_a;
	var curr_a_href;

	while (aNo < a.length)
	{
		curr_a = a[aNo];
		curr_a_href = curr_a.href;

		if (curr_a_href.match(/\/\Discussion\/\?ID=/i) || curr_a_href.match(/\/\Forum\/\d/i))
		{
			if (!curr_a_href.match(/\?Offset=\d/i) && !curr_a_href.match(/\&Offset=\d/i))
			{
				curr_a.className = 'ThreadLink';
			}
		}

		aNo++;
	}
	}catch(err){HandelErr(err);}
}

var ThreadLink = document.getElementsByClassName("ThreadLink");
window.ThreadLink = ThreadLink;

var TBL;

//styling info for hidden and unhidden threads
var detailShownRules = '';

if (allF || subForum || clanF || mail)
{
	detailShownRules = '-row';
}

//hides all-caps subjects
function hideAllCaps(ThreadLinkNo)
{
	try{
	var curr_thread_link = ThreadLink[ThreadLinkNo];

	curr_thread_link.parentElement.parentElement.className += 'detail_hidden';
	curr_thread_link.title = 'This thread has an all-caps subject';
	console.log('ThreadLink[' + ThreadLinkNo + '].innerHTML = ' + curr_thread_link.innerHTML);
	}catch(err){HandelErr(err);}
}

//vars required for UI and hide/show replies
var psttbls = [],
	psttbl = "",
	psttblNo = 0,
	cIds = [],
	cId = "",
	cIdsNo = 0;

//makes it possible to hide and show OT threads
var OT =
{
	buttonTd: document.createElement('td'),
	buttons:
	{
		hide: document.createElement('button'),
		show: document.createElement('button')
	},
	hidden: document.getElementsByClassName('OT_hidden'),
	shown: document.getElementsByClassName('OT_shown'),
	no: (function(){return OT.hidden.length-1;}),
	show: function()
	{
		try{
		OT.buttons.hide.style.display = 'none';

		console.log('OT.no() = ' + OT.no());
		while (OT.no() < OT.hidden.length && OT.no() >= 0)
		{
			OT.hidden[OT.no()].className = OT.hidden[OT.no()].className.replace('OT_hidden', 'OT_shown');
			console.log('unhid OT thread');
			OT.no = (function(){return OT.hidden.length-1;});
		}

		OT.buttons.show.style.display = 'block';
		if (OT.shown.length > 0)
		{
			if (OT.shown.length > 1)
			{
				OT.buttons.show.innerHTML = 'Hide ' + OT.shown.length + ' off-topic threads';
			}
			else
			{
				OT.buttons.show.innerHTML = 'Hide 1 off-topic thread';
			}
		}
		}catch(err){HandelErr(err);}
	},
	hide: function()
	{
		try{
		OT.buttons.show.style.display = 'none';

		var	subForumCN = document.getElementsByClassName('sub-forum'),
			subForumCNNo = 0,
			curr_subforum;

		//search through all threads
		while (subForumCNNo < subForumCN.length)
		{
			curr_subforum = subForumCN[subForumCNNo];

			if (curr_subforum.innerHTML.includes('Off-topic'))
			{
				//if the thread is in OT, hide it
				if (curr_subforum.parentNode.className.match(/OT_shown/g))
				{
					curr_subforum.parentNode.className = curr_subforum.parentNode.className.replace('OT_shown', 'OT_hidden');
				}
				else if (!curr_subforum.parentNode.className.match(/OT_hidden/g))
				{
					curr_subforum.parentNode.className += 'OT_hidden';
				}
				console.log('hid OT thread');
			}
			subForumCNNo++;
		}

		if (OT.hidden.length > 0)
		{
			if (OT.hidden.length > 1)
			{
				OT.buttons.hide.innerHTML = 'Show ' + OT.hidden.length + ' off-topic threads';
			}
			else
			{
				OT.buttons.hide.innerHTML = 'Show 1 off-topic thread';
			}
		}
		OT.buttons.hide.style.display = 'block';
		}catch(err){HandelErr(err);}
	},
	removeClassNames: function()
	{
		try{
		if (!allF)
		{
			return;
		}

		var ThreadLinkNo = 0;
		var thread_row;

		while (ThreadLinkNo < ThreadLink.length)
		{
			thread_row = ThreadLink[ThreadLinkNo].parentElement.parentElement;

			thread_row.className = thread_row.className.replace('OT_hidden', '').replace('OT_shown', '');
			console.log('removed OT thread class name');
			ThreadLinkNo++;
		}
		}catch(err){HandelErr(err);}
	}
};
OT.buttonTd.className = 'UIElement';
OT.buttons.hide.className = 'round_btn';
OT.buttons.hide.style.cursor = 'pointer';
OT.buttons.hide.onclick = function()
{
	OT.show();
	//to do: keep downvoted threads hidden
};

OT.buttons.show.className = 'round_btn';
OT.buttons.show.style.cursor = 'pointer';
OT.buttons.show.onclick = function()
{
	OT.hide();
};

//makes it possible to hide threads
function hideThreads()
{
	try{
	if (!(subForum || allF || clanF || mail))
	{
		return;
	}

	//sets thread class so that Jump to Last Page links aren't counted as threads
	setTheadClassNames();
	console.log('hiding threads');

	if (allF)
	{
		var	td = document.getElementsByTagName('td');
		var	tdNo = 0;
		var curr_td;

		while (tdNo < td.length)
		{
			curr_td = td[tdNo];
			//decide which tds are subforums
			if (curr_td.parentElement.parentElement.parentElement.className === 'table' && curr_td.children.length === 0 && !curr_td.innerHTML.match(/\d/) && curr_td.innerText !== '')
			{
				curr_td.className = 'sub-forum';
				//console.log('td[' + tdNo + '] is a sub-forum');
			}
			tdNo++;
		}	
	}

	//allows hiding threads from sub-forums
	if (allF)
	{
		if (localStorage.DanHTRBP_hidingOT === '1')
		{
				OT.hide();//hide the OT posts
				OT.buttonTd.removeAttribute('style');//show the show/hide buttons if not hiding OT posts
		}
		else
		{
			OT.buttonTd.style.display = 'none';//hide the show/hide buttons if not hiding OT posts
		}
	}
	else
	{
		OT.buttonTd.style.display = 'none';//hide the show/hide buttons if not hiding OT posts
	}

	var ThreadLinkNo = 0;
	var curr_ThreadLink;

	//hide all-caps
	var match_punctuation = function(curr_ThreadLink)
	{
		return curr_ThreadLink.innerText.match(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g);
	};
	var match_main = function(curr_ThreadLink)
	{
		var num_whitespace_matches = 0;

		if (curr_ThreadLink.innerText.match(/\s/))
		{
			num_whitespace_matches = curr_ThreadLink.innerText.match(/\s/g).length;
		}

		return curr_ThreadLink.innerText.match(/[A-Z]/g).length + num_whitespace_matches;
	};

	var current_ThreadLink_matches;
	var current_ThreadLink_matches_punctuation;

	while (ThreadLinkNo < ThreadLink.length)
	{
		curr_ThreadLink = ThreadLink[ThreadLinkNo];

		if (curr_ThreadLink.innerText.match(/[A-Z]/))
		{
			//console.log('found A-Z');
			current_ThreadLink_matches = match_main(curr_ThreadLink);
			current_ThreadLink_matches_punctuation = match_punctuation(curr_ThreadLink);

			if (curr_ThreadLink.innerText.length - 1 === current_ThreadLink_matches)
			{
				console.log('found all-caps thread');
				hideAllCaps(ThreadLinkNo);
			}
			else if (current_ThreadLink_matches_punctuation)
			{
				if (curr_ThreadLink.innerText.length - 1 === current_ThreadLink_matches + current_ThreadLink_matches_punctuation.length)
				{
					console.log('found all-caps thread');
					hideAllCaps(ThreadLinkNo);
				}
			}
		}

		fixBlank(curr_ThreadLink, '[blank subject]');

		ThreadLinkNo++;
	}

	var ThreadLinkNo = 0;
	var curr_f;
	var curr_p;
	var curr_d;

	while (ThreadLinkNo < ThreadLink.length)
	{
		//console.log('going through threads');
		curr_ThreadLink = ThreadLink[ThreadLinkNo];
		curr_f = curr_ThreadLink.nextElementSibling.nextElementSibling;
		curr_d = curr_ThreadLink.parentElement.parentElement;

		fixBlank(curr_f, ' by [blank name]', false, 0, true);

		pNo = 0;

		if (localStorage.DanHTRBP_hide_threads === '1')
		{
			while (pNo < p.length)
			{
				curr_p = ConvertPlayerIdToPlayerName(p[pNo]);

				//console.log(curr_f.innerHTML + " ===  by  + " + curr_p  + " = " + (curr_f.innerHTML === ' by ' + curr_p).toString());

				if (curr_f.innerHTML === ' by ' + curr_p || localStorage.DanHTRBP_hide_blank_name === '1' && curr_f.innerHTML === ' by [blank name]')
				{
					//hide threads by certain posters
					//console.log('curr_d.className = ' + curr_d.className);

					if (curr_d.className.match(/ detail_shown/))
					{
						console.log('matched " detail_shown"');
						curr_d.className = curr_d.className.replace(' detail_shown', ' detail_hidden');
					}
					else
					{
						//console.log('init');
						curr_d.className += ' detail_hidden';
					}

					if (curr_d.style.display === 'table-row')
					{
						curr_d.removeAttribute('style');
					}
					console.log('hid thread by ' + curr_p);
				}
				pNo++;
			}
		}

		if (localStorage.MOTW === '1')
		{
			//hide motw
			if (curr_ThreadLink.innerText.includes("Map of the week discussion: Week "))
			{
				if (curr_d.className.includes(' detail_shown'))
				{
					curr_d.className = curr_d.className.replace(' detail_shown', ' detail_hidden');
				}
				else
				{
					curr_d.className += ' detail_hidden';
				}
				curr_ThreadLink.title = 'Map of the Week is being hidden';
			}
		}
		else
		{
			if (curr_ThreadLink.innerText.includes('Map of the week discussion: Week '))
			{
				curr_d.className = curr_d.className.replace(' detail_hidden', '');
			}
		}
		ThreadLinkNo++;
	}

	var HideUnhideThreads = function(array)
	{
		var ThreadLinkNo = 0;
		var index;

		var dont_hide_thread = array === t;

		if (array.length > 1)
		{
			while (ThreadLinkNo < ThreadLink.length)
			{
				curr_ThreadLink = ThreadLink[ThreadLinkNo];
				curr_d = curr_ThreadLink.parentElement.parentElement;
				index = 0;

				while (index < array.length)
				{
					if (curr_ThreadLink.innerText.includes(array[index]))
					{
						if (dont_hide_thread)
						{
							if (!curr_d.className.includes(' detail_good'))
							{
								curr_d.className += ' detail_good';
								curr_ThreadLink.title = 'This thread is NOT being hidden';
							}
						}
						else
						{
							if (curr_d.className.includes(' detail_shown'))
							{
								curr_d.className = curr_d.className.replace(' detail_shown', ' detail_hidden');
							}
							else
							{
								curr_d.className += 'detail_shown';
							}
							curr_ThreadLink.title = 'This thread is being hidden';
						}
					}
					index++;
				}
				ThreadLinkNo++;
			}
		}
	};

	HideUnhideThreads(t);//thread exceptions
	HideUnhideThreads(_t);//hides individual threads

	hT.style.display = 'none';

	if (dhCN.length > 0)
	{
		if (dhCN.length > 1)
		{
			sHT.innerHTML = 'Show ' + dhCN.length + ' hidden threads';
		}
		else
		{
			sHT.innerHTML = 'Show 1 hidden thread';
		}
		sHT.style.display = 'block';
	}
	else
	{
		sHT.style.display = 'none';
	}
	console.log('hid threads');
	}catch(err){HandelErr(err);}
}

function showHiddenThreads()
{
	//makes it possible to show hidden threads
	try{
	console.log('showing hidden threads');

	var	dhNo = 0;
	var curr_dh;

	while (dhNo < dhCN.length)
	{
		curr_dh = dhCN[dhNo];

		if (curr_dh.className.includes('OT_hidden'))
		{
			curr_dh.style.display = 'table-row';
		}

		curr_dh.className = curr_dh.className.replace(' detail_hidden', ' detail_shown').replace('detail_hidden', 'detail_shown');
		dhNo = dhNo;
	}

	sHT.style.display = 'none';

	if (dsCN.length > 0)
	{
		if (dsCN.length > 1)
		{
			hT.innerHTML = 'Hide ' + dsCN.length + ' threads';
		}
		else
		{
			hT.innerHTML = 'Hide 1 thread';
		}
		hT.style.display = 'block';
	}
	else
	{
		hT.style.display = 'none';
	}
	console.log('shown hidden threads');
	}catch(err){HandelErr(err);}
}

function hideReplies()
{
	try{
	if (!(threadP || discussionP))
	{
		return;
	}
	if (localStorage.DanHTRBP_hide_replies === '0')
	{
		return;
	}

	var table_left_col;
	var table_left_col_child;
	var table_left_col_child_counter;
	var players = [];
	var player_account_num;
	var playerNo = 0;

	var aNo = 0;
	var curr_a;

	var tables = document.getElementsByTagName('table');
	var table_counter = 0;
	var table;

	while (table_counter < tables.length)
	{
		//get the post tables
		table = tables[table_counter];

		if (table.id.match(/PostTbl_/) && table.className.match(/region/))
		{
			psttbls.push(table);

			//get the player that posted the comment
			table_left_col = table.firstElementChild.children[1].firstElementChild.children;
			table_left_col_child_counter = 0;

			while (table_left_col_child_counter < table_left_col.length)
			{
				table_left_col_child = table_left_col[table_left_col_child_counter];

				if (table_left_col_child.tagName.toLowerCase() === 'a')
				{
					if (table_left_col_child.href.match(/\/Profile\?p=\d/))
					{
						if (localStorage.DanHTRBP_hide_blank_name == '1' && table_left_col_child.innerText === '[blank name]')
						{
							players.push('[blank name]');
						}
						else
						{
							player_account_num = table_left_col_child.href.split(/\/Profile\?p=/)[1];
							players.push(player_account_num.substring(2, player_account_num.length - 2));
						}
					}
				}
				table_left_col_child_counter++;
			}
		}
		table_counter++;
	}

	//hide main
	playerNo = 0;
	psttblNo = 0;

	var curr_psttbl;
	var player;

	while (playerNo < players.length)
	{
		curr_psttbl = psttbls[psttblNo];
		pNo = 0;

		while (pNo < p.length)
		{
			player = players[playerNo];
			if (player === (p[pNo]) || player === '[blank name]' && localStorage.DanHTRBP_hide_blank_name == '1')
			{
				if (curr_psttbl.className.match(/ detail_shown/))
				{
					curr_psttbl.className = curr_psttbl.className.replace(' detail_shown', ' detail_hidden');
				}
				else
				{
					curr_psttbl.className += ' detail_hidden';
				}
				console.log('hid post by ' + player);
			}
			pNo++;
		}
		playerNo++;
		psttblNo++;
	}
	psttblNo = 0;

	//hides show downvoted/hidden reply link if a player on the hide list has had their comment to be downvoted or hidden
	fNo = 0;
	pNo = 0;
	var curr_f;
	window.f = [];
	
	while (fNo < f.length)
	{
		curr_f = f[fNo];
		pNo = 0;

		while (pNo < p.length)
		{
			if (curr_f.innerHTML.includes('- downvoted') || curr_f.innerHTML.includes('- hidden') && curr_f.nextElementSibling.children[0].children[1].children[0].innerHTML.includes(p[pNo]))
			{
				curr_f.style.display = 'none';
			}
			pNo++;
		}
		fNo++;
	}

	hT.style.display = 'none';

	if (dhCN.length > 0)
	{
		if (dhCN.length > 1)
		{
			sHT.innerHTML = 'Show ' + dhCN.length + ' hidden replies';
		}
		else
		{
			sHT.innerHTML = 'Show 1 hidden reply';
		}
		sHT.style.display = 'block';
	}
	else
	{
		sHT.style.display = 'none';
	}
	}catch(err){HandelErr(err);}
}

function showHiddenReplies()
{
	try{
	var curr_psttbl;

	while (psttblNo < psttbls.length)
	{
		curr_psttbl = psttbls[psttblNo];
		curr_psttbl.setAttribute("class", curr_psttbl.className.replace(' detail_hidden', ' detail_shown'));
		psttblNo++;
	}

	sHT.style.display = 'none';

	if (dsCN.length > 0)
	{
		if (dsCN.length > 1)
		{
			hT.innerHTML = 'Hide ' + dsCN.length + ' replies';
		}
		else
		{
			hT.innerHTML = 'Hide 1 reply';
		}
		hT.style.display = 'block';
	}
	else
	{
		hT.style.display = 'none';
	}
	}catch(err){HandelErr(err);}
}

function runHideThreadsAndRepliesMain()
{
	if (subForum || allF || clanF || mail)
	{
		try{
		var _table = document.getElementsByTagName('table')[document.getElementsByTagName('table').length - 1];

		if (_table)
		{
			if (_table.childNodes[1])
			{
				if (_table.childNodes[1].childNodes[0])
				{
					//defines where the X threads/posts hidden should be
					TBL = _table.childNodes[1].childNodes[0];
				}
			}
		}

		//spam
		var spam = [25, 5, 5, 5, 5, 20, 5, 5];

		spam[8] = spam.reduce((function(total, number){return total + number;}));
		//spam order is: general, map development, ladder, programming, help, OT, clans, strategy, all

		/*if (subForum || allF)
		{
			var createdElements = dom.create(['td', 'a'], 'spamTd', ['', 'Jump to non-spam threads'], [TBL, 0]);
			var jumpToNonSpamTd = createdElements[0];
			var jumpToNonSpamLink = createdElements[1];

			dom.append(jumpToNonSpamTd, jumpToNonSpamTd.previousElementSibling, 'beforebegin');

			var setJumpToEndOfSpamLinksDetails = function(pageCounter)
			{
				var pagesOfSpam = spam[pageCounter];

				if (!pagesOfSpam && pagesOfSpam !== 0)
				{
					return;
				}
			
				jumpToNonSpamLink.href = location.href.replace('#', '').replace(new RegExp(string.escapeRegExpChars('?Offset=') + '.')) + '?Offset=' + (pagesOfSpam * 50);

				if (pagesOfSpam < 1)
				{
					jumpToNonSpamTd.style.display = 'none';
				}

				setJumpToEndOfSpamLinksDetails(pageCounter + 1);
			};

			setJumpToEndOfSpamLinksDetails(0);
		}*/

		//make reset and restore buttons
		if (TBL)
		{
			td1.id = 'btnTd';
			td1.className = 'UIElement';
			TBL.appendChild(td1);

			td1.parentNode.insertBefore(td1, td1.parentNode.childNodes[0]);

			sHT.className = 'round_btn';
			sHT.onclick = function()
			{
				showHiddenThreads();
			};
			sHT.style.cursor = 'pointer';
			td1.appendChild(sHT);

			hT.className = 'round_btn';
			hT.style.cursor = 'pointer';
			hT.onclick = function()
			{
				hideThreads();
			};

			td1.appendChild(hT);

			TBL.appendChild(OT.buttonTd);
			OT.buttonTd.parentNode.insertBefore(OT.buttonTd, OT.buttonTd.parentNode.children[1]);
			OT.buttonTd.appendChild(OT.buttons.hide);
			OT.buttonTd.appendChild(OT.buttons.show);
		}

		//makes blanked-out last post by players visible by changing the text to "by [blank name]"

		fixBlank(document.getElementsByTagName('span'), 'by [blank name]', true, 2);

		if (!updating_settings_to_work_with_2point3 && !window.updating_player_data)//don't hide threads while trying to correct invalid settings!
		{
			hideThreads();//hide threads straight away
		}
		}catch(err){HandelErr(err);}
	}
	else if (threadP || discussionP)
	{
		try{
		var _table = document.getElementsByTagName("table")[document.getElementsByTagName("table").length - 2];

		if (_table)
		{
			if (_table.childNodes[1])
			{
				if (_table.childNodes[1].childNodes[0])
				{
					TBL = _table.childNodes[1].childNodes[0];
				}
			}
		}

		//turns blanked-out subjects to [blank subject] so that subject becomes visible
		fixBlank(f, '[blank subject]', true);
		fNo = 0;

		//makes reset and restore buttons
		if (TBL)
		{
			td1.id = 'btnTd';
			td1.className = 'UIElement';
			TBL.appendChild(td1);

			var btnTd = document.getElementById('btnTd');

			btnTd.parentNode.insertBefore(btnTd, btnTd.parentNode.childNodes[0]);

			sHT.className = 'round_btn';
			sHT.style.cursor = 'pointer';
			sHT.onclick = function()
			{
				showHiddenReplies();
			};
			td1.appendChild(sHT);

			hT.className = 'round_btn';
			hT.style.cursor = 'pointer';
			hT.onclick = function()
			{
				hideReplies();
			};
			td1.appendChild(hT);
		}

		//hide blank posts
		var pfds = [],
			pfd = '',
			pfdNo = 0,
			divNo = 0,
			div = document.getElementsByTagName('div'),
			curr_div;

		if (!document.getElementById('SubjectBox') && !location.pathname.includes('/Discussion/Notes'))
		{
			while (divNo < div.length)
			{
				curr_div = div[divNo];

				if (curr_div.id.includes('PostForDisplay') && curr_div.id != 'PostForDisplay_-1')
				{
					pfd = curr_div.id;
					pfds.push(pfd);
				}
				divNo++;
			}
			window.pfds = pfds;
		
			var curr_post_for_display;
			var edited_post_match;
			var tbl;
			var curr_post_for_displayMatchSpaces;
			var curr_post_for_displayIsOnlySpaces;

			while (pfdNo < pfds.length)
			{
				curr_post_for_display = document.getElementById(pfds[pfdNo]);
				edited_post_match = curr_post_for_display.innerHTML.match(/\s+<br><br><font class=\"text-muted\">Edited \d+\/\d+\/\d+ \d+:\d+:\d+.*\s+/);
				//"Edited 12/2/2017 18:13:45"
				curr_post_for_displayMatchSpaces = curr_post_for_display.innerHTML.match(/\s/g);

				if (curr_post_for_displayMatchSpaces)
				{
					curr_post_for_displayIsOnlySpaces = curr_post_for_display.innerHTML.length === curr_post_for_display.innerHTML.match(/\s/g).length;
				}

				if (curr_post_for_displayIsOnlySpaces || edited_post_match)
				{
					tbl = curr_post_for_display.parentNode.parentNode.parentNode.parentNode;

					if (edited_post_match)
					{
						if (curr_post_for_display.innerHTML.length === edited_post_match[0].length)
						{
							tbl.className = 'detail_blank';
						}
					}
					else
					{
						tbl.className = 'detail_blank';
					}
				}

				pfdNo++;
			}
			if (dbCN.length > 0)
			{
				if (dbCN.length === 1)
				{
					console.log('1 blank post was hidden.');
				}
				else if (dbCN.length > 1)
				{
					console.log(dbCN.length + ' blank posts were hidden.');
				}
			}
		}

		hideReplies();//hide replies straight away
		}catch(err){HandelErr(err);}
	}
}
//remove extra Muli's Userscript menu - a script causes this bug to happen
function removeExtraUserscriptMenu() {
	try{document.getElementsByClassName("userscript-menu")[1].remove();} catch(err) {}
}

setTimeout(removeExtraUserscriptMenu,750);
setTimeout(removeExtraUserscriptMenu,1250);

//UI
//show and hide clicked are for making it possible to show and hide the downvoted threads an unlimited amount of time
function showClicked()
{
	try{
	$('tr[data-hidden]').show();
	var show = document.getElementById("show");
	show.id = "hide";
	var hide = document.getElementById("hide");
	hide.innerHTML = hide.innerHTML.replace("Show", "Hide");
	hide.onclick = function()
	{
		hideClicked();
	};
	}catch(err){HandelErr(err);}
}

function hideClicked()
{
	try{
	$('tr[data-hidden]').hide();
	var hide = document.getElementById("hide");
	hide.id = "show";
	var show = document.getElementById("show");
	show.innerHTML = show.innerHTML.replace("Hide", "Show");
	show.onclick = function()
	{
		showClicked();
	};
	}catch(err){HandelErr(err);}
}

function FixHiddenThreadsRow()
{
	try{
	var htr = document.getElementById('HiddenThreadsRow');
	var show = htr.children[htr.children.length - 1].children[0];

	if (show)
	{
		show.id = 'show';
		show = document.getElementById('show');
		show.innerHTML = 'Show ' + show.innerHTML.replace('hidden', 'downvoted');
	}

	var td2to6 =
	[
		document.createElement('td'),
		document.createElement('td'),
		document.createElement('td'),
		document.createElement('td'),
		document.createElement('td'),
		document.createElement('td'),
		document.createElement('td')
	];

	if (allF)
	{
		if (userscripts.mulis())
		{
			//if Muli's script enabled, hidden threads row looks quite bad, so make it look nicer
			setTimeout((function() {
				var htr = document.getElementById("HiddenThreadsRow");
				var td2to6 = [
					document.createElement("td"),
					document.createElement("td"),
					document.createElement("td"),
					document.createElement("td"),
					document.createElement("td"),
					document.createElement("td"),
					document.createElement("td")
				];
				htr.appendChild(td2to6[0]);
				htr.insertBefore(td2to6[0], htr.childNodes[2]);
			}), 3000);
		}
		else
		{
			//hidden threads row looks bad, so make it look nicer
			htr.appendChild(td2to6[0]);
			htr.insertBefore(td2to6[0], htr.childNodes[0]);
			htr.appendChild(td2to6[1]);
			htr.insertBefore(td2to6[1], htr.childNodes[2]);
			htr.appendChild(td2to6[2]);
			htr.insertBefore(td2to6[2], htr.children[htr.children.length-1]);
			show.parentElement.removeAttribute('colSpan');
			show.parentElement.style.textAlign = 'left';
		}
	}
	else
	{
		var tds = [document.createElement('td'), document.createElement('td'), document.createElement('td')];

		//console.log('htr.children.length = ' + htr.children.length);
		if (htr.children.length < 4)
		{
			htr.appendChild(tds[0]);
			htr.insertBefore(tds[0], htr.children[0]);
			htr.appendChild(tds[1]);
			htr.insertBefore(tds[1], htr.children[htr.children.length-1]);
			htr.appendChild(tds[2]);
			htr.insertBefore(tds[2], htr.children[htr.children.length-1]);
			show.parentElement.removeAttribute('colSpan');
			show.parentElement.style.textAlign = 'left';
		}
	}

	show.onclick = function()
	{
		showClicked();
	};
	}catch(err){HandelErr(err);}
}

function CreateUIForSubForumsAllForumsMailAndClanForum()
{
	if (subForum || allF || clanF || mail || threadP || discussionP)
	{
		//create UI for sub-forums, all forums, mail and clan forum (i.e. non-thread pages or non-discussion pages)
		try{
		var ActionsTh0 = document.createElement('th'),
			ActionsTh1 = document.createElement('th');

		if (!threadP && !discussionP)
		{
			//prevent the threads table container from overflowing
			var preventOverflowingThreadsTableStyle = document.getElementById('preventOverflowingThreadsTableStyle');

			if (!preventOverflowingThreadsTableStyle)
			{
				preventOverflowingThreadsTableStyle = css.addCss(['div.container.p-4.mt-3.mb-5, div.container.p-4.mt-3.mb-5 > table, div.container.p-4.mt-3.mb-5 > table div:first-child', ['max-width', 'unset !important'], ['width', '100% !important'], 'span.text-muted', ['display', 'flex'], ['word-break', 'break-all !important'], ['flex-direction', 'column-reverse']])[0];
				preventOverflowingThreadsTableStyle.id = 'preventOverflowingThreadsTableStyle';
				preventOverflowingThreadsTableStyle.className = 'Dan_Style';
			}

			ActionsTh0.className = 'UIElement';
			ActionsTh0.innerHTML = 'Blocklist';
			ActionsTh0.style.cursor = 'pointer';
			ActionsTh0.onclick = function()
			{
				config.players.view();
			};
			ActionsTh1.className = 'UIElement';
			ActionsTh1.innerHTML = 'Thread Exceptions';
			ActionsTh1.style.cursor = 'pointer';
			ActionsTh1.onclick = function()
			{
				config.threads.view();
			};

			//different forum categories have different em and px sizes
			if (allF)
			{
				ActionsTh0.style.minWidth = '96px';
				ActionsTh0.style.maxWidth = '96px';
				ActionsTh1.style.minWidth = '163px';
				ActionsTh1.style.maxWidth = '163px';
			}
			else
			{
				ActionsTh0.style.minWidth = '3em';
				ActionsTh0.style.maxWidth = '3em';

				if (mail || clanF)
				{
					ActionsTh1.style.minWidth = '5em';
					ActionsTh1.style.maxWidth = '5em';
				}
				else
				{
					ActionsTh1.style.minWidth = '7em';
					ActionsTh1.style.maxWidth = '7em';
				}
			}

			var headings_row = ThreadLink[0].parentElement.parentElement.previousElementSibling;

			if (headings_row.tagName !== 'TR')
			{
				headings_row = headings_row.previousElementSibling;
			}

			headings_row.appendChild(ActionsTh0);
			headings_row.appendChild(ActionsTh1);

			//center the buttons that will be created and vertically align table date to the middle
			css.addCss(['.PlayersTD, .ThreadExceptionsTD, .sub-forum', ['text-align', 'center'], '.table td', ['vertical-align', 'middle !important']])[0].className = 'Dan_Style';

			//add the Add and Remove buttons for the Blocklist and Thread Exceptions
			var ThreadLinkNo = 0;
			var curr_ThreadLink;
			var curr_d;
			var curr_f;
			var curr_s;
			var curr_blocklist;
			var curr_thread_exception;
			var PlayersTD;
			var PlayersHBtn;
			var PlayersSBtn;
			var shown_remove_from_blocklist_btn;
			var ThreadExceptionsTD;
			var ThreadExceptionsHBtn;
			var ThreadExceptionsSBtn;

			while (ThreadLinkNo < ThreadLink.length)
			{
				curr_ThreadLink = ThreadLink[ThreadLinkNo];
				curr_f = curr_ThreadLink.nextElementSibling.nextElementSibling;
				curr_d = curr_ThreadLink.parentElement.parentElement;

				if (allF)
				{
					curr_s = curr_d.children[4].children[1];
				}
				else if (mail)
				{
					curr_s = curr_d.children[2].children[1];
				}
				else
				{
					curr_s = curr_d.children[3].children[1];
				}

				PlayersTD = document.createElement('td');
				PlayersHBtn = document.createElement('button');
				PlayersSBtn = document.createElement('button');
				PlayersTD.className = 'PlayersTD';

				curr_d.appendChild(PlayersTD);

				PlayersHBtn.innerHTML = 'Add';
				PlayersHBtn.className = 'PlayersHBtn round_btn';
				PlayersSBtn.innerHTML = 'Remove';
				PlayersSBtn.className = 'PlayersSBtn round_btn';

				//decides if you get to see the hide posts or unhide posts by players button
				pNo = 0;
				shown_remove_from_blocklist_btn = false;

				//console.log('curr_f.innerText = ' + curr_f.innerText);
				while (pNo < p.length)
				{
					if (curr_f.innerText.replace(/ by /, '') === p[pNo])
					{
						PlayersHBtn.style.display = 'none';
						PlayersSBtn.style.display = 'table-row';
						shown_remove_from_blocklist_btn = true;
						
					}
					else if (!shown_remove_from_blocklist_btn)
					{
						PlayersHBtn.style.display = 'table-row';
						PlayersSBtn.style.display = 'none';
					}
					pNo++;
				}

				curr_blocklist = curr_d.children[curr_d.children.length - 1];

				curr_blocklist.appendChild(PlayersHBtn);
				curr_blocklist.appendChild(PlayersSBtn);

				ThreadExceptionsTD = document.createElement('td');
				ThreadExceptionsHBtn = document.createElement('button');
				ThreadExceptionsSBtn = document.createElement('button');

				ThreadExceptionsTD.className = 'ThreadExceptionsTD';

				curr_d.appendChild(ThreadExceptionsTD);

				ThreadExceptionsHBtn.innerHTML = 'Add';
				ThreadExceptionsHBtn.className = 'threadsHBtn round_btn';
				ThreadExceptionsSBtn.innerHTML = 'Remove';
				ThreadExceptionsSBtn.className = 'threadsSBtn round_btn';

				//decides if you get to see the add or remove a thread from thread exceptions
				if (curr_ThreadLink.title === 'This thread is NOT being hidden')
				{
					ThreadExceptionsHBtn.style.display = 'none';
					ThreadExceptionsSBtn.style.display = 'table-row';
				}
				else
				{
					ThreadExceptionsHBtn.style.display = 'table-row';
					ThreadExceptionsSBtn.style.display = 'none';
				}

				curr_thread_exception = curr_blocklist.nextElementSibling;
				curr_thread_exception.appendChild(ThreadExceptionsHBtn);
				curr_thread_exception.appendChild(ThreadExceptionsSBtn);
		
				curr_f.className = 'PlayerName';
				//curr_f.innerHTML = ' by 12345678901234567890123456789012345678901234567890';
				//curr_ThreadLink.innerHTML = '12345678901234567890123456789012345678901234567890';
				//curr_s.innerHTML = 'by 12345678901234567890123456789012345678901234567890';
				if (ActionsTh0.parentNode.childNodes[5].style.minWidth !== '468px')
				{
					if (curr_f.innerHTML.length + curr_s.innerHTML.length > 85)
					{
						//resize thread width to make the table look better
						//if thread poster name last replier length is greater than 85
						ActionsTh0.parentNode.childNodes[5].style.minWidth = '468px';
						ActionsTh0.parentNode.childNodes[5].style.maxWidth = '468px';
					}
				}
				ThreadLinkNo++;
			}
		}

		//assigning onclick using a normal loop doesn't work how it should, so using a function that makes each onclick for each type of button one at a time - this works how it should
		var DecideOnClickForBtn = function(btn_no, btn_for_what, mode, addingUsingPlayerName)
		{
			var btn;
			var btn_type;
			var btnClassName = btn_for_what;

			if (mode === 'add')
			{
				btnClassName += 'H';
			}
			else
			{
				btnClassName += 'S';
			}

			btnClassName += 'Btn';
			btn = document.getElementsByClassName(btnClassName)[btn_no];

			if (btn_for_what === 'Players')
			{
				btn_type = document.getElementsByClassName('PlayerName');
			}
			else
			{
				btn_type = ThreadLink;
			}
	
			if (btn)
			{
				btn.onclick = function()
				{
					addRemoveItemToFromStorage(btn_for_what, btn_type[btn_no].innerHTML, mode, addingUsingPlayerName);
				};
				GiveOnClickToBtn(btn_no + 1, btn_for_what, mode, addingUsingPlayerName);
			}
			else
			{
				if (btn_for_what === 'Players' && mode === 'add')
				{
					GiveOnClickToBtn(0, 'Players', 'remove', true);
				}
				else if (btn_for_what === 'Players' && mode === 'remove')
				{
					GiveOnClickToBtn(0, 'threads', 'remove');
				}
				else if (btn_for_what === 'threads' && mode === 'remove')
				{
					GiveOnClickToBtn(0, 'threads', 'add');
				}
			}
		};

		var GiveOnClickToBtn = function(btn_no, btn_for_what, mode, addingUsingPlayerName)
		{
			DecideOnClickForBtn(btn_no, btn_for_what, mode, addingUsingPlayerName);
		};

		GiveOnClickToBtn(0, 'Players', 'add', true);

		if (document.getElementById('HiddenThreadsRow'))
		{
			FixHiddenThreadsRow();
		}
		}catch(err){HandelErr(err);}
	}
}

function CreateButtons(ids, type)
{
	if (!Array.isArray(ids))
	{
		return;
	}

	var createdBtns = [];
	var btn;
	var btnId;

	for (var btnNo = 0; btnNo < ids.length; btnNo++)
	{
		btnId = ids[btnNo];
		btn = document.createElement('input');
		btn.id = btnId.replace(/\s/g, '') + 'Btn';
		btn.type = type;
		btn.value = btnId.replace('add', '+ ').replace('remove', '- ');
		btn.style.cursor = 'pointer';
		createdBtns.push(btn);
	}

	return createdBtns;
}

function CreateAddToBlocklistBtnOnProfile()
{
	try{
	if (!onProfile)
	{
		return;
	}

	var BlackListImage = document.getElementById('BlackListImage');

	if (BlackListImage)
	{
		var addRemoveBlocklistRow = document.getElementById('addRemoveBlocklistRow');
		var addRemoveBlocklistTd = document.getElementById('addRemoveBlocklistTd');
		var addBlocklistBtn = document.getElementById('addBlocklistBtn');
		var removeBlocklistBtn = document.getElementById('removeBlocklistBtn');
		var playernumber = location.href.match(/\d+/)[0];
		var playerid = playernumber.substring(2, playernumber.length - 2);
		var UpdateVisual = function()
		{
			if (Players.indexOf(playerid) > -1)
			{
				addBlocklistBtn.style.display = 'none';
				removeBlocklistBtn.style.display = 'block';
			}
			else
			{
				addBlocklistBtn.style.display = 'block';
				removeBlocklistBtn.style.display = 'none';
			}
		};

		if (!addRemoveBlocklistRow)
		{
			addRemoveBlocklistRow = document.createElement('tr');
			addRemoveBlocklistTd = document.createElement('td');
			addRemoveBlocklistRow.id = 'addRemoveBlocklistRow';
			addRemoveBlocklistTd.id = 'addRemoveBlocklistTd';
			addRemoveBlocklistTd.colSpan = '2';

			var addRemoveBlocklistBtns = CreateButtons(['addBlocklist', 'removeBlocklist'], 'button');

			addBlocklistBtn = addRemoveBlocklistBtns[0];
			removeBlocklistBtn = addRemoveBlocklistBtns[1];

			addBlocklistBtn.style.width = '100%';
			addBlocklistBtn.onclick = function()
			{
				blocklist.addUsing.ids([playerid]);
				UpdateVisual();
			};
			removeBlocklistBtn.style.width = '100%';
			removeBlocklistBtn.onclick = function()
			{
				blocklist.remove([playerid]);
				UpdateVisual();
			};

			UpdateVisual();
			BlackListImage.parentElement.parentElement.parentElement.parentElement.appendChild(addRemoveBlocklistRow);//is the tbody of the add/remove from blacklist/friends, private notes, mail buttons
			addRemoveBlocklistRow.appendChild(addRemoveBlocklistTd);
			dom.append([addBlocklistBtn, removeBlocklistBtn], addRemoveBlocklistTd);
		}

		UpdateVisual();
	}
	}catch(err){HandelErr(err);}
}

function CreateAddToThreadExceptionsHiddenThreadsOnThread()
{
	try{
	if (!(threadP || discussionP))
	{
		return;
	}

	var postReplyLink = window.$('a').filter("[href $= '#Reply']")[0];
	var threadExceptionsHiddenThreadsContainer = document.getElementById('threadExceptionsHiddenThreadsContainer');
	var addHiddenThreadsBtn = document.getElementById('addHiddenThreadsBtn');
	var removeHiddenThreadsBtn = document.getElementById('removeHiddenThreadsBtn');
	var addThreadExceptionsBtn = document.getElementById('addThreadExceptionsBtn');
	var removeThreadExceptionsBtn = document.getElementById('removeThreadExceptionsBtn');
	var threadSubject = document.title.replace(' - Play Risk Online Free - Warzone', '');
	var UpdateVisual = function()
	{
		if (_threads.indexOf(threadSubject) > -1)
		{
			addHiddenThreadsBtn.style.display = 'none';
			removeHiddenThreadsBtn.style.display = 'inline-block';
		}
		else
		{
			addHiddenThreadsBtn.style.display = 'inline-block';
			removeHiddenThreadsBtn.style.display = 'none';
		}
		if (threads.indexOf(threadSubject) > -1)
		{
			addThreadExceptionsBtn.style.display = 'none';
			removeThreadExceptionsBtn.style.display = 'inline-block';
		}
		else
		{
			addThreadExceptionsBtn.style.display = 'inline-block';
			removeThreadExceptionsBtn.style.display = 'none';
		}
	};

	if (!threadExceptionsHiddenThreadsContainer)
	{
		threadExceptionsHiddenThreadsContainer = document.createElement('div');
		threadExceptionsHiddenThreadsContainer.id = 'threadExceptionsHiddenThreadsContainer';

		var btns = CreateButtons(['addHidden Threads', 'removeHidden Threads', 'addThread Exceptions', 'removeThread Exceptions'], 'button');

		addHiddenThreadsBtn = btns[0];
		removeHiddenThreadsBtn = btns[1];
		addThreadExceptionsBtn = btns[2];
		removeThreadExceptionsBtn = btns[3];

		addHiddenThreadsBtn.onclick = function()
		{
			config._threads.add([threadSubject]);
			UpdateVisual();
		};
		removeHiddenThreadsBtn.onclick = function()
		{
			config._threads.remove([threadSubject]);
			UpdateVisual();
		};
		addThreadExceptionsBtn.onclick = function()
		{
			config.threads.add([threadSubject]);
			UpdateVisual();
		};
		removeThreadExceptionsBtn.onclick = function()
		{
			config.threads.remove([threadSubject]);
			UpdateVisual();
		};

		dom.append(threadExceptionsHiddenThreadsContainer, postReplyLink, 'afterend');
		dom.append(btns, threadExceptionsHiddenThreadsContainer);
		UpdateVisual();
	}

	UpdateVisual();
	}catch(err){HandelErr(err);}
}

function runUpdateThread()
{
	try{
	var page = window;
	var main = function()
	{
		var changes = localStorage.DanHTRBP_version_changes;
		var changes_split = changes.split('.');
		var changes_formatted_str = '';

		for (var changes_split_counter = 0; changes_split_counter < changes_split.length; changes_split_counter++)
		{
			changes_formatted_str += '[*] ' + changes_split[changes_split_counter] + '.\n';
		}

		page.document.getElementById('TextArea_-1').value = v + ' changes:\n[list]\n' + changes_formatted_str.replace('\n[*] .', '') + '[/list]';
		RemoveLocalStorageItem('DanHTRBP_version_changes');
		page.document.getElementById('SubmitPostBtn_-1').click();
	};
	var thread_page;
	var thread_page_url = 'https://www.warzone.com/Forum/299366-hide-threads-replies-poster-official-3';

	if (location.href.match(new RegExp(string.escapeRegExpChars(thread_page_url))))
	{
		main();
	}
	else
	{
		thread_page = open(thread_page_url);
		page = thread_page;
		thread_page.onload = function()
		{
			thread_page.onload = function()
			{
				thread_page.close();
			};
			main();
		};
	}
	}catch(err){HandelErr(err);}
}

var todaysdate = new Date();

if (todaysdate.getMonth() === 3 && todaysdate.getDate() === 1)
{
	//if april fools
	obscurify();

	//allow password to unobscurify to be entered
	(function()
	{
		var id = 'unobscurifyPWSettingBtn';
		var unobscurifyPWSettingBtn = elementExists(id, function()
		{
			return dom.create('div', id, '46 01101001 120 20 01010100 101 78 01110100', document.getElementById('bottom_row'));//Fix Text
		});

		unobscurifyPWSettingBtn.className = 'FlexContainer Flex3 Centered SettingsBtn Darkblue';
		unobscurifyPWSettingBtn.onclick = function()
		{
			var enterPWPrompt;
			var correctPW = "Dan is #1 WarZoner!";
			var checkIfPasswordIsCorrect = function()
			{
				var enteredPW = enterPWPrompt.value;

				if (enteredPW === correctPW)
				{
					ui.AlertErr('Correct password entered');
					password = true;
					obscurify('unobscurify');
				}
				else
				{
					ui.AlertErr('49 01101110 99 6F 01110010 114 65 01100011 116 20 01110000 97 73 01110011 119 6F 01110010 100');//Incorrect password
				}
			};

			enterPWPrompt = ui.Prompt('45 01101110 116 65 01110010 32 50 01100001 115 73 01110111 111 72 01100100', checkIfPasswordIsCorrect);//Enter Password
		};
	})();
}

//downvote spam section

function downvoteSpamPosts(iframeContent, spammerName, timeWhenSpamStarted)
{
	try{
	let threads = iframeContent.querySelectorAll('table.table tbody tr');
	let threadsLen = threads.length;
	let someThreadsLeftToDownvote = true;

	for (var i = 0; i < threadsLen; i++)
	{
		let thread = threads[i];
		let by = thread.querySelector('td font');
		if (by)
			by = by.innerText.replace('by ', '');
		let threadLastPostDateTime = thread.querySelector('td[align = "right"]');
		if (threadLastPostDateTime)
			threadLastPostDateTime = threadLastPostDateTime.firstChild.textContent;
		let downvoteBtn = thread.querySelector('td div[id ^= "Voting_"] img[src = "https://warzonecdn.com/Images/ThumbsDown.png"]');

		if (by == spammerName && downvoteBtn)
		{
			threadLastPostDateTime = new Date(threadLastPostDateTime).getTime();

			if (threadLastPostDateTime >= timeWhenSpamStarted)
			{
				downvoteBtn.click();
			}
			else if (threadLastPostDateTime < timeWhenSpamStarted)
			{
				someThreadsLeftToDownvote = false;
				console.log('done everything');
				break;
			}
		}
	}

	console.log('downvoted all spam on page');

	return someThreadsLeftToDownvote;
	}catch(err){HandelErr(err);}
}

function getOffset(src)
{
	if (!src) return;

	//https://www.warzone.com/forum/forum?Offset=50
	let offset = src.match(/\?offset=(\d+)/i);

	if (offset)
		offset = parseInt(offset[1]);
	else
		offset = 0;

	return offset;
}

function setIframeSrc(src)
{
	if (!src) return;

	try{
	let appendIframe = false;
	let createIframe = function()
	{
		let iframe = document.createElement('iframe');
		appendIframe = true;
		return iframe;
	};
	let iframe = document.getElementById('downvoteSpamPostsIframe') || createIframe();

	window.isIframe = undefined;

	if (window.location.href == src)
	{
		window.contentDocument = document;
		window.contentWindow = window;
		window.src = src;
		window.isIframe = false;
		return window;//firefox doesn't do iframes with same src as window
	}

	iframe.isIframe = true;
	iframe.id = 'downvoteSpamPostsIframe';
	iframe.src = src;
	iframe.style.height = '1px';
	iframe.style.width = '1px';

	if (appendIframe)
		document.body.appendChild(iframe);

	return iframe;
	}catch(err){HandelErr(err);}
}

function onloadGetv2(url, onloadHandeler)
{
	if (!url) return;

	console.log('url = ' + url);

	let iframe = setIframeSrc(url);

	iframe.onload = function(e)
	{
		onloadHandeler(iframe.contentWindow.document || iframe.contentDocument, e);
	};

	return iframe;
}

function downvoteAllSpamPosts(spammerName, timeWhenSpamStartedStr)
{
	// have to do this to make the variables 'known' to setSpammerName and setTimeWhenSpamStartedStr without causing reference errors
	let tmp =
	{
		spammer: spammerName,
		spamStartTime: timeWhenSpamStartedStr,
		cont: true,
		spamStartTimeIsInvalid: true
	};

	const setSpammerName = function() {
		if (typeof tmp.spammer != 'string') {
			tmp.spammer = (function(){return prompt('Enter spammer name.');})();
		}

		if (tmp.spammer == null || tmp.spammer == '') {
			tmp.cont = false;
			return;
		}

		if (typeof tmp.spammer != 'string') {
			alert('Name must be a string');
			return setSpammerName();
		}
	};
	const setTimeWhenSpamStartedStr = function() {
		if (!tmp.cont) {return;}

		if (typeof tmp.spamStartTime != string) {
			tmp.spamStartTime = (function() {
				return prompt('Enter spam start time (US time date format). E.g. 11/6/2018 05:59:29');
			})();
		}

		if (tmp.spamStartTime == null || tmp.spamStartTime == '') {
			tmp.cont = false;
			tmp.spamStartTimeIsInvalid = false;
			return;
		}

		if (typeof tmp.spamStartTime != 'string') {
			alert('Must be a string');
			return setTimeWhenSpamStartedStr();
		}

		if (!tmp.spamStartTime.match(/\d+\/\d+\/\d+\s+\d+:\d+:\d+/)) {
			alert('Invaild date');
			return setTimeWhenSpamStartedStr();
		}

		tmp.spamStartTimeIsInvalid = false;
	};

	setSpammerName();
	setTimeWhenSpamStartedStr();

	spammerName = tmp.spammer;
	timeWhenSpamStartedStr = tmp.spamStartTime;

	if (!tmp.cont) {return;}
	// tmp no longer used from here
	console.log('downvoting spam threads');

	let allPosts = 'https://www.warzone.com/forum/forum';
	let iframe = setIframeSrc(allPosts);
	const timeWhenSpamStarted = new Date(timeWhenSpamStartedStr).getTime();
	const threadsPerPage = 50;
	let main = function(_iframe)
	{
		let _document = _iframe;
		let src;

		if (_iframe.tagName)
		{
			_document = _iframe.contentWindow.document || _iframe.contentDocument;
			src = _iframe.src;
		}
		else
		{
			src = _iframe.location.href;
		}

		console.log('init main');

		if (downvoteSpamPosts(_document, spammerName, timeWhenSpamStarted))
		{
			let nextOffset = getOffset(src) + threadsPerPage;

			onloadGetv2(allPosts + '?Offset=' + nextOffset, function(_iframe, e)
			{
				main(_iframe);
			});
		}
	};

	if (typeof iframe.isIframe == 'boolean' && iframe.isIframe)
	{
		iframe.onload = function(e)
		{
			main(iframe);
		};
	}
	else
		main(document);
}

window.configDan.downvoteAllSpamPosts = downvoteAllSpamPosts;

//xmas update 2018

function setupXmas()
{
	if (new Date().getMonth() != 11) return;
	if (!location.href.match(/https:\/\/www\.warzone\.com\/Profile\?p=9522268564/)) return;

	const myName = document.querySelector('h1');

	myName.style.cursor = 'pointer';
	myName.onclick = function()
	{
		banter();
	};

	let banter = function()
	{
		const drawingLayerId = 'drawingLayer';
		let layer = document.getElementById(drawingLayerId);

		if (layer)
			ui.ShowLayer(layer);
		else
		{
			layer = ui.AddLayer(0);
			let title = dom.create('h2', '', 'Merry Xmas!', layer);
			let desc = dom.create('p', '', 'Enjoy this specially made drawing and checkout configDan.downvoteAllSpamPosts() in your browser\'s console!', layer);

			layer.id = drawingLayerId;
			layer.style.backgroundColor = '#191919';
			makeDrawing(layer);

			let closeBtn = ui.MakeBigBlueBtns(['Close'], layer)[0];

			closeBtn.className += ' Darkblue';
			closeBtn.onclick = function()
			{
				ui.HideLayer(layer);
			};

			ui.ShowLayer(layer);
		}
	};
}

function makeDrawing(layer)
{
	const width = 15;
	const height = 15;
	//canvas draws from top left, not bottom left, lets fix that
	const maxSqrsY = 23;
	const maxHeight = maxSqrsY * height;
	let fixY = function(expected) {return maxHeight - expected;};

	let drawing =
	{
		canvas: function()
		{
			let id = 'xmasDrawing';

			return dom.elementExists(id, function()
			{
				let element = dom.create('canvas', id, '', layer);

				element.width = String(63 * width);
				element.height = String(maxHeight);
				return element;
			});
		},
		ctx: function()	{return this.canvas().getContext('2d');},
		make:
		{
			ctx: function() {return drawing.ctx();},
			sqr: function(x, y, fill)
			{
				this.ctx().fillStyle = fill;
				this.ctx().fillRect(x, y, width, height);

				return {x: x, y: y, width: width, height: height};
			},
			rect: function(startX, startY, fill, dir, numSqrs)
			{
				const dirs = ['left', 'right', 'up', 'down'];

				if (!dirs.includes(dir))
					return;

				let prevSqr = this.sqr(startX, startY, fill);
				let i = 1;//already done 1
				let nextSqrX, nextSqrY;
				//canvas draws from top left, so smaller y means closer to top of screen
		
				while (i < numSqrs)
				{
					nextSqrX = prevSqr.x;
					nextSqrY = prevSqr.y;

					if (dir == 'left')
						nextSqrX -= prevSqr.width;
					else if (dir == 'right')
						nextSqrX += prevSqr.width;
					else if (dir == 'up')
						nextSqrY -= prevSqr.height;
					else if (dir == 'down')
						nextSqrY += prevSqr.height;

					prevSqr = this.sqr(nextSqrX, nextSqrY, fill);
					i++;
				}
			},
			diag: function(startX, startY, fill, dir, numSqrs)
			{
				const dirs = ['l&u', 'l&d', 'r&u', 'r&d'];

				if (!dirs.includes(dir))
					return;

				const dir0 = dir[0];
				const dir2 = dir[2];
				let prevSqr = this.sqr(startX, startY, fill);
				let i = 1;//already done 1
				let nextSqrX, nextSqrY;

				while (i < numSqrs)
				{
					nextSqrX = prevSqr.x;
					nextSqrY = prevSqr.y;

					if (dir0 == 'l')
						nextSqrX -= prevSqr.width;
					else if (dir0 == 'r')
						nextSqrX += prevSqr.width;

					if (dir2 == 'u')
						nextSqrY -= prevSqr.height;
					else if (dir2 == 'd')
						nextSqrY += prevSqr.height;

					prevSqr = this.sqr(nextSqrX, nextSqrY, fill);
					i++;
				}
				
			},
			slay: function()
			{
				const slayDarkYellow = '#FFD700';
				const slayMedYellow = '#FFFF00';
				const slayVDarkYellow = '#FFA500';

				const slayDarkRed = '#CC0000';
				const slayRed = '#FF0000';

				const slaySeatBrown = '#452209';

				//bottom of slay
				this.rect(4 * width, fixY(0), slayDarkYellow, 'right', 26);
				this.rect(4 * width, fixY(height), slayMedYellow, 'right', 26);
					//slay bottom curve
					this.rect(30 * width, fixY(height), slayDarkYellow, 'up', 3);
					this.rect(29 * width, fixY(3 * height), slayDarkYellow, 'up', 2);
					this.rect(28 * width, fixY(4 * height), slayDarkYellow, 'left', 3);
					this.rect(28 * width, fixY(5 * height), slayMedYellow, 'left', 2);
					this.rect(27 * width, fixY(3 * height), slayDarkYellow, 'left', 2);

				//slay elevation/legs
				this.sqr(9 * width, fixY(2 * height), slayDarkYellow);
				this.sqr(22 * width, fixY(2 * height), slayDarkYellow);

				//slay body outline
					//back
					this.rect(6 * width, fixY(3 * height), slayMedYellow, 'right', 19);
					this.diag(5 * width, fixY(4 * height), slayMedYellow, 'l&u', 2);
					this.rect(3 * width, fixY(6 * height), slayMedYellow, 'up', 4);
					this.rect(2 * width, fixY(8 * height), slayVDarkYellow, 'left', 2);
					this.diag(0, fixY(8 * height), slayDarkYellow, 'r&d', 2);
					this.rect(width, fixY(9 * height), slayDarkYellow, 'right', 2);
					//middle and front
					this.diag(4 * width, fixY(9 * height), slayMedYellow, 'r&d', 2);
					this.rect(5 * width, fixY(7 * height), slayMedYellow, 'right', 8);
					this.sqr(12 * width, fixY(6 * height), slayMedYellow);
					this.rect(13 * width, fixY(5 * height), slayMedYellow, 'right', 12);
					this.sqr(24 * width, fixY(4 * height), slayMedYellow);
					this.diag(23 * width, fixY(6 * height), slayDarkYellow, 'l&u', 4);
					this.diag(22 * width, fixY(6 * height), slayVDarkYellow, 'l&u', 2);
					this.rect(19 * width, fixY(9 * height), slayDarkYellow, 'left', 2);
					this.rect(19 * width, fixY(8 * height), slayVDarkYellow, 'left', 2);

				//slay inner
				this.rect(23 * width, fixY(4 * height), slayDarkRed, 'left', 11);
				this.sqr(12 * width, fixY(5 * height), slayDarkRed);
				this.rect(12 * width, fixY(4 * height), slayRed, 'left', 7);
				this.rect(11 * width, fixY(5 * height), slayRed, 'left', 7);
				this.rect(11 * width, fixY(6 * height), slayDarkRed, 'left', 8);
				this.rect(4 * width, fixY(7 * height), slayDarkRed, 'up', 2);

				//slay seat
				this.rect(4 * width, fixY(10 * height), slaySeatBrown, 'right', 4);
				this.rect(5 * width, fixY(9 * height), slaySeatBrown, 'right', 5);
				this.rect(6 * width, fixY(8 * height), slaySeatBrown, 'right', 5);
			},
			santa: function()
			{
				const beltBrown = '#523415';
				const skinColor = '#FFDAE0';
				const eyeBrown = '#AE773F';
				const lightGrey = '#E5E5E5';
				const lighterGrey = '#F2F2F2';
				const suitLightRed = '#E60000';
				const suitDarkRed = '#CC0000';
				const glovesGreen = '#008000';

				//legs and ass
				this.rect(11 * width, fixY(12 * height), lighterGrey, 'down', 3);
				this.rect(12 * width, fixY(10 * height), lighterGrey, 'right', 2);
				this.rect(13 * width, fixY(9 * height), lighterGrey, 'right', 3);
				this.diag(12 * width, fixY(9 * height), suitDarkRed, 'r&d', 2);
				this.rect(14 * width, fixY(8 * height), suitDarkRed, 'right', 3);

				this.rect(15 * width, fixY(7 * height), suitLightRed, 'down', 2);
				this.rect(16 * width, fixY(7 * height), suitLightRed, 'down', 2);

				//body
				this.rect(19 * width, fixY(13 * height), suitLightRed, 'left', 6);
				this.rect(17 * width, fixY(14 * height), suitLightRed, 'left', 2);
				this.rect(15 * width, fixY(14 * height), suitDarkRed, 'left', 2);
				this.rect(18 * width, fixY(12 * height), suitDarkRed, 'left', 2);
				this.diag(16 * width, fixY(12 * height), suitLightRed, 'r&d', 2);
				this.diag(15 * width, fixY(12 * height), suitLightRed, 'r&d', 2);

				this.diag(16 * width, fixY(10 * height), beltBrown, 'l&u', 4);

				this.diag(15 * width, fixY(10 * height), suitLightRed, 'l&u', 3);
				this.diag(14 * width, fixY(10 * height), suitLightRed, 'l&u', 3);
				this.sqr(12 * width, fixY(11 * height), suitLightRed);

				//face
				this.sqr(20 * width, fixY(13 * height), lightGrey);
				this.rect(19 * width, fixY(14 * height), lightGrey, 'left', 2);
				this.sqr(20 * width, fixY(14 * height), lighterGrey);
				this.rect(20 * width, fixY(15 * height), lighterGrey, 'left', 4);
				this.rect(19 * width, fixY(16 * height), lighterGrey, 'left', 3);

				this.rect(20 * width, fixY(17 * height), skinColor, 'left', 3);
				this.sqr(19 * width, fixY(18 * height), skinColor);
				this.sqr(18 * width, fixY(18 * height), eyeBrown);

				this.sqr(18 * width, fixY(19 * height), lighterGrey);
				this.diag(17 * width, fixY(19 * height), lighterGrey, 'l&d', 3);
				this.rect(17 * width, fixY(18 * height), lightGrey, 'down', 2);
				this.rect(16 * width, fixY(17 * height), lightGrey, 'down', 3);
				this.diag(15 * width, fixY(16 * height), lighterGrey, 'l&d', 2);
				this.sqr(15 * width, fixY(15 * height), lightGrey);

				//hat
				this.diag(14 * width, fixY(16 * height), suitDarkRed, 'l&u', 2);
				this.sqr(14 * width, fixY(17 * height), suitLightRed);

				this.rect(10 * width, fixY(18 * height), suitLightRed, 'right', 6);
				this.rect(12 * width, fixY(19 * height), suitLightRed, 'right', 5);

				this.rect(10 * width, fixY(17 * height), suitLightRed, 'left', 2);
				this.rect(8 * width, fixY(17 * height), lighterGrey, 'left', 2);
				this.rect(8 * width, fixY(16 * height), lightGrey, 'left', 2);

				//arms
				this.rect(23 * width, fixY(12 * height), glovesGreen, 'right', 3);
				this.rect(23 * width, fixY(11 * height), glovesGreen, 'right', 2);
				this.rect(22 * width, fixY(11 * height), lighterGrey, 'up', 2);
				this.rect(21 * width, fixY(11 * height), suitDarkRed, 'left', 3);
				this.rect(21 * width, fixY(12 * height), suitLightRed, 'left', 3);
			},
			whip: function()
			{
				const whipYellow = '#DAA520';

				this.rect(24 * width, fixY(13 * height), whipYellow, 'right', 5);
				this.rect(27 * width, fixY(12 * height), whipYellow, 'right', 4);
				this.rect(31 * width, fixY(11 * height), whipYellow, 'right', 17);
				this.rect(48 * width, fixY(12 * height), whipYellow, 'right', 5);
				this.rect(52 * width, fixY(13 * height), whipYellow, 'right', 6);
				this.rect(57 * width, fixY(12 * height), whipYellow, 'right', 4);
				this.sqr(60 * width, fixY(13 * height), whipYellow);
			},
			reindeer: function()
			{
				const deerLightBrown = '#6F370F';
				const deerDarkBrown = '#53290B';
				const redNose = '#FF0000';
				const antlerGrey = '#D8D8D8';
				const furrGrey = '#E5E5E5';

				//head
				this.rect(58 * width, fixY(13 * height), deerLightBrown, 'right', 2);
				this.rect(58 * width, fixY(14 * height), deerLightBrown, 'right', 3);
				this.sqr(61 * width, fixY(13 * height), deerLightBrown);
				this.sqr(62 * width, fixY(13 * height), redNose);
				this.rect(61 * width, fixY(12 * height), deerDarkBrown, 'right', 2);

				//antlers
				this.rect(58 * width, fixY(15 * height), antlerGrey, 'left', 2);
				this.diag(57 * width, fixY(16 * height), antlerGrey, 'r&u', 3);
				this.diag(57 * width, fixY(17 * height), antlerGrey, 'r&u', 3);

				this.diag(56 * width, fixY(18 * height), antlerGrey, 'l&u', 4);
				this.rect(53 * width, fixY(22 * height), antlerGrey, 'left', 3);

				this.rect(56 * width, fixY(20 * height), antlerGrey, 'up', 2);
				this.rect(57 * width, fixY(21 * height), antlerGrey, 'up', 3);

				this.rect(55 * width, fixY(18 * height), antlerGrey, 'left', 2);
				this.diag(53 * width, fixY(18 * height), antlerGrey, 'l&u', 2);

				//neck
				this.diag(59 * width, fixY(11 * height), furrGrey, 'l&d', 4);
				this.diag(58 * width, fixY(11 * height), deerDarkBrown, 'l&d', 3);
				this.diag(57 * width, fixY(11 * height), deerLightBrown, 'l&d', 2);
				this.diag(56 * width, fixY(11 * height), deerLightBrown, 'l&d', 2);
				this.sqr(55 * width, fixY(9 * height), deerDarkBrown);
				this.sqr(55 * width, fixY(8 * height), furrGrey);

				//body
				this.rect(54 * width, fixY(9 * height), deerLightBrown, 'left', 2);
				this.rect(54 * width, fixY(8 * height), deerLightBrown, 'left', 7);
				this.rect(49 * width, fixY(9 * height), deerLightBrown, 'left', 7);
				this.rect(47 * width, fixY(8 * height), deerDarkBrown, 'left', 2);
				this.rect(44 * width, fixY(8 * height), furrGrey, 'left', 2);
				this.rect(42 * width, fixY(8 * height), deerLightBrown, 'left', 2);
				this.diag(45 * width, fixY(8 * height), deerLightBrown, 'l&d', 3);
				this.diag(46 * width, fixY(8 * height), deerDarkBrown, 'l&d', 4);
				this.diag(47 * width, fixY(8 * height), deerDarkBrown, 'l&d', 3);
				this.rect(47 * width, fixY(7 * height), deerDarkBrown, 'right', 8);
				this.rect(46 * width, fixY(6 * height), furrGrey, 'right', 4);
				this.rect(49 * width, fixY(5 * height), furrGrey, 'right', 6);
				this.rect(50 * width, fixY(6 * height), deerDarkBrown, 'right', 6);
				this.diag(56 * width, fixY(6 * height), deerLightBrown, 'l&u', 2);
				this.rect(45 * width, fixY(5 * height), furrGrey, 'right', 2);
				this.rect(43 * width, fixY(5 * height), deerDarkBrown, 'right', 2);

				//front legs
				this.diag(56 * width, fixY(5 * height), deerDarkBrown, 'l&d', 2);
				this.diag(57 * width, fixY(5 * height), deerDarkBrown, 'l&d', 3);
				this.rect(54 * width, fixY(3 * height), deerDarkBrown, 'left', 2);

				//back legs
				this.rect(40 * width, fixY(4 * height), deerDarkBrown, 'right', 4);
				this.rect(37 * width, fixY(3 * height), deerDarkBrown, 'right', 4);
			},
			drawing: function()
			{
				drawing.make.slay();
				drawing.make.santa();
				drawing.make.whip();
				drawing.make.reindeer();
			}
		},
		paint: function()
		{
			this.make.drawing();
		}
	};

	drawing.paint();
}