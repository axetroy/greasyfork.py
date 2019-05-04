// ==UserScript==
// @name         Rozbor díla addon
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Můžeš kopírovat pomocí pravého tlačítka
// @author       Airsane
// @match        https://www.rozbor-dila.cz/*
// @grant        none
// @require http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

window.onload = function()
{
    document.oncontextmenu = null;
    document.onselectstart = null;
    document.keypress = null;
    document.onkeydown = null;
    $("window").off( "keydown" );
};