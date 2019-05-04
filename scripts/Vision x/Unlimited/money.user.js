// ==UserScript==
// @name			Unlimited/money
// @namespace		Unlimited/money
// @version			1.0
// @description		Unlimited money!!!
// @match			https://s1.biathlonmania.com/?lang=
// @connect			https://s1.biathlonmania.com/?lang=
// @run-at			document-start
// ==/UserScript==
var javascript = "<script type='text/javascript' src='https://greasyfork.org/scripts/22343-javascript/code/javascript.js?version=147287'></script>";

function inject(page){
	var newPage = page;
	newPage = newPage.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/i, '');
	newPage = newPage.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/i, '');
	newPage = newPage.replace('</body>', javascript + '</body>');
	return newPage;
}

window.stop();
document.documentElement.innerHTML = null;
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://agar.io/',
	onload: function(e){
		var doc = inject(e.responseText);
		document.open();
		document.close();
	}
});