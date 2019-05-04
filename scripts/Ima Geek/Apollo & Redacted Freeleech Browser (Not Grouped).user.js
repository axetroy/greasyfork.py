// ==UserScript==

// @name           Apollo & Redacted Freeleech Browser (Not Grouped)
// @author         thegeek (but really the_dunce from PTH (but actually phracker from what.cd))
// @namespace      https://greasyfork.org/users/90188
// @description    Inserts a freeleech link in main menu. Does not group torrents.
// @include        http*://*apollo.rip/*
// @include        http*://*redacted.ch/*
// @version        1.1
// @date           2017-03-08
// @grant          none

// ==/UserScript==



function createLi(x,y) {
	var li = document.createElement('li');
	li.id = 'nav_' + x;
	li.appendChild(y);
	return li;
}
function createFL(x) {
	var a = document.createElement('a');

	a.innerHTML = x;
	a.href = "torrents.php?freetorrent=1&group_results=0&action=advanced&searchsubmit=1";
	return a;
}

var target = document.getElementById('menu').getElementsByTagName('ul')[0];


var free = createFL("Free");
var freeLi = createLi("Free",free);

target.appendChild(freeLi);