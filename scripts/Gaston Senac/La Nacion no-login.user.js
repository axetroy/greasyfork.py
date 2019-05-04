// ==UserScript==
// @name        La Nacion no-login
// @namespace   gaston-lanacion
// @include     *://*.lanacion.com.ar/*
// @version     1
// @description Saltear la ventana de login en lanacion.com.ar
// @grant none
// ==/UserScript==

$('#lnmodal pantalla-completa login').remove();