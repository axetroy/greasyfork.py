// ==UserScript==
// @name         Chia Se Nhac (CSN) - Download On Click
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Open download page directly when clicking on link
// @author       You
// @match        http://*.chiasenhac.vn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function() {
        $('.musictitle').click(function(e) {
            e.stopPropagation();
            e.preventDefault();

            window.open(e.target.href.replace(".html", "_download.html"),'_blank');
        });
    });
})();