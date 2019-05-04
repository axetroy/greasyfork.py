// ==UserScript==
// @name        Sibnet Video HTML5 AutoPause
// @description Автоматически ставит видео на паузу
// @namespace   https://video.sibnet.ru/
// @include     *://video.sibnet.ru/*
// @version     0.2.1
// @grant       none
// ==/UserScript==
(function(){
	try{
		document.getElementById('video_html5_wrapper_html5_api').pause();
	}catch(e){
		console.error(e);
	}
})();