// ==UserScript==
// @name        zz Reddit The Button Show Cheaters
// @namespace   english
// @description Reddit The Button Show Cheaters by editing the flair - pink with purple text 
// @include     http*://*reddit.com/r/thebutton*
// @version     1.11
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==

// Main - Reddit The Button Show Cheaters


var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.flair-cheater {  color: #7718AE;  background: #E5BBF4;}';
document.getElementsByTagName('head')[0].appendChild(style);

