// ==UserScript==
// @name         Balise [membre]
// @namespace    https://realitygaming.fr/
// @version      1.0
// @description  Balise [membre] qui est remplacée par le pseudonyme de l'auteur à la soumission d'une réponse.
// @author       Rivals
// @match        https://realitygaming.fr/threads/*
// @match        https://realitygaming.fr/conversations/add* 
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