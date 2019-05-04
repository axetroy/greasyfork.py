// ==UserScript==
// @name        SpecialZee
// @namespace   SpecialZee
// @description Specials Map HotLink
// @include     https://www.munzee.com/*
// @version     1
// @grant       none
// ==/UserScript==
// Top menu
$('.navbar-right').append(' <li class="nav-short tooltip-helper" data-toggle="tooltip" data-placement="bottom" title="Specials"><a href="/specials/"><i class="fa fa-drupal"></i><span class="visible-xs">Specials</span></a></li>');
// EOF Top menu