// ==UserScript==
// @name        KissAnime - Step 02
// @namespace   jpsouzasilva@@
// @include     http://kissanime.to/Anime/*/*
// @version     1
// @grant       none
// @description KissAnime - Step 02 [needs 01]
// @description:en KissAnime - Step 02 [needs 01]
// ==/UserScript==

var interval = setInterval(function () {
  if (document.getElementById("divDownload")!=null) {
    //clearInterval(interval);
    localStorage.setItem(document.title, document.getElementById("divDownload").firstChild.nextSibling.href);
    window.close();
  }
},100);