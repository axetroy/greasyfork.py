// ==UserScript==
// @name        Ubuntu-it Quote Fixer
// @namespace   forum.ubuntu-it.org
// @include     http://forum.ubuntu-it.org/*
// @version     1.1
// @description Bugfix for ubuntu-it forum quotes
// @grant       none
// ==/UserScript==

var $msg = $('#message');
$msg.val( $msg.val().replace(/\[quote="([^ ]+) ([^\]]+\])\[img[^\[]+\[\/img\]\[\/url\]"\]/g,'[quote="$2$1[/url]"]') );