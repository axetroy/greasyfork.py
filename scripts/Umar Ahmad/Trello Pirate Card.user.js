// ==UserScript==
// @name         Trello Pirate Card
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  trello change normal aging transparency to pirate style
// @author       Umar Ahmad
// @match        https://trello.com/
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  function render() {
    var obj = document.getElementsByClassName('aging-regular');
    Object.keys(obj).forEach(function(el) {
      el = obj[el];
      el.classList.add('aging-pirate');
      el.style.opacity = 1;
    });
  }
  setTimeout(render, 800);
  setInterval(render, 2000);
})();
