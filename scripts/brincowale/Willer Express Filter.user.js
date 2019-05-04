﻿// ==UserScript==
// @name        Willer Express Filter
// @namespace   https://github.com/brincowale
// @description Remove bus stops from list http://willerexpress.com/st/3/en/pc/bus/uketsuke/ where doesn't departure Willer Express bus
// @include     http://willerexpress.com/st/3/en/pc/bus/uketsuke/area.php?cat1=*
// @exclude		http://willerexpress.com/st/3/en/pc/bus/uketsuke/area.php?cat1=*&key=2
// @version     1
// @grant       none
// ==/UserScript==

$( document ).ready(function() {
	$("tbody > tr > td:nth-of-type(6)").each(function () {
		// not contains 'WILLER GROUP'
    	if (!($(this).text().contains('WILLER GROUP'))){
        	$(this).parent().remove();
        } 
    });
});
