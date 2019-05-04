// ==UserScript==
// @name         crunchyroll html5 official player
// @namespace    http://www.crunchyroll.com
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http://www.crunchyroll.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //
    // Your code here...
     var theCookies = document.cookie.split(';');
    var aString = '';
    var existe=false;
    for (var i = 1 ; i <= theCookies.length; i++) {
        if(theCookies[i-1]=="VILOS_ROLLOUT=9d5ed678fe57bcca610140957afab571_4"){
        existe=true;
        }
        if(theCookies[i-1]=="VILOS_ROLLOUT=7fc56270e7a70fa81a5935b72eacbe29_4"){
         document.cookie = "VILOS_ROLLOUT=7fc56270e7a70fa81a5935b72eacbe29_4" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }
    if(!existe){
           document.cookie="VILOS_ROLLOUT = 9d5ed678fe57bcca610140957afab571_4";
        }
})();