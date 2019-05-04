// ==UserScript==
// @name         Correos
// @namespace    Correos
// @version      0.2
// @description  Abre directamente el buscador de envíos
// @author       GoRhY
// @match        http://www.correos.es/*
// @grant        none
// ==/UserScript==

abrirBuscador();
$('select[name=tipo_buscador] option[value=env]').attr('selected', true);
$('input[id=busqueda]').focus();