// ==UserScript==
// @name        Kinopoisk Comingsoon
// @namespace	https://greasyfork.org/ru/users/19952-xant1k-bt
// @description Added in list coming soon checkbox only with trailers
// @include     https://kinopoisk.ru/comingsoon/
// @include     https://www.kinopoisk.ru/comingsoon/
// @version     1.0
// @grant       none
// ==/UserScript==

$(document).ready(function(){
	//Запускаем функцию с небольшой задержкой, т. к. трейлеры генерируются не на сервере, а догружаются после загрузки страницы
	setTimeout(function(){
		//Добавляем всем фильмам с трейлерами класс
		$('.playTrailer').parents('.item').addClass('with-trailer');

		//Добавляем чекбокс
		$('<div class="clearfix" id="second_line_of_filters"></div>').insertBefore($('#periodSelect'));
		$('#periodSelect').appendTo($('#second_line_of_filters'));
		$('<label for="only_with_trailers" style="float: right"><input type="checkbox" id="only_with_trailers">только с трейлерами</label>').appendTo($('#second_line_of_filters'));
	   
		//Вешаем событие — если ткнули на чекбокс, спрятать фильмы без трейлеров	
		$('#only_with_trailers').on('change', function(){
		    if ($(this).is(':checked')) $('.coming_films .item:not(.with-trailer)').hide();
		    else  $('.coming_films .item:not(.with-trailer)').show();
		});
	},2500);
});