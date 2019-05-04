// ==UserScript==
// @name        BashTube VideoJS
// @description Добавляет VideoJS видеоплеер.
// @namespace   2k1dmg@userscript
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version     0.1.7
// @grant       none
// @author      2k1dmg
// @noframes
// @run-at      document-start
// @require     https://greasyfork.org/scripts/9338-videojs-css-font/code/videojs_css_font.js?version=140787
// @match       *://bashtube.ru/video/*
// ==/UserScript==

(function() {
'use strict';

var VIDEO_PLAYER_ID = 'bt-videojs-player';

var _utils = (function() {
	var
	getWidth = function(width, height) {
		return width * (360 / height);
	},
	getHeight = function(width, height) {
		return height * (640 / width);
	},
	getMargin = function(width) {
		return (640 - width) / 2;
	},
	canPlayMedia = function(type) {
		try {
			var v = document.createElement('video');
			return v.canPlayType(type) !== '';
		}
		catch (ex) {
			return false;
		}
	},
	createHTML5player = function(param) {
		var player = document.createElement('video'),
			source,
			prop;

		for (prop in param) {
			if (param.hasOwnProperty(prop)) {
				if (prop == 'source') {
					source = param[prop];
					continue;
				}
				player.setAttribute(prop, param[prop]);
			}
		}
		if (source)
			player = createHTML5playerSource(player, source);

		return player;
	},
	createHTML5playerSource = function(player, source) {
		var sourceElement,
			param,
			i,
			prop;

		for (i = 0; i < source.length; i++) {
			sourceElement = document.createElement('source');
			param = source[i];
			for (prop in param) {
				if (param.hasOwnProperty(prop))
					sourceElement.setAttribute(prop, param[prop]);
			}
			player.appendChild(sourceElement);
		}

		return player;
	},
	_slice = Array.slice || (function() {
		var unboundSlice = Array.prototype.slice,
		slice = Function.prototype.call.bind(unboundSlice);
		return slice;
	}());
	return {
		canPlayMedia: canPlayMedia,
		createHTML5player: createHTML5player,
		getWidth: getWidth,
		getHeight: getHeight,
		getMargin: getMargin,
		_slice: _slice
	};
})();

var addStyleSheet = function() {
	var cssStyle = document.createElement('style');
	cssStyle.type = 'text/css';
	cssStyle.textContent = [
		'#uppod {',
		'	display: none;',
		'}',
		'#'+VIDEO_PLAYER_ID+' {',
		'	width: 640px;',
		'	height: 360px;',
		'	margin-bottom: 20px;',
		'}',
		'@media screen and (min-width: 426px) and (max-width: 640px) {',
		'	#'+VIDEO_PLAYER_ID+' {',
		'		width: 426px !important;',
		'		height: 240px !important;',
		'	}',
		'}',
		'@media screen and (max-width: 426px) {',
		'	#'+VIDEO_PLAYER_ID+' {',
		'		width: 256px !important;',
		'		height: 144px !important;',
		'	}',
		'}'
	].join('\n');
	document.head.appendChild(cssStyle);
};

var getCounterURL = function() {
 	var bodyContent = document.body.innerHTML;
	var matchBodyContent = bodyContent.match(/jx\.load\(\'(.*)\'\)\;/m);
	if(!matchBodyContent)
		return null;
	var url = matchBodyContent[1];
	return url;
};

var upCounter = function() {
	var counter = document.querySelector('.video-info > .right > p > strong');
	if(!counter)
		return;
	var val = counter.textContent;
	var num = parseInt(val);
	if(typeof num !== 'number')
		return;
	num++;
	val = num + '';
	counter.textContent = val;
};

var setCounter = function(videojsPlayer) {
	var url = getCounterURL();
	if(!url)
		return;
	videojsPlayer.one('play', function() {
		var now = 'uid=' + new Date().getTime();
		url += (url.indexOf('?') + 1) ? '&' : '?';
		url += now;
		var http = new XMLHttpRequest();
		if(http.overrideMimeType)
			http.overrideMimeType('application/json');
		http.open('GET', url, true);
		http.onload = function() {
			var result = '';
			if (http.responseText)
				result = http.responseText;
			var o_result = JSON.parse(result);
			if(o_result.success)
				upCounter();
		};
		http.send(null);
	});
};

var createPlayer = function(params) {
	var file = params.file;
	var poster = params.poster;
	var videoInfo = document.querySelector('.video-info');
	var flash = params.flash;
	if(!file)
		return;
	//document.querySelector('#uppod').style.display = 'none';
	addStyleSheet();
	var player = _utils.createHTML5player({
		id: VIDEO_PLAYER_ID,
		width: '640',
		height: '360',
		volume: '0.5',
		controls: '',
		poster: poster,
		preload: 'metadata',
		'class': 'video-js vjs-default-skin', //vjs-big-play-centered
		'data-setup': '{}',
		//src: file
		source: [{
			src: file,
			type: 'video/mp4'
		}]
	});
	//videoInfo.parentNode.insertBefore(player, videoInfo);
	var videoPage = document.querySelector('.video-page');
	videoPage.insertBefore(player, videoPage.firstChild);
	if(typeof videojs === 'undefined')
		return;
	videojs(VIDEO_PLAYER_ID).ready(function(){
		var videojsPlayer = this;
		videojsPlayer.volume(0.5);
		setCounter(videojsPlayer);
	});
};

var getParams = function() {
	var getScriptContent = function() {
		var lastSibling = uppod.nextSibling,
			targetContent;
		for (var i = 0; i < 15; i++) {
			if (lastSibling.nodeType === 1 &&
				/.*file:\s'(http:[^']*).*/m.test(lastSibling.textContent)) {
			   targetContent = lastSibling;
			   break;
			}
			lastSibling = lastSibling.nextSibling;
		}
		if (targetContent) {
			return targetContent.textContent;
		}
		else {
			return null;
		}
	};

	var getPageBodyParams = function() {
		var bodyContent = getScriptContent() || document.body.innerHTML,
			matchBodyContent = bodyContent.match(/.*file:\s'(http:[^']*).*/m),
			matchBodyContentPoster = bodyContent.match(/.*poster:\s'(http:[^']*).*/m);
		if(!matchBodyContent)
			return;
		if (matchBodyContent[1]) {
			file = matchBodyContent[1];
			poster = matchBodyContentPoster[1] ? matchBodyContentPoster[1] : '';
			return {'file': file, 'poster': poster, 'flash': false};
		}
	};

	var getUppodParams = function() {
		var matchFlashvars = flashvars.match(/.*file=(http:[^&]*).*/m),
			matchPoster = flashvars.match(/.*poster=(http:[^&]*).*/m);
		if (matchFlashvars[1]) {
			file = matchFlashvars[1];
			poster = matchPoster[1] ? matchPoster[1] : '';
			return {'file': file, 'poster': poster, 'flash': true};
		}
	};

	var uppod = document.getElementById('uppod'),
		uppodParams = uppod.getElementsByTagName('param'),
		flashvars,
		file,
		poster,
		params;
	if ('flashvars' in uppodParams && uppodParams['flashvars'].value) {
		flashvars = uppodParams['flashvars'].value;
		params = getUppodParams();
	}
	else {
		params = getPageBodyParams();
	}
	if (params) {
		return params;
	}
};

document.addEventListener('DOMContentLoaded', function() {
	if(!_utils.canPlayMedia('video/mp4'))
		return;
	var params = window.params ? window.params : getParams();
	if (params) {
		createPlayer(params);
	}
	else {
		if(typeof videojs === 'undefined')
			return;
		var player = document.querySelector('video');
		if(!player)
			return;
		player.classList.add('video-js', 'vjs-default-skin', 'vjs-big-play-centered');
		player.setAttribute('data-setup', '{}');
		if(!player.id)
			player.id = VIDEO_PLAYER_ID;
		var videojsPlayer = videojs(player.id);
		videojsPlayer.volume(0.5);
		setCounter(videojsPlayer);
	}
}, false);

})();