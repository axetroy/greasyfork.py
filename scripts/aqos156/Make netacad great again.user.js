// ==UserScript==
// @name         Make netacad great again
// @namespace    https://static-course-assets.*.amazonaws.com
// @version      0.1
// @description  try to take over the world!
// @author       aqos156
// @match        https://static-course-assets.s3.amazonaws.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener("keydown", keyDownTextField, false);

    function keyDownTextField(e) {
        var keyCode = e.keyCode;
        if (keyCode == 39) {
            $("#page-menu-next-button").click();
        } else if (keyCode == 37) {
            $("#page-menu-previous-button").click();
        }
    }
})();