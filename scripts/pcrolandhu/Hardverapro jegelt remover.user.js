// ==UserScript==
// @name          Hardverapro jegelt remover
// @description   Ez a script eltávolítja a jegelt hirdetéseket, mivel felesleges látni őket.
// @version       1.1
// @author        pcroland & sün
// @namespace     hardverapro.hu
// @include       https://hardverapro.hu/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(document).ready(function()
{
    $(".iced").parent().remove();
});