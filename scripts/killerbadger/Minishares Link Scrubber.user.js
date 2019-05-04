// ==UserScript==
// @name       Minishares Link Scrubber
// @version    0.1
// @description  This removes shr77 redirections from Minishares.com
// @namespace  https://greasyfork.org/users/2329-killerbadger
// @match      *.minishares.org
// @match      *.minishares.org/*
// @match      *.minirlss.net/*
// ==/UserScript==

var links = document.links;
for( i=0; i<document.links.length; i++ )
{
 	var pattern = /http:\/\/shr77.com\/[0-9]*\/interstitial/;
    if(pattern.test(document.links[i].href) )
    {
        //replaces link with only the actual link (part after interstitial)
        document.links[i].href = document.links[i].href.substr(document.links[i].href.indexOf("interstitial")+13);
    }
}