// ==UserScript==
// @name         jmm prevent dm autoplay
// @namespace    jmm prevent dm autoplay
// @version      2016.03.31
// @description  prevent dailymotion videos autoplay in jeanmarcmorandini.com
// @author       hanon
// @match        *://*.jeanmarcmorandini.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';
/*$(document).ready(function() {*/
    console.info("tampermonkey plugin start: jmm disable autoplay");
    $('iframe[src*="autoPlay=1"').each(function() {
        $(this).attr('src', $(this).attr('src').replace('autoPlay=1', 'autoPlay=0') );
    });
/*});*/