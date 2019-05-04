// ==UserScript==
// @name         Fu-KissManga
// @description  credit to: https://openuserjs.org/scripts/shadofx/KissManga_Adblock
// @match        http://kissmanga.com/*
// @version 0.0.1.20181004131111
// @namespace https://greasyfork.org/users/217422
// ==/UserScript==
var $ = jQuery
function FuckKissManga(){
  $('#divImage,#btnShowComments').show()
}
FuckKissManga();
$(window).on('load', FuckKissManga);
new MutationObserver(FuckKissManga).observe($('body')[0],{childList: true});