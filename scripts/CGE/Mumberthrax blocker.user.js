// ==UserScript==
// @name     Mumberthrax blocker
// @description  A script designed to block a probable troll on Tildes, absent other methods.
// @version  1
// @include https://tildes.net/*
// @grant    none
// @namespace https://greasyfork.org/users/187949
// ==/UserScript==

var $ = unsafeWindow.jQuery;
$("article.topic:has(a.link-user:contains(Mumberthrax))").remove();
$("article.comment:has(a.link-user:contains(Mumberthrax))").remove();
