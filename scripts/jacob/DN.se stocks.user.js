// ==UserScript==
// @name           DN.se stocks
// @locale en
// @description    Hides the stock market graph from the main page
// @include        http://*.dn.se/*
// @version 0.0.1.20150526161542
// @namespace https://greasyfork.org/users/8022
// ==/UserScript==


(function() {

var temperature = document.getElementById('temperature-widget-wrap');
if (temperature) {
    temperature.parentNode.removeChild(temperature);
}
var bors = document.getElementById('indices-chart-control');
if (bors) {
    bors.parentNode.removeChild(bors);
}

})();