// ==UserScript==
// @name         Warzone UJS-Flash
// @namespace    DanWL
// @version      1.0.5
// @description  Restores Flash features to UJS
// @author       https://greasyfork.org/en/users/85040-dan-wl-danwl
// @match        https://www.warzone.com/*
// @grant        none
// ==/UserScript==

//changes:
/**
  * Works with multiple games in same window - saves refreshing to make UJS-Flash changes to apply to the current game
  * Moved Start Over button to match layout of Flash position
**/

//known bugs:
/**
  * not applied on rematch - MP
  * not applied on try again - SP
  * start over btn not appearing when picking territories
**/

//Being able to fully customise boot/direct boot/vote to boot settings: member-only - API
//stop turn autoplay in singleplayer when committed
//add music
//add volume sliders

var activeScene;//warzone leaves previously loaded games in the background
var scenesAppliedChangesTo = [];//to prevent restarting setup when only intervals need to be recreated

function nodeListToArray(DOMArray)
{
	if (typeof DOMArray !== 'object')
	{
		return;
	}
	if (Array.isArray(DOMArray))
	{
		return DOMArray;
	}

	//DOMArray.forEach isn't a function, so convert the DOMArray into a normal array
	var newArray = [];

	for (var i = 0; i < DOMArray.length; i++)
	{
		newArray.push(DOMArray[i]);
	}

	return newArray;
}

function waitForElementToExist(object, callback)
{
	//some elements are created dynamically, so wait for them to load
	/*
	object
	{
		window: Window,
		querySelectorString: String,
		queryFrom: HTMLElement,
		findAll: bool
	}
	*/
	try
	{
		let up = 'object.querySelectorString must be a string';

		if (!(object.window instanceof Window))
			object.window = window;
		if (typeof object.querySelectorString != 'string')
			throw up;

		let _main = function()
		{
			let queryPoint = object.queryFrom;

			if (!(queryPoint instanceof HTMLElement))
				queryPoint = object.window.document;

			if (typeof object.findAll != 'boolean')
			{
				object.findAll = !!object.findAll;
			}

			let element;
			
			if (object.findAll)
			{
				element = queryPoint.querySelectorAll(object.querySelectorString);

				if (!element.length) element = null;
			}
			else
				element = queryPoint.querySelector(object.querySelectorString);

			if (element)
				callback(element);
			else
				setTimeout(_main, 100);
		};

		_main();
	}
	catch(err)
	{
		console.log(err);
	}
}

var allIntervals = [];

function setupShowOrderDetailsOnHover()
{
	var showOrderDetailsOnHover = function(callback)
	{
		var allOrders = $(activeScene.querySelectorAll('div[id ^= "ujs_OrdersListItem_"] a[id $= "_pch"]'));

		if (!allOrders.length) return false;

		allOrders.on('mouseover', function()
		{
			//double click shows order details, only do it when order is visible
			if (this.nextElementSibling.nextElementSibling.style.display != 'none')
			{
				this.click();
				this.click();
				if (typeof callback == 'function')
					callback();
			}
		});
	};

	var oldTurn = 0;

	var bindShowOrderDetails = function()
	{
		//whenever the turn changes, the current turn's orders are created

		var playBtn = activeScene.getPlayButton();
		var createCheckIfTurnAdvancedInterval = function()
		{
			return setInterval(function(){checkIfTurnAdvanced(autoResume);}, 500);
		};
		var checkIfTurnAdvancedInterval;
		var isAutoclick = false;
		var numPlayBtnClicks = 0;
		var autoResume = function()
		{
			//console.log('running callback');

			if (numPlayBtnClicks % 2 == 1)
			{
				//console.log('paused');
				clearInterval(checkIfTurnAutoAdvancedInterval);//to improve performance
				showOrderDetailsOnHover();//to apply instantly if history wasn't playing earlier
			}
			else if (numPlayBtnClicks % 2 == 0 && numPlayBtnClicks > 0)
			{
				//console.log('playing');
				isAutoclick = true;
				playBtn.click();
				isAutoclick = false;
				checkIfTurnAutoAdvancedInterval = createCheckIfTurnAutoAdvancedInterval();
			}

			//console.log('ran callback');
		};

		playBtn.onclick = function()
		{
			if (isAutoclick) return;

			numPlayBtnClicks++;
		};

		checkIfTurnAdvancedInterval = createCheckIfTurnAdvancedInterval();
	};

	var checkIfTurnAdvanced = function(callback)
	{
		var turnTxt = activeScene.querySelector('[id ^= "ujs_HistoryInfoLabel"').querySelector('[id $= "tmp"]').innerText;
		var currentTurn = turnTxt.match(/turn (\d+) of \d+/i);

		if (!currentTurn) return;

		currentTurn = parseInt(currentTurn[1]);

		if (currentTurn < oldTurn || currentTurn > oldTurn)
		{
			showOrderDetailsOnHover(callback);
			oldTurn = currentTurn;
		}
	};

	bindShowOrderDetails();
}

function setOnClick(elements, _function)
{
	var DEBUG = false;
	var isArrayLike = elements instanceof Array || elements instanceof NodeList || elements instanceof HTMLCollection || typeof elements == 'object';//object for if was jquery
	var isElement = elements instanceof HTMLElement;

	if (!isElement && !isArrayLike)
	{
		return console.log('setOnClick elements not element-like');
	}

	if (isElement)
	{
		elements = [elements];
		//convert to array - less changes required then
	}

	var numElements = elements.length;

	var runFunction = function(e)
	{
		if (DEBUG) console.log('clicked');
		_function(e);
	};
	var applyOnClick = function(i)
	{
		if (i == numElements) return;

		$(elements[i]).on('click', runFunction);//using direct doesn't get tiggered, jQuery works for some reason

		i++;
		applyOnClick(i);
	};

	applyOnClick(0);
}

function setOnClickToPlayers(_function)
{
	var players = activeScene.querySelectorAll('div[id ^= "ujs_PlayersSummaryPlayer"] a[id $= "_pch"]');

	setOnClick(players, _function);
}

function setOnClickToTeams(_function)
{
	var teams = activeScene.querySelectorAll('div[id ^= "ujs_TeamName"] div[id $= "_tmp"]');

	if (!teams) return;//not all games are team games

	setOnClick(teams, _function);
}

function setupCtrlClickNameForPlayers()
{
	var DEBUG = false;
	var hidePlayerPopupThenShowTerritories = function()
	{
		waitForElementToExist({queryFrom: activeScene, querySelectorString: 'div[id ^= "ujs_PlayerPopup"]'}, function(playerPopup)
		{
			playerPopup.style.display = 'none';

			//show territories
			//view territories using game -> statistics -> click player view btn
			waitForElementToExist({queryFrom: playerPopup, querySelectorString: 'a[href ^= "/Profile?p="]'}, function(profileLink)
			{
				var playerNo = profileLink.href.match(/\d+/)[0];
				var playerId = playerNo.substring(2, playerNo.length - 2);
				var statsBtn = activeScene.getStatisticsBtn();

				statsBtn.click();

				var statsBox = activeScene.querySelector('div[id ^= "ujs_StatisticsDialog"]');

				statsBox.style.display = 'none';

				var playerRowId = 'ujs_Row Player_' + playerId;
				if (DEBUG) console.log(playerId);

				waitForElementToExist({queryFrom: statsBox, querySelectorString: 'div[id ^= "' + playerRowId + '"]'}, function(playerRow)
				{
					waitForElementToExist({queryFrom: playerRow, querySelectorString: 'div[id ^= "ujs_HighlightBtnContainer"] div a[id ^= "ujs_Button_"]'}, function(highlightBtn)
					{
						highlightBtn.click();
						playerPopup.remove();
						statsBox.remove();
					});
				});
			});
		});
	};

	setOnClickToPlayers(function(e)
	{
		if (DEBUG) console.log('init onclick function');
		if (e.ctrlKey || e.metaKey)
		{
			hidePlayerPopupThenShowTerritories();
		}
	});
}

function setupCtrlClickNameForTeams()
{
	var DEBUG = false;
	var showTerritories = function(e)
	{
		var statsBtn = activeScene.getStatisticsBtn();

		statsBtn.click();

		var statsBox = activeScene.querySelector('div[id ^= "ujs_StatisticsDialog"]');

		statsBox.style.display = 'none';

		var teamName = e.target.innerText;

		if (DEBUG) console.log(teamName);

		waitForElementToExist({queryFrom: statsBox, querySelectorString: 'a[id ^= "ujs_TeamsTab"]'}, function(teamsTab)
		{
			teamsTab.click();//have to click the tab for team stats to appear

			waitForElementToExist({queryFrom: statsBox, querySelectorString: 'div[id ^= "ujs_Row Team_"]', findAll: true}, function(teamRows)
			{
				var checkIfTeamNameFound = function()
				{
					teamRows.forEach(function(teamRow)
					{
						if (DEBUG) console.log(teamRow);

						var teamRowTeamName = teamRow.querySelector('div[id ^= "ujs_Text"] div[id $= "tmp"].ujsInner.ujsTextInner');

						//not assuming anything is fully created

						if (!teamRowTeamName) return setTimeout(checkIfTeamNameFound, 100);

						if (teamRowTeamName.innerText == teamName)
						{
							var highlightBtn = teamRow.querySelector('div[id ^= "ujs_HighlightBtnContainer"] div a[id ^= "ujs_Button_"]')

							if (!highlightBtn) return setTimeout(checkIfTeamNameFound, 100);

							highlightBtn.click();
							statsBox.remove();
							return;
						}
					});
				};

				checkIfTeamNameFound();
			});
		});
	};

	setOnClickToTeams(function(e)
	{
		if (DEBUG) console.log('init onclick function');
		if (e.ctrlKey || e.metaKey)
		{
			showTerritories(e);
		}
	});
}

function setupCtrlClickName()
{
	setupCtrlClickNameForPlayers();
	setupCtrlClickNameForTeams();
}

function viewFullSettings(viewGameSettingsBtnAlreadyClicked, callback)
{
	var DEBUG = false;

	if (DEBUG) console.log('init viewFullSettings');

	var viewGameSettingsBtn = activeScene.getViewGameSettingsBtn();

	if (!viewGameSettingsBtnAlreadyClicked)
	{
		viewGameSettingsBtn.click();
	}

	waitForElementToExist({queryFrom: activeScene, querySelectorString: 'div[id ^= "ujs_SettingsDialog"]'}, function(settingsDialogueSmall)
	{
		if (DEBUG) console.log('opened ujs_SettingsDialog');
		settingsDialogueSmall.style.display = 'none';

		waitForElementToExist({queryFrom: settingsDialogueSmall, querySelectorString: 'a[id ^= "ujs_CloseBtn"]'}, function(settingsDialogueSmallCloseBtn)
		{
			//if clicked in area where settingsDialogueSmall is, can't interact with territories - so closing it after it's been used

			waitForElementToExist({queryFrom: settingsDialogueSmall, querySelectorString: 'a[id ^= "ujs_ViewFullSettingsBtn"]'}, function(viewFullSettingsBtn)
			{
				viewFullSettingsBtn.click();
				if (DEBUG) console.log('opened ujs_ViewFullSettingsBtn');
	
				if (typeof callback == 'function')
				{
					if (DEBUG) console.log('init viewFullSettings callback');
					callback();
				}
			});
		});
	});
}

function overwriteViewGameSettingsBtnClick()
{
	//works only as a button clicker - idealy would make it reuse settings ui but that was too difficult

	var DEBUG = false;
	var viewGameSettingsBtn = activeScene.getViewGameSettingsBtn();

	waitForElementToExist({queryFrom: activeScene, querySelectorString: 'div[id ^= "ujs_FullSettingsDialog"]'}, function(settingsDialogueBig)
	{
		settingsDialogueBig.style.display = 'none';
		//if clicked in area where settingsDialogueBig is, can't interact with territories - so can't reuse the full settings page
		waitForElementToExist({queryFrom: settingsDialogueBig, querySelectorString: 'a[id ^= "ujs_CloseBtn"]'}, function(settingsCloseBtn)
		{
			settingsCloseBtn.click();

			viewGameSettingsBtn.onclick = function()
			{
				if (DEBUG) console.log('viewGameSettingsBtn clicked');
				viewFullSettings(true);
			};
		});
	});
}

function setupViewFullGameSettingsInOneClick()
{
	viewFullSettings(false, function()
	{
		overwriteViewGameSettingsBtnClick();
	});
}

function moveStartOverToTurnOrders()
{
	var DEBUG = false;
	var startOverBtn = activeScene.getClearOrdersBtnContainer();
	var startOverTextDiv = startOverBtn.querySelector('div[class *= "ujsTextInner"]');

	startOverTextDiv.innerText = 'Start Over';

	var commitBtn = activeScene.getCommitBtnContainer();
	var commitBtnImg = activeScene.getCommitBtnImg();
	var startOverBtnImg = activeScene.getClearOrdersBtnImg();
	var startOverBtnBtn = activeScene.getClearOrdersBtn();
	var commitBtnBtn = activeScene.getCommitBtn();
	var commitBtnTextDiv = commitBtn.querySelector('div[class *= "ujsTextInner"]');
	var startOverText = startOverBtn.querySelector('div[class *= "ujsText"]');
	var commitText = commitBtn.querySelector('div[class *= "ujsText"]');
	//var commerceIcon = activeScene.querySelector('div[id ^= "ujs_Icon_Commerce"] div[id $= "tooltip"]');
	var startOverBtnY = -30;

	/*
	old for when start over btn was below commit btn
	if (DEBUG)
	{
		console.log('commerceIcon = ');
		console.log(commerceIcon);
	}

	if (commerceIcon)
	{
		//prevent start over button from being hidden by build cities icon
		startOverBtnY -= Number(commitBtnImg.style.height.replace(/\D+/, ''));
	}
	*/

	//move start over btn to the left of commit btn - uses style positioning
	//have to do this to make start over btn always clickable and not hidden
	var rowContainer = document.createElement('div');

	rowContainer.style.display = 'flex';
	commitBtn.insertAdjacentElement('beforebegin', rowContainer);
	rowContainer.appendChild(startOverBtn);
	rowContainer.appendChild(commitBtn);

	startOverBtn.style.left = '-5px';
	commitBtn.style.left = (commitBtnBtn.style.width.match(/\d+/)[0] * 1.125) + 'px';
	startOverBtn.style.bottom = '7px';//same as commit btn but commit btn style not loaded yet somehow
	startOverBtn.style.opacity = commitBtn.style.opacity;

	startOverBtnImg.removeAttribute('style');
	startOverBtnBtn.removeAttribute('style');

	startOverBtnImg.style.width = commitBtnImg.style.width;
	startOverBtnImg.style.height = commitBtnImg.style.height;
	startOverBtnImg.style.borderWidth = commitBtnImg.style.borderWidth;
	startOverBtnImg.style.borderImageSlice = commitBtnImg.style.borderImageSlice;
	startOverBtnImg.style.borderImageSource = commitBtnImg.style.borderImageSource;
	startOverBtnImg.style.borderStyle = commitBtnImg.style.borderStyle;

	var clearOrdersIcon = startOverBtn.querySelector('div[id ^= ujs_Image]');

	clearOrdersIcon.style.display = 'none';

	startOverBtnBtn.style.width = commitBtnBtn.style.width;
	startOverBtnBtn.style.height = commitBtnBtn.style.height;

	startOverText.style.left = '7px';//center it
	startOverText.style.bottom = commitText.style.bottom;
	startOverText.style.transformOrigin = commitText.style.transformOrigin;

	startOverTextDiv.style.left = commitBtnTextDiv.style.left;
	startOverTextDiv.style.bottom = commitBtnTextDiv.style.bottom;
	startOverTextDiv.style.width = commitBtnTextDiv.style.width;
	startOverTextDiv.style.height = commitBtnTextDiv.style.height;
	startOverTextDiv.style.transformOrigin = commitBtnTextDiv.style.transformOrigin;
}

var originalStartOverBtnHeight;
var originalHistoryBtnLoc;
var originalGamePaneHeight;

function fixGameMenuLayout()
{
	//moving things into/outof the menu doesn't cause other buttons to relocate
	//when startOverBtn moved out, historyBtn needs to moved down
	//gamePane height also needs to be adjusted
	var DEBUG = false;
	var historyBtn = activeScene.getHistoryBtnContainer();
	var gamePane = historyBtn.parentNode.parentNode;
	var gamePaneImg = gamePane.parentNode.previousSibling
	var gamePaneHeight;
	var ujsMenu = activeScene.getMenuBtnContainer();

	if (!getCurrentPhase())
	{
		//if not building orders, make sure history button doesn't overlap with anything
		if (typeof originalHistoryBtnLoc == 'number' && originalHistoryBtnLoc > -1)
		{
			historyBtn.style.bottom = originalHistoryBtnLoc - originalStartOverBtnHeight + 'px';

			if (typeof originalGamePaneHeight == 'number' && originalGamePaneHeight > 12)
			{
				gamePane.style.height = originalGamePaneHeight + 'px';
			}
		}

		return;
	}

	if (DEBUG)
	{
		console.log('gamePane = ');
		console.log(gamePane);
	}

	if (!originalHistoryBtnLoc || originalHistoryBtnLoc < 0)
	{
		//starts at -90
		originalHistoryBtnLoc = Number(historyBtn.style.bottom.replace(/\D+/, ''));
	}
	if (originalHistoryBtnLoc > 0 && ujsMenu.style.display != 'none')
	{
		historyBtn.style.bottom = originalHistoryBtnLoc - originalStartOverBtnHeight + 'px';

		if (!originalGamePaneHeight)
		{
			gamePaneHeight = Number(gamePane.style.height.replace(/\D+/, ''));

			if (gamePaneHeight > 12)
			{
				//starts at 12
				originalGamePaneHeight = gamePaneHeight;
			}
		}
		if (originalGamePaneHeight)
		{
			gamePaneImg.style.height = originalGamePaneHeight - originalStartOverBtnHeight + 'px';
		}
	}
}

var restartMoveStartOverToTurnOrdersInterval;

function setupMoveStartOverToTurnOrders()
{
	//start over is hidden whenever the Game button is clicked and returns to it's normal state - using gameBtn onclick doesn't work in the desired way - interval instead
	var startOverBtn = activeScene.getClearOrdersBtnContainer();
	var modifyOrdersBtn = activeScene.getRedoBtn();
	var startOverBtnShouldBeVisible;
	originalStartOverBtnHeight = Number(startOverBtn.firstElementChild.style.height.replace(/\D+/, ''));
	var transformStartOverBtn = function()
	{
		startOverBtnShouldBeVisible = modifyOrdersBtn.style.display != 'none';

		if (!startOverBtnShouldBeVisible) return;//no need to modify it if it doesn't have to be visible
		if (startOverBtn.style.left == '-5px' && startOverBtn.style.bottom == '7px') return;//already been modified

		startOverBtn.style.display = 'none';//hide it while modifying it
		moveStartOverToTurnOrders();
		startOverBtn.style.display = 'block';
		fixGameMenuLayout();
	};
	restartMoveStartOverToTurnOrdersInterval = function()
	{
		allIntervals.push(setInterval(transformStartOverBtn, 500));
	};

	restartMoveStartOverToTurnOrdersInterval();
}

function getDeployText()
{
	var spansNodeList = activeScene.getElementsByTagName('span');
	var spansArr = nodeListToArray(spansNodeList);
	var ret = {};

	spansArr.forEach(function(span)
	{
		if (typeof ret.deployedArmies == 'number' && typeof ret.totalIncome == 'number') return;

		var text = span.innerText;

		if (text)
		{
			var deployData = text.match(/(\d+)\s+\/\s+(\d+)\s+armies\s+deployed/i);

			if (deployData)
			{
				ret.deployedArmies = deployData[1];
				ret.totalIncome = deployData[2];
			}
		}
	});

	return ret;
}

function getCurrentPhase()
{
	return window.UJS_Hooks.BuildingTurnState.Root._currentState.CurrentPhase;
}

var restartPreventLastArmyDeloyedAutoAdvancingTurnInterval;

function setupPreventLastArmyDeloyedAutoAdvancingTurn()
{
	var DEBUG = false;
	var expectingAutoTurnAdvancement = false;
	var advancementWasAutoClick = true;
	var deployPhaseBtn = activeScene.getPhaseDeployBtn();
	var attackPhaseBtn = activeScene.getPhaseAttackBtn();
	var checkIfTurnAdvancementWasHuman = function()
	{
		advancementWasAutoClick = false;
		//autophase movement doesn't click attackPhaseBtn
	};
	var resetAdvancementWasAutoClick = function()
	{
		advancementWasAutoClick = true;//reset for if switching between phases
	};
	var checkForTurnChangeHotkeys = function(e)
	{
		var phaseChangingHotkeys = ['a', 'q'];
		var key = e.key;

		if (!phaseChangingHotkeys.includes(key)) return;

		resetAdvancementWasAutoClick();
	};

	attackPhaseBtn.onclick = checkIfTurnAdvancementWasHuman;
	deployPhaseBtn.onclick = resetAdvancementWasAutoClick;
	//document.onkeydown = checkForTurnChangeHotkeys;

	var setExpectingAutoTurnAdvancement = function()
	{
		var getDeployTextRet = getDeployText();
		var currentPhase = getCurrentPhase();//when not building turn, player is not in a phase
	
		if (currentPhase)
		{
			if (currentPhase.Phase == 2 && getDeployTextRet.deployedArmies == getDeployTextRet.totalIncome - 1)
				expectingAutoTurnAdvancement = true;

			if (DEBUG) console.log('expectingAutoTurnAdvancement = ' + expectingAutoTurnAdvancement);
		}
	};
	var preventAutoTurnAdvancement = function()
	{
		if (expectingAutoTurnAdvancement)
		{
			var getDeployTextRet = getDeployText();
			var currentPhase = getCurrentPhase();

			if (currentPhase)
			{
				if (currentPhase.Phase == 3 && getDeployTextRet.deployedArmies == getDeployTextRet.totalIncome && advancementWasAutoClick)
				{
					if (DEBUG) console.log('auto autoadvanced');
					deployPhaseBtn.click();
					expectingAutoTurnAdvancement = false;
				}
			}
		}
	};
	restartPreventLastArmyDeloyedAutoAdvancingTurnInterval = function()
	{
		allIntervals.push(setInterval(preventAutoTurnAdvancement, 2));
		allIntervals.push(setInterval(setExpectingAutoTurnAdvancement, 2));
	};

	setExpectingAutoTurnAdvancement();
	preventAutoTurnAdvancement();
	restartPreventLastArmyDeloyedAutoAdvancingTurnInterval();
}

function getPlayerPopup()
{
	return activeScene.querySelector('div[id ^= "ujs_PlayerPopup"]');
}

var chatIsClosed = true;

function setChatStateAsOpened()
{
	chatIsClosed = false;
}

function detectIfChatStateChanged()
{
	var chatBtn = $(activeScene.getElementById('ujs_ChatCollapseButton_btn'));

	chatBtn.on('click', setChatStateAsOpened);

	$(document).on('keydown', function(e)
	{
		var chatHotkey = 't';

		if (e.key == chatHotkey)
		{
			chatIsClosed = !chatIsClosed;
		}
	});
}

function sendPmToPlayer(e)
{
	var playerPopup = getPlayerPopup();

	if (playerPopup)
		playerPopup.remove();
	else
		return console.log('probably spam clicked');

	//no easy way to get player number or id from chat, using name and color instead
	var playerToSendPmTo =
	{
		name: e.target.getAttribute('data-name'),
		color: e.target.getAttribute('data-color')
	};

	if (chatIsClosed)
	{
		var chatBtn = activeScene.getChatCollapseBtn();

		chatBtn.click();
	}

	var privateChatBtn = activeScene.getPrivateChatBtn();//private chat keeps the list of players exactly how it was

	privateChatBtn.click();

	waitForElementToExist({queryFrom: activeScene, querySelectorString: 'div[id ^= "ujs_PromptFromList"]'}, function(playersDropdown)
	{
		waitForElementToExist({queryFrom: playersDropdown, querySelectorString: 'div[id ^= "ujs_Content"]'}, function(playersContent)
		{
			var playersBtns = nodeListToArray(playersContent.querySelectorAll('div.ujsBtn'));
			var foundBtn = false;

			playersBtns.forEach(function(playerBtn)
			{
				if (foundBtn) return;

				var color = playerBtn.querySelector('div[id ^= "ujs_ColorRect"] div[id $= "img"]').style.borderImageSource.split(/RoundedRectangle-/i)[1];
				var name = playerBtn.querySelector('div[id ^= "ujs_Text"] div[id $= "tmp"]').innerText;

				if (color == playerToSendPmTo.color && name == playerToSendPmTo.name)
				{
					var sendPmBtn = playerBtn.querySelector('a[id ^= "ujs_Button"]');

					foundBtn = true;
					sendPmBtn.click();
				}
			});
		});
	});
}

var mostRectentCreatePmEvent;
var ownPlayerNumber = document.querySelector('a#AccountDropDown').nextElementSibling.querySelector('a[href ^= "/Profile?p="]').href.match(/\d+/)[0];
var playerNumber;

function checkIfPmContainerExists()
{
	var popup = getPlayerPopup();

	if (popup)
	{
		getPlayerNumber();
	}
	if (!popup || ownPlayerNumber == playerNumber) return;

	pmContainerNo = popup.id.match(/\d+/);

	if (pmContainerNo)
		pmContainerNo = '_' + pmContainerNo[0];
	else
		pmContainerNo = '';

	var pmContainerId = 'ujs_InGamePMContainer' + pmContainerNo;
	var pmContainer = activeScene.getElementById(pmContainerId);

	return !!pmContainer;
}

function getPlayerNumber()
{
	waitForElementToExist({queryFrom: getPlayerPopup(), querySelectorString: 'a[id ^= "ujs_ViewFullProfileBtn"]'}, function(viewFullProfileBtn)
	{
		var numberMatches = viewFullProfileBtn.href.match(/\d+/);

		if (numberMatches)
		{
			playerNumber = numberMatches[0];
		}
	});
}

function createPmBtn(e)
{
	try{
	var DEBUG = false;

	mostRectentCreatePmEvent = e;
	getPlayerNumber();

	//cloning from fullProfileContainer as the PM button will have similar styling, putting clone to the right of fullProfileContainer
	var fullProfileContainer;
	var pmContainer;
	var closeBtn;
	var closeBtnImg;
	var getPlayerNameAndColor = function()
	{
		var player = {};

		var playerBtn = e.target;
		var playerContainer = playerBtn.parentNode;
		var playerColorImg = playerContainer.querySelector('div[id ^= "ujs_ColorRect"] div[id $= "img"]');

		var playerNameAndInfoPopup = activeScene.querySelector('div[id ^= "ujs_PlayerNameAndInfo"]');
		var playerNameTxt = playerNameAndInfoPopup.querySelectorAll('div[id ^= "ujs_Text"] div.ujsTextInner')[1];//level is 0

		player.name = playerNameTxt.innerText;
		player.color = playerColorImg.style.borderImageSource.split('RoundedRectangle-')[1];

		return player;
	};
	var playerNameAndColor;
	var changeProperties = function(item)
	{
		item.id = item.id.replace('ViewFullProfile', 'InGamePM');

		if (item.tagName == 'DIV')
		{
			if (item.id.match('img'))
			{
				item.style.borderImageSource = closeBtnImg.style.borderImageSource;
			}
			else if (item.id.match(/ujs_Text_\d+_tmp/i))
			{
				item.innerText = 'PM';
			}
		}
		else if (item.tagName == 'A')
		{
			if (item.id.match(/exLink/))
			{
				item.id = item.id.replace(/exLink/, 'btn');

				if (playerNumber == ownPlayerNumber)
				{
					pmContainer.remove();//can't send pm to self
					return [];
				}

				item.href = '#';
				item.removeAttribute('target');
				item.setAttribute('data-name', playerNameAndColor.name);
				item.setAttribute('data-color', playerNameAndColor.color);
				item.onclick = sendPmToPlayer;
			}
		}

		if (item.style.width)
		{
			item.style.width = closeBtnImg.style.width;
		}

		var children = item.children;

		if (children)
		{
			children = nodeListToArray(children);
		}
		else
		{
			children = [];
		}

		return children;
	};

	var checkIfPopupLoaded = function()
	{
		fullProfileContainer = activeScene.querySelector('div[id ^= "ujs_ViewFullProfileContainer"]');

		if (!fullProfileContainer)
		{
			if (DEBUG) {console.log('out !fullProfileContainer');}

			return setTimeout(checkIfPopupLoaded, 10);
		}
		if (fullProfileContainer.style.left != '0px' || !fullProfileContainer.style.bottom || !fullProfileContainer.firstElementChild || !fullProfileContainer.querySelector('a[id ^= "ujs_ViewFullProfileBtn"]'))
		{
			if (DEBUG) {console.log('out incorrect styling');}

			return setTimeout(checkIfPopupLoaded, 10);
		}
		if (fullProfileContainer.firstElementChild.style.display == 'none')
		{
			if (DEBUG) {console.log('out btn is invisable');}

			return setTimeout(checkIfPopupLoaded, 10);
		}

		if (DEBUG) {console.log('ready to create pmContainer');}

		closeBtn = activeScene.querySelector('div[id ^= "ujs_CloseButton"]');//to get color scheme
		closeBtnImg = closeBtn.querySelector('div[id $= "img"]');

		pmContainer = fullProfileContainer.cloneNode(true);//copies children as well

		fullProfileContainer.insertAdjacentElement('afterend', pmContainer);
		playerNameAndColor = getPlayerNameAndColor();

		pmContainer.style.left = Number(fullProfileContainer.querySelector('div[id $= "img"]').style.width.replace(/\D+/, '')) + 5 + 'px';

		changeProperties(pmContainer).forEach(function(pmContainerChild)
		{
			changeProperties(pmContainerChild).forEach(function(pmContainerChildChild)
			{
				changeProperties(pmContainerChildChild).forEach(function(pmContainerChildChildChild)
				{
					changeProperties(pmContainerChildChildChild);
				});
			});	
		});
	};

	checkIfPopupLoaded();
	}catch(err){console.log(err);}
}

function restartInGamePmFromPlayerPopupInterval()
{
	//if there's already a popup and a player is clicked, the pm button gets created then the whole popup is destroyed then recreated - pm button doesn't reappear, so constantly check if it does exist
	allIntervals.push(setInterval(function()
	{
		if (checkIfPmContainerExists() == false)
		{
			createPmBtn(mostRectentCreatePmEvent);
		}
	}, 100));
}

function setupInGamePmFromPlayerPopup()
{
	//needs to be applied for each time a popup is opened
	setOnClickToPlayers(function(e)
	{
		createPmBtn(e);
	});

	detectIfChatStateChanged();
	restartInGamePmFromPlayerPopupInterval();
}

var canTransferOnly = false;
var canAttackOnly = false;

function checkIfCanAttackOrTransferOnly()
{
	var attackTransferTooltip = activeScene.querySelector('div[id ^= "ujs_Icon_AttackTransferOnly"] div[id $= "_tooltip"');

	if (!attackTransferTooltip)
	{
		canTransferOnly = false;
		canAttackOnly = false;
		return;
	}

	attackTransferTooltip.click();

	waitForElementToExist({queryFrom: activeScene, querySelectorString: 'div[id ^= "ujs_SettingsDialog"]'}, function(smallSettingsDiagloue)
	{
		smallSettingsDiagloue.style.display = 'none';

		waitForElementToExist({queryFrom: smallSettingsDiagloue, querySelectorString: 'a[id ^= "ujs_CloseBtn"]'}, function(settingsCloseBtn)
		{
			waitForElementToExist({queryFrom: smallSettingsDiagloue, querySelectorString: 'div[id ^= "ujs_IconRow_AttackTransferOnly"]'}, function(attackTrasferOnlyRow)
			{
				waitForElementToExist({queryFrom: attackTrasferOnlyRow, querySelectorString: 'div[id ^= ujs_Text] div[id $= "tmp"]'}, function(attackTransferOnlyTextDiv)
				{
					var text = attackTransferOnlyTextDiv.innerText;

					if (text.match(/transfer-only/i)) canTransferOnly = true;
					if (text.match(/attack-only/i)) canAttackOnly = true;

					settingsCloseBtn.click();//need to use the actual close btn to prevent a memory leak
				});
			});
		});
	});
}

function modifyAttackTransferDialogue()
{
	var currentPhase = getCurrentPhase();
	var attackTransferPhase = 3;

	if (!currentPhase) return;
	if (currentPhase.Phase != attackTransferPhase) return;

	var attackTransferDialogue = activeScene.querySelector('div[id ^= "ujs_AttackTransferDialog"]');

	if (!attackTransferDialogue) return;

	var hasAlreadyBeenModified = attackTransferDialogue.querySelector('div#attacksContainer');
	var attackTransferModeBtn = attackTransferDialogue.querySelector('div[id ^= "ujs_AttackTransferModeBtn"]');

	if (!canTransferOnly && !canAttackOnly)
	{
		attackTransferModeBtn.style.display = 'none';
		if (hasAlreadyBeenModified) hasAlreadyBeenModified.remove();
		return;
	}

	if (hasAlreadyBeenModified) return;

	var attackTransferModeBtnBtn = attackTransferModeBtn.querySelector('a[id ^= "ujs_AttackTransferModeBtn"]');
	var attacksContainer = document.createElement('div');

	attacksContainer.id = 'attacksContainer';
	attacksContainer.className = attackTransferModeBtn.className;
	attacksContainer.style.left = attackTransferModeBtn.style.left;
	attacksContainer.style.bottom = '12px';
	attacksContainer.style.transformOrigin = attackTransferModeBtn.style.transformOrigin;

	var createRow = function(value, mode)
	{
		var row = document.createElement('div');

		attacksContainer.appendChild(row);

		var btnContainer = document.createElement('div');

		btnContainer.className = 'ujsGameObject';
		btnContainer.style.left = '0px';
		btnContainer.style.transformOrigin = '14px -14px 0px';

		var radioBtn = document.createElement('input');
		var id = value.replace(/\s+/g, '');

		radioBtn.id = id;
		radioBtn.className = 'ujsToggle ujsInner';
		radioBtn.type = 'radio';
		radioBtn.name = 'attackTransferMode';
		radioBtn.value = value;
		radioBtn.setAttribute('data-mode', String(mode));
		radioBtn.style.width = '29px';
		radioBtn.style.height = '29px';

		var labelContainer = document.createElement('div');

		labelContainer.className = 'ujsGameObject ujsText';
		labelContainer.style.left = '31px';
		labelContainer.style.transformOrigin = '55px -15px 0px';

		var label = document.createElement('label');

		label.setAttribute('for', id);
		label.innerText = value;
		label.className = 'ujsInner ujsTextInner';
		label.style.width = '112px';
		label.style.height = '32px';
		label.style.color = 'rgb(186, 186, 187)';
		label.style.textAlign = 'left';
		label.style.justifyContent = 'flex-start';
		label.style.alignItems = 'center';
		label.style.fontSize = '11.4px';
		label.style.lineHeight = '11.4px';
		label.style.whiteSpace = 'pre-wrap';
		label.style.padding = '0px';
		label.style.fontWeight = 'bold';
		label.style.overflow = 'visible';
		label.style.margin = '0';

		row.appendChild(btnContainer);
		row.appendChild(labelContainer);
		btnContainer.appendChild(radioBtn);
		labelContainer.appendChild(label);

		var ret =
		{
			radioBtn: radioBtn,
			row: row,
			createSpacer: function()
			{
				row.appendChild(document.createElement('br'));
				return ret;
			},
			label: label
		};

		return ret;
	};

	attackTransferModeBtn.style.display = 'none';

	var currentAttackTransferMode = 0;
	var maxAttackTransferMode = 0;

	if (canTransferOnly) maxAttackTransferMode++;
	if (canAttackOnly) maxAttackTransferMode++;

	//attack transfer modes: 0 = attack or transfer, 1 = transfer only, 2 = attack only

	attackTransferModeBtnBtn.onclick = function()
	{
		currentAttackTransferMode++;

		if (currentAttackTransferMode > maxAttackTransferMode)
		{
			currentAttackTransferMode = 0;
		}
	};

	var setAttackTransferMode = function(e)
	{
		var btnMod = Number(e.target.getAttribute('data-mode'));

		if (btnMod == 0)
		{
			if (canTransferOnly && canAttackOnly)
			{
				if (currentAttackTransferMode == 1)
				{
					attackTransferModeBtnBtn.click();
					attackTransferModeBtnBtn.click();
				}
				else if (currentAttackTransferMode == 2)
				{
					attackTransferModeBtnBtn.click();
				}
			}
			else if (canTransferOnly || canAttackOnly)
			{
				if (currentAttackTransferMode == 1)
				{
					attackTransferModeBtnBtn.click();
				}
			}
		}
		else if (btnMod == 1)
		{
			if (canTransferOnly && canAttackOnly)
			{
				if (currentAttackTransferMode == 0)
				{
					attackTransferModeBtnBtn.click();
				}
				else if (currentAttackTransferMode == 2)
				{
					attackTransferModeBtnBtn.click();
					attackTransferModeBtnBtn.click();
				}
			}
			else
			{
				if (currentAttackTransferMode == 0)
				{
					attackTransferModeBtnBtn.click();
				}
			}
		}
		else if (btnMod == 2)
		{
			//if entered this state, must be able to attack and transfer only
			if (currentAttackTransferMode == 0)
			{
				attackTransferModeBtnBtn.click();
				attackTransferModeBtnBtn.click();
			}
			else if (currentAttackTransferMode == 1)
			{
				attackTransferModeBtnBtn.click();
			}
		}
	};

	attackTransferModeBtn.insertAdjacentElement('beforebegin', attacksContainer);

	var attackTransferRow = createRow('Attack or Transfer', 0).createSpacer();

	attackTransferRow.radioBtn.checked = true;
	attackTransferRow.radioBtn.onclick = setAttackTransferMode;

	if (canTransferOnly)
	{
		createRow('Transfer-only', 1).createSpacer().radioBtn.onclick = setAttackTransferMode;
	}
	if (canAttackOnly)
	{
		var attackOnlyRow = createRow('Attack-only', 2);

		//prevent text from blending in too much with the attack transfer dialog background - no longer required in dark theme
		//if (canTransferOnly) attackOnlyRow.label.style.background = 'rgb(110, 110, 110)';
	
		attackOnlyRow.radioBtn.onclick = setAttackTransferMode;
	}
}

function restartAttacksTansfersAsCheckboxesInterval()
{
	allIntervals.push(setInterval(modifyAttackTransferDialogue, 500));
}

function setupAttacksTansfersAsCheckboxes()
{
	setTimeout(function()
	{
		checkIfCanAttackOrTransferOnly();
		restartAttacksTansfersAsCheckboxesInterval();
	}, 5000);//to prevent multiple small settings dialogs from appearing
}

function applyChangesToNewGame()
{
	console.log('UJS-Flash game changed @' + new Date().getTime());
	/*
		clear the intervals as ids of things in activeScene aren't constant
		reduces CPU usage as well from all the intervals being ran
	*/
	allIntervals.forEach(function(interval)
	{
		clearInterval(interval);
	});
	allIntervals = [];
	applyChangesWhenGameLoaded();
}

function restartIntervals()
{
	var currentPage = location.href;

	if (!(currentPage.match(/https:\/\/www\.warzone\.com\/MultiPlayer\?GameID=\d+/i) || currentPage.match(/https:\/\/www\.warzone\.com\/SinglePlayer\?(Level|CustomGame|SavedGame)=(\d+|custom)/i) || onQM)) return false;

	console.log('UJS-Flash applying changes @' + new Date().getTime());

	restartMoveStartOverToTurnOrdersInterval();
	restartPreventLastArmyDeloyedAutoAdvancingTurnInterval();
	restartInGamePmFromPlayerPopupInterval();
	restartAttacksTansfersAsCheckboxesInterval();
}

function setup()
{
	//webmode has to be ujs or ujs-canvas

	var currentPage = location.href;
	var onQM = currentPage.match(/https:\/\/www\.warzone\.com\/multiplayer\?quickmatch=1/i);

	if (!(currentPage.match(/https:\/\/www\.warzone\.com\/MultiPlayer\?GameID=\d+/i) || currentPage.match(/https:\/\/www\.warzone\.com\/SinglePlayer\?(Level|CustomGame|SavedGame)=(\d+|custom)/i) || onQM)) return false;

	console.log('UJS-Flash applying changes @' + new Date().getTime());

	//detect if game changed
	if (onQM)
	{
		var playRtQmBtn = activeScene.querySelector('div[id ^= "ujs_PlayNowBtn"] a[id ^= "ujs_PlayNowBtn_btn"]');

		setOnClick(playRtQmBtn, applyChangesToNewGame);
	}
	
	var nextGameBtn = activeScene.querySelector('div[id ^= "ujs_NextGameBtn"] a[id $= "btn"]');

	if (nextGameBtn)
	{
		setOnClick(nextGameBtn, applyChangesToNewGame);
	}

	var backBtn = activeScene.querySelector('div[id ^= "ujs_CloseBtn"] a[id $= "btn"]');

	if (backBtn)
	{
		setOnClick(backBtn, applyChangesToNewGame);
	}

	setupShowOrderDetailsOnHover();
	setupCtrlClickName();
	setupViewFullGameSettingsInOneClick();
	setupMoveStartOverToTurnOrders();
	setupPreventLastArmyDeloyedAutoAdvancingTurn();
	setupInGamePmFromPlayerPopup();
	setupAttacksTansfersAsCheckboxes();
}

function applyChangesWhenGameLoaded()
{
	var DEBUG = true;

	waitForElementToExist({querySelectorString: 'div#UjsContainer div#ujs_SceneContainer'}, function(sceneContainer)
	{
		var allScenes = sceneContainer.children;
		var numScenes = allScenes.length;
		var currentScene;

		var oldActiveScene = activeScene;

		activeScene = null;//to reset if game changed
		window.ACTIVE_SCENE = null;

		if (DEBUG) {console.log('numScenes = ' + numScenes);}

		for (var i = 0; i < numScenes; i++)
		{
			currentScene = allScenes[i];

			if (currentScene.style.display == '')
			{
				activeScene = currentScene;
				break;
			}
		}

		if (oldActiveScene instanceof HTMLElement)
		{
			if (activeScene == oldActiveScene)
			{
				//new active scene should be different to the old one
				return setTimeout(applyChangesWhenGameLoaded, 100);
			}
		}
		if (!activeScene)
		{
			//scenes not loaded yet
			return setTimeout(applyChangesWhenGameLoaded, 100);
		}

		console.log('UJS-Flash activeScene found @' + new Date().getTime());

		setActiveSceneHelpers();

		console.log(activeScene);

		if (DEBUG) {window.ACTIVE_SCENE = activeScene;}

		if (scenesAppliedChangesTo.includes(activeScene.getSceneNo())) {return restartIntervals();}

		scenesAppliedChangesTo.push(activeScene.getSceneNo());

		if (DEBUG) {console.log(0);}
		waitForElementToExist({querySelectorString: 'div#WaitDialogJSMainDiv', queryFrom: window}, function(waitDialgue)
		{
			if (DEBUG) {console.log(1);}
			waitForElementToExist({querySelectorString: '#' + activeScene.getPlayButtonAsId(), queryFrom: activeScene}, function(historyPlayBtn)
			{
				if (DEBUG) {console.log(2);}
				waitForElementToExist({querySelectorString: '#' + activeScene.getPhaseDeployBtnAsId(), queryFrom: activeScene}, function(deployBtn)
				{
					if (DEBUG) {console.log(3);}
					waitForElementToExist({querySelectorString: '#' + activeScene.getPhaseAttackBtnAsId(), queryFrom: activeScene}, function(attackBtn)
					{
						if (DEBUG) {console.log(4);}
						waitForElementToExist({querySelectorString: '#' + activeScene.getClearOrdersBtnContainerAsId(), queryFrom: activeScene}, function(clearOrdersBtn)
						{
							if (DEBUG) {console.log(5);}
							waitForElementToExist({querySelectorString: '#' + activeScene.getRedoBtnAsId(), queryFrom: activeScene}, function(modifyOrdersBtn)
							{
								if (DEBUG) {console.log(6);}
								waitForElementToExist({querySelectorString: '#' + activeScene.getMenuBtnContainerAsId(), queryFrom: activeScene}, function(menuBtn)
								{
									if (DEBUG) {console.log(7);}
									waitForElementToExist({querySelectorString: '#' + activeScene.getHistoryBtnContainerAsId(), queryFrom: activeScene}, function(historyBtn)
									{
										if (DEBUG) {console.log(8);}
										waitForElementToExist({querySelectorString: '#' + activeScene.getViewGameSettingsBtnAsId(), queryFrom: activeScene}, function(settingsBtn)
										{
											if (DEBUG) {console.log(9);}
											setup();
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
}

function setActiveSceneHelpers()
{
	var getBtn = function(btnId)
	{
		return activeScene.getElementById(btnId);
	};
	var dealWithCorrectionOptions = function(btnId, options)
	{
		if (typeof options == 'object')
		{
			if (typeof options.want == 'number' && typeof options.perScene == 'number')
			{
				// (1 * 2) - 1 = 1
				// (2 * 2) - 1 = 3
				// if is first one, _number isn't used
				var correctNumber = (activeScene.getSceneNo() * options.perScene) - options.want;

				if (correctNumber > 1)
				{
					return btnId + '_' + correctNumber;
				}
			}
		}
	};
	var getCorrectBtnId = function(btnId, options)
	{
		var idStart = dealWithCorrectionOptions(btnId, options) || btnId + activeScene.getBtnPrefix();

		return idStart + '_btn';
	};
	var getCorrectContainerBtnId = function(btnId, options)
	{
		return dealWithCorrectionOptions(btnId, options) || btnId + activeScene.getBtnPrefix();
	};
	var getCorrectedImgBtnId = function(btnId, options)
	{
		var idStart = dealWithCorrectionOptions(btnId, options) || btnId + activeScene.getBtnPrefix();

		return idStart + '_img';
	};

	activeScene.getSceneNo = function()
	{
		var sceneNo = activeScene.id.match(/\d+/);

		if (sceneNo) {sceneNo = sceneNo[0];}
		else {sceneNo = 1;}

		return sceneNo;
	};
	activeScene.getElementById = function(id)
	{
		//element.getElementById is not a function
		return activeScene.querySelector('#' + id);
	};
	activeScene.getBtnPrefix = function()
	{
		var btnPrefix = '';
		var sceneNo = activeScene.getSceneNo();

		if (sceneNo > 1) {btnPrefix = '_' + sceneNo;}

		return btnPrefix;
	};
	activeScene.getPlayButtonAsId = function()
	{
		return getCorrectBtnId('ujs_PlayButton');
	};
	activeScene.getPlayButton = function()
	{
		return getBtn(activeScene.getPlayButtonAsId());
	};
	activeScene.getPhaseDeployBtnAsId = function()
	{
		return getCorrectBtnId('ujs_PhaseDeploy');
	};
	activeScene.getPhaseDeployBtn = function()
	{
		return getBtn(activeScene.getPlayButtonAsId());
	};
	activeScene.getPhaseAttackBtnAsId = function()
	{
		return getCorrectBtnId('ujs_PhaseAttack');
	};
	activeScene.getPhaseAttackBtn = function()
	{
		return getBtn(activeScene.getPhaseDeployBtnAsId());
	};
	activeScene.getRedoBtnAsId = function()
	{
		return getCorrectBtnId('ujs_RedoBtn');
	};
	activeScene.getRedoBtn = function()
	{
		return getBtn(activeScene.getRedoBtnAsId());
	};
	activeScene.getViewGameSettingsBtnAsId = function()
	{
		return getCorrectBtnId('ujs_ViewGameSettingsBtn');
	};
	activeScene.getViewGameSettingsBtn = function()
	{
		return getBtn(activeScene.getViewGameSettingsBtnAsId());
	};
	activeScene.getClearOrdersBtnAsId = function()
	{
		return getCorrectBtnId('ujs_ClearOrdersBtn');
	};
	activeScene.getClearOrdersBtn = function()
	{
		return getBtn(activeScene.getClearOrdersBtnAsId());
	};
	activeScene.getStatisticsBtnAsId = function()
	{
		return getCorrectBtnId('ujs_StatisticsBtn');
	};
	activeScene.getStatisticsBtn = function()
	{
		return getBtn(activeScene.getStatisticsBtnAsId());
	};
	activeScene.getCommitBtnAsId = function()
	{
		return getCorrectBtnId('ujs_CommitBtn', {want: 1, perScene: 2});
	};
	activeScene.getCommitBtn = function()
	{
		return getBtn(activeScene.getCommitBtnAsId());
	};
	activeScene.getChatCollapseBtnAsId = function()
	{
		return getCorrectBtnId('ujs_ChatCollapseButton');
	};
	activeScene.getChatCollapseBtn = function()
	{
		return getBtn(activeScene.getChatCollapseBtnAsId());
	};
	activeScene.getPrivateChatBtnAsId = function()
	{
		return getCorrectBtnId('ujs_PrivateChatBtn_btn');
	};
	activeScene.getPrivateChatBtn = function()
	{
		return getBtn(activeScene.getPrivateChatBtnAsId());
	};

	activeScene.getClearOrdersBtnContainerAsId = function()
	{
		return getCorrectContainerBtnId('ujs_ClearOrdersBtn');
	};
	activeScene.getClearOrdersBtnContainer = function()
	{
		return getBtn(activeScene.getClearOrdersBtnContainerAsId());
	};
	activeScene.getCommitBtnContainerAsId = function()
	{
		//there are a couple of commit buttons per scene for some reason - want the first one
		return getCorrectContainerBtnId('ujs_CommitBtn', {want: 1, perScene: 2});
	};
	activeScene.getCommitBtnContainer = function()
	{
		return getBtn(activeScene.getCommitBtnContainerAsId());
	};
	activeScene.getMenuBtnContainerAsId = function()
	{
		return getCorrectContainerBtnId('ujs_Menu');
	};
	activeScene.getMenuBtnContainer = function()
	{
		return getBtn(activeScene.getMenuBtnContainerAsId());
	};
	activeScene.getHistoryBtnContainerAsId = function()
	{
		return getCorrectContainerBtnId('ujs_HistoryButton');
	};
	activeScene.getHistoryBtnContainer = function()
	{
		return getBtn(activeScene.getHistoryBtnContainerAsId());
	};

	activeScene.getCommitBtnImgAsId = function()
	{
		return getCorrectedImgBtnId('ujs_CommitBtn', {want: 1, perScene: 2});
	};
	activeScene.getCommitBtnImg = function()
	{
		return getBtn(activeScene.getCommitBtnImgAsId());
	};
	activeScene.getClearOrdersBtnImgAsId = function()
	{
		return getCorrectedImgBtnId('ujs_ClearOrdersBtn');
	};
	activeScene.getClearOrdersBtnImg = function()
	{
		return getBtn(activeScene.getClearOrdersBtnImgAsId());
	};
}

console.log('UJS-Flash started @' + new Date().getTime());
applyChangesWhenGameLoaded();