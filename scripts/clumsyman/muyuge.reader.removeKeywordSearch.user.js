// ==UserScript==
// @name        muyuge.reader.removeKeywordSearch
// @namespace   clumsyman
// @description remove the keyword search links in the story text, which are very anonying when you clicked accidentially.
// @include     http://muyuge.com/*/*.html
// @include     http://muyuge.net/*/*.html
// @include     http://www.muyuge.net/*/*.html
// @version     1
// @grant       unsafeWindow
// ==/UserScript==

var links = document.querySelectorAll('#content a[href*=searchkey]');
for (var i = 0; i < links.length; i++) {
    var link = links[i];
    //link.removeAttribute('href');
    link.outerHTML = link.text;
}