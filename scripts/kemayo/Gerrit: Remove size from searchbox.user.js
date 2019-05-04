// ==UserScript==
// @name         Gerrit: Remove size from searchbox
// @namespace    http://davidlynch.org/
// @version      0.1
// @description  Gerrit's searchbar has a size attribute which makes the page too wide
// @author       David Lynch <kemayo@gmail.com>
// @match        https://gerrit.wikimedia.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function(mutations, observer) {
        var searchBox = document.querySelector('input.searchTextBox[size]');
        if (searchBox) {
            searchBox.removeAttribute('size');
        }
    });
    observer.observe(document, {
        subtree: true,
        childList: true,
        attributes: false,
        characterData: false
    });
})();
