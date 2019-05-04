// ==UserScript==
// @name        LDS.org new window
// @namespace   http://userscripts.org/users/530618
// @description Replaces lds.org new window code with target:blank
// @include     http://lds.org/*
// @include     https://lds.org/*
// @include     http://*.lds.org/*
// @include     https://*.lds.org/*
// @version     1
// ==/UserScript==

var links = document.getElementsByTagName('a');
var len = links.length;
for(var i=0; i<len; i++)
{
	if( links[i].hasAttribute("onClick") )
	{
		var click = links[i].getAttribute("onClick")
		if ( click == "newWindow(this.href); return false;" )
		{
			links[i].removeAttribute("onClick")
			links[i].setAttribute("target", "_blank")
		}
	}
}