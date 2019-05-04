// ==UserScript==
// @name         /jg
// @namespace    Klatu
// @version      2
// @description  Agrega al chat de kongregate.com el comando /jg, que sirve para enviarle a JefeTauren un mensaje privado con "gato" como contenido.
// @author       Klatu
// @match        http://www.kongregate.com/games/*/*
// @grant        none
// ==/UserScript==

document.observe('holodeck:ready', function(){
    holodeck.addChatCommand('jg', function(a, b){
        a.activeDialogue().sendPrivateMessage("JefeTauren", "gato");
        return false;
    });
});