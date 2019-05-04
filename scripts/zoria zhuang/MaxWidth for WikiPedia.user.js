// ==UserScript==
// @name           MaxWidth for WikiPedia
// @author         h.zhuang
// @version        2014.11.19
// @description    It will set a max width of wikipedia for better readibility.
// @lastchanges    Initial release
// @namespace      wikipedia.org
// @grant  GM_addStyle
// @include       http://wikipedia.org/*
// @include       https://wikipedia.org/*
// @include       http://*.wikipedia.org/*
// @include       https://*.wikipedia.org/*
// ==/UserScript==

GM_addStyle("#content,#bodyContent {max-width:760px !important;}\
            #mw-content-text {max-width:680px !important;}\
            .mw-body {max-width:999px !important;}");