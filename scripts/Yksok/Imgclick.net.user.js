// ==UserScript==
// @name         Imgclick.net
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically skips to the image
// @author       Yksok
// @match        http://imgclick.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $("#form-captcha").submit();
})();