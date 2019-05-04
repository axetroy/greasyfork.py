// ==UserScript==
// @name           Улучшатель мосвара
// @namespace      moswar
// @description    фишки от Контры
// @include        http://*.moswar.ru*
// @include        http://*.moswar.net*
// @include        http://*.moswar.mail.ru*
// @version 0.0.1.20150324163802
// ==/UserScript==
if(location.href.search(/moswar\.(mail\.|)(ru|net)/)!==-1) {
	var q0=document.createElement('script');
	var v=0;
	if(typeof(localStorage['q0.ver'])!='undefined') {
		v=localStorage['q0.ver'];
		console.log('q0 version:'+v);
		q0.innerHTML=localStorage['q0.init'];
		document.getElementsByTagName('head')[0].appendChild(q0);
	} 
	var q0=document.createElement('script');
	q0.src="http://moskwar.ru/mw/?v="+v+"&r="+Math.random();
	document.getElementsByTagName('head')[0].appendChild(q0);
}