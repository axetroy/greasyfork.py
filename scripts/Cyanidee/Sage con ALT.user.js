// ==UserScript==
// @name         Sage con ALT
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Sage con la letra ALT (Abajo de Bloq. Mayús.)
// @author       Cyanide
// @match        http*://www.hispachan.org/*
// ==/UserScript==

$(document).on('keydown',function(evt) {
    if (evt.keyCode == 16) {
        $('#quick_reply_window textarea').val($('#quick_reply_window textarea').val()+'Sage');
        $(function() {
            $('option').filter(function() {
                return ($(this).text() == 'sage'); //To select sage
            }).prop('selected', true);
            $(".enviar").click();
        });
    }
});