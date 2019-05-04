// ==UserScript==
// @name	Youtube only flash
// @description	switch html5 to flash player
// @namespace	https://greasyfork.org/users/19952-xant1k-bt
// @match	*://*.youtube.com/*
// @version	1.0
// ==/UserScript==

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