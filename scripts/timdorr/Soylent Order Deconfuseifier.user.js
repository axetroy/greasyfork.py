// ==UserScript==
// @name         Soylent Order Deconfuseifier
// @namespace    http://timdorr.com/
// @version      1.0
// @description  Bags, not meals!
// @author       Tim Dorr <soylent@timdorr.com>
// @match        https://www.soylent.com/*
// @grant        none
// ==/UserScript==

$("#powder-quantity-select option").each(function() { 
    var meals = $(this).text().match(/^(\d+) /)[0];
    var bags = meals / 4;
    var weeks = bags / 7;
    
    $(this).text(bags + " Bags / " + weeks + " Weeks / " + meals + " Meals" );
});

$("#drink-quantity-select option").each(function() { 
    var bottles = $(this).text().match(/^(\d+) /)[0];
    var days = bottles / 5;
    
    $(this).text(days + " Days / " + bottles + " Bottles" );
});