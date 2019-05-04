// ==UserScript==
// @name         JEP Online - No Registration
// @namespace    http://your.homepage/
// @version      0.1
// @description  Remove http://jerseyeveningpost.com Login/Authentication Requirement which hides article content
// @author       Sin_Chase
// @match        http://jerseyeveningpost.com/news/*
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

addGlobalStyle('.content { height: auto !important; }');
addGlobalStyle('.rauth-registration { display: none !important; }');