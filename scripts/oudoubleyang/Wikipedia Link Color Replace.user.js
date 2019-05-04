// ==UserScript==
// @name            Wikipedia Link Color Replace
// @name:en         Wikipedia Link Color Replace
// @name:zh         维基移除链接颜色
// @name:zh-CN      维基移除链接颜色
// @description     Replace link color to BLACK in Wikipedia.
// @description:en  Replace link color to BLACK in Wikipedia.
// @description:zh  维基移除链接颜色，防沉迷。
// @include         http://*.wikipedia.org/wiki/*
// @include         https://*.wikipedia.org/wiki/*
// @include         http://*.moegirl.org/*
// @include         https://*.moegirl.org/*
// @grant           none
// @namespace       https://www.github.com/oudoubleyang
// @namespace       https://greasyfork.org/en/users/169784-kumatea
// @homepageURL     https://www.github.com/oudoubleyang/Wikipedia-Link-Color
// @version         0.1.2.2
// ==/UserScript==

var nodesArray = document.getElementById('mw-content-text').getElementsByTagName('a');
for (var i = 0; i < nodesArray.length; i++) {
    nodesArray[i].style.color = 'black';
}

window.onload = nodesArray;