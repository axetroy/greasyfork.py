// ==UserScript==
// @name         Subhd,Zimuku for RARBG
// @namespace    http://rarbg.to/
// @version      0.3.2
// @description  Adds Subhd,Zimuku shortcut to RARBG.to
// @author       tofuliang
// @match        https://rarbg.to/*
// @match        http://rarbg.to/*
// @match        https://rarbg.is/*
// @match        http://rarbg.is/*
// @match        https://rarbgprx.org/*
// @match        http://rarbgprx.org/*
// ==/UserScript==

$(document).on('ready AutoPagerize_DOMNodeInserted', function(e) {
	$('a[href^="/torrents.php?imdb="][subed!=subed]').each(function() {
		var title = document.location.href.match(/https?:\/\/rarbg\.\w+\/torrent\/\w+/)?$('body > table > tbody > tr > td > div > div > table > tbody > tr > td > b > h1').text():$(this).parent('td').find('a').text(),
			parts =  title.replace(/\s+/g,'.').split('.');
		var partsBak = parts.slice(0);
		while(parts.length > 0 && (part = parts.pop().match(/^\d{4}$/)) === null){}
		if(parts === null || parts.length < 1){
			parts = partsBak.slice(0);
			while(parts.length > 0 && (part = parts.pop().match(/^s\d{1,2}e?\d{0,2}$/i)) === null){}
		}
		parts.push(part);
		var keyword = parts.join('.'),
			subhdUrl='http://subhd.com/search/'+keyword,
			zimuzuUrl='http://www.zimuku.net/search?q='+keyword;
		$(this).after('<a style="margin-left:5px;" href='+subhdUrl+' target="_blank" onmouseover="return overlib(\'<span>去subhd找字幕</span>\')" onmouseout="return nd();"><img src="https://ooo.0o0.ooo/2017/06/20/59489583ed652.png" style="height:18px;"></img></a><a style="margin-left:5px;" href='+zimuzuUrl+' target="_blank" onmouseover="return overlib(\'<span>去zimuzu找字幕</span>\')" onmouseout="return nd();"><img src="https://ooo.0o0.ooo/2017/06/20/59489583ed94e.png" style="height:18px;"></img></a>');
		$(this).attr('subed','subed');
	});
});
$(document).bind("ready", function() {});
$(document).ready(function() {
	$(document).trigger("ready");
});
