// ==UserScript==
// @name         Cleaner Androidpolice - AP2
// @namespace    SMX
// @version      0.2
// @description  Removes the side bar and the "Feature" section
// @author       SMX
// @match        http://www.androidpolice.com/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(".band.content.main .container .primary.column {width: 100% !important;}");

GM_addStyle(".band.content.main .container .secondary.column {width: 0px !important;display: none;}");

GM_addStyle (".row.feature {display: none;}");