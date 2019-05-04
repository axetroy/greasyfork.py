// ==UserScript==
// @name        Extratorrent Redirecter| Karzz
// @namespace   Etredirect
// @description On any web page it will check if the clicked links goes to Extratorrent.cc. If so, the link will be rewritten to proxy site
// @match       *://extratorrent.cc/*
// @match       *://www.extratorrent.cc/*
// @version     2016.10.18
// @grant       none
// @author      Singaraju Karthik (@skarthik345)
// @license     GNU LGPL v3 (https://www.gnu.org/licenses/lgpl-3.0.html)
// ==/UserScript==

(function() {
    'use strict';
    window.location.replace((document.location + "").replace("extratorrent.cc", "extratorrent.unblockall.xyz"));
})();