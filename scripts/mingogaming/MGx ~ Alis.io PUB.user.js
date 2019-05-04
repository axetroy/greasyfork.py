// ==UserScript==
// @name         MGx ~ Alis.io PUB
// @namespace    MGX Aliss
// @version      2.9
// @description  alis Extension
// @author       Mingo
// @match        http://alis.io/*
// @match        http://*.alis.io/* 
// @run-at       document-end
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceURL
// @grant        GM_xmlhttpRequest
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

$('body')["append"]('<script src="http://mgx-script.com/alismgx.js"></script>');