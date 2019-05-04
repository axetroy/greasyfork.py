// ==UserScript==
// @name         AnimesTelecine - Redirect Automático
// @namespace    https://github.com/adriantodt
// @version      1.0
// @description  Automaticamente redireciona para o site de download após o tempo de espera.
// @author       AdrianTodt
// @include      http*://*.animestelecine.me/*
// @include      http*://*.animestelecine.top/*
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

setTimeout(function() {
    window.location.replace(document.getElementsByClassName('downlink')[0].href);
}, 7250);

