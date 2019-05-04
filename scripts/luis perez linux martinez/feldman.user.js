// ==UserScript==
// @name        feldman
// @namespace   taringa.anpep.ga
// @description ¿Harto de darle dislike a feldman? No te preocupes, esta extensión lo hará por ti.
// @include     *://*.taringa.net/*
// @include     *://*.poringa.net/*
// @version     2
// @grant       none
// ==/UserScript==

$(document).ready(function(){$('.addUnlike').each(function(){if($(this).attr('onclick').indexOf('21021546')!=-1){$(this).trigger('click');}});});
