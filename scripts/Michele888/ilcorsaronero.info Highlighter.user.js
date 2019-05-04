// ==UserScript==
// @name         ilcorsaronero.info Highlighter
// @namespace    http://ilcorsaronero.info
// @version      0.1
// @description  enter something useful
// @author       Michele
// @require      http://code.jquery.com/jquery-latest.min.js
// @match        http://ilcorsaronero.info/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

jQuery("tr[class^='odd'] :nth-child(6n)").each(function(k, v) {
    console.log($(v).text());
    if (isNaN($(v).text())) {
        $(v).parent().css("background-color", "black");
    } else if ($(v).text() < 100) {
        $(v).parent().css("background-color", "black");
    } else if ($(v).text() < 200) {
        $(v).parent().children().children().css("color", "black");
        $(v).parent().css("background-color", "gray");
    } else if ($(v).text() < 400) {
        $(v).parent().children().children().css("color", "black");
        $(v).parent().css("background-color", "yellow");
    } else {
        $(v).parent().children().children().css("color", "black");
        $(v).parent().css("background-color", "green");
    }
});
