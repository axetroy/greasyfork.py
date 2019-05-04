// ==UserScript==
// @name         NetFlix Auto Account selection
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Automatically select your Netflix account (enter your netflix account name below)
// @author       Guile93
// @include    https://www.netflix.com/*
// ==/UserScript==
(function() {
    var netflixname="WRITE YOUR NETFLIX NAME HERE";
    var nom=document.getElementsByClassName("profile-name");
    var l=nom.length;
    if(l){
     for(var y=0;y<l;y++){
         var x=nom[y];
         if(x.textContent==netflixname){
             x.parentElement.click();
         }
     }
    }
})();