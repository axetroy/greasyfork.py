// ==UserScript==
// @name        Cambridge auto pronounce
// @match     *://dictionary.cambridge.org/*
// @description Automatically pronounce searched word in dictionary.cambridge.org
// @version     2
// @grant       none
// @namespace https://greasyfork.org/users/4947
// ==/UserScript==

var playButtons=document.getElementsByClassName('audio_play_button');
for(var playButton of playButtons){
	var c=playButton.classList;
	if(c.contains('us')||c.contains('pron-us')){
		playButton.click();
		break;
	}
}
