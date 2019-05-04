// ==UserScript==
// @name         Swappa Price Sorter
// @namespace    http://swappa.com/
// @version      0.1
// @description  sorts phones from Swappa by price
// @author       S Mattison (Ayelis)
// @match        http://swappa.com/devices/*
// @grant        none
// ==/UserScript==

var x = $(".dev_grid").children("div").sort(function(a, b) {
    var vA = $("div", a).children(".body").children(".prices").children("a").text().trim(), vB = $("div", b).children(".body").children(".prices").children("a").text().trim();
    if (vA.indexOf("$") == 0){vA = parseInt( vA.substring(1,vA.indexOf(" - ")));vB = parseInt( vB.substring(1,vB.indexOf(" - ")));}
    return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
});
$(".dev_grid").append(x);