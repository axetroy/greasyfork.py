// ==UserScript==
// @name         Github Pull Requests Overview link
// @namespace    https://fyndiq.se/
// @version      0.3
// @description  Insert a Pull Requests Overview link in the menu with pre-defined filters
// @author       Fyndiq AB
// @grant        none
// @include      https://github.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var filters = "&q=user%3Afyndiq+label%3A%22Ready+for+review%22+is%3Aopen+-repo%3Afyndiq%2Ffyndiq+";
    var ul = document.querySelector('body > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.d-flex.flex-justify-between.flex-auto > nav > ul');
    var li = document.createElement('li');
    li.innerHTML = '<a class="js-selected-navigation-item selected HeaderNavlink px-2" data-hotkey="g o" href="/pulls?utf8=✓'+filters+'">Pulls Overview</a>';
    ul.insertBefore(li, ul.childNodes[0]);
})();