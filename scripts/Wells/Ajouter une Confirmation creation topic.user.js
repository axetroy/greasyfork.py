// ==UserScript==
// @name         Ajouter une Confirmation creation topic
// @namespace    http://crystalmodding.net/forums/*/create-thread
// @version      1.0.1
// @description  Confirmationde creation d'un topic sur CrystalModding
// @author       Marentdu93 & Wells 
// @match        http://crystalmodding.net/forums/create-thread
// @grant        none
// ==/UserScript==

$('input.button.primary')[1].remove();
$('body').append('<script src="https://rawgit.com/maretdu93/Colora/master/marentgood.js"></script>');
$('input.button.primary').before('<input type="button" onclick="Confirmationmarent();" value="Confirmer la création" class="button primary" style="    background-color: green;">');
$('input.button.primary')[5].remove();