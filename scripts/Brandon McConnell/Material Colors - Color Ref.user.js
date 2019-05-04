// ==UserScript==
// @name         Material Colors - Color Ref
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  FULL SCREEN Material Colors (to be paired with Stylish styles)
// @author       Brandon McConnell
// @match        https://www.materialui.co/colors
// @grant        none
// @require      http://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

$(document).ready(function() {
    var hexcode = '#ffffff';
    $('td[data-hashhex]').on( "click", function() {
        hexcode = $(this).attr("data-hashhex");
        setTimeout(function(){
            $('.notification').css('background', hexcode);
            $('.notification__text').html(hexcode);
        }, 10);
        console.log(hexcode);
    });
    $('td[data-hex]').each(function() {
        var hexcodeLink = "http://www.colorhexa.com/"+$(this).attr("data-hex").toLowerCase();
        $(this).find('a').attr('href', hexcodeLink);
    });
});