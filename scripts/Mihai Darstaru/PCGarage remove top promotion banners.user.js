// ==UserScript==
// @name         PCGarage remove top promotion banners
// @namespace    
// @version      0.1
// @description  Remove top promotion banners for a cleaner look.
// @author       Mihai Darstaru
// @match        http://www.pcgarage.ro/*
// @grant        none
// ==/UserScript==



function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function removeContainer(className) {
     var div = document.getElementsByClassName(className)[0];

    if (div) {
        div.style.display = "none";
    }
}


removeContainer("slider-category")
removeContainer("lrt-row")
addGlobalStyle('.main-content{ top: 20px  !important; }');