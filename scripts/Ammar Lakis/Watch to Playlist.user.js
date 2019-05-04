// ==UserScript==
// @name         Watch to Playlist
// @namespace    https://gist.github.com/ammarlakis
// @version      0.1
// @description  aghh, youtube's interface!
// @author       Ammar Lakis
// @match        https://www.youtube.com/user/**
// @match        https://www.youtube.com/channel/**
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var hrefWatchToPlaylist = function(str) {
        return str.replace(/watch.+list/, 'playlist?list');
    };

    function changeWatchToPlaylist () {
        var listsLinks = document.getElementsByTagName('ytd-grid-playlist-renderer');
        if (listsLinks) {
            for (var i = 0; i < listsLinks.length; i++) {
                listsLinks[i].children[1].href = hrefWatchToPlaylist(listsLinks[i].children[1].href);
            }
        }
    }

    (function() {
        changeWatchToPlaylist();
    })();
})();