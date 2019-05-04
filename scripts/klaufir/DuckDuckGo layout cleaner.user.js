// ==UserScript==
// @name         DuckDuckGo layout cleaner
// @namespace    duckduckgo_layout_cleaner
// @description  Remove useless clutter from duckduckgo.com
// @match        *://duckduckgo.com/*
// @grant        none
// @run-at       document-end
// @encoding     utf-8
// @version 0.0.1.20181024124048
// ==/UserScript==

function removeByClass(clsname) {
    var a1 = document.getElementsByClassName(clsname);
    for(var i=0;i<a1.length;i++) a1[i].parentNode.removeChild(a1[i]);
}

(function() {
    setTimeout(function() {
    removeByClass("header--aside__item");
    removeByClass("header--aside__item social");
    removeByClass("feedback-prompt");
    removeByClass("js-feedback-btn-wrap");
    removeByClass("footer");
  }, 1000);
})();