// ==UserScript==
// @name         Links on Netflix - IMDB, Metacritic, Rotten Tomatoes
// @description  Add search links to Netflix titles
// @version      0.2
// @author       mica
// @namespace    greasyfork.org/users/12559
// @include      https://www.netflix.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    $('head').append(`<style>
        a.slnk {margin-right: 6px;}
        a.slnk img {width: 20px; height: 20px;}
        </style>`);
    var url;
    setInterval(function() {
        if (url != location.href) {
            url = location.href;
            setTimeout(function() {
                $('a.slnk').remove();
                if ($('.title:last').text() != '') {
                    var title = $('.title:last').text();
                } else {
                    var title = $('img.logo:last').attr('alt');
                }
                var imdb = 'https://www.imdb.com/find?s=tt&ref_=fn_tt&q=' + title;
                $('<a>').attr('href', imdb).attr('target', '_blank').addClass('slnk')
                    .html('<img src="https://www.imdb.com/favicon.ico">')
                        .appendTo('div.meta:last');
                var mc = 'https://www.metacritic.com/search/all/' + title + '/results';
                $('<a>').attr('href', mc).attr('target', '_blank').addClass('slnk')
                    .html('<img src="https://www.metacritic.com/favicon.ico">')
                        .appendTo('div.meta:last');
                var rt = 'https://www.rottentomatoes.com/search/?search=' + title;
                $('<a>').attr('href', rt).attr('target', '_blank').addClass('slnk')
                    .html('<img src="https://www.rottentomatoes.com/favicon.ico">')
                        .appendTo('div.meta:last');
            }, 1100);
        }
    }, 300);
})();
