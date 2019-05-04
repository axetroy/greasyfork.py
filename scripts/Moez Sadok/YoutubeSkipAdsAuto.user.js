// ==UserScript==
// @name         YoutubeSkipAdsAuto
// @namespace    M.Sadok
// @version      0.1
// @description  Youtube skip ads!
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var currentUrl="";
jQuery(function ($){
    currentUrl = window.location.href;
    setTimeout(skipAd, 4000);
    setInterval(checkPageChange,2000);
});

function checkPageChange(){
    var oldUrl = currentUrl;
    var newUrl=window.location.href;
    //check if the url is changed
    if( newUrl !== oldUrl ){
       setTimeout(skipAd, 4000);
       setCurrentUrl(newUrl);
    }
}
function skipAd(){
    if ($(".videoAdUiSkipContainer ").css("display") === "none") {
        //--- Not found skip button"
        setTimeout(skipAd, 1000);
    }else{
        //"--- Skip button found :) -> click it");
        $('.videoAdUiSkipButton').click();
    }
}
function setCurrentUrl(url){
    currentUrl=url;
}
