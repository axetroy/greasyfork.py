// ==UserScript==
// @name         Mylitecoin Auto
// @namespace    http://www.cryptonews.fun
// @version      1.0
// @description  Go to: https://mylitecoin.club/?ref=1759
// @author       Gastino
// @match        https://mylitecoin.club/*
// @match        https://mylitecoin.club
// @match        https://www.mylitecoin.club/*
// ==/UserScript==

(function() {
    setInterval( function(){
        if($('#timer').text() === "")
        {
            $.ajax({
                type: 'POST',
                url: '/',
                data: {action: $('input[name=action]').val(), wallet: $('input[name=wallet]').val()},
                success: function (data) {
                    location.reload();
                }
            });
        }
    },1000);
})();