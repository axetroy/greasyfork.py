// ==UserScript==
// @name        Facepunch Quote Link Fix
// @namespace   AkariAkaori
// @include     http://facepunch.com/showthread.php?*
// @version     1
// @grant       none
// @description Fixes quote links to same page
// ==/UserScript==

(function()
{
	var quotes = document.getElementsByClassName("quote");
	var info, link;
	for(var i=0;i<quotes.length;i++)
	{
		info = quotes[i].getElementsByClassName("information")[0];
		if (!info)
			continue;
		
		link = info.getElementsByTagName("a")[0];
		
		if (!link)
			continue;
		
		
		var post = link.getAttribute("href").split('#')[1].replace("post", "post_");
		
		
		if (document.getElementById(post) != null)
		{
			link.setAttribute("href", document.URL.split('#')[0] + "#" + post);
		}
	}
})
();