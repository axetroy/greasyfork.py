// ==UserScript==
// @name        zz SLIMG Image Host Site Minify
// @namespace   english
// @description SLIMG Image Host Site Minify - compact minimal
// @include     http*://*sli.mg*
// @version     1.4
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==


// Main - CSS hides two classes - video add box, and call to action box under it. - also social media

 
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '               .mlog img{display:none !important ;} #hd img{    top: 15px !important ;    left: 15px !important ;    height: 28px !important ;    width: auto !important ;} html, body {     color: #A5A5A5 !important ; } .hdbut {     color: #CACACA !important ; }#ft a {     color: #9E0A0A  !important ; }                    ';
document.getElementsByTagName('head')[0].appendChild(style);

 