// ==UserScript==
// @name         Rutracker Seed Sort
// @description  Сортировка по сидам на Rutracker
// @namespace    rutracker.org
// @include      https://rutracker.org/forum/tracker.php?*
// @include      http://rutracker.org/forum/tracker.php?*
// @copyright    2016, lynxtaa
// @grant        none
// @version      1.2
// ==/UserScript==

if (!sessionStorage.getItem('changed')) {
	document.getElementById('o').value = 10;
	sessionStorage.setItem('changed', 'true');
	document.getElementById('tr-form').submit();
}
