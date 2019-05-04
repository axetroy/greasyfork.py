// ==UserScript==
// @name Pixlr Editor Remove Sidebar
// @namespace Pixlr Editor Remove Sidebar
// @description Your Adblocker remove ads, This user script inject css to remove the blank sidebar.
// @author SMed79
// @version 1.1
// @encoding utf-8
// @license https://creativecommons.org/licenses/by-nc-sa/4.0/
// @icon http://i.imgur.com/Tm0b4t0.png
// @twitterURL https://twitter.com/SMed79
// @contactURL http://tinyurl.com/contact-smed79
// @supportURL https://greasyfork.org/fr/scripts/14957-pixlr-editor-remove-sidebar/feedback
// @include http://pixlr.com/editor/*
// @include https://pixlr.com/editor/*

// @grant GM_addStyle
// ==/UserScript==

GM_addStyle ( "              \
  body {                     \
         padding-right: 0px; \
       }                     \
" );
