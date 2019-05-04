// ==UserScript==
// @name         Flat Design for T411
// @version      1.0
// @namespace    https://www.t411.ai
// @description  Thème Flat Design pour T411
// @author       M1st3rN0b0d7
// @match        https://www.t411.ai/*
// @grant        none
// ==/UserScript==

if(!document.getElementById("FlatDesign")){
    var head   = document.getElementsByTagName('head')[0];
    var link   = document.createElement('link');
    link.id    = "FlatDesign";
    link.rel   = 'stylesheet';
    link.type  = 'text/css';
    link.href  = 'https://rawgit.com/M1st3rN0b0d7/t411-FlatDesign/master/style.css';
    link.media = 'all';
    head.appendChild(link);
}
