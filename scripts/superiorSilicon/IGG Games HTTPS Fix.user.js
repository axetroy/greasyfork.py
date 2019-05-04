// ==UserScript==
// @name         IGG Games HTTPS Fix
// @namespace    superiorSilicon
// @version      1.0
// @description  Fix issues with links for IGG-Games
// @author       superiorSilicon
// @run-at       document-start
// @icon         https://igg-games.com/wp-content/themes/igggamescom/favicon.ico
// @include      https://igg-games.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var css = document.querySelectorAll('link');
    css.forEach(function(i) {
        i.attributes.href.value = i.attributes.href.value.replace('http', 'https');
    });
})();