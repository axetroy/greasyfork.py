// ==UserScript==
// @name         Coinigy Shortcuts
// @namespace    nihtanim.me
// @version      0.0.1
// @description  Adds various shortcuts to coinigy
// @author       Nithanim
// @match        https://www.coinigy.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document).keydown(function(e) {
        if (e.keyCode == 'C'.charCodeAt(0) && e.ctrlKey) {
            $(".ui-pnotify-clear-all").click();
        } else if(e.keyCode == 'Y'.charCodeAt(0) && e.ctrlKey) {
            $('#btnConfirmYes').click();
        }
    });
})();