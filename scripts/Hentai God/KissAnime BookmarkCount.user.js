// ==UserScript==
// @name         KissAnime BookmarkCount
// @namespace    http://cl.1ck.me
// @version      0.3
// @description  displays the number of Anime saved in your bookmarks
// @author       You
// @match        *://kissanime.ru/BookmarkList*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var allwatched = document.getElementsByClassName("trAnime");
var watchedcomplete = 0;
var ongoing = 0;
var unwatched = 0;
var notaired = 0;
var total = allwatched.length+1;

for(var i = 0; i < allwatched.length; i++) {
    
if(allwatched[i].innerHTML.indexOf("Completed") > -1 && allwatched[i].innerHTML.indexOf('style="display: inline" class="aRead"') > -1) {
   watchedcomplete += 1;  
}
if(allwatched[i].innerHTML.indexOf("Completed") == -1 && allwatched[i].innerHTML.indexOf("Not yet aired") == -1) {
   ongoing += 1;  
}
if(allwatched[i].innerHTML.indexOf('style="display: inline" class="aUnRead"') > -1) {
   unwatched += 1;  
}
    
if(allwatched[i].innerHTML.indexOf("Not yet aired") > -1) {
   notaired += 1;  
}
    
}

document.getElementById("divListCategories"). innerHTML += "<br><br><span style='margin-right:20px;'><b>Total Anime:</b> "+total+"</span><span style='margin-right:20px;'><b>Watched:</b> "+watchedcomplete+"</span><span style='margin-right:20px;'><b>Unwatched:</b> "+unwatched+"</span><span style='margin-right:20px;'><b>Ongoing:</b> "+ongoing+"</span><span><b>Not yet aired:</b> "+notaired+"</span>";