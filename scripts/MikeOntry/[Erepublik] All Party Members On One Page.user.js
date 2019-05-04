// ==UserScript==
// @name         [Erepublik] All Party Members On One Page
// @match        *://www.erepublik.com/en/main/party-members/*
// @version      0.1
// @description  Shows all members on one page
// @author       Mike Ontry
// @grant        none
// @namespace https://greasyfork.org/users/3941
// ==/UserScript==

var all = document.getElementsByClassName('pager');
for (var i = 0; i < all.length; i++) {
  all[i].style.display = 'none';
}

var all = document.getElementsByClassName('pages');
for (var i = 0; i < all.length; i++) {
  all[i].style.display = 'block';
}