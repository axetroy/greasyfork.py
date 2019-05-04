// ==UserScript==
// @name        RF ticker
// @namespace   namerspacer
// @include     https://raidforums.com/index.php
// @version     1
// @grant       none
// @description is a ticker
// ==/UserScript==
window.addEventListener('load', function () {
  clearTimeout(ticker);
}, false);
document.body.innerHTML = document.body.innerHTML.replace('Refreshing WebPage In','Timer frozen at: ');