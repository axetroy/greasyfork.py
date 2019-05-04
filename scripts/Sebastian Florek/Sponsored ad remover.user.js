// ==UserScript==
// @name Sponsored ad remover
// @description Removes sponsored ads from main Wykop page
// @match *://www.wykop.pl/*
// @version 0.0.1.20150217151321
// @namespace https://greasyfork.org/users/9207
// ==/UserScript==
var classList = document.getElementsByClassName('diggbox');
for(i = 0; i<classList.length; i++) {
    var classObj = classList[i];
    if(classObj.innerHTML.indexOf("paylink") > -1) {
        classObj.parentNode.parentNode.parentNode.removeChild(classObj.parentNode.parentNode);
    }
}