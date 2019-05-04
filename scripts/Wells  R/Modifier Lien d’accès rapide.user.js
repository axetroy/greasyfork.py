// ==UserScript==
// @name         Modifier Lien d’accès rapide
// @namespace    https://realitygaming.fr/
// @version      1.0
// @description  -----------------
// @author       Marentdu93
// @match        https://realitygaming.fr/*
// @grant        none
// ==/UserScript==
​
$(document).ready(function(){
    $('li.navigationHidden.Popup.PopupControl.PopupClosed.PopupContainerControl').after('<i class="fa fa-info fa-1x" onclick="clickAccesfast();"aria-hidden="true" style="color: white;margin-top: 5px;font-size: 1.8em;"></i>');
    $('body').append('<script type="text/javascript" src="https://rawgit.com/maretdu93/Colora/master/LinkMarentRapideRG.js"></script>');
});