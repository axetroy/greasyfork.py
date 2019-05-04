// ==UserScript==
// @name     Quick YouTube Fix for /watch page
// @version  2
// @match https://www.youtube.com/*
// @description:en Fixes the new YouTube bug from today that messed up the /watch page.
// @namespace https://greasyfork.org/users/205394
// @description Fixes the new YouTube bug from today that messed up the /watch page.
// ==/UserScript==


setInterval(function(){
        document.getElementById('content').setAttribute("class","content-alignment");
    }, 100);


