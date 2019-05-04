// ==UserScript==
// @name         Auto expand RES images (Shift + X)
// @namespace    https://www.reddit.com/
// @version      0.2
// @description  Clicks "Show Images" button on Reddit
// @author       12c(with permission)
// @match        https://www.reddit.com/*
// @match        https://www.old.reddit.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector(".res-show-images > a").click()
})();