// ==UserScript==
// @name         Fuck KissManga
// @description  credit to: https://openuserjs.org/scripts/shadofx/KissManga_Adblock
// @match        http://kissmanga.com/*
// @version 0.0.1.20181004113411
// @namespace https://greasyfork.org/users/217419
// ==/UserScript==
var $ = jQuery
function FuckKissManga(){
  $('#divImage').show()
  $('#divComments').show()
}
FuckKissManga();
$(window).on('load', FuckKissManga);
new MutationObserver(FuckKissManga).observe($('body')[0],{childList: true});