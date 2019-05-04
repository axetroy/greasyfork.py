// ==UserScript==
// @name         BTDB URL fix
// @match        http://btdb.to/q/*
// @description  force and fit malformation of popular sorting
// @version 0.0.1.20180605190235
// @namespace https://greasyfork.org/users/40027
// ==/UserScript==

(function() {
    'use strict';

    if(!document.location.href.includes('sort=popular')) {
        var idx = document.location.href.lastIndexOf('/');
        while(!isNaN(parseInt(document.location.href.charAt(++idx), 10))) {}
        document.location = document.location.href.substring(0, idx).concat('?sort=popular');
    }
})();