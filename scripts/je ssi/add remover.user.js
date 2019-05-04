// ==UserScript==
// @name         add remover
// @description  /
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       jess
// @match        http://alis.io/*
// @match        *://*.alis.io/*
// @run-at       document-end
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceURL
// @grant        GM_xmlhttpRequest
// ==/UserScript==


$("div#ad_main").remove(); //Ad remover
// ==/==
