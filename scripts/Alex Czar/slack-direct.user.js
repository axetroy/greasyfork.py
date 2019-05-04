// ==UserScript==
// @name        slack-direct
// @namespace   io.czar.grease-slack-direct
// @description Bypass slack-redir
// @include     https://*.slack.com/**
// @version     1
// @grant       none
// ==/UserScript==

function removeRedirects() {
	var links = document.querySelectorAll('a[onclick^=this\\.href\\=\\"https\\:\\/\\/slack-redir]'),
		link,
		i = links.length;
	while (i--) {
		link = links[i];
		link.removeAttribute('onclick');
		link.parentNode.replaceChild(link.cloneNode(true), link);
	}
}

setInterval(removeRedirects, 500);
