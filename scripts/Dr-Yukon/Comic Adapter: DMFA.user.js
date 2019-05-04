// ==UserScript==
// @name            Comic Adapter: DMFA
// @version         2019.01.08
// @description     Extract Info for Comicslate
// @include         http*://*missmab.com*
// @icon            https://www.google.com/s2/favicons?domain=missmab.com
// @grant           none
// @author          Rainbow-Spike
// @namespace       https://greasyfork.org/users/7568
// @homepage        https://greasyfork.org/ru/users/7568-dr-yukon
// ==/UserScript==

var	insert = document.querySelector("i"), // search target for text insertion
	text = insert.innerHTML.replace(/\.\.\./g, "…"), // replace 3 dots BTW
	title = '', number = '',
	chapter = 'Chapter 31: Friends in High Places'; // name of chapter

// MAINWORK
if (window.location.href.search("index.php") != -1 ) { // if last page
	number = document.querySelector("table").rows[2].querySelector("table").rows[0].cells[1].querySelectorAll("a")[2].href.match(/Vol_(\d+)/)[1]*1+1; // search number of stripe in back link
	title = text.match(/^(.*)$/)[1];
} else { // if non-last page
	number = text.match(/#(\d+):/)[1]*1;
	title = text.match(/#\d+: (.*)$/)[1];
}
title = title.replace(/\.?$/, ""); // cut ending dot

insert.innerHTML = "== Dan and Mab's Furry Adventures "+number+" ==<br>**"+chapter+" - "+title+"**<br>{cnav}<br>{{"+number+".jpg}}<br>{cnav}"; // dokuwikification

// SELECT
var rng, sel;

rng = document.createRange();
rng.selectNode(insert);
sel = window.getSelection();
sel.removeAllRanges();
sel.addRange(rng);
