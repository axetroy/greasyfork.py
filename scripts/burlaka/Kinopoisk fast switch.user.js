// ==UserScript==
// @name         Kinopoisk fast switch
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Quick switch kinopoisk sorting
// @author       Burlaka.net
// @match       *://kinopoisk.ru/*
// @match       *://*.kinopoisk.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var url = window.location.href;
    var nametrigger;

    if(url.indexOf('www.kinopoisk.ru/name/') != -1) {
        $('.sort_people_name').css('cursor', 'pointer').hover(function() {
            $(this).css("color", "#f60");
        }, function(){
            $(this).css("color", "#333");
        }).click(function() {
            if (nametrigger == '1') {
                location.hash = "!all";
                nametrigger = 0;
            }
            else {
                location.hash = "!/sort/kp/";
                nametrigger = '1';
            }
        });
    }
    // little corrections for instagram window
    $('.rg-image-wrapper').css('background','#2f2f2f');
    $('.rg-caption li').css('padding','7px');
})();