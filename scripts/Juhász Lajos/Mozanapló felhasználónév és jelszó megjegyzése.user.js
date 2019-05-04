// ==UserScript==
// @name Mozanapló felhasználónév és jelszó megjegyzése
// @description Mozanapló felhasznlónév és jelszó megjegyzése a Kölcsey Ferenc Általános Iskolában
// @version 1.0
// @namespace kolcsey21.mozanaplo.hu
// @match http://kolcsey21.mozanaplo.hu
// @match https://kolcsey21.mozanaplo.hu
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$("#loginform > input[type='text']:first").remove ();