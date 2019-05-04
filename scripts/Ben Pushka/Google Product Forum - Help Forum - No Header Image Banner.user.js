// ==UserScript==
// @name        Google Product Forum - Help Forum - No Header Image Banner
// @namespace   english
// @description Google Product Forum - Help Forum - No Header Image Banner  - http://pushka.com/coding-donation
// @include     http*://*productforums.google.com/forum*
// @version     4.5
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==


// Main - CSS hides some block elements and expands other main divs to 100% 
 

var style = document.createElement('style');
style.type = 'text/css';


style.innerHTML = '    .A0FHG6C-T-O,A0FHG6C-o-a.{display: none !important;} 

      ';
  

document.getElementsByTagName('head')[0].appendChild(style);

 
