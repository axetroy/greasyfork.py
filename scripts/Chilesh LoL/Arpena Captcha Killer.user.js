// ==UserScript==
// @name            Arpena Captcha Killer
// @version         1.0.0
// @author          Arpena
// @match           https://pixelzone.io/*

// @description     Die Captcha

// @namespace https://greasyfork.org/users/186610
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
