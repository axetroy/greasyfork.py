// ==UserScript==
// @name    		Google Search - Always Show Image Size
// @name:fr			Google Search - Toujours afficher Taille de l'image
// @name:de			Google-Suche - Bildgröße immer anzeigen
// @name:ru			Поиск Google - всегда показывать размер изображения
// @name:es			Google Búsqueda - Mostrar Siempre Tamaño Imagen
// @description		Forces Google Image Search to display sizes for all the images by default.
// @description:fr	Force Google Image Search à afficher les tailles de toutes les images.
// @description:de	Erzwingt die Anzeige von Größen für alle Bilder durch Google Image Search.
// @description:ru	Вынуждает Google Image Search отображать размеры всех изображений.
// @description:es	Hace que la Búsqueda de imágenes de Google muestre los tamaños de todas las imágenes.
// @namespace		iamMG
// @license			MIT
// @version			1.2.1
// @icon			https://i.imgur.com/Xy9vHSR.png
// @include			/(http|https):\/\/www\.google\.(ca|co\.in|co\.uk|com|com\.br|de|es|fr|it|pl|ru)\/search\?/
// @author			iamMG
// @run-at			document-start
// @grant			none
// @copyright		2019, iamMG (https://openuserjs.org/users/iamMG)
// ==/UserScript==

if (/&tbm=isch/.test(location.search) && !/tbs=imgo:1/.test(location.search) && !/&tbs=simg:/.test(location.search)) {
	window.location.replace(window.location.protocol + "//" + window.location.host + window.location.pathname + location.search + "&tbs=imgo:1");
}
///*
document.addEventListener ("DOMContentLoaded", DOM_ContentReady);

function DOM_ContentReady () {
	document.getElementById('hdtbMenus').classList.add("hdtb-td-c");
	document.getElementById('hdtbMenus').classList.remove("hdtb-td-o");
	document.getElementById('hdtb-tls').classList.remove("hdtb-tl-sel");
}
//*/