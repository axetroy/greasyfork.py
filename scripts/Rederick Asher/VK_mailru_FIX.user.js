// ==UserScript==
// @name         VK_mailru_FIX
// @namespace    http://tampermonkey.net/
// @version      0.4 - 2018.06.02 - 18:49
// @description  FIX mailru VK design
// @author       Rederick Asher
// @match        *://vk.com/*
// @exclude      *://vk.com/notifier.php*
// @exclude      *://vk.com/al_*
// @exclude      *://vk.com/upload_fails.php
// @exclude      *://vk.com/ads_rotate.php*
// @exclude      *://vk.com/share.php*
// ==/UserScript==

(function() {
	'use strict';
	//	var vkme=[];
	var myinfotxt;
	setInterval(function(){
		if(document.getElementById("l_vid"))
			if(document.getElementById("l_vid").childNodes[0].href=="https://vk.com/video")
				document.getElementById("l_vid").childNodes[0].href=document.getElementById("l_aud").childNodes[0].href.replace(/audios/i, 'videos');
		if (window.location.href=="https://vk.com/video")
		{
			return uiTabs.goTab(document.getElementById("videocat_tab_all").childNodes[1], event, 1);
		}else if (window.location.href.substr(0,17)=="https://vk.com/im")
		{
			// ************************************************************
			var peer_id;
			var code_body;
			var x;
			var i;
			var q = document.getElementById("im_dialogs_search");
			q.onfocus=function(){
				if(window.window.getComputedStyle(this).getPropertyValue("opacity")!=1){
					this.blur();
				}
			};
			q = document.getElementById("im_dialogs").querySelectorAll('[data-list-id]');
			//			for (var j = 0; j < q.length && j < 8; j++) {
			for (var j = 0; j < q.length; j++) {
				x=q[j].getAttribute("BLA-data-peer");
				if(!x||x!=q[j].getAttribute("data-msgid")){
					//					x = q[j].getElementsByClassName("nim-dialog--name");
					//					x[0].style.background="#ffe0e0";


					q[j].setAttribute("BLA-data-peer",q[j].getAttribute("data-msgid")+q[j].getAttribute("class"));
					peer_id=q[j].getAttribute("data-list-id");
					if(peer_id.length==10){
						if(!q[j].classList.contains("GroupeChat")){
							q[j].classList.add("GroupeChat");
							//							x = q[j].getElementsByClassName("nim-dialog--name");
							x = q[j].getElementsByClassName("nim-dialog--name-w");
							x[0].classList.add("GroupeChatName");
							q[j].setAttribute("BLA-data-peer",q[j].getAttribute("data-msgid")+q[j].getAttribute("class"));
						}
					}else{
						//											q[j].style.background="#ffe0e0";

						code_body = 'return {';
						code_body += '"peer_id":'+peer_id+',"userinfo": API.users.get({"user_ids":'+peer_id+',"fields":"nickname,is_friend"})';
						code_body += '};';
						dApi.call('execute',{v:'5.6', code:code_body},function(r){
							//							alert(r.response.userinfo[0].first_name);
							var q = document.getElementById("im_dialogs").querySelectorAll('[data-list-id="'+r.response.peer_id+'"]');
							//							q[0].style.background="#ffe0e0";
							//							var x = q[0].getElementsByClassName("nim-dialog--name");
							var x = q[0].getElementsByClassName("nim-dialog--name-w");
							//							var x = document.getElementsByClassName("nim-dialog--name");
							//							var x = document.querySelectorAll('nim-dialog--name');
							//							alert(q.length);
							x[0].classList.add("friend"+r.response.userinfo[0].is_friend);
							x[0].innerHTML=(r.response.userinfo[0].first_name+" "+r.response.userinfo[0].nickname+" "+r.response.userinfo[0].last_name).replace(/\s\s+/g, ' ')+":";
						});
					}
					x = q[j].getElementsByClassName("nim-dialog--who");
					if(x)if(x[0]){
						//						x[0].style.background="#ffe0e0";
						//						if(!x[0].id){
						if(x[0].getElementsByTagName("img")){
							x[0].setAttribute("id","BLA"+peer_id);
							if(x[0].innerHTML=="Вы:"){
								x[0].setAttribute("me_bla","1");
								x[0].innerHTML='<span class="showname"><img src="'+document.getElementById("top_profile_link").getElementsByTagName("img")[0].src+'" /><div>'+document.getElementById("top_profile_link").getElementsByTagName("div")[0].innerText+":</div></span>";
							}else{
								//								x[0].style.background="#ffe0e0";
								code_body = 'return {';
								code_body += '"peer_id":'+peer_id+',"userinfo": API.users.get({"user_ids":API.messages.getHistory({"user_id":'+peer_id+',"offset":0,"count":1}).items[0].from_id,"fields":"photo_50,nickname,is_friend"})';
								code_body += '};';
								dApi.call('execute',{v:'5.6', code:code_body},function(r){
									var x = document.getElementById("BLA"+r.response.peer_id);
									//									x.style.background="none";
									x.innerHTML='<span class="showname"><img src="'+r.response.userinfo[0].photo_50+'" /><div class="friend'+r.response.userinfo[0].is_friend+'">'+(r.response.userinfo[0].first_name+" "+r.response.userinfo[0].nickname+" "+r.response.userinfo[0].last_name).replace(/\s\s+/g, ' ')+":</div></span>";
								});
							}
						}
					}
				}
			}
			q = document.querySelectorAll('[me_bla]');
			if(q){
				if(myinfotxt){
					for (j = 0; j < q.length; j++) {
						q[j].removeAttribute("me_bla");
						//						q[j].style.background="none";
						q[j].innerHTML=myinfotxt;
					}
				}else{
					code_body = 'return {';
					code_body += '"userinfo": API.users.get({"user_ids":'+vk.id+',"fields":"photo_50,nickname,is_friend"})';
					code_body += '};';
					dApi.call('execute',{v:'5.6', code:code_body},function(r){
						myinfotxt='<span class="showname"><img src="'+r.response.userinfo[0].photo_50+'" /><div class="friend'+r.response.userinfo[0].is_friend+'">'+(r.response.userinfo[0].first_name+" "+r.response.userinfo[0].nickname+" "+r.response.userinfo[0].last_name).replace(/\s\s+/g, ' ')+":</div></span>";
						var x = document.querySelectorAll('[me_bla]');
						for (var i = 0; i < x.length; i++) {
							x[i].removeAttribute("me_bla");
							//							x[i].style.background="none";
							x[i].innerHTML=myinfotxt;
						}
					});
				}
			}
			// ************************************************************
		}else if (window.location.href=="https://vk.com/feed")
		{
			var suka=document.getElementById("feed_filters").childNodes[0].childNodes[1].childNodes[1];
			if(suka.classList.contains("on")){
				suka.classList.remove("on");
				Feed.toggleFeedTop(suka, event);
			}
		}
	}, 500);
})();