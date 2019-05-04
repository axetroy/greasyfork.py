// ==UserScript==
// @name        tieba voice player fix
// @namespace　 dggb
// @description 修复贴吧语音, 增加播放器界面
// @include     http://tieba.baidu.com/*
// @include     https://tieba.baidu.com/*
// @version     1
// @grant       none
// @namespace https://greasyfork.org/users/159143
// ==/UserScript==

/*　tieba voice player fix　是　tieba voice download helper 的修改版
 * 
 * @name   tieba voice download helper 
 * @author  Shyangs
 * https://greasyfork.org/zh-CN/scripts/307-tieba-voice-download-helper
 * 
 * */


let $ = window.$;

$('#j_p_postlist').on('mouseover', '.voice_player_inner', function(){
	if(0!==this.parentNode.getElementsByClassName('tvdh').length)return;
	let img = document.createElement("img");
	let player = document.createElement("button");
   var _this=this;
	player.onclick=function(){
    
    player.onclick=null;
	this.style.display='none';
		let data = window.PageData,
			tid = data.thread.thread_id || data.thread.id,
			url = '//tieba.baidu.com/voice/index?tid='+ tid +'&pid=',
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
    
     var fra=document.createElement('iframe');
				fra.width=300;
				fra.height=40;
   
    $(_this.parentNode).before(fra);	
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

				let event = document.createEvent('MouseEvents');
				event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				link.dispatchEvent(event);
         fra.src=url; 

        img.src='//tieba.baidu.com/tb/static-pb/img/furank_num_2.png';
        img.title= '猛击此处，下载语音♪~';
        img.className='tvdh';
        img.style='height: 18px';	
				img.onclick=function(){
					link.setAttribute('href', url);
					if(data.pid&&data.spid)link.setAttribute('Download', ' - '+voiceActor+'【p／'+tid+'？pid='+data.pid+'&cid='+data.spid+'#'+data.spid+'】.mp3');
					else link.setAttribute('Download', ' - '+voiceActor+'【p／'+tid+'？pid='+pid+'#'+pid+'】.mp3');					
					let event = document.createEvent('MouseEvents');
					event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					link.dispatchEvent(event);
				}
			}			
		};
		xhr.send();
	}
	$(this.parentNode).after(player,img).hide();
  player.click();
	
});