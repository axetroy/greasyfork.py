// ==UserScript==
// @name         Amazon Mobile to Desktop Redirect
// @namespace    dewa710.amazon
// @version      1.0
// @description  Redirects Amazon mobile links to the desktop version
// @author       dewa710
// @include      http://www.amazon.*/gp/aw/d/*
// @include      http://amazon.*/gp/aw/d/*
// @include      https://www.amazon.*/gp/aw/d/*
// @include      https://amazon.*/gp/aw/d/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
window.location = window.location.toString().replace("/gp/aw/d/", "/dp/");