// ==UserScript==
// @name        Gianfranco Negativo
// @namespace   taringa.anpep.ga
// @description ¿Harto de darle dislike a Castrotrolo? No te preocupes, esta extensión lo hará por ti.
// @include     *://*.taringa.net/*
// @include     *://*.poringa.net/*
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){$('.addUnlike').each(function(){if($(this).attr('onclick').indexOf('6220626')!=-1){$(this).trigger('click');}});});
