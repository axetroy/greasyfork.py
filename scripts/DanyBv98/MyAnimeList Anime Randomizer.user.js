// ==UserScript==
// @name         MyAnimeList Anime Randomizer
// @namespace    http://tampermonkey.com/
// @version      0.1.1
// @description  Get a random anime to watch from your list.
// @author       DanyBv
// @match        http://myanimelist.net/*list/*
// @grant        none
// ==/UserScript==

window.addEventListener("load", function(e) {
  var h = document.getElementsByTagName('head').item(0);
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "https://code.jquery.com/jquery-2.2.0.min.js";
  h.appendChild(s);
  $("head").append("<style>.btn{background:#3498db;position:fixed;background-image:-webkit-linear-gradient(top,#3498db,#2980b9);background-image:-moz-linear-gradient(top,#3498db,#2980b9);background-image:-ms-linear-gradient(top,#3498db,#2980b9);background-image:-o-linear-gradient(top,#3498db,#2980b9);background-image:linear-gradient(to bottom,#3498db,#2980b9);-webkit-border-radius:28;-moz-border-radius:28;border-radius:28px;font-family:Georgia;color:#fff;font-size:20px;padding:10px 20px;text-decoration:none}.btn:hover{background:#3cb0fd;background-image:-webkit-linear-gradient(top,#3cb0fd,#3498db);background-image:-moz-linear-gradient(top,#3cb0fd,#3498db);background-image:-ms-linear-gradient(top,#3cb0fd,#3498db);background-image:-o-linear-gradient(top,#3cb0fd,#3498db);background-image:linear-gradient(to bottom,#3cb0fd,#3498db);text-decoration:none}</style>");
  addButton();
}, false);

function addButton(){
    $('.list-container').prepend('<button id="getAnimeButton" class="btn" onclick="var animes = $(\'.list-item .list-table-data > .plantowatch\').parent().children(\'.title\').children(\'a\');alert(\'The next anime to watch is \' + animes[Math.floor(Math.random() * animes.length)].text + \'!\');">Get random Anime</button>');
}