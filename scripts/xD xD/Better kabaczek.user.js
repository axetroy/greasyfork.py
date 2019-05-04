// ==UserScript==
// @name        Better kabaczek
// @namespace   kabaczek.ork
// @description extension for kabaczek
// @version     2.1.3.9 FULL RETAIL ORIGINAL VERSION
// @update      https://greasyfork.org/scripts/7219-better-kabaczek/code/Better%20kabaczek.user.js
// @icon        http://img1.wikia.nocookie.net/__cb20140313234344/sek/pl/images/4/4c/Logo_karachan.jpg
// @grant       GM_addStyle
// @match       *://*.kara.8ch.net/*
// @match       *://*.karachan.org/*
// ==/UserScript==

  var boardDesc=document.querySelectorAll("div.boardTitle")[0];
  if (boardDesc.innerHTML.split(" ")[0]=="/b/") {
    boardDesc.innerHTML = "/b/ - Random";
    document.title="/b/ - Random";
    document.location.replace('http://agor.io);
    document.getElementById("postform").remove();
  }
