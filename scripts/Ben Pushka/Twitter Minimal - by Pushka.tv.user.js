// ==UserScript==
// @name        Twitter Minimal - by Pushka.tv
// @namespace   english
// @description removes suggestion boxes, info about cricket etc.  - http://pushka.com/coding-donation
// @include     http*://*twitter.com*
// @version     2.3
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==


  

var style = document.createElement('style');
style.type = 'text/css';


style.innerHTML = '         .dashboard-right{display: none;}/*\n*/#page-container{width: 88%  !important ;}.content-main {/*\n*/    /*\n*/    width: 60%;/*\n*/}.dashboard-left{    width: 35%  !important ;}       ';


document.getElementsByTagName('head')[0].appendChild(style);

 