// ==UserScript==
// @name        Facebook dark night mode black / white - monochrome no colour
// @namespace   english
// @description Facebook dark night mode black / white  monochrome no colour
// @include     http*://*facebook.com*
// @version     1.5
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==

// Main - Collapse the Greasy Fork Header

var style = document.createElement('style');
style.type = 'text/css';

style.innerHTML = '          html{filter:  invert(100)grayscale(100%)contrast(110%) !important ;} html img{filter: invert(100)  !important ;}     ';

document.getElementsByTagName('head')[0].appendChild(style);
