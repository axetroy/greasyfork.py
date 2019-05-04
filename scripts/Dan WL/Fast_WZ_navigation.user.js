// ==UserScript==
// @name        Fast_WZ_navigation
// @namespace   DanWL
// @description Saves you a click when navigating Warzone.
// @include     https://www.warzone.com*
// @version     1.3.3
// @grant       none
// ==/UserScript==

var nav_items = document.querySelectorAll('#navbarSupportedContent .nav-item');

function AddMouseOverOutEvents(nav_item_counter)
{
	if (nav_item_counter === nav_items.length)
	{
		//if the nav item doesn't exist, stop
		return;
	}

	//otherwise give the mouseover and mouseout events as clicking the nav_item
	var nav_item_parent = nav_items[nav_item_counter];
	var nav_item = nav_item_parent.firstElementChild;

	if (nav_item_parent.id != 'PlayBtn' && nav_item.innerText != 'Search')
	{
		//only click the nav-item if it isn't the PlayBtn - this is only visible in Unity mode
		nav_item.onmouseover = function()
		{
			nav_item.click();
		};
		nav_item_parent.onmouseout = function()
		{
			nav_item.click();
		};
	}

	AddMouseOverOutEvents(nav_item_counter + 1);
}

AddMouseOverOutEvents(0);