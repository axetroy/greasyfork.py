// ==UserScript==
// @name        Dasolo/Italiashare direct links
// @namespace   StephenP
// @include     *://www.italiashare.net
// @include     *://www.italiashare.net/*
// @version     1.2
// @grant       none
// @description This script replaces ad.ly links with direct links on DaSolo/Italiashare
// ==/UserScript==
window.addEventListener('load', function() {
    var links=document.links;
    for (var i=0; i<links.length; i++) {
            if (links[i].href.search('al.ly') != -1 ){
                links[i].href = links[i].href.slice(60);
            }        
    }
}, false);
