// ==UserScript==
// @name           Pokec.sk - Skryvac definovanych nickov na skle
// @description    Skrytie sprav na skle od vybranych pouzivatelov.
// @namespace      Pokec.sk, skrytie, sklo, azet
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @date           2017-05-08
// @author         MerlinSVK
// @icon           http://s.aimg.sk/pokec_base/css/favicon.ico
// @version        1.2
// @license        MIT
// @grant          none
// ==/UserScript==

var blockedNicks = new Array('bedna750', 'bedna780', 'IBAS77');  // sem napiste nicky pouzivatelov, ktorych spravy nechcete na skle vidiet

function hideNicks(){
    for (var i = 0; i < blockedNicks.length; i++) {
        var skloMsgs = $('*[data-azetid*="'+blockedNicks[i]+'"]').closest('div.sprava').css('display', 'none');  // skryje spravy od pouzivatela, aj pre pouzivatela
        var zoznam = $('li[data-azetid*="'+blockedNicks[i]+'"]').css('display', 'none');  // skryje pouzivatela v zozname ludi v miestnosti
        if (skloMsgs.length > 0) console.log('Skryty nick: ' + blockedNicks[i]);  // vypise do konzoly, ktory nick bol skryty
    }
}

$(document).ready(hideNicks); // skryje nicky hned po nacitani miestnosti
$('#sklo').on('DOMNodeInserted',function(e){if($(e.target).hasClass('sprava')){hideNicks();}}); // skryje nicky, ked na skle pribudne nova sprava
$('#sklo').on('DOMNodeRemoved',function(e){if($(e.target).hasClass('sprava')){hideNicks();}});  // skryje nicky, ked na skle ubudne sprava
$('ul#roomUsers').on('DOMNodeInserted', hideNicks); // skryte nicky aj po refreshi zoznamu ludi (prichod ludi do miestnosti)
$('ul#roomUsers').on('DOMNodeRemoved', hideNicks); // skryte nicky aj po refreshi zoznamu ludi (odchod ludi z miestnosti)
