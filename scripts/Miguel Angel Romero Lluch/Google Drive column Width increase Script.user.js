// ==UserScript==
// @name     Google Drive column Width increase Script
// @author   Miguel Ángel Romero Lluch
// @include  https://drive.google.com/drive/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @description Script to add more width to Google Drive left column
// @version  1
// @namespace https://greasyfork.org/users/174568
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function() {
    /**
     * Function to render
     */
    function renderChanges() {
        setTimeout(function() {
          	var obj = $('.a-s-tb-sc-Ja-Q.a-s-tb-sc-Ja-Q-Nm.a-s-tb-Kg-Q.a-s-tb-kl-Gd-ig'); //$('[jscontroller]');
          	if (('undefined' !== typeof obj) && (obj)) {
            	obj.css({"width": "600px"});
            }
        }, 3000);
    }

    //Loop to set changes each 9 seconds
    //var intervalTime = setInterval(function() {
        renderChanges();
    //},2500);
});
