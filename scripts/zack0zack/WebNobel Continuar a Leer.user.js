// ==UserScript==
// @name        WebNobel Continuar a Leer
// @version     1
// @namespace   zack0zack
// @description Webnovel.com Continua a pagina del Capitulo
// @include     *www.webnovel.com/rssbook/*/*
// @grant       none
// ==/UserScript==


location.href = location.href.replace('/rssbook/', '/book/');