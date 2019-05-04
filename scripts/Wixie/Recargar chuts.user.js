// ==UserScript==
// @name         Recargar chuts
// @namespace    http://pixiebot.xyz/
// @version      0.4
// @description  Auto actualizar el MI
// @author       You
// @include      http*://www.taringa.net/mi
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

function chuts(){
    var loc = $(window).scrollTop();
    if (loc < 550) { /* Para que no actualice cuando estamos scroleando hacia abajo porque nos resetea todo */
        var chuuuuuuuuts = parseInt($('#bubble-alert-newsfeed').text())
        if (chuuuuuuuuts > 0) {
            $('#bubble-alert-newsfeed').click()
        }
    }

} 
setInterval(chuts, 2000);
