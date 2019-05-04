﻿// ==UserScript==
// @name         StayCached
// @namespace    michalpawl
// @author       MacGyver
// @description  Keeps you in Google cache when you click links on cached pages.
// @icon         data:image/png;base64,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
// @match        *://webcache.googleusercontent.com/*
// @version      1.2.5
// ==/UserScript==


const enabled_protocols = ['http','https','ftp','ftps'];

const cache_header = document.getElementById('google-cache-hdr');

document.body.addEventListener('click',
	function(e)
	{
		var target = e.target || e.srcElement;
		if ( !target || cache_header.contains(target) ) return;
		while ( !target.href && target.parentNode )
			target = target.parentNode;
		if ( target.href && enabled_protocols.indexOf(target.href.substr(0,target.href.search(':')))>=0 && !target.href.match('^https://webcache.googleusercontent.com/') && !target.href.match('^http://webcache.googleusercontent.com/') )
			target.href = location.protocol + '//webcache.googleusercontent.com/search?q=cache:' + encodeURIComponent(target.href);
	}
);
