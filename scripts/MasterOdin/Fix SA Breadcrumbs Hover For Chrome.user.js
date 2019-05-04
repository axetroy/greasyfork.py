// ==UserScript==
// @name         Fix SA Breadcrumbs Hover For Chrome
// @namespace    http://mpeveler.com
// @version      0.1
// @description  Fixes the hover box on the Forum breadcrumb such that it doesn't disappear when you go to click on it or if you're not fast enough
// @author       Matthew "Master_Odin" Peveler
// @match        http://forums.somethingawful.com/*
// @match		 https://forums.somethingawful.com/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle("div.breadcrumbs a.up span { bottom: 14px; }");