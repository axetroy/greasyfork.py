// ==UserScript==
// @name         Kickass 2 de-NordVPN and shortlink-fier
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Removes the annoying NordVPN popup and shortlink mining links from kickass2
// @author       Batjevier
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @match        https://kickass2.ch/*
// @match        http://kickass2.ch/*
// @match        https://kickass2.st/*
// @match        http://kickass2.st/*

// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */
$(document).ready(function () {
	$('a').each(function(){
		const pattern = /https:\/\/shortlink.st\/.*\?url=/i;
		var url = $(this).attr('href');
		if(url.match(pattern)){
			url = url.replace(pattern,'');
			url = decodeURIComponent(url);
			$(this).attr('href',url);
		}
	});

});

$( window ).load(function() {
    bypassPu();
});

function bypassPu() {
    if(document.detachEvent)
        document.detachEvent("onclick",checkTarget);
    else
        document.removeEventListener("click",checkTarget);
}

    /* jshint ignore:start */
]]></>).toString();
                  var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */