// ==UserScript==
// @name         eBonus.gg Google AdRemoval Only but video Ads remain
// @namespace    Mr. Funny Guy
// @version      1.3
// @description  Remove irritating google ads causing PC lags but video Ads remain
// @author       Mr. Funny Guy (Watch Dailymotion: https://www.dailymotion.com/funvideoclips )
// @match        *://ebonus.gg/earn-coins/*
// @grant        none
// ==/UserScript==

'use strict';
//Make things easy
function delAds(eID){
    if (document.getElementById(eID)){
        document.getElementById(eID).remove();
    }
}
//Do the job
setInterval(function() {
    var adsA=document.getElementsByClassName("")[0];
    delAds("ebonus_billboard");
    delAds("ebonus_sidebar_top");
    delAds("ebonus_sidebar_mid");
    delAds("ebonus_midview");
    delAds("ebonus_footer");
    if(adsA){
        adsA.remove();
    }
},1000);