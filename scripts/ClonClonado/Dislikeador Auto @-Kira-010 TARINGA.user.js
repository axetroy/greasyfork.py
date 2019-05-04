// ==UserScript==
// @name        Dislikeador Auto @-Kira-010 TARINGA
// @namespace   taringa.anpep.ga
// @description Creado por ClonClonado para todos los linces, lincesas y travas!
// @include     *://*.taringa.net/*
// @include     *://*.poringa.net/*
// @version     3
// @grant       none
// ==/UserScript==

$(document).ready(function(){$('.addUnlike').each(function(){if($(this).attr('onclick').indexOf('26903238')!=-1){$(this).trigger('click');}});});