// ==UserScript==
// @name         Hide Facebook Like Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  This script hides the Facebook like button, so you don't feel tempted to click it and feed Facebook's algorithm
// @author       Jon Ribeiro
// @include      http://*.facebook.com/*
// @include      https://*.facebook.com/*
// @match        https://www.facebook.com/*
// @copyright    2016+, @jonathasrr
// ==/UserScript==

window.setInterval(function(){  
    [].forEach.call(document.querySelectorAll("._42nr .uiContextualLayerParent"), function(e) { e.style.display = "none"; });
}, 333);