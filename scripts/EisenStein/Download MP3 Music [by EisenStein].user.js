// ==UserScript==
// @name        Download MP3 Music [by EisenStein]
// @namespace   https://greasyfork.org/users/136230
// @description Скачать mp3 музыку с zaycev.net, drivemusic.me, mp333.online одним кликом (без переадресаций)
// @author      EisenStein
// @include     *://zaycev.net/musicset/*
// @include     *://drivemusic.me/*
// @include     *://mp333.online/*
// @version     1.0.0
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var siteObj = null;
(function(){
	siteObj = getSiteObject();
	clog("siteObj: ", JSON.stringify(siteObj));
	checkDownloadLinks();
})();

function getSiteObject()
{
	var obj = null;
	switch(location.hostname)
	{
		case "zaycev.net": 
		obj = {
			page: "a#audiotrack-download-link",
			link: "a.musicset-track__download-link",
		};
		break;
		case "drivemusic.me":
		obj = {
			page: "a.btn-download",
			link: 'a[class*="download-link"]',
		};
		break;
		case "mp333.online":
		obj = {
			page: "a.download.middle-button",
			link: "a.download.more",
		};
		break;
	}
	obj.host = location.hostname;
	return obj;
}
function request(details)
{
	var s = new Promise(function(resolve, reject){
		var dets = extend({}, details);
		dets.onload = function(t)
		{
			if( t.status == 200 )
				resolve(t.response);
			else
				reject(new Error("Error: status " + t.status + ", " + t.statusText));
		};
		GM_xmlhttpRequest(dets);
	});
	return s;
}
function extend(t, o)
{
	t = t || {};
	for(var k in o)
	{
		if( o.hasOwnProperty(k) && o[k] !== undefined )
			t[k] = o[k];
	}
	return t;
}
function clog(){console.log.apply(this, arguments);}
function getDownloadLink(url)
{
	return request({
		method: "GET",
		url: getLink(url),
	}).then(function(r){
		var doc = document.implementation.createHTMLDocument("");
		doc.documentElement.innerHTML = r;
		var l = qs(siteObj.page, doc);
		return l ? {url: l.href, name: l.download || l.title || null} : null;
	});
}
function getLink(url, prop)
{
	link = window.link || document.createElement("a");
	link.href = url;
	return link[prop||"href"];
}
function checkDownloadLinks()
{
	var links = qs_all(siteObj.link);
	clog("links.length: ", links.length);
	links = [].slice.call(links);
	return links.reduce(function(s, link, i){
		clog("link[" + pad(i) + ": ", link);
		return s.then(function(){
			return getDownloadLink(link.href);
		}).then(function(dt){
			if( dt )
			{
				clog("link[" + pad(i) + "]: ", link.href, "->", dt.url);
				link.setAttribute("src", link.href);
				link.href = dt.url;
				if( dt.name && getLink(dt.url, "origin") == location.origin )
					link.download = dt.name;
				else{
					link.target = "_blank";
					link.title = dt.title;
				}
			}
		}).catch(function(e){console.error("error: link", link)});
	}, Promise.resolve() );
}
function pad(num, len)
{
	len = len || 2;
	return ('0000000' + num).slice(-len);
}
function qs(s, e){return (e||document).querySelector(s);}
function qs_all(s, e){return (e||document).querySelectorAll(s);}