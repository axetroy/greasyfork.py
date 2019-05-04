// ==UserScript==
// @name         Youtube Fix (projanmo)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Youtube fix for projanmo forum
// @author       Saiful Isalm
// @match        https://forum.projanmo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $.each($("p>object a"), function() {
        var url = $(this).attr('href').replace('http://', 'https://');
        url = url.replace('watch?v=', 'embed/');
        var html = '<iframe width="640" height="360" src="' + url + '" frameborder="0" allowfullscreen></iframe>';
        $(this).parents("p:first").html(html);
    });
})();