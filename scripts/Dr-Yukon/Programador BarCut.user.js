// ==UserScript==
// @name           Programador BarCut
// @description    Удаление мешающего сайдбара с социальными кнопками по левому краю
// @icon           http://vidadeprogramador.com.br/wp-content/themes/vdp/images/favicon.png
// @include        http*://vidadeprogramador.com.br/*
// @grant          none
// @version 0.0.1.20141212221355
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var bar = document.getElementsByClassName('ssbp-wrap');
bar[0].parentNode.removeChild(bar[0]);