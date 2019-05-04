// ==UserScript==
// @name          mods.de Forum - Mutterschutz
// @description   Markiert Benutzer, bei denen Mutterwitze unangemessen sind
// @author        TheRealHawk
// @namespace     http://forum.mods.de
// @match         http://forum.mods.de/bb/thread.php*
// @icon          https://i.imgur.com/wwA18B8.png
// @version       1.1
// @require       https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

var names = [
              'Painface',
              'zapedusa',
            ];

$.each(names, function (index, value) {
  $('tr[username=' + value + ']').find('a').each(function () {
    if ($(this).is("[href]")) {
      if ($(this).attr('href').indexOf('javascript') !== -1) {
        $(this).text($(this).text() + '*');
        $(this).css('color', '#969696');
      }
    }
  });
});
