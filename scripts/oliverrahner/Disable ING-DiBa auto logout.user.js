// ==UserScript==
// @name         Disable ING-DiBa auto logout
// @namespace    http://rahner.me/
// @version      0.1
// @description  automatically click the "session refresh" button every 5 minutes
// @author       Oliver Rahner
// @match        https://banking.ing-diba.de/app/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// find "refresh" button by HTML class "refresh", get its href and make an ajax call to that, every 5 minutes
// (jQuery has already been loaded by ING Diba)
window.setInterval(function () { $.ajax($(".refresh")[0].href) }, 5 * 60 * 1000);
