// ==UserScript==
// @name         Laravel Docs Sidebar Expander
// @namespace    https://tendian.io/
// @version      0.1
// @description  Expand all categories in the Laravel docs sidebar automatically
// @author       You
// @match        https://laravel.com/docs/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    $('.sidebar li h2').addClass('is-active');
})();