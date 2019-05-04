// ==UserScript==
// @name StackExchange obvious followed link color
// @namespace http://ostermiller.org/
// @version 1.01
// @description Change the color of followed links on all StackExchange sites so they they are easily distinguishable.
// @include /https?\:\/\/([a-z\.]*\.)?stackexchange\.com\/.*/
// @include /https?\:\/\/([a-z\.]*\.)?askubuntu\.com\/.*/
// @include /https?\:\/\/([a-z\.]*\.)?superuser\.com\/.*/
// @include /https?\:\/\/([a-z\.]*\.)?serverfault\.com\/.*/
// @include /https?\:\/\/([a-z\.]*\.)?stackoverflow\.com\/.*/
// @include /https?\:\/\/([a-z\.]*\.)?answers.onstartups\.com\/.*/
// @grant none
// ==/UserScript==

function addCss(cssString) {
    var newCss = document.createElement('style');
    newCss.type = "text/css";
    newCss.innerHTML = cssString;
    document.getElementsByTagName('head')[0].appendChild(newCss);
}

addCss (
    '.question-hyperlink:visited, .result-link a:visited {color: #9C7816 ! important;}'
); 