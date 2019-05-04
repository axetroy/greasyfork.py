// ==UserScript==
// @name           center page layout // Seiten-Layout zentrieren
// @version        1.1
// @namespace      http://userscripts.org/scripts/show/54661
// @description    Useful for displaying pages with a native left-aligned or full screed-width layout on a wide screen.
// @include        http://*.wikipedia.org/*
// ==/UserScript==
document.body.setAttribute('style', 'width: 900px; position: absolute; top: 0px; left: 0; right: 0; margin-left: auto; margin-right: auto;');