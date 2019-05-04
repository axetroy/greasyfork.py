// ==UserScript==
// @name         >Hide con F2
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  >Hide con la tecla F2 de la fila superior.
// @author       Hhaz
// @match        http*://www.voxed.net/*
// ==/UserScript==

$(document).on('keydown',function(evt) {
    if (evt.keyCode == 113) {
        $('#content').val($('#content').val()+'>Hide'); // Agrega el texto '>Hide'.
        $(function() {
            $("#comText").click(); // Cliquea el botón de Enviar.
			$(".icon-lock").click(); // Cliquea 'ocultar'.
        });
    }
});