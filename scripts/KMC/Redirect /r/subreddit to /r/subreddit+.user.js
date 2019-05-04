// ==UserScript==
// @name         Redirect /r/subreddit to /r/subreddit+
// @namespace    kmcdeals.com
// @version      1.2
// @description  Redirects any /r/subreddit links to /r/subreddit+ links
// @author       KMC
// @match        *.reddit.com/r/*
// @grant        none
// ==/UserScript==

if(window.location.href.split("/")[4].indexOf("+") == -1){
	window.location = window.location.href.replace(/(http.*\/r\/)([\w]+)(\/comments.*)?/g, "$1$2+$3");
} else {
	var comments = document.getElementsByClassName("comments")
	for(var i = 0; i < comments.length; i++){
		comments[i].href = comments[i].href.replace(/(http.*\/r\/)([\w]+)(\/comments.*)?/g, "$1$2+$3");
	}
}