// ==UserScript==
// @name        cPanel BG Dark Mode Night Theme
// @namespace   english
// @description cPanel BG Dark Mode Night Theme - simple grey red 
// @include     http*://*/paper_lantern/*
// @version     1.2
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==

 

var style = document.createElement('style');
style.type = 'text/css';

style.innerHTML = '        body,html,html body{background-color: #262626 !important ;background: #262626 !important ;  }     ';

document.getElementsByTagName('head')[0].appendChild(style);
