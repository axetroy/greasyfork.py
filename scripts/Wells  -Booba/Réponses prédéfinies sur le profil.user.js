// ==UserScript==
// @name         Réponses prédéfinies sur le profil
// @namespace    http://play-cid-modding.com/
// @version      1.1
// @description  Réponses prédéfinies sur le profil - PCM
// @author       Rivals Edit by Weyzen
// @match        http://play-cid-modding.com/members/*
// @grant        none
// ==/UserScript==
(function() {
   'use strict';
    if($('.member_view').length >= 1)
    {
        // ajout des boutons
        $('#smiliepicker').before('<input type="submit" id="premiumButton" class="button primary" value="Premium" accesskey="pre">');
        $('#smiliepicker').before('<input type="submit" id="birthdayButton" class="button primary" value="Birthday" accesskey="pre">');
        $('#smiliepicker').before('<input type="submit" id="forumButton" class="button primary" value="Forum" accesskey="pre">');
        // lors du click, remplir le textarea
        $('#premiumButton').click(function(){
            $('textarea[placeholder="Ecrire quelque chose..."]').val("Bienvenue parmi les membres premiums "+ $('h1[itemprop=name]').text() +" ! :)");
        });
        $('#birthdayButton').click(function(){
            $('textarea[placeholder="Ecrire quelque chose..."]').val("Bon anniversaire "+ $('h1[itemprop=name]').text() +" :love: ");
        });
     
        $('#forumButton').click(function(){
            $('textarea[placeholder="Ecrire quelque chose..."]').val("Bienvenue sur le forum "+ $('h1[itemprop=name]').text() +" :neo: ");
        });
    }
})();