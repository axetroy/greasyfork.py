// ==UserScript==
// @name Community Levels Creator Helper
// @namespace DanWL
// @version 1.0.6
// @description Makes it easier and faster to create, modify and publish community levels.
// @author https://greasyfork.org/en/users/85040-dan-wl-danwl
// @match https://www.warzone.com/*
// @require https://greasyfork.org/scripts/35370-add-css/code/Add_CSS.js?version=598682
// @require https://greasyfork.org/scripts/39784-easy-dom/code/Easy%20DOM.js?610381
// @grant none
// ==/UserScript==
/*
current functionality:
modify script settings
when typing on a form hotkey isn't fired
validation
Copy and paste level details
Adds hotkeys for slot selection
Automatically guesses which slot you want to edit the details of (e.g if A first, B next)
Adds 's' hotkey to access settings
Adds 'k' hotkey to run copy and paste level details
Adds 'r' hotkey to retry publishing a community level. Ideally, the Retry button should do this; currently it reloads the page
Adds 'n' hotkey to create a new community level
Allows custom hotkeys to be created
	go to url
	show #popupId
	JS insertJSCodeHere
All hotkeys can be customised

todo:
slot selection -> support AX-A order - customisable - add setting and UI - default should be A-AX

when UJS fully supports single player and templates
	single-player template to community level
	change initial map when creating a new community level
*/

function OnPage(href)
{
	return location.href.match(new RegExp(EscapeRegExpChars(href), 'i'));
}

function ErrFound(err)
{
	console.log('Error detected');
	console.log(navigator.userAgent);
	console.log(location.href);
	console.log(err);
	alert('Userscript error detected. See console for details.');
}

function GetNumbers(string)
{
	var numbers = string.match(/\d+/);
	var ret = numbers;

	if (numbers)
	{
		ret = parseInt(numbers[0]);
	}

	return ret;
}

function ModifyAttributes(element, attributes)
{
	//attributes = [[name, value], etc];
	try{
	attributes.forEach(function(attribute)
	{
		element.setAttribute(attribute[0], attribute[1]);
	});

	return element;
	}catch(err){console.log(err);}
}

const copyPageId = 'levelToCopyDetailsFrom';
const pastePageId = 'levelToPasteDetailsTo';
const editLevelDataPg = 'https://www.warzone.com/SinglePlayer/EditLevelData?Level=';
var copyPageIframeLoaded = false;
var pastePageIframeLoaded = false;
var inCopyDetails = false;

function CopyLevelDetails(levelToCopy, levelToPaste, detailsToCopy)
{
	try{
	var copyAndPasteIframes;
	var copyPageIframe;
	var copyPageLocation = editLevelDataPg + levelToCopy;
	var pastePageIframe;
	var pastePageLocation = editLevelDataPg + levelToPaste;
	var getDetails = function()
	{
		var details = {};
		const copyPageIframeDocument = (GetNumbers(window.location.href) === levelToCopy ? window.document : copyPageIframe.contentDocument || copyPageIframe.contentWindow.document);//bypass same-page iframe getting blocked on FF

		if (detailsToCopy.levelName)
		{
			details.levelName = copyPageIframeDocument.getElementById('LevelNameBox').value;
		}
		if (detailsToCopy.levelDescription)
		{
			details.levelDescription = copyPageIframeDocument.getElementById('DescBox').value;
		}
		if (detailsToCopy.aiNames)
		{
			details.aiNames = [];

			const aiNameRows = TurnDOMArrayToNormalArray(copyPageIframeDocument.getElementById('NamesEditorCell').firstElementChild.firstElementChild.children);

			aiNameRows.forEach(function(tr, index)
			{
				if (index === aiNameRows.length - 1)
				{
					return;//last row is a button to add details
				}

				var trChildren = tr.children;
				var aiSlot = trChildren[0].querySelector('select').value;
				var aiName = trChildren[1].firstElementChild.value;

				details.aiNames.push({slot: aiSlot, name: aiName});
			});
		}
		if (detailsToCopy.aiColors)
		{
			details.aiColors = [];

			const aiColorRows = TurnDOMArrayToNormalArray(copyPageIframeDocument.getElementById('ColorsEditorCell').firstElementChild.firstElementChild.children);

			aiColorRows.forEach(function(tr, index)
			{
				if (index === aiColorRows.length - 1)
				{
					return;//last row is a button to add details
				}

				var trChildren = tr.children;
				var aiSlot = trChildren[0].querySelector('select').value;
				var aiColor = trChildren[1].firstElementChild.value;

				details.aiColors.push({slot: aiSlot, color: aiColor});
			});
		}
		if (detailsToCopy.initialCardPieces)
		{
			details.initialCardPieces = [];

			const initialCardPiecesRows = TurnDOMArrayToNormalArray(copyPageIframeDocument.getElementById('CardModifiersCell').firstElementChild.firstElementChild.children);
			var minifyCards = function(cardsText)
			{
				var cards = cardsText.split('<br>');
				var minifiedDetails = [];
				console.log('new card set');console.log(cardsText);console.log(cards);

				cards.forEach(function(card)
				{
					console.log(card);window.card = card;

					var action = card.match(/[a-z]+/i)[0];
					var sign = (action === 'Add' ? '' : '-');
					var numCardPieces = sign + card.match(/\d+/)[0];//does wz validate in rt or at all?
					var cardName = card.replace(action + ' ' + numCardPieces + ' pieces of ', '');

					minifiedDetails.push({cardName: cardName, numCardPieces: numCardPieces});
				});

				return minifiedDetails;
			};

			initialCardPiecesRows.forEach(function(tr, index)
			{
				if (index === initialCardPiecesRows.length - 1)
				{
					return;//last row is a button to add details
				}

				var trChildren = tr.children;
				var slot = trChildren[0].querySelector('select').value;
				var cardsText = trChildren[1].innerHTML;
				var cards = minifyCards(cardsText);

				details.initialCardPieces.push({slot: slot, cards: cards});
			});
		}
		window.details = details;

		return details;
	};
	var pasteDetails = function(details)
	{
		const pastePageIframeDocument = (GetNumbers(window.location.href) === levelToPaste ? window.document : pastePageIframe.contentDocument || pastePageIframe.contentWindow.document);//bypass same-page iframe getting blocked on FF

		if (!pastePageIframeDocument.getElementById('NamesEditorCell'))
		{
			return setTimeout(function(){pasteDetails(details);}, 1000);//some cells take a while to be created
		}

		console.log('pasting details:');
		console.log(details);

		var needsLevelName = detailsToCopy.levelName;
		var pastedLevelName = false;
		var needsLevelDescription = detailsToCopy.levelDescription;
		var pastedLevelDescription = false;
		var needsAiNames = detailsToCopy.aiNames;
		var pastedAiNames = false;
		var needsAiColors = detailsToCopy.aiColors;
		var pastedAiColors = false;
		var needsInitialCardPieces = detailsToCopy.initialCardPieces;
		var pastedInitialCardPieces = false;
		var combo = undefined;
		var pastedEverythingMain = function()
		{
			console.log('combo = ' + combo);
			inCopyDetails = false;
			pastePageIframeDocument.getElementById('SubmitBtn').click();//save
			console.log('pasted details');
		};
		var logCheckIfEverythingPastedDetils = function()
		{
			console.log('needsLevelName = ' + JSON.stringify(needsLevelName) + ' pastedLevelName = ' + JSON.stringify(pastedLevelName));
			console.log('needsLevelDescription = ' + JSON.stringify(needsLevelDescription) + ' pastedLevelDescription = ' + JSON.stringify(pastedLevelDescription));
			console.log('needsAiNames = ' + JSON.stringify(needsAiNames) + ' pastedAiNames = ' + JSON.stringify(pastedAiNames));
			console.log('needsAiColors = ' + JSON.stringify(needsAiColors) + ' pastedAiColors = ' + JSON.stringify(pastedAiColors));
			console.log('needsInitialCardPieces = ' + JSON.stringify(needsInitialCardPieces) + ' pastedInitialCardPieces = ' + JSON.stringify(pastedInitialCardPieces));
		};
		var checkIfEverythingPasted = function()
		{
			console.log('in checkIfEverythingPasted');
			logCheckIfEverythingPastedDetils();
			//go through the minimum about combinations to check if everything pasted
			//checking all needsLevelName
			if (needsLevelName && needsLevelDescription && needsAiNames && needsAiColors && needsInitialCardPieces)
			{
				combo = 0;
				if (pastedLevelName && pastedLevelDescription && pastedAiNames && pastedAiColors && pastedInitialCardPieces)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelName && needsLevelDescription && needsAiNames && needsAiColors)
			{
				combo = 1;
				if (pastedLevelName && pastedLevelDescription && pastedAiNames && pastedAiColors)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelName && needsLevelDescription && needsAiNames && pastedInitialCardPieces)
			{
				combo = 2;
				if (pastedLevelName && pastedLevelDescription && pastedAiNames)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelName && needsLevelDescription && needsAiNames)
			{
				combo = 3;
				if (pastedLevelName && pastedLevelDescription && pastedAiNames)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelName && needsLevelDescription && needsAiColors && needsInitialCardPieces)
			{
				combo = 4;
				if (pastedLevelName && pastedLevelDescription && pastedAiColors && pastedInitialCardPieces)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelName && needsLevelDescription && needsAiColors)
			{
				combo = 5;
				if (pastedLevelName && pastedLevelDescription && pastedAiColors)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelName && needsLevelDescription && needsInitialCardPieces)
			{
				combo = 6;
				if (pastedLevelName && pastedLevelDescription && pastedInitialCardPieces)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelName && needsLevelDescription)
			{
				combo = 7;
				if (pastedLevelName && pastedLevelDescription)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelName)
			{
				combo = 8;
				if (pastedLevelName)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			//checking all needsLevelDescription
			else if (needsLevelDescription && needsAiNames && needsAiColors && needsInitialCardPieces)
			{
				combo = 9;
				if (pastedLevelDescription && pastedAiNames && pastedAiColors && pastedInitialCardPieces)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelDescription && needsAiNames && needsAiColors)
			{
				combo = 10;
				if (pastedLevelDescription && pastedAiNames && pastedAiColors)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelDescription && needsAiNames && needsInitialCardPieces)
			{
				combo = 11;
				if (pastedLevelDescription && pastedAiNames && pastedInitialCardPieces)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelDescription && needsAiNames)
			{
				combo = 12;
				if (pastedLevelDescription && pastedAiNames)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelDescription && needsAiColors && needsInitialCardPieces)
			{
				combo = 13;
				if (pastedLevelDescription && pastedAiColors && pastedInitialCardPieces)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelDescription && needsAiColors)
			{
				combo = 14;
				if (pastedLevelDescription && pastedAiColors)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelDescription && needsInitialCardPieces)
			{
				combo = 15;
				if (pastedLevelDescription && pastedInitialCardPieces)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsLevelDescription)
			{
				combo = 16;
				if (pastedLevelDescription)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			//checking all needsAiNames
			else if (needsAiNames && needsAiColors && needsInitialCardPieces)
			{
				combo = 17;
				if (pastedAiNames && pastedAiColors && pastedInitialCardPieces)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsAiNames && needsAiColors)
			{
				combo = 18;
				if (pastedAiNames && pastedAiColors)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsAiNames && needsInitialCardPieces)
			{
				combo = 19;
				if (pastedAiNames && pastedInitialCardPieces)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsAiNames)
			{
				combo = 20;
				if (pastedAiNames)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			//checking all needsAiColors
			else if (needsAiColors && needsInitialCardPieces)
			{
				combo = 21;
				if (pastedAiColors && pastedInitialCardPieces)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else if (needsAiColors)
			{
				combo = 22;
				if (pastedAiColors)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			//checking all needsInitialCardPieces
			else if (needsInitialCardPieces)
			{
				combo = 23;
				if (pastedInitialCardPieces)
				{
					pastedEverythingMain();
				}
				else
				{
					setTimeout(checkIfEverythingPasted, 200);
				}
			}
			else
			{
				logCheckIfEverythingPastedDetils();
				throw 'unrecognised combo in CopyLevelDetails -> CopycheckIfEverythingPasted';
			}
		};

		if (needsLevelName)
		{
			pastePageIframeDocument.getElementById('LevelNameBox').value = details.levelName;
			pastedLevelName = true;
		}
		if (needsLevelDescription)
		{
			pastePageIframeDocument.getElementById('DescBox').value = details.levelDescription;
			pastedLevelDescription = true;
		}
		if (needsAiNames)
		{
			//remove old data - keep the Add button though
			const aiNameRows = TurnDOMArrayToNormalArray(pastePageIframeDocument.getElementById('NamesEditorCell').firstElementChild.querySelector('select').children).reverse();//reversing so that index is kept in sync

			aiNameRows.forEach(function(tr, index)
			{
				if (index > 0)
				{
					tr.lastElementChild.firstElementChild.click();//click Delete
				}
			});

			const addBtn = aiNameRows[0].firstElementChild;

			details.aiNames.forEach(function(info)
			{
				addBtn.click();//click Add

				var newRowChildren = addBtn.parentNode.previousElementSibling.children;

				newRowChildren[0].querySelector('select').value = info.slot;//assign .slot
				newRowChildren[1].firstElementChild.value = info.name;//assign .name
			});
			pastedAiNames = true;
		}
		if (needsAiColors)
		{
			//remove old data - keep the Add button though
			const aiColorRows = TurnDOMArrayToNormalArray(pastePageIframeDocument.getElementById('ColorsEditorCell').firstElementChild.querySelector('select').children).reverse();//reversing so that index is kept in sync

			aiColorRows.forEach(function(tr, index)
			{
				if (index > 0)
				{
					tr.lastElementChild.firstElementChild.click();//click Delete
				}
			});

			const addBtn = aiColorRows[0].firstElementChild;

			details.aiColors.forEach(function(info)
			{
				addBtn.click();//click Add

				var newRowChildren = addBtn.parentNode.previousElementSibling.children;

				newRowChildren[0].querySelector('select').value = info.slot;//assign .slot
				newRowChildren[1].firstElementChild.value = info.color;//assign .name
			});
			pastedAiColors = true;
		}
		if (needsInitialCardPieces)
		{
			//remove old data - keep the Add button though
			const initialCardPiecesRows = TurnDOMArrayToNormalArray(pastePageIframeDocument.getElementById('CardModifiersCell').firstElementChild.firstElementChild.children).reverse();//reversing so that index is kept in sync

			initialCardPiecesRows.forEach(function(tr, index)
			{
				if (index > 0)
				{
					tr.lastElementChild.firstElementChild.click();//click Delete
				}
			});

			const addBtn = initialCardPiecesRows[0].firstElementChild;
			var PiecesEditorLoaded = function(info, pastePageIframeDocument, pastedAllCards)
			{
				const cardPiecesTable = pastePageIframeDocument.getElementById('PiecesEditor_Inner').firstElementChild.firstElementChild;
				console.log(cardPiecesTable);
				const cardPiecesTableRows = TurnDOMArrayToNormalArray(cardPiecesTable.firstElementChild.children);
				const saveAndCloseBtn = cardPiecesTable.nextElementSibling;
				var assignCardDetailsFromCardName = function(cardData)
				{
					cardPiecesTableRows.forEach(function(tr)
					{
						//find the cards and enter the card details
						var trChildren = tr.children;
						var cardLabel = trChildren[0];
						var cardPiecesLabel = trChildren[1].firstElementChild;

						if (cardLabel.innerText === cardData.cardName)
						{
							//console.log('found ' + cardData.cardName + '; setting to ' + cardData.numCardPieces);
							cardPiecesLabel.value = cardData.numCardPieces;
						}
					});
				};

				info.cards.forEach(function(cardData)
				{
					assignCardDetailsFromCardName(cardData);
				});

				saveAndCloseBtn.click();

				if (pastedAllCards)
				{
					pastedInitialCardPieces = true;
				}
			};
			var checkIfPiecesEditorLoaded = function(info, pastePageIframeDocument, pastedAllCards)
			{
				var tryAgain = function()
				{
					setTimeout(function(){checkIfPiecesEditorLoaded(info, pastePageIframeDocument, pastedAllCards);}, 200);
				};
				var piecesEditorInner = pastePageIframeDocument.getElementById('PiecesEditor_Inner');

				if (piecesEditorInner)
				{
					var piecesEditorInnerFirstChild = piecesEditorInner.firstElementChild;

					if (piecesEditorInnerFirstChild)
					{
						PiecesEditorLoaded(info, pastePageIframeDocument, pastedAllCards);
					}
					else
					{
						tryAgain();
					}
				}
				else
				{
					tryAgain();
				}
			};

			console.log('details.initialCardPieces.length = ' + details.initialCardPieces.length);
			details.initialCardPieces.forEach(function(info, index)
			{
				console.log('index = ' + index);
				addBtn.click();//click Add

				var newRowChildren = addBtn.parentNode.previousElementSibling.children;

				newRowChildren[0].querySelector('select').value = info.slot;//assign .slot
				newRowChildren[2].firstElementChild.click();//click Modify

				//PiecesEditor doesn't appear straight away, wait for it to load
				checkIfPiecesEditorLoaded(info, pastePageIframeDocument, index === details.initialCardPieces.length - 1);
			});
		}

		checkIfEverythingPasted();
	};
	var copyDetails = function()
	{
		if (!copyPageIframeLoaded || !pastePageIframeLoaded || inCopyDetails)
		{
			return;//both iframes need to be loaded;
		}

		inCopyDetails = true;//copyDetails can get called twice
		/*
		check that detailsToCopy uses this syntax:
		detailsToCopy
		{
			levelName: bool,
			levelDescription: bool,
			aiNames: bool,
			aiColors: bool,
			initialCardPieces: bool
		}
		*/
		if (typeof detailsToCopy !== 'object')
		{
			return;
		}
		if (typeof detailsToCopy.levelName !== 'boolean' || typeof detailsToCopy.levelDescription !== 'boolean' || typeof detailsToCopy.aiNames !== 'boolean' || typeof detailsToCopy.aiColors !== 'boolean' || typeof detailsToCopy.initialCardPieces !== 'boolean')
		{
			return;
		}

		pasteDetails(getDetails());
	};
	var createIframe = function(id, url)
	{
		var iframe = create('iframe', id);

		iframe.src = url;

		return iframe;
	};

	copyAndPasteIframes = elementExists([copyPageId, pastePageId], function(elementIndex, elements)
	{
		if (elementIndex === 0)
		{
			copyPageIframe = createIframe(copyPageId, copyPageLocation);
			copyPageIframe.onload = function()
			{
				copyPageIframeLoaded = true;
				copyDetails();
			};
		}
		else
		{
			pastePageIframe = createIframe(pastePageId, pastePageLocation);
			pastePageIframe.onload = function()
			{
				pastePageIframeLoaded = true;
				copyDetails();
			};
		}

		return elements;
	}, function(iframe, iframes)
	{
		//console.log('before');console.log(copyPageIframeLoaded);console.log(pastePageIframeLoaded);
		//make sure the iframes are the levels we want to copy and paste
		if (iframe === copyPageIframe)
		{
			if (GetNumbers(window.location.href) !== levelToCopy)
			{
				if (levelToCopy !== GetNumbers(iframe.src))
				{
					copyPageIframeLoaded = false;
					iframe.src = copyPageLocation;
				}
			}
		}
		else
		{
			if (GetNumbers(window.location.href) !== levelToPaste)
			{
				if (levelToPaste !== GetNumbers(iframe.src))
				{
					pastePageIframeLoaded = false;
					iframe.src = pastePageLocation;
				}
			}
		}

		//console.log('after');console.log(copyPageIframeLoaded);console.log(pastePageIframeLoaded);
		copyDetails();//both iframes already loaded, call

		return iframes;
	});
	}catch(err){ErrFound(err);}
}

function GetStorage()
{
	return JSON.parse(localStorage.clch);
}

function UpdateStorage(storageString)
{
	localStorage.clch = storageString;
	return GetStorage();
}

function CheckStorage()
{
	if (!localStorage.clch)
	{
		localStorage.clch = JSON.stringify({});
	}

	var storageParsed = GetStorage();

	if (!storageParsed.copyAndPasteOptions)
	{
		storageParsed.copyAndPasteOptions = {};
	}

	/*
	copyAndPasteOptions:
	levelName: bool,
	levelDescription: bool,
	aiNames: bool,
	aiColors: bool,
	initialCardPieces: bool
	*/

	if (typeof storageParsed.copyAndPasteOptions.levelName !== 'boolean')
	{
		storageParsed.copyAndPasteOptions.levelName = false;
	}
	if (typeof storageParsed.copyAndPasteOptions.levelDescription !== 'boolean')
	{
		storageParsed.copyAndPasteOptions.levelDescription = false;
	}
	if (typeof storageParsed.copyAndPasteOptions.aiNames !== 'boolean')
	{
		storageParsed.copyAndPasteOptions.aiNames = false;
	}
	if (typeof storageParsed.copyAndPasteOptions.aiColors !== 'boolean')
	{
		storageParsed.copyAndPasteOptions.aiColors = false;
	}
	if (typeof storageParsed.copyAndPasteOptions.initialCardPieces !== 'boolean')
	{
		storageParsed.copyAndPasteOptions.initialCardPieces = false;
	}

	if (!storageParsed.hotkeys)
	{
		storageParsed.hotkeys = {};
	}
	if (!storageParsed.hotkeys.custom)
	{
		storageParsed.hotkeys.custom = {};
	}
	if (!storageParsed.hotkeys.custom.allNames)
	{
		storageParsed.hotkeys.custom.allNames = [];
	}

	return UpdateStorage(JSON.stringify(storageParsed));
}

function DeleteTmp()
{
	window.clch.tmp.key = null;
	window.clch.tmp.openInNewTab = null;
	window.clch.tmp.action = null;
	window.clch.tmp.hotkeyName = null;
}

function turnLabelToStorageKey(label)
{
	return ToCamelCase(label.toLowerCase().replace('copy ', ''));
}

//eval is insecure and slow - using Function instead https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval

function findCopyAndPasteOptionFromString(string)
{
	var functionString = 'return window.clch.GetStorage().copyAndPasteOptions.' + string + ';';
	var value = Function(functionString)();

	return value;
}

function setCopyAndPasteOptionFromString(string, checkboxValue)
{
	var functionString = 'var clchStorage = window.clch.GetStorage();clchStorage.copyAndPasteOptions.' + string + ' = ' + checkboxValue + ';return window.clch.UpdateStorage(JSON.stringify(clchStorage)).copyAndPasteOptions.' + string + ';';
	var value = Function(functionString)();

	return value;
}

function ToCamelCase(str)
{
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index)
	{
		if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
		return index === 0 ? match.toLowerCase() : match.toUpperCase();
	});
}

function ToSentenceCase(str)
{
	return str.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, "$1");//https://stackoverflow.com/questions/7225407/convert-camelcasetext-to-sentence-case-text#answer-7225450
}

function AddHotkeyToStorage(name, key, openInNewTab)
{
	try{
	console.log('name = ' + name + '\tkey = ' + key + '\topenInNewTab = ' + JSON.stringify(openInNewTab));
	window.clch.tmp.key = key;
	window.clch.tmp.openInNewTab = openInNewTab;
	var functionString = `var storage = window.clch.GetStorage();var hotkeyPath = storage.hotkeys; if (!hotkeyPath.` + name + `){hotkeyPath.` + name + ` = {key: window.clch.tmp.key, openInNewTab: false};}else { if (typeof window.clch.tmp.openInNewTab === "boolean"){hotkeyPath.` + name + `.openInNewTab = window.clch.tmp.openInNewTab;} if (typeof window.clch.tmp.key === "string"){hotkeyPath.` + name + `.key = window.clch.tmp.key;}} if (["openSettings", "runCopyAndPasteLevelDetails"].indexOf("` + name + `") > -1){hotkeyPath.` + name + `.openInNewTab = false;}return window.clch.UpdateStorage(JSON.stringify(storage)).hotkeys.` + name + `;`;

	return Function(functionString)();
	}catch(err){ErrFound(err);}
}

function AddHotkey(name, key, action)
{
	try{
	AddHotkeyToStorage(name, key);
	DeleteTmp();
	document.addEventListener('keydown', function(e)
	{
		var hotkeySetting = Function('return window.clch.GetStorage().hotkeys.' + name + ';')();
		var eKey = e.key.toLowerCase();
		var eTarget = e.target || e.srcElement;
		var canRunHotkey = true;//prevent the hotkey from running when typing in an input or typing in a textarea or pressing key in select/option or typing on a form

		if (eTarget)
		{
			if (eTarget.tagName)
			{
				if (['input', 'textarea', 'select', 'option', 'form'].indexOf(eTarget.tagName.toLowerCase()) > -1)
				{
					canRunHotkey = false;
				}
			}
		}


		if (eKey === hotkeySetting.key && canRunHotkey)
		{
			console.log('running ' + name);
			action(hotkeySetting);
		}
	});//like this makes customisations take immediate affect
	}catch(err){ErrFound(err);}
}

function openUrl(url, hotkeySetting)
{
	if (hotkeySetting.openInNewTab)
	{
		open(url);
	}
	else
	{
		location = url;
	}
}

function AddCustomHotkeyToStorage(name, key, openInNewTab, action)
{
	try{
	window.clch.tmp.key = key;
	window.clch.tmp.openInNewTab = openInNewTab;
	window.clch.tmp.action = action;

	var functionString = `var storage = window.clch.GetStorage();var customHotkeyPath = storage.hotkeys.custom; if (!customHotkeyPath.` + name + `){customHotkeyPath.` + name + ` = {key: window.clch.tmp.key, openInNewTab: window.clch.tmp.openInNewTab, action: window.clch.tmp.action};customHotkeyPath.allNames.push("` + name + `");}else{if (typeof window.clch.tmp.key === "string"){customHotkeyPath.` + name + `.key = window.clch.tmp.key;}if (typeof window.clch.tmp.openInNewTab === "boolean"){customHotkeyPath.` + name + `.openInNewTab = window.clch.tmp.openInNewTab;}if (typeof window.clch.tmp.action === "string"){customHotkeyPath.` + name + `.action = window.clch.tmp.action;}};return window.clch.UpdateStorage(JSON.stringify(storage)).hotkeys.custom.` + name + `;`;

	return Function(functionString)();
	}catch(err){ErrFound(err);}
}

function ConvertCustomHotkeyActionToJs(hotkeySetting, name)
{
	try{
	var action = hotkeySetting.action;
	/*
	action syntax:
	go to url
	show #popupId
	JS\sinsertJSCodeHere
	*/
	var actionfunction = null;
	var goToPageMatch = action.match(/go to (http:|https:)+[^\s]+[\w]/);
	var showPopupMatch = action.match(/show #[\w]+/);
	var JSMatch = action.match(/JS\s+.*/);

	if (goToPageMatch)
	{
		var goToPageMatchInstance = goToPageMatch[0];
		var urlMatch = goToPageMatchInstance.replace(/go to /, '');

		actionfunction = function(){openUrl(urlMatch, hotkeySetting);};
	}
	else if (showPopupMatch)
	{
		var showPopupMatchInstance = showPopupMatch[0];
		var popupId = showPopupMatchInstance.replace('show ', '');
		var popupShowId = 'clchPopupShow' + popupId.replace('#', '');

		actionfunction = function(){var a=document.getElementById(popupShowId);if(!a){a=document.createElement("a");a.setAttribute("href","#");a.setAttribute("data-toggle","model");a.setAttribute("data-target",popupId);a.setAttribute("id",popupShowId);document.body.appendChild(a);}a.click();};
	}
	else if (JSMatch)
	{
		var coreJSMatch = action.replace(/JS\s+/, '');

		console.log('coreJSMatch:\n' + coreJSMatch);
		window.clch.tmp.hotkeyName = name;
		actionfunction = function(){var ret = Function('const $ = window.$;const clch = window.clch;' + coreJSMatch)();DeleteTmp();return ret;};
	}
	else
	{
		throw 'invalid hotkey action syntax; hotkeySetting = ' + JSON.stringify(hotkeySetting);
	}

	return actionfunction;
	}catch(err){ErrFound(err);}
}

function AddCustomHotkeyCore(name)
{
	document.addEventListener('keydown', function(e)
	{
		var customHotkeySetting = Function('return window.clch.GetStorage().hotkeys.custom.' + name)();
		var action = ConvertCustomHotkeyActionToJs(customHotkeySetting, name);
		var eKey = e.key.toLowerCase();
		var eTarget = e.target || e.srcElement;
		var canRunHotkey = true;//prevent the hotkey from running when typing in an input or typing in a textarea or pressing key in select/option or typing on a form

		if (eTarget)
		{
			if (eTarget.tagName)
			{
				if (['input', 'textarea', 'select', 'option', 'form'].indexOf(eTarget.tagName.toLowerCase()) > -1)
				{
					canRunHotkey = false;
				}
			}
		}

		if (eKey === customHotkeySetting.key && canRunHotkey)
		{
			console.log('running ' + name);
			action(customHotkeySetting);
		}
	});
}

function AddAllHotkeys()
{
	try{
	var editingLevelInfo = OnPage('https://www.warzone.com/SinglePlayer/EditLevelData?Level=') || OnPage('https://www.warzone.com/SinglePlayer?EditLevel=');

	AddHotkey('publishCommunityLevel', 'r', function(hotkeySetting)
	{
		//retry to publish a community level
		if (!OnPage('https://www.warzone.com/SinglePlayer?Level=') || editingLevelInfo)
		{
			return;
		}

		var levelId = GetNumbers(location.href);
		var publishLevelUrl = 'https://www.warzone.com/SinglePlayer?PublishLevel=' + levelId;

		openUrl(publishLevelUrl, hotkeySetting);
	});
	AddHotkey('createCommunityLevel', 'n', function(hotkeySetting)
	{
		//create a new community level
		if (!OnPage('https://www.warzone.com/SinglePlayer') || editingLevelInfo)
		{
			return;
		}

		openUrl('https://www.warzone.com/SinglePlayer/CreateLevel', hotkeySetting);
	});
	AddHotkey('openSettings', 's', function()
	{
		//open script settings
		window.clch.showOptions();
	});
	AddHotkey('runCopyAndPasteLevelDetails', 'k', function()
	{
		//run copy and paste level details
		window.clch.copyAndPaste.showRunDialogue();
	});

	//apply custom hotkeys
	GetStorage().hotkeys.custom.allNames.forEach(function(name)
	{
		AddCustomHotkeyCore(name);
	});
	}catch(err){ErrFound(err);}
}

//ui
var popup =
{
	hide: function(popupId, xAndCloseBtn)
	{
		ModifyAttributes(xAndCloseBtn, [['data-dismiss', 'modal']]);//for form validation to take affect, dismiss needs to initially not set

		var overlay = document.querySelector('.modal-backdrop.fade.show');//reusing predefined overlay
		var popup = document.getElementById(popupId);

		//overlay and popup isn't always hidden. need to set 0.15s delay because hide transition doesn't set display to none
		overlay.className = overlay.className.replace('show', 'hide');
		setTimeout(function(){overlay.style.display = 'none';}, 150);
		popup.className = popup.className.replace('show', 'hide');
		setTimeout(function(){popup.style.display = 'none';}, 150);
	},
	createMain: function(popupId, heading)
	{
		var menuContainer = ModifyAttributes(create('div', popupId),
		[
			['class', 'modal fade show'],
			['tabindex', '-1'],
			['role', 'dialog']
		]);
		var menuSubContainer = ModifyAttributes(create('div', '', '', menuContainer),
		[
			['class', 'modal-dialog modal-lg'],
			['role', 'document']
		]);
		var menuContent = ModifyAttributes(create('div', '', '', menuSubContainer),
		[
			['class', 'modal-content']
		]);
		var menuHeader = ModifyAttributes(create('div', '', '', menuContent),
		[
			['class', 'modal-header']
		]);
		var menuHeaderChildren = create(['h5', 'button'], ['', ''], [heading, '×'], [menuHeader, menuHeader]);
		var closeBtn = menuHeaderChildren[1];
		var closeBtnNormalOnClick = function(){popup.hide(popupId, closeBtn);};

		closeBtn.setOnClick = function(additionalOnClick)
		{
			closeBtn.onclick = function()
			{
				closeBtnNormalOnClick();

				if (typeof additionalOnClick === 'function')
				{
					additionalOnClick();
				}
			};
		};
		ModifyAttributes(menuHeaderChildren[0],
		[
			['class', 'modal-title']
		]);
		closeBtn.innerHTML = closeBtn.value;
		closeBtn.style.cursor = 'pointer';
		ModifyAttributes(closeBtn,
		[
			['class', 'close'],
			['type', 'button'],
			['data-dimiss', 'modal'],
			['aria-label', 'Close'],
			['aria-hidden', 'true']
		]).onclick = function()
		{
			closeBtnNormalOnClick();
		};

		var menuBody = ModifyAttributes(create('div', '', '', menuContent),
		[
			['class', 'modal-body']
		]);

		return {menuContainer: menuContainer, menuSubContainer: menuSubContainer, menuContent: menuContent, menuHeader: menuHeader, closeBtn: closeBtn, menuBody: menuBody};
	},
	createForm: function(name, parent)
	{
		var form = create('form', '', '', parent);

		return ModifyAttributes(form,
		[
			['name', name],
			['role', 'form']
		]);
	},
	createOptionRow: function(label, optionRowParent, functionToSetCheckboxValue)
	{
		var row = ModifyAttributes(create('div', '', '', optionRowParent),
		[
			['class', 'clchOptionRow']
		]);
		var rowContents = create(['span', 'label', 'input', 'div'], ['', '', '', ''], [label, '', '', ''], [row, row, 1, 1]);
		var optionCheckbox = rowContents[2];
		var htmlLabel = rowContents[1];

		ModifyAttributes(rowContents[1],
		[
			['class', 'switch']
		]);
		ModifyAttributes(optionCheckbox,
		[
			['type', 'checkbox'],
			['class', 'clchCopyAndPasteCheckbox']
		]);
		ModifyAttributes(rowContents[3],
		[
			['class', 'slider round']
		]);

		if (typeof functionToSetCheckboxValue === 'function')
		{
			functionToSetCheckboxValue(optionCheckbox, label);
		}

		return row;
	},
	createOptionRows: function(labels, optionRowParents, functionToSetCheckboxValue)
	{
		var rows = [];

		labels.forEach(function(label, index)
		{
			rows.push(popup.createOptionRow(label, optionRowParents[index], functionToSetCheckboxValue));
		});

		return rows;
	},
	createOptionHeading: function(heading, optionHeadingParent)
	{
		return ModifyAttributes(create('div', '', heading, optionHeadingParent),
		[
			['class', 'title']
		]);
	},
	createHotkeyRowMain(name, setting, row, isCustom)
	{
		var rowContents = create(['span', 'div', 'span', 'input', 'span', 'label', 'input', 'div'], ['', '', '', '', '', '', '', ''],[ToSentenceCase(name), '', 'Hotkey&nbsp;', setting.key, 'Open in new tab&nbsp;', '', '', ''], [row, row, 1, 1, 1, 1, 5, 5]);
		var hotkeySettingContainer = rowContents[1];
		var hotkeyKey = rowContents[3];
		var openInNewTabSwitch = rowContents[5];
		var openInNewTabCheckbox = rowContents[6];
		var openInNewTabSlider = rowContents[7];

		ModifyAttributes(hotkeySettingContainer,
		[
			['class', 'clchOptionRow'],
			['style', 'display: flex; justify-content: space-between; line-height: -moz-block-height;']//space everything evenly and keep everything in a line - flex changes the line-height
		]);
		ModifyAttributes(hotkeyKey,
		[
			['type', 'text'],
			['class', 'clchHotkeyKey'],
			['maxlength', '1'],
			['data-for', ToCamelCase(name)]
		]);
		ModifyAttributes(openInNewTabSwitch,
		[
			['class', 'switch'],
			['style', 'margin: 0.25rem 30px 0.25rem 0;']//makes slider stay in a line
		]);
		ModifyAttributes(openInNewTabCheckbox,
		[
			['type', 'checkbox'],
			['class', 'clchHotkeyOpenInNewTabCheckbox'],
			['data-for', ToCamelCase(name)]
		]);
		ModifyAttributes(openInNewTabSlider,
		[
			['class', 'slider round']
		]);

		if (isCustom)
		{
			hotkeyKey.setAttribute('data-custom', 'true');
			openInNewTabCheckbox.setAttribute('data-custom', 'true');
		}
		else
		{
			hotkeyKey.setAttribute('data-custom', 'false');
			openInNewTabCheckbox.setAttribute('data-custom', 'false');
		}

		//set checkbox checked status
		openInNewTabCheckbox.checked = setting.openInNewTab;

		//disable popups from being able to open in a new tab - would be difficult to open the page that the popup can be displayed on
		if (['Open settings', 'Run copy and paste level details'].indexOf(ToSentenceCase(name)) > -1)
		{
			openInNewTabCheckbox.setAttribute('disabled', 'true');
			openInNewTabSlider.setAttribute('style', 'cursor: default;');
		}

		return rowContents;
	},
	createBuiltInHotkeyRow: function(name, setting, parent)
	{
		var row = ModifyAttributes(create('div', '', '', parent),
		[
			['class', 'clchOptionRow']
		]);

		popup.createHotkeyRowMain(name, setting, row);

		return row;
	},
	createBuiltInHotkeyRows: function(parent)
	{
		var builtInHotkeysNames = ['Open settings', 'Run copy and paste level details', 'Publish community level', 'Create community level'];
		var builtInHotkeysSettings = [GetStorage().hotkeys.openSettings, GetStorage().hotkeys.runCopyAndPasteLevelDetails, GetStorage().hotkeys.publishCommunityLevel, GetStorage().hotkeys.createCommunityLevel];
		var setting;
		var rows = [];

		builtInHotkeysNames.forEach(function(name, index)
		{
			setting = builtInHotkeysSettings[index];
			rows.push(popup.createBuiltInHotkeyRow(name, setting, parent));
		});

		return rows;
	},
	createCustomHotkeyRow: function(name, setting, parent, appendMode)
	{
		var row = ModifyAttributes(create('div', '', '', parent, appendMode),
		[
			['class', 'clchOptionRow'],
			['style', 'display: flex; justify-content: space-between; line-height: -moz-block-height;']
		]);
		var rowContents = popup.createHotkeyRowMain(name, setting, row, true);
		var hotkeyName = rowContents[0];
		var nameAndActionRow = ModifyAttributes(create('div', '', '', hotkeyName, 'beforebegin'),
		[
			['class', 'clchOptionRow']//keep the name and action in a line and allow rows below to use the full width
		]);

		nameAndActionRow.appendChild(hotkeyName);

		var action = ModifyAttributes(create('input', '', setting.action, nameAndActionRow),
		[
			//insert action after name to the far right of it
			['class', 'clchHotkeyAction'],
			['data-for', ToCamelCase(name)],
			['data-custom', 'true'],
			['style', 'float: right;'],
			['type', 'text']
		]);

		return row;
	},
	createCustomHotkeyRows: function(parent)
	{
		var customHotkeysNames = GetStorage().hotkeys.custom.allNames;
		var setting;
		var rows = [];

		customHotkeysNames.forEach(function(name)
		{
			setting = Function('return window.clch.GetStorage().hotkeys.custom.' + name + ';')();
			rows.push(popup.createCustomHotkeyRow(name, setting, parent));
		});

		return rows;
	},
	createCustomHotkeyAddBtn: function(parent)
	{
		var row = ModifyAttributes(create('div', '', '', parent), [['class', 'clchOptionRow']]);
		var button = ModifyAttributes(create('input', '', 'Add custom hotkey', row), [['type', 'button']]);

		button.onclick = function()
		{
			var notEnteredUniqueName = true;
			var name;
			var nameCammelCase;
			var nameSentenceCase;
			var tryAgain;

			while (notEnteredUniqueName)
			{
				name = (function(){return prompt('Enter hotkey name');})();
				nameCammelCase = ToCamelCase(name);
				nameSentenceCase = ToSentenceCase(nameCammelCase);

				if (GetStorage().hotkeys.custom.allNames.indexOf(nameCammelCase) === -1 && nameCammelCase !== 'allNames')
				{
					notEnteredUniqueName = false;
				}
				else
				{
					tryAgain = (function(){return confirm("Hotkey name isn't unique. Try again?");})();

					if (!tryAgain)
					{
						return;
					}
				}
			}

			var setting = AddCustomHotkeyToStorage(nameCammelCase, '', false, 'go to https://www.warzone.com');

			DeleteTmp();
			AddCustomHotkeyCore(nameCammelCase);
			popup.createCustomHotkeyRow(nameSentenceCase, setting, button, 'beforebegin');
			popup.resizeInputs();
		};

		return row;
	},
	createXAndCloseBtn: function(text, xAndCloseBtnParent, runFunction)
	{
		var xAndCloseBtn = ModifyAttributes(create('input', '', text, xAndCloseBtnParent),
		[
			['type', 'button']
		]);

		if (typeof runFunction === 'function')
		{
			xAndCloseBtn.onclick = function()
			{
				runFunction(xAndCloseBtn);
			};
		}

		return xAndCloseBtn;
	},
	resizeInputs: function()
	{
		var inputs = TurnDOMArrayToNormalArray(document.querySelectorAll('input[class *= "clch"]'));
		var width;

		inputs.forEach(function(input)
		{
			if (input.value === '')
			{
				if (input.placeholder === '')
				{
					width = 1;
				}
				else
				{
					width = input.placeholder.length;//make space for placeholder
				}
			}
			else
			{
				width = input.value.length;
			}

			if (input.type === 'number')
			{
				width++;//add space for up and down arrows
			}

			if (input.type !== 'button')
			{
				input.style.width = width + 'em';
			}
		});
	}
};

const menuId = 'communityLevelsCreatorHelperMenu';
const copyAndPasteLevelDetailsId = 'communityLevelsCreatorHelperCopyAndPasteLevelDetailsPopup';

var popups =
{
	showCommunityLevelsCreatorHelperMenu: function()
	{
		try{
		var menu = elementExists(menuId, function()
		{
			var Menu = popup.createMain(menuId, 'Community Levels Creator Helper Options');
			var optionsForm = popup.createForm('clchOptionsForm', Menu.menuBody);
			var copyAndPasteHeading = popup.createOptionHeading("'Copy and Paste' level details options", optionsForm);
			var copyAndPasteOptionRows = popup.createOptionRows(['Copy level name', 'Copy level description', 'Copy AI names', 'Copy AI colors', 'Copy initial card pieces'], [optionsForm, optionsForm, optionsForm, optionsForm, optionsForm], function(optionCheckbox, label)
			{
				//set storage item value for the optionCheckbox
				if (findCopyAndPasteOptionFromString(turnLabelToStorageKey(label)))
				{
					optionCheckbox.checked = true;
				}
				else
				{
					optionCheckbox.checked = false;
				}

				return optionCheckbox;
			});
			var hotkeysHeading = popup.createOptionHeading('Hotkeys', optionsForm);
			var builtInHotkeyOptionRows = popup.createBuiltInHotkeyRows(optionsForm);
			var customHotkeyOptionRows = popup.createCustomHotkeyRows(optionsForm);
			var customHotkeyAddButton = popup.createCustomHotkeyAddBtn(optionsForm);
			var saveAndCloseBtn = popup.createXAndCloseBtn('Save and Close', optionsForm, function(xAndCloseBtn)
			{
				//save options to LS and close
				var settingsForm = document.clchOptionsForm;
				var copyAndPasteCheckboxes = TurnDOMArrayToNormalArray(settingsForm.querySelectorAll('.clchCopyAndPasteCheckbox'));
				var hotkeyKeyKeys = TurnDOMArrayToNormalArray(settingsForm.querySelectorAll('.clchHotkeyKey'));
				var hotkeyOpenInNewTabCheckboxes = TurnDOMArrayToNormalArray(settingsForm.querySelectorAll('.clchHotkeyOpenInNewTabCheckbox'));
				var hotkeyActions = TurnDOMArrayToNormalArray(settingsForm.querySelectorAll('.clchHotkeyAction'));
				var hotkeysRoot = 'window.clch.GetStorage().hotkeys.';
				var getHotkeyData = function(element)
				{
					var name = element.getAttribute('data-for');
					var isCustom = JSON.parse(element.getAttribute('data-custom'));

					return {name: name, isCustom: isCustom};
				};

				console.log('saving');
				copyAndPasteCheckboxes.forEach(function(checkbox)
				{
					setCopyAndPasteOptionFromString(turnLabelToStorageKey(checkbox.parentNode.previousElementSibling.innerText), checkbox.checked);
				});
				hotkeyKeyKeys.forEach(function(element)
				{
					var hotkeyData = getHotkeyData(element);

					if (element.value.length > 0)
					{
						element.value = element.value[0].toLowerCase();//can only support a single character
					}

					if (hotkeyData.isCustom)
					{
						AddCustomHotkeyToStorage(hotkeyData.name, element.value);
						DeleteTmp();
					}
					else
					{
						AddHotkeyToStorage(hotkeyData.name, element.value);
						DeleteTmp();
					}
				});
				hotkeyOpenInNewTabCheckboxes.forEach(function(element)
				{
					var hotkeyData = getHotkeyData(element);

					if (hotkeyData.isCustom)
					{
						AddCustomHotkeyToStorage(hotkeyData.name, null, element.checked);
						DeleteTmp();
					}
					else
					{
						AddHotkeyToStorage(hotkeyData.name, null, element.checked);
						DeleteTmp();
					}
				});
				hotkeyActions.forEach(function(element)
				{
					var hotkeyData = getHotkeyData(element);
					var action = element.value;
					var goToPageMatch = action.match(/go to (http:|https:)+[^\s]+[\w]/);
					var showPopupMatch = action.match(/show #[\w]+/);
					var JSMatch = action.match(/JS\s+.*/);

					if (hotkeyData.isCustom && (goToPageMatch || showPopupMatch || JSMatch))
					{
						AddCustomHotkeyToStorage(hotkeyData.name, null, null, action);
						DeleteTmp();
					}
				});
				console.log('saved');
				popup.hide(menuId, xAndCloseBtn);
			});

			popup.resizeInputs();

			return Menu.menuContainer;
		});

		return menu;
		}catch(err){ErrFound(err);}
	},
	showCopyAndPasteLevelDetailsRunPopup: function()
	{
		try{
		var selfPopup = popup.createMain(copyAndPasteLevelDetailsId, 'Copy and Paste Level Details');
		var detailsForm = popup.createForm('clchCopyAndPasteRunForm', selfPopup.menuBody);
		var detailsLablesAndSettings = create(['div', 'span', 'input', 'span', 'div', 'span', 'input', 'span'], ['', '', '', '', '', ''], ['', 'Level ID to copy details from:&nbsp;', '', '&nbsp;Must be a number', '', 'Level ID to paste details to:&nbsp;', '', '&nbsp;Must be a number'], [detailsForm, 0, 0, 0, detailsForm, 4]);
		var rowCopy = detailsLablesAndSettings[0];
		var rowPaste = detailsLablesAndSettings[4];
		var inputLevelIdCopy = detailsLablesAndSettings[2];
		var inputLevelIdPaste = detailsLablesAndSettings[6];
		var invalidLevelIdCopy = detailsLablesAndSettings[3];
		var invalidLevelIdPaste = detailsLablesAndSettings[7];

		rowCopy.className = 'clchOptionRow';
		rowPaste.className = 'clchOptionRow';
		invalidLevelIdCopy.style.display = 'none';
		invalidLevelIdCopy.className = 'clchInvalid';
		invalidLevelIdPaste.style.display = 'none';
		invalidLevelIdPaste.className = 'clchInvalid';

		ModifyAttributes(inputLevelIdCopy, [['aria-required', 'true']]);
		ModifyAttributes(inputLevelIdPaste, [['aria-required', 'true']]);

		selfPopup.closeBtn.setOnClick(function()
		{
			invalidLevelIdCopy.style.display = 'none';
			invalidLevelIdPaste.style.display = 'none';
		});

		var okBtn = popup.createXAndCloseBtn('Ok', detailsForm, function(xAndCloseBtn)
		{
			//validate
			var errorInLevelIdCopy = inputLevelIdCopy.value.match(/[^\d]/) || inputLevelIdCopy.value.length === 0;
			var errorInLevelIdPaste = inputLevelIdPaste.value.match(/[^\d]/) || inputLevelIdPaste.value.length === 0;
			var errorFound = errorInLevelIdCopy || errorInLevelIdPaste;

			console.log('errorInLevelIdCopy = ' + JSON.stringify(errorInLevelIdCopy));
			console.log('errorInLevelIdPaste = ' + JSON.stringify(errorInLevelIdPaste));
			console.log('errorFound = ' + JSON.stringify(errorFound));

			invalidLevelIdCopy.style.display = 'none';
			invalidLevelIdPaste.style.display = 'none';

			if (errorInLevelIdCopy)
			{
				invalidLevelIdCopy.style.display = 'inline';
			}
			if (errorInLevelIdPaste)
			{
				invalidLevelIdPaste.style.display = 'inline';
			}

			if (!errorFound)
			{
				//close
				console.log('closing');
				popup.hide(copyAndPasteLevelDetailsId, xAndCloseBtn);
				//run
				CopyLevelDetails(inputLevelIdCopy.value, inputLevelIdPaste.value, GetStorage().copyAndPasteOptions);
			}
		});

		ModifyAttributes(okBtn, [['data-dismiss', '']]);//need to empty data-dismiss for validation to take place
		invalidLevelIdPaste.style.display = 'none';
		invalidLevelIdCopy.style.display = 'none';

		popup.resizeInputs();

		return selfPopup.menuContainer;
		}catch(err){ErrFound(err);}
	}
};

function CreateUI()
{
	try{
	elementExists('navbarSupportedContent', function(){return;}, function(mainNav)
	{
		const singlePlayerSubNav = mainNav.firstElementChild.firstElementChild.firstElementChild.nextElementSibling;
		var createNavMenu = function(id, text, target, clickFunction)
		{
			var spNavMenu = ModifyAttributes(create('a', id, text, singlePlayerSubNav),
			[
				['class', 'dropdown-item'],
				['href', '#'],
				['data-toggle', 'modal'],
				['data-target', '#' + target]
			]);

			spNavMenu.onclick = function()
			{
				clickFunction();
			};

			return spNavMenu;
		};
		var createNavMenus = function(ids, texts, targets, clickFunctions)
		{
			var spNavMenus = [];

			ids.forEach(function(id, index)
			{
				spNavMenus.push(createNavMenu(id, texts[index], targets[index], clickFunctions[index]));
			});

			return spNavMenus;
		};
		//places main menu and run copy and paste level details under singleplayer
		var navMenus = createNavMenus(['communityLevelsCreatorHelperNavMenu', 'communityLevelsCreatorHelperRunCopyPasteNavMenu'], ['Community Levels Creator Helper', 'Copy and Paste Level Details'], [menuId, copyAndPasteLevelDetailsId], [popups.showCommunityLevelsCreatorHelperMenu, popups.showCopyAndPasteLevelDetailsRunPopup]);
	});
	}catch(err){ErrFound(err);}
}

function CreateHotkeysForSlotSelection(slotSelector)
{
	try{
	//when key pressed, assign that slot - select.onkeydown isn't triggered - bypassing this by removing the 'Slot ' text. this works because browsers automatically select an option that start with the key pressed
	var options = TurnDOMArrayToNormalArray(slotSelector.children);//can't use querySelectorAll('option[innerText ^= "Slot "]') as innerText isn't used in filtering

	options.forEach(function(option)
	{
		option.innerText = option.innerText.replace('Slot ', '');
	});
	}catch(err){ErrFound(err);}
}

function CreateHotkeysForSlotSelection2(slotSelectors)
{
	try{
	slotSelectors.forEach(function(slotSelector, index)
	{
		CreateHotkeysForSlotSelection(slotSelector);
		//place the 'Slot ' text just before the select
		var slotTextId = 'slotTextFor' + slotSelector.parentNode.parentNode.parentNode.parentNode.parentNode.id + index;

		elementExists(slotTextId, function()
		{
			create('span', slotTextId, 'Slot&nbsp;', slotSelector, 'beforebegin');
		});
	});
	}catch(err){ErrFound(err);}
}

function CreateHotkeysForAllSlotSelectors()
{
	try{
	CreateHotkeysForSlotSelection2(document.getElementById('NamesEditorCell').querySelectorAll('select'));
	CreateHotkeysForSlotSelection2(document.getElementById('ColorsEditorCell').querySelectorAll('select'));
	CreateHotkeysForSlotSelection2(document.getElementById('CardModifiersCell').querySelectorAll('select'));
	}catch(err){ErrFound(err);}
}

function PredictSlotValue(latestSelect)
{
	//predicts that users want the slot just after the one the selected after clicking 'Add' when editing level details
	var previousSelectTr = latestSelect.parentNode.parentNode.previousElementSibling;

	if (!previousSelectTr)
	{
		return;//init when there there isn't a previous slot
	}

	var previousSelectValue = parseInt(previousSelectTr.firstElementChild.querySelector('select').value);
	var predictedValue = previousSelectValue + 1;

	latestSelect.value = JSON.stringify(predictedValue);
}

function ModifyEditDetailsAddButtons()
{
	try{
	TurnDOMArrayToNormalArray(document.querySelectorAll('input[value = "Add"]')).forEach(function(addBtn)
	{
		addBtn.addEventListener('click', function()
		{
			CreateHotkeysForAllSlotSelectors();//add hotkeys for new slot select
			PredictSlotValue(addBtn.parentNode.previousElementSibling.querySelector('select'));
		});
	});
	}catch(err){ErrFound(err);}
}

function ListenForSlotSelectionHotkeys()
{
	try{
	if (!OnPage('https://www.warzone.com/SinglePlayer/EditLevelData?Level='))
	{
		return;
	}

	CreateHotkeysForAllSlotSelectors();
	ModifyEditDetailsAddButtons();
	}catch(err){ErrFound(err);}
}

(function()
{
	try{
	if (!OnPage('https://www.warzone.com/SinglePlayer'))
	{
		return;
	}

	AddCss('#' + copyPageId + ', #' + pastePageId + `
{
	display: none;
	width: 100%;
	height: 600px;
}`);//get and set the data in the background

	AddCss(`.clchOptionRow
{
	padding-top: 10px;/*keeps the option sliders in a line*/
}

.clchInvalid
{
	color: red;
}`);
	window.clch =
	{
		GetStorage: function(){return GetStorage();},
		UpdateStorage: UpdateStorage,
		showOptions: function(){return document.getElementById('communityLevelsCreatorHelperNavMenu').click();/*using popups.showCommunityLevelsCreatorHelperMenu doesn't show the menu*/},
		copyAndPaste:
		{
			copyAndPasteLevelDetails: CopyLevelDetails,
			showRunDialogue: function(){return document.getElementById('communityLevelsCreatorHelperRunCopyPasteNavMenu').click();/*using popups.showCopyAndPasteLevelDetailsRunPopup doesn't show the menu*/}
		},
		tmp: {}
	};

	//add model styling - borrowed from Muli's Userscript
	if (!window.MULIS_USERSCRIPT)
	{
		AddCss(`/* The switch - the box around the slider */
.switch {
	position: relative;
	width: 50px;
	height: 24px;
	margin-right: 30px;
	float: right;
}

/* Hide default HTML checkbox */
.switch input
{
	display:none;
}

/* The slider */
.slider
{
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	-webkit-transition: .4s;
	transition: .4s;
}

.slider:before
{
	position: absolute;
	content: "";
	height: 20px;
	width: 20px;
	left: 2px;
	bottom: 2px;
	background-color: white;
	-webkit-transition: .4s;
	transition: .4s;
}

input:checked + .slider
{
	background-color: #0E5C83;
}

input:focus + .slider
{
	box-shadow: 0 0 1px crimson;
}

input:checked + .slider:before
{
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
}

/* Rounded sliders */
.slider.round
{
	border-radius: 34px;
}

.slider.round:before
{
	border-radius: 50%;
}`);
	}

	CheckStorage();
	CreateUI();
	ListenForSlotSelectionHotkeys();
	AddAllHotkeys();
	}catch(err){ErrFound(err);}
})();