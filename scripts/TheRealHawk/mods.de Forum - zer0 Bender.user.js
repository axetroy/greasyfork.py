// ==UserScript==
// @name          mods.de Forum - zer0 Bender
// @description   Ersetzt zer0s Bender durch Donald Duck
// @author        TheRealHawk
// @namespace     http://forum.mods.de
// @match         http://forum.mods.de/bb/thread.php*
// @icon          https://i.imgur.com/wwA18B8.png
// @version       1.2
// @grant         GM_getResourceURL
// @require       https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @resource      zer0Bender https://i.imgur.com/QFW7tpf.png
// ==/UserScript==

$('tr[username=zer0]').find('img').each(function () {
  if ($(this).attr('src').indexOf('./avatare/') !== -1) {
    $(this).attr('src', GM_getResourceURL('zer0Bender'));
  }
});
