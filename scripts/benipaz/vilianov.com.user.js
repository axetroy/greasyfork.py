// ==UserScript==
// @name        vilianov.com
// @namespace   http://vilianov.com
// @include     http://vilianov.com/*
// @version     1
// @grant       none
// @author	    benipaz
// @description Remove all unnecessary blocks from page.
// ==/UserScript==

function GM_addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

GM_addStyle('#side-bar {display:none !important;}');
GM_addStyle('#yandex_ad {display:none !important;}');
GM_addStyle('#related-posts {display:none !important;}');
GM_addStyle('#content {width:100% !important;}');