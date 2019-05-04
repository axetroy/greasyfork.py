// ==UserScript==
// @name         Balise [membre]
// @namespace    http://forum.xtremeconsole62.fr/
// @version      1.0
// @description  Balise [membre] qui est remplacée par le pseudonyme de l'auteur à la soumission d'une réponse.
// @author       Rivals & Weyzen
// @match        http://forum.xtremeconsole62.fr/threads/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function() {
        $('input[value="Poster votre réponse"]').click(function(event){
            event.preventDefault();
            
            var content = $('iframe.redactor_textCtrl').contents().find('body').html();
            $('iframe.redactor_textCtrl').contents().find('body').html(content.replace('[membre]', $('#pageDescription').find('a.username').html()));
            
            console.log('OK');
            
            $('input[value="Poster votre réponse"]').submit();
        });
    });
})();