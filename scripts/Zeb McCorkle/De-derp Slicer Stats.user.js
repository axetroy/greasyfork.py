// ==UserScript==
// @name        De-derp Slicer Stats
// @namespace   http://classcoder.com
// @description The stats page has the "HOME | ABOUT | FAQ | SUPPORT | TERMS | PRIVACY" bar right smack dab in the middle of it. This userscript removes it.
// @include     http://stats.slicer.io/*
// @include     https://stats.slicer.io/*
// @version     1
// ==/UserScript==

document.querySelector('div[muid=".0.1.0.4"]').style.display = 'none'