// ==UserScript==
// @name        Remove Yandex Results Redirect
// @match       http://*/yandsearch?*
// @match       https://*/yandsearch?*
// @homepage    https://greasyfork.org/ru/scripts/8240-remove-yandex-results-redirect
// @grant  	unsafeWindow
// @version     0.21
// @namespace https://greasyfork.org/users/9347
// @description Удаляет редиректы из поисковой выдачи яндекса.
// ==/UserScript==
	
if(unsafeWindow.top == unsafeWindow.self){
	document.addEventListener('DOMNodeInserted',function(e){
		window.setTimeout(function(){
		var rl = document.querySelectorAll('a[onmousedown*="/clck/jsredir?from="]');
		for (var l=0;l<rl.length;l++)
			rl[l].removeAttribute('onmousedown');
		}, 250);}
	, false);
}