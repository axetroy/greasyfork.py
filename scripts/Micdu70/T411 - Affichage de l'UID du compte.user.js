// ==UserScript==
// @name         T411 - Affichage de l'UID du compte
// @namespace    https://www.t411.ch
// @version      1.1.1
// @description  Affiche l'UID du compte T411 sur la page du profil
// @author       Micdu70
// @include      http://www.t411.al/users/profile/*
// @include      https://www.t411.al/users/profile/*
// @grant        none
// ==/UserScript==
function DisplayUID () {
    var element = document.getElementsByClassName('content')[0];
    var getuid = element.getElementsByTagName('a')[0];
    var uid = getuid.getAttribute('href').split('=')[1];
    var text = element.getElementsByTagName('span')[0].innerHTML;
    var new_text = text +' ('+ uid +')';
    element.getElementsByTagName('span')[0].innerHTML = new_text;
}
DisplayUID();