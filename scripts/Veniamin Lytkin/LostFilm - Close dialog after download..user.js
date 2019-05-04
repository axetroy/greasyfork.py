// ==UserScript==
// @name         LostFilm - Close dialog after download.
// @version      1.0
// @description  Torrents are downloaded in main window instead of opened dialog, also dialog closes when torrent downloaded.
// @match        http://retre.org/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @author       Epsil0neR
// @namespace    https://greasyfork.org/en/users/19387
// ==/UserScript==

$(document).on('click', 'a', function(evt){
    if (window.opener && typeof this.getAttribute('href') === 'string') {
        evt.preventDefault();
        window.opener.location = this.getAttribute('href');
        window.close();
    }
});