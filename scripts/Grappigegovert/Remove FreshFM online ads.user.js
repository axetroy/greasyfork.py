// ==UserScript==
// @name         Remove FreshFM online ads
// @namespace    http://www.grappigegovert.com/
// @version      1.0
// @description  Removes ads from FreshFMonline.com
// @match        http://www.freshfmonline.com/
// @copyright    2014, GrappigegovertProductions
// @grant        none
// ==/UserScript==

var iframes = document.getElementsByTagName('iframe');
for (var i = 0; i < iframes.length; i++) {
    iframes[i].parentNode.removeChild(iframes[i]);
}