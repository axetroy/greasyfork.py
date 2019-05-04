// ==UserScript==
// @name        Astro Empires White Background
// @namespace   http://www.astoempires.com
// @description Changes background to white
// @include     *.astroempires.com/*
// @version     1
// @grant       none
// ==/UserScript==
var queries=['link[rel=stylesheet][href]','style'];
        for (var i=0;i<queries.length;i++){
            var remove=document.querySelectorAll(queries[i]);
            for (var j=0;j<remove.length;j++){
                remove[j].outerHTML='';
            }
        }
        var inline=document.querySelectorAll('*[style]');
        for (var i=0;i<inline.length;i++){
            inline[i].removeAttribute('style');
        }