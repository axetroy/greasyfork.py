// ==UserScript==
// @name         Seasonvar sibar killer
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Removes the add sidebar
// @author       Wise Koala
// @match        *://seasonvar.ru/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    var $ = window.jQuery;
    var jQuery = window.jQuery;

    setTimeout(function() {
        var $iframe = $(".lside-player iframe");
        $iframe.remove();
        var $table = $(".lside-player div");
        $table.remove();
    }, 1000);
})();