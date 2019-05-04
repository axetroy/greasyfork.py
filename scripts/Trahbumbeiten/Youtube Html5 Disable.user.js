// ==UserScript==
// @name            Youtube Html5 Disable
// @description     ///
// @author          Trahbumbeiten
// @icon            http://youtube.com/favicon.ico
// @homepageURL     https://github.com/
// @namespace       //
// @version         1.0
// @include         http*://*.youtube.com/*
// @include         http*://youtube.com/*
// @include         http*://*.youtu.be/*
// @include         http*://youtu.be/*
// ==/UserScript==

//YOYTUBE--------------------------HTML5--------------------------DISABLE 1
window.addEventListener("popstate",function(e){
	JS();
});
function JS(){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = 'document.createElement("video").constructor.prototype.canPlayType = function(type){return ""}';
	document.documentElement.appendChild(script);
}
JS();