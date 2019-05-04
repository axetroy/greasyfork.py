// ==UserScript==
// @name        ING Direct Website remove slider banner  - Global - by Pushka.tv
// @namespace   english
// @description Hide Divs which contain adds - all websites  - http://pushka.com/coding-donation
// @include     http*://*ingdirect.com.au*
// @version     1.8
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==

 

// Main - CSS hides some block elements and expands other main divs to 100% 
 

var style = document.createElement('style');
style.type = 'text/css';


style.innerHTML = '.ING-home-slider,#ING-home-slider{display:none !important;}';



document.getElementsByTagName('head')[0].appendChild(style);

 