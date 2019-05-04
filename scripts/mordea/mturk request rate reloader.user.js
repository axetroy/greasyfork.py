// ==UserScript==
// @name         mturk request rate reloader
// @version      2.0
// @include      https://worker.mturk.com/*
// @author       mordea
// @namespace    mordea
// @description  Automatically reloads pages which hit the refresh rate wall.
// @grant        none
// ==/UserScript==

var content = document.body.textContent || document.body.innerText;
var hasText = content.indexOf("You have exceeded the allowable page request rate")!==-1;
if(hasText){
   setTimeout(function(){
       window.location.reload()
   },4000);
}