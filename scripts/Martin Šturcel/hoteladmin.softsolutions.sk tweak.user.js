// ==UserScript==
// @name         hoteladmin.softsolutions.sk tweak 
// @namespace    http://sturcel.sk/martin/
// @version      0.33
// @description  oprava desatinnej čiarky a desatinnej bodky...  
// @author       Martin Sturcel
// @match 		*://hoteladmin.softsolutions.sk/hotels/*
// @grant        none
// ==/UserScript==

// ==UserScript==
// @name         hoteladmin.softsolutions.sk tweak 
// @namespace    http://sturcel.sk/martin/
// @version      0.32
// @description  oprava desatinnej čiarky a desatinnej bodky...  
// @author       Martin Sturcel
// @match 		*://hoteladmin.softsolutions.sk/hotels/*
// @grant        none
// ==/UserScript==


var elmLink = document.getElementById('reservationPriceConfirm');
elmLink.type = 'number';
