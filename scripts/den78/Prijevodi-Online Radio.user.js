// ==UserScript==
// @name           Prijevodi-Online Radio
// @namespace           Prijevodi-Online Radio
// @author         den78
// @description    Prijevodi-Online Play Radio
// @include        https://www.prijevodi-online.org/smf/*
// @include        https://prijevodi-online.org/smf/*
// @include        http://www.prijevodi-online.org/smf/*
// @include        http://prijevodi-online.org/smf/*
// @version        1.4
// @icon        https://www.prijevodi-online.org/static/img/prijevodi-online-logo.png
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$('<div><center><audio controls><source src="http://stream.playradio.rs:8001/play.aac" type="audio/aac"></audio></center></div>').appendTo('#top_section');