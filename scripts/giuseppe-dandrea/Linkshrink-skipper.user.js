// ==UserScript==
// @name         Linkshrink-skipper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically skips linkshrink without wait
// @author       giuseppe-dandrea
// @match        http*://linkshrink.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    linkshrink_bypass();


    function linkshrink_bypass() {
        new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            if ($('#btd').length === 1) {
                $('#btd').trigger('click');
                window.close();
            }
            else {
                linkshrink_bypass();
            }
        });
}
})();