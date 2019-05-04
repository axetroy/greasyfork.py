// ==UserScript==
// @name        NoBlockBlock - Liberation
// @include     *://*liberation.fr/*
// @description Lève la limitation de consultation d'articles
// @version     1.0.2
// @namespace   Ahahaha
// @author      owintwist
// @run-at      document-idle
// @grant       none
// ==/UserScript==
if (localStorage.libe_session) localStorage.removeItem('libe_session')'
document.cookie =  'libe_session=' + ';path=/;domain=.liberation.fr'
$('div.paywall*').remove()