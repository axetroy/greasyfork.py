// ==UserScript==
// @name         MyDealz Just Deal Search
// @namespace    http://www.mydealz.de/profile/richi2k
// @version      0.2
// @description  Changes the default search to "for deals only" on mydealz.de 
// @author       richi2k
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @match        http://www.mydealz.de/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(".header-search").find(".header-search-form").append('<input type="hidden" name="type" value="1">');
    
    
})();