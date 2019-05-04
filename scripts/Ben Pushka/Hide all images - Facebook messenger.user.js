// ==UserScript==
// @name        Hide all images - Facebook messenger 
// @namespace   english
// @description Hide all images - Facebook messenger - make all tiny thumbnails
// @include     http*://*messenger.com*
// @version     1.7
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==



var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '          img, body img, html img, body div img, video{width:15px !important;height:auto !important;} div{background-size: 22px !important;}  .sp_N1ER1bkS1OC{filter:sepia(100%);}          ';
document.getElementsByTagName('head')[0].appendChild(style);

 


