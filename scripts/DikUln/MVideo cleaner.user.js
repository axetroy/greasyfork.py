// ==UserScript==
// @name         MVideo cleaner
// @namespace    http://www.mvideo.ru/
// @version      0.1
// @description  cleans mvideo from not priced goods
// @author       DikUln
// @include        http://*mvideo.ru/*
// @grant        none
// ==/UserScript==

(function(){
       
    $(".product-tile-checkout-section:not(:has(.product-price))").parent().parent().parent().hide();
    
})();