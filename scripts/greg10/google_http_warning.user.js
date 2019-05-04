// ==UserScript==
// @name        google_http_warning
// @namespace   http://catherine.v0cyc1pp.com/google_http_warning.user.js
// @include     https://www.google.co.jp/search?*
// @include     https://www.google.com/search?*
// @author      greg10
// @run-at      document-end
// @license     GPL 3.0
// @version     0.2
// @grant       none
// @description Google検索結果でhttpは警告色で目立つようにする。
// ==/UserScript==


console.log("http_warning start");


function sub() {
	document.querySelectorAll("cite[class]").forEach( function(elem) {
		var text = elem.innerText;
		if ( text === "" ) return;
		var index = text.indexOf("https");
		if ( index == 0 ) return;
		elem.style.color = "#dd0000";
		elem.style.backgroundColor = "#eeeeee";
	});
}

function main() {
	sub();
}


main();
