// ==UserScript==
// @name         Wykop - Dodatkowe godziny
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Dodaje dodatkowy zakres godzin gorących na mikroblogu.
// @author       Robinxon
// @match        https://www.wykop.pl/mikroblog/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $( "p.info" ).next().prepend( '<li><a href="https://www.wykop.pl/mikroblog/hot/ostatnie/1/" title="">1h</a></li><li><a href="https://www.wykop.pl/mikroblog/hot/ostatnie/3/" title="">3h</a></li>' );
})();