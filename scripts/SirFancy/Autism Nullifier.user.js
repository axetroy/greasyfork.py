// ==UserScript==
// @name         Autism Nullifier
// @namespace    http://sirfancy.com/
// @version      1.2
// @description  Remove comments with over 20 emojis
// @author       Zack Marotta
// @match        *://www.reddit.com/r/*/comments/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

this.$ = this.jQuery = jQuery.noConflict(true);

var threshold = 20;
var emoji = /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f])|(\ud83d[\ude80-\udeff])/g;
var comments = $(".commentarea .md p");
var arr = [];



$.each(comments, function() {
    arr = $(this).prop('innerHTML').match(emoji);
    if (arr != null && arr.length > threshold) {
        $(this).replaceWith("<p>[Autism Nullified]</p>")
    }
});