// ==UserScript==
// @name         Chrome Addon Bypass Olam-hamedia + Countdown Bypass
// @namespace    *
// @version      0.2
// @description  עוקף את הצורך בהורדת התוסף הזדוני לכרום
// @author       securem3
// @match        *://www.olamha-media.com/*.html
// @grant        none
// ==/UserScript==

window.addEventListener('load', function() {
    var p = document.getElementsByTagName("iframe");
    for(var i = 0; i < p.length; i++){ p[i].style.pointerEvents="inherit";}
    var d = document.getElementsByTagName("embed");
    for(var i = 0; i < d.length; i++){ d[i].style.pointerEvents="inherit";}
    var m = document.getElementsByClassName("post")[0];
    var jw = document.getElementById("playerjxJRqLMFuJaA_wrapper");
    if(!jw){
        jw = document.getElementById("playermp1oV4sC52xR_wrapper");
    }
    if(jw){
        jw.style.pointerEvents = "inherit";
    }
    m.removeEventListener("click",down);
    //timer bypass by yakov buzaglo
    $("#timer-frame").hide();
    $("#action-frame").show();
    clearInterval(counter);
}, false);

