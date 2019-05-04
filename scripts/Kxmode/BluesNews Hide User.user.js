// ==UserScript==
// @name         BluesNews Hide User
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Better than 'Ignore User.' This script removes the blocked user's comments plus their quotes.
// @author       Kxmode
// @match        *://www.bluesnews.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    var userArray = [   // Comma separated list of user IDs go here
                        00000,
                    ];
    var userProfileURL = "board.pl?action=userinfo&user=";
    $.each( userArray, function( i, val ) {
        // Removes blocked user comments
        $.each($("#BluesNews-Main .content table .content table font a"), function() {
            var hrefTarget = $(this).attr("href");
            var targetTitle = $(this).attr("title");
            if (hrefTarget.substring(0, 30) == userProfileURL)
            {
                if (targetTitle !== undefined)
                {
                    if (hrefTarget.substring(30,50) == val)
                    {
                        $(this).parents().eq(4).remove();
                    }
                }
            }
        });
        // Removes blocked user quotes
        $.each($("blockquote"), function() {
            var userID = $(this).attr("uid");
            if(userID !== undefined)
            {
                if (userID == userArray[i])
                {
                    $(this).remove();
                }
            }
        });
    });
});