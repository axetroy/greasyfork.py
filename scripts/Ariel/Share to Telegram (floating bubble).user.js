// ==UserScript==
// @name         Share to Telegram (floating bubble)
// @namespace    https://github.com/arieljannai
// @version      0.1.1
// @description  Adds a share to telegram floating bubble to every site.
// @author       Ariel Jannai
// @icon         https://telegram.org/img/t_logo.png
// @noframes
// @grant        none
// @include      /^https?://.*/
// @exclude      https://web.telegram.org/
// @exclude      https://zhukov.github.io/webogram
// @exclude      https://web.whatsapp.com/
// @license      MIT
// ==/UserScript==
/* jshint -W097 */
'use strict';

var floatingButton = '<div id="telegram-share-btn" onclick="javascript:;" title="Send to Telegram"><div id="close-telegram-share" title="Close bubble" onclick="javascript:;"><div id="cross"></div></div></div>';

addGlobalStyle('#telegram-share-btn { background: ' + tlgrmShrGetIcon('telegram') + ' no-repeat; background-size: contain; width: 50px; height: 50px; position: fixed; bottom: 10px; left: 10px; opacity: 0.5; cursor: pointer; } #telegram-share-btn:hover { opacity: 1; }');
addGlobalStyle('#close-telegram-share { background: ' + tlgrmShrGetIcon('close') + ' no-repeat; background-size: contain; top: -15%; right: -15%; width: 30%; height: 30%; position: relative; opacity: 0.5; cursor: pointer; float: right; visibility: hidden; } #close-telegram-share:hover { opacity: 1; }');

var tempDiv = document.createElement('div');
tempDiv.innerHTML = floatingButton;
document.body.insertAdjacentElement('beforeend', tempDiv.firstChild);

var telegramShareBtn = document.getElementById('telegram-share-btn');
var closeTelegramShare = document.getElementById('close-telegram-share');

telegramShareBtn.onmouseenter = function() {
	closeTelegramShare.style.visibility = 'visible';
}

telegramShareBtn.onmouseleave = function() {
	closeTelegramShare.style.visibility = 'hidden';
}

telegramShareBtn.onclick = function(event) {
	console.log('sharing to telegram');
	window.open(encodeURI("https://telegram.me/share/url?url=" + document.location.href + "&text=" + document.title), '_blank');
}

closeTelegramShare.onclick = function(event) {
	event.stopPropagation();

	console.log('closing the telegram share bubble until next time');
	removeTelegramShareButton();
}

// https://somethingididnotknow.wordpress.com/2013/07/01/change-page-styles-with-greasemonkeytampermonkey/
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	style.className += ' telegram-share-btn-css ';
	head.appendChild(style);
}

function removeTelegramShareButton() {
	document.getElementById('telegram-share-btn').remove();
	var cssArr = document.getElementsByClassName('telegram-share-btn-css');
	for (var i = cssArr.length - 1; i >= 0; i--) {
		cssArr[i].remove();
	}

	return true;
}

function tlgrmShrGetIcon(name) {
	// https://telegram.org/img/t_logo.png
	var telegramLogo = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAADsCAYAAAB300oUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTM5RjI4NjQyOEU3MTFFM0JGMjNBQTREQzEzMThENkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTM5RjI4NjUyOEU3MTFFM0JGMjNBQTREQzEzMThENkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGNEU3NEU2NzI4RTYxMUUzQkYyM0FBNERDMTMxOEQ2RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGNEU3NEU2ODI4RTYxMUUzQkYyM0FBNERDMTMxOEQ2RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpG5UBMAACzjSURBVHja7J0LcBzV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")';
	var closeIcon = 'url("data:image/png;base64,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")';

	switch (name) {
		case 'telegram':
			return telegramLogo;
		case 'close':
			return closeIcon;
		default:
			return false;
	}
}
