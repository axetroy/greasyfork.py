// ==UserScript==
// @name         AutoJoin SteamGifts
// @namespace    https://greasyfork.org/es/users/158251-danala-danazo
// @version      0.3
// @description  Entra en el sorteo seleccionado
// @author       DanalaDanazo
// @match        https://www.steamgifts.com/giveaway/*
// @run-at document-idle
// ==/UserScript==
/*
Changelog:
__________
v0.2 -> Arreglado bug no llamaba a "closeWindow"
v0.3 -> Eliminado @grant | Modificado @namespace
*/
(function() {
    var xsrf_token = $('input[name="xsrf_token"]');
    var code = $('input[name="code"]');
    data = {
        xsrf_token: xsrf_token[0].value,
        do: "entry_insert",
        code: code[0].value
    };
    $.ajax({
        type: "POST",
        url: "https://www.steamgifts.com/ajax.php",
        data: data,
        success: closeWindow()
    });
})();

function closeWindow() {
    window.close();
}