// ==UserScript==
// @name         Mangaupdates Genre search pre-chooser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Pre-selects the options you always choose in the genresearch at mangaupdates.com (once you've defined them here)
// @author       JAndyP
// @match        https://www.mangaupdates.com/series.html?act=genresearch
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	//Options START
		//Genres (separated by commas) (see below for spelling)
			//Genres you always want
	    	var incl = ["Romance"];
	    	//Genres you never want
    		var excl = ["Hentai", "Doujinshi", "Shoujo Ai", "Shounen Ai", "Yuri", "Yaoi", "Tragedy", "Mecha"];
    	//Choices
    		//License Options: '', 'yes', 'no'
    		var licensed = '';
    		//Extended Options: '', 'scanlated', 'completed', 'oneshots', 'no_oneshots', 'some_releases', 'no_releases'
    		var extended = 'scanlated';
    		//Type: '', 'artbook', 'doujinshi', 'drama_cd', 'manga', 'manwha', 'manhua', 'thai', 'indonesian', 'novel', 'oel', 'filipino'
    		var mtype = '';
    		//List Options (only available when logged in): '', 'none', 'read', 'wish', 'complete', 'unfinished', 'hold', 'custom'
    		var mlist = 'none';
    	//New Tab/Window
    	var newtab = true;
    //Options END

    var genres = {
        'Action': 8,
        'Adult': 6,
        'Adventure': 7,
        'Comedy': 1,
        'Doujinshi': 30,
        'Drama': 9,
        'Ecchi': 10,
        'Fantasy': 4,
        'Gender Bender': 35,
        'Harem': 38,
        'Hentai': 17,
        'Historical': 27,
        'Horror': 2,
        'Josei': 34,
        'Lolicon': 26,
        'Martial Arts': 33,
        'Mature': 31,
        'Mecha': 18,
        'Mystery': 20,
        'Psychological': 21,
        'Romance': 3,
        'School Life': 29,
        'Sci-fi': 19,
        'Seinen': 32,
        'Shotacon': 25,
        'Shoujo': 13,
        'Shoujo Ai': 24,
        'Shounen': 11,
        'Shounen Ai': 23,
        'Slice of Life': 36,
        'Smut': 28,
        'Sports': 5,
        'Supernatural': 22,
        'Tragedy': 37,
        'Yaoi': 15,
        'Yuri': 16
    };

	for (var i=0, len=incl.length;i<len;i++)
	{
		document.getElementById("gy"+genres[incl[i]]).setAttribute("checked","checked");
	}

	for (var i=0, len=excl.length;i<len;i++)
	{
		document.getElementById("gn"+genres[excl[i]]).setAttribute("checked","checked");
	}
	var fs = document.getElementsByTagName("form");
	var f;for (var i=0, len=fs.length;i<len;i++) {
		if (fs[i].action.match(/genresearch_do/)!=null)
		{
			f=fs[i];
			break;
		}
	}
	f.licensed.value	= licensed;
	f.filter.value		= extended;
	f.type.value		= mtype;
	if (typeof f.list !== 'undefined')
		f.list.value	= mlist;
	if (newtab)
		f.target = "_blank";
})();