// ==UserScript==
// @name         Steam Gifts Archive Link to Winners
// @namespace    https://www.steamgifts.com/user/lext
// @version      0.1
// @description  Add links to Winners to Archive results
// @author       Lex
// @match        *://www.steamgifts.com/archive/*
// @require      http://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $(".table__column--width-fill a.table__column__heading").each(function(){
        let link = this.getAttribute("href");
        if (link !== null)
            $(this).parent().append(`<a href="${link}/winners"> - Winners</a>`);
    });
})();