// ==UserScript==
// @name        CubeCraft Reports
// @namespace   de.rasmusantons
// @description Adds a link to the appeals page to each report.
// @include     https://reports.cubecraft.net/report*
// @version     2
// @grant       none
// ==/UserScript==

$('tr td:nth-child(2)').each(function(i) {
  $(this).append($('<a href="https://appeals.cubecraft.net/find_appeals/'
                   + $.trim($(this).find('a').first().html())
                   + '"> ?</a>')
  );
});