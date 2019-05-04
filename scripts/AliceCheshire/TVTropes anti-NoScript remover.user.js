// ==UserScript==
// @name        TVTropes anti-NoScript remover
// @namespace   Alice
// @include     http://tvtropes.org/*
// @version     1
// @grant       none
// @description:en See additional info
// ==/UserScript==

var alc = document.getElementsByTagName("script");
for (let i = 0; i < alc.length; i++) {
    if (alc[i].innerHTML.match(/8d1f/)) {
		alc[i].remove();
		console.log(`Script ${i} removed!`);
	}
}