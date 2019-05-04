// ==UserScript==
// @name         AO3-navigate-arrows
// @namespace    a03-navigate-arrows
// @version      0.1
// @description  Arrow Keys used to navigate chapters
// @author       ecool
// @match        http://archiveofourown.org/works/*/chapters/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';
    $('html').keydown(function (e) {
        if(e.keyCode == 37) {
            location.href = $('li.chapter.previous').children('a').attr('href');
        }
        if(e.keyCode == 39) {
            location.href = $('li.chapter.next').children('a').attr('href');
        }
    });
})(jQuery);