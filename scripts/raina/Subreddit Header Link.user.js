// ==UserScript==
// @namespace raina
// @version 1.0
// @name Subreddit Header Link
// @description Changes the header link to current subreddit home on comment pages.
// @match *://*.reddit.com/*/comments/*
// @grant none
// ==/UserScript==
document.getElementById("header-img").href = window.location.href.replace(/comments.*$/, "");
