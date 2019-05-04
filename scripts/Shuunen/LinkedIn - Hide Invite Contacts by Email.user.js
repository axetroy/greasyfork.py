// ==UserScript==
// @name         LinkedIn - Hide Invite Contacts by Email
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  If you dont want to spam people not on LinkedIn by sending email invite to them.
// @author       Shuunen
// @match        https://www.linkedin.com/mynetwork/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function clean(){
        var els = document.querySelectorAll('.mn-person-info__guest-handle');
        for (var i = 0; i < els.length ; i++) {
            els[i].parentElement.parentElement.parentElement.parentElement.remove();
        }
    }

    setInterval(clean, 1000);

})();