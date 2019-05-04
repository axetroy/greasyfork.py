// ==UserScript==
// @name          mods.de Forum - zapedusa Bender
// @description   Ersetzt zapedusas Bender durch sein Tinder-Profilbild
// @author        TheRealHawk
// @namespace     http://forum.mods.de
// @match         http://forum.mods.de/bb/thread.php*
// @icon          https://i.imgur.com/wwA18B8.png
// @version       1.1
// @grant         GM_getResourceURL
// @require       https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @resource      zapeBender https://i.imgur.com/YfQFTQC.png
// ==/UserScript==

$('tr[username=zapedusa]').find('img').each(function () {
  if ($(this).attr('src').indexOf('./avatare/') !== -1) {
    $(this).attr('src', GM_getResourceURL('zapeBender'));
  }
});