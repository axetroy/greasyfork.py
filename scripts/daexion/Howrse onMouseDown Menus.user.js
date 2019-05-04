// ==UserScript==
// @name        Howrse onMouseDown Menus
// @namespace   myHowrse
// @description Turns the 5 onmouseover menus into onmousedown menus
// @include     http://www.howrse.com/*
// @author      daexion
// @version     1
// ==/UserScript==
var links = document.getElementsByTagName('a');

for(var i=0;i<links.length;++i)
{
	if(links[i].hasAttribute("onmouseover"))
		if(links[i].getAttribute("onmouseover") == "menuOn('elevage')")
		{
			links[i].setAttribute("onmousedown",links[i].getAttribute("onmouseover"));
			links[i].removeAttribute("onmouseover");
		}
	if(links[i].hasAttribute("onmouseover"))
		if(links[i].getAttribute("onmouseover") == "menuOn('centre')")
		{
			links[i].setAttribute("onmousedown",links[i].getAttribute("onmouseover"));
			links[i].removeAttribute("onmouseover");
		}
	if(links[i].hasAttribute("onmouseover"))
		if(links[i].getAttribute("onmouseover") == "menuOn('communaute')")
		{
			links[i].setAttribute("onmousedown",links[i].getAttribute("onmouseover"));
			links[i].removeAttribute("onmouseover");
		}
	if(links[i].hasAttribute("onmouseover"))
		if(links[i].getAttribute("onmouseover") == "menuOn('classement')")
		{
			links[i].setAttribute("onmousedown",links[i].getAttribute("onmouseover"));
			links[i].removeAttribute("onmouseover");
		}
	if(links[i].hasAttribute("onmouseover"))
		if(links[i].getAttribute("onmouseover") == "menuOn('profil')")
		{
			links[i].setAttribute("onmousedown",links[i].getAttribute("onmouseover"));
			links[i].removeAttribute("onmouseover");
		}
}