// ==UserScript==
// @name           GLB Edit Tagging Dropdowns
// @version        0.0.3
// @description    Removes unused tagging options to make tagging quicker
// @include        http://glb.warriorgeneral.com/game/scout_team.pl?team_id=*

// @namespace https://greasyfork.org/users/3060
// ==/UserScript==
// change this text to select what to keep in the dropdownh

var keep = ["none", "passer", "blocker", "custom1"];
var select = document.getElementsByTagName('tag');

// Do not edit below

function containsItem(arr, value) {
	var l = arr.length;

	while (l--)
		if (arr[l] == value)
			return true;

	return false;
}

var i = 0;

while (select.options.length != keep.length) {
	if (!containsItem(keep, select[i].value)) {
		select.remove(i);
		i = 0;
	} else {
		++i;