// ==UserScript==
// @name         Fuck Autoplay
// @namespace    https://greasyfork.org/en/users/11508-arcbell
// @version      1.0
// @description  Epicmafia profile videos no longer autoplay
// @author       Arcbell
// @match        https://epicmafia.com/user/*
// @match        https://epicmafia.com/u/*
// @grant        none
// ==/UserScript==

var youtubeurl = $('#embed iframe')[0].src;
$('#embed iframe')[0].src = youtubeurl.replace('autoplay=1', 'autoplay=0');