// ==UserScript==
// @name         Pokemap addition patch (pokemongo.id)
// @namespace    pokemap addition patch
// @version      0.1.1
// @description  Add coordinates and a link for trigger pokesniper2 to catch selected pokemon
// @author       BewbsMastery
// @match        https://maps.pokemongo.id/*
// @grant        none
// @require https://code.jquery.com/jquery-3.1.0.min.js
// ==/UserScript==
$(function(){
    window.setInterval(function(){
        var container = $(".info-window-content");
        var pokecoor = container.find(">p:eq(1)").find(">a:first").attr("href").split("/")[6],
            pokename = container.find(">p:eq(0)").find(">:first-child").text(),
            link = "pokesniper2://"+ pokename +"/"+ pokecoor;
        if( container.find(".snipeme").length > 0 )
            container.find(".snipeme").find(">:first-child").attr("href" , link);
        else
            container.append("<p class=\"snipeme\"><a href=\""+ link +"\">Snipe me!</a></p>");
    } , 500);
});