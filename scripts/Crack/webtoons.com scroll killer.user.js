// ==UserScript==
// @name         webtoons.com scroll killer
// @namespace    https://github.com/Crack/webtoons.com-scroll-killer
// @description  Restores normal behaviour of down and up keys on webtoons.com
// @version      1.0
// @match        http://www.webtoons.com/*
// @grant        none
// ==/UserScript==

function copyFunction(source) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = "" + source;

  document.body.appendChild(script);
  document.body.removeChild(script);
}

function movePrevious(){}
function moveNext(){}

copyFunction(movePrevious);
copyFunction(moveNext);