// ==UserScript==
// @name        block google search bs alerts
// @namespace   *.youtube.*
// @description removes logo and alerts for cookieless/javascriptless google ssl vertbatim searches
// @include     *.youtube.*
// @version     1.01
// @grant       none
// ==/UserScript==


var removeElements = function(){
    var x = document.querySelectorAll('#alerts')[0];
    while (x.firstChild) {
        x.removeChild(x.firstChild);
    }
    x.style.width = 0;
    x.style.display = 'none';
    var x = document.querySelectorAll('#logo-container')[0];
    while (x.firstChild) {
        x.removeChild(x.firstChild);
    }
    x.style.width = 0;
    x.style.display = 'none';
    
};

removeElements();