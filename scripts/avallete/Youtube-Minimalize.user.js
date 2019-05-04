// ==UserScript==
// @name        Youtube-Minimalize
// @namespace   Youtube Minimalize
// @description A little extension will keep only the player on youtube page and put it to full-browser size.
// @version     1.0
// @match       *://www.youtube.com/watch*
// @run-at      document-end
// @grant       none
// ==/UserScript==

/*
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
*/
 
(function (undefined) {
	var isFullScreen = false;
	var player_api = undefined;
	var video_tag = undefined;
	var html_node = undefined;
	var body_node = undefined;
	var toggleButtonTemplate = '<button id="custom-fullscreen" class="ytp-size-button ytp-button" title="Mode cinéma windowed"><svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" href="#ytp-svg-18"/><path d="m 28,11 0,14 -20,0 0,-14 z m -18,2 10,0 0,10 0,0 0,-10 z" fill="#fff" fill-rule="evenodd" id="ytp-svg-18"/></svg></button>'
	var toggleButton = undefined;
	var old_value = {'width': 0, 'height': 0};

	function initElements() {
		/* Get all necessary elements from the page to switch between modes. */
		player_api = window.document.getElementById('player-api');
		video_tag = player_api.getElementsByTagName('video') [0];
		player_right_bar = player_api.getElementsByClassName('ytp-right-controls')[0]
		html_node = window.document.getElementsByTagName('html') [0];
		body_node = window.document.getElementsByTagName('body') [0];
		old_value.width = video_tag.style.width;
		old_value.height = video_tag.style.height;
	}

	function deleteElements() {
		/* Remove all elements on page except video player */
		old_value.width = video_tag.style.width;
		old_value.height = video_tag.style.height;
		if (player_api == undefined)
			initElements();
		body_node.style.display = 'none';
		player_api.parentNode.removeChild(player_api);
		html_node.appendChild(player_api);
		html_node.style.backgroundColor = 'black';
		fullscreenPlayer();
		window.onresize = fullscreenPlayer;
		isFullScreen = true;
	}

	function restoreElements(){
		/* Restore the default youtube interface */
		window.onresize = undefined;
		body_node.style.display = '';
		html_node.removeChild(player_api);
		html_node.style.backgroundColor = "";
		player_api.style = "";
		video_tag.style.width = old_value.width;
		video_tag.style.height = old_value.height;
		window.document.getElementById('player-mole-container').appendChild(player_api);
		isFullScreen = false;
	}

	function resizePlayer(width, height) {
		/* Let's resize the player for fullscreen */
		player_api.style.marginLeft = 0;
		player_api.style.width = width + 'px';
		player_api.style.height = height + 'px';
		video_tag.style.width = width + 'px';
		video_tag.style.height = height + 'px';
	}

	function fullscreenPlayer(){
		/* Resize player to fullpage */
		resizePlayer(window.innerWidth, window.innerHeight);
	}

	function toggleMode(){
		if (isFullScreen == false)
			deleteElements();
		else
			restoreElements();
	}

	initElements();
	toggleButton = window.document.createElement('template');
	toggleButton.innerHTML = toggleButtonTemplate;
	player_right_bar.appendChild(toggleButton.content);
	window.document.getElementById('custom-fullscreen').addEventListener('click', toggleMode);
}())