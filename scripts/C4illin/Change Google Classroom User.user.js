// ==UserScript==
// @name        Change Google Classroom User
// @namespace   Change Google Classroom User by C4illin
// @description Redirects from u/0/ to u/1/ for Google Classroom.
// @match       *://classroom.google.com/u/0/*
// @run-at      document-start
// @grant       none
// @author      C4illin <C@illin.cf>
// @oujs:author C4illin
// @version     1
// @homepageURL https://github.com/C4illin/Change-Google-Classroom-User
// @license     MIT; https://opensource.org/licenses/MIT
// @copyright   2018, C4illin (https://github.com/C4illin)
// ==/UserScript==



var newlink = "https://classroom.google.com/u/1/" + window.location.pathname.substring(5) + window.location.search + window.location.hash;
window.location.replace(newlink);
