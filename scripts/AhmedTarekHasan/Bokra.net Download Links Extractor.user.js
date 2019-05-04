// ==UserScript==

// @name          Bokra.net Download Links Extractor

// @namespace     DevelopmentSimplyPut(developmentsimplyput.blogspot.com)

// @description   Extracts Download Links From Bokra.net

// @include       *bokra.net/musicartist*
// @include       *bokra.net/artistalbum*

// @version 0.0.1.20141023133818
// ==/UserScript==


setTimeout(function(){ Run(); }, 0);

function Run() {
	var urls = new Array();
	
	$("div#item_album div#icon a[href*='mp3Download']").each(function(index, value) {
		urls.push('www.bokra.net' + $(value).attr("href"));
	});
	
	$('div[align=center]').prepend("<span style='direction:ltr;display:block;width:100%;height:60px;color:blue;background:red;'><textarea cols='100'>" + urls.join('&#13;&#10;') + "</textarea></span><br />");
}