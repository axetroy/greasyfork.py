// ==UserScript==
// @name         StackExchange: No Hot Questions
// @namespace    http://blaisorblade.github.io/sx-no-hot
// @version      0.1
// @description  Hide hot network questions from StackExchange network
// @author       Blaisorblade
// @match        https://*.stackexchange.com/*
// @match        https://stackoverflow.com/*
// @match        https://superuser.com/*
// @match        https://serverfault.com/*
// @match        https://mathoverflow.net/*
// @match        https://askubuntu.com/*
// @match        https://stackapps.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $("#hot-network-questions").hide();
})();