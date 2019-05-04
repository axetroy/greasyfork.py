// ==UserScript==
// @name Starflict.io Cool Mod
// @namespace Starflict.io Cool Mod
// @description No Ads, No unnecessary things
// @version 1
// @author TigerYT
// @match *://starflict.io/*
// @require http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js
// @grant none
// ==/UserScript==

$('.videoAdUi').remove();
$('#log').remove();
$('#youtubers').remove();
$('.gad').remove();
$('.adsbygoogle').remove();
$('#iogames').remove();
$('#footer').prepend('<h2>Modded by <a target="_blank" href="https://greasyfork.org/en/users/137913-tigeryt#script-list-option-groups">TigerYT</a></h2>');
