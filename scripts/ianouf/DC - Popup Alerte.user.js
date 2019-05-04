// ==UserScript==
// @name        	DC - Popup Alerte
// @namespace   	DreadCast
// @include     	http://www.dreadcast.net/Main
// @grant       	none
// @author 			Ianouf
// @date 			17/04/2015
// @version 		0.1
// @description 	Alerte sonore a la reception d'une popup
// @compat 			Firefox, Chrome
// ==/UserScript==


var sourceSoundPopupAlerte = 'http://www.universal-soundbank.com/802a/805020000000000000000000000pkjn800000000000000000000000000000090/g/85055050505050505050505/k/3275.mp3';

function getSoundPopupAlerte(){
	var soundPopupAlerte = $('#soundPopupAlerte');
	if(!soundPopupAlerte.length){
		$("<audio></audio>").attr({'src':sourceSoundPopupAlerte, 'id':'soundPopupAlerte'}).css({'display':'none'}).appendTo("body");
		var soundPopupAlerte = $('#soundPopupAlerte');
	}
	return soundPopupAlerte[0];
}

function playSoundPopupAlerte(){
	soundPopupAlerte = getSoundPopupAlerte();
	soundPopupAlerte.load();
    soundPopupAlerte.play();
	
	$("#zone_evilBox .evilBox").click(function(){
		soundPopupAlerte = getSoundPopupAlerte();
		soundPopupAlerte.pause();
	});
}

Engine.prototype.activeEvilBoxSave = Engine.prototype.activeEvilBox;
Engine.prototype.activeEvilBox = function(){
	this.activeEvilBoxSave();
	playSoundPopupAlerte();
}