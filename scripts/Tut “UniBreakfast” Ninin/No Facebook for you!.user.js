// ==UserScript==
// @name No Facebook for you!
// @namespace Violentmonkey Scripts
// @match https://www.facebook.com/
// @description  try to take over the world!
// @grant none
// @version 0.0.1.20181114154427
// ==/UserScript==

document.onload = setTimeout(()=>{
  document.body.remove()
  var el = document.createElement('style')
  el.textContent = 'html{background:red!important}'
  document.head.appendChild(el);
}, 0)