// ==UserScript==
// @name           Virtonomica: долой обои
// @version        1.06
// @namespace      Virta_bez_govna
// @description    Удаление устращающих картинок
// @include        http*://*virtonomic*.*/*
// ==/UserScript==

(function () {
	//Следующие три строки убирают "обои" и картинки предприятий со всех страниц. Для отключения функционала поставьте "//" в следующих строках - аналогично с тем, как эти два символа стоят в начале этой строки. Каждая строка имеет пояснения
	$('body').attr('class','');//убираем фон по бокам
	$('#wrapper > div.metro_header > div > div.picture').attr('style', 'display: none');//прячем фон из верхней части страницы
	//$('#wrapper > div.metro_header * .bg-image').attr('style', 'display: none');//прячем картинку предприятия
	//$('#wrapper > div.metro_header * .dainfo').attr('style', 'display: none');//прячем данные о скидках
	
	$( document ).ready(function() {
		//Следующие три строки убирают "обои" и картинки предприятий со всех страниц. Для отключения функционала поставьте "//" в следующих строках - аналогично с тем, как эти два символа стоят в начале этой строки. Каждая строка имеет пояснения
		$('body').attr('class','');//убираем фон по бокам
		$('#wrapper > div.metro_header > div > div.picture').attr('style', 'display: none');//прячем фон из верхней части страницы
		//$('#wrapper > div.metro_header * .bg-image').attr('style', 'display: none');//прячем картинку предприятия
		//$('#wrapper > div.metro_header * .dainfo').attr('style', 'display: none');//прячем данные о скидках
	});

})(window);