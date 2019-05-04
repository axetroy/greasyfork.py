// ==UserScript==
// @name         Turn 8tracks playlists into playlists from other services
// @namespace    http://www.dieterholvoet.com
// @version      1.0
// @description  Turn 8tracks playlists into playlists from other services (YouTube, Spotify, Deezer, Soundcloud)
// @author       Dieter Holvoet
// @match        https://8tracks.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @require      https://bowercdn.net/c/jquery-observe-2.0.2/jquery-observe.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create button
    var $btn = $('<a target="_blank" id="spotify-playlist" class="turquoise_button flatbutton" href="#">Load tracklist</a>');

    // Append styles
    $(document.head).append('<style>#spotify-playlist { float: right; margin: 5px 0 0 10px; -webkit-transition: background-color .2s linear; -ms-transition: background-color .2s linear; transition: background-color .2s linear;} .spotify_button { background-color: #1ED760 !important; }</style>');

    // Add listeners
    $(document).on('click', '#spotify-playlist', handleClick);
    $('#main').observe('childlist subtree', handleSubtreeChange);



    function handleClick(e) {
        e.preventDefault();

        var mixID = guessMixID();
        loadTrackList(mixID);
    }

    function handleSubtreeChange() {
        // Return if not on a playlist page
        if (!$('#mix_wrapper, .options').length || $('#spotify-playlist').length) {
            return;
        }

        console.log('check!');
        $('.options').prepend($btn);
    }

    function loadTrackList(mixID) {
        $.getJSON('https://8tracks.com/mixes/'+mixID+'/tracks_for_international.jsonh', function(data) {
            $btn.text('Convert into playlist');
            $btn.attr('href', createURL(data.tracks));
            $btn.addClass('spotify_button');

            $(document).off('click', '#spotify-playlist');
        });
    }

    function guessMixID() {
        var url = $('[property="twitter:app:url:iphone"]').attr('content');
        var matches = /mix\/([0-9]{7})/.exec(url);

        if (matches.length > 1) {
            return matches[1];
        } else {
            return false;
        }
    }

    function createURL(tracks) {
        var stringified = [];

        tracks.forEach(function(track) {
            stringified.push(track.performer+' - '+track.name);
        });

        return 'http://www.playlist-converter.net/#/freetext='+encodeURI(stringified.join('\n'));
    }
})();