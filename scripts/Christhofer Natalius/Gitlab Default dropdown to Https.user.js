// ==UserScript==
// @name         Gitlab Default dropdown to Https
// @namespace    http://steamcommunity.com/id/Ruphine/
// @version      0.1
// @description  Make default clone method is HTTPS instead of SSH
// @author       Ruphine
// @include      https://gitlab.com/*
// @grant        none
// ==/UserScript==

$(document).ready(function()
{
	if($("#clone-dropdown")[0])
	{
		$("#clone-dropdown")[0].click();
		$(".http-selector")[0].click();
	}
});