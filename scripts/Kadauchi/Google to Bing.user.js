// ==UserScript==
// @name         Google to Bing
// @namespace    https://greasyfork.org/users/11580
// @version      1.0
// @description  What does this do?
// @author       Kadauchi
// @include      https://www.mturkcontent.com/dynamic/hit*
// @include      https://s3.amazonaws.com/mturk_bulk/hits/*
// @grant        GM_log
// @require      http://code.jquery.com/jquery-2.1.0.min.js
// ==/UserScript==

$(document).ready(function(){
    $('a').each(function(){
        this.href = this.href.replace('google', 'bing');
    });
});