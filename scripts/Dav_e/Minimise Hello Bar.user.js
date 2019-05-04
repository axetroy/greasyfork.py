// ==UserScript==
// @name         Minimise Hello Bar
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Automatically hides the hello bar upon page load.
// @author       Dav_e
// @match        *://jsfiddle.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var callback = function(mutationsList) {
        for(var mutation of mutationsList) {
            if (mutation.type == 'attributes') {
                if(mutation.attributeName === "class" && document.body.classList.contains('hasHelloBar')){
                    document.body.classList.remove('hasHelloBar');
                    observer.disconnect(); //Only check for the first time
                }
            }
        }
    };
    var observer = new MutationObserver(callback);
    observer.observe(document.body, {attributes: true});
})();