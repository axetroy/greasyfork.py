// ==UserScript==
// @name        Add the "Explore" button to GitHub
// @author      Leandro Poblet (tw: DoctorMalboro)
// @description Adds the now missing "Explore" button to github left item bar
// @namespace   add-explore-to-github
// @include     http*://github.com/*
// @version     0.1
// @grant       none
// ==/UserScript==

var items = 	document.getElementsByClassName('header-nav left');
var item = items.item(0);

item.innerHTML += '<li class="header-nav-item"><a class="js-selected-navigation-item header-nav-link" href="/explore">Explore</a></li>';