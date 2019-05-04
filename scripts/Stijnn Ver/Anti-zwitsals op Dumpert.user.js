// ==UserScript==
// @name         Anti-zwitsals op Dumpert
// @namespace    FuckZwitsals
// @version      0.1
// @description  Verwijder al die zwitsals in de Dumpert comments
// @author       Mark Suckerberg
// @match        *comments.dumpert.nl/embed/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant        none
// ==/UserScript==



    $("article[class$='comment'],article[class$='collapsed']").each(function() {
    if ($(this).find("span[class^='baby']").length !== 0)
    {
        $(this).remove();
    }});