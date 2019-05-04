// ==UserScript==
// @name           Hide spoiler pictures on openload
// @description    Hide spoiler pictures on openload...
// @include        https://openload.co/*
// @match https://oload.tv/embed/*
// @match https://oload.info/embed/*
// @match https://oload.stream/embed/*
// @namespace https://greasyfork.org/users/59385
// @version 0.0.1.20171018230936
// ==/UserScript==
$('*').css("background-image", "url()"); 
$('video').attr('poster', '');