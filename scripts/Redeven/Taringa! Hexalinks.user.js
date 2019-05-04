// ==UserScript==
// @name         Taringa! Hexalinks
// @namespace    https://classic.taringa.net/redeven
// @version      1.0.0
// @description  Permite convertir texto a hexadecimal y viceversa. Ahorra espacio en comentarios y evita que los links queden cortados por la longitud del binario.
// @author       Redeven
// @include      http*://*.taringa.net/*
// @grant        unsafeWindow
// @copyright    2019+, Redeven
// ==/UserScript==

(function() {
    'use strict';

    function buttonStyle(target)
    {
        var targetHTML = target.html();
        target.css('background-color', '#5CB85C');
        target.html('COPIADO');
        target.attr('disabled', true);
        setTimeout(function(){
            target.css('background-color', '#f0f0f0');
            target.html(targetHTML);
            target.removeAttr('disabled');
        }, 5000);
    }

    function toHex(str) {
        var hex = '';
        for(var i=0;i<str.length;i++) {
            hex += ''+str.charCodeAt(i).toString(16);
        }
        return hex;
    }

    function toStr(hexx) {
        var hex = hexx.toString();//force conversion
        var str = '';
        for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }

    // Añadir botón a la página
    $(document).ready(function(){
        unsafeWindow.tHexalink = ((unsafeWindow.tString) ? false : true);
        var pos_y = ((unsafeWindow.tString) ? 75 : 25);
        $('body').append('<div class="tHexalink" style="position:fixed;bottom:'+pos_y+'px;left:10px;z-index:9001"><button class="tHexalink-Launch" type="button" style="background-color:#F0AD4E">T!Hexalink</button></div>');
    });

    // Abrir script
    $(document).on('click', '.tHexalink-Launch', function(){
        if ($('.tHexalink .tHexalink-Input').html() === null)
        {
            $('.tHexalink').css('background-color', '#f0f0f0');
            $('.tHexalink').append('<input class="tHexalink-Input" type="text" style="width:20vw;max-width:700px"><button class="tHexalink-Encode" type="button">A hexadecimal</button><button class="tHexalink-Decode" type="button">A texto</button>');
            $('.tHexalink-Input').focus();
        }
        else
        {
            $('.tHexalink').css('background-color', '');
            $('.tHexalink-Input').remove();
            $('.tHexalink-Encode').remove();
            $('.tHexalink-Decode').remove();
        }
    });

    // Encriptar
    $(document).on('click', '.tHexalink-Encode', function(){
        //$('.tHexalink-Input').val($('.tHexalink-Input').val().hexEncode());
        $('.tHexalink-Input').val(toHex($('.tHexalink-Input').val()));
    });

    // Desencriptar
    $(document).on('click', '.tHexalink-Decode', function(){
        //$('.tHexalink-Input').val($('.tHexalink-Input').val().hexDecode());
        $('.tHexalink-Input').val(toStr($('.tHexalink-Input').val()));
    });

})();