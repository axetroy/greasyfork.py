// ==UserScript==
// @name         Linkshrink Scrubber
// @version      0.1
// @description  Removes linkshrink redirections
// @author       zoklen
// @match        */*
// @namespace https://greasyfork.org/users/67771
// ==/UserScript==

var links = document.links;
for( i=0; i<document.links.length; i++ )
{
 	var pattern = /http:\/\/linkshrink.net\/[a-zA-Z0-9]*\=/;
    if(pattern.test(document.links[i].href) )
    {
        //replaces link with only the actual link
        document.links[i].href = document.links[i].href.substr(document.links[i].href.indexOf("=")+1);
    }
}