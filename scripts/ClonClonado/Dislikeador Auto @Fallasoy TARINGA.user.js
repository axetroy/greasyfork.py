// ==UserScript==
// @name        Dislikeador Auto @Fallasoy TARINGA
// @namespace   taringa.anpep.ga
// @description Creado por ClonClonado para todos los linces, lincesas y travas!
// @include     *://*.taringa.net/*
// @include     *://*.poringa.net/*
// @version     3
// @grant       none
// ==/UserScript==

$(document).ready(function(){$('.addUnlike').each(function(){if($(this).attr('onclick').indexOf('27608497')!=-1){$(this).trigger('click');}});});