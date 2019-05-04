// ==UserScript==
// @name        Steam Store - URL Cleaner
// @namespace   Steam Store - URL Cleaner
// @description Cleans an app's URL on the Steam store
// @version     1.3
// @grant       none
// @run-at      document-start
// @include     http://store.steampowered.com/app/*
// ==/UserScript==

if (window.location.search.length > 0) {
    window.history.pushState(null, null, window.location.href.replace(window.location.search, ""));
}