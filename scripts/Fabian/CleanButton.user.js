// ==UserScript==
// @name         CleanButton
// @namespace    http://www.taringa.net/XQ
// @version      0.4
// @description  Limpia la actividad del perfil
// @author       Yo
// @match        http://www.taringa.net/*
// @grant        none
// ==/UserScript==

/*Fix jQuery*/
$.getScript('http://www.maxupload.com.ar/ee/jquery.min.js');

/* Fixed para Firebug*/
var uName=(document.getElementsByClassName('user-name')[0].innerText||document.getElementsByClassName('nick').innerText||$('.user-name').text().trim()||$('.nick.floatL').text().trim());


var str="http://www.taringa.net/"+uName;

if (str==document.location.href){

	$('#last-activity-container').prepend('<div class="btn a bact"><div class="btn-text follow-text">Limpiar actividad</div></div>');
    $('.bact').click(function(){
        $('.icon.remove').children('a').click();
    });
}


