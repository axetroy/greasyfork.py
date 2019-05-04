// ==UserScript==
// @name         MirkoOP
// @version      1.0.1
// @description  Dodaje etykiete "OP" w komentarzach na mirko i glownej
// @author       Skew
// @match        http://*.wykop.pl/wpis/*
// @match        http://*.wykop.pl/link/*
// @grant GM_addStyle
// @namespace https://greasyfork.org/users/34855
// ==/UserScript==

GM_addStyle(".op-badge {\
            padding: 3px;\
            color: #05AB2D;\
            }");

$(document).ready(function(){
    
    // Sprawdzenie OPa na mirko
    var op = $(".showProfileSummary b").first().text();
    
    // Sprawdzenie OPa na glownej
    var glownaOp = $(".fix-tagline .affect").first();
    if(glownaOp.length > 0) op = glownaOp.text().slice(1);
    
    
    $(".showProfileSummary b").slice(1).each(function(index){
        if($(this).text() == op) {
            $(this).append('<span class="op-badge">OP</span>');
        }
    });
});