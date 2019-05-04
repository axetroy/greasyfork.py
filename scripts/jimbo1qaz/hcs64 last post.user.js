// ==UserScript==
// @name        hcs64 last post
// @description Automatically jump to the last post in the HCS forum.
// @namespace   jimbo1qaz
// @include     *://hcs64.com/mboard/*
// @version     1
// @grant       none
// @run-at      document-end
// ==/UserScript==
// @run-at      document-start
// @run-at      document-end
// @run-at      document-idle


if (document.URL.contains('lastpage')) {
	let posts = document.getElementsByClassName('postlist')[0].children;
	posts[posts.length - 2].scrollIntoView();
}