// ==UserScript==
// @name          9gag - darker style and minimalism
// @namespace     9gag_darker_style
// @version       1.0
// @description   Removes posts after voting, no need to scroll or press anything except vote button(hotkeys)
// @match         https://9gag.com/*
// @run-at        document-end
// @grant         unsafeWindow
// ==/UserScript==


if (typeof unsafeWindow === "undefined"){unsafeWindow = window;}


var r = document.querySelector(".section-header");
if(r){r.remove();}
r = document.querySelector(".section-nav");
if(r){r.remove();}
r = document.querySelector(".section-sidebar");
if(r){r.remove();}
r = document.querySelector(".featured-tag");
if(r){r.remove();}
r = document.querySelector("#top-nav")
if(r){r.style.position = "absolute";}
r = document.querySelector(".fixed-wrap-post-bar")
if(r){r.remove();}

var style = document.createElement('style');style.type = 'text/css';style.innerHTML = '.background-white {background-color: grey;} article.post-page .post-container {background-color: grey;} .post-afterbar-a.in-post-top {background-color: silver;} ';document.getElementsByTagName('head')[0].appendChild(style); // I like silver
