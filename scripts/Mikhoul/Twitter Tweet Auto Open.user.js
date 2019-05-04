// ==UserScript==
// @name	Twitter Tweet Auto Open
// @namespace	flowconsult.at
// @version	0.1
// @description	Auto-open tweets if scrolled to top of page
// @match	https://twitter.com/*
// @copyright	Rafael Gattringer
// @license	GPL version 3 or any later version; www.gnu.org/copyleft/gpl.htm
// ==/UserScript==

var timeoutID;

timer();

window.onscroll = function ()
{
	checkPosition();
}

function checkPosition()
{
	if(window.pageYOffset <= 140)
	{
		openTweet();
	}
}

function openTweet()
{
	var newtweetsbar = document.querySelector(".new-tweets-bar");
	if (newtweetsbar) { newtweetsbar.click(); }
}

function timer()
{
	checkPosition();
	timeoutID = window.setTimeout(timer, 1000);
}
