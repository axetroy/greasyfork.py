// ==UserScript==
// @name        Who.is Remove Dross - by Pushka.tv
// @namespace   english
// @description Removes non-essential blocks from who.is website  - http://pushka.com/coding-donation
// @include     http*://*who.is*
// @version     1.34
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==


// Main - CSS hides two classes - video add box, and call to action box under it. - also social media

 
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.site-nav{margin: 0 auto !important;  text-align: center !important;  position: relative !important;  float: none !important;}.name-dot-com-video,.call-to-action,.social,.fullwidth, .bgdarkgray{display:none !important;}';
document.getElementsByTagName('head')[0].appendChild(style);

 





