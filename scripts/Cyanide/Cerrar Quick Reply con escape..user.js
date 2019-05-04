// ==UserScript==
// @name         Cerrar Quick Reply con escape.
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Cierra la ventana de Respuesta Rápida con la tecla Escape.
// @author       Cyanide
// @match        http*://www.hispachan.org/*
// ==/UserScript==


$(document).on('keydown',function(evt) {
    if (evt.keyCode == 27) {
        $("#quick_reply_window").hide();
        $("#quick_reply textarea").val("");
    }
});