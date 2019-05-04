// ==UserScript==
// @name        zz Reddit - add large break between comment threads
// @namespace   english
// @description Reddit The Button Show Cheaters  - http://pushka.com/coding-donation
// @include     http*://*reddit.com*
// @version     1.14
// @run-at document-end
// @grant       GM_addStyle

// ==/UserScript==
// Main - Reddit The Button Show Cheaters

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.commentarea .sitetable.nestedlisting>.comment {  margin-bottom: 25px !important;  border-bottom: 8px solid #d5d5d5 !important;  padding-bottom: 25px !important;}';
document.getElementsByTagName('head')[0].appendChild(style);

