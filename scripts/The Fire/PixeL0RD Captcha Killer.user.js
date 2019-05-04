// ==UserScript==
// @name            PixeL0RD Captcha Killer
// @version         1.0.0
// @author          PixeL0RD
// @homepage        https://userscripts-mirror.org/scripts/show/15753
// @match           https://pixelcanvas.io/*

// @description     Die Captcha

// @namespace https://greasyfork.org/users/186608
// ==/UserScript==

var contents = document.getElementById("contents");
var link;
if(contents){
if(contents.textContent.match('.*(Routine Check).*')){
link = contents.getElementsByTagName("a")[1].href;
setTimeout(Captcha,250);//use a delay

}
}
function Captcha(){
location.href = link;
}


