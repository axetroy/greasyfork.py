// ==UserScript==
// @name        osu! always show diff icons
// @namespace   https://osu.ppy.sh/u/1089803
// @version     1.00
// @description show diff icons without mouseover at beatmap list
// @include     http*://osu.ppy.sh/p/beatmaplist*
// @author      Nucoin
// ==/UserScript==
//--------------------------------------------------------------------------------------------------------------------------------
var bmList = document.getElementsByClassName('beatmap');

for (var i = 0; i < bmList.length; i++) {
    if (bmList[i].innerHTML.match(/ \.\.\./)) {
        bmList[i].style.backgroundColor = "#d7d2fb";
    }
    bmList[i].children[3].children[1].className += '_';
    bmList[i].children[3].children[1].style.display = 'block';
    bmList[i].children[3].children[2].className += '_';
    bmList[i].children[3].children[2].style.display = 'block';
}