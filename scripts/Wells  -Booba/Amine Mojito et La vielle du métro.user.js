// ==UserScript==
// @name         Amine Mojito et La vielle du métro
// @namespace    https://realitygaming.fr/
// @namespace    https://realitygaming.fr/chatbox/
// @version      1.0
// @description  La keh keh keh a mojito. Tititi tatata 
// @author       Marentdu93 et adapté 
// @match        https://realitygaming.fr/
// @match        https://realitygaming.fr/chatbox/
// @grant        none
// ==/UserScript==

// Script crée par @Marrent


$('#happyBirthday').click(function(){
   $('textarea[placeholder="Ecrire quelque chose..."]').val('Je te souhaite un bon anniversaire '+ $('h1[itemprop="name"]').text() +' :)');
});