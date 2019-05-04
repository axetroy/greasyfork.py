// ==UserScript==
// @name         Habitaclia
// @version      0.1
// @description  Redirige a versión escritorio
// @author       Iñaki López
// @match        http://m.habitaclia.com/*
// @grant        none
// @namespace https://greasyfork.org/users/19542
// ==/UserScript==
window.location.replace(document.location.toString().replace("m.",""));