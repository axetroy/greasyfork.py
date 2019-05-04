// ==UserScript==
// @name	Google Customizer
// @namespace	http://www.prahladyeri.com
// @description		Make Google search links point directly to content
// @version		1.0
// @author prahladyeri@yahoo.com
// @include https://www.google.co.in/*
// @include https://google.co.in/*
// @include https://www.google.com/*
// @include https://google.com/*
// @homepageURL 	http://www.prahladyeri.com
// @grant    GM_addStyle
// @language   English (en)
// ==/UserScript==

//console.log("Hiya. Made some changes;-)");

/*img = document.getElementById('hplogo');
if (img.length>0)
{
    img.style.background = "";
    img.src = "";
}
*/

var links = document.getElementsByTagName("h3");
if(links.length==0)
    console.log('zero length');
else
    console.log('non zero length');


for (var i=0; i < links.length; i++)
{
	//if (links[i].target == "_blank")
	if (links[i].className == "r")
	{
		var link = links[i].getElementsByTagName("a")[0];
		link.onmousedown = null; //"function(){return false;}";
		link.removeEventListener(link,link.onmousedown);
		console.log("set null for " + link.href);
	}
}


/* hide the top two banners */
//GM_addStyle("#gb {display:none;}");
// //GM_addStyle("#mn>tbody:not(#desktop-search) {display:none;}");
// GM_addStyle("#mn>tbody:first-child>tr:last-child {display:none;}");
// GM_addStyle("#mn>tbody:first-child>tr:first-child {display:none;}");
// GM_addStyle("#mn>tbody:first-child>tr:nth-child(2)>td:first-child {display:none;}");
// GM_addStyle("#mn>tbody:first-child>tr:nth-child(2)>td:last-child {display:none;}");
// GM_addStyle("#mn>tbody:first-child>tr:nth-child(2)>td:nth-child(2) {background-color:white;}");
// //GM_addStyle("#mn>tbody:first-chid {display:none;}");

//GM_addStyle("#mn>tbody:nth-child(2) {display:none;}");

// GM_addStyle("#desktop-search #leftnav {display:none;}");
// GM_addStyle("#mn {margin-left:100px;}");

/* customize the link colors*/
GM_addStyle("body a:link{color: #2797b0;}");
GM_addStyle("body a:visited{color: #795548;}"); //#e91e63
