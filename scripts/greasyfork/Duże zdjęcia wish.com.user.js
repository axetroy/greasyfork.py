// ==UserScript==
// @name        Duże zdjęcia wish.com
// @description Po kliknięciu na zdjęciu otwiera zdjęcie w nowej karcie
// @namespace   http://r4v.pl
// @include     http*://wish.com/*
// @include     http*://www.wish.com/*
// @version     2.1
// ==/UserScript==

    $(".contest-picture").click(function() {
        var style = $(this).attr("style");
        style = style.replace("background-image: url(", "");
        style = style.replace(");", "");
        style = style.replace("contest", "original");
        window.open(style);
    })