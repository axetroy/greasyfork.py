// Copyright (c) 2015, Yves Goergen, http://unclassified.software/source/msdn-english
//
// Copying and distribution of this file, with or without modification, are permitted provided the
// copyright notice and this notice are preserved. This file is offered as-is, without any warranty.

// Encoding: UTF-8 without BOM (auto-detect: °°°°°)

// ==UserScript==
// @namespace http://unclassified.software/
// @name Display MSDN + KB base content in English Mikhoul Fork
// @description Redirects regional MSDN websites to the en-US original site to prevent annoying translation elements to appear. They also have more current (fixed) content there.
// @version 1.0
// @include http://msdn.microsoft.com/*
// @include https://msdn.microsoft.com/*
// @include https://support.microsoft.com/*
// @run-at document-start
// ==/UserScript==

(function() {

	// Gets the value of a single search param.
	// Source: https://developer.mozilla.org/en-US/docs/Web/API/URLUtils.search
	function getURLParam(oTarget, sVar)
	{
		return decodeURI(oTarget.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
	}

	// Online help started from Visual Studio (2010-2013 at least)
	if (location.pathname.match(/\/query\/dev[0-9]{1,2}\.query/))
	{
		var locale = getURLParam(location, "l");
		if (locale && !locale.match(/EN-US/i))
		{
			var newUrl = location.href.replace("l=" + locale, "l=EN-US");
			location.replace(newUrl);
			return;
		}
	}

	// Regular library page as seen from web search
	var matches = location.pathname.match(/^\/([a-z]{2}-[a-z]{2})\/library\//i);
	if (matches)
	{
		var locale = matches[1];
		if (locale && !locale.match(/en-us/i))
		{
			var newUrl = location.href.replace("/" + locale + "/", "/en-us/");
			location.replace(newUrl);
			return;
		}
	}
	
	// Regular KB page as seen from web search
	var matches = location.pathname.match(/^\/([a-z]{2}-[a-z]{2})\/kb\//i);
	if (matches)
	{
		var locale = matches[1];
		if (locale && !locale.match(/en-us/i))
		{
			var newUrl = location.href.replace("/" + locale + "/", "/en-us/");
			location.replace(newUrl);
			return;
		}
	}

})()
