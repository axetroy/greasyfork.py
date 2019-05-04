// ==UserScript==
// @name        ebay-map
// @namespace   pureandapplied.com.au
// @description adds map for ebay
// @include     *.ebay.com.*
// @version     1
// @grant       none
// ==/UserScript==
var locationElement = document.getElementById("itemLocation");
var searchTerm = locationElement.innerText.split("\n")[2];
locationElement.querySelectorAll('span')[0].innerHTML = '<a href="https://www.google.com/maps?q=' + searchTerm + '" target="blank">' + searchTerm + '</a>';