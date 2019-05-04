// ==UserScript==
// @name         Cartelito
// @namespace    /ramirobelmonte6
// @version      0.1
// @description  cartelito con funciones
// @author       You
// @match        http*://www.taringa.net/*
// @include      https://www.taringa.net/mi

// ==/UserScript==
var cartelito =  $( '<div class="contenedor">'+
						'<div class="img">'+
						'</div>'+
						'<div class="botones">'+
								'<a class="boton" id="megusta">me gusta</a>'+
								'<a class="boton fav" id="favorito">Favorito</a>'+
						'</div>'+
					'</div>'+
					'<style type="text/css">'+
						'.contenedor{display: block;font-family:helvetica;top:200px;left:5px; z-index:9999;position: fixed;background: #263238;cursor:default;}'+
						'.img{height: 45px;}'+
						'.img.avatar{display: inline; width: 45px;}'+
						'.img>img{height: 45px}'+
						'.img>span{vertical-align: 17px;color: #fff; padding:0 5px;font-size:16px;}'+
						'.botones{display: block;}'+
						'a.boton{display: block;text-align: center;background: #4CAF50;padding: 3px;color: #ffca28;font-size:12px;}'+
						'a.boton.fav{background: #ffca28; color: #4CAF50;}'+
					'</style>');


$('body').prepend(cartelito);
$('#megusta').click( function() { $('.action-vote.hastipsy.pointer').click();/*$('.quick-reply textarea').blur();*/$('.list.small-list.quick-reply.clearfix').hide(); });
$('#favorito').click( function() { $('.action-favorite').click(); });
var img = $('img.user-picture').clone();
var nick = $('.user-name').clone();
$('.img').prepend(img);
$('.img').append(nick);
$( ".contenedor" ).draggable();