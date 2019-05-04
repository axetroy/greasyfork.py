// ==UserScript==
// @name         KissAnime watch where you left off
// @namespace    http:///cl.1ck.me
// @version      1.0
// @description  Enables you to watch an anime from the exact second you left off.
// @author       TheTh0rus
// @match        *://kissanime.ru/Anime/*
// @grant        none
// ==/UserScript==
var aniName = window.location.href.split("/")[4];

if(window.location.href.indexOf("?id=") == -1) {
    
    var list = document.getElementsByClassName("listing")[0];
    
    if(getCookieValue(aniName) !== '') {
    list.innerHTML = "<center><b><a href='" + getCookieValue(aniName).split("~")[0] + "'>Watch where you left off!</a></b></center><br><br>" + list.innerHTML;
    }
    
} else {
    
    if(getCookieValue(aniName) !== '') {
        
        if(window.location.href == getCookieValue(aniName).split("~")[0]) {
            
            my_video_1_html5_api.currentTime = getCookieValue(aniName).split("~")[1];
            
        }
        
    }
    
    var expiration_date = new Date();
    expiration_date.setFullYear(expiration_date.getFullYear() + 20);
    
    setInterval(function() { setCookie(aniName, expiration_date); }, 1000);
    
}

function setCookie(aniName, expiration_date) {
    
    document.cookie = "" + aniName + "=" + window.location.href + "~" + my_video_1_html5_api.currentTime + "; expires=" + expiration_date.toUTCString() + "; path=/";
    console.log("set");    
}


function getCookieValue(a) {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}