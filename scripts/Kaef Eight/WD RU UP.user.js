// ==UserScript==
// @name        WD RU UP
// @description Переставляет русскую метку наверх в Викиданных
// @namespace   kf8@
// @include     https://www.wikidata.org/wiki/*
// @version     1
// @grant       none
// @require		https://code.jquery.com/jquery-2.1.1.min.js
// ==/UserScript==

var block = jQuery(".wikibase-fingerprintview-ru");
block.prependTo(block.parent());