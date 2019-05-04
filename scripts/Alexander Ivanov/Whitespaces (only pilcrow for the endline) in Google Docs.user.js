// ==UserScript==
// @name          Whitespaces (only pilcrow for the endline) in Google Docs
// @description   Adds whitespaces (only pilcrow for the endline) in Google Docs.
// @namespace     https://github.io/oshliaer
// @domain        docs.google.com
// @include       http://docs.google.com/*
// @include       https://docs.google.com/*
// @author        +AlexanderIvanov
// @developer     +AlexanderIvanov
// @version       2017.2.15
// @grant         GM_addStyle
// @icon          https://gist.github.com/pp/pp/raw/icon.png
// @screenshot    https://gist.github.com/pp/pp/raw/screenshot.png
// @license       WTFPL; http://www.wtfpl.net/txt/copying
// ==/UserScript==

var style = '.goog-inline-block.kix-lineview-text-block:after{content:"¶";}';

GM_addStyle(style);