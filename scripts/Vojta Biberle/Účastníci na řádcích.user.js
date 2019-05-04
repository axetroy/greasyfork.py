// ==UserScript==
// @name        Účastníci na řádcích
// @namespace   cz.biberle
// @description Vypíše každého účastníka na nový řádek
// @include     http://www.barcampbrno.cz/2016/ucastnici.html
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("#entrants li { display: block !important; }");