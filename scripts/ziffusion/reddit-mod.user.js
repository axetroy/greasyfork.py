// ==UserScript==
// @name         reddit-mod
// @namespace    http://www.ziffusion.com/
// @description  Toggle comment expand on mod log
// @author       ziffusion
// @match        https://old.reddit.com/r/therapy/about/log
// @grant        none
// @version      0.4
// ==/UserScript==

window.addEventListener('load', function() {
  var elem = document.getElementsByClassName("activate-comment-load tb-general-button")[0];
  if (elem) elem.click();
});