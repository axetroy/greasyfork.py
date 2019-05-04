// ==UserScript==
// @name         HWM ивент пиратов, выгодность перевозки
// @version      1
// @author       noname
// @include      https://www.heroeswm.ru/pirate_event.php
// @require      https://code.jquery.com/jquery-3.1.1.slim.min.js
// @description  возле каждого ресурса пишется прибыль за тонну
// @namespace https://greasyfork.org/users/237404
// ==/UserScript==

(function (undefined) {
    $('td').each(function(){
        if( $(this).html() == 'Вес т.' ){
            $tablePirat = $(this).closest('table');
            $tablePirat.find('>tbody>tr').each(function(i){
                if( i > 0 ){
                    ves = parseInt( $(this).find('>td:eq(1)').html() );
                    priceStart = parseInt( $(this).find('>td:eq(2) td:last').html().replace(',','') );
                    priceEnd = parseInt( $(this).find('>td:eq(3) td:last').html().replace(',','') );
                    marga = ( ( priceEnd - priceStart ) / ves ).toFixed(2);
                    $(this).find('>td:last').append('<br>Выгода за 1т: '+marga);
                }
            });
        }
    });
}());
