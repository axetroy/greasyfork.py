// ==UserScript==
// @name        Multi Simple Website Dark Theme Night Mode - light sites 
// @namespace   english
// @description Multi Website Dark Theme Night Mode Simple 
// @include     http*://*telstra.com*
// @version     1.3
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==

// Main - Collapse the Greasy Fork Header

var style = document.createElement('style');
style.type = 'text/css';

style.innerHTML = '         body {     filter:invert(100%)hue-rotate(180deg)brightness(130%)contrast(83%)saturate(90%); } /* width *//*\n*/::-webkit-scrollbar {/*\n*/    min-width: 5px;/*\n*/}/*\n*//*\n*//* Track *//*\n*/::-webkit-scrollbar-track {/*\n*/    box-shadow: inset 0 0 5px grey; /*\n*/    border-radius: 3px;/*\n*/    background:#999/*\n*/}/*\n*/ /*\n*//* Handle *//*\n*/::-webkit-scrollbar-thumb {/*\n*/    background: #666;  /*\n*/}/*\n*//*\n*//* Handle on hover *//*\n*/::-webkit-scrollbar-thumb:hover {/*\n*/    background: #444; /*\n*/}       ';

document.getElementsByTagName('head')[0].appendChild(style);
