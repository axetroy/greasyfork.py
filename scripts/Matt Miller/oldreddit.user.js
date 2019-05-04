// ==UserScript==
// @name		 oldreddit
// @namespace	 oldreddit
// @version		 0.2
// @description	 disregard the new, fluffy and broken reddit style by redirecting to old.reddit.com when necessary
// @author		 Matt Miller
// @grant		 none
// @license MIT
// ==/UserScript==
var loc = window.location.toString();
var token1 = "://www.reddit.com/";
var token2 = "://reddit.com/";
var oldUrl = "://old.reddit.com/";
var n = loc.indexOf(token1);
var m = loc.indexOf(token2);
if (n > -1){
	loc = loc.replace(token1, oldUrl);
	window.location.replace(loc);
}
else if (m > -1){
	loc = loc.replace(token2, oldUrl);
	window.location.replace(loc);
}