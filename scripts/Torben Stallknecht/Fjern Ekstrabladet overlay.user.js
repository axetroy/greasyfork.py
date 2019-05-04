// ==UserScript==
// @name         Fjern Ekstrabladet overlay
// @namespace    https://hamdenkloge.dk/
// @downloadUrl  https://hamdenkloge.dk/code/eb.js
// @version      0.8
// @description  Fjerner irriterende overlay på Ekstrabladet, når man benytter ad-blocker
// @author       stallemanden
// @match        https://ekstrabladet.dk/*
// @grant        none
// ==/UserScript==

(function () {

  var xx = document.querySelectorAll("div");

  for (var i = 0; i < xx.length; i++) {
    if (xx[i].style.zIndex == "997979") {
      xx[i].remove();
    }
  }
})();