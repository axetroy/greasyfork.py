// ==UserScript==
// @name			Remove Bad Matches on OKCupid Search
// @description		Removes search results under a configurable match rating (default 75%), over a configurable enemy rating (default 25%), ones you've already messaged, and anyone you've rated 3 stars or lower.
// @include			http*://www.okcupid.com/match*
// @version			1.3
// @namespace		pilnick.com
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_registerMenuCommand
// ==/UserScript==

var min = GM_getValue("OkCMinimum", 75);
var max = GM_getValue("OkCMaximum", 25);
var box, matchE, match, enemy, contact, results, rating;
GM_registerMenuCommand('Set OkCupid Minimum Match', setMin,'o');
GM_registerMenuCommand('Set OkCupid Maximum Enemy', setMax,'o');

window.setInterval(removeLow,1000);

function removeLow()
{
	results=document.getElementsByClassName('match_card_wrapper user-not-hidden');
	for(var n=0; n<results.length; n++){
		box = results[n];
		matchE = box.getElementsByClassName('percentage_wrapper match');
		//console.log(matchE);
		match = Number(matchE[0].textContent.split("%")[0]);
		matchE = box.getElementsByClassName('percentage_wrapper enemy');
		//console.log(matchE);
		enemy = Number(matchE[0].textContent.split("%")[0]);
		//console.log(enemy);
		contact = box.getElementsByClassName('bar last_contact');
		rating = box.getElementsByClassName('current-rating')[0].style.width.split("%")[0]/20;
		if( match < min || enemy > max || contact.length > 0 || (rating>0 && rating<4))
		{
			box.style.display = "none";
		}
	}
}

function setMin()
{
	var set = prompt("What minimum match % would you like to see? Refresh after setting to take effect.",GM_getValue("OkCMinimum", min));
	if(!isNaN(parseFloat(set)) && isFinite(set))
	{
		GM_setValue("OkCMinimum", set);
	}
}

function setMax()
{
	var set = prompt("What maximum enemy % would you like to see? Refresh after setting to take effect.",GM_getValue("OkCMaximum", max));
	if(!isNaN(parseFloat(set)) && isFinite(set))
	{
		GM_setValue("OkCMaximum", set);
	}
}