// ==UserScript==
// @name         简书
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.jianshu.com/p/*
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

(function() {
    'use strict';

$(".post").css("margin","0 100px").css("width","auto");
$("#web-note-ad-fixed").remove();

})();