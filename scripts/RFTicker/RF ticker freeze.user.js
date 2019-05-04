// ==UserScript==
// @name        RF ticker freeze
// @namespace   RFTICKER
// @include     https://raidforums.com/
// @version     1
// @grant       none
// @description is a ticker
// ==/UserScript==
window.addEventListener('load', function () {
  clearTimeout(ticker);
}, false);
document.body.innerHTML = document.body.innerHTML.replace('Refreshing WebPage In','Timer frozen at: ');