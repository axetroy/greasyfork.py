// ==UserScript==
// @name          Wayback Machine Favicon Fixer
// @namespace     DoomTay
// @description   Attempts to add a favicon to a site crawled by the Wayback Machine in the event one does not come up normally
// @version       1.2.1
// @include       http://web.archive.org/web/*
// @include       http://wayback.archive.org/web/*
// @include       https://web.archive.org/web/*
// @include       https://wayback.archive.org/web/*
// @exclude       /\*/
// @grant         none
// @noframes

// ==/UserScript==

var timestamp = /web\/(\d{1,14})/.exec(window.location.href)[1];

var originalDomain = /.+web\/\d+(?:[a-z][a-z]_)?\/((?:https?:\/\/)?[^\/]+)/.exec(window.location.href)[1];

if(!originalDomain.endsWith("/")) originalDomain = originalDomain + "/";

if(!document.querySelector("link[rel~='icon']") && document.contentType == "text/html") retrieveFavicon();

function retrieveFavicon()
{		
	function applyFavicon(data)
	{
		if(data.archived_snapshots && data.archived_snapshots.closest && data.archived_snapshots.closest.available)
		{
			var newFavicon = document.createElement('link');
			newFavicon.type = "image/x-icon";
			newFavicon.rel = "shortcut icon";
			newFavicon.href = data.archived_snapshots.closest.url.replace("/ht","im_/ht");
			document.head.appendChild(newFavicon);
		}
	}
	
	var applyFaviconScript = document.createElement("script");
	applyFaviconScript.type = "text/javascript";
	applyFaviconScript.innerHTML = applyFavicon;
	document.head.appendChild(applyFaviconScript);
	
	var faviconScript = document.createElement("script");
	faviconScript.type = "application/javascript";
	faviconScript.src = "//archive.org/wayback/available?url=" + encodeURIComponent(originalDomain + "favicon.ico") + "&timestamp=" + timestamp + "&callback=applyFavicon";
	faviconScript.onerror = function(e)
	{
		document.head.removeChild(faviconScript);
		document.head.removeChild(applyFaviconScript);
		retrieveFavicon();
	}
	document.head.appendChild(faviconScript);
}