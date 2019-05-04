// ==UserScript==
// @name           	YouTube Embed Paused More Videos Remover  
// @author		eligon
// @namespace     	https://greasyfork.org/en/users/233017-eliran-gonen 
// @description    	Remove paused embedded youtube videos more videos suggestions
// @include        	/^https?:\/\/www.youtube\.com\/embed\/.*$/
// @version 0.0.1.20181229074314
// ==/UserScript==

elem = document.querySelector("div.ytp-scroll-min.ytp-pause-overlay")
elem.remove();