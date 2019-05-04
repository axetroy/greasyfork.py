// ==UserScript==
// @name         Igg-games / bluemediafiles: skip advertisement wait
// @namespace    bluemediafiles_skip
// @encoding     utf-8
// @description  Skips bluemediafiles redirect wait time
// @match        http://bluemediafiles.com/*
// @grant        none
// @version 0.0.1.20181024124530
// ==/UserScript==

(function() {
    window.location.replace(decodeURIComponent('http'+window.location.href.split('?xurl=')[1]));
})();