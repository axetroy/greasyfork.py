// ==UserScript==
// @name Streamworld automatizer
// @description Automatisiert die Weiterleitung von streamworld.cc zum Hoster. Funktioniert nur, solange ReCaptcha nicht durch ungewöhnlichen Netzwerkverkehr aktiviert worden ist.
// @namespace Violentmonkey Scripts
// @match https://streamworld.cc/film/*
// @grant none
// @version 0.0.1.20190410152153
// ==/UserScript==

    var oldOnload = window.onload;

    window.onload = function () {

        if (typeof oldOnload == 'function') {
          oldOnload();
        }
      
      document.getElementsByTagName('button')[0].click();
      
    }