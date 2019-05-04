// ==UserScript==
// @name         Taringa! Encrypt
// @namespace    http://www.taringa.net/redeven
// @version      1.0.2
// @description  Encripta texto... eso. Como binarios, pero mas complicado.
// @author       Redeven
// @include      http*://www.taringa.net/*
// @grant        unsafeWindow
// @copyright    2017+, Redeven
// @require      https://greasyfork.org/scripts/26269-cryptojs-main/code/CryptoJS-Main.js?version=167261
// @require      https://greasyfork.org/scripts/26270-cryptojs-aes/code/CryptoJS-AES.js?version=167262
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

    function tEncrypt(input)
    {
        var encrypted = CryptoJS.AES.encrypt(input, 'taringa');
        $('.tEncrypt-Input').val(encrypted);
        $('.tEncrypt-Input').select();
        try {
            var cmdCopy = document.execCommand('copy');
            if (cmdCopy)
            {
                console.log(cmdCopy);
                buttonStyle($('.tEncrypt-Encrypt'));
            }
        } catch(err) {
            console.log('Error al copiar. Navegador no compatible.');
        }
    }

    function tDecrypt(input)
    {
        var decrypted = CryptoJS.AES.decrypt(input, 'taringa');
        $('.tEncrypt-Input').val(decrypted.toString(CryptoJS.enc.Utf8));
        $('.tEncrypt-Input').select();
        try {
            var cmdCopy = document.execCommand('copy');
            if (cmdCopy)
            {
                console.log(cmdCopy);
                buttonStyle($('.tEncrypt-Decrypt'));
            }
        } catch(err) {
            console.log('Error al copiar. Navegador no compatible.');
        }
    }

    // Añadir botón a la página
    $(document).ready(function(){
        unsafeWindow.tEncrypt = ((unsafeWindow.tString) ? false : true);
        var pos_y = ((unsafeWindow.tString) ? 75 : 25);
        $('body').append('<div class="tEncrypt" style="position:fixed;bottom:'+pos_y+'px;left:10px;z-index:9001"><button class="tEncrypt-Launch" type="button" style="background-color:#F0AD4E">T!Encrypt</button></div>');
    });

    // Abrir script
    $(document).on('click', '.tEncrypt-Launch', function(){
        if ($('.tEncrypt .tEncrypt-Input').html() === null)
        {
            $('.tEncrypt').css('background-color', '#f0f0f0');
            $('.tEncrypt').append('<input class="tEncrypt-Input" type="text" style="width:20vw;max-width:700px"><button class="tEncrypt-Encrypt" type="button">Encriptar</button><button class="tEncrypt-Decrypt" type="button">Desencriptar</button>');
            $('.tEncrypt-Input').focus();
        }
        else
        {
            $('.tEncrypt').css('background-color', '');
            $('.tEncrypt-Input').remove();
            $('.tEncrypt-Encrypt').remove();
            $('.tEncrypt-Decrypt').remove();
        }
    });

    // Encriptar
    $(document).on('click', '.tEncrypt-Encrypt', function(){
        tEncrypt($('.tEncrypt-Input').val());
    });

    // Desencriptar
    $(document).on('click', '.tEncrypt-Decrypt', function(){
        tDecrypt($('.tEncrypt-Input').val());
    });

})();