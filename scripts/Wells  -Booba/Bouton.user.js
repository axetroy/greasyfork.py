// ==UserScript==
// @name         Bouton 
// @namespace    https://realitygaming.fr/
// @namespace    https://realitygaming.fr/
// @version      1.
// @description  Bouton - Weyzen
// @author       Code : Rivals / Create WZN
// @match        https://realitygaming.fr/
// @match        https://realitygaming.fr/
// @grant        none
// ==/UserScript==

// Script crée par @Marrent


$('#happyBirthday').click(function(){
   $('textarea[placeholder="Ecrire quelque chose..."]').val('Je te souhaite un bon anniversaire '+ $('h1[itemprop="name"]').text() +' :)');
});