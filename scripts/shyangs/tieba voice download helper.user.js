// ==UserScript==
// @author      Shyangs
// @name        tieba voice download helper
// @description 貼吧語音下載小幫手
// @namespace   http://userscripts.org/users/60668#tvdh
// @include     http://tieba.baidu.com/*
// @version     0.5
// @grant       none
// @icon        http://tb.himg.baidu.com/sys/portrait/item/4daf736879616e6773fc03
// @license     GPLv3; http://opensource.org/licenses/gpl-3.0.html
// ==/UserScript==
let $ = window.$;

$('#j_p_postlist').on('mouseover', '.voice_player_inner', function(){
	if(0!==this.parentNode.getElementsByClassName('tvdh').length)return;
	let img = document.createElement("img");
	img.setAttribute('src', 'http://tieba.baidu.com/tb/static-pb/img/furank_num_2.png');
	img.setAttribute('title', '猛击此处，下载语音♪~');
	img.setAttribute('class', 'tvdh');
	img.setAttribute('style', 'height: 18px');	
	img.addEventListener('click', function(){
		let data = window.PageData,
			tid = data.thread.thread_id || data.thread.id,
			url = 'http://tieba.baidu.com/voice/index?tid='+ tid +'&pid=',
			pid,
			voiceActor = '',
			$cache = $(this);
		$cache = ((0!==$cache.parents('.lzl_single_post').length)?$cache.parents('.lzl_single_post'):$cache.parents('.l_post'));
		data = (function(){
			try{
				return JSON.parse($cache.attr('data-field'));
			}catch(err){
				console.error(err.message + '\n度娘你的員工連 JSON 格式都會犯錯！！！');
				return JSON.parse($cache.attr('data-field').replace(/'/g,'"'));
			}
		})();
		voiceActor = data.user_name || data.author.user_name || data.author.name;
		pid = data.spid || data.content.post_id || data.content.id;
		url += pid;
	
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'blob';
		xhr.onload = function (e) {
			if (this.status == 200) {
				let link = document.createElement('a'),
					createObjectURL = function(file)window.URL.createObjectURL(file);
				url = createObjectURL(new Blob([this.response], {
					type: 'audio/mpeg'
				}));
				link.setAttribute('href', url);
				link.setAttribute('Download', voiceActor+'-'+pid+'.mp3');
				
				let event = document.createEvent('MouseEvents');
				event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				link.dispatchEvent(event);
			}
		};
		xhr.send();
	});
	this.parentNode.appendChild(img);
});