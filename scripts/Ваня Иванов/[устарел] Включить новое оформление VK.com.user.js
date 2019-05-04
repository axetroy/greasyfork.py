// ==UserScript==
// @name		 [устарел] Включить новое оформление VK.com
// @version		 1.4
// @description	 Включает новое оформление ВКонтакта, с возможностью обратного перехода. Больше не работает.
// @author		 ICP
//=	=	^^^ Автор, версия и название скрипта ^^^
// @match		 *://vk.com/*
//=	=	^^^ Перехватываемые URL ^^^
// @run-at		 document-start
//=	=	^^^ Включение скрипта при старте загрузки документа ^^^
// @connect		 vk.com
// @namespace	 ICP
// ==/UserScript==

(function() {
//	window.stop(); // останавливаем текущую загрузку страницы
//	document.documentElement.innerHTML = null; // очищаем страницу для удаления возможных остаточных форм ввода самого vk

//	var head = document.getElementsByTagName('head')[0]; // определение действующего хеад-а, должно работать в любом браузере
//	var meta = document.createElement('meta'); // создание новго мета-тега
//	meta.httpEquiv = "Pragma"; // Имя
//	meta.content = "no-cache"; // Значение запрещающее кеширование
//	head.appendChild(meta); // вставляем метатег запрета кеширования

//	var urls = window.location.href; // получаем строку текущего URL
//	urls = /al_wall.php\?/i.test(urls)?
//		urls.replace(/(http[s]{0,1}:\/\/).*act=get_replies.*replies([^&]*).*/i, '$1new.vk.com/wall$2?offset=last&f=replies'):
//		urls.replace(/(http[s]{0,1}):\/\/vk\.com\//i, '$1://new.vk.com/');
		// замена домена на new.vk.com, а если это разворачивание комментариев
		// которое не работает из-за переадресации внутри страницы, то перейти на полный просмотр
//	var form = document.createElement('form'); // создаём пустую форму
//	form.method = 'POST'; // формат отправки данных мешающий дальнейшему редиректу
//	form.action = urls; // страница для открытия
//	head.appendChild(form); // добавляем форму на страницу
//	form.submit(); // активируем её
})();