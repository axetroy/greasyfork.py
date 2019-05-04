// ==UserScript==
// @name         qaru.site invert text
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Reverse answer text if you have adblock
// @author       Dmatrix
// @match        http://qaru.site/questions/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function reverse() {
        $('.answer-row').each(function() {
        $(this).children().first().attr("class","")
      })
    }

    $(document).ready(function() {
        setTimeout(reverse, 1000)
    });
})();