// ==UserScript==
// @name        Bye Cookie~
// @namespace   adios-cookie
// @description Oculta advertencia de uso de cookies | this script hides warning of use of cookies
// @copyright   aizar
// @version     1.4.2
// @run-at      document-end
// @require     https://code.jquery.com/jquery-1.2.1.pack.js
// @include     http://*
// @include     https://*
// ==/UserScript==

var i;
var j;
var resultado=[];
var buscar= [
    'cookie',
    'COOKIE',
    'Cookie',
    'gdpr',
    'GDPR',
    'Gdpr',
    'qc-cmp-showing',
    'QC-CMP-SHOWING',
    'qc-cmp-ui',
    'QC-CMP-UI'
];
for(j = 0; j < buscar.length; j++) {
    resultado = document.body.querySelectorAll('[class*="'+buscar[j]+'"],[id*="'+buscar[j]+'"],[aria-label*="'+buscar[j]+'"]');
    for(i = 0; i < resultado.length; i++) {
        if (resultado[i]!==''){
            resultado[i].style.display='none';
        }
    }
}
jQuery(document).ready(function () {
    for(j = 0; j < buscar.length; j++) {
        resultado = document.body.querySelectorAll('[class*="'+buscar[j]+'"],[id*="'+buscar[j]+'"],[aria-label*="'+buscar[j]+'"]');
        for(i = 0; i < resultado.length; i++) {
            if (resultado[i]!==''){
                resultado[i].style.display='none';
            }
        }
    }
});