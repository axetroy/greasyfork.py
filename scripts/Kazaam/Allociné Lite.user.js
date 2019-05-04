// ==UserScript==
// @namespace  allocine-lite
// @name       Allociné Lite
// @version    1.2
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @match      http://www.allocine.fr/*
// @description Removes useless things
// ==/UserScript==

$('.main-wrapper').prev('div').remove();

$("body").css("background-image", "none");
$("body").css("background-color", "#332E2E");

$("#disqus_thread").remove();
$('.player-footer').remove();
$('section .titlebar .titlebar-title-md:contains("Commentaires")').remove();
$('.disqus-logged-out').remove();
$('.col-right div:first').remove();
$('.fb-page').remove();
$('#topheader').remove();
$('.mdl-rc .titlebar-title-md:contains("Suivez-nous avec Passion")').remove();

if($('.gallery-media.photo').length > 0)
{
	var src = $('.gallery-media.photo').attr('src');
	var url = src.replace('r_1280_720/', '');
	window.location = url;
}