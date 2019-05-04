// ==UserScript==
// @name        Gif2Cage
// @namespace   https://github.com/ryanford-frontend/gif2cage
// @description Remove annoying gifs and replace them with something more... satisfying
// @match       *.gitter.im/*
// @version     0.0.1
// @license     https://opensource.org/licenses/MIT
// ==/UserScript==

let imgs = [];

function findGifs() {
  imgs = document.querySelectorAll("img");

  imgs.forEach((img) => {
    if (img.src.substr(-3) == "gif") {
      let rand = String(Math.floor(Math.random() * 80)),
           url = "http://cageme.herokuapp.com/specific/" + rand;
      img.src = url;
      img.alt = "The One True Cage";
      img.parentElement.href = url;
    }
  });
}

window.addEventListener("DOMNodeInserted", findGifs);
