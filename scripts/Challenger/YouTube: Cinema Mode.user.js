// ==UserScript==
// @name        YouTube: Cinema Mode
// @description Automatically turns on cinema mode
// @author      Challenger
// @namespace   https://greasyfork.org/users/11442
// @version     4
// @match       http://www.youtube.com/*
// @match       https://www.youtube.com/*
// ==/UserScript==
if (document.cookie.indexOf("wide=1") === -1) {
    if (document.cookie.indexOf("wide=1") === -1) {
        document.cookie="wide=1;domain=.youtube.com"
    }
    location.reload();
}