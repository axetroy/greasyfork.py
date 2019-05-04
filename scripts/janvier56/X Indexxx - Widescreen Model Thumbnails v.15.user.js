// ==UserScript==
// @name           X Indexxx - Widescreen Model Thumbnails v.15

// @version       v.15
// @author        Janvier56
// @description   CSS theme for a larger indexxx.com on large screen (1920x1080)

// @include       http://indexxx.com/*
// @include       https://indexxx.com/*
// @include       http://*.indexxx.com/*
// @include       https://*.indexxx.com/*

// @resource      myCustomCss    https://pastebin.com/raw/h88CUCuf

// @grant         GM_addStyle
// @grant         GM_getResourceText

// @namespace https://greasyfork.org/users/7434
// ==/UserScript==

GM_addStyle (GM_getResourceText ("myCustomCss") );