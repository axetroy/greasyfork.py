// ==UserScript==
// @name         freebitco.in Free Play (without captcha)
// @namespace    x-lab
// @version      0.1
// @description  freebitco.in Free Play (without captcha).
// @author       ICE
// @match        https://freebitco.in/
// @grant        none
// ==/UserScript==

$(document).ready(function() {
    setInterval(initiateFreeGame, 10000);
});

function initiateFreeGame() {
    if ($('#play_without_captchas_button').is(':visible')) {
        $('#play_without_captchas_button').click();
    }

    if($('#play_with_captcha_button').is(':visible')) {
        setInterval(playFreeGame, 2000);
    }

    location.reload();
}

function playFreeGame() {
    $('#free_play_form_button').click();
}
