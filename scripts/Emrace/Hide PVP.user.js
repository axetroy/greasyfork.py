// ==UserScript==
// @name         Hide PVP
// @namespace    https://greasyfork.org/bg/users/180421-emrace
// @version      0.2
// @description  Hides the annoying guerilla fight button
// @author       Emrace
// @match        https://www.erepublik.com/*/military/battlefield/*
// @grant        none
// ==/UserScript==

function pesho() {

    var pvp = $('#join_pvp');

    if(pvp.is(':visible'))
    {
        $('#join_pvp').hide()
    }

}

setTimeout(function() {
        pesho();
    },
    2000);
