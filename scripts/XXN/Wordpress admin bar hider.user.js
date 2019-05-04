// ==UserScript==
// @name     Wordpress admin bar hider
// @description    Hide the admin bar on Wordpress websites when logged in
// @namespace Dan
// @author   Dan
// @include  *.electroplus.md/*
// @version  1
// @grant    none
// ==/UserScript==

var $ = unsafeWindow.jQuery;
$('#wpadminbar').hide();