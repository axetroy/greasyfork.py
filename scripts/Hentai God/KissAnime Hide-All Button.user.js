// ==UserScript==
// @name         KissAnime Hide-All Button
// @namespace    http://kiss.anime.com
// @version      1.1.2
// @description  A "Hide all"-Button for Kissanime.com/.to
// @author       TheTh0rus
// @match        *://kissanime.ru/Anime/*
// @grant        none
// ==/UserScript==

var hideall = document.createElement("A");
hideall.setAttribute('id','hideall');
hideall.setAttribute('onclick','document.getElementById("hideall").innerHTML = "Hidden!"; var frames = document.getElementsByTagName("IFRAME"); for(var f = 0; f < frames.length; f++) { frames[f].setAttribute("style", "visibility: hidden;"); frames[f].setAttribute("src", "0"); frames[f].setAttribute("height", "1px"); frames[f].setAttribute("width", "1px"); } var ads = document.getElementsByTagName("A"); for(var i = 0; i < ads.length; i++) { if(ads[i].innerHTML == "Hide") { ads[i].setAttribute("style", "visibility: hidden;") } }');
hideall.setAttribute("style","text-align:center;font-size:12pt;");
hideall.innerHTML = "Hide all Ads!";
document.getElementsByClassName("barContent")[0].children[0].children[1].appendChild(hideall);