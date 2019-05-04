// ==UserScript==
// @name Desactivatar Davivienda Login Splash
// @namespace Violentmonkey Scripts
// @match https://transacciones.davivienda.com/transaccional/personas/nuevo/login.jsf
// @grant none
// @description Desactiva el splash que molestosamente pida la instalacion de algun software de seguridad 2 veces durante el proceso de login del sitio de Davivienda.
// @version 0.0.1.20171230162428
// ==/UserScript==

let oldShowSplash = showSplash;
showSplash = function() {}
