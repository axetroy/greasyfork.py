﻿// ==UserScript==
// @name        Script_for_tiwar_arena_by_nexus
// @namespace   Arena BT
// @include     http://*
// @version     1
// @description 1
// ==/UserScript==
/*
	Author: Nexus;
	http://tiwar.info/
*/
var all_meta=document.getElementsByTagName('meta');var this_tiwar=false;for(var i=0;i<all_meta.length;i++){if(all_meta[i].name=='keywords'){if(all_meta[i].content=='битва титанов, титаны, онлайн игра, тивар, tiwar, MMORPG'){this_tiwar=true;};};};var this_arena=false;var nexus=document.createElement('script');if(window.location.href.split('/')[3]=='arena'){this_arena=true;};if(this_tiwar && this_arena){var mana_num=parseInt(document.getElementsByClassName('head')[0].innerHTML.split(' ')[8].substr(0, 4).match(/\d+/));var health_num=parseInt(document.getElementsByClassName('head')[0].innerHTML.split(' ')[3].substr(0, 4).match(/\d+/));var title=document.getElementsByTagName('title')[0].innerHTML;var loc=localStorage;var atak=1;var wait=400;if(loc.getItem('atak')){atak=loc.getItem('atak');}else{loc.setItem('atak','1');};if(loc.getItem('wait')){wait=loc.getItem('wait');}else{loc.setItem('wait', '400');};atak=parseInt(atak)-1;atak=parseInt(atak);document.getElementsByClassName('main')[0].innerHTML+='<div class="line"></div><a href="javascript://" style="display:block;padding:3px 5px;background:rgba(255,255,255,0.1);" id="script_setting">Настройки<span style="float:right;">Открыть</span></a><div style="background:rgba(255,255,255,0.1);padding:2px 4px;display:none;" id="nexus_script_footer_setting"></div>';document.getElementById('script_setting').addEventListener('click',function(){if(document.getElementById('nexus_script_footer_setting').style.display=='none'){this.getElementsByTagName('span')[0].innerHTML='Закрыть';this.style.borderBottom='solid 1px #666';document.getElementById('nexus_script_footer_setting').style.display=''}else{this.getElementsByTagName('span')[0].innerHTML='Открыть';this.style.borderBottom='none';document.getElementById('nexus_script_footer_setting').style.display='none'};},false);document.getElementById('nexus_script_footer_setting').innerHTML='<div style="padding:2px 0px;">Арена. Атаковать №:<span style="float:right;" id="arena_atk"><a href="javascript://" style="padding:0px 2px;">1</a> <a href="javascript://" style="padding:0px 2px;">2</a> <a href="javascript://" style="padding:0px 2px;">3</a></span></div>';document.getElementById('nexus_script_footer_setting').innerHTML += '<div style="padding:2px 0px;">Арена. Без маны ждать:<span style="float:right;" id="arena_wait"><input type="text" value="' + wait + '" maxlength="5" size="5" style="background:none;border:none;color:#595;font-weight:bold;"/> <a href="javascript://">Сохранить</a></span></div>';document.getElementById('arena_atk').getElementsByTagName('a')[atak].style.color='#5F5';nexus.type='text/javascript';document.getElementById('arena_atk').getElementsByTagName('a')[0].addEventListener('click',function(){loc.setItem('atak','1');this.style.color='#5F5';document.getElementById('arena_atk').getElementsByTagName('a')[1].style.color='rgb(244, 208, 110)';document.getElementById('arena_atk').getElementsByTagName('a')[2].style.color='rgb(244, 208, 110)';},false);document.getElementById('arena_atk').getElementsByTagName('a')[1].addEventListener('click',function(){loc.setItem('atak','2');this.style.color='#5F5';document.getElementById('arena_atk').getElementsByTagName('a')[0].style.color='rgb(244, 208, 110)';document.getElementById('arena_atk').getElementsByTagName('a')[2].style.color='rgb(244, 208, 110)';},false);document.getElementById('arena_atk').getElementsByTagName('a')[2].addEventListener('click',function(){loc.setItem('atak','3');this.style.color='#5F5';document.getElementById('arena_atk').getElementsByTagName('a')[0].style.color='rgb(244, 208, 110)';document.getElementById('arena_atk').getElementsByTagName('a')[1].style.color='rgb(244, 208, 110)';},false);document.getElementById('arena_wait').getElementsByTagName('a')[0].addEventListener('click',function(){loc.setItem('wait', '' + this.parentNode.getElementsByTagName('input')[0].value);this.parentNode.getElementsByTagName('input')[0].setAttribute('maxlength', '9');this.parentNode.getElementsByTagName('input')[0].size='9';this.parentNode.getElementsByTagName('input')[0].value='Сохранено';setTimeout(function(){document.getElementById('arena_wait').getElementsByTagName('input')[0].size='5';document.getElementById('arena_wait').getElementsByTagName('input')[0].setAttribute('maxlength', '5');document.getElementById('arena_wait').getElementsByTagName('input')[0].value=loc.getItem('wait');}, 3000);},false);nexus.src='http://tiwar.info/js/js.js';var label=document.getElementsByClassName('label');if(label[0].innerHTML=='Новый бой' || label[0].innerHTML.substr(0,12)=='Восстановить') atak=atak+1;var no_attack_=false;if(document.getElementsByClassName('dred')[0]){for(var _nexus__=0;_nexus__<document.getElementsByClassName('dred').length;_nexus__++){if(document.getElementsByClassName('dred')[_nexus__].innerHTML=='Для нападения нужно не менее <img src="/images/icon/health.png" alt=""> 10% здоровья' || document.getElementsByClassName('dred')[_nexus__].innerHTML=='Для нападения нужно <img src="/images/icon/mana.png" alt=""> 50 маны'){no_attack_=true;break;};};};if(document.getElementsByClassName('error')[0] && document.getElementsByClassName('block_outer')[0] || mana_num<50 || no_attack_){document.getElementsByClassName('head')[0].innerHTML+='<br>Страница будет обновленна через <span id="timer">'+wait+'</span>';document.body.appendChild(nexus);function timer(num){if(!num){var num=document.getElementById('timer').innerHTML;};if(num>0){var sec=num;var min=sec/60;min=''+min+'';min=min.split('.')[0];sec=sec/60;sec=sec.toFixed(2);sec=sec.split('.')[1];sec=60/100*sec;sec=sec.toFixed();if(parseInt(sec)<10){sec='0'+sec;};if(parseInt(min)<10){min='0'+min;};num=num-1;setTimeout(function(){timer(num)},1000);document.getElementById('timer').innerHTML=min+'<i>мин</i> '+sec+'<i>сек</i>';document.getElementsByTagName('title')[0].innerHTML=min+':'+sec+'сек. | '+title;}else{label[atak].click();};};setTimeout(timer,1000);}else{label[atak].click();};};