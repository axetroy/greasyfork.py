// ==UserScript==
// @name         fuck yifile
// @version      0.0.3
// @description  fuck yifile!
// @match        https://www.yifile.com/*
// @grant        none
// @run-at       document-end
// @namespace http://tampermonkey.net/
// ==/UserScript==

(function() {
    'use strict';
    window.onload = function () {
      $(".newfdown").remove()
      $('html, body, .content').animate({scrollTop: $(document).height() - 800}, 1000);
      downboot();
    };
})();