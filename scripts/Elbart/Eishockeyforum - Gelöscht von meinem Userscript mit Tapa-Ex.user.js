// ==UserScript==
// @name        Eishockeyforum - Gelöscht von meinem Userscript mit Tapa-Ex
// @description Entfernt die nutzlosen "Gesendet von"-Texte
// @namespace   ehf neu
// @version     20150727
// @include     http://www.eishockeyforum.at/index.php/Thread/*
// @grant       none
// ==/UserScript==
var item = $("div.messageText:contains('Gesendet von meinem')");
item.text(function () {
    return $(this).text().replace(/Gesendet\ von\ meinem\ [a-zA-Z0-9-]*\ mit\ Tapatalk\s*$/gi,"");
});

// http://stackoverflow.com/questions/11324559/jquery-if-div-contains-this-text-replace-that-part-of-the-text
// http://stackoverflow.com/questions/16137562/javascript-jquery-string-replace-with-regex