// ==UserScript==
// @name         Swappa Out of Stock Phone Remover
// @namespace    http://swappa.com/
// @version      0.1
// @description  removes out of stock phones from Swappa
// @author       S Mattison (Ayelis)
// @match        http://swappa.com/devices/*
// @grant        none
// ==/UserScript==

var badDivs = $(".prices:contains('$0')").parent().parent().parent();

badDivs.remove ();