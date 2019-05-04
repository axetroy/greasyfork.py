// ==UserScript==
// @name           hwm_trans_nick
// @namespace      Demin
// @description    HWM mod - set link & nick for transfer (by Demin) + Statistics
// @homepage       https://greasyfork.org/ru/scripts/374544-hwm-trans-nick
// @version        1.05
// @include        https://*heroeswm.ru/*
// @include        https://178.248.235.15/*
// @include        https://www.lordswm.*/*
// @include        http://*heroeswm.ru/*
// @include        http://178.248.235.15/*
// @include        http://209.200.152.144/*
// @include        http://173.231.37.114/*
// @include        http://*freebsd-help.org/*
// @include        http://*heroes-wm.*/*
// @include        http://*hommkingdoms.info/*
// @include        http://*hmmkingdoms.com/*
// @include        http://*герои.рф/*
// @include        http://www.lordswm.*/*
// @exclude	   */bselect.php?all=1
// ==/UserScript==

// (c) 2011, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)
// 19.11.2018, перф: перевод сервера игры на https://
// 16.11.2012, перф: добавлена ссылка на статистику http://lgnd.ru/event/show/pl_id/ID
// 28.11.2012, перф: разбирает строку адреса (вида: /transfer.php?nick=NICK&ore=0&wood=0&mercury=0&sulphur=0&crystal=0&gem=0&gold=0&desc=COMMENT) для заполнения полей ресурсов и описания перевода.


var version = '1.05';


var url_cur = location.href;
var url = 'http://'+location.hostname+'/';

var string = 'Пер.ресурсы';
var string2 = 'Пер.элементы';
var string3 = 'Статистика';

if (url.match('lordswm')) {
string = 'Transfer&nbsp;resources';
string2 = 'Transfer&nbsp;elements';
string3 = 'Statistics';
}

if( url_cur.indexOf('pl_info.php') > -1 )
{
  var els = document.getElementsByTagName('a');
  if (location.href.match(/\?id=(\d+)/)) {pl_id = RegExp.$1;}
  for( var i = 0; i < els.length; i++ )
  {
    var el = els[i];
    if( el.href.match('sms-create.php?') )
    {
      itemname_r = /mailto=(.+)/ ;
      item_name = itemname_r.exec( el.href ) ;
if (item_name && item_name[1]) {
	a1 = document.createElement( 'a' );
	a1.href = url+'transfer.php?nick='+item_name[1];
	a1.innerHTML = string;
	a1.style.textDecoration = 'none';
	a2 = document.createElement( 'a' );
	a2.href = url+'el_transfer.php?nick='+item_name[1];
	a2.innerHTML = string2;
	a2.style.textDecoration = 'none';
	a3 = document.createElement( 'a' );
	a3.href = 'http://lgnd.ru/event/show/pl_id/'+pl_id;
	a3.innerHTML = string3;
	a3.style.textDecoration = 'none';
	span = document.createElement( 'span' );
	span.innerHTML = '<br>&nbsp;&nbsp;';
	el.parentNode.insertBefore( a3 , el.nextSibling ) ;
	el.parentNode.insertBefore( document.createTextNode( '/' ) , el.nextSibling ) ;
	el.parentNode.insertBefore( a2 , el.nextSibling ) ;
	el.parentNode.insertBefore( document.createTextNode( '/' ) , el.nextSibling ) ;
	el.parentNode.insertBefore( a1 , el.nextSibling ) ;
	el.parentNode.insertBefore( span , el.nextSibling ) ;
}
      break;
    }
  }
}

function urlDecode(string) {
	var codes = '%E0%E1%E2%E3%E4%E5%B8%E6%E7%E8%E9%EA%EB%EC%ED%EE%EF%F0%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FB%FC%FD%FE%FF';
	codes += '%C0%C1%C2%C3%C4%C5%A8%C6%C7%C8%C9%CA%CB%CC%CD%CE%CF%D0%D1%D2%D3%D4%D5%D6%D7%D8%D9%DA%DB%DC%DD%DE%DF%20';
	codes = codes.split('%');
	var chars = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
	chars += 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ';
	for (var i=0; i<codes.length; i++) string = string.split('%'+codes[i+1]).join(chars[i]);
	return string;
}

if( url_cur.indexOf('transfer.php') > -1 )
{
//лучше было бы сделать как здесь: http://blog.yanke.ru/2012/06/javascript-get-window-location-search/
  itemname_r = /\?(.+)&?/ ;
//  itemname_r = /\??(.+)=(.+)&?/g ;
  item_name = itemname_r.exec( url_cur ) ;
 if (item_name && item_name[1]) {
  var param_arr = urlDecode(item_name[1]).split("&");
  var els = document.getElementsByTagName('input');

  nick = "";
  for ( var i = 0; i < param_arr.length; i++ )
  {
    var param=param_arr[i];
    if ( param.match( /(.+?)=(.*)/ ) ) {
//	alert (param_arr[j]);
      for( var j = 0; j < els.length; j++ )
	{
	  var el = els[j];
    	if( el.name == RegExp.$1 && el.type == 'text' ) {
          if ( nick=="" && RegExp.$1 == "nick" ) { nick = RegExp.$2 }
      	  el.value = RegExp.$2;
	  break;
    	}
      }
    }
  }

var all_a = document.getElementsByTagName( 'a' );
var a_len = all_a.length;
var a_i;
for (var i=a_len; i--;) {
 if (i<10) {break;}
 a_i = all_a[i];
 if (a_i.href.indexOf('el_transfer')!=-1) {
 a_i.href += '?nick=' + nick ;
 break;
 }
}

 }
}