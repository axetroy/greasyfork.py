// ==UserScript==
// @name           Hide Self-Serve Advertising Link on Reddit
// @description:en If you have that annoying little link stuck forever on your reddit pages, heres a simple way to remove it.
// @namespace      www.reaverxai.com
// @include        https://www.reddit.com/*
// @version 0.0.1.20150910071544
// @description If you have that annoying little link stuck forever on your reddit pages, heres a simple way to remove it.
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

addGlobalStyle('.tabmenu li:nth-child(9), .tabmenu li:nth-child(8) {display: none;}');