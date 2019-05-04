// ==UserScript==
// @name        animeshow.tv history
// @namespace   s
// @description Adds visited state to links on http://animeshow.tv using browser history
// @include     http://animeshow.tv/* 
// @include     http://www.animeshow.tv/* 
// @version     2
// @grant       none
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('a:visited .e_l_h { color:#808080; }');
