// ==UserScript==
// @name         Telegram Stickers to Emoji
// @namespace    Telegram Stickers to Emoji
// @version      1.0
// @description  Convert Telegram Stickers to Emoji for simplier viewing
// @author       Anon043
// @match        https://web.telegram.org/*
// @grant        none
// ==/UserScript==
(function() {
    setInterval(function() {
        $( "img[alt*='Sticker']" ).each(function() {
            $(this).parent("div.clickable").removeAttr("style"); // Remove sticker size
            $(this).replaceWith($(this).attr("alt").replace("[", "").replace(" Sticker]", "")); // [*emoji* Sticker] --> Emoji
        });
    }, 500);
})();