// ==UserScript==
// @name         Same amount of likes as dislikes
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       flipxfx
// @description  Refresh till same likes as dislikes for PooPooPie
// @match        https://www.youtube.com/watch?v=pYS8Av10B00&t=46s
// ==/UserScript==

(function() {
  if (document.querySelector(".like-button-renderer-like-button span").textContent !== document.querySelector(".like-button-renderer-dislike-button span").textContent)
    window.location = window.location;
  else
    alert("SAME AMOUNT OF LIKES AS DISLIKES");
})();