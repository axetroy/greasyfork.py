// ==UserScript==
// @name         GetVideoURLofyase
// @namespace    none
// @version      1.2
// @description  获取亚色视频地址
// @author       mogu
// @include      https://*.yase*.*/video-*
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
	'use strict';
	let $ = document.querySelector.bind(document);
	let cEle = document.createElement.bind(document);
	let video = {};
	let main = () => {
		let style = [
			'div#getURL a {',
				'display: inline-block;',
				'font-family: consolas;',
				'background: #f2f2f2;',
				'margin-bottom: 10px;',
				'padding: 5px;',
				'box-shadow: 0px 1px 3px rgba(0,0,0,.3);',
				'border-radius: 3px;',
			'}',
		];
		GM_addStyle( style.join('') );
		let playerbox = $('.player-box');
		let div = cEle('div');
		div.id = 'getURL';
		playerbox.parentNode.insertBefore(div, playerbox);
		for (let i of $('div.video-player > h2').childNodes.keys()) {
			let tem = $('div.video-player > h2').childNodes[i];
			if ( tem.nodeType === 3 ) {
				video.title = tem.textContent;
			}
		}
	};
	let add = (str) => {
		if (/hls-\d{3}p\.m3u8/.test(str)){
			video.url = str;
			let a = cEle('a');
			a.textContent = str;
			a.href = str;
			a.setAttribute('style', 'color: blue;');
			$('#getURL').appendChild(a);
			if ( navigator.userAgent.indexOf('Windows') >= -1 ) {
				video.ffmpeg = `ffmpeg -i "${video.url}" -c copy "${video.title}.mp4"`;
			} else if ( navigator.userAgent.indexOf('Linux') >= -1 ) {
				video.ffmpeg = `ffmpeg -i '${video.url}' -c copy '${video.title}.mp4'`;
			}
			if ( video.ffmpeg ) {
				let a2 = cEle('a');
				a2.innerHTML = `${video.ffmpeg}<input id="INPCOPY" type="button" value="复制">`;
				$('#getURL').appendChild(a2);
				$('#INPCOPY').addEventListener('click', () => {
					GM_setClipboard(video.ffmpeg);
				}, false);
			}
		}
	};
	main();
	let s_ajaxListener = new Object();
	s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
	s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;
	s_ajaxListener.callback = function () {
		// this.method :the ajax method used
		// this.url    :the url of the requested script (including query string, if any) (urlencoded)
		// this.data   :the data sent, if any ex: foo=bar&a=b (urlencoded)
		add(this.url);
	}

	XMLHttpRequest.prototype.open = function(a,b) {
		if (!a) a = '';
		if (!b) b = '';
		s_ajaxListener.tempOpen.apply(this, arguments);
		s_ajaxListener.method = a;
		s_ajaxListener.url = b;
		if (a.toLowerCase() == 'get') {
			s_ajaxListener.data = b.split('?');
			s_ajaxListener.data = s_ajaxListener.data[1];
		}
	}

	XMLHttpRequest.prototype.send = function(a,b) {
		if (!a) a = '';
		if (!b) b = '';
		s_ajaxListener.tempSend.apply(this, arguments);
		if(s_ajaxListener.method.toLowerCase() == 'post')s_ajaxListener.data = a;
		s_ajaxListener.callback();
	}
})();