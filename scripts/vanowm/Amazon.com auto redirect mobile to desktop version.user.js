// ==UserScript==
// @id             amazon.com_mobile2desktop
// @name           Amazon.com auto redirect mobile to desktop version
// @version        1.1
// @namespace      V@no
// @author         V@no
// @description    Automatically redirect from mobile version to desktop version of the page.
// @include        http://www.amazon.com/gp/aw/d/*
// @include        http://amazon.com/gp/aw/d/*
// @include        https://www.amazon.com/gp/aw/d/*
// @include        https://amazon.com/gp/aw/d/*
// @grant          none
// @run-at         document-start
// ==/UserScript==

window.location.replace(window.location.toString().replace(/^(http:\/\/(www\.)?amazon\.com\/)gp\/aw\/d\/(.*)/ig, "$1dp/$3"));