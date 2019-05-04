// ==UserScript==
// @name       jawz ErrorBeGone
// @version    1.0
// @description  Go away error
// @match      https://www.google.com/evaluation/endor/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @copyright  2015+, You
// @namespace https://greasyfork.org/users/1997
// ==/UserScript==

if ($('p:contains(An error occurred. Please refresh the current page in your browser.)').length) 
    location.reload();