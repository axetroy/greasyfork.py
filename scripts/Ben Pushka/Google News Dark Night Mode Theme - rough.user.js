// ==UserScript==
// @name        Google News Dark Night Mode Theme - rough 
// @namespace   english
// @description Google News Dark Night Mode Theme - currently undergoing build
// @include     http*://*news.google*
// @version     1.2
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==



var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '                                            html{    filter: invert(89%)hue-rotate(180deg)contrast(110%);}img{    filter: invert(110%)hue-rotate(180deg);}    ';
document.getElementsByTagName('head')[0].appendChild(style);



