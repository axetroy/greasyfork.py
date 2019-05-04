// ==UserScript==
// @name         Min Price Filter for SteamDB
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Set the min price and reduce the clutter.
// @author       Kxmode
// @match        *://steamdb.info/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {

    $("body").prepend("<style data-purpose='additional-styles-min-pricing-tampermonkey-script'>\n" +
                     ".header-huge                  { height: 280px; }\n" +
                     ".scope-sales .header-title    { margin-top: 80px; }\n" +
                     ".fancy-input                  { position: relative; background: #222; vertical-align: middle; margin: 15px 0 0 19px; padding: 5px 0; }\n" +
                     ".fancy-input input            { width: 100px; color: #9fbbcb; border: 1px solid #778c98; border-radius: 2px; background: 0 0; line-height: 16px; -webkit-appearance: none; -moz-appearance: none; appearance: none; font-weight: 400 }\n" +
                     ".fancy-input input::-webkit-input-placeholder { /* Chrome/Opera/Safari */ color: #9fbbcb; }\n" +
                     ".fancy-input input::-moz-placeholder { /* Firefox 19+ */ color: #9fbbcb; } \n" +
                     ".fancy-input input:-ms-input-placeholder { /* IE 10+ */  color: #9fbbcb; } \n" +
                     ".fancy-input input:-moz-placeholder { /* Firefox 18- */  color: #9fbbcb; } \n" +
                     ".fancy-input label            { line-height: 24px; color: #9fbbcb; padding-right: 20px; } \n" +
                     ".fancy-input span             { margin-top: -4px; color: #fff; background: rgba(60,96,145,.8); border-color: #778c98; line-height: 28px; padding: 0 12px; margin-left: 15px; }\n" +
                     ".fancy-input span:hover       { color: #fff; background: #4873a7; border-color: #4873a7; }\n" +
                     "</style>");

    $("#js-filters").append("<div class='clearfix'></div><div class='fancy-input text-center'><label>Min USD Filter:</label><input type='text' name='minprice' class='mindata' placeholder='X.XX'><span class='btn btn-sm jQmpFilter'>Update</span></div>");

    var filteredValue = 0;

    $(".mindata").on("change", function() {

        var rawValue = $(this).val();
        filteredValue = rawValue.replace("$","");
        filteredValue = filteredValue.replace(".","");
        $(this).attr("rp", filteredValue);
    });

    $(".jQmpFilter").on("click", function() {
        $(".appimg").css("display", "");
        $.each($(".appimg td:nth-child(5)"), function(index, value) {
            if (parseInt($(this).attr("data-sort")) < filteredValue)
            {
                $(this).parent().css( "display", "none" );
            }
        });
    });

});