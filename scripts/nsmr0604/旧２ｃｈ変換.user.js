// ==UserScript==
// @id              9chConvert
// @name            旧２ｃｈ変換
// @version         0.1.1
// @namespace       Anonymous.2ch
// @author          nsmr0604
// @description     新しい２ちゃんねるにようこそ
// @license         Public Domain
// @include         http*://2ch.net/*
// @include         http*://5ch.net/*
// @include         http*://*.2ch.net/*
// @include         http*://*.5ch.net/*
// @run-at          document-start
// ==/UserScript==

(function () {
document.location.replace(document.URL.replace("https://","http://").replace("5ch","2ch").replace("2ch.net","2ch.sc"));
})();