// ==UserScript==
// @name         Hide Gab post preview images
// @namespace    https://gab.ai/Jeremy20_9
// @version      0.1
// @description  remove preview images from posts
// @author       Jeremiah 20:9
// @match        https://gab.ai/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function(){
        $("#home-post-list,#user-post-list").on('DOMSubtreeModified', function () {
            $(".post__embed__body__image").hide();
        });
    });
})();