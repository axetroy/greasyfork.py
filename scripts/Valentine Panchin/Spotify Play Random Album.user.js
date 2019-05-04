// ==UserScript==
// @name         Spotify Play Random Album
// @namespace    http://spotify.com/
// @version      0.1
// @description  Load all of your albums and play random ones
// @author       b2kdaman
// @match        https://open.spotify.com/collection/albums
// @grant        none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    let albums;
    let lastAlbumsLength = 0;
    const loaderInterval = setInterval(checkIfStillLoading.bind(window), 500);

    function checkIfStillLoading() {
        window.scroll(0, 99999);
        if (!$('img[src="/static/assets/images/loading.gif"]').length) {
            loadAlbums();
        }
    }

    function loadAlbums() {
        albums = $('.cover-art-playback');
        if (lastAlbumsLength === albums.length && albums.length !== 0) {
            clearInterval(loaderInterval);
            const playButton = document.createElement('button');
            playButton.className = 'control-button spoticon-track-16';
            const buttonRef = $(playButton);
            buttonRef.click(playRandomAlbum);
            buttonRef.css('cursor', 'pointer');
            buttonRef.css('color', '#1db954');
            $('.player-controls__buttons').prepend(playButton);
        } else {
            lastAlbumsLength = albums.length;
            window.scroll(0, 99999);
        }
    }

    function playRandomAlbum() {
        albums[Math.round(Math.random() * albums.length)].click();
    }
})();