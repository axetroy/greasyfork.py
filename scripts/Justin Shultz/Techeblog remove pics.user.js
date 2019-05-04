// ==UserScript==
// @name         Techeblog remove pics
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Clears the pictures between posts
// @author       Justin
// @include      http://www.techeblog.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function bootstrap(tries) {
        tries = tries || 1;

        if ($('.post-photos').length > 0) {
            init();
        } else if (tries < 1000) {
            setTimeout(function () {bootstrap(tries++);}, 100);
        }
    }

    bootstrap();

    function init(){
        $('.post-photos').empty();
    }

})();