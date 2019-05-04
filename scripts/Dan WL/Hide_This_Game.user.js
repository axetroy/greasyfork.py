// ==UserScript==
// @name        Hide_This_Game
// @namespace   DanWL
// @description Allowes you to hide games on the Past Games page
// @include     https://www.warlight.net/MultiPlayer/PastGames*
// @version     1
// @grant       none
// ==/UserScript==

function game_ids()
{
	if (localStorage.HTG_hidden_games === undefined || localStorage.HTG_hidden_games === null || localStorage.HTG_hidden_games === '')
	{
		return false;
	}
	else
	{
		return localStorage.HTG_hidden_games;
	}
};

function HideGames()
{
	var styleTag = document.createElement('style');

	styleTag.innerHTML = '';
	styleTag.className = 'HTS_style';

	if (game_ids())
	{
		var game_counter = 0;
		var game_ids_split = game_ids().split(',');

		while (game_counter < game_ids_split.length)
		{
			if (game_ids_split[game_counter] !== '')
			{
				styleTag.innerHTML = styleTag.innerHTML + 'tr[gameid=' + game_ids_split[game_counter] + ']';
				if (game_counter != (game_ids_split.length-1))
				{
					styleTag.innerHTML = styleTag.innerHTML + ', ';
				}
			}
			game_counter++;
		}

		styleTag.innerHTML = styleTag.innerHTML + '\n{\n\tdisplay: none;\n}';
	}
}

function RefreshHiddenGames()
{
	var num_HTS_styles = 0;
	var HTS_style_tags = document.getElementsByClassName('HTS_style');

	while (num_HTS_styles < HTS_style_tags.length)
	{
		if (num_HTS_styles != (HTS_style_tags.length - 1))
		{
			HTS_style_tags[num_HTS_styles].remove();
		}
	}
}

function ViewModifyGames()
{
	alert('Currently hiding these games:\n' + game_ids().replace(',', ',\n'));
	var modify_games = confirm('Do you want to change this?');

	modify_games;

	if (modify_games)
	{
		var new_hidden_games = prompt('Change hidden games to this (sepperate game id\'s with a comma (,).):' , game_ids().replace(',', ',\n'));

		if (typeof new_hidden_games == 'string')
		{
			localStorage.HTG_hidden_games = new_hidden_games.replace('\n', ',');
		}

		HideGames();
		RefreshHiddenGames();
	}
}

function CreateUI()
{
	var config_btn = document.createElement('li');

	config_btn.onclick = function()
	{
		ViewModifyGames();
	}

	config_btn.innerHTML = '<a>Hide Games</a>';

	document.getElementsByClassName('dropdown-divider')[0].insertAdjacentElement('beforebegin', config_btn);
	//should be able to view and modify settings by clicking on the ▼ button on the Top Right Bar that contains the mail icon, your name, level and coins
}

CreateUI();
HideGames();