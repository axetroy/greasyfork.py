// ==UserScript==
// @name        Skip Steam Link filter
// @description Annoying but necessary, except for people that know their stuff.
// @include     *://steamcommunity.com/*
// @namespace   https://greasyfork.org/users/4813
// @version     2019.04.05
// @grant       none
// ==/UserScript==

for (var link of document.querySelectorAll(`a[href^='https://steamcommunity.com/linkfilter/']`))
  link.href = link.href.split(/\?(.+)/)[1].split('&')[0].split('url=')[1]