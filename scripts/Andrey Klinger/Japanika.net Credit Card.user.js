// ==UserScript==
// @name           Japanika.net Credit Card
// @namespace      andrey
// @description    Allows credit-card autofill on japanika.net
// @include        https://www.japanika.net/*
// @grant          none
// @version	   0.1
// ==/UserScript==
//
// 2014-11-05
//
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)

var elements = document.querySelectorAll('input[autocomplete=off]')

for (i = 0; i < elements.length; i++) {
  var element = elements[i];
  element.autocomplete = "on";
}
