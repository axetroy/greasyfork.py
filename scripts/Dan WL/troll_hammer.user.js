// ==UserScript==
// @name        troll_hammer
// @namespace   DanWL
// @description Makes it easier to share your friends list and blacklist. Has ability to add and remove players from your blacklist and friends list in bulk.
// @include     https://www.warzone.com/ManageFriendList
// @include     https://www.warzone.com/ManageBlockList
// @include     https://www.warzone.com/profile?p=*
// @include     https://www.warzone.com/Profile?p=*
// @include     https://www.warzone.com/profile?P=*
// @include     https://www.warzone.com/Profile?P=*
// @include     https://www.warzone.com/Admin/Report1*
// @version     1.1.3
// @grant       none
// ==/UserScript==
/*
Fixed bug in detecting if adding or removing self
Fixed variable scoping
Correctly validated input
Renamed "blacklist" to "blocklist" to be consistent with warzone change

https://www.warzone.com/Forum/312493-joint-community-blacklist-rascistrude-players?Offset=90:
Just from a technical perspective I think it would be possible to create a shared blacklist userscript that could periodically (say, every login) synchronize players' blacklists in the background based on blacklists they "subscribe" to. So:

* you can share (manually-curated) blacklists somewhere for other people to subscribe to
* you can browse/subscribe to other people's shared blacklists
* your own blacklists would now also contain everyone on the shared blacklists you're subscribed to

also, maybe:
* the Player Notes section of anyone that gets auto-blacklisted for you would contain an explanation of which subscribed blacklist has them and why they were added to that subscribed blacklist in the first place.
* you can export your own blacklist into a shared blacklist instead of having to type everything out

I don't personally think I would use such a tool (even if I still played the game and whatnot) because of community fragmentation but I'm curious as to whether anyone would be interested in having such an option available. 
*/
window.trollHammer = {};
console.log('running trollHammer 1.1.3');
const OnFriendsList = location.href.match(/https:\/\/www\.warzone\.com\/ManageFriendList/i);
const OnBlockList = location.href.match(/https:\/\/www\.warzone\.com\/ManageBlockList/i);
const OnPlayerProfile = location.href.match(/https:\/\/www\.warzone\.com\/Profile\?p=/i);
const OnPlayerAltsPage = location.href.match(/https:\/\/www\.warzone\.com\/Admin\/Report1\?PlayerID=\d+/i) || location.href.match(/https:\/\/www\.warzone\.com\/Admin\/Report1\?ReportID=\d+/i);

function IsUser(player_numbers)
{
	let ret = false;
	let AccountDropDown = document.getElementById('AccountDropDown');
	let locationDigits = location.href.match(/\d+/);

	if (!AccountDropDown) return ret;
	if (player_numbers == 'self' && !locationDigits) return ret;

	if (locationDigits)	locationDigits = parseInt(locationDigits[0]);

	let AccountDropDownPlayerNumber = parseInt(AccountDropDown.nextElementSibling.firstElementChild.href.match(/\d+/)[0]);

	if (typeof player_numbers == 'number')
	{
		ret = player_numbers === AccountDropDownPlayerNumber;
	}
	else if (player_numbers == 'self')
	{
		player_numbers = AccountDropDownPlayerNumber;

		ret = locationDigits === AccountDropDownPlayerNumber;
	}
	else
	{
		for (let i = 0; i < player_numbers.length; i++)
		{
			if (AccountDropDownPlayerNumber === player_numbers[i])
			{
				ret = true;
				break;
			}
		}
	}

	return ret;
}

function GetPlayerLinksIds()
{
	try{
	let right_container = document.createElement('div');
	let copy_link_container = document.createElement('div');
	let copy_link_textarea = document.createElement('textarea');
	let copy_playerid_container = document.createElement('div');
	let copy_playerid_textarea = document.createElement('textarea');
	let profileLinks = window.$("a[href ^= 'Profile?p=']");//OnBlockList || OnFriendsList || OnPlayerAltsPage
	let playerIDs = [];

	profileLinks.each(function(index)
	{
		let playerNumber = this.href.match(/\d+/)[0];
		let playerId = playerNumber.substring(2, playerNumber.length - 2);

		if (playerIDs.indexOf(playerId) === -1)//OnPlayerAltsPage "Look at their profile" link is included - don't want duplicated player links and ids
		{
			playerIDs.push(playerId);
			copy_link_textarea.value += this.href.replace(/https:\/\/www\./i, 'http://');//less chars in mail if player links are sent via PM

			if (index < profileLinks.length - 1)
			{
				copy_link_textarea.value += '\n';
			}
		}
	});

	copy_playerid_textarea.value = playerIDs.toString();

	let player_links_description = document.createElement('p');

	player_links_description.innerHTML = 'Player links: (click to select)';
	player_links_description.style.cursor = 'pointer';
	player_links_description.style.textAlign = 'center';
	copy_link_textarea.onclick = function()
	{
		copy_link_textarea.select();
	};
	copy_link_textarea.onclick = function()
	{
		copy_link_textarea.select();
	};

	let player_id_description = document.createElement('p');

	player_id_description.innerHTML = 'Player ids: (click to select)';
	player_id_description.style.cursor = 'pointer';
	player_id_description.style.textAlign = 'center';
	player_id_description.onclick = function()
	{
		copy_playerid_textarea.select();
	};
	copy_playerid_textarea.onclick = function()
	{
		copy_playerid_textarea.select();
	};

	//create a container for blacklisted and friended players to give the page structure
	let list_container = profileLinks[0].parentElement.parentElement;
	let player_container = document.createElement('div');

	player_container.style.cssFloat = 'left';
	player_container.style.width = '50%';

	if (OnPlayerAltsPage)
	{
		//place player links and ids at the bottom of the page
		player_container.style.width = '100%';
		player_container.style.cssFloat = 'none';
		document.body.appendChild(player_container);
	}
	else
	{
		//place player links and ids to the right of the list of friends/players
		list_container.insertAdjacentElement('beforebegin', player_container);
		player_container.appendChild(list_container);
		right_container.style.cssFloat = 'right';
		right_container.style.width = '50%';
	}

	copy_link_container.style.cssFloat = 'left';
	copy_link_container.style.width = '60%';
	copy_link_container.minWidth = '336px';

	copy_playerid_container.style.cssFloat = 'left';
	copy_playerid_container.style.width = '40%';
	copy_playerid_container.style.minWidth = '138px';

	if (OnPlayerAltsPage)
	{
		player_container.appendChild(right_container);
	}
	else
	{
		player_container.insertAdjacentElement('afterend', right_container);
	}

	right_container.appendChild(copy_link_container);

	if (OnBlockList)
	{
		//makes the descriptions appear inline with the list of blacklisted players
		player_links_description.style.marginTop = '0';
		player_id_description.style.marginTop = '0';

		if (!window.MULIS_USERSCRIPT)
		{
			player_links_description.removeAttribute('style');
			player_id_description.removeAttribute('style');
		}
	}

	player_links_description.style.width = '100%';
	player_id_description.style.width = '100%';

	copy_link_container.appendChild(player_links_description);
	copy_playerid_container.appendChild(player_id_description);

	if (OnFriendsList)
	{
		//move the number of friends message into the container and fix spacing
		let friends_txt = document.createElement('p');

		friends_txt.appendChild(player_container.previousElementSibling.previousElementSibling.previousElementSibling.previousSibling);
		
		player_container.children[0].insertAdjacentElement('beforebegin', friends_txt);
		player_container.previousElementSibling.previousElementSibling.remove();
	}

	let quarterListHeight = list_container.clientHeight / 4 + 'px';//height should be 4 times less than the total number of lines - responsive height don't work in the expected way

	//if less than 40 accounts on list, use full - cuts of making to difficult to see the rest if less than that
	if (playerIDs.length < 40)
	{
		quarterListHeight = list_container.clientHeight + 'px';
	}

	copy_link_container.appendChild(copy_link_textarea);

	copy_link_textarea.style.minWidth = '330px';
	copy_link_textarea.style.height = quarterListHeight;

	copy_playerid_container.style.minWidth = '132px';
	copy_link_container.insertAdjacentElement('afterend', copy_playerid_container);
	copy_playerid_container.appendChild(copy_playerid_textarea);

	copy_playerid_textarea.style.width = '100%';
	copy_playerid_textarea.style.height = quarterListHeight;

	//resize the AutoContainer so that the background is displayed behind the players list
	let AutoContainer = document.getElementById('AutoContainer');

	if (AutoContainer)
	{
		AutoContainer.style.height = AutoContainer.clientHeight + list_container.clientHeight + 'px';
	}
	}catch(err){console.log(err);}
}

let blocklisted_accounts = [];
let friended_accounts = [];

function wzBLAndFriendsAjax(method, playerID, successFunction)
{
	try{
	let methods = ['AjaxAddToBlackList', 'AjaxRemoveFromBlackList', 'AjaxAddPlayer', 'AjaxRemoveFromInviteList'];

	console.log('method:');
	console.log(method);
	console.log('playerID:');
	console.log(playerID);
	console.log('successFunction:');
	console.log(successFunction);

	//check if not adding/removing self
	let ownProfileA = window.$('.dropdown-item').filter("[href ^= '/Profile?p=']")[0];

	if (!ownProfileA)
	{
		return;
	}

	let ownPlayerNumber = ownProfileA.href.match(/\d+/)[0];

	if (!ownPlayerNumber)
	{
		return;
	}

	let ownPlayerId = parseInt(ownPlayerNumber.substring(2, ownPlayerNumber.length - 2));

	//refuse to carry on if error
	if (!methods.includes(method) || !(typeof playerID === 'number' && isFinite(playerID)) || playerID === ownPlayerId)
	{
		return;
	}

	let isAddingToBlocklist = method === 'AjaxAddToBlackList';
	let isRemovingFromBlacklist = method === 'AjaxRemoveFromBlackList';
	let isChangingBlacklist = isAddingToBlocklist || isRemovingFromBlacklist;
	let isAddingToFriendsList = method === 'AjaxAddPlayer';
	let isRemovingFromFriendsList = method === 'AjaxRemoveFromInviteList';
	let isChangingFriendsList = isAddingToFriendsList || isRemovingFromFriendsList;
	let currentPageNumbers = location.href.match(/\d+/)[0];
	let currentPagePlayerId = parseInt(currentPageNumbers.substring(2, currentPageNumbers.length - 2));

	window.WLPost(method, 'PlayerID=' + playerID, function(ret)
	{
		console.log(ret);

		if (ret === 'success')
		{
			//if adding/removing player to/from blacklist/friends and account is current player, update correspondingly
			let isSelf = currentPagePlayerId === playerID;

			if (isSelf)
			{
				if (isChangingBlacklist)
				{
					if (isAddingToBlocklist)
					{
						window.isOnBlackList = true;
					}
					else
					{
						window.isOnBlackList = false;
					}

					window.SetBlackListImage();
				}
				else
				{
					if (isAddingToFriendsList)
					{
						window.isOnInviteList = true;
					}
					else
					{
						window.isOnInviteList = false;
					}

					window.SetInviteListImage();
				}
			}

			if (typeof successFunction === 'function')
			{
				successFunction();
			}
		}
		else
		{
			if (isAddingToBlocklist)
			{
				window.WLErrorNE("Profile.AddToBlackList", ret, "success");
			}
			else if (isRemovingFromBlacklist)
			{
				window.WLErrorNE("Profile.RemoveFromBlackList", ret, "success");
			}
			else if (isAddingToFriendsList)
			{
				if (ret === 'CannotAddFriendDueToBlacklist')
				{
					console.log(ret);
				}
				else
				{
					window.WLErrorNE("Profile.AddToInviteList", ret, "success");
				}
			}
			else if (isRemovingFromFriendsList)
			{
				window.WLErrorNE("Profile.RemoveFromInviteList", ret, "success");
			}
		}
	});
	}catch(err){console.log(err);}
}

function BulkBlocklistFriendMain(validAccounts, mode, type)
{
	try{
	console.log('in BulkBlocklistMain');
	let account_is_blacklisted_or_friended;
	let feedbackStrParts = ['Progress: ', 0, ' of ' + validAccounts.length];
	let correspondingArray;
	let ajaxCaller;

	if (type === 'blocklist')
	{
		correspondingArray = blocklisted_accounts;

		if (mode === 'add to')
		{
			ajaxCaller = 'AjaxAddToBlackList';
		}
		else
		{
			ajaxCaller = 'AjaxRemoveFromBlackList';
		}
	}
	else
	{
		correspondingArray = friended_accounts;

		if (mode === 'add to')
		{
			ajaxCaller = 'AjaxAddPlayer';
		}
		else
		{
			ajaxCaller = 'AjaxRemoveFromInviteList';
		}
	}

	window.SetFeedback(feedbackStrParts.join(''));

	validAccounts.forEach(function(account, accountNo)
	{
		feedbackStrParts.splice(1, 1, accountNo + 1);
		account_is_blacklisted_or_friended = false;
		correspondingArray.forEach(function(blacklisted_or_friended_account)
		{
			if (account === blacklisted_or_friended_account)
			{
				account_is_blacklisted_or_friended = true;
			}
		});

		if (account_is_blacklisted_or_friended)
		{
			console.log('account is already BLed or friended');

			if (mode === 'remove from')
			{
				wzBLAndFriendsAjax(ajaxCaller, parseInt(account), function()
				{
					correspondingArray.splice(correspondingArray.indexOf(account), 1);
					window.SetFeedback(feedbackStrParts.join(''));
				});
			}
		}
		else
		{
			console.log('account not currently BLed or friended');

			if (mode === 'add to')
			{
				wzBLAndFriendsAjax(ajaxCaller, parseInt(account), function()
				{
					correspondingArray.push(account);
					window.SetFeedback(feedbackStrParts.join(''));
				});
			}
		}
	});
	}catch(err){console.log(err);}
}

function Get(page, callback)
{
	try{
	console.log('in Get');
	let iframe = document.createElement('iframe');

	iframe.style.display = 'none';
	iframe.src = 'https://www.warzone.com/' + page;
	iframe.onload = function()
	{
		let iframeContent = iframe.contentDocument || iframe.contentWindow;

		callback(iframeContent);
	};

	document.body.appendChild(iframe);
	}catch(err){console.log(err);}
}

function GetAccountIds(page, callback)
{
	try{
	console.log('in GetAccountIds');
	let accountArrayReferance;

	if (page === 'ManageBlackList')
	{
		accountArrayReferance = blocklisted_accounts;
	}
	else
	{
		accountArrayReferance = friended_accounts;
	}

	//iframeContent.$ isn't a function (is undefined for some reason), bypassing by window definition of $
	Get(page, function(iframeContent)
	{
		let playerNumber;
		let playerId;

		window.$(iframeContent).find("a[href ^= 'Profile?p=']").each(function()
		{
			playerNumber = this.href.match(/\d+/)[0];
			playerId = playerNumber.substring(2, playerNumber.length - 2);

			if (accountArrayReferance.indexOf(playerId) === -1)
			{
				accountArrayReferance.push(playerId);
			}
		});

		//(un)blocklist/friend the accounts
		callback();
	});
	}catch(err){console.log(err);}
}

function BulkMain(mode, type, accounts)
{
	try{
	let types = ['blocklist', 'friend'];
	let modes = ['add to', 'remove from'];

	if (!types.includes(type) || !modes.includes(mode))
	{
		return;
	}

	if (typeof accounts != 'string')
	{
		accounts = (function(){return prompt('Enter accounts to ' + mode + '. Enter player ids sepperated by a comma.');})();

		if (!accounts)
		{
			return;
		}
	}

	//validate
	let accounts_split = accounts.split(',');
	let validAccounts = [];
	let numInvalidAccounts = 0;
	let isValid = true;

	accounts_split.forEach(function(account)
	{
		let accountInt = parseInt(account);

		if (isNaN(accountInt))
		{
			isValid = false;
			numInvalidAccounts++;
		}
		else
		{
			validAccounts.push('' + accountInt);
		}
	});

	if (!isValid)
	{
		let invalidMsg = numInvalidAccounts + ' account';

		if (numInvalidAccounts > 1) invalidMsg += 's';

		invalidMsg +=  ' will be skipped due to being formatted incorrectly.';

		alert(invalidMsg);
	}

	//set a callback function to add/remove players
	let callback = function()
	{
		BulkBlocklistFriendMain(validAccounts, mode, type);
	};

	//add/remove accounts
	if (type === 'blocklist')
	{
		console.log(blocklisted_accounts);
		//[] isn't equal to [] in FF60+, wtf lest compare length instead. if is empty array, get the accounts. after accounts got, maintain the list of accounts
		if (blocklisted_accounts.length === 0)
		{
			GetAccountIds('ManageBlackList', callback);
		}
		else
		{
			callback();
		}
	}
	else
	{
		if (friended_accounts.length === 0)
		{
			GetAccountIds('ManageFriendList', callback);
		}
		else
		{
			callback();
		}
	}
	}catch(err){console.log(err);}
}

function CreateBulkAddToRemoveFromBlockListFriendsTool()
{
	try{
	let ReportBtn;
	let BlocklistTable;

	//get a table container
	let allReportBtns = document.querySelectorAll('a[href ^= "Report?p="]');
	let numReportBtns = allReportBtns.length;
	let playerToken = location.href.match(/\d+/)[0];

	for (let i = 0; i < numReportBtns; i++)
	{
		let currReportBtn = allReportBtns[i];

		if (currReportBtn.href == 'https://www.warzone.com/Report?p=' + playerToken)
		{
			ReportBtn = currReportBtn;
			break;
		}
	}

	window.ReportBtn = ReportBtn;

	if (window.isOnOwnProfile)
	{
		BlocklistTable = ReportBtn.parentElement.parentElement.parentElement;
	}
	else if (IsUser('self'))
	{
		//make a table to contain the report link and bulk add to blocklist
		let newTable = document.createElement('table');

		newTable.style.marginRight = '30px';
		newTable.border = '0';
		newTable.innerHTML = '<tbody><tr style = "text-align: center;"><td id = "ReportBtnTD" colspan = "2" style = "text-align: center;"></td></tr></tbody>';
		ReportBtn.insertAdjacentElement('afterend', newTable);
		document.getElementById('ReportBtnTD').appendChild(ReportBtn);
		BlocklistTable = newTable.firstElementChild;
	}
	else
	{
		BlocklistTable = ReportBtn.nextElementSibling.firstElementChild;
	}

	console.log(BlocklistTable);

	let bulkBlacklistRow = document.createElement('tr');
	let bulkAddFriendRow = document.createElement('tr');

	bulkBlacklistRow.innerHTML = '<td><input id = "BulkAddBlockListBtn" value = "++ Blocklist" type = "button"></td><td><input id = "BulkRemoveBlockListBtn" value = "-- Blocklist" type = "button"></td>';
	bulkAddFriendRow.innerHTML = '<td><input id = "BulkAddFriendBtn" value = "++ Friend" type = "button"></td><td><input id = "BulkRemoveFriendBtn" value = "-- Friend" type = "button"></td>';
	BlocklistTable.appendChild(bulkBlacklistRow);
	BlocklistTable.appendChild(bulkAddFriendRow);

	let BulkAddBlockListBtn = document.getElementById('BulkAddBlockListBtn');
	let BulkRemoveBlockListBtn = document.getElementById('BulkRemoveBlockListBtn');
	let BulkAddFriendBtn = document.getElementById('BulkAddFriendBtn');
	let BulkRemoveFriendBtn = document.getElementById('BulkRemoveFriendBtn');

	BulkAddBlockListBtn.onclick = function()
	{
		BulkMain('add to', 'blocklist');
	};
	BulkRemoveBlockListBtn.onclick = function()
	{
		BulkMain('remove from', 'blocklist');
	};
	BulkAddFriendBtn.onclick = function()
	{
		BulkMain('add to', 'friend');
	};
	BulkRemoveFriendBtn.onclick = function()
	{
		BulkMain('remove from', 'friend');
	};

	//can add or remove player to or from blacklist/friends list when on own profile as directly using WLPost
	}catch(err){console.log(err);}
}

if (OnFriendsList || OnBlockList || OnPlayerAltsPage)
{
	GetPlayerLinksIds();
}
else if (OnPlayerProfile)
{
	//create bulk add to blacklist tool
	CreateBulkAddToRemoveFromBlockListFriendsTool();
	window.trollHammer.addToBl = function(accounts)
	{
		BulkMain('add to', 'blocklist', accounts);
	};
}