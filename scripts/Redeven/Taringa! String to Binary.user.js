// ==UserScript==
// @name         Taringa! String to Binary
// @namespace    http://www.taringa.net/redeven
// @version      1.0.5
// @description  Añade un traductor a binario
// @author       Redeven
// @include      http*://www.taringa.net/*
// @grant        unsafeWindow
// @copyright    2017+, Redeven

// ==/UserScript==
(function() {
    'use strict';

    function convertBinary(inputVal) {
        var output = $('.binaryInput');
        output.value = "";
        for (var i = 0; i < inputVal.length; i++) {
            var decoded = inputVal[i].charCodeAt(0).toString(2);
            while (decoded.length < 8)
            {
                decoded = "0" + decoded;
            }
            output.value += decoded;
        }
        $('.binaryInput').val(output.value);
        $('.binaryInput').select();
        try {
            var cmdCopy = document.execCommand('copy');
            if (cmdCopy)
            {
                console.log(cmdCopy);
                $('.binaryExec').css('background-color', '#5CB85C');
                $('.binaryExec').html('COPIADO');
                $('.binaryExec').attr('disabled', true);
                $('.binaryInput').attr('disabled', true);
            }
        } catch(err) {
            console.log('Oops, unable to copy');
        }
    }

    $(document).ready(function(){
        unsafeWindow.tString = ((unsafeWindow.tEncrypt) ? false : true);
        var pos_y = ((unsafeWindow.tEncrypt) ? 75 : 25);
        $('body').append('<div class="binaryScript" style="position:fixed;bottom:'+pos_y+'px;left:10px;z-index:9001"><button class="binaryBtn" type="button" style="background-color:#F0AD4E">Binario</button></div>');
    });

    $(document).on('click', '.binaryBtn', function(){
        if ($('.binaryScript .binaryInput').html() === null)
        {
            $('.binaryScript').css('background-color', '#f0f0f0');
            $('.binaryScript').append('<input class="binaryInput" type="text" style="width:40vw;max-width:700px"><button class="binaryExec" type="button">Convertir</button>');
            $('.binaryInput').focus();
        }
        else
        {
            $('.binaryScript').css('background-color', '');
            $('.binaryInput').remove();
            $('.binaryExec').remove();
        }
    });

    $(document).on('keyup', '.binaryInput', function(e){
        if(e.which == 13) {
            convertBinary($('.binaryInput').val());
        }
    });

    $(document).on('click', '.binaryExec', function(){
        convertBinary($('.binaryInput').val());
    });

})();