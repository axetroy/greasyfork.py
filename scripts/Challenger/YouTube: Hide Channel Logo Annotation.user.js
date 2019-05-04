// ==UserScript==
// @name        YouTube: Hide Channel Logo Annotation
// @description Hides the channel logo annotation in videos
// @author      Challenger
// @namespace   https://greasyfork.org/users/11442
// @version     2
// @match       http://www.youtube.com/watch*
// @match       https://www.youtube.com/watch*
// @grant       GM_addStyle
// ==/UserScript==
GM_addStyle(".branding-img-container {display: none;}");