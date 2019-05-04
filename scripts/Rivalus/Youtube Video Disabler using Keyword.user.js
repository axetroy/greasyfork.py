// ==UserScript==
// @name        Youtube Video Disabler using Keyword
// @name:id     Youtube Video Disabler dengan kata kunci
// @namespace   YoutubeVideoDisablerKeyword
// @description Disable Youtube Video base on Keyword
// @description:id  Menonaktifkan Vieo Youtube berdasarkan kata kunci
// @include     https://www.youtube.com/watch*
// @version     1.2016.1
// @grant       none
// ==/UserScript==
var f = document.querySelector('span#eow-title');
var judul = f.title.split(" ");
var kyWrd = ["pregnant"]; // Change with blocked keyword, can be an array
for (var i; i < kyWrd.length; i++)
  {
    for (var j; j < judul.length; j++) {
      if(kyWrd[i] == judul[j])
        {
          var g = document.querySelector('#movie_player');
          g.remove();
        }
    }
  }