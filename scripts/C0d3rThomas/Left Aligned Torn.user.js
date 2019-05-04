// ==UserScript==
// @name         Left Aligned Torn
// @namespace    LordBusiness.LA
// @version      1.2
// @description  Left Aligns Torn
// @author       LordBusiness [2052465]
// @match        https://www.torn.com/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`.d .content .container, .d .header-wrapper-top .container {
    margin-left: 20px !important;
}`);