// ==UserScript==
// @name       Usuario con 2 letras fixer
// @namespace  http://www.taringa.net/TN
// @version    0.5
// @description  El milargo mío.
// @match      *.taringa.net/*
// @copyright  2014, @XP
// ==/UserScript==
/*Fix jQuery*/
$.getScript('http://www.maxupload.com.ar/ee/jquery.min.js');

var str=/^http:\/\/www\.taringa\.net\/[a-zA-Z0-9]{2}\/([0-9]*|[seguidores]*|[siguiendo]*|[medallas]*|[posts]*|[informacion]*|[temas]*)$/g;
    var txt= str.test(document.location.href);
if (txt){
    $('body').prepend('<div style="color:#333;width:100%;height:100%;position:absolute;top:0;left:0;z-index:999999999999999999;">Cargando...</div>');
    $('#page').hide();
    document.location.href = document.location.href+ "/0";
}
